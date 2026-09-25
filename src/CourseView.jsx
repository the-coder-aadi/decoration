import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaLanguage,
  FaCertificate,
  FaSignal,
  FaInfinity,
  FaPlay,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { GlobalStyles, FloralDivider, Navbar, Footer, Loader, BrandLogo } from "./Home";
import Reveal from "../components/Reveal";
/* ============================================================
   CourseView — single course detail page
   Same palette / type system as Home.jsx
   ============================================================ */

/* ---------------- Base course data ----------------
   Keep this identical to the COURSES array used on the Home page
   Courses section so titles/prices/images always match. */
const COURSES = [
  {
    type: "Offline Practical Training",
    slug: "offline-tent-flower-training",
    title: "Tent & Flower Decoration Training",
    desc: "Live, hands-on training in flower, tent, balloon, SFX, fireworks and lights decoration. Batch 20 starts 16 December 2026.",
    features: ["18 Days Practical + 1 Hr Theory Daily", "Room, Food & Tea Included (Sharing Basis)"],
    price: "₹22,000",
    img: "/offlinebatch.jpg",
    badge: "Batch 20 Open",
  },
  {
    type: "Online Course",
    slug: "all-in-one-event-course",
    title: "ALL-IN-ONE EVENT COURSE",
    desc: "Basic to Advance Party Decoration — learn Balloon Decoration, Flower Decoration, Event SFX and Fireworks in one complete recorded course, in Hindi.",
    features: ["80+ Videos · 25+ Hours Training", "Balloon, Flower, SFX & Fireworks"],
    price: "₹2,999",
    img: "/allinone.webp",
    badge: "1 Year Access",
  },
  {
    type: "Online Course",
    slug: "balloon-decor-course",
    title: "Basic to Advanced Balloon Decor",
    desc: "A focused, beginner-friendly recorded course covering only balloon decoration — from basic setups to advanced, trending installations.",
    features: ["Basic to Advanced Balloon Setups", "Wholesale & Vendor Information"],
    price: "₹1,036",
    img: "/baloons.webp",
    badge: "Balloon Specialist",
  },
];

/* ---------------- Extra per-course detail content ----------------
   Everything a base course card doesn't carry lives here, keyed by
   slug. Every figure below comes directly from the institute's real
   course/batch information — nothing here is an invented rating,
   student count or statistic. */
const COURSE_DETAILS = {
  "offline-tent-flower-training": {
    tagline: "Live practical training. Real event skills.",
    longDesc:
      "A 21-day, hands-on offline training program covering flower decoration, tent house work, balloon decoration, event SFX, fireworks and lights decoration — taught through live demonstrations and classroom practice, Monday to Saturday, 11:00 AM to 5:00 PM.",
    quickStats: [
      { icon: FaClock, label: "21 Days · Mon–Sat" },
      { icon: FaUsers, label: "Batch 20" },
      { icon: FaCertificate, label: "Certificate Included" },
    ],
    infoBadges: [
      { icon: FaChalkboardTeacher, label: "18 Days Practical + 1 Hr Theory Daily" },
      { icon: FaSignal, label: "11:00 AM – 5:00 PM" },
      { icon: FaInfinity, label: "Room + Food + Tea (Sharing Basis)" },
      { icon: FaCertificate, label: "Job Placement Option" },
    ],
    highlights: [
      "Flower Decoration — All Types",
      "Tent House Work & Balloon Decoration",
      "Event SFX & Fireworks",
      "Lights Decoration",
      "Vendor Management & Client Handling",
      "Social Media Marketing & Team Building",
    ],
    curriculum: [
      { title: "Flower, Balloon & Tent Decoration", desc: "Hands-on live setup practice for flower decoration (all types), tent house work and balloon decoration setups." },
      { title: "Event SFX, Fireworks & Lighting", desc: "Practical training in event special effects, fireworks and lights decoration." },
      { title: "Chunni Designer & Bengali Work", desc: "One full day dedicated to Chunni Designer and Bengali work techniques." },
      { title: "Client & Vendor Management", desc: "How to talk to customers, prepare estimates, handle events on the spot, and manage vendors." },
      { title: "Business & Marketing Skills", desc: "Social media marketing, team building, and tips to grow your decoration business." },
      { title: "Wholesale & Retail Market Knowledge", desc: "Wholesale and retail market information, plus artificial and original flower work." },
      { title: "Live Setup & Practical Demos", desc: "Classroom live setups and hands-on practice throughout the course." },
      { title: "Certificate & Job Placement", desc: "Certificate from New Flower Decoration on completion, with a job placement option." },
    ],
    ctaHref: "/enroll-form",
    ctaLabel: "Register for Batch 20",
    bottomNote: "Batch 20 starts 16 December 2026 — seats are limited.",
    demoSection: {
      badgeIcon: FaUsers,
      badgeText: "Batch 20 Registration",
      heading: "Reserve Your Seat in the Next Batch",
      body: "Seats for Batch 20 (starting 16 December 2026) are limited. Fill out the official registration form to secure your place — ₹2,000 registration, ₹20,000 after joining.",
      ctaHref: "/enroll-form",
      ctaLabel: "Open Registration Form",
      note: "Opens the official Batch 20 registration form",
    },
  },
  "all-in-one-event-course": {
    tagline: "Basic to Advance Party Decoration.",
    longDesc:
      "A complete online recorded training program covering Balloon Decoration, Flower & Party Decoration, and Event Management & Business Knowledge — built for students starting a career in event decoration or growing an existing business.",
    quickStats: [
      { icon: FaChalkboardTeacher, label: "80+ Video Classes" },
      { icon: FaClock, label: "25+ Hours Training" },
      { icon: FaLanguage, label: "Hindi" },
    ],
    infoBadges: [
      { icon: FaInfinity, label: "1 Year Course Validity" },
      { icon: FaSignal, label: "4 Training Modules" },
      { icon: FaCertificate, label: "3 Demo Videos Free" },
      { icon: FaChalkboardTeacher, label: "Classes on Mobile App" },
    ],
    highlights: [
      "Balloon Decoration — Basic to Advanced Setups & Themes",
      "Flower & Party Decoration — Truss, Haldi, Mehendi, Stage & Wedding Setups",
      "Event Management & Business Knowledge",
      "Wholesale Sellers & Vendor Information",
      "Where to Buy Machines & Materials",
      "Watch Anytime on the Learning App",
    ],
    curriculum: [
      { title: "Module 01 — Balloon Decoration", desc: "Basic to advanced balloon decoration, trending setups, cut-out decoration, materials and wholesale vendor information." },
      { title: "Module 02 — Flower & Party Decoration", desc: "Basic truss knowledge, flower decoration, Haldi & Mehendi decor, stapler cloth work, stage and wedding setups." },
      { title: "Module 05 — Event Management & Business Knowledge", desc: "Managing events on location, event setup management, and where to buy machines, materials and wholesale supplies." },
    ],
    ctaHref: "https://tcspsi.courses.store/585464",
    ctaLabel: "Buy Now – ₹2,999",
    bottomNote: "1 year access with a one-time purchase.",
    demoSection: {
      badgeIcon: FaPlay,
      badgeText: "Free Preview",
      heading: "Watch the Free Demo Videos",
      body: "3 demo videos are available free before you enroll — watch them on the official course platform to see the teaching style and course quality.",
      ctaHref: "https://tcspsi.courses.store/585464",
      ctaLabel: "Watch Demo Videos",
      note: "Opens securely on our official learning platform",
    },
  },
  "balloon-decor-course": {
    tagline: "Only Balloon Decor — Basic to Advanced.",
    longDesc:
      "A focused online recorded course covering balloon decoration from basic shaping to advanced, trending setups — a separate product from the All-in-One Event Course.",
    quickStats: [
      { icon: FaChalkboardTeacher, label: "Recorded Video Classes" },
      { icon: FaLanguage, label: "Hindi" },
      { icon: FaInfinity, label: "1 Year Access" },
    ],
    infoBadges: [
      { icon: FaSignal, label: "Basic to Advanced" },
      { icon: FaCertificate, label: "New & Trending Themes" },
      { icon: FaChalkboardTeacher, label: "Classes on Mobile App" },
      { icon: FaInfinity, label: "One-Time Purchase" },
    ],
    highlights: [
      "Basic to Advanced Balloon Decoration",
      "Different Types of Balloon Setups",
      "New & Trending Balloon Themes",
      "Cut-Out Decoration",
      "Balloon Decoration Materials",
      "Wholesale Sellers & Vendors Information",
    ],
    curriculum: [
      { title: "Basic to Advanced Balloon Decoration", desc: "" },
      { title: "Different Types of Balloon Setups", desc: "" },
      { title: "New & Trending Balloon Themes", desc: "" },
      { title: "Various Decoration Setups", desc: "" },
      { title: "Cut-Out Decoration", desc: "" },
      { title: "Balloon Decoration Materials", desc: "" },
      { title: "Wholesale Sellers & Vendors Information", desc: "" },
      { title: "Professional Balloon Setup Techniques", desc: "" },
    ],
    ctaHref: "https://tcspsi.courses.store/593050",
    ctaLabel: "Buy Now – ₹1,036",
    bottomNote: "A separate product from the All-in-One Event Course.",
    demoSection: {
      badgeIcon: FaChalkboardTeacher,
      badgeText: "Course Access",
      heading: "Available on the Learning App",
      body: "This is a separate product from the All-in-One Event Course. View full course details and pricing on the official course platform.",
      ctaHref: "https://tcspsi.courses.store/593050",
       ctaLabel: "Buy Now – ₹1,036",
      note: "Opens securely on our official learning platform",
    },
  },
};

/* ============================================================
   PAGE
   ============================================================ */
export default function CourseView() {

  const [loading, setLoading] = useState(true);

  const { slug } = useParams();   // ✅ isko yahan le aao

  const course = COURSES.find((c) => c.slug === slug) || COURSES[0];
  const detail = COURSE_DETAILS[course.slug];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  if (loading) {
    return      <>
        <GlobalStyles />
        <Loader loading={true} />
      </>
  }

  return (
    <div className="nfd-root">
      <GlobalStyles />
      <Navbar />

      {/* ---------------- Hero Banner ---------------- */}
      <section className="relative  pt-26 md:pt-32 pb-16 md:pb-20 px-5 md:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${course.img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/90 via-brand-deep/88 to-brand-ink/95" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_15%_20%,var(--color-brand-gold),transparent_45%),radial-gradient(circle_at_85%_80%,var(--color-brand-gold),transparent_45%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}


          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="px-4 py-1.5 rounded-full bg-brand-gold text-brand-ink text-xs font-semibold">
              {course.badge}
            </span>
            <span className="px-4 py-1.5 rounded-full border border-brand-champagne/30 text-brand-champagne/80 text-xs">
              {course.type}
            </span>
          </div>

          <h1 className="nfd-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            {course.title}
          </h1>
          <p className="nfd-display italic text-brand-gold text-base md:text-lg mb-4">{detail.tagline}</p>
          <p className="text-brand-champagne/75 text-sm md:text-base max-w-2xl mx-auto mb-8">{course.desc}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-9 text-brand-champagne/85 text-xs sm:text-sm">
            {detail.quickStats.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5">
                <s.icon className="text-brand-gold" /> {s.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="nfd-display text-2xl md:text-3xl text-white">
              {course.price}
            </span>
            <a
              href={detail.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 py-2.5 px-6 sm:px-8 sm:py-3 rounded-full bg-brand-gold text-brand-ink font-semibold hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/20"
            >
              {detail.ctaLabel}
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Demo Video ---------------- */}
<section className="relative mt-8 md:mt-14 px-5 md:px-8 pb-12 md:pb-20">
  <Reveal className="max-w-5xl mx-auto">
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-deep via-brand-primary to-brand-ink p-8 md:p-14">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative text-center">

        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-5 py-2 mb-6 backdrop-blur-md">
          <detail.demoSection.badgeIcon className="text-brand-gold text-xs" />
          <span className="text-xs uppercase tracking-[0.3em] text-brand-champagne/80">
            {detail.demoSection.badgeText}
          </span>
        </div>

        <h2 className="nfd-display text-3xl md:text-5xl text-white leading-tight">
          {detail.demoSection.heading}
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-brand-champagne/70 leading-8">
          {detail.demoSection.body}
        </p>

        <a
          href={detail.demoSection.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 mt-10 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-ink font-semibold px-8 py-4 transition-all duration-500 hover:-translate-y-1 shadow-2xl shadow-black/30"
        >
          {detail.demoSection.ctaLabel}
          <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
        </a>

        <p className="mt-5 text-xs text-brand-champagne/50">
          {detail.demoSection.note}
        </p>

      </div>
    </div>
  </Reveal>
</section>

      {/* ---------------- About / Highlights ---------------- */}
      <section className="py-10 md:py-20 px-5 md:px-8 bg-brand-champagne/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <Reveal>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-brand-primary mb-3">About This Course</p>
            <h2 className="nfd-display text-2xl md:text-3xl text-brand-ink mb-4">{course.title}</h2>
            <p className="text-sm md:text-base text-brand-ink/65 leading-relaxed mb-6">{detail.longDesc}</p>
            <div className="grid grid-cols-2 gap-4">
              {detail.infoBadges.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-xs sm:text-sm text-brand-ink/70 bg-white rounded-xl px-3 py-2.5 border border-brand-primary/10">
                  <s.icon className="text-brand-primary shrink-0" /> {s.label}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="nfd-display text-lg md:text-xl text-brand-ink mb-5">What You'll Learn</h3>
              <ul className="space-y-3.5">
                {detail.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-brand-ink/75">
                    <FaCheckCircle className="text-brand-primary mt-0.5 shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Curriculum ---------------- */}
      <section className="py-12 md:py-20 px-5 md:px-8 bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-8 sm:mb-12">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-brand-primary mb-3">Curriculum</p>
            <h2 className="nfd-display text-2xl md:text-4xl text-brand-ink">What's Inside the Course</h2>
          </Reveal>

          <div className="space-y-4">
            {detail.curriculum.map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div className="flex items-start gap-4 bg-white rounded-2xl p-5 md:p-6 border border-brand-primary/10 hover:border-brand-gold hover:shadow-md transition-all duration-400">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-brand-primary text-brand-gold flex items-center justify-center nfd-display text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="nfd-display text-base md:text-lg text-brand-ink mb-1">{m.title}</h3>
                    <p className="text-xs md:text-sm text-brand-ink/60">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative py-12 md:py-20 px-5 md:px-8 bg-brand-deep overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,var(--color-brand-gold),transparent_45%),radial-gradient(circle_at_80%_80%,var(--color-brand-gold),transparent_45%)]" />
        <Reveal className="relative max-w-2xl mx-auto text-center">
          <BrandLogo variant="mark" className="h-14 mx-auto mb-4" />
          <FloralDivider />
          <h2 className="nfd-display text-3xl md:text-4xl text-white mt-4 mb-4">
            Ready to Master <span className="italic text-brand-gold">{course.title.split(" ").slice(0, 3).join(" ")}?</span>
          </h2>
          <p className="text-brand-champagne/70 text-sm md:text-base mb-8 max-w-md mx-auto">
            {detail.bottomNote}
          </p>
          <a
            href={detail.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 sm:px-8 sm:py-3.5 rounded-full bg-brand-gold text-brand-ink font-semibold hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300"
          >
            {detail.ctaLabel} <FaArrowRight className="text-xs" />
          </a>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}