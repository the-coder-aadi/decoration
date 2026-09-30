import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaCrown,
  FaUsers,
  FaHeadset,
  FaCalendarCheck,
  FaComments,
  FaClipboardList,
  FaStar,
  FaPlay,
  FaGoogle,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaVideo,
  FaTimes,
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
  FaChalkboardTeacher,
  FaFire,
  FaBriefcase,
} from "react-icons/fa";

import { GiFlowerPot, GiSparkles } from "react-icons/gi";
// import { GiFlowerPot } from "react-icons/gi";
import { useNavigate , Link, useLocation} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import WhatYouLearn from "../components/whatyoulearn";
import CourseHighlights from "../components/coursehighlights";
import TrainingShowcase from "../components/traningshowcase";
import StudentFeedback from "../components/studentfeedback";
import AppSection from "../components/Apps";
import { useScrollToSection } from "../components/scrolltosection";
import Certificates from "../components/Certificates";
/* ============================================================
   NEW FLOWER Event Management Training Institute — Home Page

   THEME: every colour / font / radius / shadow on this page comes from
   the central theme file  ->  src/theme.css
   Nothing here is hard-coded. To re-skin the whole site, edit theme.css only.

   Tokens in use: brand-gold · brand-primary · brand-deep · brand-ink
                  brand-cream · brand-champagne · brand-muted
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
      .nfd-root{ font-family:var(--font-body); background:var(--color-brand-bg); color:var(--color-brand-text); overflow-x:hidden; }
      .nfd-display{ font-family:var(--font-display); }

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
        0%{ box-shadow:0 0 0 0 var(--brand-gold-ring); }
        100%{ box-shadow:0 0 0 22px var(--brand-gold-ring-out); }
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
      .nfd-scrollbar::-webkit-scrollbar-thumb{ background:var(--color-brand-gold); border-radius:10px; }
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
  const stroke = tone === "gold" ? "var(--color-brand-gold)" : "var(--color-brand-champagne)";
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

const PROJECT_VIDEOS = [
  { title: "Amazing Haldi Decor Ideas", url: "https://youtube.com/shorts/CO8Wl7mhGbA?si=qcOHt0U6mrVb6Xor" },
  { title: "DBR02-X Firing System", url: "https://youtube.com/shorts/rqtbhsmP8pY?si=hXvfx-9xwOwm7Jn-" },
  { title: "Event line, Cloth information", url: "https://youtube.com/shorts/JhiqDud07jM?si=KiNSmcD3cGJcYE2i" },
  {   title: "Instructor-Led Learning Session", url: "https://youtube.com/shorts/rclFCoTv-Cg?si=_3VDHdeQrFCUfB_g" },
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
 

/* ============================================================
   BRAND LOGO — the single place the official logo is defined.
   Swap the files in /public to change the logo everywhere at once.

     /logo-horizontal.png  lockup for tight bars (navbar, footer)
     /logo.png             full stacked lockup (loader, splash)
     /logo-mark.png        emblem only (favicons, compact badges)

   `.nfd-logo` (see theme.css) locks object-fit:contain and width:auto so the
   logo can never be stretched, squashed or cropped at any breakpoint.
   ============================================================ */
export const BrandLogo = ({
  className = "h-11 md:h-14",
}) => {
  return (
    <img
      src="/logo.png"
      alt="New Flower Event Management Training Institute"
      className={`nfd-logo ${className}`}
      decoding="async"
    />
  );
};

/* ---------------- Loader ---------------- */
export const Loader = ({ loading }) => (
  <div
    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-deep transition-opacity duration-700 ${
      loading ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div className="relative flex items-center justify-center px-6">
      
    
      <BrandLogo variant="stacked" className="h-28 md:h-36" />
    </div>
    <p className="nfd-display text-brand-champagne/80 text-[11px] md:text-xs mt-7 tracking-[0.42em] uppercase">
      Event Management Training
    </p>
    <div className="w-40 h-[2px] bg-white/10 mt-4 overflow-hidden rounded-full">
      <div className="h-full bg-brand-gold animate-[nfd-marquee_1.6s_ease-in-out_infinite]" style={{ width: "60%" }} />
    </div>
  </div>
);

/* ============================================================
   DATA
   ============================================================ */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Program", id: "training-program" },
  { label: "Student Feedback", id: "student-training" },
  { label: "Online Courses", id: "online-courses" },
  { label: "Reviews", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

/* Placeholder training videos for the "Student Training" showcase.
   These are temporary open-licence sample clips standing in for real
   classroom/practical footage — swap the `video` (and `poster`, if you like)
   fields below with your own student training videos when ready. */
const TRAINING_VIDEOS = [
  {
    title: "Practical Session — Flower Decoration",
    poster: "/traning.jpg",
    video: "https://youtube.com/shorts/CO8Wl7mhGbA?si=qcOHt0U6mrVb6Xor",
  },
  {
    title: "Hands-On Training — Balloon Setup",
    poster: "/offlinebatch.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    title: "Classroom Practical — Stage Decoration",
    poster: "/decor2.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    title: "Instructor-Led Demonstration",
    poster: "/decor4.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
];



const TRUSTED = [
  "Aspiring Decorators",
  "Event Professionals",
  "Wedding Professionals",
  "Event Planners",
  "Decoration Business Owners",
  "Entrepreneurs"
];

const WHY_US = [
  { icon: FaChalkboardTeacher, title: "Experienced Trainers", desc: "Industry professionals who bring real event experience into the classroom." },
  { icon: FaUsers, title: "Practical, Hands-On Training", desc: "Learn by doing — real setups and real practice, not just theory." },
  { icon: FaCrown, title: "Career-Focused Curriculum", desc: "Skills mapped to real roles in the event industry." },
  { icon: FaHeadset, title: "Dedicated Student Support", desc: "Guidance from enrollment through course completion." },
];

const COURSES = [
  {
    type: "Offline Practical Training",
    slug: "offline-tent-flower-training",
    title: "Events Management Training",
    desc: "Live, hands-on training in flower, tent, balloon, SFX, fireworks and lights decoration. Batch 20th starts 16 December 2026.",
    features: [
      "21 Days Practical + 1 Hr Theory Daily",
      "Sharing Room And Food Free",
      "Registration fees are not refundable",
    ],
    price: "₹22,000",
    img: "/offlinebatch.jpg",
    badge: "Batch 20th Open",
  },

  {
    type: "Online Course",
    slug: "all-in-one-event-course",
    title: "ALL-IN-ONE EVENT COURSE",
    desc: "Basic to Advance Party Decoration — learn Balloon Decoration, Flower Decoration, Event SFX and Fireworks in one complete recorded course, in Hindi.",
    features: [
      "80+ Videos · 25+ Hours Training",
      "Balloon, Flower, SFX & Fireworks",
    ],
    price: "₹2,999",
    img: "/allinone.webp",
    badge: "1 Year Access",
  },

  {
    type: "Online Course",
    slug: "balloon-decor-course",
    title: "Basic to Advanced Balloon Decor",
    desc: "A focused, beginner-friendly recorded course covering only balloon decoration — from basic setups to advanced, trending installations.",
    features: [
      "Basic to Advanced Balloon Setups",
      "Wholesale & Vendor Information",
    ],
    price: "₹1,036",
    img: "/baloons.webp",
    badge: "Balloon Specialist",
  },
];

/* Offline training is the institute's primary program — kept separate
   from the online catalogue so the two are never mixed in one section. */
const OFFLINE_COURSE = COURSES.find((c) => c.type === "Offline Practical Training");
const ONLINE_COURSES = COURSES.filter((c) => c.type === "Online Course");

const TRAINING_PROCESS = [
  { icon: FaClipboardList, title: "Information", desc: "Explore the training program, curriculum, duration, eligibility and learning outcomes." },
  { icon: FaComments, title: "Inquiry", desc: "Contact the institute and discuss the course, batch, schedule and training requirements." },
  { icon: FaCalendarCheck, title: "Registration", desc: "Complete your enrollment and registration for the selected training program." },
  { icon: FaCheckCircle, title: "Confirmation", desc: "We confirm your admission, batch details, schedule and joining information." },
  { icon: FaChalkboardTeacher, title: "Training Begins", desc: "Begin practical, professional training with instructor guidance and hands-on learning." },
];



const GOOGLE_REVIEWS = [
  { name: "Ajay Shakya", rating: 5, text: "By coming here I learnt everything from basic to advance level and got the confidence that I can do this work safely… New follower decoration team supports you in every way and answers every question… By coming here you can make your dreams come true… Here you are provided with experience from theory to field… so that you can do your work safely.", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXL0xLxSIhiMZ1E7xUE1JBN5srEzNGwyiDqsN2nwuVQARtO3KCT=w90-h90-p-rp-mo-br100" },
  { name: "Nikhil Rajput", rating: 5, text: "I had a great experience at New Flower Decoration while learning ✨wedding event management and flower decoration, Balloon Decoration . The training environment is very positive and professional. The trainers are supportive and explain everything clearly from basic to advanced level. More focus is given on practical work, which helps in gaining real event experience. I learned many new skills related to decoration, planning, and event execution. Overall, this training was very helpful and informative.", avatar: "https://picsum.photos/seed/nfd-av2/100/100" },
  { name: "Asheesh Kumar", rating: 5, text: "Thank you 🙏What you guys taught us, I understood it very well.Now we can start our own event.In which we can do tent decoration, flower decoration, sfx, balloon decoration, and fire work.Everything that is explained here, I understood it all.We are not disappointed after coming here, we are happy that we are interested in this work.A big thank you to all the staff.", avatar: "https://picsum.photos/seed/nfd-av3/100/100" },
  { name: "Vinod Kumar", rating: 5, text: "Thanks new flower Decoration Gadarwara learning and theoretical course for flower decoration, event planner, balloon decoration, Natural flower decoration, SFX Effect for event and minesThanks", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVKyrBmqZmiAYfuG4_obkVX3T3HdPEIQSFq6o4W-u20gDi4vaM=w90-h90-p-rp-mo-br100" },
];

const NUMBERS = [
  {
    icon: FaVideo,
    end: 20,
    suffix: "+",
    label: "Detailed Fireworks Training Videos",
  },
  {
    icon: FaChalkboardTeacher,
    end: 21,
    suffix: "",
    label: "Days Practical Training",
  },
  {
    icon: FaFire,
    end: 1,
    suffix: " Hr",
    label: "Theory Daily",
  },
  {
    icon: FaUsers,
    end: 20,
    suffix: "+",
    label: "Fireworks Training Videos + Practical Training",
  },
];
const INSTAGRAM_POSTS = [
  {
    img: "/decor1.jpg",
    link: "https://www.instagram.com/p/DMbqTw0srUu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/decor3.jpg",
    link: "https://www.instagram.com/p/DYMVETcjKnv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/decor2.jpg",
    link: "https://www.instagram.com/p/DOclbMTifyL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/decor4.jpg",
    link: "https://www.instagram.com/p/DFUeWnDMDkM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/decor5.jpg",
    link: "https://www.instagram.com/p/DWfirPPCCAP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    img: "/decor6.jpg",
    link: "https://www.instagram.com/p/DRfX0t_jK6O/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];
const FAQS = [
  { q: "How do I join a batch?", a: "Fill out the enrollment form or contact us directly — our team will confirm your batch, schedule and next steps." },
  { q: "Are the courses beginner friendly?", a: "Yes, both online and offline courses start from the basics and don't require prior experience." },
  { q: "What is the difference between online and offline training?", a: "Offline training is hands-on, in-person practical training at our institute. Online courses are recorded video lessons you can watch anytime through our learning app." },
  { q: "Is a certificate provided after training?", a: "Yes, a certificate is provided on successful completion of the offline training program." },
  { q: "What is included in the offline batch fee?", a: "The offline batch includes 18 days of practical training plus 1 hour of daily theory, along with room, food and tea on a sharing basis." },
  { q: "Can I access the online course on my phone?", a: "Yes — online courses can be watched anytime through our official learning app on Android and iOS." },
];

/* ============================================================
   NAVBAR
   ============================================================ */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const goToSection = useScrollToSection();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
     ${
  scrolled || open
    ? "bg-brand-deep/92 backdrop-blur-xl border-b border-brand-gold/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
    : "bg-transparent border-b border-transparent"
}
      `}
    >
      <div
        className={`
          max-w-7xl mx-auto px-5 sm:px-6 md:px-8
          flex items-center justify-between
          transition-all duration-500
          ${scrolled ? "h-[58px] md:h-[70px]" : "h-[66px] md:h-[88px]"}
        `}
      >
        {/* LOGO */}
        <a
          href="#home"
          className="flex items-center shrink-0 relative z-20"
          aria-label="New Flower Event Management Training Institute — home"
        >
          <BrandLogo
            className={`
              transition-all duration-500 ease-out
              ${scrolled ? "h-10 sm:h-11 md:h-12" : "h-11 sm:h-13 md:h-16"}
            `}
          />
        </a>

        {/* MOBILE SCROLLED BRAND */}
   {/* Mobile Scrolled Brand */}
<div
  className={`
    lg:hidden
    absolute left-1/2 -translate-x-1/2
    transition-all duration-500
    ${
      scrolled
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-1 pointer-events-none"
    }
  `}
>
  <div className="flex flex-col items-center leading-none whitespace-nowrap">
    <span className="text-brand-gold text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase">
      New Flower
    </span>

    <span className="mt-1 text-brand-champagne/65 text-[7px] sm:text-[8px] tracking-[0.25em] uppercase">
      Event Management Training Institute
    </span>
  </div>
</div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => goToSection(l.id)}
              className="
                relative
                text-sm
                tracking-wide
                text-brand-champagne/85
                hover:text-brand-gold
                transition-colors duration-300
                cursor-pointer
                py-2
                group
              "
            >
              {l.label}

              <span
                className="
                  absolute
                  left-1/2
                  -bottom-0.5
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-brand-gold
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </button>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="tel:+916262646491"
            className="
              flex items-center gap-2
              text-brand-champagne/80
              text-sm
              hover:text-brand-gold
              transition-colors duration-300
            "
          >
            <FaPhoneAlt className="text-brand-gold text-xs" />
            <span>+91 6262646491</span>
          </a>

          <Link
             to="https://docs.google.com/forms/d/e/1FAIpQLScbygdbmDTW7Kbz1gh4UO4oF_TayCsg9x1Y8708s5vrSaBP0A/viewform?usp=publish-editor"
            onClick={(e) => {
              if (location.pathname === "/enroll-form") {
                e.preventDefault();

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
            className="
              px-5 py-2.5
              rounded-full
              bg-brand-gold
              text-brand-ink
              text-sm
              font-semibold
              hover:bg-brand-gold-light
              hover:-translate-y-0.5
              transition-all duration-300
              shadow-md shadow-black/10
            "
          >
            Enroll Now
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="
            lg:hidden
            relative z-20
            w-10 h-10
            flex items-center justify-center
            
           
           
            
            text-brand-champagne
            text-xl          
            transition-all duration-300
          "
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
  className={`lg:hidden overflow-hidden transition-all duration-500 ${
    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
  }`}
>
  <div className="bg-brand-deep px-6 py-4 flex flex-col gap-4">
    {NAV_LINKS.map((l) => (
      <button
        key={l.label}
        onClick={() => {
          goToSection(l.id);
          setOpen(false);
        }}
        className="text-sm tracking-wide text-brand-champagne/90 hover:text-brand-gold"
      >
        {l.label}
      </button>
    ))}

    <button
      type="button"
      onClick={() => navigate("/enroll-form")}
      className="mt-2 text-center px-5 py-2.5 rounded-full bg-brand-gold text-brand-ink text-sm font-semibold"
    >
      Enroll Now
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
  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
    >
      {/* Background */}
      <img
        src="/herobanner.jpg"
        alt="Flower decoration training"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Premium cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/[0.96] via-brand-ink/[0.86] to-brand-ink/[0.58]" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-ink/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-22  sm:pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 lg:gap-14">

          {/* LEFT CONTENT */}
          <div
            className="max-w-2xl"
            style={{ animation: "nfd-fadein 1s ease-out" }}
          >

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-3  sm:gap-x-4 gap-y-1  sm:gap-y-2 mb-4.5 sm:mb-7 text-[10px] sm:text-xs tracking-[0.16em] uppercase">
              <span className="text-brand-champagne/90 font-semibold">
                1,500+ Students Trained
              </span>

              <span className="text-brand-gold/50">
                •
              </span>

              <span className="text-brand-champagne/90 font-semibold">
                5+ Years of Trust
              </span>

              <span className="text-brand-gold/50">
                •
              </span>

              <span className="text-brand-champagne/90 font-semibold">
                1000+ Events
              </span>
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3  sm:mb-5">
              <span className="w-10 h-px bg-brand-gold" />

              <span className="text-brand-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">
                Event Management Training
              </span>
            </div>

            {/* Heading */}
            <h1 className="nfd-display text-[37px] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.7rem] leading-[1.03] text-brand-cream mb-5 sm:mb-6">
              Learn Decoration.
              <br />
              Build Your{" "}
              <span className="italic text-brand-gold">
                Event Career.
              </span>
            </h1>

            {/* Description */}
         {/* <p className="max-w-xl text-brand-champagne/75 text-sm sm:text-base leading-7 mb-5">
  Master the art of decoration — from practical skills to building your own successful event business.
</p> */}

            {/* Batch */}
            <p className="text-[#fae9c8] text-[11px] sm:text-xs tracking-[0.12em] font-medium mb-6 sm:mb-8">
              Events Management Training · Batch 20th · Starts 16 December 2026
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScbygdbmDTW7Kbz1gh4UO4oF_TayCsg9x1Y8708s5vrSaBP0A/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-gold text-brand-ink font-semibold text-sm hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/20"
              >
                Join Batch
              </a>

              <a
                href="#training-program"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-brand-champagne/35 text-brand-champagne text-sm font-medium hover:bg-white/10 transition-all duration-300"
              >
                Explore Training
              </a>
            </div>
          </div>

          {/* RIGHT — OWNER */}
          <div
            className="relative flex justify-center lg:justify-end items-center"
            style={{ animation: "nfd-fadein 1.2s ease-out" }}
          >
            <div className="relative w-[280px] sm:w-[330px] lg:w-[360px] xl:w-[390px]">

              {/* Thin luxury frame */}
              <div className="absolute -inset-2 rounded-2xl border border-brand-gold/20 pointer-events-none" />

              {/* Owner image */}
              <img
                src="/owner1.jpg"
                alt="Founder and Lead Trainer"
                className="relative block rounded-2xl w-full aspect-[4/5] object-cover object-center"
              />

              {/* Image bottom blend */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-ink/70 to-transparent pointer-events-none" />

              {/* Minimal caption */}
              <div className="absolute bottom-4 left-5">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-brand-champagne/80">
                  Founder &amp; Lead Trainer
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 nfd-arrow-bounce text-brand-champagne/60">
        <FaChevronDown />
      </div>
      {/* Subtle Falling Flowers */}
<div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
  {Array.from({ length: 7 }).map((_, i) => (
    <span
      key={i}
      className="nfd-petal text-brand-gold/50"
      style={{
        left: `${8 + i * 13}%`,
        animationDuration: `${11 + (i % 4) * 2}s`,
        animationDelay: `${i * 1.7}s`,
        fontSize: `${10 + (i % 3) * 3}px`,
      }}
    >
      <GiFlowerPot />
    </span>
  ))}
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
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-black/10 grid grid-cols-3 divide-x divide-brand-champagne py-6 md:py-8">
        {[
          { label: "Current Batch", value: "20th" },
          { label: "Training Duration", value: "21 Days" },
          { label: "Total Fee", value: "₹22,000" },
        ].map((s) => (
          <div key={s.label} className="text-center px-2">
            <p className="nfd-display text-xl md:text-3xl text-brand-primary">{s.value}</p>
            <p className="text-[10px] md:text-xs uppercase tracking-wider text-brand-ink/60 mt-1">{s.label}</p>
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
      <p className="text-center text-xs md:text-sm tracking-[0.25em] uppercase text-brand-ink/50 mb-6">
        Trusted By
      </p>
    </Reveal>
    <div className="overflow-hidden nfd-scrollbar">
      <div className="flex w-max nfd-marquee-track">
        {[...TRUSTED, ...TRUSTED].map((t, i) => (
          <span
            key={i}
            className="mx-4 md:mx-6 px-6 py-3 rounded-full border border-brand-primary/15 nfd-display italic text-brand-primary/70 text-sm md:text-base whitespace-nowrap"
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
    <p className={`text-xs md:text-sm tracking-[0.3em] uppercase mb-3 ${light ? "text-brand-gold" : "text-brand-primary"}`}>
      {eyebrow}
    </p>
    <h2 className={`nfd-display text-3xl md:text-4xl lg:text-5xl ${light ? "text-brand-cream" : "text-brand-ink"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-sm md:text-base ${light ? "text-brand-champagne/70" : "text-brand-ink/60"}`}>{subtitle}</p>
    )}
  </Reveal>
);

/* ============================================================
   STUDENT TRAINING — practical training video showcase
   (replaces the previous "Featured Projects" portfolio section)

   NOTE: the four videos below are temporary, high-quality placeholder
   clips (open-licence sample footage) — swap the `video` field in the
   TRAINING_VIDEOS array with real student training footage when ready.
   ============================================================ */
const TrainingVideoCard = ({ v, delay }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <Reveal delay={delay}>
      <div className="group relative rounded-2xl overflow-hidden border border-brand-muted-dark shadow-sm hover:shadow-xl hover:shadow-brand-primary/15 hover:-translate-y-1.5 transition-all duration-500 bg-black">
        <div className="relative w-full aspect-[9/16]">
          <video
            ref={videoRef}
            poster={v.poster}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            loop
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={v.video} type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors duration-500"
          >
            <span
              className={`w-14 h-14 rounded-full backdrop-blur-xl border border-white/30 flex items-center justify-center transition-all duration-500 ${
                playing ? "opacity-0 group-hover:opacity-100 bg-white/20" : "bg-brand-gold"
              }`}
            >
              {playing ? (
                <span className="block w-3.5 h-3.5 border-l-2 border-r-2 border-white" />
              ) : (
                <FaPlay className="text-brand-ink ml-0.5" />
              )}
            </span>
          </button>

          <span className="absolute top-3 left-3 bg-white/15 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
            Placeholder Preview
          </span>
        </div>

        <p className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
          {v.title}
        </p>
      </div>
    </Reveal>
  );
};

const StudentTraining = () => (
  <section id="training-videos" className="py-12 md:py-20 px-5 md:px-8 bg-[#fff9ed]">
    <SectionHeading
      eyebrow="Practical Learning"
      title="Student Training"
      subtitle="A look inside our practical, instructor-led classroom training sessions."
    />

<Reveal className="max-w-6xl mx-auto mt-4 md:mt-10">

 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {PROJECT_VIDEOS.map((v, i) => (
          <Reveal key={v.title} delay={i * 90}>
            <div className="group relative rounded-2xl overflow-hidden border border-brand-muted-dark shadow-sm hover:shadow-xl hover:shadow-brand-primary/15 hover:-translate-y-1.5 transition-all duration-500 bg-black">
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
  <section className="py-14 md:py-25 px-5 md:px-8 bg-brand-deep relative overflow-hidden">
    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-primary/40 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-primary/40 blur-3xl" />
    <div className="relative">
      <SectionHeading eyebrow="Why Us" title="Why Choose Us" light />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {WHY_US.map((w, i) => {
          const Icon = w.icon;
          return (
            <Reveal key={w.title} delay={i * 100}>
              <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-colors duration-500">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold text-xl mb-5">
                  <Icon />
                </div>
                <h3 className="nfd-display text-white text-base md:text-lg mb-2">{w.title}</h3>
                <p className="text-brand-champagne/60 text-xs md:text-sm">{w.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ============================================================
   COURSE CARD — shared card used by the Online Courses grid
   ============================================================ */
const CourseCard = ({ c, delay = 0 }) => (
  <Reveal delay={delay}>
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
        shadow-xl shadow-brand-primary/10
        hover:-translate-y-3
        hover:shadow-[0_25px_60px_var(--brand-primary-tint)]
        transition-all
        duration-500
        before:absolute
        before:inset-0
        before:bg-gradient-to-br
        before:from-white/30
        before:via-transparent
        before:to-brand-gold/5
        before:pointer-events-none
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={c.img}
          alt={c.title}
          className="h-60 w-full object-cover duration-700 transition-all group-hover:scale-110 group-hover:rotate-[1deg]"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-700 transition bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col p-5 sm:p-7 h-auto sm:h-[350px]">
        <h3 className="text-2xl font-semibold text-brand-ink transition duration-300 group-hover:text-brand-primary">
          {c.title}
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-brand-ink/65 min-h-[90px]">{c.desc}</p>

        <ul className="space-y-3 mt-2 flex-1">
          {c.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-brand-ink/75 transition duration-300 group-hover:translate-x-1">
              <FaCheckCircle className="text-brand-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-ink/50">Starting From</p>
            <h4 className="text-2xl sm:text-3xl font-bold text-brand-primary tracking-tight">{c.price}</h4>
          </div>

          <Link
            to={`/course/${c.slug}`}
            className="group/btn relative overflow-hidden rounded-full bg-brand-primary sm:px-5 px-4 py-2 sm:py-2.5 text-white font-semibold transition-all duration-500 hover:scale-105 hover:bg-brand-primary-soft shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="hidden sm:inline">View Course</span>
              <span className="sm:hidden text-[15px]">View</span>
              <FaArrowRight className="duration-300 group-hover/btn:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  </Reveal>
);

/* ============================================================
   OFFLINE TRAINING PROGRAM — the institute's primary program
   ============================================================ */
const OfflineProgram = () => (
  <section id="training-program" className="py-12 md:py-20 px-5 md:px-8 bg-brand-cream">
    <SectionHeading
      eyebrow="Primary Training Program"
      title="Offline Training Program"
      subtitle="Live, in-person, hands-on training — the core of what we teach at the institute."
    />
    <Reveal className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-0 rounded-[32px] overflow-hidden bg-white shadow-xl shadow-brand-primary/10 border border-white/60">
        <div className="relative min-h-[280px] lg:min-h-full">
          <img src={OFFLINE_COURSE.img} alt={OFFLINE_COURSE.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/10 to-transparent lg:bg-gradient-to-r" />
          <span className="absolute sm:top-5 top-3 left-3  sm:left-5 bg-brand-gold text-brand-ink text-[11px]  sm:text-xs font-semibold uppercase tracking-widest sm:px-4 px-3 py-1  sm:py-2 rounded-full shadow-md">
            {OFFLINE_COURSE.badge}
          </span>
        </div>

        <div className="p-7 sm:p-10 md:p-12 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-primary mb-3">Offline · Classroom Training</p>
          <h3 className="nfd-display text-2xl md:text-4xl text-brand-ink mb-4">{OFFLINE_COURSE.title}</h3>
          <p className="text-sm md:text-base text-brand-ink/65 leading-relaxed mb-6">{OFFLINE_COURSE.desc}</p>

          <ul className="space-y-3 mb-8">
            {OFFLINE_COURSE.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm md:text-base text-brand-ink/75">
                <FaCheckCircle className="text-brand-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-ink/50">Total Fee</p>
              <h4 className="text-2xl sm:text-3xl font-bold text-brand-primary tracking-tight">{OFFLINE_COURSE.price}</h4>
            </div>
            <Link
              to={`/course/${OFFLINE_COURSE.slug}`}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 sm:px-7 py-3 text-white font-semibold transition-all duration-500 hover:scale-105 hover:bg-brand-primary-soft shadow-lg"
            >
              View Course Details
              <FaArrowRight className="duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

/* ============================================================
   ONLINE COURSES — the ONE dedicated section for online learning
   ============================================================ */
const OnlineCourses = () => (
  <section id="online-courses" className="py-12 md:py-22 px-5 md:px-8 bg-brand-champagne/40">
    <SectionHeading
      eyebrow="Learn At Your Own Pace"
      title="Online Courses"
      subtitle="Recorded video training you can access anytime, from anywhere, through our learning app."
    />
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-7">
      {ONLINE_COURSES.map((c, i) => (
        <CourseCard key={c.title} c={c} delay={i * 120} />
      ))}
    </div>
  </section>
);

/* ============================================================
   TRAINING PROCESS — the student admission/training journey
   ============================================================ */
const TrainingProcess = () => (
  <section className="py-12 md:py-18 px-5 md:px-8 bg-brand-cream">
    <SectionHeading eyebrow="Training Journey" title="Training Process" subtitle="A simple, transparent path from first inquiry to hands-on training." />
    <div className="max-w-6xl mx-auto relative">
      <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-brand-primary/15" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
        {TRAINING_PROCESS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 120}>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-brand-primary text-brand-gold flex items-center justify-center text-xl relative z-10 shadow-lg shadow-brand-primary/30">
                  <Icon />
                </div>
                <span className="mt-4 text-[12px] tracking-widest uppercase text-brand-primary/50">Step {i + 1}</span>
                <h3 className="nfd-display text-[20px] text-brand-ink mt-1 mb-2">{p.title}</h3>
                <p className="text-[15px] text-brand-ink/60 max-w-[180px]">{p.desc}</p>
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
    <section id="testimonials" className="py-14 md:py-18 px-5 md:px-8 bg-brand-cream">
      <SectionHeading eyebrow="Kind Words" title="Student Stories" subtitle="Real students, real training experiences." />



      {/* Google reviews slider */}
      <Reveal className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg shadow-brand-primary/10 p-8 md:p-10 relative">
          <FaQuoteLeft className="text-brand-champagne text-4xl absolute top-6 left-6" />
          <div className="relative text-center min-h-[170px] flex flex-col items-center justify-center">
            <img
              src={GOOGLE_REVIEWS[active].avatar}
              alt={GOOGLE_REVIEWS[active].name}
              className="w-14 h-14 rounded-full object-cover mb-4 border-2 border-brand-gold"
            />
            <div className="flex gap-1 text-brand-gold text-sm mb-3">
              {Array.from({ length: GOOGLE_REVIEWS[active].rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-sm md:text-base text-brand-ink/75 max-w-lg mb-4 transition-all duration-500">
              "{GOOGLE_REVIEWS[active].text}"
            </p>
            <p className="nfd-display text-brand-primary">{GOOGLE_REVIEWS[active].name}</p>
            <span className="flex items-center gap-1 text-[10px] text-brand-ink/40 mt-1">
              <FaGoogle /> Google Review
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} aria-label="Previous review" className="w-9 h-9 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors duration-300">
              <FaChevronLeft className="text-xs" />
            </button>
            <div className="flex gap-2">
              {GOOGLE_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-brand-gold" : "w-2 bg-brand-primary/20"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next review" className="w-9 h-9 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors duration-300">
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
      <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center text-brand-gold text-xl mb-4">
        <Icon />
      </div>
      <p className="nfd-display text-3xl md:text-4xl text-white">
        {count}
        {suffix}
      </p>
      <p className="text-brand-champagne/60 text-xs md:text-sm mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
};

const Numbers = () => {
  const [ref, visible] = useReveal(0.3);
  return (
    <section ref={ref} className="py-15 md:py-22 px-5 md:px-8 bg-brand-primary">
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
  <section className="py-14 md:py-20 px-5  md:px-8 bg-brand-cream">
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

        <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/50 transition-colors duration-400 flex items-center justify-center">
          <FaInstagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </a>
    </Reveal>
  ))}
</div>
    <Reveal className="text-center mt-10">
      <a
        href="https://www.instagram.com/new_flower_decoration_/?igsh=aXk5eWV5aXdrdHcx"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full border border-brand-primary/30 text-brand-primary text-sm font-medium hover:bg-brand-primary hover:text-white transition-colors duration-300"
      >
        <FaInstagram />@new_flower_decoration_
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
    <div className="border-b border-brand-primary/15">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="nfd-display text-base md:text-lg text-brand-ink">{faq.q}</span>
        <FaChevronDown
          className={`text-brand-primary shrink-0 transition-transform duration-400 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0px" }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <p className="text-sm text-brand-ink/60 pb-5 pr-8">{faq.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-14 md:py-20 px-5 md:px-8 bg-brand-champagne/40">
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
  <section id="contact" className="relative py-14 md:py-24 px-5 md:px-8 bg-brand-deep overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,var(--color-brand-gold),transparent_45%),radial-gradient(circle_at_80%_80%,var(--color-brand-gold),transparent_45%)]" />
    <Reveal className="relative max-w-3xl mx-auto text-center">
      <FloralDivider />
      <h2 className="nfd-display text-3xl md:text-5xl text-white mt-4 mb-4">
        Ready to Start Your <span className="italic text-brand-gold">Training Journey?</span>
      </h2>
      <p className="text-brand-champagne/70 text-sm md:text-base mb-8 max-w-xl mx-auto">
        Join our next batch and begin hands-on, professional training with expert instructor guidance.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
         to={"/enroll-form"}
          className="px-8 py-3.5 rounded-full bg-brand-gold text-brand-ink font-semibold hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300"
        >
          Enquire Now
        </Link>
        <a href="tel:+916262646491" className="flex items-center gap-2 text-brand-champagne text-sm">
          <FaPhoneAlt className="text-brand-gold" /> +91 6232491618
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
    url: "https://www.instagram.com/new_flower_decoration_/?igsh=aXk5eWV5aXdrdHcx",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/tent_flower_decor_training",
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/916232491618",
  },
  {
  icon: FaYoutube,
  url: "https://www.youtube.com/@Newflowerdecoration",
},
];
export const Footer = () => {

  const navigate = useNavigate();
  const location = useLocation();

const goToSection = useScrollToSection()

    return (
  <footer className="bg-brand-ink text-brand-champagne pt-14 md:pt-20 pb-8 px-5 md:px-8">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 md:gap-8 mb-12">
      <div>
        <div className="mb-5">
          <BrandLogo className="h-14 md:h-16" />
        </div>
        <p className="text-sm text-brand-champagne/60 mb-5 leading-relaxed">
          Training students in professional event decoration and event management since 2020.
        </p>
   <div className="flex gap-3">
  {SOCIALS.map(({ icon: Icon, url }, i) => (
    <a
      key={i}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full border border-brand-champagne/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-ink hover:border-brand-gold transition-colors duration-300"
    >
      <Icon className="text-sm" />
    </a>
  ))}
</div>
      </div>

      <div>
        <h4 className="nfd-display text-lg mb-4">Quick Links</h4>
<ul className="space-y-2 text-sm text-brand-champagne/60">
  {NAV_LINKS.map((l) => (
    <li key={l.label}>
      <button
        onClick={() => goToSection(l.id)}
        className="hover:text-brand-gold transition-colors duration-300"
      >
        {l.label}
      </button>
    </li>
  ))}
</ul>
      </div>

      <div>
        <h4 className="nfd-display text-lg mb-4">Programs</h4>
        <ul className="space-y-2 text-sm text-brand-champagne/60">
          {COURSES.map((c) => (
            <li key={c.title}>
              <Link to={`/course/${c.slug}`} className="hover:text-brand-gold transition-colors duration-300">
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="nfd-display text-lg mb-4">Contact</h4>
        <ul className="space-y-3 text-sm text-brand-champagne/60 mb-5">
       <li className="flex items-start gap-2">
  <FaMapMarkerAlt className="text-brand-gold mt-1 shrink-0" />
  <span>Niranjan Ward, Gadarwara 487551</span>
</li>

<li className="flex items-center gap-2">
  <FaPhoneAlt className="text-brand-gold shrink-0" />
  <a
    href="tel:+916262646491"
    className="hover:text-brand-gold transition-colors"
  >
    +91 6232491618
  </a>
</li>

<li className="flex items-center gap-2">
  <FaEnvelope className="text-brand-gold shrink-0" />
  <a
    href="mailto:Newflowerdecoration2000@gmail.com"
    className="hover:text-brand-gold transition-colors"
  >
    Newflowerdecoration2000@gmail.com
  </a>
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

    <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-champagne/40">
      <p>© {new Date().getFullYear()} New Flower Decoration. All rights reserved.</p>
      {/* <p>Designed with <span className="text-brand-gold">♥</span> for beautiful celebrations.</p> */}
    </div>
  </footer>
     );
};

/* ============================================================
   HOME (default export)
   ============================================================ */
export default function Home() {
  const [loading, setLoading] = useState(true);
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
        <div  onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm rounded-3xl bg-brand-cream-light border border-brand-primary/10 shadow-[0_20px_60px_var(--brand-shadow-soft)] p-7">

          {/* Close */}
          <button
            onClick={() => setShowBatchPopup(false)}
            className="absolute top-4 right-4 h-8 cursor-pointer w-8 rounded-full bg-brand-champagne-soft hover:bg-brand-primary hover:text-white transition"
          >
            ✕
          </button>

          {/* Badge */}
          <div className="mx-auto mb-4 w-fit rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
            New Batch
          </div>

          {/* Heading */}
          <h2 className="text-center text-2xl font-bold text-brand-ink">
            Now Enrolling
          </h2>

          {/* Text */}
         <p className="mt-3 text-center text-sm leading-6 text-brand-muted">
  Events Management Training — Batch 20th
  <br />
  <span className="font-semibold text-brand-primary">
    ISO Certified Course · Starts 16 December 2026
  </span>
</p>

          {/* CTA */}
          <a
            href="/course/offline-tent-flower-training"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowBatchPopup(false)}
            className="mt-5 block w-full text-center cursor-pointer rounded-full bg-brand-primary py-3 text-white font-medium hover:bg-brand-primary-soft transition"
          >
            Explore the Course
          </a>

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
      <OfflineProgram />
      <StudentFeedback />
            <WhatYouLearn />
            <Certificates />
      <StudentTraining />
      <TrainingProcess />
      {/* <OnlineCourses /> */}
         <CourseHighlights />
      <AppSection />
      <WhyChooseUs />
      <Testimonials />
      <Numbers />
      <InstagramGallery />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
