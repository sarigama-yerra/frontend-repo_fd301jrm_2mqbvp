// Simple offline dataset for HYD bus routes
export const ROUTES = [
  {
    id: "1",
    number: "7Z",
    name: "Secunderabad ⇄ Charminar",
    from: "Secunderabad",
    to: "Charminar",
    startTime: "05:30",
    endTime: "22:00",
    frequencyMins: 12,
    stops: [
      "Secunderabad",
      "Paradise",
      "Begumpet",
      "Punjagutta",
      "Nampally",
      "Mozamjahi Market",
      "Charminar",
    ],
  },
  {
    id: "2",
    number: "218",
    name: "Gachibowli ⇄ Koti",
    from: "Gachibowli",
    to: "Koti",
    startTime: "05:00",
    endTime: "23:00",
    frequencyMins: 10,
    stops: [
      "Gachibowli",
      "Madhapur",
      "Jubilee Hills",
      "Banjara Hills",
      "Lakdikapul",
      "Abids",
      "Koti",
    ],
  },
  {
    id: "3",
    number: "219",
    name: "Mehdipatnam ⇄ Uppal",
    from: "Mehdipatnam",
    to: "Uppal",
    startTime: "05:15",
    endTime: "22:30",
    frequencyMins: 15,
    stops: [
      "Mehdipatnam",
      "Masab Tank",
      "Nampally",
      "Koti",
      "Habsiguda",
      "Uppal",
    ],
  },
]

export function searchRoutes(queryFrom, queryTo) {
  const f = (queryFrom || "").toLowerCase().trim()
  const t = (queryTo || "").toLowerCase().trim()
  return ROUTES.filter(r =>
    (!f || r.from.toLowerCase().includes(f) || r.stops.some(s => s.toLowerCase().includes(f))) &&
    (!t || r.to.toLowerCase().includes(t) || r.stops.some(s => s.toLowerCase().includes(t)))
  )
}
