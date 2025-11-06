/**
 * ================================================
 * GUÍA DIDÁCTICA COMPLETA - LABORATORIO CREATIVO
 * "Habitando el Error"
 * ================================================
 */

// Datos completos de la guía didáctica
const GUIA_DIDACTICA = {
    actividad1: {
        numero: 1,
        titulo: "El Hacer del Azar",
        emoji: "🎲",
        subtitulo: "Creación de personajes ficticios a partir del error/azar",
        color: "purple",
        gradiente: "from-purple-500 to-pink-500",
        totalSesiones: 2,
        duracionTotal: "3 horas",
        
        objetivoGeneral: "Crear personajes ficticios a partir del error/azar como punto de partida intencional, integrando procesos visuales y literarios para potenciar la creatividad de los alumnos.",
        
        rolDelError: "No es un fallo, sino un elemento formal y conceptual que funciona como punto de partida estético y creativo. Se valora el proceso sobre el resultado, celebrando los hallazgos inesperados.",
        
        recursos: {
            materiales: ["Pinturas líquidas (témpera, acrílico, acuarela)", "Cartulina A4", "Marcadores o crayolas", "Toalla o papel absorbente"],
            tiempo: "2 sesiones de 1h30 cada una",
            espacio: "Aula amplia o preferiblemente patio abierto",
            organizacion: "Mesas amplias centrales o pupitres unidos en grupos",
            seguridad: "Proteger ropa, cubrir mesas, tener material de limpieza a mano y reservar 15 min al final de la sesión 1 para limpieza"
        },
        
        sesiones: [
            {
                numero: 1,
                titulo: "Apertura y Creación Visual",
                duracion: "1h30",
                
                inicio: {
                    titulo: "Actividad Corporal: 'Somos manchas que se mueven'",
                    duracion: "25 min",
                    disciplina: "Expresión corporal",
                    inteligencia: "Corporal-kinestésica",
                    proposito: "Desinhibir, explorar el cuerpo como herramienta creativa y preparar la imaginación para el concepto de 'mancha'",
                    
                    pasosDocente: [
                        "Calentamiento libre: Guiar a los alumnos para que caminen y se muevan como si fueran gotas de pintura",
                        "Creación de manchas con el cuerpo: En grupos, formar figuras con sus cuerpos. Al decir cambio deben crear nuevas figuras",
                        "Transición: Usar frase de puente para pasar a la siguiente fase: 'Ahora que jugamos a ser manchas, vamos a llevar esas manchas al papel'"
                    ],
                    
                    consignasAlumno: [
                        "Vamos a calentar el cuerpo. Caminen por el espacio como si fueran gotas de pintura que caen sobre un lienzo gigante.",
                        "Ahora, en grupos, ¡conviértanse en una mancha! Usen sus cuerpos para crear una forma rara. Cuando grite '¡Cambio!', desarmen la mancha y creen una nueva."
                    ]
                },
                
                desarrollo: {
                    titulo: "Creación del Personaje Visual",
                    duracion: "60 min",
                    disciplina: "Artes plásticas / Lenguaje visual",
                    inteligencia: "Visual-espacial",
                    proposito: "Transformar una mancha accidental en un personaje, resignificando el error como oportunidad creativa",
                    
                    pasosDocente: [
                        "Cada estudiante crea una mancha libremente sobre la cartulina",
                        "Invitar a la observación, a través de preguntas como ¿Qué formas, animales o rostros ven escondidos en la mancha?",
                        "Con marcadores o lápices, los alumnos dibujan el personaje que descubrieron, usando la mancha como base"
                    ],
                    
                    materialApoyo: "Para alumnos que se bloqueen en el proceso, usar las 'Tarjetas de Inspiración'",
                    
                    consignasAlumno: [
                        "Dejen caer un poco de pintura en su hoja. No piensen en nada, solo dejen que la mancha se forme como quiera.",
                        "Miren de cerca su mancha. Giren la hoja. ¿Ven algo escondido? ¿Una cara, un monstruo, un animal?",
                        "¡Genial! Ahora con un marcador, dibujen sobre la mancha para que todos podamos ver a ese personaje que encontraron."
                    ]
                },
                
                cierre: {
                    duracion: "15 min",
                    actividades: [
                        "Limpieza de pinceles, manos y mesas",
                        "Guardar los dibujos en un lugar seguro para la próxima sesión"
                    ]
                }
            },
            {
                numero: 2,
                titulo: "Caracterización y Narrativa",
                duracion: "1h30",
                
                inicio: {
                    titulo: "Reconexión y Preparación",
                    duracion: "15 min",
                    proposito: "Este breve ritual reconecta a los alumnos con su trabajo anterior de forma corporal y creativa antes de pasar a la escritura",
                    
                    pasosDocente: [
                        "Entregar a cada alumno su dibujo de la sesión anterior",
                        "Pedir que observen a su personaje en silencio y piensen: ¿cómo se movería?",
                        "Durante un minuto, cada uno imita con un gesto o movimiento a su personaje"
                    ],
                    
                    consignasAlumno: [
                        "Vamos a despertar a nuestros personajes"
                    ]
                },
                
                desarrollo: {
                    titulo: "Caracterización y Narrativa",
                    duracion: "60 min",
                    disciplina: "Lenguaje / Literatura creativa",
                    inteligencia: "Lingüística-verbal",
                    proposito: "Estructurar el pensamiento creativo para construir una identidad y una narrativa simple para el personaje",
                    
                    tipDiversidad: "Para alumnos que terminen rápido, proponer un desafío. Ej. Dibuja en el reverso de la ficha la casa de tu personaje",
                    
                    pasosDocente: [
                        "Explicar que ahora le darán 'vida' al personaje con palabras",
                        "Entregar la Ficha de Personaje del Azar",
                        "Guiar a los alumnos para que la completen, empezando por transformar las letras de su propio nombre para nombrar al personaje"
                    ],
                    
                    consignasAlumno: [
                        "Ahora vamos a darle un nombre. Jueguen con las letras de su propio nombre, desordénenlas para encontrar el nombre secreto de su personaje.",
                        "Usando la ficha, vamos a contar la historia de este personaje. ¿Cómo es? ¿Qué le gusta? ¿Qué aventura le acaba de pasar?"
                    ]
                },
                
                cierre: {
                    titulo: "Retroalimentación",
                    duracion: "15 min",
                    descripcion: "Se realiza una socialización donde cada alumno comparte su personaje y su historia",
                    preguntasReflexivas: [
                        "¿Creen que un error puede ayudarnos a crear cosas nuevas?",
                        "¿Qué aprendí hoy que antes no sabía?"
                    ],
                    fraseFinal: "¡Las manchas nos enseñan que lo que parece un error puede ser el inicio de una gran idea!"
                }
            }
        ],
        
        evaluacion: {
            criterios: [
                {
                    nombre: "Participación y Exploración",
                    niveles: ["Se involucra activamente", "Participa con timidez", "Muestra resistencia"]
                },
                {
                    nombre: "Desarrollo de Ideas",
                    niveles: ["Conecta ideas fluidamente", "Necesita algo de guía", "Se bloquea con facilidad"]
                },
                {
                    nombre: "Resiliencia Creativa",
                    niveles: ["Acoge los accidentes", "Muestra frustración inicial", "Rechaza lo inesperado"]
                },
                {
                    nombre: "Comunicación",
                    niveles: ["Comparte y escucha", "Comparte pero no escucha", "Prefiere no compartir"]
                }
            ]
        },
        
        anexos: [
            {
                nombre: "Kit del creador de personajes",
                descripcion: "Ficha interactiva para crear la identidad del personaje"
            },
            {
                nombre: "Tarjetas de Inspiración",
                descripcion: "Para desbloquear estudiantes que se atasquen"
            },
            {
                nombre: "Caja de Herramientas para la Inclusión",
                descripcion: "Adaptaciones para necesidades especiales"
            }
        ]
    },
    
    actividad2: {
        numero: 2,
        titulo: "El Lugar que me Habita",
        emoji: "🏠",
        subtitulo: "Dibujo-Escritura automática",
        color: "blue",
        gradiente: "from-blue-500 to-cyan-500",
        totalSesiones: 2,
        duracionTotal: "3 horas",
        
        objetivoGeneral: "Reflexionar sobre el error como recurso creativo, explorar la imagen mental de un lugar personal para representarlo visual y textualmente y transformar esa imagen en una narrativa creativa.",
        
        rolDelError: "En esta actividad, el error se trabaja desde dos frentes: primero, a través de la reflexión sobre la experiencia anterior para consolidar el aprendizaje; y segundo, a través de la consigna 'No borrar ni eliminar nada', que invita a los alumnos a aceptar cada trazo y cada palabra como parte válida del proceso creativo, transformando la autocensura en aceptación.",
        
        recursos: {
            materiales: ["Papelógrafo o pizarrón grande", "Marcadores o esferos", "Hojas blancas", "Cuadernos", "Cartulina", "Dibujos realizados en la sesión anterior (para la Sesión 2)"],
            tiempo: "2 sesiones de 1h30 cada una",
            espacio: "Disposición en círculo en el aula o en un patio abierto",
            organizacion: "Asegurar un espacio cómodo para que los alumnos puedan sentarse en el suelo o en sus sillas en un círculo, con suficiente espacio para dibujar y escribir"
        },
        
        sesiones: [
            {
                numero: 1,
                titulo: "Lluvia de ideas y exploración del lugar",
                duracion: "1h30",
                
                inicio: {
                    titulo: "El Abecedario del Error en Equipo",
                    duracion: "20 min",
                    proposito: "Activar la reflexión sobre el error como recurso creativo y estimular la participación grupal",
                    
                    pasosDocente: [
                        "Preparación: Escribe el abecedario en un papelógrafo grande o en la pizarra (A-Z)",
                        "Explica el reto: Utiliza las instrucciones para alumnos para presentar la actividad",
                        "Trabajo colectivo: Anima al grupo a proponer palabras para cada letra. Si se atascan, pueden inventar juntos o incluso crear una palabra nueva",
                        "Lectura final en ronda: Pide a los estudiantes que lean en voz alta"
                    ],
                    
                    consignasAlumno: [
                        "Hoy vamos a inventar un diccionario especial: El Abecedario del Error. No importa si lo que decimos es serio, gracioso o extraño. La idea es que juntos demos vida a este abecedario.",
                        "Al final, lean en voz alta: 'El error es...' (y la palabra que encontraron)"
                    ]
                },
                
                desarrollo: {
                    titulo: "Creación del espacio significativo a través de la imagen mental",
                    duracion: "55 min",
                    disciplina: "Artes plásticas / Lenguaje visual (dibujo), Lenguaje narrado (meditaciones guiadas), Lenguaje emocional",
                    inteligencia: "Visual-espacial, Intrapersonal",
                    proposito: "Explorar la imagen mental de un lugar personal y representarlo visualmente con ayuda del dibujo",
                    consignaBase: "No borrar ni eliminar nada",
                    
                    pasosDocente: [
                        "Pide a los niños que se sienten cómodos y cierren los ojos",
                        "Guíalos con tu voz usando el guion de meditación (Anexo A)",
                        "Invita a los estudiantes a que intenten dibujar ese espacio que visitaron en su memoria",
                        "Nota: Recuérdales la regla más importante: ¡No se puede borrar! Cada línea, aunque parezca un error, es parte del proceso"
                    ]
                },
                
                cierre: {
                    titulo: "Reflexión sobre la experiencia",
                    duracion: "15 min",
                    proposito: "La reflexión de esta sesión parte en base a la experiencia directa con la consigna 'No borrar'. El objetivo es que los alumnos verbalicen cómo se sintieron al trabajar sin la posibilidad de corregir",
                    
                    consignasAlumno: [
                        "Observemos nuestros dibujos. ¿Cómo se sintió dibujar sin borrar?"
                    ],
                    
                    actividades: [
                        "Guardar los dibujos para la siguiente sesión",
                        "Organizar los materiales y limpiar el espacio"
                    ]
                }
            },
            {
                numero: 2,
                titulo: "Escritura automática y síntesis literaria",
                duracion: "1h30",
                
                inicio: {
                    titulo: "Activación Corporal",
                    duracion: "5 min",
                    descripcion: "Realiza una breve activación corporal para reconectar a los alumnos con su creatividad antes de escribir. Reparte sus dibujos y pide que con un lápiz escriban en el aire las cosas que se encuentren en su dibujo, esto con la finalidad de reconectar con el ejercicio anterior"
                },
                
                desarrollo: {
                    titulo: "Escritura y Síntesis",
                    duracion: "1h",
                    disciplina: "Literatura creativa / Escritura automática, síntesis literaria",
                    inteligencia: "Lingüística-verbal, Intrapersonal",
                    proposito: "Transformar la imagen visual del lugar en palabras y narrativa creativa",
                    
                    pasosDocente: [
                        "Escritura automática - El río de palabras: Anima a los estudiantes a escribir sobre su lugar elegido, usando la ficha 'El Río de Palabras' como guía. Deben escribir sin parar todo lo que le venga a la mente",
                        "Síntesis literaria: Pide que lean su texto, resalten sus partes favoritas y construyan con ellas una frase corta que capture la esencia del lugar"
                    ],
                    
                    consignasAlumno: [
                        "Miren su dibujo y dejen que las palabras fluyan como un río. Usen esta ficha para escribir sin parar todo lo que le venga a la mente sobre su lugar.",
                        "Ahora, lean su río de palabras y pesquen las frases o palabras que más les guste. Con estas palabras subrayadas, escriban una frase mágica que sea el secreto de su lugar."
                    ]
                },
                
                cierre: {
                    titulo: "Retroalimentación",
                    duracion: "25 min",
                    descripcion: "Organiza un 'Círculo de la memoria' donde cada estudiante, si lo desea, comparte su trabajo",
                    
                    consignasAlumno: [
                        "Vamos a compartir nuestros lugares. ¿Cuál fue el impacto que generó la consigna 'No borrar ni eliminar nada' en tu proceso creativo? Comparte tu dibujo y frase.",
                        "Comenta las dificultades que tuviste. ¿Con qué sensación me voy de esta clase?"
                    ],
                    
                    fraseFinal: "Nuestras memorias dibujadas y escritas nos mostraron que no todo lo imperfecto debe desaparecer."
                }
            }
        ],
        
        evaluacion: {
            criterios: [
                {
                    nombre: "Participación y Reflexión",
                    niveles: ["Se involucra activamente", "Participa con timidez", "Muestra resistencia"]
                },
                {
                    nombre: "Desarrollo de Ideas",
                    niveles: ["Conecta ideas fluidamente", "Necesita algo de guía", "Se bloquea con facilidad"]
                },
                {
                    nombre: "Aceptación del Proceso",
                    niveles: ["Acoge la consigna 'no borrar'", "Muestra frustración inicial", "Lucha contra la consigna"]
                },
                {
                    nombre: "Comunicación",
                    niveles: ["Comparte sus reflexiones", "Escucha pero no comparte", "Se muestra desinteresado"]
                }
            ]
        },
        
        anexos: [
            {
                nombre: "Guion de Meditación",
                descripcion: "Script completo para la meditación guiada"
            },
            {
                nombre: "Ficha 'El Río de Palabras'",
                descripcion: "Guía para la escritura automática"
            },
            {
                nombre: "Caja de Herramientas para la Inclusión",
                descripcion: "Adaptaciones para necesidades especiales"
            }
        ]
    },
    
    actividad3: {
        numero: 3,
        titulo: "Del Retrato Colectivo a la Resignificación",
        emoji: "👥",
        subtitulo: "El error evoluciona: de frustración a protagonista",
        color: "green",
        gradiente: "from-green-500 to-emerald-500",
        totalSesiones: 3,
        duracionTotal: "4h30",
        
        objetivoGeneral: "Identificar y reinterpretar el 'error' en el proceso creativo a través de la observación y el trabajo en grupo, resignificándolo de un detalle no deseado en un retrato a un elemento central y valioso en una obra abstracta y una narrativa colectiva.",
        
        rolDelError: "El error evoluciona. Primero, se manifiesta en la frustración de no poder dibujar al 'modelo' de forma perfecta. Luego, se convierte en el protagonista deliberado de una pintura abstracta (recurso visual). Finalmente, es la chispa que enciende la interpretación y la creación de una historia colectiva, demostrando que un 'fallo' puede ser el punto de partida para múltiples capas de significado.",
        
        recursos: {
            materiales: ["Hojas blancas", "Lápices", "Marcadores", "Pinturas acrílicas", "Pinceles", "Soportes de cartón o papel grueso", "Cartulinas", "Cinta adhesiva"],
            tiempo: "3 sesiones de 1h30 cada una",
            espacio: "Aula que permita el trabajo en círculo y mesas para pintar",
            organizacion: "Mesas de trabajo grupales. Disponer un espacio en el suelo para la reflexión inicial y un muro o pared amplia para el trabajo colaborativo y la exposición final"
        },
        
        sesiones: [
            {
                numero: 1,
                titulo: "El Retrato Colectivo",
                duracion: "1h30",
                
                inicio: {
                    titulo: "Activación: 'La Cara del Error'",
                    duracion: "20 min",
                    disciplina: "Expresión corporal / Teatro",
                    lenguajes: "Corporal, Gestual",
                    inteligencia: "Corporal-kinestésica, Emocional",
                    proposito: "Reconocer y validar las distintas emociones asociadas al error (frustración, risa, sorpresa) a través del cuerpo y la expresión, antes de abordarlo intelectualmente",
                    
                    consignasAlumno: [
                        "¡Hoy vamos a ponerle cara al error! Pueden sacar una de las tarjetas de 'Caras del Error' y representar la situación. Por ejemplo: ¿qué cara pones cuando se te mancha la hoja con café? ¿O cuando escribes una palabra mal? ¡Vamos a dramatizarlo!",
                        "Ahora ya sabemos cómo se siente un error... ¡en el cuerpo y en la cara! Vamos a usar esa energía para crear."
                    ]
                },
                
                desarrollo: {
                    titulo: "Creación Artística: Autorretrato Colectivo",
                    duracion: "55 min",
                    disciplina: "Artes plásticas / Dibujo",
                    lenguajes: "Visual, Gráfico",
                    inteligencia: "Visual-espacial, Interpersonal",
                    proposito: "Desarrollar la observación, valorar la diversidad de interpretaciones y aplicar la consigna 'no borrar' en un contexto de retrato",
                    
                    pasosDocente: [
                        "El grupo decide democráticamente quién será el 'modelo'",
                        "El modelo se sienta en el centro, mientras los demás lo observan desde sus puestos",
                        "Cada uno dibuja al modelo desde su propio punto de vista, recordando la consigna 'no borrar ni eliminar'",
                        "Al finalizar, se exhiben todos los dibujos para que el modelo y el grupo puedan ver las diferentes versiones"
                    ],
                    
                    consignasAlumno: [
                        "Hoy haremos un retrato en equipo. ¿Quién quiere ser nuestro modelo valiente?",
                        "Perfecto, ahora todos los demás, observen con ojos de detective. Miren sus rasgos, su postura, su expresión. Dibujen a su compañero desde su lugar, pero recuerden la regla de oro: ¡No se borra nada!"
                    ]
                },
                
                cierre: {
                    titulo: "Reflexión Grupal",
                    duracion: "15 min",
                    descripcion: "Modera una conversación abierta usando las preguntas guía para que los alumnos reflexionen sobre la diversidad de resultados y la experiencia de dibujar sin borrar",
                    
                    preguntasGuia: [
                        "Miren todos los retratos. ¿Qué cosas diferentes notaron en los dibujos de sus compañeros?",
                        "¿Qué les gusta de esas diferencias?",
                        "¿Cómo se sintieron dibujando sin poder borrar?"
                    ]
                }
            },
            {
                numero: 2,
                titulo: "Pintura Abstracta de Resignificación",
                duracion: "1h30",
                
                inicio: {
                    titulo: "Selección del 'Error'",
                    duracion: "15 min",
                    descripcion: "Entrega a cada alumno su retrato de la sesión anterior. Pídeles que usen la 'Ficha de Mi Error Favorito' para identificar y analizar esa parte del dibujo que consideraron un 'error' o que no les gustó",
                    
                    consignasAlumno: [
                        "Tomen el retrato que hicieron. Obsérvalo con honestidad. ¿Hay alguna parte que no les gustó? ¿Una línea que se escapó, una proporción extraña?",
                        "En esta ficha, vamos a analizar ese 'error' para convertirlo en nuestro superpoder."
                    ]
                },
                
                desarrollo: {
                    titulo: "Creación de la Composición Abstracta",
                    duracion: "60 min",
                    disciplina: "Artes plásticas / Pintura abstracta",
                    lenguajes: "Visual, Cromático",
                    inteligencia: "Visual-espacial, Creativa",
                    proposito: "Transformar conscientemente un 'error' en el elemento central de una obra, resignificándolo como un recurso visual valioso",
                    
                    pasosDocente: [
                        "Después de identificar el 'error', los alumnos lo plasman como símbolo principal en un nuevo soporte. Anímalos a exagerarlo, repetirlo o modificarlo creativamente",
                        "Recalca que se deben evitar representaciones realistas. El objetivo es explorar formas libres, contrastes y texturas",
                        "A la mitad del proceso, organiza un 'intercambio de paletas' al azar para que terminen sus obras con los colores de un compañero"
                    ],
                    
                    consignasAlumno: [
                        "Ahora, tomen ese 'error' que encontraron y conviértanlo en el protagonista de su pintura. Píntenlo grande, repítanlo muchas veces, cambien su color. ¡Jueguen con él!",
                        "No estamos haciendo nada realista, solo explorando formas y colores.",
                        "¡Alto! Ahora, un giro inesperado: vamos a intercambiar nuestras paletas de colores con un compañero al azar. ¡Terminen su obra maestra con estos nuevos colores!"
                    ]
                },
                
                cierre: {
                    titulo: "Reflexión",
                    duracion: "15 min",
                    descripcion: "Guía una breve reflexión final con las preguntas proporcionadas, enfocándose en el aprendizaje y los desafíos del proceso",
                    
                    preguntasGuia: [
                        "¿Qué aprendieron hoy que antes no sabían?",
                        "¿Cuáles fueron las dificultades?",
                        "¿Qué fue lo que más les gustó de transformar su 'error'?"
                    ]
                }
            },
            {
                numero: 3,
                titulo: "Historias que Nacen del Error",
                duracion: "1h30",
                
                inicio: {
                    titulo: "Preparación para la Galería",
                    duracion: "10 min",
                    descripcion: "Asigna un número a cada obra abstracta y colócalas en una pared como si fuera una galería. Prepara papelitos con los mismos números para el sorteo",
                    
                    consignasAlumno: [
                        "¡Bienvenidos a nuestro museo del error! Cada una de estas obras es un tesoro. En un momento, cada uno se convertirá en el guardián y narrador de uno de estos tesoros."
                    ]
                },
                
                desarrollo: {
                    titulo: "Juego 'La Mirada del Otro'",
                    duracion: "65 min",
                    disciplina: "Literatura creativa / Interpretación",
                    lenguajes: "Escrito, Oral",
                    inteligencia: "Lingüística-verbal, Interpersonal",
                    proposito: "Construir colectivamente una narrativa visual y literaria, demostrando que un mismo 'error' puede inspirar múltiples significados",
                    
                    pasosDocente: [
                        "Cada estudiante saca un número al azar de una bolsa. Este número corresponde a la obra de un compañero",
                        "Cada uno observa la obra que le tocó y escribe en una hoja una frase breve sobre lo que le inspira o la historia que le cuenta",
                        "Por turnos, cada estudiante lee en voz alta la frase que escribió y la pega debajo de la obra correspondiente, creando así una exposición colaborativa"
                    ],
                    
                    consignasAlumno: [
                        "Ahora nos convertiremos en críticos de arte. Tomen un número que corresponde la obra que te tocará interpretar. Observen esa obra y cuenta ¿Qué historia les cuenta?",
                        "Ahora, uno por uno, leeremos nuestra frase en voz alta y la colocaremos debajo de la obra. ¡Juntos crearemos un museo de historias nacidas del error!"
                    ]
                },
                
                cierre: {
                    titulo: "Reflexión Final",
                    duracion: "15 min",
                    preguntasGuia: [
                        "Miren la galería ¿Cómo se sintió reinterpretar el trabajo de otro compañero?",
                        "¿Cómo una misma obra puede contar tantas historias diferentes?"
                    ]
                }
            }
        ],
        
        evaluacion: {
            criterios: [
                {
                    nombre: "Identificación del Error",
                    niveles: ["Identifica un 'error' y lo analiza", "Le cuesta identificar un 'error' concreto"]
                },
                {
                    nombre: "Resignificación Visual",
                    niveles: ["Transforma el 'error' en un elemento central y creativo", "Intenta ocultar o disimular el 'error' en la nueva obra"]
                },
                {
                    nombre: "Colaboración e Interpretación",
                    niveles: ["Participa activamente en el retrato y la interpretación de obras ajenas", "Muestra dificultad para trabajar en grupo o interpretar otras obras"]
                }
            ]
        },
        
        anexos: [
            {
                nombre: "Guía Visual 'Posibles Caras del Error'",
                descripcion: "Tarjetas para dramatizar emociones del error"
            },
            {
                nombre: "Ficha 'Mi Error Favorito'",
                descripcion: "Para identificar y analizar el error en el retrato"
            },
            {
                nombre: "Caja de Herramientas para la Inclusión",
                descripcion: "Adaptaciones para necesidades especiales"
            }
        ]
    },
    
    actividad4: {
        numero: 4,
        titulo: "Historias que Nacen del Error",
        emoji: "🖼",
        subtitulo: "Exposición Final",
        color: "orange",
        gradiente: "from-orange-500 to-red-500",
        totalSesiones: 1,
        duracionTotal: "1h30",
        
        objetivoGeneral: "Construir una exposición colectiva que dé cierre al proceso, permitiendo a los alumnos reflexionar sobre su viaje creativo, valorar el cambio en su percepción del error y celebrar el trabajo de todo el grupo.",
        
        rolDelError: "El error culmina su transformación. Deja de ser un concepto para analizar para convertirse en un logro visible y compartido. En esta fase, el error es la prueba tangible del aprendizaje, la pieza central de una exposición que demuestra cómo lo inesperado y lo imperfecto pueden generar belleza, significado y conexión comunitaria.",
        
        recursos: {
            materiales: ["Obras abstractas de la actividad anterior", "Lápiz", "Esferos", "Hojas", "Cartulinas", "Cinta adhesiva o soportes para exposición", "Papelógrafo", "Pintura para la actividad simbólica"],
            tiempo: "1 sesión de 1h30",
            espacio: "Aula amplia con una pared despejada para montar la exposición",
            organizacion: "Un espacio central en el suelo para la lluvia de ideas inicial. Las mesas se pueden usar para escribir y luego se organizan las sillas en formato de 'galería' frente al mural"
        },
        
        sesiones: [
            {
                numero: 1,
                titulo: "Exposición y Celebración",
                duracion: "1h30",
                
                inicio: {
                    titulo: "Lluvia de Ideas Final",
                    duracion: "20 min",
                    disciplina: "Reflexión / Metacognición",
                    lenguajes: "Oral, Escrito",
                    inteligencia: "Intrapersonal, Lingüística",
                    proposito: "Hacer visible y consciente el cambio en la percepción del error, comparando las ideas iniciales con las finales",
                    
                    pasosDocente: [
                        "Prepara un papelógrafo con la palabra 'ERROR' en el centro",
                        "Entrega la 'Ficha de Reflexión' a cada alumno para que organicen sus ideas individualmente primero",
                        "Invita a los alumnos a compartir en voz alta sus nuevas ideas y palabras sobre el error, y escríbelas en el papelógrafo",
                        "Compara visualmente este nuevo mapa de ideas con el que se hizo en actividades anteriores"
                    ],
                    
                    consignasAlumno: [
                        "Hemos llegado al final de nuestro viaje. Miremos atrás por un momento. ¿Recuerdan lo que pensábamos sobre la palabra 'ERROR' al principio? Ahora, en esta ficha, escriban qué significa 'ERROR' para ustedes hoy. ¿Ha cambiado algo?",
                        "¡Compartamos nuestras nuevas ideas! ¿Qué palabras le ponemos ahora al error? Vamos a crear nuestro último mapa de ideas."
                    ]
                },
                
                desarrollo: {
                    titulo: "Montaje de la Exposición y Presentaciones",
                    duracion: "55 min",
                    disciplina: "Curaduría / Exposición artística / Oratoria",
                    lenguajes: "Visual, Oral",
                    inteligencia: "Espacial, Interpersonal, Lingüística",
                    proposito: "Construir una narrativa colectiva, practicar la exposición oral y valorar tanto el trabajo propio como el de los compañeros",
                    
                    pasosDocente: [
                        "Mural y Título: Guía a los alumnos para que organicen sus obras abstractas y las frases de la actividad anterior en un mural. Facilita una votación o debate para elegir un título para la exposición (Ej: 'Errores que cuentan historias')",
                        "Presentaciones: Invita a cada estudiante a pararse junto a la obra que le tocó interpretar. Deben presentarla, explicar por qué le pusieron ese título o frase y qué les hizo sentir",
                        "Rol del Documentalista (Opcional): Designa a uno o dos alumnos para que graben breves clips de sus compañeros presentando, para crear un recuerdo en video de la exposición"
                    ],
                    
                    consignasAlumno: [
                        "Vamos a montar nuestra propia Galería. Juntos, decidamos cómo organizar nuestras obras en este mural para que cuenten una gran historia. Y lo más importante, ¿qué nombre le ponemos a nuestra exposición?",
                        "Miren la galería ¿Cómo se sintió reinterpretar el trabajo de otro compañero? ¿Cómo una misma obra puede contar tantas historias diferentes?"
                    ]
                },
                
                cierre: {
                    titulo: "Actividad Simbólica",
                    duracion: "15 min",
                    disciplina: "Ritual de Cierre",
                    lenguajes: "Simbólico, Corporal",
                    inteligencia: "Corporal-kinestésica, Emocional",
                    proposito: "Crear un cierre tangible y emocional del proceso, generando un sentimiento de orgullo, pertenencia y logro colectivo",
                    
                    descripcion: "Prepara un pliego de papel grande en el suelo y pintura de varios colores. Guía a los alumnos para que, uno por uno, dejen su huella",
                    
                    consignasAlumno: [
                        "Para celebrar todo lo que hemos creado, vamos a dejar nuestra marca final. Mojaremos nuestras manos en pintura y las estamparemos en este gran papel, como un símbolo de nuestro trabajo y de todo lo que aprendimos juntos."
                    ],
                    
                    fraseFinal: "Cada uno de ustedes convirtió un error en una imagen, una imagen en una palabra, y una palabra en una historia. Lo que parecía un accidente es parte de algo más grande que hicimos juntos."
                }
            }
        ],
        
        evaluacion: {
            criterios: [
                {
                    nombre: "Reflexión y Síntesis",
                    niveles: ["Articula claramente el cambio en su percepción del error", "Expresa ideas generales, pero le cuesta conectar con su proceso personal"]
                },
                {
                    nombre: "Comunicación Expositiva",
                    niveles: ["Presenta la obra de su compañero con confianza y claridad", "Muestra timidez, pero logra comunicar la idea principal"]
                },
                {
                    nombre: "Participación Colectiva",
                    niveles: ["Colabora activamente en el montaje y participa en la reflexión final", "Participa de forma pasiva en las actividades grupales"]
                }
            ]
        },
        
        anexos: [
            {
                nombre: "Ficha de Reflexión 'Mi Viaje con el Error'",
                descripcion: "Para comparar percepción inicial vs. final del error"
            },
            {
                nombre: "Caja de herramientas para la Inclusión",
                descripcion: "Adaptaciones para necesidades especiales"
            }
        ]
    }
};

/**
 * Función para mostrar el contenido de una actividad en la guía didáctica
 */
function mostrarActividadGuia(numeroActividad) {
    const actividad = GUIA_DIDACTICA[`actividad${numeroActividad}`];
    const contenedor = document.getElementById('contenido-actividad');
    const panelInicial = document.getElementById('panel-inicial');
    
    if (!actividad || !contenedor) return;
    
    // Ocultar panel inicial y mostrar contenedor de actividad
    if (panelInicial) panelInicial.style.display = 'none';
    contenedor.style.display = 'block';
    contenedor.classList.remove('hidden');
    
    // Generar HTML completo de la actividad
    const html = `
        <div class="actividad-completa">
            <!-- Header de la actividad -->
            <div class="bg-gradient-to-r ${actividad.gradiente} text-white rounded-2xl p-8 mb-8 shadow-xl">
                <button onclick="volverAInicio()" class="mb-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                    Volver a Actividades
                </button>
                
                <div class="flex items-start gap-6">
                    <div class="text-7xl">${actividad.emoji}</div>
                    <div class="flex-1">
                        <div class="text-sm font-semibold mb-2 opacity-90">ACTIVIDAD ${actividad.numero}</div>
                        <h2 class="text-4xl font-bold mb-3">${actividad.titulo}</h2>
                        <p class="text-xl opacity-95 mb-4">${actividad.subtitulo}</p>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <div class="bg-white/20 px-4 py-2 rounded-full">
                                <span class="material-symbols-outlined text-sm">timer</span> ${actividad.totalSesiones} sesiones • ${actividad.duracionTotal}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Información general -->
            <div class="grid lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-2 space-y-6">
                    <!-- Objetivo General -->
                    <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 border-${actividad.color}-500">
                        <h3 class="text-xl font-bold text-${actividad.color}-700 mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">flag</span>
                            🎯 Objetivo General
                        </h3>
                        <p class="text-gray-700">${actividad.objetivoGeneral}</p>
                    </div>
                    
                    <!-- Rol del Error -->
                    <div class="bg-gradient-to-br from-${actividad.color}-50 to-${actividad.color}-100 rounded-xl p-6 shadow border-2 border-${actividad.color}-200">
                        <h3 class="text-xl font-bold text-${actividad.color}-800 mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">auto_awesome</span>
                            🔄 Rol del Error
                        </h3>
                        <p class="text-${actividad.color}-900">${actividad.rolDelError}</p>
                    </div>
                </div>
                
                <!-- Recursos -->
                <div class="bg-white rounded-xl p-6 shadow-lg">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined">inventory_2</span>
                        📦 Recursos Necesarios
                    </h3>
                    
                    <div class="space-y-4 text-sm">
                        <div>
                            <h4 class="font-bold text-${actividad.color}-700 mb-2">🎨 Materiales</h4>
                            <ul class="space-y-1 text-gray-700">
                                ${actividad.recursos.materiales.map(m => `<li class="flex items-start gap-2"><span class="text-${actividad.color}-500">•</span><span>${m}</span></li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="border-t pt-3">
                            <p class="text-gray-700"><strong class="text-${actividad.color}-700">⏱️ Tiempo:</strong> ${actividad.recursos.tiempo}</p>
                        </div>
                        
                        <div class="border-t pt-3">
                            <p class="text-gray-700"><strong class="text-${actividad.color}-700">📍 Espacio:</strong> ${actividad.recursos.espacio}</p>
                        </div>
                        
                        <div class="border-t pt-3">
                            <p class="text-gray-700"><strong class="text-${actividad.color}-700">🏗️ Organización:</strong> ${actividad.recursos.organizacion}</p>
                        </div>
                        
                        ${actividad.recursos.seguridad ? `
                        <div class="border-t pt-3">
                            <p class="text-gray-700"><strong class="text-${actividad.color}-700">⚠️ Seguridad:</strong> ${actividad.recursos.seguridad}</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Sesiones -->
            <div class="mb-8">
                <h3 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <span class="material-symbols-outlined text-4xl">calendar_today</span>
                    📅 Desarrollo de Sesiones
                </h3>
                
                ${actividad.sesiones.map((sesion, idx) => generarHTMLSesion(sesion, actividad.color, idx + 1)).join('')}
            </div>
            
            <!-- Evaluación -->
            <div class="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <span class="material-symbols-outlined text-3xl">assessment</span>
                    📊 Evaluación Formativa
                </h3>
                
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="bg-${actividad.color}-100">
                                <th class="p-3 text-left font-bold text-${actividad.color}-800">Criterio de Proceso</th>
                                <th class="p-3 text-left font-bold text-${actividad.color}-800">Niveles de Desarrollo</th>
                                <th class="p-3 text-left font-bold text-${actividad.color}-800">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${actividad.evaluacion.criterios.map((criterio, idx) => `
                                <tr class="${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                                    <td class="p-3 font-semibold text-gray-800">${criterio.nombre}</td>
                                    <td class="p-3 text-gray-700">
                                        ${criterio.niveles.map(nivel => `
                                            <div class="mb-1">( ) ${nivel}</div>
                                        `).join('')}
                                    </td>
                                    <td class="p-3 text-gray-400 text-xs italic">Espacio para notas del docente</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Anexos -->
            <div class="bg-gradient-to-br from-${actividad.color}-50 to-${actividad.color}-100 rounded-xl p-8 shadow-lg border-2 border-${actividad.color}-200">
                <h3 class="text-2xl font-bold text-${actividad.color}-800 mb-6 flex items-center gap-3">
                    <span class="material-symbols-outlined text-3xl">folder_open</span>
                    📎 Anexos y Material de Apoyo
                </h3>
                
                <div class="grid md:grid-cols-${Math.min(actividad.anexos.length, 3)} gap-4">
                    ${actividad.anexos.map(anexo => `
                        <div class="bg-white rounded-lg p-4 shadow">
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-${actividad.color}-600">description</span>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-1">${anexo.nombre}</h4>
                                    <p class="text-xs text-gray-600">${anexo.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
    
    // Scroll suave al inicio
    contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Genera el HTML de una sesión completa
 */
function generarHTMLSesion(sesion, color, numero) {
    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border-2 border-${color}-200">
            <!-- Header de la sesión -->
            <div class="bg-gradient-to-r from-${color}-600 to-${color}-700 text-white p-6">
                <div class="flex items-center gap-4">
                    <div class="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
                        ${sesion.numero}
                    </div>
                    <div>
                        <h4 class="text-2xl font-bold">${sesion.titulo}</h4>
                        <p class="text-${color}-100">⏱️ Duración: ${sesion.duracion}</p>
                    </div>
                </div>
            </div>
            
            <!-- Contenido de la sesión -->
            <div class="p-6 space-y-6">
                ${generarHTMLFase('INICIO', sesion.inicio, color)}
                ${generarHTMLFase('DESARROLLO', sesion.desarrollo, color)}
                ${generarHTMLFase('CIERRE', sesion.cierre, color)}
            </div>
        </div>
    `;
}

/**
 * Genera el HTML de una fase (inicio/desarrollo/cierre)
 */
function generarHTMLFase(nombreFase, fase, color) {
    if (!fase) return '';
    
    const iconosFase = {
        'INICIO': '🚀',
        'DESARROLLO': '⚙️',
        'CIERRE': '🎯'
    };
    
    return `
        <div class="fase-detalle border-l-4 border-${color}-400 pl-6 py-4 bg-${color}-50/30">
            <h5 class="text-xl font-bold text-${color}-800 mb-3 flex items-center gap-2">
                <span>${iconosFase[nombreFase]}</span> ${nombreFase}: ${fase.titulo || ''}
                ${fase.duracion ? `<span class="text-sm font-normal text-${color}-600 ml-auto">(${fase.duracion})</span>` : ''}
            </h5>
            
            ${fase.disciplina ? `<p class="text-sm text-gray-600 mb-2"><strong>📚 Disciplina:</strong> ${fase.disciplina}</p>` : ''}
            ${fase.inteligencia ? `<p class="text-sm text-gray-600 mb-2"><strong>🧠 Inteligencia:</strong> ${fase.inteligencia}</p>` : ''}
            ${fase.lenguajes ? `<p class="text-sm text-gray-600 mb-2"><strong>💬 Lenguajes:</strong> ${fase.lenguajes}</p>` : ''}
            ${fase.proposito ? `<p class="text-sm text-gray-700 mb-3 italic bg-white/50 p-3 rounded"><strong>🎯 Propósito:</strong> ${fase.proposito}</p>` : ''}
            ${fase.consignaBase ? `<p class="text-sm font-bold text-${color}-700 mb-3 bg-${color}-100 p-3 rounded">⚡ Consigna Base: "${fase.consignaBase}"</p>` : ''}
            ${fase.descripcion ? `<p class="text-gray-700 mb-3">${fase.descripcion}</p>` : ''}
            
            ${fase.pasosDocente && fase.pasosDocente.length > 0 ? `
                <div class="mb-4">
                    <h6 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span class="material-symbols-outlined text-${color}-600">person</span>
                        👨‍🏫 Pasos para el Docente
                    </h6>
                    <ol class="space-y-2 text-sm text-gray-700 pl-4">
                        ${fase.pasosDocente.map((paso, idx) => `
                            <li class="flex gap-3">
                                <span class="font-bold text-${color}-600 flex-shrink-0">${idx + 1}.</span>
                                <span>${paso}</span>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            ` : ''}
            
            ${fase.materialApoyo ? `
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 text-sm">
                    <strong>💡 Material de Apoyo:</strong> ${fase.materialApoyo}
                </div>
            ` : ''}
            
            ${fase.tipDiversidad ? `
                <div class="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4 text-sm">
                    <strong>♿ Tip de Diversidad:</strong> ${fase.tipDiversidad}
                </div>
            ` : ''}
            
            ${fase.consignasAlumno && fase.consignasAlumno.length > 0 ? `
                <div class="bg-gradient-to-r from-${color}-50 to-${color}-100 rounded-lg p-4 border-2 border-${color}-300">
                    <h6 class="font-bold text-${color}-800 mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">chat</span>
                        💬 Consignas para el Alumno
                    </h6>
                    <div class="space-y-3">
                        ${fase.consignasAlumno.map(consigna => `
                            <div class="bg-white p-3 rounded shadow-sm text-gray-700 text-sm">
                                "${consigna}"
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${fase.preguntasReflexivas && fase.preguntasReflexivas.length > 0 ? `
                <div class="mt-4">
                    <h6 class="font-bold text-gray-800 mb-2">🤔 Preguntas Reflexivas</h6>
                    <ul class="space-y-1 text-sm text-gray-700">
                        ${fase.preguntasReflexivas.map(p => `<li class="flex items-start gap-2"><span class="text-${color}-500">•</span>${p}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${fase.preguntasGuia && fase.preguntasGuia.length > 0 ? `
                <div class="mt-4">
                    <h6 class="font-bold text-gray-800 mb-2">❓ Preguntas Guía</h6>
                    <ul class="space-y-1 text-sm text-gray-700">
                        ${fase.preguntasGuia.map(p => `<li class="flex items-start gap-2"><span class="text-${color}-500">•</span>${p}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${fase.actividades && fase.actividades.length > 0 ? `
                <div class="mt-4">
                    <h6 class="font-bold text-gray-800 mb-2">✅ Actividades</h6>
                    <ul class="space-y-1 text-sm text-gray-700">
                        ${fase.actividades.map(a => `<li class="flex items-start gap-2"><span class="text-${color}-500">✓</span>${a}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${fase.fraseFinal ? `
                <div class="mt-4 bg-gradient-to-r from-${color}-600 to-${color}-700 text-white p-4 rounded-lg text-center font-bold italic">
                    "${fase.fraseFinal}"
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Volver al panel inicial de actividades
 */
function volverAInicio() {
    const contenedor = document.getElementById('contenido-actividad');
    const panelInicial = document.getElementById('panel-inicial');
    
    if (contenedor) {
        contenedor.style.display = 'none';
        contenedor.classList.add('hidden');
    }
    
    if (panelInicial) {
        panelInicial.style.display = 'grid';
    }
    
    // Scroll al inicio
    document.getElementById('vista-guia').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Exportar funciones para uso global
window.mostrarActividadGuia = mostrarActividadGuia;
window.volverAInicio = volverAInicio;

console.log('✅ Guía Didáctica Completa cargada correctamente');
