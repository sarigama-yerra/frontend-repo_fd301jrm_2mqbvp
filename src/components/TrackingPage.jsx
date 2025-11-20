import { useEffect, useMemo, useState } from 'react'
import { ROUTES } from '../data/routes'

// Simple Leaflet-less map fallback (we'll draw a box and points) to avoid extra deps
export default function TrackingPage({ dark }){
  const params = new URLSearchParams(location.search)
  const id = params.get('id') || '1'
  const route = useMemo(()=> ROUTES.find(r=>r.id===id),[id])
  const [pos, setPos] = useState({ lat: 17.385, lng: 78.486, ts: Date.now() })

  useEffect(()=>{
    const iv = setInterval(()=>{
      setPos(p => ({ lat: p.lat + (Math.random()-0.5)*0.001, lng: p.lng + (Math.random()-0.5)*0.001, ts: Date.now() }))
    }, 4000)
    return ()=>clearInterval(iv)
  },[])

  const requestShare = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition((g)=>{
      setPos({ lat: g.coords.latitude, lng: g.coords.longitude, ts: Date.now() })
    },()=> alert('Could not get location'))
  }

  return (
    <div className={`min-h-screen pb-28 ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto p-4">
        <a href={`/route/${id}`} className="text-sky-500">← Back</a>
        <h2 className="text-xl font-semibold mt-2">Live Tracking • {route?.number}</h2>
        <div className="text-sm opacity-70">Hyderabad demo map (no external libs).</div>

        <div className="mt-4 border rounded-xl overflow-hidden">
          <div className={`w-full h-64 ${dark?'bg-slate-800':'bg-slate-100'} relative`}>
            <div className="absolute inset-2 border border-dashed border-slate-400 rounded"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-60">Demo Map</div>
            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full" style={{ left: `calc(50% + ${(pos.lng-78.486)*500}px)`, top: `calc(50% - ${(pos.lat-17.385)*500}px)` }}></div>
          </div>
        </div>
        <div className="mt-2 text-sm">Current: {pos.lat.toFixed(5)}, {pos.lng.toFixed(5)} • Updated at {new Date(pos.ts).toLocaleTimeString()}</div>

        <div className="mt-4 flex gap-2">
          <button onClick={requestShare} className="px-3 py-2 rounded bg-sky-600 text-white">Use My Location</button>
          <button onClick={()=>setPos(p=>({ ...p, ts: Date.now() }))} className="px-3 py-2 rounded border">Refresh</button>
        </div>
      </div>
    </div>
  )
}
