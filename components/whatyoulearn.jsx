import {
  PartyPopper,
  Sparkles,
  BriefcaseBusiness,
  GraduationCap,
  Check,
} from "lucide-react";
import Reveal from "./Reveal";

const LEARNING_CATEGORIES = [
  {
    title: "Decoration Skills",
    icon: PartyPopper,
    items: [
      "Basic to Advance Balloon Decoration",
      "Theme Decoration",
      "Cut-Out Design",
      "Flower Decoration",
      "Stapler Cloth Work",
    ],
  },
  {
    title: "Special Effects",
    icon: Sparkles,
    items: [
      "Cold Pyro",
      "Dry Ice Effects",
      "CO₂ LED Work",
      "Sparkle Machine",
      "CO₂ Jumbo Machines",
    ],
  },
  {
    title: "Event Management",
    icon: BriefcaseBusiness,
    items: [
      "Customer Dealing",
      "Vendor Management",
      "Production House",
      "On-Spot Event Management",
      "Wholesaler Information",
    ],
  },
  {
    title: "Advanced Learning",
    icon: GraduationCap,
    items: [
      "Bride Entry",
      "Haldi Decoration",
      "Mehndi Decoration",
      "Basic Truss Setup",
      "Fire Show (Mines)",
    ],
  },
];

const WhatYouLearn = () => (
  <section className="py-14 md:py-20 px-5 md:px-8 bg-[#F6E1E8]/30">

    <Reveal>
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">

        <p className="uppercase tracking-[0.35em] text-xs text-[#7A1F3B] mb-3">
          Course Curriculum
        </p>

        <h2 className="nfd-display text-3xl md:text-5xl text-[#2B0E1A]">
          What You'll
          <span className="italic text-[#C9A227]"> Learn</span>
        </h2>

        <p className="mt-5 text-[#2B0E1A]/65 leading-7">
          A complete professional training program covering decoration,
          event management, special effects and advanced practical skills.
        </p>

      </div>
    </Reveal>

    <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-7">

      {LEARNING_CATEGORIES.map((card, i) => {

        const Icon = card.icon;

        return (

          <Reveal key={card.title} delay={i * 120}>

            <div className="group h-full bg-white rounded-3xl p-7 border border-[#F6E1E8] hover:border-[#C9A227] hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#7A1F3B]/10">

              <div className="w-16 h-16 rounded-full bg-[#F6E1E8] flex items-center justify-center text-[#7A1F3B] mb-6 transition-all duration-500 group-hover:bg-[#7A1F3B] group-hover:text-[#C9A227]">

                <Icon size={30} />

              </div>

              <h3 className="nfd-display text-2xl text-[#2B0E1A] mb-5">
                {card.title}
              </h3>

              <div className="space-y-4">

                {card.items.map((item) => (

                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >

                    <div className="w-6 h-6 rounded-full bg-[#F6E1E8] flex items-center justify-center mt-0.5">

                      <Check
                        size={14}
                        className="text-[#7A1F3B]"
                      />

                    </div>

                    <span className="text-sm leading-6 text-[#2B0E1A]/70">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </Reveal>

        );

      })}

    </div>

  </section>
);

export default WhatYouLearn;