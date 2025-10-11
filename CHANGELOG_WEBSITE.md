# 📝 Changelog - Site Web CampusGuide

## Version 2.3.2 (12 Octobre 2025)

### 🎯 Mise à Jour APK
- **Version**: 2.3.1 → **2.3.2**
- **Build ID**: `256f0767-f786-4f50-a2f3-3a06c6c43b10`
- **Date du build**: 11 octobre 2025
- **URL APK**: `https://expo.dev/artifacts/eas/5C7168eyLUKGjmtg38VM7G.apk`

### 📝 Fichiers Modifiés

#### 1. **index.html**
```html
<!-- AVANT -->
<p>Disponible sur Android • Version 2.3.1 • ~50 MB</p>

<!-- APRÈS -->
<p>Disponible sur Android • Version 2.3.2 • ~50 MB</p>
```

#### 2. **assets/js/main.js**
- Ligne 31-32: URL APK mise à jour vers build v2.3.2
- Ligne 146: Version console mise à jour

```javascript
// AVANT
const apkUrl = 'https://expo.dev/artifacts/eas/9c280fc9-debf-4a33-a35c-17bf0b7d43ec.apk';
console.log('%cVersion 2.3.1 - campusguide.space', ...);

// APRÈS
const apkUrl = 'https://expo.dev/artifacts/eas/5C7168eyLUKGjmtg38VM7G.apk';
console.log('%cVersion 2.3.2 - campusguide.space', ...);
```

#### 3. **assets/js/analytics.js**
- Ligne 38: Version APK dans tracking téléchargements
- Ligne 44-46: Version dans événements analytics

```javascript
// AVANT
data.apk_version = '2.3.1';
this.trackEvent('apk_download', { version: '2.3.1', ... });

// APRÈS
data.apk_version = '2.3.2';
this.trackEvent('apk_download', { version: '2.3.2', ... });
```

### 🚀 Déploiement

**Repository GitHub**: `Kyle-source-ux/campusguide-website`  
**Branch**: `main`  
**Commit**: `b81a1fc`  
**Message**: "Update to version 2.3.2 - New APK build from 11/10/2025"

**Commandes exécutées**:
```bash
git add .
git commit -m "Update to version 2.3.2 - New APK build from 11/10/2025"
git push origin main
```

### 🌐 Hébergement
- **Plateforme**: GitHub Pages
- **Domaine**: campusguide.space
- **URL Repo**: https://github.com/Kyle-source-ux/campusguide-website
- **CNAME**: Configuré

### 📊 Analytics Tracking
- **Base de données**: Supabase (kbgbxnwfvqwdqwvpbhvg)
- **Tables**: `website_analytics`, `website_downloads`, `website_events`
- **Tracking activé**: ✅ Visites, téléchargements, géolocalisation, événements

### ✅ Vérifications Post-Déploiement
- [x] Version affichée: 2.3.2
- [x] URL APK correcte
- [x] Fichiers commités
- [x] Push vers GitHub réussi
- [x] Analytics mis à jour

---

## Historique des Versions

### Version 2.3.1 (8 Octobre 2025)
- Build ID: `9c280fc9-debf-4a33-a35c-17bf0b7d43ec`
- Première version publique du site vitrine

### Commits Précédents
- `51ac986` - Simplification FAQ, correction témoignages, liens WhatsApp
- `5e5d040` - Refonte complète: À Propos, FAQ, Témoignages
- `0f1898a` - Géolocalisation provinces/régions RDC
- `8cb7249` - Système analytics complet
- `a5da92f` - Création CNAME

---

## 🔄 Procédure de Mise à Jour Future

Pour mettre à jour vers une nouvelle version d'APK:

### Méthode 1: Script Automatique
```bash
node update-apk-url.js [BUILD_ID]
# Exemple: node update-apk-url.js abc123def456
```

### Méthode 2: Manuel
1. Copier l'URL APK depuis EAS Dashboard
2. Modifier `assets/js/main.js` ligne 32
3. Modifier `assets/js/analytics.js` lignes 38 et 45
4. Modifier `index.html` ligne 202
5. Commiter et pusher:
```bash
git add .
git commit -m "Update to version X.X.X"
git push origin main
```

### Propagation
- **GitHub Pages**: 1-5 minutes
- **DNS campusguide.space**: Déjà configuré
- **Cache navigateur**: Vider cache si nécessaire

---

## 📞 Support

**Questions techniques**: tech.director@campusguide.cd  
**Repository**: https://github.com/Kyle-source-ux/campusguide-website  
**App principale**: https://github.com/[VOTRE_REPO]/CampusGuide

---

**Dernière mise à jour**: 12 Octobre 2025, 00:41 UTC+1
