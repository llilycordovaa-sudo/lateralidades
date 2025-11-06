/**
 * INTERFAZ UI PARA SISTEMA AVANZADO DE PINCELES
 * Controles profesionales para herramientas de dibujo avanzadas
 */

class UIAvanzadaPinceles {
    constructor(sistemaPinceles) {
        this.sistema = sistemaPinceles;
        this.container = null;
        this.previewCanvas = null;
        this.colorHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];
        this.init();
    }
    
    init() {
        this.createUI();
        this.setupEventListeners();
        this.updatePreview();
    }
    
    /**
     * Crear interfaz de usuario completa
     */
    createUI() {
        const uiHTML = `
            <div class="herramientas-avanzadas-container bg-white rounded-2xl border-2 border-purple-300 p-6 shadow-xl">
                <!-- Header con título -->
                <div class="header-herramientas mb-6">
                    <h3 class="text-xl font-bold text-purple-700 mb-2 flex items-center gap-2">
                        <span class="text-2xl">🎨</span> Herramientas Profesionales
                    </h3>
                    <p class="text-sm text-gray-600">Sistema avanzado de pinceles con parámetros profesionales</p>
                </div>
                
                <!-- Selector de tipos de pincel -->
                <div class="brush-types-section mb-6">
                    <h4 class="font-bold text-gray-700 mb-3">🖌️ Tipos de Pincel</h4>
                    <div class="brush-types-grid grid grid-cols-5 gap-2">
                        ${Object.entries(this.sistema.brushTypes).map(([key, brush]) => `
                            <button 
                                class="brush-type-btn ${key === this.sistema.brushState.type ? 'active' : ''}" 
                                data-brush-type="${key}"
                                title="${brush.description}">
                                <span class="text-lg">${brush.icon}</span>
                                <span class="text-xs block mt-1">${brush.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Preview del pincel -->
                <div class="brush-preview-section mb-6">
                    <h4 class="font-bold text-gray-700 mb-3">👁️ Vista Previa</h4>
                    <div class="preview-container bg-gray-100 rounded-lg p-4 flex justify-center">
                        <canvas id="brush-preview-canvas" width="150" height="60" class="border border-gray-300 rounded bg-white"></canvas>
                    </div>
                </div>
                
                <!-- Parámetros del pincel -->
                <div class="brush-params-section mb-6">
                    <h4 class="font-bold text-gray-700 mb-3">⚙️ Parámetros</h4>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Tamaño -->
                        <div class="param-group">
                            <label class="block font-medium text-gray-600 mb-2">
                                📏 Tamaño: <span id="size-value">${this.sistema.brushState.size}</span>px
                            </label>
                            <input type="range" id="brush-size" min="1" max="100" value="${this.sistema.brushState.size}" 
                                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                        
                        <!-- Opacidad -->
                        <div class="param-group">
                            <label class="block font-medium text-gray-600 mb-2">
                                🌫️ Opacidad: <span id="opacity-value">${Math.round(this.sistema.brushState.opacity * 100)}</span>%
                            </label>
                            <input type="range" id="brush-opacity" min="0" max="1" step="0.01" value="${this.sistema.brushState.opacity}" 
                                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                        
                        <!-- Dureza -->
                        <div class="param-group">
                            <label class="block font-medium text-gray-600 mb-2">
                                💎 Dureza: <span id="hardness-value">${Math.round(this.sistema.brushState.hardness * 100)}</span>%
                            </label>
                            <input type="range" id="brush-hardness" min="0" max="1" step="0.01" value="${this.sistema.brushState.hardness}" 
                                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                        
                        <!-- Flujo -->
                        <div class="param-group">
                            <label class="block font-medium text-gray-600 mb-2">
                                💧 Flujo: <span id="flow-value">${Math.round(this.sistema.brushState.flow * 100)}</span>%
                            </label>
                            <input type="range" id="brush-flow" min="0" max="1" step="0.01" value="${this.sistema.brushState.flow}" 
                                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                    </div>
                </div>
                
                <!-- Selector de colores -->
                <div class="color-section mb-6">
                    <h4 class="font-bold text-gray-700 mb-3">🎨 Colores</h4>
                    
                    <!-- Colores primario y secundario -->
                    <div class="primary-secondary-colors mb-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="color-primary">
                                <label class="block font-medium text-gray-600 mb-2">Color Primario</label>
                                <div class="flex items-center gap-2">
                                    <input type="color" id="primary-color" value="${this.sistema.brushState.color}" 
                                           class="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer">
                                    <input type="text" id="primary-color-hex" value="${this.sistema.brushState.color}" 
                                           class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono">
                                </div>
                            </div>
                            
                            <div class="color-secondary">
                                <label class="block font-medium text-gray-600 mb-2">Color Secundario</label>
                                <div class="flex items-center gap-2">
                                    <input type="color" id="secondary-color" value="${this.sistema.brushState.secondaryColor}" 
                                           class="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer">
                                    <input type="text" id="secondary-color-hex" value="${this.sistema.brushState.secondaryColor}" 
                                           class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Botón intercambiar colores -->
                        <div class="text-center mt-3">
                            <button id="swap-colors" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                                🔄 Intercambiar
                            </button>
                        </div>
                    </div>
                    
                    <!-- Selector HSL -->
                    <div class="hsl-selector mb-4">
                        <div class="grid grid-cols-3 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-gray-600 mb-1">
                                    Matiz: <span id="hue-value">0</span>°
                                </label>
                                <input type="range" id="hsl-hue" min="0" max="360" value="0" 
                                       class="w-full h-2 rounded-lg appearance-none cursor-pointer hue-slider">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-600 mb-1">
                                    Saturación: <span id="sat-value">0</span>%
                                </label>
                                <input type="range" id="hsl-saturation" min="0" max="100" value="0" 
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-600 mb-1">
                                    Luminosidad: <span id="lum-value">0</span>%
                                </label>
                                <input type="range" id="hsl-lightness" min="0" max="100" value="0" 
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Paleta de colores recientes -->
                    <div class="recent-colors">
                        <label class="block text-sm font-medium text-gray-600 mb-2">Colores Recientes</label>
                        <div id="recent-colors-palette" class="flex flex-wrap gap-2">
                            ${this.generateRecentColorsHTML()}
                        </div>
                    </div>
                </div>
                
                <!-- Herramientas de relleno -->
                <div class="fill-tools-section mb-6">
                    <h4 class="font-bold text-gray-700 mb-3">🪣 Herramientas de Relleno</h4>
                    
                    <div class="fill-buttons grid grid-cols-3 gap-2">
                        <button id="flood-fill-btn" class="fill-tool-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                            🪣 Relleno
                        </button>
                        <button id="linear-gradient-btn" class="fill-tool-btn bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                            📐 Degradado Lineal
                        </button>
                        <button id="radial-gradient-btn" class="fill-tool-btn bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                            🎯 Degradado Radial
                        </button>
                    </div>
                </div>
                
                <!-- Acciones rápidas -->
                <div class="quick-actions">
                    <div class="grid grid-cols-2 gap-3">
                        <button id="clear-canvas-btn" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                            🗑️ Limpiar
                        </button>
                        <button id="save-artwork-btn" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                            💾 Guardar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return uiHTML;
    }
    
    /**
     * Generar HTML de colores recientes
     */
    generateRecentColorsHTML() {
        const defaultColors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const colors = [...this.colorHistory, ...defaultColors].slice(0, 12);
        
        return colors.map(color => `
            <div class="recent-color w-6 h-6 rounded border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform" 
                 style="background-color: ${color}" 
                 data-color="${color}" 
                 title="${color}"></div>
        `).join('');
    }
    
    /**
     * Renderizar UI en un contenedor
     */
    render(container) {
        this.container = container;
        container.innerHTML = this.createUI();
        this.previewCanvas = container.querySelector('#brush-preview-canvas');
        this.setupEventListeners();
        this.updatePreview();
        this.updateHSLFromColor(this.sistema.brushState.color);
    }
    
    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        if (!this.container) return;
        
        // Tipos de pincel
        this.container.querySelectorAll('.brush-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const brushType = e.currentTarget.dataset.brushType;
                this.selectBrushType(brushType);
            });
        });
        
        // Parámetros del pincel
        this.setupParameterListeners();
        
        // Colores
        this.setupColorListeners();
        
        // Herramientas de relleno
        this.setupFillToolListeners();
        
        // Acciones rápidas
        this.setupQuickActions();
    }
    
    /**
     * Configurar listeners de parámetros
     */
    setupParameterListeners() {
        // Tamaño
        const sizeSlider = this.container.querySelector('#brush-size');
        const sizeValue = this.container.querySelector('#size-value');
        sizeSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.sistema.brushState.size = value;
            sizeValue.textContent = value;
            this.updatePreview();
        });
        
        // Opacidad
        const opacitySlider = this.container.querySelector('#brush-opacity');
        const opacityValue = this.container.querySelector('#opacity-value');
        opacitySlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.sistema.brushState.opacity = value;
            opacityValue.textContent = Math.round(value * 100);
            this.updatePreview();
        });
        
        // Dureza
        const hardnessSlider = this.container.querySelector('#brush-hardness');
        const hardnessValue = this.container.querySelector('#hardness-value');
        hardnessSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.sistema.brushState.hardness = value;
            hardnessValue.textContent = Math.round(value * 100);
            this.updatePreview();
        });
        
        // Flujo
        const flowSlider = this.container.querySelector('#brush-flow');
        const flowValue = this.container.querySelector('#flow-value');
        flowSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.sistema.brushState.flow = value;
            flowValue.textContent = Math.round(value * 100);
            this.updatePreview();
        });
    }
    
    /**
     * Configurar listeners de colores
     */
    setupColorListeners() {
        // Color primario
        const primaryColor = this.container.querySelector('#primary-color');
        const primaryHex = this.container.querySelector('#primary-color-hex');
        
        primaryColor.addEventListener('change', (e) => {
            this.setPrimary(e.target.value);
        });
        
        primaryHex.addEventListener('change', (e) => {
            if (this.isValidHex(e.target.value)) {
                this.setPrimaryColor(e.target.value);
            }
        });
        
        // Color secundario
        const secondaryColor = this.container.querySelector('#secondary-color');
        const secondaryHex = this.container.querySelector('#secondary-color-hex');
        
        secondaryColor.addEventListener('change', (e) => {
            this.setSecondaryColor(e.target.value);
        });
        
        secondaryHex.addEventListener('change', (e) => {
            if (this.isValidHex(e.target.value)) {
                this.setSecondaryColor(e.target.value);
            }
        });
        
        // Intercambiar colores
        this.container.querySelector('#swap-colors').addEventListener('click', () => {
            this.swapColors();
        });
        
        // HSL Sliders
        this.setupHSLListeners();
        
        // Colores recientes
        this.container.querySelectorAll('.recent-color').forEach(colorDiv => {
            colorDiv.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.setPrimaryColor(color);
            });
        });
    }
    
    /**
     * Configurar listeners HSL
     */
    setupHSLListeners() {
        const hueSlider = this.container.querySelector('#hsl-hue');
        const satSlider = this.container.querySelector('#hsl-saturation');
        const lumSlider = this.container.querySelector('#hsl-lightness');
        
        const hueValue = this.container.querySelector('#hue-value');
        const satValue = this.container.querySelector('#sat-value');
        const lumValue = this.container.querySelector('#lum-value');
        
        hueSlider.addEventListener('input', (e) => {
            hueValue.textContent = e.target.value;
            this.updateColorFromHSL();
        });
        
        satSlider.addEventListener('input', (e) => {
            satValue.textContent = e.target.value;
            this.updateColorFromHSL();
        });
        
        lumSlider.addEventListener('input', (e) => {
            lumValue.textContent = e.target.value;
            this.updateColorFromHSL();
        });
    }
    
    /**
     * Configurar herramientas de relleno
     */
    setupFillToolListeners() {
        this.container.querySelector('#flood-fill-btn').addEventListener('click', () => {
            this.activeFillMode = 'flood';
            this.showNotification('🪣 Modo relleno activado. Haz clic en el área a rellenar.');
        });
        
        this.container.querySelector('#linear-gradient-btn').addEventListener('click', () => {
            this.activeFillMode = 'linear-gradient';
            this.showNotification('📐 Modo degradado lineal. Arrastra para crear el degradado.');
        });
        
        this.container.querySelector('#radial-gradient-btn').addEventListener('click', () => {
            this.activeFillMode = 'radial-gradient';
            this.showNotification('🎯 Modo degradado radial. Arrastra desde el centro.');
        });
    }
    
    /**
     * Configurar acciones rápidas
     */
    setupQuickActions() {
        this.container.querySelector('#clear-canvas-btn').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres limpiar el canvas?')) {
                this.clearCanvas();
            }
        });
        
        this.container.querySelector('#save-artwork-btn').addEventListener('click', () => {
            this.saveArtwork();
        });
    }
    
    /**
     * Seleccionar tipo de pincel
     */
    selectBrushType(type) {
        this.sistema.brushState.type = type;
        
        // Actualizar UI
        this.container.querySelectorAll('.brush-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.container.querySelector(`[data-brush-type="${type}"]`).classList.add('active');
        
        this.updatePreview();
        
        const brushInfo = this.sistema.brushTypes[type];
        this.showNotification(`${brushInfo.icon} ${brushInfo.name} seleccionado: ${brushInfo.description}`);
    }
    
    /**
     * Establecer color primario
     */
    setPrimaryColor(color) {
        this.sistema.brushState.color = color;
        this.container.querySelector('#primary-color').value = color;
        this.container.querySelector('#primary-color-hex').value = color;
        this.updateHSLFromColor(color);
        this.addToColorHistory(color);
        this.updatePreview();
    }
    
    /**
     * Establecer color secundario
     */
    setSecondaryColor(color) {
        this.sistema.brushState.secondaryColor = color;
        this.container.querySelector('#secondary-color').value = color;
        this.container.querySelector('#secondary-color-hex').value = color;
        this.addToColorHistory(color);
    }
    
    /**
     * Intercambiar colores primario y secundario
     */
    swapColors() {
        const temp = this.sistema.brushState.color;
        this.setPrimaryColor(this.sistema.brushState.secondaryColor);
        this.setSecondaryColor(temp);
    }
    
    /**
     * Actualizar color desde controles HSL
     */
    updateColorFromHSL() {
        const h = parseInt(this.container.querySelector('#hsl-hue').value);
        const s = parseInt(this.container.querySelector('#hsl-saturation').value);
        const l = parseInt(this.container.querySelector('#hsl-lightness').value);
        
        const color = this.hslToHex(h, s, l);
        this.sistema.brushState.color = color;
        this.container.querySelector('#primary-color').value = color;
        this.container.querySelector('#primary-color-hex').value = color;
        this.updatePreview();
    }
    
    /**
     * Actualizar HSL desde color hex
     */
    updateHSLFromColor(hex) {
        const hsl = this.hexToHsl(hex);
        
        this.container.querySelector('#hsl-hue').value = hsl.h;
        this.container.querySelector('#hsl-saturation').value = hsl.s;
        this.container.querySelector('#hsl-lightness').value = hsl.l;
        
        this.container.querySelector('#hue-value').textContent = hsl.h;
        this.container.querySelector('#sat-value').textContent = hsl.s;
        this.container.querySelector('#lum-value').textContent = hsl.l;
    }
    
    /**
     * Actualizar preview del pincel
     */
    updatePreview() {
        if (!this.previewCanvas) return;
        
        const ctx = this.previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
        
        // Fondo para ver mejor la opacidad
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
        
        // Generar preview usando el sistema de pinceles
        const preview = this.sistema.generateBrushPreview();
        ctx.drawImage(preview, 25, 20);
    }
    
    /**
     * Agregar color al historial
     */
    addToColorHistory(color) {
        if (!this.colorHistory.includes(color)) {
            this.colorHistory.unshift(color);
            this.colorHistory = this.colorHistory.slice(0, 8); // Mantener solo 8 colores
            localStorage.setItem('colorHistory', JSON.stringify(this.colorHistory));
            this.updateRecentColorsUI();
        }
    }
    
    /**
     * Actualizar UI de colores recientes
     */
    updateRecentColorsUI() {
        const palette = this.container.querySelector('#recent-colors-palette');
        if (palette) {
            palette.innerHTML = this.generateRecentColorsHTML();
            // Re-agregar event listeners
            palette.querySelectorAll('.recent-color').forEach(colorDiv => {
                colorDiv.addEventListener('click', (e) => {
                    const color = e.target.dataset.color;
                    this.setPrimaryColor(color);
                });
            });
        }
    }
    
    /**
     * Limpiar canvas
     */
    clearCanvas() {
        if (this.sistema.canvas && this.sistema.ctx) {
            this.sistema.ctx.clearRect(0, 0, this.sistema.canvas.width, this.sistema.canvas.height);
            this.showNotification('🧹 Canvas limpiado');
        }
    }
    
    /**
     * Guardar artwork
     */
    saveArtwork() {
        if (this.sistema.canvas) {
            const link = document.createElement('a');
            link.download = `artwork-${Date.now()}.png`;
            link.href = this.sistema.canvas.toDataURL();
            link.click();
            this.showNotification('💾 Artwork guardado');
        }
    }
    
    /**
     * Mostrar notificación
     */
    showNotification(message) {
        // Usar la función global si existe
        if (typeof mostrarNotificacion === 'function') {
            mostrarNotificacion(message, 'info');
        } else {
            console.log(message);
        }
    }
    
    // UTILIDADES DE COLOR
    
    isValidHex(hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }
    
    hexToHsl(hex) {
        const r = parseInt(hex.substr(1, 2), 16) / 255;
        const g = parseInt(hex.substr(3, 2), 16) / 255;
        const b = parseInt(hex.substr(5, 2), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
    
    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        const r = hue2rgb(p, q, h + 1/3);
        const g = hue2rgb(p, q, h);
        const b = hue2rgb(p, q, h - 1/3);
        
        const toHex = (c) => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}

// CSS para los estilos de la UI
const uiStyles = `
<style>
.herramientas-avanzadas-container {
    max-height: 70vh;
    overflow-y: auto;
}

.brush-type-btn {
    @apply flex flex-col items-center justify-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-purple-400 hover:bg-purple-50;
    min-height: 70px;
}

.brush-type-btn.active {
    @apply border-purple-600 bg-purple-100;
}

.param-group input[type="range"] {
    background: linear-gradient(to right, #8B5CF6 0%, #E5E7EB 0%);
}

.hue-slider {
    background: linear-gradient(to right, 
        hsl(0, 100%, 50%), 
        hsl(60, 100%, 50%), 
        hsl(120, 100%, 50%), 
        hsl(180, 100%, 50%), 
        hsl(240, 100%, 50%), 
        hsl(300, 100%, 50%), 
        hsl(360, 100%, 50%)
    ) !important;
}

.fill-tool-btn {
    @apply transition-all hover:scale-105;
}

.recent-color:hover {
    @apply ring-2 ring-purple-400;
}

/* Scrollbar personalizado */
.herramientas-avanzadas-container::-webkit-scrollbar {
    width: 8px;
}

.herramientas-avanzadas-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.herramientas-avanzadas-container::-webkit-scrollbar-thumb {
    background: #8B5CF6;
    border-radius: 4px;
}

.herramientas-avanzadas-container::-webkit-scrollbar-thumb:hover {
    background: #7C3AED;
}
</style>
`;

// Inyectar estilos
if (!document.getElementById('ui-pinceles-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'ui-pinceles-styles';
    styleElement.innerHTML = uiStyles;
    document.head.appendChild(styleElement);
}

// Exportar para uso global
window.UIAvanzadaPinceles = UIAvanzadaPinceles;