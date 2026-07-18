import { useState,useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Star,
  ArrowRight,
} from "lucide-react";

const STUDENTS = [
  {
    id: 1,
    name: "Jenish Panchal",
    role: "Ahmedabad, Gujrat",
    review: "Started his own decoration journey after completing our training.",
    poster:
"https://res.cloudinary.com/dhjti8rys/video/upload/so_1/v1784262406/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_uvmtpf.jpg",
    video: "https://res.cloudinary.com/dhjti8rys/video/upload/v1784262406/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_uvmtpf.mp4",
  },
  {
    id: 2,
    name: "Varun Nathan",
    role: "Jabalpur, Madhya Pradesh",
    review: "Now handling events decoration projects successfully.",
   poster: "https://res.cloudinary.com/dhjti8rys/video/upload/c_fill,w_600,h_900,g_auto,so_1/v1784263012/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_1_oeiygx.jpg",
    video: "https://res.cloudinary.com/dhjti8rys/video/upload/v1784263012/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_1_oeiygx.mp4",
  },
  {
    id: 3,
    name: "Hemant Barot",
    role: "Baroda, Gujrat",
    review: "Learned advanced decoration techniques and event management.",
  poster: "https://res.cloudinary.com/dhjti8rys/video/upload/c_fill,w_600,h_900,g_auto,so_1/v1784263022/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_2_pyozfo.jpg",
    video: "https://res.cloudinary.com/dhjti8rys/video/upload/v1784263022/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_2_pyozfo.mp4",
  },
  {
    id: 4,
    name: "Kiran Hembram",
    role: "Seraikela Kharsawan, Jharkhand",
    review: "Successfully started her own decoration business.",
    poster: "https://res.cloudinary.com/dhjti8rys/video/upload/c_fill,w_600,h_900,g_auto,so_1/v1784265132/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_3_wwlcf4.jpg",
    video: "https://res.cloudinary.com/dhjti8rys/video/upload/v1784265132/Thank_you_so_much_Share_your_feedback_Next_Batch_20_July_2026_6-in-1_Professional_Decoration_3_wwlcf4.mp4",
  },
];

const StudentFeedback = () => {
  const [active, setActive] = useState(STUDENTS[0]);
  const videoRef = useRef(null);

const [playing, setPlaying] = useState(false);
const [muted, setMuted] = useState(false);
const [progress, setProgress] = useState(0);
const [duration, setDuration] = useState(0);
const [currentTime, setCurrentTime] = useState(0);
const playerRef = useRef(null);

const togglePlay = () => {
  if (!videoRef.current) return;

  if (videoRef.current.paused) {
    videoRef.current.play();
    setPlaying(true);
  } else {
    videoRef.current.pause();
    setPlaying(false);
  }
};

const toggleMute = () => {
  if (!videoRef.current) return;

  videoRef.current.muted = !muted;
  setMuted(!muted);
};

const updateProgress = () => {
  if (!videoRef.current) return;

  const video = videoRef.current;

  setCurrentTime(video.currentTime);
  setDuration(video.duration || 0);

  setProgress((video.currentTime / (video.duration || 1)) * 100);
};

const seekVideo = (e) => {
  if (!videoRef.current) return;

  const rect = e.currentTarget.getBoundingClientRect();

  const percent = (e.clientX - rect.left) / rect.width;

  videoRef.current.currentTime =
    percent * videoRef.current.duration;
};

const formatTime = (time) => {
  if (!time) return "00:00";

  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);

  return `${min}:${sec.toString().padStart(2, "0")}`;
};

const fullscreen = () => {
  videoRef.current?.requestFullscreen();
};
const featuredRef = useRef(null);

  return (
    <section className="relative py-10 md:py-18 bg-[#FDF6F0] overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#C9A227]/10 blur-[130px] rounded-full" />

      <div className="absolute -left-32 bottom-0 w-[300px] h-[300px] bg-[#7A1F3B]/10 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">

        {/* Heading */}
<Reveal>
        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center px-5 py-2 rounded-full bg-white border border-[#F6E1E8] text-[#7A1F3B] uppercase tracking-[0.3em] text-xs">

            Student Success Stories

          </span>

          <h2 className="mt-6 nfd-display text-4xl md:text-6xl text-[#2B0E1A] leading-tight">

            Hear From Our

            <br />

            <span className="italic text-[#C9A227]">
              Successful Students
            </span>

          </h2>

          <p className="mt-5 text-[#2B0E1A]/65 leading-8 max-w-2xl mx-auto">

            Watch how our students transformed their passion into a successful career.

          </p>

        </div>
        </Reveal>

        {/* Featured Video */}

        <div  ref={featuredRef} className="mt-6 sm:mt-16 grid  lg:grid-cols-[0.9fr_0.6fr] gap-8 sm:gap-10 items-center">
<Reveal>
          <div className="group relative  overflow-hidden rounded-[28px] bg-black shadow-2xl shadow-[#7A1F3B]/10">

     <video
  ref={videoRef}
  key={active.video}
  poster={active.poster}
  
 className="w-full max-w-[360px]  mx-auto aspect-[9/16] object-contain bg-[#FDF6F0]"
  onTimeUpdate={updateProgress}
  onLoadedMetadata={updateProgress}
  onPlay={() => setPlaying(true)}
  onPause={() => setPlaying(false)}
  playsInline
>
              <source src={active.video} type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">

  {/* Progress */}

  <div
    onClick={seekVideo}
    className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer"
  >
    <div
      className="h-full bg-[#C9A227] rounded-full"
      style={{ width: `${progress}%` }}
    />
  </div>

  <div className="flex items-center justify-between mt-4">

    <div className="flex items-center gap-3">

      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-lg flex items-center justify-center hover:bg-[#C9A227] transition"
      >
        {playing ? (
          <Pause className="text-white" size={18} />
        ) : (
          <Play
            className="text-white ml-0.5"
            fill="white"
            size={18}
          />
        )}
      </button>

      <button
        onClick={toggleMute}
        className="text-white"
      >
        {muted ? (
          <VolumeX size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>

      <span className="text-white text-xs">

        {formatTime(currentTime)} / {formatTime(duration)}

      </span>

    </div>

    <button
      onClick={fullscreen}
      className="text-white"
    >
      <Maximize size={18} />
    </button>

  </div>

</div>

          </div>
          </Reveal>
<Reveal>
          <div>

            <div className="flex gap-1 mb-5">

              {[...Array(5)].map((_, i) => (

                <Star
                  key={i}
                  size={18}
                  fill="#C9A227"
                  className="text-[#C9A227]"
                />

              ))}

            </div>

            <h3 className="nfd-display text-4xl text-[#2B0E1A]">

              {active.name}

            </h3>

            <p className="text-[#7A1F3B] mt-2">

              {active.role}

            </p>

            <p className="mt-2 sm:mt-6 leading-8 text-[#2B0E1A]/65">

              {active.review}

            </p>

            <Link to={"/enroll-form"}   className="mt-4 sm:mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#7A1F3B] text-white hover:bg-[#5d152d] transition">

              Enroll Now

              <ArrowRight size={18} />

            </Link>

          </div>
          </Reveal>

        </div>
                {/* ==============================
            Video Thumbnails
        ============================== */}

        <div className="mt-12 sm:mt-14">
<Reveal>
          <div className="flex items-center justify-between mb-6">

            <div>

              <h3 className="nfd-display text-2xl md:text-3xl text-[#2B0E1A]">
                More Success Stories
              </h3>

              <p className="text-sm text-[#2B0E1A]/60 mt-2">
                Tap any student to instantly watch their journey.
              </p>

            </div>

            <span className="hidden md:inline-flex px-4 py-2 rounded-full bg-white border border-[#F6E1E8] text-xs uppercase tracking-[0.25em] text-[#7A1F3B]">
              Real Students
            </span>

          </div>
          </Reveal>

          {/* Desktop Grid / Mobile Scroll */}
<Reveal>
          <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible nfd-scrollbar pb-4 snap-x snap-mandatory scrollbar-hide">

            {STUDENTS.map((student) => {

              const activeCard = active.id === student.id;

              return (

                <button
                  key={student.id}
onClick={() => {
  setActive(student);

  setTimeout(() => {
    if (videoRef.current) {
      videoRef.current.load();

      videoRef.current.play().catch(() => {});
    }

    const y =
      featuredRef.current.getBoundingClientRect().top +
      window.scrollY -
      140;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, 200);
}}
                  className={`relative min-w-[250px] md:min-w-0 text-left rounded-[24px] overflow-hidden transition-all duration-500 snap-start group
                  ${
                    activeCard
                      ? "ring-2 ring-[#C9A227] shadow-xl shadow-[#C9A227]/20 scale-[1.02]"
                      : "hover:-translate-y-2 hover:shadow-xl hover:shadow-[#7A1F3B]/10"
                  }`}
                >

                  {/* Poster */}

                  <div className="relative h-[200px] overflow-hidden">

                    <img
                      src={student.poster}
                      alt={student.name}
                      className={`w-full h-full object-cover object-[center_25%] transition duration-700 ${
                        activeCard
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E1A]/95 via-[#2B0E1A]/25 to-transparent" />

                    {/* Play Button */}

                    <div className="absolute inset-0 flex items-center justify-center">

                      <div
                        className={`w-14 h-14 rounded-full backdrop-blur-xl border border-white/30 flex items-center justify-center transition-all duration-500
                        ${
                          activeCard
                            ? "bg-[#C9A227] scale-110"
                            : "bg-white/20 group-hover:scale-110"
                        }`}
                      >

                        <Play
                          size={22}
                          fill="white"
                          className="text-white ml-[2px]"
                        />

                      </div>

                    </div>

                    {/* Active Badge */}

                    {activeCard && (

                      <span className="absolute top-3 left-3 bg-[#C9A227] text-[#2B0E1A] text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">

                        Now Playing

                      </span>

                    )}

                  </div>

                  {/* Content */}

                  <div className="bg-white p-5">

                    <div className="flex gap-1 mb-2">

                      {[...Array(5)].map((_, i) => (

                        <Star
                          key={i}
                          size={13}
                          fill="#C9A227"
                          className="text-[#C9A227]"
                        />

                      ))}

                    </div>

                    <h4 className="font-semibold text-[#2B0E1A] text-lg">

                      {student.name}

                    </h4>

                    <p className="text-[#7A1F3B] text-xs mt-1">

                      {student.role}

                    </p>

                    <p className="text-xs text-[#2B0E1A]/60 mt-3 line-clamp-2">

                      {student.review}

                    </p>

                  </div>

                </button>

              );

            })}

          </div>
          </Reveal>

        </div>

      </div>

    </section>

  );

};

export default StudentFeedback;
        