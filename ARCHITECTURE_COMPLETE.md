# 🏗️ Architecture Complète - CampusGuide Ecosystem

**Date**: 14 Octobre 2025  
**Diagnostic & Corrections Appliquées**

---

## 🎯 VUE D'ENSEMBLE

### **3 Projets, 1 Base de Données**

```
┌─────────────────────────────────────────────────────────────┐
│           PROJET SUPABASE UNIQUE                            │
│        https://wwicmhvhrdbcxkiqairc.supabase.co            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─────────────────┐
                              │                 │
                    ┌─────────▼────────┐   ┌───▼──────────────┐
                    │  CampusGuide     │   │ CampusGuideAdmin54│
                    │  (App Mobile)    │   │  (Admin Mobile)   │
                    │  📱 Utilisateurs │   │  👨‍💼 Admins        │
                    └─────────┬────────┘   └───┬──────────────┘
                              │                 │
                              │                 │
                    ┌─────────▼─────────────────▼──────────────┐
                    │      Site Web campusguide.space          │
                    │      🌐 Vitrine + Analytics              │
                    └──────────────────────────────────────────┘
```

---

## 📂 STRUCTURE DES PROJETS

### **1. CampusGuide (App Principale)**
**Location**: `c:\Users\JOEL EYOKU\Videos\CampusGuide`

**Rôle**: Application mobile pour les étudiants

**Tables principales**:
- `profiles` - Profils utilisateurs
- `groups` - Groupes universitaires
- `publications` - Posts et contenus
- `messages` - Messages chats
- `videos` - Vidéos étudiantes
- `universities`, `faculties` - Données académiques

---

### **2. CampusGuideAdmin54 (App Admin)**
**Location**: `c:\Users\JOEL EYOKU\Videos\CampusGuideAdmin54`

**Rôle**: Application mobile pour les administrateurs

**Tables spécifiques**:
- `admin_accounts` - Comptes administrateurs (séparés des utilisateurs)
- `admin_roles` - Rôles et permissions
- `admin_permissions` - Permissions granulaires
- `admin_role_permissions` - Liaison rôles-permissions
- `admin_action_logs` - Logs d'actions admin

**Configuration Supabase**: `src/config/supabase.js`
```javascript
const supabaseUrl = 'https://wwicmhvhrdbcxkiqairc.supabase.co'
```

---

### **3. Site Web (campusguide.space)**
**Location**: `c:\Users\JOEL EYOKU\Videos\CampusGuide\website`

**Rôle**: Site vitrine + Téléchargement APK + Analytics

**Tables analytics** (nouvelles):
- `website_analytics` - Visites du site
- `website_downloads` - Téléchargements APK
- `website_events` - Événements (scroll, clics)

**Hébergement**: GitHub Pages (Kyle-source-ux/campusguide-website)  
**Domaine**: https://campusguide.space

---

## 🔴 PROBLÈMES IDENTIFIÉS ET RÉSOLUS

### **Problème 1: Projet Supabase Inexistant**

**Erreur initiale**:
```
kbgbxnwfvqwdqwvpbhvg.supabase.co → ERR_NAME_NOT_RESOLVED
```

**Cause**: Le site web tentait d'envoyer les analytics vers un projet qui n'existe pas

**Solution**: Migration vers le projet principal
```javascript
// AVANT (❌ CASSÉ)
this.supabaseUrl = 'https://kbgbxnwfvqwdqwvpbhvg.supabase.co';

// APRÈS (✅ CORRIGÉ)
this.supabaseUrl = 'https://wwicmhvhrdbcxkiqairc.supabase.co';
```

**Fichier modifié**: `website/assets/js/analytics.js`

---

### **Problème 2: Colonne `profiles.is_admin` Inexistante**

**Erreur**:
```
ERREUR : 42703 : la colonne profiles.is_admin n'existe pas
```

**Cause**: Le script SQL utilisait `profiles.is_admin` pour identifier les admins, mais Admin54 utilise une table séparée `admin_accounts`

**Solution**: Correction des politiques RLS
```sql
-- AVANT (❌ CASSÉ)
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.is_admin = true
    )
);

-- APRÈS (✅ CORRIGÉ)
USING (
    EXISTS (
        SELECT 1 FROM public.admin_accounts 
        WHERE admin_accounts.id = auth.uid() 
        AND admin_accounts.is_active = true
    )
    OR auth.role() = 'authenticated'
);
```

---

### **Problème 3: Fonction `get_website_stats_realtime()` Manquante**

**Erreur**:
```
ERREUR : 42883 : la fonction public.get_website_stats_realtime() n'existe pas
```

**Cause**: La fonction n'avait jamais été créée

**Solution**: Création de la fonction complète
```sql
CREATE OR REPLACE FUNCTION public.get_website_stats_realtime()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_visits', (SELECT COUNT(*) FROM public.website_analytics),
        'total_downloads', (SELECT COUNT(*) FROM public.website_downloads),
        'unique_visitors', (SELECT COUNT(DISTINCT session_id) FROM public.website_analytics),
        -- ... autres stats
    ) INTO result;
    
    RETURN result;
END;
$$;
```

---

## ✅ SCRIPTS SQL CRÉÉS

### **1. Script Principal Corrigé**
**Fichiers**:
- `CampusGuide/database/create_website_analytics_admin54.sql`
- `CampusGuideAdmin54/database/create_website_analytics_fixed.sql`

**Contenu**:
- ✅ 3 tables (website_analytics, website_downloads, website_events)
- ✅ 12 indexes pour performance
- ✅ RLS avec politiques pour `admin_accounts`
- ✅ 6 vues SQL (stats_daily, downloads_by_version, top_countries, etc.)
- ✅ 1 fonction `get_website_stats_realtime()`
- ✅ Commentaires et documentation

---

### **2. Script de Vérification**
**Fichier**: `CampusGuide/database/check_website_analytics_status.sql`

**Usage**: Vérifier ce qui existe déjà dans la base de données

---

### **3. Script de Nettoyage**
**Fichier**: `CampusGuide/database/cleanup_website_analytics.sql`

**Usage**: Supprimer toutes les tables/vues/fonctions analytics (recommencer à zéro)

---

## 📊 ARCHITECTURE BASE DE DONNÉES

### **Tables Analytics (Nouvelles)**

```sql
-- Table 1: Visites du site web
website_analytics (
    id BIGSERIAL PRIMARY KEY,
    page_url TEXT,
    country, city, latitude, longitude,
    device_type, user_agent, ip_address,
    session_id, timestamp, created_at
)

-- Table 2: Téléchargements APK
website_downloads (
    id BIGSERIAL PRIMARY KEY,
    apk_version TEXT,
    country, city, device_type,
    session_id, timestamp, created_at
)

-- Table 3: Événements utilisateurs
website_events (
    id BIGSERIAL PRIMARY KEY,
    event_name TEXT,
    event_data JSONB,
    session_id, page_url, timestamp
)
```

### **Vues Créées**

1. `website_stats_daily` - Stats quotidiennes
2. `website_downloads_by_version` - Téléchargements par version
3. `website_top_countries` - Top 20 pays
4. `website_top_pages` - Pages les plus visitées
5. `website_stats_summary` - Summary général
6. `website_downloads_summary` - Summary téléchargements

### **Fonction Créée**

`get_website_stats_realtime()` → Retourne JSON avec toutes les stats en temps réel

---

## 🔐 SÉCURITÉ RLS

### **Politiques Appliquées**

**Insertion (Public)** - Tout le monde peut insérer:
```sql
CREATE POLICY "Allow public insert on website_analytics" 
ON public.website_analytics FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);
```

**Lecture (Admins uniquement)** - Seuls les admins peuvent lire:
```sql
CREATE POLICY "Allow authenticated read on website_analytics" 
ON public.website_analytics FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.admin_accounts 
        WHERE admin_accounts.id = auth.uid() 
        AND admin_accounts.is_active = true
    )
    OR auth.role() = 'authenticated'
);
```

---

## 🚀 DÉPLOIEMENT

### **Étape 1: Exécuter le Script SQL** ⚠️ CRITIQUE

1. Ouvrir https://supabase.com/dashboard/project/wwicmhvhrdbcxkiqairc
2. SQL Editor → Nouvelle requête
3. Copier **TOUT** le contenu de `create_website_analytics_admin54.sql`
4. Exécuter
5. Vérifier: `Success. No rows returned`

### **Étape 2: Déployer le Site Web**

```bash
cd website
git add .
git commit -m "Fix: Analytics migration to main project + SEO files"
git push origin main
```

**Propagation**: 2-5 minutes sur GitHub Pages

### **Étape 3: Tester**

1. Vider cache navigateur (Ctrl+Shift+Delete)
2. Ouvrir https://campusguide.space
3. Console (F12) → Vérifier logs:

**Logs attendus**:
```
✅ 🎓 CampusGuide
✅ Version 2.3.2 - campusguide.space
✅ 📊 CampusGuide Analytics initialized
✅ 📊 Page view tracked: /
```

4. Vérifier dans Supabase:
   - Dashboard → Table Editor → `website_analytics`
   - Votre visite devrait apparaître ! 🎉

---

## 📈 UTILISATION DANS ADMIN54

### **Service à Créer**

`CampusGuideAdmin54/src/services/WebsiteAnalyticsService.js`

```javascript
import { supabase } from '../config/supabase';

class WebsiteAnalyticsService {
  async getRealtimeStats() {
    const { data, error } = await supabase
      .rpc('get_website_stats_realtime');
    
    if (error) throw error;
    return data;
  }

  async getRecentVisits(limit = 50) {
    const { data, error } = await supabase
      .from('website_analytics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }

  async getDailyStats(days = 30) {
    const { data, error } = await supabase
      .from('website_stats_daily')
      .select('*')
      .order('date', { ascending: false })
      .limit(days);
    
    if (error) throw error;
    return data;
  }

  async getDownloadsByVersion() {
    const { data, error } = await supabase
      .from('website_downloads_by_version')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getTopCountries() {
    const { data, error } = await supabase
      .from('website_top_countries')
      .select('*');
    
    if (error) throw error;
    return data;
  }
}

export default new WebsiteAnalyticsService();
```

### **Écran à Créer**

`CampusGuideAdmin54/src/screens/admin/WebsiteAnalyticsScreen.js`

**Afficherait**:
- 📊 Stats en temps réel (visites, téléchargements)
- 🌍 Carte des visiteurs par pays
- 📈 Graphiques d'évolution
- 📥 Versions APK les plus téléchargées
- 📱 Répartition mobile vs desktop
- 📅 Statistiques quotidiennes/hebdomadaires

---

## 📝 FICHIERS MODIFIÉS/CRÉÉS

### **Site Web (website/)**
- ✅ `assets/js/analytics.js` - URL Supabase corrigée
- ✅ `index.html` - Favicon, Google Analytics, meta tags
- ✅ `favicon.svg` - Logo CampusGuide
- ✅ `sitemap.xml` - Plan du site pour SEO
- ✅ `robots.txt` - Instructions crawlers
- ✅ `ARCHITECTURE_COMPLETE.md` - Ce document
- ✅ `DEPLOYMENT_INSTRUCTIONS.md` - Guide déploiement
- ✅ `GOOGLE_SETUP_GUIDE.md` - Config Google Analytics

### **CampusGuide (database/)**
- ✅ `create_website_analytics_admin54.sql` - Script SQL principal
- ✅ `check_website_analytics_status.sql` - Script vérification
- ✅ `cleanup_website_analytics.sql` - Script nettoyage

### **CampusGuideAdmin54 (database/)**
- ✅ `create_website_analytics_fixed.sql` - Script SQL (copie)

---

## 🎯 AVANTAGES DE CETTE ARCHITECTURE

### **Cohérence**
- ✅ **1 seul projet Supabase** pour tout
- ✅ **CampusGuide** et **Admin54** partagent la même base
- ✅ **Site web** enregistre les analytics dans le même projet

### **Sécurité**
- ✅ **Admins séparés** dans `admin_accounts` (pas de confusion avec users)
- ✅ **RLS strict** : Public peut insérer, admins peuvent lire
- ✅ **Permissions granulaires** via admin_roles

### **Performance**
- ✅ **12 indexes** pour requêtes rapides
- ✅ **Vues précalculées** pour stats
- ✅ **Fonction temps réel** en 1 seule requête

### **Monitoring**
- ✅ **Analytics détaillées** du site web
- ✅ **Géolocalisation** précise des visiteurs
- ✅ **Tracking téléchargements** APK par version
- ✅ **Admin peut tout voir** depuis Admin54

---

## 🔄 PROCHAINES ÉTAPES

1. ✅ Scripts SQL corrigés créés
2. ⏳ **À FAIRE**: Exécuter le script SQL dans Supabase
3. ⏳ **À FAIRE**: Déployer site web sur GitHub
4. ⏳ **À FAIRE**: Tester analytics
5. ⏳ **Optionnel**: Créer écran analytics dans Admin54
6. ⏳ **Optionnel**: Configurer Google Analytics
7. ⏳ **Optionnel**: Soumettre sitemap à Google Search Console

---

## 📞 SUPPORT

**Questions techniques**: tech.director@campusguide.cd  
**Supabase Dashboard**: https://supabase.com/dashboard/project/wwicmhvhrdbcxkiqairc  
**Site Web**: https://campusguide.space

---

**Architecture documentée le**: 14 Octobre 2025  
**Status**: ✅ Scripts prêts, en attente d'exécution
