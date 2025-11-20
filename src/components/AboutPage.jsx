export default function AboutPage({ dark }){
  return (
    <div className={`min-h-screen pb-28 ${dark?'bg-slate-900 text-white':'bg-white text-slate-900'}`}>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold">About</h2>
        <p className="mt-2 opacity-80 text-sm">HYD Smart Bus Transportation App is a simple, offline-friendly helper for Hyderabad. It lets you search routes, view details, track buses (basic), see nearby vehicles, and contact support. No payments, no admin, no heavy features.</p>
        <div className="mt-4 text-sm">
          <div>• Works offline with caching</div>
          <div>• Stores updates in your device</div>
          <div>• English and Telugu labels</div>
          <div>• Designed for low-end phones</div>
        </div>
      </div>
    </div>
  )
}
