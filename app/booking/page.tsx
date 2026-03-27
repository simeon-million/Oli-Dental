"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ChevronLeft, ChevronRight, Calendar, Phone, Clock,
  User, Mail, Stethoscope, CheckCircle, ArrowLeft, Loader2,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────── */
const SERVICES = [
  "Cosmetic Dentistry",
  "Dental Implants",
  "Orthodontics",
  "Teeth Whitening",
  "Root Canal Treatment",
  "Dental Cleaning",
  "Veneers",
  "Dental Crowns",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS   = ["MO","TU","WE","TH","FR","SA","SU"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  // Convert Sunday=0 to Monday=0 index
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

/* ─── Component ─────────────────────────────────────── */
export default function BookingPage() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: '', name: '', phone: '', service: '', notes: '',
  });

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDayIdx  = getFirstDayOfMonth(year, month);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  }

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };
  const isSunday = (day: number) => new Date(year, month, day).getDay() === 0;

  async function handleSubmit() {
    if (!form.email || !form.name || !form.service || !selectedDay) return;
    setLoading(true);
    setError(null);
    try {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          date: dateStr,
          notes: form.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to book');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary rounded-3xl p-12 max-w-md w-full text-center border border-primary/10 shadow-2xl"
        >
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/30">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-3xl text-primary mb-3">Appointment Requested!</h2>
          <p className="text-foreground/65 text-sm leading-relaxed mb-2">
            Thank you, <strong className="text-primary">{form.name}</strong>. We've received your request for:
          </p>
          <div className="bg-background rounded-2xl px-6 py-4 my-6 border border-primary/8 text-sm space-y-2">
            <p className="text-primary font-semibold">{form.service}</p>
            <p className="text-foreground/60">{MONTHS[month]} {selectedDay}, {year}</p>
            <p className="text-foreground/60">{form.email}</p>
          </div>
          <p className="text-foreground/55 text-xs mb-8">Our team will contact you shortly to confirm your booking.</p>
          <Link href="/"
            className="inline-flex items-center gap-2 bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-primary/85 transition-colors">
            <ArrowLeft className="w-4 h-4 text-accent" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Top bar ── */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Oli Dental" width={44} height={44} className="object-contain" />
            <div>
              <span className="font-serif text-xl font-bold text-secondary leading-none block">Oli Dental</span>
              <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-secondary/40 uppercase">DENTAL CLINIC</span>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-secondary/60 hover:text-secondary text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div className="bg-primary border-b-4 border-accent pb-16 pt-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-secondary/40 text-xs font-medium uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <span className="text-accent">Book Appointment</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-secondary mb-3">Book Appointment</h1>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 pb-24">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

          {/* ════ LEFT PANEL ════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-3xl p-8 text-secondary shadow-2xl sticky top-8"
          >
            {/* Headline */}
            <h2 className="font-serif text-3xl text-secondary mb-1 leading-tight">
              Book With
            </h2>
            <h2 className="font-serif text-4xl font-bold text-accent mb-6 leading-tight">
              Your Dentist
            </h2>

            <p className="text-secondary/65 text-sm leading-relaxed mb-4">
              Simply fill out the appointment request form with your preferred date and time, and our team will get back to you promptly to confirm your booking.
            </p>
            <p className="text-secondary/65 text-sm leading-relaxed mb-10">
              We look forward to seeing you soon at our clinic and helping you achieve optimal oral health.
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-secondary/10 mb-8" />

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Book By Phone */}
              <div className="bg-secondary/8 rounded-2xl p-5 text-center border border-secondary/10">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <p className="text-secondary font-semibold text-sm mb-2">Book By Phone</p>
                <p className="text-secondary/60 text-xs leading-relaxed">0942438888</p>
                <p className="text-secondary/60 text-xs leading-relaxed">0966263667</p>
              </div>

              {/* Working Time */}
              <div className="bg-secondary/8 rounded-2xl p-5 text-center border border-secondary/10">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-secondary font-semibold text-sm mb-2">Working Time</p>
                <p className="text-secondary/60 text-xs leading-relaxed">Mon – Sat</p>
                <p className="text-secondary/60 text-xs leading-relaxed">8:30 AM – 6:00 PM</p>
              </div>
            </div>

            {/* Decorative dental icons row */}
            <div className="mt-8 pt-6 border-t border-secondary/10 flex items-center justify-center gap-4 opacity-30">
              {["🦷","🪥","💊","🩺","📋"].map((ic, i) => (
                <span key={i} className="text-xl">{ic}</span>
              ))}
            </div>
          </motion.div>

          {/* ════ RIGHT PANEL — Form ════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-secondary rounded-3xl shadow-xl border border-primary/8 overflow-hidden"
          >
            {/* Form header */}
            <div className="bg-background px-8 py-6 border-b border-primary/8">
              <h3 className="font-serif text-2xl text-primary mb-1">Online Appointment Booking</h3>
              <p className="text-foreground/55 text-sm">Please fill the following form accurately</p>
            </div>

            <div className="p-8 space-y-6">

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <Mail className="w-4 h-4 text-accent" />
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="yourname@email.com"
                  className="w-full bg-background border border-primary/15 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <User className="w-4 h-4 text-accent" />
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full bg-background border border-primary/15 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <Phone className="w-4 h-4 text-accent" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="Your phone number"
                  className="w-full bg-background border border-primary/15 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              {/* Service */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <Stethoscope className="w-4 h-4 text-accent" />
                  Appointment <span className="text-accent">*</span>
                </label>
                <select
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className="w-full bg-background border border-primary/15 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>-- Please select a service --</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* ── Calendar ── */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-4">
                  <Calendar className="w-4 h-4 text-accent" />
                  Select Date <span className="text-accent">*</span>
                </label>

                <div className="bg-background rounded-2xl border border-primary/10 overflow-hidden">
                  {/* Month nav */}
                  <div className="flex items-center justify-between px-6 py-4 bg-primary">
                    <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-secondary/10 flex items-center justify-center text-secondary transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-serif font-semibold text-secondary text-lg">
                      {MONTHS[month]} {year}
                    </span>
                    <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-secondary/10 flex items-center justify-center text-secondary transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 bg-accent">
                    {DAYS.map(d => (
                      <div key={d} className="text-center text-primary font-bold text-xs py-2.5 tracking-wider">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div className="grid grid-cols-7 p-3 gap-1">
                    {/* Empty cells before first day */}
                    {Array.from({ length: firstDayIdx }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                      const past   = isPast(day);
                      const sun    = isSunday(day);
                      const active = selectedDay === day;
                      const disabled = past || sun;

                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => setSelectedDay(day)}
                          className={`
                            aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all
                            ${active    ? "bg-accent text-primary shadow-md shadow-accent/30 scale-105 font-bold" : ""}
                            ${!active && !disabled ? "hover:bg-primary hover:text-secondary text-foreground" : ""}
                            ${disabled  ? "text-foreground/20 cursor-not-allowed" : "cursor-pointer"}
                            ${sun && !past ? "text-accent/40" : ""}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected date display */}
                  {selectedDay && (
                    <div className="mx-4 mb-4 px-4 py-3 bg-accent/15 border border-accent/30 rounded-xl flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent shrink-0" />
                      <p className="text-sm text-primary font-semibold">
                        Selected: {MONTHS[month]} {selectedDay}, {year}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-foreground/45 text-xs mt-3 leading-relaxed">
                  Choose your preferred date and then click Book Now to request your appointment.
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-semibold text-primary mb-2 block">
                  Additional Notes <span className="text-foreground/35 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Any concerns or special requests..."
                  className="w-full bg-background border border-primary/15 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!form.email || !form.name || !form.service || !selectedDay || loading}
                className="w-full bg-primary text-secondary py-4 rounded-xl font-bold text-base hover:bg-primary/85 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 group shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-4 h-4 text-primary" />
                  </span>
                )}
                {loading ? 'Booking...' : 'Book Now!'}
              </button>

              <p className="text-center text-foreground/35 text-xs">
                By booking, you agree to our{" "}
                <Link href="#" className="text-primary underline hover:text-accent transition-colors">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" className="text-primary underline hover:text-accent transition-colors">Privacy Policy</Link>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
