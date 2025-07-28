// analytics.js
// Bookoe Analytics Event Tracking

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return 'mobile';
  if (/Tablet|iPad/i.test(ua)) return 'tablet';
  return 'desktop';
}

function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edge') === -1 && ua.indexOf('OPR') === -1) return 'Chrome';
  if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) return 'Safari';
  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('Edge') > -1) return 'Edge';
  if (ua.indexOf('OPR') > -1 || ua.indexOf('Opera') > -1) return 'Opera';
  return 'Other';
}

function trackEvent(eventName, properties = {}) {
  // Compose event data
  const event = {
    event: eventName,
    hero_variant: window.bookoeAnalytics.heroVariant,
    timestamp: new Date().toISOString(),
    session_id: window.bookoeAnalytics.sessionId,
    user_id: window.bookoeAnalytics.userId,
    experiment_name: window.bookoeAnalytics.experimentName || 'hero_ab_test',
    variant: window.bookoeAnalytics.heroVariant,
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    device_type: getDeviceType(),
    browser: getBrowser(),
    country: window.bookoeAnalytics.country || '',
    properties: properties
  };

  // Send to backend
  fetch('http://localhost:8300/api/track-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('📊 Event sent to backend:', data.event_id);
      } else {
        console.error('❌ Backend error:', data.error);
      }
    })
    .catch(err => {
      console.error('❌ Network error sending event:', err);
    });
}
