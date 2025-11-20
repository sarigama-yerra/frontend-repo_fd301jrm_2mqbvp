import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'
import RouteDetailsPage from './components/RouteDetailsPage'
import TrackingPage from './components/TrackingPage'
import NearbyPage from './components/NearbyPage'
import SupportPage from './components/SupportPage'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import { storage } from './lib/storage'

function useQuery(){
  const { search } = useLocation()
  return useMemo(()=> new URLSearchParams(search),[search])
}

function RouteDetailsWrapper({ dark }){
  const q = useQuery()
  return <RouteDetailsPage id={q.get('id') || window.location.pathname.split('/').pop()} dark={dark} />
}

export default function App(){
  const [settings, setSettings] = useState(storage.getSettings())
  const dark = settings.dark
  const lang = settings.lang

  useEffect(()=>{ storage.setSettings(settings) },[settings])

  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
    }
  },[])

  return (
    <div className={`${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto min-h-screen pb-28">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} dark={dark} />} />
          <Route path="/search" element={<SearchPage lang={lang} dark={dark} />} />
          <Route path="/route/:id" element={<RouteDetailsWrapper dark={dark} />} />
          <Route path="/tracking" element={<TrackingPage dark={dark} />} />
          <Route path="/nearby" element={<NearbyPage dark={dark} />} />
          <Route path="/support" element={<SupportPage dark={dark} />} />
          <Route path="/about" element={<AboutPage dark={dark} />} />
        </Routes>
      </div>

      <NavBar lang={lang} dark={dark} onToggleDark={()=>setSettings(s=>({...s, dark: !s.dark}))} onLang={(l)=>setSettings(s=>({...s, lang: l}))} />
    </div>
  )
}
