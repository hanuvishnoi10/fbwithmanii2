import React, { useState, useEffect, useRef } from "react";
import { 
  Play, Sparkles, Smartphone, ShieldCheck, Flame, ArrowRight, Check, CheckCircle, 
  HelpCircle, Gift, Users, Award, ShieldAlert, Video, RefreshCw, Star, Info, Volume2, AlertCircle
} from "lucide-react";
import { PageContent } from "./types";
import { initialPageContent } from "./initialContent";
import { ProofSection } from "./components/ProofSection";
import { FAQSection } from "./components/FAQSection";
import { PaymentModal } from "./components/PaymentModal";
import { LiveNotificationToast } from "./components/LiveNotificationToast";
import { LegalPageView } from "./components/LegalPageView";

export default function App() {
  const [content, setContent] = useState<PageContent>(() => {
    const saved = localStorage.getItem("maniish_landing_content");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.webinarPrice === 197 || parsed.webinarPrice === 19) {
          parsed.webinarPrice = 29;
        }
        if (parsed.dateTime === "Live Masterclass • Sunday at 4:00 PM IST" || parsed.dateTime === "Live Masterclass • 8 June 2026 at 7:00 PM IST" || parsed.dateTime === "Live Masterclass • 10 June 2026 at 7:00 PM IST" || parsed.dateTime === "Live Masterclass • Sunday, 14 June 2026 at 7:00 PM IST" || parsed.dateTime === "Live Masterclass • 14 june 2026 at 7:00 PM IST" || !parsed.dateTime) {
          parsed.dateTime = "Live Masterclass • 25 June 2026 at 7:00 PM IST";
        }
        // Force the trainer experience and bio update in local storage matching user request
        parsed.trainerName = "Manish Prajapati";
        parsed.trainerAvatar = "https://res.cloudinary.com/dwymt9xi4/image/upload/v1780472233/WhatsApp_Image_2026-06-03_at_11.21.53_AM_o8unsk.jpg";
        parsed.trainerExperience = "5+ Years Elite Monetization Creator";
        parsed.trainerBio = "I've been running Facebook-based businesses since 2021 — starting with ₹5,000 and scaling to over ₹2-5 lakh per month using the exact systems I teach here. I've trained 20,000+ students across India on digital income, run ads for 100+ businesses, and now I'm putting everything into one live session so you can skip the 3-year learning curve.";

        // Force the video placeholder to false and videoUrl to embed version of user's request
        parsed.usePlaceholderVideo = false;
        parsed.videoUrl = "https://www.youtube.com/embed/tXUtgAt6hiw";

        if (typeof parsed.ctaText === "string" && parsed.ctaText.includes("197")) {
          parsed.ctaText = parsed.ctaText.replace("197", "29");
        }
        if (typeof parsed.ctaText === "string" && parsed.ctaText.includes("19")) {
          parsed.ctaText = parsed.ctaText.replace("19", "29");
        }
        if (Array.isArray(parsed.perks)) {
          parsed.perks = parsed.perks.map((p: string) => {
            if (p === "Works Perfectly with Jio / Mobile Data") {
              return "Works Perfectly on Mobile Data / Wifi";
            }
            if (p === "No English Required (Class in Hinglish)") {
              return "No English Required (Class in Hindi)";
            }
            return p;
          });
        }
        if (Array.isArray(parsed.faqs)) {
          parsed.faqs = parsed.faqs.map((f: any) => {
            if (f.id === "faq-4" || f.question === "What if I miss the live workshop?") {
              return {
                id: "faq-4",
                question: "Do I need to show my face?",
                answer: "Absolutely not. We specialize in 'Faceless Pages' or Facebook Automation, where you can build massive audiences using voiceovers, stock footage, and animations."
              };
            }
            return f;
          });
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved landing content", e);
      }
    }
    return initialPageContent;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeLegalPage, setActiveLegalPage] = useState<"terms" | "privacy" | "refunds" | "contact" | null>(null);
  
  // Custom interactive video simulation states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoViews, setVideoViews] = useState(128);
  const [videoStatusText, setVideoStatusText] = useState("Click Play to start case study...");

  // Sticky bottom bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Countdown timer states (starts at 10m 00s, repeats on zero for testing)
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 59 });

  useEffect(() => {
    // Save state changes to localStorage
    localStorage.setItem("maniish_landing_content", JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    // Scroll listener for sticky bar
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Live countdown timer execution
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset countdown for continuous marketing simulation
          return { minutes: 9, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulating video playback loop when placeholder video is checked
  useEffect(() => {
    let playInterval: NodeJS.Timeout;
    if (isVideoPlaying && content.usePlaceholderVideo) {
      setVideoStatusText("Bypassing Meta Copyright algorithm filters...");
      playInterval = setInterval(() => {
        setVideoProgress((prev) => {
          const next = prev + 1.2;
          if (next >= 100) {
            setIsVideoPlaying(false);
            try {
              window.open("https://rzp.io/rzp/awmEpLI", "_blank");
            } catch (e) {
              console.error(e);
            }
            setIsPaymentOpen(true);
            setVideoStatusText("Case Study Tutorial successfully finished. Enroll to download kits!");
            return 100;
          }
          
          // Increment mock views count rapidly
          setVideoViews((v) => v + Math.floor(Math.random() * 250) + 120);

          // Update status text based on milestones
          if (next > 25 && next < 50) {
            setVideoStatusText("Applying CapCut anti-bot pixel overlay...");
          } else if (next >= 50 && next < 75) {
            setVideoStatusText("Uploading faceless movie reels into Facebook recommendations...");
          } else if (next >= 75 && next < 95) {
            setVideoStatusText("Accruing Instream views... Revenue generated!");
          } else if (next >= 95) {
            setVideoStatusText("Transferring payouts securely into SBI/HDFC bank accounts!");
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(playInterval);
  }, [isVideoPlaying, content.usePlaceholderVideo]);

  const handleTriggerPlayPlaceholder = () => {
    setIsVideoPlaying(true);
    setVideoProgress(0);
    setVideoViews(128);
  };

  const calculateTotalVal = () => {
    return content.bonuses.reduce((sum, b) => sum + b.value, 0);
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen relative overflow-x-hidden selection:bg-brand-orange selection:text-white">
      
      {/* 1. SCROLLING EMERGENCY NOTIFICATION BAR */}
      <div className="bg-gradient-to-r from-brand-orange via-emerald-600 to-brand-indigo text-white py-2 px-4 text-center text-xs font-display font-extrabold flex justify-center items-center gap-2 overflow-hidden shadow-md">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        <p className="tracking-wide">
          ⚠️ HURRY! LIMIT OF 12 SEATS LEFT: Webinar price increases to <span className="underline font-black">₹999</span> once countdown hits 0!
        </p>
        <span className="bg-slate-950/45 text-[10px] text-white px-2 py-0.5 rounded font-mono font-bold">
          {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>

      {/* HEADER SECTION */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-fb flex items-center justify-center font-display font-black text-xl italic text-white tracking-tighter shadow-sm">
              f
            </div>
            <div>
              <span className="font-display font-black text-lg md:text-xl text-slate-900 tracking-tight lowercase">
                {content.businessName}
              </span>
              <span className="text-[9px] font-mono text-brand-indigo block font-black tracking-wider uppercase">
                Mentorship portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-brand-indigo bg-brand-indigo/10 border border-brand-indigo/15 px-3 py-1.5 rounded-full font-bold">
              <Users className="w-3.5 h-3.5 text-brand-fb" /> 20,000+ Trained
            </span>
            <a
              href="https://rzp.io/rzp/awmEpLI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs md:text-sm font-display font-black px-4 py-2 rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-1"
            >
              Reserve Seat
            </a>
          </div>
        </div>
      </header>

      {/* HERO / CALL OUT */}
      {activeLegalPage ? (
        <LegalPageView page={activeLegalPage} onClose={() => setActiveLegalPage(null)} />
      ) : (
        <main className="relative pb-24">
          <section className="pt-12 pb-16 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 relative border-b border-slate-200">
          
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center space-y-6">
            
            {/* Top Orange Sub-tag */}
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange border border-brand-orange/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider animate-bounce">
              <Flame className="w-4 h-4 text-brand-orange" /> Facebook Faceless Earning Secret Formula 2026
            </div>

            {/* Main Punchy Headings (Rapidxai styled display typography) */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight text-slate-900 leading-[1.1] max-w-4xl mx-auto">
              {content.headline}
            </h1>

            <p className="text-slate-600 text-sm md:text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              {content.subHeadline}
            </p>

            {/* Three key benefits bullet rows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-3xl mx-auto">
              {content.perks.map((p, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-left transition-transform hover:scale-[1.01] shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 border border-emerald-200">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 leading-tight">{p}</span>
                </div>
              ))}
            </div>

            {/* DYNAMIC CHANGEABLE VIDEO EMBED CARD FRAME */}
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="bg-[#0b0f19] border-8 border-slate-900 rounded-3xl overflow-hidden shadow-2xl relative aspect-video group">
                
                {/* Fallback Custom Simulated Video Playback */}
                {content.usePlaceholderVideo ? (
                  <div className="absolute inset-0 bg-[#070b13] flex flex-col justify-between p-6">
                    
                    {/* Fake Video Player Toolbar Header */}
                    <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="font-semibold text-slate-400 uppercase tracking-widest text-[10px]">
                          Facebook viral velocity tracer
                        </span>
                      </div>
                      <span className="font-mono bg-slate-900 p-1 rounded font-bold text-slate-400">
                        HD 1080P
                      </span>
                    </div>

                    {/* Middle Simulation Area */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                      {isVideoPlaying ? (
                        <div className="space-y-4 w-full max-w-md">
                          <div className="flex justify-between text-xs text-slate-400 font-mono">
                            <span>Viral Video Views: <strong className="text-emerald-400">{videoViews.toLocaleString()}</strong></span>
                            <span>Est. Earnings: <strong className="text-emerald-400">${(videoViews * 0.0005).toFixed(2)}</strong></span>
                          </div>
                          
                          {/* Sound wave bar simulator */}
                          <div className="flex justify-center items-center gap-1.5 h-10">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                              <div
                                key={i}
                                className="bg-indigo-500 w-1.5 rounded-full animate-pulse"
                                style={{
                                  height: `${Math.floor(Math.random() * 35) + 12}px`,
                                  animationDelay: `${i * 120}ms`,
                                  animationDuration: `${Math.floor(Math.random() * 800) + 400}ms`
                                }}
                              ></div>
                            ))}
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs font-mono font-bold text-slate-200">
                              {videoStatusText}
                            </p>
                            <span className="text-[10px] text-slate-500 block">
                              Workshop download code: FB_COPIER_KIT_v26.zip
                            </span>
                          </div>

                          {/* Big simulator bar */}
                          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                            <div
                              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${videoProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <button
                            onClick={handleTriggerPlayPlaceholder}
                            className="w-16 h-16 rounded-full bg-brand-orange text-white flex items-center justify-center mx-auto hover:bg-brand-orange-dark hover:scale-110 active:scale-95 transition-all shadow-xl border-4 border-orange-500/30"
                          >
                            <Play className="w-7 h-7 fill-white translate-x-0.5" />
                          </button>
                          <div>
                            <p className="font-display font-black text-sm md:text-base text-white tracking-wide">
                              [VIDEO CASE STUDY] Facebook Income Blueprint
                            </p>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                              Watch the 30-second live proof simulation of how custom movie clips bypass Meta restriction bots!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fake Video Player Controls Footer */}
                    <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                      <span>0:45 / 3:00</span>
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 text-slate-400" /> Hinglish Audio Active
                      </span>
                    </div>

                  </div>
                ) : (
                  <iframe
                    src={content.videoUrl}
                    title="Facebook Monetization Mentorship Video Case Study"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0"
                  ></iframe>
                )}

              </div>

              {/* Date & Time Badges */}
              <div className="mt-5 grid grid-cols-2 gap-3 max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-md flex items-center gap-2.5 text-left">
                  <span className="text-xl md:text-2xl flex-shrink-0">📅</span>
                  <div className="text-left min-w-0">
                    <span className="text-[9.5px] md:text-[10.5px] text-slate-500 font-black uppercase tracking-wider block"> Date:</span>
                    <span className="text-xs md:text-sm font-black text-slate-900 block truncate">
                      {content.dateTime ? (content.dateTime.includes("•") ? content.dateTime.split("•")[1]?.split("at")[0]?.trim() || "Thursday" : content.dateTime) : "Thursday"}
                    </span>
                    <span className="text-[10px] md:text-xs text-slate-500 font-bold block bg-slate-100 rounded-md px-1.5 py-0.5 mt-1 w-max">
                      Thursday
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-md flex items-center gap-2.5 text-left">
                  <span className="text-xl md:text-2xl flex-shrink-0">⏰</span>
                  <div className="text-left min-w-0">
                    <span className="text-[9.5px] md:text-[10.5px] text-slate-500 font-black uppercase tracking-wider block"> Time:</span>
                    <span className="text-xs md:text-sm font-black text-slate-900 block truncate">
                      {content.dateTime ? (content.dateTime.includes("•") ? content.dateTime.split("•")[1]?.split("at")[1]?.trim() || "4:00 PM IST" : "4:00 PM IST") : "4:00 PM IST"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION WORKSHOP SEAT LOCK */}
            <div className="pt-6 max-w-lg mx-auto">
              <a
                href="https://rzp.io/rzp/awmEpLI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block glow-button bg-brand-orange hover:bg-brand-orange-dark text-white text-base md:text-lg font-display font-black py-4 px-6 rounded-2xl transition-all shadow-xl active:scale-95 select-none cursor-pointer"
              >
                {content.ctaText}
              </a>

              <div className="flex justify-between items-center text-xs text-slate-600 mt-3 pt-2 text-center max-w-md mx-auto font-semibold">
                <span className="flex items-center gap-1 text-emerald-600 font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  PRICE: {content.currencySymbol}{content.webinarPrice} ONLY
                </span>
                <span className="text-slate-350">|</span>
                <span>Seat Reserved for next <strong>{timeLeft.minutes}m {timeLeft.seconds}s</strong></span>
              </div>
            </div>

          </div>
        </section>

        {/* MEET YOUR TRAINER OUTLET SECTION */}
        <section className="py-16 max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 md:p-10 border border-slate-200/90 shadow-xl">
            
            {/* Left Col avatar info */}
            <div className="lg:col-span-4 text-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-brand-fb mx-auto shadow-xl relative group">
                <img
                  src={content.trainerAvatar}
                  alt={content.trainerName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">
                  {content.trainerName}
                </h3>
                <p className="text-brand-fb text-xs font-black mt-0.5">
                  {content.trainerTitle}
                </p>
                <span className="bg-brand-indigo/10 text-brand-indigo text-[10px] uppercase font-mono px-2.5 py-1 rounded-full border border-brand-indigo/20 mt-2 inline-block font-black">
                  {content.trainerExperience}
                </span>
              </div>
            </div>

            {/* Right Col Bio info */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Meet the Mentor</span>
              </div>

              <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line font-medium">
                {content.trainerBio}
              </p>

              {/* Secure Physical Refund Guarantee Slip */}
              <div className="bg-amber-50/50 border border-amber-200/80 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 px-3 py-1 rounded-bl-xl font-mono text-[9px] font-black tracking-widest uppercase">
                  Refund Pledge
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
                    <Award className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h5 className="font-display font-black text-slate-900 text-sm">
                      Maniish's No-Questions Refund Promise
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      Attend the workshop. If you don't like the tricks, let us know within 24 hours. We return your ₹{content.webinarPrice} instantly.
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  <span className="bg-amber-100 border border-amber-250 text-amber-700 text-[10px] px-2.5 py-1 rounded font-bold font-mono">
                    100% Risk Free
                  </span>
                </div>
              </div>

              {/* Stats badges below refund pledge */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-center shadow-sm">
                  <div className="text-lg md:text-xl font-display font-black text-brand-indigo">20K+</div>
                  <div className="text-[10px] text-slate-500 font-black uppercase tracking-wider mt-0.5">Students</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-center shadow-sm">
                  <div className="text-lg md:text-xl font-display font-black text-brand-orange">₹3L+</div>
                  <div className="text-[10px] text-slate-550 font-black uppercase tracking-wider mt-0.5">Monthly Income</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-center shadow-sm">
                  <div className="text-lg md:text-xl font-display font-black text-emerald-600">5+ Yrs</div>
                  <div className="text-[10px] text-slate-500 font-black uppercase tracking-wider mt-0.5">Experience</div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* DYNAMIC CASE STATS & PROOFS IMPORT SECTION */}
        <ProofSection
          content={content}
          onChange={setContent}
          isAdminMode={isAdminOpen}
        />

        {/* PAIN POINTS SECTION */}
        <section className="py-16 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
              Are You Tired Of These Problems? 😩
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight">
              Why 97% of Indian Creators <span className="text-rose-600">Fail To Make Money</span> Online
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Fake Self-Proclaimed Gurus"
              },
              {
                title: "No English or Editing Skills"
              },
              {
                title: "Exhausted 9-to-5 Low Salary"
              }
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-brand-indigo/35 transition-colors shadow-md"
              >
                <div>
                  <h4 className="font-display font-black text-slate-900 text-base tracking-tight mb-2">
                    {p.title}
                  </h4>
                </div>
                <div className="mt-4 inline-block self-start text-[10px] text-rose-600 bg-rose-55 font-bold uppercase tracking-wide border border-rose-100 rounded px-2.5 py-0.5">
                  ⛔ Real obstacle
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE ANSWER: FACELESS SHORTS / CLIPS WORKFLOW */}
        <section className="py-16 bg-white border-t border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20 text-xs px-2.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                Our Signature Solution 🔓
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight font-black leading-tight">
                The "Faceless Copy-Paste" <span className="text-brand-indigo">Trick Revealed</span>
              </h2>
              <p className="text-slate-650 text-xs md:text-sm mt-3 font-semibold">
                Work just 30 to 60 minutes. Maniish's secret workflow eliminates the need to record cameras. Here is how Hanu and Maniish operate:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.facelessSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 p-5 rounded-2xl relative overflow-hidden group hover:border-[#1877F2]/45 transition-colors shadow-sm"
                >
                  <div className="w-12 h-10 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo mb-4 font-bold text-xs">
                    <span>Step {idx+1}</span>
                  </div>

                  <h4 className="font-display font-black text-slate-900 text-base tracking-tight mb-2">
                    {step.title}
                  </h4>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CUSTOM BONUSES GRID */}
        <section className="py-16 bg-slate-100/60 border-y border-slate-200" id="bonuses-section">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20 text-xs px-2.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                Exclusively For Today's Registrants 🎁
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight">
                Unlock Free Gifts <span className="text-brand-indigo">Worth ₹12,999+</span>
              </h2>
              <p className="text-slate-650 text-xs md:text-sm mt-3 font-semibold">
                Register right now to lock in these extra template bundles, bypass guides, and secret group accesses—absolutely free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {content.bonuses.map((b, bIdx) => (
                <div
                  key={b.id}
                  className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden group hover:border-[#1877F2]/30 transition-all flex flex-col justify-between shadow-md"
                >
                  <div className="absolute top-0 right-0 bg-rose-600 text-white px-3 py-1 font-mono text-[9px] font-black uppercase tracking-wider rounded-bl-xl shadow-sm">
                    Value: {content.currencySymbol}{b.value}
                  </div>

                  <div>
                    <span className="text-brand-indigo font-mono text-xs font-black block mb-2">
                      BONUS GIFT 0{bIdx+1}
                    </span>
                    <h4 className="font-display font-black text-slate-900 text-base md:text-lg tracking-tight mb-2">
                      {b.title}
                    </h4>
                    <p className="text-slate-650 text-xs leading-relaxed font-semibold">
                      {b.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 text-[10px] font-black uppercase tracking-wider">
                      ✓ Included Free Today
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">
                      Lifetime Replay Access
                    </span>
                  </div>

                </div>
              ))}
            </div>

            {/* Total value visualizer block */}
            <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-brand-indigo/30 max-w-md mx-auto text-center space-y-4 shadow-xl">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Valuation Package</span>
                <span className="text-lg text-slate-400 block line-through mt-0.5 font-bold">₹{calculateTotalVal() + content.originalPrice}</span>
                <h4 className="text-2xl md:text-3xl font-display font-black text-brand-indigo mt-1">
                  FREE Pack Included
                </h4>
              </div>

              <p className="text-xs text-slate-600 leading-normal font-semibold">
                Unlock all assets, bypass codes, and live mentorship nodes instantly under the single, low ₹{content.webinarPrice} seat reservation.
              </p>

              <a
                href="https://rzp.io/rzp/awmEpLI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-[#f97316] hover:bg-[#ea580c] glow-button text-white font-display font-black text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer font-black"
              >
                Claim Package & Reserve My Spot
              </a>
            </div>

          </div>
        </section>

        {/* INTERACTIVE FAQ ACCORDION DISPLAY */}
        <FAQSection
          content={content}
          onChange={setContent}
          isAdminMode={isAdminOpen}
        />

        {/* LEGAL COMPLIANCE FOOTER */}
        <footer className="bg-slate-950 py-12 border-t border-slate-900 mt-12 text-center text-slate-500">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            
            <div className="flex justify-center items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/25 border border-indigo-500/30"></span>
              <span className="font-mono text-[9px] tracking-widest text-[#1877F2] uppercase font-bold">
                fb with maniish Systems
              </span>
            </div>

            <div className="text-[10px] leading-relaxed space-y-3">
              <p>
                <strong>🚫 NON-REFUNDABLE TERMS:</strong> The nominal registration seat pricing of {content.currencySymbol}{content.webinarPrice} is strictly non-refundable once transaction completes. Since this is a digital download content vault, it is non-returnable. Please inspect all requirements before reservation.
              </p>
              <p>
                This site is not affiliated with, endorsed by, or partnered with Meta Platforms, Inc. or Facebook™. FACEBOOK™ is a trademark of Facebook/Meta, Inc.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-400 font-bold">
              <button onClick={() => { setActiveLegalPage("privacy"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:underline cursor-pointer bg-transparent border-none p-0 text-slate-400 font-bold">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => { setActiveLegalPage("terms"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:underline cursor-pointer bg-transparent border-none p-0 text-slate-400 font-bold">Terms & Conditions</button>
              <span>•</span>
              <button onClick={() => { setActiveLegalPage("refunds"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:underline cursor-pointer bg-transparent border-none p-0 text-slate-400 font-bold">Cancellation & Refund Policy</button>
              <span>•</span>
              <button onClick={() => { setActiveLegalPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:underline cursor-pointer bg-transparent border-none p-0 text-slate-400 font-bold">Contact Us</button>
            </div>

            <p className="text-[10px] pt-4 border-t border-slate-900 font-mono text-slate-600">
              © {new Date().getFullYear()} fb with maniish. Built cleanly with React & Tailwind 4. All rights reserved.
            </p>

          </div>
        </footer>

      </main>
      )}

      {/* STICKY BOTTOM RESERVATION BAR (Appears on scroll) */}
      {showStickyBar && !activeLegalPage && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 py-3 px-4 shadow-2xl transition-all animate-slide-up">
          <div className="max-w-5xl mx-auto flex select-all flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-brand-fb flex items-center justify-center text-white font-black text-sm italic shadow-sm">
                f
              </div>
              <div className="hidden sm:block">
                <h5 className="text-slate-900 text-xs font-black leading-none capitalize">
                  {content.businessName} VIP Box
                </h5>
                <p className="text-[10px] text-slate-500 leading-normal mt-0.5 font-semibold">
                  12 webinar seats left before increase
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-sm font-black font-display text-slate-950 block">
                  {content.currencySymbol}{content.webinarPrice} Only
                </span>
                <span className="text-[9px] text-brand-indigo font-mono font-bold block">
                  ({timeLeft.minutes}m {timeLeft.seconds}s countdown)
                </span>
              </div>

              <a
                href="https://rzp.io/rzp/awmEpLI"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-orange hover:bg-brand-orange-dark glow-button text-white text-xs font-display font-black py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center gap-1 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Register Seat <ArrowRight className="w-3.5 h-3.5 text-white" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* SECURE MOCK UPI PAYMENT POPUP */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        content={content}
      />

      {/* SOCIAL PROOF FLOAT TOAST notifications */}
      <LiveNotificationToast />

    </div>
  );
}
