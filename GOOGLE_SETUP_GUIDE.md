# 🔍 Guide Configuration Google Analytics & Search Console

## Date: 14 Octobre 2025

---

## 📊 GOOGLE ANALYTICS 4

### Étape 1: Créer un Compte Google Analytics
1. Aller sur https://analytics.google.com/
2. Cliquer sur **"Commencer à mesurer"**
3. Créer un compte avec les informations:
   - **Nom du compte**: CampusGuide
   - **Nom de la propriété**: campusguide.space
   - **Fuseau horaire**: (GMT+1:00) Kinshasa
   - **Devise**: Dollar américain (USD) ou Franc congolais (CDF)

### Étape 2: Configurer le Flux de Données
1. Sélectionner **"Web"**
2. URL du site web: `https://campusguide.space`
3. Nom du flux: "CampusGuide Website"
4. Cliquer sur **"Créer un flux"**

### Étape 3: Récupérer l'ID de Mesure
1. Après création, vous recevrez un **ID de mesure** au format: `G-XXXXXXXXXX`
2. Copier cet ID

### Étape 4: Remplacer dans index.html
**Ouvrir**: `website/index.html`  
**Rechercher** (2 occurrences aux lignes 37 et 42):
```javascript
G-XXXXXXXXXX
```

**Remplacer par votre vrai ID**, par exemple:
```javascript
G-ABC123DEF4
```

**Fichier final**:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ABC123DEF4', {
        'send_page_view': true,
        'page_title': 'CampusGuide - Accueil',
        'anonymize_ip': true
    });
</script>
```

### Étape 5: Déployer les Changements
```bash
cd website
git add index.html
git commit -m "Add: Google Analytics tracking ID"
git push origin main
```

### Étape 6: Vérifier le Tracking
1. Aller sur https://campusguide.space
2. Ouvrir Console développeur (F12)
3. Vérifier qu'il n'y a pas d'erreur Google Analytics
4. Retourner sur Analytics → Rapports → Temps réel
5. Vous devriez voir votre visite en temps réel ! 🎉

---

## 🔎 GOOGLE SEARCH CONSOLE

### Étape 1: Accéder à Search Console
1. Aller sur https://search.google.com/search-console
2. Cliquer sur **"Commencer"**

### Étape 2: Ajouter une Propriété
1. Sélectionner **"Préfixe d'URL"**
2. Entrer: `https://campusguide.space`
3. Cliquer sur **"Continuer"**

### Étape 3: Vérifier la Propriété

**OPTION A - Balise HTML (Recommandée)**

Google vous donnera une balise comme:
```html
<meta name="google-site-verification" content="ABC123xyz456..." />
```

**Ajouter dans index.html** après la ligne 7:
```html
<meta name="description" content="CampusGuide - L'application étudiante qui connecte les campus de RDC">
<meta name="google-site-verification" content="VOTRE_CODE_ICI" />
<title>CampusGuide - Votre Campus Connecté</title>
```

**OPTION B - Fichier HTML**

Google vous donnera un fichier `googleXXXXXXXXXXXX.html`

**Créer le fichier** dans `/website/`:
```bash
# Copier le contenu fourni par Google
echo "google-site-verification: googleXXXXXXXXXXXX.html" > googleXXXXXXXXXXXX.html
```

**OPTION C - Via Google Analytics**

Si vous avez déjà configuré Google Analytics avec l'ID au-dessus, vous pouvez vérifier via Analytics:
1. Cliquer sur **"Vérifier via Google Analytics"**
2. Search Console détectera automatiquement le tag Analytics
3. Validation instantanée ! ✅

### Étape 4: Soumettre le Sitemap
1. Une fois vérifié, aller dans **"Sitemaps"** (menu gauche)
2. Ajouter le sitemap: `https://campusguide.space/sitemap.xml`
3. Cliquer sur **"Envoyer"**
4. Google commencera à indexer vos pages ! 🚀

### Étape 5: Surveiller les Performances
Dans les jours suivants, Search Console vous montrera:
- **Impressions**: Combien de fois votre site apparaît dans les résultats Google
- **Clics**: Combien de personnes cliquent depuis Google
- **Position moyenne**: Votre ranking dans les résultats
- **Erreurs**: Problèmes d'indexation à corriger

---

## 📈 MÉTRIQUES À SURVEILLER

### Google Analytics
- ✅ **Sessions**: Nombre de visites
- ✅ **Utilisateurs**: Visiteurs uniques
- ✅ **Taux de rebond**: % qui quittent après 1 page
- ✅ **Durée moyenne**: Temps passé sur le site
- ✅ **Pages vues**: Pages les plus populaires
- ✅ **Sources de trafic**: D'où viennent vos visiteurs

### Google Search Console
- ✅ **Requêtes**: Mots-clés tapés dans Google
- ✅ **Clics**: Visites depuis Google
- ✅ **CTR** (Click-Through Rate): % de clics vs impressions
- ✅ **Couverture**: Pages indexées par Google
- ✅ **Erreurs d'exploration**: Problèmes techniques

---

## 🎯 OBJECTIFS & ÉVÉNEMENTS PERSONNALISÉS

### Créer un Événement "Téléchargement APK"

Dans **Google Analytics 4 → Configurer → Événements**:

1. Créer un événement personnalisé
2. Nom: `download_apk`
3. Paramètres:
   - `version`: v2.3.2
   - `platform`: Android
   - `source`: website_button

**Cet événement est déjà envoyé** par `analytics.js` ligne 44-47:
```javascript
this.trackEvent('apk_download', {
    version: '2.3.2',
    source: 'website_button'
});
```

### Créer un Objectif "Téléchargement Réussi"

Dans **GA4 → Configurer → Conversions**:
1. Marquer `apk_download` comme **conversion**
2. Google trackera automatiquement combien de visiteurs téléchargent l'APK

---

## 🔗 LIENS UTILES

- **Google Analytics**: https://analytics.google.com/
- **Search Console**: https://search.google.com/search-console
- **Tag Manager** (optionnel): https://tagmanager.google.com/
- **Google Optimize** (tests A/B): https://optimize.google.com/

---

## ⚙️ CONFIGURATION AVANCÉE (Optionnel)

### Activer Enhanced Measurement

Dans **GA4 → Flux de données → Enhanced measurement**:
- ✅ Scrolling (défilement)
- ✅ Clics sortants (liens externes)
- ✅ Recherche sur site
- ✅ Engagement vidéo
- ✅ Téléchargement de fichiers (APK)

### Créer des Audiences Personnalisées

Exemples d'audiences utiles:
1. **Visiteurs de RDC**: `country == "Democratic Republic of the Congo"`
2. **Téléchargeurs APK**: `event_name == "apk_download"`
3. **Visiteurs engagés**: `session_duration > 60s`
4. **Visiteurs mobiles**: `device_category == "mobile"`

---

## 🧪 TESTER LA CONFIGURATION

### Vérifier Analytics
1. Ouvrir https://campusguide.space
2. Console (F12) → Network
3. Chercher requêtes vers `www.google-analytics.com` ou `analytics.google.com`
4. Si présentes → ✅ Analytics fonctionne !

### Vérifier Search Console
```bash
# Tester le sitemap
curl https://campusguide.space/sitemap.xml

# Tester robots.txt
curl https://campusguide.space/robots.txt
```

---

## 📞 SUPPORT

**Questions techniques**: tech.director@campusguide.cd  
**Documentation Google Analytics**: https://support.google.com/analytics  
**Documentation Search Console**: https://support.google.com/webmasters

---

**Configuration créée le**: 14 Octobre 2025  
**À mettre à jour**: Après obtention des vrais IDs Google
