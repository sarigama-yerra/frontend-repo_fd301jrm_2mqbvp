// LocalStorage helpers for persistence
const LS_KEYS = {
  favorites: 'hydbus_favorites',
  capacity: 'hydbus_capacity',
  updates: 'hydbus_updates',
  chat: 'hydbus_support_chat',
  settings: 'hydbus_settings',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export const storage = {
  LS_KEYS,
  getFavorites: () => read(LS_KEYS.favorites, []),
  setFavorites: (v) => write(LS_KEYS.favorites, v),
  getCapacity: () => read(LS_KEYS.capacity, {}), // {routeId: {level, count, driver, conductor, issues, ts}}
  setCapacity: (v) => write(LS_KEYS.capacity, v),
  getUpdates: () => read(LS_KEYS.updates, {}),
  setUpdates: (v) => write(LS_KEYS.updates, v),
  getChat: () => read(LS_KEYS.chat, []),
  setChat: (v) => write(LS_KEYS.chat, v),
  getSettings: () => read(LS_KEYS.settings, { lang: 'en', dark: true }),
  setSettings: (v) => write(LS_KEYS.settings, v),
}
