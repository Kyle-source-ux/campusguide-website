# 🌐 CampusGuide - Site Vitrine Officiel

Site web de présentation et téléchargement pour l'application mobile CampusGuide.

**URL Live**: [https://campusguide.space](https://campusguide.space)

---

## 📱 Version Actuelle

**APK**: v2.3.2  
**Build**: 11 Octobre 2025  
**Téléchargement**: [Lien Direct APK](https://expo.dev/artifacts/eas/5C7168eyLUKGjmtg38VM7G.apk)

---

## 🏗️ Structure

```
website/
├── index.html              # Page principale
├── CNAME                   # Configuration domaine
├── assets/
│   ├── CampusGuide_logo_n.png
│   ├── css/
│   │   └── style.css       # Styles modernes glassmorphism
│   └── js/
│       ├── main.js         # Animations & téléchargement
│       └── analytics.js    # Tracking Supabase
├── update-apk-url.js       # Script auto-update
└── docs/
    ├── CHANGELOG_WEBSITE.md
    ├── DEPLOYMENT_STATUS.md
    └── HEBERGEMENT_SUPABASE.md
```

---

## 🎨 Design

### Technologies
- **HTML5** / CSS3 / JavaScript vanilla
- **Font**: Inter (Google Fonts)
- **Style**: Glassmorphism avec gradients
- **Animations**: Scroll effects, counters, particles

### Couleurs
```css
Primary:    #667eea
Secondary:  #764ba2
Accent:     #00b894
Background: #0f0f1e
```

### Responsive
- ✅ Mobile-first design
- ✅ Tablet optimized
- ✅ Desktop full experience

---

## 📊 Analytics

### Supabase Backend
- **Projet**: kbgbxnwfvqwdqwvpbhvg
- **Tables**: website_analytics, website_downloads, website_events

### Données Trackées
- 📍 Géolocalisation IP (pays, ville, coordonnées)
- 📱 Device type & résolution
- 🔗 Référents & sources de trafic
- ⏱️ Temps passé sur le site
- 📥 Téléchargements APK avec version
- 🖱️ Événements (scroll, clics, navigation)

---

## 🚀 Déploiement

### GitHub Pages
**Repository**: [Kyle-source-ux/campusguide-website](https://github.com/Kyle-source-ux/campusguide-website)

```bash
git add .
git commit -m "Update: description"
git push origin main
```

**Propagation**: 1-5 minutes automatique

### Domaine Custom
- **Domaine**: campusguide.space
- **CNAME**: Configuré
- **HTTPS**: Actif (GitHub Pages)

---

## 🔄 Mettre à Jour l'APK

### Méthode 1: Script Automatique
```bash
node update-apk-url.js [BUILD_ID]
```

### Méthode 2: Manuel
1. Récupérer l'URL APK depuis [EAS Dashboard](https://expo.dev/accounts/galillee/projects/campusguide/builds)
2. Modifier 3 fichiers:
   - `index.html` ligne 202
   - `assets/js/main.js` ligne 32
   - `assets/js/analytics.js` lignes 38 & 45
3. Commiter et pusher

---

## 🧪 Test en Local

### Serveur HTTP Simple
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# VS Code
# Installer extension "Live Server"
```

Accès: http://localhost:8000

---

## 📦 Sections du Site

1. **Hero** - Logo + slogan + stats (20K étudiants, 67 universités)
2. **À Propos** - Mission, Vision, Valeurs
3. **Fonctionnalités** - 6 features principales
4. **FAQ** - Questions fréquentes
5. **Témoignages** - Retours d'étudiants
6. **Téléchargement** - Bouton APK principal
7. **Contact** - Support & Partenariats

---

## 🔗 Liens Importants

### Application
- **Repo Principal**: [CampusGuide](https://github.com/[VOTRE_REPO]/CampusGuide)
- **EAS Builds**: [expo.dev/accounts/galillee/projects/campusguide](https://expo.dev/accounts/galillee/projects/campusguide/builds)

### Contact
- **Support**: support@campusguide.space
- **Partenariats**: partenariat@campusguide.space
- **WhatsApp**: [Groupe Communauté](https://chat.whatsapp.com/ISNDZZwt9hrCKfhuaXEx1F)

### Documentation
- [CHANGELOG_WEBSITE.md](CHANGELOG_WEBSITE.md) - Historique versions
- [DEPLOYMENT_STATUS.md](DEPLOYMENT_STATUS.md) - État déploiement
- [HEBERGEMENT_SUPABASE.md](HEBERGEMENT_SUPABASE.md) - Guide hébergement

---

## ⚙️ Configuration

### Variables Analytics
Dans `assets/js/analytics.js`:
```javascript
this.supabaseUrl = 'https://kbgbxnwfvqwdqwvpbhvg.supabase.co';
this.supabaseKey = '[ANON_KEY]';
```

### API Géolocalisation
- **Primaire**: ipapi.co (gratuit, pas de clé requise)
- **Fallback**: ip-api.com (gratuit)

---

## 🛡️ Sécurité

### Données Sensibles
- ⚠️ Clé Supabase **ANON** exposée (normal pour frontend)
- ✅ RLS (Row Level Security) requis sur tables analytics
- ✅ Pas de clés privées dans le code

### Headers Sécurité
GitHub Pages configure automatiquement:
- HTTPS/TLS
- CORS appropriés
- Security headers

---

## 📈 Performance

### Optimisations
- ✅ CSS/JS minifiés (production)
- ✅ Images optimisées
- ✅ Lazy loading images
- ✅ Async scripts
- ✅ CDN GitHub Pages

### Métriques Attendues
- **First Paint**: < 1s
- **Time to Interactive**: < 2s
- **Page Size**: ~150 KB (sans APK)

---

## 🐛 Debugging

### Console Logs
Le site affiche dans la console:
```
🎓 CampusGuide
Version 2.3.2 - campusguide.space
Développé avec ❤️ pour les étudiants de RDC
📊 CampusGuide Analytics initialized
```

### Erreurs Communes
1. **Analytics ne fonctionne pas**: Vérifier tables Supabase
2. **APK ne télécharge pas**: Vérifier URL expirée EAS
3. **Domaine inaccessible**: Vérifier DNS propagation
4. **Style cassé**: Vider cache navigateur

---

## 🤝 Contribution

### Workflow
1. Clone le repo
2. Créer branche: `git checkout -b feature/ma-feature`
3. Faire changements
4. Tester en local
5. Commiter: `git commit -m "Add: description"`
6. Push: `git push origin feature/ma-feature`
7. Créer Pull Request

### Standards
- ✅ Code formaté (Prettier)
- ✅ Commentaires clairs
- ✅ Responsive testé
- ✅ Analytics fonctionnel

---

## 📝 Changelog

Voir [CHANGELOG_WEBSITE.md](CHANGELOG_WEBSITE.md) pour l'historique complet.

### Dernières Mises à Jour
- **v2.3.2** (12 Oct 2025) - Mise à jour APK
- **v2.3.1** (8 Oct 2025) - Première version publique
- **Initial** (5-7 Oct 2025) - Création site complet

---

## 📞 Support

**Problèmes techniques**: Ouvrir une [Issue GitHub](https://github.com/Kyle-source-ux/campusguide-website/issues)  
**Questions générales**: support@campusguide.space  
**Partenariats**: partenariat@campusguide.space

---

## 📄 Licence

© 2025 CampusGuide. Tous droits réservés.

---

**Site développé avec ❤️ pour les étudiants de RDC** 🇨🇩
