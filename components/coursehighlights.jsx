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
    title: "74+ Recorded Videos",
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
  <section className="py-12 md:py-18 px-5 md:px-8 bg-[#FDF6F0]">
    <Reveal>
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">

        <p className="text-xs uppercase tracking-[0.35em] text-[#7A1F3B] mb-3">
          COURSE HIGHLIGHTS
        </p>

        <h2 className="nfd-display text-3xl md:text-5xl text-[#2B0E1A]">
          Everything You Need
          <br />
          <span className="italic text-[#C9A227]">
            To Start Your Journey
          </span>
        </h2>

        <p className="mt-5 text-[#2B0E1A]/65 leading-7">
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

            <div className="group h-full bg-white rounded-3xl border border-[#F6E1E8] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-xl hover:shadow-[#7A1F3B]/10">

              <div className="w-16 h-16 rounded-full bg-[#F6E1E8] flex items-center justify-center text-[#7A1F3B] mb-6 transition-all duration-500 group-hover:bg-[#7A1F3B] group-hover:text-[#C9A227]">

                <Icon size={28} />

              </div>

              <h3 className="nfd-display text-xl text-[#2B0E1A] mb-3">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-[#2B0E1A]/60">
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