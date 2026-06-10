import { motion } from "motion/react";
import { ArrowRight, Laptop, Sparkles, Code2, Globe, TrendingUp, CheckCircle, Database } from "lucide-react";

interface HeroProps {
  onQuoteClick: () => void;
  onExploreTemplatesClick: () => void;
}

export default function Hero({ onQuoteClick, onExploreTemplatesClick }: HeroProps) {
  const supportedPlatforms = [
    { name: "WordPress", color: "text-sky-400 border-sky-400/20 bg-sky-950/20" },
    { name: "Google Sites", color: "text-amber-400 border-amber-400/20 bg-amber-950/20" },
    { name: "Shopify", color: "text-emerald-400 border-emerald-400/20 bg-emerald-950/20" },
    { name: "Wix", color: "text-indigo-400 border-indigo-400/20 bg-indigo-950/20" },
    { name: "Ladipage", color: "text-rose-400 border-rose-400/20 bg-rose-950/20" },
    { name: "Haravan / Sapo", color: "text-blue-400 border-blue-400/20 bg-blue-950/20" },
    { name: "Webflow", color: "text-cyan-400 border-cyan-400/20 bg-cyan-950/20" }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-32 pb-24 overflow-hidden flex items-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black grid-bg"
    >
      {/* Background radial glowing ambient pods */}
      <div className="absolute top-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-cyan/20 rounded-full filter blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-500/10 rounded-full filter blur-[120px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Floating abstract decorative icons (Anti-AI-slop layout - clean vector shapes) */}
      <div className="hidden lg:block absolute top-[18%] right-[48%] h-8 w-8 text-brand-purple/40 animate-float-slow">
        <Sparkles size={32} />
      </div>
      <div className="hidden lg:block absolute bottom-[22%] left-[8%] h-10 w-10 text-brand-cyan/30 animate-float">
        <Code2 size={40} />
      </div>
      <div className="hidden lg:block absolute top-[40%] left-[45%] h-6 w-6 text-indigo-500/30 animate-float-delayed">
        <Globe size={24} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero text presentation */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-brand-cyan text-xs font-mono font-bold uppercase tracking-widest mb-6 w-fit"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
              Dịch vụ thiết kế chuyên nghiệp
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6.5xl font-display font-extrabold tracking-tight text-white leading-tight"
            >
              Thiết kế website <span className="gradient-text font-extrabold">Xịn xò &amp; Cao cấp</span> cho doanh nghiệp
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl"
            >
              Bạn cần website? Tôi giúp bạn sở hữu trang web đẹp, nhanh, chuẩn SEO và dễ quản lý trên đa nền tảng: WordPress, Shopify, LadiPage, Webflow...
            </motion.p>

            {/* CTA action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl glow-button transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
              >
                Tư vấn miễn phí
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={onExploreTemplatesClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 hover:text-slate-950 transition-all duration-200 cursor-pointer"
              >
                Khám phá mẫu web
              </button>
            </motion.div>

            {/* Platform badges tags list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-white/10"
            >
              <span className="block text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-3.5">
                NỀN TẢNG HỖ TRỢ HOÀN HẢO
              </span>
              <div className="flex flex-wrap gap-2">
                {supportedPlatforms.map((pt, i) => (
                  <span
                    key={i}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${pt.color}`}
                  >
                    {pt.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Large dynamic mockup presentation with cards */}
          <div className="lg:col-span-5 h-[360px] sm:h-[480px] lg:h-[500px] relative mt-10 lg:mt-0 flex items-center justify-center">
            
            {/* Core Device Mockup Space */}
            <div className="relative w-[340px] sm:w-[420px] aspect-[4/3] bg-gradient-to-br from-indigo-950/40 to-slate-900/60 p-4 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-sm animate-float">
              
              {/* Fake coding mockup inside */}
              <div className="w-full h-full bg-slate-950/80 rounded-lg overflow-hidden flex flex-col font-mono text-[10px] text-gray-400">
                
                {/* Simulated URL bar and browser actions */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block" />
                  </div>
                  <div className="px-3 py-0.5 bg-black/40 rounded text-[9px] text-brand-cyan/80 w-44 text-center truncate">
                    https://my-store.vn/demo
                  </div>
                  <div className="w-6" />
                </div>

                {/* Simulated live visual dashboard */}
                <div className="flex-1 p-3 space-y-3 overflow-hidden text-slate-300">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="font-display font-medium text-xs text-white">Dashboard Cửa Hàng</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] font-semibold uppercase animate-pulse">
                      ● LIVE NOW
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900 p-2 border border-white/5 rounded flex flex-col justify-between h-14">
                      <span className="text-[8px] text-slate-400">DOANH THU THÁNG</span>
                      <span className="font-display font-semibold text-sm text-brand-cyan">+48,250,000₫</span>
                    </div>
                    <div className="bg-slate-900 p-2 border border-white/5 rounded flex flex-col justify-between h-14">
                      <span className="text-[8px] text-slate-400">KHÁCH ĐĂNG KÝ LEAD</span>
                      <span className="font-display font-semibold text-sm text-brand-purple">214 Khách hàng</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-2 border border-white/5 rounded space-y-1.5">
                    <span className="text-[8px] text-slate-400 block uppercase">Tiến Độ Tối Ưu Tốc Độ</span>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-cyan to-brand-purple h-full w-[96%]" />
                    </div>
                    <div className="flex justify-between items-center text-[8px] text-slate-300">
                      <span>Tốc độ phản hồi Mobile</span>
                      <span className="text-brand-cyan">98/100 (Cực tốt)</span>
                    </div>
                  </div>

                  {/* Sample items inside code simulation */}
                  <div className="text-[9px] text-slate-500 border-t border-white/5 pt-2">
                    <p className="text-brand-cyan">{"const website = {"}</p>
                    <p className="pl-3 text-slate-400">design: <span className="text-amber-400">"Modern"</span>,</p>
                    <p className="pl-3 text-slate-400">seoReady: <span className="text-emerald-400">true</span>,</p>
                    <p className="pl-3 text-slate-400 font-bold">responsive: <span className="text-emerald-400">"100%"</span></p>
                    <p className="text-brand-cyan">{"};"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flying Widget Card 1: Beautiful interactive review stat */}
            <div className="absolute top-[-5px] right-[-10px] sm:right-6 bg-slate-950/90 border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-md w-36 animate-float-delayed">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400">Tỷ lệ chuyển đổi</span>
                  <span className="block text-xs font-bold text-white">+240%</span>
                </div>
              </div>
            </div>

            {/* Flying Widget Card 2: Zalo Mockup Notification */}
            <div className="absolute bottom-[35px] left-[-15px] sm:left-4 bg-slate-950/90 border border-emerald-500/20 rounded-xl p-3 shadow-xl backdrop-blur-md w-40 animate-float">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400-500 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[8px] text-slate-400">Lead nhận từ Form</span>
                  <span className="block text-[9.5px] font-semibold text-white truncate">Nguyễn Hữu Trí</span>
                  <span className="block text-[8px] text-slate-400 truncate font-mono">0982-xxx-312</span>
                </div>
              </div>
            </div>

            {/* Flying Widget Card 3: Database SEO indicator */}
            <div className="absolute top-1/2 right-[-20px] sm:right-0 bg-slate-950/90 border border-brand-purple/20 rounded-xl p-2.5 shadow-xl backdrop-blur-md w-32 animate-float-slow">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase">Chuẩn tối ưu SEO</span>
                  <span className="block text-[10px] font-bold text-brand-purple">Google Rank S+</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
