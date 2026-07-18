import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaArrowRight,
  FaChevronRight,
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaClock,
  FaLanguage,
  FaCertificate,
  FaSignal,
  FaInfinity,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaChalkboardTeacher,
  FaQuoteLeft,
} from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import { GlobalStyles, FloralDivider, Navbar, Footer, Loader } from "./Home";
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
    type: "Most Popular",
    slug: "6-in-1-decoration",
    title: "6-in-1 Professional Decoration Course",
    desc: "Learn complete event decoration with 80+ videos, Hindi training and a completion certificate.",
    features: ["80+ HD Pre-recorded Videos", "25+ Hours Complete Training & more."],
    price: "₹2,499",
    img: "/allinone.webp",
    badge: "Best Seller",
  },
  {
    type: "Special Course",
    slug: "wedding-firework",
    title: "Indian Wedding Firework Masterclass",
    desc: "Master cold pyro, fireworks and professional wedding special effects with practical guidance.",
    features: ["Cold Pyro & Firework Setup", "Professional Safety Training & more."],
    price: "₹2,064",
    img: "/firewall.webp",
    badge: "New",
  },
  {
    type: "Beginner Friendly",
    slug: "balloon-decoration",
    title: "Basic to Advanced Balloon Decoration",
    desc: "Master balloon decoration from basic to advanced with one-year access and certificate.",
    features: ["Balloon Basics to Advanced", "Stage & Ring Decoration & more."],
    price: "₹1,036",
    img: "/baloons.webp",
    badge: "Budget",
  },
];

/* ---------------- Extra per-course detail content ----------------
   Everything a base course card doesn't carry (curriculum, stats,
   demo video, highlights) lives here, keyed by slug. Feel free to
   edit copy — placeholders are written to stay on-topic per course. */
const COURSE_DETAILS = {
  "6-in-1-decoration": {
    tagline: "One course. Six income streams.",
    longDesc:
      "A complete, start-to-finish decoration program covering flower, balloon, stage, mandap, lighting and fabric styling — everything you need to take on any event booking with confidence.",
    demoVideo: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
    stats: {
      rating: 4.8,
      students: "1,200+",
      duration: "25+ Hours",
      lessons: "80+ Videos",
      language: "Hindi",
      level: "Beginner to Advanced",
      access: "1 Year Access",
    },
    highlights: [
      "Flower decoration techniques for stages, mandaps & entrances",
      "Balloon arches, columns, backdrops & garlands",
      "Stage & mandap design from concept to execution",
      "Lighting setup & ambience planning",
      "Fabric draping & tent styling essentials",
      "Costing, client pitching & business setup guidance",
    ],
    curriculum: [
      { title: "Module 1 — Fundamentals of Event Decoration", desc: "Tools, materials & planning basics every decorator needs." },
      { title: "Module 2 — Flower Decoration Mastery", desc: "Fresh & artificial flower work for every event type." },
      { title: "Module 3 — Balloon Decoration Techniques", desc: "Arches, columns, backdrops and balloon art." },
      { title: "Module 4 — Stage & Mandap Design", desc: "Layout planning, structure building & styling." },
      { title: "Module 5 — Lighting & Ambience", desc: "Using light to elevate any décor theme." },
      { title: "Module 6 — Business & Client Handling", desc: "Pricing, quoting and growing your decoration business." },
    ],
  },
  "wedding-firework": {
    tagline: "Add the ultimate wow-factor to any wedding entry.",
    longDesc:
      "Learn safe, professional cold pyro and firework techniques used in premium Indian wedding entries and stage reveals — from setup to synchronized execution.",
    demoVideo: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
    stats: {
      rating: 4.7,
      students: "600+",
      duration: "10+ Hours",
      lessons: "35+ Videos",
      language: "Hindi",
      level: "Intermediate",
      access: "1 Year Access",
    },
    highlights: [
      "Cold pyro fountains & sparkler setup for indoor/outdoor venues",
      "Wedding entry synchronization with music & timing",
      "Safety protocols, permissions & venue compliance",
      "Equipment sourcing & vendor coordination",
      "Budget-friendly vs premium effect packages",
      "Troubleshooting common on-ground issues",
    ],
    curriculum: [
      { title: "Module 1 — Introduction to Wedding Special Effects", desc: "Understanding effect types & where they fit." },
      { title: "Module 2 — Cold Pyro Fundamentals", desc: "Equipment, setup & safe handling." },
      { title: "Module 3 — Firework Safety & Compliance", desc: "Permissions, precautions & venue rules." },
      { title: "Module 4 — Syncing Effects With Entry", desc: "Timing effects with music & choreography." },
      { title: "Module 5 — On-Ground Execution", desc: "Real event walkthroughs & troubleshooting." },
    ],
  },
  "balloon-decoration": {
    tagline: "From your first arch to full stage installations.",
    longDesc:
      "A beginner-friendly, hands-on balloon decoration course that takes you from basic shaping to advanced installations clients love to book.",
    demoVideo: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
    stats: {
      rating: 4.6,
      students: "2,000+",
      duration: "8+ Hours",
      lessons: "40+ Videos",
      language: "Hindi",
      level: "Beginner Friendly",
      access: "1 Year Access",
    },
    highlights: [
      "Balloon basics: sizing, inflation & tools",
      "Arches, columns & garlands step-by-step",
      "Backdrop & photo-wall installations",
      "Stage & ring decoration for weddings",
      "Advanced balloon art & organic clusters",
      "Pricing your work & handling first clients",
    ],
    curriculum: [
      { title: "Module 1 — Balloon Basics & Tools", desc: "Materials, sizing & inflation techniques." },
      { title: "Module 2 — Arches & Columns", desc: "Building strong, symmetric structures." },
      { title: "Module 3 — Backdrops & Garlands", desc: "Organic clusters & photo-wall styling." },
      { title: "Module 4 — Stage & Ring Decoration", desc: "Wedding-ready balloon installations." },
      { title: "Module 5 — Advanced Balloon Art", desc: "Sculptures & signature statement pieces." },
      { title: "Module 6 — Pricing & Client Handling", desc: "Quoting jobs and managing bookings." },
    ],
  },
};

/* ---------------- helpers ---------------- */
const formatTime = (secs = 0) => {
  if (!isFinite(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

/* ============================================================
   Custom-controlled video player (Cloudinary-ready)
   ============================================================ */
const PremiumVideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrent(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const clickX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.min(Math.max(clickX / rect.width, 0), 1);
    v.currentTime = pct * v.duration;
    setProgress(pct * 100);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnd = () => setPlaying(false);
    v.addEventListener("ended", onEnd);
    return () => v.removeEventListener("ended", onEnd);
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl shadow-[#7A1F3B]/25 ring-1 ring-[#C9A227]/30 group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />

      {/* Corner badge */}
      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-[#C9A227] text-[#2B0E1A] text-[10px] sm:text-xs font-semibold tracking-wide z-10">
        Course Preview
      </span>

      {/* Center play button */}
      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-400 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        <span className="relative w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#C9A227]/95 text-[#2B0E1A] flex items-center justify-center text-2xl sm:text-3xl nfd-pulse hover:scale-105 transition-transform duration-300">
          {playing ? <FaPause /> : <FaPlay className="ml-1" />}
        </span>
      </button>

      {/* Custom control bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-5 pb-3 sm:pb-4 pt-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10">
        <div
          ref={barRef}
          onClick={handleSeek}
          className="relative w-full h-1.5 sm:h-2 rounded-full bg-white/25 cursor-pointer mb-3 group/bar"
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[#C9A227] transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C9A227] shadow opacity-0 group-hover/bar:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={togglePlay} aria-label="Toggle play" className="text-sm sm:text-base hover:text-[#C9A227] transition-colors">
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={toggleMute} aria-label="Toggle mute" className="text-sm sm:text-base hover:text-[#C9A227] transition-colors">
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <span className="text-[10px] sm:text-xs text-white/70 tabular-nums">
              {formatTime(current)} / {formatTime(duration)}
            </span>
          </div>
          <button onClick={toggleFullscreen} aria-label="Fullscreen" className="text-sm sm:text-base hover:text-[#C9A227] transition-colors">
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B0E1A]/90 via-[#4A1027]/88 to-[#2B0E1A]/95" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_15%_20%,#C9A227,transparent_45%),radial-gradient(circle_at_85%_80%,#C9A227,transparent_45%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}


          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="px-4 py-1.5 rounded-full bg-[#C9A227] text-[#2B0E1A] text-xs font-semibold">
              {course.badge}
            </span>
            <span className="px-4 py-1.5 rounded-full border border-[#F6E1E8]/30 text-[#F6E1E8]/80 text-xs">
              {course.type}
            </span>
          </div>

          <h1 className="nfd-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            {course.title}
          </h1>
          <p className="nfd-display italic text-[#C9A227] text-base md:text-lg mb-4">{detail.tagline}</p>
          <p className="text-[#F6E1E8]/75 text-sm md:text-base max-w-2xl mx-auto mb-8">{course.desc}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-9 text-[#F6E1E8]/85 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <FaStar className="text-[#C9A227]" /> {detail.stats.rating} Rating
            </span>
            <span className="flex items-center gap-1.5">
              <FaUsers className="text-[#C9A227]" /> {detail.stats.students} Students
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-[#C9A227]" /> {detail.stats.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <FaLanguage className="text-[#C9A227]" /> {detail.stats.language}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="nfd-display text-2xl md:text-3xl text-white">
              {course.price} <span className="text-xs text-[#F6E1E8]/50 font-sans">onwards</span>
            </span>
            <Link
              to={`/enroll-form`}
              className="group inline-flex items-center gap-2 py-2.5 px-6 sm:px-8 sm:py-3 rounded-full bg-[#C9A227] text-[#2B0E1A] font-semibold hover:bg-[#e8c860] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/20"
            >
              Enroll Now
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Demo Video ---------------- */}
      <section className="relative mt-8 md:mt-14 px-5 md:px-8 pb-12 md:pb-20">
        <Reveal className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#7A1F3B] mb-2">Preview</p>
            <h2 className="nfd-display text-2xl md:text-3xl text-[#2B0E1A]">Watch a Free Demo Lesson</h2>
          </div>
          <PremiumVideoPlayer src={detail.demoVideo} poster={course.img} />
        </Reveal>
      </section>

      {/* ---------------- About / Highlights ---------------- */}
      <section className="py-10 md:py-20 px-5 md:px-8 bg-[#F6E1E8]/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <Reveal>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#7A1F3B] mb-3">About This Course</p>
            <h2 className="nfd-display text-2xl md:text-3xl text-[#2B0E1A] mb-4">{course.title}</h2>
            <p className="text-sm md:text-base text-[#2B0E1A]/65 leading-relaxed mb-6">{detail.longDesc}</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FaSignal, label: detail.stats.level },
                { icon: FaInfinity, label: detail.stats.access },
                { icon: FaChalkboardTeacher, label: detail.stats.lessons },
                { icon: FaCertificate, label: "Certificate Included" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-xs sm:text-sm text-[#2B0E1A]/70 bg-white rounded-xl px-3 py-2.5 border border-[#7A1F3B]/10">
                  <s.icon className="text-[#7A1F3B] shrink-0" /> {s.label}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="nfd-display text-lg md:text-xl text-[#2B0E1A] mb-5">What You'll Learn</h3>
              <ul className="space-y-3.5">
                {detail.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-[#2B0E1A]/75">
                    <FaCheckCircle className="text-[#7A1F3B] mt-0.5 shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Curriculum ---------------- */}
      <section className="py-12 md:py-20 px-5 md:px-8 bg-[#FDF6F0]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-8 sm:mb-12">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#7A1F3B] mb-3">Curriculum</p>
            <h2 className="nfd-display text-2xl md:text-4xl text-[#2B0E1A]">What's Inside the Course</h2>
          </Reveal>

          <div className="space-y-4">
            {detail.curriculum.map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div className="flex items-start gap-4 bg-white rounded-2xl p-5 md:p-6 border border-[#7A1F3B]/10 hover:border-[#C9A227] hover:shadow-md transition-all duration-400">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-[#7A1F3B] text-[#C9A227] flex items-center justify-center nfd-display text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="nfd-display text-base md:text-lg text-[#2B0E1A] mb-1">{m.title}</h3>
                    <p className="text-xs md:text-sm text-[#2B0E1A]/60">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative py-12 md:py-20 px-5 md:px-8 bg-[#4A1027] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#C9A227,transparent_45%),radial-gradient(circle_at_80%_80%,#C9A227,transparent_45%)]" />
        <Reveal className="relative max-w-2xl mx-auto text-center">
          <GiFlowerPot className="text-[#C9A227] text-3xl mx-auto mb-4" />
          <FloralDivider />
          <h2 className="nfd-display text-3xl md:text-4xl text-white mt-4 mb-4">
            Ready to Master <span className="italic text-[#C9A227]">{course.title.split(" ").slice(0, 3).join(" ")}?</span>
          </h2>
          <p className="text-[#F6E1E8]/70 text-sm md:text-base mb-8 max-w-md mx-auto">
            Join {detail.stats.students} students already learning with New Flower Decoration.
          </p>
          <Link
            to={`/enroll-form`}
            className="inline-flex items-center gap-2 py-3 px-6 sm:px-8 sm:py-3.5 rounded-full bg-[#C9A227] text-[#2B0E1A] font-semibold hover:bg-[#e8c860] hover:-translate-y-0.5 transition-all duration-300"
          >
            Enroll Now for {course.price} <FaArrowRight className="text-xs" />
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}