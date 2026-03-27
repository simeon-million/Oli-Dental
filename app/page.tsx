"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight, Star, MapPin, Phone, Mail, Globe,
  Clock, Calendar, Facebook, Instagram, ChevronRight,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#about",           label: "About"           },
  { href: "#services",        label: "Services"        },
  { href: "#transformations", label: "Transformations" },
  { href: "#testimonials",    label: "Testimonials"    },
  { href: "#contact",         label: "Contact"         },
];

const SERVICES = [
  { title: "Cosmetic Dentistry", desc: "Veneers, teeth whitening, and full smile makeovers made just for you."         },
  { title: "Dental Implants",    desc: "Permanent, natural-looking replacement teeth using the best materials available." },
  { title: "Orthodontics",       desc: "Clear aligners and modern braces to give you a perfectly straight smile."        },
];

const TESTIMONIALS = [
  { name: "Eleanor R.", text: "The care and attention to detail here are amazing. They didn't just fix my teeth; they gave me my confidence back." },
  { name: "James T.",   text: "A truly great experience. The clinic feels very relaxing, and my new implants look completely natural."           },
  { name: "Sophia M.",  text: "I've always been nervous about dentists, but the team here made me feel totally relaxed. My veneers are perfect." },
];

const CONTACT_CARDS = [
  { icon: <MapPin   className="w-7 h-7" />, label: "Address",       lines: ["123 Elegance Avenue,", "Beverly Hills, CA 90210"] },
  { icon: <Phone    className="w-7 h-7" />, label: "Book By Phone", lines: ["0942438888", "0966263667"]                        },
  { icon: <Mail     className="w-7 h-7" />, label: "Email Us",      lines: ["concierge@olidental.com"]                        },
];

const WORKING_HOURS = [
  { day: "Monday",    hours: "8:30 AM – 6:00 PM" },
  { day: "Tuesday",   hours: "8:30 AM – 6:00 PM" },
  { day: "Wednesday", hours: "8:30 AM – 6:00 PM" },
  { day: "Thursday",  hours: "8:30 AM – 6:00 PM" },
  { day: "Friday",    hours: "8:30 AM – 6:00 PM" },
  { day: "Saturday",  hours: "10:00 AM – 4:00 PM" },
  { day: "Sunday",    hours: "Closed", closed: true },
];

/* ─── Component ─────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      {/* ══════════════════ NAVIGATION ══════════════════════ */}
      <nav className="fixed top-0 w-full z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Oli Dental" width={56} height={56} className="w-12 h-12 md:w-14 md:h-14 object-contain" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl font-bold text-primary leading-none">Oli Dental</span>
              <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-primary/50 uppercase mt-1">DENTAL CLINIC</span>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-primary/70">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-primary hover:underline underline-offset-4 decoration-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link href="/booking" className="bg-primary text-secondary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/85 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            Book Consultation
          </Link>
        </div>
      </nav>

      {/* ══════════════════ HERO ════════════════════════════ */}
      <section className="relative h-screen flex flex-col bg-secondary pt-24 overflow-hidden">

        {/* subtle gold top-bar accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

        <div className="flex-1 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12">

          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block bg-accent/20 text-primary font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full mb-6">
                Expert Dental Care
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-primary leading-[1.1] mb-6">
                Building Your <br />
                <span className="italic" style={{ color: '#F1D900' }}>Perfect</span> Smile.
              </h1>
              <p className="text-lg text-foreground/75 mb-8 max-w-md leading-relaxed">
                Get top-quality dental care in a modern and comfortable clinic. Your journey to a healthy, beautiful smile starts right here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:brightness-95 transition-all flex items-center justify-center gap-2 group shadow-md shadow-accent/30">
                  See Our Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-primary/20 text-primary px-8 py-4 rounded-full font-medium hover:border-primary/50 hover:bg-primary/5 transition-all">
                  See Before &amp; After
                </button>
              </div>
            </motion.div>
          </div>

          {/* Image placeholder */}
          <div className="hidden lg:flex w-1/2 h-[70%]">
            <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl">
              <Image
                src="/hero-clinic.jpg"
                alt="Oli Dental Clinic"
                fill
                className="object-cover object-center"
                priority
              />
              {/* subtle gold bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Stats strip at bottom of hero */}
        <div className="bg-primary">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-white/10">
            {[
              { val: "15+",  label: "Years Experience" },
              { val: "5k+",  label: "Happy Patients"   },
              { val: "100%", label: "Satisfaction Rate" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center px-4">
                <span className="font-serif text-2xl font-bold text-accent">{val}</span>
                <span className="text-secondary/60 text-xs uppercase tracking-widest mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ═══════════════════════════ */}
      <section id="about" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative aspect-[4/5] rounded-3xl bg-background border-2 border-dashed border-primary/15 flex items-center justify-center overflow-hidden">
              {/* gold corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-accent rounded-br-3xl opacity-60" />
              <span className="text-primary/30 font-medium">About Image Placeholder</span>
            </div>

            {/* Text */}
            <div>
              <span className="inline-block bg-accent text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 leading-tight">
                A New Standard for Dental Care
              </h2>
              <p className="text-foreground/75 mb-5 leading-relaxed">
                At OLI DENTAL, we believe your smile is your best feature. We designed our clinic to be a calm and relaxing place where you can feel comfortable while we improve your dental health.
              </p>
              <p className="text-foreground/75 mb-10 leading-relaxed">
                Our team of expert dentists uses the latest technology to give you results that are both healthy and beautiful. We make sure you get the best care possible.
              </p>

              {/* divider */}
              <div className="w-12 h-1 bg-accent rounded-full mb-8" />

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-background rounded-2xl border border-primary/8">
                  <h4 className="text-4xl font-serif text-primary mb-1">15+</h4>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/50">Years Experience</p>
                </div>
                <div className="p-6 bg-background rounded-2xl border border-primary/8">
                  <h4 className="text-4xl font-serif text-primary mb-1">5k+</h4>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/50">Happy Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ════════════════════════ */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block bg-accent text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-5">Our Main Services</h2>
            <p className="text-foreground/70">Custom treatments designed to improve your natural smile and keep your teeth healthy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer bg-secondary rounded-3xl p-7 border border-primary/8 hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[3/2] rounded-2xl bg-background border border-primary/10 flex items-center justify-center mb-6 group-hover:border-accent/30 transition-colors overflow-hidden">
                  {/* gold top-left stripe on hover */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-accent group-hover:w-full transition-all duration-500" />
                  <span className="text-primary/25 font-medium text-sm">Service Image Placeholder</span>
                </div>
                <h3 className="text-2xl font-serif text-primary mb-3">{service.title}</h3>
                <p className="text-foreground/70 mb-5 text-sm leading-relaxed">{service.desc}</p>
                <span className="text-primary font-semibold flex items-center gap-2 text-sm group-hover:text-accent transition-colors">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TRANSFORMATIONS ═════════════════ */}
      <section id="transformations" className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block bg-accent text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Before &amp; After
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-5">Real Patient Results</h2>
              <p className="text-secondary/60">See the actual results from our patients. Look at the care and detail we put into every smile.</p>
            </div>
            <button className="border border-secondary/20 text-secondary px-7 py-3 rounded-full hover:bg-secondary/10 hover:border-accent transition-colors whitespace-nowrap font-medium text-sm">
              See All Results
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2].map((item) => (
              <div key={item} className="bg-secondary/5 rounded-3xl p-6 border border-secondary/10">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="relative aspect-square rounded-2xl bg-primary/40 border border-secondary/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-secondary text-xs px-3 py-1 rounded-full">Before</div>
                    <span className="text-secondary/25 text-sm">Before Image</span>
                  </div>
                  <div className="relative aspect-square rounded-2xl bg-secondary/10 border border-secondary/15 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-3 left-3 bg-accent text-primary font-bold text-xs px-3 py-1 rounded-full">After</div>
                    <span className="text-secondary/35 text-sm">After Image</span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-secondary mb-2">Veneers &amp; Whitening</h3>
                <p className="text-secondary/55 text-sm leading-relaxed">A full smile makeover focused on making teeth straight and bright, finished in just three visits.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ════════════════════ */}
      <section id="testimonials" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Patient Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">What Our Patients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 rounded-3xl border border-primary/8 hover:border-accent/40 hover:shadow-lg transition-all relative overflow-hidden"
              >
                {/* gold corner */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-accent/15 rounded-bl-3xl" />
                <div className="flex gap-1 text-accent mb-5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground/75 mb-7 italic leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-5 border-t border-primary/8">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                    <span className="text-primary/30 text-[10px] font-medium">Photo</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-primary text-sm">{t.name}</h4>
                    <p className="text-primary/40 text-xs">Verified Patient</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ═════════════════════════ */}
      <section id="contact" className="py-24 bg-background border-t border-primary/8">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-block bg-accent text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
              Contact <span className="italic text-accent">Our Team</span>
            </h2>
            <p className="text-foreground/65 max-w-xl mx-auto text-sm leading-relaxed">
              Feel free to reach out for any questions or concerns. Our team is always here to help.
            </p>
          </div>

          {/* Three contact cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {CONTACT_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-secondary rounded-3xl border border-primary/8 hover:border-accent hover:shadow-xl transition-all duration-300 group"
              >
                {/* icon circle */}
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-5 text-accent group-hover:bg-accent group-hover:text-primary transition-colors duration-300 shadow-md">
                  {card.icon}
                </div>
                <h3 className="font-serif text-xl text-primary font-semibold mb-3">{card.label}</h3>
                {card.lines.map((line, j) => (
                  <p key={j} className="text-foreground/60 text-sm leading-relaxed">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Map + Working Hours */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/10 shadow-2xl min-h-[500px] flex flex-col md:flex-row">

            {/* Map side */}
            <div className="relative flex-1 min-h-[300px] md:min-h-0 bg-secondary overflow-hidden">
              {/* grid */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mapgrid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0F172A" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapgrid)" />
              </svg>

              {/* road lines using palette colors */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.14 }}>
                <line x1="0"   y1="40%"  x2="60%"  y2="40%"  stroke="#0F172A" strokeWidth="16" strokeLinecap="round"/>
                <line x1="30%" y1="0"    x2="30%"  y2="100%" stroke="#0F172A" strokeWidth="10"/>
                <line x1="60%" y1="40%"  x2="100%" y2="65%"  stroke="#0F172A" strokeWidth="16" strokeLinecap="round"/>
                <line x1="0"   y1="70%"  x2="55%"  y2="70%"  stroke="#0F172A" strokeWidth="8"/>
                <line x1="55%" y1="0"    x2="55%"  y2="55%"  stroke="#0F172A" strokeWidth="8"/>
                <line x1="10%" y1="0"    x2="10%"  y2="35%"  stroke="#0F172A" strokeWidth="5"/>
                <line x1="0"   y1="18%"  x2="32%"  y2="18%"  stroke="#0F172A" strokeWidth="5"/>
              </svg>

              {/* Road labels (decorative) */}
              <div className="absolute top-[18%] left-[32%] text-primary/20 text-[9px] font-semibold uppercase tracking-widest rotate-0">Elegance Ave</div>
              <div className="absolute top-[55%] left-[8%]  text-primary/20 text-[9px] font-semibold uppercase tracking-widest">Beverly Blvd</div>

              {/* Pin */}
              <div className="absolute inset-0 flex items-center" style={{ paddingLeft: '20%' }}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-accent border-4 border-secondary flex items-center justify-center shadow-2xl">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="mt-3 bg-primary text-secondary text-xs px-5 py-2 rounded-full shadow-xl font-semibold">
                    Oli Dental Clinic
                  </div>
                </div>
              </div>

              <span className="absolute bottom-4 left-4 text-primary/20 text-[10px] font-medium">Map Placeholder</span>
            </div>

            {/* Working Hours side */}
            <div className="w-full md:w-[360px] bg-primary text-secondary flex flex-col p-8 shadow-2xl shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-2xl font-semibold text-secondary">Working Hours</h3>
              </div>
              <p className="text-secondary/50 text-sm mb-7 leading-relaxed">Check our office hours to plan your visit.</p>

              <div className="flex-1 space-y-0">
                {WORKING_HOURS.map(({ day, hours, closed }) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between py-3 border-b border-secondary/10 last:border-0 ${closed ? "opacity-30" : ""}`}
                  >
                    <span className="text-sm font-medium text-secondary/80 w-24 shrink-0">{day}</span>
                    <span className={`text-sm flex-1 text-center ${closed ? "text-secondary/40" : "text-secondary"}`}>{hours}</span>
                    {!closed ? (
                      <button className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full hover:brightness-90 transition-all shrink-0">
                        Book
                      </button>
                    ) : (
                      <div className="w-[52px] shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-secondary/10">
                <p className="text-secondary/40 text-[11px] font-bold uppercase tracking-widest mb-4">Need Flexible Time?</p>
                <Link href="/booking" className="w-full bg-accent text-primary rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold hover:brightness-95 transition-all group shadow-md shadow-accent/20">
                  Book an Appointment
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════════════ */}
      <footer className="bg-primary pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-16">

            {/* Brand col */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Image src="/logo.svg" alt="Oli Dental" width={56} height={56} className="w-12 h-12 object-contain" />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-secondary leading-none">Oli Dental</span>
                  <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-secondary/40 uppercase mt-1">DENTAL CLINIC</span>
                </div>
              </div>
              <div className="w-10 h-0.5 bg-accent mb-6 rounded-full" />
              <p className="text-secondary/55 max-w-sm mb-8 leading-relaxed text-sm">
                A team of dentists working to ensure you receive the best treatment in a comfortable, modern setting.
              </p>
              <ul className="space-y-3 text-secondary/55 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>0942438888</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>0966263667</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>concierge@olidental.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-accent shrink-0" />
                  <span>www.olidental.com</span>
                </li>
              </ul>
            </div>

            {/* Social col */}
            <div>
              <h4 className="font-serif text-xl mb-2 text-accent">Social Networks</h4>
              <div className="w-10 h-0.5 bg-accent mb-6 rounded-full" />
              <p className="text-secondary/50 text-sm mb-8 max-w-xs leading-relaxed">
                Visit Oli Dental on these social links and connect with us. Follow our accounts for regular updates.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Facebook — brand blue kept for recognition */}
                <Link href="#" aria-label="Facebook"
                  className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 hover:brightness-110 transition-all shadow-lg">
                  <Facebook className="w-5 h-5 text-secondary" />
                </Link>
                {/* Instagram — brand gradient kept for recognition */}
                <Link href="#" aria-label="Instagram"
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                  style={{ background: "linear-gradient(135deg,#E1306C,#833AB4,#F77737)" }}>
                  <Instagram className="w-5 h-5 text-secondary" />
                </Link>
                {/* TikTok */}
                <Link href="#" aria-label="TikTok"
                  className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center hover:scale-110 hover:bg-secondary/20 transition-all shadow-lg">
                  <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                  </svg>
                </Link>
                <span className="text-secondary/35 text-sm">TikTok</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-secondary/10 pt-8 flex flex-col md:flex-row items-center justify-between text-secondary/35 text-sm">
            <p>&copy; {new Date().getFullYear()} OLI DENTAL. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-secondary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-secondary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
