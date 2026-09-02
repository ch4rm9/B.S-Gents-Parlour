import { useState, useEffect, useRef } from "react";

// ── icons (inline SVG components) ──────────────────────────────────────────
const ScissorsIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z" />
  </svg>
);

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const MapPinIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const FacebookIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const ClockIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Data ────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "✂️",
    title: "হেয়ারকাট",
    subtitle: "Haircut",
    desc: "ট্রেন্ডি ও ক্লাসিক সব ধরনের স্টাইলিশ হেয়ারকাট। আপনার পছন্দ অনুযায়ী কাটা হবে।",
    price: "৳ ৮০",
    features: ["ফেড কাট", "আন্ডারকাট", "ক্লাসিক কাট", "টেক্সচার কাট"],
  },
  {
    icon: "🧔",
    title: "দাড়ি সেটিং",
    subtitle: "Beard Styling",
    desc: "পারফেক্ট শেপে দাড়ি ট্রিম ও স্টাইল করা হয়। ফেস শেপ অনুযায়ী বেস্ট লুক দেওয়া হয়।",
    price: "৳ ৬০",
    features: ["বিয়ার্ড ট্রিম", "শেপিং", "লাইন-আপ", "দাড়ি ডিজাইন"],
  },
  {
    icon: "🪒",
    title: "ক্লিন শেভ",
    subtitle: "Clean Shave",
    desc: "হট টাওয়েল ও প্রিমিয়াম ক্রিম দিয়ে স্মুথ ক্লিন শেভ। রিল্যাক্সিং অভিজ্ঞতা।",
    price: "৳ ৫০",
    features: ["হট টাওয়েল", "প্রিমিয়াম ক্রিম", "স্ট্রেইট রেজর", "আফটারশেভ"],
  },
  {
    icon: "💆",
    title: "ফেস কেয়ার",
    subtitle: "Face Care",
    desc: "ফেস ম্যাসাজ, ক্লিনজিং ও ময়েশ্চারাইজিং। ত্বক উজ্জ্বল ও তরতাজা করা হয়।",
    price: "৳ ১২০",
    features: ["ডিপ ক্লিনজিং", "ফেস ম্যাসাজ", "স্ক্রাবিং", "ময়েশ্চারাইজিং"],
  },
  {
    icon: "💈",
    title: "হেয়ার ট্রিটমেন্ট",
    subtitle: "Hair Treatment",
    desc: "চুলের যত্নে বিশেষ ট্রিটমেন্ট। চুল মজবুত ও চকচকে করতে প্রফেশনাল সেবা।",
    price: "৳ ২০০",
    features: ["হেয়ার স্পা", "কেরাটিন", "হেড ম্যাসাজ", "ডিপ কন্ডিশনিং"],
  },
  {
    icon: "✨",
    title: "কম্বো প্যাকেজ",
    subtitle: "Combo Package",
    desc: "হেয়ারকাট + দাড়ি সেটিং + ফেস ম্যাসাজ। সম্পূর্ণ গ্রুমিং প্যাকেজ।",
    price: "৳ ২৫০",
    features: ["হেয়ারকাট", "দাড়ি সেটিং", "ফেস ম্যাসাজ", "বিশেষ ছাড়"],
  },
];

const reviews = [
  {
    name: "রাফি আহমেদ",
    rating: 5,
    text: "অসাধারণ সার্ভিস! হেয়ারকাট একদম পারফেক্ট হয়েছে। বি.এস পার্লারে আসলে মন ভালো হয়ে যায়।",
    time: "১ সপ্তাহ আগে",
  },
  {
    name: "তানভীর হোসেন",
    rating: 5,
    text: "দাড়ি সেটিং আর ফেস কেয়ার দুটোই দারুণ হয়েছে। দাম খুব রিজেনেবল। পরের বার আবার আসব।",
    time: "২ সপ্তাহ আগে",
  },
  {
    name: "সাকিব খান",
    rating: 5,
    text: "হট শেভের অভিজ্ঞতা ছিল দারুণ! স্টাফরা খুব ফ্রেন্ডলি ও প্রফেশনাল। সেরা পার্লার।",
    time: "৩ সপ্তাহ আগে",
  },
  {
    name: "মাহমুদ রেজা",
    rating: 5,
    text: "হেয়ার ট্রিটমেন্ট করে চুল একদম নতুন হয়ে গেছে। বি.এস পার্লার সত্যিই সেরা।",
    time: "১ মাস আগে",
  },
];

const galleryImages = [
  {
    url: "https://images.pexels.com/photos/9992819/pexels-photo-9992819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400",
    alt: "Haircut Service",
    label: "হেয়ারকাট",
  },
  {
    url: "https://images.pexels.com/photos/9992818/pexels-photo-9992818.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400",
    alt: "Barber Service",
    label: "বার্বার সার্ভিস",
  },
  {
    url: "https://images.pexels.com/photos/4625630/pexels-photo-4625630.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400",
    alt: "Styling",
    label: "স্টাইলিং",
  },
  {
    url: "https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
    alt: "Barber Shop Interior",
    label: "পার্লার ইন্টেরিয়র",
  },
  {
    url: "https://images.pexels.com/photos/17712921/pexels-photo-17712921.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400",
    alt: "Professional Cut",
    label: "প্রফেশনাল কাট",
  },
  {
    url: "https://images.pexels.com/photos/13058812/pexels-photo-13058812.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
    alt: "Barber Shop",
    label: "পার্লার",
  },
];

// ── Animated Counter ─────────────────────────────────────────────────────────
function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const customers = useCountUp(5000, 2500, statsVisible);
  const years = useCountUp(8, 2000, statsVisible);
  const services5 = useCountUp(15, 2000, statsVisible);
  const satisfaction = useCountUp(99, 2000, statsVisible);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "services", "gallery", "reviews", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "হোম" },
    { id: "services", label: "সার্ভিস" },
    { id: "gallery", label: "গ্যালারি" },
    { id: "reviews", label: "রিভিউ" },
    { id: "contact", label: "যোগাযোগ" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Hind_Siliguri',sans-serif] overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-[0_4px_30px_rgba(212,175,55,0.15)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black">
                <span className="text-[#D4AF37] font-bold text-lg font-['Cinzel',serif]">BS</span>
              </div>
              <div>
                <p className="text-[#D4AF37] font-bold text-base leading-tight font-['Cinzel',serif]">বি.এস</p>
                <p className="text-gray-300 text-xs leading-tight">জেন্টস পার্লার</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === link.id ? "text-[#D4AF37]" : "text-gray-300 hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                      activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:01916867320"
                className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-bold px-5 py-2.5 rounded-full text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105"
              >
                <PhoneIcon className="w-4 h-4" />
                01916867320
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <span className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/98 border-t border-[#D4AF37]/20 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-gray-300 hover:bg-white/5 hover:text-[#D4AF37]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:01916867320"
              className="flex items-center justify-center gap-2 mt-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-bold px-5 py-3 rounded-full text-sm"
            >
              <PhoneIcon className="w-4 h-4" />
              01916867320
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Barber Shop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Gold lines decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
                <ScissorsIcon className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm font-medium">Style • Grooming • Confidence</span>
              </div>

              {/* Main title */}
              <h1 className="font-['Cinzel',serif] mb-4">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F5E67A] via-[#D4AF37] to-[#B8960C] leading-tight drop-shadow-2xl">
                  বি.এস
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                  জেন্টস পার্লার
                </span>
              </h1>

              {/* Divider */}
              <div className="flex items-center gap-3 justify-center md:justify-start my-5">
                <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <ScissorsIcon className="w-5 h-5 text-[#D4AF37]" />
                <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>

              {/* Tagline */}
              <p className="text-xl sm:text-2xl text-gray-200 font-medium mb-3">
                স্টাইল আপনার, আত্মবিশ্বাস আমাদের
              </p>
              <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg">
                ঢাকার সেরা জেন্টস পার্লার। প্রফেশনাল সার্ভিস, সাশ্রয়ী মূল্য এবং আরামদায়ক পরিবেশে আপনাকে স্বাগতম।
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="tel:01916867320"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-black font-bold px-8 py-4 rounded-full text-base hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 hover:from-[#F5E67A] hover:to-[#D4AF37]"
                >
                  <PhoneIcon className="w-5 h-5" />
                  এখনই কল করুন
                </a>
                <a
                  href={`https://wa.me/8801916867320`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold px-8 py-4 rounded-full text-base hover:bg-[#D4AF37]/10 transition-all duration-300 hover:scale-105"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>

              {/* Mini stats */}
              <div className="flex gap-6 mt-10 justify-center md:justify-start">
                {[["৫০০০+", "সন্তুষ্ট গ্রাহক"], ["৮+", "বছরের অভিজ্ঞতা"], ["৯৯%", "সন্তুষ্টি"]].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <p className="text-[#D4AF37] font-bold text-xl font-['Cinzel',serif]">{num}</p>
                    <p className="text-gray-400 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image collage */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden h-52 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors duration-300">
                  <img src="https://images.pexels.com/photos/9992819/pexels-photo-9992819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300" alt="haircut" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden h-36 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors duration-300">
                  <img src="https://images.pexels.com/photos/4625630/pexels-photo-4625630.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300" alt="styling" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-3 mt-8">
                <div className="rounded-2xl overflow-hidden h-36 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors duration-300">
                  <img src="https://images.pexels.com/photos/9992818/pexels-photo-9992818.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300" alt="barber" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden h-52 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors duration-300">
                  <img src="https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300" alt="shop" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-400 text-xs">নিচে স্ক্রল করুন</span>
          <div className="w-6 h-10 border-2 border-[#D4AF37]/50 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <div ref={statsRef} className="bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#B8960C] py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-black">
          {[
            { value: customers, suffix: "+", label: "সন্তুষ্ট গ্রাহক" },
            { value: years, suffix: "+", label: "বছরের অভিজ্ঞতা" },
            { value: services5, suffix: "+", label: "সার্ভিস সমূহ" },
            { value: satisfaction, suffix: "%", label: "গ্রাহক সন্তুষ্টি" },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl sm:text-4xl font-black font-['Cinzel',serif]">
                {value.toLocaleString("bn-BD")}{suffix}
              </p>
              <p className="text-sm font-semibold mt-1 text-black/80">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────────────── */}
      <section id="services" className="py-20 md:py-28 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-4">
              <ScissorsIcon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm">আমাদের সেবাসমূহ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-b from-[#F5E67A] to-[#D4AF37] mb-4">
              প্রিমিয়াম সার্ভিস
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              আমরা আপনার গ্রুমিং এর জন্য সর্বোচ্চ মানের সেবা প্রদান করি। প্রতিটি সার্ভিসে আমরা আপনার সন্তুষ্টি নিশ্চিত করি।
            </p>
            <div className="flex items-center gap-3 justify-center mt-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <ScissorsIcon className="w-5 h-5 text-[#D4AF37]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(212,175,55,0.15)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Card glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-[#D4AF37] font-black text-xl font-['Cinzel',serif]">{service.price}</span>
                      <p className="text-gray-500 text-xs">থেকে শুরু</p>
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-1">{service.title}</h3>
                  <p className="text-[#D4AF37]/60 text-xs mb-3 font-medium">{service.subtitle}</p>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">{service.desc}</p>

                  <div className="space-y-2">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckIcon className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-gray-400 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="tel:01916867320"
                    className="mt-5 w-full flex items-center justify-center gap-2 border border-[#D4AF37]/30 text-[#D4AF37] py-2.5 rounded-xl text-sm font-medium hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group-hover:border-[#D4AF37]/60"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    বুকিং করুন
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-5">
                <span className="text-[#D4AF37] text-sm">কেন আমাদের বেছে নেবেন?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-['Cinzel',serif] text-white mb-6">
                আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E67A] to-[#D4AF37]">বিশেষত্ব</span>
              </h2>
              <div className="space-y-5">
                {[
                  { icon: "🏆", title: "প্রফেশনাল টিম", desc: "আমাদের অভিজ্ঞ বার্বাররা সেরা ট্রেনিং প্রাপ্ত।" },
                  { icon: "✨", title: "প্রিমিয়াম পণ্য", desc: "বিশ্বমানের গ্রুমিং পণ্য ব্যবহার করা হয়।" },
                  { icon: "🕐", title: "সময়মতো সার্ভিস", desc: "আপনার সময় মূল্যবান, আমরা দেরি করি না।" },
                  { icon: "💰", title: "সাশ্রয়ী মূল্য", desc: "সেরা মানের সার্ভিস সাশ্রয়ী মূল্যে।" },
                  { icon: "🧼", title: "পরিচ্ছন্নতা", desc: "প্রতিটি সার্ভিসে সর্বোচ্চ হাইজিন মেনে চলা হয়।" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{title}</h4>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20">
                <img
                  src="https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=600"
                  alt="Barber Shop Interior"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-4 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] border-2 border-black flex items-center justify-center text-xs font-bold text-black">
                          {["R", "T", "S", "M"][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex gap-0.5 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-white text-xs">৫০০০+ সন্তুষ্ট গ্রাহক</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────────────── */}
      <section id="gallery" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#D4AF37] text-sm">আমাদের কাজ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-b from-[#F5E67A] to-[#D4AF37] mb-4">
              গ্যালারি
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">আমাদের কাজের নমুনা দেখুন এবং আপনার পছন্দের স্টাইল বেছে নিন।</p>
            <div className="flex items-center gap-3 justify-center mt-5">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <ScissorsIcon className="w-5 h-5 text-[#D4AF37]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`group relative rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 ${
                  idx === 3 || idx === 5 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#D4AF37] font-semibold text-sm">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 md:py-28 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-4">
              <StarIcon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm">গ্রাহকদের মতামত</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-b from-[#F5E67A] to-[#D4AF37] mb-4">
              রিভিউ ও রেটিং
            </h2>
            <p className="text-gray-400">আমাদের গ্রাহকরা কী বলছেন তা জানুন।</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-white/5 rounded-2xl p-5 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)] hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quote mark */}
                <div className="text-[#D4AF37]/20 text-5xl font-serif leading-none mb-2">"</div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google rating badge */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-4 bg-[#111] border border-[#D4AF37]/20 rounded-2xl px-6 py-4">
              <div className="text-center">
                <p className="text-[#D4AF37] text-3xl font-black font-['Cinzel',serif]">5.0</p>
                <div className="flex gap-0.5 justify-center my-1">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5 text-[#D4AF37]" />)}
                </div>
                <p className="text-gray-500 text-xs">Google Rating</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-white font-semibold">৫০০+ রিভিউ</p>
                <p className="text-gray-400 text-sm">Google এ রেটিং দিন</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
        {/* BG decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-4">
              <MapPinIcon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm">আমাদের সাথে যোগাযোগ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-b from-[#F5E67A] to-[#D4AF37] mb-4">
              যোগাযোগ করুন
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">আজই অ্যাপয়েন্টমেন্ট নিন এবং প্রিমিয়াম গ্রুমিং সার্ভিস উপভোগ করুন।</p>
            <div className="flex items-center gap-3 justify-center mt-5">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <ScissorsIcon className="w-5 h-5 text-[#D4AF37]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Phone */}
            <a
              href="tel:01916867320"
              className="group bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 text-center block"
            >
              <div className="w-14 h-14 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                <PhoneIcon className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">ফোন</h3>
              <p className="text-[#D4AF37] font-bold text-xl font-['Cinzel',serif]">01916867320</p>
              <p className="text-gray-500 text-sm mt-1">সকাল ৯টা - রাত ১০টা</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801916867320"
              target="_blank"
              rel="noreferrer"
              className="group bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-[#25D366]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,211,102,0.1)] hover:-translate-y-1 text-center block"
            >
              <div className="w-14 h-14 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors duration-300">
                <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-[#25D366] font-bold text-xl">01916867320</p>
              <p className="text-gray-500 text-sm mt-1">মেসেজ করুন যেকোনো সময়</p>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/BSGentsParlour"
              target="_blank"
              rel="noreferrer"
              className="group bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-[#1877F2]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(24,119,242,0.1)] hover:-translate-y-1 text-center block md:col-span-2 lg:col-span-1"
            >
              <div className="w-14 h-14 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1877F2]/20 transition-colors duration-300">
                <FacebookIcon className="w-7 h-7 text-[#1877F2]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Facebook</h3>
              <p className="text-[#1877F2] font-bold text-lg">বি.এস জেন্টস পার্লার</p>
              <p className="text-gray-500 text-sm mt-1">আমাদের পেজ ফলো করুন</p>
            </a>
          </div>

          {/* Location & Hours */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Address */}
            <div className="bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-bold text-lg">আমাদের ঠিকানা</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                আপনার স্টাইল, আপনার পরিচয়<br />
                <span className="text-gray-400 text-sm">বি.এস জেন্টস পার্লার, ঢাকা</span>
              </p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-[#D4AF37] text-sm font-medium">📍 গুগল ম্যাপে খুঁজুন</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-bold text-lg">খোলার সময়</h3>
              </div>
              <div className="space-y-2">
                {[
                  ["শনি - বৃহঃ", "সকাল ৯:০০ - রাত ১০:০০"],
                  ["শুক্রবার", "দুপুর ২:০০ - রাত ১০:০০"],
                  ["সরকারি ছুটি", "সকাল ১০:০০ - রাত ৯:০০"],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-gray-400 text-sm">{day}</span>
                    <span className="text-[#D4AF37] text-sm font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#B8960C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black font-['Cinzel',serif] mb-4">
            আজই আপনার অ্যাপয়েন্টমেন্ট নিন!
          </h2>
          <p className="text-black/70 text-lg mb-8">
            স্টাইলিশ লুক পেতে এখনই কল করুন বা WhatsApp করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01916867320"
              className="flex items-center justify-center gap-2 bg-black text-[#D4AF37] font-bold px-8 py-4 rounded-full text-base hover:bg-black/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <PhoneIcon className="w-5 h-5" />
              01916867320
            </a>
            <a
              href="https://wa.me/8801916867320"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full text-base hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              WhatsApp করুন
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-black border-t border-[#D4AF37]/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black">
                  <span className="text-[#D4AF37] font-black text-lg font-['Cinzel',serif]">BS</span>
                </div>
                <div>
                  <p className="text-[#D4AF37] font-bold font-['Cinzel',serif]">বি.এস</p>
                  <p className="text-gray-400 text-xs">জেন্টস পার্লার</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                স্টাইল আপনার, আত্মবিশ্বাস আমাদের। সেরা গ্রুমিং অভিজ্ঞতা পেতে আমাদের সাথে থাকুন।
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wider">সার্ভিস</h4>
              <ul className="space-y-2">
                {["হেয়ারকাট", "দাড়ি সেটিং", "ক্লিন শেভ", "ফেস কেয়ার", "হেয়ার ট্রিটমেন্ট"].map((s) => (
                  <li key={s}>
                    <button onClick={() => scrollTo("services")} className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors duration-200">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wider">দ্রুত লিংক</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollTo(link.id)} className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors duration-200">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wider">যোগাযোগ</h4>
              <div className="space-y-3">
                <a href="tel:01916867320" className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] text-sm transition-colors duration-200">
                  <PhoneIcon className="w-4 h-4 text-[#D4AF37]" />
                  01916867320
                </a>
                <a href="https://wa.me/8801916867320" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-[#25D366] text-sm transition-colors duration-200">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  WhatsApp
                </a>
                <a href="https://facebook.com/BSGentsParlour" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-[#1877F2] text-sm transition-colors duration-200">
                  <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                  Facebook পেজ
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} বি.এস জেন্টস পার্লার। সকল অধিকার সংরক্ষিত।
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <ScissorsIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>Style • Grooming • Confidence</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ───────────────────────────────────────── */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/8801916867320"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </a>
        <a
          href="tel:01916867320"
          className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-110 transition-all duration-300"
          title="Call"
        >
          <PhoneIcon className="w-6 h-6 text-black" />
        </a>
      </div>

      {/* ── CUSTOM ANIMATIONS ───────────────────────────────────────── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float { animation: float 4s ease-in-out infinite; }
        * { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
