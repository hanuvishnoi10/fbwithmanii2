import { useState } from "react";
import { ChevronDown, HelpCircle, Plus, Trash2 } from "lucide-react";
import { PageContent } from "../types";

interface FAQSectionProps {
  content: PageContent;
  onChange: (updatedContent: PageContent) => void;
  isAdminMode: boolean;
}

export function FAQSection({ content, onChange, isAdminMode }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleUpdateFaq = (id: string, field: "question" | "answer", value: string) => {
    const updated = content.faqs.map((f) => {
      if (f.id === id) {
        return { ...f, [field]: value };
      }
      return f;
    });
    onChange({ ...content, faqs: updated });
  };

  const handleAddNewFaq = () => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: "New Customized Question?",
      answer: "Write a reassuring answer to satisfy customer doubts instantly!"
    };
    onChange({ ...content, faqs: [...content.faqs, newFaq] });
    setOpenId(newFaq.id);
  };

  const handleRemoveFaq = (id: string) => {
    const updated = content.faqs.filter((f) => f.id !== id);
    onChange({ ...content, faqs: updated });
    if (openId === id) {
      setOpenId(updated[0]?.id || null);
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200" id="faq-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <HelpCircle className="w-9 h-9 text-brand-indigo mx-auto mb-3" />
          <h2 className="text-3xl font-display font-black text-slate-900">
            Have Questions? <span className="text-slate-600 font-medium">We Have Real Answers.</span>
          </h2>
          <p className="text-slate-500 mt-2 text-xs md:text-sm">
            Everything you need to know about the Facebook Faceless Mentorship Program.
          </p>
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <div
                  onClick={() => !isAdminMode && toggleFaq(faq.id)}
                  className={`flex justify-between items-center p-4 md:p-5 cursor-pointer select-none transition-colors ${
                    isOpen ? "bg-slate-50" : "hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex-1 mr-4">
                    {isAdminMode ? (
                      <input
                        type="text"
                        value={faq.question}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleUpdateFaq(faq.id, "question", e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 font-bold text-sm border border-slate-200 p-2 rounded focus:outline-none focus:border-brand-fb"
                        placeholder="Edit Question Text"
                      />
                    ) : (
                      <h4 className="font-bold text-slate-800 text-sm md:text-base pr-4">
                        {faq.question}
                      </h4>
                    )}
                  </div>
                  {!isAdminMode && (
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Answer block */}
                {(isOpen || isAdminMode) && (
                  <div className="p-4 md:p-5 bg-slate-50/50 border-t border-slate-100 space-y-4">
                    {isAdminMode ? (
                      <div>
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(faq.id, "answer", e.target.value)}
                          className="w-full bg-white text-slate-700 text-xs md:text-sm border border-slate-200 p-2.5 rounded focus:outline-none focus:border-brand-fb resize-none"
                          placeholder="Edit Answer Copy"
                        />
                        <div className="mt-2 flex justify-between items-center pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                          <span>FAQ Node ID: {faq.id}</span>
                          <button
                            onClick={() => handleRemoveFaq(faq.id)}
                            className="text-red-600 hover:text-red-500 flex items-center gap-1 font-bold"
                          >
                            <Trash2 className="w-3" /> Delete FAQ
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isAdminMode && (
          <div className="mt-6 text-center">
            <button
              onClick={handleAddNewFaq}
              className="bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/35 hover:bg-brand-indigo/20 text-xs px-4 py-2 rounded-lg font-bold transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Custom Question FAQ
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
