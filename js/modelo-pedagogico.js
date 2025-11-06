// 🎨 Modelo Pedagógico de LATERALIDADES - Sistema Interactivo
// Gestión completa de las 4 categorías con fundamentos teóricos académicos reales

// Configuración completa del modelo pedagógico basada en análisis categorial (Gaete)
const MODELO_PEDAGOGICO = {
    "arte-territorio": {
        id: "arte-territorio",
        titulo: "Arte como Mediador y Territorio",
        subtitulo: "Método y Campo de Acción",
        icono: "🎨",
        color: "from-purple-500 to-pink-500",
        colorBg: "bg-purple-50 border-purple-200",
        descripcion: "El arte no solo como disciplina, sino como campo de acción y lenguaje mediador esencial para la construcción de conocimiento",
        concepto: "Este eje establece el arte como el territorio libre de la presión de lo correcto, donde la experimentación y la reestructuración son la norma, priorizando el proceso por encima de la estética del producto.",
        subcategorias: {
            "proceso-construccion": {
                titulo: "Arte como Proceso de Construcción de Conocimiento",
                descripcion: "La praxis artística como fundamento del aprender haciendo y la experiencia reflexiva",
                detalles: [
                    "La Praxis se establece como Proceso y Experiencia fundamentando el Aprender Haciendo, facilitando el aprendizaje experiencial y reflexivo",
                    "Se interpreta el arte como el territorio libre de la presión de lo correcto, donde la experimentación y la reestructuración son la norma",
                    "Se prioriza el proceso por encima de la estética del producto, siguiendo la visión educativa del conocimiento estético"
                ],
                ejemplos: [
                    "Talleres donde el proceso de creación es más valorado que el resultado final",
                    "Espacios de experimentación sin juicios sobre 'lo correcto'",
                    "Reflexión sobre el proceso creativo como parte integral del aprendizaje",
                    "Documentación del proceso mediante bitácoras y diarios reflexivos"
                ],
                fundamentoTeorico: "John Dewey: Experiencia y Reconstrucción Continua. Acaso & Megías: Art Thinking, Prioridad del Proceso. Elliot Eisner: Conocimiento Estético. Camitzer, L.: Crítica a la instrumentalización del arte. Validación Empírica: Diarios de Reflexión y Observación Participante."
            },
            "espacio-simbolico": {
                titulo: "El Aula como Territorio Simbólico y Espacio de Experimentación",
                descripcion: "El laboratorio creativo como entorno controlado para el aprendizaje por descubrimiento",
                detalles: [
                    "El Laboratorio Creativo es el entorno controlado para el Aprendizaje por Descubrimiento",
                    "El Arte actúa como mediador entre el pensamiento interno y la manifestación externa",
                    "Facilita el desahogo del error en un código no-punitivo mediante lenguajes visual, verbal y corporal",
                    "Diseño del espacio que favorece la experimentación libre y segura"
                ],
                ejemplos: [
                    "Aulas configuradas como laboratorios de experimentación",
                    "Espacios donde múltiples lenguajes convergen (visual, verbal, corporal)",
                    "Ambientes que permiten el error sin consecuencias punitivas",
                    "Zonas de reflexión y espacios de creación diferenciados"
                ],
                fundamentoTeorico: "Rodríguez: Imaginación y Aprendizaje por Descubrimiento. Torres: Lenguaje Interdisciplinario. Concepto de territorio simbólico como espacio de significación y experimentación libre."
            }
        }
    },
    "artista-educador": {
        id: "artista-educador",
        titulo: "Artista-Educador e Interdisciplinariedad",
        subtitulo: "Dimensión Relacional y Mediadora",
        icono: "👨‍🏫",
        color: "from-blue-500 to-cyan-500",
        colorBg: "bg-blue-50 border-blue-200",
        descripcion: "La figura profesional híbrida que ejecuta el modelo y la estrategia didáctica para la inclusión y el diálogo de saberes",
        concepto: "Define la figura híbrida del Artista-Educador como garantía metodológica, quien traduce la experiencia estética en aprendizaje significativo, gestionando la incertidumbre del error.",
        subcategorias: {
            "mediador-creativo": {
                titulo: "El Docente como Mediador Creativo",
                descripcion: "La figura híbrida del Artista-Educador como traductor de experiencias estéticas",
                detalles: [
                    "La figura híbrida del Artista-Educador es la garantía metodológica, traduciendo la experiencia estética en aprendizaje significativo",
                    "Su rol principal es ser un promotor de la Pedagogía Visual, diseñando ambientes y secuencias que fuercen la contingencia",
                    "Gestiona la incertidumbre del error como herramienta pedagógica transformadora",
                    "Desarrolla práctica reflexiva sobre su propio rol como mediador"
                ],
                ejemplos: [
                    "Docentes que participan en el proceso creativo junto a los estudiantes",
                    "Diseño de secuencias didácticas que integran contingencia e imprevisto",
                    "Mediación visual como estrategia principal de enseñanza",
                    "Reflexión constante sobre la práctica pedagógica artística"
                ],
                fundamentoTeorico: "Abara/Higueras: Identidad del Artista-Educador y práctica reflexiva. Elliot Eisner: Pedagogía Visual. Díaz-Barriga: Guía para la Elaboración de Secuencias. Concepto de mediación creativa como traducción de experiencias estéticas."
            },
            "interdisciplinariedad": {
                titulo: "Interdisciplinariedad como Práctica Dialógica y Colaborativa",
                descripcion: "El diálogo entre disciplinas y la cooperación como garantía de inclusión",
                detalles: [
                    "La Interdisciplinariedad se manifiesta en el diálogo entre disciplinas (lenguaje visual, verbal y corporal)",
                    "La cooperación y co-creación entre estudiantes asegura la diversidad de enfoques",
                    "La práctica dialógica y colaborativa asegura la inclusión al validar múltiples vías de expresión",
                    "Demuestra que el conocimiento no es lineal y atiende a las Necesidades Educativas Especiales Asociadas (NEAE)"
                ],
                ejemplos: [
                    "Proyectos que integran artes visuales, literatura y expresión corporal",
                    "Trabajos colaborativos que valoran diferentes formas de inteligencia",
                    "Estrategias de inclusión para estudiantes con NEAE",
                    "Diálogo constante entre diferentes saberes disciplinares"
                ],
                fundamentoTeorico: "Freire: Práctica Dialógica. Gardner: Teoría de las Inteligencias Múltiples. Concepto NEAE: Principio de Inclusión y Diversidad. Validación Empírica: Entrevistas a Docentes (percepciones de inclusión)."
            }
        }
    },
    "pedagogia-error": {
        id: "pedagogia-error",
        titulo: "Pedagogías Alternativas y Pedagogía del Error",
        subtitulo: "Estrategia Metodológica",
        icono: "🔄",
        color: "from-green-500 to-emerald-500",
        colorBg: "bg-green-50 border-green-200",
        descripcion: "El corazón del modelo que justifica el error no como fracaso, sino como motor cognitivo y recurso estético necesario",
        concepto: "Justifica el error no como fracaso, sino como el motor cognitivo y recurso estético necesario para el aprendizaje por desequilibrio, fundamentado en metodologías activas y ambiente seguro.",
        subcategorias: {
            "herramientas-metodologicas": {
                titulo: "Herramientas: Metodologías Activas y Ambiente Seguro",
                descripcion: "Posicionamiento en la Escuela Nueva y condiciones éticas para la experimentación",
                detalles: [
                    "El modelo se posiciona en la Escuela Nueva al centrar el foco en el rol activo del estudiante como constructor del conocimiento",
                    "La experiencia como motor primario, rechazando el currículo estandarizado",
                    "El Ambiente Seguro es la condición ética y metodológica sine qua non para resignificar el Error",
                    "Permite la experimentación como práctica emancipadora"
                ],
                ejemplos: [
                    "Metodologías de Aprendizaje Basado en Proyectos adaptadas al arte",
                    "Espacios libres de juicio donde el error es bienvenido",
                    "Prácticas emancipadoras que liberan la creatividad",
                    "Rechazo a evaluaciones estandarizadas en favor de procesos"
                ],
                fundamentoTeorico: "Dewey: Escuela Nueva. Guaita Oña: Metodologías Activas (ABP). Vives Hurtado: Modelos Pedagógicos del Sur (Práctica emancipadora). Concepto de ambiente seguro como condición ética fundamental."
            },
            "error-estrategia": {
                titulo: "El Error como Estrategia Didáctica y Motor Creativo",
                descripcion: "Disolución de jerarquías y activación del pensamiento lateral",
                detalles: [
                    "Disolución intencional de la jerarquía vertical para permitir la libre manifestación del error",
                    "Como estrategia didáctica, funciona como interruptor deliberado que fuerza al estudiante a abandonar el patrón lógico lineal",
                    "Sigue la lógica del Pensamiento Lateral para generar soluciones creativas",
                    "Libera al estudiante de la presión de la autoridad tradicional"
                ],
                ejemplos: [
                    "Actividades donde el error es el punto de partida, no el problema",
                    "Ejercicios de pensamiento lateral aplicados al arte",
                    "Disolución de roles jerárquicos tradicionales docente-estudiante",
                    "Estrategias que rompen patrones lógicos lineales"
                ],
                fundamentoTeorico: "Edward de Bono: Pensamiento Lateral. Paulo Freire: Disolución de la Jerarquía. Howard Gardner: Teoría de las Inteligencias Múltiples. Concepto de error como interruptor cognitivo deliberado."
            },
            "error-oportunidad": {
                titulo: "El Error como Oportunidad Estética y Cognitiva",
                descripcion: "Resignificación del error como recurso estético y motor de desequilibrio cognitivo",
                detalles: [
                    "Se enseña al estudiante a operar con el error como una variable más, considerándolo un recurso estético",
                    "Puede ser intencionalmente integrado en la obra o creación final para enriquecer el resultado",
                    "La activación del pensamiento lateral ocurre cuando el error fuerza al estudiante a buscar soluciones fuera de la lógica lineal",
                    "Genera el desequilibrio cognitivo necesario para el aprendizaje significativo"
                ],
                ejemplos: [
                    "Obras donde los 'errores' se convierten en elementos centrales",
                    "Ejercicios que integran conscientemente el azar y la contingencia",
                    "Procesos que celebran y capitalizan los resultados inesperados",
                    "Reflexiones sobre cómo el error enriquece la creación"
                ],
                fundamentoTeorico: "Astolfi, J-P.: Error como Fuente de Información. De la Torre, S.: El error como estrategia de aprendizaje. Jean Piaget: Desequilibrio Cognitivo. Validación Empírica: Resultados de la Aplicación (evidencia del desequilibrio)."
            },
            "resignificacion-error": {
                titulo: "Resignificación del Error",
                descripcion: "Redefinición del fracaso como oportunidad de adaptación y autoevaluación",
                detalles: [
                    "Redefinición del fracaso como una oportunidad de adaptación, utilizando el desequilibrio cognitivo como fundamento científico",
                    "El modelo utiliza el error como dispositivo de autoevaluación flexible",
                    "Permite al estudiante diagnosticar su propio proceso al entender el error como fuente de información valiosa",
                    "El conflicto generado por el error obliga a la búsqueda de alternativas inesperadas y reestructuración creativa"
                ],
                ejemplos: [
                    "Procesos de autoevaluación basados en el análisis del error",
                    "Estrategias de adaptación creativa ante resultados inesperados",
                    "Uso del conflicto como motor de búsqueda de alternativas",
                    "Reestructuración creativa de problemas a partir del error"
                ],
                fundamentoTeorico: "Jean Piaget: Desequilibrio Cognitivo. Rodríguez: Aprendizaje por Descubrimiento. Astolfi / De la Torre: Error como Fuente de Información y Mecanismo de Evaluación."
            }
        }
    },
    "creatividad-meta": {
        id: "creatividad-meta",
        titulo: "Creatividad como Meta Educativa",
        subtitulo: "Resultado Formativo",
        icono: "🚀",
        color: "from-orange-500 to-red-500",
        colorBg: "bg-orange-50 border-orange-200",
        descripcion: "La creatividad como resultado observable, cultivable y aplicable del modelo, culminando en la formación de un sujeto crítico",
        concepto: "Se enfoca en la Creatividad como el resultado observable, cultivable y aplicable del modelo, que culmina en la formación de un sujeto crítico con alfabetización ampliada y capacidad de transformación social.",
        subcategorias: {
            "pensamiento-critico": {
                titulo: "Creatividad como Forma de Pensamiento Crítico y Reflexivo",
                descripcion: "La creatividad como habilidad transversal cultivable y resultado observable del modelo",
                detalles: [
                    "La Creatividad es la habilidad transversal cultivable y el resultado observable del éxito del modelo",
                    "Se manifiesta en la capacidad de generar múltiples y diversas soluciones (Pensamiento Divergente)",
                    "La Innovación es la aplicación del resultado creativo al contexto social",
                    "Da sentido y relevancia al proceso de aprendizaje"
                ],
                ejemplos: [
                    "Proyectos que demuestran múltiples soluciones creativas",
                    "Aplicación de ideas creativas a problemas reales del contexto",
                    "Desarrollo de pensamiento divergente medible y observable",
                    "Innovaciones que trascienden el aula hacia la comunidad"
                ],
                fundamentoTeorico: "Ken Robinson: Creatividad e Innovación. Edward de Bono: Pensamiento Divergente. Concepto de creatividad como habilidad transversal cultivable y mensurable."
            },
            "construccion-sentido": {
                titulo: "La Construcción de Sentido a través del Pensamiento Creativo",
                descripcion: "Formación de sujetos con alfabetización ampliada y capacidad de transformación social",
                detalles: [
                    "El resultado final es la formación de un sujeto con alfabetización ampliada (cognitiva, emocional, estética)",
                    "Capacita para ejercer la apreciación crítica de su entorno",
                    "La creatividad se proyecta hacia la Transformación Social",
                    "Da relevancia a la praxis artística en la vida comunitaria y en la pedagogía del Sur"
                ],
                ejemplos: [
                    "Estudiantes que desarrollan capacidad de análisis crítico del entorno",
                    "Proyectos artísticos con impacto social comunitario",
                    "Desarrollo de sensibilidad estética aplicada a la vida cotidiana",
                    "Iniciativas que conectan el arte con la transformación social"
                ],
                fundamentoTeorico: "Elliot Eisner: Apreciación Crítica y Estética. Vives Hurtado: Modelos Pedagógicos del Sur. Validación Empírica: Análisis de Producciones Estéticas (evaluación de la originalidad)."
            }
        }
    }
};

// Estado específico del modelo pedagógico
const ModeloState = {
    categoriaActual: null,
    subcategoriaActual: null,
    vistaActual: 'categorias' // 'categorias', 'subcategorias', 'detalle'
};

// 🎨 FUNCIONES DE INICIALIZACIÓN DEL MODELO
function inicializarModeloPedagogico() {
    console.log('🎨 Inicializando Modelo Pedagógico Completo con fundamentos académicos');
    cargarCategoriasPrincipales();
    configurarEventListeners();
}

function cargarCategoriasPrincipales() {
    const container = document.getElementById('categorias-principales');
    if (!container) return;

    const categorias = Object.values(MODELO_PEDAGOGICO);
    
    container.innerHTML = categorias.map(categoria => `
        <div class="categoria-card ${categoria.colorBg} border-2 rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
             onclick="explorarCategoria('${categoria.id}')">
            
            <!-- Icono y título -->
            <div class="text-center mb-4">
                <div class="text-5xl mb-3">${categoria.icono}</div>
                <h3 class="text-xl font-bold text-gray-800 mb-1">${categoria.titulo}</h3>
                <p class="text-sm text-gray-600 font-medium">${categoria.subtitulo}</p>
            </div>
            
            <!-- Descripción -->
            <p class="text-sm text-gray-600 mb-4 text-center leading-relaxed">
                ${categoria.descripcion}
            </p>
            
            <!-- Indicador de subcategorías -->
            <div class="text-center">
                <div class="inline-flex items-center justify-center bg-white/80 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                    <span class="material-symbols-outlined text-sm mr-1">category</span>
                    ${Object.keys(categoria.subcategorias).length} subcategorías
                </div>
            </div>
            
            <!-- Botón de explorar -->
            <div class="mt-4 text-center">
                <div class="inline-flex items-center justify-center bg-gradient-to-r ${categoria.color} text-white px-4 py-2 rounded-lg text-sm font-medium">
                    <span class="material-symbols-outlined text-sm mr-1">explore</span>
                    Explorar Fundamentos
                </div>
            </div>
        </div>
    `).join('');
}

// 🔍 FUNCIONES DE EXPLORACIÓN Y NAVEGACIÓN
function explorarCategoria(categoriaId) {
    console.log(`🔍 Explorando categoría: ${categoriaId}`);
    
    const categoria = MODELO_PEDAGOGICO[categoriaId];
    if (!categoria) return;
    
    ModeloState.categoriaActual = categoriaId;
    ModeloState.vistaActual = 'subcategorias';
    
    // Ocultar categorías principales y mostrar área de exploración
    document.getElementById('categorias-principales').parentElement.style.display = 'none';
    document.getElementById('area-exploracion').classList.remove('hidden');
    
    // Actualizar breadcrumb
    actualizarBreadcrumb(categoria.titulo);
    
    // Cargar vista de subcategorías
    cargarVistaSubcategorias(categoria);
}

function cargarVistaSubcategorias(categoria) {
    const container = document.getElementById('contenido-exploracion');
    
    container.innerHTML = `
        <!-- Header de la categoría con subtítulo -->
        <div class="text-center mb-8">
            <div class="text-6xl mb-4">${categoria.icono}</div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">${categoria.titulo}</h2>
            <p class="text-lg text-gray-600 font-medium mb-4">${categoria.subtitulo}</p>
            <div class="bg-gradient-to-r ${categoria.color} text-white p-6 rounded-xl max-w-4xl mx-auto">
                <p class="text-lg leading-relaxed">${categoria.concepto}</p>
            </div>
        </div>
        
        <!-- Grid de subcategorías -->
        <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            ${Object.entries(categoria.subcategorias).map(([subId, subcategoria]) => `
                <div class="subcategoria-card bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-102 hover:shadow-lg hover:border-gray-300"
                     onclick="explorarSubcategoria('${categoria.id}', '${subId}')">
                    
                    <h3 class="text-xl font-bold text-gray-800 mb-3">${subcategoria.titulo}</h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">${subcategoria.descripcion}</p>
                    
                    <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-500">
                            <span class="material-symbols-outlined text-sm mr-1">info</span>
                            ${subcategoria.detalles.length} lineamientos analíticos
                        </div>
                        <div class="text-primary font-medium text-sm flex items-center">
                            Ver fundamentos teóricos
                            <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Botón para volver -->
        <div class="text-center mt-8">
            <button onclick="volverACategorias()" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium">
                <span class="material-symbols-outlined mr-2">arrow_back</span>
                Volver a las categorías principales
            </button>
        </div>
    `;
}

function explorarSubcategoria(categoriaId, subcategoriaId) {
    console.log(`🔍 Explorando subcategoría: ${categoriaId} -> ${subcategoriaId}`);
    
    const categoria = MODELO_PEDAGOGICO[categoriaId];
    const subcategoria = categoria.subcategorias[subcategoriaId];
    
    ModeloState.subcategoriaActual = subcategoriaId;
    ModeloState.vistaActual = 'detalle';
    
    // Actualizar breadcrumb
    actualizarBreadcrumb(categoria.titulo, subcategoria.titulo);
    
    // Cargar vista de detalle
    cargarVistaDetalle(categoria, subcategoria);
}

function cargarVistaDetalle(categoria, subcategoria) {
    const container = document.getElementById('contenido-exploracion');
    
    container.innerHTML = `
        <!-- Header de la subcategoría -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center bg-gradient-to-r ${categoria.color} text-white px-6 py-3 rounded-full mb-4">
                <span class="text-2xl mr-2">${categoria.icono}</span>
                <span class="font-bold">${categoria.titulo}</span>
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-4">${subcategoria.titulo}</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">${subcategoria.descripcion}</p>
        </div>
        
        <!-- Lineamientos analíticos del modelo -->
        <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span class="material-symbols-outlined mr-2 text-green-600">checklist</span>
                Lineamientos Analíticos del Modelo
            </h3>
            <div class="grid gap-4">
                ${subcategoria.detalles.map((detalle, index) => `
                    <div class="bg-white border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
                        <div class="flex items-start">
                            <div class="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                ${index + 1}
                            </div>
                            <p class="text-gray-700 leading-relaxed">${detalle}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Fundamentos teóricos académicos -->
        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-xl mb-8">
            <h3 class="text-lg font-bold text-blue-800 mb-3 flex items-center">
                <span class="material-symbols-outlined mr-2">school</span>
                Fundamentos Teóricos y Referencias Académicas
            </h3>
            <p class="text-blue-700 leading-relaxed text-sm">${subcategoria.fundamentoTeorico}</p>
        </div>
        
        <!-- Ejemplos prácticos -->
        <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span class="material-symbols-outlined mr-2 text-orange-600">lightbulb</span>
                Ejemplos de Aplicación Práctica
            </h3>
            <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6">
                <div class="grid md:grid-cols-2 gap-4">
                    ${subcategoria.ejemplos.map(ejemplo => `
                        <div class="bg-white rounded-lg p-4 border-l-4 border-orange-400">
                            <p class="text-gray-700 text-sm leading-relaxed">${ejemplo}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- Botones de navegación -->
        <div class="flex gap-4 justify-center mt-8">
            <button onclick="volverASubcategorias()" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium">
                <span class="material-symbols-outlined mr-2">arrow_back</span>
                Volver a ${categoria.titulo}
            </button>
            <button onclick="volverACategorias()" class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium">
                <span class="material-symbols-outlined mr-2">home</span>
                Ir a inicio
            </button>
        </div>
    `;
}

// 🧭 FUNCIONES DE NAVEGACIÓN
function actualizarBreadcrumb(categoria, subcategoria = null) {
    const breadcrumbCategoria = document.getElementById('breadcrumb-categoria');
    const breadcrumbSubcategoria = document.getElementById('breadcrumb-subcategoria');
    
    breadcrumbCategoria.textContent = categoria;
    
    if (subcategoria) {
        breadcrumbSubcategoria.classList.remove('hidden');
        breadcrumbSubcategoria.querySelector('span:last-child').textContent = subcategoria;
    } else {
        breadcrumbSubcategoria.classList.add('hidden');
    }
}

function volverACategorias() {
    console.log('🏠 Volviendo a categorías principales');
    
    ModeloState.categoriaActual = null;
    ModeloState.subcategoriaActual = null;
    ModeloState.vistaActual = 'categorias';
    
    // Mostrar categorías principales y ocultar área de exploración
    document.getElementById('area-exploracion').classList.add('hidden');
    document.getElementById('categorias-principales').parentElement.style.display = 'block';
}

function volverASubcategorias() {
    if (!ModeloState.categoriaActual) return;
    
    console.log('⬆️ Volviendo a subcategorías');
    
    const categoria = MODELO_PEDAGOGICO[ModeloState.categoriaActual];
    ModeloState.subcategoriaActual = null;
    ModeloState.vistaActual = 'subcategorias';
    
    actualizarBreadcrumb(categoria.titulo);
    cargarVistaSubcategorias(categoria);
}

// ⚙️ CONFIGURACIÓN DE EVENT LISTENERS
function configurarEventListeners() {
    // Eventos globales para el modelo pedagógico
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && ModeloState.vistaActual !== 'categorias') {
            volverACategorias();
        }
    });
}

// 🚀 INICIALIZACIÓN AUTOMÁTICA
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar si estamos en la vista del modelo
    if (document.getElementById('vista-modelo')?.classList.contains('active')) {
        inicializarModeloPedagogico();
    }
});

// Exportar funciones principales para integración
window.inicializarModeloPedagogico = inicializarModeloPedagogico;
window.explorarCategoria = explorarCategoria;
window.explorarSubcategoria = explorarSubcategoria;
window.volverACategorias = volverACategorias;
window.volverASubcategorias = volverASubcategorias;
window.MODELO_PEDAGOGICO = MODELO_PEDAGOGICO;

console.log('🎨 Modelo Pedagógico de LATERALIDADES con fundamentos académicos reales cargado correctamente');