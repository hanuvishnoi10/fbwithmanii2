import React, { useState } from "react";
import { Settings, X, RefreshCw, Eye, Sparkles, Plus, Trash2, DollarSign, HelpCircle, Image as ImageIcon, Video, Layers, CheckSquare } from "lucide-react";
import { PageContent } from "../types";
import { initialPageContent } from "../initialContent";

interface AdminPanelProps {
  content: PageContent;
  onChange: (updated: PageContent) => void;
  isOpen: boolean;
  onToggle: () => void;
}

type TabType = "general" | "payouts" | "proofs" | "bonuses" | "faqs";

export function AdminPanel({ content, onChange, isOpen, onToggle }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all customized values to original Facebook mentorship template variables?")) {
      onChange(initialPageContent);
      localStorage.removeItem("maniish_landing_content");
    }
  };

  const handleTextChange = (field: keyof PageContent, value: any) => {
    let finalValue = value;
    if (field === "videoUrl" && typeof value === "string") {
      const url = value.trim();
      if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        if (parts[1]) {
          const id = parts[1].split("?")[0].split("&")[0];
          finalValue = `https://www.youtube.com/embed/${id}`;
        }
      } else if (url.includes("youtube.com/")) {
        if (url.includes("/shorts/")) {
          const parts = url.split("/shorts/");
          if (parts[1]) {
            const id = parts[1].split("?")[0].split("&")[0];
            finalValue = `https://www.youtube.com/embed/${id}`;
          }
        } else {
          const match = url.match(/[?&]v=([^&#]+)/);
          if (match && match[1]) {
            finalValue = `https://www.youtube.com/embed/${match[1]}`;
          }
        }
      }
    }
    onChange({ ...content, [field]: finalValue });
  };

  // Safe perk operations
  const updatePerk = (index: number, val: string) => {
    const nextPerks = [...content.perks];
    nextPerks[index] = val;
    onChange({ ...content, perks: nextPerks });
  };

  const addPerk = () => {
    onChange({ ...content, perks: [...content.perks, "New Awesome Perks Course Milestone Included"] });
  };

  const removePerk = (index: number) => {
    const nextPerks = content.perks.filter((_, i) => i !== index);
    onChange({ ...content, perks: nextPerks });
  };

  return (
    <>
      {/* Floating control trigger widget */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full flex items-center gap-2 font-display font-extrabold text-sm shadow-2xl hover:scale-105 active:scale-95 border-2 transition-all duration-300 ${
          isOpen
            ? "bg-rose-600 border-rose-500 text-white animate-none"
            : "bg-[#1877F2] hover:bg-[#115fc4] border-blue-400 text-white glow-fb animate-pulse"
        }`}
      >
        {isOpen ? (
          <>
            <Eye className="w-5 h-5" /> Close Editor View
          </>
        ) : (
          <>
            <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: "10s" }} /> Edit Web Design (Change Texts / Proofs)
          </>
        )}
      </button>

      {/* Main Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-slate-900 border-l border-slate-800 z-40 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Title Block */}
          <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-gold" /> LIVE EDITOR
              </div>
              <h3 className="font-display font-black text-white text-lg mt-0.5">fb with maniish Console</h3>
            </div>
            <button
              onClick={onToggle}
              className="text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 p-1.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick tab controllers */}
          <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800/60 flex gap-1 overflow-x-auto scrollbar-none scroll-smooth">
            {(
              [
                { id: "general", label: "Core Layout", icon: Layers },
                { id: "payouts", label: "Prices & UPI", icon: DollarSign },
                { id: "proofs", label: "Proofs & Images", icon: ImageIcon },
                { id: "bonuses", label: "Bonuses", icon: CheckSquare },
                { id: "faqs", label: "Questions FAQ", icon: HelpCircle },
              ] as const
            ).map((t) => {
              const TabIcon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                      : "bg-slate-900 text-slate-400 border-slate-800/80 hover:text-white hover:bg-slate-850"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" /> {t.label}
                </button>
              );
            })}
          </div>

          {/* Drawer Content Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* GENERAL TAB CONTENT */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 text-xs rounded-xl border border-indigo-500/20 leading-relaxed font-sans">
                  💡 <strong>Live Preview Enabled:</strong> Changing any input here instantly updates the frontend styles of Sawan's custom framework, allowing you to fine-tune copy writing!
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Business Brand Title Name</label>
                  <input
                    type="text"
                    value={content.businessName}
                    onChange={(e) => handleTextChange("businessName", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-brand-fb"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Mentor / Coach Full Name</label>
                  <input
                    type="text"
                    value={content.trainerName}
                    onChange={(e) => handleTextChange("trainerName", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-brand-fb"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Headline Text (Sells the course! High converting)</label>
                  <textarea
                    rows={3}
                    value={content.headline}
                    onChange={(e) => handleTextChange("headline", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-brand-fb resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Sub-headline Copywriter description</label>
                  <textarea
                    rows={3}
                    value={content.subHeadline}
                    onChange={(e) => handleTextChange("subHeadline", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-brand-fb resize-none"
                  />
                </div>

                <div className="border-t border-slate-800/80 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs text-slate-400 font-bold block">Course Perk Checkmarks</label>
                    <button
                      onClick={addPerk}
                      className="text-[10px] text-indigo-400 hover:text-white bg-indigo-600/10 hover:bg-indigo-600/20 px-2.5 py-1 rounded border border-indigo-500/20 font-bold transition-all"
                    >
                      + Add Checkmark Perk
                    </button>
                  </div>
                  <div className="space-y-2">
                    {content.perks.map((perk, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={perk}
                          onChange={(e) => updatePerk(i, e.target.value)}
                          className="flex-1 text-xs bg-slate-950 text-slate-300 border border-slate-800 rounded p-2 focus:outline-none focus:border-brand-fb"
                        />
                        <button
                          onClick={() => removePerk(i)}
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-4">
                  <label className="text-xs text-slate-400 font-bold block mb-1">📺 Youtube Embed Iframe URL Link</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="usePlaceholder"
                      checked={content.usePlaceholderVideo}
                      onChange={(e) => handleTextChange("usePlaceholderVideo", e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-indigo-500 focus:ring-0"
                    />
                    <label htmlFor="usePlaceholder" className="text-xs text-slate-300 font-medium">
                      Simulate elegant custom mockup inside frame instead (highly recommended for design uniformity)
                    </label>
                  </div>
                  {!content.usePlaceholderVideo && (
                    <input
                      type="text"
                      value={content.videoUrl}
                      onChange={(e) => handleTextChange("videoUrl", e.target.value)}
                      className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-indigo-500 font-mono"
                      placeholder="e.g. https://www.youtube.com/embed/XXXXXX"
                    />
                  )}
                </div>
              </div>
            )}

            {/* PAYOUTS & PRICING TAB */}
            {activeTab === "payouts" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Discount Price ({content.currencySymbol})</label>
                    <input
                      type="number"
                      value={content.webinarPrice}
                      onChange={(e) => handleTextChange("webinarPrice", Number(e.target.value))}
                      className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-brand-fb"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold block mb-1">Original Price ({content.currencySymbol})</label>
                    <input
                      type="number"
                      value={content.originalPrice}
                      onChange={(e) => handleTextChange("originalPrice", Number(e.target.value))}
                      className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-brand-fb"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">CTA Dynamic Button Text</label>
                  <input
                    type="text"
                    value={content.ctaText}
                    onChange={(e) => handleTextChange("ctaText", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Language Details</label>
                  <input
                    type="text"
                    value={content.language}
                    onChange={(e) => handleTextChange("language", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">📅 Schedule / Date &amp; Time Info</label>
                  <input
                    type="text"
                    value={content.dateTime ? content.dateTime : ""}
                    onChange={(e) => handleTextChange("dateTime", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none"
                    placeholder="e.g. Live Masterclass • Sunday at 4:00 PM IST"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                    Format with a "•" and "at" (e.g. "Live Masterclass • Sunday at 4:00 PM IST") to automatically extract separate Date &amp; Time widgets on your landing page.
                  </p>
                </div>

                <div className="p-3 bg-emerald-500/10 text-emerald-400 text-xs rounded-xl border border-emerald-500/20 space-y-2 leading-relaxed">
                  <div className="font-bold flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> UPI Scanner Routing Configuration:
                  </div>
                  <p>
                    Provide your genuine Indian UPI address (e.g. GPAY, PHONEPE ID) below so any potential scanning registers directly on your account!
                  </p>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">UPI Address (UPI ID / VPA)</label>
                  <input
                    type="text"
                    value={content.upiId}
                    onChange={(e) => handleTextChange("upiId", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-indigo-500 font-mono"
                    placeholder="e.g. maniish@paytm"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Payee Name (Shown in scanner app)</label>
                  <input
                    type="text"
                    value={content.payeeName}
                    onChange={(e) => handleTextChange("payeeName", e.target.value)}
                    className="w-full text-xs bg-slate-950 text-white border border-slate-800 rounded p-2.5 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Maniish Vyas"
                  />
                </div>
              </div>
            )}

            {/* PROOFS TAB */}
            {activeTab === "proofs" && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 text-slate-400 text-xs rounded-xl border border-slate-850 space-y-1.5 leading-relaxed">
                  <span className="font-bold text-white block">★ Quick Customizing Guideline</span>
                  <p>
                    You can easily add new proof cards directly in the <strong>Verified Earning Evidence</strong> card grid on the left by using the <strong>"Add New Proof"</strong> action triggers!
                  </p>
                  <p>
                    Alternatively, browse to any card on the main page, hover, and click <strong>"Upload Image"</strong> to inject your screenshot file immediately.
                  </p>
                </div>
              </div>
            )}

            {/* BONUSES TAB */}
            {activeTab === "bonuses" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-850">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Webinar Gift list</span>
                  <button
                    onClick={() => {
                      const newBonus = {
                        id: `bonus-${Date.now()}`,
                        title: "Exclusive Pro Editing LUTs Pack",
                        description: "Increase viral metrics with custom color configurations optimized for mobile screen viewers.",
                        value: 999
                      };
                      onChange({ ...content, bonuses: [...content.bonuses, newBonus] });
                    }}
                    className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded font-bold"
                  >
                    + Add New Bonus
                  </button>
                </div>

                <div className="space-y-3">
                  {content.bonuses.map((b) => (
                    <div key={b.id} className="bg-slate-950/60 p-3 rounded-lg border border-slate-850/80 space-y-3 relative">
                      <button
                        onClick={() => {
                          const fit = content.bonuses.filter((item) => item.id !== b.id);
                          onChange({ ...content, bonuses: fit });
                        }}
                        className="absolute top-2 right-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-2">
                        <div>
                          <label className="text-[9px] text-slate-500 uppercase font-semibold">Bonus Title</label>
                          <input
                            type="text"
                            value={b.title}
                            onChange={(e) => {
                              const updated = content.bonuses.map((item) => {
                                if (item.id === b.id) return { ...item, title: e.target.value };
                                return item;
                              });
                              onChange({ ...content, bonuses: updated });
                            }}
                            className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] text-slate-500 uppercase font-semibold">Description</label>
                          <textarea
                            rows={2}
                            value={b.description}
                            onChange={(e) => {
                              const updated = content.bonuses.map((item) => {
                                if (item.id === b.id) return { ...item, description: e.target.value };
                                return item;
                              });
                              onChange({ ...content, bonuses: updated });
                            }}
                            className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] text-slate-500 uppercase font-semibold">Perceived Value (₹)</label>
                          <input
                            type="number"
                            value={b.value}
                            onChange={(e) => {
                              const updated = content.bonuses.map((item) => {
                                if (item.id === b.id) return { ...item, value: Number(e.target.value) };
                                return item;
                              });
                              onChange({ ...content, bonuses: updated });
                            }}
                            className="w-full text-xs bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs TAB */}
            {activeTab === "faqs" && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 text-slate-400 text-xs rounded-xl border border-slate-850 space-y-1.5 leading-relaxed">
                  <span className="font-bold text-white block">★ Quick Customizing Guideline</span>
                  <p>
                    Scroll down to the <strong>Frequently Asked Questions</strong> accordion block of the page. You can add, edit, and delete questions and answers directly inside the interactive nodes of the webpage itself!
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Actions Footer */}
          <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="text-xs text-rose-400 hover:text-white hover:bg-rose-500/10 px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all border border-rose-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Revert Defaults
            </button>
            <button
              onClick={onToggle}
              className="bg-[#1877F2] hover:bg-[#115fc4] text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Close Editor View
            </button>
          </div>

        </div>
      )}
    </>
  );
}
