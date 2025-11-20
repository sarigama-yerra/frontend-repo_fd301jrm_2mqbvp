import { useEffect, useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import { searchRoutes } from '../data/routes'
import { storage } from '../lib/storage'
import { t } from '../i18n'

export default function SearchPage({ lang, dark }){
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [results, setResults] = useState([])
  const [favorites, setFavorites] = useState(storage.getFavorites())
  const [cap, setCap] = useState(storage.getCapacity())

  useEffect(()=>{ setResults(searchRoutes(from, to)) },[from,to])

  const toggleFav = (id) => {
    let next
    if (favorites.includes(id)) next = favorites.filter(x=>x!==id)
    else next = [...favorites,id]
    setFavorites(next)
    storage.setFavorites(next)
  }

  const updateCap = (routeId, change) => {
    const now = Date.now()
    const prev = cap[routeId] || { level:'Low', count:0, driver:'', conductor:'', issues:'', ts: now }
    const next = { ...cap, [routeId]: { ...prev, ...change, ts: now } }
    setCap(next)
    storage.setCapacity(next)
  }

  const shareRoute = (r) => {
    const text = `HYD Bus ${r.number} - ${r.name} (From ${r.from} to ${r.to}). Stops: ${r.stops.join(' → ')}`
    if (navigator.share) navigator.share({ title: 'HYD Bus Route', text })
    else alert(text)
  }

  return (
    <div className={`min-h-screen pb-28 ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">{t(lang,'search')}</h2>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <input className="border rounded px-3 py-2" placeholder={t(lang,'from')} value={from} onChange={e=>setFrom(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder={t(lang,'to')} value={to} onChange={e=>setTo(e.target.value)} />
        </div>

        <div className="space-y-3">
          {results.map(r => (
            <div key={r.id} className="border rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{r.number} • {r.name}</div>
                  <div className="text-xs opacity-70">{r.from} → {r.to}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>toggleFav(r.id)} className={`p-2 rounded border ${favorites.includes(r.id)?'bg-rose-500 text-white':'border-slate-300'}`}>
                    <Heart className="w-4 h-4" />
                  </button>
                  <button onClick={()=>shareRoute(r)} className="p-2 rounded border border-slate-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <a className="px-3 py-2 rounded bg-sky-600 text-white" href={`/route/${r.id}`}>Details</a>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>First: {r.startTime}</div>
                <div>Last: {r.endTime}</div>
                <div>Every ~{r.frequencyMins} mins</div>
                <div>Stops: {r.stops.length}</div>
              </div>

              <div className="mt-3 text-sm">
                <div className="font-medium">Capacity</div>
                <div className="flex gap-2 mt-1">
                  {['Low','Medium','Full'].map(level => (
                    <button key={level} onClick={()=>updateCap(r.id, { level })} className={`px-3 py-1 rounded border ${cap[r.id]?.level===level?'bg-emerald-600 text-white':'border-slate-300'}`}>{level}</button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <input className="border rounded px-2 py-1" placeholder="Driver" value={cap[r.id]?.driver||''} onChange={e=>updateCap(r.id,{driver:e.target.value})} />
                  <input className="border rounded px-2 py-1" placeholder="Conductor" value={cap[r.id]?.conductor||''} onChange={e=>updateCap(r.id,{conductor:e.target.value})} />
                  <input className="border rounded px-2 py-1" placeholder="Passengers" value={cap[r.id]?.count||0} onChange={e=>updateCap(r.id,{count: parseInt(e.target.value||'0')||0})} />
                </div>
                <textarea className="border rounded px-2 py-1 mt-2 w-full" placeholder="Any issue?" value={cap[r.id]?.issues||''} onChange={e=>updateCap(r.id,{issues:e.target.value})} />
                <div className="text-xs opacity-70 mt-1">Last updated: {cap[r.id]?.ts? new Date(cap[r.id].ts).toLocaleTimeString(): '—'}</div>
              </div>
            </div>
          ))}

          {results.length===0 && (
            <div className="text-center opacity-70 py-10">No routes found. Try different areas like "Koti", "Uppal".</div>
          )}
        </div>
      </div>
    </div>
  )
}
