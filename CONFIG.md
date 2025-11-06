# Configuración del Proyecto Error Creativo

## Configuración de Desarrollo

### Servidor de Desarrollo Local
```bash
# Opción 1: Python HTTP Server
python -m http.server 8000

# Opción 2: Node.js HTTP Server
npx http-server -p 8000

# Opción 3: VS Code Live Server
# Instalar extensión Live Server y hacer click derecho > "Open with Live Server"
```

### Configuración de Tailwind CSS
El proyecto usa Tailwind CSS vía CDN con configuración personalizada:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                "primary": "#13a4ec",
                "primary-dark": "#0f8cc9",
                "secondary": "#f59e0b",
                "accent": "#8b5cf6",
                "background-light": "#f6f7f8",
                "text-main": "#0d171b",
                "text-muted": "#4c809a",
                "success": "#10b981",
                "warning": "#f59e0b",
                "error": "#ef4444",
            },
            fontFamily: {
                "display": ["Lexend", "sans-serif"]
            },
            // ... más configuraciones
        }
    }
}
```

### Variables de Entorno (Futuras)
```env
# Configuración para producción
ENVIRONMENT=production
API_BASE_URL=https://api.errorcreativo.edu
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
CONTACT_EMAIL=info@errorcreativo.edu
```

## Configuración de Producción

### Optimizaciones Recomendadas
1. **Minificación**: CSS y JavaScript
2. **Compresión**: Gzip/Brotli
3. **CDN**: Para recursos estáticos
4. **Cache**: Headers apropiados
5. **SSL**: Certificado HTTPS

### Deployment Checklist
- [ ] Optimizar imágenes
- [ ] Minificar CSS/JS
- [ ] Configurar cache headers
- [ ] Verificar todos los enlaces
- [ ] Probar en múltiples dispositivos
- [ ] Validar accesibilidad
- [ ] Configurar analytics
- [ ] Configurar SEO meta tags

## Configuración de Herramientas

### VS Code Extensions Recomendadas
```json
{
    "recommendations": [
        "ms-vscode.vscode-typescript-next",
        "bradlc.vscode-tailwindcss",
        "ritwickdey.LiveServer",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-css-peek",
        "formulahendry.auto-rename-tag",
        "christian-kohler.path-intellisense"
    ]
}
```

### Prettier Configuration
```json
{
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 80,
    "tabWidth": 4,
    "useTabs": false
}
```

### ESLint Configuration (Futuro)
```json
{
    "extends": ["eslint:recommended"],
    "env": {
        "browser": true,
        "es2021": true
    },
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "warn",
        "no-unused-vars": "error"
    }
}
```

## Testing Configuration

### Testing Manual Checklist
- [ ] Navegación en desktop
- [ ] Navegación en mobile
- [ ] Funcionalidad del canvas
- [ ] Descarga de recursos
- [ ] Formularios
- [ ] Accesibilidad (teclado)
- [ ] Performance
- [ ] Cross-browser compatibility

### Browsers de Testing
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Configuración de Analytics (Futuro)

### Google Analytics 4
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Events Tracking
```javascript
// Tracking de interacciones educativas
gtag('event', 'lab_phase_completed', {
    'custom_parameter': 'phase_name',
    'value': 'apertura'
});

gtag('event', 'resource_downloaded', {
    'custom_parameter': 'resource_type',
    'value': 'manual'
});
```

## Configuración de Seguridad

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com;
    font-src 'self' https://fonts.gstatic.com;
    script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
    img-src 'self' data: https:;
    connect-src 'self';
">
```

### Headers de Seguridad
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Configuración de Performance

### Resource Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
```

### Lazy Loading
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

### Service Worker (Futuro)
```javascript
// Para funcionalidad offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
```

## Configuración de Backup

### Estructura de Backup Recomendada
```
backups/
├── 2025-10-05/
│   ├── codigo/
│   ├── contenido/
│   └── configuracion/
├── 2025-10-04/
└── ...
```

### Script de Backup Automático
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
mkdir -p "backups/$DATE"
cp -r . "backups/$DATE/codigo/"
echo "Backup completado: $DATE"
```

## Monitoreo y Maintenance

### Health Checks
- [ ] Todos los enlaces funcionan
- [ ] Imágenes cargan correctamente
- [ ] Canvas responde en todos los browsers
- [ ] Formularios envían datos
- [ ] Recursos se descargan
- [ ] Performance mantiene > 90 en Lighthouse

### Updates Schedule
- **Semanal**: Revisar reportes de errores
- **Mensual**: Actualizar dependencias
- **Trimestral**: Audit de seguridad
- **Anual**: Revisión completa de UX/UI