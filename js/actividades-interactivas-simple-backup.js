/**
 * SISTEMA DE ACTIVIDADES SIMPLIFICADO - VERSIÓN DE EMERGENCIA
 */

console.log('🚀 Iniciando sistema simplificado...');

// Estado global simplificado
const ActividadState = {
    actividadActual: null,
    faseActual: 0,
    progreso: {},
    dibujos: {},
    reflexiones: {},
    emociones: {}
};

console.log('✅ ActividadState creado');

// Estado de meditación simplificado
const MeditacionState = {
    activa: false,
    pausada: false,
    indiceActual: 0
};

console.log('✅ MeditacionState creado');

// Configuración básica de actividades
const ACTIVIDADES_CONFIG = {
    actividad1: {
        titulo: "🎭 Somos Manchas que se Mueven",
        subtitulo: "Una aventura de transformación creativa",
        descripcion: "Descubre personajes mágicos en manchas",
        totalFases: 3,
        fases: [
            {
                id: 'introduccion',
                titulo: '🌟 Bienvenido a la Aventura de las Manchas',
                tipo: 'intro',
                contenido: {
                    narrativa: "¡Hola aventurero creativo! Hoy vas a vivir una experiencia mágica donde las manchas cobran vida.",
                    objetivo: "Explorar la creatividad a través de manchas",
                    reglaEspecial: "✨ Cada mancha es un tesoro"
                }
            },
            {
                id: 'exploracion',
                titulo: '💃 Ser Manchas con el Cuerpo',
                tipo: 'corporal',
                contenido: {
                    narrativa: "Vamos a SER manchas con nuestro cuerpo.",
                    objetivo: "Activar el cuerpo y liberar la creatividad"
                }
            },
            {
                id: 'creacion',
                titulo: '🎨 Crear tu Mancha Personal',
                tipo: 'creativo',
                contenido: {
                    narrativa: "Ahora es tu turno de crear una mancha única.",
                    objetivo: "Crear una mancha personal y darle vida"
                }
            }
        ]
    },
    actividad2: {
        titulo: "🏠 El Lugar que me Habita",
        subtitulo: "Exploración del espacio personal",
        descripcion: "Descubre tu lugar en el mundo",
        totalFases: 2,
        fases: [
            {
                id: 'introduccion',
                titulo: '🌟 Bienvenido al Lugar',
                tipo: 'intro',
                contenido: {
                    narrativa: "Exploraremos tu lugar especial.",
                    objetivo: "Conectar con tu espacio personal"
                }
            }
        ]
    },
    actividad3: {
        titulo: "👥 Retrato Colectivo",
        subtitulo: "Creación en comunidad",
        descripcion: "Crear juntos una obra única",
        totalFases: 2,
        fases: [
            {
                id: 'introduccion',
                titulo: '🌟 Bienvenido al Retrato',
                tipo: 'intro',
                contenido: {
                    narrativa: "Crearemos un retrato colectivo.",
                    objetivo: "Trabajar en comunidad"
                }
            }
        ]
    },
    actividad4: {
        titulo: "📖 Historias del Error",
        subtitulo: "Narrativas transformadoras",
        descripcion: "Contar historias de transformación",
        totalFases: 2,
        fases: [
            {
                id: 'introduccion',
                titulo: '🌟 Bienvenido a las Historias',
                tipo: 'intro',
                contenido: {
                    narrativa: "Exploraremos historias de transformación.",
                    objetivo: "Compartir experiencias"
                }
            }
        ]
    }
};

console.log('✅ ACTIVIDADES_CONFIG creado:', Object.keys(ACTIVIDADES_CONFIG));

// Función principal para mostrar actividades
function mostrarActividad(numeroActividad) {
    console.log('🎭 mostrarActividad llamada con:', numeroActividad);
    console.log('🔥 DEBUG: Iniciando actividad...');
    
    const mapeoActividades = {
        1: 'actividad1',
        2: 'actividad2', 
        3: 'actividad3',
        4: 'actividad4'
    };
    
    const actividadId = mapeoActividades[numeroActividad];
    if (!actividadId) {
        console.error('❌ Actividad no encontrada:', numeroActividad);
        alert(`ERROR: Actividad ${numeroActividad} no existe`);
        return;
    }
    
    console.log('✅ Actividad encontrada:', actividadId);
    console.log('🔧 Iniciando actividad:', actividadId);
    
    // Verificar que existe el contenedor antes de continuar
    const contenedor = document.getElementById('lab-content-container') || document.getElementById('fase-contenido');
    if (!contenedor) {
        console.error('❌ No se encontró contenedor para mostrar la actividad');
        alert('ERROR: No se encontró el área para mostrar la actividad. Asegúrate de estar en la sección correcta.');
        return;
    }
    
    console.log('✅ Contenedor encontrado:', contenedor.id);
    iniciarActividadInteractiva(actividadId);
}

// Función para iniciar actividad
function iniciarActividadInteractiva(actividadId) {
    console.log('🚀 iniciarActividadInteractiva llamada con:', actividadId);
    
    const actividad = ACTIVIDADES_CONFIG[actividadId];
    if (!actividad) {
        console.error('Actividad no encontrada en config:', actividadId);
        return;
    }
    
    ActividadState.actividadActual = actividadId;
    ActividadState.faseActual = 0;
    
    console.log('✅ Estado actualizado:', ActividadState);
    
    // Mostrar la primera fase
    mostrarFaseActividad(actividadId, 0);
}

// Función para mostrar fase
function mostrarFaseActividad(actividadId, faseIndex) {
    console.log('📋 mostrarFaseActividad:', actividadId, faseIndex);
    
    const actividad = ACTIVIDADES_CONFIG[actividadId];
    if (!actividad) {
        console.error('Actividad no encontrada:', actividadId);
        return;
    }
    
    const fase = actividad.fases[faseIndex];
    if (!fase) {
        console.error('Fase no encontrada:', faseIndex);
        return;
    }
    
    console.log('✅ Mostrando fase:', fase.titulo);
    
    // Buscar contenedor - priorizar lab-content-container (laboratorio) o fase-contenido (otros)
    let contenedor = document.getElementById('lab-content-container') || document.getElementById('fase-contenido');
    
    if (contenedor) {
        let contenidoHTML = '';
        
        if (fase.tipo === 'intro') {
            contenidoHTML = `
                <div class="fase-introduccion">
                    <h2>${fase.titulo}</h2>
                    <p>${fase.contenido.narrativa}</p>
                    <div class="objetivo">
                        <h3>🎯 Objetivo</h3>
                        <p>${fase.contenido.objetivo}</p>
                    </div>
                    ${fase.contenido.reglaEspecial ? `
                        <div class="regla-especial">
                            <h3>✨ Regla Especial</h3>
                            <p>${fase.contenido.reglaEspecial}</p>
                        </div>
                    ` : ''}
                    <button onclick="siguienteFaseActividad()" style="background: #4CAF50; color: white; border: none; padding: 15px 30px; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 20px 0;">
                        🚀 ¡Comenzar la Aventura!
                    </button>
                </div>
            `;
        } else {
            contenidoHTML = `
                <div class="fase-contenido">
                    <h2>${fase.titulo}</h2>
                    <p>${fase.contenido.narrativa}</p>
                    <div class="objetivo">
                        <h3>🎯 Objetivo</h3>
                        <p>${fase.contenido.objetivo}</p>
                    </div>
                    <button onclick="siguienteFaseActividad()" style="background: #007bff; color: white; border: none; padding: 15px 30px; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 20px 0;">
                        ➡️ Siguiente Fase
                    </button>
                </div>
            `;
        }
        
        contenedor.innerHTML = contenidoHTML;
        console.log('✅ Contenido HTML actualizado en:', contenedor.id);
    } else {
        console.warn('⚠️ Contenedor para actividades no encontrado (buscando lab-content-container o fase-contenido)');
    }
}

// Función para avanzar a siguiente fase
function siguienteFaseActividad() {
    console.log('➡️ siguienteFaseActividad llamada');
    console.log('🔥 DEBUG: Avanzando fase...');
    
    if (!ActividadState.actividadActual) {
        console.error('❌ No hay actividad actual');
        alert('ERROR: No hay ninguna actividad activa. Inicia una actividad primero.');
        return;
    }
    
    console.log('✅ Actividad actual:', ActividadState.actividadActual);
    console.log('📊 Fase actual:', ActividadState.faseActual);
    
    const actividad = ACTIVIDADES_CONFIG[ActividadState.actividadActual];
    const siguienteFase = ActividadState.faseActual + 1;
    
    console.log('🔍 Buscando fase:', siguienteFase, 'de', actividad.fases.length);
    
    if (siguienteFase < actividad.fases.length) {
        ActividadState.faseActual = siguienteFase;
        console.log('✅ Avanzando a fase:', siguienteFase);
        mostrarFaseActividad(ActividadState.actividadActual, siguienteFase);
    } else {
        console.log('🎉 Actividad completada!');
        const contenedor = document.getElementById('lab-content-container') || document.getElementById('fase-contenido');
        if (contenedor) {
            contenedor.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>🎉 ¡Actividad Completada!</h2>
                    <p>Has terminado "${actividad.titulo}"</p>
                    <button onclick="location.reload()" style="background: #4CAF50; color: white; border: none; padding: 15px 30px; border-radius: 5px; cursor: pointer; font-size: 16px;">
                        🔄 Volver al Inicio
                    </button>
                </div>
            `;
        }
    }
}

// Funciones del laboratorio (simplificadas)
function activarHerramientaMancha(herramienta) {
    console.log('🎨 Activando herramienta:', herramienta);
    alert('Herramienta ' + herramienta + ' activada (modo simplificado)');
}

function limpiarManchaPersonal() {
    console.log('🧹 Limpiando mancha personal');
    alert('Canvas limpiado (modo simplificado)');
}

function guardarManchaPersonal() {
    console.log('💾 Guardando mancha personal');
    alert('Mancha guardada (modo simplificado)');
}

function inicializarMiniSimulador() {
    console.log('🔧 Inicializando mini simulador');
    return true;
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    console.log('📢 Notificación:', mensaje, tipo);
    alert(mensaje);
}

// Exportar todas las funciones al objeto window
window.ActividadState = ActividadState;
window.MeditacionState = MeditacionState;
window.ACTIVIDADES_CONFIG = ACTIVIDADES_CONFIG;
window.mostrarActividad = mostrarActividad;
window.iniciarActividadInteractiva = iniciarActividadInteractiva;
window.mostrarFaseActividad = mostrarFaseActividad;
window.siguienteFaseActividad = siguienteFaseActividad;
window.activarHerramientaMancha = activarHerramientaMancha;
window.limpiarManchaPersonal = limpiarManchaPersonal;
window.guardarManchaPersonal = guardarManchaPersonal;
window.inicializarMiniSimulador = inicializarMiniSimulador;
window.mostrarNotificacion = mostrarNotificacion;

console.log('🎉 SISTEMA SIMPLIFICADO CARGADO COMPLETAMENTE');
console.log('🔥 MODO ESTABLE: Funciones exportadas sin duplicaciones');
console.log('📊 Funciones exportadas:', [
    'ActividadState',
    'MeditacionState', 
    'ACTIVIDADES_CONFIG',
    'mostrarActividad',
    'iniciarActividadInteractiva',
    'mostrarFaseActividad',
    'siguienteFaseActividad',
    'activarHerramientaMancha',
    'limpiarManchaPersonal',
    'guardarManchaPersonal',
    'inicializarMiniSimulador',
    'mostrarNotificacion'
]);