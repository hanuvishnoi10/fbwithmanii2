import React, { useRef, useState } from "react";
import { DollarSign, MessageSquare, Sparkles, TrendingUp } from "lucide-react";
import { PageContent } from "../types";

interface ProofSectionProps {
  content: PageContent;
  onChange: (updatedContent: PageContent) => void;
  isAdminMode: boolean;
}

export function ProofSection({ content, onChange, isAdminMode }: ProofSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingProofId, setEditingProofId] = useState<string | null>(null);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>, proofId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedProofs = content.earningProofs.map((p) => {
          if (p.id === proofId) {
            return { ...p, imgUrl: base64String };
          }
          return p;
        });
        onChange({ ...content, earningProofs: updatedProofs });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProofText = (id: string, field: "title" | "description" | "imgUrl", value: string) => {
    const updated = content.earningProofs.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onChange({ ...content, earningProofs: updated });
  };

  const addNewProof = () => {
    const newProof = {
      id: `proof-${Date.now()}`,
      title: "New Custom Proof Banner",
      imgUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
      description: "Customize this payout card description to show your real Facebook Page engagement rates!"
    };
    onChange({ ...content, earningProofs: [...content.earningProofs, newProof] });
  };

  const removeProof = (id: string) => {
    const updated = content.earningProofs.filter((p) => p.id !== id);
    onChange({ ...content, earningProofs: updated });
  };

  return (
    <div className="py-16 bg-slate-50 border-y border-slate-200" id="proof-section">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
            100% Verified Earning Evidence
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight">
            Stop Chasing Theories. See the <span className="text-brand-orange">Real Money Cashflow</span>
          </h2>
          <p className="text-slate-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            These are actual dashboards and bank receipts from our faceless entertainment and movie-clip pages. Look closely at the numbers.
          </p>
        </div>

        {/* Real Live Earnings & Bank Proof Screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-lg overflow-hidden group relative flex flex-col justify-between transition-all duration-350 hover:shadow-xl hover:-translate-y-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-50 border border-slate-100 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dwymt9xi4/image/upload/v1780818780/copy_of_restored_high_resolution_crhvgr.png"
                alt="Meta Creator Studio Payout Proof"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] md:text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 select-none">
                <Sparkles className="w-3 h-3 text-brand-orange animate-pulse" /> Verified Payout Statement
              </div>
            </div>
            <div className="mt-4 px-2">
              <h3 className="font-display font-black text-slate-900 text-base">Meta Earnings Credit Statement</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct monthly payouts transferred securely, showing consistent scale achieved through movie copy-paste systems.
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-brand-indigo font-bold">
                <a
                  href="https://res.cloudinary.com/dwymt9xi4/image/upload/v1780818780/copy_of_restored_high_resolution_crhvgr.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View Large Image &rarr;
                </a>
                <span className="text-emerald-600 font-black">Meta Partner Network</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-lg overflow-hidden group relative flex flex-col justify-between transition-all duration-350 hover:shadow-xl hover:-translate-y-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-50 border border-slate-100 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dwymt9xi4/image/upload/v1771002837/ChatGPT_Image_Feb_13_2026_10_31_33_PM_iatuye.png"
                alt="Creator Instream Dashboard Proof"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] md:text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 select-none">
                <Sparkles className="w-3 h-3 text-brand-orange animate-pulse" /> Live Creator Studio Metrics
              </div>
            </div>
            <div className="mt-4 px-2">
              <h3 className="font-display font-black text-slate-900 text-base">Instream Video Ad Revenue</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Real-time dashboard breakdown confirming high CPM and traffic multipliers on verified movie-short pages.
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-brand-indigo font-bold">
                <a
                  href="https://res.cloudinary.com/dwymt9xi4/image/upload/v1771002837/ChatGPT_Image_Feb_13_2026_10_31_33_PM_iatuye.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View Large Image &rarr;
                </a>
                <span className="text-emerald-600 font-black">Meta Creator Center</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
