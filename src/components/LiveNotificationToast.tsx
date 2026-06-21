import { useState, useEffect } from "react";
import { Check, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
  name: string;
  city: string;
  action: string;
  time: string;
}

const mockNotifications: Notification[] = [
  { name: "Suresh Patel", city: "Ahmedabad", action: "claimed Preset Kit!", time: "2m ago" },
  { name: "Rahul Jha", city: "Bihar", action: "registered for webinar!", time: "1m ago" },
  { name: "Priya Sen", city: "Kolkata", action: "unlocked FB Instream Bonus!", time: "Just now" },
  { name: "Anil Deshmukh", city: "Nagpur", action: "completed booking!", time: "4m ago" },
  { name: "Swati Verma", city: "Gorakhpur", action: "joined VIP Group!", time: "Just now" },
  { name: "Vikram Rathore", city: "Udaipur", action: "downloaded Asset Vault!", time: "3m ago" },
  { name: "Nitin Kumar", city: "Ranchi", action: "earned ₹12k last week!", time: "Just now" },
];

export function LiveNotificationToast() {
  const [current, setCurrent] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    // Show first notice after 3 seconds
    const initialTimeout = setTimeout(() => {
      showNextNotification();
    }, 3000);

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        showNextNotification();
      }, 600); // Wait for transition out before swapping content
    }, 9000); // Swap every 9 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const showNextNotification = () => {
    const randomIndex = Math.floor(Math.random() * mockNotifications.length);
    setCurrent(mockNotifications[randomIndex]);
    setIsVisible(true);
    setDragDirection(null);
  };

  if (!current) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={`${current.name}-${current.city}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDrag={(_, info) => {
            if (info.offset.x > 20) {
              setDragDirection("right");
            } else if (info.offset.x < -20) {
              setDragDirection("left");
            }
          }}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 300) {
              setIsVisible(false);
            } else {
              setDragDirection(null);
            }
          }}
          initial={{ opacity: 0, y: 50, scale: 0.9, x: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ 
            opacity: 0, 
            x: dragDirection === "left" ? -180 : dragDirection === "right" ? 180 : -100, 
            scale: 0.9, 
            transition: { duration: 0.2 } 
          }}
          className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-40 w-[230px] xs:w-[250px] md:w-[270px] bg-white/95 backdrop-blur-md border border-slate-200/90 p-2 md:p-2.5 rounded-xl shadow-xl flex items-center gap-2 md:gap-2.5 cursor-grab active:cursor-grabbing select-none hover:bg-slate-50/98 transition-colors duration-150"
        >
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-indigo-50 border border-brand-indigo/15 flex items-center justify-center text-brand-indigo flex-shrink-0 animate-pulse">
            <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-indigo" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[8px] md:text-[9px] text-brand-indigo font-black flex items-center gap-1 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo inline-block animate-ping"></span> Live Proof
            </p>
            <p className="text-[10px] md:text-[11px] text-slate-700 mt-0.5 leading-tight font-medium">
              <strong className="text-slate-900 font-extrabold">{current.name}</strong> <span className="text-slate-400 font-bold">({current.city})</span>{" "}
              <span className="text-slate-500 font-semibold text-[9.5px] md:text-[10px]">{current.action}</span>
            </p>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[8px] md:text-[9px] text-emerald-600 font-mono font-bold">
                ✓ {current.time}
              </span>
              <span className="text-[7.5px] text-slate-400 font-medium italic select-none">
                Slide off to close →
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors self-start cursor-pointer transition-transform hover:scale-115"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
