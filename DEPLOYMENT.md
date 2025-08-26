# 🌍 Global Deployment Guide

This guide will help you deploy your CoreUI React Admin Template with authentication to make it accessible worldwide.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Free)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy with one command**:
   ```bash
   vercel --prod
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Choose your team/account
   - Confirm deployment settings

### Option 2: Netlify (Free)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Drag and drop** the `build` folder to [Netlify](https://netlify.com)

### Option 3: GitHub Pages

1. **Add to package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔐 Authentication Setup

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Change Credentials
Edit `src/contexts/AuthContext.js`:
```javascript
const ADMIN_CREDENTIALS = {
  username: 'your-username',
  password: 'your-secure-password'
}
```

## 🌐 Environment Variables

For MQTT functionality, set these environment variables in your deployment platform:

```
VITE_MQTT_URL=ws://your-mqtt-broker:8083/mqtt
VITE_MQTT_USERNAME=your-mqtt-username
VITE_MQTT_PASSWORD=your-mqtt-password
VITE_MQTT_TOPIC=your-topic
```

## 🔒 Security Considerations

1. **Change default credentials** immediately after deployment
2. **Use HTTPS** (automatic with Vercel/Netlify)
3. **Consider adding rate limiting** for production use
4. **Implement proper session management** for enterprise use

## 📱 Mobile Access

The application is fully responsive and works on:
- ✅ Desktop browsers
- ✅ Mobile browsers
- ✅ Tablets
- ✅ Progressive Web App (PWA) ready

## 🛠️ Customization

### Change App Title
Edit `public/index.html`:
```html
<title>Your App Name</title>
```

### Change Logo
Replace `src/assets/brand/` files with your logo

### Custom Styling
Edit `src/scss/style.scss` for custom themes

## 🚨 Troubleshooting

### Build Errors
```bash
npm install
npm run build
```

### Deployment Issues
1. Check Node.js version (requires 16+)
2. Ensure all dependencies are installed
3. Verify build output in `build/` folder

### Authentication Issues
1. Clear browser cache
2. Check localStorage for old sessions
3. Verify credentials in AuthContext

## 📞 Support

For deployment issues:
1. Check platform-specific documentation
2. Review build logs
3. Test locally first with `npm start`

---

**🎉 Congratulations!** Your admin dashboard is now accessible worldwide with secure authentication!
