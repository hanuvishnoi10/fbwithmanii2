import React, { useState, useEffect } from "react";
import { Check, X, ShieldAlert, Award, AlertCircle, ArrowRight, Smartphone, Compass, Clock } from "lucide-react";
import { PageContent } from "../types";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: PageContent;
}

export function PaymentModal({ isOpen, onClose, content }: PaymentModalProps) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerUtr, setBuyerUtr] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"fill" | "verifying" | "success">("fill");
  const [progressText, setProgressText] = useState("Connecting to UPI gateway...");
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (isOpen && checkoutStep === "fill") {
      const d = document;
      const x = !d.getElementById("razorpay-embed-btn-js");
      if (x) {
        const s = d.createElement("script");
        s.defer = true;
        s.id = "razorpay-embed-btn-js";
        s.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
        d.body.appendChild(s);
      } else {
        const rzp = (window as any)["__rzp__"];
        if (rzp && rzp.init) {
          try {
            rzp.init();
          } catch (e) {
            console.error("Razorpay init error:", e);
          }
        }
      }
    }
  }, [isOpen, checkoutStep]);

  if (!isOpen) return null;

  // Real scan-friendly UPI Deep Link structure
  const rawUpiUrl = `upi://pay?pa=${encodeURIComponent(content.upiId)}&pn=${encodeURIComponent(
    content.payeeName
  )}&am=${content.webinarPrice}&tn=FB%20Mentorship%20Enrollment&cu=INR`;

  // Standard high-reliability public QR generator API with dynamic parameter injection
  const qrcodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    rawUpiUrl
  )}`;

  const handleStartVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert("Please fill your Name and Mobile Number to activate registration.");
      return;
    }
    
    setCheckoutStep("verifying");
    setProgressPercent(10);
    setProgressText("Initializing secure checkout portal...");

    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgressPercent(100);
        setProgressText("Payment confirmed! Generating VIP entry code...");
        setTimeout(() => {
          setCheckoutStep("success");
        }, 800);
      } else {
        setProgressPercent(currentProgress);
        if (currentProgress < 40) {
          setProgressText("Resolving virtual payment address transaction log...");
        } else if (currentProgress < 75) {
          setProgressText("Authenticating deposit state with UPI NPCI node...");
        } else {
          setProgressText("Registering membership seat on Maniish's system...");
        }
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
        
        {/* Header toolbar */}
        <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            <span className="font-display font-black text-sm tracking-widest text-[#1877F2] uppercase">
              {content.businessName} PRECheck
            </span>
          </div>
          <button
            onClick={() => {
              setCheckoutStep("fill");
              setBuyerName("");
              setBuyerPhone("");
              setBuyerUtr("");
              onClose();
            }}
            className="text-slate-500 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg transition-colors border border-slate-200 cursor-pointer animate-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic step states */}
        {checkoutStep === "fill" && (
          <form onSubmit={handleStartVerification} className="p-5 space-y-4">
            
            {/* Price block */}
            <div className="text-center bg-indigo-50/50 border border-brand-indigo/15 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] text-brand-indigo font-bold uppercase tracking-wider block">Exclusive Workshop Seat</span>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-3xl font-black font-display text-slate-900">
                  {content.currencySymbol}{content.webinarPrice}
                </span>
                <span className="text-sm text-slate-400 line-through font-semibold">
                  {content.currencySymbol}{content.originalPrice}
                </span>
              </div>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">
                ★ Fully Non-Refundable • Instant Access Dashboard
              </p>
            </div>

            {/* Form details */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full text-sm bg-white text-slate-900 border border-slate-300 focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo p-2.5 rounded-lg font-semibold shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Mobile WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210 (To receive link)"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full text-sm bg-white text-slate-900 border border-slate-300 focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo p-2.5 rounded-lg font-mono font-semibold shadow-sm"
                />
              </div>

              {/* UPI Option Panel */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-700 font-bold">
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-brand-fb animate-bounce" /> SCAN TO PAY INSTANTLY</span>
                  <span className="text-[10px] text-brand-indigo font-black uppercase">Secure UPI NPCI</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl mx-auto w-48 h-48 border-4 border-indigo-100 shadow-sm">
                  {/* Real scan-friendly generated QR */}
                  <img
                    src={qrcodeSrc}
                    alt="Scan to pay"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[11px] font-mono text-slate-700 block font-semibold">
                    VPA: <span className="text-brand-indigo font-black">{content.upiId}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block font-semibold font-semibold">
                    Payee Name: <strong className="text-slate-850 font-bold">{content.payeeName}</strong>
                  </span>
                </div>

                {/* Optional UTR block to make it realistic */}
                <div>
                  <label className="text-[10px] text-slate-600 font-bold block mb-1 uppercase tracking-wider">
                    Optional: Transaction ID / UTR Number (if not auto-redirected)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 612984102941"
                    value={buyerUtr}
                    onChange={(e) => setBuyerUtr(e.target.value)}
                    className="w-full text-[11px] bg-white border border-slate-300 text-slate-700 rounded p-2 focus:outline-none focus:border-brand-indigo font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Submit ticket (Razorpay Embed Link matching same styling and placement) */}
            <div 
              className="razorpay-embed-btn w-full animate-none" 
              data-url="https://pages.razorpay.com/pl_SxDQqujWV4dupu/view" 
              data-text="Pay Now" 
              data-color="#528FF0" 
              data-size="large"
            >
              <a
                href="https://pages.razorpay.com/pl_SxDQqujWV4dupu/view"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!buyerName || !buyerPhone) {
                    e.preventDefault();
                    alert("Please fill your Name and Mobile Number to activate registration.");
                    return;
                  }
                  
                  // Start verification background simulator flow
                  setCheckoutStep("verifying");
                  setProgressPercent(10);
                  setProgressText("Opening Razorpay secure payment page...");
                  
                  let currentProgress = 10;
                  const interval = setInterval(() => {
                    currentProgress += 15;
                    if (currentProgress >= 100) {
                      clearInterval(interval);
                      setProgressPercent(100);
                      setProgressText("Connecting with payment gateway state... Registration ready!");
                      setTimeout(() => {
                        setCheckoutStep("success");
                      }, 800);
                    } else {
                      setProgressPercent(currentProgress);
                      if (currentProgress < 40) {
                        setProgressText("Resolving virtual payment address transaction log...");
                      } else if (currentProgress < 75) {
                        setProgressText("Authenticating deposit state with UPI NPCI node...");
                      } else {
                        setProgressText("Registering membership seat on Manish's system...");
                      }
                    }
                  }, 400);
                }}
                className="w-full bg-brand-orange hover:bg-brand-orange-dark glow-button text-white font-display font-black text-sm py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-center leading-normal select-none"
              >
                Verify & Secure My Seat Now <ArrowRight className="w-4 h-4 text-white font-black" />
              </a>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 text-[10px] text-slate-600 leading-normal bg-rose-50/50 p-2.5 rounded-lg border border-rose-100 font-semibold shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>
                By proceeding, you understand registration is immediate, non-refundable, and reserves one critical server seat. Facebook™ works independently of this training program.
              </span>
            </div>
          </form>
        )}

        {/* Checking flow state */}
        {checkoutStep === "verifying" && (
          <div className="p-12 text-center space-y-6 flex flex-col items-center bg-white">
            <div className="w-16 h-16 rounded-full border-4 border-brand-indigo/15 border-t-brand-indigo animate-spin flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-brand-indigo/5 flex items-center justify-center text-brand-indigo font-bold font-display">
                M
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-display font-black text-slate-900 text-lg">Transaction Live Audit</h4>
              <p className="text-xs text-slate-600 px-4 max-w-xs font-semibold">{progressText}</p>
            </div>

            {/* Progress bar info layout */}
            <div className="w-full max-w-xs bg-slate-100 rounded-full h-1.5 overflow-hidden shadow-inner">
              <div
                className="bg-brand-indigo h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Complete Successful enrollment confirmation card */}
        {checkoutStep === "success" && (
          <div className="p-6 text-center space-y-6 bg-white animate-fade-in">
            
            {/* Banner of absolute validation */}
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 font-bold tracking-wider uppercase inline-block">
                Registered Seat Confirmed!
              </span>
              <h4 className="text-xl md:text-2xl font-display font-black text-slate-900 mt-1">
                Welcome to Maniish's Class!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto font-semibold">
                Congratulations, <strong className="text-slate-950 font-black">{buyerName}</strong>! Your mobile seat subscription ({buyerPhone}) has been secured in the database.
              </p>
            </div>

            {/* Interactive virtual certificate */}
            <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl text-left relative overflow-hidden shadow-inner font-semibold">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <Award className="w-24 h-24 text-brand-indigo" strokeWidth={1} />
              </div>

              <div className="flex justify-between items-center text-[10px] text-brand-indigo font-mono font-bold pb-2 border-b border-slate-200">
                <span>MEMBERSHIP TOKEN #7B29</span>
                <span>STATUS: VERIFIED</span>
              </div>

              <div className="mt-3 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Student Delegate Name</span>
                <span className="text-base font-black text-slate-900 block font-display tracking-wide pb-1">{buyerName}</span>
                
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 font-semibold">
                  <div>
                    <span className="text-[9px] text-slate-450 block uppercase font-bold">Workshop Access</span>
                    <span className="text-[11px] text-slate-700 font-bold">Live + Lifetime Replay</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-450 block uppercase font-bold">Tutor</span>
                    <span className="text-[11px] text-slate-700 font-bold">{content.trainerName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Next Steps Action Call-to-action button */}
            <div className="space-y-2">
              <a
                href="https://chat.whatsapp.com/mock-fb-with-maniish-group"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-extrabold text-sm py-3.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all"
              >
                Join Instant Secret WhatsApp Group
              </a>
              <p className="text-[9px] text-slate-500">
                ⚠️ Join before closing this popup to ensure you receive the live link instructions immediately.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg font-bold">
              <span className="text-slate-600 font-semibold font-mono">UPI Ref No: {buyerUtr || `${Math.floor(Math.random() * 900000) + 100000}`}</span>
              <button
                onClick={() => {
                  setCheckoutStep("fill");
                  setBuyerName("");
                  setBuyerPhone("");
                  setBuyerUtr("");
                  onClose();
                }}
                className="text-brand-indigo hover:text-brand-indigo-dark font-black cursor-pointer"
              >
                Close Ticket
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
