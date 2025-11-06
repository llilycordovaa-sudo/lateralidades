/**
 * SISTEMA BÁSICO DE ACTIVIDADES - SOLO FUNCIONALIDAD ESENCIAL
 * Sin complicaciones, solo lo necesario para que funcione
 */

// Configuración ultra-simple de actividades
const ACTIVIDADES = {
    1: {
        titulo: "🎭 Somos Manchas que se Mueven",
        descripcion: "Una aventura de transformación creativa"
    },
    2: {
        titulo: "🏠 El Lugar que me Habita", 
        descripcion: "Construyendo espacios del corazón"
    },
    3: {
        titulo: "🎨 Resignificación del Error",
        descripcion: "Transformando lo inesperado en arte"
    },
    4: {
        titulo: "👥 Retrato Colectivo",
        descripcion: "Creando identidades compartidas"
    }
};

/**
 * FUNCIÓN PRINCIPAL - La que llaman los botones
 */
function mostrarActividad(numero) {
    console.log(`Mostrando actividad ${numero}`);
    
    // Encontrar el contenedor
    let container = document.getElementById('lab-content-container');
    if (!container) {
        container = document.getElementById('laboratorio-container');
        if (!container) {
            const vista = document.getElementById('vista-laboratorio');
            if (vista) {
                container = vista.querySelector('.container') || vista;
            }
        }
    }
    
    if (!container) {
        console.error('No se encontró contenedor');
        return;
    }
    
    // Mostrar la vista del laboratorio
    const vistas = document.querySelectorAll('[id^="vista-"]');
    vistas.forEach(v => v.style.display = 'none');
    
    const vistaLab = document.getElementById('vista-laboratorio');
    if (vistaLab) vistaLab.style.display = 'block';
    
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const btnLab = document.querySelector('[data-target="vista-laboratorio"]');
    if (btnLab) btnLab.classList.add('active');
    
    // Ocultar selector si existe
    const selector = document.getElementById('activity-selection-container');
    if (selector) selector.style.display = 'none';
    
    // Mostrar la actividad
    const actividad = ACTIVIDADES[numero];
    if (actividad) {
        container.innerHTML = generarHTMLActividad(numero, actividad);
        setTimeout(() => configurarCanvas(numero), 100);
    }
}

/**
 * Generar HTML de la actividad
 */
function generarHTMLActividad(numero, actividad) {
    const colores = {
        1: 'linear-gradient(135deg, #a855f7, #ec4899)',
        2: 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
        3: 'linear-gradient(135deg, #10b981, #34d399)',
        4: 'linear-gradient(135deg, #f97316, #ef4444)'
    };
    
    return `
        <div style="max-width: 1000px; margin: 0 auto; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: ${colores[numero]}; color: white; padding: 40px; border-radius: 20px 20px 0 0; text-align: center;">
                <h1 style="font-size: 2.5rem; font-weight: bold; margin: 0 0 15px 0;">${actividad.titulo}</h1>
                <p style="font-size: 1.2rem; margin: 0 0 20px 0; opacity: 0.9;">${actividad.descripcion}</p>
                <button onclick="volverMenu()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: bold;">
                    ← Volver al Menú
                </button>
            </div>
            
            <!-- Contenido -->
            <div style="padding: 40px;">
                
                <!-- Mensaje de éxito -->
                <div style="background: #d4edda; border: 2px solid #28a745; border-radius: 10px; padding: 20px; margin-bottom: 30px; text-align: center;">
                    <h3 style="color: #155724; margin: 0 0 10px 0;">✅ ¡Actividad ${numero} Cargada!</h3>
                    <p style="color: #155724; margin: 0;">
                        Bienvenido a "${actividad.titulo}". Todo está funcionando correctamente.
                    </p>
                </div>
                
                <!-- Canvas -->
                <div style="background: #f8f9fa; border-radius: 15px; padding: 30px; text-align: center;">
                    <h3 style="color: #333; margin: 0 0 20px 0;">🎨 Área de Dibujo</h3>
                    
                    <canvas id="canvas-${numero}" width="700" height="400" 
                            style="border: 2px solid #ddd; border-radius: 10px; background: white; max-width: 100%; cursor: crosshair;">
                    </canvas>
                    
                    <!-- Controles -->
                    <div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <label style="font-weight: bold;">Color:</label>
                            <input type="color" id="color-${numero}" value="#ff6b6b" style="width: 40px; height: 40px; border: none; border-radius: 5px;">
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <label style="font-weight: bold;">Tamaño:</label>
                            <input type="range" id="size-${numero}" min="1" max="20" value="5" style="width: 100px;">
                            <span id="size-display-${numero}" style="font-weight: bold;">5px</span>
                        </div>
                        <button onclick="limpiar(${numero})" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                            🗑️ Limpiar
                        </button>
                        <button onclick="descargar(${numero})" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                            💾 Guardar
                        </button>
                    </div>
                </div>
                
                <!-- Instrucciones simples -->
                <div style="background: #e3f2fd; border-radius: 15px; padding: 25px; margin-top: 30px; text-align: center;">
                    <h4 style="color: #1565c0; margin: 0 0 15px 0;">📝 Instrucciones</h4>
                    <p style="color: #1565c0; margin: 0; line-height: 1.6;">
                        Usa el mouse para dibujar en el canvas. Cambia colores y tamaños como desees. 
                        ¡Deja fluir tu creatividad!
                    </p>
                </div>
                
            </div>
        </div>
    `;
}

/**
 * Configurar canvas para dibujo
 */
function configurarCanvas(numero) {
    const canvas = document.getElementById(`canvas-${numero}`);
    const colorInput = document.getElementById(`color-${numero}`);
    const sizeInput = document.getElementById(`size-${numero}`);
    const sizeDisplay = document.getElementById(`size-display-${numero}`);
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let dibujando = false;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Eventos de dibujo
    canvas.onmousedown = function(e) {
        dibujando = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    };
    
    canvas.onmousemove = function(e) {
        if (dibujando) {
            ctx.strokeStyle = colorInput.value;
            ctx.lineWidth = sizeInput.value;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    };
    
    canvas.onmouseup = function() {
        dibujando = false;
    };
    
    canvas.onmouseout = function() {
        dibujando = false;
    };
    
    // Actualizar display del tamaño
    sizeInput.oninput = function() {
        sizeDisplay.textContent = this.value + 'px';
    };
    
    console.log(`Canvas ${numero} configurado`);
}

/**
 * Limpiar canvas
 */
function limpiar(numero) {
    const canvas = document.getElementById(`canvas-${numero}`);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Descargar dibujo
 */
function descargar(numero) {
    const canvas = document.getElementById(`canvas-${numero}`);
    if (canvas) {
        const link = document.createElement('a');
        link.download = `actividad-${numero}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }
}

/**
 * Volver al menú
 */
function volverMenu() {
    let container = document.getElementById('lab-content-container');
    if (!container) {
        container = document.getElementById('laboratorio-container');
        if (!container) {
            const vista = document.getElementById('vista-laboratorio');
            if (vista) {
                container = vista.querySelector('.container') || vista;
            }
        }
    }
    
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <h2 style="font-size: 2.5rem; color: #333; margin-bottom: 20px;">🎨 Laboratorio Creativo</h2>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 40px;">Selecciona una actividad</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; max-width: 900px; margin: 0 auto;">
                
                <button onclick="mostrarActividad(1)" style="background: linear-gradient(135deg, #a855f7, #ec4899); color: white; border: none; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🎭</div>
                    <h3 style="margin: 0 0 5px 0;">Actividad 1</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Somos Manchas que se Mueven</p>
                </button>
                
                <button onclick="mostrarActividad(2)" style="background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; border: none; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🏠</div>
                    <h3 style="margin: 0 0 5px 0;">Actividad 2</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">El Lugar que me Habita</p>
                </button>
                
                <button onclick="mostrarActividad(3)" style="background: linear-gradient(135deg, #10b981, #34d399); color: white; border: none; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🎨</div>
                    <h3 style="margin: 0 0 5px 0;">Actividad 3</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Resignificación del Error</p>
                </button>
                
                <button onclick="mostrarActividad(4)" style="background: linear-gradient(135deg, #f97316, #ef4444); color: white; border: none; border-radius: 20px; padding: 30px; cursor: pointer; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 3rem; margin-bottom: 10px;">👥</div>
                    <h3 style="margin: 0 0 5px 0;">Actividad 4</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Retrato Colectivo</p>
                </button>
                
            </div>
            
            <div style="background: #f0f9ff; border: 2px solid #0284c7; border-radius: 15px; padding: 20px; margin-top: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                <p style="color: #0369a1; margin: 0; font-weight: bold;">✅ Sistema Básico Funcional</p>
                <p style="color: #0369a1; margin: 5px 0 0 0; font-size: 0.9rem;">Todas las actividades están disponibles</p>
            </div>
        </div>
    `;
    
    // Mostrar selector si existe
    const selector = document.getElementById('activity-selection-container');
    if (selector) selector.style.display = 'block';
}

// Hacer funciones globales
window.mostrarActividad = mostrarActividad;
window.volverMenu = volverMenu;
window.limpiar = limpiar;
window.descargar = descargar;

// Inicializar
console.log('Sistema básico de actividades cargado');

// Si el DOM ya está listo, ejecutar inmediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM listo - Sistema funcional');
} else {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM cargado - Sistema funcional');
    });
}