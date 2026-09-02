# Cosplay Radar Mendoza

Plataforma para cosplayers y cosmakers de Mendoza, Argentina.

## 🚀 Deploy en Vercel

### Pasos para desplegar:

1. **Clona este repositorio**
   ```bash
   git clone https://github.com/tu-usuario/cosplay-radar-mendoza.git
   cd cosplay-radar-mendoza
   ```

2. **Instala las dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Prueba localmente**
   ```bash
   npm start
   ```

4. **Build de producción**
   ```bash
   npm run build:prod
   ```

### Configuración en Vercel:

1. Ve a [vercel.com](https://vercel.com)
2. Importa el repositorio
3. Framework: **Angular**
4. Build Command: **npm run build:prod**
5. Output Directory: **dist/cosplay-radar-mendoza/browser**

O simplemente deja que el `vercel.json` configure todo automáticamente.

## 📱 Para Android (Capacitor)

Si necesitas la versión móvil:

```bash
# Instala Capacitor
npm install @capacitor/core @capacitor/android

# Inicializa Capacitor
npx cap init

# Añade Android
npx cap add android

# Sincroniza
npx cap sync

# Abre en Android Studio
npx cap open android
```

## 🛠️ Tecnologías

- Angular 18
- Tailwind CSS
- TypeScript
- PWA Ready

## 📄 Licencia

MIT
