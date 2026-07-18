import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaLeaf,
  FaCrown,
  FaUsers,
  FaHeadset,
  FaTags,
  FaBirthdayCake,
  FaPaintBrush,
  FaBriefcase,
  FaTheaterMasks,
  FaCalendarCheck,
  FaComments,
  FaClipboardList,
  FaPaintRoller,
  FaGlassCheers,
  FaStar,
  FaPlay,
  FaGoogle,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaPinterestP,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
  FaEye,
  FaRing,
  FaSun,
} from "react-icons/fa";
import { GiFlowerPot, GiCampingTent } from "react-icons/gi";
import { useNavigate , Link, useLocation} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import WhatYouLearn from "../components/whatyoulearn";
import CourseHighlights from "../components/coursehighlights";
import TrainingShowcase from "../components/traningshowcase";
import StudentFeedback from "../components/studentfeedback";
import AppSection from "../components/Apps";
import { useScrollToSection } from "../components/scrolltosection";
/* ============================================================
   NEW FLOWER DECORATION — Luxury Home Page
   Palette : Wine #7A1F3B | Wine Dark #4A1027 | Ink #2B0E1A
             Cream #FDF6F0 | Blush #F6E1E8 | Gold #C9A227
   Display : Playfair Display  |  Body : Poppins
   ============================================================ */

/* ---------------- Global font + keyframe injector ---------------- */
export const GlobalStyles = () => {
  useEffect(() => {
    if (!document.getElementById("nfd-google-fonts")) {
      const link = document.createElement("link");
      link.id = "nfd-google-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <style>{`
      .nfd-root{ font-family:'Poppins', sans-serif; background:#FDF6F0; color:#2B0E1A; overflow-x:hidden; }
      .nfd-display{ font-family:'Playfair Display', serif; }

      @keyframes nfd-fall{
        0%{ transform:translateY(-10vh) translateX(0) rotate(0deg); opacity:0; }
        10%{ opacity:1; }
        100%{ transform:translateY(110vh) translateX(40px) rotate(320deg); opacity:0; }
      }
      @keyframes nfd-marquee{
        0%{ transform:translateX(0); }
        100%{ transform:translateX(-50%); }
      }
      @keyframes nfd-pulse-ring{
        0%{ box-shadow:0 0 0 0 rgba(201,162,39,0.45); }
        100%{ box-shadow:0 0 0 22px rgba(201,162,39,0); }
      }
      @keyframes nfd-spin-slow{
        from{ transform:rotate(0deg);} to{ transform:rotate(360deg);}
      }
      @keyframes nfd-bounce-arrow{
        0%,100%{ transform:translateY(0);} 50%{ transform:translateY(8px);}
      }
      @keyframes nfd-fadein{
        from{ opacity:0; transform:translateY(24px);} to{ opacity:1; transform:translateY(0);}
      }

      .nfd-petal{ position:absolute; top:-5%; animation:nfd-fall linear infinite; pointer-events:none; }
      .nfd-marquee-track{ animation:nfd-marquee 28s linear infinite; }
      .nfd-pulse{ animation:nfd-pulse-ring 2.2s ease-out infinite; }
      .nfd-spin-slow{ animation:nfd-spin-slow 6s linear infinite; }
      .nfd-arrow-bounce{ animation:nfd-bounce-arrow 1.8s ease-in-out infinite; }

      .nfd-scrollbar::-webkit-scrollbar{ height:6px; width:8px; }
      .nfd-scrollbar::-webkit-scrollbar-thumb{ background:#C9A227; border-radius:10px; }
      .nfd-scrollbar::-webkit-scrollbar-track{ background:transparent; }

      .nfd-clip-wave{ clip-path: polygon(0 12%, 100% 0, 100% 100%, 0% 100%); }

      @media (prefers-reduced-motion: reduce){
        .nfd-petal, .nfd-marquee-track, .nfd-pulse, .nfd-spin-slow, .nfd-arrow-bounce { animation: none !important; }
      }
    `}</style>
  );
};

/* ---------------- Reveal on scroll ---------------- */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const Reveal = ({ children, className = "", delay = 0, y = true }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1100ms] ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : `opacity-0 ${y ? "translate-y-10" : ""}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ---------------- Counter ---------------- */
function useCounter(end, start, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration]);
  return count;
}

/* ---------------- Floral Divider (signature element) ---------------- */
export const FloralDivider = ({ tone = "gold" }) => {
  const stroke = tone === "gold" ? "#C9A227" : "#F6E1E8";
  return (
    <div className="flex items-center justify-center py-2 select-none" aria-hidden="true">
      <svg width="220" height="24" viewBox="0 0 220 24" fill="none">
        <path d="M0 12 C 40 2, 60 22, 100 12 S 160 2, 220 12" stroke={stroke} strokeWidth="1.4" fill="none" />
        <circle cx="110" cy="12" r="4.5" fill={stroke} />
        <circle cx="80" cy="9" r="2" fill={stroke} />
        <circle cx="140" cy="15" r="2" fill={stroke} />
      </svg>
    </div>
  );
};

/* ---------------- Loader ---------------- */
export const Loader = ({ loading }) => (
  <div
    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#4A1027] transition-opacity duration-700 ${
      loading ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div className="relative w-24 h-24 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-[#C9A227]/30" />
      <div className="absolute inset-0 rounded-full border-t-2 border-[#C9A227] nfd-spin-slow" />
      <GiFlowerPot className="text-[#C9A227] text-3xl" />
    </div>
    <p className="nfd-display italic text-[#F6E1E8] text-xl mt-6 tracking-wide">
      New Flower Decoration
    </p>
    <div className="w-40 h-[2px] bg-white/10 mt-4 overflow-hidden rounded-full">
      <div className="h-full bg-[#C9A227] animate-[nfd-marquee_1.6s_ease-in-out_infinite]" style={{ width: "60%" }} />
    </div>
  </div>
);

/* ============================================================
   DATA
   ============================================================ */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Courses", id: "courses" },
  { label: "Reviews", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const PROJECT_VIDEOS = [
  { title: "Royal Wedding Mandap Reveal", url: "https://youtube.com/shorts/nrB2xmRTTpc?si=ZxrbZFCPl5TCegMq" },
  { title: "Sangeet Stage Transformation", url: "https://youtube.com/shorts/8XLrIWdpZWk?si=aHMpEp0pjVofU8JH" },
  { title: "Haldi Décor Behind The Scenes", url: "https://youtube.com/shorts/tZEmYsHyJqI?si=XksjctWWJkm0LVKh" },
  { title: "Bridal Entry Highlights", url: "https://youtube.com/shorts/zYxXqtAk--8?si=UcuGy8CAnTZX-KHC" },
];
 
function getYouTubeEmbedUrl(url = "") {
  const shorts = url.match(/shorts\/([a-zA-Z0-9_-]{6,})/);
  if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`;
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  const watch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  if (url.includes("/embed/")) return url;
  return url;
}
 


const TRUSTED = ["Hotels", "Banquet Halls", "Resorts", "Wedding Venues", "Farmhouses", "Corporate Offices"];

const SERVICES = [
  { icon: FaRing, title: "Wedding Decoration", desc: "Grand mandaps, aisles & stages styled to perfection." },
  { icon: FaBirthdayCake, title: "Birthday Decoration", desc: "Themed setups that make every birthday memorable." },
  { icon: FaSun, title: "Haldi Decoration", desc: "Vibrant marigold & fabric décor full of colour." },
  { icon: FaPaintBrush, title: "Mehndi Decoration", desc: "Bright, festive backdrops for the mehndi function." },
  { icon: FaBriefcase, title: "Corporate Event", desc: "Elegant, brand-ready décor for business gatherings." },
  { icon: GiCampingTent, title: "Tent & Lighting", desc: "Premium tents, drapes & lighting for any scale." },
  { icon: GiFlowerPot, title: "Flower Decoration", desc: "Fresh & artificial florals, handcrafted with care." },
  { icon: FaTheaterMasks, title: "Stage Decoration", desc: "Show-stopping stages for weddings & performances." },
];

const PROJECTS = [
  { img: "/mandap.jpg", cat: "Wedding", title: "Royal Mandap, Gadarwara" },
  { img: "/sangeetdecor.jpg", cat: "Stage", title: "Sangeet Night Stage" },
  { img: "/haldidecor.jpg", cat: "Haldi", title: "Marigold Haldi Setup" },
  { img: "/decor2.jpg", cat: "Corporate", title: "primium gate Décor" },
  { img: "/birthdaydecor.webp", cat: "Birthday", title: "Ocean Blue Birthday Theme" },
  { img: "/mehndidecor.jpg", cat: "Mehndi", title: "Boho Mehndi Corner" },
];

const WHY_US = [
  { icon: FaUsers, title: "Experienced Team", desc: "10+ years of skilled decorators & designers." },
  { icon: FaCrown, title: "Premium Decoration", desc: "Curated materials for a truly luxury finish." },
  { icon: FaTags, title: "Affordable Packages", desc: "Flexible pricing to fit every budget & scale." },
  { icon: FaHeadset, title: "24×7 Support", desc: "We're on call before, during & after your event." },
];

const COURSES = [
  {
    type: "Most Popular",
      slug: "6-in-1-decoration",
    title: "6-in-1 Professional Decoration Course",
     desc: "Learn complete event decoration with 80+ videos, Hindi training and a completion certificate.",
    features: [
      "80+ HD Pre-recorded Videos",
      "25+ Hours Complete Training & more.",
    ],
    price: "₹2,499",
    img: "/allinone.webp",
    badge: "Best Seller",
  },

  {
    type: "Special Course",
     slug: "wedding-firework",
    title: "Indian Wedding Firework Masterclass",
    desc: "Master cold pyro, fireworks and professional wedding special effects with practical guidance.",
    features: [
      "Cold Pyro & Firework Setup",
      "Professional Safety Training & more.",
    ],
    price: "₹2,064",
    img: "/firewall.webp",
    badge: "New",
  },

  {
    type: "Beginner Friendly",
     slug: "balloon-decoration",
    title: "Basic to Advanced Balloon Decoration",
    desc: "Master balloon decoration from basic to advanced with one-year access and certificate.",
    features: [
      "Balloon Basics to Advanced",
      "Stage & Ring Decoration & more.",
    ],
    price: "₹1,036",
    img: "/baloons.webp",
    badge: "Budget",
  },
];

const PROCESS = [
  { icon: FaCalendarCheck, title: "Book", desc: "Reserve your date with a quick inquiry." },
  { icon: FaComments, title: "Discussion", desc: "We understand your theme, colours & budget." },
  { icon: FaClipboardList, title: "Planning", desc: "Design layout & material sourcing finalised." },
  { icon: FaPaintRoller, title: "Decoration", desc: "Our team sets up the full décor on-site." },
  { icon: FaGlassCheers, title: "Event Day", desc: "You celebrate — we handle everything else." },
];

const VIDEO_REVIEWS = [
  { name: "Riya & Arjun", thumb: "https://picsum.photos/seed/nfd-vid1/500/650" },
  { name: "Priya Sharma", thumb: "https://picsum.photos/seed/nfd-vid2/500/650" },
  { name: "Kunal Mehta", thumb: "https://picsum.photos/seed/nfd-vid3/500/650" },
  { name: "Sneha & Rahul", thumb: "https://picsum.photos/seed/nfd-vid4/500/650" },
  { name: "kirti & Mohit", thumb: "https://picsum.photos/seed/nfd-vid5/500/650" },

];

const GOOGLE_REVIEWS = [
  { name: "Ajay Shakya", rating: 5, text: "By coming here I learnt everything from basic to advance level and got the confidence that I can do this work safely… New follower decoration team supports you in every way and answers every question… By coming here you can make your dreams come true… Here you are provided with experience from theory to field… so that you can do your work safely.", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXL0xLxSIhiMZ1E7xUE1JBN5srEzNGwyiDqsN2nwuVQARtO3KCT=w90-h90-p-rp-mo-br100" },
  { name: "Nikhil Rajput", rating: 5, text: "I had a great experience at New Flower Decoration while learning ✨wedding event management and flower decoration, Balloon Decoration . The training environment is very positive and professional. The trainers are supportive and explain everything clearly from basic to advanced level. More focus is given on practical work, which helps in gaining real event experience. I learned many new skills related to decoration, planning, and event execution. Overall, this training was very helpful and informative.", avatar: "https://picsum.photos/seed/nfd-av2/100/100" },
  { name: "Simran Kaur", rating: 5, text: "Thank you 🙏What you guys taught us, I understood it very well.Now we can start our own event.In which we can do tent decoration, flower decoration, sfx, balloon decoration, and fire work.Everything that is explained here, I understood it all.We are not disappointed after coming here, we are happy that we are interested in this work.A big thank you to all the staff.", avatar: "https://picsum.photos/seed/nfd-av3/100/100" },
  { name: "Vinod Kumar", rating: 5, text: "Thanks new flower Decoration Gadarwara learning and theoretical course for flower decoration, event planner, balloon decoration, Natural flower decoration, SFX Effect for event and minesThanks", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVKyrBmqZmiAYfuG4_obkVX3T3HdPEIQSFq6o4W-u20gDi4vaM=w90-h90-p-rp-mo-br100" },
];

const NUMBERS = [
  { icon: FaGlassCheers, end: 500, suffix: "+", label: "Events" },
  { icon: FaUsers, end: 5000, suffix: "+", label: "Students" },
  { icon: GiFlowerPot, end: 500, suffix: "+", label: "Decor Themes" },
  { icon: FaCrown, end: 5, suffix: "+", label: "Years" },
];
const INSTAGRAM_POSTS = [
  {
    img: "/instadecor4.jpg",
    link: "https://www.instagram.com/p/DMbqTw0srUu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/decor3.jpg",
    link: "https://www.instagram.com/p/DYMVETcjKnv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/instadecor3.webp",
    link: "https://www.instagram.com/p/DOclbMTifyL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/newdecor.webp",
    link: "https://www.instagram.com/p/DFUeWnDMDkM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/instadecor1.jpg",
    link: "https://www.instagram.com/p/DWfirPPCCAP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/decor4.jpg",
    link: "https://www.instagram.com/p/DRfX0t_jK6O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];
const FAQS = [
  { q: "How far in advance should I book?", a: "For weddings we recommend booking 2–3 months ahead, especially in peak season. Birthdays and small functions can be booked 1–2 weeks prior." },
  { q: "Do you provide flowers, tents and lighting together?", a: "Yes — we handle full décor including florals, tenting, lighting, stage and furniture as one complete package." },
  { q: "Can I customise a theme or colour palette?", a: "Absolutely. Every package is customisable to your theme, colours and venue." },
  { q: "Do you travel outside the city?", a: "Yes, our team travels for destination weddings and outstation events with prior scheduling." },
  { q: "Are the courses beginner friendly?", a: "Yes, both online and offline courses start from the basics and don't require prior experience." },
  { q: "What is included in the consultation?", a: "A free session covering your requirements, budget planning and an initial design concept." },
];

/* ============================================================
   NAVBAR
   ============================================================ */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();

const goToSection = useScrollToSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#4A1027]/95 backdrop-blur shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <GiFlowerPot className="text-[#C9A227] text-2xl md:text-3xl" />
          <span className="nfd-display text-lg md:text-2xl text-[#F6E1E8] tracking-wide">
            New Flower <span className="text-[#C9A227] italic">Decoration</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
     {NAV_LINKS.map((l) => (
  <button
    key={l.label}
    onClick={() => goToSection(l.id)}
    className="text-sm tracking-wide cursor-pointer text-[#F6E1E8]/90 hover:text-[#C9A227]"
  >
    {l.label}
  </button>
))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+911234567890" className="flex items-center gap-2 text-[#F6E1E8] text-sm">
            <FaPhoneAlt className="text-[#C9A227]" /> +91 6262646491
          </a>
         <Link
  to="/book-decoration"
  onClick={(e) => {
    if (location.pathname === "/book-decoration") {
      e.preventDefault(); // dobara navigation mat karo

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }}
  className="px-5 py-2.5 rounded-full bg-[#C9A227] text-[#2B0E1A] text-sm font-semibold hover:bg-[#e8c860] transition-colors duration-300"
>
  Book Decoration
</Link>
        </div>

        <button
          className="lg:hidden text-[#F6E1E8] text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#4A1027] px-6 py-4 flex flex-col gap-4">
        {NAV_LINKS.map((l) => (
  <button
    key={l.label}
    onClick={() =>{
       goToSection(l.id)
       setOpen(false)
    }}
    className="text-sm tracking-wide text-[#F6E1E8]/90 hover:text-[#C9A227]"
  >
    {l.label}
  </button>
))}
          <button type="button" onClick={()=> navigate("book-decoration")} className="mt-2 text-center px-5 py-2.5 rounded-full bg-[#C9A227] text-[#2B0E1A] text-sm font-semibold">
            Book Decoration
          </button>
        </div>
      </div>
    </header>
  );
};

/* ============================================================
   HERO
   ============================================================ */
const Hero = () => {
  const petals = Array.from({ length: 10 });
  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        poster="https://picsum.photos/seed/nfd-hero/1600/900"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B0E1A]/80 via-[#4A1027]/70 to-[#2B0E1A]/90" />

      {petals.map((_, i) => (
        <span
          key={i}
          className="nfd-petal text-[#C9A227]/70"
          style={{
            left: `${(i + 1) * 9}%`,
            animationDuration: `${9 + (i % 5)}s`,
            animationDelay: `${i * 0.9}s`,
            fontSize: `${10 + (i % 4) * 4}px`,
          }}
        >
          <GiFlowerPot />
        </span>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" style={{ animation: "nfd-fadein 1.2s ease-out" }}>
        <div className="hidden sm:flex items-center justify-center gap-2 text-[#C9A227] text-sm mb-4 tracking-widest">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </span>
          <span className="text-[#F6E1E8]/90">500+ Events</span>
          <span className="text-[#F6E1E8]/40">•</span>
          <span className="text-[#F6E1E8]/90">1000+ Happy Clients</span>
          <span className="text-[#F6E1E8]/40 hidden sm:inline">•</span>
          <span className="text-[#F6E1E8]/90 hidden sm:inline">Professional Training</span>
        </div>

        <h1 className="nfd-display text-[33px] sm:text-5xl md:text-6xl lg:text-7xl text-[#FDF6F0] leading-[1.1] mb-6">
          Creating Memorable Celebrations
          <br className="hidden sm:block" /> & <span className="italic text-[#C9A227]">Expert</span> Training
        </h1>

        <p className="text-[#F6E1E8]/80 max-w-xl mx-auto mb-9 text-sm sm:text-base">
         Premium event decoration services and industry-focused online & offline training to help you become a professional decorator.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
           to="/book-decoration"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C9A227] text-[#2B0E1A] font-semibold hover:bg-[#e8c860] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/20"
          >
            Book Decoration
          </Link>
          <a
            href="#courses"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#F6E1E8]/50 text-[#F6E1E8] font-medium hover:bg-white/10 transition-all duration-300"
          >
            Explore Courses
          </a>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 nfd-arrow-bounce text-[#F6E1E8]/70">
        <FaChevronDown />
      </div>
    </section>
  );
};

/* ============================================================
   TRUST BAR (stat card overlapping hero)
   ============================================================ */
const TrustBar = () => (
  <div className="relative z-20 -mt-14 md:-mt-16 px-4">
    <Reveal>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-black/10 grid grid-cols-3 divide-x divide-[#F6E1E8] py-6 md:py-8">
        {[
           { label: "Students Trained", value: "5000+" },
          { label: "Events Decorated", value: "500+" },
          { label: "Years of Trust", value: "5+" },
        ].map((s) => (
          <div key={s.label} className="text-center px-2">
            <p className="nfd-display text-xl md:text-3xl text-[#7A1F3B]">{s.value}</p>
            <p className="text-[10px] md:text-xs uppercase tracking-wider text-[#2B0E1A]/60 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  </div>
);

/* ============================================================
   TRUSTED BY (marquee)
   ============================================================ */
const TrustedBy = () => (
  <section className="pt-16 md:pt-20 pb-10 ">
    <Reveal>
      <p className="text-center text-xs md:text-sm tracking-[0.25em] uppercase text-[#2B0E1A]/50 mb-6">
        Trusted By
      </p>
    </Reveal>
    <div className="overflow-hidden nfd-scrollbar">
      <div className="flex w-max nfd-marquee-track">
        {[...TRUSTED, ...TRUSTED].map((t, i) => (
          <span
            key={i}
            className="mx-4 md:mx-6 px-6 py-3 rounded-full border border-[#7A1F3B]/15 nfd-display italic text-[#7A1F3B]/70 text-sm md:text-base whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   SECTION HEADING helper
   ============================================================ */
const SectionHeading = ({ eyebrow, title, subtitle, light = false }) => (
  <Reveal className="max-w-2xl mx-auto text-center mb-6 md:mb-12 px-4">
    <p className={`text-xs md:text-sm tracking-[0.3em] uppercase mb-3 ${light ? "text-[#C9A227]" : "text-[#7A1F3B]"}`}>
      {eyebrow}
    </p>
    <h2 className={`nfd-display text-3xl md:text-4xl lg:text-5xl ${light ? "text-[#FDF6F0]" : "text-[#2B0E1A]"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-sm md:text-base ${light ? "text-[#F6E1E8]/70" : "text-[#2B0E1A]/60"}`}>{subtitle}</p>
    )}
  </Reveal>
);

/* ============================================================
   SERVICES
   ============================================================ */
const Services = () => (
  <section id="services" className="py-12 md:py-20 px-5 md:px-8 bg-[#FDF6F0]">
    <SectionHeading
      eyebrow="What We Offer"
      title="Our Decoration Services"
      subtitle="Complete décor solutions crafted for every celebration, big or small."
    />
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {SERVICES.map((s, i) => {
        const Icon = s.icon;
        return (
          <Reveal key={s.title} delay={i * 80}>
            <div className="group h-full bg-white rounded-2xl p-6 md:p-8 border border-transparent hover:border-[#C9A227] hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-[#7A1F3B]/10 transition-all duration-500 cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-[#F6E1E8] flex items-center justify-center text-[#7A1F3B] text-xl mb-5 group-hover:bg-[#7A1F3B] group-hover:text-[#C9A227] transition-colors duration-500">
                <Icon />
              </div>
              <h3 className="nfd-display text-lg md:text-xl text-[#2B0E1A] mb-2">{s.title}</h3>
              <p className="text-xs md:text-sm text-[#2B0E1A]/60 leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

/* ============================================================
   FEATURED PROJECTS (masonry)
   ============================================================ */
const Projects = () => (
  <section id="projects" className="py-12 md:py-20 px-5 md:px-8 bg-[#F6E1E8]/40">
    <SectionHeading eyebrow="Portfolio" title="Featured Projects" subtitle="A glimpse into celebrations we've brought to life." />
    <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
      {PROJECTS.map((p, i) => (
        <Reveal key={p.title} delay={i * 90} className="mb-5 break-inside-avoid">
          <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
            <img
              src={p.img}
              alt={p.title}
              className="w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E1A]/90 via-[#2B0E1A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
              <span className="text-[#C9A227] text-xs uppercase tracking-widest mb-1">{p.cat}</span>
              <h3 className="nfd-display text-white text-lg mb-0">{p.title}</h3>
           
            </div>
          </div>
        </Reveal>
      ))}
    </div>

{/* Video Reels — YouTube Shorts */}
    <Reveal className="max-w-6xl mx-auto mt-10 md:mt-20">
      <div className="text-center mb-8 md:mb-10">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#7A1F3B] mb-2">Watch Our Work</p>
        <h3 className="nfd-display text-2xl md:text-3xl text-[#2B0E1A]">Event Highlights</h3>
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {PROJECT_VIDEOS.map((v, i) => (
          <Reveal key={v.title} delay={i * 90}>
            <div className="group relative rounded-2xl overflow-hidden border border-[#535353] shadow-sm hover:shadow-xl hover:shadow-[#7A1F3B]/15 hover:-translate-y-1.5 transition-all duration-500 bg-black">
              <div className="relative w-full aspect-[9/16]">
                <iframe
                  src={getYouTubeEmbedUrl(v.url)}
                  title={v.title}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
        
              <p className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium bg-gradient-to-t from-black/80 to-transparent pointer-events-none translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                {v.title}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  </section>
);

/* ============================================================
   WHY CHOOSE US
   ============================================================ */
const WhyChooseUs = () => (
  <section className="py-14 md:py-25 px-5 md:px-8 bg-[#4A1027] relative overflow-hidden">
    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#7A1F3B]/40 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#7A1F3B]/40 blur-3xl" />
    <div className="relative">
      <SectionHeading eyebrow="Why Us" title="Why Choose Us" light />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {WHY_US.map((w, i) => {
          const Icon = w.icon;
          return (
            <Reveal key={w.title} delay={i * 100}>
              <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-colors duration-500">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#C9A227]/15 flex items-center justify-center text-[#C9A227] text-xl mb-5">
                  <Icon />
                </div>
                <h3 className="nfd-display text-white text-base md:text-lg mb-2">{w.title}</h3>
                <p className="text-[#F6E1E8]/60 text-xs md:text-sm">{w.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ============================================================
   COURSES
   ============================================================ */
const Courses = () => (
  <section id="courses" className="py-16 md:py-22 px-5 md:px-8 bg-[#FDF6F0]">
    <SectionHeading eyebrow="Learn With Us" title="Our Courses" subtitle="Turn your passion for decoration into a career." />
 <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-7">
  {COURSES.map((c, i) => (
    <Reveal key={c.title} delay={i * 120}>
<div
  className="
    group
    relative
    h-full
    rounded-[28px]
    overflow-hidden
    bg-white/90
    backdrop-blur-xl
    border border-white/60
    shadow-xl shadow-[#7A1F3B]/10
    hover:-translate-y-3
    hover:shadow-[0_25px_60px_rgba(122,31,59,0.18)]
    transition-all
    duration-500
    before:absolute
    before:inset-0
    
    before:bg-gradient-to-br
    before:from-white/30
    before:via-transparent
    before:to-[#C9A227]/5
    before:pointer-events-none
  "
>
        {/* IMAGE */}

        <div className="relative overflow-hidden">

 <img
  src={c.img}
  alt={c.title}
  className="
    h-60
    w-full
    object-cover
    duration-700
    transition-all
    group-hover:scale-110
    group-hover:rotate-[1deg]
  "
/>

   <div
  className="
    absolute
    inset-0
    opacity-0
    group-hover:opacity-100
    duration-700
    transition
    bg-gradient-to-r
    from-transparent
    via-white/20
    to-transparent
    -translate-x-full
    group-hover:translate-x-full
  "
/>




        </div>

        {/* CONTENT */}

        <div className="flex flex-col p-5 sm:p-7 h-auto sm:h-[350px]">

         <h3
  className="
    text-2xl
    font-semibold
    text-[#2B0E1A]
    transition
    duration-300
    group-hover:text-[#7A1F3B]
  "
>
  {c.title}
</h3>

          <p className="mt-3 text-[15px] leading-7 text-[#2B0E1A]/65 min-h-[90px]">

            {c.desc}

          </p>

          <ul className="space-y-3 mt-2 flex-1">

            {c.features.map((f) => (
            <li
  key={f}
  className="
    flex
    items-center
    gap-3
    text-sm
    text-[#2B0E1A]/75
    transition
    duration-300
    group-hover:translate-x-1
  "
>
                <FaCheckCircle className="text-[#7A1F3B] shrink-0" />

                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6  flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-[#2B0E1A]/50">

                Starting From

              </p>

            <h4 className="text-2xl sm:text-3xl font-bold text-[#7A1F3B] tracking-tight">
  {c.price}
</h4>

            </div>

<Link
to={`/course/${c.slug}`}
  className="
    group/btn
    relative
    overflow-hidden
    rounded-full
    bg-[#7A1F3B]
    sm:px-5
    px-4
    py-2
    sm:py-2.5
    text-white
    font-semibold
    transition-all
    duration-500
    hover:scale-105
   
    hover:bg-[#5d1730]
    shadow-lg
  "
>
  <span className="relative z-10 flex items-center gap-2">
    <span className="hidden sm:inline">View Course</span>
    <span className="sm:hidden text-[15px]">View</span>

    <FaArrowRight
      className="
        duration-300
        group-hover/btn:translate-x-1
      "
    />
  </span>
</Link>

          </div>

        </div>

      </div>
    </Reveal>
  ))}
</div>
  </section>
);

/* ============================================================
   PROCESS TIMELINE
   ============================================================ */
const Process = () => (
  <section className="py-14 md:py-20 px-5 md:px-8 bg-[#F6E1E8]/40">
    <SectionHeading eyebrow="How It Works" title="Our Process" />
    <div className="max-w-6xl mx-auto relative">
      <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-[#7A1F3B]/15" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
        {PROCESS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 120}>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-[#7A1F3B] text-[#C9A227] flex items-center justify-center text-xl relative z-10 shadow-lg shadow-[#7A1F3B]/30">
                  <Icon />
                </div>
                <span className="mt-4 text-[12px] tracking-widest uppercase text-[#7A1F3B]/50">Step {i + 1}</span>
                <h3 className="nfd-display text-[20px] text-[#2B0E1A] mt-1 mb-2">{p.title}</h3>
                <p className="text-[15px] text-[#2B0E1A]/60 max-w-[180px]">{p.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % GOOGLE_REVIEWS.length), 10000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive((a) => (a - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
  const next = () => setActive((a) => (a + 1) % GOOGLE_REVIEWS.length);

  return (
    <section id="testimonials" className="py-14 md:py-18 px-5 md:px-8 bg-[#FDF6F0]">
      <SectionHeading eyebrow="Kind Words" title="Client Stories" subtitle="Real celebrations, real feedback." />



      {/* Google reviews slider */}
      <Reveal className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg shadow-[#7A1F3B]/10 p-8 md:p-10 relative">
          <FaQuoteLeft className="text-[#F6E1E8] text-4xl absolute top-6 left-6" />
          <div className="relative text-center min-h-[170px] flex flex-col items-center justify-center">
            <img
              src={GOOGLE_REVIEWS[active].avatar}
              alt={GOOGLE_REVIEWS[active].name}
              className="w-14 h-14 rounded-full object-cover mb-4 border-2 border-[#C9A227]"
            />
            <div className="flex gap-1 text-[#C9A227] text-sm mb-3">
              {Array.from({ length: GOOGLE_REVIEWS[active].rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-sm md:text-base text-[#2B0E1A]/75 max-w-lg mb-4 transition-all duration-500">
              "{GOOGLE_REVIEWS[active].text}"
            </p>
            <p className="nfd-display text-[#7A1F3B]">{GOOGLE_REVIEWS[active].name}</p>
            <span className="flex items-center gap-1 text-[10px] text-[#2B0E1A]/40 mt-1">
              <FaGoogle /> Google Review
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} aria-label="Previous review" className="w-9 h-9 rounded-full border border-[#7A1F3B]/20 flex items-center justify-center text-[#7A1F3B] hover:bg-[#7A1F3B] hover:text-white transition-colors duration-300">
              <FaChevronLeft className="text-xs" />
            </button>
            <div className="flex gap-2">
              {GOOGLE_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-[#C9A227]" : "w-2 bg-[#7A1F3B]/20"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next review" className="w-9 h-9 rounded-full border border-[#7A1F3B]/20 flex items-center justify-center text-[#7A1F3B] hover:bg-[#7A1F3B] hover:text-white transition-colors duration-300">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

/* ============================================================
   NUMBERS
   ============================================================ */
const StatItem = ({ icon: Icon, end, suffix, label, start }) => {
  const count = useCounter(end, start);
  return (
    <div className="text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center text-[#C9A227] text-xl mb-4">
        <Icon />
      </div>
      <p className="nfd-display text-3xl md:text-4xl text-white">
        {count}
        {suffix}
      </p>
      <p className="text-[#F6E1E8]/60 text-xs md:text-sm mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
};

const Numbers = () => {
  const [ref, visible] = useReveal(0.3);
  return (
    <section ref={ref} className="py-15 md:py-22 px-5 md:px-8 bg-[#7A1F3B]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {NUMBERS.map((n) => (
          <StatItem key={n.label} {...n} start={visible} />
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   INSTAGRAM GALLERY
   ============================================================ */
const InstagramGallery = () => (
  <section className="py-18 md:py-20 px-5  md:px-8 bg-[#FDF6F0]">
    <SectionHeading  eyebrow="@newflowerdecoration" title="From Our Instagram" subtitle="Latest décor moments, straight from the field." />
<div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
  {INSTAGRAM_POSTS.map((post, i) => (
    <Reveal key={i} delay={i * 60}>
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer block"
      >
        <img
          src={post.img}
          alt="Instagram post"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-[#7A1F3B]/0 group-hover:bg-[#7A1F3B]/50 transition-colors duration-400 flex items-center justify-center">
          <FaInstagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </a>
    </Reveal>
  ))}
</div>
    <Reveal className="text-center mt-10">
      <a
        href="https://instagram.com/New.flower.decor.gadarwara"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full border border-[#7A1F3B]/30 text-[#7A1F3B] text-sm font-medium hover:bg-[#7A1F3B] hover:text-white transition-colors duration-300"
      >
        <FaInstagram />@New.flower.decor.gadarwara
      </a>
    </Reveal>
  </section>
);

/* ============================================================
   FAQ
   ============================================================ */
const FaqItem = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef(null);
  return (
    <div className="border-b border-[#7A1F3B]/15">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="nfd-display text-base md:text-lg text-[#2B0E1A]">{faq.q}</span>
        <FaChevronDown
          className={`text-[#7A1F3B] shrink-0 transition-transform duration-400 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0px" }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <p className="text-sm text-[#2B0E1A]/60 pb-5 pr-8">{faq.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-14 md:py-20 px-5 md:px-8 bg-[#F6E1E8]/40">
      <SectionHeading eyebrow="FAQ" title="Common Questions" />
      <Reveal className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-sm">
        {FAQS.map((f, i) => (
          <FaqItem key={f.q} faq={f} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
        ))}
      </Reveal>
    </section>
  );
};

/* ============================================================
   CTA
   ============================================================ */
const CTA = () => (
  <section className="relative py-14 md:py-24 px-5 md:px-8 bg-[#4A1027] overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#C9A227,transparent_45%),radial-gradient(circle_at_80%_80%,#C9A227,transparent_45%)]" />
    <Reveal className="relative max-w-3xl mx-auto text-center">
      <FloralDivider />
      <h2 className="nfd-display text-3xl md:text-5xl text-white mt-4 mb-4">
        Need Decoration for Your <span className="italic text-[#C9A227]">Special Day?</span>
      </h2>
      <p className="text-[#F6E1E8]/70 text-sm md:text-base mb-8 max-w-xl mx-auto">
        Book a free consultation with our design team and let's bring your vision to life.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
         to={"book-decoration"}
          className="px-8 py-3.5 rounded-full bg-[#C9A227] text-[#2B0E1A] font-semibold hover:bg-[#e8c860] hover:-translate-y-0.5 transition-all duration-300"
        >
          Book Consultation
        </Link>
        <a href="tel:+911234567890" className="flex items-center gap-2 text-[#F6E1E8] text-sm">
          <FaPhoneAlt className="text-[#C9A227]" /> +91 12345 67890
        </a>
      </div>
    </Reveal>
  </section>
);

/* ============================================================
   FOOTER
   ============================================================ */
   const SOCIALS = [
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/new_flower_decoration_/?hl=en#",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/new.flower.decor.gadarwara/?hl=en#",
  },
  {
    icon: FaFacebookF,
    url: "https://facebook.com/yourpage",
  },
  {
    icon: FaYoutube,
    url: "https://l.instagram.com/?u=https%3A%2F%2Fyt.openinapp.co%2Fqqd86%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGngje0rBI0s4PjG8WYCyIog9XS_ItTlEPau0i3PtbYOtNIms4yGp8xDEtrH_M_aem_lJmtgvZGt423W4XfskLDAg&e=AUCRNARg5GFPentGpWQqI4PNOmPT2RwndbBQCumRIEYCv8HtJHKdnXRaQ6rchq-P3ZGIpXgJpk9eu_vSd8QYY4gNx2NXD9pGF-FCrQ9faSkbWFCNSoDT_8jjAcBB13Tj1Ksjv4_Cw2fN_flo_QF8ahA",
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/916232491618",
  },
];
export const Footer = () => {

  const navigate = useNavigate();
  const location = useLocation();

const goToSection = useScrollToSection()

    return (
  <footer id="contact" className="bg-[#2B0E1A] text-[#F6E1E8] pt-14 md:pt-20 pb-8 px-5 md:px-8">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 md:gap-8 mb-12">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <GiFlowerPot className="text-[#C9A227] text-2xl" />
          <span className="nfd-display text-xl">
            New Flower <span className="italic text-[#C9A227]">Decoration</span>
          </span>
        </div>
        <p className="text-sm text-[#F6E1E8]/60 mb-5 leading-relaxed">
          Crafting elegant, memorable décor for weddings, birthdays & corporate events since 2020.
        </p>
   <div className="flex gap-3">
  {SOCIALS.map(({ icon: Icon, url }, i) => (
    <a
      key={i}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full border border-[#F6E1E8]/20 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#2B0E1A] hover:border-[#C9A227] transition-colors duration-300"
    >
      <Icon className="text-sm" />
    </a>
  ))}
</div>
      </div>

      <div>
        <h4 className="nfd-display text-lg mb-4">Quick Links</h4>
<ul className="space-y-2 text-sm text-[#F6E1E8]/60">
  {NAV_LINKS.map((l) => (
    <li key={l.label}>
      <button
        onClick={() => goToSection(l.id)}
        className="hover:text-[#C9A227] transition-colors duration-300"
      >
        {l.label}
      </button>
    </li>
  ))}
</ul>
      </div>

      <div>
        <h4 className="nfd-display text-lg mb-4">Services</h4>
        <ul className="space-y-2 text-sm text-[#F6E1E8]/60">
          {SERVICES.slice(0, 6).map((s) => (
            <li key={s.title} className="hover:text-[#C9A227] transition-colors duration-300 cursor-pointer">
              {s.title}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="nfd-display text-lg mb-4">Contact</h4>
        <ul className="space-y-3 text-sm text-[#F6E1E8]/60 mb-5">
          <li className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-[#C9A227] mt-1 shrink-0" /> Niranjan Ward, Gadarwara 487551
          </li>
          <li className="flex items-center gap-2">
            <FaPhoneAlt className="text-[#C9A227]" /> +91 62626 46491
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-[#C9A227]" /> hello@newflowerdecoration.com
          </li>
        </ul>
      <div className="rounded-xl overflow-hidden h-32 border border-white/10">
  <iframe
    title="location-map"
    src="https://www.google.com/maps?q=Niranjan+Ward,+Gadarwara+487551,+Madhya+Pradesh,+India&output=embed"
    className="w-full h-full grayscale contrast-125 opacity-80"
    loading="lazy"
  />
</div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F6E1E8]/40">
      <p>© {new Date().getFullYear()} New Flower Decoration. All rights reserved.</p>
      <p>Designed with <span className="text-[#C9A227]">♥</span> for beautiful celebrations.</p>
    </div>
  </footer>
     );
};

/* ============================================================
   HOME (default export)
   ============================================================ */
export default function Home() {
  const [loading, setLoading] = useState(true);
const navigate = useNavigate()
const [showBatchPopup, setShowBatchPopup] = useState(false);

useEffect(() => {
  document.body.style.overflow = "hidden";

  const loaderTimer = setTimeout(() => {
    setLoading(false);
    document.body.style.overflow = "";

    // Agar popup pehle hi dikh chuka hai to dobara mat dikhao
    if (!sessionStorage.getItem("batchPopupShown")) {
      setTimeout(() => {
        setShowBatchPopup(true);
        sessionStorage.setItem("batchPopupShown", "true");
      }, 500);
    }
  }, 2000);

  return () => clearTimeout(loaderTimer);
}, []);

useEffect(() => {
  const handleBeforeUnload = () => {
    sessionStorage.removeItem("batchPopupShown");
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="nfd-root">
      <GlobalStyles />
      <Loader loading={loading} />
<AnimatePresence>
  {showBatchPopup && (
    <>
      {/* Overlay */}
      <motion.div
      
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowBatchPopup(false)}
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
      />

      {/* Popup */}
      <motion.div
      onClick={() => setShowBatchPopup(false)}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        <div  onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm rounded-3xl bg-[#FFF8F5] border border-[#7A1F3B]/10 shadow-[0_20px_60px_rgba(0,0,0,.25)] p-7">

          {/* Close */}
          <button
            onClick={() => setShowBatchPopup(false)}
            className="absolute top-4 right-4 h-8 cursor-pointer w-8 rounded-full bg-[#F6ECEF] hover:bg-[#7A1F3B] hover:text-white transition"
          >
            ✕
          </button>

          {/* Badge */}
          <div className="mx-auto mb-4 w-fit rounded-full bg-[#7A1F3B]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A1F3B]">
            New Batch
          </div>

          {/* Heading */}
          <h2 className="text-center text-2xl font-bold text-[#2B0E1A]">
            Now Enrolling
          </h2>

          {/* Text */}
          <p className="mt-3 text-center text-sm leading-6 text-[#6B5A61]">
            Join our professional decoration training.
            <br />
            <span className="font-semibold text-[#7A1F3B]">
              Batch starts on 30 August 2026.
            </span>
          </p>

          {/* CTA */}
          <button
        
            onClick={() => {
               navigate("/enroll-form")
              setShowBatchPopup(false);
            
              // form open karo
            }}
            className="mt-6 w-full cursor-pointer rounded-full bg-[#7A1F3B] py-3 text-white font-medium hover:bg-[#621831] transition"
          >
            Apply Now
          </button>

        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
      <Navbar />
      <Hero />
      <TrustBar />
      <TrustedBy />
            <TrainingShowcase />
            <StudentFeedback />
<CourseHighlights />
<AppSection />
<WhatYouLearn />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Courses />
      <Process />
      <Testimonials />
      <Numbers />
      <InstagramGallery />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
