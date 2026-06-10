import { motion } from "motion/react";
import { pricingTiers } from "../data";
import { Check, Flame, MessageCircle, Calendar } from "lucide-react";

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
}

export default function Pricing({ onSelectPackage }: PricingProps) {
  return (
    <section id="pricing" className="py-24 relative bg-brand-dark overflow-hidden">
      {/* Background decoration blur glow elements */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase bg-brand-purple/10 px-3.5 py-1.5 rounded-full">
            BẢNG GIÁ MINH BẠCH • TIẾT KIỆM
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Gói dịch vụ tham khảo
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Chi phí tối thiểu cho lợi tức tối đa. Lựa chọn gói thiết bị thích hợp nhất với mô hình kinh doanh của bạn. Có thiết kế theo yêu cầu riêng.
          </p>
        </div>

        {/* Pricing Cards Grid - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingTiers.map((tier) => {
            const isPopular = tier.isPopular;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? "bg-slate-900 border-2 border-amber-500 glow-button scale-102 z-10"
                    : "glass-card hover:bg-slate-900/20 shadow-sm"
                }`}
              >
                {/* Popularity Badge highlight over middle card */}
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-950 text-[10px] font-bold font-mono tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md shadow-brand-accent/20">
                    <Flame size={12} className="fill-slate-950 animate-bounce" />
                    BÁN CHẠY NHẤT
                  </div>
                )}

                {/* Card header metadata */}
                <div className="p-8 pb-0">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                    {tier.name}
                  </span>
                  
                  <div className="mt-4 flex items-baseline gap-1 text-white">
                    <span className="text-3xl sm:text-4.5xl font-display font-extrabold tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">₫</span>
                  </div>
                  
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="mt-5 pb-5 border-b border-white/5 flex items-center gap-2 text-xs text-brand-cyan font-mono font-semibold">
                    <Calendar size={13} />
                    <span>Thời gian hoàn thiện: {tier.deliveryTime}</span>
                  </div>
                </div>

                {/* Features checklists list */}
                <div className="px-8 py-6 flex-1">
                  <ul className="space-y-3.5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 text-xs sm:text-sm text-slate-300">
                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${isPopular ? "bg-brand-cyan/20 text-brand-cyan" : "bg-slate-800 text-slate-400"}`}>
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <span className="leading-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Booking Button */}
                <div className="p-8 pt-0">
                  <button
                    onClick={() => onSelectPackage(tier.name)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isPopular
                        ? "bg-amber-500 hover:bg-amber-400 text-slate-950 glow-button"
                        : "bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Chọn gói này ngay
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing disclaimer notes */}
        <div className="max-w-3xl mx-auto text-center mt-12 glass-card rounded-xl p-4.5">
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            <span className="font-semibold text-white">Ghi chú quan trọng:</span> Chi phí thực tế có thể linh động phụ thuộc vào quy mô số trang, nền tảng sử dụng, khối lượng bài viết mẫu cần nhập, tính năng giỏ hàng nâng cao hoặc yêu cầu cấu trúc đồ họa đặc thù. Liên hệ với tôi để nhận được báo phí chính xác và tối ưu nhất!
          </p>
        </div>

      </div>
    </section>
  );
}
