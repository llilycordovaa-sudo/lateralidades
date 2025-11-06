/**
 * ================================================
 * SISTEMA DE ACTIVIDADES INTERACTIVAS
 * ================================================
 * Sistema completo de actividades pedagógicas interactivas
 * basado en el método "Error Creativo" con narrativa inmersiva
 */

// Estado global para actividades interactivas
const ActividadState = {
    actividadActual: null,
    faseActual: 0,
    progreso: {},
    dibujos: {},
    reflexiones: {},
    emociones: {},
    canvas: null,
    ctx: null,
    herramientaActual: 'pincel',
    colorActual: '#ff6b6b',
    tamañoActual: 3,
    modoActual: 'dibujar'
};

// Estado de meditación
const MeditacionState = {
    activa: false,
    pausada: false,
    indiceActual: 0,
    timeoutId: null,
    textos: [],
    cancelarVoz: false
};

/**
 * ========================================
 * SISTEMA DE HERRAMIENTAS SIMPLE Y FUNCIONAL
 * (DEBE ESTAR AL INICIO PARA QUE ESTÉ DISPONIBLE INMEDIATAMENTE)
 * ========================================
 */

// Estado global de herramientas
window.EstadoHerramientas = {
    herramientaActual: 'pincel-solido',
    color: '#8B5CF6',
    tamano: 12,
    opacidad: 0.8,
    dibujando: false,
    lastX: 0,
    lastY: 0
};

// Función SIMPLE para seleccionar herramienta
window.seleccionarHerramientaAvanzada = function(herramienta) {
    console.log('✅ Herramienta seleccionada:', herramienta);
    
    window.EstadoHerramientas.herramientaActual = herramienta;
    
    // Remover selección visual anterior
    document.querySelectorAll('.herramienta-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-blue-500', 'scale-105');
    });
    
    // Agregar selección visual al botón clickeado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('ring-4', 'ring-blue-500', 'scale-105');
    }
    
    // Inicializar canvas si no está inicializado
    setTimeout(() => {
        if (window.inicializarCanvasSimple) {
            window.inicializarCanvasSimple();
        }
    }, 50);
};

// Función para inicializar el canvas
window.inicializarCanvasSimple = function() {
    const canvas = document.getElementById('canvas-mancha-personal');
    if (!canvas) {
        console.warn('❌ Canvas no encontrado');
        return;
    }
    
    // Verificar si ya tiene listeners
    if (canvas.dataset.inicializado === 'true') {
        console.log('✅ Canvas ya inicializado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const estado = window.EstadoHerramientas;
    
    console.log('🎨 Inicializando canvas para dibujo...');
    
    // Funciones de dibujo
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }
    
    function iniciarDibujo(e) {
        estado.dibujando = true;
        const pos = getMousePos(e);
        estado.lastX = pos.x;
        estado.lastY = pos.y;
        console.log('🖱️ Inicio dibujo - Color actual:', estado.color);
    }
    
    function dibujar(e) {
        if (!estado.dibujando) return;
        
        const pos = getMousePos(e);
        const herramienta = estado.herramientaActual;
        
        // CRÍTICO: Establecer el color del estado global DIRECTAMENTE
        const colorActual = estado.color;
        
        // Resetear propiedades del contexto CADA VEZ
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = estado.opacidad;
        ctx.lineWidth = estado.tamano;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Aplicar color EXPLÍCITAMENTE antes de cada operación
        ctx.strokeStyle = colorActual;
        ctx.fillStyle = colorActual;
        
        // Aplicar herramienta según tipo
        switch(herramienta) {
            case 'pincel-solido':
                // Pincel sólido - trazo suave continuo
                ctx.beginPath();
                ctx.moveTo(estado.lastX, estado.lastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                break;
                
            case 'aerografo':
                // Aerógrafo - efecto spray con partículas dispersas
                const numParticulas = 30;
                const radioSpray = estado.tamano * 2;
                for(let i = 0; i < numParticulas; i++) {
                    const angulo = Math.random() * Math.PI * 2;
                    const distancia = Math.random() * radioSpray;
                    const offsetX = Math.cos(angulo) * distancia;
                    const offsetY = Math.sin(angulo) * distancia;
                    ctx.globalAlpha = Math.random() * 0.2;
                    ctx.fillRect(pos.x + offsetX, pos.y + offsetY, 1, 1);
                }
                ctx.globalAlpha = estado.opacidad;
                break;
                
            case 'textura':
                // Textura - puntos y manchas irregulares
                for(let i = 0; i < 15; i++) {
                    const offsetX = (Math.random() - 0.5) * estado.tamano * 3;
                    const offsetY = (Math.random() - 0.5) * estado.tamano * 3;
                    const tamañoPunto = Math.random() * 4 + 1;
                    ctx.globalAlpha = Math.random() * 0.6;
                    ctx.beginPath();
                    ctx.arc(pos.x + offsetX, pos.y + offsetY, tamañoPunto, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = estado.opacidad;
                break;
                
            case 'caligrafia':
                // Caligrafía - trazo con variación de grosor
                const distancia = Math.sqrt(Math.pow(pos.x - estado.lastX, 2) + Math.pow(pos.y - estado.lastY, 2));
                const grosorVariable = estado.tamano * (0.3 + distancia * 0.05);
                ctx.lineWidth = Math.min(grosorVariable, estado.tamano * 2);
                ctx.beginPath();
                ctx.moveTo(estado.lastX, estado.lastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                ctx.lineWidth = estado.tamano;
                break;
                
            case 'difumino':
                // Difumino - trazo suave y difuminado
                ctx.shadowBlur = 15;
                ctx.shadowColor = colorActual;
                ctx.globalAlpha = 0.4;
                for(let i = 0; i < 3; i++) {
                    const offsetX = (Math.random() - 0.5) * estado.tamano;
                    const offsetY = (Math.random() - 0.5) * estado.tamano;
                    ctx.beginPath();
                    ctx.arc(pos.x + offsetX, pos.y + offsetY, estado.tamano * 0.8, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.shadowBlur = 0;
                ctx.globalAlpha = estado.opacidad;
                break;
                
            case 'acuarela':
                // Acuarela - efecto translúcido con manchas
                ctx.globalAlpha = 0.15;
                for(let i = 0; i < 12; i++) {
                    const offsetX = (Math.random() - 0.5) * estado.tamano * 4;
                    const offsetY = (Math.random() - 0.5) * estado.tamano * 4;
                    const radio = Math.random() * estado.tamano + estado.tamano * 0.5;
                    ctx.beginPath();
                    ctx.arc(pos.x + offsetX, pos.y + offsetY, radio, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = estado.opacidad;
                break;
                
            case 'relleno':
                // Bote de pintura - pintar en área circular grande
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, estado.tamano * 3, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'gradiente-lineal':
                // Gradiente lineal - trazo con gradiente
                const gradient = ctx.createLinearGradient(estado.lastX, estado.lastY, pos.x, pos.y);
                gradient.addColorStop(0, colorActual);
                gradient.addColorStop(1, 'transparent');
                ctx.strokeStyle = gradient;
                ctx.lineWidth = estado.tamano * 2;
                ctx.beginPath();
                ctx.moveTo(estado.lastX, estado.lastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                break;
                
            case 'gradiente-radial':
                // Gradiente radial - círculo con gradiente
                const radialGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, estado.tamano * 2);
                radialGradient.addColorStop(0, colorActual);
                radialGradient.addColorStop(1, 'transparent');
                ctx.fillStyle = radialGradient;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, estado.tamano * 2, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'borrador':
                // Borrador - eliminar trazos
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, estado.tamano * 1.5, 0, Math.PI * 2);
                ctx.fill();
                // IMPORTANTE: Resetear el modo de composición inmediatamente
                ctx.globalCompositeOperation = 'source-over';
                break;
                
            default:
                ctx.beginPath();
                ctx.moveTo(estado.lastX, estado.lastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
        }
        
        estado.lastX = pos.x;
        estado.lastY = pos.y;
    }
    
    function terminarDibujo() {
        if (estado.dibujando) {
            console.log('✅ Fin de dibujo');
        }
        estado.dibujando = false;
        ctx.beginPath();
    }
    
    // Agregar event listeners
    canvas.addEventListener('mousedown', iniciarDibujo);
    canvas.addEventListener('mousemove', dibujar);
    canvas.addEventListener('mouseup', terminarDibujo);
    canvas.addEventListener('mouseout', terminarDibujo);
    
    // Marcar como inicializado
    canvas.dataset.inicializado = 'true';
    
    console.log('✅ Canvas inicializado y listo para dibujar');
};

// Función SIMPLE para seleccionar color
window.seleccionarColor = function(color) {
    console.log('✅ Color seleccionado:', color);
    window.EstadoHerramientas.color = color;
    
    // Actualizar el selector de color principal
    const selectorColor = document.getElementById('color-principal');
    if (selectorColor) {
        selectorColor.value = color;
    }
    
    // Remover selección visual anterior de los botones de color
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-offset-2', 'ring-blue-500');
    });
    
    // Agregar selección visual al botón de color clickeado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('ring-4', 'ring-offset-2', 'ring-blue-500');
    }
    
    console.log('🎨 Color actualizado en estado:', window.EstadoHerramientas.color);
};

console.log('✅ Sistema de herramientas simple inicializado AL INICIO');

// Exportar función de generador de inspiración
window.generarPalabraInspiracion = function(categoria) {
    const palabras = {
        sensorial: ['suave', 'áspero', 'cálido', 'fresco', 'húmedo', 'seco', 'rugoso', 'sedoso', 'pegajoso', 'esponjoso'],
        emocional: ['nostalgia', 'alegría', 'melancolía', 'esperanza', 'serenidad', 'euforia', 'ternura', 'asombro', 'gratitud', 'libertad'],
        visual: ['dorado', 'azul profundo', 'verde esmeralda', 'rosa suave', 'púrpura intenso', 'círculos', 'líneas curvas', 'texturas', 'sombras', 'brillos'],
        sonoro: ['susurro', 'eco', 'murmullo', 'tintineo', 'crujido', 'melodía', 'silencio', 'resonancia', 'armonía', 'vibración']
    };
    
    const listaPalabras = palabras[categoria] || palabras.emocional;
    const palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    
    const palabraDiv = document.getElementById('palabra-inspiracion');
    const palabraGenerada = document.getElementById('palabra-generada');
    
    if (palabraDiv && palabraGenerada) {
        palabraGenerada.textContent = palabra;
        palabraDiv.classList.remove('hidden');
        
        // Efecto de aparición
        palabraDiv.style.opacity = '0';
        setTimeout(() => {
            palabraDiv.style.opacity = '1';
        }, 100);
    }
    
    console.log(`✨ Palabra de inspiración generada: "${palabra}" (${categoria})`);
};

console.log('✅ Generador de inspiración exportado');

// Exportar funciones de navegación
window.siguienteFaseActividad = function() {
    console.log('🚀 siguienteFaseActividad ejecutada');
    console.log('Estado actual:', ActividadState);
    
    const actividad = ACTIVIDADES_CONFIG[ActividadState.actividadActual];
    if (!actividad) {
        console.error('❌ No se encontró la actividad');
        return;
    }
    
    console.log('✅ Actividad encontrada:', actividad.titulo);
    
    // Limpiar cámara si está activa (específico para autorretrato)
    if (typeof window.limpiarCamaraAutorretrato === 'function') {
        window.limpiarCamaraAutorretrato();
    }
    
    // Guardar datos de la fase actual antes de avanzar
    if (typeof guardarDatosFaseActual === 'function') {
        guardarDatosFaseActual();
    }
    
    if (ActividadState.faseActual < actividad.totalFases - 1) {
        ActividadState.faseActual++;
        console.log('➡️ Avanzando a fase:', ActividadState.faseActual);
        if (typeof mostrarFaseActividad === 'function') {
            mostrarFaseActividad(ActividadState.actividadActual, ActividadState.faseActual);
        }
    } else {
        console.log('🎉 Última fase alcanzada, completando actividad...');
        
        // Guardar datos finales
        if (typeof guardarDatosFaseActual === 'function') {
            guardarDatosFaseActual();
        }
        
        // Mostrar mensaje de completación
        alert('¡Felicidades! Has completado la actividad.');
        
        // Regresar al menú
        if (typeof regresarAlMenuPrincipal === 'function') {
            regresarAlMenuPrincipal();
        } else {
            window.location.href = 'index.html';
        }
    }
};

window.anteriorFaseActividad = function() {
    console.log('⬅️ Intentando navegar a fase anterior...');
    
    if (ActividadState.faseActual > 0) {
        ActividadState.faseActual--;
        console.log('⬅️ Retrocediendo a fase:', ActividadState.faseActual);
        if (typeof mostrarFaseActividad === 'function') {
            mostrarFaseActividad(ActividadState.actividadActual, ActividadState.faseActual);
        }
    } else {
        console.log('⚠️ Ya estás en la primera fase');
    }
};

console.log('✅ Funciones de navegación exportadas');

// Inicializar canvas automáticamente cuando esté disponible
setTimeout(() => {
    const canvas = document.getElementById('canvas-mancha-personal');
    if (canvas && window.inicializarCanvasSimple) {
        console.log('🎨 Canvas encontrado, inicializando automáticamente...');
        window.inicializarCanvasSimple();
    }
}, 1000);

// ================================================
// FUNCIONES DE DEMOS Y EJERCICIOS CORPORALES
// ================================================
// Estas funciones deben estar ANTES de ACTIVIDADES_CONFIG
// porque se llaman desde el HTML generado dinámicamente

function hacerConDemo(index, nombre) {
    const ejercicios = [
        {
            nombre: "Mancha que Crece",
            descripcion: "Comienza pequeño y crece gradualmente",
            animacion: "crecer"
        },
        {
            nombre: "Mancha que se Derrite",
            descripcion: "Movimiento fluido hacia abajo",
            animacion: "derretir"
        },
        {
            nombre: "Mancha que Baila",
            descripcion: "Movimientos alegres y saltarines",
            animacion: "bailar"
        },
        {
            nombre: "Transformación Mágica",
            descripcion: "Cambios de forma constantes",
            animacion: "transformar"
        }
    ];
    
    const ejercicio = ejercicios[index] || ejercicios[0];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.id = 'modal-ejercicio-' + index;
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-lg mx-4">
            <h3 class="text-xl font-bold mb-4">🎯 ${ejercicio.nombre} - ¡Hazlo mientras miras!</h3>
            <p class="text-gray-600 mb-6">${ejercicio.descripcion}</p>
            
            <div class="demo-container bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                <canvas id="demo-canvas" width="300" height="200" class="border-2 border-dashed border-purple-300 rounded-lg bg-white mx-auto block"></canvas>
                <div class="text-center mt-4">
                    <div id="contador-tiempo" class="text-lg font-bold text-purple-700 mb-2">⏱️ 10s</div>
                    <button id="play-demo" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                        ▶️ Comenzar Demo y Ejercicio (10s)
                    </button>
                </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-bold text-blue-700 mb-2">💡 Instrucciones:</h4>
                <p class="text-blue-600 text-sm">Cuando presiones "Comenzar", el demo se ejecutará automáticamente. ¡Observa los movimientos de la manchita e imítalos con tu cuerpo durante los 10 segundos! Al terminar, regresarás automáticamente a los ejercicios.</p>
            </div>
            
            <div class="flex gap-3">
                <button onclick="cerrarModalEjercicio(${index})" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                    ❌ Cerrar
                </button>
                <button id="salir-rapido" onclick="cerrarModalEjercicio(${index})" class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" style="display: none;">
                    🚪 Salir del Ejercicio
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        iniciarAnimacionDemoLenta(ejercicio.animacion, index);
    }, 100);
}

function cerrarModalEjercicio(index) {
    const modal = document.getElementById('modal-ejercicio-' + index);
    if (modal) {
        modal.remove();
        console.log('Modal de ejercicio cerrado manualmente');
    } else {
        const modales = document.querySelectorAll('.fixed.inset-0');
        modales.forEach(modal => modal.remove());
        console.log('Todos los modales cerrados');
    }
}

function iniciarAnimacionDemoLenta(tipo, index) {
    const canvas = document.getElementById('demo-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animacionActiva = false;
    let frameCount = 0;
    let tiempoInicio = 0;
    const DURACION_TOTAL = 10000;
    
    let mancha = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radio: 20,
        color: '#8b5cf6',
        forma: 'circulo'
    };
    
    const playBtn = document.getElementById('play-demo');
    
    function dibujarManchita() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = mancha.color;
        ctx.beginPath();
        
        switch (mancha.forma) {
            case 'circulo':
                ctx.arc(mancha.x, mancha.y, mancha.radio, 0, Math.PI * 2);
                break;
            case 'oval':
                ctx.ellipse(mancha.x, mancha.y, mancha.radio, mancha.radio * 0.6, 0, 0, Math.PI * 2);
                break;
            case 'gota':
                ctx.arc(mancha.x, mancha.y + 10, mancha.radio * 0.8, 0, Math.PI * 2);
                ctx.arc(mancha.x, mancha.y - 5, mancha.radio * 0.5, 0, Math.PI * 2);
                break;
        }
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(mancha.x - 8, mancha.y - 5, 4, 0, Math.PI * 2);
        ctx.arc(mancha.x + 8, mancha.y - 5, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(mancha.x - 8, mancha.y - 5, 2, 0, Math.PI * 2);
        ctx.arc(mancha.x + 8, mancha.y - 5, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mancha.x, mancha.y + 5, 8, 0, Math.PI);
        ctx.stroke();
    }
    
    function animarSegunTipo() {
        if (!animacionActiva) return;
        
        const tiempoActual = Date.now();
        const tiempoTranscurrido = tiempoActual - tiempoInicio;
        
        const contadorElemento = document.getElementById('contador-tiempo');
        if (contadorElemento) {
            const segundosRestantes = Math.ceil((DURACION_TOTAL - tiempoTranscurrido) / 1000);
            contadorElemento.textContent = `⏱️ ${Math.max(0, segundosRestantes)}s`;
        }
        
        if (tiempoTranscurrido >= DURACION_TOTAL) {
            animacionActiva = false;
            playBtn.disabled = false;
            
            if (contadorElemento) {
                contadorElemento.textContent = '✅ ¡Completado! Cerrando en 2s...';
            }
            
            playBtn.textContent = '🎉 ¡Excelente trabajo!';
            
            const salirRapidoBtn = document.getElementById('salir-rapido');
            if (salirRapidoBtn) salirRapidoBtn.style.display = 'none';
            
            mancha.x = canvas.width / 2;
            mancha.y = canvas.height / 2;
            mancha.radio = 20;
            mancha.color = '#8b5cf6';
            mancha.forma = 'circulo';
            dibujarManchita();
            
            setTimeout(() => {
                let modal = document.getElementById('modal-ejercicio-' + index);
                if (!modal) modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
                if (!modal) modal = document.querySelector('[id^="modal-ejercicio-"]');
                
                if (modal) {
                    modal.remove();
                    console.log('Modal cerrado automáticamente');
                } else {
                    document.querySelectorAll('.fixed.inset-0').forEach(el => el.remove());
                }
            }, 2000);
            
            return;
        }
        
        frameCount++;
        
        switch (tipo) {
            case 'crecer':
                mancha.radio = 20 + Math.sin(frameCount * 0.1) * 15;
                mancha.color = `hsl(${280 + Math.sin(frameCount * 0.05) * 30}, 70%, ${60 + Math.sin(frameCount * 0.1) * 10}%)`;
                break;
            case 'derretir':
                mancha.y = canvas.height / 2 + Math.sin(frameCount * 0.06) * 50;
                mancha.forma = frameCount % 80 < 40 ? 'gota' : 'oval';
                mancha.radio = 25 - Math.abs(Math.sin(frameCount * 0.06)) * 10;
                break;
            case 'bailar':
                mancha.x = canvas.width / 2 + Math.sin(frameCount * 0.12) * 40;
                mancha.y = canvas.height / 2 + Math.cos(frameCount * 0.1) * 30;
                mancha.radio = 20 + Math.sin(frameCount * 0.15) * 8;
                mancha.color = `hsl(${(frameCount * 2) % 360}, 70%, 60%)`;
                break;
            case 'transformar':
                if (frameCount % 120 < 40) {
                    mancha.forma = 'circulo';
                    mancha.radio = 25;
                } else if (frameCount % 120 < 80) {
                    mancha.forma = 'oval';
                    mancha.radio = 30;
                } else {
                    mancha.forma = 'gota';
                    mancha.radio = 20;
                }
                mancha.color = `hsl(${(frameCount * 1.5) % 360}, 70%, 60%)`;
                break;
        }
        
        dibujarManchita();
        
        if (animacionActiva) {
            requestAnimationFrame(animarSegunTipo);
        }
    }
    
    playBtn.addEventListener('click', () => {
        animacionActiva = true;
        frameCount = 0;
        tiempoInicio = Date.now();
        
        const contadorElemento = document.getElementById('contador-tiempo');
        if (contadorElemento) {
            contadorElemento.textContent = '⏱️ 10s';
        }
        
        const salirRapidoBtn = document.getElementById('salir-rapido');
        if (salirRapidoBtn) {
            salirRapidoBtn.style.display = 'block';
        }
        
        const modalElement = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
        const cerrarBtn = modalElement?.querySelector('button[onclick*="cerrarModal"]');
        if (cerrarBtn && !cerrarBtn.id) {
            cerrarBtn.style.display = 'none';
        }
        
        animarSegunTipo();
        playBtn.disabled = true;
        playBtn.textContent = '🎯 ¡En progreso! Imita los movimientos';
    });
    
    dibujarManchita();
}

function completarEjercicio(index) {
    const timerArea = document.getElementById(`timer-${index}`);
    if (timerArea) {
        timerArea.innerHTML = `
            <div class="text-2xl text-green-600 font-bold">✓ ¡Completado!</div>
            <p class="text-green-700">Excelente trabajo explorando el movimiento</p>
        `;
    }
}

function configurarFaseCorporal() {
    console.log('Configurando fase corporal específica');
}

// Exportar funciones globalmente INMEDIATAMENTE
window.hacerConDemo = hacerConDemo;
window.cerrarModalEjercicio = cerrarModalEjercicio;
window.iniciarAnimacionDemoLenta = iniciarAnimacionDemoLenta;
window.completarEjercicio = completarEjercicio;
window.configurarFaseCorporal = configurarFaseCorporal;

/**
 * Obtener posición precisa del mouse/touch en el canvas
 * considerando el escalado CSS vs tamaño real
 */
function obtenerPosicionPrecisa(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    
    // Obtener el factor de escala exacto
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Calcular posición compensando el escalado
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    
    return { x, y };
}

// Exportar función de precisión globalmente
window.obtenerPosicionPrecisa = obtenerPosicionPrecisa;

// Configuración de actividades interactivas
const ACTIVIDADES_CONFIG = {
    actividad1: {
        titulo: "🎭 Somos Manchas que se Mueven",
        subtitulo: "Una aventura de transformación creativa",
        descripcion: "Descubre personajes mágicos en manchas y dales vida a través del movimiento y la imaginación",
        totalFases: 4,
        temaColor: 'from-purple-500 to-pink-500',
        fases: [
            {
                id: 'introduccion',
                titulo: '🌟 Bienvenido a la Aventura de las Manchas',
                tipo: 'intro',
                contenido: {
                    narrativa: "¡Hola aventurero creativo! Hoy vas a vivir una experiencia mágica donde las manchas cobran vida. ¿Estás listo para descubrir los personajes que se esconden en formas inesperadas?",
                    objetivo: "Explorar la creatividad a través de la observación y transformación de manchas en personajes únicos",
                    reglaEspecial: "✨ Regla Mágica: Cada mancha es un tesoro, no hay manchas feas, solo personajes esperando ser descubiertos"
                }
            },
            {
                id: 'exploracion-corporal',
                titulo: '💃 Ser Manchas con el Cuerpo',
                tipo: 'corporal',
                contenido: {
                    narrativa: "Antes de crear manchas con pintura, vamos a SER manchas con nuestro propio cuerpo. Es momento de conectar con la fluidez y libertad que necesitaremos para crear...",
                    objetivo: "Activar el cuerpo y liberar la creatividad a través del movimiento antes de comenzar la creación artística",
                    ejercicios: [
                        {
                            nombre: "Mancha que Crece",
                            instruccion: "Empieza pequeño como una gota y crece hasta ser una mancha gigante que ocupa todo el espacio",
                            duracion: "45 segundos",
                            descripcion: "Comienza en posición fetal y expándete lentamente hasta ocupar el máximo espacio posible"
                        },
                        {
                            nombre: "Mancha que se Derrite",
                            instruccion: "Imagina que eres pintura derritiéndose lentamente por una pared",
                            duracion: "10 segundos",
                            descripcion: "Desde una posición alta, deslízate hacia abajo siguiendo movimientos fluidos y ondulantes"
                        },
                        {
                            nombre: "Mancha que Baila",
                            instruccion: "Muévete como si fueras una mancha feliz bailando al viento",
                            duracion: "10 segundos",
                            descripcion: "Movimientos libres, saltarines y alegres, cambiando de forma constantemente"
                        },
                        {
                            nombre: "Transformación Mágica",
                            instruccion: "Cambia de una forma a otra: de círculo a línea, de grande a pequeño",
                            duracion: "10 segundos",
                            descripcion: "Transiciones rápidas entre diferentes formas geométricas y tamaños"
                        }
                    ],
                    preguntasReflexion: [
                        "¿Cómo se sintió ser una mancha?",
                        "¿Qué formas pudiste crear con tu cuerpo?",
                        "¿Te dio ideas para tus futuros personajes?"
                    ]
                }
            },
            {
                id: 'exploracion-manchas',
                titulo: '🔍 Laboratorio Creativo de Personajes',
                tipo: 'creativo',
                contenido: {
                    narrativa: "En este laboratorio mágico, crearás manchas y las transformarás en personajes únicos. Observa, explora y da vida a tus creaciones...",
                    herramientas: ['generador-manchas', 'rotador-vista', 'lupa-detalle', 'pincel-magico', 'paleta-emociones', 'transformador-lineas'],
                    preguntasGuia: [
                        "¿Qué formas ves en esta mancha?",
                        "Si la giras, ¿aparecen nuevas figuras?",
                        "¿Qué emociones te transmite?"
                    ],
                    misionEspecial: "Genera una mancha mágica, explórala desde diferentes ángulos y luego transfórmala en un personaje único agregando detalles, expresiones y vida"
                }
            },
            {
                id: 'reflexion-celebracion',
                titulo: '🎉 Galería de Personajes Únicos',
                tipo: 'reflexion',
                contenido: {
                    narrativa: "¡Felicidades, creador de personajes! Has transformado una simple mancha en una criatura única con personalidad propia...",
                    preguntasReflexion: [
                        "¿Cómo se llama tu personaje y cuál es su historia?",
                        "¿Qué fue lo más sorprendente del proceso?",
                        "¿Cómo te sentiste al crear sin presión de perfección?"
                    ]
                }
            }
        ]
    },

    actividad2: {
        titulo: "🏠 El Lugar que me Habita",
        subtitulo: "Un viaje interior hacia espacios significativos",
        descripcion: "Explora y representa tu lugar especial con la regla mágica: no borrar nunca",
        totalFases: 6,
        temaColor: 'from-blue-500 to-teal-500',
        fases: [
            {
                id: 'introduccion',
                titulo: '🗺️ Preparación para el Viaje Interior',
                tipo: 'intro',
                contenido: {
                    narrativa: "Bienvenido, explorador de espacios íntimos. Hoy haremos un viaje especial hacia ese lugar que vive en tu corazón...",
                    objetivo: "Reflexionar sobre la relación personal con el espacio mediante elementos visuales y experienciales",
                    reglaEspecial: "🚫 Regla de Oro: NO BORRAR NADA. Cada trazo es parte del tesoro de tu lugar especial"
                }
            },
            {
                id: 'meditacion-guiada',
                titulo: '🧘‍♀️ Viaje al Lugar que me Habita',
                tipo: 'meditativo',
                contenido: {
                    narrativa: "Cierra los ojos y prepárate para un viaje mágico hacia ese lugar donde tu alma se siente en casa...",
                    meditacionTextos: [
                        "Hola, soy Luna, tu amiga que te va a acompañar en este viaje mágico. Ponte cómodo y cierra suavemente tus ojos... así, perfecto.",
                        "Ahora vamos a respirar juntos. Inhala lentamente... uno, dos, tres... y exhala despacio... muy bien. Así se siente la calma.",
                        "Imagina conmigo que en tu mente hay una puerta muy especial... es brillante y dorada como el sol. ¿La puedes ver?",
                        "Esa puerta mágica se está abriendo despacito hacia tu lugar favorito en todo el mundo... ese lugar donde tu corazón se siente feliz y seguro.",
                        "Ya estás ahí... mira a tu alrededor. ¿Qué colores ves? Tal vez son suaves como las nubes, o brillantes como las flores... tómate tu tiempo para verlo todo.",
                        "Ahora escucha... ¿qué sonidos vives en tu lugar especial? Puede ser el canto de los pájaros, las risas de tu familia, o quizás un silencio tranquilo que te abraza.",
                        "Ahora siente... ¿hay una brisa tibia? ¿el pasto bajo tus pies? ¿una manta suavecita? ¿huele a galletas, a flores, a mar? Deja que todos estos sentimientos llenen tu corazón.",
                        "Guarda todo esto como un tesoro en tu memoria... porque este lugar siempre estará contigo. Cuando abras los ojos, vas a crear arte con todo el amor que sientes por este lugar mágico."
                    ],
                    duracionTotal: 240000 // 4 minutos de meditación completa
                }
            },
            {
                id: 'mapa-del-lugar',
                titulo: '🗺️ Mapa del Tesoro Emocional',
                tipo: 'creativo',
                contenido: {
                    narrativa: "Ahora vas a crear un mapa secreto de tu lugar especial. Recuerda: cada trazo es sagrado, no se borra nada...",
                    herramientas: ['pincel-memoria', 'paleta-emocional', 'texturizador'],
                    restricciones: ['no-borrar'],
                    preguntaGuia: "¿Cómo dibujarías los sentimientos que viven en este lugar?"
                }
            },
            {
                id: 'rio-de-palabras',
                titulo: '🌊 El Río de Palabras Mágicas',
                tipo: 'narrativo',
                contenido: {
                    narrativa: "Las palabras son como un río que fluye... deja que broten libremente todos los recuerdos de tu lugar...",
                    instrucciones: "Escribe todo lo que se te ocurra: colores, sonidos, olores, sensaciones, historias...",
                    preguntasActivadoras: [
                        "¿Qué me hace sentir este lugar?",
                        "¿Qué aventura viví allí?",
                        "¿Qué objetos o detalles lo hacen especial?"
                    ]
                }
            },
            {
                id: 'frase-esencia',
                titulo: '🗝️ La Llave del Tesoro',
                tipo: 'sintesis',
                contenido: {
                    narrativa: "De todo tu río de palabras, ahora vas a extraer la esencia mágica en una frase que capture el alma de tu lugar...",
                    mision: "Crea una frase que encierre todo lo que significa este lugar para ti"
                }
            },
            {
                id: 'celebracion-lugar',
                titulo: '🏆 Galería de Lugares del Corazón',
                tipo: 'celebracion',
                contenido: {
                    narrativa: "¡Has creado un tesoro visual y emocional! Tu lugar especial ahora vive también en este arte...",
                    reflexionFinal: "¿Cómo se sintió crear sin poder borrar? ¿Qué descubriste de tu lugar especial?"
                }
            }
        ]
    },

    actividad3: {
        titulo: "🎭 Del Retrato a la Resignificación",
        subtitulo: "El error evoluciona: de frustración en el retrato a protagonista en abstracción y chispa narrativa",
        descripcion: "Descubre cómo transformar un 'error' en una oportunidad creativa a través del autorretrato y la abstracción",
        totalFases: 5,
        temaColor: 'from-green-500 to-lime-500',
        fases: [
            {
                id: 'introduccion-caras-error',
                titulo: '🎭 Las Caras del Error',
                tipo: 'intro',
                contenido: {
                    narrativa: "¡Bienvenido al atelier de la transformación! Hoy descubrirás que los 'errores' tienen cara, tienen emociones, y sobre todo... ¡tienen un superpoder secreto! Vamos a explorar todas las caras que puede tener un error.",
                    objetivo: "Reconocer y validar las emociones asociadas al error para transformarlas en energía creativa",
                    reglaEspecial: "🌟 Regla de Oro: Cada 'error' es una puerta hacia algo inesperado y hermoso",
                    activacionCorporal: {
                        titulo: "🎭 Teatro de Emociones del Error",
                        instrucciones: [
                            "😱 ¡Oops! Me manché con café: Muestra sorpresa y pequeña frustración",
                            "🤔 Escribí mal una palabra: Representa confusión y darse cuenta",
                            "😂 Mi dibujo se parece a una papa: Ríe y acepta lo inesperado",
                            "💡 ¡Esta línea torcida es una idea!: Muestra el momento 'Eureka'"
                        ]
                    }
                }
            },
            {
                id: 'autorretrato-libre',
                titulo: '🪞 El Espejo Mágico del Alma',
                tipo: 'autorretrato',
                contenido: {
                    narrativa: "Ahora eres artista y modelo al mismo tiempo. Mírate en el espejo mágico de la creatividad y dibuja tu autorretrato. No busques perfección, busca tu esencia auténtica. Recuerda: ¡no se puede borrar nada!",
                    herramientas: ['pincel-alma', 'colores-autenticos', 'espejo-virtual'],
                    instruccion: "Observa tu reflejo y dibuja lo que ves, pero sobre todo, lo que sientes. Cada trazo es valioso",
                    preguntasGuia: [
                        "¿Qué forma tiene tu rostro?",
                        "¿Cómo son tus ojos cuando sonríes?",
                        "¿Qué colores representan tu personalidad?",
                        "¿Qué detalles únicos te hacen especial?"
                    ],
                    consignaEspecial: "🚫 Regla del Atelier: ¡No borrar ni eliminar nada! Cada línea tiene su propósito"
                }
            },
            {
                id: 'detective-error',
                titulo: '🔍 Detective del Tesoro Escondido',
                tipo: 'exploracion',
                contenido: {
                    narrativa: "¡Ahora eres un detective muy especial! Tu misión es examinar tu autorretrato con lupa de investigador. ¿Hay alguna parte que no te gustó? ¿Una línea que se escapó? ¡Ese es tu tesoro de transformación!",
                    mision: "Identificar un elemento que consideres 'imperfecto' y analizarlo como tu material de transformación",
                    herramientas: ['lupa-detective', 'marcador-tesoro', 'ficha-analisis'],
                    preguntasDetective: [
                        "¿Qué parte del dibujo no te gustó?",
                        "¿Por qué no te gustó esa parte?",
                        "¿Qué forma tiene ese 'error'?",
                        "¿Qué colores ves en esa zona?",
                        "¿Qué te recuerda esa forma?"
                    ],
                    fichaTesoro: {
                        titulo: "Mi Error Favorito",
                        campos: ["ubicacion", "razon", "forma", "color", "interpretacion"]
                    }
                }
            },
            {
                id: 'metamorfosis-abstracta',
                titulo: '✨ Laboratorio de Metamorfosis',
                tipo: 'abstracto',
                contenido: {
                    narrativa: "¡Es hora de la magia más poderosa! Vas a transformar tu 'error' en el protagonista absoluto de una obra abstracta. Como un científico loco del arte, experimentarás con formas, colores y texturas para crear algo completamente nuevo.",
                    herramientas: ['pincel-transformador', 'paleta-abstracta', 'efectos-magicos', 'texturas-experimentales'],
                    instrucciones: [
                        "Toma tu 'error' identificado y hazlo GIGANTE en el centro de tu nuevo lienzo",
                        "Repítelo varias veces en diferentes tamaños",
                        "Cambia sus colores completamente",
                        "Añade texturas y efectos especiales",
                        "Crea formas libres inspiradas en tu 'error'"
                    ],
                    sorpresaCreativa: {
                        titulo: "🎨 Intercambio de Paletas Mágicas",
                        descripcion: "A la mitad del proceso, intercambiarás colores con otro artista para terminar tu obra con una paleta inesperada"
                    },
                    preguntasTransformacion: [
                        "¿Cómo se siente convertir tu 'error' en protagonista?",
                        "¿Qué formas nuevas estás descubriendo?",
                        "¿Cómo cambia tu perspectiva del 'error'?"
                    ]
                }
            },
            {
                id: 'galeria-historias',
                titulo: '🖼️ Galería de Historias Renacidas',
                tipo: 'narrativo',
                contenido: {
                    narrativa: "¡Bienvenido al museo más especial del mundo! Aquí cada obra abstracta cuenta una historia diferente según quien la mire. Serás crítico de arte y narrador, descubriendo las historias secretas que nacen del error transformado.",
                    mision: "Crear una historia colectiva donde cada 'error' transformado se convierte en inspiración narrativa",
                    herramientas: ['lupa-critico', 'pluma-narrador', 'tarjetas-historia'],
                    procesoCreativo: {
                        pasos: [
                            "Observa una obra abstracta de otro compañero (asignación aleatoria)",
                            "Deja que la obra te cuente su historia secreta",
                            "Escribe una frase inspiradora sobre lo que ves",
                            "Comparte tu interpretación con el grupo",
                            "Crea la exposición colaborativa 'Historias que Nacen del Error'"
                        ]
                    },
                    preguntasInspiracion: [
                        "¿Qué historia te cuenta esta obra?",
                        "¿Qué aventura vivió este 'error' transformado?",
                        "¿Qué emociones transmite esta abstracción?",
                        "¿Qué mensaje tiene para otros artistas valientes?"
                    ],
                    celebracionFinal: {
                        titulo: "🏆 Museo del Error Transformado",
                        descripcion: "Una exposición donde cada 'error' se convirtió en arte y cada arte en una nueva historia"
                    }
                }
            },
            {
                id: 'reflexion-crecimiento',
                titulo: '🌱 El Jardín del Crecimiento Creativo',
                tipo: 'reflexion',
                contenido: {
                    narrativa: "Has completado un viaje extraordinario de transformación. De un simple autorretrato nació un 'error', del 'error' nació una obra abstracta, y de la abstracción nacieron historias infinitas. ¡Eres un alquimista del arte!",
                    reflexionFinal: "¿Cómo cambió tu relación con los 'errores'? ¿Qué descubriste sobre el poder de la transformación creativa?",
                    preguntasCrecimiento: [
                        "¿Qué aprendiste sobre los 'errores' en el arte?",
                        "¿Cómo te sentiste al ver tu 'error' convertido en protagonista?",
                        "¿Qué fue lo más sorprendente de este proceso?",
                        "¿Cómo aplicarías esta filosofía en otras áreas de tu vida?",
                        "¿Qué mensaje le darías a alguien que teme cometer errores?"
                    ],
                    certificadoMaestria: {
                        titulo: "🏆 Maestro Transformador de Errores",
                        mensaje: "Has demostrado que cualquier 'error' puede convertirse en la semilla de algo extraordinario"
                    },
                    fraseFinal: "Nuestras memorias dibujadas y resignificadas nos mostraron que no todo lo imperfecto debe desaparecer, sino que puede transformarse en algo hermoso"
                }
            }
        ]
    },

    actividad4: {
        titulo: "🏛️ Historias que Nacen del Error",
        subtitulo: "Una galería personal de transformación creativa",
        descripcion: "Reúne tus creaciones anteriores y descubre las historias que nacen cuando el error se convierte en protagonista",
        totalFases: 4,
        temaColor: 'from-indigo-500 to-purple-600',
        fases: [
            {
                id: 'curacion-personal',
                titulo: '🎨 Curador de tu Propia Galería',
                tipo: 'galeria',
                contenido: {
                    narrativa: "¡Te has convertido en un curador experto! Es hora de reunir todas tus creaciones de las actividades anteriores y crear tu propia galería personal del Error Creativo.",
                    objetivo: "Recopilar y organizar todas las creaciones realizadas en las actividades 1, 2 y 3",
                    instrucciones: [
                        "Reúne tus dibujos de 'Somos Manchas que se Mueven'",
                        "Busca tu representación de 'El Lugar que me Habita'",
                        "Encuentra tu autorretrato y abstracción de 'Del Retrato a la Resignificación'"
                    ],
                    preguntasGuia: [
                        "¿Cuál de tus creaciones te sorprende más al verla ahora?",
                        "¿Qué emociones te genera revisar tu proceso creativo?",
                        "¿Puedes identificar patrones o evolución en tu estilo?"
                    ]
                }
            },
            {
                id: 'arqueologia-error',
                titulo: '🔍 Arqueólogo del Error',
                tipo: 'analisis',
                contenido: {
                    narrativa: "Como un arqueólogo que descubre tesoros enterrados, vas a explorar cada una de tus creaciones para encontrar esos 'errores' que se convirtieron en descubrimientos sorprendentes.",
                    objetivo: "Identificar y analizar los errores transformadores en cada obra personal",
                    preguntasGuia: [
                        "¿Qué 'accidente' en tu mancha se convirtió en el mejor personaje?",
                        "¿Qué línea 'incorrecta' en tu lugar favorito le dio más personalidad?",
                        "¿Qué parte de tu autorretrato que no te gustó fue la más auténtica?",
                        "¿Cómo estos errores cambiaron tu forma de ver tu propia creatividad?",
                        "¿Puedes encontrar un patrón en la forma en que transformas los errores?"
                    ],
                    actividades: [
                        "Marcar con círculos los 'errores' que se convirtieron en aciertos",
                        "Escribir la historia de transformación de cada error",
                        "Evaluar el impacto emocional del proceso"
                    ]
                }
            },
            {
                id: 'museo-personal',
                titulo: '�️ Diseñador de Museo Personal',
                titulo: '�️ Diseñador de Museo Personal',
                tipo: 'exhibicion',
                contenido: {
                    narrativa: "Como curador de tu propia galería, vas a crear una experiencia única donde el error se celebra como protagonista de la transformación creativa.",
                    objetivo: "Reflexionar sobre la transformación personal a través de una experiencia interactiva y visual",
                    herramientas: ['lluvia-ideas', 'reflexion-visual', 'huella-digital'],
                    elementos: [
                        "Lluvia de ideas interactiva sobre el error",
                        "Reflexión visual: antes vs ahora",
                        "Ceremonia de huella digital personalizada",
                        "Celebración final del crecimiento personal"
                    ]
                }
            },
            {
                id: 'manifiesto-error',
                titulo: '📜 Autor del Manifiesto del Error',
                tipo: 'reflexivo',
                contenido: {
                    narrativa: "Como gran final, escribirás tu propio 'Manifiesto del Error Creativo': un documento personal que refleje todo lo que has aprendido sobre convertir errores en oportunidades creativas.",
                    objetivo: "Crear un documento personal que sintetice los aprendizajes sobre el Error Creativo",
                    elementos: [
                        "Tu definición personal del Error Creativo",
                        "Los momentos más importantes de transformación",
                        "Consejos que le darías a otros artistas",
                        "Tu compromiso futuro con el Error Creativo",
                        "Una dedicatoria especial"
                    ],
                    preguntasGuia: [
                        "¿Cómo defines ahora lo que es un 'error' en el arte?",
                        "¿Qué has aprendido sobre tu propia creatividad?",
                        "¿Cómo has cambiado como persona creativa?",
                        "¿Qué te comprometes a recordar en el futuro?",
                        "¿A quién le dedicarías este manifiesto y por qué?"
                    ],
                    certificadoMaestria: {
                        titulo: "🏆 Maestro Curador del Error Creativo",
                        mensaje: "Has demostrado que cualquier 'error' puede convertirse en la semilla de una historia extraordinaria"
                    },
                    fraseFinal: "Tu galería personal demuestra que los errores no son el final del camino, sino el comienzo de nuevas historias"
                }
            }
        ]
    }
};

/**
 * Inicializar actividad interactiva
 */
function iniciarActividadInteractiva(actividadId) {
    const actividad = ACTIVIDADES_CONFIG[actividadId];
    if (!actividad) return;

    ActividadState.actividadActual = actividadId;
    ActividadState.faseActual = 0;
    
    console.log('🎨 Iniciando actividad interactiva:', actividadId);
    
    // Obtener contenedor principal
    const container = document.getElementById('lab-content-container');
    if (!container) {
        console.error('❌ Container lab-content-container no encontrado');
        return;
    }
    
    // Ocultar menú de selección si existe
    const selectionContainer = document.getElementById('activity-selection-container');
    if (selectionContainer) {
        selectionContainer.style.display = 'none';
    }
    
    container.style.display = 'block';
    container.innerHTML = ''; // Limpiar contenido previo
    
    console.log('✅ Container preparado, generando interfaz...');
    
    // Crear estructura de la actividad interactiva
    container.innerHTML = `
        <div class="actividad-interactiva-container">
            <!-- Header de la actividad -->
            <div class="actividad-header bg-gradient-to-r ${actividad.temaColor} text-white p-6 rounded-t-2xl">
                <h1 class="text-3xl font-bold mb-2">${actividad.titulo}</h1>
                <p class="text-xl opacity-90 mb-4">${actividad.subtitulo}</p>
                <p class="opacity-80">${actividad.descripcion}</p>
            </div>

            <!-- Indicadores de progreso -->
            <div class="progreso-container bg-white p-4 border-x-2 border-gray-200">
                <div class="flex justify-center gap-3 mb-4">
                    ${actividad.fases.map((fase, index) => `
                        <div class="indicador-fase w-4 h-4 rounded-full transition-all duration-300 ${index === 0 ? 'bg-primary scale-125' : 'bg-gray-300'}" data-fase="${index}"></div>
                    `).join('')}
                </div>
                <div class="barra-progreso bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div class="progreso-fill bg-gradient-to-r ${actividad.temaColor} h-full transition-all duration-500" style="width: ${(1/actividad.totalFases)*100}%"></div>
                </div>
                <p class="text-center text-sm text-gray-600 mt-2">Fase <span id="fase-actual-num">1</span> de ${actividad.totalFases}</p>
            </div>

            <!-- Contenido de la fase actual -->
            <div id="fase-contenido" class="fase-contenido bg-white p-6 rounded-b-2xl border-2 border-t-0 border-gray-200 min-h-96">
                <!-- Se llenará dinámicamente -->
            </div>

            <!-- Controles de navegación -->
            <div class="controles-navegacion flex justify-between items-center p-4 bg-gray-50 rounded-b-lg">
                <button id="btn-anterior" class="btn-nav bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    ← Anterior
                </button>
                <div class="flex gap-2">
                    <button id="btn-siguiente" class="btn-nav bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-all">
                        Siguiente →
                    </button>
                </div>
            </div>
        </div>
    `;

    // Mostrar la primera fase
    mostrarFaseActividad(ActividadState.actividadActual, 0);
    
    // Configurar event listeners después de que el DOM esté listo
    setTimeout(() => {
        configurarEventListenersActividad();
    }, 100);
}

/**
 * Mostrar una fase específica de la actividad
 */
function mostrarFaseActividad(actividadId, faseIndex) {
    const actividad = ACTIVIDADES_CONFIG[actividadId];
    const fase = actividad.fases[faseIndex];
    
    if (!fase) return;

    const contenedor = document.getElementById('fase-contenido');
    if (!contenedor) return;

    // Actualizar indicadores de progreso
    actualizarProgresoActividad(faseIndex, actividad.totalFases);
    
    // Generar contenido según el tipo de fase
    let contenidoHTML = '';
    
    switch (fase.tipo) {
        case 'intro':
            contenidoHTML = generarFaseIntroduccion(fase);
            break;
        case 'interactivo':
            contenidoHTML = generarFaseInteractiva(fase);
            break;
        case 'creativo':
            contenidoHTML = generarFaseCreativa(fase, actividadId);
            break;
        case 'corporal':
            contenidoHTML = generarFaseCorporal(fase);
            break;
        case 'autorretrato':
            contenidoHTML = generarFaseAutorretrato(fase, actividadId);
            break;
        case 'exploracion':
            contenidoHTML = generarFaseExploracion(fase, actividadId);
            break;
        case 'abstracto':
            contenidoHTML = generarFaseAbstracta(fase, actividadId);
            break;
        case 'meditativo':
            contenidoHTML = generarFaseMeditativa(fase);
            break;
        case 'narrativo':
            contenidoHTML = generarFaseNarrativa(fase);
            break;
        case 'galeria':
            contenidoHTML = generarFaseGaleria(fase, actividadId);
            break;
        case 'analisis':
            contenidoHTML = generarFaseAnalisis(fase, actividadId);
            break;
        case 'exhibicion':
            contenidoHTML = generarFaseExhibicion(fase, actividadId);
            break;
        case 'reflexivo':
            contenidoHTML = generarFaseReflexiva(fase, actividadId);
            break;
        case 'reflexion':
        case 'celebracion':
            contenidoHTML = generarFaseReflexion(fase, actividadId);
            break;
        default:
            contenidoHTML = generarFaseGenerica(fase);
    }
    
    // Aplicar contenido con animación
    contenedor.style.opacity = '0';
    setTimeout(() => {
        contenedor.innerHTML = contenidoHTML;
        contenedor.style.opacity = '1';
        
        // Configurar funcionalidades específicas de la fase
        configurarFaseEspecifica(fase, actividadId, faseIndex);
    }, 150);
    
    // Actualizar controles de navegación
    actualizarControlesNavegacion(faseIndex, actividad.totalFases);
}

// Continúo con las funciones de generación de contenido para cada tipo de fase...

/**
 * Generar contenido genérico para cualquier fase
 */
function generarFaseGenerica(fase) {
    return `
        <div class="fase-generica max-w-4xl mx-auto">
            <div class="narrativa-contenedor bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mb-6 border-2 border-blue-200">
                <h2 class="text-2xl font-bold text-primary mb-4">${fase.titulo}</h2>
                ${fase.contenido.narrativa ? `
                    <p class="text-lg text-gray-700 leading-relaxed mb-6">${fase.contenido.narrativa}</p>
                ` : ''}
                
                ${fase.contenido.descripcion ? `
                    <p class="text-gray-700 mb-4">${fase.contenido.descripcion}</p>
                ` : ''}
                
                ${fase.contenido.instrucciones ? `
                    <div class="instrucciones bg-white p-6 rounded-xl border-2 border-blue-300 mb-6">
                        <h3 class="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                            <span class="text-2xl">📋</span> Instrucciones
                        </h3>
                        <p class="text-gray-700">${fase.contenido.instrucciones}</p>
                    </div>
                ` : ''}
            </div>
            
            <div class="acciones-fase flex justify-center gap-4">
                <button class="btn-continuar bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transform transition-all hover:scale-105" onclick="siguienteFaseActividad()">
                    Continuar →
                </button>
            </div>
        </div>
    `;
}

/**
 * Generar contenido para fase de introducción
 */
function generarFaseIntroduccion(fase) {
    return `
        <div class="fase-introduccion text-center max-w-4xl mx-auto">
            <div class="narrativa-principal bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mb-6 border-2 border-blue-200">
                <h2 class="text-2xl font-bold text-primary mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-6">${fase.contenido.narrativa}</p>
                
                ${fase.contenido.objetivo ? `
                    <div class="objetivo-box bg-white p-6 rounded-xl border-2 border-yellow-300 mb-6">
                        <h3 class="text-lg font-bold text-yellow-700 mb-3 flex items-center gap-2">
                            <span class="text-2xl">🎯</span> Objetivo de esta Aventura
                        </h3>
                        <p class="text-gray-700">${fase.contenido.objetivo}</p>
                    </div>
                ` : ''}
                
                ${fase.contenido.reglaEspecial ? `
                    <div class="regla-especial bg-gradient-to-r from-pink-100 to-red-100 p-6 rounded-xl border-2 border-pink-300 mb-6">
                        <h3 class="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                            <span class="text-2xl">✨</span> Regla Especial
                        </h3>
                        <p class="text-gray-700 font-medium">${fase.contenido.reglaEspecial}</p>
                    </div>
                ` : ''}
                
                ${fase.contenido.filosofia ? `
                    <div class="filosofia-box bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-xl border-2 border-purple-300">
                        <h3 class="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
                            <span class="text-2xl">💫</span> Filosofía Creativa
                        </h3>
                        <p class="text-gray-700 italic">${fase.contenido.filosofia}</p>
                    </div>
                ` : ''}
            </div>
            
            <button class="btn-aventura bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105" onclick="siguienteFaseActividad()">
                🚀 ¡Comenzar la Aventura!
            </button>
        </div>
    `;
}

/**
 * Generar contenido para fase interactiva
 */
function generarFaseInteractiva(fase) {
    return `
        <div class="fase-interactiva max-w-6xl mx-auto">
            <div class="narrativa mb-6">
                <h2 class="text-2xl font-bold text-primary mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 mb-6">${fase.contenido.narrativa}</p>
            </div>
            
            <!-- Laboratorio de manchas -->
            <div class="laboratorio-manchas bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 mb-6">
                <h3 class="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                    <span class="text-2xl">🔬</span> Laboratorio de Manchas Mágicas
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Panel de creación manual de manchas -->
                    <div class="panel-manchas bg-white p-6 rounded-xl border-2 border-purple-300">
                        <h4 class="font-bold text-gray-700 mb-4">🎨 Crea Tu Propia Mancha</h4>
                        <p class="text-sm text-gray-600 mb-3">Usa pinceles reales, agua y técnicas artísticas para crear tu mancha única:</p>
                        
                        <!-- Container para el mini-simulador -->
                        <div id="mini-simulador-container" class="mb-4">
                            <!-- Se cargará aquí un simulador simplificado -->
                        </div>
                        
                        <div class="herramientas-manchas">
                            <div class="grid grid-cols-2 gap-2 mb-4">
                                <button class="btn-herramienta bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-all text-sm" onclick="activarHerramientaMancha('pincel')">
                                    🖌️ Pincel
                                </button>
                                <button class="btn-herramienta bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg transition-all text-sm" onclick="activarHerramientaMancha('agua')">
                                    💧 Agua
                                </button>
                                <button class="btn-herramienta bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg transition-all text-sm" onclick="activarHerramientaMancha('esponja')">
                                    🧽 Esponja
                                </button>
                                <button class="btn-herramienta bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-all text-sm" onclick="activarHerramientaMancha('goteo')">
                                    🌧️ Goteo
                                </button>
                            </div>
                            
                            <div class="acciones-mancha flex gap-2">
                                <button class="btn-accion bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all text-sm flex-1" onclick="limpiarManchaPersonal()">
                                    🗑️ Limpiar
                                </button>
                                <button class="btn-accion bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-all text-sm flex-1" onclick="guardarManchaPersonal()">
                                    � Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Panel de observación -->
                    <div class="panel-observacion bg-white p-6 rounded-xl border-2 border-pink-300">
                        <h4 class="font-bold text-gray-700 mb-4">👁️ Observatorio de Formas</h4>
                        <div class="preguntas-guia space-y-4">
                            ${fase.contenido.preguntasGuia.map((pregunta, index) => `
                                <div class="pregunta-item bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-400">
                                    <p class="font-medium text-gray-700 mb-2">${pregunta}</p>
                                    <textarea placeholder="Escribe lo que observas..." class="w-full p-2 border border-gray-300 rounded-lg resize-none h-16 text-sm" id="respuesta-${index}"></textarea>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Selector de emociones -->
            <div class="selector-emociones bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-300">
                <h3 class="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                    <span class="text-2xl">😊</span> ¿Qué emociones despiertan estas formas?
                </h3>
                <div class="emociones-grid grid grid-cols-4 md:grid-cols-8 gap-3">
                    ${['😊 Alegre', '🤔 Curioso', '😌 Tranquilo', '🤩 Fascinado', '😅 Divertido', '🧐 Intrigado', '😍 Enamorado', '🤯 Sorprendido'].map(emocion => `
                        <button class="emocion-btn bg-white hover:bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 text-center transition-all hover:scale-105" onclick="seleccionarEmocion('${emocion}', this)">
                            ${emocion}
                        </button>
                    `).join('')}
                </div>
                <div id="emocion-seleccionada" class="mt-4 p-4 bg-white rounded-lg border-2 border-green-300 hidden">
                    <p class="text-green-700 font-medium">Tu emoción: <span id="emocion-texto"></span></p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generar contenido para fase creativa MEJORADA con simulador avanzado
 */
function generarFaseCreativa(fase, actividadId) {
    const esActividadNoborrar = actividadId === 'actividad2';
    const esManchaAvanzada = actividadId === 'actividad1'; // Somos Manchas que se Mueven
    
    if (esManchaAvanzada) {
        // Usar simulador avanzado para actividad de manchas
        return generarSimuladorManchaAvanzado(fase, actividadId);
    }
    
    return `
        <div class="fase-creativa max-w-6xl mx-auto">
            <div class="narrativa mb-6">
                <h2 class="text-2xl font-bold text-primary mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 mb-6">${fase.contenido.narrativa}</p>
                
                ${fase.contenido.misionEspecial ? `
                    <div class="mision-especial bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-xl border-2 border-green-300 mb-6">
                        <h3 class="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                            <span class="text-2xl">🎯</span> Misión Especial
                        </h3>
                        <p class="text-gray-700">${fase.contenido.misionEspecial}</p>
                    </div>
                ` : ''}
                
                ${esActividadNoborrar ? `
                    <div class="regla-no-borrar bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-xl border-2 border-red-300 mb-6">
                        <h3 class="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                            <span class="text-2xl">🚫</span> Regla Especial Activa
                        </h3>
                        <p class="text-gray-700 font-medium">NO BORRAR NADA - Cada trazo es parte del tesoro</p>
                    </div>
                ` : ''}
            </div>
            
            <!-- Estudio de Arte Digital Profesional -->
            <div class="estudio-arte-pro bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-300 shadow-xl">
                <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 flex items-center gap-3">
                    <span class="text-3xl">🎨</span> Tu Estudio de Arte Digital Profesional
                    <span class="text-sm bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-bold">PRO</span>
                </h3>
                
                <div class="grid xl:grid-cols-4 lg:grid-cols-3 gap-6">
                    <!-- Canvas Principal Expandido -->
                    <div class="xl:col-span-3 lg:col-span-2">
                        <div class="canvas-container bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
                            <div id="canvas-mancha-contenedor" class="relative">
                                <canvas id="canvas-mancha-personal" width="1200" height="800" 
                                        class="border-2 border-dashed border-purple-300 rounded-lg bg-white w-full cursor-crosshair shadow-inner"
                                        style="max-width: 100%; height: auto;">
                                </canvas>
                                
                                <!-- Overlay de información de herramienta -->
                                <div id="tool-info-overlay" class="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 transition-opacity pointer-events-none">
                                    <span id="current-tool-name">Pincel Sólido</span> | 
                                    <span id="current-brush-size">10px</span> | 
                                    <span id="current-opacity">100%</span>
                                </div>
                            </div>
                            
                            ${fase.contenido.preguntaGuia ? `
                                <div class="pregunta-inspiracion bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-l-4 border-orange-400 mt-4">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-xl">💡</span>
                                        <span class="font-bold text-orange-700">Inspiración Creativa</span>
                                    </div>
                                    <p class="font-medium text-gray-700">${fase.contenido.preguntaGuia}</p>
                                </div>
                            ` : ''}
                        </div>
                        
                        <!-- Barra de herramientas rápida -->
                        <div class="herramientas-rapidas bg-white p-4 rounded-xl border-2 border-gray-200 mt-4 shadow-lg">
                            <div class="flex flex-wrap gap-3 justify-center">
                                ${!esActividadNoborrar ? `
                                    <button onclick="limpiarManchaPersonal()" class="btn-accion-rapida bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                        🗑️ Limpiar Lienzo
                                    </button>
                                ` : `
                                    <div class="no-borrar-mensaje bg-gradient-to-r from-red-100 to-pink-100 p-3 rounded-lg border-2 border-red-300 text-center">
                                        <span class="text-red-700 font-bold">🚫 Limpiar deshabilitado - Cada trazo es sagrado</span>
                                    </div>
                                `}
                                
                                <button onclick="deshacerAccion()" class="btn-accion-rapida bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                    ↶ Deshacer
                                </button>
                                
                                <button onclick="rehacerAccion()" class="btn-accion-rapida bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                    ↷ Rehacer  
                                </button>
                                
                                <button onclick="guardarManchaPersonal()" class="btn-accion-rapida bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                    💾 Guardar Obra
                                </button>
                                
                                <button onclick="exportarComoImagen()" class="btn-accion-rapida bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                    📸 Exportar
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Panel de Herramientas Profesional -->
                    <div class="herramientas-panel-pro bg-white p-6 rounded-xl border-2 border-purple-300 shadow-xl">
                        <div class="space-y-6">
                            <!-- Header del panel -->
                            <div class="text-center">
                                <h4 class="text-lg font-bold text-purple-700 mb-2">🎭 Caja de Herramientas Mágica</h4>
                                <p class="text-sm text-gray-600">Tu arsenal creativo profesional</p>
                            </div>
                            
                            <!-- Pinceles Profesionales -->
                            <div class="seccion-herramientas">
                                <h5 class="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <span class="text-lg">🖌️</span> Pinceles Artísticos
                                </h5>
                                <div class="grid grid-cols-2 gap-2">
                                    <button onclick="window.seleccionarHerramientaAvanzada('pincel-solido')" class="herramienta-btn bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-3 rounded-lg border-2 border-blue-300 transition-all text-center">
                                        <div class="text-2xl mb-1">🖌️</div>
                                        <div class="text-xs font-medium">Sólido</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('aerografo')" class="herramienta-btn bg-gradient-to-br from-cyan-100 to-cyan-200 hover:from-cyan-200 hover:to-cyan-300 p-3 rounded-lg border-2 border-cyan-300 transition-all text-center">
                                        <div class="text-2xl mb-1">💨</div>
                                        <div class="text-xs font-medium">Aerógrafo</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('textura')" class="herramienta-btn bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 p-3 rounded-lg border-2 border-green-300 transition-all text-center">
                                        <div class="text-2xl mb-1">🎨</div>
                                        <div class="text-xs font-medium">Textura</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('caligrafia')" class="herramienta-btn bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 p-3 rounded-lg border-2 border-purple-300 transition-all text-center">
                                        <div class="text-2xl mb-1">✒️</div>
                                        <div class="text-xs font-medium">Caligrafía</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('difumino')" class="herramienta-btn bg-gradient-to-br from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300 p-3 rounded-lg border-2 border-pink-300 transition-all text-center">
                                        <div class="text-2xl mb-1">🌫️</div>
                                        <div class="text-xs font-medium">Difumino</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('acuarela')" class="herramienta-btn bg-gradient-to-br from-indigo-100 to-indigo-200 hover:from-indigo-200 hover:to-indigo-300 p-3 rounded-lg border-2 border-indigo-300 transition-all text-center">
                                        <div class="text-2xl mb-1">🌊</div>
                                        <div class="text-xs font-medium">Acuarela</div>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Herramientas de Relleno -->
                            <div class="seccion-herramientas">
                                <h5 class="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <span class="text-lg">🎯</span> Relleno y Efectos
                                </h5>
                                <div class="grid grid-cols-2 gap-2">
                                    <button onclick="window.seleccionarHerramientaAvanzada('relleno')" class="herramienta-btn bg-gradient-to-br from-yellow-100 to-orange-200 hover:from-yellow-200 hover:to-orange-300 p-3 rounded-lg border-2 border-orange-300 transition-all text-center">
                                        <div class="text-2xl mb-1">🪣</div>
                                        <div class="text-xs font-medium">Bote</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('gradiente-lineal')" class="herramienta-btn bg-gradient-to-br from-violet-100 to-purple-200 hover:from-violet-200 hover:to-purple-300 p-3 rounded-lg border-2 border-purple-300 transition-all text-center">
                                        <div class="text-2xl mb-1">📐</div>
                                        <div class="text-xs font-medium">Gradiente</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('gradiente-radial')" class="herramienta-btn bg-gradient-to-br from-rose-100 to-pink-200 hover:from-rose-200 hover:to-pink-300 p-3 rounded-lg border-2 border-pink-300 transition-all text-center">
                                        <div class="text-2xl mb-1">🌟</div>
                                        <div class="text-xs font-medium">Radial</div>
                                    </button>
                                    
                                    <button onclick="window.seleccionarHerramientaAvanzada('borrador')" class="herramienta-btn bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 p-3 rounded-lg border-2 border-gray-300 transition-all text-center">
                                        <div class="text-2xl mb-1">🧽</div>
                                        <div class="text-xs font-medium">Borrador</div>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Panel de colores avanzado se insertará aquí dinámicamente -->
                            <div id="panel-colores-avanzado"></div>
                            
                            <!-- Parámetros de pincel -->
                            <div id="parametros-pincel-avanzado"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Reflexión rápida -->
            <div class="reflexion-rapida bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-200 mt-6">
                <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                    <span class="text-2xl">💭</span> Reflexión Rápida
                </h3>
                <textarea id="reflexion-creativa" placeholder="¿Qué sientes mientras creas? ¿Qué descubres en tu proceso?" class="w-full p-4 border-2 border-green-300 rounded-lg resize-none h-24 text-gray-700"></textarea>
                
                <!-- Selector de emociones creativas -->
                <div class="emociones-creativas mt-4">
                    <p class="font-medium text-gray-600 mb-3">¿Cómo te sientes creando?</p>
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${['🎨 Libre', '😊 Feliz', '🤔 Concentrado', '😌 Relajado', '🤩 Inspirado', '😅 Nervioso', '🧐 Curioso', '🕊️ En paz'].map(emocion => `
                            <button class="emocion-creativa bg-white hover:bg-green-100 border-2 border-green-300 rounded-full px-4 py-2 text-sm transition-all hover:scale-105" onclick="seleccionarEmocionCreativa('${emocion}', this)">
                                ${emocion}
                            </button>
                        `).join('')}
                    </div>
                    <div id="emocion-creativa-seleccionada" class="mt-3 p-3 bg-white rounded-lg border-2 border-blue-300 hidden">
                        <p class="text-blue-700 font-medium">Tu estado creativo: <span id="emocion-creativa-texto"></span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generar simulador avanzado de mancha
 */
function generarSimuladorManchaAvanzado(fase, actividadId) {
    return `
        <div class="fase-creativa-avanzada max-w-7xl mx-auto">
            <div class="narrativa mb-8">
                <h2 class="text-3xl font-bold text-primary mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 mb-6">${fase.contenido.narrativa}</p>
                
                <!-- Introducción al simulador -->
                <div class="intro-simulador bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-2xl border-2 border-purple-300 mb-6">
                    <h3 class="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                        <span class="text-2xl">🧪</span> Laboratorio de Manchas Realista
                    </h3>
                    <p class="text-purple-800 mb-4">¡Bienvenido al estudio más avanzado de creación de manchas! Aquí puedes experimentar con herramientas que simulan la experiencia real de pintar:</p>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div class="bg-white p-3 rounded-lg border border-purple-200">
                            <span class="text-lg">🖌️</span> <strong>Pinceles realistas</strong><br>
                            Con texturas y presión
                        </div>
                        <div class="bg-white p-3 rounded-lg border border-purple-200">
                            <span class="text-lg">💧</span> <strong>Efectos de agua</strong><br>
                            Difuminado y absorción
                        </div>
                        <div class="bg-white p-3 rounded-lg border border-purple-200">
                            <span class="text-lg">🌈</span> <strong>Colores emocionales</strong><br>
                            Paletas inspiradoras
                        </div>
                        <div class="bg-white p-3 rounded-lg border border-purple-200">
                            <span class="text-lg">✨</span> <strong>Efectos sorpresa</strong><br>
                            Momentos inesperados
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Simulador de Manchas Integrado -->
            <div id="herramientas-mancha-container" class="simulador-fallback bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-300">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-yellow-700 mb-3">🎨 Laboratorio de Manchas Mágicas</h3>
                    <p class="text-yellow-800 mb-4">¡Crea manchas realistas y descubre personajes únicos en ellas!</p>
                </div>
                
                <div class="grid lg:grid-cols-4 gap-6">
                    <!-- Canvas principal -->
                    <div class="lg:col-span-3">
                        <div class="canvas-wrapper bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-300">
                            <canvas id="canvas-principal" width="1200" height="800" class="border-4 border-yellow-400 rounded-xl bg-white w-full shadow-xl mx-auto block"></canvas>
                        </div>
                        
                        <!-- Generador de manchas mágicas -->
                        <div class="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-300">
                            <div class="flex justify-between items-center mb-3">
                                <h4 class="font-bold text-purple-700">✨ Generador de Manchas Mágicas</h4>
                                <button onclick="generarManchaAleatoria()" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                    🎲 Crear Mancha
                                </button>
                            </div>
                            <p class="text-sm text-purple-600">Genera una mancha tipo acuarela perfecta para descubrir figuras y personajes únicos</p>
                        </div>
                        
                        <div class="mt-4 bg-white p-4 rounded-lg border-2 border-yellow-300">
                            <h4 class="font-bold text-yellow-700 mb-2">💡 Consejos creativos:</h4>
                            <div class="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                                <div>• Genera manchas para inspirarte</div>
                                <div>• Observa desde diferentes ángulos</div>
                                <div>• Imagina historias sobre las formas</div>
                                <div>• Dale vida con detalles únicos</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Herramientas básicas -->
                    <div class="herramientas-basicas bg-white p-6 rounded-xl border-2 border-yellow-300">
                        <h4 class="font-bold text-gray-700 mb-4">🛠️ Herramientas</h4>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block font-medium text-gray-600 mb-2">🎨 Color:</label>
                                <input type="color" id="selector-color" value="#8B5CF6" class="w-full h-12 border-2 border-gray-300 rounded-lg">
                            </div>
                            
                            <div>
                                <label class="block font-medium text-gray-600 mb-2">🖌️ Herramienta:</label>
                                <select id="tipo-pincel" class="w-full p-2 border-2 border-gray-300 rounded-lg">
                                    <option value="pincel">✏️ Pincel Fino</option>
                                    <option value="pincelGrueso">🖌️ Pincel Grueso</option>
                                    <option value="acuarela">💧 Acuarela</option>
                                    <option value="aerografo">💨 Aerógrafo</option>
                                    <option value="esponja">🧽 Esponja</option>
                                    <option value="marcador">✒️ Marcador</option>
                                    <option value="difuminado">🌫️ Difuminado</option>
                                    <option value="goteo">💦 Goteo</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block font-medium text-gray-600 mb-2">💧 Efecto Agua:</label>
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="efecto-agua" class="w-5 h-5">
                                    <span class="text-sm">Activar difuminado</span>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block font-medium text-gray-600 mb-2">🎨 Opacidad: <span id="opacidad-display">100%</span></label>
                                <input type="range" id="opacidad-pincel" min="10" max="100" value="100" class="w-full">
                            </div>
                            
                            <div>
                                <label class="block font-medium text-gray-600 mb-2">📏 Tamaño: <span id="tamano-display">8px</span></label>
                                <input type="range" id="tamano-pincel" min="2" max="30" value="8" class="w-full">
                            </div>
                            
                            <div class="space-y-2">
                                <button onclick="limpiarCanvas()" class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
                                    🗑️ Nueva Mancha
                                </button>
                                <button onclick="guardarCreacion()" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                                    💾 Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Reflexión avanzada -->
            <div class="reflexion-avanzada bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200 mt-8">
                <h3 class="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                    <span class="text-2xl">🔬</span> Diario del Científico Creativo
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-bold text-green-600 mb-3">🎨 Experimentos Realizados</h4>
                        <div class="space-y-3">
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" class="form-checkbox text-green-500">
                                <span class="text-sm">Probé diferentes herramientas</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" class="form-checkbox text-green-500">
                                <span class="text-sm">Experimenté con efectos de agua</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" class="form-checkbox text-green-500">
                                <span class="text-sm">Usé paletas emocionales</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" class="form-checkbox text-green-500">
                                <span class="text-sm">Descubrí efectos sorpresa</span>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-green-600 mb-3">💭 Reflexiones del Proceso</h4>
                        <textarea id="reflexion-simulador" placeholder="¿Qué descubriste al experimentar con las herramientas realistas? ¿Cómo se sintió crear manchas de forma tan libre?" class="w-full p-3 border-2 border-green-300 rounded-lg resize-none h-32 text-gray-700"></textarea>
                    </div>
                </div>
                
                <!-- Preguntas específicas -->
                <div class="preguntas-especificas mt-6 grid md:grid-cols-3 gap-4">
                    <div class="pregunta bg-white p-4 rounded-lg border-2 border-teal-200">
                        <h5 class="font-bold text-teal-700 mb-2">🌊 Efecto Agua</h5>
                        <p class="text-sm text-gray-600 mb-2">¿Cómo cambió tu mancha cuando activaste el efecto agua?</p>
                        <textarea class="w-full p-2 border border-teal-200 rounded text-xs" rows="2" placeholder="Describe tu experiencia..."></textarea>
                    </div>
                    
                    <div class="pregunta bg-white p-4 rounded-lg border-2 border-blue-200">
                        <h5 class="font-bold text-blue-700 mb-2">🎨 Herramientas</h5>
                        <p class="text-sm text-gray-600 mb-2">¿Cuál fue tu herramienta favorita y por qué?</p>
                        <textarea class="w-full p-2 border border-blue-200 rounded text-xs" rows="2" placeholder="Mi favorita fue..."></textarea>
                    </div>
                    
                    <div class="pregunta bg-white p-4 rounded-lg border-2 border-purple-200">
                        <h5 class="font-bold text-purple-700 mb-2">✨ Sorpresas</h5>
                        <p class="text-sm text-gray-600 mb-2">¿Qué te sorprendió más del proceso creativo?</p>
                        <textarea class="w-full p-2 border border-purple-200 rounded text-xs" rows="2" placeholder="Me sorprendió que..."></textarea>
                    </div>
                </div>
            </div>
            
            <!-- Creador de personajes -->
            <div class="mt-8 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 p-6 rounded-xl border-2 border-purple-400 shadow-lg">
                <h4 class="font-bold text-purple-700 mb-4 text-xl flex items-center gap-2">
                    ✨ Dale Vida a Tu Personaje
                </h4>
                
                <div class="space-y-4">
                    <!-- Nombre -->
                    <div class="bg-white p-4 rounded-lg border-2 border-pink-300">
                        <label class="block font-bold text-pink-600 mb-2">🎭 Nombre del Personaje:</label>
                        <input type="text" id="nombre-personaje" placeholder="Escribe tu nombre y mira la magia..." 
                               class="w-full p-3 border-2 border-pink-300 rounded-lg text-lg"
                               oninput="generarNombreAlReves()">
                        <div id="nombre-alreves" class="mt-2 text-center p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hidden">
                            <span class="text-sm text-gray-600">Tu personaje se llama:</span>
                            <p class="text-2xl font-bold text-purple-700 mt-1"></p>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">💡 Tip: Escribe tu nombre y observa cómo se transforma mágicamente al revés</p>
                    </div>
                    
                    <!-- Qué le gusta hacer -->
                    <div class="bg-white p-4 rounded-lg border-2 border-blue-300">
                        <label class="block font-bold text-blue-600 mb-2">💖 ¿Qué le gusta hacer?</label>
                        <div class="grid grid-cols-2 gap-2">
                            <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                <input type="checkbox" name="gustos" value="bailar" class="w-5 h-5">
                                <span>💃 Bailar</span>
                            </label>
                            <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                <input type="checkbox" name="gustos" value="cantar" class="w-5 h-5">
                                <span>🎤 Cantar</span>
                            </label>
                            <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                <input type="checkbox" name="gustos" value="dibujar" class="w-5 h-5">
                                <span>🎨 Dibujar</span>
                            </label>
                            <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                <input type="checkbox" name="gustos" value="explorar" class="w-5 h-5">
                                <span>🗺️ Explorar</span>
                            </label>
                            <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                <input type="checkbox" name="gustos" value="volar" class="w-5 h-5">
                                <span>🦋 Volar</span>
                            </label>
                            <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                <input type="checkbox" name="gustos" value="nadar" class="w-5 h-5">
                                <span>🏊 Nadar</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Personalidad -->
                    <div class="bg-white p-4 rounded-lg border-2 border-green-300">
                        <label class="block font-bold text-green-600 mb-2">🌟 Personalidad:</label>
                        <select id="personalidad-personaje" class="w-full p-3 border-2 border-green-300 rounded-lg text-lg">
                            <option value="">Selecciona una personalidad...</option>
                            <option value="aventurero">🗺️ Aventurero - Le encanta descubrir</option>
                            <option value="timido">😊 Tímido - Prefiere observar</option>
                            <option value="alegre">😄 Alegre - Siempre está feliz</option>
                            <option value="misterioso">🕵️ Misterioso - Guarda secretos</option>
                            <option value="creativo">🎨 Creativo - Imagina sin parar</option>
                            <option value="sabio">🧙‍♂️ Sabio - Conoce muchas cosas</option>
                            <option value="travieso">😈 Travieso - Le gusta jugar</option>
                            <option value="valiente">🦸 Valiente - Enfrenta miedos</option>
                        </select>
                    </div>
                    
                    <!-- Historia del personaje -->
                    <div class="bg-white p-4 rounded-lg border-2 border-yellow-300">
                        <label class="block font-bold text-yellow-600 mb-2">📖 Cuenta su historia:</label>
                        <textarea id="historia-personaje" 
                                  placeholder="¿De dónde viene? ¿Qué aventuras ha vivido? ¿Cuál es su sueño más grande?"
                                  class="w-full p-3 border-2 border-yellow-300 rounded-lg text-lg min-h-24"
                                  rows="3"></textarea>
                        <p class="text-xs text-gray-500 mt-2">✍️ Deja volar tu imaginación y cuenta todo sobre tu personaje</p>
                    </div>
                    
                    <!-- Botón guardar -->
                    <div class="text-center">
                        <button onclick="guardarPersonaje()" 
                                class="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
                            ✨ Crear Mi Personaje Mágico
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generar contenido para fase corporal
 */
function generarFaseCorporal(fase) {
    return `
        <div class="fase-corporal max-w-4xl mx-auto">
            <div class="narrativa mb-8">
                <h2 class="text-3xl font-bold text-purple-700 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 mb-6">${fase.contenido.narrativa}</p>
                
                <div class="objetivo bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300 mb-6">
                    <h3 class="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
                        <span class="text-2xl">🎯</span> Objetivo
                    </h3>
                    <p class="text-gray-700">${fase.contenido.objetivo}</p>
                </div>
            </div>
            
            <!-- Ejercicios corporales -->
            <div class="ejercicios-corporales bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border-2 border-pink-200 mb-8">
                <h3 class="text-2xl font-bold text-pink-700 mb-6 text-center flex items-center justify-center gap-3">
                    <span class="text-3xl">💃</span> Ejercicios de Movimiento
                </h3>
                
                <div class="ejercicios-grid space-y-6">
                    ${fase.contenido.ejercicios.map((ejercicio, index) => `
                        <div class="ejercicio-card bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200">
                            <div class="flex items-center justify-between mb-4">
                                <h4 class="text-xl font-bold text-purple-700">${index + 1}. ${ejercicio.nombre}</h4>
                                <div class="tiempo bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    ⏱️ ${ejercicio.duracion}
                                </div>
                            </div>
                            <p class="text-gray-700 text-lg mb-4">${ejercicio.instruccion}</p>
                            
                            <div class="ejercicio-controles flex gap-3">
                                <button onclick="hacerConDemo(${index}, '${ejercicio.nombre}')" 
                                        class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 justify-center w-full">
                                    <span>🎯</span> Hacer mientras lo imitan
                                </button>
                            </div>
                            
                            <!-- Área de temporizador -->
                            <div id="timer-${index}" class="timer-area hidden mt-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg text-center">
                                <div class="text-3xl font-bold text-green-700 mb-2" id="countdown-${index}">0:00</div>
                                <div class="text-lg text-gray-600 mb-3" id="status-${index}">Prepárate...</div>
                                <button onclick="completarEjercicio(${index})" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold">
                                    ✓ Completar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${fase.contenido.preguntasReflexion ? `
            <!-- Reflexión corporal -->
            <div class="reflexion-corporal bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300">
                <h3 class="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                    <span class="text-2xl">🤔</span> Reflexión sobre tu Experiencia Corporal
                </h3>
                
                <div class="preguntas-reflexion space-y-4">
                    ${fase.contenido.preguntasReflexion.map((pregunta, index) => `
                        <div class="pregunta-item">
                            <p class="font-medium text-gray-700 mb-2">${index + 1}. ${pregunta}</p>
                            <textarea id="reflexion-${index}" placeholder="Escribe tu reflexión aquí..." 
                                    class="w-full p-3 border-2 border-gray-300 rounded-lg resize-none focus:border-purple-500 focus:outline-none" 
                                    rows="2"></textarea>
                        </div>
                    `).join('')}
                </div>
                
                <div class="reflexion-acciones mt-6 text-center">
                    <button onclick="guardarReflexionCorporal()" class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                        💾 Guardar Reflexiones
                    </button>
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

/**
 * Generar contenido para fase meditativa
 */
function generarFaseMeditativa(fase) {
    return `
        <div class="fase-meditativa max-w-4xl mx-auto text-center">
            <div class="narrativa mb-8">
                <h2 class="text-2xl font-bold text-primary mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 mb-6">${fase.contenido.narrativa}</p>
            </div>
            
            <!-- Espacio de meditación -->
            <div class="espacio-meditacion bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-3xl border-2 border-indigo-300 mb-8">
                <h3 class="text-xl font-bold text-indigo-700 mb-6">🧘‍♀️ Espacio de Meditación Guiada</h3>
                
                <!-- Círculo de respiración -->
                <div class="circulo-respiracion w-32 h-32 mx-auto mb-6 border-4 border-indigo-400 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg" id="circulo-respiracion">
                    Respira
                </div>
                
                <!-- Ondas de sonido -->
                <div class="ondas-sonido flex justify-center gap-2 mb-6" id="ondas-sonido" style="display: none;">
                    ${Array.from({length: 5}, (_, i) => `
                        <div class="onda w-1 h-5 bg-indigo-400 rounded-full" style="animation-delay: ${i * 0.1}s;"></div>
                    `).join('')}
                </div>
                
                <!-- Texto de meditación -->
                <div class="texto-meditacion bg-white p-6 rounded-xl border-2 border-purple-300 mb-6">
                    <p class="text-lg text-gray-700 leading-relaxed" id="texto-meditacion">
                        Prepárate para un viaje interior hacia tu lugar especial...
                    </p>
                </div>
                
                <!-- Barra de progreso de meditación -->
                <div class="progreso-meditacion bg-white p-4 rounded-xl border-2 border-indigo-300 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Progreso del viaje interior</p>
                    <div class="bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div class="progreso-fill-meditacion bg-gradient-to-r from-indigo-400 to-purple-500 h-full transition-all duration-2000" id="progreso-meditacion" style="width: 0%"></div>
                    </div>
                </div>
                
                <!-- Controles de meditación -->
                <div class="controles-meditacion space-y-4">
                    <div class="flex gap-3 justify-center flex-wrap">
                        <button id="btn-iniciar-meditacion" class="btn-meditacion bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all" onclick="iniciarMeditacion()">
                            🌟 Comenzar Meditación Guiada
                        </button>
                        <button id="btn-pausar-meditacion" class="btn-meditacion bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hidden" onclick="pausarMeditacion()">
                            ⏸️ Pausar Meditación
                        </button>
                        <button id="btn-reanudar-meditacion" class="btn-meditacion bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hidden" onclick="reanudarMeditacion()">
                            ▶️ Continuar Meditación
                        </button>
                        <button id="btn-saltar-meditacion" class="btn-meditacion bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all" onclick="saltarMeditacion()">
                            ⏭️ Saltar Meditación
                        </button>
                    </div>
                    
                    <div class="nota-voz bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                        <p class="text-blue-700 text-sm">
                            🔊 <strong>Con narración de voz:</strong> Puedes cerrar los ojos y solo escuchar. La voz te guiará paso a paso.
                        </p>
                    </div>
                </div>
                
                <!-- Estado de meditación finalizada -->
                <div id="meditacion-completada" class="meditacion-completada hidden bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-xl border-2 border-green-300">
                    <h4 class="text-lg font-bold text-green-700 mb-3">✨ ¡Hermoso viaje interior!</h4>
                    <p class="text-gray-700 mb-4">Tu lugar especial está ahora grabado en tu corazón. ¡Vamos a darle vida con arte!</p>
                    <button class="btn-continuar bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-6 rounded-full" onclick="siguienteFaseActividad()">
                        ✨ Continuar a las Misiones
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Estilos para animaciones -->
        <style>
            .circulo-respiracion {
                animation: respirar 4s ease-in-out infinite;
            }
            
            @keyframes respirar {
                0%, 100% { transform: scale(1); border-color: #818cf8; }
                50% { transform: scale(1.1); border-color: #c084fc; box-shadow: 0 0 20px rgba(129, 140, 248, 0.5); }
            }
            
            .onda {
                animation: ondas 1.5s ease-in-out infinite;
            }
            
            @keyframes ondas {
                0%, 100% { height: 20px; }
                50% { height: 40px; }
            }
        </style>
    `;
}

/**
 * Generar contenido para fase narrativa
 */
function generarFaseNarrativa(fase) {
    return `
        <div class="fase-narrativa max-w-4xl mx-auto">
            <div class="narrativa mb-6">
                <h2 class="text-2xl font-bold text-primary mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 mb-6">${fase.contenido.narrativa}</p>
            </div>
            
            <!-- Área de escritura como río -->
            <div class="rio-palabras bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border-2 border-cyan-200 mb-6">
                <h3 class="text-xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
                    <span class="text-2xl">🌊</span> El Río de Palabras Mágicas
                </h3>
                
                <p class="text-gray-700 mb-4">${fase.contenido.instrucciones}</p>
                
                <!-- Preguntas activadoras -->
                <div class="preguntas-activadoras bg-white p-4 rounded-xl border-2 border-blue-300 mb-6">
                    <h4 class="font-bold text-blue-700 mb-3">💡 Para ayudarte a fluir:</h4>
                    <ul class="space-y-2">
                        ${fase.contenido.preguntasActivadoras.map(pregunta => `
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 font-bold">•</span>
                                <span class="text-gray-700">${pregunta}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <!-- Área de escritura principal -->
                <div class="escritura-container bg-white p-6 rounded-xl border-2 border-cyan-300">
                    <textarea id="rio-palabras" placeholder="Deja que las palabras fluyan como un río... escribe todo lo que sientes, ves, hueles, escuchas en tu lugar especial..." class="w-full p-4 border-2 border-cyan-200 rounded-lg resize-none h-40 text-gray-700 text-lg leading-relaxed"></textarea>
                    
                    <div class="estadisticas-escritura flex justify-between items-center mt-4 text-sm text-gray-600">
                        <span>Palabras escritas: <span id="contador-palabras" class="font-bold text-cyan-600">0</span></span>
                        <span>Líneas: <span id="contador-lineas" class="font-bold text-cyan-600">0</span></span>
                    </div>
                </div>
                
                <!-- Animación de flujo -->
                <div class="flujo-visual flex justify-center gap-1 mt-4" id="flujo-palabras">
                    ${Array.from({length: 10}, (_, i) => `
                        <div class="gota-palabra w-2 h-2 bg-cyan-400 rounded-full opacity-60" style="animation: fluir 3s ease-in-out infinite; animation-delay: ${i * 0.3}s;"></div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Área de inspiración adicional -->
            <div class="inspiracion-adicional bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 class="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                    <span class="text-2xl">✨</span> Generador de Inspiración
                </h3>
                
                <div class="flex flex-wrap gap-3 justify-center mb-4">
                    <button class="btn-inspiracion bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-all" onclick="generarPalabraInspiracion('sensorial')">
                        👃 Sensaciones
                    </button>
                    <button class="btn-inspiracion bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-all" onclick="generarPalabraInspiracion('emocional')">
                        💖 Emociones
                    </button>
                    <button class="btn-inspiracion bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition-all" onclick="generarPalabraInspiracion('visual')">
                        👁️ Colores y Formas
                    </button>
                    <button class="btn-inspiracion bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full transition-all" onclick="generarPalabraInspiracion('sonoro')">
                        🎵 Sonidos
                    </button>
                </div>
                
                <div id="palabra-inspiracion" class="palabra-inspiracion hidden bg-white p-4 rounded-xl border-2 border-purple-300 text-center">
                    <p class="text-lg font-bold text-purple-700">Palabra de inspiración:</p>
                    <p class="text-2xl font-bold text-gray-700" id="palabra-generada"></p>
                    <p class="text-sm text-gray-600 mt-2">¡Úsala en tu río de palabras!</p>
                </div>
            </div>
        </div>
        
        <!-- Estilos para animaciones -->
        <style>
            @keyframes fluir {
                0% { transform: translateY(0) scale(1); opacity: 0.6; }
                50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
                100% { transform: translateY(0) scale(1); opacity: 0.6; }
            }
        </style>
    `;
}

/**
 * Generar contenido para fase de reflexión
 */
function generarFaseReflexion(fase, actividadId) {
    const esUltimaActividad = actividadId === 'actividad4';
    
    return `
        <div class="fase-reflexion max-w-4xl mx-auto text-center">
            <div class="narrativa mb-8">
                <h2 class="text-2xl font-bold text-primary mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 mb-6">${fase.contenido.narrativa}</p>
            </div>
            
            ${fase.contenido.logros ? `
                <!-- Galería de logros -->
                <div class="galeria-logros bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-300 mb-8">
                    <h3 class="text-xl font-bold text-orange-700 mb-6 flex items-center gap-2 justify-center">
                        <span class="text-2xl">🏆</span> Tus Logros Creativos
                    </h3>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        ${fase.contenido.logros.map((logro, index) => `
                            <div class="logro-item bg-white p-4 rounded-xl border-2 border-green-300 shadow-lg transform transition-all hover:scale-105">
                                <div class="flex items-center gap-3">
                                    <span class="text-2xl">✅</span>
                                    <p class="text-gray-700 font-medium">${logro}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${fase.contenido.preguntasReflexion ? `
                <!-- Área de reflexión profunda -->
                <div class="reflexion-profunda bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-300 mb-8">
                    <h3 class="text-xl font-bold text-purple-700 mb-6 flex items-center gap-2 justify-center">
                        <span class="text-2xl">💭</span> Momento de Reflexión Profunda
                    </h3>
                    
                    <div class="space-y-6">
                        ${fase.contenido.preguntasReflexion.map((pregunta, index) => `
                            <div class="pregunta-reflexion bg-white p-6 rounded-xl border-2 border-indigo-300">
                                <h4 class="font-bold text-indigo-700 mb-4">${pregunta}</h4>
                                <textarea placeholder="Comparte tus pensamientos más profundos..." class="w-full p-4 border-2 border-indigo-200 rounded-lg resize-none h-24 text-gray-700" id="reflexion-${index}"></textarea>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${fase.contenido.reflexionFinal ? `
                <!-- Reflexión final -->
                <div class="reflexion-final bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-teal-300 mb-8">
                    <h3 class="text-xl font-bold text-teal-700 mb-4">${fase.contenido.reflexionFinal}</h3>
                    <textarea placeholder="Escribe tu reflexión final..." class="w-full p-4 border-2 border-teal-300 rounded-lg resize-none h-32 text-gray-700" id="reflexion-final"></textarea>
                </div>
            ` : ''}
            
            ${fase.contenido.mensajeFinal ? `
                <!-- Mensaje final inspirador -->
                <div class="mensaje-final bg-gradient-to-r from-green-100 to-emerald-100 p-8 rounded-2xl border-2 border-green-300 mb-8">
                    <h3 class="text-2xl font-bold text-green-700 mb-4">🌟 Mensaje Final</h3>
                    <p class="text-lg text-gray-700 leading-relaxed italic">${fase.contenido.mensajeFinal}</p>
                </div>
            ` : ''}
            
            <!-- Celebración interactiva -->
            <div class="celebracion-interactiva bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-2xl border-2 border-pink-300">
                <h3 class="text-xl font-bold text-purple-700 mb-6 flex items-center gap-2 justify-center">
                    <span class="text-2xl">🎉</span> ¡Momento de Celebración!
                </h3>
                
                <div class="espacio-celebracion mb-6">
                    <button class="btn-celebracion bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105" onclick="if(typeof window.celebrarLogro === 'function'){window.celebrarLogro()}else{console.error('celebrarLogro no disponible')}">
                        🎊 ¡Celebrar mi Tesoro Creativo!
                    </button>
                </div>
                
                ${esUltimaActividad ? `
                    <div class="opciones-finales flex flex-wrap gap-4 justify-center">
                        <button class="btn-opcion bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all" onclick="if(typeof window.revisarViaje === 'function'){window.revisarViaje()}">
                            📚 Revisar Todo mi Viaje
                        </button>
                        <button class="btn-opcion bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-full transition-all" onclick="if(typeof window.nuevaAventura === 'function'){window.nuevaAventura()}">
                            🔄 Nueva Aventura
                        </button>
                        <button class="btn-opcion bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full transition-all" onclick="if(typeof window.compartirExperiencia === 'function'){window.compartirExperiencia()}">
                            📤 Compartir Experiencia
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Funciones de utilidad para herramientas
 */
function obtenerIconoHerramienta(herramienta) {
    const iconos = {
        'generador-manchas': '✨',
        'rotador-vista': '🔄',
        'lupa-detalle': '🔍',
        'pincel-magico': '🎨',
        'paleta-emociones': '🌈',
        'transformador-lineas': '⚡',
        'pincel-memoria': '💭',
        'paleta-emocional': '💖',
        'texturizador': '🌀',
        'pincel-retrato': '👤',
        'colores-alma': '🎨',
        'trazos-libres': '✏️',
        'lupa-detective': '🔍',
        'marcador-tesoro': '💎',
        'pincel-transformador': '⚡',
        'paleta-abstracta': '🌀',
        'efectos-magicos': '✨'
    };
    return iconos[herramienta] || '🛠️';
}

function obtenerNombreHerramienta(herramienta) {
    const nombres = {
        'generador-manchas': 'Generador de Manchas',
        'rotador-vista': 'Rotador de Vista',
        'lupa-detalle': 'Lupa de Detalle',
        'pincel-magico': 'Pincel Mágico',
        'paleta-emociones': 'Paleta de Emociones',
        'transformador-lineas': 'Transformador de Líneas',
        'pincel-memoria': 'Pincel de Memoria',
        'paleta-emocional': 'Paleta Emocional',
        'texturizador': 'Texturizador',
        'pincel-retrato': 'Pincel Retrato',
        'colores-alma': 'Colores del Alma',
        'trazos-libres': 'Trazos Libres',
        'lupa-detective': 'Lupa Detective',
        'marcador-tesoro': 'Marcador de Tesoro',
        'pincel-transformador': 'Pincel Transformador',
        'paleta-abstracta': 'Paleta Abstracta',
        'efectos-magicos': 'Efectos Mágicos'
    };
    return nombres[herramienta] || herramienta;
}

/**
 * ================================================
 * FUNCIONES ESPECÍFICAS PARA ACTIVIDAD 3
 * ================================================
 */

/**
 * Generar fase de autorretrato
 */
function generarFaseAutorretrato(fase, actividadId) {
    return `
        <div class="fase-autorretrato bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
            <!-- Encabezado de la fase -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-3xl">🪞</span>
                </div>
                <h2 class="text-3xl font-bold text-purple-800 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">${fase.contenido.narrativa}</p>
            </div>

            <!-- Área de trabajo principal con cámara y lienzo lado a lado -->
            <div class="mb-8">
                <!-- Sección de cámara y canvas -->
                <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h3 class="text-xl font-bold text-purple-700 mb-6 text-center">🎨 Laboratorio de Autorretrato</h3>
                    
                    <div class="grid lg:grid-cols-2 gap-6">
                        <!-- Columna izquierda: Espejo Virtual -->
                        <div class="space-y-4">
                            <h4 class="text-lg font-semibold text-purple-600 text-center">📷 Tu Espejo Mágico</h4>
                            
                            <!-- Espejo virtual con cámara -->
                            <div class="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-4">
                                <div id="camara-container" class="relative">
                                    <!-- Video de la cámara -->
                                    <video id="video-camara" width="300" height="225" class="rounded-lg mx-auto mb-3 hidden border-2 border-purple-300"></video>
                                    
                                    <!-- Placeholder cuando no hay cámara -->
                                    <div id="espejo-placeholder" class="w-32 h-32 bg-purple-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span class="text-5xl">😊</span>
                                    </div>
                                </div>
                                
                                <!-- Botones de cámara -->
                                <div class="flex justify-center gap-2 mb-2">
                                    <button id="btn-activar-camara" class="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors font-medium">
                                        📷 Activar Cámara
                                    </button>
                                    <button id="btn-cerrar-camara" class="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors hidden font-medium">
                                        ❌ Cerrar Cámara
                                    </button>
                                </div>
                                
                                <p class="text-sm text-purple-700 text-center font-medium">Tu reflejo mágico</p>
                            </div>
                            
                            <!-- Tip de uso -->
                            <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                                <p class="text-blue-700 text-sm"><strong>💡 Tip:</strong> Usa la cámara como espejo mientras dibujas tu autorretrato en el lienzo de al lado.</p>
                            </div>
                        </div>
                        
                        <!-- Columna derecha: Lienzo de Dibujo -->
                        <div class="space-y-4">
                            <h4 class="text-lg font-semibold text-purple-600 text-center">🎨 Tu Lienzo del Alma</h4>
                            
                            <div class="flex justify-center">
                                <canvas id="canvas-autorretrato" 
                                        width="300" 
                                        height="400" 
                                        class="border-2 border-purple-300 rounded-lg bg-white cursor-crosshair shadow-lg">
                                </canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Herramientas de autorretrato -->
                    <div class="mt-6 bg-purple-50 rounded-lg p-4">
                        <div class="text-center">
                            <label class="block text-sm font-medium text-purple-700 mb-3">🎨 Colores del Alma</label>
                            <div class="flex justify-center gap-2 flex-wrap mb-4">
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #8B5CF6" data-color="#8B5CF6"></button>
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #EC4899" data-color="#EC4899"></button>
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #F59E0B" data-color="#F59E0B"></button>
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #10B981" data-color="#10B981"></button>
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #3B82F6" data-color="#3B82F6"></button>
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #EF4444" data-color="#EF4444"></button>
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #6B7280" data-color="#6B7280"></button>
                                <button class="color-btn w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform" 
                                        style="background: #000000" data-color="#000000"></button>
                            </div>
                        </div>
                        
                        <div class="flex justify-center gap-3">
                            <button id="tool-brush-retrato" class="tool-btn bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                                🖌️ Pincel
                            </button>
                            <button id="tool-clear-retrato" class="tool-btn bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                                🗑️ Limpiar
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Sección de guías y reflexiones -->
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Consigna especial -->
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <h4 class="font-bold text-yellow-800 mb-2">🚫 ${fase.contenido.consignaEspecial || 'Regla del Atelier'}</h4>
                        <p class="text-yellow-700">¡No borrar ni eliminar nada! Cada línea tiene su propósito en tu autorretrato.</p>
                    </div>
                    
                    <!-- Preguntas guía -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h4 class="text-lg font-bold text-purple-700 mb-4">💭 Preguntas para Inspirarte</h4>
                        <div class="space-y-3">
                            ${fase.contenido.preguntasGuia ? fase.contenido.preguntasGuia.map(pregunta => `
                                <div class="flex items-start">
                                    <span class="text-purple-500 mr-2">•</span>
                                    <p class="text-gray-700">${pregunta}</p>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Reflexión personal -->
                <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
                    <h4 class="text-lg font-bold text-purple-700 mb-4">✍️ Diario del Artista</h4>
                    <textarea id="reflexion-autorretrato" 
                              class="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent" 
                              rows="4" 
                              placeholder="¿Cómo te sientes dibujándote a ti mismo? ¿Qué descubres de tu rostro?"></textarea>
                </div>
            </div>

            <!-- Mensaje motivacional -->
            <div class="text-center">
                <div class="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4 mb-6">
                    <p class="font-medium text-purple-800 italic">"Tu autorretrato no necesita parecerse a una foto. Necesita parecerse a tu alma."</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generar fase de exploración/detective
 */
function generarFaseExploracion(fase, actividadId) {
    return `
        <div class="fase-exploracion bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl">
            <!-- Encabezado -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-3xl">🔍</span>
                </div>
                <h2 class="text-3xl font-bold text-amber-800 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">${fase.contenido.narrativa}</p>
            </div>

            <!-- Área de trabajo -->
            <div class="grid lg:grid-cols-2 gap-8 mb-8">
                <!-- Análisis del autorretrato -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-amber-700 mb-4 text-center">🕵️ Mesa de Investigación</h3>
                    
                    <!-- Vista del autorretrato anterior -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                        <p class="text-sm text-gray-600 mb-2">Tu autorretrato anterior</p>
                        <div id="autorretrato-analisis" class="border-2 border-dashed border-amber-300 rounded-lg min-h-48 flex items-center justify-center">
                            <p class="text-amber-600">Se cargará tu autorretrato aquí</p>
                        </div>
                    </div>
                    
                    <!-- Herramientas de detective -->
                    <div class="space-y-4">
                        <div class="bg-amber-50 rounded-lg p-4">
                            <h4 class="font-bold text-amber-700 mb-3">🔍 Herramientas del Detective</h4>
                            <div class="flex justify-center gap-3">
                                <button id="lupa-aumentar" class="tool-btn bg-amber-100 text-amber-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">
                                    🔍 Lupa +
                                </button>
                                <button id="marcador-error" class="tool-btn bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                                    📍 Marcar Tesoro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ficha del detective -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-amber-700 mb-4">📋 Ficha del Tesoro Escondido</h3>
                    
                    <div class="space-y-4">
                        ${fase.contenido.preguntasDetective ? fase.contenido.preguntasDetective.map((pregunta, index) => `
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-amber-700">${pregunta}</label>
                                <textarea id="respuesta-detective-${index}" 
                                          class="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
                                          rows="2" 
                                          placeholder="Escribe tu observación..."></textarea>
                            </div>
                        `).join('') : ''}
                        
                        <!-- Selector de ubicación del error -->
                        <div class="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4">
                            <h4 class="font-bold text-amber-800 mb-3">📍 Localización del Tesoro</h4>
                            <p class="text-sm text-amber-700 mb-3">Haz clic en tu autorretrato para marcar dónde está tu "error" favorito</p>
                            <div id="coordenadas-error" class="text-xs text-amber-600"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mensaje motivacional -->
            <div class="text-center">
                <div class="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4">
                    <p class="font-medium text-amber-800 italic">"Cada 'error' es un tesoro esperando ser descubierto. ¡Tu misión es encontrarlo!"</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generar fase abstracta
 */
function generarFaseAbstracta(fase, actividadId) {
    return `
        <div class="fase-abstracta bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl">
            <!-- Encabezado -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-3xl">✨</span>
                </div>
                <h2 class="text-3xl font-bold text-emerald-800 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">${fase.contenido.narrativa}</p>
            </div>

            <!-- Área de trabajo -->
            <div class="grid lg:grid-cols-2 gap-8 mb-8">
                <!-- Canvas abstracto -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-emerald-700 mb-4 text-center">🎨 Laboratorio de Transformación</h3>
                    
                    <canvas id="canvas-abstracto" 
                            width="400" 
                            height="400" 
                            class="border-2 border-emerald-300 rounded-lg bg-white mx-auto block cursor-crosshair">
                    </canvas>
                    
                    <!-- Herramientas abstractas -->
                    <div class="mt-4 space-y-3">
                        <div class="text-center">
                            <label class="block text-sm font-medium text-emerald-700 mb-2">🌈 Paleta Abstracta</label>
                            <div id="paleta-colores-abstracta" class="flex justify-center gap-2 flex-wrap">
                                <!-- Los colores se generarán dinámicamente -->
                            </div>
                        </div>
                        
                        <div class="flex justify-center gap-3 flex-wrap">
                            <button id="tool-brush-abstracto" class="tool-btn bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors">
                                🖌️ Pincel Mágico
                            </button>
                            <button id="tool-spray" class="tool-btn bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors">
                                💨 Aerógrafo
                            </button>
                            <button id="tool-stamp" class="tool-btn bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors">
                                🔸 Formas
                            </button>
                            <button id="intercambio-paleta" class="tool-btn bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
                                🔄 Intercambio Mágico
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Guía de transformación -->
                <div class="space-y-6">
                    <!-- Instrucciones paso a paso -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h4 class="text-lg font-bold text-emerald-700 mb-4">🧪 Fórmula de Transformación</h4>
                        <div class="space-y-3">
                            ${fase.contenido.instrucciones ? fase.contenido.instrucciones.map((instruccion, index) => `
                                <div class="flex items-start">
                                    <span class="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">${index + 1}</span>
                                    <p class="text-gray-700">${instruccion}</p>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                    
                    <!-- Zona de sorpresa -->
                    ${fase.contenido.sorpresaCreativa ? `
                        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                            <h4 class="text-lg font-bold text-yellow-700 mb-3">${fase.contenido.sorpresaCreativa.titulo}</h4>
                            <p class="text-yellow-800">${fase.contenido.sorpresaCreativa.descripcion}</p>
                            <button id="activar-sorpresa" class="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                ✨ ¡Activar Sorpresa!
                            </button>
                        </div>
                    ` : ''}
                    
                    <!-- Reflexiones de transformación -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h4 class="text-lg font-bold text-emerald-700 mb-4">💭 Diario de Metamorfosis</h4>
                        <div class="space-y-3">
                            ${fase.contenido.preguntasTransformacion ? fase.contenido.preguntasTransformacion.map((pregunta, index) => `
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-emerald-700">${pregunta}</label>
                                    <textarea id="reflexion-transformacion-${index}" 
                                              class="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent" 
                                              rows="2" 
                                              placeholder="Comparte tu experiencia..."></textarea>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error transformado -->
            <div class="text-center mb-6">
                <div class="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4">
                    <p class="font-medium text-emerald-800 italic">"Tu 'error' se está convirtiendo en arte. ¡Observa cómo lo imperfecto se vuelve extraordinario!"</p>
                </div>
            </div>
        </div>
    `;
}

// Continuará con más funciones...

/**
 * Generar fase de galería personal
 */
function generarFaseGaleria(fase, actividadId) {
    return `
        <div class="fase-galeria bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
            <!-- Encabezado de la fase -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-3xl">🎨</span>
                </div>
                <h2 class="text-3xl font-bold text-indigo-800 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">${fase.contenido.narrativa}</p>
            </div>

            <!-- Galería de creaciones anteriores -->
            <div class="galeria-personal bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 class="text-xl font-bold text-indigo-700 mb-6 text-center">🖼️ Tus Obras Maestras</h3>
                
                <div class="grid md:grid-cols-3 gap-6 mb-6">
                    <!-- Actividad 1 -->
                    <div class="obra-container bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                        <h4 class="font-bold text-purple-700 mb-2">🎭 Somos Manchas que se Mueven</h4>
                        <div id="galeria-actividad1" class="obra-placeholder bg-purple-100 h-32 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                            <span class="text-purple-500">Buscar mis personajes de manchas</span>
                        </div>
                        <button class="btn-cargar bg-purple-500 text-white px-3 py-1 rounded-lg text-sm mt-2 w-full hover:bg-purple-600 transition-colors" data-actividad="1">
                            📁 Buscar mis creaciones
                        </button>
                    </div>
                    
                    <!-- Actividad 2 -->
                    <div class="obra-container bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                        <h4 class="font-bold text-blue-700 mb-2">🏠 El Lugar que me Habita</h4>
                        <div id="galeria-actividad2" class="obra-placeholder bg-blue-100 h-32 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                            <span class="text-blue-500">Buscar mi lugar especial</span>
                        </div>
                        <button class="btn-cargar bg-blue-500 text-white px-3 py-1 rounded-lg text-sm mt-2 w-full hover:bg-blue-600 transition-colors" data-actividad="2">
                            📁 Buscar mis creaciones
                        </button>
                    </div>
                    
                    <!-- Actividad 3 -->
                    <div class="obra-container bg-green-50 rounded-lg p-4 border-2 border-green-200">
                        <h4 class="font-bold text-green-700 mb-2">🎭 Del Retrato a la Resignificación</h4>
                        <div id="galeria-actividad3" class="obra-placeholder bg-green-100 h-32 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
                            <span class="text-green-500">Buscar mi autorretrato</span>
                        </div>
                        <button class="btn-cargar bg-green-500 text-white px-3 py-1 rounded-lg text-sm mt-2 w-full hover:bg-green-600 transition-colors" data-actividad="3">
                            📁 Buscar mis creaciones
                        </button>
                    </div>
                </div>
                
                <!-- Input para cargar archivos -->
                <input type="file" id="file-input-galeria" accept="image/*" multiple class="hidden">
            </div>

            <!-- Preguntas de reflexión -->
            <div class="reflexion-galeria bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-indigo-700 mb-6">💭 Reflexiones del Curador</h3>
                <div class="space-y-4">
                    ${fase.contenido.preguntasGuia ? fase.contenido.preguntasGuia.map((pregunta, index) => `
                        <div class="pregunta bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                            <p class="font-medium text-indigo-700 mb-2">${pregunta}</p>
                            <textarea class="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent" 
                                      rows="2" 
                                      placeholder="Escribe tu reflexión aquí..."
                                      id="reflexion-galeria-${index}"></textarea>
                        </div>
                    `).join('') : ''}
                </div>
            </div>

            <!-- Mensaje motivacional -->
            <div class="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl mt-6 text-center border-2 border-indigo-300">
                <p class="font-medium text-indigo-800 italic">"Cada obra que has creado es un capítulo de tu historia creativa. Juntas, forman el libro de tu transformación."</p>
            </div>
        </div>
    `;
}

/**
 * Generar fase de análisis de errores
 */
function generarFaseAnalisis(fase, actividadId) {
    return `
        <div class="fase-analisis bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl">
            <!-- Encabezado de la fase -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-3xl">🔍</span>
                </div>
                <h2 class="text-3xl font-bold text-amber-800 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">${fase.contenido.narrativa}</p>
            </div>

            <!-- Preguntas guía de reflexión -->
            <div class="preguntas-analisis bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-amber-700 mb-6">🤔 Preguntas del Arqueólogo</h3>
                <div class="grid md:grid-cols-1 gap-6">
                    ${fase.contenido.preguntasGuia ? fase.contenido.preguntasGuia.map((pregunta, index) => `
                        <div class="pregunta bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                            <p class="font-medium text-amber-700 mb-2">${pregunta}</p>
                            <textarea class="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm" 
                                      rows="3" 
                                      placeholder="Tu respuesta de arqueólogo..."
                                      id="reflexion-analisis-${index}"></textarea>
                        </div>
                    `).join('') : ''}
                </div>
            </div>

            <!-- Mensaje motivacional -->
            <div class="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl mt-6 text-center border-2 border-amber-300">
                <p class="font-medium text-amber-800 italic">"Cada 'error' que encuentres es una joya escondida esperando ser pulida hasta brillar."</p>
            </div>
        </div>
    `;
}

/**
 * Generar fase de exhibición del museo personal
 */
function generarFaseExhibicion(fase, actividadId) {
    return `
        <div class="fase-exhibicion bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
            <!-- Encabezado de la fase -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-3xl">�</span>
                    <span class="text-white text-3xl">�</span>
                </div>
                <h2 class="text-3xl font-bold text-purple-800 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">Como curador de tu propia galería, vas a crear una experiencia única donde el error se celebra como protagonista.</p>
            </div>

            <!-- Lluvia de Ideas Interactiva -->
            <div class="lluvia-ideas bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 class="text-xl font-bold text-purple-700 mb-6 text-center">💭 Lluvia de Ideas sobre el Error</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-purple-600 font-medium mb-4">🌟 Haz clic para agregar ideas sobre el error:</p>
                        <div class="flex flex-wrap gap-2 mb-4" id="ideas-container">
                            <!-- Ideas se agregarán aquí dinámicamente -->
                        </div>
                        <div class="flex gap-2">
                            <input type="text" id="nueva-idea" class="flex-1 p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Escribe una idea sobre el error...">
                            <button onclick="agregarIdea()" class="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">➕</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <canvas id="canvas-ideas" width="500" height="350" class="border border-purple-200 rounded-lg cursor-pointer" onclick="crearIdeaVisual()"></canvas>
                    </div>
                </div>
            </div>

            <!-- Reflexión Antes vs Ahora -->
            <div class="reflexion-transformacion bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 class="text-xl font-bold text-purple-700 mb-6 text-center">🔄 Tu Transformación Personal</h3>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="antes bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                        <h4 class="text-lg font-bold text-red-700 mb-4 flex items-center">
                            <span class="mr-2">😰</span> ANTES: El error era...
                        </h4>
                        <div class="space-y-3">
                            <button onclick="seleccionarSentimiento('antes', 'frustrante')" class="sentimiento-btn w-full p-3 text-left bg-red-100 hover:bg-red-200 rounded-lg transition-colors" data-tipo="antes" data-valor="frustrante">
                                😡 Frustrante y molesto
                            </button>
                            <button onclick="seleccionarSentimiento('antes', 'vergonzoso')" class="sentimiento-btn w-full p-3 text-left bg-red-100 hover:bg-red-200 rounded-lg transition-colors" data-tipo="antes" data-valor="vergonzoso">
                                😳 Vergonzoso y humillante
                            </button>
                            <button onclick="seleccionarSentimiento('antes', 'limitante')" class="sentimiento-btn w-full p-3 text-left bg-red-100 hover:bg-red-200 rounded-lg transition-colors" data-tipo="antes" data-valor="limitante">
                                🚫 Limitante y bloqueador
                            </button>
                        </div>
                        <div class="mt-4">
                            <input type="text" id="antes-personalizado" class="w-full p-3 border border-red-300 rounded-lg" placeholder="O describe tu propia experiencia...">
                        </div>
                    </div>
                    
                    <div class="ahora bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
                        <h4 class="text-lg font-bold text-green-700 mb-4 flex items-center">
                            <span class="mr-2">✨</span> AHORA: El error es...
                        </h4>
                        <div class="space-y-3">
                            <button onclick="seleccionarSentimiento('ahora', 'oportunidad')" class="sentimiento-btn w-full p-3 text-left bg-green-100 hover:bg-green-200 rounded-lg transition-colors" data-tipo="ahora" data-valor="oportunidad">
                                🚀 Una oportunidad de crecimiento
                            </button>
                            <button onclick="seleccionarSentimiento('ahora', 'creatividad')" class="sentimiento-btn w-full p-3 text-left bg-green-100 hover:bg-green-200 rounded-lg transition-colors" data-tipo="ahora" data-valor="creatividad">
                                🎨 Un impulso para la creatividad
                            </button>
                            <button onclick="seleccionarSentimiento('ahora', 'aprendizaje')" class="sentimiento-btn w-full p-3 text-left bg-green-100 hover:bg-green-200 rounded-lg transition-colors" data-tipo="ahora" data-valor="aprendizaje">
                                📚 Una lección valiosa
                            </button>
                        </div>
                        <div class="mt-4">
                            <input type="text" id="ahora-personalizado" class="w-full p-3 border border-green-300 rounded-lg" placeholder="O describe tu nueva perspectiva...">
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-6">
                    <button onclick="crearVisualizacionTransformacion()" class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                        ✨ Visualizar mi Transformación
                    </button>
                </div>
                <div id="visualizacion-transformacion" class="mt-6 hidden">
                    <div class="canvas-wrapper bg-white p-4 rounded-xl border-2 border-purple-200 shadow-lg">
                        <canvas id="canvas-transformacion" width="1000" height="600" class="mx-auto border border-purple-200 rounded-lg block"></canvas>
                    </div>
                </div>
            </div>

            <!-- Ceremonia de Huella Digital -->
            <div class="ceremonia-huella bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 border-2 border-yellow-300">
                <h3 class="text-2xl font-bold text-orange-700 mb-6 text-center">� Ceremonia Final: Plasma tu Huella</h3>
                <h3 class="text-2xl font-bold text-orange-700 mb-6 text-center">� Ceremonia Final: Plasma tu Huella</h3>
                <p class="text-center text-orange-600 mb-6 text-lg">Has completado un viaje extraordinario. Es momento de sellar tu transformación con orgullo.</p>
                
                <div class="flex flex-col items-center space-y-6">
                    <div class="huella-canvas-container relative">
                        <canvas id="canvas-huella" width="400" height="400" class="border-4 border-dashed border-orange-300 rounded-full cursor-pointer bg-white" onclick="colocarHuella()"></canvas>
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none" id="mensaje-huella">
                            <p class="text-orange-500 text-center font-medium">
                                👆<br>
                                Coloca tu dedo aquí<br>
                                para crear tu huella
                            </p>
                        </div>
                    </div>
                    
                    <button id="btn-colocar-dedo" onclick="colocarHuella()" class="px-8 py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xl font-bold rounded-full hover:from-orange-500 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg">
                        👆 Colocar Dedo
                    </button>
                    
                    <div id="personalizacion-huella" class="hidden space-y-4">
                        <div class="flex justify-center space-x-4">
                            <button onclick="cambiarColorHuella('#FF6B6B')" class="w-8 h-8 rounded-full bg-red-400 hover:scale-110 transition-transform" style="background-color: #FF6B6B"></button>
                            <button onclick="cambiarColorHuella('#4ECDC4')" class="w-8 h-8 rounded-full bg-teal-400 hover:scale-110 transition-transform" style="background-color: #4ECDC4"></button>
                            <button onclick="cambiarColorHuella('#45B7D1')" class="w-8 h-8 rounded-full bg-blue-400 hover:scale-110 transition-transform" style="background-color: #45B7D1"></button>
                            <button onclick="cambiarColorHuella('#96CEB4')" class="w-8 h-8 rounded-full bg-green-400 hover:scale-110 transition-transform" style="background-color: #96CEB4"></button>
                            <button onclick="cambiarColorHuella('#FFEAA7')" class="w-8 h-8 rounded-full bg-yellow-400 hover:scale-110 transition-transform" style="background-color: #FFEAA7"></button>
                            <button onclick="cambiarColorHuella('#DDA0DD')" class="w-8 h-8 rounded-full bg-purple-400 hover:scale-110 transition-transform" style="background-color: #DDA0DD"></button>
                        </div>
                        
                        <div class="flex justify-center space-x-4">
                            <button onclick="agregarDecoracion('corazones')" class="px-4 py-2 bg-pink-200 text-pink-700 rounded-lg hover:bg-pink-300 transition-colors">💕 Corazones</button>
                            <button onclick="agregarDecoracion('estrellas')" class="px-4 py-2 bg-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-300 transition-colors">⭐ Estrellas</button>
                            <button onclick="agregarDecoracion('flores')" class="px-4 py-2 bg-green-200 text-green-700 rounded-lg hover:bg-green-300 transition-colors">🌸 Flores</button>
                        </div>
                        
                        <div class="text-center">
                            <button onclick="finalizarCeremonia()" class="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                                🎉 Finalizar Ceremonia
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generar fase reflexiva final - Manifiesto del Error
 */
function generarFaseReflexiva(fase, actividadId) {
    return `
        <div class="fase-reflexiva bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
            <!-- Encabezado de la fase -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-white text-3xl">✨</span>
                </div>
                <h2 class="text-3xl font-bold text-purple-800 mb-4">${fase.titulo}</h2>
                <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">Crea tu manifiesto visual del Error Creativo seleccionando emociones, símbolos y momentos que representen tu transformación.</p>
            </div>

            <!-- Manifiesto Visual Interactivo -->
            <div class="manifiesto-visual bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 class="text-xl font-bold text-purple-700 mb-6 text-center">🎨 Tu Manifiesto Visual</h3>
                
                <!-- Canvas principal del manifiesto -->
                <div class="flex justify-center mb-6">
                    <div class="canvas-wrapper bg-white p-4 rounded-xl border-2 border-purple-200 shadow-lg">
                        <canvas id="canvas-manifiesto" width="1000" height="600" class="border-2 border-purple-200 rounded-lg cursor-crosshair bg-gradient-to-br from-white to-purple-50 block mx-auto"></canvas>
                    </div>
                </div>

                <!-- Paleta de emociones -->
                <div class="seccion-emociones mb-6">
                    <h4 class="text-lg font-bold text-purple-600 mb-4 text-center">🎭 Selecciona tus Emociones de Transformación</h4>
                    <div class="grid grid-cols-4 md:grid-cols-8 gap-3 justify-center">
                        <button onclick="agregarEmocion('😢', 'tristeza')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-blue-100 rounded-full hover:bg-blue-200" title="Tristeza inicial">😢</button>
                        <button onclick="agregarEmocion('😠', 'frustración')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-red-100 rounded-full hover:bg-red-200" title="Frustración">😠</button>
                        <button onclick="agregarEmocion('😰', 'miedo')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-gray-100 rounded-full hover:bg-gray-200" title="Miedo al error">😰</button>
                        <button onclick="agregarEmocion('🤔', 'reflexión')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-yellow-100 rounded-full hover:bg-yellow-200" title="Momento de reflexión">🤔</button>
                        <button onclick="agregarEmocion('💡', 'descubrimiento')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-green-100 rounded-full hover:bg-green-200" title="Descubrimiento">💡</button>
                        <button onclick="agregarEmocion('😊', 'alegría')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-pink-100 rounded-full hover:bg-pink-200" title="Alegría del crecimiento">😊</button>
                        <button onclick="agregarEmocion('🚀', 'transformación')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-purple-100 rounded-full hover:bg-purple-200" title="Transformación">🚀</button>
                        <button onclick="agregarEmocion('🏆', 'triunfo')" class="emoji-btn p-4 text-3xl hover:scale-125 transition-transform bg-orange-100 rounded-full hover:bg-orange-200" title="Sensación de triunfo">🏆</button>
                    </div>
                </div>

                <!-- Símbolos del viaje creativo -->
                <div class="seccion-simbolos mb-6">
                    <h4 class="text-lg font-bold text-purple-600 mb-4 text-center">🌟 Símbolos de tu Viaje Creativo</h4>
                    <div class="grid grid-cols-4 md:grid-cols-6 gap-3 justify-center">
                        <button onclick="agregarSimbolo('🌱', 'crecimiento')" class="simbolo-btn p-3 text-2xl hover:scale-125 transition-transform bg-green-50 rounded-lg hover:bg-green-100" title="Crecimiento">🌱</button>
                        <button onclick="agregarSimbolo('🦋', 'metamorfosis')" class="simbolo-btn p-3 text-2xl hover:scale-125 transition-transform bg-blue-50 rounded-lg hover:bg-blue-100" title="Metamorfosis">🦋</button>
                        <button onclick="agregarSimbolo('🔥', 'pasión')" class="simbolo-btn p-3 text-2xl hover:scale-125 transition-transform bg-red-50 rounded-lg hover:bg-red-100" title="Pasión creativa">🔥</button>
                        <button onclick="agregarSimbolo('⭐', 'inspiración')" class="simbolo-btn p-3 text-2xl hover:scale-125 transition-transform bg-yellow-50 rounded-lg hover:bg-yellow-100" title="Inspiración">⭐</button>
                        <button onclick="agregarSimbolo('🌈', 'diversidad')" class="simbolo-btn p-3 text-2xl hover:scale-125 transition-transform bg-pink-50 rounded-lg hover:bg-pink-100" title="Diversidad de errores">🌈</button>
                        <button onclick="agregarSimbolo('🎨', 'creatividad')" class="simbolo-btn p-3 text-2xl hover:scale-125 transition-transform bg-purple-50 rounded-lg hover:bg-purple-100" title="Creatividad pura">🎨</button>
                    </div>
                </div>

                <!-- Momentos clave visuales -->
                <div class="momentos-clave mb-6">
                    <h4 class="text-lg font-bold text-purple-600 mb-4 text-center">⚡ Conecta tus Momentos de Transformación</h4>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <button onclick="crearMomento('error-inicial')" class="momento-btn p-4 bg-red-50 hover:bg-red-100 rounded-xl border-2 border-red-200 transition-all hover:scale-105">
                            <div class="text-2xl mb-2">❌</div>
                            <div class="text-sm font-medium text-red-700">Error Inicial</div>
                        </button>
                        <button onclick="crearMomento('confusion')" class="momento-btn p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl border-2 border-yellow-200 transition-all hover:scale-105">
                            <div class="text-2xl mb-2">🌪️</div>
                            <div class="text-sm font-medium text-yellow-700">Confusión</div>
                        </button>
                        <button onclick="crearMomento('busqueda')" class="momento-btn p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border-2 border-blue-200 transition-all hover:scale-105">
                            <div class="text-2xl mb-2">🔍</div>
                            <div class="text-sm font-medium text-blue-700">Búsqueda</div>
                        </button>
                        <button onclick="crearMomento('descubrimiento')" class="momento-btn p-4 bg-green-50 hover:bg-green-100 rounded-xl border-2 border-green-200 transition-all hover:scale-105">
                            <div class="text-2xl mb-2">💎</div>
                            <div class="text-sm font-medium text-green-700">Descubrimiento</div>
                        </button>
                        <button onclick="crearMomento('celebracion')" class="momento-btn p-4 bg-purple-50 hover:bg-purple-100 rounded-xl border-2 border-purple-200 transition-all hover:scale-105">
                            <div class="text-2xl mb-2">🎉</div>
                            <div class="text-sm font-medium text-purple-700">Celebración</div>
                        </button>
                        <button onclick="crearMomento('nuevo-yo')" class="momento-btn p-4 bg-pink-50 hover:bg-pink-100 rounded-xl border-2 border-pink-200 transition-all hover:scale-105">
                            <div class="text-2xl mb-2">✨</div>
                            <div class="text-sm font-medium text-pink-700">Nuevo Yo</div>
                        </button>
                    </div>
                </div>

                <!-- Herramientas de dibujo -->
                <div class="herramientas-dibujo mb-6">
                    <h4 class="text-lg font-bold text-purple-600 mb-4 text-center">✏️ Herramientas de Expresión</h4>
                    <div class="flex justify-center space-x-4 flex-wrap gap-2">
                        <button onclick="cambiarHerramienta('pincel')" id="btn-pincel" class="herramienta-btn px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">🖌️ Pincel</button>
                        <button onclick="cambiarHerramienta('linea')" id="btn-linea" class="herramienta-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">📏 Línea</button>
                        <button onclick="cambiarHerramienta('circulo')" id="btn-circulo" class="herramienta-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">⭕ Círculo</button>
                        <button onclick="cambiarHerramienta('corazon')" id="btn-corazon" class="herramienta-btn px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">💖 Corazón</button>
                        <button onclick="limpiarCanvas()" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">🗑️ Limpiar</button>
                    </div>
                </div>

                <!-- Finalizar manifiesto -->
                <div class="text-center">
                    <button onclick="finalizarManifiesto()" class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg">
                        🌟 Completar mi Manifiesto Visual
                    </button>
                </div>
            </div>

            <!-- Certificado visual de finalización -->
            <div id="certificado-final" class="hidden certificado-maestria bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-xl border-2 border-yellow-400 text-center mt-8">
                <div class="text-6xl mb-4">🏆</div>
                <h4 class="text-3xl font-bold text-yellow-700 mb-4">Maestro Curador del Error Creativo</h4>
                <p class="text-yellow-600 text-lg italic mb-6">Has demostrado que cualquier 'error' puede convertirse en la semilla de una historia extraordinaria</p>
                <div class="bg-white rounded-lg p-6 inline-block shadow-lg">
                    <canvas id="certificado-canvas" width="300" height="200" class="border border-yellow-300 rounded"></canvas>
                </div>
                <p class="text-purple-600 font-bold text-xl mt-6">¡Tu viaje creativo apenas comienza!</p>
            </div>
        </div>
    `;
}

/**
 * ================================================
 * FUNCIONES DE INTERACTIVIDAD Y NAVEGACIÓN
 * ================================================
 */

/**
 * Actualizar progreso visual de la actividad
 */
function actualizarProgresoActividad(faseActual, totalFases) {
    // Actualizar indicadores de fase
    document.querySelectorAll('.indicador-fase').forEach((indicador, index) => {
        if (index <= faseActual) {
            indicador.classList.add('bg-primary', 'scale-125');
            indicador.classList.remove('bg-gray-300');
        } else {
            indicador.classList.remove('bg-primary', 'scale-125');
            indicador.classList.add('bg-gray-300');
        }
    });
    
    // Actualizar barra de progreso
    const progreso = ((faseActual + 1) / totalFases) * 100;
    const barraProgreso = document.querySelector('.progreso-fill');
    if (barraProgreso) {
        barraProgreso.style.width = progreso + '%';
    }
    
    // Actualizar número de fase
    const numeroFase = document.getElementById('fase-actual-num');
    if (numeroFase) {
        numeroFase.textContent = faseActual + 1;
    }
}

/**
 * Actualizar controles de navegación
 */
function actualizarControlesNavegacion(faseActual, totalFases) {
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    
    if (btnAnterior) {
        btnAnterior.disabled = faseActual === 0;
        if (faseActual === 0) {
            btnAnterior.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            btnAnterior.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    
    if (btnSiguiente) {
        if (faseActual === totalFases - 1) {
            btnSiguiente.textContent = '🎉 ¡Terminar!';
            btnSiguiente.classList.add('bg-green-500', 'hover:bg-green-600');
            btnSiguiente.classList.remove('bg-primary', 'hover:bg-primary-dark');
        } else {
            btnSiguiente.textContent = 'Siguiente →';
            btnSiguiente.classList.remove('bg-green-500', 'hover:bg-green-600');
            btnSiguiente.classList.add('bg-primary', 'hover:bg-primary-dark');
        }
    }
}

/**
 * Configurar event listeners principales de la actividad
 */
function configurarEventListenersActividad() {
    console.log('🔧 Configurando event listeners de actividad...');
    
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    
    if (btnAnterior) {
        // Remover event listeners previos para evitar duplicados
        btnAnterior.removeEventListener('click', anteriorFaseActividad);
        btnAnterior.addEventListener('click', anteriorFaseActividad);
        console.log('✅ Event listener configurado para botón anterior');
    } else {
        console.warn('⚠️ Botón anterior no encontrado');
    }
    
    if (btnSiguiente) {
        // Remover event listeners previos para evitar duplicados  
        btnSiguiente.removeEventListener('click', siguienteFaseActividad);
        btnSiguiente.addEventListener('click', siguienteFaseActividad);
        console.log('✅ Event listener configurado para botón siguiente');
    } else {
        console.warn('⚠️ Botón siguiente no encontrado');
    }
}

/**
 * Guardar datos de la fase actual
 */
function guardarDatosFaseActual() {
    const actividadId = ActividadState.actividadActual;
    const faseActual = ActividadState.faseActual;
    
    if (!actividadId) return;
    
    // Guardar canvas si existe
    if (ActividadState.canvas) {
        const canvasData = ActividadState.canvas.toDataURL();
        if (!ActividadState.dibujos[actividadId]) {
            ActividadState.dibujos[actividadId] = {};
        }
        ActividadState.dibujos[actividadId][faseActual] = canvasData;
    }
    
    // Guardar reflexiones
    const reflexionTextarea = document.getElementById('reflexion-creativa');
    if (reflexionTextarea && reflexionTextarea.value.trim()) {
        if (!ActividadState.reflexiones[actividadId]) {
            ActividadState.reflexiones[actividadId] = {};
        }
        ActividadState.reflexiones[actividadId][faseActual] = reflexionTextarea.value;
    }
    
    // Guardar texto narrativo
    const rioTexto = document.getElementById('rio-palabras');
    if (rioTexto && rioTexto.value.trim()) {
        if (!ActividadState.reflexiones[actividadId]) {
            ActividadState.reflexiones[actividadId] = {};
        }
        ActividadState.reflexiones[actividadId]['narrativa'] = rioTexto.value;
    }
}

/**
 * Navegar a la siguiente fase
 */
function siguienteFaseActividad() {
    console.log('🚀 siguienteFaseActividad ejecutada');
    console.log('Estado actual:', ActividadState);
    
    const actividad = ACTIVIDADES_CONFIG[ActividadState.actividadActual];
    if (!actividad) {
        console.error('❌ No se encontró la actividad');
        return;
    }
    
    console.log('✅ Actividad encontrada:', actividad.titulo);
    
    // Limpiar cámara si está activa (específico para autorretrato)
    if (typeof window.limpiarCamaraAutorretrato === 'function') {
        window.limpiarCamaraAutorretrato();
    }
    
    // Guardar datos de la fase actual antes de avanzar
    guardarDatosFaseActual();
    
    if (ActividadState.faseActual < actividad.totalFases - 1) {
        ActividadState.faseActual++;
        console.log('➡️ Avanzando a fase:', ActividadState.faseActual);
        mostrarFaseActividad(ActividadState.actividadActual, ActividadState.faseActual);
    } else {
        console.log('🎉 Última fase alcanzada, completando actividad...');
        
        // Guardar datos finales
        guardarDatosFaseActual();
        
        // Usar setTimeout para asegurar que las funciones estén disponibles
        setTimeout(() => {
            // Intentar llamar a completarActividad
            if (typeof window.completarActividad === 'function') {
                console.log('✅ Llamando a window.completarActividad');
                window.completarActividad();
            } else if (typeof celebrarComplecionActividad === 'function') {
                console.log('✅ Llamando directamente a celebrarComplecionActividad');
                celebrarComplecionActividad();
            } else {
                console.error('❌ No se pudo completar la actividad - funciones no disponibles');
                alert('¡Felicidades! Has completado la actividad.');
                // Regresar al menú
                if (typeof regresarAlMenuPrincipal === 'function') {
                    regresarAlMenuPrincipal();
                }
            }
        }, 50);
    }
}

// Exportar inmediatamente
if (typeof window !== 'undefined') {
    window.siguienteFaseActividad = siguienteFaseActividad;
}

/**
 * Navegar a la fase anterior
 */
function anteriorFaseActividad() {
    console.log('⬅️ Intentando navegar a fase anterior...');
    console.log('Estado actual:', {
        faseActual: ActividadState.faseActual,
        actividadActual: ActividadState.actividadActual
    });
    
    if (ActividadState.faseActual > 0) {
        ActividadState.faseActual--;
        console.log('✅ Navegando a fase:', ActividadState.faseActual);
        mostrarFaseActividad(ActividadState.actividadActual, ActividadState.faseActual);
    } else {
        console.warn('⚠️ Ya está en la primera fase, no se puede retroceder');
    }
}

// Exportar inmediatamente
if (typeof window !== 'undefined') {
    window.anteriorFaseActividad = anteriorFaseActividad;
}

/**
 * Configurar funcionalidades específicas de cada fase
 */
function configurarFaseEspecifica(fase, actividadId, faseIndex) {
    switch (fase.tipo) {
        case 'interactivo':
            configurarFaseInteractiva();
            break;
        case 'creativo':
            configurarFaseCreativa(actividadId);
            break;
        case 'corporal':
            configurarFaseCorporal();
            break;
        case 'autorretrato':
            configurarFaseAutorretrato();
            break;
        case 'exploracion':
            configurarFaseExploracion();
            break;
        case 'abstracto':
            configurarFaseAbstracta();
            break;
        case 'galeria':
            configurarFaseGaleria();
            break;
        case 'analisis':
            configurarFaseAnalisis();
            break;
        case 'exhibicion':
            configurarFaseExhibicion();
            break;
        case 'reflexivo':
            configurarFaseReflexiva();
            break;
        case 'meditativo':
            configurarFaseMeditativa(fase);
            break;
        case 'narrativo':
            configurarFaseNarrativa();
            break;
    }
}

/**
 * ================================================
 * FUNCIONES ESPECÍFICAS PARA CADA TIPO DE FASE
 * ================================================
 */

/**
 * Configurar fase interactiva
 */
function configurarFaseInteractiva() {
    const canvasManchas = document.getElementById('canvas-manchas');
    if (canvasManchas) {
        ActividadState.canvas = canvasManchas;
        ActividadState.ctx = canvasManchas.getContext('2d');
        configurarCanvasInteractivo();
    }
    
    // Inicializar el mini-simulador para crear manchas personales
    setTimeout(() => {
        inicializarMiniSimulador();
    }, 300);
}

/**
 * Configurar fase creativa
 */
function configurarFaseCreativa(actividadId) {
    // Verificar si es la actividad de manchas y cargar simulador avanzado
    if (actividadId === 'actividad1') {
        const container = document.getElementById('herramientas-mancha-container');
        if (container) {
            // Cargar el simulador avanzado
            cargarSimuladorManchaAvanzado();
            return; // No configurar canvas tradicional
        }
    }
    
    // Configurar Estudio de Arte Digital Profesional si existe
    const canvasProfesional = document.getElementById('canvas-mancha-personal');
    if (canvasProfesional && document.querySelector('.estudio-arte-pro')) {
        console.log('🎨 Detectado Estudio de Arte Digital Profesional');
        setTimeout(() => {
            // SOLO inicializar sistema simple
            if (window.inicializarCanvasSimple) {
                console.log('🚀 Inicializando sistema simple de herramientas...');
                window.inicializarCanvasSimple();
            }
            // NO llamar inicializarEstudioArteProfesional() porque resetea el canvas
            console.log('✅ Sistema simple activo - modo profesional deshabilitado para evitar conflictos');
        }, 200);
        return;
    }
    
    // Configuración tradicional para otras actividades
    const canvasPrincipal = document.getElementById('canvas-principal');
    if (canvasPrincipal) {
        ActividadState.canvas = canvasPrincipal;
        ActividadState.ctx = canvasPrincipal.getContext('2d');
        configurarCanvasCreativo(actividadId);
        configurarHerramientasCreativas();
        
        // Si es actividad1, cargar y mostrar la mancha anterior
        if (actividadId === 'actividad1') {
            setTimeout(() => {
                cargarManchaAnterior();
            }, 200);
        }
    }
}

/**
 * Cargar el simulador avanzado de manchas
 */
function cargarSimuladorManchaAvanzado() {
    console.log('🎨 Inicializando simulador de manchas avanzado...');
    
    // El canvas ya está en el HTML, solo necesitamos configurarlo
    setTimeout(() => {
        configurarCanvasBasico();
    }, 100);
}

/**
 * Mostrar canvas de fallback si el simulador no carga
 */
function mostrarFallbackCanvas(container) {
    container.innerHTML = `
        <div class="simulador-fallback bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-300">
            <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-yellow-700 mb-3">🎨 Laboratorio de Manchas Mágicas</h3>
                <p class="text-yellow-800 mb-4">¡Crea manchas realistas y descubre personajes únicos en ellas!</p>
            </div>
            
            <div class="grid lg:grid-cols-4 gap-6">
                <!-- Canvas principal -->
                <div class="lg:col-span-3">
                    <div class="canvas-wrapper bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-300">
                        <canvas id="canvas-principal" width="1200" height="800" class="border-4 border-yellow-400 rounded-xl bg-white w-full shadow-xl mx-auto block"></canvas>
                    </div>
                    
                    <!-- Generador de manchas mágicas -->
                    <div class="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-300">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-bold text-purple-700">✨ Generador de Manchas Mágicas</h4>
                            <button onclick="generarManchaAleatoria()" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                🎲 Crear Mancha
                            </button>
                        </div>
                        <p class="text-sm text-purple-600">Genera una mancha tipo acuarela perfecta para descubrir figuras y personajes únicos</p>
                    </div>
                    
                    <!-- Creador de personajes -->
                    <div class="mt-4 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 p-6 rounded-xl border-2 border-purple-400 shadow-lg">
                        <h4 class="font-bold text-purple-700 mb-4 text-xl flex items-center gap-2">
                            ✨ Dale Vida a Tu Personaje
                        </h4>
                        
                        <div class="space-y-4">
                            <!-- Nombre -->
                            <div class="bg-white p-4 rounded-lg border-2 border-pink-300">
                                <label class="block font-bold text-pink-600 mb-2">🎭 Nombre del Personaje:</label>
                                <input type="text" id="nombre-personaje" placeholder="Escribe tu nombre y mira la magia..." 
                                       class="w-full p-3 border-2 border-pink-300 rounded-lg text-lg"
                                       oninput="generarNombreAlReves()">
                                <div id="nombre-alreves" class="mt-2 text-center p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hidden">
                                    <span class="text-sm text-gray-600">Tu personaje se llama:</span>
                                    <p class="text-2xl font-bold text-purple-700 mt-1"></p>
                                </div>
                                <p class="text-xs text-gray-500 mt-2">💡 Tip: Escribe tu nombre y observa cómo se transforma mágicamente al revés</p>
                            </div>
                            
                            <!-- Qué le gusta hacer -->
                            <div class="bg-white p-4 rounded-lg border-2 border-blue-300">
                                <label class="block font-bold text-blue-600 mb-2">💖 ¿Qué le gusta hacer?</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                        <input type="checkbox" name="gustos" value="bailar" class="w-5 h-5">
                                        <span>💃 Bailar</span>
                                    </label>
                                    <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                        <input type="checkbox" name="gustos" value="cantar" class="w-5 h-5">
                                        <span>🎤 Cantar</span>
                                    </label>
                                    <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                        <input type="checkbox" name="gustos" value="dibujar" class="w-5 h-5">
                                        <span>🎨 Dibujar</span>
                                    </label>
                                    <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                        <input type="checkbox" name="gustos" value="explorar" class="w-5 h-5">
                                        <span>🗺️ Explorar</span>
                                    </label>
                                    <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                        <input type="checkbox" name="gustos" value="volar" class="w-5 h-5">
                                        <span>🦋 Volar</span>
                                    </label>
                                    <label class="flex items-center gap-2 p-2 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                                        <input type="checkbox" name="gustos" value="nadar" class="w-5 h-5">
                                        <span>🏊 Nadar</span>
                                    </label>
                                </div>
                            </div>
                            
                            <!-- Personalidad -->
                            <div class="bg-white p-4 rounded-lg border-2 border-green-300">
                                <label class="block font-bold text-green-600 mb-2">🌟 Personalidad:</label>
                                <select id="personalidad-personaje" class="w-full p-3 border-2 border-green-300 rounded-lg text-lg">
                                    <option value="">Selecciona una personalidad...</option>
                                    <option value="aventurero">🗺️ Aventurero - Le encanta descubrir</option>
                                    <option value="timido">😊 Tímido - Prefiere observar</option>
                                    <option value="alegre">😄 Alegre - Siempre está feliz</option>
                                    <option value="misterioso">🕵️ Misterioso - Guarda secretos</option>
                                    <option value="creativo">🎨 Creativo - Imagina sin parar</option>
                                    <option value="sabio">🧙‍♂️ Sabio - Conoce muchas cosas</option>
                                    <option value="travieso">😈 Travieso - Le gusta jugar</option>
                                    <option value="valiente">🦸 Valiente - Enfrenta miedos</option>
                                </select>
                            </div>
                            
                            <!-- Historia del personaje -->
                            <div class="bg-white p-4 rounded-lg border-2 border-yellow-300">
                                <label class="block font-bold text-yellow-600 mb-2">📖 Cuenta su historia:</label>
                                <textarea id="historia-personaje" 
                                          placeholder="¿De dónde viene? ¿Qué aventuras ha vivido? ¿Cuál es su sueño más grande?"
                                          class="w-full p-3 border-2 border-yellow-300 rounded-lg text-lg min-h-24"
                                          rows="3"></textarea>
                                <p class="text-xs text-gray-500 mt-2">✍️ Deja volar tu imaginación y cuenta todo sobre tu personaje</p>
                            </div>
                            
                            <!-- Botón guardar -->
                            <div class="text-center">
                                <button onclick="guardarPersonaje()" 
                                        class="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
                                    ✨ Crear Mi Personaje Mágico
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 bg-white p-4 rounded-lg border-2 border-yellow-300">
                        <h4 class="font-bold text-yellow-700 mb-2">💡 Consejos creativos:</h4>
                        <div class="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                            <div>• Genera manchas para inspirarte</div>
                            <div>• Observa desde diferentes ángulos</div>
                            <div>• Imagina historias sobre las formas</div>
                            <div>• Dale vida con detalles únicos</div>
                        </div>
                    </div>
                </div>
                
                <!-- Herramientas básicas -->
                <div class="herramientas-basicas bg-white p-6 rounded-xl border-2 border-yellow-300">
                    <h4 class="font-bold text-gray-700 mb-4">🛠️ Herramientas</h4>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block font-medium text-gray-600 mb-2">🎨 Color:</label>
                            <input type="color" id="selector-color" value="#8B5CF6" class="w-full h-12 border-2 border-gray-300 rounded-lg">
                        </div>
                        
                        <div>
                            <label class="block font-medium text-gray-600 mb-2">🖌️ Herramienta:</label>
                            <select id="tipo-pincel" class="w-full p-2 border-2 border-gray-300 rounded-lg">
                                <option value="pincel">✏️ Pincel Fino</option>
                                <option value="pincelGrueso">🖌️ Pincel Grueso</option>
                                <option value="acuarela">💧 Acuarela</option>
                                <option value="aerografo">💨 Aerógrafo</option>
                                <option value="esponja">🧽 Esponja</option>
                                <option value="marcador">✒️ Marcador</option>
                                <option value="difuminado">🌫️ Difuminado</option>
                                <option value="goteo">💦 Goteo</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block font-medium text-gray-600 mb-2">💧 Efecto Agua:</label>
                            <div class="flex items-center gap-2">
                                <input type="checkbox" id="efecto-agua" class="w-5 h-5">
                                <span class="text-sm">Diluir con agua</span>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block font-medium text-gray-600 mb-2">🎨 Opacidad: <span id="opacidad-display">100%</span></label>
                            <input type="range" id="opacidad-pincel" min="10" max="100" value="100" class="w-full">
                        </div>
                        
                        <div>
                            <label class="block font-medium text-gray-600 mb-2">📏 Tamaño: <span id="tamano-display">8px</span></label>
                            <input type="range" id="tamano-pincel" min="2" max="30" value="8" class="w-full">
                        </div>
                        
                        <div class="space-y-2">
                            <button onclick="limpiarCanvas()" class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
                                🗑️ Nueva Mancha
                            </button>
                            <button onclick="guardarCreacion()" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                                💾 Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Configurar canvas básico
    setTimeout(() => {
        configurarCanvasBasico();
    }, 100);
}

/**
 * Configurar canvas con sistema avanzado de herramientas
 */
function configurarCanvasBasico() {
    const canvas = document.getElementById('canvas-principal');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let dibujando = false;
    let ultimoX = 0;
    let ultimoY = 0;
    
    // Estado de herramientas
    const herramientaState = {
        tipo: 'pincel',
        color: '#8B5CF6',
        tamano: 8,
        opacidad: 1,
        efectoAgua: false
    };
    
    // Configurar contexto inicial
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Event listeners del canvas
    canvas.addEventListener('mousedown', iniciarDibujo);
    canvas.addEventListener('mousemove', dibujar);
    canvas.addEventListener('mouseup', terminarDibujo);
    canvas.addEventListener('mouseout', terminarDibujo);
    
    // Eventos táctiles para móviles
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Configurar controles de herramientas
    document.getElementById('selector-color').addEventListener('change', (e) => {
        herramientaState.color = e.target.value;
        ctx.strokeStyle = e.target.value;
    });
    
    document.getElementById('tipo-pincel').addEventListener('change', (e) => {
        herramientaState.tipo = e.target.value;
    });
    
    document.getElementById('tamano-pincel').addEventListener('input', (e) => {
        herramientaState.tamano = parseInt(e.target.value);
        ctx.lineWidth = herramientaState.tamano;
        document.getElementById('tamano-display').textContent = e.target.value + 'px';
    });
    
    const opacidadSlider = document.getElementById('opacidad-pincel');
    if (opacidadSlider) {
        opacidadSlider.addEventListener('input', (e) => {
            herramientaState.opacidad = e.target.value / 100;
            document.getElementById('opacidad-display').textContent = e.target.value + '%';
        });
    }
    
    const efectoAguaCheckbox = document.getElementById('efecto-agua');
    if (efectoAguaCheckbox) {
        efectoAguaCheckbox.addEventListener('change', (e) => {
            herramientaState.efectoAgua = e.target.checked;
        });
    }
    
    // Establecer valores iniciales
    ctx.strokeStyle = herramientaState.color;
    ctx.lineWidth = herramientaState.tamano;
    
    function iniciarDibujo(e) {
        dibujando = true;
        const pos = obtenerPosicionPrecisa(e, canvas);
        ultimoX = pos.x;
        ultimoY = pos.y;
        
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        
        // Para herramientas especiales, hacer punto inicial
        if (['esponja', 'aerografo', 'goteo'].includes(herramientaState.tipo)) {
            aplicarHerramienta(pos.x, pos.y);
        }
    }
    
    function dibujar(e) {
        if (!dibujando) return;
        
        const pos = obtenerPosicionPrecisa(e, canvas);
        aplicarHerramienta(pos.x, pos.y);
        
        ultimoX = pos.x;
        ultimoY = pos.y;
    }
    
    function terminarDibujo() {
        if (dibujando && herramientaState.efectoAgua) {
            aplicarEfectoAguaLocal(ultimoX, ultimoY);
        }
        dibujando = false;
        ctx.beginPath();
    }
    
    /**
     * Aplicar herramienta según el tipo seleccionado
     */
    function aplicarHerramienta(x, y) {
        const color = herramientaState.color;
        const tamano = herramientaState.tamano;
        const opacidad = herramientaState.opacidad;
        
        switch (herramientaState.tipo) {
            case 'pincel':
                dibujarPincelFino(x, y, color, tamano, opacidad);
                break;
            case 'pincelGrueso':
                dibujarPincelGrueso(x, y, color, tamano, opacidad);
                break;
            case 'acuarela':
                dibujarAcuarela(x, y, color, tamano, opacidad);
                break;
            case 'aerografo':
                dibujarAerografo(x, y, color, tamano, opacidad);
                break;
            case 'esponja':
                dibujarEsponja(x, y, color, tamano, opacidad);
                break;
            case 'marcador':
                dibujarMarcador(x, y, color, tamano, opacidad);
                break;
            case 'difuminado':
                dibujarDifuminado(x, y, tamano);
                break;
            case 'goteo':
                dibujarGoteo(x, y, color, tamano, opacidad);
                break;
            default:
                dibujarPincelFino(x, y, color, tamano, opacidad);
        }
    }
    
    /**
     * Pincel fino tradicional
     */
    function dibujarPincelFino(x, y, color, tamano, opacidad) {
        ctx.globalAlpha = opacidad;
        ctx.strokeStyle = color;
        ctx.lineWidth = tamano;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    /**
     * Pincel grueso con bordes suaves
     */
    function dibujarPincelGrueso(x, y, color, tamano, opacidad) {
        const distancia = Math.sqrt((x - ultimoX) ** 2 + (y - ultimoY) ** 2);
        const pasos = Math.max(1, Math.floor(distancia / 2));
        
        for (let i = 0; i <= pasos; i++) {
            const t = i / pasos;
            const px = ultimoX + (x - ultimoX) * t;
            const py = ultimoY + (y - ultimoY) * t;
            
            const gradient = ctx.createRadialGradient(px, py, 0, px, py, tamano);
            gradient.addColorStop(0, color + Math.floor(opacidad * 255).toString(16).padStart(2, '0'));
            gradient.addColorStop(0.7, color + Math.floor(opacidad * 128).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(px - tamano, py - tamano, tamano * 2, tamano * 2);
        }
    }
    
    /**
     * Efecto acuarela con bordes irregulares
     */
    function dibujarAcuarela(x, y, color, tamano, opacidad) {
        const particulas = 5 + Math.floor(tamano / 3);
        
        for (let i = 0; i < particulas; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const radio = Math.random() * tamano;
            const px = x + Math.cos(angulo) * radio;
            const py = y + Math.sin(angulo) * radio;
            const radioParticula = tamano / 3 + Math.random() * tamano / 3;
            
            const gradient = ctx.createRadialGradient(px, py, 0, px, py, radioParticula);
            const alpha = Math.floor((opacidad * 0.3 + Math.random() * opacidad * 0.3) * 255).toString(16).padStart(2, '0');
            gradient.addColorStop(0, color + alpha);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(px, py, radioParticula, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    /**
     * Aerógrafo con efecto spray realista
     */
    function dibujarAerografo(x, y, color, tamano, opacidad) {
        const densidad = 30 + tamano * 3;
        const radio = tamano * 2;
        
        // Crear efecto de spray con distribución gaussiana
        for (let i = 0; i < densidad; i++) {
            const angulo = Math.random() * Math.PI * 2;
            // Distribución gaussiana simple (dos números aleatorios)
            const distancia = (Math.random() + Math.random()) / 2 * radio;
            const px = x + Math.cos(angulo) * distancia;
            const py = y + Math.sin(angulo) * distancia;
            
            // Variar tamaño de partículas
            const tamanoParticula = Math.random() < 0.7 ? 1 : 2;
            
            ctx.globalAlpha = opacidad * (0.1 + Math.random() * 0.2);
            ctx.fillStyle = color;
            ctx.fillRect(Math.floor(px), Math.floor(py), tamanoParticula, tamanoParticula);
        }
        ctx.globalAlpha = 1;
    }
    
    /**
     * Esponja con textura rugosa
     */
    function dibujarEsponja(x, y, color, tamano, opacidad) {
        const puntos = 15 + Math.floor(tamano);
        
        for (let i = 0; i < puntos; i++) {
            const offsetX = (Math.random() - 0.5) * tamano * 2;
            const offsetY = (Math.random() - 0.5) * tamano * 2;
            const tamanoBlob = 1 + Math.random() * 3;
            
            ctx.globalAlpha = opacidad * (0.3 + Math.random() * 0.4);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, tamanoBlob, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
    
    /**
     * Marcador con trazo sólido y brillante
     */
    function dibujarMarcador(x, y, color, tamano, opacidad) {
        ctx.globalAlpha = opacidad * 0.9;
        ctx.strokeStyle = color;
        ctx.lineWidth = tamano * 1.5;
        ctx.lineCap = 'square';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineCap = 'round';
        ctx.globalAlpha = 1;
    }
    
    /**
     * Difuminado - mezcla colores existentes
     */
    function dibujarDifuminado(x, y, tamano) {
        const imageData = ctx.getImageData(x - tamano, y - tamano, tamano * 2, tamano * 2);
        const data = imageData.data;
        
        // Aplicar blur simple
        for (let i = 0; i < data.length; i += 4) {
            if (i > 0 && i < data.length - 4) {
                data[i] = (data[i] + data[i - 4] + data[i + 4]) / 3;
                data[i + 1] = (data[i + 1] + data[i - 3] + data[i + 5]) / 3;
                data[i + 2] = (data[i + 2] + data[i - 2] + data[i + 6]) / 3;
            }
        }
        
        ctx.putImageData(imageData, x - tamano, y - tamano);
    }
    
    /**
     * Goteo - gotas que caen
     */
    function dibujarGoteo(x, y, color, tamano, opacidad) {
        // Gota principal
        ctx.globalAlpha = opacidad;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, tamano / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Efecto de goteo hacia abajo
        if (Math.random() > 0.7) {
            const alturaGoteo = 10 + Math.random() * 20;
            const gradient = ctx.createLinearGradient(x, y, x, y + alturaGoteo);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x - 1, y, 2, alturaGoteo);
        }
        ctx.globalAlpha = 1;
    }
    
    /**
     * Aplicar efecto de agua local (difuminado)
     */
    /**
     * Aplicar efecto de agua realista - tinta corriendo
     */
    function aplicarEfectoAguaLocal(x, y) {
        const radio = herramientaState.tamano * 4;
        
        // Obtener área afectada
        const areaX = Math.max(0, x - radio);
        const areaY = Math.max(0, y - radio);
        const areaWidth = Math.min(radio * 2, canvas.width - areaX);
        const areaHeight = Math.min(radio * 2, canvas.height - areaY);
        
        const imageData = ctx.getImageData(areaX, areaY, areaWidth, areaHeight);
        const data = imageData.data;
        
        // Crear gotas que corren hacia abajo
        const numGotas = 3 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < numGotas; i++) {
            const gotaX = Math.floor(Math.random() * areaWidth);
            const gotaY = Math.floor(Math.random() * (areaHeight / 2));
            const longitud = 10 + Math.floor(Math.random() * 30);
            
            // Obtener color de la posición inicial
            const pixelIndex = (gotaY * areaWidth + gotaX) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];
            const a = data[pixelIndex + 3];
            
            // Si hay color en esa posición, crear goteo
            if (a > 50) {
                // Dibujar línea de goteo con degradado
                for (let j = 0; j < longitud; j++) {
                    const py = gotaY + j;
                    if (py >= areaHeight) break;
                    
                    const idx = (py * areaWidth + gotaX) * 4;
                    const factor = 1 - (j / longitud); // Degradado
                    
                    // Mezclar con color existente
                    data[idx] = Math.floor(data[idx] * 0.3 + r * 0.7 * factor);
                    data[idx + 1] = Math.floor(data[idx + 1] * 0.3 + g * 0.7 * factor);
                    data[idx + 2] = Math.floor(data[idx + 2] * 0.3 + b * 0.7 * factor);
                    data[idx + 3] = Math.floor(Math.max(data[idx + 3], a * factor));
                    
                    // Agregar píxeles laterales para grosor variable
                    if (j < longitud / 2) {
                        const anchura = Math.ceil(2 - (j / longitud) * 2);
                        for (let dx = -anchura; dx <= anchura; dx++) {
                            if (gotaX + dx >= 0 && gotaX + dx < areaWidth) {
                                const idx2 = (py * areaWidth + (gotaX + dx)) * 4;
                                data[idx2] = Math.floor(data[idx2] * 0.5 + r * 0.5 * factor);
                                data[idx2 + 1] = Math.floor(data[idx2 + 1] * 0.5 + g * 0.5 * factor);
                                data[idx2 + 2] = Math.floor(data[idx2 + 2] * 0.5 + b * 0.5 * factor);
                                data[idx2 + 3] = Math.floor(Math.max(data[idx2 + 3], a * factor * 0.7));
                            }
                        }
                    }
                }
            }
        }
        
        // Aplicar difuminado suave general
        const tempData = new Uint8ClampedArray(data);
        for (let py = 1; py < areaHeight - 1; py++) {
            for (let px = 1; px < areaWidth - 1; px++) {
                const i = (py * areaWidth + px) * 4;
                
                // Difuminado gaussiano 3x3
                let r = 0, g = 0, b = 0, a = 0;
                const kernel = [
                    [1, 2, 1],
                    [2, 4, 2],
                    [1, 2, 1]
                ];
                let kernelSum = 16;
                
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((py + ky) * areaWidth + (px + kx)) * 4;
                        const weight = kernel[ky + 1][kx + 1];
                        r += tempData[idx] * weight;
                        g += tempData[idx + 1] * weight;
                        b += tempData[idx + 2] * weight;
                        a += tempData[idx + 3] * weight;
                    }
                }
                
                data[i] = r / kernelSum;
                data[i + 1] = g / kernelSum;
                data[i + 2] = b / kernelSum;
                data[i + 3] = a / kernelSum;
            }
        }
        
        ctx.putImageData(imageData, areaX, areaY);
    }
    
    console.log('🎨 Canvas avanzado configurado exitosamente con todas las herramientas');
}

/**
 * Guardar personaje creado por el estudiante
 */
/**
 * Generar nombre al revés del personaje
 */
function generarNombreAlReves() {
    const input = document.getElementById('nombre-personaje');
    const nombreOriginal = input.value.trim();
    const containerAlReves = document.getElementById('nombre-alreves');
    const nombreAlRevesElement = containerAlReves.querySelector('p');
    
    if (nombreOriginal.length > 0) {
        const nombreInvertido = nombreOriginal.split('').reverse().join('');
        // Capitalizar primera letra
        const nombreFinal = nombreInvertido.charAt(0).toUpperCase() + nombreInvertido.slice(1).toLowerCase();
        
        nombreAlRevesElement.textContent = nombreFinal;
        containerAlReves.classList.remove('hidden');
        
        // Efecto de animación
        containerAlReves.classList.add('animate-bounce');
        setTimeout(() => {
            containerAlReves.classList.remove('animate-bounce');
        }, 1000);
    } else {
        containerAlReves.classList.add('hidden');
    }
}

function guardarPersonaje() {
    const nombreOriginal = document.getElementById('nombre-personaje')?.value.trim();
    const personalidad = document.getElementById('personalidad-personaje')?.value;
    const historia = document.getElementById('historia-personaje')?.value.trim();
    
    // Obtener gustos seleccionados
    const gustosCheckboxes = document.querySelectorAll('input[name="gustos"]:checked');
    const gustos = Array.from(gustosCheckboxes).map(cb => cb.value);
    
    // Validaciones
    if (!nombreOriginal) {
        alert('🎭 Por favor, escribe tu nombre para crear el nombre mágico');
        return;
    }
    
    if (!personalidad) {
        alert('🌟 Por favor, selecciona una personalidad para tu personaje');
        return;
    }
    
    if (gustos.length === 0) {
        alert('💖 Por favor, selecciona al menos una cosa que le guste hacer');
        return;
    }
    
    if (!historia) {
        alert('📖 Por favor, cuenta la historia de tu personaje');
        return;
    }
    
    // Generar nombre al revés
    const nombreInvertido = nombreOriginal.split('').reverse().join('');
    const nombrePersonaje = nombreInvertido.charAt(0).toUpperCase() + nombreInvertido.slice(1).toLowerCase();
    
    // Verificar que hay una mancha en el canvas
    const canvas = document.getElementById('canvas-principal');
    if (!canvas) {
        alert('🎨 Primero crea una mancha para tu personaje');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let hayPixeles = false;
    
    // Verificar si hay algo dibujado (buscar píxeles no blancos)
    for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] > 0) { // Alpha > 0
            hayPixeles = true;
            break;
        }
    }
    
    if (!hayPixeles) {
        alert('🎨 Primero crea una mancha para tu personaje');
        return;
    }
    
    // Guardar en el estado de la actividad
    if (!ActividadState.personajes) {
        ActividadState.personajes = [];
    }
    
    const personaje = {
        id: Date.now(),
        nombreOriginal: nombreOriginal,
        nombre: nombrePersonaje,
        personalidad: personalidad,
        gustos: gustos,
        historia: historia,
        fechaCreacion: new Date().toISOString(),
        manchaData: canvas.toDataURL() // Guardar imagen de la mancha
    };
    
    ActividadState.personajes.push(personaje);
    
    // Limpiar formulario
    document.getElementById('nombre-personaje').value = '';
    document.getElementById('personalidad-personaje').value = '';
    document.getElementById('historia-personaje').value = '';
    document.querySelectorAll('input[name="gustos"]').forEach(cb => cb.checked = false);
    document.getElementById('nombre-alreves').classList.add('hidden');
    
    // Mostrar confirmación con los datos del personaje
    const personalidadTexto = document.getElementById('personalidad-personaje').querySelector(`option[value="${personalidad}"]`).textContent;
    const gustosTexto = gustos.join(', ');
    
    alert(`✨ ¡${nombrePersonaje} ha sido creado! Es un personaje ${personalidadTexto.toLowerCase()} que ama ${gustosTexto}. Su historia vivirá para siempre en tu galería`);
    
    // Opcional: Mostrar galería de personajes
    mostrarGaleriaPersonajes();
}

/**
 * Mostrar galería de personajes creados
 */
function mostrarGaleriaPersonajes() {
    if (!ActividadState.personajes || ActividadState.personajes.length === 0) {
        return;
    }
    
    // Crear o actualizar la galería
    let galeria = document.getElementById('galeria-personajes');
    if (!galeria) {
        // Crear galería si no existe
        const container = document.querySelector('.simulador-fallback');
        if (container) {
            galeria = document.createElement('div');
            galeria.id = 'galeria-personajes';
            galeria.className = 'mt-6 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl border-2 border-indigo-300';
            container.appendChild(galeria);
        }
    }
    
    if (galeria) {
        galeria.innerHTML = `
            <h4 class="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                <span class="text-2xl">🏛️</span> Galería de Personajes (${ActividadState.personajes.length})
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${ActividadState.personajes.map(personaje => {
                    const personalidadOption = document.querySelector(`option[value="${personaje.personalidad}"]`);
                    const personalidadTexto = personalidadOption ? personalidadOption.textContent : personaje.personalidad;
                    
                    return `
                        <div class="personaje-card bg-white p-4 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-all">
                            <div class="text-center mb-3">
                                <h5 class="font-bold text-gray-800">${personaje.nombre}</h5>
                                <p class="text-sm text-gray-600">${personalidadTexto}</p>
                            </div>
                            <div class="mancha-miniatura">
                                <img src="${personaje.manchaData}" alt="${personaje.nombre}" class="w-full h-24 object-contain border rounded bg-gray-50">
                            </div>
                            <p class="text-xs text-gray-500 mt-2 text-center">
                                Creado el ${new Date(personaje.fechaCreacion).toLocaleDateString()}
                            </p>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
}

/**
 * ================================================
 * ESTUDIO DE ARTE DIGITAL PROFESIONAL
 * ================================================
 */

/**
 * Inicializar el Estudio de Arte Digital Profesional
 */
function inicializarEstudioArteProfesional() {
    console.log('🎨 Inicializando Estudio de Arte Digital Profesional...');
    
    const canvas = document.getElementById('canvas-mancha-personal');
    if (!canvas) {
        console.error('Canvas profesional no encontrado');
        return;
    }
    
    // Configurar canvas con mayor resolución
    canvas.width = 700;
    canvas.height = 500;
    
    setTimeout(() => {
        // Intentar cargar sistema avanzado completo
        if (window.SistemaAvanzadoPinceles && window.UIAvanzadaPinceles) {
            inicializarSistemaAvanzadoCompleto(canvas);
        } else {
            // Cargar scripts necesarios
            cargarSistemasAvanzados(canvas);
        }
        
        // Inicializar paneles de herramientas profesionales
        inicializarPanelColoresAvanzado();
        inicializarParametrosPincel();
        inicializarHerramientasRapidas();
        
        // Configurar overlay de información
        configurarOverlayHerramienta();
        
    }, 100);
}

/**
 * Cargar sistemas avanzados si no están disponibles
 */
function cargarSistemasAvanzados(canvas) {
    console.log('🔄 Cargando sistemas avanzados...');
    
    const scripts = [
        'js/sistema-pinceles-avanzado.js',
        'js/ui-pinceles-avanzada.js'
    ];
    
    let scriptsCargados = 0;
    
    scripts.forEach(scriptSrc => {
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.onload = () => {
            scriptsCargados++;
            console.log(`✅ Cargado: ${scriptSrc}`);
            
            if (scriptsCargados === scripts.length) {
                setTimeout(() => {
                    inicializarSistemaAvanzadoCompleto(canvas);
                }, 100);
            }
        };
        script.onerror = () => {
            console.warn(`⚠️ Error cargando: ${scriptSrc}`);
            scriptsCargados++;
            
            if (scriptsCargados === scripts.length) {
                // Fallback al sistema básico mejorado
                inicializarSistemaBasicoMejorado(canvas);
            }
        };
        document.head.appendChild(script);
    });
}

/**
 * Inicializar sistema avanzado completo
 */
function inicializarSistemaAvanzadoCompleto(canvas) {
    try {
        console.log('🚀 Inicializando sistema avanzado completo...');
        
        const sistemaPinceles = new window.SistemaAvanzadoPinceles();
        sistemaPinceles.setCanvas(canvas);
        
        const uiAvanzada = new window.UIAvanzadaPinceles(sistemaPinceles);
        
        // Renderizar UI en el panel de colores
        const panelColores = document.getElementById('panel-colores-avanzado');
        const parametrosPincel = document.getElementById('parametros-pincel-avanzado');
        
        if (panelColores && parametrosPincel) {
            uiAvanzada.render(panelColores);
        }
        
        // Guardar referencias globales
        ActividadState.sistemaPincelesAvanzado = sistemaPinceles;
        ActividadState.uiPincelesAvanzada = uiAvanzada;
        
        console.log('✅ Sistema avanzado completo inicializado');
        
        // Configurar herramientas personalizadas (función opcional)
        // configurarHerramientasPersonalizadas(sistemaPinceles);
        
    } catch (error) {
        console.warn('⚠️ Error en sistema avanzado, usando básico mejorado:', error);
        inicializarSistemaBasicoMejorado(canvas);
    }
}

/**
 * Sistema básico mejorado como fallback
 */
function inicializarSistemaBasicoMejorado(canvas) {
    console.log('🎨 Inicializando sistema básico mejorado...');
    
    const ctx = canvas.getContext('2d');
    let dibujando = false;
    let lastX = 0;
    let lastY = 0;
    
    // Estado de herramientas mejoradas
    const herramientasState = {
        herramientaActiva: 'pincel-solido',
        color: '#8B5CF6',
        tamano: 12,
        opacidad: 0.8,
        dureza: 0.8
    };
    
    // Configurar contexto
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Event listeners mejorados
    function iniciarDibujo(e) {
        dibujando = true;
        const rect = canvas.getBoundingClientRect();
        const escalaX = canvas.width / rect.width;
        const escalaY = canvas.height / rect.height;
        
        lastX = (e.clientX - rect.left) * escalaX;
        lastY = (e.clientY - rect.top) * escalaY;
        
        // Solo aplicar relleno inmediatamente, para otros pinceles esperar al movimiento
        if (herramientasState.herramientaActiva === 'relleno') {
            aplicarRelleno(lastX, lastY);
        } else {
            // Para pincel sólido y otros, comenzar el path pero no dibujar aún
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
        }
    }
    
    function dibujar(e) {
        if (!dibujando) return;
        
        const rect = canvas.getBoundingClientRect();
        const escalaX = canvas.width / rect.width;
        const escalaY = canvas.height / rect.height;
        
        const currentX = (e.clientX - rect.left) * escalaX;
        const currentY = (e.clientY - rect.top) * escalaY;
        
        aplicarHerramienta(lastX, lastY, currentX, currentY);
        
        lastX = currentX;
        lastY = currentY;
    }
    
    function terminarDibujo() {
        if (dibujando && herramientasState.herramientaActiva === 'pincel-solido') {
            // Para clicks únicos sin arrastrar, dibujar un punto
            ctx.globalAlpha = herramientasState.opacidad;
            ctx.fillStyle = herramientasState.color;
            ctx.beginPath();
            ctx.arc(lastX, lastY, herramientasState.tamano / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        dibujando = false;
        ctx.beginPath(); // Limpiar el path
    }
    
    // Aplicar herramienta actual
    function aplicarHerramienta(x1, y1, x2, y2) {
        ctx.globalAlpha = herramientasState.opacidad;
        ctx.strokeStyle = herramientasState.color;
        ctx.lineWidth = herramientasState.tamano;
        
        switch (herramientasState.herramientaActiva) {
            case 'pincel-solido':
                dibujarLinea(x1, y1, x2, y2);
                break;
            case 'aerografo':
                dibujarAerografo(x2, y2);
                break;
            case 'textura':
                dibujarTextura(x2, y2);
                break;
            case 'borrador':
                ctx.globalCompositeOperation = 'destination-out';
                dibujarLinea(x1, y1, x2, y2);
                ctx.globalCompositeOperation = 'source-over';
                break;
        }
    }
    
    function dibujarLinea(x1, y1, x2, y2) {
        // Calcular distancia para suavizar el trazo
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Solo dibujar si hay movimiento suficiente para evitar puntos dobles
        if (distance > 1) {
            ctx.globalAlpha = herramientasState.opacidad;
            ctx.strokeStyle = herramientasState.color;
            ctx.lineWidth = herramientasState.tamano;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    
    function dibujarAerografo(x, y) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, herramientasState.tamano);
        gradient.addColorStop(0, herramientasState.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, herramientasState.tamano, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function dibujarTextura(x, y) {
        for (let i = 0; i < 10; i++) {
            const offsetX = (Math.random() - 0.5) * herramientasState.tamano;
            const offsetY = (Math.random() - 0.5) * herramientasState.tamano;
            
            ctx.globalAlpha = Math.random() * herramientasState.opacidad;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, Math.random() * 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = herramientasState.opacidad;
    }
    
    function aplicarRelleno(x, y) {
        // Implementación básica de flood fill
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // Aquí iría la lógica de flood fill
        ctx.fillStyle = herramientasState.color;
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Event listeners
    canvas.addEventListener('mousedown', iniciarDibujo);
    canvas.addEventListener('mousemove', dibujar);
    canvas.addEventListener('mouseup', terminarDibujo);
    canvas.addEventListener('mouseout', terminarDibujo);
    
    // Configurar cursor personalizado dinámico
    configurarCursorPersonalizado(canvas, herramientasState);
    
    // Soporte táctil
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Guardar referencia para funciones globales
    ActividadState.herramientasState = herramientasState;
    ActividadState.canvas = canvas;
    ActividadState.ctx = ctx;
    
    console.log('✅ Sistema básico mejorado inicializado');
}

/**
 * Inicializar panel de colores avanzado
 */
function inicializarPanelColoresAvanzado() {
    const panel = document.getElementById('panel-colores-avanzado');
    if (!panel) return;
    
    panel.innerHTML = `
        <div class="seccion-colores">
            <h5 class="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span class="text-lg">🎨</span> Paleta de Colores
            </h5>
            
            <!-- Selector principal -->
            <div class="mb-4">
                <input type="color" id="color-principal" value="#8B5CF6" 
                       class="w-full h-12 border-2 border-purple-300 rounded-lg cursor-pointer">
            </div>
            
            <!-- Colores predefinidos -->
            <div class="grid grid-cols-6 gap-2 mb-4">
                ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'].map(color => `
                    <button onclick="window.seleccionarColor('${color}')" 
                            class="color-btn w-8 h-8 rounded-lg border-2 border-gray-300 hover:scale-110 transition-all cursor-pointer"
                            style="background-color: ${color}"
                            title="${color}">
                    </button>
                `).join('')}
            </div>
            
            <!-- Historial de colores -->
            <div class="mb-3">
                <p class="text-sm font-medium text-gray-600 mb-2">Colores recientes:</p>
                <div id="historial-colores" class="flex gap-1 flex-wrap">
                    <!-- Se llenarán dinámicamente -->
                </div>
            </div>
        </div>
    `;
    
    // Configurar selector principal
    const selectorPrincipal = document.getElementById('color-principal');
    if (selectorPrincipal) {
        selectorPrincipal.addEventListener('change', (e) => {
            const color = e.target.value;
            window.EstadoHerramientas.color = color;
            console.log('🎨 Color cambiado desde selector:', color);
        });
        selectorPrincipal.addEventListener('input', (e) => {
            const color = e.target.value;
            window.EstadoHerramientas.color = color;
            console.log('🎨 Color cambiando (input):', color);
        });
    }
}

/**
 * Inicializar parámetros de pincel
 */
function inicializarParametrosPincel() {
    const panel = document.getElementById('parametros-pincel-avanzado');
    if (!panel) return;
    
    panel.innerHTML = `
        <div class="seccion-parametros">
            <h5 class="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span class="text-lg">⚙️</span> Ajustes de Pincel
            </h5>
            
            <!-- Tamaño -->
            <div class="parametro-grupo mb-4">
                <label class="block text-sm font-medium text-gray-600 mb-2">
                    Tamaño: <span id="tamano-valor">12</span>px
                </label>
                <input type="range" id="tamano-pincel-pro" min="1" max="50" value="12"
                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>
            
            <!-- Opacidad -->
            <div class="parametro-grupo mb-4">
                <label class="block text-sm font-medium text-gray-600 mb-2">
                    Opacidad: <span id="opacidad-valor">80</span>%
                </label>
                <input type="range" id="opacidad-pincel" min="10" max="100" value="80"
                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>
            
            <!-- Dureza (solo para algunos pinceles) -->
            <div class="parametro-grupo mb-4" id="dureza-container">
                <label class="block text-sm font-medium text-gray-600 mb-2">
                    Dureza: <span id="dureza-valor">70</span>%
                </label>
                <input type="range" id="dureza-pincel" min="0" max="100" value="70"
                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            </div>
            
            <!-- Vista previa del pincel -->
            <div class="vista-previa-pincel bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <p class="text-sm font-medium text-gray-600 mb-2 text-center">Vista previa:</p>
                <canvas id="preview-pincel" width="80" height="80" class="mx-auto border border-gray-300 rounded bg-white"></canvas>
            </div>
        </div>
    `;
    
    // Configurar event listeners
    configurarParametrosEventListeners();
}

/**
 * Configurar event listeners para parámetros
 */
function configurarParametrosEventListeners() {
    const tamanoSlider = document.getElementById('tamano-pincel-pro');
    const opacidadSlider = document.getElementById('opacidad-pincel');
    const durezaSlider = document.getElementById('dureza-pincel');
    
    if (tamanoSlider) {
        tamanoSlider.addEventListener('input', (e) => {
            const valor = e.target.value;
            document.getElementById('tamano-valor').textContent = valor;
            actualizarParametroHerramienta('tamano', valor);
            actualizarVistaPrevia();
            
            // Actualizar cursor personalizado
            if (window.actualizarCursorPersonalizado) {
                window.actualizarCursorPersonalizado();
            }
        });
    }
    
    if (opacidadSlider) {
        opacidadSlider.addEventListener('input', (e) => {
            const valor = e.target.value;
            document.getElementById('opacidad-valor').textContent = valor;
            actualizarParametroHerramienta('opacidad', valor / 100);
            actualizarVistaPrevia();
        });
    }
    
    if (durezaSlider) {
        durezaSlider.addEventListener('input', (e) => {
            const valor = e.target.value;
            document.getElementById('dureza-valor').textContent = valor;
            actualizarParametroHerramienta('dureza', valor / 100);
            actualizarVistaPrevia();
        });
    }
    
    // Actualizar vista previa inicial
    setTimeout(actualizarVistaPrevia, 100);
}

/**
 * Inicializar herramientas rápidas
 */
function inicializarHerramientasRapidas() {
    // Las herramientas rápidas ya están en el HTML
    // Aquí se pueden agregar funcionalidades adicionales
    console.log('🛠️ Herramientas rápidas inicializadas');
}

/**
 * Configurar cursor personalizado dinámico
 */
function configurarCursorPersonalizado(canvas, herramientasStateLocal) {
    // Crear elemento del cursor personalizado
    const cursorPersonalizado = document.createElement('div');
    cursorPersonalizado.id = 'cursor-personalizado';
    cursorPersonalizado.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 50%;
        border: 2px solid currentColor;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        display: none;
        background-color: rgba(139, 92, 246, 0.2);
        box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
    `;
    document.body.appendChild(cursorPersonalizado);
    
    // Función para actualizar cursor
    function actualizarCursor() {
        // Usar estado global o local como fallback
        const state = ActividadState.herramientasState || herramientasStateLocal;
        if (!state) return;
        
        const tamano = state.tamano || 12;
        const color = state.color || '#8B5CF6';
        const herramienta = state.herramientaActiva || 'pincel-solido';
        
        cursorPersonalizado.style.width = `${tamano}px`;
        cursorPersonalizado.style.height = `${tamano}px`;
        cursorPersonalizado.style.color = color;
        cursorPersonalizado.style.borderColor = color;
        cursorPersonalizado.style.backgroundColor = color + '20'; // Transparencia
        
        // Cambiar estilo según herramienta
        switch (herramienta) {
            case 'pincel-solido':
                cursorPersonalizado.style.borderStyle = 'solid';
                cursorPersonalizado.style.borderWidth = '2px';
                cursorPersonalizado.style.boxShadow = `0 0 10px ${color}30`;
                break;
            case 'aerografo':
                cursorPersonalizado.style.borderStyle = 'dashed';
                cursorPersonalizado.style.borderWidth = '1px';
                cursorPersonalizado.style.boxShadow = `0 0 20px ${color}40`;
                break;
            case 'textura':
                cursorPersonalizado.style.borderStyle = 'dotted';
                cursorPersonalizado.style.borderWidth = '3px';
                cursorPersonalizado.style.boxShadow = `0 0 5px ${color}50`;
                break;
            case 'borrador':
                cursorPersonalizado.style.borderColor = '#ff6b6b';
                cursorPersonalizado.style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
                cursorPersonalizado.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
                break;
        }
    }
    
    // Event listeners para el cursor
    canvas.addEventListener('mouseenter', (e) => {
        canvas.style.cursor = 'none';
        cursorPersonalizado.style.display = 'block';
        actualizarCursor();
    });
    
    canvas.addEventListener('mouseleave', () => {
        canvas.style.cursor = 'crosshair';
        cursorPersonalizado.style.display = 'none';
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (cursorPersonalizado.style.display === 'block') {
            cursorPersonalizado.style.left = `${e.clientX}px`;
            cursorPersonalizado.style.top = `${e.clientY}px`;
        }
    });
    
    // Actualizar cursor cuando cambien las herramientas
    window.actualizarCursorPersonalizado = actualizarCursor;
    
    // Inicializar cursor
    actualizarCursor();
}

/**
 * Configurar overlay de información de herramienta
 */
function configurarOverlayHerramienta() {
    const overlay = document.getElementById('tool-info-overlay');
    const canvas = document.getElementById('canvas-mancha-personal');
    
    if (overlay && canvas) {
        canvas.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
        
        canvas.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });
        
        // Actualizar información inicial
        actualizarInfoOverlay();
    }
}

/**
 * Configurar fase meditativa
 */
function configurarFaseMeditativa(fase) {
    // Los textos de meditación ya están en la configuración
    // Solo necesitamos preparar la funcionalidad de reproducción
    ActividadState.textosMeditacion = fase.contenido.meditacionTextos;
    ActividadState.indiceMeditacion = 0;
}

/**
 * Configurar fase narrativa
 */
function configurarFaseNarrativa() {
    const riopalabras = document.getElementById('rio-palabras');
    if (riopalabras) {
        // Configurar contador de palabras en tiempo real
        riopalabras.addEventListener('input', function() {
            const texto = this.value;
            const palabras = texto.trim().split(/\s+/).filter(palabra => palabra.length > 0);
            const lineas = texto.split('\n').length;
            
            document.getElementById('contador-palabras').textContent = palabras.length;
            document.getElementById('contador-lineas').textContent = lineas;
            
            // Activar animación de flujo cuando se escriba
            if (palabras.length > 0) {
                document.getElementById('flujo-palabras').style.opacity = '1';
            }
        });
    }
}

/**
 * ================================================
 * FUNCIONES ESPECÍFICAS PARA ACTIVIDAD 3
 * ================================================
 */

/**
 * Configurar fase de autorretrato
 */
function configurarFaseAutorretrato() {
    const canvas = document.getElementById('canvas-autorretrato');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentColor = '#8B5CF6';
    let lineWidth = 3;
    
    // Variables para la cámara
    let stream = null;
    const video = document.getElementById('video-camara');
    const btnActivarCamara = document.getElementById('btn-activar-camara');
    const btnCerrarCamara = document.getElementById('btn-cerrar-camara');
    const espejoPlaceholder = document.getElementById('espejo-placeholder');
    
    // Configurar canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Funcionalidad de cámara
    const activarCamara = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 200, 
                    height: 150,
                    facingMode: 'user' // Cámara frontal preferida
                } 
            });
            
            video.srcObject = stream;
            video.play();
            
            // Mostrar video y ocultar placeholder
            video.classList.remove('hidden');
            espejoPlaceholder.classList.add('hidden');
            btnActivarCamara.classList.add('hidden');
            btnCerrarCamara.classList.remove('hidden');
            
            console.log('📷 Cámara activada exitosamente');
            
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
            
            // Mostrar mensaje de error amigable
            const mensaje = document.createElement('div');
            mensaje.className = 'bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg text-sm mt-2';
            mensaje.innerHTML = `
                <p><strong>📷 Cámara no disponible</strong></p>
                <p class="text-xs">Puedes dibujar tu autorretrato sin cámara. ¡Tu imaginación es tu mejor espejo!</p>
            `;
            
            document.getElementById('camara-container').appendChild(mensaje);
            
            // Ocultar botón de activar después de 3 segundos
            setTimeout(() => {
                btnActivarCamara.style.display = 'none';
            }, 3000);
        }
    };
    
    const cerrarCamara = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        
        video.classList.add('hidden');
        espejoPlaceholder.classList.remove('hidden');
        btnActivarCamara.classList.remove('hidden');
        btnCerrarCamara.classList.add('hidden');
        
        console.log('📷 Cámara cerrada');
    };
    
    // Event listeners para cámara
    btnActivarCamara.addEventListener('click', activarCamara);
    btnCerrarCamara.addEventListener('click', cerrarCamara);
    
    // Configurar selección de colores
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('ring-4', 'ring-gray-800'));
            btn.classList.add('ring-4', 'ring-gray-800');
            currentColor = btn.getAttribute('data-color');
        });
    });
    
    // Set initial color
    document.querySelector('.color-btn')?.click();
    
    // Eventos de dibujo
    const startDrawing = (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    
    const draw = (e) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    
    const stopDrawing = () => {
        isDrawing = false;
        ctx.beginPath();
        
        // Guardar el autorretrato para la siguiente fase
        ActividadState.autoretrato = canvas.toDataURL();
    };
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Herramientas
    document.getElementById('tool-clear-retrato')?.addEventListener('click', () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    
    // Limpiar cámara cuando se cierre la actividad
    window.addEventListener('beforeunload', () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    });
    
    // Función global para limpiar cámara al cambiar de fase
    window.limpiarCamaraAutorretrato = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    };
}

/**
 * Configurar fase de exploración
 */
function configurarFaseExploracion() {
    // Cargar el autorretrato anterior si existe
    if (ActividadState.autoretrato) {
        const container = document.getElementById('autorretrato-analisis');
        if (container) {
            const img = new Image();
            img.onload = function() {
                container.innerHTML = '';
                img.style.maxWidth = '100%';
                img.style.maxHeight = '200px';
                img.style.border = '2px solid #F59E0B';
                img.style.borderRadius = '8px';
                container.appendChild(img);
                
                // Permitir hacer clic para marcar errores
                img.addEventListener('click', (e) => {
                    const rect = img.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Marcar el punto del error
                    const marker = document.createElement('div');
                    marker.style.cssText = `
                        position: absolute;
                        left: ${x - 5}px;
                        top: ${y - 5}px;
                        width: 10px;
                        height: 10px;
                        background: red;
                        border-radius: 50%;
                        border: 2px solid white;
                        cursor: pointer;
                    `;
                    
                    // Limpiar marcadores anteriores
                    container.querySelectorAll('.error-marker').forEach(m => m.remove());
                    marker.className = 'error-marker';
                    container.style.position = 'relative';
                    container.appendChild(marker);
                    
                    // Actualizar coordenadas
                    const coordenadas = document.getElementById('coordenadas-error');
                    if (coordenadas) {
                        coordenadas.textContent = `Tesoro localizado en: ${Math.round(x)}, ${Math.round(y)}`;
                    }
                    
                    // Guardar la ubicación del error
                    ActividadState.errorLocation = { x, y };
                });
            };
            img.src = ActividadState.autoretrato;
        }
    }
    
    // Configurar herramientas de detective
    document.getElementById('lupa-aumentar')?.addEventListener('click', () => {
        const img = document.querySelector('#autorretrato-analisis img');
        if (img) {
            const currentScale = img.style.transform.includes('scale') ? 
                parseFloat(img.style.transform.match(/scale\\(([^)]+)\\)/)[1]) : 1;
            const newScale = Math.min(currentScale * 1.2, 3);
            img.style.transform = `scale(${newScale})`;
            img.style.transformOrigin = 'center';
        }
    });
    
    document.getElementById('marcador-error')?.addEventListener('click', () => {
        alert('Haz clic directamente en tu autorretrato para marcar tu tesoro favorito');
    });
}

/**
 * Configurar fase abstracta
 */
function configurarFaseAbstracta() {
    const canvas = document.getElementById('canvas-abstracto');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentColor = '#10B981';
    let currentTool = 'brush';
    let lineWidth = 8;
    
    // Configurar canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Variables para la paleta actual
    let paletaActual = null;
    
    // Generar paleta abstracta aleatoria
    const generarPaletaAbstracta = () => {
        // Paletas temáticas mágicas
        const paletasTematicas = [
            {
                nombre: 'Atardecer Mágico',
                colores: ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B2B', '#C41E3A', '#FF8C69', '#FFA500', '#FF7F50']
            },
            {
                nombre: 'Océano Profundo', 
                colores: ['#003366', '#0066CC', '#3399FF', '#66CCFF', '#99E6FF', '#1E90FF', '#4682B4', '#5F9EA0']
            },
            {
                nombre: 'Bosque Encantado',
                colores: ['#2D5016', '#4F7942', '#6B8E23', '#9ACD32', '#ADFF2F', '#228B22', '#32CD32', '#90EE90']
            },
            {
                nombre: 'Aurora Boreal',
                colores: ['#4B0082', '#8A2BE2', '#9370DB', '#BA55D3', '#DDA0DD', '#DA70D6', '#EE82EE', '#DDA0DD']
            },
            {
                nombre: 'Fuego Creativo',
                colores: ['#8B0000', '#DC143C', '#FF4500', '#FF6347', '#FFA500', '#FF0000', '#FFD700', '#FF69B4']
            },
            {
                nombre: 'Jardín de Primavera',
                colores: ['#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#C71585', '#98FB98', '#90EE90', '#00FF7F']
            },
            {
                nombre: 'Tierra Ancestral',
                colores: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F4A460', '#D2691E', '#BC8F8F', '#F5DEB3']
            },
            {
                nombre: 'Galaxia Lejana',
                colores: ['#191970', '#4169E1', '#6495ED', '#87CEEB', '#E0F6FF', '#483D8B', '#6A5ACD', '#9370DB']
            },
            {
                nombre: 'Volcán Activo',
                colores: ['#800000', '#B22222', '#FF0000', '#FF4500', '#FFD700', '#DC143C', '#FF6347', '#FFA500']
            },
            {
                nombre: 'Cristales Místicos',
                colores: ['#9932CC', '#8A2BE2', '#9400D3', '#9370DB', '#DDA0DD', '#BA55D3', '#DA70D6', '#EE82EE']
            }
        ];
        
        // Seleccionar paleta temática aleatoria
        const paletaSeleccionada = paletasTematicas[Math.floor(Math.random() * paletasTematicas.length)];
        paletaActual = paletaSeleccionada; // Guardar referencia global
        
        const container = document.getElementById('paleta-colores-abstracta');
        if (container) {
            // Crear título de la paleta
            let nombrePaleta = container.querySelector('.nombre-paleta');
            if (!nombrePaleta) {
                nombrePaleta = document.createElement('div');
                nombrePaleta.className = 'nombre-paleta text-center text-sm font-bold text-emerald-700 mb-3 bg-emerald-100 rounded-lg p-2 border-2 border-emerald-300';
                container.parentNode.insertBefore(nombrePaleta, container);
            }
            nombrePaleta.innerHTML = `✨ <span class="text-emerald-800">Paleta Mágica:</span> ${paletaSeleccionada.nombre} ✨`;
            
            // Efecto de aparición con animación
            nombrePaleta.style.transform = 'scale(0)';
            nombrePaleta.style.opacity = '0';
            setTimeout(() => {
                nombrePaleta.style.transition = 'all 0.5s ease-out';
                nombrePaleta.style.transform = 'scale(1)';
                nombrePaleta.style.opacity = '1';
            }, 100);
            
            container.innerHTML = paletaSeleccionada.colores.map((color, index) => `
                <button class="color-btn w-10 h-10 rounded-full border-3 border-white shadow-xl hover:scale-125 transition-all duration-300 hover:shadow-2xl opacity-0" 
                        style="background: ${color}; animation: aparecer 0.6s ease-out ${index * 0.1}s forwards;" 
                        data-color="${color}"
                        title="Color mágico: ${color}"></button>
            `).join('');
            
            // Configurar eventos de colores
            container.querySelectorAll('.color-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    container.querySelectorAll('.color-btn').forEach(b => {
                        b.classList.remove('ring-4', 'ring-emerald-600', 'ring-offset-2');
                        b.style.transform = 'scale(1)';
                    });
                    btn.classList.add('ring-4', 'ring-emerald-600', 'ring-offset-2');
                    btn.style.transform = 'scale(1.2)';
                    currentColor = btn.getAttribute('data-color');
                });
            });
            
            // Seleccionar primer color automáticamente
            setTimeout(() => {
                container.querySelector('.color-btn')?.click();
            }, 800);
        }
    };
    
    generarPaletaAbstracta();
    
    // Dibujar el "error" transformado como base
    if (ActividadState.errorLocation) {
        ctx.fillStyle = currentColor;
        ctx.fillRect(ActividadState.errorLocation.x * 2, ActividadState.errorLocation.y * 2, 40, 40);
    }
    
    // Eventos de dibujo abstracto
    const startDrawing = (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    
    const draw = (e) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        
        if (currentTool === 'spray') {
            // Efecto aerógrafo
            for (let i = 0; i < 10; i++) {
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                ctx.fillStyle = currentColor;
                ctx.fillRect(x + offsetX, y + offsetY, 2, 2);
            }
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };
    
    const stopDrawing = () => {
        isDrawing = false;
        ctx.beginPath();
        
        // Guardar obra abstracta
        ActividadState.obraAbstracta = canvas.toDataURL();
    };
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Herramientas
    document.getElementById('tool-brush-abstracto')?.addEventListener('click', () => {
        currentTool = 'brush';
        lineWidth = 8;
    });
    
    document.getElementById('tool-spray')?.addEventListener('click', () => {
        currentTool = 'spray';
    });
    
    document.getElementById('tool-stamp')?.addEventListener('click', () => {
        currentTool = 'stamp';
    });
    
    // Intercambio mágico de paleta
    document.getElementById('intercambio-paleta')?.addEventListener('click', () => {
        generarPaletaAbstracta();
        
        // Efecto visual
        const btn = document.getElementById('intercambio-paleta');
        btn.textContent = '✨ ¡Paleta Cambiada!';
        setTimeout(() => {
            btn.textContent = '🔄 Intercambio Mágico';
        }, 2000);
    });
    
    // Sorpresa creativa mejorada
    document.getElementById('activar-sorpresa')?.addEventListener('click', () => {
        // Array de sorpresas mágicas diferentes
        const sorpresasMagicas = [
            // Formas geométricas
            () => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const x = Math.random() * (canvas.width - 60);
                        const y = Math.random() * (canvas.height - 60);
                        const size = Math.random() * 40 + 20;
                        
                        ctx.fillStyle = paletaActual ? paletaActual.colores[Math.floor(Math.random() * paletaActual.colores.length)] : currentColor;
                        ctx.fillRect(x, y, size, size);
                    }, i * 300);
                }
            },
            
            // Círculos mágicos
            () => {
                for (let i = 0; i < 7; i++) {
                    setTimeout(() => {
                        const x = Math.random() * canvas.width;
                        const y = Math.random() * canvas.height;
                        const radius = Math.random() * 30 + 10;
                        
                        ctx.fillStyle = paletaActual ? paletaActual.colores[Math.floor(Math.random() * paletaActual.colores.length)] : currentColor;
                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, 2 * Math.PI);
                        ctx.fill();
                    }, i * 250);
                }
            },
            
            // Líneas de energía
            () => {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const startX = Math.random() * canvas.width;
                        const startY = Math.random() * canvas.height;
                        const endX = Math.random() * canvas.width;
                        const endY = Math.random() * canvas.height;
                        
                        ctx.strokeStyle = paletaActual ? paletaActual.colores[Math.floor(Math.random() * paletaActual.colores.length)] : currentColor;
                        ctx.lineWidth = Math.random() * 8 + 2;
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(endX, endY);
                        ctx.stroke();
                    }, i * 200);
                }
            },
            
            // Espiral mágica
            () => {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                let angle = 0;
                
                const drawSpiral = () => {
                    if (angle < 720) { // 2 vueltas completas
                        const radius = angle / 4;
                        const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
                        const y = centerY + Math.sin(angle * Math.PI / 180) * radius;
                        
                        ctx.fillStyle = paletaActual ? paletaActual.colores[Math.floor(angle / 90) % paletaActual.colores.length] : currentColor;
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, 2 * Math.PI);
                        ctx.fill();
                        
                        angle += 10;
                        setTimeout(drawSpiral, 50);
                    }
                };
                drawSpiral();
            },
            
            // Constelación
            () => {
                const estrellas = [];
                for (let i = 0; i < 15; i++) {
                    estrellas.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height
                    });
                }
                
                estrellas.forEach((estrella, index) => {
                    setTimeout(() => {
                        // Dibujar estrella
                        ctx.fillStyle = paletaActual ? paletaActual.colores[index % paletaActual.colores.length] : currentColor;
                        ctx.beginPath();
                        ctx.arc(estrella.x, estrella.y, 4, 0, 2 * Math.PI);
                        ctx.fill();
                        
                        // Conectar con líneas
                        if (index > 0) {
                            ctx.strokeStyle = paletaActual ? paletaActual.colores[index % paletaActual.colores.length] : currentColor;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(estrellas[index - 1].x, estrellas[index - 1].y);
                            ctx.lineTo(estrella.x, estrella.y);
                            ctx.stroke();
                        }
                    }, index * 150);
                });
            },
            
            // Explosión de colores
            () => {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const angle = (i * 18) * Math.PI / 180; // 360/20 = 18 grados
                        const distance = Math.random() * 150 + 50;
                        const x = centerX + Math.cos(angle) * distance;
                        const y = centerY + Math.sin(angle) * distance;
                        
                        ctx.fillStyle = paletaActual ? paletaActual.colores[i % paletaActual.colores.length] : currentColor;
                        ctx.beginPath();
                        ctx.arc(x, y, Math.random() * 15 + 5, 0, 2 * Math.PI);
                        ctx.fill();
                    }, i * 100);
                }
            }
        ];
        
        // Seleccionar sorpresa aleatoria
        const sorpresaElegida = sorpresasMagicas[Math.floor(Math.random() * sorpresasMagicas.length)];
        const nombresSorpresas = [
            'Formas Geométricas Mágicas', 'Círculos Encantados', 'Líneas de Energía', 
            'Espiral Cósmica', 'Constelación Creativa', 'Explosión de Colores'
        ];
        
        // Ejecutar sorpresa
        sorpresaElegida();
        
        // Actualizar botón con el nombre de la sorpresa
        const btn = document.getElementById('activar-sorpresa');
        const nombreSorpresa = nombresSorpresas[sorpresasMagicas.indexOf(sorpresaElegida)];
        btn.innerHTML = `🎆 ${nombreSorpresa}`;
        btn.disabled = true;
        btn.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-pink-500', 'text-white');
        
        // Crear confeti de celebración
        crearConfettiSorpresa();
    });
    
    // Función para crear confeti de sorpresa
    function crearConfettiSorpresa() {
        const coloresConfeti = paletaActual ? paletaActual.colores : ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confeti = document.createElement('div');
                confeti.style.position = 'fixed';
                confeti.style.left = Math.random() * window.innerWidth + 'px';
                confeti.style.top = '-10px';
                confeti.style.width = '8px';
                confeti.style.height = '8px';
                confeti.style.backgroundColor = coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)];
                confeti.style.borderRadius = '50%';
                confeti.style.pointerEvents = 'none';
                confeti.style.zIndex = '9999';
                confeti.style.animation = 'confetti-fall 3s linear forwards';
                
                document.body.appendChild(confeti);
                
                setTimeout(() => {
                    confeti.remove();
                }, 3000);
            }, i * 50);
        }
    }
}

/**
 * Configurar fase de galería personal
 */
function configurarFaseGaleria() {
    // Configurar botones de carga
    document.querySelectorAll('.btn-cargar').forEach(btn => {
        btn.addEventListener('click', () => {
            const actividad = btn.getAttribute('data-actividad');
            const fileInput = document.getElementById('file-input-galeria');
            
            fileInput.onchange = (e) => {
                const files = Array.from(e.target.files);
                files.forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const placeholder = document.getElementById(`galeria-actividad${actividad}`);
                            placeholder.innerHTML = `<img src="${event.target.result}" class="w-full h-full object-cover rounded-lg">`;
                        };
                        reader.readAsDataURL(file);
                    }
                });
            };
            
            fileInput.click();
        });
    });
}

/**
 * Configurar fase de análisis
 */
function configurarFaseAnalisis() {
    // Configuración básica para análisis reflexivo
    console.log('🔍 Fase de análisis configurada');
}

/**
 * Configurar fase de exhibición del museo
 */
function configurarFaseExhibicion() {
    // Configurar canvas de ideas si existe
    const canvasIdeas = document.getElementById('canvas-ideas');
    if (canvasIdeas) {
        const ctx = canvasIdeas.getContext('2d');
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvasIdeas.width, canvasIdeas.height);
        ctx.fillStyle = '#8b5cf6';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Haz clic para crear', canvasIdeas.width/2, canvasIdeas.height/2 - 10);
        ctx.fillText('ideas visuales', canvasIdeas.width/2, canvasIdeas.height/2 + 10);
    }
    
    // Configurar eventos de entrada para agregar ideas
    const inputIdea = document.getElementById('nueva-idea');
    if (inputIdea) {
        inputIdea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                agregarIdea();
            }
        });
    }
}

// Variables globales para la funcionalidad
let ideasSobreError = [];
let colorHuellaActual = '#FF6B6B';
let sentimientosSeleccionados = { antes: '', ahora: '' };

/**
 * Función para agregar ideas sobre el error
 */
function agregarIdea() {
    const input = document.getElementById('nueva-idea');
    const container = document.getElementById('ideas-container');
    
    if (input && input.value.trim() && container) {
        const idea = input.value.trim();
        ideasSobreError.push(idea);
        
        // Crear elemento visual de la idea
        const ideaElement = document.createElement('div');
        ideaElement.className = 'bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium border border-purple-300 idea-bubble';
        ideaElement.textContent = idea;
        ideaElement.style.animation = 'aparecer 0.5s ease-out';
        
        // Agregar botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.innerHTML = '×';
        btnEliminar.className = 'ml-2 text-purple-600 hover:text-purple-800 font-bold';
        btnEliminar.onclick = () => {
            ideaElement.remove();
            ideasSobreError = ideasSobreError.filter(i => i !== idea);
        };
        
        ideaElement.appendChild(btnEliminar);
        container.appendChild(ideaElement);
        
        // Limpiar input
        input.value = '';
        
        // Agregar efecto visual al canvas
        actualizarCanvasIdeas();
    }
}

/**
 * Actualizar canvas de ideas con representación visual
 */
function actualizarCanvasIdeas() {
    const canvas = document.getElementById('canvas-ideas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fondo degradado
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f3e8ff');
    gradient.addColorStop(1, '#fdf2f8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar ideas como círculos conectados
    const colores = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
    ideasSobreError.forEach((idea, index) => {
        const x = 50 + (index % 4) * 60;
        const y = 50 + Math.floor(index / 4) * 60;
        
        // Círculo de la idea
        ctx.fillStyle = colores[index % colores.length];
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();
        
        // Texto
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText((index + 1).toString(), x, y + 4);
        
        // Conectar con líneas si hay más de una idea
        if (index > 0) {
            const prevX = 50 + ((index - 1) % 4) * 60;
            const prevY = 50 + Math.floor((index - 1) / 4) * 60;
            
            ctx.strokeStyle = '#d1d5db';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });
}

/**
 * Crear idea visual en el canvas
 */
function crearIdeaVisual() {
    const canvas = document.getElementById('canvas-ideas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Crear efecto de explosión de creatividad
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const angle = (i * 45) * Math.PI / 180;
            const distance = 30 + Math.random() * 40;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 8 + 4, 0, 2 * Math.PI);
            ctx.fill();
        }, i * 100);
    }
}

/**
 * Seleccionar sentimiento para la reflexión antes/después
 */
function seleccionarSentimiento(tipo, valor) {
    sentimientosSeleccionados[tipo] = valor;
    
    // Actualizar estilos visuales
    document.querySelectorAll(`[data-tipo="${tipo}"]`).forEach(btn => {
        btn.classList.remove('bg-red-300', 'bg-green-300');
        if (tipo === 'antes') {
            btn.classList.add('bg-red-100');
        } else {
            btn.classList.add('bg-green-100');
        }
    });
    
    // Resaltar el seleccionado
    const selectedBtn = document.querySelector(`[data-tipo="${tipo}"][data-valor="${valor}"]`);
    if (selectedBtn) {
        if (tipo === 'antes') {
            selectedBtn.classList.remove('bg-red-100');
            selectedBtn.classList.add('bg-red-300');
        } else {
            selectedBtn.classList.remove('bg-green-100');
            selectedBtn.classList.add('bg-green-300');
        }
    }
}

/**
 * Crear visualización de la transformación personal
 */
function crearVisualizacionTransformacion() {
    const container = document.getElementById('visualizacion-transformacion');
    const canvas = document.getElementById('canvas-transformacion');
    
    if (!container || !canvas) return;
    
    container.classList.remove('hidden');
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Lado izquierdo - ANTES (rojo/negativo)
    const gradient1 = ctx.createLinearGradient(0, 0, canvas.width/2, 0);
    gradient1.addColorStop(0, '#fef2f2');
    gradient1.addColorStop(1, '#fecaca');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, canvas.width/2, canvas.height);
    
    // Lado derecho - AHORA (verde/positivo)
    const gradient2 = ctx.createLinearGradient(canvas.width/2, 0, canvas.width, 0);
    gradient2.addColorStop(0, '#f0fdf4');
    gradient2.addColorStop(1, '#bbf7d0');
    ctx.fillStyle = gradient2;
    ctx.fillRect(canvas.width/2, 0, canvas.width/2, canvas.height);
    
    // Línea divisoria con flecha de transformación
    ctx.strokeStyle = '#9333ea';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 50);
    ctx.lineTo(canvas.width/2, canvas.height - 50);
    ctx.stroke();
    
    // Flecha de transformación
    ctx.fillStyle = '#9333ea';
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 15, canvas.height/2);
    ctx.lineTo(canvas.width/2 + 15, canvas.height/2);
    ctx.lineTo(canvas.width/2 + 5, canvas.height/2 - 10);
    ctx.moveTo(canvas.width/2 + 15, canvas.height/2);
    ctx.lineTo(canvas.width/2 + 5, canvas.height/2 + 10);
    ctx.fill();
    
    // Texto descriptivo
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ANTES', canvas.width/4, 30);
    
    ctx.fillStyle = '#059669';
    ctx.fillText('AHORA', canvas.width * 3/4, 30);
    
    // Agregar emociones seleccionadas
    const antesTexto = sentimientosSeleccionados.antes || document.getElementById('antes-personalizado')?.value || 'Sin definir';
    const ahoraTexto = sentimientosSeleccionados.ahora || document.getElementById('ahora-personalizado')?.value || 'Sin definir';
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#7f1d1d';
    ctx.fillText(antesTexto, canvas.width/4, canvas.height/2);
    
    ctx.fillStyle = '#14532d';
    ctx.fillText(ahoraTexto, canvas.width * 3/4, canvas.height/2);
    
    // Animación de partículas de transformación
    crearParticulasTransformacion(canvas);
}

/**
 * Crear partículas de transformación
 */
function crearParticulasTransformacion(canvas) {
    const ctx = canvas.getContext('2d');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = canvas.width/2 + (Math.random() - 0.5) * 100;
            const y = Math.random() * canvas.height;
            
            ctx.fillStyle = `hsl(${270 + Math.random() * 60}, 70%, 60%)`;
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 4 + 2, 0, 2 * Math.PI);
            ctx.fill();
            
            // Fade out
            setTimeout(() => {
                ctx.clearRect(x-10, y-10, 20, 20);
            }, 1000);
        }, i * 50);
    }
}

/**
 * Colocar huella digital
 */
function colocarHuella() {
    const canvas = document.getElementById('canvas-huella');
    const mensaje = document.getElementById('mensaje-huella');
    const btn = document.getElementById('btn-colocar-dedo');
    const personalizacion = document.getElementById('personalizacion-huella');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ocultar mensaje de instrucciones
    if (mensaje) mensaje.style.display = 'none';
    
    // Dibujar huella digital realista
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Fondo de la huella
    ctx.fillStyle = colorHuellaActual;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 60, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Líneas de la huella
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 10 + i * 5, 50 - i * 2, 70 - i * 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    // Efecto de brillo
    const gradient = ctx.createRadialGradient(centerX - 20, centerY - 30, 0, centerX, centerY, 80);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 60, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Mostrar opciones de personalización
    if (personalizacion) {
        personalizacion.classList.remove('hidden');
    }
    
    // Cambiar texto del botón
    if (btn) {
        btn.textContent = '✨ ¡Huella Creada!';
        btn.disabled = true;
        btn.classList.add('opacity-50');
    }
    
    // Crear confeti de celebración
    crearConfettiHuella();
}

/**
 * Cambiar color de la huella
 */
function cambiarColorHuella(nuevoColor) {
    colorHuellaActual = nuevoColor;
    
    // Redibujar la huella con el nuevo color
    const canvas = document.getElementById('canvas-huella');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Redibujar con nuevo color
    ctx.fillStyle = nuevoColor;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 60, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Líneas de la huella
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 10 + i * 5, 50 - i * 2, 70 - i * 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

/**
 * Agregar decoraciones a la huella
 */
function agregarDecoracion(tipo) {
    const canvas = document.getElementById('canvas-huella');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180;
        const distance = 100 + Math.random() * 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        
        switch(tipo) {
            case 'corazones':
                ctx.fillText('💕', x, y);
                break;
            case 'estrellas':
                ctx.fillText('⭐', x, y);
                break;
            case 'flores':
                ctx.fillText('🌸', x, y);
                break;
        }
    }
}

/**
 * Crear confeti para la huella
 */
function crearConfettiHuella() {
    const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confeti = document.createElement('div');
            confeti.style.position = 'fixed';
            confeti.style.left = Math.random() * window.innerWidth + 'px';
            confeti.style.top = '-10px';
            confeti.style.width = '8px';
            confeti.style.height = '8px';
            confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            confeti.style.borderRadius = '50%';
            confeti.style.pointerEvents = 'none';
            confeti.style.zIndex = '9999';
            confeti.style.animation = 'confetti-fall 3s linear forwards';
            
            document.body.appendChild(confeti);
            
            setTimeout(() => {
                confeti.remove();
            }, 3000);
        }, i * 80);
    }
}

/**
 * Finalizar ceremonia
 */
function finalizarCeremonia() {
    // Crear mensaje final de orgullo
    const mensaje = document.createElement('div');
    mensaje.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    mensaje.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div class="text-6xl mb-4">🏆</div>
            <h3 class="text-2xl font-bold text-purple-800 mb-4">¡Felicitaciones!</h3>
            <p class="text-gray-700 mb-6">Has completado tu viaje de transformación. Ahora eres un verdadero <strong>Curador del Error Creativo</strong>.</p>
            <p class="text-sm text-purple-600 italic mb-6">"Cada error es una puerta hacia algo extraordinario"</p>
            <button onclick="cerrarModal(this)" class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                ✨ Continuar
            </button>
        </div>
    `;
    
    document.body.appendChild(mensaje);
    
    // Crear explosión final de confeti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            crearConfettiHuella();
        }, i * 100);
    }
}

/**
 * Configurar fase reflexiva del manifiesto
 */
function configurarFaseReflexiva() {
    // Configurar canvas del manifiesto visual
    const canvasManifiesto = document.getElementById('canvas-manifiesto');
    if (canvasManifiesto) {
        const ctx = canvasManifiesto.getContext('2d');
        
        // Inicializar canvas con fondo suave
        inicializarCanvasManifiesto(ctx, canvasManifiesto);
        
        // Configurar eventos de dibujo
        configurarDibujoManifiesto(canvasManifiesto, ctx);
    }
}

// Variables globales para el manifiesto visual
let herramientaActual = 'pincel';
let elementosManifiesto = [];
let isDrawingManifiesto = false;

/**
 * Inicializar canvas del manifiesto
 */
function inicializarCanvasManifiesto(ctx, canvas) {
    // Fondo degradado suave
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#faf5ff');
    gradient.addColorStop(0.5, '#f3e8ff');
    gradient.addColorStop(1, '#fdf2f8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Texto de bienvenida
    ctx.fillStyle = '#9333ea';
    ctx.font = 'italic 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tu lienzo de transformación personal', canvas.width/2, canvas.height/2 - 20);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('Selecciona emociones, símbolos y momentos para crear tu manifiesto', canvas.width/2, canvas.height/2 + 10);
}

/**
 * Configurar eventos de dibujo en el manifiesto
 */
function configurarDibujoManifiesto(canvas, ctx) {
    let lastX = 0;
    let lastY = 0;
    
    const startDrawing = (e) => {
        if (herramientaActual !== 'pincel') return;
        isDrawingManifiesto = true;
        const rect = canvas.getBoundingClientRect();
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    };
    
    const draw = (e) => {
        if (!isDrawingManifiesto || herramientaActual !== 'pincel') return;
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [currentX, currentY];
    };
    
    const stopDrawing = () => {
        isDrawingManifiesto = false;
    };
    
    // Eventos de mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Eventos de canvas para otras herramientas
    canvas.addEventListener('click', (e) => {
        if (herramientaActual === 'pincel') return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        switch(herramientaActual) {
            case 'circulo':
                dibujarCirculo(ctx, x, y);
                break;
            case 'corazon':
                dibujarCorazon(ctx, x, y);
                break;
        }
    });
}

/**
 * Agregar emoción al manifiesto
 */
function agregarEmocion(emoji, tipo) {
    const canvas = document.getElementById('canvas-manifiesto');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Posición aleatoria pero estética
    const x = 100 + Math.random() * (canvas.width - 200);
    const y = 80 + Math.random() * (canvas.height - 160);
    
    // Dibujar emoción con efecto
    ctx.font = '32px Arial';
    ctx.textAlign = 'center';
    
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillText(emoji, x + 2, y + 2);
    
    // Emoji principal
    ctx.fillStyle = '#000';
    ctx.fillText(emoji, x, y);
    
    // Efecto de aparición
    crearEfectoAparicion(ctx, x, y);
    
    // Guardar elemento
    elementosManifiesto.push({
        tipo: 'emocion',
        emoji: emoji,
        categoria: tipo,
        x: x,
        y: y
    });
}

/**
 * Agregar símbolo al manifiesto
 */
function agregarSimbolo(emoji, tipo) {
    const canvas = document.getElementById('canvas-manifiesto');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Posición aleatoria
    const x = 80 + Math.random() * (canvas.width - 160);
    const y = 60 + Math.random() * (canvas.height - 120);
    
    // Dibujar símbolo con animación
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8b5cf6';
    ctx.fillText(emoji, x, y);
    
    // Crear conexión visual con elementos cercanos
    crearConexionVisual(ctx, x, y);
    
    elementosManifiesto.push({
        tipo: 'simbolo',
        emoji: emoji,
        categoria: tipo,
        x: x,
        y: y
    });
}

/**
 * Crear momento clave en el manifiesto
 */
function crearMomento(tipoMomento) {
    const canvas = document.getElementById('canvas-manifiesto');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Definir características del momento
    const momentos = {
        'error-inicial': { color: '#ef4444', emoji: '❌', size: 30 },
        'confusion': { color: '#f59e0b', emoji: '🌪️', size: 28 },
        'busqueda': { color: '#3b82f6', emoji: '🔍', size: 26 },
        'descubrimiento': { color: '#10b981', emoji: '💎', size: 32 },
        'celebracion': { color: '#8b5cf6', emoji: '🎉', size: 30 },
        'nuevo-yo': { color: '#ec4899', emoji: '✨', size: 34 }
    };
    
    const momento = momentos[tipoMomento];
    if (!momento) return;
    
    // Posición estratégica basada en el tipo
    let x, y;
    switch(tipoMomento) {
        case 'error-inicial':
            x = 100; y = 100;
            break;
        case 'confusion':
            x = 200; y = 150;
            break;
        case 'busqueda':
            x = 300; y = 120;
            break;
        case 'descubrimiento':
            x = 400; y = 200;
            break;
        case 'celebracion':
            x = 450; y = 100;
            break;
        case 'nuevo-yo':
            x = 500; y = 180;
            break;
        default:
            x = 300; y = 200;
    }
    
    // Agregar variación aleatoria pequeña
    x += (Math.random() - 0.5) * 40;
    y += (Math.random() - 0.5) * 40;
    
    // Asegurar que esté dentro del canvas
    x = Math.max(50, Math.min(canvas.width - 50, x));
    y = Math.max(50, Math.min(canvas.height - 50, y));
    
    // Dibujar círculo de fondo
    ctx.beginPath();
    ctx.fillStyle = momento.color + '20';
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Dibujar borde
    ctx.beginPath();
    ctx.strokeStyle = momento.color;
    ctx.lineWidth = 3;
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Dibujar emoji
    ctx.font = `${momento.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = momento.color;
    ctx.fillText(momento.emoji, x, y);
    
    // Conectar con el momento anterior si existe
    const momentosAnteriores = elementosManifiesto.filter(el => el.tipo === 'momento');
    if (momentosAnteriores.length > 0) {
        const ultimo = momentosAnteriores[momentosAnteriores.length - 1];
        dibujarLineaConexion(ctx, ultimo.x, ultimo.y, x, y);
    }
    
    elementosManifiesto.push({
        tipo: 'momento',
        categoria: tipoMomento,
        x: x,
        y: y,
        color: momento.color,
        emoji: momento.emoji
    });
}

/**
 * Cambiar herramienta de dibujo
 */
function cambiarHerramienta(nuevaHerramienta) {
    herramientaActual = nuevaHerramienta;
    
    // Actualizar estilos de botones
    document.querySelectorAll('.herramienta-btn').forEach(btn => {
        btn.classList.remove('bg-purple-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    const btnActivo = document.getElementById(`btn-${nuevaHerramienta}`);
    if (btnActivo) {
        btnActivo.classList.remove('bg-gray-200', 'text-gray-700');
        btnActivo.classList.add('bg-purple-500', 'text-white');
    }
}

/**
 * Dibujar círculo decorativo
 */
function dibujarCirculo(ctx, x, y) {
    ctx.beginPath();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
}

/**
 * Dibujar corazón decorativo
 */
function dibujarCorazon(ctx, x, y) {
    ctx.fillStyle = '#ec4899';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('💖', x, y);
}

/**
 * Crear efecto de aparición
 */
function crearEfectoAparicion(ctx, x, y) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const angle = (i * 45) * Math.PI / 180;
            const distance = 30;
            const px = x + Math.cos(angle) * distance;
            const py = y + Math.sin(angle) * distance;
            
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, 2 * Math.PI);
            ctx.fill();
        }, i * 50);
    }
}

/**
 * Crear conexión visual entre elementos
 */
function crearConexionVisual(ctx, x, y) {
    if (elementosManifiesto.length > 0) {
        const ultimoElemento = elementosManifiesto[elementosManifiesto.length - 1];
        dibujarLineaConexion(ctx, ultimoElemento.x, ultimoElemento.y, x, y);
    }
}

/**
 * Dibujar línea de conexión entre puntos
 */
function dibujarLineaConexion(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
}

/**
 * Limpiar canvas del manifiesto
 */
function limpiarCanvasManifiesto() {
    const canvas = document.getElementById('canvas-manifiesto');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    elementosManifiesto = [];
    inicializarCanvasManifiesto(ctx, canvas);
}

/**
 * Finalizar el manifiesto visual
 */
function finalizarManifiesto() {
    const canvas = document.getElementById('canvas-manifiesto');
    const certificado = document.getElementById('certificado-final');
    
    if (!canvas || !certificado) return;
    
    // Agregar título final al manifiesto
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#6b21a8';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Mi Manifiesto del Error Creativo', canvas.width/2, 30);
    
    // Agregar fecha
    const fecha = new Date().toLocaleDateString('es-ES');
    ctx.font = '14px Arial';
    ctx.fillStyle = '#9333ea';
    ctx.fillText(fecha, canvas.width/2, canvas.height - 20);
    
    // Mostrar certificado
    certificado.classList.remove('hidden');
    
    // Crear certificado visual
    crearCertificadoVisual();
    
    // Celebración final
    celebracionFinalManifiesto();
}

/**
 * Crear certificado visual personalizado
 */
function crearCertificadoVisual() {
    const canvas = document.getElementById('certificado-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Fondo del certificado
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#fef3c7');
    gradient.addColorStop(1, '#fed7aa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Borde decorativo
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Título
    ctx.fillStyle = '#92400e';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICADO', canvas.width/2, 40);
    
    // Subtítulo
    ctx.font = '14px Arial';
    ctx.fillText('Maestro del Error Creativo', canvas.width/2, 65);
    
    // Dibujar elementos del manifiesto en miniatura
    const miniElementos = elementosManifiesto.slice(0, 6);
    miniElementos.forEach((elemento, index) => {
        const x = 50 + (index % 3) * 70;
        const y = 100 + Math.floor(index / 3) * 40;
        
        ctx.font = '16px Arial';
        ctx.fillText(elemento.emoji, x, y);
    });
    
    // Fecha
    ctx.font = '12px Arial';
    ctx.fillText(new Date().toLocaleDateString('es-ES'), canvas.width/2, canvas.height - 20);
}

/**
 * Celebración final del manifiesto
 */
function celebracionFinalManifiesto() {
    // Crear fuegos artificiales de emoticonos
    const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '🦋', '🌈'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const firework = document.createElement('div');
            firework.textContent = emoji;
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.fontSize = '24px';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '9999';
            firework.style.animation = 'fadeInOut 2s ease-out forwards';
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 100);
    }
}

/**
 * ================================================
 * FUNCIONES DE CANVAS Y HERRAMIENTAS
 * ================================================
 */

/**
 * Configurar canvas interactivo para manchas
 */
function configurarCanvasInteractivo() {
    if (!ActividadState.canvas || !ActividadState.ctx) return;
    
    ActividadState.ctx.lineCap = 'round';
    ActividadState.ctx.lineJoin = 'round';
    ActividadState.ctx.globalAlpha = 0.8;
}

/**
 * Configurar canvas creativo principal
 */
function configurarCanvasCreativo(actividadId) {
    if (!ActividadState.canvas || !ActividadState.ctx) return;
    
    const ctx = ActividadState.ctx;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ff6b6b';
    
    // Event listeners para dibujo
    const canvas = ActividadState.canvas;
    let isDrawing = false;
    
    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    });
    
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        guardarEstadoCanvas();
    });
    
    // Touch events para móviles
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Especial para actividad 2: deshabilitar limpiar
    if (actividadId === 'actividad2') {
        const btnLimpiar = document.querySelector('[onclick="limpiarCanvas()"]');
        if (btnLimpiar) {
            btnLimpiar.style.display = 'none';
        }
    }
}

/**
 * Configurar herramientas creativas
 */
function configurarHerramientasCreativas() {
    // Selector de color
    const selectorColor = document.getElementById('selector-color');
    if (selectorColor) {
        selectorColor.addEventListener('change', (e) => {
            ActividadState.colorActual = e.target.value;
            if (ActividadState.ctx) {
                ActividadState.ctx.strokeStyle = e.target.value;
            }
        });
    }
    
    // Tipo de pincel
    const tipoPincel = document.getElementById('tipo-pincel');
    if (tipoPincel) {
        tipoPincel.addEventListener('change', (e) => {
            aplicarTipoPincel(e.target.value);
        });
    }
    
    // Tamaño del pincel
    const tamanoPincel = document.getElementById('tamano-pincel');
    const tamanoDisplay = document.getElementById('tamano-display');
    if (tamanoPincel && tamanoDisplay) {
        tamanoPincel.addEventListener('input', (e) => {
            const tamano = e.target.value;
            ActividadState.tamañoActual = tamano;
            tamanoDisplay.textContent = tamano + 'px';
            if (ActividadState.ctx) {
                ActividadState.ctx.lineWidth = tamano;
            }
        });
    }
}

/**
 * Aplicar tipo de pincel específico
 */
function aplicarTipoPincel(tipo) {
    if (!ActividadState.ctx) return;
    
    const ctx = ActividadState.ctx;
    const tamanoBase = ActividadState.tamañoActual || 5;
    
    switch (tipo) {
        case 'normal':
            ctx.lineWidth = tamanoBase;
            ctx.globalAlpha = 1;
            ctx.lineCap = 'round';
            break;
        case 'grueso':
            ctx.lineWidth = tamanoBase * 1.5;
            ctx.globalAlpha = 1;
            ctx.lineCap = 'round';
            break;
        case 'fino':
            ctx.lineWidth = Math.max(1, tamanoBase * 0.5);
            ctx.globalAlpha = 1;
            ctx.lineCap = 'round';
            break;
        case 'marcador':
            ctx.lineWidth = tamanoBase * 1.2;
            ctx.globalAlpha = 0.7;
            ctx.lineCap = 'square';
            break;
        case 'acuarela':
            ctx.lineWidth = tamanoBase * 1.3;
            ctx.globalAlpha = 0.4;
            ctx.lineCap = 'round';
            break;
        case 'spray':
            ctx.lineWidth = tamanoBase;
            ctx.globalAlpha = 0.3;
            ctx.lineCap = 'round';
            break;
    }
}

/**
 * ================================================
 * FUNCIONES DE HERRAMIENTAS ESPECÍFICAS
 * ================================================
 */

/**
 * Generar mancha aleatoria
 */
/**
 * Inicializar mini-simulador para creación de manchas personales
 */
function inicializarMiniSimulador() {
    const container = document.getElementById('mini-simulador-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="mini-simulador-avanzado bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border-2 border-purple-300">
            <div class="canvas-principal-container mb-4">
                <h5 class="font-bold text-purple-700 mb-3 flex items-center gap-2">
                    <span class="text-lg">🖼️</span> Lienzo de Creación
                </h5>
                <div class="canvas-wrapper bg-white p-4 rounded-xl border-2 border-purple-200 shadow-inner">
                    <canvas id="canvas-mancha-personal" width="1200" height="800" 
                            class="border-3 border-purple-400 rounded-xl bg-white w-full cursor-crosshair shadow-lg mx-auto block"></canvas>
                </div>
                
                <div class="canvas-info mt-3 text-center">
                    <p class="text-sm text-purple-600">
                        💡 <strong>Tip:</strong> Usa herramientas profesionales para crear efectos realistas
                    </p>
                </div>
            </div>
            
            <!-- Contenedor para UI avanzada de pinceles -->
            <div id="ui-pinceles-avanzada-container" class="herramientas-profesionales">
                <!-- La UI avanzada se cargará aquí -->
            </div>
            
            <!-- Fallback: Controles básicos -->
            <div id="controles-basicos-fallback" class="controles-basicos bg-white p-4 rounded-lg border-2 border-gray-200" style="display: none;">
                <h5 class="font-bold text-gray-700 mb-3">🛠️ Herramientas Básicas</h5>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">Color:</label>
                        <input type="color" id="color-mancha-personal" value="#8B5CF6" class="w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">Tamaño: <span id="tamano-mancha-display">8</span>px</label>
                        <input type="range" id="tamano-mancha-personal" min="2" max="25" value="8" class="w-full">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Configurar canvas personal
    setTimeout(() => {
        configurarCanvasManchaPersonal();
    }, 100);
}

/**
 * Configurar canvas para crear mancha personal con herramientas que SÍ funcionen
 */
function configurarCanvasManchaPersonal() {
    const canvas = document.getElementById('canvas-mancha-personal');
    if (!canvas) {
        console.error('Canvas no encontrado');
        return;
    }
    
    console.log('🎨 Configurando canvas de mancha personal...');
    
    // Intentar sistema avanzado primero, pero con fallback robusto
    setTimeout(() => {
        if (window.SistemaAvanzadoPinceles && window.UIAvanzadaPinceles) {
            try {
                const sistemaPinceles = new window.SistemaAvanzadoPinceles();
                sistemaPinceles.setCanvas(canvas);
                
                const uiAvanzada = new window.UIAvanzadaPinceles(sistemaPinceles);
                
                // Buscar o crear contenedor para la UI avanzada
                let uiContainer = document.getElementById('ui-pinceles-avanzada-container');
                if (uiContainer) {
                    uiAvanzada.render(uiContainer);
                    
                    // Guardar referencias globales
                    ActividadState.sistemaPincelesAvanzado = sistemaPinceles;
                    ActividadState.uiPincelesAvanzada = uiAvanzada;
                    
                    console.log('✅ Sistema avanzado de pinceles cargado correctamente');
                    return;
                }
            } catch (error) {
                console.warn('⚠️ Error cargando sistema avanzado, usando básico:', error);
            }
        }
        
        // Siempre usar fallback funcional
        console.log('🔄 Cargando sistema básico funcional...');
        configurarCanvasBasicoManchaPersonal(canvas);
    }, 100);
}

/**
 * Configurar canvas básico FUNCIONAL como fallback
 */
function configurarCanvasBasicoManchaPersonal(canvas) {
    const ctx = canvas.getContext('2d');
    let dibujando = false;
    let lastX = 0;
    let lastY = 0;
    
    console.log('🔧 Configurando canvas básico funcional...');
    
    // Mostrar controles básicos mejorados
    mostrarControlesBasicosCompletos();
    
    // Estado del sistema básico
    const herramientasState = {
        herramientaActiva: 'pincel',
        color: '#8B5CF6',
        tamano: 12,
        opacidad: 1.0
    };
    
    // Configurar contexto
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = herramientasState.color;
    ctx.lineWidth = herramientasState.tamano;
    ctx.globalAlpha = herramientasState.opacidad;
    
    // Eventos de mouse - FUNCIONALES
    canvas.addEventListener('mousedown', iniciarDibujo);
    canvas.addEventListener('mousemove', dibujar);
    canvas.addEventListener('mouseup', detenerDibujo);
    canvas.addEventListener('mouseout', detenerDibujo);
    
    // Eventos táctiles - FUNCIONALES
    canvas.addEventListener('touchstart', manejarToqueInicio, {passive: false});
    canvas.addEventListener('touchmove', manejarToqueMover, {passive: false});
    canvas.addEventListener('touchend', manejarToqueFinished, {passive: false});
    
    function iniciarDibujo(e) {
        dibujando = true;
        const pos = obtenerPosicionMouse(e);
        lastX = pos.x;
        lastY = pos.y;
        
        // Aplicar herramienta actual
        aplicarHerramienta(pos.x, pos.y, pos.x, pos.y);
        console.log(`🎨 Iniciando dibujo con ${herramientasState.herramientaActiva}`);
    }
    
    function dibujar(e) {
        if (!dibujando) return;
        
        const pos = obtenerPosicionMouse(e);
        aplicarHerramienta(lastX, lastY, pos.x, pos.y);
        lastX = pos.x;
        lastY = pos.y;
    }
    
    function detenerDibujo() {
        if (dibujando) {
            dibujando = false;
            console.log('🛑 Deteniendo dibujo');
        }
    }
    
    function obtenerPosicionMouse(e) {
        // Usar función de precisión mejorada
        return obtenerPosicionPrecisa(e, canvas);
    }
    
    function manejarToqueInicio(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function manejarToqueMover(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function manejarToqueFinished(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    }
    
    // HERRAMIENTAS QUE SÍ FUNCIONAN
    function aplicarHerramienta(x1, y1, x2, y2) {
        ctx.strokeStyle = herramientasState.color;
        ctx.lineWidth = herramientasState.tamano;
        ctx.globalAlpha = herramientasState.opacidad;
        
        switch(herramientasState.herramientaActiva) {
            case 'pincel':
                aplicarPincel(x1, y1, x2, y2);
                break;
            case 'agua':
                aplicarEfectoAgua(x2, y2);
                break;
            case 'esponja':
                aplicarEsponja(x2, y2);
                break;
            case 'goteo':
                aplicarGoteo(x2, y2);
                break;
            default:
                aplicarPincel(x1, y1, x2, y2);
        }
    }
    
    function aplicarPincel(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    function aplicarEfectoAgua(x, y) {
        const originalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = 0.3;
        
        for (let i = 0; i < 8; i++) {
            const offsetX = (Math.random() - 0.5) * herramientasState.tamano * 2;
            const offsetY = (Math.random() - 0.5) * herramientasState.tamano * 2;
            const radio = Math.random() * herramientasState.tamano * 0.8;
            
            ctx.fillStyle = herramientasState.color;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, radio, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = originalAlpha;
    }
    
    function aplicarEsponja(x, y) {
        const originalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = 0.6;
        
        for (let i = 0; i < 12; i++) {
            const offsetX = (Math.random() - 0.5) * herramientasState.tamano;
            const offsetY = (Math.random() - 0.5) * herramientasState.tamano;
            const radio = Math.random() * herramientasState.tamano * 0.4;
            
            ctx.fillStyle = herramientasState.color;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, radio, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = originalAlpha;
    }
    
    function aplicarGoteo(x, y) {
        // Gota principal
        ctx.fillStyle = herramientasState.color;
        ctx.beginPath();
        ctx.arc(x, y, herramientasState.tamano * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Goteo hacia abajo
        const altura = 20 + Math.random() * 30;
        ctx.beginPath();
        ctx.ellipse(x, y + altura/2, herramientasState.tamano * 0.3, altura/2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Exponer funciones para botones
    window.cambiarHerramientaMancha = function(herramienta) {
        herramientasState.herramientaActiva = herramienta;
        console.log(`🔧 Herramienta cambiada a: ${herramienta}`);
        
        // Feedback visual
        actualizarBotonHerramientaActiva(herramienta);
    };
    
    window.cambiarColorMancha = function(color) {
        herramientasState.color = color;
        ctx.strokeStyle = color;
        console.log(`🎨 Color cambiado a: ${color}`);
    };
    
    window.cambiarTamanoMancha = function(tamano) {
        herramientasState.tamano = parseInt(tamano);
        ctx.lineWidth = herramientasState.tamano;
        console.log(`📏 Tamaño cambiado a: ${tamano}px`);
    };
    
    // Guardar referencia del estado
    ActividadState.herramientasBasicas = herramientasState;
    
    // Mostrar controles funcionales
    mostrarControlesBasicosCompletos();
    
    console.log('✅ Canvas básico configurado correctamente con herramientas funcionales');
    
    // Eventos de dibujo
    canvas.addEventListener('mousedown', iniciarDibujoMancha);
    canvas.addEventListener('mousemove', dibujarMancha);
    canvas.addEventListener('mouseup', terminarDibujoMancha);
    canvas.addEventListener('mouseout', terminarDibujoMancha);
    
    // Eventos táctiles
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX - rect.left + rect.left,
            clientY: touch.clientY - rect.top + rect.top
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX - rect.left + rect.left,
            clientY: touch.clientY - rect.top + rect.top
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Controles
    const colorInput = document.getElementById('color-mancha-personal');
    const tamanoInput = document.getElementById('tamano-mancha-personal');
    const tamanoDisplay = document.getElementById('tamano-mancha-display');
    
    if (colorInput) {
        colorInput.addEventListener('change', (e) => {
            miniState.color = e.target.value;
            ctx.strokeStyle = e.target.value;
            ctx.fillStyle = e.target.value;
        });
    }
    
    if (tamanoInput) {
        tamanoInput.addEventListener('input', (e) => {
            miniState.tamano = parseInt(e.target.value);
            ctx.lineWidth = miniState.tamano;
            if (tamanoDisplay) {
                tamanoDisplay.textContent = e.target.value;
            }
        });
    }
    
    // Configuración inicial
    ctx.strokeStyle = miniState.color;
    ctx.fillStyle = miniState.color;
    ctx.lineWidth = miniState.tamano;
    
    // Funciones de dibujo
    function iniciarDibujoMancha(e) {
        dibujando = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        
        if (miniState.herramienta === 'pincel') {
            ctx.moveTo(x, y);
        } else if (miniState.herramienta === 'esponja') {
            aplicarEfectoEsponja(x, y);
        } else if (miniState.herramienta === 'goteo') {
            aplicarEfectoGoteo(x, y);
        }
    }
    
    function dibujarMancha(e) {
        if (!dibujando) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        switch (miniState.herramienta) {
            case 'pincel':
                ctx.lineTo(x, y);
                ctx.stroke();
                break;
            case 'agua':
                aplicarEfectoAgua(x, y);
                break;
            case 'esponja':
                aplicarEfectoEsponja(x, y);
                break;
            case 'goteo':
                // El goteo se aplica solo al inicio
                break;
        }
    }
    
    function terminarDibujoMancha() {
        if (!dibujando) return;
        dibujando = false;
        ctx.beginPath();
    }
    
    // Efectos especiales
    function aplicarEfectoAgua(x, y) {
        ctx.globalAlpha = 0.3;
        const radio = miniState.tamano * 2;
        
        for (let i = 0; i < 5; i++) {
            const offsetX = (Math.random() - 0.5) * radio;
            const offsetY = (Math.random() - 0.5) * radio;
            
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, Math.random() * miniState.tamano, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
    
    function aplicarEfectoEsponja(x, y) {
        ctx.globalAlpha = 0.6;
        
        for (let i = 0; i < 8; i++) {
            const offsetX = (Math.random() - 0.5) * miniState.tamano;
            const offsetY = (Math.random() - 0.5) * miniState.tamano;
            const size = Math.random() * miniState.tamano * 0.5;
            
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
    
    function aplicarEfectoGoteo(x, y) {
        // Crear goteo vertical
        const altura = 20 + Math.random() * 30;
        ctx.beginPath();
        ctx.ellipse(x, y + altura/2, miniState.tamano/3, altura/2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Gota superior
        ctx.beginPath();
        ctx.arc(x, y, miniState.tamano/2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Guardar referencia para uso externo
    ActividadState.canvasManchaPersonal = canvas;
    ActividadState.ctxManchaPersonal = ctx;
    ActividadState.miniState = miniState;
    
    console.log('🎨 Mini-simulador de manchas configurado');
}

/**
 * Activar herramienta específica del mini-simulador
 */
function activarHerramientaMancha(herramienta) {
    if (ActividadState.miniState) {
        ActividadState.miniState.herramienta = herramienta;
        
        // Feedback visual
        const botones = document.querySelectorAll('.btn-herramienta');
        botones.forEach(btn => btn.classList.remove('ring-2', 'ring-white'));
        
        event.target.classList.add('ring-2', 'ring-white');
        
        // Mostrar tip de la herramienta
        const tips = {
            'pincel': 'Traza líneas suaves y controladas',
            'agua': 'Efecto de acuarela con difuminado',
            'esponja': 'Textura irregular y absorción',
            'goteo': 'Goteos verticales realistas'
        };
        
        mostrarNotificacion(`🎨 ${tips[herramienta]}`, 'info');
    }
}

/**
 * Limpiar canvas de mancha personal
 */
function limpiarManchaPersonal() {
    if (ActividadState.canvasManchaPersonal && ActividadState.ctxManchaPersonal) {
        const ctx = ActividadState.ctxManchaPersonal;
        const canvas = ActividadState.canvasManchaPersonal;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mostrarNotificacion('🧹 Lienzo limpio, ¡crea tu mancha!', 'info');
    }
}

/**
 * Guardar mancha personal para usar después
 */
function guardarManchaPersonal() {
    if (ActividadState.canvasManchaPersonal) {
        try {
            // Guardar la mancha en localStorage
            const manchaData = ActividadState.canvasManchaPersonal.toDataURL();
            localStorage.setItem('mancha-personal-creada', manchaData);
            
            mostrarNotificacion('💾 ¡Tu mancha se guardó! Aparecerá en la siguiente actividad', 'success');
            
            console.log('Mancha personal guardada');
        } catch (error) {
            console.error('Error guardando mancha personal:', error);
            mostrarNotificacion('❌ Error al guardar la mancha', 'error');
        }
    }
}

/**
 * Generar mancha realista tipo acuarela
 */
function generarManchaAleatoria() {
    // Intentar obtener el canvas del contexto actual
    let canvas = ActividadState.canvas;
    let ctx = ActividadState.ctx;
    
    // Si no existe, buscar el canvas principal (fallback)
    if (!canvas || !ctx) {
        canvas = document.getElementById('canvas-principal');
        if (canvas) {
            ctx = canvas.getContext('2d');
            // Actualizar el estado para futuras operaciones
            ActividadState.canvas = canvas;
            ActividadState.ctx = ctx;
        }
    }
    
    if (!canvas || !ctx) {
        console.warn('Canvas no disponible para generar mancha');
        mostrarNotificacion('🎨 Canvas no disponible. Por favor, recarga la página.', 'error');
        return;
    }
    
    // NO limpiar canvas - mantener trabajos anteriores
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Colores de acuarela naturales
    const coloresAcuarela = [
        '#4A90E2', '#7ED321', '#F5A623', '#D0021B', '#9013FE',
        '#BD10E0', '#B8E986', '#50E3C2', '#B6E5D8', '#A8E6CF',
        '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'
    ];
    
    const colorPrincipal = coloresAcuarela[Math.floor(Math.random() * coloresAcuarela.length)];
    const colorSecundario = coloresAcuarela[Math.floor(Math.random() * coloresAcuarela.length)];
    
    // Punto central aleatorio
    const centroX = canvas.width * (0.3 + Math.random() * 0.4);
    const centroY = canvas.height * (0.3 + Math.random() * 0.4);
    
    // Crear mancha principal orgánica
    crearManchaOrganica(ctx, centroX, centroY, colorPrincipal, colorSecundario);
    
    // Agregar salpicaduras y detalles
    agregarSalpicadurasAcuarela(ctx, centroX, centroY, colorPrincipal);
    
    // Efectos de difuminado
    aplicarEfectoDifuminado(ctx, centroX, centroY);
    
    // Mostrar notificación solo si la función está disponible
    if (typeof window.mostrarNotificacion === 'function') {
        window.mostrarNotificacion('🎨 ¡Mancha de acuarela generada! Observa qué formas puedes encontrar', 'success');
    }
}

/**
 * Crear mancha orgánica principal
 */
function crearManchaOrganica(ctx, centroX, centroY, colorPrincipal, colorSecundario) {
    // Mancha base con forma irregular
    const numPuntos = 8 + Math.floor(Math.random() * 8);
    const radioBase = 60 + Math.random() * 80;
    
    // Crear gradiente radial para efecto acuarela
    const gradiente = ctx.createRadialGradient(centroX, centroY, 0, centroX, centroY, radioBase * 1.5);
    gradiente.addColorStop(0, colorPrincipal + 'CC');
    gradiente.addColorStop(0.4, colorPrincipal + '88');
    gradiente.addColorStop(0.7, colorSecundario + '44');
    gradiente.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradiente;
    
    // Crear forma orgánica con curvas suaves
    ctx.beginPath();
    const puntos = [];
    
    for (let i = 0; i < numPuntos; i++) {
        const angulo = (Math.PI * 2 / numPuntos) * i;
        const variacion = 0.7 + Math.random() * 0.6; // Variación en el radio
        const ruido = (Math.random() - 0.5) * 0.3; // Ruido para irregularidad
        
        const radio = radioBase * variacion;
        const x = centroX + Math.cos(angulo + ruido) * radio;
        const y = centroY + Math.sin(angulo + ruido) * radio;
        
        puntos.push({ x, y });
    }
    
    // Dibujar curva suave a través de los puntos
    ctx.moveTo(puntos[0].x, puntos[0].y);
    
    for (let i = 0; i < puntos.length; i++) {
        const punto = puntos[i];
        const siguientePunto = puntos[(i + 1) % puntos.length];
        
        // Punto de control para curva suave
        const cpX = (punto.x + siguientePunto.x) / 2 + (Math.random() - 0.5) * 20;
        const cpY = (punto.y + siguientePunto.y) / 2 + (Math.random() - 0.5) * 20;
        
        ctx.quadraticCurveTo(punto.x, punto.y, cpX, cpY);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Agregar capas adicionales para profundidad
    for (let capa = 0; capa < 3; capa++) {
        const opacity = (0.4 - capa * 0.1);
        const desplazamiento = capa * 15;
        
        ctx.globalAlpha = opacity;
        ctx.fillStyle = colorPrincipal;
        
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const radio = 30 + Math.random() * 40;
            const x = centroX + Math.cos(angulo) * (radio + desplazamiento) + (Math.random() - 0.5) * 30;
            const y = centroY + Math.sin(angulo) * (radio + desplazamiento) + (Math.random() - 0.5) * 30;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Agregar salpicaduras tipo acuarela
 */
function agregarSalpicadurasAcuarela(ctx, centroX, centroY, color) {
    const numSalpicaduras = 15 + Math.floor(Math.random() * 20);
    
    for (let i = 0; i < numSalpicaduras; i++) {
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 80 + Math.random() * 150;
        const x = centroX + Math.cos(angulo) * distancia;
        const y = centroY + Math.sin(angulo) * distancia;
        const radio = 2 + Math.random() * 8;
        const opacity = 0.3 + Math.random() * 0.4;
        
        // Verificar que esté dentro del canvas
        if (x >= 0 && x <= ActividadState.canvas.width && y >= 0 && y <= ActividadState.canvas.height) {
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            
            ctx.beginPath();
            ctx.arc(x, y, radio, 0, Math.PI * 2);
            ctx.fill();
            
            // Algunas salpicaduras tienen forma irregular
            if (Math.random() > 0.7) {
                ctx.beginPath();
                ctx.ellipse(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10, 
                           radio * 0.6, radio * 1.4, Math.random() * Math.PI * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Aplicar efecto de difuminado acuarela
 */
function aplicarEfectoDifuminado(ctx, centroX, centroY) {
    // Crear manchas secundarias más sutiles
    const numManchas = 3 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numManchas; i++) {
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 40 + Math.random() * 60;
        const x = centroX + Math.cos(angulo) * distancia;
        const y = centroY + Math.sin(angulo) * distancia;
        const radio = 20 + Math.random() * 30;
        
        // Gradiente suave para difuminado
        const gradienteDifuminado = ctx.createRadialGradient(x, y, 0, x, y, radio);
        gradienteDifuminado.addColorStop(0, 'rgba(100, 100, 100, 0.1)');
        gradienteDifuminado.addColorStop(0.5, 'rgba(100, 100, 100, 0.05)');
        gradienteDifuminado.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradienteDifuminado;
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);
        ctx.fill();
    }
}

/**
 * Rotar vista de la mancha
 */
function rotarMancha() {
    if (!ActividadState.canvas || !ActividadState.ctx) return;
    
    const canvas = ActividadState.canvas;
    const ctx = ActividadState.ctx;
    
    // Guardar el contenido actual
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Limpiar y rotar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 4); // Rotar 45 grados
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();
    
    mostrarNotificacionActividad('🔄 Vista rotada! ¿Aparecen nuevas formas?', 'info');
}

/**
 * Ampliar detalle
 */
function ampliarDetalle() {
    mostrarNotificacionActividad('🔍 ¡Observa los detalles más pequeños! Cada textura cuenta.', 'info');
    // Aquí se podría implementar un zoom real si fuera necesario
}

/**
 * Seleccionar emoción
 */
function seleccionarEmocion(emocion, boton) {
    // Remover selección previa
    document.querySelectorAll('.emocion-btn').forEach(btn => {
        btn.classList.remove('bg-yellow-200', 'border-yellow-600', 'scale-105');
        btn.classList.add('bg-white', 'border-yellow-400');
    });
    
    // Marcar como seleccionado
    boton.classList.remove('bg-white', 'border-yellow-400');
    boton.classList.add('bg-yellow-200', 'border-yellow-600', 'scale-105');
    
    // Mostrar selección
    const seleccionDiv = document.getElementById('emocion-seleccionada');
    const textoSpan = document.getElementById('emocion-texto');
    
    if (seleccionDiv && textoSpan) {
        textoSpan.textContent = emocion;
        seleccionDiv.classList.remove('hidden');
    }
    
    // Guardar en estado
    ActividadState.emociones[ActividadState.actividadActual] = emocion;
    
    mostrarNotificacionActividad(`💖 Emoción registrada: ${emocion}`, 'success');
}

/**
 * Seleccionar emoción creativa
 */
function seleccionarEmocionCreativa(emocion, boton) {
    // Remover selección previa
    document.querySelectorAll('.emocion-creativa').forEach(btn => {
        btn.classList.remove('bg-green-200', 'border-green-500', 'scale-105');
        btn.classList.add('bg-white', 'border-green-300');
    });
    
    // Marcar como seleccionado
    boton.classList.remove('bg-white', 'border-green-300');
    boton.classList.add('bg-green-200', 'border-green-500', 'scale-105');
    
    // Mostrar selección
    const seleccionDiv = document.getElementById('emocion-creativa-seleccionada');
    const textoSpan = document.getElementById('emocion-creativa-texto');
    
    if (seleccionDiv && textoSpan) {
        textoSpan.textContent = emocion;
        seleccionDiv.classList.remove('hidden');
    }
}

/**
 * ================================================
 * FUNCIONES DE MEDITACIÓN
 * ================================================
 */

/**
 * Iniciar meditación guiada mejorada
 */
function iniciarMeditacion() {
    console.log('🧘‍♀️ Iniciando meditación guiada...');
    
    // Preparar estado de meditación
    MeditacionState.activa = true;
    MeditacionState.pausada = false;
    MeditacionState.indiceActual = 0;
    MeditacionState.cancelarVoz = false;
    MeditacionState.textos = ActividadState.textosMeditacion || [
        "Hola, soy Luna, tu amiga que te va a acompañar en este viaje mágico. Ponte cómodo y cierra suavemente tus ojos... así, perfecto.",
        "Ahora vamos a respirar juntos. Inhala lentamente... uno, dos, tres... y exhala despacio... muy bien. Así se siente la calma.",
        "Imagina conmigo que en tu mente hay una puerta muy especial... es brillante y dorada como el sol. ¿La puedes ver?",
        "Esa puerta mágica se está abriendo despacito hacia tu lugar favorito en todo el mundo... ese lugar donde tu corazón se siente feliz y seguro.",
        "Ya estás ahí... mira a tu alrededor. ¿Qué colores ves? Tal vez son suaves como las nubes, o brillantes como las flores... tómate tu tiempo para verlo todo.",
        "Ahora escucha... ¿qué sonidos vives en tu lugar especial? Puede ser el canto de los pájaros, las risas de tu familia, o quizás un silencio tranquilo que te abraza.",
        "Ahora siente... ¿hay una brisa tibia? ¿el pasto bajo tus pies? ¿una manta suavecita? ¿huele a galletas, a flores, a mar? Deja que todos estos sentimientos llenen tu corazón.",
        "Guarda todo esto como un tesoro en tu memoria... porque este lugar siempre estará contigo. Cuando abras los ojos, vas a crear arte con todo el amor que sientes por tu lugar mágico."
    ];
    
    // Actualizar controles
    actualizarControlesMeditacion('iniciada');
    
    // Comenzar meditación
    mostrarSiguienteTextoMeditacion();
}

/**
 * Pausar meditación
 */
function pausarMeditacion() {
    console.log('⏸️ Pausando meditación...');
    
    MeditacionState.pausada = true;
    MeditacionState.cancelarVoz = true;
    
    // Cancelar timeout si existe
    if (MeditacionState.timeoutId) {
        clearTimeout(MeditacionState.timeoutId);
        MeditacionState.timeoutId = null;
    }
    
    // Cancelar síntesis de voz
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
    
    // Actualizar controles
    actualizarControlesMeditacion('pausada');
    
    // Mostrar mensaje de pausa
    const textoElemento = document.getElementById('texto-meditacion');
    if (textoElemento) {
        textoElemento.innerHTML = '<strong>⏸️ Meditación pausada... Presiona "Continuar" cuando estés listo</strong>';
    }
}

/**
 * Reanudar meditación
 */
function reanudarMeditacion() {
    console.log('▶️ Reanudando meditación...');
    
    MeditacionState.pausada = false;
    MeditacionState.cancelarVoz = false;
    
    // Actualizar controles
    actualizarControlesMeditacion('reanudada');
    
    // Continuar desde donde se pausó
    mostrarSiguienteTextoMeditacion();
}

/**
 * Saltar meditación completamente
 */
function saltarMeditacion() {
    console.log('⏭️ Saltando meditación...');
    
    // Detener meditación
    detenerMeditacion();
    
    // Mostrar mensaje de salto
    const textoElemento = document.getElementById('texto-meditacion');
    if (textoElemento) {
        textoElemento.innerHTML = '<strong>✨ ¡Perfecto! Ahora vamos a crear arte con tu lugar especial en mente.</strong>';
    }
    
    // Mostrar sección de completada
    const completadaDiv = document.getElementById('meditacion-completada');
    if (completadaDiv) {
        completadaDiv.classList.remove('hidden');
    }
    
    // Actualizar controles
    actualizarControlesMeditacion('completada');
}

/**
 * Detener meditación (función auxiliar)
 */
function detenerMeditacion() {
    MeditacionState.activa = false;
    MeditacionState.pausada = false;
    MeditacionState.cancelarVoz = true;
    
    // Cancelar timeout
    if (MeditacionState.timeoutId) {
        clearTimeout(MeditacionState.timeoutId);
        MeditacionState.timeoutId = null;
    }
    
    // Cancelar voz
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
}

/**
 * Mostrar siguiente texto de meditación (mejorado)
 */
function mostrarSiguienteTextoMeditacion() {
    // Verificar si la meditación sigue activa y no está pausada
    if (!MeditacionState.activa || MeditacionState.pausada) {
        return;
    }
    
    const indice = MeditacionState.indiceActual;
    const textos = MeditacionState.textos;
    
    if (indice < textos.length) {
        const textoElemento = document.getElementById('texto-meditacion');
        const circulo = document.getElementById('circulo-respiracion');
        const progreso = document.getElementById('progreso-meditacion');
        
        // Mostrar texto con animación
        if (textoElemento) {
            textoElemento.style.opacity = '0';
            setTimeout(() => {
                if (!MeditacionState.pausada) {
                    textoElemento.textContent = textos[indice];
                    textoElemento.style.opacity = '1';
                    
                    // Hablar el texto COMPLETO sin cortes
                    hablarTextoCompleto(textos[indice]);
                }
            }, 300);
        }
        
        // Actualizar círculo de respiración
        if (circulo) {
            const mensajes = ['🌙', 'Respira', 'Imagina', 'Viaja', 'Mira', 'Escucha', 'Siente', '💝'];
            circulo.textContent = mensajes[indice] || 'Relájate';
        }
        
        // Actualizar progreso
        if (progreso) {
            progreso.style.width = ((indice + 1) / textos.length) * 100 + '%';
        }
        
        // Avanzar índice
        MeditacionState.indiceActual++;
        
        // Tiempos aumentados para permitir que termine la voz
        const tiempos = [
            10000,  // Presentación de Luna (10 segundos)
            12000,  // Respiración guiada (12 segundos)
            10000,  // Puerta dorada (10 segundos)
            15000,  // Llegada al lugar (15 segundos)
            18000,  // Observar colores (18 segundos)
            18000,  // Escuchar sonidos (18 segundos)
            22000,  // Sentir texturas y aromas (22 segundos)
            15000   // Mensaje final (15 segundos)
        ];
        
        const tiempoEspera = tiempos[indice] || 12000;
        
        // Programar siguiente texto
        MeditacionState.timeoutId = setTimeout(() => {
            mostrarSiguienteTextoMeditacion();
        }, tiempoEspera);
        
    } else {
        // Completar meditación
        completarMeditacionMejorada();
    }
}

/**
 * Completar meditación (mejorado)
 */
function completarMeditacionMejorada() {
    console.log('🌟 Completando meditación...');
    
    const textoElemento = document.getElementById('texto-meditacion');
    const completadaDiv = document.getElementById('meditacion-completada');
    
    if (textoElemento) {
        textoElemento.innerHTML = '<strong>🌟 ¡Qué hermoso viaje hicimos juntos! Tu lugar especial ahora vive en tu corazón para siempre.</strong>';
        
        // Mensaje final completo y pausado
        const mensajeFinal = '¡Qué hermoso viaje hicimos juntos! Tu lugar especial ahora vive en tu corazón para siempre. Cuando quieras, puedes cerrar los ojos y regresar ahí. Ahora vamos a crear arte con todo ese amor que sientes por tu lugar mágico. ¡Será increíble!';
        hablarTextoCompleto(mensajeFinal);
    }
    
    // Detener meditación
    detenerMeditacion();
    
    // Mostrar sección completada después de que termine la voz
    if (completadaDiv) {
        setTimeout(() => {
            completadaDiv.classList.remove('hidden');
        }, 8000); // Tiempo suficiente para el mensaje final
    }
    
    // Actualizar controles
    actualizarControlesMeditacion('completada');
}

/**
 * Actualizar controles de meditación según el estado
 */
function actualizarControlesMeditacion(estado) {
    const btnIniciar = document.getElementById('btn-iniciar-meditacion');
    const btnPausar = document.getElementById('btn-pausar-meditacion');
    const btnReanudar = document.getElementById('btn-reanudar-meditacion');
    const btnSaltar = document.getElementById('btn-saltar-meditacion');
    
    // Ocultar todos primero
    [btnIniciar, btnPausar, btnReanudar].forEach(btn => {
        if (btn) btn.classList.add('hidden');
    });
    
    switch (estado) {
        case 'iniciada':
        case 'reanudada':
            btnPausar?.classList.remove('hidden');
            btnSaltar?.classList.remove('hidden');
            break;
        case 'pausada':
            btnReanudar?.classList.remove('hidden');
            btnSaltar?.classList.remove('hidden');
            break;
        case 'completada':
            btnIniciar?.classList.remove('hidden');
            btnSaltar?.classList.add('hidden');
            // Reiniciar estado para permitir nueva meditación
            MeditacionState.indiceActual = 0;
            break;
    }
}

/**
 * Hablar texto completo sin interrupciones (para meditación)
 */
function hablarTextoCompleto(texto) {
    if ('speechSynthesis' in window && !MeditacionState.cancelarVoz) {
        speechSynthesis.cancel(); // Cancelar cualquier síntesis anterior
        
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-MX'; // Español mexicano (más neutral)
        
        // Configuración más lenta para meditación
        utterance.rate = 0.4;        // Muy lenta para meditación relajante
        utterance.pitch = 0.9;       // Tono más grave y cálido (femenino natural)
        utterance.volume = 0.8;      // Volumen suave y relajante
        
        // Buscar la mejor voz femenina y natural disponible
        const voces = speechSynthesis.getVoices();
        
        // Prioridad 1: Voces femeninas naturales en inglés (más humanas)
        let vozPreferida = voces.find(voz => 
            (voz.lang.includes('en-US') || voz.lang.includes('en-GB')) && 
            (voz.name.toLowerCase().includes('samantha') ||
             voz.name.toLowerCase().includes('alexis') ||
             voz.name.toLowerCase().includes('serena') ||
             voz.name.toLowerCase().includes('catherine') ||
             voz.name.toLowerCase().includes('female') ||
             voz.name.toLowerCase().includes('woman'))
        );
        
        // Prioridad 2: Voces femeninas en español mexicano/latinoamericano
        if (!vozPreferida) {
            vozPreferida = voces.find(voz => 
                (voz.lang.includes('es-MX') || voz.lang.includes('es-US') || voz.lang.includes('es-AR')) && 
                (voz.name.toLowerCase().includes('female') || 
                 voz.name.toLowerCase().includes('woman') ||
                 voz.name.toLowerCase().includes('paulina') ||
                 voz.name.toLowerCase().includes('lucía'))
        );
        
        // Prioridad 3: Cualquier voz femenina en español
        if (!vozPreferida) {
            vozPreferida = voces.find(voz => 
                voz.lang.includes('es') && 
                (voz.name.toLowerCase().includes('female') || 
                 voz.name.toLowerCase().includes('woman'))
            );
        }
        
        // Fallback: Cualquier voz en español
        if (!vozPreferida) {
            vozPreferida = voces.find(voz => voz.lang.includes('es'));
        }
        
        if (vozPreferida) {
            utterance.voice = vozPreferida;
        }
        
        // Callbacks para debug
        utterance.onstart = () => {
            if (!MeditacionState.cancelarVoz) {
                console.log('🌙 Luna comenzó:', texto.substring(0, 50) + '...');
            }
        };
        
        utterance.onend = () => {
            if (!MeditacionState.cancelarVoz) {
                console.log('🌙 Luna terminó de hablar');
            }
        };
        
        utterance.onerror = (event) => {
            console.warn('⚠️ Error en síntesis de voz:', event.error);
        };
        
        // Hablar solo si no está cancelado
        if (!MeditacionState.cancelarVoz) {
            speechSynthesis.speak(utterance);
        }
    }
}

/**
 * Hablar texto (síntesis de voz) - función original
 */
function hablarTexto(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); // Cancelar cualquier síntesis anterior
        
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'es-MX'; // Español mexicano (más neutral)
        
        // Configuración para voz más natural, cálida y suave como Luna
        utterance.rate = 0.5;        // Más lenta para ser más tranquila
        utterance.pitch = 0.9;       // Tono más grave y cálido (femenino natural)
        utterance.volume = 0.8;      // Volumen suave y relajante
        
        // Buscar la mejor voz femenina y natural disponible
        const voces = speechSynthesis.getVoices();
        
        // Prioridad 1: Voces femeninas naturales en inglés (más humanas)
        let vozPreferida = voces.find(voz => 
            (voz.lang.includes('en-US') || voz.lang.includes('en-GB')) && 
            (voz.name.toLowerCase().includes('samantha') ||
             voz.name.toLowerCase().includes('alexis') ||
             voz.name.toLowerCase().includes('serena') ||
             voz.name.toLowerCase().includes('catherine') ||
             voz.name.toLowerCase().includes('female') ||
             voz.name.toLowerCase().includes('woman'))
        );
        
        // Prioridad 2: Voces femeninas en español mexicano/latinoamericano
        if (!vozPreferida) {
            vozPreferida = voces.find(voz => 
                (voz.lang.includes('es-MX') || voz.lang.includes('es-US') || voz.lang.includes('es-AR')) && 
                (voz.name.toLowerCase().includes('female') || 
                 voz.name.toLowerCase().includes('woman') ||
                 voz.name.toLowerCase().includes('paulina') ||
                 voz.name.toLowerCase().includes('lucía'))
        );
        
        // Prioridad 3: Cualquier voz femenina en español
        if (!vozPreferida) {
            vozPreferida = voces.find(voz => 
                voz.lang.includes('es') && 
                (voz.name.toLowerCase().includes('female') || 
                 voz.name.toLowerCase().includes('woman'))
            );
        }
        
        // Fallback: Cualquier voz en español
        if (!vozPreferida) {
            vozPreferida = voces.find(voz => voz.lang.includes('es'));
        }
        
        if (vozPreferida) {
            utterance.voice = vozPreferida;
            console.log('� Luna está usando la voz:', vozPreferida.name);
        }
        
        // Agregar pausas naturales y respiración
        utterance.onstart = () => {
            console.log('🌙 Luna está susurrando con amor...');
        };
        
        utterance.onend = () => {
            console.log('🌙 Luna terminó su mensaje con ternura');
        };
        
        // Pequeña pausa antes de hablar para que se sienta más natural
        setTimeout(() => {
            speechSynthesis.speak(utterance);
        }, 500);
    }
}

/**
 * Inicializar voces disponibles para Luna
 */
function inicializarVocesLuna() {
    if ('speechSynthesis' in window) {
        // Cargar voces disponibles
        let voces = speechSynthesis.getVoices();
        
        // Si no hay voces, esperar al evento voiceschanged
        if (voces.length === 0) {
            speechSynthesis.onvoiceschanged = () => {
                voces = speechSynthesis.getVoices();
                console.log('🎙️ Voces disponibles para Luna:', voces.filter(v => v.lang.includes('es')).map(v => v.name));
            };
        } else {
            console.log('🎙️ Voces disponibles para Luna:', voces.filter(v => v.lang.includes('es')).map(v => v.name));
        }
    }
}

// Inicializar voces cuando se carga la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarVocesLuna);
} else {
    inicializarVocesLuna();
}

/**
 * ================================================
 * FUNCIONES DE UTILIDAD Y GUARDADO
 * ================================================
 */

/**
 * Mostrar notificación específica de actividad
 */
function mostrarNotificacionActividad(mensaje, tipo = 'info') {
    // Usar el sistema de notificaciones existente o crear uno simple
    if (typeof showNotification === 'function') {
        showNotification(mensaje, tipo);
    } else {
        // Notificación simple
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion-actividad ${tipo}`;
        notificacion.textContent = mensaje;
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        // Colores según tipo
        const colores = {
            info: 'background: linear-gradient(45deg, #3182ce, #4299e1);',
            success: 'background: linear-gradient(45deg, #38a169, #48bb78);',
            warning: 'background: linear-gradient(45deg, #d69e2e, #ecc94b);',
            error: 'background: linear-gradient(45deg, #e53e3e, #fc8181);'
        };
        
        notificacion.style.cssText += colores[tipo] || colores.info;
        
        document.body.appendChild(notificacion);
        
        // Animar entrada
        setTimeout(() => {
            notificacion.style.opacity = '1';
            notificacion.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notificacion.style.opacity = '0';
            notificacion.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 4000);
    }
}

// Exportar inmediatamente
if (typeof window !== 'undefined') {
    window.mostrarNotificacionActividad = mostrarNotificacionActividad;
}

/**
 * Completar actividad
 */
function completarActividad() {
    guardarDatosFaseActual();
    
    // Mostrar celebración final
    celebrarComplecionActividad();
    
    // No usar timeout automático, esperar a que el usuario haga clic
}

// Exportar inmediatamente para que esté disponible
if (typeof window !== 'undefined') {
    window.completarActividad = completarActividad;
}

/**
 * Celebrar compleción de actividad
 */
function celebrarComplecionActividad() {
    const actividad = ACTIVIDADES_CONFIG[ActividadState.actividadActual];
    
    // Crear overlay de celebración
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    overlay.innerHTML = `
        <div class="celebracion-final bg-white rounded-2xl p-8 text-center max-w-md mx-4" style="animation: aparecer 0.5s ease-out;">
            <h2 class="text-3xl font-bold text-primary mb-4">🎉 ¡Felicidades!</h2>
            <h3 class="text-xl font-bold text-gray-700 mb-4">Has completado:</h3>
            <h4 class="text-lg text-primary mb-6">${actividad.titulo}</h4>
            <div class="text-6xl mb-6">🏆</div>
            <p class="text-gray-600 mb-6">¡Has vivido una experiencia extraordinaria de crecimiento creativo!</p>
            <button id="continuar-viaje-btn" class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all">
                ✨ ¡Continuar mi Viaje!
            </button>
        </div>
        
        <style>
            @keyframes aparecer {
                from { transform: scale(0.5); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            @keyframes confettifall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        </style>
    `;
    
    document.body.appendChild(overlay);
    
    // Agregar event listener al botón
    const continuarBtn = overlay.querySelector('#continuar-viaje-btn');
    if (continuarBtn) {
        continuarBtn.addEventListener('click', () => {
            // Animación de salida
            overlay.style.transition = 'opacity 0.3s ease';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.remove();
                regresarAlMenuPrincipal();
            }, 300);
        });
    }
    
    // Crear efecto de confetti
    crearConfettiCelebracion();
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 100);
}

// Exportar inmediatamente
if (typeof window !== 'undefined') {
    window.celebrarComplecionActividad = celebrarComplecionActividad;
}

/**
 * Crear efecto de confetti para celebración
 */
function crearConfettiCelebracion() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#ff7675', '#fd79a8', '#fdcb6e'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * window.innerWidth}px;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10001;
                animation: confettifall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

/**
 * Regresar al menú principal
 */
function regresarAlMenuPrincipal(confirmar = false) {
    if (confirmar) {
        if (!confirm('¿Estás seguro de que quieres salir de la actividad? Tu progreso en esta fase no se guardará.')) {
            return;
        }
    }

    // Limpiar estado
    ActividadState.actividadActual = null;
    ActividadState.faseActual = 0;

    const selectionContainer = document.getElementById('activity-selection-container');
    const labContentContainer = document.getElementById('lab-content-container');

    if (selectionContainer && labContentContainer) {
        labContentContainer.style.display = 'none';
        labContentContainer.innerHTML = '';
        selectionContainer.style.display = 'block';
    } else if (typeof initializeLaboratorio === 'function') {
        // Si existe la función para mostrar el laboratorio normal
        initializeLaboratorio('actividad1');
    } else {
        // Recargar la página como fallback
        window.location.reload();
    }
}

// Exportar inmediatamente
if (typeof window !== 'undefined') {
    window.regresarAlMenuPrincipal = regresarAlMenuPrincipal;
}

/**
 * ================================================
 * FUNCIONES GLOBALES PARA HERRAMIENTAS CREATIVAS
 * ================================================
 */

/**
 * Limpiar canvas - Compatible con simulador avanzado y básico
 */
function limpiarCanvas() {
    // Intentar usar simulador avanzado primero
    if (window.SimuladorManchaAvanzado && window.SimuladorManchaAvanzado.limpiarCanvas) {
        window.SimuladorManchaAvanzado.limpiarCanvas();
        return;
    }
    
    // Fallback al canvas tradicional
    const canvas = document.getElementById('canvas-principal');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Opcional: rellenar con color de fondo
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        console.log('🧹 Canvas limpiado');
    }
}

/**
 * Guardar creación - Compatible con simulador avanzado y básico
 */
function guardarCreacion() {
    // Intentar usar simulador avanzado primero
    if (window.SimuladorManchaAvanzado && window.SimuladorManchaAvanzado.guardarCreacion) {
        window.SimuladorManchaAvanzado.guardarCreacion();
        return;
    }
    
    // Fallback al canvas tradicional
    const canvas = document.getElementById('canvas-principal');
    if (canvas) {
        try {
            // Crear enlace de descarga
            const enlace = document.createElement('a');
            enlace.download = `creacion-mancha-${Date.now()}.png`;
            enlace.href = canvas.toDataURL();
            
            // Simular click para descargar
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
            
            // Mostrar mensaje de confirmación
            mostrarNotificacion('💾 ¡Creación guardada exitosamente!', 'success');
            
            console.log('💾 Creación guardada');
        } catch (error) {
            console.error('Error guardando creación:', error);
            mostrarNotificacion('❌ Error al guardar la creación', 'error');
        }
    }
}

/**
 * Mostrar notificación temporal
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion-temporal fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        tipo === 'success' ? 'bg-green-500 text-white' :
        tipo === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
        notificacion.style.opacity = '1';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        notificacion.style.opacity = '0';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

// Funciones globales para compatibilidad
window.iniciarActividadInteractiva = iniciarActividadInteractiva;
window.mostrarFaseActividad = mostrarFaseActividad;
window.siguienteFaseActividad = siguienteFaseActividad;
window.anteriorFaseActividad = anteriorFaseActividad;
window.guardarDatosFaseActual = guardarDatosFaseActual;
window.generarManchaAleatoria = generarManchaAleatoria;
window.rotarMancha = rotarMancha;
window.ampliarDetalle = ampliarDetalle;
window.seleccionarEmocion = seleccionarEmocion;
window.seleccionarEmocionCreativa = seleccionarEmocionCreativa;
window.iniciarMeditacion = iniciarMeditacion;
window.saltarMeditacion = saltarMeditacion;
window.pausarMeditacion = pausarMeditacion;
window.reanudarMeditacion = reanudarMeditacion;
window.limpiarCanvas = limpiarCanvas;
window.guardarCreacion = guardarCreacion;
window.mostrarNotificacion = mostrarNotificacion;
window.activarHerramientaMancha = activarHerramientaMancha;
window.limpiarManchaPersonal = limpiarManchaPersonal;
window.guardarManchaPersonal = guardarManchaPersonal;
window.inicializarMiniSimulador = inicializarMiniSimulador;
window.configurarCanvasBasicoManchaPersonal = configurarCanvasBasicoManchaPersonal;
window.cambiarHerramientaMancha = cambiarHerramientaMancha;
window.cambiarColorMancha = cambiarColorMancha;
window.cambiarTamanoMancha = cambiarTamanoMancha;
window.mostrarControlesBasicosCompletos = mostrarControlesBasicosCompletos;
window.actualizarBotonHerramientaActiva = actualizarBotonHerramientaActiva;
window.guardarPersonaje = guardarPersonaje;
window.generarNombreAlReves = generarNombreAlReves;

window.ACTIVIDADES_CONFIG = ACTIVIDADES_CONFIG;
window.ActividadState = ActividadState;

/**
 * ================================================
 * FUNCIONES DE CONTROL DEL ESTUDIO PROFESIONAL
 * ================================================
 */

/**
 * Seleccionar herramienta avanzada
 */
function seleccionarHerramientaAvanzada(herramienta) {
    console.log(`🔧 Seleccionando herramienta: ${herramienta}`);
    
    // Remover selección anterior
    document.querySelectorAll('.herramienta-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-blue-400', 'bg-blue-200');
    });
    
    // Marcar herramienta actual
    event.currentTarget?.classList.add('ring-4', 'ring-blue-400', 'bg-blue-200');
    
    // Actualizar estado
    if (ActividadState.herramientasState) {
        ActividadState.herramientasState.herramientaActiva = herramienta;
    }
    
    if (ActividadState.sistemaPincelesAvanzado) {
        ActividadState.sistemaPincelesAvanzado.setTool(herramienta);
    }
    
    // Actualizar overlay
    actualizarInfoOverlay();
    actualizarVistaPrevia();
    
    // Actualizar cursor personalizado
    if (window.actualizarCursorPersonalizado) {
        window.actualizarCursorPersonalizado();
    }
    
    // Mostrar/ocultar parámetros según herramienta
    mostrarParametrosSegunHerramienta(herramienta);
}

/**
 * Seleccionar color
 */
function seleccionarColor(color) {
    console.log(`🎨 Seleccionando color: ${color}`);
    
    // Actualizar selector principal
    const selectorPrincipal = document.getElementById('color-principal');
    if (selectorPrincipal) {
        selectorPrincipal.value = color;
    }
    
    // Actualizar estado
    if (ActividadState.herramientasState) {
        ActividadState.herramientasState.color = color;
    }
    
    if (ActividadState.sistemaPincelesAvanzado) {
        ActividadState.sistemaPincelesAvanzado.setPrimaryColor(color);
    }
    
    // Agregar al historial
    agregarColorAlHistorial(color);
    
    // Actualizar vista previa
    actualizarVistaPrevia();
    actualizarInfoOverlay();
    
    // Actualizar cursor personalizado
    if (window.actualizarCursorPersonalizado) {
        window.actualizarCursorPersonalizado();
    }
}

/**
 * Agregar color al historial
 */
function agregarColorAlHistorial(color) {
    const historial = document.getElementById('historial-colores');
    if (!historial) return;
    
    // Evitar duplicados
    const existente = historial.querySelector(`[data-color="${color}"]`);
    if (existente) return;
    
    // Crear botón de color
    const botonColor = document.createElement('button');
    botonColor.className = 'w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform';
    botonColor.style.backgroundColor = color;
    botonColor.dataset.color = color;
    botonColor.onclick = () => seleccionarColor(color);
    
    // Agregar al inicio
    historial.insertBefore(botonColor, historial.firstChild);
    
    // Limitar a 8 colores
    while (historial.children.length > 8) {
        historial.removeChild(historial.lastChild);
    }
}

/**
 * Deshacer acción
 */
function deshacerAccion() {
    console.log('↶ Deshaciendo acción...');
    
    if (ActividadState.sistemaPincelesAvanzado && ActividadState.sistemaPincelesAvanzado.undo) {
        ActividadState.sistemaPincelesAvanzado.undo();
    } else {
        // Fallback básico
        console.log('Deshacer no disponible en modo básico');
        mostrarNotificacion('Deshacer no disponible en modo básico', 'warning');
    }
}

/**
 * Rehacer acción
 */
function rehacerAccion() {
    console.log('↷ Rehaciendo acción...');
    
    if (ActividadState.sistemaPincelesAvanzado && ActividadState.sistemaPincelesAvanzado.redo) {
        ActividadState.sistemaPincelesAvanzado.redo();
    } else {
        // Fallback básico
        console.log('Rehacer no disponible en modo básico');
        mostrarNotificacion('Rehacer no disponible en modo básico', 'warning');
    }
}

/**
 * Exportar como imagen
 */
function exportarComoImagen() {
    console.log('📸 Exportando imagen...');
    
    const canvas = document.getElementById('canvas-mancha-personal');
    if (!canvas) return;
    
    try {
        // Crear enlace de descarga
        const enlace = document.createElement('a');
        enlace.download = `obra-arte-${new Date().getTime()}.png`;
        enlace.href = canvas.toDataURL();
        
        // Descargar
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        
        mostrarNotificacion('¡Obra exportada exitosamente!', 'success');
        
    } catch (error) {
        console.error('Error exportando:', error);
        mostrarNotificacion('Error al exportar la obra', 'error');
    }
}

/**
 * Actualizar parámetro de herramienta
 */
function actualizarParametroHerramienta(parametro, valor) {
    if (!ActividadState.herramientasState) return;
    
    ActividadState.herramientasState[parametro] = valor;
    
    // Actualizar también el estado global de herramientas
    if (window.EstadoHerramientas) {
        window.EstadoHerramientas[parametro] = valor;
        console.log(`🔧 Parámetro actualizado: ${parametro} = ${valor}`);
    }
    
    if (ActividadState.sistemaPincelesAvanzado) {
        switch (parametro) {
            case 'tamano':
                ActividadState.sistemaPincelesAvanzado.setSize(valor);
                break;
            case 'opacidad':
                ActividadState.sistemaPincelesAvanzado.setOpacity(valor);
                break;
            case 'dureza':
                ActividadState.sistemaPincelesAvanzado.setHardness(valor);
                break;
        }
    }
}

/**
 * Actualizar vista previa del pincel
 */
function actualizarVistaPrevia() {
    const canvas = document.getElementById('preview-pincel');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Obtener parámetros actuales
    const state = ActividadState.herramientasState || {};
    const tamano = state.tamano || 12;
    const color = state.color || '#8B5CF6';
    const opacidad = state.opacidad || 0.8;
    
    // Dibujar vista previa
    ctx.globalAlpha = opacidad;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, tamano / 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1;
}

/**
 * Actualizar información del overlay
 */
function actualizarInfoOverlay() {
    const toolName = document.getElementById('current-tool-name');
    const brushSize = document.getElementById('current-brush-size');
    const opacity = document.getElementById('current-opacity');
    
    if (!toolName || !brushSize || !opacity) return;
    
    const state = ActividadState.herramientasState || {};
    
    // Nombres de herramientas
    const nombres = {
        'pincel-solido': 'Pincel Sólido',
        'aerografo': 'Aerógrafo',
        'textura': 'Textura',
        'caligrafia': 'Caligrafía',
        'difumino': 'Difumino',
        'acuarela': 'Acuarela',
        'relleno': 'Bote de Pintura',
        'gradiente-lineal': 'Gradiente Lineal',
        'gradiente-radial': 'Gradiente Radial',
        'borrador': 'Borrador'
    };
    
    toolName.textContent = nombres[state.herramientaActiva] || 'Pincel';
    brushSize.textContent = `${state.tamano || 12}px`;
    opacity.textContent = `${Math.round((state.opacidad || 0.8) * 100)}%`;
}

/**
 * Mostrar parámetros según herramienta
 */
function mostrarParametrosSegunHerramienta(herramienta) {
    const durezaContainer = document.getElementById('dureza-container');
    
    // La dureza solo se aplica a ciertos pinceles
    const herramientasConDureza = ['pincel-solido', 'aerografo', 'textura'];
    
    if (durezaContainer) {
        if (herramientasConDureza.includes(herramienta)) {
            durezaContainer.style.display = 'block';
        } else {
            durezaContainer.style.display = 'none';
        }
    }
}

/**
 * Mostrar controles básicos funcionales
 */
function mostrarControlesBasicosCompletos() {
    const controlesContainer = document.getElementById('controles-basicos-fallback');
    if (!controlesContainer) return;
    
    controlesContainer.style.display = 'block';
    controlesContainer.innerHTML = `
        <h5 class="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span class="text-lg">🛠️</span> Herramientas de Dibujo FUNCIONALES
        </h5>
        
        <!-- Herramientas principales -->
        <div class="herramientas-grid grid grid-cols-4 gap-2 mb-4">
            <button id="btn-pincel" class="herramienta-btn active" onclick="cambiarHerramientaMancha('pincel')" title="Pincel básico">
                <span class="text-lg">🖌️</span>
                <span class="text-xs block">Pincel</span>
            </button>
            <button id="btn-agua" class="herramienta-btn" onclick="cambiarHerramientaMancha('agua')" title="Efecto de agua">
                <span class="text-lg">💧</span>
                <span class="text-xs block">Agua</span>
            </button>
            <button id="btn-esponja" class="herramienta-btn" onclick="cambiarHerramientaMancha('esponja')" title="Textura esponja">
                <span class="text-lg">🧽</span>
                <span class="text-xs block">Esponja</span>
            </button>
            <button id="btn-goteo" class="herramienta-btn" onclick="cambiarHerramientaMancha('goteo')" title="Efecto goteo">
                <span class="text-lg">🌧️</span>
                <span class="text-xs block">Goteo</span>
            </button>
        </div>
        
        <!-- Controles de parámetros -->
        <div class="parametros grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                    🎨 Color:
                </label>
                <input type="color" id="color-mancha-personal" value="#8B5CF6" 
                       onchange="cambiarColorMancha(this.value)"
                       class="w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                    📏 Tamaño: <span id="tamano-mancha-display">12</span>px
                </label>
                <input type="range" id="tamano-mancha-personal" min="2" max="40" value="12" 
                       oninput="cambiarTamanoMancha(this.value); document.getElementById('tamano-mancha-display').textContent = this.value"
                       class="w-full">
            </div>
        </div>
        
        <!-- Estado actual -->
        <div class="estado-actual bg-blue-50 p-3 rounded-lg">
            <p class="text-sm text-blue-700">
                <span class="font-bold">Herramienta activa:</span> <span id="herramienta-actual-display">Pincel</span>
            </p>
            <p class="text-xs text-blue-600 mt-1">💡 Haz clic y arrastra sobre el lienzo para dibujar</p>
        </div>
    `;
    
    // Agregar estilos para los botones
    if (!document.getElementById('estilos-herramientas-basicas')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-herramientas-basicas';
        estilos.textContent = `
            .herramienta-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 12px 8px;
                border: 2px solid #d1d5db;
                border-radius: 8px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                min-height: 60px;
            }
            
            .herramienta-btn:hover {
                border-color: #8B5CF6;
                background: #f3f4f6;
                transform: translateY(-1px);
            }
            
            .herramienta-btn.active {
                border-color: #8B5CF6;
                background: #e0e7ff;
                box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
            }
            
            .herramienta-btn.active span {
                color: #7c3aed;
            }
        `;
        document.head.appendChild(estilos);
    }
}

/**
 * Actualizar botón de herramienta activa
 */
function actualizarBotonHerramientaActiva(herramienta) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.herramienta-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase active al botón seleccionado
    const btnActivo = document.getElementById(`btn-${herramienta}`);
    if (btnActivo) {
        btnActivo.classList.add('active');
    }
    
    // Actualizar display del estado
    const displayHerramienta = document.getElementById('herramienta-actual-display');
    if (displayHerramienta) {
        const nombres = {
            'pincel': 'Pincel',
            'agua': 'Efecto Agua',
            'esponja': 'Textura Esponja', 
            'goteo': 'Efecto Goteo'
        };
        displayHerramienta.textContent = nombres[herramienta] || herramienta;
    }
}

/**
 * ================================================
 * FUNCIONES ADICIONALES PARA HERRAMIENTAS ESPECÍFICAS
 * ================================================
 */

/**
 * Generar palabra de inspiración
 */
function generarPalabraInspiracion(categoria) {
    const palabras = {
        sensorial: ['suave', 'áspero', 'cálido', 'fresco', 'húmedo', 'seco', 'rugoso', 'sedoso', 'pegajoso', 'esponjoso'],
        emocional: ['nostalgia', 'alegría', 'melancolía', 'esperanza', 'serenidad', 'euforia', 'ternura', 'asombro', 'gratitud', 'libertad'],
        visual: ['dorado', 'azul profundo', 'verde esmeralda', 'rosa suave', 'púrpura intenso', 'círculos', 'líneas curvas', 'texturas', 'sombras', 'brillos'],
        sonoro: ['susurro', 'eco', 'murmullo', 'tintineo', 'crujido', 'melodía', 'silencio', 'resonancia', 'armonía', 'vibración']
    };
    
    const listaPalabras = palabras[categoria] || palabras.emocional;
    const palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    
    const palabraDiv = document.getElementById('palabra-inspiracion');
    const palabraGenerada = document.getElementById('palabra-generada');
    
    if (palabraDiv && palabraGenerada) {
        palabraGenerada.textContent = palabra;
        palabraDiv.classList.remove('hidden');
        
        // Efecto de aparición
        palabraDiv.style.opacity = '0';
        setTimeout(() => {
            palabraDiv.style.opacity = '1';
        }, 100);
    }
    
    mostrarNotificacionActividad(`✨ Palabra de inspiración: "${palabra}"`, 'info');
}

/**
 * Activar herramienta especial
 */
function activarHerramientaEspecial(herramienta) {
    if (!ActividadState.canvas || !ActividadState.ctx) return;
    
    const ctx = ActividadState.ctx;
    
    switch (herramienta) {
        case 'generador-manchas':
            generarManchaAleatoria();
            break;
        case 'pincel-magico':
            aplicarEfectoMagico();
            break;
        case 'paleta-emociones':
            mostrarPaletaEmociones();
            break;
        case 'transformador-lineas':
            activarTransformadorLineas();
            break;
        case 'pincel-memoria':
            aplicarEfectoMemoria();
            break;
        case 'texturizador':
            activarTexturizador();
            break;
        default:
            mostrarNotificacionActividad(`Herramienta ${herramienta} activada`, 'info');
    }
}

/**
 * Aplicar efecto mágico al pincel
 */
function aplicarEfectoMagico() {
    if (!ActividadState.ctx) return;
    
    // Cambiar a colores que cambian automáticamente
    ActividadState.modoActual = 'magico';
    
    const coloresMagicos = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb', '#f5d76e', '#c44569'];
    let colorIndex = 0;
    
    // Cambiar color cada 500ms
    const intervalColor = setInterval(() => {
        if (ActividadState.modoActual === 'magico') {
            ActividadState.ctx.strokeStyle = coloresMagicos[colorIndex];
            colorIndex = (colorIndex + 1) % coloresMagicos.length;
        } else {
            clearInterval(intervalColor);
        }
    }, 500);
    
    mostrarNotificacionActividad('🎨 ¡Pincel mágico activado! Los colores cambiarán automáticamente', 'info');
}

/**
 * Mostrar paleta de emociones
 */
function mostrarPaletaEmociones() {
    const coloresEmociones = {
        '😊 Alegría': '#ffeb3b',
        '💙 Calma': '#2196f3',
        '💚 Esperanza': '#4caf50',
        '💜 Misterio': '#9c27b0',
        '🧡 Energía': '#ff9800',
        '❤️ Pasión': '#f44336'
    };
    
    let html = '<div class="paleta-emociones grid grid-cols-3 gap-2">';
    
    Object.entries(coloresEmociones).forEach(([emocion, color]) => {
        html += `
            <button class="color-emocion p-3 rounded-lg text-center transition-all hover:scale-105" 
                    style="background-color: ${color}; color: ${color === '#ffeb3b' ? '#333' : 'white'};"
                    onclick="window.seleccionarColorEmocion('${color}', '${emocion}')">
                ${emocion}
            </button>
        `;
    });
    
    html += '</div>';
    
    mostrarModalTemporal('🌈 Paleta de Emociones', html);
}

/**
 * Seleccionar color de emoción
 */
function seleccionarColorEmocion(color, emocion) {
    if (ActividadState.ctx) {
        ActividadState.ctx.strokeStyle = color;
        ActividadState.colorActual = color;
        
        // Actualizar selector de color si existe
        const selectorColor = document.getElementById('selector-color');
        if (selectorColor) {
            selectorColor.value = color;
        }
    }
    
    mostrarNotificacionActividad(`💖 Color de emoción seleccionado: ${emocion}`, 'success');
    cerrarModalTemporal();
}

/**
 * Activar transformador de líneas
 */
function activarTransformadorLineas() {
    ActividadState.modoActual = 'transformador';
    
    if (ActividadState.ctx) {
        // Aplicar efecto de líneas onduladas
        ActividadState.ctx.lineWidth = 3;
        ActividadState.ctx.shadowBlur = 5;
        ActividadState.ctx.shadowColor = ActividadState.colorActual;
    }
    
    mostrarNotificacionActividad('⚡ Transformador de líneas activado! Tus trazos tendrán efectos especiales', 'info');
}

/**
 * Aplicar efecto memoria
 */
function aplicarEfectoMemoria() {
    if (ActividadState.ctx) {
        ActividadState.ctx.globalAlpha = 0.7;
        ActividadState.ctx.shadowBlur = 10;
        ActividadState.ctx.shadowColor = '#666';
    }
    
    mostrarNotificacionActividad('💭 Pincel de memoria activado - Trazos suaves como recuerdos', 'info');
}

/**
 * Activar texturizador
 */
function activarTexturizador() {
    ActividadState.modoActual = 'texturizado';
    
    mostrarNotificacionActividad('🌀 Texturizador activado - Cada trazo tendrá textura única', 'info');
}

/**
 * Limpiar canvas (respetando restricciones)
 */
/**
 * Nueva creación
 */
function nuevaCreacion() {
    if (ActividadState.actividadActual === 'actividad2') {
        mostrarNotificacionActividad('🚫 En esta actividad solo puedes tener una creación - ¡sin borrar!', 'warning');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres comenzar una nueva creación? Se perderá el trabajo actual.')) {
        limpiarCanvas();
        mostrarNotificacionActividad('🎨 ¡Lista para una nueva creación!', 'success');
    }
}

/**
 * Guardar estado del canvas
 */
function guardarEstadoCanvas() {
    if (ActividadState.canvas && ActividadState.actividadActual) {
        const imageData = ActividadState.canvas.toDataURL();
        
        if (!ActividadState.dibujos[ActividadState.actividadActual]) {
            ActividadState.dibujos[ActividadState.actividadActual] = {};
        }
        
        ActividadState.dibujos[ActividadState.actividadActual][ActividadState.faseActual] = imageData;
    }
}

/**
 * Celebrar logro
 */
function celebrarLogro() {
    console.log('🎊 celebrarLogro ejecutada');
    
    // Crear efectos de celebración
    crearEfectoCelebracion();
    
    const mensajes = [
        '🎉 ¡Increíble trabajo creativo!',
        '✨ ¡Has logrado algo extraordinario!',
        '🌟 ¡Tu creatividad no tiene límites!',
        '🎨 ¡Eres un verdadero artista del error creativo!',
        '💫 ¡Has transformado errores en oportunidades!'
    ];
    
    const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
    console.log('📢 Mostrando mensaje:', mensaje);
    
    if (typeof window.mostrarNotificacionActividad === 'function') {
        window.mostrarNotificacionActividad(mensaje, 'success');
    } else if (typeof mostrarNotificacionActividad === 'function') {
        mostrarNotificacionActividad(mensaje, 'success');
    } else {
        console.warn('⚠️ mostrarNotificacionActividad no disponible');
        alert(mensaje);
    }
}

// Exportar inmediatamente para que esté disponible
if (typeof window !== 'undefined') {
    window.celebrarLogro = celebrarLogro;
}

/**
 * Crear efecto de celebración visual
 */
function crearEfectoCelebracion() {
    // Crear confeti animado
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confeti = document.createElement('div');
            confeti.textContent = ['🎉', '✨', '🌟', '💫', '🎊'][Math.floor(Math.random() * 5)];
            confeti.style.cssText = `
                position: fixed;
                font-size: 2em;
                top: ${Math.random() * 20}%;
                left: ${Math.random() * 100}%;
                z-index: 10000;
                pointer-events: none;
                animation: confeti-fall 3s ease-out forwards;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes confeti-fall {
                    from { 
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    to { 
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            
            if (!document.querySelector('style[data-confeti]')) {
                style.setAttribute('data-confeti', 'true');
                document.head.appendChild(style);
            }
            
            document.body.appendChild(confeti);
            
            setTimeout(() => {
                if (confeti.parentNode) {
                    confeti.parentNode.removeChild(confeti);
                }
            }, 3000);
        }, i * 100);
    }
}

/**
 * Mostrar modal temporal
 */
function mostrarModalTemporal(titulo, contenido) {
    const modal = document.createElement('div');
    modal.id = 'modal-temporal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-800">${titulo}</h3>
                <button onclick="cerrarModalTemporal()" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div class="modal-content">
                ${contenido}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar con click en el fondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModalTemporal();
        }
    });
}

/**
 * Cerrar modal temporal
 */
function cerrarModalTemporal() {
    const modal = document.getElementById('modal-temporal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Revisar viaje completo
 */
function revisarViaje() {
    let contenidoRevision = `
        <div class="viaje-completo space-y-6">
            <h4 class="text-lg font-bold text-center mb-4">📚 Tu Viaje Completo del Error Creativo</h4>
    `;
    
    Object.entries(ACTIVIDADES_CONFIG).forEach(([id, actividad]) => {
        const completada = ActividadState.dibujos[id] ? '✅' : '📝';
        contenidoRevision += `
            <div class="actividad-resumen bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
                <h5 class="font-bold text-blue-700">${completada} ${actividad.titulo}</h5>
                <p class="text-sm text-gray-600">${actividad.descripcion}</p>
            </div>
        `;
    });
    
    contenidoRevision += `
            <div class="mensaje-final bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border-2 border-green-300 text-center">
                <p class="text-green-700 font-medium">¡Has completado un viaje extraordinario de transformación creativa!</p>
            </div>
        </div>
    `;
    
    mostrarModalTemporal('📖 Revisión de tu Viaje', contenidoRevision);
}

/**
 * Nueva aventura
 */
function nuevaAventura() {
    if (confirm('¿Estás seguro de que quieres comenzar una nueva aventura? Se reiniciará todo el progreso.')) {
        // Limpiar estado
        ActividadState.actividadActual = null;
        ActividadState.faseActual = 0;
        ActividadState.dibujos = {};
        ActividadState.reflexiones = {};
        ActividadState.emociones = {};
        
        // Regresar al selector de actividades
        if (typeof initializeLaboratorio === 'function') {
            initializeLaboratorio('actividad1');
        }
        
        mostrarNotificacionActividad('🔄 ¡Nueva aventura iniciada! ¡Que comience la magia!', 'success');
    }
}

/**
 * Compartir experiencia
 */
function compartirExperiencia() {
    const mensaje = `¡He completado el viaje del Error Creativo! 🎨✨
    
Una experiencia pedagógica increíble donde aprendí que los "errores" son oportunidades de crear algo único y hermoso.

#ErrorCreativo #Creatividad #Aprendizaje #Arte`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mi Viaje del Error Creativo',
            text: mensaje
        });
    } else {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(mensaje).then(() => {
            mostrarNotificacionActividad('📋 ¡Mensaje copiado al portapapeles!', 'success');
        });
    }
}

/**
 * Funciones auxiliares para fase corporal
 */
function iniciarEjercicioCorporal(index, nombre, duracion) {
    const timerArea = document.getElementById(`timer-${index}`);
    const countdown = document.getElementById(`countdown-${index}`);
    const status = document.getElementById(`status-${index}`);
    
    if (!timerArea || !countdown || !status) return;
    
    timerArea.classList.remove('hidden');
    
    // Convertir duración a segundos
    const segundos = convertirDuracionASegundos(duracion);
    let tiempoRestante = segundos;
    let timer;
    
    // Agregar botón de salida
    const salirBtn = document.createElement('button');
    salirBtn.className = 'ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm';
    salirBtn.textContent = '❌ Salir';
    salirBtn.onclick = () => {
        clearInterval(timer);
        timerArea.classList.add('hidden');
        status.textContent = '';
        countdown.textContent = '';
        salirBtn.remove();
    };
    
    status.textContent = `💃 Realizando: ${nombre} `;
    status.appendChild(salirBtn);
    
    timer = setInterval(() => {
        countdown.textContent = `⏱️ ${tiempoRestante}s`;
        
        if (tiempoRestante <= 0) {
            clearInterval(timer);
            status.textContent = '✨ ¡Ejercicio completado! ¿Cómo te sientes?';
            countdown.textContent = '✓ Listo';
            salirBtn.remove();
        }
        
        tiempoRestante--;
    }, 1000);
}

function convertirDuracionASegundos(duracion) {
    if (duracion.includes('minuto')) {
        const minutos = parseInt(duracion);
        return minutos * 60;
    } else if (duracion.includes('segundo')) {
        return parseInt(duracion) || 10;
    } else {
        return parseInt(duracion) || 10;
    }
}

function hacerConDemo(index, nombre) {
    const ejercicios = [
        {
            nombre: "Mancha que Crece",
            descripcion: "Comienza pequeño y crece gradualmente",
            animacion: "crecer"
        },
        {
            nombre: "Mancha que se Derrite",
            descripcion: "Movimiento fluido hacia abajo",
            animacion: "derretir"
        },
        {
            nombre: "Mancha que Baila",
            descripcion: "Movimientos alegres y saltarines",
            animacion: "bailar"
        },
        {
            nombre: "Transformación Mágica",
            descripcion: "Cambios de forma constantes",
            animacion: "transformar"
        }
    ];
    
    const ejercicio = ejercicios[index] || ejercicios[0];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.id = 'modal-ejercicio-' + index; // ID único para este modal
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-lg mx-4">
            <h3 class="text-xl font-bold mb-4">🎯 ${ejercicio.nombre} - ¡Hazlo mientras miras!</h3>
            <p class="text-gray-600 mb-6">${ejercicio.descripcion}</p>
            
            <!-- Canvas para la animación -->
            <div class="demo-container bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                <canvas id="demo-canvas" width="300" height="200" class="border-2 border-dashed border-purple-300 rounded-lg bg-white mx-auto block"></canvas>
                <div class="text-center mt-4">
                    <div id="contador-tiempo" class="text-lg font-bold text-purple-700 mb-2">⏱️ 10s</div>
                    <button id="play-demo" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                        ▶️ Comenzar Demo y Ejercicio (10s)
                    </button>
                </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-bold text-blue-700 mb-2">💡 Instrucciones:</h4>
                <p class="text-blue-600 text-sm">Cuando presiones "Comenzar", el demo se ejecutará automáticamente. ¡Observa los movimientos de la manchita e imítalos con tu cuerpo durante los 10 segundos! Al terminar, regresarás automáticamente a los ejercicios.</p>
            </div>
            
            <div class="flex gap-3">
                <button onclick="cerrarModalEjercicio(${index})" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                    ❌ Cerrar
                </button>
                <button id="salir-rapido" onclick="cerrarModalEjercicio(${index})" class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" style="display: none;">
                    🚪 Salir del Ejercicio
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Inicializar la animación
    setTimeout(() => {
        iniciarAnimacionDemoLenta(ejercicio.animacion, index);
    }, 100);
}

function cerrarModalEjercicio(index) {
    // Detener cualquier animación activa
    const modal = document.getElementById('modal-ejercicio-' + index);
    if (modal) {
        modal.remove();
        console.log('Modal de ejercicio cerrado manualmente');
    } else {
        // Buscar y cerrar cualquier modal abierto
        const modales = document.querySelectorAll('.fixed.inset-0');
        modales.forEach(modal => modal.remove());
        console.log('Todos los modales cerrados');
    }
}

function iniciarAnimacionDemoLenta(tipo, index) {
    const ejercicios = [
        {
            nombre: "Mancha que Crece",
            descripcion: "Comienza pequeño y crece gradualmente",
            animacion: "crecer"
        },
        {
            nombre: "Mancha que se Derrite",
            descripcion: "Movimiento fluido hacia abajo",
            animacion: "derretir"
        },
        {
            nombre: "Mancha que Baila",
            descripcion: "Movimientos alegres y saltarines",
            animacion: "bailar"
        },
        {
            nombre: "Transformación Mágica",
            descripcion: "Cambios de forma constantes",
            animacion: "transformar"
        }
    ];
    
    const ejercicio = ejercicios[index] || ejercicios[0];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-lg mx-4">
            <h3 class="text-xl font-bold mb-4">🎥 Demostración: ${ejercicio.nombre}</h3>
            <p class="text-gray-600 mb-6">${ejercicio.descripcion}</p>
            
            <!-- Canvas para la animación -->
            <div class="demo-container bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                <canvas id="demo-canvas" width="300" height="200" class="border-2 border-dashed border-purple-300 rounded-lg bg-white mx-auto block"></canvas>
                <div class="text-center mt-4">
                    <div id="contador-tiempo" class="text-lg font-bold text-purple-700 mb-2">⏱️ 10s</div>
                    <button id="play-demo" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2">
                        ▶️ Reproducir Demo (10s)
                    </button>
                    <button id="pause-demo" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg" disabled>
                        ⏸️ Pausar
                    </button>
                </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-bold text-blue-700 mb-2">💡 Instrucciones para ti:</h4>
                <p class="text-blue-600 text-sm">Observa cómo se mueve la manchita y luego imita estos movimientos con tu cuerpo. ¡Deja que tu creatividad fluya!</p>
            </div>
            
            <div class="flex gap-3">
                <button onclick="cerrarModal(this)" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                    Cerrar
                </button>
                <button onclick="cerrarModal(this); iniciarEjercicioCorporal(${index}, '${ejercicio.nombre}', '10 segundos')" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    🚀 ¡Hacer Ejercicio! (10s)
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Inicializar la animación
    setTimeout(() => {
        iniciarAnimacionDemo(ejercicio.animacion, index);
    }, 100);
}

function completarEjercicio(index) {
    const timerArea = document.getElementById(`timer-${index}`);
    if (timerArea) {
        timerArea.innerHTML = `
            <div class="text-2xl text-green-600 font-bold">✓ ¡Completado!</div>
            <p class="text-green-700">Excelente trabajo explorando el movimiento</p>
        `;
    }
}

function guardarReflexionCorporal() {
    const reflexiones = [];
    document.querySelectorAll('[id^="reflexion-"]').forEach((textarea, index) => {
        if (textarea.value.trim()) {
            reflexiones.push(textarea.value.trim());
        }
    });
    
    ActividadState.reflexiones.corporal = reflexiones;
    
    // Mostrar confirmación
    mostrarNotificacionActividad('✓ Reflexiones corporales guardadas', 'success');
}

/**
 * Función para copiar mancha al canvas principal
 */
function copiarManchaAlCanvas() {
    const manchaCanvas = document.getElementById('mancha-anterior');
    const canvasPrincipal = document.getElementById('canvas-principal');
    
    if (manchaCanvas && canvasPrincipal && ActividadState.dibujos.manchaGenerada) {
        const ctx = canvasPrincipal.getContext('2d');
        
        // Copiar la mancha al canvas principal con transparencia
        ctx.globalAlpha = 0.3;
        ctx.drawImage(manchaCanvas, 50, 50, 200, 150);
        ctx.globalAlpha = 1.0;
        
        // Mostrar mensaje de éxito
        mostrarNotificacionActividad('🎨 Mancha copiada como guía', 'info');
    } else {
        mostrarNotificacionActividad('⚠️ Primero crea una mancha en la fase anterior', 'warning');
    }
}

/**
 * Configurar fase corporal
 */
function configurarFaseCorporal() {
    // Configuración específica para ejercicios corporales
    console.log('🕺 Fase corporal configurada - Ejercicios de movimiento listos');
}

/**
 * Cargar mancha anterior en el canvas de referencia
 */
function cargarManchaAnterior() {
    const manchaCanvas = document.getElementById('mancha-anterior');
    if (manchaCanvas) {
        const ctx = manchaCanvas.getContext('2d');
        
        // Verificar si hay una mancha personal creada por el usuario
        const manchaPersonal = localStorage.getItem('mancha-personal-creada');
        
        if (manchaPersonal) {
            // Cargar la mancha que el usuario creó con sus propias manos
            const img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, manchaCanvas.width, manchaCanvas.height);
                ctx.drawImage(img, 0, 0, manchaCanvas.width, manchaCanvas.height);
                
                console.log('✨ Mancha personal cargada exitosamente');
                
                // Mostrar mensaje positivo
                const mensajeContainer = manchaCanvas.parentNode.querySelector('.mensaje-mancha-personal');
                if (mensajeContainer) {
                    mensajeContainer.innerHTML = `
                        <div class="bg-green-100 text-green-800 p-2 rounded-lg text-sm">
                            ✨ ¡Esta es la mancha que creaste con tus propias manos!
                        </div>
                    `;
                }
            };
            img.onerror = function() {
                console.warn('Error cargando mancha personal, usando ejemplo');
                mostrarMensajeCrearMancha(ctx, manchaCanvas);
            };
            img.src = manchaPersonal;
        } else {
            // Si no hay mancha personal, mostrar mensaje para crearla
            mostrarMensajeCrearMancha(ctx, manchaCanvas);
        }
    }
}

/**
 * Mostrar mensaje animando al usuario a crear su mancha
 */
function mostrarMensajeCrearMancha(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fondo suave
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Texto central
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('¡Ve a crear tu mancha!', canvas.width/2, canvas.height/2 - 10);
    ctx.font = '12px Arial';
    ctx.fillText('Usa herramientas reales:', canvas.width/2, canvas.height/2 + 10);
    ctx.fillText('🖌️ Pinceles  💧 Agua  🧽 Esponja', canvas.width/2, canvas.height/2 + 30);
    
    // Agregar mensaje visual en el container
    const mensajeContainer = canvas.parentNode.querySelector('.mensaje-mancha-personal') || 
                            document.createElement('div');
    mensajeContainer.className = 'mensaje-mancha-personal mt-2';
    mensajeContainer.innerHTML = `
        <div class="bg-blue-100 text-blue-800 p-2 rounded-lg text-sm">
            💡 Primero ve al "Generador de Manchas" y crea tu propia mancha con herramientas realistas
        </div>
    `;
    
    if (!canvas.parentNode.querySelector('.mensaje-mancha-personal')) {
        canvas.parentNode.appendChild(mensajeContainer);
    }
}

/**
 * Generar mancha de ejemplo si no hay una guardada
 */
function generarManchaEjemplo(ctx, canvas) {
    const colores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Crear formas aleatorias que simulen una mancha
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const x = Math.random() * (canvas.width - 60) + 30;
        const y = Math.random() * (canvas.height - 60) + 30;
        const radius = Math.random() * 30 + 20;
        
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colores[Math.floor(Math.random() * colores.length)] + '80';
        ctx.fill();
    }
    
    // Agregar efectos de goteo para simular pintura
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 10);
    ctx.quadraticCurveTo(canvas.width/2 + 10, canvas.height/2, canvas.width/2 - 5, canvas.height - 10);
    ctx.strokeStyle = colores[0] + '60';
    ctx.lineWidth = 8;
    ctx.stroke();
}

/**
 * Función universal para cerrar modales
 */
function cerrarModal(elemento) {
    if (elemento && elemento.parentElement && elemento.parentElement.parentElement) {
        elemento.parentElement.parentElement.remove();
    } else if (elemento && elemento.remove) {
        elemento.remove();
    }
}

/**
 * Animar manchita en el demo
 */
function iniciarAnimacionDemoLenta(tipo, index) {
    const canvas = document.getElementById('demo-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animacionActiva = false;
    let frameCount = 0;
    let tiempoInicio = 0;
    const DURACION_TOTAL = 10000; // 10 segundos en milisegundos
    
    // Propiedades de la manchita
    let mancha = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radio: 20,
        color: '#8b5cf6',
        forma: 'circulo'
    };
    
    // Configurar controles
    const playBtn = document.getElementById('play-demo');
    
    function dibujarManchita() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar manchita base
        ctx.fillStyle = mancha.color;
        ctx.beginPath();
        
        switch (mancha.forma) {
            case 'circulo':
                ctx.arc(mancha.x, mancha.y, mancha.radio, 0, Math.PI * 2);
                break;
            case 'oval':
                ctx.ellipse(mancha.x, mancha.y, mancha.radio, mancha.radio * 0.6, 0, 0, Math.PI * 2);
                break;
            case 'gota':
                ctx.arc(mancha.x, mancha.y + 10, mancha.radio * 0.8, 0, Math.PI * 2);
                ctx.arc(mancha.x, mancha.y - 5, mancha.radio * 0.5, 0, Math.PI * 2);
                break;
        }
        ctx.fill();
        
        // Dibujar ojitos
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(mancha.x - 8, mancha.y - 5, 4, 0, Math.PI * 2);
        ctx.arc(mancha.x + 8, mancha.y - 5, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupilas
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(mancha.x - 8, mancha.y - 5, 2, 0, Math.PI * 2);
        ctx.arc(mancha.x + 8, mancha.y - 5, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Sonrisa
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mancha.x, mancha.y + 5, 8, 0, Math.PI);
        ctx.stroke();
    }
    
    function animarSegunTipo() {
        if (!animacionActiva) return;
        
        const tiempoActual = Date.now();
        const tiempoTranscurrido = tiempoActual - tiempoInicio;
        const progreso = Math.min(tiempoTranscurrido / DURACION_TOTAL, 1);
        
        // Actualizar contador visual
        const contadorElemento = document.getElementById('contador-tiempo');
        if (contadorElemento) {
            const segundosRestantes = Math.ceil((DURACION_TOTAL - tiempoTranscurrido) / 1000);
            contadorElemento.textContent = `⏱️ ${Math.max(0, segundosRestantes)}s`;
        }
        
        // Detener animación después de 10 segundos
        if (tiempoTranscurrido >= DURACION_TOTAL) {
            animacionActiva = false;
            playBtn.disabled = false;
            
            // Mostrar mensaje de finalización
            if (contadorElemento) {
                contadorElemento.textContent = '✅ ¡Completado! Cerrando en 2s...';
            }
            
            // Cambiar texto del botón
            playBtn.textContent = '🎉 ¡Excelente trabajo!';
            
            // Ocultar botón de salir rápido
            const salirRapidoBtn = document.getElementById('salir-rapido');
            if (salirRapidoBtn) {
                salirRapidoBtn.style.display = 'none';
            }
            
            // Resetear posición inicial
            mancha.x = canvas.width / 2;
            mancha.y = canvas.height / 2;
            mancha.radio = 20;
            mancha.color = '#8b5cf6';
            mancha.forma = 'circulo';
            dibujarManchita();
            
            // Cerrar automáticamente el modal después de 2 segundos
            setTimeout(() => {
                // Buscar el modal específico por ID
                let modal = document.getElementById('modal-ejercicio-' + index);
                if (!modal) {
                    // Buscar por selector de clase como respaldo
                    modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
                }
                if (!modal) {
                    // Buscar cualquier modal abierto
                    modal = document.querySelector('[id^="modal-ejercicio-"]');
                }
                
                if (modal) {
                    modal.remove();
                    console.log('Modal cerrado automáticamente');
                } else {
                    console.log('No se pudo encontrar el modal para cerrar');
                    // Forzar eliminación de todos los modales como último recurso
                    document.querySelectorAll('.fixed.inset-0').forEach(el => el.remove());
                }
            }, 2000);
            
            return;
        }
        
        frameCount++;
        
        // Movimientos más lentos - reduciendo velocidades significativamente
        switch (tipo) {
            case 'crecer':
                // Mancha que crece y decrece - MUCHO más lento
                mancha.radio = 20 + Math.sin(frameCount * 0.1) * 15;
                mancha.color = `hsl(${280 + Math.sin(frameCount * 0.05) * 30}, 70%, ${60 + Math.sin(frameCount * 0.1) * 10}%)`;
                break;
                
            case 'derretir':
                // Mancha que se derrite hacia abajo - más lento
                mancha.y = canvas.height / 2 + Math.sin(frameCount * 0.06) * 50;
                mancha.forma = frameCount % 80 < 40 ? 'gota' : 'oval';
                mancha.radio = 25 - Math.abs(Math.sin(frameCount * 0.06)) * 10;
                break;
                
            case 'bailar':
                // Mancha que baila - MUCHO más lento
                mancha.x = canvas.width / 2 + Math.sin(frameCount * 0.12) * 40;
                mancha.y = canvas.height / 2 + Math.cos(frameCount * 0.1) * 30;
                mancha.radio = 20 + Math.sin(frameCount * 0.15) * 8;
                mancha.color = `hsl(${(frameCount * 2) % 360}, 70%, 60%)`;
                break;
                
            case 'transformar':
                // Transformación constante - más lenta
                if (frameCount % 120 < 40) {
                    mancha.forma = 'circulo';
                    mancha.radio = 25;
                } else if (frameCount % 120 < 80) {
                    mancha.forma = 'oval';
                    mancha.radio = 30;
                } else {
                    mancha.forma = 'gota';
                    mancha.radio = 20;
                }
                mancha.color = `hsl(${(frameCount * 1.5) % 360}, 70%, 60%)`;
                break;
        }
        
        dibujarManchita();
        
        if (animacionActiva) {
            requestAnimationFrame(animarSegunTipo);
        }
    }
    
    // Event listener para control
    playBtn.addEventListener('click', () => {
        animacionActiva = true;
        frameCount = 0;
        tiempoInicio = Date.now();
        
        // Resetear contador
        const contadorElemento = document.getElementById('contador-tiempo');
        if (contadorElemento) {
            contadorElemento.textContent = '⏱️ 10s';
        }
        
        // Mostrar botón de salir rápido
        const salirRapidoBtn = document.getElementById('salir-rapido');
        if (salirRapidoBtn) {
            salirRapidoBtn.style.display = 'block';
        }
        
        // Ocultar botón de cerrar normal temporalmente
        const modalElement = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
        const cerrarBtn = modalElement?.querySelector('button[onclick*="cerrarModal"]');
        if (cerrarBtn && !cerrarBtn.id) {
            cerrarBtn.style.display = 'none';
        }
        
        animarSegunTipo();
        playBtn.disabled = true;
        playBtn.textContent = '🎯 ¡En progreso! Imita los movimientos';
    });
    
    // Dibujar estado inicial
    dibujarManchita();
}

function iniciarAnimacionDemo(tipo, index) {
    const canvas = document.getElementById('demo-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animacionActiva = false;
    let frameCount = 0;
    let tiempoInicio = 0;
    const DURACION_TOTAL = 10000; // 10 segundos en milisegundos
    
    // Propiedades de la manchita
    let mancha = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radio: 20,
        color: '#8b5cf6',
        forma: 'circulo'
    };
    
    // Configurar controles
    const playBtn = document.getElementById('play-demo');
    const pauseBtn = document.getElementById('pause-demo');
    
    function dibujarManchita() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar manchita base
        ctx.fillStyle = mancha.color;
        ctx.beginPath();
        
        switch (mancha.forma) {
            case 'circulo':
                ctx.arc(mancha.x, mancha.y, mancha.radio, 0, Math.PI * 2);
                break;
            case 'oval':
                ctx.ellipse(mancha.x, mancha.y, mancha.radio, mancha.radio * 0.6, 0, 0, Math.PI * 2);
                break;
            case 'gota':
                ctx.arc(mancha.x, mancha.y + 10, mancha.radio * 0.8, 0, Math.PI * 2);
                ctx.arc(mancha.x, mancha.y - 5, mancha.radio * 0.5, 0, Math.PI * 2);
                break;
        }
        ctx.fill();
        
        // Dibujar ojitos
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(mancha.x - 8, mancha.y - 5, 4, 0, Math.PI * 2);
        ctx.arc(mancha.x + 8, mancha.y - 5, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupilas
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(mancha.x - 8, mancha.y - 5, 2, 0, Math.PI * 2);
        ctx.arc(mancha.x + 8, mancha.y - 5, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Sonrisa
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mancha.x, mancha.y + 5, 8, 0, Math.PI);
        ctx.stroke();
    }
    
    function animarSegunTipo() {
        if (!animacionActiva) return;
        
        const tiempoActual = Date.now();
        const tiempoTranscurrido = tiempoActual - tiempoInicio;
        const progreso = Math.min(tiempoTranscurrido / DURACION_TOTAL, 1);
        
        // Actualizar contador visual
        const contadorElemento = document.getElementById('contador-tiempo');
        if (contadorElemento) {
            const segundosRestantes = Math.ceil((DURACION_TOTAL - tiempoTranscurrido) / 1000);
            contadorElemento.textContent = `⏱️ ${Math.max(0, segundosRestantes)}s`;
        }
        
        // Detener animación después de 10 segundos
        if (tiempoTranscurrido >= DURACION_TOTAL) {
            animacionActiva = false;
            playBtn.disabled = false;
            pauseBtn.disabled = true;
            
            // Mostrar mensaje de finalización
            if (contadorElemento) {
                contadorElemento.textContent = '✅ ¡Completado!';
            }
            
            // Resetear posición inicial
            mancha.x = canvas.width / 2;
            mancha.y = canvas.height / 2;
            mancha.radio = 20;
            mancha.color = '#8b5cf6';
            mancha.forma = 'circulo';
            dibujarManchita();
            return;
        }
        
        frameCount++;
        
        switch (tipo) {
            case 'crecer':
                // Mancha que crece y decrece - mucho más rápido
                mancha.radio = 20 + Math.sin(frameCount * 0.5) * 15;
                mancha.color = `hsl(${280 + Math.sin(frameCount * 0.3) * 30}, 70%, ${60 + Math.sin(frameCount * 0.5) * 10}%)`;
                break;
                
            case 'derretir':
                // Mancha que se derrite hacia abajo - más rápido
                mancha.y = canvas.height / 2 + Math.sin(frameCount * 0.3) * 50;
                mancha.forma = frameCount % 20 < 10 ? 'gota' : 'oval';
                mancha.radio = 25 - Math.abs(Math.sin(frameCount * 0.3)) * 10;
                break;
                
            case 'bailar':
                // Mancha que baila - mucho más rápido
                mancha.x = canvas.width / 2 + Math.sin(frameCount * 0.6) * 40;
                mancha.y = canvas.height / 2 + Math.cos(frameCount * 0.5) * 30;
                mancha.radio = 20 + Math.sin(frameCount * 0.8) * 8;
                mancha.color = `hsl(${(frameCount * 10) % 360}, 70%, 60%)`;
                break;
                
            case 'transformar':
                // Transformación constante - mucho más rápida
                if (frameCount % 30 < 10) {
                    mancha.forma = 'circulo';
                    mancha.radio = 25;
                } else if (frameCount % 30 < 20) {
                    mancha.forma = 'oval';
                    mancha.radio = 30;
                } else {
                    mancha.forma = 'gota';
                    mancha.radio = 20;
                }
                mancha.color = `hsl(${(frameCount * 8) % 360}, 70%, 60%)`;
                break;
        }
        
        dibujarManchita();
        
        if (animacionActiva) {
            requestAnimationFrame(animarSegunTipo);
        }
    }
    
    // Event listeners para controles
    playBtn.addEventListener('click', () => {
        animacionActiva = true;
        frameCount = 0;
        tiempoInicio = Date.now();
        
        // Resetear contador
        const contadorElemento = document.getElementById('contador-tiempo');
        if (contadorElemento) {
            contadorElemento.textContent = '⏱️ 10s';
        }
        
        animarSegunTipo();
        playBtn.disabled = true;
        pauseBtn.disabled = false;
    });
    
    pauseBtn.addEventListener('click', () => {
        animacionActiva = false;
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        
        // Mantener tiempo actual en pausa
        const contadorElemento = document.getElementById('contador-tiempo');
        if (contadorElemento && tiempoInicio) {
            const tiempoTranscurrido = Date.now() - tiempoInicio;
            const segundosRestantes = Math.ceil((DURACION_TOTAL - tiempoTranscurrido) / 1000);
            contadorElemento.textContent = `⏸️ ${Math.max(0, segundosRestantes)}s`;
        }
    });
    
    // Permitir cerrar modal durante la animación
    const modal = document.querySelector('.demo-modal');
    const closeBtn = modal?.querySelector('button[onclick="cerrarModal()"]');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            animacionActiva = false;
        });
    }
    
    // También permitir cerrar con ESC durante animación
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && animacionActiva) {
            animacionActiva = false;
            const modal = document.querySelector('.demo-modal');
            if (modal) {
                modal.remove();
            }
        }
    });
    
    // Dibujar estado inicial
    dibujarManchita();
}

// Agregar funciones adicionales al scope global
window.generarPalabraInspiracion = generarPalabraInspiracion;
window.activarHerramientaEspecial = activarHerramientaEspecial;
window.seleccionarColorEmocion = seleccionarColorEmocion;
window.nuevaCreacion = nuevaCreacion;
window.celebrarLogro = celebrarLogro;
window.iniciarEjercicioCorporal = iniciarEjercicioCorporal;
window.hacerConDemo = hacerConDemo;
window.cerrarModalEjercicio = cerrarModalEjercicio;
window.configurarFaseEspecifica = configurarFaseEspecifica;
window.iniciarAnimacionDemoLenta = iniciarAnimacionDemoLenta;
window.mostrarDemostracion = mostrarDemostracion;
window.iniciarAnimacionDemo = iniciarAnimacionDemo;
window.completarEjercicio = completarEjercicio;
window.guardarReflexionCorporal = guardarReflexionCorporal;
window.copiarManchaAlCanvas = copiarManchaAlCanvas;
window.configurarFaseCorporal = configurarFaseCorporal;
window.cargarManchaAnterior = cargarManchaAnterior;
window.revisarViaje = revisarViaje;
window.nuevaAventura = nuevaAventura;
window.compartirExperiencia = compartirExperiencia;
window.completarActividad = completarActividad;
// Funciones que estaban faltando:
window.agregarIdea = agregarIdea;
window.crearIdeaVisual = crearIdeaVisual;
window.seleccionarSentimiento = seleccionarSentimiento;
window.crearVisualizacionTransformacion = crearVisualizacionTransformacion;
window.colocarHuella = colocarHuella;
window.cambiarColorHuella = cambiarColorHuella;
window.agregarDecoracion = agregarDecoracion;
window.finalizarCeremonia = finalizarCeremonia;
window.agregarEmocion = agregarEmocion;
window.cerrarModal = cerrarModal;
window.limpiarCanvasManifiesto = limpiarCanvasManifiesto;

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes aparecer {
        from {
            opacity: 0;
            transform: scale(0) rotate(180deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes confetti-fall {
        from {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .color-btn:hover {
        transform: scale(1.15) !important;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important;
    }
    
    .nombre-paleta {
        animation: pulso-magico 2s ease-in-out infinite;
    }
    
    @keyframes pulso-magico {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }
        50% {
            transform: scale(1.02);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
        }
    }
`;

if (!document.getElementById('actividades-styles')) {
    style.id = 'actividades-styles';
    document.head.appendChild(style);
}

// Exportar todas las funciones adicionales al scope global
window.cerrarModalTemporal = cerrarModalTemporal;
window.revisarViaje = revisarViaje;
window.nuevaAventura = nuevaAventura;
window.compartirExperiencia = compartirExperiencia;
window.celebrarLogro = celebrarLogro;
window.generarPalabraInspiracion = generarPalabraInspiracion;

// Las funciones del Estudio Profesional ya fueron definidas al INICIO del archivo
window.deshacerAccion = deshacerAccion;
window.rehacerAccion = rehacerAccion;
window.exportarComoImagen = exportarComoImagen;
window.actualizarParametroHerramienta = actualizarParametroHerramienta;
window.actualizarVistaPrevia = actualizarVistaPrevia;
window.actualizarInfoOverlay = actualizarInfoOverlay;
window.seleccionarColorEmocion = seleccionarColorEmocion;

// Exportar funciones de configuración de fases
window.configurarFaseCreativa = configurarFaseCreativa;
window.configurarFaseEspecifica = configurarFaseEspecifica;
window.mostrarFaseActividad = mostrarFaseActividad;
window.configurarParametrosEventListeners = configurarParametrosEventListeners;
window.inicializarParametrosPincel = inicializarParametrosPincel;
window.inicializarEstudioArteProfesional = inicializarEstudioArteProfesional;
window.inicializarPanelColoresAvanzado = inicializarPanelColoresAvanzado;
window.inicializarHerramientasRapidas = inicializarHerramientasRapidas;
window.configurarOverlayHerramienta = configurarOverlayHerramienta;
window.inicializarSistemaAvanzadoCompleto = inicializarSistemaAvanzadoCompleto;
window.cargarSistemasAvanzados = cargarSistemasAvanzados;
window.inicializarSistemaBasicoMejorado = inicializarSistemaBasicoMejorado;

console.log('🎨 Actividades Interactivas cargadas correctamente');
console.log('✅ Funciones globales exportadas:', {
    iniciarActividadInteractiva: typeof window.iniciarActividadInteractiva,
    mostrarFaseActividad: typeof window.mostrarFaseActividad,
    ACTIVIDADES_CONFIG: typeof window.ACTIVIDADES_CONFIG,
    ActividadState: typeof window.ActividadState
});

// Diagnóstico de botones críticos
console.log('🔧 Funciones de botones verificadas:', {
    siguienteFaseActividad: typeof window.siguienteFaseActividad,
    anteriorFaseActividad: typeof window.anteriorFaseActividad,
    completarActividad: typeof window.completarActividad,
    celebrarLogro: typeof window.celebrarLogro,
    mostrarNotificacionActividad: typeof window.mostrarNotificacionActividad,
    generarManchaAleatoria: typeof window.generarManchaAleatoria,
    limpiarCanvas: typeof window.limpiarCanvas,
    guardarCreacion: typeof window.guardarCreacion,
    copiarManchaAlCanvas: typeof window.copiarManchaAlCanvas,
    iniciarEjercicioCorporal: typeof window.iniciarEjercicioCorporal,
    hacerConDemo: typeof window.hacerConDemo,
    cerrarModalEjercicio: typeof window.cerrarModalEjercicio,
    iniciarAnimacionDemoLenta: typeof window.iniciarAnimacionDemoLenta,
    cerrarModal: typeof window.cerrarModal,
    mostrarDemostracion: typeof window.mostrarDemostracion,
    iniciarAnimacionDemo: typeof window.iniciarAnimacionDemo
});

// Diagnóstico de funciones del Estudio Profesional
console.log('🎨 Funciones del Estudio Profesional verificadas:', {
    seleccionarHerramientaAvanzada: typeof window.seleccionarHerramientaAvanzada,
    seleccionarColor: typeof window.seleccionarColor,
    deshacerAccion: typeof window.deshacerAccion,
    rehacerAccion: typeof window.rehacerAccion,
    exportarComoImagen: typeof window.exportarComoImagen,
    actualizarParametroHerramienta: typeof window.actualizarParametroHerramienta,
    actualizarVistaPrevia: typeof window.actualizarVistaPrevia,
    actualizarInfoOverlay: typeof window.actualizarInfoOverlay,
    seleccionarColorEmocion: typeof window.seleccionarColorEmocion,
    configurarFaseCreativa: typeof window.configurarFaseCreativa,
    configurarFaseEspecifica: typeof window.configurarFaseEspecifica,
    mostrarFaseActividad: typeof window.mostrarFaseActividad,
    configurarParametrosEventListeners: typeof window.configurarParametrosEventListeners,
    inicializarParametrosPincel: typeof window.inicializarParametrosPincel,
    inicializarEstudioArteProfesional: typeof window.inicializarEstudioArteProfesional
});

// Marcar que el sistema está listo
window.ACTIVIDADES_SISTEMA_LISTO = true;
console.log('✅ ACTIVIDADES_SISTEMA_LISTO =', window.ACTIVIDADES_SISTEMA_LISTO);

/**
 * Sistema de Precisión de Cursor Mejorado
 * Función universal para obtener posición exacta del mouse en canvas
 */
console.log('🎨 Sistema de Actividades Interactivas cargado completamente');

}} // Cierres de bloques pendientes