# Sistema de Cifrado y Descifrado (César / Atbash) con Criptoanálisis de Al-Kindi

Aplicación web desarrollada para el cifrado y descifrado clásico utilizando los métodos **César** (rotación modular) y **Atbash** (reflexión de alfabeto), con un motor de criptoanálisis autónomo inspirado en las técnicas de **أبو يوسف يعقوب بن إسحاق الكندي (Al-Kindi)**.

El sistema identifica automáticamente el método y el módulo utilizado mediante análisis de frecuencias ($\chi^2$), mostrando únicamente la línea descifrada correcta sin requerir intervención humana.

---

## Características Principales

1. **Definición Flexible del Conjunto de Caracteres (Pauta y Módulo N):**
   * Soporta rangos numéricos continuos en código ASCII estándar (ej. `32-126`, `65-90`, `97-122`).
   * **Entrada libre de caracteres:** Permite ingresar cualquier conjunto arbitrario de símbolos contenidos o no en el código ASCII (incluyendo la letra **`Ñ`**, caracteres Unicode, caracteres CJK/kanjis, emoticones y símbolos especiales).
   * Desduplicación automática y cálculo dinámico del módulo $N$.
2. **Cifrado César y Atbash Optimizado:**
   * Búsqueda en tiempo constante **$O(1)$** por carácter mediante tablas hash (`Map`), evitando cuelgues o congelamiento del navegador en textos largos.
   * Manejo estricto de caracteres fuera del conjunto (*passthrough*).
3. **Criptoanálisis Estadístico Automatizado de Al-Kindi:**
   * Generación exhaustiva de las $N$ hipótesis posibles (las $N-1$ rotaciones de César y la hipótesis de Atbash).
   * Evaluación de frecuencia relativa contra el corpus del idioma español (`FREQ_ES`), incluyendo normalización de tildes y reconocimiento de la letra `ñ`.
   * **Chi-Cuadrado ($\chi^2$) normalizado con suavizado estadístico:** Evita distorsiones y falsos positivos causados por letras de frecuencia ultra-baja como `k` o `w`.
4. **Diseño Visual Limpio y Descansado:**
   * Interfaz minimalista en tonos pizarra neutros para evitar fatiga visual.
   * Sin elementos distractores ni emojis.
   * Acciones rápidas de un clic para copiar resultados y transferir textos entre secciones.

---

## Documentación Segura e Integridad (SHA-256)

En estricto apego al requisito de la rúbrica de **documentar el software de manera segura sin uso de impresiones**, se provee la huella digital criptográfica oficial (**SHA-256**) de los archivos fuente que componen esta entrega. Cualquier modificación no autorizada de un solo carácter invalidará estos resúmenes:

| Archivo | Algoritmo | Hash Criptográfico SHA-256 |
|---|:---:|---|
| **`index.html`** | SHA-256 | `0F63F69CA2F7EDB22BAB7C678570332E096E7FDF10DA67384224A438D42B91F7` |
| **`script.js`** | SHA-256 | `33DAF068FA36F289BC12FB548E897495286F501D8CAE85D5BCEDC3B00B5A4A37` |
| **`style.css`** | SHA-256 | `CFC79B262066E8CEE0DB6442D140AFD498973611CFB94AA4DBDA3155C3E15F70` |

*Para verificar los hashes en PowerShell:*
```powershell
Get-FileHash index.html, script.js, style.css -Algorithm SHA256
```

Para consultar el reporte formal completo (con Portada, Índice, Desarrollo teórico detallado, Conclusiones y Bibliografía en formato APA), consulte el archivo [`DOCUMENTACION.md`](DOCUMENTACION.md).

---

## Ejecución Local

1. Clonar o descargar este repositorio en su equipo:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-cifrado.git
   ```
2. Abrir el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. No requiere servidor local ni instalación de dependencias externas.