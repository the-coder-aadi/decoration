import { useState } from "react";
import {
  CheckCircle2,
  PlayCircle,
  Sparkles,
  PartyPopper,
  Flower2,
  Flame,
  Clock,
  Globe,
  GraduationCap,
  Smartphone,
  ShoppingCart,
  Download,
  ChevronDown,
  ArrowRight,
  Languages,
  Video,
} from "lucide-react";

import { Navbar } from "./Home";
import { Footer } from "./Home";
import Reveal from "../components/Reveal";

/* ============================================================
   DATA
   ============================================================ */

const BUY_COURSE_URL = "https://tcspsi.courses.store/585464";
const IOS_APP_URL = "https://apps.apple.com/in/app/myinstitute/id1472483563";
const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=co.sansa.nistk";

const FEATURED_FEATURES = [
  { icon: PlayCircle, label: "80+ Videos" },
  { icon: Clock, label: "25+ Hours Training" },
  { icon: PartyPopper, label: "Balloon Decoration" },
  { icon: Flower2, label: "Flower Decoration" },
  { icon: Sparkles, label: "Event SFX" },
  { icon: Flame, label: "Fireworks" },
];

const BALLOON_FEATURES = ["Basic to Advanced Balloon Setups", "Wholesale & Vendor Information"];

const WHAT_YOU_LEARN = [
  { icon: PartyPopper, title: "Balloon Decoration", desc: "Arches, bouquets and trending balloon installation styles." },
  { icon: Flower2, title: "Flower Decoration", desc: "Fresh and artificial floral styling for stages and entrances." },
  { icon: Sparkles, title: "Event SFX", desc: "Cold pyro, fog and bubble effects used in live event decor." },
  { icon: Flame, title: "Fireworks", desc: "Safe handling and staging of fireworks for grand event moments." },
];

const WHY_ONLINE = [
  { icon: PlayCircle, title: "Learn Through Video", desc: "Structured, step-by-step recorded lessons you can rewatch anytime." },
  { icon: Clock, title: "Learn At Your Own Pace", desc: "No fixed timing — learn whenever it suits your schedule." },
  { icon: Globe, title: "Access From Anywhere", desc: "Study from home, your workspace, or on the move." },
  { icon: GraduationCap, title: "Practical Decoration Knowledge", desc: "Real techniques you can apply directly to live events." },
];

const FAQS = [
  {
    q: "What is included in the All-in-One Event Course?",
    a: "The All-in-One Event Course includes 80+ videos and 25+ hours of training covering Balloon Decoration, Flower Decoration, Event SFX and Fireworks, with 1 year of access.",
  },
  {
    q: "Is the course in Hindi?",
    a: "Yes, the All-in-One Event Course is taught in Hindi.",
  },
  {
    q: "How do I buy the course?",
    a: "Click \u201cBuy Course\u201d to purchase through our official course platform at tcspsi.courses.store.",
  },
  {
    q: "How do I access the course on mobile?",
    a: "iOS users can download the My Institute app, enter Org Code tcspsi, enter their mobile number and log in with the OTP. Android users can download the app using the Play Store link provided.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Yes, our online courses are recorded, so you can learn at your own pace, anytime and anywhere.",
  },
  {
    q: "How do I access the My Institute app?",
    a: "Download the My Institute app on iOS, enter Org Code tcspsi, enter your mobile number, and log in using the OTP sent to you. Android users can download the app from the Play Store link provided.",
  },
];

/* ============================================================
   SMALL LOCAL HELPERS (self-contained — no external deps)
   ============================================================ */

function OnlineCoursesSectionHeading({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8  px-1">
      <p
        className={`text-[11px] md:text-xs tracking-[0.3em] uppercase font-medium mb-3 ${
          light ? "text-brand-gold" : "text-brand-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className={`nfd-display text-3xl sm:text-4xl md:text-5xl ${light ? "text-white" : "text-brand-ink"}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm md:text-base leading-relaxed ${
            light ? "text-brand-cream-light/70" : "text-brand-ink/60"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function OnlineCoursesGoldButton({ href, children, external = false, className = "" }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-gold text-brand-ink font-semibold text-sm hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/10 ${className}`}
    >
      {children}
    </a>
  );
}

function OnlineCoursesGhostButton({ href, children, external = false, light = false, className = "" }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
        light ? "border-white/30 text-white hover:bg-white/10" : "border-brand-ink/20 text-brand-ink hover:bg-brand-ink/5"
      } ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-brand-gold transition-transform duration-300 group-hover:scale-x-100" />
      </span>
    </a>
  );
}

function OnlineCoursesFaqRow({ faq, open, onToggle }) {
  return (
    <div className="border-b border-brand-ink/10 last:border-none">
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="nfd-display text-base md:text-lg text-brand-ink pr-4">{faq.q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-brand-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm md:text-[15px] leading-relaxed text-brand-ink/60 pb-6 pr-8">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */

export default function OnlineCourses() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-brand-cream">
      <Navbar />

      {/* ============ 1. HERO ============ */}
      <section className="relative isolate overflow-hidden flex items-center min-h-[90vh] md:min-h-[88vh] sm:py-24 py-20 md:py-0">
        <img
          src="/online-course-hero.jpg"
          alt="Student practicing professional event decoration"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/75 to-brand-ink" />
        <div className="absolute -top-24 right-[-10%] w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-brand-gold/20 blur-[120px] pointer-events-none" />

        <Reveal className="relative z-10 w-full px-5 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-brand-gold font-medium mb-5">
              Online Professional Training
            </p>

            <h1 className="nfd-display text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-white">
              Learn Decoration.
              <br />
              Build Your Skills.
              <br />
              <span className="italic text-brand-gold">Build Your Career.</span>
            </h1>

            <p className="mt-6 text-sm md:text-base text-white/75 leading-relaxed max-w-xl mx-auto">
              Learn professional event decoration through structured recorded courses covering balloon
              decoration, flower decoration, event SFX and fireworks.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <OnlineCoursesGoldButton href="#featured-course">
                Explore Courses <ArrowRight size={16} />
              </OnlineCoursesGoldButton>
              <OnlineCoursesGhostButton href="#contact" light>
                Course Enquiry
              </OnlineCoursesGhostButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] md:text-xs tracking-wide uppercase text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <Video size={13} /> Recorded Training
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Languages size={13} /> Hindi Language
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} /> Learn At Your Own Pace
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ 2. ONLINE COURSES INTRO ============ */}
      <section className="py-14 md:py-20 px-5 md:px-8 bg-brand-cream">
        <Reveal>
          <OnlineCoursesSectionHeading
            eyebrow="Online Learning"
            title="Choose Your Learning Path"
          
            subtitle="Choose a complete event decoration course or focus specifically on balloon decoration and build your skills step by step."
          />
        </Reveal>
      </section>

      {/* ============ 3. FEATURED ALL-IN-ONE COURSE ============ */}
      <section id="featured-course" className="py-10 md:py-16 px-5 md:px-8 bg-brand-champagne/40">
        <Reveal>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 rounded-[32px] overflow-hidden bg-white shadow-xl shadow-brand-primary/10 border border-white/60">
            <div className="relative min-h-[280px] lg:min-h-full overflow-hidden">
              <img
                src="/allinone.webp"
                alt="All-in-One Event Course"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            
         
            </div>

            <div className="p-7 sm:p-10 md:p-12 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-primary mb-3">Featured Course</p>
              <h3 className="nfd-display text-2xl md:text-4xl text-brand-ink mb-1">ALL-IN-ONE EVENT COURSE</h3>
              <p className="text-sm md:text-base text-brand-gold-deep font-medium mb-4">
                Basic to Advanced Party Decoration
              </p>
              <p className="text-sm md:text-base text-brand-ink/65 leading-relaxed mb-7">
                Basic to Advance Party Decoration — learn Balloon Decoration, Flower Decoration, Event SFX
                and Fireworks in one complete recorded course, in Hindi.
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                {FEATURED_FEATURES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex items-center gap-2.5 text-sm text-brand-ink/75">
                      <Icon size={16} className="text-brand-primary shrink-0" />
                      {f.label}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-ink/50">Starting From</p>
                  <h4 className="text-3xl font-bold text-brand-primary tracking-tight">₹2,999</h4>
                </div>
                <OnlineCoursesGoldButton href={BUY_COURSE_URL} external>
                  Buy Course <ArrowRight size={16} />
                </OnlineCoursesGoldButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ 4. BALLOON DECORATION COURSE ============ */}
    <section
  id="balloon-course"
  className="py-10 md:py-16 px-5 md:px-8 bg-brand-cream"
>
  <Reveal>
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 rounded-[32px] overflow-hidden bg-white shadow-xl shadow-brand-primary/10 border border-brand-champagne">

      <div className="relative min-h-[280px] lg:min-h-full overflow-hidden">
        <img
          src="/baloons.webp"
          alt="Basic to Advanced Balloon Decor"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
          decoding="async"
        />

       

     
      </div>

      <div className="p-7 sm:p-10 md:p-12 flex flex-col justify-center">

        <p className="text-xs uppercase tracking-[0.3em] text-brand-primary mb-3">
          Specialized Course
        </p>

        <h3 className="nfd-display text-2xl md:text-4xl text-brand-ink mb-1">
          BASIC TO ADVANCED BALLOON DECOR
        </h3>

        <p className="text-sm md:text-base text-brand-gold-deep font-medium mb-4">
          Become a Balloon Decoration Specialist
        </p>

        <p className="text-sm md:text-base text-brand-ink/65 leading-relaxed mb-7">
          A focused, beginner-friendly recorded course covering only balloon
          decoration — from basic setups to advanced, trending installations.
        </p>

        <ul className="space-y-3 mb-8">
          {BALLOON_FEATURES.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5 text-sm text-brand-ink/75"
            >
              <CheckCircle2
                size={16}
                className="text-brand-primary shrink-0"
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-6">

          <div>
            <p className="text-xs uppercase tracking-widest text-brand-ink/50">
              Starting From
            </p>

            <h4 className="text-3xl font-bold text-brand-primary tracking-tight">
              ₹1,036
            </h4>
          </div>


          <OnlineCoursesGoldButton href={BUY_COURSE_URL} external>
            Buy Course
            <ArrowRight size={16} />
          </OnlineCoursesGoldButton>

        </div>

      </div>
    </div>
  </Reveal>
</section>

      {/* ============ 5. WHAT YOU WILL LEARN ============ */}
      <section className="py-14 md:py-20 px-5 md:px-8 bg-brand-champagne/40">
        <Reveal>
          <OnlineCoursesSectionHeading eyebrow="Curriculum" title="What You Will Learn" />
        </Reveal>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {WHAT_YOU_LEARN.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group h-full bg-white rounded-2xl p-6 border border-transparent hover:border-brand-gold hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 transition-all duration-500">
                  <div className="w-12 h-12 rounded-full bg-brand-champagne flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors duration-500">
                    <Icon size={20} />
                  </div>
                  <h3 className="nfd-display text-base md:text-lg text-brand-ink mb-1.5">{item.title}</h3>
                  <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ 6. WHY LEARN ONLINE ============ */}
      <section className="py-14 md:py-20 px-5 md:px-8 bg-brand-cream">
        <Reveal>
          <OnlineCoursesSectionHeading eyebrow="Why Online" title="Why Learn Online" />
        </Reveal>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {WHY_ONLINE.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 100}>
                <div className="text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-primary mb-4 transition-colors duration-500 hover:bg-brand-primary hover:text-brand-gold hover:border-brand-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="nfd-display text-base md:text-lg text-brand-ink mb-1.5">{item.title}</h3>
                  <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed max-w-[220px]">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ 7. APP / COURSE ACCESS ============ */}
      <section id="app-access" className="relative py-16 md:py-24 px-5 md:px-8 bg-brand-deep overflow-hidden">
        <div className="absolute -bottom-32 left-[-10%] w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none" />

        <Reveal className="relative max-w-3xl mx-auto text-center mb-14">
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-brand-gold font-medium mb-4">
            Course Access
          </p>
          <h2 className="nfd-display text-3xl sm:text-4xl md:text-5xl text-white">
            Your Course. Your Device. Your Learning.
          </h2>
          <p className="mt-5 text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Once purchased, access your online course anytime through the My Institute learning
            platform — on iOS or Android.
          </p>
        </Reveal>

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal delay={0}>
            <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm flex flex-col">
              <div className="w-11 h-11 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-5">
                <ShoppingCart size={20} />
              </div>
              <h3 className="nfd-display text-lg text-white mb-2">Course Buy</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6 flex-1 break-all">{BUY_COURSE_URL}</p>
              <OnlineCoursesGoldButton href={BUY_COURSE_URL} external className="w-full">
                Buy Course
              </OnlineCoursesGoldButton>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm flex flex-col">
              <div className="w-11 h-11 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-5">
                <Smartphone size={20} />
              </div>
              <h3 className="nfd-display text-lg text-white mb-2">iOS Users</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-4">Download My Institute, then log in:</p>
              <ol className="space-y-1.5 mb-6 text-xs text-white/70">
                <li>
                  <span className="text-brand-gold font-medium">1.</span> Enter Org Code: tcspsi
                </li>
                <li>
                  <span className="text-brand-gold font-medium">2.</span> Enter Mobile Number
                </li>
                <li>
                  <span className="text-brand-gold font-medium">3.</span> Use O.T.P and Login
                </li>
              </ol>
              <OnlineCoursesGoldButton href={IOS_APP_URL} external className="w-full mt-auto">
                Download on iOS
              </OnlineCoursesGoldButton>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm flex flex-col">
              <div className="w-11 h-11 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-5">
                <Download size={20} />
              </div>
              <h3 className="nfd-display text-lg text-white mb-2">Android Users</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6 flex-1">
                Download the app from the Play Store to get started.
              </p>
              <OnlineCoursesGoldButton href={ANDROID_APP_URL} external className="w-full mt-auto">
                Get Android App
              </OnlineCoursesGoldButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 8. FAQ ============ */}
      <section id="faq" className="py-16 md:py-22 px-5 md:px-8 bg-brand-cream">
        <Reveal>
          <OnlineCoursesSectionHeading eyebrow="FAQ" title="Common Questions" />
        </Reveal>
        <Reveal className="max-w-3xl mx-auto">
          <div>
            {FAQS.map((faq, i) => (
              <OnlineCoursesFaqRow key={faq.q} faq={faq} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 9. FINAL CTA ============ */}
      <section className="relative py-16 md:py-24 px-5 md:px-8 bg-[#251e12] text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-[380px] md:w-[500px] md:h-[500px] rounded-full bg-brand-gold/10 blur-[140px] pointer-events-none" />
        <Reveal className="relative max-w-2xl mx-auto">
          <h2 className="nfd-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">Ready To Start Learning?</h2>
          <p className="text-sm md:text-base text-white/70 mb-9 max-w-xl mx-auto">
            Choose your online course and start building your decoration skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <OnlineCoursesGoldButton href="#featured-course">
              Explore Courses <ArrowRight size={16} />
            </OnlineCoursesGoldButton>
            <OnlineCoursesGhostButton href="#contact" light>
              Course Enquiry
            </OnlineCoursesGhostButton>
          </div>
        </Reveal>
      </section>

      {/* ============ 10. FOOTER ============ */}
      <Footer />
    </div>
  );
}