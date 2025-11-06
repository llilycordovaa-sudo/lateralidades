// 📚 Guía Didáctica Interactiva de LATERALIDADES
// Sistema completo para gestionar las 4 actividades pedagógicas

// 🎯 Datos de las actividades basadas en la guía didáctica
const ACTIVIDADES_LATERALIDADES = {
    1: {
        id: 1,
        titulo: "El Hacer del Azar",
        emoji: "🎲",
        color: "purple",
        duracion: "2 sesiones de 1h30",
        objetivo: "Explorar la creación de personajes a partir de manchas aleatorias, desarrollando la capacidad de aceptar y transformar el 'error' en recurso creativo",
        rolError: "El error se presenta como mancha 'imperfecta' que debe ser aceptada tal como es, sin corrección. Esta aceptación inicial se convierte en el punto de partida para toda la creación posterior",
        materiales: [
            "Pinturas témpera o acuarelas",
            "Pinceles variados",
            "Papel bond o cartulina",
            "Agua y toallas",
            "Marcadores finos",
            "Fichas para escritura"
        ],
        sesiones: [
            {
                numero: 1,
                titulo: "De la Mancha al Personaje",
                duracion: "1h30",
                fases: [
                    {
                        nombre: "Lluvia de Ideas sobre Error",
                        tiempo: "15 min",
                        descripcion: "Indagar percepciones iniciales sobre el error, crear ambiente de confianza y documentar ideas previas",
                        disciplinas: ["Reflexión", "Comunicación oral", "Registro gráfico"],
                        inteligencias: ["Lingüística", "Intrapersonal", "Interpersonal"],
                        pasosDocente: [
                            "Organiza espacio de círculo: Dispone sillas en círculo amplio para favorecer contacto visual",
                            "Introduce la actividad: Explica que van a explorar qué significa 'ERROR' para cada uno",
                            "Facilita participación: Invita a compartir experiencias con errores sin juzgar respuestas",
                            "Registra ideas clave: Anota en papelógrafo palabras y frases que emerjan del grupo",
                            "Valida todas las perspectivas: Acepta y refuerza cada aporte sin corregir o dirigir"
                        ],
                        consignasEstudiantes: [
                            "Sentémonos en círculo para compartir nuestras ideas",
                            "¿Qué significa 'ERROR' para ustedes?",
                            "Cuéntenme alguna experiencia que hayan tenido con errores",
                            "Todas las ideas son válidas y importantes"
                        ]
                    },
                    {
                        nombre: "Creación de la Mancha",
                        tiempo: "30 min",
                        descripcion: "Crear manchas aleatorias sin control, aceptando el resultado como punto de partida creativo",
                        disciplinas: ["Pintura libre", "Técnica húmedo sobre húmedo", "Arte del azar"],
                        inteligencias: ["Corporal-kinestésica", "Espacial", "Naturalista"],
                        pasosDocente: [
                            "Prepara materiales: Organiza pinturas, pinceles y agua en estaciones de trabajo",
                            "Demuestra técnica: Modela cómo crear mancha sin intención de forma específica",
                            "Establece regla fundamental: 'No se puede borrar ni modificar la mancha inicial'",
                            "Supervisa sin dirigir: Circula observando pero sin sugerir formas o correcciones",
                            "Valida todas las manchas: Celebra la diversidad de resultados obtenidos"
                        ],
                        consignasEstudiantes: [
                            "Vamos a crear manchas sin pensar en qué van a ser",
                            "Dejen que la pintura fluya libremente",
                            "Recuerden: no podemos borrar ni cambiar la mancha",
                            "Cada mancha es perfecta tal como quedó"
                        ]
                    },
                    {
                        nombre: "Transformación en Personaje",
                        tiempo: "40 min",
                        descripcion: "Desarrollar personaje a partir de la mancha, agregando detalles que respeten la forma original",
                        disciplinas: ["Dibujo imaginativo", "Composición visual", "Desarrollo de personajes"],
                        inteligencias: ["Espacial", "Lógico-matemática", "Intrapersonal"],
                        pasosDocente: [
                            "Guía observación: Invita a mirar las manchas desde diferentes ángulos",
                            "Estimula imaginación: Pregunta '¿Qué ven en su mancha?' sin dirigir respuestas",
                            "Facilita proceso creativo: Permite tiempo suficiente para que emerjan ideas",
                            "Apoya desarrollo: Ofrece materiales adicionales según necesidades",
                            "Documenta proceso: Fotografía diferentes etapas de transformación"
                        ],
                        consignasEstudiantes: [
                            "Miren su mancha desde diferentes ángulos",
                            "¿Qué personaje pueden ver ahí?",
                            "Agreguen los detalles que necesiten para completar su personaje",
                            "Respeten la forma original de la mancha"
                        ]
                    }
                ]
            },
            {
                numero: 2,
                titulo: "Narrativa del Personaje",
                duracion: "1h30",
                fases: [
                    {
                        nombre: "Construcción de Historia",
                        tiempo: "45 min",
                        descripcion: "Crear narrativa completa del personaje desarrollando características y contexto",
                        disciplinas: ["Escritura creativa", "Narrativa", "Desarrollo de personajes"],
                        inteligencias: ["Lingüística", "Intrapersonal", "Lógico-matemática"],
                        pasosDocente: [
                            "Proporciona guía narrativa: Ofrece preguntas disparadoras para desarrollo del personaje",
                            "Facilita escritura creativa: Circula apoyando sin dirigir las historias",
                            "Valida todas las narrativas: Acepta historias fantásticas, realistas o abstractas",
                            "Documenta diversidad: Registra la variedad de personajes creados"
                        ],
                        consignasEstudiantes: [
                            "Ahora vamos a conocer a nuestro personaje",
                            "¿Cómo se llama? ¿Dónde vive? ¿Qué le gusta hacer?",
                            "Escriban la historia de su personaje",
                            "Pueden ser tan creativos como quieran"
                        ]
                    },
                    {
                        nombre: "Presentación y Celebración",
                        tiempo: "45 min",
                        descripcion: "Compartir personajes creados y reflexionar sobre el proceso de transformación del error",
                        disciplinas: ["Oratoria", "Expresión oral", "Reflexión metacognitiva"],
                        inteligencias: ["Lingüística", "Interpersonal", "Intrapersonal"],
                        pasosDocente: [
                            "Organiza espacio de presentación: Prepara área donde todos puedan ver y escuchar",
                            "Establece ambiente respetuoso: Crea normas de escucha activa",
                            "Facilita presentaciones: Invita a compartir sin presionar a quienes prefieren no hacerlo",
                            "Guía reflexión final: Conecta proceso con aprendizaje sobre el error",
                            "Celebra diversidad: Destaca la riqueza de diferentes interpretaciones"
                        ],
                        consignasEstudiantes: [
                            "Vamos a conocer todos los personajes que creamos",
                            "Cada uno puede presentar su personaje si quiere",
                            "Escuchemos con respeto las historias de nuestros compañeros",
                            "¿Qué aprendimos sobre los errores en este proceso?"
                        ]
                    }
                ]
            }
        ]
    },
    2: {
        id: 2,
        titulo: "El Lugar que me Habita",
        emoji: "🏠",
        color: "blue",
        duracion: "2 sesiones de 1h30",
        objetivo: "Reflexionar sobre el error como recurso creativo, explorar la imagen mental de un lugar personal para representarlo visual y textualmente",
        rolError: "Se trabaja a través de la consigna 'No borrar ni eliminar nada', que invita a aceptar cada trazo y palabra como parte válida del proceso creativo, transformando la autocensura en aceptación",
        materiales: [
            "Lápices de colores",
            "Marcadores",
            "Papel bond A4",
            "Goma de borrar (que no se usará)",
            "Reglas",
            "Fichas de escritura"
        ],
        sesiones: [
            {
                numero: 1,
                titulo: "Exploración del Lugar Personal",
                duracion: "1h30",
                fases: [
                    {
                        nombre: "Visualización del Lugar",
                        tiempo: "20 min",
                        descripcion: "Evocar imagen mental de un lugar significativo personal",
                        disciplinas: ["Meditación creativa", "Visualización guiada", "Introspección"],
                        inteligencias: ["Intrapersonal", "Espacial", "Naturalista"],
                        pasosDocente: [
                            "Prepara ambiente relajado: Reduce estímulos visuales y sonoros",
                            "Guía visualización: Conduce ejercicio de imaginación guiada",
                            "Facilita introspección: Invita a conectar con emociones del lugar",
                            "Respeta ritmos individuales: Permite tiempo suficiente para cada estudiante"
                        ],
                        consignasEstudiantes: [
                            "Cierren los ojos y respiren profundo",
                            "Piensen en un lugar que sea muy especial para ustedes",
                            "¿Qué colores ven? ¿Qué texturas sienten?",
                            "Guarden esa imagen en su memoria"
                        ]
                    },
                    {
                        nombre: "Dibujo Libre del Lugar",
                        tiempo: "45 min",
                        descripcion: "Representar visualmente el lugar sin borrar ni corregir",
                        disciplinas: ["Dibujo libre", "Representación espacial", "Arte intuitivo"],
                        inteligencias: ["Espacial", "Intrapersonal", "Corporal-kinestésica"],
                        pasosDocente: [
                            "Establece regla fundamental: 'No borrar ni eliminar nada'",
                            "Modela aceptación: Demuestra cómo continuar cuando algo 'sale mal'",
                            "Circula sin corregir: Observa procesos sin dirigir resultados",
                            "Valida todos los trazos: Refuerza que cada línea tiene valor"
                        ],
                        consignasEstudiantes: [
                            "Dibujen su lugar especial como lo sienten",
                            "Recuerden: no pueden borrar nada",
                            "Si algo no sale como esperaban, ¡úsenlo!",
                            "Cada trazo es parte de su lugar único"
                        ]
                    },
                    {
                        nombre: "Escritura Descriptiva",
                        tiempo: "25 min",
                        descripcion: "Describir el lugar con palabras, manteniendo la regla de no borrar",
                        disciplinas: ["Escritura descriptiva", "Literatura personal", "Prosa poética"],
                        inteligencias: ["Lingüística", "Intrapersonal", "Espacial"],
                        pasosDocente: [
                            "Proporciona preguntas guía: Ofrece disparadores para la escritura",
                            "Mantiene regla de no borrar: Recuerda que las 'equivocaciones' se conservan",
                            "Facilita expresión personal: Acepta diferentes estilos de escritura",
                            "Documenta proceso: Observa cómo manejan los 'errores' escritos"
                        ],
                        consignasEstudiantes: [
                            "Ahora describan su lugar con palabras",
                            "Si se equivocan escribiendo, no borren, continúen",
                            "Cuéntenme qué se siente estar en ese lugar",
                            "Sus palabras pueden ser poéticas, simples o como quieran"
                        ]
                    }
                ]
            }
        ]
    },
    3: {
        id: 3,
        titulo: "Del Retrato Colectivo a la Resignificación",
        emoji: "👥",
        color: "green",
        duracion: "3 sesiones de 1h30",
        objetivo: "Identificar y reinterpretar el 'error' en el proceso creativo a través de observación y trabajo grupal, resignificándolo de un detalle no deseado a elemento central valioso",
        rolError: "El error evoluciona: primero como frustración al no dibujar 'perfecto', luego como protagonista deliberado de pintura abstracta, finalmente como chispa para interpretación y creación colaborativa",
        materiales: [
            "Papel bond grande",
            "Pinturas témpera",
            "Pinceles variados",
            "Agua",
            "Toallas",
            "Marcadores",
            "Fichas para interpretación",
            "Cinta adhesiva"
        ],
        sesiones: [
            {
                numero: 1,
                titulo: "Retrato Colectivo",
                duracion: "1h30",
                fases: [
                    {
                        nombre: "Preparación del Retrato",
                        tiempo: "20 min",
                        descripcion: "Organizar grupos y preparar materiales para el retrato colectivo",
                        disciplinas: ["Organización grupal", "Retrato", "Observación"],
                        inteligencias: ["Interpersonal", "Espacial", "Corporal-kinestésica"],
                        pasosDocente: [
                            "Forma grupos de 4-5 estudiantes",
                            "Explica que van a dibujarse mutuamente",
                            "Distribuye materiales por grupo",
                            "Establece la regla: 'Aceptar lo que salga'"
                        ],
                        consignasEstudiantes: [
                            "Vamos a dibujarnos entre nosotros",
                            "Cada uno dibujará a un compañero",
                            "No importa si no sale 'perfecto'",
                            "Lo importante es el proceso, no el resultado"
                        ]
                    },
                    {
                        nombre: "Dibujo del Retrato",
                        tiempo: "50 min",
                        descripcion: "Realizar retratos mutuos aceptando las 'imperfecciones' como parte del proceso",
                        disciplinas: ["Retrato", "Dibujo de observación", "Arte colaborativo"],
                        inteligencias: ["Espacial", "Interpersonal", "Corporal-kinestésica"],
                        pasosDocente: [
                            "Circula observando sin corregir",
                            "Refuerza la aceptación de 'errores'",
                            "Documenta reacciones ante lo inesperado",
                            "Celebra la diversidad de estilos"
                        ],
                        consignasEstudiantes: [
                            "Dibujen a su compañero como lo ven",
                            "Si algo no sale como esperaban, ¡está bien!",
                            "Cada trazo tiene su valor",
                            "Disfruten el proceso de crear"
                        ]
                    }
                ]
            }
        ]
    },
    4: {
        id: 4,
        titulo: "Historias que Nacen del Error",
        emoji: "🖼️",
        color: "orange",
        duracion: "1 sesión de 1h30",
        objetivo: "Construir una exposición colectiva que dé cierre al proceso, permitiendo reflexionar sobre el viaje creativo y valorar el cambio en la percepción del error",
        rolError: "El error culmina su transformación: deja de ser concepto para convertirse en logro visible. Es la prueba tangible del aprendizaje, pieza central de exposición que demuestra cómo lo imperfecto puede generar belleza y conexión",
        materiales: [
            "Todas las obras creadas en actividades anteriores",
            "Papel para títulos",
            "Marcadores",
            "Cinta adhesiva",
            "Pintura lavable para huellas",
            "Papel grande para huellas finales"
        ],
        sesiones: [
            {
                numero: 1,
                titulo: "Exposición y Celebración",
                duracion: "1h30",
                fases: [
                    {
                        nombre: "Montaje de la Exposición",
                        tiempo: "60 min",
                        descripcion: "Organizar todas las obras creadas en una exposición colectiva",
                        disciplinas: ["Curaduría", "Montaje expositivo", "Diseño espacial"],
                        inteligencias: ["Espacial", "Interpersonal", "Lógico-matemática"],
                        pasosDocente: [
                            "Facilita proceso democrático para organizar obras",
                            "Ayuda a crear narrativa visual coherente",
                            "Invita a escribir títulos para las obras",
                            "Documenta el proceso de curaduría grupal"
                        ],
                        consignasEstudiantes: [
                            "Vamos a crear nuestra propia exposición",
                            "Organicemos todas nuestras obras",
                            "Cada obra cuenta una historia sobre el error",
                            "Decidamos juntos cómo mostrar nuestro aprendizaje"
                        ]
                    },
                    {
                        nombre: "Reflexión Final",
                        tiempo: "30 min",
                        descripcion: "Reflexionar sobre el cambio de percepción del error a lo largo del proceso",
                        disciplinas: ["Metacognición", "Ritual simbólico", "Arte corporal"],
                        inteligencias: ["Intrapersonal", "Interpersonal", "Corporal-kinestésica"],
                        pasosDocente: [
                            "Guía reflexión sobre el proceso completo",
                            "Compara ideas iniciales con finales sobre el error",
                            "Celebra el crecimiento individual y grupal",
                            "Cierra con ritual simbólico (huellas finales)"
                        ],
                        consignasEstudiantes: [
                            "¿Cómo cambió lo que pensaban sobre los errores?",
                            "¿Qué descubrieron en este viaje creativo?",
                            "Cada error se convirtió en algo hermoso",
                            "Dejemos nuestras huellas como símbolo de lo aprendido"
                        ]
                    }
                ]
            }
        ]
    }
};

// 🎛️ Variables de estado de la guía
let actividadActual = null;
let sesionActual = null;
let timerInterval = null;
let tiempoRestante = 0;

// 🚀 FUNCIONES PRINCIPALES DE LA GUÍA INTERACTIVA

function mostrarActividadGuia(numeroActividad) {
    console.log(`📖 Mostrando actividad de guía didáctica ${numeroActividad}`);
    
    actividadActual = ACTIVIDADES_LATERALIDADES[numeroActividad];
    if (!actividadActual) {
        console.error(`Actividad ${numeroActividad} no encontrada`);
        return;
    }
    
    // Ocultar vista inicial y mostrar contenido de actividad
    const panelInicial = document.getElementById('panel-inicial');
    const contenidoActividad = document.getElementById('contenido-actividad');
    
    if (panelInicial) panelInicial.classList.add('hidden');
    if (contenidoActividad) {
        contenidoActividad.classList.remove('hidden');
        contenidoActividad.innerHTML = generarHTMLActividad(actividadActual);
    }
}

// Exportar la función globalmente con un nombre único
window.mostrarActividadGuia = mostrarActividadGuia;

function generarHTMLActividad(actividad) {
    return `
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Header de la actividad -->
            <div class="bg-gradient-to-r from-${actividad.color}-500 to-${actividad.color}-600 text-white p-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="text-6xl">${actividad.emoji}</div>
                        <div>
                            <h2 class="text-3xl font-bold">${actividad.titulo}</h2>
                            <p class="text-${actividad.color}-100 text-lg">${actividad.duracion}</p>
                        </div>
                    </div>
                    <button onclick="volverASeleccion()" class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-all">
                        ← Volver
                    </button>
                </div>
                <div class="mt-6">
                    <p class="text-${actividad.color}-50 text-lg leading-relaxed">${actividad.objetivo}</p>
                </div>
            </div>
            
            <!-- Contenido de la actividad -->
            <div class="p-8">
                <!-- Rol del Error -->
                <div class="bg-${actividad.color}-50 rounded-lg p-6 mb-6">
                    <h3 class="font-bold text-lg mb-3 flex items-center gap-2 text-${actividad.color}-700">
                        <span class="material-symbols-outlined">psychology</span>
                        🎯 Rol del Error en esta Actividad
                    </h3>
                    <p class="text-${actividad.color}-800">${actividad.rolError}</p>
                </div>
                
                <!-- Materiales necesarios -->
                <div class="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined">inventory</span>
                        📦 Materiales Necesarios
                    </h3>
                    <div class="grid md:grid-cols-2 gap-2">
                        ${actividad.materiales.map(material => `
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-${actividad.color}-500 text-sm">check_circle</span>
                                <span class="text-sm">${material}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Sesiones y Fases -->
                ${actividad.sesiones ? actividad.sesiones.map(sesion => `
                    <div class="border border-gray-200 rounded-lg mb-6">
                        <div class="bg-${actividad.color}-100 p-4 rounded-t-lg">
                            <h3 class="text-xl font-bold text-${actividad.color}-800">
                                📖 Sesión ${sesion.numero}: ${sesion.titulo}
                            </h3>
                            <p class="text-${actividad.color}-600">⏱️ Duración: ${sesion.duracion}</p>
                        </div>
                        <div class="p-6">
                            ${sesion.fases.map((fase, index) => `
                                <div class="mb-6 ${index < sesion.fases.length - 1 ? 'border-b border-gray-100 pb-6' : ''}">
                                    <div class="bg-white border border-${actividad.color}-200 rounded-lg p-4 mb-4">
                                        <h4 class="text-lg font-bold text-${actividad.color}-700 mb-2">
                                            ${index + 1}. ${fase.nombre}
                                        </h4>
                                        <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <span class="bg-${actividad.color}-100 px-2 py-1 rounded">⏱️ ${fase.tiempo}</span>
                                        </div>
                                        <p class="text-gray-700 mb-4">${fase.descripcion}</p>
                                        
                                        <!-- Disciplinas e Inteligencias -->
                                        <div class="grid md:grid-cols-2 gap-4 mb-4">
                                            <div class="bg-purple-50 rounded p-3">
                                                <h6 class="font-bold text-purple-700 text-sm mb-2 flex items-center gap-1">
                                                    🎨 Disciplinas Artísticas
                                                </h6>
                                                <div class="flex flex-wrap gap-1">
                                                    ${fase.disciplinas ? fase.disciplinas.map(disciplina => `
                                                        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">${disciplina}</span>
                                                    `).join('') : '<span class="text-gray-500 text-xs">No especificadas</span>'}
                                                </div>
                                            </div>
                                            <div class="bg-orange-50 rounded p-3">
                                                <h6 class="font-bold text-orange-700 text-sm mb-2 flex items-center gap-1">
                                                    🧠 Inteligencias Múltiples
                                                </h6>
                                                <div class="flex flex-wrap gap-1">
                                                    ${fase.inteligencias ? fase.inteligencias.map(inteligencia => `
                                                        <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">${inteligencia}</span>
                                                    `).join('') : '<span class="text-gray-500 text-xs">No especificadas</span>'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="grid md:grid-cols-2 gap-4">
                                        <!-- Pasos del Docente -->
                                        <div class="bg-blue-50 rounded-lg p-4">
                                            <h5 class="font-bold text-blue-700 mb-3 flex items-center gap-2">
                                                <span class="material-symbols-outlined">person</span>
                                                👨‍🏫 Pasos del Docente
                                            </h5>
                                            <ul class="space-y-2">
                                                ${fase.pasosDocente.map(paso => `
                                                    <li class="text-sm text-blue-800 flex items-start gap-2">
                                                        <span class="material-symbols-outlined text-blue-500 text-xs mt-1">arrow_right</span>
                                                        <span>${paso}</span>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                        
                                        <!-- Consignas para Estudiantes -->
                                        <div class="bg-green-50 rounded-lg p-4">
                                            <h5 class="font-bold text-green-700 mb-3 flex items-center gap-2">
                                                <span class="material-symbols-outlined">chat</span>
                                                💬 Consignas para Estudiantes
                                            </h5>
                                            <ul class="space-y-2">
                                                ${fase.consignasEstudiantes.map(consigna => `
                                                    <li class="text-sm text-green-800 flex items-start gap-2">
                                                        <span class="material-symbols-outlined text-green-500 text-xs mt-1">format_quote</span>
                                                        <span class="italic">"${consigna}"</span>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('') : `
                    <div class="text-center py-12 bg-${actividad.color}-50 rounded-lg">
                        <div class="text-6xl mb-4">${actividad.emoji}</div>
                        <h3 class="text-2xl font-bold text-${actividad.color}-700 mb-2">${actividad.titulo}</h3>
                        <p class="text-${actividad.color}-600">Información detallada disponible en el documento guía</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function volverASeleccion() {
    const panelInicial = document.getElementById('panel-inicial');
    const contenidoActividad = document.getElementById('contenido-actividad');
    
    if (panelInicial) panelInicial.classList.remove('hidden');
    if (contenidoActividad) contenidoActividad.classList.add('hidden');
    
    actividadActual = null;
}

// Exportar funciones globalmente
window.volverASeleccion = volverASeleccion;
window.generarRubrica = generarRubrica;

// 📊 GENERADOR DE RÚBRICAS DE EVALUACIÓN

const RUBRICAS_EVALUACION = {
    actividad1: {
        titulo: "RÚBRICA DE EVALUACIÓN - ACTIVIDAD 1: EL HACER DEL AZAR",
        objetivo: "Evaluar la capacidad de aceptar y transformar el 'error' en recurso creativo a través de la creación de personajes",
        criterios: [
            {
                aspecto: "Aceptación del Error Inicial",
                descripcion: "Capacidad para aceptar la mancha sin intentar modificarla",
                niveles: {
                    excelente: "Acepta completamente la mancha y la celebra como punto de partida único",
                    satisfactorio: "Acepta la mancha aunque muestra dudas iniciales",
                    endesarrollo: "Muestra resistencia pero logra trabajar con la mancha",
                    inicial: "Intenta modificar o rechazar la mancha constantemente"
                }
            },
            {
                aspecto: "Transformación Creativa",
                descripcion: "Habilidad para desarrollar personaje original a partir de la mancha",
                niveles: {
                    excelente: "Crea personaje complejo, original y coherente con múltiples detalles",
                    satisfactorio: "Desarrolla personaje reconocible con características definidas",
                    endesarrollo: "Crea elementos básicos reconocibles del personaje",
                    inicial: "Tiene dificultad para ver formas en la mancha"
                }
            },
            {
                aspecto: "Narrativa del Personaje",
                descripcion: "Capacidad para construir historia coherente y detallada",
                niveles: {
                    excelente: "Construye narrativa rica, detallada y emocionalmente conectada",
                    satisfactorio: "Desarrolla historia coherente con elementos básicos completos",
                    endesarrollo: "Identifica características básicas y algunos elementos narrativos",
                    inicial: "Presenta ideas fragmentadas sin conexión narrativa"
                }
            },
            {
                aspecto: "Reflexión Metacognitiva",
                descripcion: "Conciencia sobre el proceso creativo y cambio de perspectiva",
                niveles: {
                    excelente: "Articula claramente la transformación de su perspectiva sobre el error",
                    satisfactorio: "Reconoce algunos cambios en su forma de ver los errores",
                    endesarrollo: "Identifica aspectos positivos del proceso pero con poca profundidad",
                    inicial: "Poca conciencia sobre el aprendizaje obtenido"
                }
            }
        ]
    },
    actividad2: {
        titulo: "RÚBRICA DE EVALUACIÓN - ACTIVIDAD 2: EL LUGAR QUE ME HABITA",
        objetivo: "Evaluar la aplicación de la regla 'no borrar' y la transformación de la autocensura en aceptación creativa",
        criterios: [
            {
                aspecto: "Aplicación de la Regla 'No Borrar'",
                descripcion: "Cumplimiento y internalización de la regla fundamental",
                niveles: {
                    excelente: "Integra naturalmente la regla y la usa como herramienta creativa",
                    satisfactorio: "Cumple la regla consistentemente con recordatorios ocasionales",
                    endesarrollo: "Cumple la regla pero muestra resistencia o incomodidad",
                    inicial: "Intenta borrar repetidamente o evita la actividad"
                }
            },
            {
                aspecto: "Expresión Visual del Lugar",
                descripcion: "Capacidad para representar visualmente un lugar personal significativo",
                niveles: {
                    excelente: "Representa el lugar con detalles significativos y expresión emocional",
                    satisfactorio: "Crea representación reconocible con elementos personales",
                    endesarrollo: "Incluye elementos básicos del lugar con poca personalización",
                    inicial: "Representación genérica sin conexión personal evidente"
                }
            },
            {
                aspecto: "Escritura Descriptiva",
                descripcion: "Habilidad para describir el lugar con riqueza sensorial y emocional",
                niveles: {
                    excelente: "Escritura rica en detalles sensoriales y conexión emocional profunda",
                    satisfactorio: "Descripción clara con algunos elementos sensoriales y emocionales",
                    endesarrollo: "Descripción básica con limitados elementos descriptivos",
                    inicial: "Escritura superficial sin profundidad descriptiva"
                }
            },
            {
                aspecto: "Gestión de 'Errores' Escritos",
                descripcion: "Manejo de equivocaciones en la escritura sin borrar",
                niveles: {
                    excelente: "Incorpora 'errores' como parte natural del proceso creativo",
                    satisfactorio: "Acepta errores y continúa sin mayor dificultad",
                    endesarrollo: "Acepta errores pero con visible incomodidad",
                    inicial: "Muestra frustración significativa ante errores escritos"
                }
            }
        ]
    },
    actividad3: {
        titulo: "RÚBRICA DE EVALUACIÓN - ACTIVIDAD 3: RETRATO COLECTIVO A LA RESIGNIFICACIÓN",
        objetivo: "Evaluar la resignificación del error como elemento central valioso en el proceso colaborativo",
        criterios: [
            {
                aspecto: "Colaboración en el Retrato",
                descripcion: "Participación activa y respetuosa en el proceso de retrato mutuo",
                niveles: {
                    excelente: "Participa activamente, respeta a compañeros y enriquece la experiencia grupal",
                    satisfactorio: "Colabora efectivamente con buena disposición hacia el grupo",
                    endesarrollo: "Participa pero con limitada interacción o contribución",
                    inicial: "Muestra dificultad para trabajar en grupo o se mantiene pasivo"
                }
            },
            {
                aspecto: "Aceptación de la 'Imperfección'",
                descripcion: "Manejo de resultados no esperados en los retratos",
                niveles: {
                    excelente: "Celebra y encuentra valor en las características 'imperfectas' del retrato",
                    satisfactorio: "Acepta las imperfecciones sin mayor resistencia",
                    endesarrollo: "Muestra incomodidad inicial pero logra aceptar el resultado",
                    inicial: "Rechaza o critica negativamente las imperfecciones"
                }
            },
            {
                aspecto: "Interpretación Creativa",
                descripcion: "Capacidad para reinterpretar y encontrar nuevos significados",
                niveles: {
                    excelente: "Genera interpretaciones originales y profundas de las obras",
                    satisfactorio: "Propone interpretaciones coherentes y creativas",
                    endesarrollo: "Ofrece interpretaciones básicas con algún elemento creativo",
                    inicial: "Dificultad para generar interpretaciones más allá de lo literal"
                }
            },
            {
                aspecto: "Resignificación del Error",
                descripcion: "Transformación del concepto de error de problema a oportunidad",
                niveles: {
                    excelente: "Demuestra comprensión profunda del error como catalizador creativo",
                    satisfactorio: "Reconoce el valor positivo del error en el proceso creativo",
                    endesarrollo: "Identifica algunos aspectos positivos del error",
                    inicial: "Mantiene visión tradicional negativa del error"
                }
            }
        ]
    },
    actividad4: {
        titulo: "RÚBRICA DE EVALUACIÓN - ACTIVIDAD 4: HISTORIAS QUE NACEN DEL ERROR",
        objetivo: "Evaluar la capacidad de síntesis, reflexión final y celebración del proceso de transformación completo",
        criterios: [
            {
                aspecto: "Participación en Montaje",
                descripcion: "Contribución activa en la organización de la exposición colectiva",
                niveles: {
                    excelente: "Lidera y enriquece el proceso de curaduría con ideas valiosas",
                    satisfactorio: "Participa activamente en decisiones y organización",
                    endesarrollo: "Colabora en el montaje pero con limitada iniciativa",
                    inicial: "Participación pasiva o resistencia al trabajo colaborativo"
                }
            },
            {
                aspecto: "Reflexión Final sobre el Proceso",
                descripcion: "Capacidad para articular el aprendizaje y cambio de perspectiva",
                niveles: {
                    excelente: "Articula claramente la transformación completa de su perspectiva sobre el error",
                    satisfactorio: "Expresa cambios significativos en su comprensión del error",
                    endesarrollo: "Identifica algunos cambios pero con poca profundidad",
                    inicial: "Poca conciencia sobre el cambio de perspectiva logrado"
                }
            },
            {
                aspecto: "Valoración del Trabajo Colectivo",
                descripcion: "Reconocimiento y celebración del proceso grupal completo",
                niveles: {
                    excelente: "Demuestra profundo aprecio por el proceso colectivo y individual",
                    satisfactorio: "Valora el trabajo conjunto y reconoce contribuciones",
                    endesarrollo: "Reconoce algunos aspectos valiosos del proceso grupal",
                    inicial: "Enfoque principalmente individual sin valorar lo colectivo"
                }
            },
            {
                aspecto: "Presentación y Comunicación",
                descripcion: "Habilidad para presentar y comunicar el aprendizaje obtenido",
                niveles: {
                    excelente: "Presenta con confianza, claridad y conexión emocional profunda",
                    satisfactorio: "Comunica efectivamente sus ideas y experiencias",
                    endesarrollo: "Presenta ideas básicas pero con alguna dificultad comunicativa",
                    inicial: "Dificultad significativa para expresar o comunicar experiencias"
                }
            }
        ]
    }
};

function generarRubrica(tipoActividad) {
    const rubrica = RUBRICAS_EVALUACION[tipoActividad];
    if (!rubrica) return;
    
    // Crear nueva instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuraciones básicas
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const usableWidth = pageWidth - (margin * 2);
    let currentY = margin;
    
    // Función para agregar texto con salto de línea automático
    function addWrappedText(text, x, y, maxWidth, fontSize = 12) {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * fontSize * 0.4);
    }
    
    // Header
    doc.setFillColor(99, 102, 241);
    doc.rect(margin, currentY, usableWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    currentY = addWrappedText(rubrica.titulo, margin + 5, currentY + 15, usableWidth - 10, 16);
    
    doc.setFontSize(12);
    currentY = addWrappedText('Laboratorio Creativo LATERALIDADES', margin + 5, currentY + 5, usableWidth - 10, 12);
    currentY += 15;
    
    // Objetivo
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, currentY, usableWidth, 25, 'F');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('OBJETIVO DE EVALUACION:', margin + 5, currentY + 8);
    doc.setFont(undefined, 'normal');
    currentY = addWrappedText(rubrica.objetivo, margin + 5, currentY + 15, usableWidth - 10, 10);
    currentY += 15;
    
    // Información del estudiante
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text('Estudiante: ________________________', margin, currentY);
    doc.text('Fecha: ___________', margin + 120, currentY);
    currentY += 8;
    doc.text('Docente: ________________________', margin, currentY);
    doc.text('Sesion: ___________', margin + 120, currentY);
    currentY += 20;
    
    // Criterios de evaluación
    rubrica.criterios.forEach((criterio, index) => {
        // Verificar si necesitamos nueva página
        if (currentY > 220) {
            doc.addPage();
            currentY = margin;
        }
        
        // Header del criterio
        doc.setFillColor(99, 102, 241);
        doc.rect(margin, currentY, usableWidth, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.text(`${index + 1}. ${criterio.aspecto}`, margin + 3, currentY + 8);
        currentY += 15;
        
        // Descripción
        doc.setTextColor(0, 0, 0);
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, currentY, usableWidth, 10, 'F');
        doc.setFont(undefined, 'italic');
        doc.setFontSize(9);
        currentY = addWrappedText(criterio.descripcion, margin + 3, currentY + 6, usableWidth - 6, 9);
        currentY += 5;
        
        // Niveles de evaluación
        const niveles = [
            { key: 'excelente', label: 'EXCELENTE (4 puntos)', color: [220, 252, 231] },
            { key: 'satisfactorio', label: 'SATISFACTORIO (3 puntos)', color: [254, 243, 199] },
            { key: 'endesarrollo', label: 'EN DESARROLLO (2 puntos)', color: [254, 215, 170] },
            { key: 'inicial', label: 'INICIAL (1 punto)', color: [254, 202, 202] }
        ];
        
        niveles.forEach(nivel => {
            doc.setFillColor(nivel.color[0], nivel.color[1], nivel.color[2]);
            doc.rect(margin, currentY, usableWidth, 12, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(9);
            doc.text(nivel.label, margin + 3, currentY + 5);
            doc.text('[ ]', margin + usableWidth - 15, currentY + 5);
            doc.setFont(undefined, 'normal');
            currentY = addWrappedText(criterio.niveles[nivel.key], margin + 3, currentY + 9, usableWidth - 20, 8);
            currentY += 3;
        });
        
        currentY += 5;
    });
    
    // Verificar si necesitamos nueva página para el resumen
    if (currentY > 200) {
        doc.addPage();
        currentY = margin;
    }
    
    // Tabla de resumen
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('RESUMEN DE EVALUACION', margin, currentY);
    currentY += 15;
    
    // Headers de tabla
    doc.setFillColor(99, 102, 241);
    doc.rect(margin, currentY, usableWidth, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Criterio', margin + 2, currentY + 7);
    doc.text('Puntuacion', margin + usableWidth - 25, currentY + 7);
    currentY += 12;
    
    // Filas de criterios
    rubrica.criterios.forEach((criterio, index) => {
        doc.setFillColor(index % 2 === 0 ? 249 : 255, index % 2 === 0 ? 250 : 255, index % 2 === 0 ? 251 : 255);
        doc.rect(margin, currentY, usableWidth, 8, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text(criterio.aspecto, margin + 2, currentY + 5);
        doc.text('___/4', margin + usableWidth - 25, currentY + 5);
        currentY += 8;
    });
    
    // Total
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, currentY, usableWidth, 10, 'F');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL', margin + 2, currentY + 7);
    doc.text(`___/${rubrica.criterios.length * 4} puntos (___%)`, margin + usableWidth - 60, currentY + 7);
    currentY += 20;
    
    // Observaciones
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('OBSERVACIONES ADICIONALES:', margin, currentY);
    currentY += 10;
    
    // Líneas para observaciones
    for (let i = 0; i < 5; i++) {
        doc.line(margin, currentY, margin + usableWidth, currentY);
        currentY += 8;
    }
    
    currentY += 10;
    
    // Firmas
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.line(margin, currentY, margin + 60, currentY);
    doc.line(margin + 110, currentY, margin + 170, currentY);
    doc.text('Firma del Docente', margin, currentY + 8);
    doc.text('Fecha de Evaluacion', margin + 110, currentY + 8);
    
    // Footer
    currentY += 25;
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('Laboratorio Creativo LATERALIDADES - Rubrica de Evaluacion Formativa', margin, currentY);
    
    // Descargar el PDF
    const nombreArchivo = `Rubrica_${tipoActividad.replace('actividad', 'Actividad_')}_LATERALIDADES.pdf`;
    doc.save(nombreArchivo);
}

// 🎬 Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Guía Didáctica LATERALIDADES cargada correctamente');
});