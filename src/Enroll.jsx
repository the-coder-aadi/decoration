import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCommentAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaPaperPlane,
  FaChalkboardTeacher,
  FaCertificate,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import { GlobalStyles, FloralDivider, Navbar, Footer, Loader } from "./Home";
 
/* ============================================================
   ENROLL — New Flower Decoration (Online & Offline Courses)
   Same palette/type system as Home.jsx / BookingForm.jsx
   ============================================================ */
 
const COURSE_TYPES = ["All In One Course", "Firework Course", "Balloons Decor Course"];
 
const INITIAL_FORM = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  courseType: "",
  message: "",
};
 
/* ---------------- validation ---------------- */
function validateField(name, value) {
  switch (name) {
    case "fullName": {
      if (!value.trim()) return "Please enter your full name.";
      if (value.trim().length < 3) return "Name should be at least 3 characters.";
      if (!/^[a-zA-Z\s.]+$/.test(value.trim())) return "Name should only contain letters.";
      return "";
    }
    case "phone": {
      if (!value.trim()) return "Please enter your phone number.";
      if (!/^[6-9]\d{9}$/.test(value.trim())) return "Enter a valid 10-digit mobile number.";
      return "";
    }
    case "email": {
      if (!value.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
      return "";
    }
    case "city": {
      if (!value.trim()) return "Please enter your city.";
      if (value.trim().length < 2) return "Enter a valid city name.";
      return "";
    }
    case "courseType": {
      if (!value) return "Please select a course type.";
      return "";
    }
    default:
      return "";
  }
}
 
/* ---------------- reusable field wrapper ---------------- */
const Field = ({ label, icon: Icon, error, touched, required, children }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-[#2B0E1A] mb-2">
      <Icon className="text-[#7A1F3B]" />
      {label} {required && <span className="text-[#C9A227]">*</span>}
    </label>
    {children}
    <div
      className={`grid transition-all duration-300 ease-out ${
        touched && error ? "grid-rows-[1fr] opacity-100 mt-1.5" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <FaExclamationCircle /> {error}
        </p>
      </div>
    </div>
  </div>
);
 
const inputBase =
  "w-full rounded-xl border bg-[#FDF6F0]/60 px-4 py-3 text-sm text-[#2B0E1A] placeholder:text-[#2B0E1A]/35 outline-none transition-all duration-300 focus:bg-white";
 
const inputState = (touched, error) =>
  touched && error
    ? "border-red-400 focus:ring-2 focus:ring-red-100"
    : "border-[#7A1F3B]/15 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15";
 
export default function Enroll() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
 
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2000);
    return () => clearTimeout(t);
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
    }
  };
 
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const newErrors = {};
    const newTouched = {};
 
    Object.keys(INITIAL_FORM).forEach((key) => {
      if (key === "message") return;
      newTouched[key] = true;
      newErrors[key] = validateField(key, form[key]);
    });
 
    setTouched((t) => ({ ...t, ...newTouched }));
    setErrors(newErrors);
 
    const firstErrorKey = Object.keys(newErrors).find((k) => newErrors[k]);
    if (firstErrorKey) {
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.focus();
      return;
    }
 
    setSubmitting(true);
 
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "95cb9edb-6519-4b7f-afae-824c62b5e539",
          subject: "🎓 New Course Enrollment Request",
          from_name: "New Flower Decoration Website",
          ...form,
        }),
      });
 
      const result = await response.json();
 
      if (result.success) {
        setSubmitted(true);
        setForm(INITIAL_FORM);
        setTouched({});
        setErrors({});
      } else {
        alert("Failed to submit form.");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };
 
  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };
 
  return (
    <div className="nfd-root">
      <GlobalStyles />
      <Loader loading={loading} />
      <Navbar />
 
      {/* Page Hero / Slogan */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-8 bg-[#4A1027] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_15%_20%,#C9A227,transparent_45%),radial-gradient(circle_at_85%_80%,#C9A227,transparent_45%)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#C9A227] mb-4">
            Learn With Us
          </p>
          <h1 className="nfd-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
            Turn Your Passion for Decoration Into a{" "}
            <span className="italic text-[#C9A227]">Career</span>
          </h1>
          <p className="text-[#F6E1E8]/70 text-sm md:text-base max-w-xl mx-auto">
            Enroll in our online or offline decoration course and learn directly from industry
            professionals. Fill the form below and our team will reach out with batch details.
          </p>
          <FloralDivider />
        </div>
      </section>
 
      {/* Form Section */}
      <section className="relative  px-5 md:px-8 py-10 sm:py-18">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left info panel */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 bg-[#7A1F3B] text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-[#7A1F3B]/20 h-full flex flex-col justify-between">
              <div>
                <GiFlowerPot className="text-[#C9A227] text-3xl mb-5" />
                <h2 className="nfd-display text-2xl md:text-3xl mb-4">
                  Why Learn With Us?
                </h2>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: FaChalkboardTeacher, text: "Live & hands-on training from expert decorators" },
                    { icon: FaCertificate, text: "Certificate on successful course completion" },
                    { icon: FaUsers, text: "300+ students trained, many now running their own setups" },
                    { icon: FaStar, text: "Flexible online batches or in-studio offline sessions" },
                  ].map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-sm text-[#F6E1E8]/85">
                      <span className="w-8 h-8 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-[#C9A227]">
                        <f.icon className="text-xs" />
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
              </div>
 
              <div className="border-t border-white/15 pt-6">
                <p className="text-xs uppercase tracking-widest text-[#C9A227] mb-2">Have questions?</p>
                <a href="tel:+911234567890" className="flex items-center gap-2 text-lg nfd-display">
                  <FaPhoneAlt className="text-[#C9A227] text-base" /> +91 12345 67890
                </a>
                <p className="text-xs text-[#F6E1E8]/60 mt-2">Mon – Sun, 9 AM – 9 PM</p>
              </div>
            </div>
          </div>
 
          {/* Right form panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-[#7A1F3B]/10 p-6 sm:p-8 md:p-10 relative overflow-hidden">
              {/* Success state */}
              <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-white px-8 transition-all duration-500 ${
                  submitted ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className="w-20 h-20 rounded-full bg-[#F6E1E8] flex items-center justify-center text-[#7A1F3B] text-3xl mb-6"
                  style={{ animation: submitted ? "nfd-fadein 0.6s ease-out" : "none" }}
                >
                  <FaCheckCircle />
                </div>
                <h3 className="nfd-display text-2xl md:text-3xl text-[#2B0E1A] mb-3">
                  Enrollment Request Sent!
                </h3>
                <p className="text-sm text-[#2B0E1A]/60 max-w-sm mb-8">
                  Thank you for your interest! Our academy team will contact you shortly with batch
                  timings and course details.
                </p>
                <button
                  onClick={resetForm}
                  className="px-7 py-3 rounded-full bg-[#7A1F3B] text-white text-sm font-medium hover:bg-[#5c1730] transition-colors duration-300"
                >
                  Enroll for Another Course
                </button>
              </div>
 
              {/* Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className={`grid sm:grid-cols-2 gap-5 md:gap-6 transition-all duration-500 ${
                  submitted ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
                }`}
              >
                <div className="sm:col-span-2">
                  <h2 className="nfd-display text-xl md:text-2xl text-[#2B0E1A] mb-1">
                    Course Enrollment
                  </h2>
                  <p className="text-xs text-[#2B0E1A]/50 mb-2">
                    Fields marked <span className="text-[#C9A227]">*</span> are required.
                  </p>
                </div>
 
                <Field label="Full Name" icon={FaUser} error={errors.fullName} touched={touched.fullName} required>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Riya Sharma"
                    className={`${inputBase} ${inputState(touched.fullName, errors.fullName)}`}
                  />
                </Field>
 
                <Field label="Phone Number" icon={FaPhoneAlt} error={errors.phone} touched={touched.phone} required>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className={`${inputBase} ${inputState(touched.phone, errors.phone)}`}
                  />
                </Field>
 
                <Field label="Email Address" icon={FaEnvelope} error={errors.email} touched={touched.email} required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. riya@email.com"
                    className={`${inputBase} ${inputState(touched.email, errors.email)}`}
                  />
                </Field>
 
                <Field label="City" icon={FaMapMarkerAlt} error={errors.city} touched={touched.city} required>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Indore"
                    className={`${inputBase} ${inputState(touched.city, errors.city)}`}
                  />
                </Field>
 
                <div className="sm:col-span-2">
                  <Field label="Course Type" icon={FaGraduationCap} error={errors.courseType} touched={touched.courseType} required>
                    <select
                      name="courseType"
                      value={form.courseType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${inputState(touched.courseType, errors.courseType)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%237A1F3B%22><path d=%22M7 10l5 5 5-5z%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:18px] pr-10`}
                    >
                      <option value="">Select course type</option>
                      {COURSE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
 
                <div className="sm:col-span-2">
                  <Field label="Message (Optional)" icon={FaCommentAlt}>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your goals, prior experience, or preferred batch timing..."
                      className={`${inputBase} border-[#7A1F3B]/15 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15 resize-none`}
                    />
                  </Field>
                </div>
 
                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full bg-[#C9A227] text-[#2B0E1A] font-semibold hover:bg-[#e8c860] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg shadow-[#C9A227]/20"
                  >
                    {submitting ? (
                      <>
                        <span
                          className="w-4 h-4 rounded-full border-2 border-[#2B0E1A]/30 border-t-[#2B0E1A] nfd-spin-slow"
                          style={{ animationDuration: "0.7s" }}
                        />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Submit Enrollment <FaPaperPlane className="text-sm" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-[#2B0E1A]/40 mt-3">
                    By submitting, you agree to be contacted by New Flower Decoration regarding this
                    course.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
 
      <Footer />
    </div>
  );
}