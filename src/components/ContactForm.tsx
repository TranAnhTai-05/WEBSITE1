import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Smartphone, User, FileText, ChevronDown, Clock, HelpCircle, X, ShieldCheck } from "lucide-react";
import { ContactSubmission } from "../types";

interface ContactFormProps {
  prefilledNeed: string;
  onClearPrefill: () => void;
  onSubmissionSuccess?: () => void;
}

export default function ContactForm({ prefilledNeed, onClearPrefill, onSubmissionSuccess }: ContactFormProps) {
  // Primary state form
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [needs, setNeeds] = useState("Website Doanh nghiệp");
  const [notes, setNotes] = useState("");
  
  // Validation feedback
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState<ContactSubmission | null>(null);
  
  // Local submission log from this browser
  const [localSubmissions, setLocalSubmissions] = useState<ContactSubmission[]>([]);

  const needOptions = [
    "Website Doanh nghiệp",
    "Cửa hàng & Bán hàng Online",
    "Landing Page Quảng cáo",
    "Bất động sản / Dự án",
    "Nhà hàng & Quán Cà phê",
    "Spa & Viện Thẩm Mỹ",
    "Trung tâm Đào tạo & Khóa học",
    "Thương hiệu Cá nhân / Portfolio",
    "Yêu cầu đặc thù riêng..."
  ];

  // Dynamic bind if prefilled selected from app parent
  useEffect(() => {
    if (prefilledNeed) {
      // Try to find matching option or set exact value
      const found = needOptions.find(opt => 
        opt.toLowerCase().includes(prefilledNeed.toLowerCase()) || 
        prefilledNeed.toLowerCase().includes(opt.toLowerCase())
      );
      if (found) {
        setNeeds(found);
      } else {
        setNeeds(prefilledNeed);
      }
    }
  }, [prefilledNeed]);

  // Read historic submissions on component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wesign_contact_submissions");
      if (stored) {
        setLocalSubmissions(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading localStorage submissions", e);
    }
  }, [showSuccessModal]);

  const validate = () => {
    const newErrors: { fullName?: string; phone?: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên của bạn.";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Họ tên quá ngắn, vui lòng nhập đầy đủ.";
    }

    const vnPhoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phone.trim()) {
      newErrors.phone = "Vui lòng điền số điện thoại liên hệ.";
    } else if (!vnPhoneRegex.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Số điện thoại không đúng định dạng Việt Nam (ví dụ: 0982xxxxxx).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Simulate network delay to make it feel premium and genuine
    setTimeout(() => {
      const subId = "WSN-" + Math.floor(100000 + Math.random() * 900000);
      const newSubmission: ContactSubmission = {
        id: subId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        needs: needs,
        notes: notes.trim() || undefined,
        createdAt: new Date().toISOString(),
        status: "pending"
      };

      // Save submissions list to local storage
      try {
        const stored = localStorage.getItem("wesign_contact_submissions");
        const list: ContactSubmission[] = stored ? JSON.parse(stored) : [];
        const updatedList = [newSubmission, ...list];
        localStorage.setItem("wesign_contact_submissions", JSON.stringify(updatedList));
        setLocalSubmissions(updatedList);
        if (onSubmissionSuccess) {
          onSubmissionSuccess();
        }
      } catch (e) {
        console.error("Failed to save submission", e);
      }

      setLatestSubmission(newSubmission);
      setSubmitting(false);
      setShowSuccessModal(true);

      // Clear current inputs
      setFullName("");
      setPhone("");
      setNotes("");
      onClearPrefill();
    }, 1200);
  };

  const handleRemoveHistoryItem = (id: string) => {
    try {
      const updated = localSubmissions.filter(sub => sub.id !== id);
      localStorage.setItem("wesign_contact_submissions", JSON.stringify(updated));
      setLocalSubmissions(updated);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-brand-navy/30 border-t border-b border-white/5 overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full">
            KẾT NỐI MIỄN PHÍ • 24/7
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Đăng ký nhận phương án thiết kế tốt nhất
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Hãy gửi lại thông tin nhu cầu cơ bản, tôi sẽ nghiên cứu đối thủ cạnh tranh cùng phân khúc của bạn và gọi lại trao đổi hoàn toàn miễn phí sau 15 phút.
          </p>
        </div>

        {/* Dual blocks layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Block: Guarantees and Direct metrics */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <h3 className="text-2xl font-display font-bold text-white">
              Cam kết dịch vụ từ Wesign
            </h3>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Đăng ký ngay bây giờ đề nhận trọn bộ giải pháp tư vấn nền tảng kinh doanh tối ưu nhất. Mọi cuộc trao đổi ban đầu đều mang tính chất giải đáp hỗ trợ xã hội, bạn không phải ký cam kết dịch vụ nào cho tới khi ưng thuận thiết kế.
            </p>

            {/* Structured checklist items */}
            <div className="space-y-4">
              <div className="flex gap-3.5 p-4 rounded-xl glass-card">
                <ShieldCheck className="text-brand-cyan shrink-0 w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Cam kết 100% không phát sinh chi phí ẩn</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Mọi đề mục bàn giao và duy trì phí máy chủ đều được thống nhất minh bạch ngay trong hợp đồng ban đầu.</p>
                </div>
              </div>

              <div className="flex gap-3.5 p-4 rounded-xl glass-card">
                <Clock className="text-brand-purple shrink-0 w-5 h-5 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-sm font-semibold text-white font-display">Tương tác và hỗ trợ cấp tốc tức thì</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Zalo hoạt động liên tục từ 08:00 - 22:00 hàng ngày, kể cả ngày cuối tuần để tháo gỡ khó khăn về web.</p>
                </div>
              </div>
            </div>

            {/* Quick social connect highlights */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span>Đàm thoại trực tiếp:</span>
              <a href="tel:0982555312" className="text-white hover:text-brand-cyan font-semibold shrink-0">
                0982.xxx.312 (Hotline)
              </a>
              <span className="h-4 w-px bg-slate-700" />
              <a href="https://zalo.me/0982555312" target="_blank" className="text-brand-cyan hover:underline font-semibold shrink-0">
                Liên hệ Zalo ngay
              </a>
            </div>
          </div>

          {/* Right Block: Active Contact Form submitter */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Display prefills indicators if selected from templates/pricing */}
            {prefilledNeed && (
              <div className="p-3.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan flex items-center justify-between">
                <span>Bạn đã lựa chọn: <strong className="underline text-white pr-1 pl-1">{prefilledNeed}</strong>. Thay đổi lựa chọn của bạn trong form dưới đây.</span>
                <button 
                  onClick={onClearPrefill} 
                  className="p-1 text-brand-cyan hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-card space-y-5 relative">
              <div className="absolute top-[0px] right-[0px] w-24 h-24 bg-brand-cyan/5 rounded-full blur-xl pointer-events-none" />
              
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Họ và tên của bạn <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      errors.fullName 
                        ? "border-rose-500/80 focus:ring-rose-500/30" 
                        : "border-white/15 focus:border-brand-cyan focus:ring-brand-cyan/20"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Số điện thoại bảo mật <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ví dụ: 0982555312"
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                      errors.phone 
                        ? "border-rose-500/80 focus:ring-rose-500/30" 
                        : "border-white/15 focus:border-brand-cyan focus:ring-brand-cyan/20"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-rose-400 text-xs mt-1.5 pl-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Nhu cầu làm website của bạn
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  <select
                    value={needs}
                    onChange={(e) => setNeeds(e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl py-3 pl-11 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:border-brand-cyan focus:ring-brand-cyan/20 appearance-none cursor-pointer"
                  >
                    {needOptions.map((opt, i) => (
                      <option key={i} value={opt} className="bg-slate-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Ghi chú thêm (Không bắt buộc)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mô tả ngành hàng của bạn, địa chỉ maps, phong cách màu sắc thích hoặc đã có tên miền riêng chưa..."
                  rows={3}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:border-brand-cyan focus:ring-brand-cyan/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 glow-button transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                    ĐANG GỦI ĐĂNG KÝ...
                  </>
                ) : (
                  <>
                    GỬI ĐĂNG KÝ NGAY
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Local submission logs history - UI to make data feel extremely real */}
            {localSubmissions.length > 0 && (
              <div className="p-6 rounded-2xl glass-card space-y-4">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
                  LỊCH SỬ ĐĂNG KÝ TRÊN THIẾT BỊ NÀY ({localSubmissions.length})
                </h4>
                <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                  {localSubmissions.map((sub) => (
                    <div 
                      key={sub.id} 
                      className="p-3 bg-slate-950/80 rounded-xl border border-white/5 text-xs flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-brand-cyan">{sub.id}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300 font-semibold truncate max-w-32">{sub.fullName}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] truncate mt-1">
                          Nhu cầu: <span className="text-white">{sub.needs}</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-mono leading-none">
                          Chờ tư vấn
                        </span>
                        
                        <button
                          onClick={() => handleRemoveHistoryItem(sub.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Xóa"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>

        </div>

      </div>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {showSuccessModal && latestSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            {/* Modal card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md glass-card border-brand-cyan/40 p-8 rounded-2xl shadow-2xl text-center space-y-5"
            >
              {/* Abs Close sign */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Icon feedback animation */}
              <div className="h-16 w-16 bg-brand-cyan/15 rounded-full flex items-center justify-center text-brand-cyan mx-auto">
                <CheckCircle className="w-9 h-9 animate-bounce" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-cyan font-bold bg-brand-cyan/10 px-3 py-1 rounded-full uppercase">
                  GỬI ĐĂNG KÝ THÀNH CÔNG
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-3">
                  Cảm ơn, {latestSubmission.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Bản mẫu ghi đăng ký mã <strong className="text-brand-cyan font-mono font-bold">{latestSubmission.id}</strong> đã được phòng tiếp nhận ghi nhận thành công trên hệ thống. 
                </p>
              </div>

              {/* Submission specs recap card */}
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-2 text-left text-[11px] sm:text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Số liên hệ:</span>
                  <span className="text-white font-bold">{latestSubmission.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Thể loại đã chọn:</span>
                  <span className="text-white font-semibold truncate max-w-[210px]">{latestSubmission.needs}</span>
                </div>
                {latestSubmission.notes && (
                  <div className="border-t border-white/5 pt-2 mt-1 min-w-0">
                    <span className="text-slate-400 block mb-1">Ghi chú bổ sung:</span>
                    <span className="text-slate-300 italic block line-clamp-2">{latestSubmission.notes}</span>
                  </div>
                )}
              </div>

              {/* Time progress estimation */}
              <div className="flex justify-center items-center gap-2 text-xs text-brand-purple font-semibold">
                <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Tôi sẽ gọi tư vấn trong vòng 15 phút tới!</span>
              </div>

              {/* Confirm submit button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                QUAY LẠI TRANG CHỦ
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
