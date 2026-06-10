import { Phone, MessageCircle, Mail, MapPin, Sparkles, Facebook, ArrowUp } from "lucide-react";
import { ContactSettings } from "../types";

interface FooterProps {
  onFreeConsultScroll: () => void;
  contactSettings?: ContactSettings | null;
  footerCtaTitle?: string;
}

export default function Footer({ onFreeConsultScroll, contactSettings, footerCtaTitle }: FooterProps) {
  const hotlineValue = contactSettings?.hotline || "0982555312";
  const zaloValue = contactSettings?.zalo || "0982555312";
  const emailValue = contactSettings?.email || "contact@wesign.vn";
  const addressValue = contactSettings?.address || "Phân khu Origami, Vinhomes Grand Park, Thủ Đức, Thành phố Hồ Chí Minh";
  const brandNameValue = contactSettings?.brandName || "WESIGN STUDIO";
  const footerTextValue = contactSettings?.footerText || "Chuyên thiết kế website cho cá nhân, cửa hàng, trung tâm đào tạo, spa, nhà hàng và doanh nghiệp nhỏ. Đảm bảm các tiêu chí thẩm mỹ tối tân, tốc độ vượt trội và chuẩn chỉnh trên smartphone.";
  const ctaTitleValue = footerCtaTitle || "Bạn đang cần một website cho công việc kinh doanh?";

  const triggerZalo = () => {
    const sanitizedZalo = zaloValue.replace(/\./g, "").replace(/\s/g, "");
    const link = zaloValue.startsWith("http") ? zaloValue : `https://zalo.me/${sanitizedZalo}`;
    window.open(link, "_blank", "referrer");
  };

  const triggerCall = () => {
    window.location.href = `tel:${hotlineValue.replace(/\./g, "").replace(/\s/g, "")}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative bg-brand-dark overflow-hidden pt-20 border-t border-white/5">
      
      {/* SECTION 11: Call to Action block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 glass-card border-amber-500/20 overflow-hidden text-center max-w-5xl mx-auto">
          {/* Subtle background overlay circles */}
          <div className="absolute top-[-50%] left-[-20%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-cyan/10 rounded-full filter blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-500/10 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-[11px] font-mono font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 px-3.5 py-1.5 rounded-full uppercase inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Kiến Tạo Giá Trị Số Độc Bản
            </span>
            
            <h2 className="text-2.5xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
              {ctaTitleValue}
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Đừng để mất thêm những khách hàng tiềm năng quý báu vào tay các đối thủ cạnh tranh có sự đầu tư bài bản hơn. Hãy liên hệ ngay hôm nay để nhận tư vấn giải pháp tối ưu và phương án triển khai siêu tốc nhất!
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4.5 pt-5 max-w-lg mx-auto">
              <button
                onClick={triggerZalo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 glow-button transition-all duration-300 cursor-pointer animate-pulse"
              >
                <MessageCircle size={16} />
                Liên hệ Zalo ngay
              </button>
              
              <button
                onClick={onFreeConsultScroll}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                Gửi yêu cầu tư vấn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 12: Footer Brand and links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5 relative z-10 text-[13px] sm:text-sm text-slate-400 bg-black/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand description panel */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-purple p-0.5">
                <div className="h-full w-full bg-brand-dark rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                </div>
              </div>
              <span className="font-display font-extrabold text-white tracking-widest uppercase">
                {brandNameValue}
              </span>
            </div>

            <p className="leading-relaxed text-slate-400 max-w-sm">
              {footerTextValue}
            </p>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {brandNameValue}. Quyền sở hữu trí tuệ và bảo hộ thương hiệu toàn cầu.
            </p>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-[#94a3b8]">
              Nơi thi công
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#services" className="hover:text-brand-cyan transition-colors">Tối ưu chuẩn Google SEO</a></li>
              <li><a href="#pricing" className="hover:text-brand-cyan transition-colors">Bản thiết kế Landing Page</a></li>
              <li><a href="#platforms" className="hover:text-brand-cyan transition-colors">Thiết lập WooCommerce / Shopify</a></li>
              <li><a href="#process" className="hover:text-brand-cyan transition-colors">Hướng dẫn tự cập nhật kéo thả</a></li>
            </ul>
          </div>

          {/* Col 3: Contacts info */}
          <div className="md:col-span-4 space-y-4.5">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-[#94a3b8]">
              Thông tin liên hệ
            </h4>
            
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-mono text-slate-500 uppercase leading-none mb-1">Hotline / Zalo:</span>
                  <a href={`tel:${hotlineValue}`} className="text-white font-semibold hover:text-brand-cyan">{hotlineValue}</a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-mono text-slate-500 uppercase leading-none mb-1">Thư điện tử:</span>
                  <a href={`mailto:${emailValue}`} className="text-slate-300 font-medium hover:text-brand-purple">{emailValue}</a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-mono text-slate-500 uppercase leading-none mb-1">Trụ sở làm việc:</span>
                  <span className="text-slate-300">{addressValue}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Scroll back to top control bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <span>* Hỗ trợ và cam kết đồng hành đồng suốt vòng đời website</span>
          
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-brand-cyan border border-white/5 transition-all flex items-center gap-1 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Lên đầu trang</span>
            <ArrowUp size={12} className="animate-pulse" />
          </button>
        </div>
      </div>

    </footer>
  );
}
