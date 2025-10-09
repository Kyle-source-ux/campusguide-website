#!/usr/bin/env node

// Script pour mettre à jour automatiquement l'URL APK dans le site web
// Usage: node update-apk-url.js [BUILD_ID]

const fs = require('fs');
const path = require('path');

const buildId = process.argv[2];
if (!buildId) {
    console.error('❌ Usage: node update-apk-url.js [BUILD_ID]');
    console.error('📝 Exemple: node update-apk-url.js abc123def456');
    process.exit(1);
}

const jsFilePath = path.join(__dirname, 'assets', 'js', 'main.js');
const apkUrl = `https://expo.dev/artifacts/eas/${buildId}.apk`;

try {
    // Lire le fichier
    let content = fs.readFileSync(jsFilePath, 'utf8');
    
    // Remplacer l'URL
    content = content.replace(
        /const apkUrl = 'https:\/\/expo\.dev\/artifacts\/eas\/.*?\.apk';/,
        `const apkUrl = '${apkUrl}';`
    );
    
    // Écrire le fichier
    fs.writeFileSync(jsFilePath, content);
    
    console.log('✅ URL APK mise à jour avec succès !');
    console.log(`🔗 Nouvelle URL: ${apkUrl}`);
    console.log('📤 N\'oubliez pas de push vers GitHub :');
    console.log('   git add assets/js/main.js');
    console.log('   git commit -m "Update APK URL to v2.3.1"');
    console.log('   git push');
    
} catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
}
