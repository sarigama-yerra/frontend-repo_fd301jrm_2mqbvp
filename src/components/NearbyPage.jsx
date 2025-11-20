import { useEffect, useState } from 'react'

function randomAround(lat, lng, km){
  const dx = (Math.random()-0.5) * km * 0.018
  const dy = (Math.random()-0.5) * km * 0.018
  return { lat: lat + dy, lng: lng + dx }
}

export default function NearbyPage({ dark }){
  const [radius, setRadius] = useState(1)
  const [base, setBase] = useState({ lat: 17.385, lng: 78.486 })
  const [items, setItems] = useState([])

  useEffect(()=>{
    const types = ['Bus','Auto','Bike','Cab']
    const arr = Array.from({length: 12},(_,i)=>{
      const t = types[i%types.length]
      const p = randomAround(base.lat, base.lng, radius)
      return { id: i+1, type: t, ...p }
    })
    setItems(arr)
  },[radius, base])

  const useMyLoc = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(g=> setBase({ lat: g.coords.latitude, lng: g.coords.longitude }))
  }

  return (
    <div className={`min-h-screen pb-28 ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold">Nearby Vehicles</h2>
        <div className="mt-2 flex gap-2">
          {[1,2,5].map(r=> (
            <button key={r} onClick={()=>setRadius(r)} className={`px-3 py-1 rounded border ${radius===r?'bg-sky-600 text-white':''}`}>{r} km</button>
          ))}
          <button onClick={useMyLoc} className="px-3 py-1 rounded border">Use My Location</button>
        </div>

        <div className="mt-4 border rounded-xl overflow-hidden">
          <div className={`w-full h-64 ${dark?'bg-slate-800':'bg-slate-100'} relative`}>
            <div className="absolute inset-2 border border-dashed border-slate-400 rounded"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-60">Demo Map</div>
            {items.map(it=> (
              <div key={it.id} className="absolute px-2 py-1 text-xs rounded bg-black/70 text-white" style={{ left: `calc(50% + ${(it.lng-78.486)*500}px)`, top: `calc(50% - ${(it.lat-17.385)*500}px)` }}>{it.type}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
