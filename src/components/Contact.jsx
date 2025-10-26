import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useGamification } from './GamificationContext';

export default function Contact() {
  const { awardOnce, POINTS } = useGamification();
  const [status, setStatus] = useState('idle');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();
    if (!name || !email || !message) {
      setStatus('Please fill in all fields.');
      return;
    }
    // Without backend, fall back to mailto
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(message + `\n\n— ${name} (${email})`);
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
    setStatus('Thanks! Your email client should open.');
    awardOnce('contact_submit', POINTS.SUBMIT_CONTACT);
  }, [awardOnce, POINTS]);

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}
        >
          Get in touch
        </motion.h2>
        <p className="mt-2 text-slate-300" style={{ fontFamily: 'Open Sans, ui-sans-serif, system-ui' }}>
          Have a question or an opportunity? Send a message.
        </p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4" aria-labelledby="contact-heading">
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Name</span>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Email</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              placeholder="Hello! I'd like to discuss..."
            />
          </label>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-slate-950"
            >
              <Mail className="w-5 h-5" aria-hidden="true" /> Send Message
            </button>
            {status !== 'idle' && <span className="text-sm text-slate-300" role="status" aria-live="polite">{status}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
