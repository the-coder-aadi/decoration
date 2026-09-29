import { Award, ShieldCheck, ZoomIn } from "lucide-react";
import Reveal from "./Reveal";

const CERTIFICATES = [
  {
    title: "ISO Certification",
    label: "International Quality Standard",
    image: "/iso img.png",
    description:
      "A professionally presented certification supporting the institute's commitment to structured and quality-focused training.",
  },
  {
    title: "IAF Certification",
    label: "Accreditation Recognition",
    image: "/iaf img.jpg",
    description:
      "A certification displayed as part of the institute's professional training and accreditation credentials.",
  },
];

const Certificates = () => (
  <section className="relative overflow-hidden py-12 md:py-18 px-5 md:px-8 bg-brand-deep">
    
    {/* Subtle background glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-gold/5 blur-[100px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto">

      {/* HEADER */}
      <Reveal>
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">

          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-brand-gold/60" />

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
              Our Credentials
            </span>

            <span className="w-8 h-px bg-brand-gold/60" />
          </div>

          <h2 className="nfd-display text-3xl sm:text-4xl md:text-5xl text-brand-cream">
            Professional{" "}
            <span className="italic text-brand-gold">
              Certifications
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base leading-7 text-brand-champagne/65 max-w-2xl mx-auto">
            Recognized certification credentials supporting our commitment
            to professional, structured and quality-focused training.
          </p>

        </div>
      </Reveal>

      {/* CERTIFICATE CARDS */}
      <div className="grid md:grid-cols-2 gap-7 lg:gap-10 max-w-5xl mx-auto">

        {CERTIFICATES.map((certificate, index) => (

          <Reveal key={certificate.title} delay={index * 150}>

            <div className="group relative h-full">

              {/* Luxury outer frame */}
              <div className="absolute -inset-px rounded-[26px] bg-gradient-to-b from-brand-gold/30 via-brand-gold/5 to-transparent opacity-70" />

              <div className="relative h-full rounded-[26px] bg-brand-ink/40 border border-brand-gold/15 p-4 sm:p-5 backdrop-blur-sm transition-all duration-500 group-hover:border-brand-gold/35 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

                {/* Certificate image */}
                <div className="relative overflow-hidden rounded-2xl bg-white aspect-[4/3]">

                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    loading="lazy"
                  />

                  {/* Soft image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />


                </div>

                {/* Certificate information */}
                <div className="pt-5 px-1">

                  <div className="flex items-center gap-2 mb-2">
                    {index === 0 ? (
                      <ShieldCheck
                        size={17}
                        className="text-brand-gold"
                      />
                    ) : (
                      <Award
                        size={17}
                        className="text-brand-gold"
                      />
                    )}

                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-brand-gold/80">
                      {certificate.label}
                    </span>
                  </div>

                  <h3 className="nfd-display text-2xl text-brand-cream">
                    {certificate.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-brand-champagne/55">
                    {certificate.description}
                  </p>

                </div>

              </div>
            </div>

          </Reveal>

        ))}

      </div>

      {/* Bottom credibility line */}
      {/* <Reveal delay={300}>
        <div className="mt-10 text-center">

          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-brand-champagne/35">
            Professional Training • Structured Learning • Quality Focus
          </p>

        </div>
      </Reveal> */}

    </div>
  </section>
);

export default Certificates;