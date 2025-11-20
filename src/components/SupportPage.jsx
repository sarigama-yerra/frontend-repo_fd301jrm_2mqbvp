import { useEffect, useState } from 'react'
import { storage } from '../lib/storage'

export default function SupportPage({ dark }){
  const [chat, setChat] = useState(storage.getChat())
  const [text, setText] = useState('')
  const [ussd, setUssd] = useState('HYD100')

  const send = () => {
    if (!text.trim()) return
    const next = [...chat, { id: Date.now(), text, ts: Date.now(), from: 'me' }]
    setChat(next)
    storage.setChat(next)
    setText('')
  }

  useEffect(()=>{ /* persist handled by setter */ },[chat])

  const smsLink = 'sms:+919999999999?body=' + encodeURIComponent('HYD BUS: Need help with route info')
  const callLink = 'tel:+919999999999'
  const shareLink = 'mailto:?subject=' + encodeURIComponent('HYD Bus Support') + '&body=' + encodeURIComponent('Issue details...')

  const ussdCode = `*${ussd}#`

  return (
    <div className={`min-h-screen pb-28 ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold">Support</h2>
        <div className="mt-2 border rounded-xl p-3 h-72 overflow-y-auto bg-black/5">
          {chat.map(m => (
            <div key={m.id} className={`my-1 flex ${m.from==='me'?'justify-end':'justify-start'}`}>
              <div className={`px-3 py-2 rounded-xl text-sm ${m.from==='me'?'bg-sky-600 text-white':'bg-slate-200'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message" className="flex-1 border rounded px-3 py-2" />
          <button onClick={send} className="px-3 py-2 rounded bg-sky-600 text-white">Send</button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <a href={smsLink} className="px-3 py-2 rounded border text-center">SMS</a>
          <a href={callLink} className="px-3 py-2 rounded border text-center">Call</a>
          <a href={shareLink} className="px-3 py-2 rounded border text-center">Share</a>
        </div>

        <div className="mt-4 text-sm">
          <div className="font-medium">USSD</div>
          <div className="opacity-80">Generate a simple code for basic phones:</div>
          <div className="mt-2 flex gap-2">
            <input value={ussd} onChange={e=>setUssd(e.target.value.replace(/[^A-Za-z0-9]/g,''))} className="border rounded px-3 py-2" />
            <div className="px-3 py-2 rounded border bg-slate-50 dark:bg-slate-800">{ussdCode}</div>
          </div>
          <div className="opacity-80 mt-2">Dial this on feature phones to simulate info requests. UI only.</div>
        </div>
      </div>
    </div>
  )
}
