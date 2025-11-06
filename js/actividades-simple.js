/**
 * ================================================
 * SISTEMA DE ACTIVIDADES INTERACTIVAS - VERSIÓN SIMPLE
 * ================================================
 * Sistema básico de actividades pedagógicas que FUNCIONA
 * Sin mejoras complejas, solo lo esencial
 */

// Estado global simple
const ActividadState = {
    actividadActual: null,
    faseActual: 0,
    canvas: null,
    ctx: null,
    colorActual: '#ff6b6b',
    tamañoActual: 3
};

// Configuración básica de actividades
const ACTIVIDADES_CONFIG = {
    actividad1: {
        titulo: "🎭 Somos Manchas que se Mueven",
        subtitulo: "Una aventura de transformación creativa",
        descripcion: "Descubre personajes mágicos en manchas y dales vida a través del movimiento y la imaginación",
        totalFases: 4,
        temaColor: 'from-purple-500 to-pink-500'
    },
    actividad2: {
        titulo: "🏠 El Lugar que me Habita",
        subtitulo: "Construyendo espacios del corazón",
        descripcion: "Explora la conexión entre emociones y espacios através del dibujo reflexivo",
        totalFases: 4,
        temaColor: 'from-blue-500 to-cyan-500'
    },
    actividad3: {
        titulo: "🎨 Resignificación del Error",
        subtitulo: "Transformando lo inesperado en arte",
        descripcion: "Convierte accidentes creativos en oportunidades de descubrimiento artístico",
        totalFases: 4,
        temaColor: 'from-green-500 to-emerald-500'
    },
    actividad4: {
        titulo: "👥 Retrato Colectivo",
        subtitulo: "Creando identidades compartidas",
        descripcion: "Explora la diversidad através de la creación colaborativa de retratos",
        totalFases: 4,
        temaColor: 'from-orange-500 to-red-500'
    }
};

/**
 * FUNCIÓN PRINCIPAL - MOSTRAR ACTIVIDAD
 * Esta es la función que llaman los botones "Comenzar Aventura"
 */
function mostrarActividad(numeroActividad) {
    console.log(`🎯 Iniciando actividad ${numeroActividad}`);
    
    // Verificar que la actividad existe
    const actividadKey = `actividad${numeroActividad}`;
    const configActividad = ACTIVIDADES_CONFIG[actividadKey];
    
    if (!configActividad) {
        console.error(`Actividad ${numeroActividad} no encontrada`);
        return;
    }
    
    // Cambiar a la vista del laboratorio
    mostrarVistaLaboratorio();
    
    // Generar contenido de la actividad
    generarContenidoActividad(numeroActividad, configActividad);
    
    // Actualizar estado
    ActividadState.actividadActual = numeroActividad;
    ActividadState.faseActual = 1;
}

/**
 * Mostrar la vista del laboratorio
 */
function mostrarVistaLaboratorio() {
    // Ocultar todas las vistas
    const vistas = document.querySelectorAll('[id^="vista-"]');
    vistas.forEach(vista => {
        vista.style.display = 'none';
    });
    
    // Mostrar vista laboratorio
    const vistaLab = document.getElementById('vista-laboratorio');
    if (vistaLab) {
        vistaLab.style.display = 'block';
    }
    
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const btnLab = document.querySelector('[data-target="vista-laboratorio"]');
    if (btnLab) btnLab.classList.add('active');
}

/**
 * Generar contenido HTML de la actividad
 */
function generarContenidoActividad(numero, config) {
    const container = document.getElementById('lab-content-container') || 
                     document.getElementById('laboratorio-container') || 
                     document.querySelector('#vista-laboratorio .container');
    
    if (!container) {
        console.error('No se encontró contenedor del laboratorio');
        return;
    }
    
    // Ocultar selector de actividades si existe
    const selector = document.getElementById('activity-selection-container');
    if (selector) selector.style.display = 'none';
    
    // HTML de la actividad
    container.innerHTML = `
        <div class="actividad-container" style="max-width: 1200px; margin: 0 auto;">
            <!-- Header de la actividad -->
            <div class="actividad-header" style="background: linear-gradient(135deg, ${config.temaColor}); color: white; padding: 40px; border-radius: 20px 20px 0 0; text-align: center;">
                <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 16px;">${config.titulo}</h1>
                <p style="font-size: 1.2rem; opacity: 0.9; margin-bottom: 20px;">${config.subtitulo}</p>
                <p style="font-size: 1rem; opacity: 0.8;">${config.descripcion}</p>
                <button onclick="volverMenuActividades()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: bold; margin-top: 20px;">
                    ← Volver al Menú
                </button>
            </div>
            
            <!-- Contenido principal -->
            <div class="actividad-contenido" style="background: white; padding: 40px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                
                <!-- Área de dibujo -->
                <div class="canvas-area" style="background: #f8f9fa; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <h3 style="text-align: center; color: #333; margin-bottom: 20px;">🎨 Área de Creación</h3>
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <canvas id="canvas-actividad-${numero}" 
                                width="800" height="500" 
                                style="border: 2px solid #ddd; border-radius: 10px; background: white; max-width: 100%; cursor: crosshair;">
                        </canvas>
                    </div>
                    
                    <!-- Controles básicos -->
                    <div class="controles-canvas" style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <label style="font-weight: bold;">Color:</label>
                            <input type="color" id="color-picker-${numero}" value="#ff6b6b" style="width: 40px; height: 40px; border: none; border-radius: 5px; cursor: pointer;">
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <label style="font-weight: bold;">Tamaño:</label>
                            <input type="range" id="size-slider-${numero}" min="1" max="20" value="3" style="width: 100px;">
                            <span id="size-display-${numero}" style="font-weight: bold; width: 30px;">3px</span>
                        </div>
                        <button onclick="limpiarCanvas(${numero})" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                            🗑️ Limpiar
                        </button>
                        <button onclick="descargarDibujo(${numero})" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                            💾 Guardar
                        </button>
                    </div>
                </div>
                
                <!-- Instrucciones simples -->
                <div class="instrucciones" style="background: linear-gradient(135deg, #e3f2fd, #f3e5f5); border-radius: 15px; padding: 25px; text-align: center;">
                    <h4 style="color: #1976d2; margin-bottom: 15px;">📋 Instrucciones</h4>
                    <p style="color: #1976d2; font-size: 1.1rem; line-height: 1.6; margin: 0;">
                        ¡Bienvenido a la <strong>${config.titulo}</strong>! 
                        Usa el canvas arriba para crear libremente. Experimenta con diferentes colores y tamaños de pincel. 
                        No hay reglas estrictas, solo deja fluir tu creatividad.
                    </p>
                </div>
                
            </div>
        </div>
    `;
    
    // Configurar el canvas después de un momento
    setTimeout(() => {
        configurarCanvas(numero);
    }, 100);
}

/**
 * Configurar canvas para dibujo básico
 */
function configurarCanvas(numero) {
    const canvas = document.getElementById(`canvas-actividad-${numero}`);
    const colorPicker = document.getElementById(`color-picker-${numero}`);
    const sizeSlider = document.getElementById(`size-slider-${numero}`);
    const sizeDisplay = document.getElementById(`size-display-${numero}`);
    
    if (!canvas) {
        console.warn(`Canvas para actividad ${numero} no encontrado`);
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    // Configuración del canvas
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Eventos de dibujo
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });
    
    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            ctx.strokeStyle = colorPicker.value;
            ctx.lineWidth = sizeSlider.value;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });
    
    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });
    
    canvas.addEventListener('mouseout', function() {
        isDrawing = false;
    });
    
    // Actualizar display del tamaño
    sizeSlider.addEventListener('input', function() {
        sizeDisplay.textContent = this.value + 'px';
    });
    
    // Guardar referencias
    ActividadState.canvas = canvas;
    ActividadState.ctx = ctx;
    
    console.log(`✅ Canvas configurado para actividad ${numero}`);
}

/**
 * Limpiar canvas
 */
function limpiarCanvas(numero) {
    const canvas = document.getElementById(`canvas-actividad-${numero}`);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(`Canvas ${numero} limpiado`);
    }
}

/**
 * Descargar dibujo
 */
function descargarDibujo(numero) {
    const canvas = document.getElementById(`canvas-actividad-${numero}`);
    if (canvas) {
        const link = document.createElement('a');
        link.download = `actividad-${numero}-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        console.log(`Dibujo de actividad ${numero} descargado`);
    }
}

/**
 * Volver al menú de actividades
 */
function volverMenuActividades() {
    const container = document.getElementById('lab-content-container') || 
                     document.getElementById('laboratorio-container') || 
                     document.querySelector('#vista-laboratorio .container');
    
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <h2 style="font-size: 2.5rem; font-weight: bold; color: #333; margin-bottom: 20px;">🎨 Laboratorio Creativo</h2>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 40px;">Selecciona una actividad para comenzar tu aventura creativa</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; max-width: 1000px; margin: 0 auto;">
                
                <div class="actividad-card" style="background: linear-gradient(135deg, #a855f7, #ec4899); color: white; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s; box-shadow: 0 10px 25px rgba(168,85,247,0.3);" onclick="mostrarActividad(1)" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🎭</div>
                    <h3 style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">Actividad 1</h3>
                    <p style="opacity: 0.9; margin: 0; font-size: 0.95rem;">Somos Manchas que se Mueven</p>
                </div>
                
                <div class="actividad-card" style="background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s; box-shadow: 0 10px 25px rgba(59,130,246,0.3);" onclick="mostrarActividad(2)" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🏠</div>
                    <h3 style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">Actividad 2</h3>
                    <p style="opacity: 0.9; margin: 0; font-size: 0.95rem;">El Lugar que me Habita</p>
                </div>
                
                <div class="actividad-card" style="background: linear-gradient(135deg, #10b981, #34d399); color: white; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s; box-shadow: 0 10px 25px rgba(16,185,129,0.3);" onclick="mostrarActividad(3)" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🎨</div>
                    <h3 style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">Actividad 3</h3>
                    <p style="opacity: 0.9; margin: 0; font-size: 0.95rem;">Resignificación del Error</p>
                </div>
                
                <div class="actividad-card" style="background: linear-gradient(135deg, #f97316, #ef4444); color: white; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s; box-shadow: 0 10px 25px rgba(249,115,22,0.3);" onclick="mostrarActividad(4)" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 15px;">👥</div>
                    <h3 style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">Actividad 4</h3>
                    <p style="opacity: 0.9; margin: 0; font-size: 0.95rem;">Retrato Colectivo</p>
                </div>
                
            </div>
            
            <div style="background: #e8f4fd; border: 2px solid #3b82f6; border-radius: 15px; padding: 25px; margin-top: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
                <h4 style="color: #1e40af; font-weight: bold; margin-bottom: 10px;">✨ Sistema Simplificado</h4>
                <p style="color: #1e40af; margin: 0; line-height: 1.5;">
                    Versión básica y funcional. Cada actividad incluye un canvas para dibujar libremente 
                    con controles simples de color y tamaño.
                </p>
            </div>
        </div>
    `;
    
    // Mostrar el selector si existe
    const selector = document.getElementById('activity-selection-container');
    if (selector) selector.style.display = 'block';
    
    console.log('Volviendo al menú de actividades');
}

/**
 * FUNCIÓN DE INICIALIZACIÓN
 * Se ejecuta cuando se carga el sistema
 */
function iniciarSistemaActividades() {
    console.log('🎨 Sistema de actividades simple iniciado');
    
    // Asegurar que la función mostrarActividad esté disponible globalmente
    window.mostrarActividad = mostrarActividad;
    window.volverMenuActividades = volverMenuActividades;
    window.limpiarCanvas = limpiarCanvas;
    window.descargarDibujo = descargarDibujo;
    
    console.log('✅ Funciones globales configuradas');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', iniciarSistemaActividades);

// También inicializar inmediatamente si el DOM ya está listo
if (document.readyState !== 'loading') {
    iniciarSistemaActividades();
}