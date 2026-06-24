import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferred_date: '',
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    const { error } = await supabase.from('leads').insert({
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      message: form.message || null,
      preferred_date: form.preferred_date || null,
    })

    if (error) {
      console.error(error)
      setStatus('error')
      return
    }

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-semibold text-forest-dark mb-2">
            Got it — thanks, {form.name.split(' ')[0]}.
          </h1>
          <p className="text-charcoal/70">
            We'll call you back shortly to schedule a time.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-wide uppercase text-amber">
            Fraser Valley Plumbing & Drain
          </span>
          <h1 className="font-display text-3xl font-semibold mt-2 text-charcoal">
            Need a plumber? Tell us what's going on.
          </h1>
          <p className="text-charcoal/60 mt-2">
            Fill this out and we'll call you back to schedule — most requests get a response within the hour.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email <span className="text-charcoal/40">(optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="preferred_date">
              Preferred date <span className="text-charcoal/40">(optional)</span>
            </label>
            <input
              id="preferred_date"
              name="preferred_date"
              type="date"
              value={form.preferred_date}
              onChange={handleChange}
              className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              What's going on? <span className="text-charcoal/40">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              placeholder="e.g. leaking faucet, clogged drain, no hot water"
              className="w-full rounded-lg border border-charcoal/15 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest placeholder:text-charcoal/30"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-600">
              Something went wrong submitting that — try again in a moment.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-lg bg-forest text-white font-medium py-2.5 hover:bg-forest-dark transition-colors disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send request'}
          </button>
        </form>
      </div>
    </main>
  )
}
