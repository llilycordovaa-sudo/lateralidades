// 🎨 Error Creativo - Plataforma Educativa Interactiva
// Sistema de navegación y funcionalidades principales

// Estado global de la aplicación
const AppState = {
    currentView: 'vista-modelo',
    drawings: {},
    currentDrawing: null,
    isDrawing: false,
    currentColor: '#2563eb',
    currentBrushSize: 5,
    canvas: null,
    ctx: null
};

// 🎯 SISTEMA DE NAVEGACIÓN
function showView(targetView) {
    console.log(`🔄 Cambiando a vista: ${targetView}`);
    
    // Ocultar todas las vistas
    const allViews = document.querySelectorAll('.vista');
    console.log(`👀 Ocultando ${allViews.length} vistas`);
    
    allViews.forEach(view => {
        view.style.display = 'none';
        view.classList.remove('active');
        console.log(`➖ Ocultando vista: ${view.id}`);
    });
    
    // Mostrar la vista target
    const targetViewElement = document.getElementById(targetView);
    if (targetViewElement) {
        targetViewElement.style.display = 'block';
        targetViewElement.classList.add('active');
        console.log(`✅ Mostrando vista: ${targetView}`);
        
        // Actualizar estado
        AppState.currentView = targetView;
        updateNavButtons(targetView);
        
        // Ejecutar funciones específicas de la vista
        initializeViewSpecific(targetView);
    } else {
        console.error(`❌ No se encontró la vista: ${targetView}`);
    }
}

function updateNavButtons(activeView) {
    console.log(`🎯 Actualizando botones para vista: ${activeView}`);
    
    // Actualizar botones desktop
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        const target = button.dataset.target;
        if (target === activeView) {
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            console.log(`✅ Botón desktop activo: ${target}`);
        } else {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Actualizar botones mobile
    const navButtonsMobile = document.querySelectorAll('.nav-btn-mobile');
    navButtonsMobile.forEach(button => {
        const target = button.dataset.target;
        if (target === activeView) {
            button.classList.add('active');
            console.log(`✅ Botón mobile activo: ${target}`);
        } else {
            button.classList.remove('active');
        }
    });
}

function initializeNavigation() {
    console.log('🚀 Inicializando sistema de navegación...');
    
    // Botones de navegación desktop
    const navButtons = document.querySelectorAll('.nav-btn');
    console.log(`🔍 Botones desktop encontrados: ${navButtons.length}`);
    
    navButtons.forEach((button, index) => {
        const target = button.dataset.target;
        console.log(`📋 Configurando botón desktop ${index + 1}: ${target}`);
        
        // Remover listeners existentes
        button.removeEventListener('click', handleNavClick);
        
        // Agregar nuevo listener
        button.addEventListener('click', handleNavClick);
        
        console.log(`✅ Listener agregado a botón desktop: ${target}`);
    });
    
    // Botones de navegación mobile
    const navButtonsMobile = document.querySelectorAll('.nav-btn-mobile');
    console.log(`🔍 Botones mobile encontrados: ${navButtonsMobile.length}`);
    
    navButtonsMobile.forEach((button, index) => {
        const target = button.dataset.target;
        console.log(`📋 Configurando botón mobile ${index + 1}: ${target}`);
        
        // Remover listeners existentes
        button.removeEventListener('click', handleNavClick);
        
        // Agregar nuevo listener
        button.addEventListener('click', handleNavClick);
        
        console.log(`✅ Listener agregado a botón mobile: ${target}`);
    });
}

function handleNavClick(event) {
    event.preventDefault();
    const targetView = this.dataset.target;
    console.log(`🖱️ Click detectado en botón: ${targetView}`);
    showView(targetView);
}

// 🎨 SISTEMA DE CANVAS
function initializeCanvas() {
    const canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    
    AppState.canvas = canvas;
    AppState.ctx = canvas.getContext('2d');
    
    // Configurar canvas
    resizeCanvas();
    setupCanvasEvents();
    
    console.log('🎨 Canvas inicializado');
}

function resizeCanvas() {
    if (!AppState.canvas) return;
    
    const rect = AppState.canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    
    AppState.canvas.width = rect.width * scale;
    AppState.canvas.height = rect.height * scale;
    
    AppState.ctx.scale(scale, scale);
    AppState.canvas.style.width = rect.width + 'px';
    AppState.canvas.style.height = rect.height + 'px';
}

function setupCanvasEvents() {
    if (!AppState.canvas) return;
    
    // Mouse events
    AppState.canvas.addEventListener('mousedown', startDrawing);
    AppState.canvas.addEventListener('mousemove', draw);
    AppState.canvas.addEventListener('mouseup', stopDrawing);
    AppState.canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    AppState.canvas.addEventListener('touchstart', handleTouch);
    AppState.canvas.addEventListener('touchmove', handleTouch);
    AppState.canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    AppState.isDrawing = true;
    const posicion = obtenerPosicionPrecisa(e, AppState.canvas);
    
    AppState.ctx.beginPath();
    AppState.ctx.moveTo(posicion.x, posicion.y);
}

function draw(e) {
    if (!AppState.isDrawing) return;
    
    const posicion = obtenerPosicionPrecisa(e, AppState.canvas);
    
    AppState.ctx.lineWidth = AppState.currentBrushSize;
    AppState.ctx.lineCap = 'round';
    AppState.ctx.strokeStyle = AppState.currentColor;
    
    AppState.ctx.lineTo(posicion.x, posicion.y);
    AppState.ctx.stroke();
}

function stopDrawing() {
    AppState.isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    AppState.canvas.dispatchEvent(mouseEvent);
}

function clearCanvas() {
    if (AppState.ctx) {
        AppState.ctx.clearRect(0, 0, AppState.canvas.width, AppState.canvas.height);
    }
}

// 🏗️ INICIALIZACIÓN DE VISTAS ESPECÍFICAS
function initializeViewSpecific(viewId) {
    console.log(`🔧 Inicializando vista específica: ${viewId}`);
    
    switch(viewId) {
        case 'vista-modelo':
            initializeModeloView();
            break;
        case 'vista-guia':
            initializeGuiaView();
            break;
        case 'vista-laboratorio':
            initializeLaboratorio();
            break;
        case 'vista-galeria':
            initializeGaleriaView();
            break;
    }
}

function initializeModeloView() {
    console.log('📊 Inicializando vista Modelo');
    // Configuración específica del modelo
}

function initializeGuiaView() {
    console.log('📖 Inicializando vista Guía');
    // Configuración específica de la guía
}

function initializeLaboratorio() {
    console.log('🧪 Inicializando vista Laboratorio');
    if (typeof window.initializeLaboratorioCreativo === 'function') {
        console.log('✅ Llamando a initializeLaboratorioCreativo()');
        window.initializeLaboratorioCreativo();
    } else {
        console.error('❌ initializeLaboratorioCreativo no está disponible');
        console.log('Funciones disponibles:', Object.keys(window).filter(k => k.includes('laboratorio')));
    }
}

function initializeGaleriaView() {
    console.log('🖼️ Inicializando vista Galería');
    // Configuración específica de la galería
}

// 🛠️ UTILIDADES
function generatePDF() {
    console.log('📄 Generando PDF...');
    // Implementar generación de PDF
}

function showNotification(message, type = 'info') {
    console.log(`📢 Notificación [${type}]: ${message}`);
    // Implementar sistema de notificaciones
}

// 🧪 FUNCIONES DE DEBUG
window.testNavigation = function() {
    console.log('🧪 Probando navegación manualmente...');
    
    const vistas = ['vista-modelo', 'vista-guia', 'vista-laboratorio', 'vista-galeria'];
    
    vistas.forEach((vistaId, index) => {
        setTimeout(() => {
            console.log(`🔄 Cambiando a ${vistaId}...`);
            showView(vistaId);
        }, index * 2000);
    });
};

window.testButton = function(targetVista) {
    console.log(`🎯 Probando botón para ${targetVista}...`);
    const button = document.querySelector(`[data-target="${targetVista}"]`);
    console.log('Botón encontrado:', button);
    if (button) {
        button.click();
        console.log('Click simulado ejecutado');
    } else {
        console.error(`❌ No se encontró botón para ${targetVista}`);
    }
};

// Función para probar todas las vistas automáticamente
window.testAllViews = function() {
    console.log('🧪 Probando todas las vistas automáticamente...');
    const vistas = ['vista-modelo', 'vista-guia', 'vista-laboratorio', 'vista-galeria'];
    
    vistas.forEach((vistaId, index) => {
        setTimeout(() => {
            console.log(`🔄 Probando vista ${index + 1}/4: ${vistaId}...`);
            showView(vistaId);
        }, index * 3000);
    });
};

window.debugState = function() {
    console.log('🔍 Estado actual de la aplicación:');
    console.log('Vista actual:', AppState.currentView);
    console.log('Vistas disponibles:', document.querySelectorAll('.vista').length);
    console.log('Botones desktop disponibles:', document.querySelectorAll('.nav-btn').length);
    console.log('Botones mobile disponibles:', document.querySelectorAll('.nav-btn-mobile').length);
    
    // Verificar qué vista está actualmente visible
    const vistas = document.querySelectorAll('.vista');
    vistas.forEach(vista => {
        const isVisible = vista.style.display !== 'none' && vista.classList.contains('active');
        console.log(`Vista ${vista.id}: ${isVisible ? 'VISIBLE' : 'OCULTA'}`);
    });
};

// 🚀 INICIALIZACIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Error Creativo - Iniciando aplicación...');
    
    // Test que las vistas existen
    const vistas = document.querySelectorAll('.vista');
    console.log('🔍 Vistas encontradas:', vistas.length);
    vistas.forEach((vista, i) => {
        console.log(`Vista ${i + 1}: ${vista.id}`);
    });
    
    // Test que los botones existen
    const botones = document.querySelectorAll('.nav-btn');
    const botonesMobile = document.querySelectorAll('.nav-btn-mobile');
    console.log('🔍 Botones desktop encontrados:', botones.length);
    console.log('🔍 Botones mobile encontrados:', botonesMobile.length);
    
    botones.forEach((btn, i) => {
        console.log(`Botón desktop ${i + 1}: ${btn.dataset.target}`);
    });
    
    botonesMobile.forEach((btn, i) => {
        console.log(`Botón mobile ${i + 1}: ${btn.dataset.target}`);
    });
    
    // Inicializar navegación
    initializeNavigation();
    
    // Mostrar vista inicial
    showView('vista-modelo');
    
    // Configurar resize del canvas
    window.addEventListener('resize', resizeCanvas);
    
    console.log('✅ Aplicación inicializada correctamente');
    
    // Agregar funciones globales para debug
    window.showView = showView;
    window.AppState = AppState;
});