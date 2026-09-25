import {
  Clock3,
  Video,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import Reveal from "./Reveal";

const COURSE_HIGHLIGHTS = [
  {
    icon: Clock3,
    title: "25+ Hours Learning",
    desc: "Comprehensive training from basic to advanced event decoration techniques.",
  },
  {
    icon: Video,
    title: "80+ Video Classes",
    desc: "Step-by-step HD lessons that you can watch anytime during your access period.",
  },
  {
    icon: Smartphone,
    title: "Learn Anywhere",
    desc: "Access your training anytime through our Play Store learning application.",
  },
  {
    icon: GraduationCap,
    title: "Online & Offline",
    desc: "Choose recorded online learning or practical classroom training.",
  },
];

const CourseHighlights = () => (
  <section className="py-12 md:py-18 px-5 md:px-8 bg-brand-cream">
    <Reveal>
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">

        <p className="text-xs uppercase tracking-[0.35em] text-brand-primary mb-3">
          COURSE HIGHLIGHTS
        </p>

        <h2 className="nfd-display text-3xl md:text-5xl text-brand-ink">
          Everything You Need
          <br />
          <span className="italic text-brand-gold">
            To Start Your Journey
          </span>
        </h2>

        <p className="mt-5 text-brand-ink/65 leading-7">
          Learn professional event decoration through structured
          online & offline training designed for beginners as well
          as experienced decorators.
        </p>

      </div>
    </Reveal>

    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {COURSE_HIGHLIGHTS.map((item, index) => {

        const Icon = item.icon;

        return (
          <Reveal key={item.title} delay={index * 100}>

            <div className="group h-full bg-white rounded-3xl border border-brand-champagne p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold hover:shadow-xl hover:shadow-brand-primary/10">

              <div className="w-16 h-16 rounded-full bg-brand-champagne flex items-center justify-center text-brand-primary mb-6 transition-all duration-500 group-hover:bg-brand-primary group-hover:text-brand-gold">

                <Icon size={28} />

              </div>

              <h3 className="nfd-display text-xl text-brand-ink mb-3">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-brand-ink/60">
                {item.desc}
              </p>

            </div>

          </Reveal>
        );
      })}
    </div>
  </section>
);

export default CourseHighlights;