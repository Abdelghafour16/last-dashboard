#!/bin/bash

echo "🚀 Deploying CoreUI React Admin Template with Authentication..."

# Build the project
echo "📦 Building the project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "🔐 Default Login Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "📝 To change credentials, edit src/contexts/AuthContext.js"
echo "🌍 Your app is now accessible worldwide!"
