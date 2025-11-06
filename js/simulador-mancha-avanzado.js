/**
 * ================================================
 * SIMULADOR AVANZADO DE MANCHA - ERROR CREATIVO
 * ================================================
 * Simulador realista de manchas con herramientas avanzadas
 * que replica la experiencia real de crear manchas artísticas
 */

// Estado del simulador
const SimuladorMancha = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    herramientaActual: 'pincel',
    colorActual: '#3B82F6',
    tamañoActual: 5,
    opacidadActual: 1.0,
    textura: 'normal',
    efectoAgua: false,
    velocidadGoteo: 1,
    particulas: [],
    capasCanvas: [],
    historiaDibujo: [],
    modoMezcla: 'normal'
};

// Configuración de herramientas avanzadas
const HERRAMIENTAS_MANCHA = {
    pincel: {
        nombre: 'Pincel Normal',
        icono: '🖌️',
        descripcion: 'Pincel tradicional para trazos controlados',
        cursor: 'crosshair',
        configuracion: { presion: true, textura: false, goteo: false }
    },
    brocha: {
        nombre: 'Brocha Ancha',
        icono: '🧹',
        descripcion: 'Brocha grande para cubrir áreas extensas',
        cursor: 'cell',
        configuracion: { presion: true, textura: true, goteo: false }
    },
    gotero: {
        nombre: 'Gotero',
        icono: '💧',
        descripcion: 'Crea gotas individuales que se expanden',
        cursor: 'pointer',
        configuracion: { presion: false, textura: false, goteo: true }
    },
    agua: {
        nombre: 'Agua Pura',
        icono: '💙',
        descripcion: 'Efecto de agua transparente que difumina',
        cursor: 'alias',
        configuracion: { presion: true, textura: false, goteo: true }
    },
    acuarela: {
        nombre: 'Acuarela',
        icono: '🌊',
        descripcion: 'Efecto de agua que se difumina naturalmente',
        cursor: 'grab',
        configuracion: { presion: true, textura: true, goteo: true }
    },
    spray: {
        nombre: 'Aerógrafo',
        icono: '💨',
        descripcion: 'Pulverización de color en partículas',
        cursor: 'copy',
        configuracion: { presion: true, textura: false, goteo: false }
    },
    esponja: {
        nombre: 'Esponja',
        icono: '🧽',
        descripcion: 'Textura porosa y absorción de color',
        cursor: 'grab',
        configuracion: { presion: true, textura: true, goteo: false }
    },
    dedo: {
        nombre: 'Pintura con Dedos',
        icono: '👆',
        descripcion: 'Textura orgánica y natural',
        cursor: 'grab',
        configuracion: { presion: true, textura: true, goteo: false }
    },
    goteo: {
        nombre: 'Goteo Gravitacional',
        icono: '🌧️',
        descripcion: 'El color gotea hacia abajo por gravedad',
        cursor: 'ns-resize',
        configuracion: { presion: false, textura: false, goteo: true }
    }
};

// Paleta de colores inspirada en la naturaleza y emociones
const PALETA_EMOCIONAL = {
    alegria: ['#FFD93D', '#6BCF7F', '#4D96FF', '#FF6B6B', '#95E1D3'],
    melancolia: ['#3D5A80', '#98C1D9', '#E0FBFC', '#293241', '#7209B7'],
    energia: ['#F72585', '#B5179E', '#7209B7', '#480CA8', '#3A0CA3'],
    naturaleza: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2'],
    fuego: ['#FF4000', '#FF6B00', '#FF8500', '#FFA500', '#FFB347'],
    agua: ['#0077BE', '#00A6FB', '#0099E5', '#66D9EF', '#A2E4F0'],
    tierra: ['#8B4513', '#A0522D', '#CD853F', '#D2B48C', '#F5DEB3']
};

/**
 * Inicializar el simulador avanzado de mancha
 */
function inicializarSimuladorMancha(canvasId) {
    console.log('🎨 Inicializando Simulador Avanzado de Mancha');
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn('⚠️ Canvas no encontrado:', canvasId);
        // Si no existe el canvas, crear la interfaz primero
        crearInterfazHerramientas();
        return false;
    }
    
    SimuladorMancha.canvas = canvas;
    SimuladorMancha.ctx = canvas.getContext('2d');
    
    // Configurar canvas
    configurarCanvas();
    
    // Configurar event listeners (ahora con verificación de null)
    configurarEventListeners();
    
    // Inicializar sistema de partículas
    inicializarSistemaParticulas();
    
    console.log('✅ Simulador de Mancha inicializado correctamente');
    return true;
}

/**
 * Configurar canvas con propiedades avanzadas
 */
function configurarCanvas() {
    const canvas = SimuladorMancha.canvas;
    const ctx = SimuladorMancha.ctx;
    
    // Fondo de papel con textura sutil
    ctx.fillStyle = '#FEFEFE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Agregar textura de papel
    agregarTexturaPapel();
    
    // Configurar propiedades del contexto
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
}

/**
 * Agregar textura sutil de papel
 */
function agregarTexturaPapel() {
    const ctx = SimuladorMancha.ctx;
    const canvas = SimuladorMancha.canvas;
    
    // Crear patrón de ruido para simular textura de papel
    for (let i = 0; i < 2000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const opacity = Math.random() * 0.03;
        
        ctx.fillStyle = `rgba(200, 200, 200, ${opacity})`;
        ctx.fillRect(x, y, 1, 1);
    }
}

/**
 * Configurar event listeners para interacción
 */
function configurarEventListeners() {
    const canvas = SimuladorMancha.canvas;
    
    // Verificar que el canvas existe antes de agregar listeners
    if (!canvas) {
        console.warn('⚠️ Canvas no disponible para configurar event listeners');
        return;
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', iniciarDibujo);
    canvas.addEventListener('mousemove', dibujar);
    canvas.addEventListener('mouseup', terminarDibujo);
    canvas.addEventListener('mouseleave', terminarDibujo);
    
    // Touch events para dispositivos móviles
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', terminarDibujo);
    
    // Prevenir scroll en touch
    canvas.addEventListener('touchstart', e => e.preventDefault());
    canvas.addEventListener('touchmove', e => e.preventDefault());
}

/**
 * Crear interfaz de herramientas avanzada
 */
function crearInterfazHerramientas() {
    const container = document.getElementById('herramientas-mancha-container') || crearContainerHerramientas();
    
    container.innerHTML = `
        <div class="simulador-mancha-interfaz bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
            <h3 class="text-xl font-bold text-blue-700 mb-6 text-center">🎨 Estudio de Mancha Realista</h3>
            
            <!-- Canvas principal -->
            <div class="canvas-container bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
                <canvas id="canvas-mancha-avanzado" width="600" height="400" 
                        class="border-2 border-blue-300 rounded-lg bg-white cursor-crosshair shadow-lg mx-auto block">
                </canvas>
                
                <!-- Indicador de herramienta activa -->
                <div class="herramienta-activa mt-3 text-center">
                    <span class="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        <span id="herramienta-icono">🖌️</span>
                        <span id="herramienta-nombre">Pincel Normal</span>
                    </span>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Panel de herramientas -->
                <div class="herramientas-panel bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
                    <h4 class="font-bold text-purple-700 mb-3">🛠️ Herramientas</h4>
                    <div class="grid grid-cols-2 gap-2">
                        ${Object.entries(HERRAMIENTAS_MANCHA).map(([key, herramienta]) => `
                            <button class="herramienta-btn bg-white hover:bg-purple-100 border-2 border-purple-300 rounded-lg p-3 text-center transition-all hover:scale-105 ${key === 'pincel' ? 'ring-2 ring-purple-500' : ''}" 
                                    onclick="seleccionarHerramienta('${key}')" 
                                    data-herramienta="${key}"
                                    title="${herramienta.descripcion}">
                                <div class="text-2xl mb-1">${herramienta.icono}</div>
                                <div class="text-xs font-medium text-purple-700">${herramienta.nombre}</div>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Panel de colores emocionales -->
                <div class="colores-panel bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border-2 border-green-200">
                    <h4 class="font-bold text-green-700 mb-3">🌈 Colores Emocionales</h4>
                    <div class="paletas-emocionales space-y-3">
                        ${Object.entries(PALETA_EMOCIONAL).map(([emocion, colores]) => `
                            <div class="paleta-emocion">
                                <label class="block text-xs font-medium text-green-600 mb-1 capitalize">${emocion}</label>
                                <div class="flex gap-1">
                                    ${colores.map(color => `
                                        <button class="color-btn w-6 h-6 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" 
                                                style="background-color: ${color}" 
                                                onclick="seleccionarColor('${color}')"
                                                title="${color}">
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Selector de color personalizado -->
                    <div class="color-personalizado mt-4">
                        <label class="block text-xs font-medium text-green-600 mb-1">Color Personalizado</label>
                        <input type="color" id="color-personalizado" value="#3B82F6" 
                               class="w-full h-8 border-2 border-green-300 rounded cursor-pointer"
                               onchange="seleccionarColor(this.value)">
                    </div>
                </div>
                
                <!-- Panel de configuración -->
                <div class="configuracion-panel bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-200">
                    <h4 class="font-bold text-orange-700 mb-3">⚙️ Configuración</h4>
                    
                    <!-- Tamaño -->
                    <div class="configuracion-item mb-3">
                        <label class="block text-xs font-medium text-orange-600 mb-1">
                            📏 Tamaño: <span id="tamano-display">5px</span>
                        </label>
                        <input type="range" id="tamano-slider" min="1" max="50" value="5" 
                               class="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                               oninput="cambiarTamano(this.value)">
                    </div>
                    
                    <!-- Opacidad -->
                    <div class="configuracion-item mb-3">
                        <label class="block text-xs font-medium text-orange-600 mb-1">
                            👻 Opacidad: <span id="opacidad-display">100%</span>
                        </label>
                        <input type="range" id="opacidad-slider" min="0.1" max="1" step="0.1" value="1" 
                               class="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                               oninput="cambiarOpacidad(this.value)">
                    </div>
                    
                    <!-- Efectos especiales -->
                    <div class="efectos-especiales">
                        <h5 class="text-xs font-bold text-orange-600 mb-2">✨ Efectos Especiales</h5>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input type="checkbox" id="efecto-agua" class="mr-2" onchange="toggleEfectoAgua(this.checked)">
                                <span class="text-xs text-orange-700">💧 Efecto Agua</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" id="efecto-textura" class="mr-2" onchange="toggleTextura(this.checked)">
                                <span class="text-xs text-orange-700">🌀 Textura Rugosa</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" id="efecto-goteo" class="mr-2" onchange="toggleGoteo(this.checked)">
                                <span class="text-xs text-orange-700">🌧️ Goteo Automático</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Controles de acción -->
            <div class="controles-accion flex flex-wrap gap-3 justify-center mt-6">
                <button onclick="limpiarCanvas()" class="btn-accion bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                    🗑️ Limpiar
                </button>
                <button onclick="deshacerAccion()" class="btn-accion bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    ↩️ Deshacer
                </button>
                <button onclick="generarManchaAleatoria()" class="btn-accion bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                    🎲 Mancha Aleatoria
                </button>
                <button onclick="aplicarEfectoSorpresa()" class="btn-accion bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors">
                    ✨ Efecto Sorpresa
                </button>
                <button onclick="guardarMancha()" class="btn-accion bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                    💾 Guardar Mancha
                </button>
            </div>
            
            <!-- Tips creativos -->
            <div class="tips-creativos bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-200 mt-6">
                <h4 class="font-bold text-yellow-700 mb-2">💡 Tips Creativos</h4>
                <div id="tip-actual" class="text-sm text-yellow-800">
                    Experimenta combinando diferentes herramientas para crear texturas únicas
                </div>
                <button onclick="mostrarNuevoTip()" class="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">
                    🔄 Nuevo Tip
                </button>
            </div>
        </div>
    `;
    
    // Reinicializar canvas después de crear la interfaz
    setTimeout(() => {
        inicializarSimuladorMancha('canvas-mancha-avanzado');
    }, 100);
}

/**
 * Crear container para herramientas si no existe
 */
function crearContainerHerramientas() {
    const container = document.createElement('div');
    container.id = 'herramientas-mancha-container';
    document.getElementById('fase-contenido').appendChild(container);
    return container;
}

/**
 * Seleccionar herramienta
 */
function seleccionarHerramienta(herramienta) {
    // Guardar la selección de herramienta
    SimuladorMancha.herramientaActual = herramienta;

    // Actualizar UI (si existen botones)
    const botones = document.querySelectorAll('.herramienta-btn');
    if (botones && botones.length) {
        botones.forEach(btn => btn.classList.remove('ring-2', 'ring-purple-500'));
        const btnSel = document.querySelector(`[data-herramienta="${herramienta}"]`);
        if (btnSel) btnSel.classList.add('ring-2', 'ring-purple-500');
    }

    // Actualizar indicador (si existe la información de la herramienta)
    const herramientaData = HERRAMIENTAS_MANCHA[herramienta] || { icono: '?', nombre: herramienta, cursor: 'default' };
    const iconEl = document.getElementById('herramienta-icono');
    const nombreEl = document.getElementById('herramienta-nombre');
    if (iconEl) iconEl.textContent = herramientaData.icono;
    if (nombreEl) nombreEl.textContent = herramientaData.nombre;

    // Cambiar cursor si el canvas está inicializado
    if (SimuladorMancha.canvas && herramientaData.cursor) {
        try {
            SimuladorMancha.canvas.style.cursor = herramientaData.cursor;
        } catch (err) {
            console.warn('No se pudo cambiar el cursor:', err);
        }
    }

    console.log('🛠️ Herramienta seleccionada:', herramientaData.nombre);
}

/**
 * Seleccionar color
 */
function seleccionarColor(color) {
    SimuladorMancha.colorActual = color;
    document.getElementById('color-personalizado').value = color;
    
    // Efecto visual en botones de color
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-gray-400');
    });
    document.querySelector(`[style*="${color}"]`)?.classList.add('ring-2', 'ring-gray-400');
    
    console.log('🎨 Color seleccionado:', color);
}

/**
 * Cambiar tamaño de herramienta
 */
function cambiarTamano(tamano) {
    SimuladorMancha.tamañoActual = parseInt(tamano);
    document.getElementById('tamano-display').textContent = `${tamano}px`;
}

/**
 * Cambiar opacidad
 */
function cambiarOpacidad(opacidad) {
    SimuladorMancha.opacidadActual = parseFloat(opacidad);
    document.getElementById('opacidad-display').textContent = `${Math.round(opacidad * 100)}%`;
}

/**
 * Toggle efecto agua
 */
function toggleEfectoAgua(activo) {
    SimuladorMancha.efectoAgua = activo;
    console.log('💧 Efecto agua:', activo ? 'activado' : 'desactivado');
}

/**
 * Toggle textura
 */
function toggleTextura(activo) {
    SimuladorMancha.textura = activo ? 'rugosa' : 'normal';
    console.log('🌀 Textura:', SimuladorMancha.textura);
}

/**
 * Toggle goteo automático
 */
function toggleGoteo(activo) {
    if (activo) {
        iniciarGoteoAutomatico();
    } else {
        detenerGoteoAutomatico();
    }
}

/**
 * Función de precisión para simulador
 */
function obtenerPosicionPrecisaSimulador(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    return { x, y };
}

/**
 * Iniciar dibujo
 */
function iniciarDibujo(e) {
    SimuladorMancha.isDrawing = true;
    
    // Usar función de precisión mejorada
    const pos = obtenerPosicionPrecisaSimulador(e, SimuladorMancha.canvas);
    
    // Guardar estado para deshacer
    guardarEstadoCanvas();
    
    // Aplicar herramienta específica
    aplicarHerramienta(pos.x, pos.y, 'inicio');
}

/**
 * Dibujar
 */
function dibujar(e) {
    if (!SimuladorMancha.isDrawing) return;
    
    const posicion = obtenerPosicionPrecisaSimulador(e, SimuladorMancha.canvas);
    
    aplicarHerramienta(posicion.x, posicion.y, 'movimiento');
}

/**
 * Terminar dibujo
 */
function terminarDibujo() {
    if (SimuladorMancha.isDrawing) {
        SimuladorMancha.isDrawing = false;
        aplicarEfectosPost();
    }
}

/**
 * Aplicar herramienta específica
 */
function aplicarHerramienta(x, y, tipo) {
    const herramienta = SimuladorMancha.herramientaActual;
    
    switch (herramienta) {
        case 'pincel':
            aplicarPincel(x, y, tipo);
            break;
        case 'brocha':
            aplicarBrocha(x, y, tipo);
            break;
        case 'gotero':
            aplicarGotero(x, y);
            break;
        case 'agua':
            aplicarAgua(x, y);
            break;
        case 'acuarela':
            aplicarAcuarela(x, y, tipo);
            break;
        case 'spray':
            aplicarSpray(x, y);
            break;
        case 'esponja':
            aplicarEsponja(x, y);
            break;
        case 'dedo':
            aplicarDedo(x, y, tipo);
            break;
        case 'goteo':
            iniciarGoteoEn(x, y);
            break;
    }
}

/**
 * Aplicar pincel normal
 */
function aplicarPincel(x, y, tipo) {
    const ctx = SimuladorMancha.ctx;
    const tamano = SimuladorMancha.tamañoActual;
    
    if (tipo === 'inicio') {
        ctx.globalAlpha = SimuladorMancha.opacidadActual;
        ctx.fillStyle = SimuladorMancha.colorActual;
        
        // Punto inicial con efecto de carga de pintura
        ctx.beginPath();
        ctx.arc(x, y, tamano, 0, Math.PI * 2);
        ctx.fill();
        
        // Pequeñas gotas iniciales para realismo
        for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * tamano;
            const offsetY = (Math.random() - 0.5) * tamano;
            const dropSize = Math.random() * 2 + 0.5;
            
            ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.6;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, dropSize, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        // Trazo continuo con variación de opacidad
        ctx.globalAlpha = SimuladorMancha.opacidadActual * (0.8 + Math.random() * 0.2);
        ctx.strokeStyle = SimuladorMancha.colorActual;
        ctx.lineWidth = tamano * (0.9 + Math.random() * 0.2); // Variación de grosor
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Agregar pequeñas imperfecciones para realismo
        if (Math.random() < 0.1) {
            ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.4;
            ctx.fillStyle = SimuladorMancha.colorActual;
            ctx.beginPath();
            ctx.arc(x + (Math.random() - 0.5) * tamano, y + (Math.random() - 0.5) * tamano, 
                   Math.random() * 2 + 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Aplicar textura si está activa
    if (SimuladorMancha.textura === 'rugosa') {
        agregarTexturaPunto(x, y);
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Aplicar brocha ancha
 */
function aplicarBrocha(x, y, tipo) {
    const ctx = SimuladorMancha.ctx;
    const tamanoBase = SimuladorMancha.tamañoActual;
    const anchoBrocha = tamanoBase * 3;
    
    // Crear efecto de brocha con cerdas múltiples
    ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.8;
    
    // Trazo principal de la brocha
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * 0.2 - 0.1); // Ligera rotación aleatoria
    
    // Múltiples cerdas con diferentes longitudes y densidades
    for (let cerda = 0; cerda < 15; cerda++) {
        const offsetX = (Math.random() - 0.5) * anchoBrocha;
        const offsetY = (Math.random() - 0.5) * tamanoBase;
        const longitudCerda = tamanoBase * (0.5 + Math.random() * 0.8);
        const opacidadCerda = SimuladorMancha.opacidadActual * (0.6 + Math.random() * 0.4);
        
        ctx.globalAlpha = opacidadCerda;
        ctx.fillStyle = SimuladorMancha.colorActual;
        
        // Forma alargada de cerda
        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.rotate((Math.random() - 0.5) * 0.3);
        ctx.fillRect(-longitudCerda/8, -longitudCerda/2, longitudCerda/4, longitudCerda);
        ctx.restore();
    }
    
    // Centro más denso para simular presión de brocha
    ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.9;
    ctx.fillStyle = SimuladorMancha.colorActual;
    ctx.fillRect(-anchoBrocha/4, -tamanoBase/3, anchoBrocha/2, tamanoBase*2/3);
    
    // Pequeñas gotas que se desprenden
    for (let i = 0; i < 5; i++) {
        const salpicaduraX = (Math.random() - 0.5) * anchoBrocha * 1.5;
        const salpicaduraY = (Math.random() - 0.5) * tamanoBase * 1.5;
        const tamanoGota = Math.random() * 3 + 1;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.4;
        ctx.beginPath();
        ctx.arc(salpicaduraX, salpicaduraY, tamanoGota, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
    ctx.globalAlpha = 1;
}

/**
 * Aplicar gotero
 */
function aplicarGotero(x, y) {
    const ctx = SimuladorMancha.ctx;
    
    // Efecto inmediato de gota grande
    ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.8;
    ctx.fillStyle = SimuladorMancha.colorActual;
    
    // Gota principal
    const radioBase = SimuladorMancha.tamañoActual * 2;
    ctx.beginPath();
    ctx.arc(x, y, radioBase, 0, Math.PI * 2);
    ctx.fill();
    
    // Efecto de salpicadura
    for (let i = 0; i < 8; i++) {
        const angulo = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
        const distancia = radioBase + Math.random() * 15;
        const splashX = x + Math.cos(angulo) * distancia;
        const splashY = y + Math.sin(angulo) * distancia;
        const splashSize = Math.random() * 3 + 1;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.4;
        ctx.beginPath();
        ctx.arc(splashX, splashY, splashSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Efecto de agua con gradiente
    if (SimuladorMancha.efectoAgua) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radioBase * 2);
        gradient.addColorStop(0, SimuladorMancha.colorActual + '60');
        gradient.addColorStop(0.7, SimuladorMancha.colorActual + '20');
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radioBase * 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Aplicar agua pura
 */
function aplicarAgua(x, y) {
    const ctx = SimuladorMancha.ctx;
    const area = SimuladorMancha.tamañoActual * 4;
    
    // Efecto de agua transparente con difuminado
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, area);
    gradient.addColorStop(0, 'rgba(135, 206, 235, 0.3)'); // Azul agua transparente
    gradient.addColorStop(0.5, 'rgba(135, 206, 235, 0.1)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.7;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, area, 0, Math.PI * 2);
    ctx.fill();
    
    // Gotas pequeñas alrededor
    for (let i = 0; i < 12; i++) {
        const angulo = (Math.PI * 2 / 12) * i + Math.random() * 0.3;
        const distancia = area * 0.6 + Math.random() * area * 0.4;
        const dropX = x + Math.cos(angulo) * distancia;
        const dropY = y + Math.sin(angulo) * distancia;
        const dropSize = Math.random() * 3 + 1;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.4;
        ctx.fillStyle = 'rgba(135, 206, 235, 0.5)';
        ctx.beginPath();
        ctx.arc(dropX, dropY, dropSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Efecto de ondas concéntricas
    for (let i = 1; i <= 3; i++) {
        ctx.globalAlpha = SimuladorMancha.opacidadActual * (0.3 / i);
        ctx.strokeStyle = 'rgba(135, 206, 235, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, area * i * 0.3, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Crear gota que se expande
 */
function crearGota(x, y, tamano) {
    const ctx = SimuladorMancha.ctx;
    
    // Animación de expansión de gota
    let radio = 0;
    const radioFinal = tamano;
    const expansion = setInterval(() => {
        ctx.globalAlpha = SimuladorMancha.opacidadActual * (1 - radio / radioFinal);
        ctx.fillStyle = SimuladorMancha.colorActual;
        
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);
        ctx.fill();
        
        radio += 2;
        
        if (radio >= radioFinal) {
            clearInterval(expansion);
            // Efecto de absorción
            if (SimuladorMancha.efectoAgua) {
                crearEfectoAbsorcion(x, y, radioFinal);
            }
        }
    }, 50);
}

/**
 * Aplicar acuarela
 */
function aplicarAcuarela(x, y, tipo) {
    const ctx = SimuladorMancha.ctx;
    const tamañoBase = SimuladorMancha.tamañoActual;
    
    // Crear efecto de acuarela más realista con bordes difuminados
    for (let capa = 0; capa < 5; capa++) {
        const offsetX = (Math.random() - 0.5) * tamañoBase;
        const offsetY = (Math.random() - 0.5) * tamañoBase;
        const radio = tamañoBase * (1.5 + capa * 0.3);
        const alpha = SimuladorMancha.opacidadActual * (0.4 - capa * 0.06);
        
        // Crear gradiente radial para efecto acuarela
        const gradient = ctx.createRadialGradient(
            x + offsetX, y + offsetY, 0,
            x + offsetX, y + offsetY, radio
        );
        gradient.addColorStop(0, SimuladorMancha.colorActual + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.7, SimuladorMancha.colorActual + Math.floor(alpha * 100).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, radio, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Pequeñas salpicaduras características de acuarela
    for (let i = 0; i < 8; i++) {
        const angulo = Math.random() * Math.PI * 2;
        const distancia = tamañoBase + Math.random() * tamañoBase;
        const splashX = x + Math.cos(angulo) * distancia;
        const splashY = y + Math.sin(angulo) * distancia;
        const splashSize = Math.random() * 4 + 1;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.3;
        ctx.fillStyle = SimuladorMancha.colorActual;
        ctx.beginPath();
        ctx.arc(splashX, splashY, splashSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Aplicar spray/aerógrafo
 */
function aplicarSpray(x, y) {
    const ctx = SimuladorMancha.ctx;
    const densidad = 25; // Más partículas para mejor efecto
    const radioMax = SimuladorMancha.tamañoActual * 3;
    
    // Crear múltiples anillos concéntricos con diferentes densidades
    for (let anillo = 0; anillo < 3; anillo++) {
        const radioAnillo = radioMax * (anillo + 1) / 3;
        const densidadAnillo = densidad * (3 - anillo) / 3; // Más denso en el centro
        
        for (let i = 0; i < densidadAnillo; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const distancia = Math.random() * radioAnillo;
            const particulaX = x + Math.cos(angulo) * distancia;
            const particulaY = y + Math.sin(angulo) * distancia;
            
            // Tamaño de partícula varía según distancia del centro
            const factorDistancia = 1 - (distancia / radioMax);
            const tamanoParticula = (Math.random() * 3 + 0.5) * factorDistancia;
            
            // Opacidad varía según anillo y proximidad al centro
            const opacidadParticula = SimuladorMancha.opacidadActual * (0.15 - anillo * 0.03) * factorDistancia;
            
            ctx.globalAlpha = opacidadParticula;
            ctx.fillStyle = SimuladorMancha.colorActual;
            ctx.beginPath();
            ctx.arc(particulaX, particulaY, tamanoParticula, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Agregar algunas partículas más grandes para realismo
    for (let i = 0; i < 5; i++) {
        const angulo = Math.random() * Math.PI * 2;
        const distancia = Math.random() * radioMax * 0.5;
        const dropX = x + Math.cos(angulo) * distancia;
        const dropY = y + Math.sin(angulo) * distancia;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.3;
        ctx.fillStyle = SimuladorMancha.colorActual;
        ctx.beginPath();
        ctx.arc(dropX, dropY, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Aplicar esponja
 */
function aplicarEsponja(x, y) {
    const ctx = SimuladorMancha.ctx;
    const area = SimuladorMancha.tamañoActual * 3;
    
    // Efecto base de la esponja
    ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.7;
    ctx.fillStyle = SimuladorMancha.colorActual;
    
    // Crear textura irregular de esponja
    for (let i = 0; i < 25; i++) {
        const offsetX = (Math.random() - 0.5) * area;
        const offsetY = (Math.random() - 0.5) * area;
        const tamano = Math.random() * 8 + 3;
        const alpha = Math.random() * 0.6 + 0.2;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * alpha;
        
        // Crear formas irregulares más visibles
        ctx.beginPath();
        if (Math.random() > 0.5) {
            // Círculos irregulares
            ctx.arc(x + offsetX, y + offsetY, tamano, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Rectángulos rotados
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(Math.random() * Math.PI);
            ctx.fillRect(-tamano/2, -tamano/2, tamano, tamano * 0.7);
            ctx.restore();
        }
    }
    
    // Efecto de absorción (centros más intensos)
    for (let i = 0; i < 8; i++) {
        const offsetX = (Math.random() - 0.5) * area * 0.5;
        const offsetY = (Math.random() - 0.5) * area * 0.5;
        const tamano = Math.random() * 4 + 2;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.9;
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, tamano, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
}

/**
 * Aplicar pintura con dedos
 */
function aplicarDedo(x, y, tipo) {
    const ctx = SimuladorMancha.ctx;
    const tamanoBase = SimuladorMancha.tamañoActual;
    
    // Crear huella de dedo más realista y artística
    ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.9;
    ctx.fillStyle = SimuladorMancha.colorActual;
    
    // Base principal del dedo (forma ovalada)
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI * 0.3 - Math.PI * 0.15); // Rotación ligera
    
    // Forma principal
    ctx.beginPath();
    ctx.ellipse(0, 0, tamanoBase * 1.2, tamanoBase * 1.8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Texturas internas más naturales
    ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.6;
    
    // Líneas de huella digital curvas
    for (let i = 0; i < 7; i++) {
        const radio = tamanoBase * (0.2 + i * 0.15);
        const curva = Math.random() * 0.3 - 0.15;
        
        ctx.strokeStyle = SimuladorMancha.colorActual;
        ctx.lineWidth = Math.random() * 1.5 + 0.5;
        ctx.globalAlpha = SimuladorMancha.opacidadActual * (0.4 - i * 0.04);
        
        ctx.beginPath();
        ctx.moveTo(-radio, -radio * 0.8);
        ctx.quadraticCurveTo(curva * radio, 0, -radio, radio * 0.8);
        ctx.moveTo(radio, -radio * 0.8);
        ctx.quadraticCurveTo(-curva * radio, 0, radio, radio * 0.8);
        ctx.stroke();
    }
    
    // Puntos de presión irregulares
    for (let i = 0; i < 12; i++) {
        const offsetX = (Math.random() - 0.5) * tamanoBase;
        const offsetY = (Math.random() - 0.5) * tamanoBase * 1.5;
        const dotSize = Math.random() * 2 + 0.5;
        
        ctx.globalAlpha = SimuladorMancha.opacidadActual * 0.3;
        ctx.fillStyle = SimuladorMancha.colorActual;
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, dotSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
    ctx.globalAlpha = 1;
}

/**
 * Inicializar sistema de partículas para efectos avanzados
 */
function inicializarSistemaParticulas() {
    // Sistema básico de partículas para efectos de agua y goteo
    setInterval(() => {
        actualizarParticulas();
    }, 50);
}

/**
 * Actualizar partículas activas
 */
function actualizarParticulas() {
    SimuladorMancha.particulas = SimuladorMancha.particulas.filter(particula => {
        particula.update();
        return particula.activa;
    });
}

/**
 * Crear efecto de absorción
 */
function crearEfectoAbsorcion(x, y, radio) {
    const ctx = SimuladorMancha.ctx;
    let radioDifusion = radio;
    
    const difusion = setInterval(() => {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = SimuladorMancha.colorActual;
        
        // Crear anillos de difusión
        for (let i = 0; i < 3; i++) {
            const offset = i * 5;
            ctx.beginPath();
            ctx.arc(x, y, radioDifusion + offset, 0, Math.PI * 2);
            ctx.fill();
        }
        
        radioDifusion += 2;
        
        if (radioDifusion > radio * 2) {
            clearInterval(difusion);
        }
    }, 100);
}

/**
 * Crear efecto de difuminado
 */
function crearEfectoDifuminado(x, y) {
    // Simular difuminado de acuarela
    const ctx = SimuladorMancha.ctx;
    const direcciones = 8;
    
    for (let i = 0; i < direcciones; i++) {
        const angulo = (i / direcciones) * Math.PI * 2;
        const distancia = 15 + Math.random() * 10;
        const finalX = x + Math.cos(angulo) * distancia;
        const finalY = y + Math.sin(angulo) * distancia;
        
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = SimuladorMancha.colorActual;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(finalX, finalY);
        ctx.stroke();
    }
}

/**
 * Limpiar canvas
 */
function limpiarCanvas() {
    const ctx = SimuladorMancha.ctx;
    const canvas = SimuladorMancha.canvas;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    configurarCanvas();
    
    // Limpiar historial
    SimuladorMancha.historiaDibujo = [];
    SimuladorMancha.particulas = [];
    
    console.log('🧹 Canvas limpiado');
}

/**
 * Guardar estado del canvas para deshacer
 */
function guardarEstadoCanvas() {
    const canvas = SimuladorMancha.canvas;
    const imageData = SimuladorMancha.ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    SimuladorMancha.historiaDibujo.push(imageData);
    
    // Limitar historial para no consumir demasiada memoria
    if (SimuladorMancha.historiaDibujo.length > 10) {
        SimuladorMancha.historiaDibujo.shift();
    }
}

/**
 * Deshacer última acción
 */
function deshacerAccion() {
    if (SimuladorMancha.historiaDibujo.length > 0) {
        const estadoAnterior = SimuladorMancha.historiaDibujo.pop();
        SimuladorMancha.ctx.putImageData(estadoAnterior, 0, 0);
        console.log('↩️ Acción deshecha');
    }
}

/**
 * Generar mancha aleatoria
 */
function generarManchaAleatoria() {
    const canvas = SimuladorMancha.canvas;
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    
    // Guardar estado actual
    guardarEstadoCanvas();
    
    // Seleccionar color aleatorio
    const coloresAleatorios = Object.values(PALETA_EMOCIONAL).flat();
    const colorAleatorio = coloresAleatorios[Math.floor(Math.random() * coloresAleatorios.length)];
    seleccionarColor(colorAleatorio);
    
    // Crear mancha orgánica aleatoria
    const numeroGotas = 5 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < numeroGotas; i++) {
        const offsetX = (Math.random() - 0.5) * 200;
        const offsetY = (Math.random() - 0.5) * 200;
        const tamano = 10 + Math.random() * 30;
        
        setTimeout(() => {
            crearGota(centroX + offsetX, centroY + offsetY, tamano);
        }, i * 200);
    }
    
    console.log('🎲 Mancha aleatoria generada');
}

/**
 * Aplicar efecto sorpresa
 */
function aplicarEfectoSorpresa() {
    const efectos = ['lluvia', 'explosion', 'ondas', 'particulas'];
    const efectoElegido = efectos[Math.floor(Math.random() * efectos.length)];
    
    switch (efectoElegido) {
        case 'lluvia':
            crearEfectoLluvia();
            break;
        case 'explosion':
            crearEfectoExplosion();
            break;
        case 'ondas':
            crearEfectoOndas();
            break;
        case 'particulas':
            crearEfectoParticulas();
            break;
    }
    
    console.log('✨ Efecto sorpresa aplicado:', efectoElegido);
}

/**
 * Crear efecto de lluvia
 */
function crearEfectoLluvia() {
    const canvas = SimuladorMancha.canvas;
    const gotas = 20;
    
    for (let i = 0; i < gotas; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.3; // Solo en la parte superior
            crearGota(x, y, 5 + Math.random() * 10);
        }, i * 100);
    }
}

/**
 * Crear efecto explosión
 */
function crearEfectoExplosion() {
    const canvas = SimuladorMancha.canvas;
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const rayos = 12;
    
    for (let i = 0; i < rayos; i++) {
        const angulo = (i / rayos) * Math.PI * 2;
        const distancia = 50 + Math.random() * 100;
        const x = centroX + Math.cos(angulo) * distancia;
        const y = centroY + Math.sin(angulo) * distancia;
        
        setTimeout(() => {
            crearGota(x, y, 8 + Math.random() * 15);
        }, i * 50);
    }
}

/**
 * Tips creativos
 */
const TIPS_CREATIVOS = [
    "Experimenta combinando diferentes herramientas para crear texturas únicas",
    "Usa el gotero después de la acuarela para efectos de dispersión",
    "La esponja funciona mejor con colores de baja opacidad",
    "Combina el spray con el efecto agua para crear nebulizaciones",
    "El pincel con dedo crea texturas muy naturales y orgánicas",
    "Prueba superponer colores complementarios para crear profundidad",
    "El goteo gravitacional funciona mejor desde la parte superior del canvas",
    "Usa la brocha con movimientos circulares para texturas de vegetación",
    "Los efectos sorpresa pueden dar ideas inesperadas para tu arte",
    "La acuarela con efecto agua simula el comportamiento real del pigmento"
];

/**
 * Mostrar nuevo tip creativo
 */
function mostrarNuevoTip() {
    const tipAleatorio = TIPS_CREATIVOS[Math.floor(Math.random() * TIPS_CREATIVOS.length)];
    document.getElementById('tip-actual').textContent = tipAleatorio;
}

/**
 * Guardar mancha creada
 */
function guardarMancha() {
    const canvas = SimuladorMancha.canvas;
    
    // Crear enlace de descarga
    const enlace = document.createElement('a');
    enlace.download = `mancha-creativa-${Date.now()}.png`;
    enlace.href = canvas.toDataURL();
    enlace.click();
    
    console.log('💾 Mancha guardada');
}

/**
 * Manejar eventos touch para dispositivos móviles
 */
function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                      e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    
    SimuladorMancha.canvas.dispatchEvent(mouseEvent);
}

// Exportar funciones principales
window.SimuladorManchaAvanzado = {
    inicializar: inicializarSimuladorMancha,
    seleccionarHerramienta,
    seleccionarColor,
    limpiarCanvas,
    guardarMancha,
    generarManchaAleatoria,
    aplicarEfectoSorpresa
};

console.log('🎨 Simulador Avanzado de Mancha cargado correctamente');