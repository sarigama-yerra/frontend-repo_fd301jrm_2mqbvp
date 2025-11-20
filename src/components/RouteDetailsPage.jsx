import { useMemo } from 'react'
import { ROUTES } from '../data/routes'

export default function RouteDetailsPage({ id, dark }){
  const route = useMemo(()=> ROUTES.find(r=>r.id===id),[id])
  if (!route) return <div className={`min-h-screen ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}><div className="p-4">Route not found</div></div>

  const times = Array.from({length: Math.ceil((22-5)*60/route.frequencyMins)}, (_,i)=>{
    const minutes = 5*60 + i*route.frequencyMins
    const hh = Math.floor(minutes/60).toString().padStart(2,'0')
    const mm = (minutes%60).toString().padStart(2,'0')
    return `${hh}:${mm}`
  })

  return (
    <div className={`min-h-screen pb-28 ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto p-4">
        <a href="/search" className="text-sky-500">← Back</a>
        <h2 className="text-xl font-semibold mt-2">{route.number} • {route.name}</h2>
        <div className="opacity-70 text-sm">{route.from} → {route.to}</div>

        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="border rounded p-2">Start: {route.startTime}</div>
          <div className="border rounded p-2">End: {route.endTime}</div>
          <div className="border rounded p-2">Frequency: ~{route.frequencyMins} mins</div>
          <div className="border rounded p-2">Stops: {route.stops.length}</div>
        </div>

        <div className="mt-4">
          <div className="font-medium mb-2">Route Path</div>
          <div className="text-sm">{route.stops.join(' → ')}</div>
        </div>

        <div className="mt-4">
          <div className="font-medium mb-2">Approx Stop Timings</div>
          <div className="flex gap-2 overflow-x-auto py-2 text-xs">
            {times.map((t,i)=>(<div key={i} className="border rounded px-2 py-1 whitespace-nowrap">{t}</div>))}
          </div>
        </div>

        <a href={`/tracking?id=${route.id}`} className="inline-block mt-4 px-4 py-2 rounded bg-sky-600 text-white">Open Live Tracking</a>
      </div>
    </div>
  )
}
