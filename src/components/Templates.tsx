import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { templatesData } from "../data";
import { ArrowUpRight, Grid, LayoutList, Heart, Sparkles } from "lucide-react";

interface TemplatesProps {
  onSelectTemplate: (templateTitle: string) => void;
}

export default function Templates({ onSelectTemplate }: TemplatesProps) {
  const [filter, setFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: "Tất cả mẫu" },
    { id: "enterprise", label: "Doanh nghiệp" },
    { id: "ecommerce", label: "Bán hàng online" },
    { id: "landing", label: "Landing Page" },
    { id: "personal", label: "Cá nhân / Đào tạo" }
  ];

  // Helper matching state
  const filteredTemplates = templatesData.filter((t) => {
    if (filter === "all") return true;
    if (filter === "personal") return t.category === "personal" || t.category === "booking";
    return t.category === filter;
  });

  return (
    <section id="templates" className="py-24 relative bg-brand-navy/30 border-y border-white/5">
      {/* Visual lighting dots */}
      <div className="absolute top-[40%] right-[15%] w-[450px] h-[450px] bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full">
            KHO GIAO DIỆN MẪU XỊN XÒ
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Một số kiểu website có thể triển khai
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Tuyển tập các giao diện website tinh khiết, hiện đại và chuẩn mực. Có thể tùy chỉnh màu sắc, logo hay cấu trúc các khối kéo thả theo sở thích cụ thể.
          </p>
        </div>

        {/* Dynamic Category Filters Swiper/Row */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                filter === opt.id
                  ? "bg-amber-500 text-slate-950 font-bold glow-button scale-102"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Templates Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((tp) => (
              <motion.div
                layout
                key={tp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group rounded-2xl glass-card hover:border-cyan-500/55 overflow-hidden flex flex-col justify-between shadow-lg relative cursor-pointer"
                onClick={() => onSelectTemplate(tp.title)}
              >
                <div>
                  {/* Card mockup header image aspect with overlay hover */}
                  <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                    <img
                      src={tp.imageUrl}
                      alt={tp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    
                    {/* Dark gradient blur covering */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Overlay interaction card */}
                    <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                      <div className="p-2.5 rounded-full bg-amber-500 text-slate-950 mb-3.5 shadow-md shadow-brand-accent/25 animate-bounce">
                        <ArrowUpRight size={18} className="stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        ĐĂNG KÝ MẪU NÀY
                      </span>
                      <p className="text-[11px] text-slate-300 mt-1 pl-2 pr-2">
                        Bấm để pre-fill thông tin mẫu vào form liên hệ
                      </p>
                    </div>

                    {/* Platform Badge overlay tag */}
                    <span className="absolute top-3 left-3 bg-slate-950/90 border border-white/10 text-brand-cyan text-[10px] font-semibold font-mono tracking-wide px-2.5 py-1 rounded-md shadow-md">
                      {tp.platform}
                    </span>
                  </div>

                  {/* Card metadata body */}
                  <div className="p-5">
                    <span className="text-[10px] font-mono font-bold uppercase text-brand-purple bg-brand-purple/10 px-2.5 py-0.5 rounded border border-brand-purple/20">
                      {tp.categoryLabel}
                    </span>
                    <h3 className="text-sm sm:text-base font-display font-extrabold text-white mt-3 group-hover:text-brand-cyan transition-colors line-clamp-2">
                      {tp.title}
                    </h3>
                    
                    {/* Mockup bullets bullet points */}
                    <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3.5">
                      {tp.features.map((feat, index) => (
                        <li key={index} className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card footer select button mockup */}
                <div className="p-5 pt-0">
                  <div className="w-full py-2.5 px-3 rounded-lg bg-slate-950 border border-white/5 text-[11px] font-mono text-center text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-transparent transition-all duration-300 font-bold">
                    SỬ DỤNG GIAO DIỆN NÀY
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
