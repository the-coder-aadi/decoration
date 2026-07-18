import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaGlassCheers,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaHome,
  FaCommentAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaPaperPlane,
  FaStar,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import { GlobalStyles, FloralDivider, Navbar, Footer, Loader } from "./Home";
 
/* ============================================================
   BOOKING FORM — New Flower Decoration
   Same palette/type system as Home.jsx
   ============================================================ */
 
const EVENT_TYPES = [
  "Wedding",
  "Birthday",
  "Haldi",
  "Mehndi",
  "Reception",
  "Anniversary",
  "Corporate Event",
  "House Decoration",
  "Other",
];
 
const INITIAL_FORM = {
  fullName: "",
  phone: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  city: "",
  address: "",
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
    case "eventType": {
      if (!value) return "Please select an event type.";
      return "";
    }
    case "eventDate": {
      if (!value) return "Please select an event date.";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const picked = new Date(value);
      if (picked < today) return "Event date can't be in the past.";
      return "";
    }
    case "eventTime": {
      if (!value) return "Please select an event time.";
      return "";
    }
    case "city": {
      if (!value.trim()) return "Please enter your city.";
      if (value.trim().length < 2) return "Enter a valid city name.";
      return "";
    }
    case "address": {
      if (!value.trim()) return "Please enter the event address.";
      if (value.trim().length < 10) return "Please add a more complete address (min 10 characters).";
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
 
export default function BookingForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formTopRef = useRef(null);
    const [loading, setLoading] = useState(true);

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

        subject: "🎉 New Decoration Booking Request",

        from_name: "New Flower Decoration Website",

        ...form,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setSubmitted(true);

      // Form reset
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
         <Loader loading={loading} />
      <GlobalStyles />
      <Navbar />
 
      {/* Page Hero / Slogan */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-8 bg-[#4A1027] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_15%_20%,#C9A227,transparent_45%),radial-gradient(circle_at_85%_80%,#C9A227,transparent_45%)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#C9A227] mb-4">
            Book Your Decoration
          </p>
          <h1 className="nfd-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
            Let's Turn Your Celebration Into a{" "}
            <span className="italic text-[#C9A227]">Beautiful Memory</span>
          </h1>
          <p className="text-[#F6E1E8]/70 text-sm md:text-base max-w-xl mx-auto">
            Share a few details below and our design team will get back to you within 24 hours with a
            custom decoration plan.
          </p>
          <FloralDivider />
        </div>
      </section>
 
      {/* Form Section */}
      <section ref={formTopRef} className="relative px-5 md:px-8 py-10 sm:py-18">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left info panel */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 bg-[#7A1F3B] text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-[#7A1F3B]/20 h-full flex flex-col justify-between">
              <div>
                <GiFlowerPot className="text-[#C9A227] text-3xl mb-5" />
                <h2 className="nfd-display text-2xl md:text-3xl mb-4">
                  Why Book With Us?
                </h2>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: FaStar, text: "500+ events decorated with 5-star client ratings" },
                    { icon: FaShieldAlt, text: "Transparent pricing, no hidden costs" },
                    { icon: FaHeadset, text: "Dedicated support from booking to event day" },
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
                <p className="text-xs uppercase tracking-widest text-[#C9A227] mb-2">Prefer to talk?</p>
                <a href="tel:+911234567890" className="flex items-center gap-2 text-lg nfd-display">
                  <FaPhoneAlt className="text-[#C9A227] text-base" /> +91 62626 46491
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
                <div className="w-20 h-20 rounded-full bg-[#F6E1E8] flex items-center justify-center text-[#7A1F3B] text-3xl mb-6"
                     style={{ animation: submitted ? "nfd-fadein 0.6s ease-out" : "none" }}>
                  <FaCheckCircle />
                </div>
                <h3 className="nfd-display text-2xl md:text-3xl text-[#2B0E1A] mb-3">
                  Booking Request Sent!
                </h3>
                <p className="text-sm text-[#2B0E1A]/60 max-w-sm mb-8">
                  Thank you, {form.fullName.split(" ")[0] || "there"}! Our team will contact you on{" "}
                  <span className="text-[#7A1F3B] font-medium">{form.phone}</span> within 24 hours to
                  discuss your {form.eventType || "event"} decoration.
                </p>
                <button
                  onClick={resetForm}
                  className="px-7 py-3 rounded-full bg-[#7A1F3B] text-white text-sm font-medium hover:bg-[#5c1730] transition-colors duration-300"
                >
                  Book Another Event
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
                    Event Details
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
 
                <Field label="Event Type" icon={FaGlassCheers} error={errors.eventType} touched={touched.eventType} required>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputBase} ${inputState(touched.eventType, errors.eventType)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%237A1F3B%22><path d=%22M7 10l5 5 5-5z%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:18px] pr-10`}
                  >
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
 
                <Field label="Event Date" icon={FaCalendarAlt} error={errors.eventDate} touched={touched.eventDate} required>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={new Date().toISOString().split("T")[0]}
                    className={`${inputBase} ${inputState(touched.eventDate, errors.eventDate)}`}
                  />
                </Field>
 
                <Field label="Event Time" icon={FaClock} error={errors.eventTime} touched={touched.eventTime} required>
                  <input
                    type="time"
                    name="eventTime"
                    value={form.eventTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputBase} ${inputState(touched.eventTime, errors.eventTime)}`}
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
                  <Field label="Event Address" icon={FaHome} error={errors.address} touched={touched.address} required>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      placeholder="Venue name, street, area, landmark..."
                      className={`${inputBase} ${inputState(touched.address, errors.address)} resize-none`}
                    />
                  </Field>
                </div>
 
                <div className="sm:col-span-2">
                  <Field label="Message / Special Requirements (Optional)" icon={FaCommentAlt}>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your theme, colours, guest count, or anything special..."
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
                        <span className="w-4 h-4 rounded-full border-2 border-[#2B0E1A]/30 border-t-[#2B0E1A] nfd-spin-slow" style={{ animationDuration: "0.7s" }} />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Submit Request <FaPaperPlane className="text-sm" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-[#2B0E1A]/40 mt-3">
                    By submitting, you agree to be contacted by New Flower Decoration regarding your event.
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