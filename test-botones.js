// Script de prueba para verificar botones
// Copia y pega esto en la consola del navegador

console.log('=== TEST DE BOTONES ===');

// 1. Verificar que las funciones existen
console.log('1. Funciones disponibles:');
console.log('   - window.siguienteFaseActividad:', typeof window.siguienteFaseActividad);
console.log('   - window.anteriorFaseActividad:', typeof window.anteriorFaseActividad);
console.log('   - window.celebrarLogro:', typeof window.celebrarLogro);
console.log('   - window.completarActividad:', typeof window.completarActividad);

// 2. Verificar que los botones existen en el DOM
console.log('\n2. Botones en el DOM:');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnAnterior = document.getElementById('btn-anterior');
const btnCelebrar = document.querySelector('.btn-celebracion');
const btnTerminar = document.getElementById('btn-siguiente');

console.log('   - Botón Siguiente:', btnSiguiente ? '✅ Encontrado' : '❌ No encontrado');
console.log('   - Botón Anterior:', btnAnterior ? '✅ Encontrado' : '❌ No encontrado');
console.log('   - Botón Celebrar:', btnCelebrar ? '✅ Encontrado' : '❌ No encontrado');

// 3. Verificar event listeners
if (btnSiguiente) {
    console.log('\n3. Probando clic en botón Siguiente...');
    btnSiguiente.click();
}

// 4. Probar funciones directamente
console.log('\n4. Probando funciones directamente:');
if (typeof window.celebrarLogro === 'function') {
    console.log('   Ejecutando window.celebrarLogro()...');
    window.celebrarLogro();
}

console.log('\n=== FIN DEL TEST ===');
