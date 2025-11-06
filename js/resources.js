/**
 * GENERADOR DE RECURSOS PDF
 * Sistema para crear y gestionar recursos educativos descargables
 */

class ResourceGenerator {
    constructor() {
        this.resources = {
            manual: {
                title: 'Manual Completo del Error Creativo',
                filename: 'Manual_Error_Creativo.pdf',
                description: 'Guía pedagógica completa con fundamentos teóricos y aplicaciones prácticas',
                content: this.generateManualContent()
            },
            fichas: {
                title: 'Fichas de Actividades',
                filename: 'Fichas_Actividades.pdf',
                description: 'Material didáctico para estudiantes con actividades por fase',
                content: this.generateActivitySheetsContent()
            },
            rubricas: {
                title: 'Rúbricas de Evaluación',
                filename: 'Rubricas_Evaluacion.pdf',
                description: 'Instrumentos de observación y evaluación del proceso creativo',
                content: this.generateRubricsContent()
            },
            materiales: {
                title: 'Lista de Materiales',
                filename: 'Lista_Materiales.pdf',
                description: 'Recursos necesarios organizados por fase del laboratorio',
                content: this.generateMaterialsContent()
            }
        };
    }

    generateManualContent() {
        return `
# MANUAL DEL ERROR CREATIVO
## Modelo Pedagógico para la Transformación Educativa

---

### ÍNDICE

1. **Introducción al Modelo Pedagógico**
   - Fundamentos teóricos
   - Objetivos de aprendizaje
   - Principios metodológicos

2. **Los Cuatro Ejes del Modelo**
   - Arte como Territorio
   - El Artista-Educador
   - Pedagogía del Error
   - Creatividad como Meta

3. **Implementación del Laboratorio Creativo**
   - Fase 1: Apertura - "El hacer del Azar"
   - Fase 2: Inducción - "El lugar que me habita"
   - Fase 3: Resignificación - "Del Retrato al Símbolo"
   - Fase 4: Cierre - "Historias que Nacen del Error"

4. **Evaluación y Seguimiento**
   - Instrumentos de observación
   - Criterios de evaluación
   - Registro del proceso

5. **Adaptaciones y Variaciones**
   - Diferentes grupos etarios
   - Contextos específicos
   - Necesidades especiales

---

### CAPÍTULO 1: INTRODUCCIÓN AL MODELO PEDAGÓGICO

#### ¿Qué es el Error Creativo?

El Error Creativo es una propuesta pedagógica innovadora que redefine el concepto tradicional de "error" en el proceso educativo. En lugar de considerarlo como algo negativo a evitar, lo transforma en una herramienta poderosa para estimular la creatividad, el pensamiento crítico y el aprendizaje significativo.

#### Fundamentos Teóricos

**Base Constructivista**: El modelo se fundamenta en la teoría constructivista del aprendizaje, donde el estudiante construye activamente su conocimiento a través de la experiencia directa.

**Pedagogía Crítica**: Incorpora elementos de la pedagogía crítica, fomentando la reflexión sobre el proceso de aprendizaje y la transformación de la realidad.

**Educación Artística**: Utiliza el arte como vehículo principal para el desarrollo de competencias cognitivas, emocionales y sociales.

#### Objetivos de Aprendizaje

**Cognitivos:**
- Desarrollar pensamiento lateral y divergente
- Fortalecer la capacidad de análisis estético
- Promover la metacognición del proceso creativo
- Estimular la resolución creativa de problemas

**Socioemocionales:**
- Aumentar la tolerancia a la frustración
- Fomentar la autoestima y confianza creativa
- Desarrollar habilidades colaborativas
- Cultivar la empatía y la comprensión del otro

**Procedimentales:**
- Dominar técnicas artísticas básicas
- Aplicar estrategias de pensamiento creativo
- Gestionar el proceso de creación
- Reflexionar sobre el propio aprendizaje

---

### CAPÍTULO 2: LOS CUATRO EJES DEL MODELO

#### EJE 1: ARTE COMO TERRITORIO

**Concepto Central**: El arte se concibe como un espacio libre donde la experimentación y la reestructuración son la norma.

**Características:**
- **Praxis Reflexiva**: Valoración del proceso sobre el producto
- **Territorio Libre**: Espacio sin presión por resultados perfectos
- **Mediador del Pensamiento**: Puente entre lo interno y lo externo
- **Libertad Creativa**: Exploración sin juicios prematuros

**Aplicación Práctica:**
En el laboratorio, cada actividad artística se presenta como una oportunidad de exploración libre, donde los estudiantes pueden experimentar sin temor al juicio o al fracaso.

#### EJE 2: EL ARTISTA-EDUCADOR

**Rol Fundamental**: Figura híbrida que traduce la experiencia estética en aprendizaje significativo.

**Competencias Clave:**
- **Mediación Pedagógica**: Facilita el proceso sin imponer resultados
- **Gestión de la Incertidumbre**: Convierte lo inesperado en oportunidad
- **Diseño de Experiencias**: Crea secuencias provocadoras y reflexivas
- **Práctica Dialógica**: Valida múltiples formas de expresión

**Estrategias de Intervención:**
1. Observación activa del proceso estudiantil
2. Formulación de preguntas generadoras
3. Facilitación de momentos de reflexión
4. Celebración de la diversidad de resultados

#### EJE 3: PEDAGOGÍA DEL ERROR

**Principio Rector**: El error como motor creativo y oportunidad de aprendizaje.

**Dimensiones del Error:**
- **Motor Creativo**: Interruptor que activa el pensamiento lateral
- **Recurso Estético**: Elemento que enriquece la obra final
- **Herramienta de Autoconocimiento**: Espejo del proceso interno
- **Catalizador de Innovación**: Transformador de obstáculos en oportunidades

**Estrategias de Implementación:**
1. Provocar errores intencionales como punto de partida
2. Integrar errores emergentes como elementos valiosos
3. Reflexionar sobre los errores como fuentes de información
4. Celebrar los errores como parte natural del proceso creativo

#### EJE 4: CREATIVIDAD COMO META

**Objetivo Final**: Desarrollo de la creatividad como competencia transversal.

**Manifestaciones de la Creatividad:**
- **Fluidez**: Capacidad de generar múltiples ideas
- **Flexibilidad**: Habilidad para cambiar perspectivas
- **Originalidad**: Producción de ideas únicas
- **Elaboración**: Desarrollo detallado de ideas

**Indicadores de Logro:**
- Generación espontánea de alternativas
- Adaptación flexible a cambios inesperados
- Producción de soluciones originales
- Reflexión profunda sobre el proceso creativo

---

### CAPÍTULO 3: IMPLEMENTACIÓN DEL LABORATORIO CREATIVO

[Continúa con descripción detallada de cada fase...]

---

### ANEXOS

A. Plantillas de planificación
B. Formatos de evaluación
C. Recursos bibliográficos
D. Enlaces de interés

---

**Derechos de Autor**: Este material está licenciado bajo Creative Commons CC BY-SA 4.0
**Versión**: 1.0 - Octubre 2025
**Autora**: [Nombre del autor de la tesis]
`;
    }

    generateActivitySheetsContent() {
        return `
# FICHAS DE ACTIVIDADES
## Error Creativo - Material para Estudiantes

---

## FICHA 1: APERTURA - "EL HACER DEL AZAR"

### Objetivo
Crear personajes ficticios a partir del error/azar como punto de partida intencional.

### Materiales Necesarios
- Papel bond tamaño carta
- Acuarelas o temperas
- Pinceles de diferentes tamaños
- Recipiente con agua
- Toallas de papel
- Lápices de colores o marcadores

### Instrucciones

**Paso 1: Preparación (5 minutos)**
1. Coloca el papel sobre una superficie plana
2. Prepara los colores y ten agua limpia disponible
3. Respira profundo y libera expectativas

**Paso 2: Creación de la Mancha (10 minutos)**
1. Elige 2-3 colores que te llamen la atención
2. Con el pincel cargado de pintura, crea una mancha en el centro del papel
3. Mientras la pintura está húmeda, inclina el papel para que los colores se mezclen
4. Agrega gotas de agua para crear texturas inesperadas
5. Deja secar por 2-3 minutos

**Paso 3: Descubrimiento del Personaje (20 minutos)**
1. Observa tu mancha desde diferentes ángulos
2. ¿Qué formas puedes identificar?
3. Con lápiz, comienza a delinear las formas que ves
4. Agrega detalles para desarrollar tu personaje
5. No te preocupes si no se parece a lo que imaginaste inicialmente

**Paso 4: Creación de la Historia (10 minutos)**
1. Dale un nombre a tu personaje
2. Inventa una breve historia sobre él/ella
3. ¿De dónde viene? ¿Cuál es su poder especial?
4. Escribe la historia al reverso de tu hoja

### Reflexión
- ¿Qué sentiste al crear la mancha sin control?
- ¿Cómo cambió tu percepción de la mancha mientras trabajabas?
- ¿Qué descubriste que no esperabas?

---

## FICHA 2: INDUCCIÓN - "EL LUGAR QUE ME HABITA"

### Objetivo
Transformar una imagen mental en una narrativa creativa, practicando la aceptación del proceso.

### Materiales Necesarios
- Papel bond
- Lápices de colores
- Marcadores
- **IMPORTANTE**: NO se puede usar borrador

### La Regla de Oro
**¡NO PUEDES BORRAR NADA!** Cada línea que dibujes debe permanecer en tu trabajo final.

### Instrucciones

**Paso 1: Reflexión (5 minutos)**
1. Cierra los ojos y piensa en un lugar que sea muy importante para ti
2. Puede ser real o imaginario
3. ¿Qué emociones te genera este lugar?
4. ¿Qué detalles específicos recuerdas?

**Paso 2: Dibujo Continuo (25 minutos)**
1. Comienza a dibujar tu lugar sin levantar el lápiz
2. Si una línea no sale como esperabas, ¡tranquilo! Incorpórala al dibujo
3. Cada "error" puede convertirse en un nuevo elemento
4. Usa diferentes colores para expresar las emociones del lugar

**Paso 3: Adaptación Creativa (15 minutos)**
1. Observa tu dibujo completo
2. ¿Hay líneas que no esperabas?
3. Transforma esas líneas en nuevos elementos del paisaje
4. Agrega detalles que complementen los "accidentes"

**Paso 4: Narrativa (5 minutos)**
1. Escribe una breve descripción de tu lugar
2. Incluye cómo los "errores" enriquecieron tu dibujo

### Reflexión
- ¿Cómo te sentiste al no poder borrar?
- ¿Qué "errores" se convirtieron en elementos interesantes?
- ¿Cambió tu relación con la perfección?

---

## FICHA 3: RESIGNIFICACIÓN - "DEL RETRATO AL SÍMBOLO"

### Objetivo
Reinterpretar un "error" de un retrato, convirtiéndolo en el elemento central de una obra abstracta.

### Materiales Necesarios
- Espejo pequeño
- Lápices
- Papel bond (2 hojas)
- Materiales para collage (opcional)
- Colores diversos

### Instrucciones

**Paso 1: Autorretrato (20 minutos)**
1. Mírate en el espejo y dibuja tu autorretrato
2. No te preocupes por la "perfección"
3. Dibuja lo que ves, incluyendo proporciones inesperadas
4. Observa cada detalle con curiosidad, no con juicio

**Paso 2: Identificación del "Error" (5 minutos)**
1. Observa tu autorretrato completo
2. Identifica un elemento que consideres "incorrectó" o "diferente"
3. Puede ser una proporción, una línea, una forma
4. Círcula o marca ese elemento

**Paso 3: Aislamiento y Amplificación (20 minutos)**
1. En la segunda hoja, dibuja solo ese "error"
2. Amplíalo, exagéralo, dale protagonismo
3. No lo copies exactamente; deja que evolucione
4. Experimenta con colores y texturas

**Paso 4: Transformación Abstracta (10 minutos)**
1. Transforma tu "error" en un símbolo abstracto
2. ¿Qué representa ahora?
3. ¿Qué emociones o ideas expresa?
4. Dale un título a tu nueva obra

### Reflexión
- ¿Cómo cambió tu percepción del "error" al aislarlo?
- ¿Qué descubriste sobre ti mismo/a en el proceso?
- ¿Cómo se siente transformar algo "imperfecto" en arte?

---

## FICHA 4: CIERRE - "HISTORIAS QUE NACEN DEL ERROR"

### Objetivo
Construir una exposición colectiva para reflexionar sobre el viaje y celebrar el proceso.

### Preparación de la Exposición

**Paso 1: Curación de Obras (10 minutos)**
1. Reúne todos tus trabajos de las fases anteriores
2. Selecciona las piezas que mejor representen tu viaje
3. Organízalas en un orden que cuente tu historia

**Paso 2: Creación de Carteles (15 minutos)**
1. Para cada obra, crea un pequeño cartel que incluya:
   - Título de la obra
   - Fase del proceso
   - Una reflexión breve (1-2 frases)
   - Tu firma como artista

**Paso 3: Montaje Colectivo (20 minutos)**
1. Con tus compañeros, organicen el espacio de exposición
2. Cada uno presenta brevemente sus obras
3. Escuchen las historias de los demás
4. Observen cómo cada "error" se convirtió en algo único

**Paso 4: Reflexión Final (15 minutos)**
1. En grupo, compartan:
   - ¿Cómo cambió su relación con el error?
   - ¿Qué aprendieron sobre su propia creatividad?
   - ¿Qué se llevan de esta experiencia?

### Celebración
1. Tomen fotos de la exposición
2. Celebren la diversidad de resultados
3. Reconozcan que no hay dos procesos iguales
4. Agradezcan por la experiencia compartida

---

## REFLEXIÓN GENERAL DEL LABORATORIO

### Preguntas para la Metacognición

**Sobre el Proceso:**
- ¿Cuál fue el momento más desafiante?
- ¿Cuándo te sentiste más libre creando?
- ¿Qué fase disfrutaste más y por qué?

**Sobre el Error:**
- ¿Cómo definías "error" antes del laboratorio?
- ¿Cómo lo defines ahora?
- ¿Puedes dar un ejemplo de cómo un error se convirtió en algo valioso?

**Sobre la Creatividad:**
- ¿Te sientes más o menos creativo después de esta experiencia?
- ¿Qué descubriste sobre tu propio proceso creativo?
- ¿Cómo aplicarías lo aprendido en otras áreas de tu vida?

---

**Material desarrollado para el Modelo Pedagógico Error Creativo**
**Versión estudiantil - Octubre 2025**
`;
    }

    generateRubricsContent() {
        return `
# RÚBRICAS DE EVALUACIÓN
## Error Creativo - Instrumentos de Observación

---

## INTRODUCCIÓN A LA EVALUACIÓN EN ERROR CREATIVO

### Principios de Evaluación

1. **Evaluación Formativa**: Se enfoca en el proceso más que en el producto final
2. **Autoevaluación**: Los estudiantes reflexionan sobre su propio aprendizaje
3. **Evaluación Cualitativa**: Se valoran aspectos no cuantificables del proceso creativo
4. **Evaluación Colaborativa**: Se incluye la perspectiva de pares y docentes

### Criterios Generales

- **Proceso Creativo**: Capacidad de experimentar y explorar
- **Manejo del Error**: Actitud hacia los "errores" y su integración
- **Reflexión Metacognitiva**: Consciencia sobre el propio aprendizaje
- **Expresión Artística**: Uso de elementos visuales y narrativos
- **Colaboración**: Participación en actividades grupales

---

## RÚBRICA 1: FASE DE APERTURA

### Criterio: Experimentación con el Azar

| Nivel | Descriptor | Indicadores |
|-------|------------|-------------|
| **Excelente (4)** | Abraza completamente la experiencia del azar | - Genera manchas con libertad total<br>- Experimenta con diferentes técnicas<br>- Muestra entusiasmo por lo inesperado<br>- Toma riesgos creativos |
| **Satisfactorio (3)** | Acepta la experiencia del azar con algunas reservas | - Genera manchas con cierta libertad<br>- Experimenta con técnicas básicas<br>- Acepta algunos resultados inesperados<br>- Toma algunos riesgos |
| **En Desarrollo (2)** | Muestra resistencia inicial al azar | - Genera manchas con control excesivo<br>- Experimenta limitadamente<br>- Muestra incomodidad con lo impredecible<br>- Evita riesgos |
| **Inicial (1)** | Resiste fuertemente la experiencia del azar | - Intenta controlar completamente el proceso<br>- No experimenta<br>- Rechaza resultados inesperados<br>- No toma riesgos |

### Criterio: Desarrollo del Personaje

| Nivel | Descriptor | Indicadores |
|-------|------------|-------------|
| **Excelente (4)** | Crea personajes ricos y originales a partir de la mancha | - Identifica múltiples posibilidades en la mancha<br>- Desarrolla características únicas<br>- Crea narrativas complejas<br>- Muestra imaginación excepcional |
| **Satisfactorio (3)** | Desarrolla personajes interesantes con detalles apropiados | - Identifica posibilidades claras en la mancha<br>- Desarrolla características básicas<br>- Crea narrativas simples<br>- Muestra imaginación adecuada |
| **En Desarrollo (2)** | Crea personajes básicos con algunos detalles | - Identifica pocas posibilidades<br>- Desarrolla características mínimas<br>- Crea narrativas muy básicas<br>- Muestra imaginación limitada |
| **Inicial (1)** | Tiene dificultad para ver personajes en la mancha | - No identifica posibilidades<br>- No desarrolla características<br>- No crea narrativas<br>- Muestra resistencia a imaginar |

---

## RÚBRICA 2: FASE DE INDUCCIÓN

### Criterio: Aceptación de la Regla "No Borrar"

| Nivel | Descriptor | Indicadores |
|-------|------------|-------------|
| **Excelente (4)** | Abraza completamente la regla y la usa creativamente | - No intenta borrar en ningún momento<br>- Integra cada línea intencionalmente<br>- Transforma "errores" en elementos valiosos<br>- Muestra confianza en el proceso |
| **Satisfactorio (3)** | Acepta la regla con adaptación gradual | - Respeta la regla con esfuerzo consciente<br>- Integra la mayoría de líneas<br>- Transforma algunos "errores"<br>- Muestra creciente confianza |
| **En Desarrollo (2)** | Muestra resistencia pero cumple la regla | - Cumple la regla con dificultad<br>- Integra líneas básicamente<br>- Transforma pocos "errores"<br>- Muestra inseguridad |
| **Inicial (1)** | Resiste fuertemente la regla | - Busca constantemente formas de "corregir"<br>- No integra líneas inesperadas<br>- No transforma "errores"<br>- Muestra frustración evidente |

### Criterio: Representación del Lugar Significativo

| Nivel | Descriptor | Indicadores |
|-------|------------|-------------|
| **Excelente (4)** | Representa el lugar con riqueza emocional y visual | - Incluye detalles significativos<br>- Expresa emociones a través del color y forma<br>- Crea una composición coherente<br>- Comunica la importancia del lugar |
| **Satisfactorio (3)** | Representa el lugar con elementos claros y emotivos | - Incluye detalles básicos<br>- Expresa algunas emociones<br>- Crea una composición funcional<br>- Comunica aspectos del lugar |
| **En Desarrollo (2)** | Representa el lugar con elementos básicos | - Incluye pocos detalles<br>- Expresa emociones limitadamente<br>- Crea una composición simple<br>- Comunica mínimamente |
| **Inicial (1)** | Tiene dificultad para representar el lugar | - No incluye detalles significativos<br>- No expresa emociones<br>- No crea composición coherente<br>- No comunica efectivamente |

---

## RÚBRICA 3: FASE DE RESIGNIFICACIÓN

### Criterio: Identificación y Transformación del "Error"

| Nivel | Descriptor | Indicadores |
|-------|------------|-------------|
| **Excelente (4)** | Identifica y transforma creativamente el "error" | - Identifica elementos únicos como "errores"<br>- Los transforma en el centro de nueva obra<br>- Crea abstracciones originales<br>- Resignifica completamente el concepto |
| **Satisfactorio (3)** | Identifica y transforma adecuadamente el "error" | - Identifica elementos claros como "errores"<br>- Los transforma en elementos importantes<br>- Crea abstracciones funcionales<br>- Resignifica parcialmente |
| **En Desarrollo (2)** | Identifica pero transforma limitadamente el "error" | - Identifica elementos obvios<br>- Los transforma superficialmente<br>- Crea abstracciones básicas<br>- Resignifica mínimamente |
| **Inicial (1)** | Tiene dificultad para identificar o transformar | - No identifica elementos como "errores"<br>- No transforma efectivamente<br>- No crea abstracciones<br>- No resignifica |

---

## RÚBRICA 4: FASE DE CIERRE

### Criterio: Reflexión Metacognitiva

| Nivel | Descriptor | Indicadores |
|-------|------------|-------------|
| **Excelente (4)** | Demuestra reflexión profunda sobre el proceso | - Articula cambios en su percepción del error<br>- Identifica aprendizajes específicos<br>- Conecta la experiencia con otros contextos<br>- Muestra consciencia del crecimiento personal |
| **Satisfactorio (3)** | Demuestra reflexión clara sobre aspectos clave | - Articula algunos cambios de percepción<br>- Identifica aprendizajes generales<br>- Hace algunas conexiones<br>- Muestra alguna consciencia del crecimiento |
| **En Desarrollo (2)** | Demuestra reflexión básica | - Articula pocos cambios<br>- Identifica aprendizajes superficiales<br>- Hace conexiones limitadas<br>- Muestra poca consciencia |
| **Inicial (1)** | Tiene dificultad para reflexionar | - No articula cambios<br>- No identifica aprendizajes<br>- No hace conexiones<br>- No muestra consciencia |

### Criterio: Participación en la Exposición

| Nivel | Descriptor | Indicadores |
|-------|------------|-------------|
| **Excelente (4)** | Participa activa y constructivamente | - Presenta sus obras con confianza<br>- Escucha atentamente a los compañeros<br>- Hace comentarios constructivos<br>- Celebra la diversidad de resultados |
| **Satisfactorio (3)** | Participa adecuadamente | - Presenta sus obras claramente<br>- Escucha a los compañeros<br>- Hace algunos comentarios<br>- Acepta la diversidad |
| **En Desarrollo (2)** | Participa limitadamente | - Presenta con poca confianza<br>- Escucha parcialmente<br>- Hace pocos comentarios<br>- Muestra alguna resistencia |
| **Inicial (1)** | Participa mínimamente | - No presenta efectivamente<br>- No escucha activamente<br>- No hace comentarios<br>- Resiste la participación |

---

## RÚBRICA TRANSVERSAL: PROCESO GENERAL

### Criterio: Evolución de la Relación con el Error

| Nivel | Descriptor | Evidencias Observables |
|-------|------------|----------------------|
| **Transformación (4)** | Cambio fundamental en la percepción del error | - Ve el error como oportunidad desde fase 2<br>- Busca activamente "errores" productivos<br>- Ayuda a otros a valorar sus "errores"<br>- Integra filosofía en otros contextos |
| **Adaptación (3)** | Cambio significativo en la percepción | - Acepta errores como parte del proceso<br>- Ocasionalmente ve oportunidades<br>- Comparte experiencias positivas<br>- Aplica algunos aprendizajes |
| **Apertura (2)** | Cambio gradual en la percepción | - Reduce resistencia a los errores<br>- Comienza a ver algunas oportunidades<br>- Participa con menos ansiedad<br>- Muestra curiosidad ocasional |
| **Resistencia (1)** | Poco o ningún cambio en la percepción | - Mantiene visión negativa del error<br>- Busca constantemente la perfección<br>- Muestra ansiedad persistente<br>- Resiste el cambio de perspectiva |

---

## INSTRUMENTO DE AUTOEVALUACIÓN ESTUDIANTIL

### Para completar al final de cada fase:

**Nombre:** _________________________ **Fecha:** _____________

**Fase:** _________________________

#### 1. ¿Qué fue lo más desafiante de esta fase?
_________________________________________________________________
_________________________________________________________________

#### 2. ¿Qué descubriste sobre ti mismo/a?
_________________________________________________________________
_________________________________________________________________

#### 3. ¿Cómo te sentiste cuando algo no salió como esperabas?
_________________________________________________________________
_________________________________________________________________

#### 4. ¿Qué harías diferente si repitieras esta actividad?
_________________________________________________________________
_________________________________________________________________

#### 5. Califica tu experiencia (1-10) y explica por qué:
**Calificación:** _____ **Razón:** ________________________________
_________________________________________________________________

---

## FORMATO DE OBSERVACIÓN DOCENTE

### Uso durante las sesiones:

**Estudiante:** ______________________ **Fecha:** _______________

**Fase observada:** ___________________

### Comportamientos Observados:

**Inicio de la actividad:**
- Actitud inicial: _______________________________________________
- Nivel de ansiedad: ____________________________________________
- Disposición a experimentar: ____________________________________

**Durante el proceso:**
- Reacción a dificultades: _______________________________________
- Manejo de la frustración: ______________________________________
- Busca apoyo: ________________________________________________
- Apoya a otros: _______________________________________________

**Final de la actividad:**
- Satisfacción con resultado: ____________________________________
- Reflexión espontánea: ________________________________________
- Conexiones realizadas: _______________________________________

### Notas adicionales:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Instrumentos desarrollados para el Modelo Pedagógico Error Creativo**
**Evaluación centrada en el proceso - Octubre 2025**
`;
    }

    generateMaterialsContent() {
        return `
# LISTA DE MATERIALES
## Error Creativo - Recursos por Fase

---

## MATERIALES BÁSICOS PARA TODO EL LABORATORIO

### Materiales Esenciales (Por estudiante)
- [ ] **Papel bond blanco** (tamaño carta) - 10 hojas
- [ ] **Lápices de grafito** (HB y 2B) - 2 unidades
- [ ] **Lápices de colores** (caja de 12 mínimo) - 1 caja
- [ ] **Marcadores de colores** (caja básica) - 1 caja
- [ ] **Acuarelas** (conjunto básico de 12 colores) - 1 conjunto
- [ ] **Pinceles** (tamaños 6, 10 y 14) - 3 unidades
- [ ] **Recipiente para agua** (vaso plástico) - 1 unidad
- [ ] **Toallas de papel** - 1 rollo compartido
- [ ] **Servilletas de tela** (para secar pinceles) - 2 unidades

### Materiales Complementarios
- [ ] **Temperas** (alternativa a acuarelas) - Opcional
- [ ] **Crayones** - Opcional
- [ ] **Papel kraft o periódico** (para proteger superficies)
- [ ] **Delantales o ropa vieja** (para proteger uniforme)

---

## FASE 1: APERTURA - "EL HACER DEL AZAR"

### Materiales Específicos por Estudiante
- [ ] **Papel bond** - 2 hojas
- [ ] **Acuarelas o temperas** - Paleta completa
- [ ] **Pinceles** - Tamaños 10 y 14 principalmente
- [ ] **Recipiente con agua** - 1 unidad
- [ ] **Toallas de papel** - Acceso libre
- [ ] **Lápices de colores** - Para detalles finales
- [ ] **Marcadores** - Para contornos y detalles

### Materiales Adicionales (Opcionales)
- [ ] **Esponjas pequeñas** - Para efectos de textura
- [ ] **Sal de mesa** - Para efectos especiales en acuarela
- [ ] **Alcohol etílico** - Para efectos de dispersión (uso docente)
- [ ] **Goteros** - Para aplicación controlada de agua

### Preparación del Espacio
- [ ] **Mesas cubiertas** con papel kraft o plástico
- [ ] **Acceso a agua** para limpiar pinceles
- [ ] **Área de secado** para obras terminadas
- [ ] **Buena iluminación** natural o artificial

### Tiempo Estimado de Preparación
- **Montaje del espacio:** 10 minutos
- **Distribución de materiales:** 5 minutos
- **Instrucciones iniciales:** 5 minutos
- **Total:** 20 minutos

---

## FASE 2: INDUCCIÓN - "EL LUGAR QUE ME HABITA"

### Materiales Específicos por Estudiante
- [ ] **Papel bond** - 1 hoja grande (A3 preferible)
- [ ] **Lápices de colores** - Caja completa
- [ ] **Marcadores** - Variedad de grosores
- [ ] **Lápiz de grafito** - HB o 2B
- [ ] **⚠️ NO BORRADOR** - Regla fundamental

### Materiales Prohibidos en esta Fase
- [ ] ❌ **Borradores** de cualquier tipo
- [ ] ❌ **Líquido corrector**
- [ ] ❌ **Cualquier herramienta para "corregir"**

### Materiales Opcionales
- [ ] **Crayones** - Para texturas especiales
- [ ] **Papel de colores** - Para collage si se desea
- [ ] **Pegamento en barra** - Si se usa collage

### Preparación del Espacio
- [ ] **Mesas amplias** para trabajo individual
- [ ] **Recolección previa** de todos los borradores
- [ ] **Carteles recordatorios** "NO SE PUEDE BORRAR"
- [ ] **Ambiente relajado** con música suave (opcional)

### Consideraciones Especiales
- **Manejo emocional:** Algunos estudiantes pueden mostrar ansiedad
- **Recordatorios constantes:** Reforzar la regla positivamente
- **Celebración del proceso:** Validar cada trazo como valioso

---

## FASE 3: RESIGNIFICACIÓN - "DEL RETRATO AL SÍMBOLO"

### Materiales Específicos por Estudiante
- [ ] **Espejo pequeño** (10x10 cm mínimo) - 1 por estudiante
- [ ] **Papel bond** - 2 hojas
- [ ] **Lápices de grafito** - HB y 2B
- [ ] **Lápices de colores** - Caja completa
- [ ] **Marcadores** - Variedad de colores
- [ ] **Borrador** - ¡Permitido en esta fase!

### Materiales para Collage (Opcionales)
- [ ] **Revistas viejas** - Para recortar texturas
- [ ] **Tijeras** - 1 por estudiante
- [ ] **Pegamento en barra** - 1 por cada 2 estudiantes
- [ ] **Papel de colores** - Variedad de tonos
- [ ] **Papel metalizado** - Para efectos especiales

### Materiales Adicionales
- [ ] **Cartón pequeño** - Como soporte alternativo
- [ ] **Tinta china** - Para contrastes dramáticos (opcional)
- [ ] **Plumones de punto fino** - Para detalles precisos

### Preparación del Espacio
- [ ] **Iluminación óptima** para observar en el espejo
- [ ] **Espejos disponibles** - 1 por estudiante garantizado
- [ ] **Mesas organizadas** para trabajo individual inicial
- [ ] **Área común** para materiales de collage

### Consideraciones de Seguridad
- [ ] **Espejos seguros** - Verificar que no estén rotos
- [ ] **Tijeras en buen estado** - Puntas romas preferible
- [ ] **Supervisión** durante el uso de materiales cortantes

---

## FASE 4: CIERRE - "HISTORIAS QUE NACEN DEL ERROR"

### Materiales para Montaje de Exposición
- [ ] **Cartón o cartulina** - Para bases de montaje
- [ ] **Pegamento** - Para adherir obras
- [ ] **Marcadores gruesos** - Para carteles y títulos
- [ ] **Cinta adhesiva** - Para fijar en paredes
- [ ] **Chinches o clips** - Para sistemas de colgado
- [ ] **Tijeras** - Para recortar carteles

### Materiales para Presentación
- [ ] **Tarjetas pequeñas** - Para información de obras
- [ ] **Marcadores finos** - Para escribir detalles
- [ ] **Cámara o celular** - Para documentar exposición
- [ ] **Hojas blancas** - Para reflexiones finales

### Decoración y Ambientación
- [ ] **Papel de colores** - Para fondos y marcos
- [ ] **Luces decorativas** - Si están disponibles
- [ ] **Música instrumental** - Para ambiente durante montaje
- [ ] **Plantas o flores** - Para decorar espacio (opcional)

### Documentación
- [ ] **Cámara digital** - Para fotografías de calidad
- [ ] **Cuaderno de registro** - Para testimonios
- [ ] **Marcadores permanentes** - Para firmas en obra colectiva

---

## ALTERNATIVAS DE BAJO COSTO

### Cuando el Presupuesto es Limitado

**En lugar de acuarelas:**
- [ ] **Colorantes alimentarios** + agua
- [ ] **Témperas caseras** (receta incluida abajo)
- [ ] **Café o té** para tonos sepia

**En lugar de papel bond:**
- [ ] **Papel periódico** (reverso en blanco)
- [ ] **Papel de impresora reciclado**
- [ ] **Hojas de cuadernos usados**

**En lugar de pinceles profesionales:**
- [ ] **Pinceles de espuma**
- [ ] **Hisopos de algodón**
- [ ] **Ramitas con algodón atado**

### Receta de Témperas Caseras
**Ingredientes:**
- 2 cucharadas de harina
- 2 cucharadas de sal
- 1/2 taza de agua
- Colorante alimentario

**Preparación:**
1. Mezclar harina y sal
2. Agregar agua gradualmente
3. Cocinar a fuego lento hasta espesar
4. Enfriar y agregar colorante

---

## MATERIALES PARA EL DOCENTE

### Kit Básico del Facilitador
- [ ] **Cronómetro** - Para gestión de tiempos
- [ ] **Cámara** - Para documentar procesos
- [ ] **Cuaderno de observación** - Para notas de campo
- [ ] **Marcadores para pizarra** - Para instrucciones grupales
- [ ] **Campana o instrumento** - Para llamar atención

### Materiales de Emergencia
- [ ] **Toallas húmedas** - Para limpiezas rápidas
- [ ] **Papel extra** - Por si se agota
- [ ] **Materiales de primeros auxilios** - Kit básico
- [ ] **Bolsas plásticas** - Para organizar materiales

### Recursos de Apoyo
- [ ] **Ejemplos visuales** - De trabajos previos
- [ ] **Música instrumental** - Para diferentes momentos
- [ ] **Tarjetas con preguntas** - Para reflexiones
- [ ] **Cronograma visual** - Para mostrar fases

---

## ORGANIZACIÓN Y ALMACENAMIENTO

### Contenedores Recomendados
- [ ] **Cajas plásticas transparentes** - Para materiales por fase
- [ ] **Bandejas organizadoras** - Para materiales pequeños
- [ ] **Carpetas colgantes** - Para trabajos en proceso
- [ ] **Contenedores con tapa** - Para pinturas y líquidos

### Etiquetado
- [ ] **Etiquetas adhesivas** - Para identificar contenedores
- [ ] **Marcador permanente** - Para etiquetado
- [ ] **Código de colores** - Por fase del laboratorio

### Sistema de Distribución
- [ ] **Carritos móviles** - Para transportar materiales
- [ ] **Canastas individuales** - Para materiales por estudiante
- [ ] **Mesa central** - Para materiales compartidos

---

## CHECKLIST DE VERIFICACIÓN PRE-LABORATORIO

### Una Semana Antes
- [ ] Verificar inventario completo de materiales
- [ ] Solicitar materiales faltantes
- [ ] Preparar espacios de trabajo
- [ ] Informar a estudiantes sobre materiales personales

### Un Día Antes
- [ ] Organizar materiales por fase
- [ ] Preparar espacio físico
- [ ] Verificar herramientas tecnológicas (si aplica)
- [ ] Revisar plan de actividades

### El Día del Laboratorio
- [ ] Llegar 30 minutos antes
- [ ] Distribuir materiales por mesa
- [ ] Verificar iluminación y ventilación
- [ ] Preparar área de secado
- [ ] Tener kit de emergencia accesible

---

## PROVEEDORES RECOMENDADOS

### Locales (Buscar en tu ciudad)
- **Librerías universitarias** - Materiales de arte básicos
- **Ferreterías** - Pinceles, recipientes, papel kraft
- **Supermercados** - Colorantes, sal, recipientes plásticos
- **Papelerías escolares** - Papel, lápices, marcadores

### En línea (Alternativas)
- **Mercados en línea** - Compras al por mayor
- **Grupos de intercambio** - Materiales donados o intercambiados
- **Cooperativas docentes** - Compras grupales con descuento

---

## PRESUPUESTO ESTIMADO

### Por Estudiante (25 estudiantes)
| Material | Costo Individual | Costo Total |
|----------|------------------|-------------|
| Papel bond (10 hojas) | $1.00 | $25.00 |
| Lápices de colores | $3.00 | $75.00 |
| Acuarelas básicas | $4.00 | $100.00 |
| Pinceles (3) | $2.00 | $50.00 |
| Marcadores | $2.50 | $62.50 |
| Otros materiales | $2.50 | $62.50 |
| **TOTAL por estudiante** | **$15.00** | **$375.00** |

### Materiales Compartidos
| Material | Costo |
|----------|-------|
| Toallas de papel | $10.00 |
| Materiales de limpieza | $15.00 |
| Materiales del docente | $25.00 |
| Contingencias (10%) | $42.50 |
| **TOTAL COMPARTIDO** | **$92.50** |

### **PRESUPUESTO TOTAL ESTIMADO: $467.50**
*Para 25 estudiantes - Puede variar según región y proveedores*

---

**Lista desarrollada para el Modelo Pedagógico Error Creativo**
**Planificación y gestión de recursos - Octubre 2025**
`;
    }

    // Método para generar PDF (simulación)
    generatePDF(resourceType) {
        const resource = this.resources[resourceType];
        if (!resource) {
            throw new Error(`Recurso ${resourceType} no encontrado`);
        }

        // En una implementación real, aquí se usaría una librería como jsPDF
        // Para la simulación, retornamos la información del recurso
        return {
            success: true,
            filename: resource.filename,
            title: resource.title,
            description: resource.description,
            size: this.estimateSize(resource.content),
            downloadUrl: `#${resourceType}` // URL simulada
        };
    }

    estimateSize(content) {
        const bytes = new Blob([content]).size;
        if (bytes < 1024) return bytes + ' bytes';
        if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
        return Math.round(bytes / (1024 * 1024) * 10) / 10 + ' MB';
    }
}

// Instancia global del generador de recursos
const resourceGenerator = new ResourceGenerator();

// Función para manejar descargas desde el frontend
function handleResourceDownload(resourceType) {
    try {
        const result = resourceGenerator.generatePDF(resourceType);
        
        if (result.success) {
            // Simular descarga creando un blob y enlace
            const content = resourceGenerator.resources[resourceType].content;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = result.filename.replace('.pdf', '.txt'); // Como texto por simplicidad
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            return result;
        }
    } catch (error) {
        console.error('Error generando recurso:', error);
        return { success: false, error: error.message };
    }
}

// Exportar para uso en el módulo principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResourceGenerator, handleResourceDownload };
}