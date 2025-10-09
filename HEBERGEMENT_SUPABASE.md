# 🚀 Hébergement Vitrine Web sur Supabase

## 📋 Prérequis

- ✅ DNS vérifié dans Resend
- ✅ Vitrine web créée localement
- ⏳ En attente : Propagation DNS complète

---

## 🎯 Méthode : Supabase Storage

### Étape 1 : Créer le Bucket Public

**Connexion Supabase** :
```
1. https://supabase.com/dashboard
2. Projet : CampusGuide
3. Storage → Create bucket
```

**Configuration** :
```
Name: website
Public: ✅ YES
MIME types: text/html, text/css, application/javascript, image/*
```

---

### Étape 2 : Upload des Fichiers

**Structure à uploader** :
```
website/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
```

**Via Dashboard** :
1. Storage → website bucket
2. Upload files
3. Drag & drop tous les fichiers

---

### Étape 3 : Configuration Domaine Custom

**Dans Supabase** :
```
Project Settings → Custom Domains
→ Add Domain : campusguide.space
→ Copier l'IP fournie (ex: 54.123.45.67)
```

---

### Étape 4 : DNS Namecheap

**Ajouter A Record** :
```
Namecheap → Advanced DNS → Add New Record

Type: A Record
Host: @
Value: [IP SUPABASE]
TTL: Automatic
```

**Ajouter CNAME pour www** :
```
Type: CNAME Record
Host: www
Value: campusguide.space
TTL: Automatic
```

---

### Étape 5 : Vérification

**Attendre 10-30 minutes**, puis tester :
```
https://campusguide.space
https://www.campusguide.space
```

**HTTPS automatique** via Supabase !

---

## 🔧 Alternative : GitHub Pages (Optionnel)

Si Supabase Custom Domain ne fonctionne pas :

### 1. Créer Repo GitHub
```bash
git init
git add .
git commit -m "Vitrine CampusGuide"
git remote add origin [URL_REPO]
git push -u origin main
```

### 2. Activer GitHub Pages
```
Settings → Pages
Source: main branch / root
Custom domain: campusguide.space
```

### 3. DNS Namecheap
```
A Records (4 IPs GitHub) :
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

CNAME: www → [USERNAME].github.io
```

---

## 📱 Mise à Jour URL APK

**Après le build terminé** :

1. Copier URL APK depuis EAS Dashboard
2. Modifier `website/assets/js/main.js` :

```javascript
const apkUrl = 'https://expo.dev/artifacts/eas/[VOTRE_BUILD_ID].apk';
```

3. Re-upload sur Supabase

---

## ✅ Checklist Hébergement

### Avant
- [ ] DNS emails vérifié (Resend)
- [ ] Build APK terminé
- [ ] URL APK récupérée

### Pendant
- [ ] Bucket Supabase créé
- [ ] Fichiers uploadés
- [ ] Custom domain configuré
- [ ] IP Supabase récupérée
- [ ] A record ajouté Namecheap
- [ ] CNAME www ajouté

### Après
- [ ] Site accessible https://campusguide.space
- [ ] HTTPS actif (cadenas)
- [ ] Téléchargement APK fonctionne
- [ ] Responsive mobile testé

---

## 🎯 Résultat Final

**Structure complète** :
```
campusguide.space
├── / (vitrine web)
├── /download → APK Android
└── support@campusguide.space → Emails
```

**Fonctionnalités** :
- ✅ Site vitrine moderne
- ✅ Téléchargement APK direct
- ✅ HTTPS sécurisé
- ✅ Responsive mobile
- ✅ Emails professionnels
- ✅ Deep links app

---

## 📞 Aide

**Problèmes courants** :

1. **Site ne s'affiche pas**
   - Vérifier propagation DNS : dnschecker.org
   - Attendre 10-60 minutes
   - Vider cache navigateur

2. **HTTPS non actif**
   - Supabase génère automatiquement
   - Attendre 5-10 minutes après DNS propagé
   - Forcer HTTPS dans paramètres Supabase

3. **APK ne se télécharge pas**
   - Vérifier URL APK dans main.js
   - Tester URL directement
   - Vérifier permissions bucket

---

**Hébergement simple et rapide avec Supabase !** 🚀
