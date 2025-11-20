import { Home, Search, MapPin, HelpCircle, Info, Sun, Moon } from 'lucide-react'
import { t } from '../i18n'

export default function NavBar({ lang='en', dark=true, onToggleDark, onLang }){
  const Item = ({ to, icon:Icon, label }) => (
    <a href={to} className="flex flex-col items-center text-sm">
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">{label}</span>
    </a>
  )
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 border-t ${dark? 'bg-slate-900/90 text-white border-slate-700':'bg-white/90 text-slate-900 border-slate-200'} backdrop-blur`}> 
      <div className="max-w-xl mx-auto flex justify-between p-3">
        <Item to="/" icon={Home} label={t(lang,'home')} />
        <Item to="/search" icon={Search} label={t(lang,'search')} />
        <Item to="/nearby" icon={MapPin} label={t(lang,'nearby')} />
        <Item to="/support" icon={HelpCircle} label={t(lang,'support')} />
        <Item to="/about" icon={Info} label={t(lang,'about')} />
      </div>
      <div className="max-w-xl mx-auto flex justify-between items-center px-4 pb-3">
        <div className="flex gap-2">
          <button onClick={onToggleDark} className="px-3 py-1 rounded border border-slate-500/30 flex items-center gap-2">
            {dark? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} {t(lang,'darkMode')}
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onLang('en')} className={`px-2 py-1 rounded border ${lang==='en'?'bg-sky-600 text-white':'border-slate-300'}`}>EN</button>
          <button onClick={() => onLang('te')} className={`px-2 py-1 rounded border ${lang==='te'?'bg-sky-600 text-white':'border-slate-300'}`}>TE</button>
        </div>
      </div>
    </div>
  )
}
