
import Reveal from "./Reveal";

const COURSE_HIGHLIGHTS = [
  {
    title: "Tent House Décor Training",
    desc: "Learn professional tent house decoration, setup planning, material use, and practical event decoration techniques.",
    image:
      "https://res.cloudinary.com/dhjti8rys/image/upload/f_auto,q_auto,w_900/v1791171577/Tent_House_D%C3%A9cor_Training_Showcase_p6n97e.png",
  },
  {

    title: "Pastel Balloon Decoration Training",
    desc: "Learn beautiful pastel balloon decoration, creative combinations, styling techniques, and professional event setups.",
    image:
      "https://res.cloudinary.com/dhjti8rys/image/upload/f_auto,q_auto,w_900/v1791171562/Pastel_Balloon_Decoration_Training_Showcase_mgrxho.png",
  },
  {

    title: "Luxury Wedding Flower Decoration Training",
    desc: "Learn elegant wedding flower decoration, stage styling, floral arrangements, and premium event decoration techniques.",
    image:
      "https://res.cloudinary.com/dhjti8rys/image/upload/f_auto,q_auto,w_900/v1791171557/Luxurious_Wedding_Flower_Decoration_Showcase_cas8bg.png",
  },
  {

    title: "Lighting Work Event Training",
    desc: "Learn event lighting setup, practical lighting work, placement, connections, and professional event applications.",
    image:
      "https://res.cloudinary.com/dhjti8rys/image/upload/f_auto,q_auto,w_900/v1791171547/Lighting_Work_Event_Showcase_w8yats.png",
  },
  {

    title: "Event SFX & Fireworks Training",
    desc: "Learn event SFX, fireworks systems, practical setup, machine operation, safety, and professional working methods.",
    image:
      "https://res.cloudinary.com/dhjti8rys/image/upload/f_auto,q_auto,w_900/v1791171531/Events_SFX_Fireworks_Showcase_xyq9x9.png",
  },
  {

    title: "Event SFX Wedding Spectacle Training",
    desc: "Learn how special effects and creative event elements are planned and used to create memorable wedding experiences.",
    image:
      "https://res.cloudinary.com/dhjti8rys/image/upload/f_auto,q_auto,w_900/v1791171521/Event_SFX_Wedding_Spectacle_srnasn.png",
  },
];

const CourseHighlights = () => (
  <section className="py-12 md:py-18 px-5 md:px-8 bg-[#fffbef]">
    <Reveal>
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-primary mb-3">
          COURSE SYLLABUS HIGHLIGHTS
        </p>

        <h2 className="nfd-display text-3xl md:text-5xl text-brand-ink">
          Everything You Need
          <br />
          <span className="italic text-brand-gold">
            To Start Your Journey
          </span>
        </h2>

        <p className="mt-5 text-brand-ink/65 leading-7">
       Build practical event decoration skills through professional training.
        </p>
      </div>
    </Reveal>

    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {COURSE_HIGHLIGHTS.map((item, index) => {
        const Icon = item.icon;

        return (
          <Reveal key={item.title} delay={index * 100}>
            <div className="group h-full bg-white rounded-3xl border border-brand-champagne overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold hover:shadow-xl hover:shadow-brand-primary/10">

              {/* Image */}
              <div className="relative w-full aspect-[19/10] overflow-hidden bg-brand-ink">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
           

              </div>

              {/* Content */}
              <div className="p-5 sm:p-7">
                <h3 className="nfd-display text-xl text-brand-ink mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-brand-ink/60">
                  {item.desc}
                </p>
              </div>

            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

export default CourseHighlights;