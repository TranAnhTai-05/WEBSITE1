import { useState } from "react";
import { motion } from "motion/react";
import { platformsData } from "../data";
import { CheckCircle2, Star, ThumbsUp, ArrowUpRight } from "lucide-react";

export default function Platforms() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("wp");

  const currentPlatform = platformsData.find(p => p.id === selectedPlatform) || platformsData[0];

  return (
    <section id="platforms" className="py-24 relative bg-brand-dark overflow-hidden">
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full filter blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase bg-brand-purple/10 px-3.5 py-1.5 rounded-full">
            NỀN TẢNG THI CÔNG LINH HOẠT
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Hỗ trợ làm website trên nhiều nền tảng
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Tùy theo nhu cầu, ngân sách và mục tiêu sử dụng, tôi sẽ tư vấn nền tảng thích hợp nhất để bạn tiết kiệm chi phí tối đa mà vẫn giữ trọn vẹn hiệu năng mong đợi.
          </p>
        </div>

        {/* Dual column interactive container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Platforms buttons list */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 pl-2 mb-1">
              CHỌN NỀN TẢNG KHÁM PHÁ CHI TIẾT
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {platformsData.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setSelectedPlatform(pt.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                    selectedPlatform === pt.id
                      ? "bg-slate-900/60 border-cyan-500/50 shadow-md shadow-brand-cyan/5 text-white"
                      : "bg-white/3 border-white/5 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm tracking-wide">
                      {pt.name}
                    </span>
                    {selectedPlatform === pt.id && (
                      <span className="w-2 h-2 rounded-full bg-brand-cyan block animate-pulse" />
                    )}
                  </div>
                  <span className="block text-[11px] font-mono text-gray-500 mt-1 truncate">
                    {pt.bestFor}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: Active Platform highlight details card */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedPlatform}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-2xl glass-card p-8 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Abs decoration logo watermark */}
              <div className="absolute right-[-20px] bottom-[-20px] text-white/5 font-display font-extrabold text-9xl pointer-events-none select-none uppercase">
                {currentPlatform.id.slice(0, 3)}
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <span className="text-xs font-mono font-medium text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded">
                      PLATFORM SPEC SHEET
                    </span>
                    <h3 className="text-2.5xl font-display font-extrabold text-white mt-2">
                      {currentPlatform.name}
                    </h3>
                  </div>

                  {/* Level ratings */}
                  <div className="flex items-center gap-1 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 mr-2 uppercase">Lời khuyên sử dụng:</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          className={
                            s <= currentPlatform.popularity
                              ? "text-brand-accent fill-brand-accent"
                              : "text-slate-700"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary summary describing */}
                <p className="text-base text-slate-300 leading-relaxed">
                  {currentPlatform.description}
                </p>

                {/* Specific features matches bullet */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-brand-cyan/10 text-brand-cyan shrink-0 mt-0.5">
                      <ThumbsUp size={14} />
                    </div>
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-wide text-slate-400">
                        Phân khúc phù hợp nhất:
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {currentPlatform.bestFor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-wide text-slate-400">
                        Ưu điểm nổi bật khi thi công:
                      </span>
                      <span className="text-sm text-slate-300">
                        {currentPlatform.id === "wp" && "Vận hành đa chức năng lâu dài, tối ưu cấu trúc schema Google SEO chuẩn chỉ tuyệt đối."}
                        {currentPlatform.id === "gs" && "0 đồng tiền dịch vụ server lưu trữ hàng năm từ Google Cloud. Đăng nhập Gmail là tự quản lý được."}
                        {currentPlatform.id === "shopify" && "Trải nghiệm thanh toán nhanh cho thị trường toàn cầu. Khả năng bảo mật thông tin chuẩn PCI DSS."}
                        {currentPlatform.id === "wix" && "Tự do sáng tạo giao diện bằng công nghệ kéo kéo thả không hạn chế tư duy đồ họa."}
                        {currentPlatform.id === "harasapo" && "Hệ sinh thái thanh toán Momo/VNPay nội địa Việt Nam, đồng bộ thông suốt Zalo ZNS."}
                        {currentPlatform.id === "ldp" && "Tuyệt vời để chốt đơn ngay. Gửi dữ liệu về Google Sheet, Telegram hay CRM trong 0.5 giây."}
                        {currentPlatform.id === "webflow" && "Trình diễn diễn mượt các layout lồi lõm, tạo hiệu ứng thị động tuyệt mĩ thu hút người giàu."}
                        {currentPlatform.id === "custom" && "Không giới hạn về mặt tư duy. Hiệu suất tối tân, mượt mà và mở rộng hệ thống CRM/ERP sau này."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>* Hoàn toàn đồng bộ tên miền .vn / .com của bạn</span>
                <span className="flex items-center gap-1 text-brand-cyan hover:underline cursor-pointer">
                  Nhận tư vấn platform <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
