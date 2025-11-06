// 🎨 Laboratorio Creativo - Sistema de Actividades Originales
// Integra las 4 actividades originales con mejoras visuales

class LaboratorioCreativoOriginal {
    constructor() {
        console.log('🏗️ Construyendo LaboratorioCreativoOriginal...');
        this.actividadActual = null;
        this.progreso = {};
        this.initialize();
    }
    
    initialize() {
        console.log('🔧 Inicializando interface del laboratorio...');
        this.createMainInterface();
        this.setupEventListeners();
        console.log('✅ Laboratorio inicializado correctamente');
    }
    
    createMainInterface() {
        console.log('🎨 Creando interface principal...');
        const container = document.getElementById('lab-content-container');
        
        if (!container) {
            console.error('❌ Container no encontrado en createMainInterface');
            return;
        }
        
        console.log('✅ Container encontrado, generando HTML...');
        container.innerHTML = `
            <div class="laboratorio-principal">
                <!-- Encabezado del Laboratorio -->
                <div class="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-8">
                    <h1 class="text-4xl font-bold text-center text-primary mb-4">🎨 Laboratorio del Error Creativo</h1>
                    <p class="text-lg text-gray-700 text-center mb-6">Explora tu creatividad a través de 4 actividades transformadoras</p>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <p class="font-medium text-yellow-800">✨ <strong>Filosofía del Error Creativo:</strong> No existen errores, solo oportunidades de descubrimiento. Cada trazo inesperado puede ser el inicio de algo sorprendente.</p>
                    </div>
                </div>
                
                <!-- Grid de Actividades -->
                <div class="grid md:grid-cols-2 gap-8 mb-8" id="actividades-grid">
                    <!-- Las actividades se cargarán dinámicamente -->
                </div>
                
                <!-- Contenedor de actividad activa -->
                <div id="actividad-activa" class="hidden"></div>
            </div>
        `;
        
        this.cargarActividades();
    }
    
    cargarActividades() {
        const actividades = [
            {
                id: 'actividad1',
                titulo: '🎭 Somos Manchas que se Mueven',
                subtitulo: 'El error como tesoro: cada mancha inesperada es un personaje esperando ser descubierto',
                descripcion: 'Descubre personajes mágicos en manchas y dales vida a través del movimiento y la imaginación',
                fases: '5 fases',
                duracion: '20 min',
                color: 'from-purple-500 to-pink-500',
                icono: '🎭'
            },
            {
                id: 'actividad2',
                titulo: '🏠 El Lugar que me Habita',
                subtitulo: 'La consigna "No borrar" transforma autocensura en aceptación creativa',
                descripcion: 'Explora y representa tu lugar especial con la regla mágica: no borrar nunca',
                fases: '6 fases',
                duracion: '25 min',
                color: 'from-blue-500 to-teal-500',
                icono: '🏠'
            },
            {
                id: 'actividad3',
                titulo: '🎭 Del Retrato a la Resignificación',
                subtitulo: 'El error evoluciona: de frustración en el retrato a protagonista en abstracción y chispa narrativa',
                descripcion: 'Descubre cómo transformar un "error" en una oportunidad creativa a través del autorretrato y la abstracción',
                fases: '5 fases',
                duracion: '22 min',
                color: 'from-green-500 to-lime-500',
                icono: '🎭'
            },
            {
                id: 'actividad4',
                titulo: '�️ Historias que Nacen del Error',
                subtitulo: 'El error como protagonista: cuando los "fallos" se convierten en la chispa que enciende nuevas historias',
                descripcion: 'Reúne tus creaciones anteriores y descubre las historias que nacen cuando el error se convierte en protagonista',
                fases: '4 fases',
                duracion: '25 min',
                color: 'from-indigo-500 to-purple-600',
                icono: '�️'
            }
        ];
        
        const container = document.getElementById('actividades-grid');
        container.innerHTML = actividades.map((actividad, index) => `
            <div class="actividad-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer" 
                 data-actividad="${actividad.id}" 
                 style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both;">
                
                <!-- Header con gradiente -->
                <div class="bg-gradient-to-r ${actividad.color} p-6 text-white relative overflow-hidden">
                    <div class="absolute top-0 right-0 opacity-20 text-6xl">${actividad.icono}</div>
                    <h3 class="text-2xl font-bold mb-2 relative z-10">${actividad.titulo}</h3>
                    <p class="text-white/90 text-sm relative z-10">${actividad.subtitulo}</p>
                </div>
                
                <!-- Contenido -->
                <div class="p-6">
                    <p class="text-gray-600 mb-6 leading-relaxed">${actividad.descripcion}</p>
                    
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="material-symbols-outlined text-lg mr-1">schedule</span>
                            ${actividad.duracion}
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="material-symbols-outlined text-lg mr-1">psychology</span>
                            ${actividad.fases}
                        </div>
                    </div>
                    
                    <button class="btn-actividad w-full bg-gradient-to-r ${actividad.color} text-white py-3 px-6 rounded-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg" 
                            data-actividad="${actividad.id}"
                            onclick="window.iniciarActividadDirecta('${actividad.id}')">
                        ✨ Comenzar Aventura
                    </button>
                </div>
                
                <!-- Progress indicator if completed -->
                ${this.progreso[actividad.id] ? `
                    <div class="absolute top-4 left-4 bg-green-500 text-white rounded-full p-2">
                        <span class="material-symbols-outlined text-sm">check</span>
                    </div>
                ` : ''}
            </div>
        `).join('');
        
        this.setupActividadListeners();
    }
    
    setupEventListeners() {
        // Los event listeners se configuran después de crear las actividades
    }
    
    setupActividadListeners() {
        console.log('🔗 Configurando event listeners de actividades...');
        
        // Configurar event listeners en las tarjetas como respaldo
        const cards = document.querySelectorAll('.actividad-card');
        console.log(`📦 Encontradas ${cards.length} tarjetas de actividad`);
        
        cards.forEach((card, index) => {
            const actividadId = card.getAttribute('data-actividad');
            console.log(`   - Configurando card ${index + 1}: ${actividadId}`);
            
            card.addEventListener('click', (e) => {
                // Solo activar si no se hizo click en el botón directamente
                if (!e.target.classList.contains('btn-actividad')) {
                    console.log(`🎯 Click en tarjeta: ${actividadId}`);
                    this.iniciarActividad(actividadId);
                }
            });
        });
        
        // Configurar event listeners directos en los botones como respaldo adicional
        const botones = document.querySelectorAll('.btn-actividad');
        console.log(`🎯 Encontrados ${botones.length} botones de actividad`);
        
        botones.forEach((boton, index) => {
            const actividadId = boton.getAttribute('data-actividad');
            console.log(`   - Configurando botón ${index + 1}: ${actividadId}`);
            
            // Event listener como respaldo si onclick falla
            boton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que se propague a la tarjeta
                console.log(`🎯 Click directo en botón: ${actividadId}`);
                this.iniciarActividad(actividadId);
            });
        });
        
        console.log('✅ Event listeners configurados (onclick + respaldos)');
    }
    
    iniciarActividad(actividadId) {
        this.actividadActual = actividadId;
        
        console.log(`🎨 Iniciando actividad: ${actividadId}`);
        console.log(`📊 Estado actual del sistema:`, {
            iniciarActividadInteractiva: typeof window.iniciarActividadInteractiva,
            ACTIVIDADES_CONFIG: typeof window.ACTIVIDADES_CONFIG,
            ActividadState: typeof window.ActividadState,
            ACTIVIDADES_SISTEMA_LISTO: window.ACTIVIDADES_SISTEMA_LISTO
        });
        
        // Función para intentar iniciar la actividad
        const intentarIniciar = () => {
            if (typeof window.iniciarActividadInteractiva === 'function') {
                console.log(`✅ Sistema disponible, iniciando actividad: ${actividadId}`);
                
                try {
                    window.iniciarActividadInteractiva(actividadId);
                    console.log(`✅ Actividad ${actividadId} iniciada exitosamente`);
                    return true;
                } catch (error) {
                    console.error(`❌ Error al iniciar actividad ${actividadId}:`, error);
                    console.error('Stack:', error.stack);
                    return false;
                }
            }
            return false;
        };
        
        // Intentar iniciar inmediatamente
        if (intentarIniciar()) {
            return; // Éxito, salir
        }
        
        // Si no está listo, esperar un poco y reintentar
        console.log('⏳ Sistema no listo, esperando...');
        
        let intentos = 0;
        const maxIntentos = 5;
        
        const intervalo = setInterval(() => {
            intentos++;
            console.log(`   Intento ${intentos}/${maxIntentos}...`);
            
            if (intentarIniciar()) {
                console.log('✅ Sistema cargado exitosamente');
                clearInterval(intervalo);
            } else if (intentos >= maxIntentos) {
                console.warn('⚠️ Timeout esperando sistema, usando fallback');
                clearInterval(intervalo);
                this.cargarActividadManualmente(actividadId);
            }
        }, 200);
    }
    
    cargarActividadManualmente(actividadId) {
        console.log(`🔧 Cargando actividad manualmente: ${actividadId}`);
        
        // Obtener el contenedor del laboratorio
        const container = document.getElementById('lab-content-container');
        if (!container) {
            console.error('❌ No se encontró el contenedor del laboratorio');
            return;
        }
        
        // Configurar el estado básico
        window.ActividadState = window.ActividadState || {
            actividadActual: null,
            faseActual: 0,
            dibujos: {},
            reflexiones: {},
            emociones: {},
            datosPersonaje: {}
        };
        
        window.ActividadState.actividadActual = actividadId;
        window.ActividadState.faseActual = 0;
        
        // Intentar usar mostrarFaseActividad si está disponible
        if (typeof window.mostrarFaseActividad === 'function') {
            console.log('✅ Usando mostrarFaseActividad');
            window.mostrarFaseActividad(actividadId, 0);
        } else {
            console.log('❌ mostrarFaseActividad no disponible, mostrando fallback');
            this.mostrarActividadBasica(actividadId);
        }
    }
    
    mostrarActividadBasica(actividadId) {
        const container = document.getElementById('lab-content-container');
        
        const actividadesInfo = {
            'actividad1': {
                titulo: '🎨 La Mancha Transformadora',
                descripcion: 'Convierte accidentes en arte',
                fases: ['Mancha inicial', 'Observación', 'Transformación', 'Reflexión']
            },
            'actividad2': {
                titulo: '🖼️ Autorretrato del Error',
                descripcion: 'Dibújate sin borrar nada',
                fases: ['Preparación', 'Dibujo libre', 'Sin borrar', 'Celebración']
            },
            'actividad3': {
                titulo: '🌈 Exploración Abstracta',
                descripcion: 'Colores y formas sin límites',
                fases: ['Exploración', 'Colores', 'Formas', 'Composición']
            },
            'actividad4': {
                titulo: '🖼️ Galería Colaborativa',
                descripcion: 'Comparte tu arte con otros',
                fases: ['Creación', 'Descripción', 'Exhibición', 'Reflexión grupal']
            }
        };
        
        const actividad = actividadesInfo[actividadId] || actividadesInfo['actividad1'];
        
        container.innerHTML = `
            <div class="actividad-contenido bg-white rounded-xl shadow-lg p-8">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8">
                    <button onclick="window.regresarAlMenuPrincipal()" 
                            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                        ← Volver al Laboratorio
                    </button>
                    <h1 class="text-3xl font-bold text-primary">${actividad.titulo}</h1>
                    <div class="w-40"></div>
                </div>
                
                <!-- Descripción -->
                <div class="text-center mb-8">
                    <p class="text-lg text-gray-600 mb-6">${actividad.descripcion}</p>
                    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <p class="text-blue-800">🎨 <strong>¡Actividad Disponible!</strong> Esta actividad está funcionando en modo básico. Las funciones avanzadas se cargarán automáticamente.</p>
                    </div>
                </div>
                
                <!-- Área de actividad -->
                <div class="actividad-area bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-8">
                    <h3 class="text-xl font-bold text-purple-700 mb-6 text-center">🎨 Área Creativa</h3>
                    
                    <!-- Canvas básico -->
                    <div class="canvas-container bg-white rounded-lg p-4 mb-6 text-center">
                        <canvas id="canvas-basico" width="600" height="400" 
                                class="border-2 border-gray-300 rounded-lg mx-auto cursor-crosshair"
                                style="max-width: 100%; height: auto;">
                        </canvas>
                    </div>
                    
                    <!-- Controles básicos -->
                    <div class="controles-basicos text-center">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-600 mb-2">Color:</label>
                            <input type="color" id="color-picker" value="#8b5cf6" class="w-16 h-8 border border-gray-300 rounded">
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-600 mb-2">Tamaño del pincel:</label>
                            <input type="range" id="brush-size" min="1" max="20" value="5" class="w-32">
                            <span id="brush-size-display" class="ml-2 text-sm text-gray-600">5px</span>
                        </div>
                        <div class="space-x-4">
                            <button onclick="limpiarCanvas()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                                🗑️ Limpiar
                            </button>
                            <button onclick="siguienteFaseActividad()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                                ✅ Continuar
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Progreso -->
                <div class="progreso-actividad bg-white rounded-lg p-6 border-2 border-gray-200">
                    <h4 class="font-bold text-gray-700 mb-4">📈 Progreso de la Actividad</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        ${actividad.fases.map((fase, index) => `
                            <div class="text-center p-3 rounded-lg ${index === 0 ? 'bg-blue-100' : 'bg-gray-100'}">
                                <div class="text-xl mb-1">${index === 0 ? '🔄' : '⏳'}</div>
                                <p class="text-sm font-medium">${fase}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Inicializar canvas básico
        this.inicializarCanvasBasico();
    }
    
    inicializarCanvasBasico() {
        const canvas = document.getElementById('canvas-basico');
        const colorPicker = document.getElementById('color-picker');
        const brushSize = document.getElementById('brush-size');
        const brushSizeDisplay = document.getElementById('brush-size-display');
        
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let dibujando = false;
        
        // Configurar canvas
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Función de precisión local
        const obtenerPosicion = (e, canvas) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            return {
                x: Math.round((e.clientX - rect.left) * scaleX),
                y: Math.round((e.clientY - rect.top) * scaleY)
            };
        };
        
        // Event listeners del canvas
        canvas.addEventListener('mousedown', (e) => {
            dibujando = true;
            const posicion = obtenerPosicion(e, canvas);
            ctx.beginPath();
            ctx.moveTo(posicion.x, posicion.y);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!dibujando) return;
            
            const posicion = obtenerPosicion(e, canvas);
            
            ctx.strokeStyle = colorPicker.value;
            ctx.lineWidth = brushSize.value;
            ctx.lineTo(posicion.x, posicion.y);
            ctx.stroke();
        });
        
        canvas.addEventListener('mouseup', () => {
            dibujando = false;
        });
        
        // Actualizar display del tamaño del pincel
        if (brushSize && brushSizeDisplay) {
            brushSize.addEventListener('input', () => {
                brushSizeDisplay.textContent = brushSize.value + 'px';
            });
        }
    }
    
    limpiarCanvas() {
        const canvas = document.getElementById('canvas-basico');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    completarActividad() {
        // Mostrar mensaje de completado
        const mensaje = document.createElement('div');
        mensaje.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        mensaje.innerHTML = `
            <div class="bg-white rounded-xl p-8 text-center max-w-md mx-4">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="text-2xl font-bold text-green-600 mb-4">¡Actividad Completada!</h3>
                <p class="text-gray-600 mb-6">Has terminado esta fase creativa. ¡Excelente trabajo!</p>
                <button onclick="this.remove(); window.regresarAlMenuPrincipal ? window.regresarAlMenuPrincipal() : window.location.reload();" 
                        class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                    ✨ Continuar
                </button>
            </div>
        `;
        document.body.appendChild(mensaje);
    }
    
    mostrarActividadFallback(actividadId) {
        const container = document.getElementById('actividad-activa');
        
        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg">
                <div class="bg-gradient-to-r from-primary to-accent text-white p-6 rounded-t-xl">
                    <div class="flex justify-between items-center">
                        <button id="volver-laboratorio" class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
                            ← Volver al Laboratorio
                        </button>
                        <h1 class="text-2xl font-bold">${this.getTituloActividad(actividadId)}</h1>
                        <div class="w-40"></div>
                    </div>
                </div>
                
                <div class="p-8">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-white text-3xl">${this.getIconoActividad(actividadId)}</span>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-3">${this.getTituloActividad(actividadId)}</h2>
                        <p class="text-gray-600">${this.getDescripcionActividad(actividadId)}</p>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
                        <p class="font-medium text-yellow-800">💡 <strong>Próximamente:</strong> Esta actividad estará disponible en su forma completa. Mientras tanto, usa tu imaginación para explorar ${this.getTituloActividad(actividadId).toLowerCase()}.</p>
                    </div>
                    
                    <div class="text-center">
                        <button id="marcar-completada" class="btn bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                            ✨ Marcar como Explorada
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('volver-laboratorio').addEventListener('click', () => {
            this.volverALaboratorio();
        });
        
        document.getElementById('marcar-completada').addEventListener('click', () => {
            this.marcarCompletada(actividadId);
        });
    }
    
    volverALaboratorio() {
        // Ocultar actividad
        document.getElementById('actividad-activa').classList.add('hidden');
        
        // Mostrar lista de actividades
        document.querySelector('.laboratorio-principal .grid').style.display = 'grid';
        document.querySelector('.laboratorio-principal > div:first-child').style.display = 'block';
        
        this.actividadActual = null;
    }
    
    marcarCompletada(actividadId) {
        this.progreso[actividadId] = {
            completada: true,
            fecha: new Date().toISOString()
        };
        
        // Mostrar celebración
        this.mostrarCelebracion(actividadId);
    }
    
    mostrarCelebracion(actividadId) {
        const container = document.getElementById('actividad-activa');
        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                <div class="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <span class="text-white text-4xl">🎉</span>
                </div>
                <h2 class="text-3xl font-bold text-green-600 mb-4">¡Excelente Trabajo!</h2>
                <p class="text-lg text-gray-700 mb-6">Has completado <strong>${this.getTituloActividad(actividadId)}</strong>. Cada experiencia creativa te acerca más al dominio del Error Creativo.</p>
                
                <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
                    <p class="text-green-800 font-medium text-lg italic">"El error es la puerta de entrada al descubrimiento."</p>
                    <p class="text-green-600 text-sm mt-2">- Filosofía del Error Creativo</p>
                </div>
                
                <div class="space-y-4">
                    <button id="explorar-mas" class="btn bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                        🚀 Explorar Más Actividades
                    </button>
                    <button id="volver-inicio" class="btn bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        🏠 Volver al Laboratorio
                    </button>
                </div>
            </div>
        `;
        
        this.crearConfetti();
        
        document.getElementById('explorar-mas').addEventListener('click', () => {
            this.volverALaboratorio();
        });
        
        document.getElementById('volver-inicio').addEventListener('click', () => {
            this.volverALaboratorio();
        });
    }
    
    crearConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#ff7675'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'fixed w-3 h-3 rounded-full pointer-events-none z-50';
                confetti.style.left = `${Math.random() * window.innerWidth}px`;
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 100);
        }
    }
    
    // Métodos helper
    getTituloActividad(id) {
        const titulos = {
            'actividad1': '🎭 Somos Manchas que se Mueven',
            'actividad2': '🏠 El Lugar que me Habita',
            'actividad3': '🎭 Del Retrato a la Resignificación',
            'actividad4': '�️ Historias que Nacen del Error'
        };
        return titulos[id] || 'Actividad del Error Creativo';
    }
    
    getDescripcionActividad(id) {
        const descripciones = {
            'actividad1': 'Descubre personajes mágicos en manchas y dales vida a través del movimiento y la imaginación.',
            'actividad2': 'Explora y representa tu lugar especial con la regla mágica: no borrar nunca.',
            'actividad3': 'Descubre cómo transformar un "error" en una oportunidad creativa a través del autorretrato y la abstracción.',
            'actividad4': 'Reúne tus creaciones anteriores y descubre las historias que nacen cuando el error se convierte en protagonista.'
        };
        return descripciones[id] || 'Una experiencia creativa basada en el Error Creativo.';
    }
    
    getIconoActividad(id) {
        const iconos = {
            'actividad1': '🎭',
            'actividad2': '🏠',
            'actividad3': '🎭',
            'actividad4': '�️'
        };
        return iconos[id] || '🎨';
    }
}

// Función global para inicializar
window.initializeLaboratorioCreativo = function() {
    console.log('🎨 Inicializando Laboratorio Creativo Original...');
    
    // Verificar que el container existe
    const container = document.getElementById('lab-content-container');
    if (!container) {
        console.error('❌ Container lab-content-container no encontrado');
        return;
    }
    
    console.log('✅ Container encontrado, creando LaboratorioCreativoOriginal...');
    
    try {
        const laboratorio = new LaboratorioCreativoOriginal();
        console.log('✅ LaboratorioCreativoOriginal creado exitosamente');
    } catch (error) {
        console.error('❌ Error creando LaboratorioCreativoOriginal:', error);
    }
};

// Función para compatibilidad con actividades originales
window.initializeLaboratorio = function() {
    console.log('🔄 Regresando al Laboratorio Creativo...');
    window.initializeLaboratorioCreativo();
};

// CSS para animaciones
const styleElement = document.createElement('style');
styleElement.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .actividad-card:hover {
        transform: translateY(-8px) !important;
    }
    
    .btn-actividad:hover {
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
`;

if (!document.getElementById('lab-original-styles')) {
    styleElement.id = 'lab-original-styles';
    document.head.appendChild(styleElement);
}

// Función global para volver al laboratorio
window.regresarAlMenuPrincipal = () => {
    console.log('🔄 Regresando al menú principal del laboratorio...');
    window.initializeLaboratorioCreativo();
};

// Función global para iniciar actividad directamente desde onclick
window.iniciarActividadDirecta = (actividadId) => {
    console.log(`🎯 Iniciar actividad directa: ${actividadId}`);
    
    // Verificar que las funciones estén disponibles
    if (typeof window.iniciarActividadInteractiva === 'function') {
        console.log('✅ Llamando a iniciarActividadInteractiva...');
        window.iniciarActividadInteractiva(actividadId);
    } else {
        console.error('❌ iniciarActividadInteractiva no disponible');
        console.log('Funciones disponibles:', Object.keys(window).filter(k => k.includes('actividad')));
    }
};

console.log('🧪 Laboratorio Original cargado correctamente');
console.log('✅ Funciones globales exportadas:', {
    initializeLaboratorioCreativo: typeof window.initializeLaboratorioCreativo,
    regresarAlMenuPrincipal: typeof window.regresarAlMenuPrincipal,
    iniciarActividadDirecta: typeof window.iniciarActividadDirecta
});