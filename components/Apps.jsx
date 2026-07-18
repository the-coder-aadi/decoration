import { motion } from "framer-motion";
import {
  Smartphone,
  PlayCircle,
  Apple,
  ShieldCheck,
  Clock3,
  GraduationCap,
} from "lucide-react";
 
const AppSection = () => {
  return (
    <section className="relative py-10 sm:py-16 bg-[#FDF6F0] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#C9A227]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full bg-[#7A1F3B]/10 blur-[100px]" />
      </div>
 
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[36px] bg-white shadow-2xl shadow-[#7A1F3B]/10 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* ---------------- LEFT COLUMN ---------------- */}
            <div className="relative p-8 md:p-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FDF6F0] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#7A1F3B]">
                <Smartphone size={15} />
                Official Student App
              </span>
 
              <h2 className="mt-6 text-4xl md:text-6xl nfd-display text-[#2B0E1A] leading-tight">
                Learn <span className="text-[#C9A227] italic">Anytime,</span> Anywhere
              </h2>
 
              <p className="mt-6 text-[#2B0E1A]/70 leading-8">
                Access all your premium courses, HD videos, assignments and certificates
                directly from our official learning app.
              </p>
 
 
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=co.sansa.nistk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-[#7A1F3B] px-6 py-4 text-white hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <PlayCircle size={26} />
                  <div>
                    <p className="text-xs opacity-70">Download on</p>
                    <h4 className="font-semibold">Google Play</h4>
                  </div>
                </a>
 
                <a
                  href="https://apps.apple.com/in/app/myinstitute/id1472483563"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border-2 border-[#7A1F3B] bg-white px-6 py-4 hover:scale-105 transition-all duration-300"
                >
                  <Apple className="text-[#7A1F3B]" size={26} />
                  <div>
                    <p className="text-xs text-[#2B0E1A]/60">Download on</p>
                    <h4 className="font-semibold text-[#2B0E1A]">App Store</h4>
                  </div>
                </a>
              </div>
 
              <div className="mt-8 rounded-2xl bg-[#FDF6F0] border border-[#C9A227]/30 p-5">
                <h4 className="font-semibold text-[#2B0E1A]">Login Instructions</h4>
                <p className="mt-3 text-[#2B0E1A]/70 leading-7">
                  Download the app, enter the organization code{" "}
                  <span className="font-bold text-[#7A1F3B]">tcspsi</span>, verify your
                  mobile number with OTP and start learning instantly.
                </p>
              </div>
            </div>
            {/* ---------------- END LEFT COLUMN ---------------- */}
 
            {/* ---------------- RIGHT COLUMN ---------------- */}
            <div className="relative flex items-center justify-center p-6 md:p-14 bg-gradient-to-br from-[#7A1F3B] via-[#5A1730] to-[#2B0E1A] overflow-hidden">
              {/* Glow */}
              <div className="absolute w-80 h-80 rounded-full bg-[#C9A227]/20 blur-[120px]" />
 
              {/* Floating Circles */}
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute top-12 left-10 w-5 h-5 rounded-full bg-[#C9A227]"
              />
 
              <motion.div
                animate={{ y: [12, -12, 12] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute bottom-16 right-12 w-7 h-7 rounded-full bg-white/30"
              />
 
              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10, rotate: -2 }}
                className="relative z-10 w-[320px] rounded-[42px] border-[10px] border-black bg-black shadow-[0_30px_80px_rgba(0,0,0,.45)] overflow-hidden"
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 rounded-b-3xl bg-white z-20" />
 
                <img
                  src="/phonescreen.webp"
                  alt="Student App"
                  className="w-full h-[580px] object-cover"
                />
              </motion.div>
 
              {/* Organization code overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
                <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-5">
                  <p className="text-white/70 text-sm uppercase tracking-[.2em]">
                    Student Login
                  </p>
                  <h3 className="text-white text-xl sm:text-2xl font-bold mt-2">
                    Organization Code
                  </h3>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between rounded-2xl bg-white/10 px-3 sm:px-5 py-2 sm:py-4">
                    <span className="text-[#C9A227] font-bold tracking-widest text-xl">
                      tcspsi
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText("tcspsi")}
                      className="rounded-full bg-[#C9A227] px-4 py-2 text-sm font-semibold text-[#2B0E1A] hover:scale-105 transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ---------------- END RIGHT COLUMN ---------------- */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
 
export default AppSection;