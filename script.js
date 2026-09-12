/* ============================================================
   SISTEMA DE CIFRADO / DESCIFRADO - CÉSAR Y ATBASH
   Criptoanálisis estadístico de Al-Kindi (أبو يوسف يعقوب بن إسحاق الكندي)
   Optimizado: Búsqueda O(1) con Map, soporte de caracteres
   contenidos o no en ASCII (Unicode / Ñ), y validaciones robustas.
   ============================================================ */

// Conjunto actual de caracteres (Arreglo ordenado)
let conjuntoActual = null;
// Mapa inverso para búsqueda de índices en tiempo constante O(1)
let mapaIndices = null;

/* ------------------------------------------------------------
   TABLA DE FRECUENCIAS DEL ESPAÑOL (en porcentaje)
   Incluye letras de la 'a' a la 'z' y la letra 'ñ' (0.31%).
   ------------------------------------------------------------ */
const FREQ_ES = {
  a: 12.53, b: 1.42, c: 4.68, d: 5.86, e: 13.68, f: 0.69,
  g: 1.01, h: 0.70, i: 6.25, j: 0.44, k: 0.02, l: 4.97,
  m: 3.15, n: 6.71, 'ñ': 0.31, o: 8.68, p: 2.51, q: 0.88,
  r: 6.87, s: 7.98, t: 4.63, u: 3.93, v: 0.90, w: 0.02,
  x: 0.22, y: 0.90, z: 0.52
};

/* ------------------------------------------------------------
   1. CONSTRUCCIÓN Y GESTIÓN DEL CONJUNTO DE CARACTERES
   Establece el arreglo ordenado y construye el Map inverso para O(1).
   ------------------------------------------------------------ */
function establecerConjunto(arregloCaracteres) {
  const unicos = Array.from(new Set(arregloCaracteres));
  
  if (unicos.length < 2) {
    throw new Error('El conjunto debe contener al menos 2 caracteres distintos.');
  }

  conjuntoActual = unicos;
  mapaIndices = new Map();
  for (let i = 0; i < unicos.length; i++) {
    mapaIndices.set(unicos[i], i);
  }
  return conjuntoActual;
}

function construirRangoAscii(inicio, fin) {
  const chars = [];
  for (let codigo = inicio; codigo <= fin; codigo++) {
    chars.push(String.fromCharCode(codigo));
  }
  return chars;
}

/* ------------------------------------------------------------
   2. CIFRADO CÉSAR (Optimizado O(1) por carácter)
   ------------------------------------------------------------ */
function cifrarCesar(texto, conjunto, desplazamiento) {
  const N = conjunto.length;
  let resultado = '';
  for (const caracter of texto) {
    const indice = mapaIndices.get(caracter);
    if (indice === undefined) {
      resultado += caracter;
    } else {
      const nuevoIndice = ((indice + desplazamiento) % N + N) % N;
      resultado += conjunto[nuevoIndice];
    }
  }
  return resultado;
}

/* ------------------------------------------------------------
   3. CIFRADO ATBASH (Optimizado O(1) por carácter)
   ------------------------------------------------------------ */
function cifrarAtbash(texto, conjunto) {
  const N = conjunto.length;
  let resultado = '';
  for (const caracter of texto) {
    const indice = mapaIndices.get(caracter);
    if (indice === undefined) {
      resultado += caracter;
    } else {
      resultado += conjunto[N - 1 - indice];
    }
  }
  return resultado;
}

/* ------------------------------------------------------------
   4. CONTEO Y NORMALIZACIÓN DE FRECUENCIAS
   ------------------------------------------------------------ */
function normalizarLetra(c) {
  const mapa = {
    'á': 'a', 'à': 'a', 'ä': 'a',
    'é': 'e', 'è': 'e', 'ë': 'e',
    'í': 'i', 'ì': 'i', 'ï': 'i',
    'ó': 'o', 'ò': 'o', 'ö': 'o',
    'ú': 'u', 'ù': 'u', 'ü': 'u'
  };
  return mapa[c] || c;
}

function contarFrecuencias(texto) {
  const conteo = {};
  let total = 0;
  for (const c of texto.toLowerCase()) {
    const letra = normalizarLetra(c);
    if ((letra >= 'a' && letra <= 'z') || letra === 'ñ') {
      conteo[letra] = (conteo[letra] || 0) + 1;
      total++;
    }
  }
  return { conteo, total };
}

/* ------------------------------------------------------------
   5. PUNTUACIÓN ESTADÍSTICA DE AL-KINDI (Chi-Cuadrado Normalizado)
   ------------------------------------------------------------ */
function puntuarTexto(texto) {
  const { conteo, total } = contarFrecuencias(texto);
  if (total === 0) return Infinity;

  let chiCuadrado = 0;
  for (const letra in FREQ_ES) {
    const esperado = (FREQ_ES[letra] / 100) * total;
    const observado = conteo[letra] || 0;
    const denominador = Math.max(esperado, 0.5);
    chiCuadrado += Math.pow(observado - esperado, 2) / denominador;
  }
  return chiCuadrado / total;
}

/* ------------------------------------------------------------
   6. GENERACIÓN DE CANDIDATOS
   ------------------------------------------------------------ */
function generarCandidatos(textoCifrado, conjunto) {
  const N = conjunto.length;
  const candidatos = [];

  for (let k = 1; k < N; k++) {
    const texto = cifrarCesar(textoCifrado, conjunto, -k);
    candidatos.push({ metodo: 'César', modulo: k, texto });
  }

  candidatos.push({
    metodo: 'Atbash',
    modulo: null,
    texto: cifrarAtbash(textoCifrado, conjunto)
  });

  return candidatos;
}

const UMBRAL_LETRAS = 4;

/* ------------------------------------------------------------
   7. DESCIFRADO AUTOMÁTICO (Sin Intervención Humana)
   ------------------------------------------------------------ */
function descifrarAutomatico(textoCifrado, conjunto) {
  const candidatos = generarCandidatos(textoCifrado, conjunto);

  const confiables = candidatos.filter(
    (c) => contarFrecuencias(c.texto).total >= UMBRAL_LETRAS
  );

  const lista = confiables.length > 0 ? confiables : candidatos;

  let mejorCandidato = null;
  let mejorPuntaje = Infinity;

  for (const candidato of lista) {
    const puntaje = puntuarTexto(candidato.texto);
    if (puntaje < mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejorCandidato = candidato;
    }
  }

  if (!mejorCandidato) {
    mejorCandidato = candidatos.find((c) => c.metodo === 'César' && c.modulo === 1) || candidatos[0];
  }

  return { ...mejorCandidato, puntaje: mejorPuntaje };
}

/* ============================================================
   INTERACCIÓN CON EL DOM Y EVENTOS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  const rangoSelect = document.getElementById('rangoSelect');
  const grupoRangoNumerico = document.getElementById('grupoRangoNumerico');
  const rangoInput = document.getElementById('rangoInput');
  const grupoEntradaLibre = document.getElementById('grupoEntradaLibre');
  const caracteresLibresInput = document.getElementById('caracteresLibresInput');
  const btnConstruir = document.getElementById('btnConstruir');
  const resultadoConjunto = document.getElementById('resultadoConjunto');

  const metodoCifrado = document.getElementById('metodoCifrado');
  const grupoDesplazamiento = document.getElementById('grupoDesplazamiento');
  const desplazamientoInput = document.getElementById('desplazamientoInput');
  const textoCifrarInput = document.getElementById('textoCifrarInput');
  const btnCifrar = document.getElementById('btnCifrar');
  const resultadoCifrado = document.getElementById('resultadoCifrado');

  const textoDescifrarInput = document.getElementById('textoDescifrarInput');
  const btnDescifrar = document.getElementById('btnDescifrar');
  const resultadoDescifrado = document.getElementById('resultadoDescifrado');

  // Alternar visibilidad de campos adicionales
  rangoSelect.addEventListener('change', () => {
    const valor = rangoSelect.value;
    grupoRangoNumerico.style.display = valor === 'rango-ascii' ? 'block' : 'none';
    grupoEntradaLibre.style.display = valor === 'libre' ? 'block' : 'none';
  });

  metodoCifrado.addEventListener('change', () => {
    grupoDesplazamiento.style.display = metodoCifrado.value === 'atbash' ? 'none' : 'block';
  });

  // Construcción del conjunto
  function ejecutarConstruccionConjunto() {
    const seleccion = rangoSelect.value;
    let arreglo = [];

    try {
      if (seleccion === '32-126') {
        arreglo = construirRangoAscii(32, 126);
      } else if (seleccion === '65-90') {
        arreglo = construirRangoAscii(65, 90);
      } else if (seleccion === '97-122') {
        arreglo = construirRangoAscii(97, 122);
      } else if (seleccion === 'es-mayus') {
        arreglo = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      } else if (seleccion === 'es-minus') {
        arreglo = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
      } else if (seleccion === '48-57') {
        arreglo = construirRangoAscii(48, 57);
      } else if (seleccion === 'rango-ascii') {
        const partes = rangoInput.value.trim().split('-');
        const inicio = parseInt(partes[0], 10);
        const fin = parseInt(partes[1], 10);
        if (isNaN(inicio) || isNaN(fin) || inicio < 0 || fin > 255 || inicio >= fin) {
          throw new Error('Rango ASCII inválido. Use el formato inicio-fin (ej. 32-126), con inicio < fin entre 0 y 255.');
        }
        arreglo = construirRangoAscii(inicio, fin);
      } else if (seleccion === 'libre') {
        const textoEntrada = caracteresLibresInput.value;
        if (!textoEntrada || textoEntrada.length < 2) {
          throw new Error('Ingrese al menos 2 caracteres o símbolos diferentes.');
        }
        arreglo = Array.from(textoEntrada);
      }

      establecerConjunto(arreglo);

      const preview = conjuntoActual.slice(0, 35).join(' ') + (conjuntoActual.length > 35 ? ' ...' : '');

      resultadoConjunto.className = 'resultado-box visible';
      resultadoConjunto.innerHTML = `
        <div class="resultado-cabecera">
          <span>Conjunto configurado</span>
          <span class="tag-metodo">Módulo N = ${conjuntoActual.length}</span>
        </div>
        <div class="resultado-salida">${preview}</div>
      `;

      desplazamientoInput.max = conjuntoActual.length - 1;

    } catch (error) {
      conjuntoActual = null;
      mapaIndices = null;
      resultadoConjunto.className = 'resultado-box error visible';
      resultadoConjunto.textContent = 'Error: ' + error.message;
    }
  }

  btnConstruir.addEventListener('click', ejecutarConstruccionConjunto);

  // Inicialización por defecto
  ejecutarConstruccionConjunto();

  // Acción Cifrar
  btnCifrar.addEventListener('click', () => {
    if (!conjuntoActual) {
      resultadoCifrado.className = 'resultado-box error visible';
      resultadoCifrado.textContent = 'Error: Primero defina el conjunto de caracteres en la sección 1.';
      return;
    }

    const texto = textoCifrarInput.value;
    if (!texto) {
      resultadoCifrado.className = 'resultado-box error visible';
      resultadoCifrado.textContent = 'Error: Ingrese un texto para cifrar.';
      return;
    }

    const metodo = metodoCifrado.value;
    let salida = '';
    let detalleClave = '';

    if (metodo === 'cesar') {
      const k = parseInt(desplazamientoInput.value, 10);
      if (isNaN(k) || k <= 0) {
        resultadoCifrado.className = 'resultado-box error visible';
        resultadoCifrado.textContent = 'Error: Ingrese un desplazamiento numérico mayor a 0.';
        return;
      }
      if (k % conjuntoActual.length === 0) {
        resultadoCifrado.className = 'resultado-box error visible';
        resultadoCifrado.textContent = `Aviso: Un desplazamiento de ${k} equivale a 0 en módulo ${conjuntoActual.length}. El texto no cambia.`;
        return;
      }
      salida = cifrarCesar(texto, conjuntoActual, k);
      detalleClave = `César (k = ${k % conjuntoActual.length})`;
    } else {
      salida = cifrarAtbash(texto, conjuntoActual);
      detalleClave = 'Atbash';
    }

    resultadoCifrado.className = 'resultado-box visible';
    resultadoCifrado.innerHTML = `
      <div class="resultado-cabecera">
        <span>Resultado del cifrado:</span>
        <span class="tag-metodo">${detalleClave}</span>
      </div>
      <div class="resultado-salida">${salida}</div>
      <div class="btn-group">
        <button id="btnCopiarCifrado" class="btn-secondary btn-sm">Copiar</button>
        <button id="btnPasarADescifrar" class="btn-secondary btn-sm">Cargar en descifrado</button>
      </div>
    `;

    document.getElementById('btnCopiarCifrado').addEventListener('click', () => {
      navigator.clipboard.writeText(salida).then(() => {
        const btn = document.getElementById('btnCopiarCifrado');
        btn.textContent = 'Copiado';
        setTimeout(() => { btn.textContent = 'Copiar'; }, 1500);
      });
    });

    document.getElementById('btnPasarADescifrar').addEventListener('click', () => {
      textoDescifrarInput.value = salida;
      resultadoDescifrado.className = 'resultado-box';
      textoDescifrarInput.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Acción Descifrar (Al-Kindi)
  btnDescifrar.addEventListener('click', () => {
    if (!conjuntoActual) {
      resultadoDescifrado.className = 'resultado-box error visible';
      resultadoDescifrado.textContent = 'Error: Primero defina el conjunto de caracteres en la sección 1.';
      return;
    }

    const textoCifrado = textoDescifrarInput.value;
    if (!textoCifrado) {
      resultadoDescifrado.className = 'resultado-box error visible';
      resultadoDescifrado.textContent = 'Error: Ingrese el texto cifrado a descifrar.';
      return;
    }

    const resultado = descifrarAutomatico(textoCifrado, conjuntoActual);

    let etiqueta = resultado.metodo;
    if (resultado.metodo === 'César') {
      etiqueta += ` (k = ${resultado.modulo})`;
    }

    resultadoDescifrado.className = 'resultado-box visible';
    resultadoDescifrado.innerHTML = `
      <div class="resultado-cabecera">
        <span>Resultado del descifrado (Al-Kindi):</span>
        <span class="tag-metodo">${etiqueta}</span>
      </div>
      <div class="resultado-salida">${resultado.texto}</div>
      <div class="btn-group">
        <button id="btnCopiarDescifrado" class="btn-secondary btn-sm">Copiar</button>
      </div>
    `;

    document.getElementById('btnCopiarDescifrado').addEventListener('click', () => {
      navigator.clipboard.writeText(resultado.texto).then(() => {
        const btn = document.getElementById('btnCopiarDescifrado');
        btn.textContent = 'Copiado';
        setTimeout(() => { btn.textContent = 'Copiar'; }, 1500);
      });
    });
  });

});