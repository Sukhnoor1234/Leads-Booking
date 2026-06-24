import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const STATUS_OPTIONS = ['new', 'contacted', 'booked', 'closed']

const STATUS_STYLES = {
  new: 'bg-amber-light text-amber-900',
  contacted: 'bg-forest/15 text-forest-dark',
  booked: 'bg-forest text-white',
  closed: 'bg-charcoal/10 text-charcoal/50',
}

export default function Dashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setLeads(data)
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase.from('leads').update({ status }).eq('id', id)
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold tracking-wide uppercase text-amber">
            Dashboard
          </span>
          <h1 className="font-display text-3xl font-semibold mt-1">Incoming leads</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-charcoal/60 hover:text-charcoal underline"
        >
          Sign out
        </button>
      </div>

      {loading && <p className="text-charcoal/50">Loading leads…</p>}

      {!loading && leads.length === 0 && (
        <div className="border border-dashed border-charcoal/20 rounded-xl p-10 text-center text-charcoal/50">
          No leads yet — once your booking form is live, requests will show up here.
        </div>
      )}

      <div className="space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="border border-charcoal/10 rounded-xl p-5 bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{lead.name}</p>
                <p className="text-sm text-charcoal/60">{lead.phone}</p>
                {lead.email && <p className="text-sm text-charcoal/60">{lead.email}</p>}
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  STATUS_STYLES[lead.status] || STATUS_STYLES.new
                }`}
              >
                {lead.status}
              </span>
            </div>

            {lead.message && <p className="text-sm text-charcoal/70 mt-3">{lead.message}</p>}

            {lead.preferred_date && (
              <p className="text-xs text-charcoal/40 mt-2">
                Preferred date: {lead.preferred_date}
              </p>
            )}

            <div className="flex gap-2 mt-4">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(lead.id, s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    lead.status === s
                      ? 'border-forest bg-forest text-white'
                      : 'border-charcoal/15 text-charcoal/60 hover:border-forest hover:text-forest-dark'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
