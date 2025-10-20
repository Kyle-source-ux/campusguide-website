// Analytics Tracking pour campusguide.space
// Envoie les données vers Supabase via l'API

class CampusGuideAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.supabaseUrl = 'https://kbgbxnwfvqwdqwvpbhvg.supabase.co';
    this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiZ2J4bndmdnF3ZHF3dnBiaHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNjg0ODMsImV4cCI6MjA0Mjg0NDQ4M30.7Ym-Wd_Oy8gVYhqvXhfpJmqRfLnFKJNhgFVgKhEgLJI';
    
    this.init();
  }

  init() {
    // Enregistrer la visite de page
    this.trackPageView();
    
    // Écouter les clics sur le bouton de téléchargement
    this.trackDownloadButton();
    
    // Tracking des événements
    this.setupEventTracking();
  }

  async trackPageView() {
    try {
      const data = await this.collectVisitorData();
      await this.sendToSupabase('website_analytics', data);
      console.log('📊 Page view tracked:', window.location.pathname);
    } catch (error) {
      console.error('❌ Erreur tracking page view:', error);
    }
  }

  async trackAPKDownload() {
    try {
      const data = await this.collectVisitorData();
      data.download_type = 'apk';
      data.apk_version = '2.3.4';
      
      await this.sendToSupabase('website_downloads', data);
      console.log('📥 APK download tracked');
      
      // Analytics supplémentaires
      this.trackEvent('apk_download', {
        version: '2.3.4',
        source: 'website_button'
      });
      
    } catch (error) {
      console.error('❌ Erreur tracking APK download:', error);
    }
  }

  trackDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        // Track immédiatement sans confirmation
        this.trackAPKDownload();
      });
    }
  }

  setupEventTracking() {
    // Tracking scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (scrollPercent >= 25 && scrollPercent < 50) {
          this.trackEvent('scroll_25');
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          this.trackEvent('scroll_50');
        } else if (scrollPercent >= 75) {
          this.trackEvent('scroll_75');
        }
      }
    });

    // Tracking time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      this.trackEvent('time_on_page', { seconds: timeSpent });
    });

    // Tracking clics sur navigation
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        this.trackEvent('nav_click', { 
          link: e.target.getAttribute('href'),
          text: e.target.textContent 
        });
      });
    });
  }

  async collectVisitorData() {
    const location = await this.getLocationData();
    
    return {
      page_url: window.location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      screen_resolution: `${screen.width}x${screen.height}`,
      language: navigator.language || 'fr',
      device_type: this.getDeviceType(),
      session_id: this.sessionId,
      country: location.country,
      country_code: location.country_code,
      region: location.region,
      region_code: location.region_code,
      city: location.city,
      postal: location.postal,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
      ip_address: location.ip,
      isp: location.isp,
      timestamp: new Date().toISOString()
    };
  }

  async getLocationData() {
    try {
      // API ipapi.co avec détails géographiques complets
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      return {
        country: data.country_name || null,
        country_code: data.country_code || null,
        region: data.region || null,
        region_code: data.region_code || null,
        city: data.city || null,
        postal: data.postal || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        timezone: data.timezone || null,
        ip: data.ip || null,
        isp: data.org || null
      };
    } catch (error) {
      console.warn('⚠️ Géolocalisation ipapi.co échouée, tentative fallback...');
      
      // Fallback avec ip-api.com
      try {
        const fallbackResponse = await fetch('http://ip-api.com/json/');
        const fallbackData = await fallbackResponse.json();
        
        return {
          country: fallbackData.country || null,
          country_code: fallbackData.countryCode || null,
          region: fallbackData.regionName || null,
          region_code: fallbackData.region || null,
          city: fallbackData.city || null,
          postal: fallbackData.zip || null,
          latitude: fallbackData.lat || null,
          longitude: fallbackData.lon || null,
          timezone: fallbackData.timezone || null,
          ip: fallbackData.query || null,
          isp: fallbackData.isp || null
        };
      } catch (fallbackError) {
        console.warn('⚠️ Géolocalisation fallback échouée:', fallbackError);
        return { 
          country: null, 
          region: null, 
          city: null, 
          ip: null,
          country_code: null,
          region_code: null,
          postal: null,
          latitude: null,
          longitude: null,
          timezone: null,
          isp: null
        };
      }
    }
  }

  getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
      return 'mobile';
    } else if (/tablet|ipad/.test(userAgent)) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  async sendToSupabase(table, data) {
    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('❌ Erreur envoi Supabase:', error);
      // Fallback: stocker en localStorage pour retry plus tard
      this.storeForRetry(table, data);
      return false;
    }
  }

  trackEvent(eventName, eventData = {}) {
    console.log(`📊 Event: ${eventName}`, eventData);
    
    // Envoyer à Supabase (optionnel)
    this.sendToSupabase('website_events', {
      event_name: eventName,
      event_data: JSON.stringify(eventData),
      session_id: this.sessionId,
      page_url: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }

  storeForRetry(table, data) {
    try {
      const retryData = JSON.parse(localStorage.getItem('analytics_retry') || '[]');
      retryData.push({ table, data, timestamp: Date.now() });
      localStorage.setItem('analytics_retry', JSON.stringify(retryData));
    } catch (error) {
      console.warn('⚠️ Impossible de stocker pour retry:', error);
    }
  }

  generateSessionId() {
    return 'web_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
}

// Initialiser le tracking
document.addEventListener('DOMContentLoaded', () => {
  window.campusGuideAnalytics = new CampusGuideAnalytics();
  console.log('📊 CampusGuide Analytics initialized');
});

// Export pour usage externe
window.CampusGuideAnalytics = CampusGuideAnalytics;
