/**
 * SISTEMA AVANZADO DE PINCELES - HABITANDO EL ERROR
 * Sistema profesional de herramientas de dibujo con múltiples tipos de pincel,
 * parámetros avanzados, rellenos y optimización de rendimiento
 */

class SistemaAvanzadoPinceles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.lastPoint = null;
        this.currentPath = [];
        
        // Estado del pincel
        this.brushState = {
            type: 'solid', // solid, airbrush, texture, calligraphy, blend
            size: 10,
            opacity: 1.0,
            hardness: 0.8,
            flow: 1.0,
            color: '#000000',
            secondaryColor: '#ffffff'
        };
        
        // Configuraciones de tipos de pincel
        this.brushTypes = {
            solid: {
                name: 'Sólido',
                icon: '🖌️',
                description: 'Pincel básico con bordes definidos',
                renderFunction: 'renderSolid'
            },
            airbrush: {
                name: 'Aerógrafo',
                icon: '💨',
                description: 'Efecto suave tipo spray',
                renderFunction: 'renderAirbrush'
            },
            texture: {
                name: 'Textura',
                icon: '🌊',
                description: 'Pincel con textura rugosa',
                renderFunction: 'renderTexture'
            },
            calligraphy: {
                name: 'Caligrafía',
                icon: '✒️',
                description: 'Trazo variable según velocidad',
                renderFunction: 'renderCalligraphy'
            },
            blend: {
                name: 'Mezcla',
                icon: '🎨',
                description: 'Mezcla con colores existentes',
                renderFunction: 'renderBlend'
            }
        };
        
        // Paleta de colores recientes
        this.recentColors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'];
        
        // Buffer para optimización
        this.offscreenCanvas = null;
        this.offscreenCtx = null;
        
        // Texturas para pinceles
        this.textures = null;
        
        this.init();
    }
    
    /**
     * Inicializar el sistema
     */
    init() {
        this.createTextures();
        this.setupEventListeners();
    }
    
    /**
     * Obtener posición precisa del mouse en el canvas
     */
    obtenerPosicionPrecisaPinceles(event, canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: Math.round((event.clientX - rect.left) * scaleX),
            y: Math.round((event.clientY - rect.top) * scaleY)
        };
    }
    
    /**
     * Configurar canvas principal
     */
    setCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Crear canvas offscreen para optimización
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = canvas.width;
        this.offscreenCanvas.height = canvas.height;
        this.offscreenCtx = this.offscreenCanvas.getContext('2d');
        
        this.setupCanvasEvents();
    }
    
    /**
     * Crear texturas para pinceles
     */
    createTextures() {
        this.textures = {
            // Textura rugosa
            rough: this.generateRoughTexture(32, 32),
            // Textura de papel
            paper: this.generatePaperTexture(64, 64),
            // Textura de spray
            spray: this.generateSprayTexture(16, 16)
        };
    }
    
    /**
     * Generar textura rugosa
     */
    generateRoughTexture(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random();
            const alpha = noise > 0.5 ? 255 * (noise - 0.5) * 2 : 0;
            data[i] = 0;     // R
            data[i + 1] = 0; // G
            data[i + 2] = 0; // B
            data[i + 3] = alpha; // A
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }
    
    /**
     * Generar textura de papel
     */
    generatePaperTexture(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Crear gradiente sutil para simular fibras de papel
        for (let i = 0; i < 100; i++) {
            ctx.strokeStyle = `rgba(128, 128, 128, ${Math.random() * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }
        
        return canvas;
    }
    
    /**
     * Generar textura de spray
     */
    generateSprayTexture(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Puntos aleatorios para efecto spray
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.8})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * width,
                Math.random() * height,
                Math.random() * 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
        
        return canvas;
    }
    
    /**
     * Configurar eventos del canvas
     */
    setupCanvasEvents() {
        if (!this.canvas) return;
        
        // Eventos de mouse
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Eventos táctiles
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        });
    }
    
    /**
     * Obtener posición del mouse relativa al canvas
     */
    getMousePos(e) {
        return this.obtenerPosicionPrecisaPinceles(e, this.canvas);
    }
    
    /**
     * Iniciar dibujo
     */
    startDrawing(e) {
        this.isDrawing = true;
        const pos = this.getMousePos(e);
        this.lastPoint = pos;
        this.currentPath = [pos];
        
        // Aplicar primer punto según el tipo de pincel
        this.applyBrushStroke(pos, pos);
    }
    
    /**
     * Dibujar
     */
    draw(e) {
        if (!this.isDrawing) return;
        
        const pos = this.getMousePos(e);
        this.currentPath.push(pos);
        
        // Aplicar trazo con interpolación para suavidad
        this.applyBrushStroke(this.lastPoint, pos);
        this.lastPoint = pos;
    }
    
    /**
     * Detener dibujo
     */
    stopDrawing() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        this.lastPoint = null;
        this.currentPath = [];
        
        // Aplicar cambios del offscreen canvas al canvas principal
        this.commitOffscreenChanges();
    }
    
    /**
     * Aplicar trazo de pincel
     */
    applyBrushStroke(from, to) {
        const brushType = this.brushTypes[this.brushState.type];
        if (brushType && this[brushType.renderFunction]) {
            this[brushType.renderFunction](from, to);
        }
    }
    
    /**
     * Renderizar pincel sólido
     */
    renderSolid(from, to) {
        const ctx = this.offscreenCtx;
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = this.brushState.opacity;
        ctx.strokeStyle = this.brushState.color;
        ctx.lineWidth = this.brushState.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Aplicar dureza mediante filtro
        const blur = (1 - this.brushState.hardness) * (this.brushState.size * 0.3);
        ctx.filter = blur > 0 ? `blur(${blur}px)` : 'none';
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        
        ctx.filter = 'none';
        this.commitOffscreenChanges();
    }
    
    /**
     * Renderizar aerógrafo
     */
    renderAirbrush(from, to) {
        const ctx = this.offscreenCtx;
        const steps = Math.ceil(this.getDistance(from, to) / 2);
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = from.x + (to.x - from.x) * t;
            const y = from.y + (to.y - from.y) * t;
            
            // Múltiples círculos con diferentes opacidades
            for (let j = 0; j < 5; j++) {
                const radius = (this.brushState.size / 2) * (0.5 + Math.random() * 0.5);
                const offsetX = (Math.random() - 0.5) * this.brushState.size * 0.5;
                const offsetY = (Math.random() - 0.5) * this.brushState.size * 0.5;
                
                ctx.globalAlpha = this.brushState.opacity * this.brushState.flow * 0.1;
                ctx.fillStyle = this.brushState.color;
                
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        this.commitOffscreenChanges();
    }
    
    /**
     * Renderizar pincel con textura
     */
    renderTexture(from, to) {
        const ctx = this.offscreenCtx;
        const texture = this.textures.rough;
        const steps = Math.ceil(this.getDistance(from, to) / 5);
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = from.x + (to.x - from.x) * t - this.brushState.size / 2;
            const y = from.y + (to.y - from.y) * t - this.brushState.size / 2;
            
            ctx.globalAlpha = this.brushState.opacity * this.brushState.flow;
            ctx.globalCompositeOperation = 'multiply';
            
            // Dibujar textura escalada
            ctx.drawImage(
                texture,
                x,
                y,
                this.brushState.size,
                this.brushState.size
            );
        }
        
        this.commitOffscreenChanges();
    }
    
    /**
     * Renderizar pincel caligráfico
     */
    renderCalligraphy(from, to) {
        const ctx = this.offscreenCtx;
        const distance = this.getDistance(from, to);
        const velocity = Math.min(distance * 0.1, 1);
        
        // Tamaño variable según velocidad
        const dynamicSize = this.brushState.size * (0.3 + velocity * 0.7);
        
        ctx.globalAlpha = this.brushState.opacity;
        ctx.strokeStyle = this.brushState.color;
        ctx.lineWidth = dynamicSize;
        ctx.lineCap = 'round';
        
        // Calcular ángulo para forma elíptica
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        
        ctx.save();
        ctx.translate((from.x + to.x) / 2, (from.y + to.y) / 2);
        ctx.rotate(angle);
        ctx.scale(1, 0.5 + velocity * 0.5);
        
        ctx.beginPath();
        ctx.moveTo(-distance / 2, 0);
        ctx.lineTo(distance / 2, 0);
        ctx.stroke();
        
        ctx.restore();
        this.commitOffscreenChanges();
    }
    
    /**
     * Renderizar pincel de mezcla
     */
    renderBlend(from, to) {
        const ctx = this.offscreenCtx;
        
        // Obtener color existente en la posición
        const imageData = this.ctx.getImageData(
            Math.floor(to.x - 1),
            Math.floor(to.y - 1),
            2,
            2
        );
        
        const existingColor = this.getAverageColor(imageData);
        const blendedColor = this.blendColors(existingColor, this.hexToRgb(this.brushState.color));
        
        ctx.globalAlpha = this.brushState.opacity * this.brushState.flow;
        ctx.strokeStyle = `rgb(${blendedColor.r}, ${blendedColor.g}, ${blendedColor.b})`;
        ctx.lineWidth = this.brushState.size;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        
        this.commitOffscreenChanges();
    }
    
    /**
     * Herramienta de relleno sólido
     */
    floodFill(x, y, fillColor) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const targetColor = this.getPixelColor(imageData, x, y);
        
        if (this.colorsMatch(targetColor, this.hexToRgb(fillColor))) {
            return; // Color ya es el mismo
        }
        
        const stack = [{x, y}];
        const visited = new Set();
        
        while (stack.length > 0) {
            const point = stack.pop();
            const key = `${point.x},${point.y}`;
            
            if (visited.has(key)) continue;
            if (point.x < 0 || point.x >= this.canvas.width || 
                point.y < 0 || point.y >= this.canvas.height) continue;
            
            const currentColor = this.getPixelColor(imageData, point.x, point.y);
            if (!this.colorsMatch(currentColor, targetColor)) continue;
            
            visited.add(key);
            this.setPixelColor(imageData, point.x, point.y, this.hexToRgb(fillColor));
            
            // Agregar píxeles adyacentes
            stack.push(
                {x: point.x + 1, y: point.y},
                {x: point.x - 1, y: point.y},
                {x: point.x, y: point.y + 1},
                {x: point.x, y: point.y - 1}
            );
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Relleno con degradado
     */
    gradientFill(startX, startY, endX, endY, type = 'linear') {
        const ctx = this.ctx;
        
        let gradient;
        if (type === 'linear') {
            gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        } else {
            const radius = this.getDistance({x: startX, y: startY}, {x: endX, y: endY});
            gradient = ctx.createRadialGradient(startX, startY, 0, startX, startY, radius);
        }
        
        gradient.addColorStop(0, this.brushState.color);
        gradient.addColorStop(1, this.brushState.secondaryColor);
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = this.brushState.opacity;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Aplicar cambios del canvas offscreen al principal
     */
    commitOffscreenChanges() {
        this.ctx.drawImage(this.offscreenCanvas, 0, 0);
        // Limpiar offscreen para próximo trazo
        this.offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
    }
    
    /**
     * Generar preview del pincel
     */
    generateBrushPreview() {
        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = 100;
        previewCanvas.height = 100;
        const ctx = previewCanvas.getContext('2d');
        
        // Simular trazo de ejemplo
        const from = {x: 20, y: 50};
        const to = {x: 80, y: 50};
        
        // Temporalmente usar el preview canvas
        const originalCanvas = this.canvas;
        const originalCtx = this.ctx;
        const originalOffscreen = this.offscreenCanvas;
        const originalOffscreenCtx = this.offscreenCtx;
        
        this.canvas = previewCanvas;
        this.ctx = ctx;
        this.offscreenCanvas = previewCanvas;
        this.offscreenCtx = ctx;
        
        this.applyBrushStroke(from, to);
        
        // Restaurar canvas original
        this.canvas = originalCanvas;
        this.ctx = originalCtx;
        this.offscreenCanvas = originalOffscreen;
        this.offscreenCtx = originalOffscreenCtx;
        
        return previewCanvas;
    }
    
    // UTILIDADES
    
    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    getPixelColor(imageData, x, y) {
        const index = (y * imageData.width + x) * 4;
        return {
            r: imageData.data[index],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
        };
    }
    
    setPixelColor(imageData, x, y, color) {
        const index = (y * imageData.width + x) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = 255;
    }
    
    colorsMatch(c1, c2) {
        return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;
    }
    
    getAverageColor(imageData) {
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let i = 0; i < imageData.data.length; i += 4) {
            r += imageData.data[i];
            g += imageData.data[i + 1];
            b += imageData.data[i + 2];
            count++;
        }
        
        return {
            r: Math.round(r / count),
            g: Math.round(g / count),
            b: Math.round(b / count)
        };
    }
    
    blendColors(c1, c2) {
        return {
            r: Math.round((c1.r + c2.r) / 2),
            g: Math.round((c1.g + c2.g) / 2),
            b: Math.round((c1.b + c2.b) / 2)
        };
    }
    
    setupEventListeners() {
        // Configurar listeners para UI
        console.log('🎨 Sistema Avanzado de Pinceles inicializado');
    }
}

// Exportar para uso global
window.SistemaAvanzadoPinceles = SistemaAvanzadoPinceles;