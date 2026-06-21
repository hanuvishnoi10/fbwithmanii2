import React from "react";
import { ArrowLeft, Mail, Clock, Calendar, ShieldCheck, FileText, HelpCircle, RefreshCw, MessageCircle } from "lucide-react";

interface LegalPageViewProps {
  page: "terms" | "privacy" | "refunds" | "contact";
  onClose: () => void;
}

export function LegalPageView({ page, onClose }: LegalPageViewProps) {
  // Prevent any default behavior and scroll to top on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Top Control Bar with Back Button */}
        <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between bg-slate-50/50">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-600 hover:text-brand-indigo font-semibold text-xs transition-all cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md"
            id="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Masterclass
          </button>
          
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Legal Center
          </div>
        </div>

        {/* Dynamic Page Content Render */}
        <div className="p-6 sm:p-10 md:p-12">
          {page === "terms" && (
            <article className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo border border-brand-indigo/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                    Terms & Conditions
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Digital Blazen Education Portal</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-4" />

              <p className="text-slate-655 text-sm leading-relaxed font-semibold">
                Welcome to <span className="text-slate-900 font-bold">Digital Blazen</span>.
              </p>

              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                By purchasing and accessing our workshops, courses, or educational content, you agree to comply with these Terms and Conditions.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    num: "1.",
                    text: "The workshop is intended for educational and informational purposes only."
                  },
                  {
                    num: "2.",
                    text: "Access to workshop materials, recordings, and resources is provided solely to the registered participant."
                  },
                  {
                    num: "3.",
                    text: "Sharing, reselling, reproducing, or distributing workshop content without written permission is strictly prohibited."
                  },
                  {
                    num: "4.",
                    text: "Digital Blazen reserves the right to modify workshop schedules, content, speakers, or delivery methods when necessary."
                  },
                  {
                    num: "5.",
                    text: "Participants are responsible for providing accurate registration information."
                  },
                  {
                    num: "6.",
                    text: "Any misuse, abusive behavior, or violation of these terms may result in removal from the workshop without refund."
                  },
                  {
                    num: "7.",
                    text: "Digital Blazen does not guarantee specific business results, income, advertising performance, or financial outcomes from implementing the strategies discussed."
                  },
                  {
                    num: "8.",
                    text: "By making a payment, you acknowledge that you have read and accepted these terms."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-slate-50/50 border border-slate-150 p-4 rounded-xl transition-all hover:bg-slate-50">
                    <span className="font-mono text-brand-indigo font-bold text-sm select-none">{item.num}</span>
                    <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Last Updated: June 2026
                </span>
                <span className="text-[10px] text-brand-indigo font-black uppercase tracking-wider">Manish Prajapati</span>
              </div>
            </article>
          )}

          {page === "privacy" && (
            <article className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 border border-indigo-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                    Privacy Policy
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Your Privacy Safeguards</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-4" />

              <p className="text-slate-655 text-sm leading-relaxed font-semibold">
                <span className="text-slate-900 font-bold">Digital Blazen</span> values your privacy. We make sure that your personal details are fully secured.
              </p>

              <div>
                <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-wider mb-3 flex items-center gap-1">
                  <span className="w-1 h-3 bg-indigo-600 rounded"></span> Information We Collect:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Full Name",
                    "Email Address",
                    "Phone Number",
                    "Payment Information (processed securely through Razorpay)"
                  ].map((info, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-150 p-3 rounded-lg text-xs md:text-sm font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                      {info}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-wider mb-3 flex items-center gap-1">
                  <span className="w-1 h-3 bg-indigo-600 rounded"></span> How We Use Your Information:
                </h3>
                <ul className="space-y-2">
                  {[
                    "To provide workshop access",
                    "To send workshop updates and communication",
                    "To provide customer support",
                    "To improve our services"
                  ].map((usage, idx) => (
                    <li key={idx} className="flex gap-2 text-xs md:text-sm font-medium text-slate-600">
                      <span className="text-brand-indigo font-bold select-none">&bull;</span>
                      <span>{usage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">
                  💳 Payment Security:
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                  All payments are processed securely through Razorpay. We do not store your card or banking information.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">
                  🤝 Information Sharing:
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                  We do not sell, rent, or share your personal information with third parties except when required by law.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">
                  🛡️ Data Protection:
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                  We take reasonable measures to protect your information from unauthorized access.
                </p>
              </div>

              <p className="text-slate-600 text-xs font-semibold leading-relaxed pt-2">
                By using our services, you consent to this Privacy Policy.
              </p>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Last Updated: June 2026
                </span>
                <span className="text-[10px] text-brand-indigo font-black uppercase tracking-wider">Manish Prajapati</span>
              </div>
            </article>
          )}

          {page === "refunds" && (
            <article className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 border border-rose-500/20">
                  <RefreshCw className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                    Cancellation & Refund Policy
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Refund Guidelines & Rules</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-4" />

              <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl">
                <h4 className="font-display font-black text-rose-800 text-sm uppercase tracking-wider mb-2">
                  ⚠️ Crucial Information
                </h4>
                <p className="text-rose-700 text-xs md:text-sm leading-relaxed font-bold">
                  Due to the digital nature of our workshops and instant access to educational content, all registrations are non-refundable.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                  Once payment is completed and access has been provided, cancellations and refunds cannot be processed.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                  Exceptions may be considered only in cases of duplicate payments or technical payment errors, subject to verification.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                  For any payment-related concerns, please contact us.
                </p>
              </div>

              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">Connect with support</span>
                  <span className="text-slate-700 font-mono font-bold text-sm">fbwithmanish44@gmail.com</span>
                </div>
                <a
                  href="mailto:fbwithmanish44@gmail.com"
                  className="bg-brand-indigo text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-brand-indigo-dark text-center select-none"
                >
                  Send Support Mail
                </a>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Last Updated: June 2026
                </span>
                <span className="text-[10px] text-brand-indigo font-black uppercase tracking-wider">Manish Prajapati</span>
              </div>
            </article>
          )}

          {page === "contact" && (
            <article className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 border border-orange-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                    Contact Us
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Digital Blazen Address & Helpdesk</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-4" />

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Company Brand</span>
                  <h4 className="text-base font-display font-black text-slate-900 mt-1">Digital Blazen</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-xl space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block flex items-center gap-1">
                      <Mail className="w-3 h-3 text-brand-orange" /> Email Support
                    </span>
                    <a href="mailto:fbwithmanish44@gmail.com" className="text-brand-indigo font-mono font-bold text-sm sm:text-base hover:underline block cursor-pointer">
                      fbwithmanish44@gmail.com
                    </a>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-xl space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Support
                    </span>
                    <a href="https://wa.me/919625201893" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-mono font-bold text-sm sm:text-base hover:underline block cursor-pointer">
                      +91 9625201893
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-indigo" /> Support Hours
                  </span>
                  <p className="text-slate-800 text-xs md:text-sm font-bold flex items-center gap-2">
                    <span>Monday to Saturday</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">10:00 AM – 9:00 PM IST</span>
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-semibold italic pt-2">
                For workshop access, technical issues, payment-related queries, or general support, please contact us via email or WhatsApp. We aim to respond within 24-48 business hours.
              </p>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Last Updated: June 2026
                </span>
                <span className="text-[10px] text-brand-indigo font-black uppercase tracking-wider">Manish Prajapati</span>
              </div>
            </article>
          )}
        </div>

        {/* Back To Home Footer */}
        <div className="bg-slate-950 p-6 text-center border-t border-slate-900">
          <p className="text-[10px] text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Digital Blazen. All rights reserved. Registered Educational Mentorship Program.
          </p>
        </div>

      </div>
    </div>
  );
}
