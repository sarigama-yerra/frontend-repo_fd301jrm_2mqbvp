export const STRINGS = {
  en: {
    home: 'Home',
    search: 'Bus Search',
    nearby: 'Nearby',
    support: 'Support',
    about: 'About',
    from: 'From',
    to: 'To',
    findBuses: 'Find Buses',
    favorites: 'Favorites',
    liveTracking: 'Live Tracking',
    routeDetails: 'Route Details',
    crowd: 'Crowd',
    low: 'Low',
    medium: 'Medium',
    full: 'Full',
    update: 'Update',
    save: 'Save',
    share: 'Share',
    darkMode: 'Dark Mode',
  },
  te: {
    home: 'హోం',
    search: 'బస్ సెర్చ్',
    nearby: 'దగ్గరలో',
    support: 'సపోర్ట్',
    about: 'గురించి',
    from: 'నుంచి',
    to: 'వరకు',
    findBuses: 'బస్సులు కనుకోండి',
    favorites: 'ఇష్టాలు',
    liveTracking: 'లైవ్ ట్రాకింగ్',
    routeDetails: 'రూట్ వివరాలు',
    crowd: 'గుంపు',
    low: 'తక్కువ',
    medium: 'మధ్యస్థం',
    full: 'పూర్తి',
    update: 'అప్‌డేట్',
    save: 'సేవ్',
    share: 'షేర్',
    darkMode: 'డార్క్ మోడ్',
  }
}

export function t(lang, key){
  return STRINGS[lang]?.[key] || STRINGS.en[key] || key
}
