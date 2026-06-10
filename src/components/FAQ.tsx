import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fagsData } from "../data";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq1");

  return (
    <section id="faq" className="py-24 relative bg-brand-dark overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-brand-purple/5 rounded-full filter blur-[125px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase bg-brand-purple/10 px-3.5 py-1.5 rounded-full">
            GIẢI ĐÁP TOÀN DIỆN
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Dưới đây là lời giải đáp khách quan cho những thắc mắc phổ biến nhất từ khách hàng khi bắt đầu lên kế hoạch xây dựng giải pháp website riêng biệt.
          </p>
        </div>

        {/* Accordions List space */}
        <div className="space-y-4">
          {fagsData.map((faq) => {
            const isOpen = faq.id === openId;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-slate-900 border-brand-cyan/30 shadow-lg shadow-brand-cyan/2"
                    : "bg-slate-900/40 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Trigger heading button */}
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5.5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 rounded-lg p-1.5 shrink-0 transition-colors ${isOpen ? "bg-brand-cyan/15 text-brand-cyan" : "bg-slate-800 text-slate-400"}`}>
                      <HelpCircle size={15} />
                    </div>
                    <span className={`text-sm sm:text-base font-display font-bold leading-normal transition-colors ${isOpen ? "text-brand-cyan" : "text-white group-hover:text-brand-cyan"}`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* Collapse sign icon */}
                  <div className={`p-1.5 rounded-full bg-slate-800/80 text-slate-300 ml-4 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-brand-cyan" : ""}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>

                {/* Expanding panel answer spacing */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-14 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct chat call guidance bottom badge */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3 bg-slate-900/30 border border-white/5 rounded-2xl p-4.5">
          <MessageCircle className="text-brand-cyan w-5 h-5 animate-pulse" />
          <span className="text-xs sm:text-sm text-slate-400">
            Bạn có câu hỏi chuyên biệt chưa tìm thấy lời giải đáp ở đây?
          </span>
          <a
            href="#contact"
            className="text-xs sm:text-sm text-brand-cyan hover:underline font-semibold"
          >
            Nhắn tin trao đổi trực tiếp với tôi ngay →
          </a>
        </div>

      </div>
    </section>
  );
}
