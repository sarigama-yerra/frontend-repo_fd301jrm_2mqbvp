import { Bus, Star, Map, Search } from 'lucide-react'
import { t } from '../i18n'

export default function HomePage({ lang, dark }){
  const items = [
    { href:'/search', icon: Search, title: t(lang,'search'), desc:'Find routes offline' },
    { href:'/tracking', icon: Map, title: 'Live Tracking', desc:'Basic map demo' },
    { href:'/nearby', icon: Bus, title: t(lang,'nearby'), desc:'See vehicles around' },
    { href:'/support', icon: Star, title: t(lang,'support'), desc:'Chat + SMS' },
  ]
  return (
    <div className={`min-h-screen pb-28 ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-2">HYD Smart Bus</h1>
        <p className="opacity-80 mb-4">Simple, offline-friendly transit helper for Hyderabad.</p>
        <div className="grid grid-cols-2 gap-4">
          {items.map((it,idx)=> (
            <a key={idx} href={it.href} className="border rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:scale-[1.01] transition">
              <it.icon className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs opacity-70">{it.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
