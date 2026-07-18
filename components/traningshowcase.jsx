import { GraduationCap, ArrowRight  } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Reveal from "./Reveal";
import { Link } from "react-router-dom";

const TrainingShowcase = () => {
  return (
    <section className="relative overflow-hidden py-10 md:py-16 px-5 md:px-8 bg-[#FDF6F0]">
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 w-[380px] h-[380px] rounded-full bg-[#C9A227]/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[380px] h-[380px] rounded-full bg-[#7A1F3B]/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">

        {/* LEFT */}
        <Reveal>
          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#F6E1E8] border border-[#7A1F3B]/10 px-4 py-2 mb-6">
              <GraduationCap
                size={18}
                className="text-[#7A1F3B]"
              />
              <span className="text-xs tracking-[0.2em] uppercase text-[#7A1F3B] font-medium">
                Professional Training
              </span>
            </div>

            <h2 className="nfd-display text-4xl md:text-5xl lg:text-6xl leading-tight text-[#2B0E1A]">
              Learn The Art of
              <br />
              <span className="italic text-[#C9A227]">
                Event Decoration
              </span>
            </h2>

            <p className="mt-6 text-[#2B0E1A]/70 leading-8 max-w-xl">
              Whether you're starting from scratch or looking to upgrade
              your skills, our Online & Offline training programs are
              designed to help you master professional event decoration,
              event management and creative setup techniques.
            </p>


            <div className="flex flex-wrap gap-4 mt-8">

              <Link
             to={"/course/6-in-1-decoration"}
                className="group inline-flex items-center gap-2 rounded-full bg-[#7A1F3B] hover:bg-[#65172f] text-white px-7 py-3 transition-all duration-500 hover:-translate-y-1"
              >
                View Courses

                <ArrowRight
                  size={18}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>


            </div>

          </div>
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={150}>
          <div className="relative">

            <div className="absolute -inset-4 rounded-[40px] bg-[#C9A227]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[30px]">

              <img
                src="/traning.jpg"
                alt=""
                className="w-full h-[300px] md:h-[600px] object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E1A]/70 via-transparent to-transparent" />

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
};
export default TrainingShowcase