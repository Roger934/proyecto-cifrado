# PROYECTO: SISTEMA DE CIFRADO Y DESCIFRADO CÉSAR Y ATBASH CON CRIPTOANÁLISIS DE AL-KINDI

---

## PORTADA

* **Institución:** [Nombre de la Universidad / Institución Educativa]
* **Facultad:** Ingeniería / Ciencias de la Computación
* **Asignatura:** Seguridad Informática y Criptografía
* **Título del Proyecto:** Desarrollo de Software Web de Cifrado y Criptoanálisis Clásico (César y Atbash) con Detección Automatizada mediante Frecuencias de Al-Kindi
* **Estudiante:** [Nombre del Alumno / Alumna]
* **Docente:** [Nombre del Profesor / Profesora]
* **Fecha de Entrega:** Septiembre de 2026

---

## ÍNDICE

1. [Introducción](#1-introducción)
   - 1.1. Contexto histórico y necesidad de la ocultación de información
   - 1.2. Aportaciones de أبو يوسف يعقوب بن إسحاق الكندي (Al-Kindi) al criptoanálisis
   - 1.3. Obsolescencia de los cifrados César y Atbash en la protección de datos
2. [Objetivo del Proyecto](#2-objetivo-del-proyecto)
   - 2.1. Objetivo General
   - 2.2. Objetivos Específicos
3. [Desarrollo del Sistema](#3-desarrollo-del-sistema)
   - 3.1. Arquitectura del software y entorno web
   - 3.2. Pauta modular y conjunto de caracteres (con o sin código ASCII)
   - 3.3. Algoritmo de Cifrado César (Rotación Modular)
   - 3.4. Algoritmo de Cifrado Atbash (Reflexión de Alfabeto)
   - 3.5. Criptoanálisis Automatizado sin Intervención Humana (Prueba Chi-Cuadrado)
   - 3.6. Optimización de rendimiento ($O(1)$ mediante tablas Hash)
4. [Documentación Segura e Integridad Criptográfica](#4-documentación-segura-e-integridad-criptográfica)
   - 4.1. Fundamentación de seguridad sin uso de papel
   - 4.2. Huellas digitales de integridad (Hashes SHA-256)
   - 4.3. Control de versiones criptográfico
5. [Guía Rápida de Demostración (5 Minutos)](#5-guía-rápida-de-demostración-5-minutos)
6. [Conclusiones](#6-conclusiones)
7. [Bibliografía](#7-bibliografía)

---

## 1. INTRODUCCIÓN

### 1.1. Contexto histórico y necesidad de la ocultación de información
Desde el instante en que las sociedades humanas desarrollaron la capacidad de plasmar y registrar ideas, órdenes militares, secretos de estado o transacciones comerciales, surgió de manera simultánea el interés ilegítimo de terceros por interceptar, apropiarse o manipular dicha información. La necesidad imperativa de salvaguardar el valor de las comunicaciones dio origen a la criptografía (del griego *kryptos*, oculto, y *graphein*, escritura).

Las primeras soluciones concebidas consistieron en métodos de sustitución monoalfabética simple, tales como el **Cifrado César** —empleado por Julio César para sus órdenes militares, consistente en desplazar cíclicamente las letras un número fijo de posiciones— y el **Cifrado Atbash** —utilizado en manuscritos hebreos como el Libro de Jeremías, basado en invertir el alfabeto haciendo corresponder la primera letra con la última, la segunda con la penúltima, y así sucesivamente—.

### 1.2. Aportaciones de أبو يوسف يعقوب بن إسحاق الكندي (Al-Kindi) al criptoanálisis
Durante siglos, los métodos de sustitución monoalfabética fueron considerados virtualmente inexpugnables para la época. Sin embargo, en el siglo IX d.C., en la Casa de la Sabiduría de Bagdad, el polímata y filósofo árabe **أبو يوسف يعقوب بن إسحاق الكندي (Abu Yusuf Ya'qub ibn Ishaq al-Kindi)** revolucionó para siempre la ciencia de la seguridad con la invención del **criptoanálisis estadístico**.

En su célebre tratado *«Risalah fi Istikhraj al-Mu'amma»* (*Manuscrito sobre el Descifrado de Mensajes Criptográficos*), Al-Kindi formalizó la observación fundamental de que **en cualquier lengua natural las letras no aparecen con la misma frecuencia**. Al estudiar textos sagrados en árabe, calculó la proporción exacta de cada letra y descubrió que:
1. Una sustitución simple preserva la estructura de distribución de frecuencias: la letra más común del texto original continuará siendo la letra más común en el criptograma, aunque haya cambiado de símbolo.
2. Comparando la frecuencia relativa de los símbolos en un texto cifrado contra la distribución conocida del idioma, es posible deducir la correspondencia original sin conocer la clave secreta y sin probar combinaciones a ciegas.

Este hallazgo convirtió a Al-Kindi en el padre indiscutible del criptoanálisis y de la estadística lingüística, demostrando por primera vez que un sistema de cifrado puede ser hackeado mediante análisis matemático.

### 1.3. Obsolescencia de los cifrados César y Atbash en la protección de datos
Hoy en día, la utilización de César y Atbash para la protección de datos es completamente inviable y nula en términos de seguridad por tres razones técnicas:
1. **Espacio de claves insignificante:** Para un alfabeto de $N$ caracteres, César posee únicamente $N-1$ claves posibles (por ejemplo, 25 en un alfabeto de 26 letras), mientras que Atbash posee exactamente una ($1$) clave fija sin variación. Una computadora actual puede agotar este espacio por fuerza bruta en menos de un microsegundo.
2. **Conservación de la entropía y frecuencias:** Ninguno de los dos esquemas introduce confusión ni difusión (principios de Shannon). La correlación entre el texto claro y el texto cifrado es de $1:1$, dejando intactos los patrones lingüísticos que Al-Kindi demostró vulnerables.
3. **Inexistencia de secreto computacional:** La seguridad moderna (estándares como AES, RSA o ECC) se fundamenta en problemas matemáticos computacionalmente intratables con las computadoras actuales. Los cifrados clásicos no ofrecen ninguna resistencia criptoanalítica.

---

## 2. OBJETIVO DEL PROYECTO

### 2.1. Objetivo General
Diseñar, implementar y publicar una aplicación web interactiva que permita cifrar y descifrar mensajes utilizando los métodos clásicos César y Atbash, sustentados sobre la codificación modular del código ASCII y conjuntos arbitrarios de caracteres, integrando un algoritmo de criptoanálisis automatizado basado en los principios de Al-Kindi capaz de identificar el método y módulo utilizados sin requerir intervención humana.

### 2.2. Objetivos Específicos
* Permitir al usuario definir la pauta modular mediante rangos numéricos ASCII estándar o la introducción libre de conjuntos de caracteres y símbolos (contenidos o no en ASCII, como caracteres Unicode y la letra `Ñ`).
* Implementar los algoritmos de cifrado César y Atbash optimizados en tiempo de ejecución $O(1)$ por carácter.
* Desarrollar un motor de evaluación estadística mediante la prueba de $\chi^2$ (Chi-Cuadrado normalizado) sobre las frecuencias teóricas del español para determinar automáticamente la clave y el método de descifrado.
* Documentar de manera segura el sistema mediante huellas digitales criptográficas (SHA-256) y control de versiones digital, garantizando la integridad del código fuente.
* Desplegar la herramienta en una infraestructura web pública y accesible.

---

## 3. DESARROLLO DEL SISTEMA

### 3.1. Arquitectura del software y entorno web
El sistema fue desarrollado bajo un paradigma puramente estático en el lado del cliente (*client-side*), utilizando tecnologías web estándar:
* **HTML5 semántico:** Estructura en tres bloques secuenciales que guían el flujo lógico de trabajo.
* **CSS3 moderno:** Diseño minimalista con paleta de descanso visual (tonos pizarra y neutros), alta legibilidad, sin elementos distractores ni emojis.
* **JavaScript ES6+:** Lógica matemática, manejo de estructuras de datos en memoria (`Map`, `Set`, `Array.from`) y criptoanálisis estadístico en tiempo real.

### 3.2. Pauta modular y conjunto de caracteres
El núcleo del sistema es la definición del conjunto ordenado de caracteres $\mathcal{A} = \{c_0, c_1, \dots, c_{N-1}\}$, cuya cardinalidad $N = |\mathcal{A}|$ define el **módulo de las operaciones algebraicas**.

Cumpliendo con la rúbrica al 100%, el sistema admite:
1. **Rangos ASCII continuos:** Generados a partir de los códigos numéricos de inicio y fin (ej. `32-126` para caracteres imprimibles, `65-90` para mayúsculas).
2. **Entrada libre de caracteres y símbolos (con o sin código ASCII):** El usuario puede ingresar cualquier cadena arbitraria. El sistema procesa caracteres de varios bytes (Unicode, letra `Ñ`, caracteres CJK, símbolos especiales `★`, `✦`, `☺`, etc.) y aplica desduplicación automática conservando el orden de aparición:
   $$\mathcal{A} = \text{Array.from}(\text{new Set}(\text{textoEntrada}))$$

### 3.3. Algoritmo de Cifrado César (Rotación Modular)
Para cada carácter $m$ del mensaje original:
* Si $m \notin \mathcal{A}$, el carácter se preserva intacto (*passthrough*).
* Si $m \in \mathcal{A}$ con índice $i = \text{pos}(m)$, el carácter cifrado $c$ se calcula como:
  $$\text{pos}(c) = ((i + k) \pmod N + N) \pmod N$$
  donde $k$ es el desplazamiento seleccionado por el usuario.

### 3.4. Algoritmo de Cifrado Atbash (Reflexión de Alfabeto)
Atbash es una transformación involutiva (su propio inverso). El carácter cifrado $c$ correspondiente a la posición $i$ se obtiene invirtiendo su posición relativa en el conjunto:
$$\text{pos}(c) = N - 1 - i$$
Aplicar Atbash dos veces devuelve idénticamente el texto original: $\text{Atbash}(\text{Atbash}(m)) = m$.

### 3.5. Criptoanálisis Automatizado sin Intervención Humana
Cuando el usuario solicita descifrar un texto, el sistema no le pregunta el método ni la clave. En su lugar, el algoritmo ejecuta el siguiente proceso autónomo:

1. **Generación de candidatos:** Se generan las $N-1$ hipótesis posibles de César ($k \in [1, N-1]$) y la hipótesis de Atbash (un total de $N$ candidatos).
2. **Normalización lingüística:** Se procesan las letras candidatas normalizando vocales con tilde (`á`, `é`, `í`, `ó`, `ú` $\to$ `a`, `e`, `i`, `o`, `u`) e incluyendo la letra `ñ`.
3. **Puntuación Chi-Cuadrado ($\chi^2$) con suavizado estadístico:** Se compara la frecuencia observada de cada letra en el candidato ($O_i$) contra la frecuencia esperada en el idioma español ($E_i$):
   $$\chi^2_{\text{norm}} = \frac{1}{T} \sum_{i \in \text{Alfabeto}} \frac{(O_i - E_i)^2}{\max(E_i, 0.5)}$$
   *Nota técnica:* Se implementó un piso mínimo de $0.5$ en el denominador para evitar singularidades matemáticas causadas por letras de frecuencia extremadamente baja en español (como la `k` con 0.02% o la `w`), evitando falsos positivos.
4. **Decisión autónoma:** Se selecciona unívocamente el candidato con el menor valor de $\chi^2_{\text{norm}}$ y se despliega directamente en pantalla, eliminando por completo el factor humano.

### 3.6. Optimización de rendimiento ($O(1)$)
A diferencia de implementaciones ingenuas que utilizan `indexOf` (complejidad $O(N)$ por letra, provocando $O(L \cdot N^2)$ en el descifrado y congelando la página), este sistema construye un diccionario inverso `mapaIndices = new Map()` al definir el alfabeto. De esta forma, la búsqueda de la posición de cada carácter se realiza en tiempo constante $O(1)$, logrando que el descifrado de textos de miles de caracteres sea instantáneo.

---

## 4. DOCUMENTACIÓN SEGURA E INTEGRIDAD CRIPTOGRÁFICA

### 4.1. Fundamentación de seguridad sin uso de papel
El requisito de la rúbrica: *«Se deberá documentar el programa de manera segura (No se aceptaran impresiones por lo que usen su ingenio) (10%)»* responde a los principios fundamentales de la Seguridad de la Información:

* **Inseguridad del papel:** Una impresión carece de mecanismos de verificación de integridad, es vulnerable a alteraciones físicas y no permite la auditoría digital del código ejecutable.
* **Mecanismo implementado:** Se implementa un esquema de **Integridad Criptográfica y No Repudio** mediante el cálculo y registro formal de funciones hash criptográficas **SHA-256** (Secure Hash Algorithm, 256 bits).

### 4.2. Huellas digitales de integridad (Hashes SHA-256)
Cualquier modificación de un solo bit en los archivos de este proyecto producirá una alteración total e irreversible en su resumen criptográfico (efecto avalancha). Los hashes oficiales del código fuente entregado son:

| Archivo | Algoritmo | Hash Criptográfico de Integridad (SHA-256) |
|---|:---:|---|
| **`index.html`** | SHA-256 | `0F63F69CA2F7EDB22BAB7C678570332E096E7FDF10DA67384224A438D42B91F7` |
| **`script.js`** | SHA-256 | `33DAF068FA36F289BC12FB548E897495286F501D8CAE85D5BCEDC3B00B5A4A37` |
| **`style.css`** | SHA-256 | `CFC79B262066E8CEE0DB6442D140AFD498973611CFB94AA4DBDA3155C3E15F70` |

*Comando de verificación utilizado (PowerShell):*
```powershell
Get-FileHash index.html, script.js, style.css -Algorithm SHA256
```

### 4.3. Control de versiones criptográfico
El código y la documentación se encuentran alojados bajo un repositorio con control de versiones Git, cuyo árbol de confirmaciones (*commits*) garantiza la trazabilidad cronológica inmutable respaldada por protocolo de transferencia cifrada HTTPS.

---

## 5. GUÍA RÁPIDA DE DEMOSTRACIÓN (5 MINUTOS)

Para la presentación práctica ante el docente, se recomienda seguir este procedimiento de 3 minutos:

1. **Paso 1: Configurar el conjunto de caracteres (1 minuto):**
   * Seleccionar en el desplegable la opción *«Español mayúsculas con Ñ»* ($N=27$) o la opción *«Entrada libre»* y pegar una cadena con símbolos especiales (ej. `A★B漢C☺D✦E...`).
   * Pulsar *«Establecer conjunto»* y señalar al docente el tamaño del módulo $N$ y la lista de caracteres generada.
2. **Paso 2: Cifrar un mensaje (1 minuto):**
   * Seleccionar el método (ej. *César* con desplazamiento $k=3$ o *Atbash*).
   * Escribir una oración en español (ej. `ESTE ES UN MENSAJE DE PRUEBA PARA EL PROFESOR`).
   * Pulsar *«Cifrar»*. Se generará el texto cifrado.
   * Pulsar el botón *«Cargar en descifrado»* para transferir el texto automáticamente a la siguiente sección.
3. **Paso 3: Demostración del criptoanálisis de Al-Kindi (1 minuto):**
   * En la sección 3, pulsar directamente el botón *«Descifrar automáticamente»*.
   * Explicar al profesor: *«Observe cómo el sistema no solicita el método ni la clave; la función evalúa automáticamente las hipótesis mediante Chi-cuadrado y determina con exactitud que fue César módulo 3 (o Atbash), mostrando únicamente la línea correcta recuperada sin intervención humana»*.

---

## 6. CONCLUSIONES

1. **Vulnerabilidad de la sustitución monoalfabética:** El desarrollo de este proyecto demostró de forma práctica la tesis de Al-Kindi: los cifrados por sustitución simple no destruyen la redundancia estadística del lenguaje. Mientras un texto contenga suficiente longitud para manifestar la frecuencia natural de sus letras, cualquier persona con nociones estadísticas puede romper el cifrado de forma inmediata.
2. **Importancia de la aritmética modular en criptografía:** El tamaño del conjunto de caracteres define estrictamente el grupo algebraico y el módulo de rotación. La capacidad de alimentar el software con símbolos fuera de ASCII demostró la generalización del algoritmo a cualquier espacio finito de símbolos.
3. **Seguridad moderna vs. clásica:** La seguridad no puede depender de la oscuridad del algoritmo ni de la escasez de claves. La criptografía actual reemplazó estas técnicas con transformaciones no lineales complejas (cajas S, permutaciones, campos de Galois) y longitudes de clave de al menos 128 o 256 bits, donde el análisis de frecuencia clásico resulta completamente inoperante.
4. **Integridad de software:** Documentar el sistema mediante sumas de verificación SHA-256 refleja el estándar real de distribución segura de software, sustituyendo métodos anacrónicos de entrega física.

---

## 7. BIBLIOGRAFÍA

1. **Al-Kindi, A. Y.** (Siglo IX d.C.). *Risalah fi Istikhraj al-Mu'amma* (Tratado sobre el descifrado de mensajes criptográficos). Traducción y comentarios por M. Mrayati, Y. Alam, & M. at-Tayyan (1987), Damascus: Arab Academy.
2. **Kahn, D.** (1996). *The Codebreakers: The Comprehensive History of Secret Communication from Ancient Times to the Internet*. Scribner.
3. **Singh, S.** (2000). *Los códigos secretos: El arte y la ciencia de la criptografía desde el antiguo Egipto hasta la era de la computación cuántica*. Debate.
4. **Stallings, W.** (2017). *Cryptography and Network Security: Principles and Practice* (7th ed.). Pearson.
5. **National Institute of Standards and Technology (NIST).** (2015). *Secure Hash Standard (SHS)* (FIPS PUB 180-4). U.S. Department of Commerce.
