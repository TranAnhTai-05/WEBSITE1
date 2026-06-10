import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import { ContactSettings } from "../types";

interface FloatingWidgetsProps {
  contactSettings?: ContactSettings | null;
}

export default function FloatingWidgets({ contactSettings }: FloatingWidgetsProps) {
  const hotlineValue = contactSettings?.hotline || "0982555312";
  const zaloValue = contactSettings?.zalo || "0982555312";

  const triggerPhoneDial = () => {
    window.location.href = `tel:${hotlineValue.replace(/\./g, "").replace(/\s/g, "")}`;
  };

  const triggerZaloChat = () => {
    const sanitizedZalo = zaloValue.replace(/\./g, "").replace(/\s/g, "");
    const link = zaloValue.startsWith("http") ? zaloValue : `https://zalo.me/${sanitizedZalo}`;
    window.open(link, "_blank", "referrer");
  };

  // Format hotline strictly for display (e.g. "0982.555.312")
  const formattedHotline = hotlineValue;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 pointer-events-none">
      
      {/* Phone call ringing widget */}
      <div className="flex items-center gap-2.5 justify-end pointer-events-auto">
        <span className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-[11px] font-semibold text-white tracking-wide shadow-md backdrop-blur-xs select-none">
          Gọi điện ngay: {formattedHotline}
        </span>
        <button
          onClick={triggerPhoneDial}
          className="h-13 w-13 rounded-full bg-brand-accent text-slate-950 flex items-center justify-center shadow-lg shadow-brand-accent/30 hover:shadow-brand-accent/50 hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer"
          aria-label="Call hotline"
        >
          {/* Pulsing soundwaves behind */}
          <span className="absolute inset-0 rounded-full bg-brand-accent/40 animate-ping" />
          <Phone className="w-5.5 h-5.5 relative z-10 group-hover:rotate-12 transition-transform duration-200" />
        </button>
      </div>

      {/* Zalo chat flashing widget */}
      <div className="flex items-center gap-2.5 justify-end pointer-events-auto">
        <span className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-[11px] font-semibold text-brand-cyan tracking-wide shadow-md backdrop-blur-xs select-none">
          Zalo Chat Tư Vấn 24/7
        </span>
        <button
          onClick={triggerZaloChat}
          className="h-13 w-13 rounded-full bg-gradient-to-tr from-brand-cyan to-sky-400 text-slate-950 flex items-center justify-center shadow-lg shadow-brand-cyan/20 hover:shadow-brand-cyan/40 hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer"
          aria-label="Chat Zalo"
        >
          {/* Pulsing rings behind */}
          <span className="absolute inset-0 rounded-full bg-brand-cyan/30 animate-ping" style={{ animationDelay: '1s' }} />
          <MessageCircle className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </div>
  );
}
