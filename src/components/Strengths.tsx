import { motion } from "motion/react";
import { strengthsData } from "../data";
import { Check, ShieldCheck, Heart, ArrowUpRight, PlayCircle } from "lucide-react";

export default function Strengths() {
  return (
    <section id="strengths" className="py-24 relative bg-brand-dark overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-60 bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with high-end style */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full">
            AN TÂM TUYỆT ĐỐI • KHÔNG LO CÔNG NGHỆ
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Dịch vụ tuyệt vời cho người không rành công nghệ
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Bạn không cần có kiến thức lập trình, chẳng cần biết thiết kế đồ họa. Tôi sẽ đồng hành trọn gói từ lúc lên ý tưởng sơ khởi cho tới khi bàn giao website hoàn thiện.
          </p>
        </div>

        {/* Layout details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Descriptive friendly text and support stats */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2.5xl font-display font-extrabold text-white">
              Đồng hành cầm tay chỉ việc từ A - Z
            </h3>
            <p className="text-base text-slate-300 leading-relaxed">
              Rất nhiều khách hàng ban đầu lo nghĩ rằng tự cập nhật bài viết hay đổi số điện thoại trên web sẽ khó nhằn. Hãy yên tâm! Trình quản trị website được tối ưu hóa trực quan như việc soạn một đoạn tin nhắn Zalo thông thường. 
            </p>
            <p className="text-base text-slate-300 leading-relaxed">
              Tôi cam kết cung cấp tài liệu hướng dẫn độc quyền dạng video quay chậm từng thao tác, giúp bạn, nhân viên hay học viên của mình dễ dàng tự vận hành trôi chảy chỉ sau 15 phút.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl glass-card">
                <span className="block text-2xl font-display font-extrabold text-brand-cyan">01 Tháng</span>
                <span className="block text-xs text-slate-400 mt-1 uppercase font-mono">Bảo hành hiển thị free</span>
              </div>
              <div className="p-4 rounded-xl glass-card">
                <span className="block text-2xl font-display font-extrabold text-brand-purple">100% Client</span>
                <span className="block text-xs text-slate-400 mt-1 uppercase font-mono">Tự làm chủ hoàn toàn</span>
              </div>
            </div>

            {/* Interactive Badge indicator */}
            <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-brand-cyan/5 border border-brand-cyan/10 text-brand-cyan text-sm sm:text-base">
              <Heart className="w-5 h-5 text-brand-cyan fill-brand-cyan/20 shrink-0" />
              <span>Chăm sóc tận tâm, giải thích mọi thắc mắc dễ nghe.</span>
            </div>
          </div>

          {/* Right panel: Strengths points checklist grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengthsData.map((st, i) => (
                <div 
                  key={st.id}
                  className="p-5 rounded-xl glass-card hover:border-cyan-500/30 transition-all duration-300 flex items-start gap-3 group"
                >
                  <div className="p-1 rounded-full bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-black transition-colors shrink-0 mt-0.5">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors">
                      {st.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
