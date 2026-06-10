import { motion } from "motion/react";
import { benefitsData } from "../data";
import LucideIcon from "./LucideIcon";
import { Gauge, ShieldCheck, HelpCircle } from "lucide-react";

export default function Benefits() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="benefits" className="py-24 relative bg-brand-navy/20 border-t border-white/5 overflow-hidden">
      {/* Background soft lighting pods */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual data card agency style */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full">
              GIÁ TRỊ KINH DOANH VƯỢT TRỘI
            </span>
            <h2 className="text-3.5xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Vì sao nên làm website ngay hôm nay?
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Trang web không đơn giản là một trang tin tức, nó chính là **tài sản số có giá trị tăng trưởng vô hạn** của riêng bạn. Đầu tư một lần, sinh lời suốt 24/7 không quản ngày nghỉ lễ.
            </p>

            {/* Premium aesthetic trust metrics panel */}
            <div className="p-6 rounded-2xl glass-card space-y-5 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-[0px] right-[0px] h-24 w-24 bg-brand-cyan/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="h-10 w-10 rounded-xl bg-brand-cyan/15 flex items-center justify-center text-brand-cyan font-mono font-bold text-sm">
                  85%
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Độ Tin Cậy Thương Hiệu</h4>
                  <p className="text-sm text-gray-300 font-semibold mt-0.5">Khách hàng tin tưởng hơn có tên miền riêng</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="h-10 w-10 rounded-xl bg-brand-purple/15 flex items-center justify-center text-brand-purple font-mono font-bold text-sm">
                  100%
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Chủ Động Làm Chủ</h4>
                  <p className="text-sm text-gray-300 font-semibold mt-0.5">Không bị phụ thuộc luật quét toán khoản MXH</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                  24/7
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Luồng Lead Đổ Về</h4>
                  <p className="text-sm text-gray-300 font-semibold mt-0.5">Cửa hàng trực tuyến đón khách muôn nơi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 9 Specific Benefits list */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {benefitsData.map((benefit) => (
                <motion.div
                  key={benefit.id}
                  variants={itemVariants}
                  className="p-5 rounded-2xl glass-card hover:bg-slate-900/20 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-800 text-brand-purple group-hover:bg-brand-purple/20 group-hover:text-brand-purple flex items-center justify-center transition-colors">
                      <LucideIcon name={benefit.iconName} className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
