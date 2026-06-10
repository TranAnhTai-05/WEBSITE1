import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Platforms from "./components/Platforms";
import Benefits from "./components/Benefits";
import Strengths from "./components/Strengths";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Templates from "./components/Templates";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import FloatingWidgets from "./components/FloatingWidgets";
import Footer from "./components/Footer";
import { ContactSubmission } from "./types";
import { Inbox, Trash2, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [prefilledNeed, setPrefilledNeed] = useState<string>("");
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [allSubmissions, setAllSubmissions] = useState<ContactSubmission[]>([]);

  // Function to smoothly handle focus scrolling to the contact form section
  const handleSelectNeed = (needTitle: string) => {
    setPrefilledNeed(needTitle);
    const element = document.getElementById("contact");
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleFreeConsultClick = () => {
    handleSelectNeed("Tư vấn tổng quan/Chưa chọn gói");
  };

  // Fetch admin list of leads
  const fetchSubmissions = () => {
    try {
      const stored = localStorage.getItem("wesign_contact_submissions");
      if (stored) {
        setAllSubmissions(JSON.parse(stored));
      } else {
        setAllSubmissions([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    // Watch localStorage changes
    const interval = setInterval(fetchSubmissions, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleStatus = (id: string) => {
    try {
      const updated = allSubmissions.map((sub) => {
        if (sub.id === id) {
          const nextStatus = sub.status === "pending" ? "completed" : "pending";
          return { ...sub, status: nextStatus as any };
        }
        return sub;
      });
      localStorage.setItem("wesign_contact_submissions", JSON.stringify(updated));
      setAllSubmissions(updated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = (id: string) => {
    try {
      const updated = allSubmissions.filter((sub) => sub.id !== id);
      localStorage.setItem("wesign_contact_submissions", JSON.stringify(updated));
      setAllSubmissions(updated);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-slate-100 font-sans selection:bg-brand-cyan/30 selection:text-white">
      
      {/* Sticky Header Nav */}
      <Header onFreeConsultClick={handleFreeConsultClick} />

      {/* Hero Header Space */}
      <Hero 
        onQuoteClick={handleFreeConsultClick} 
        onExploreTemplatesClick={() => handleSelectNeed("Yêu cầu duyệt mẫu")} 
      />

      {/* Services catalog categories */}
      <Services onSelectService={handleSelectNeed} />

      {/* Platforms specifications tabs */}
      <Platforms />

      {/* Grid of benefits */}
      <Benefits />

      {/* Strengths metrics tailored for non tech audience */}
      <Strengths />

      {/* Stepper Process timeline */}
      <Process />

      {/* Price matrix blocks */}
      <Pricing onSelectPackage={handleSelectNeed} />

      {/* Portfolio Templates filters grid */}
      <Templates onSelectTemplate={handleSelectNeed} />

      {/* FAQs collapse accordion list */}
      <FAQ />

      {/* Dynamic Client Form */}
      <ContactForm 
        prefilledNeed={prefilledNeed} 
        onClearPrefill={() => setPrefilledNeed("")} 
      />

      {/* Local Admin Database Access Button (For Demo & Verification) */}
      <div className="py-6 bg-brand-dark/95 text-center border-t border-white/5 relative z-20">
        <p className="text-xs text-slate-500 mb-2">
          (Dành cho nhà phát triển & người trải nghiệm thử nghiệm form liên hệ)
        </p>
        <button
          onClick={() => {
            fetchSubmissions();
            setShowAdminPanel(true);
          }}
          className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-brand-purple/40 text-xs font-mono font-medium text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
        >
          <Inbox size={14} className="text-brand-purple" />
          Hòm thư Admin: Quản lý Leads ({allSubmissions.length})
        </button>
      </div>

      {/* Footer credits and local coordinates */}
      <Footer onFreeConsultScroll={handleFreeConsultClick} />

      {/* Ringing Hover Zalo / Phone floating icons */}
      <FloatingWidgets />

      {/* Submissions Inbox Admin Manager Drawer Modal */}
      <AnimatePresence>
        {showAdminPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminPanel(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header Title bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-purple/10 text-brand-purple rounded-lg">
                    <Inbox size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Bảng Quản Lý Leads (Local CRM)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Ghi nhận và cập nhật trực tiếp từ LocalStorage trình duyệt của khách hàng
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* CRM list database space */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[250px]">
                {allSubmissions.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-500 space-y-3">
                    <Inbox size={42} className="stroke-[1.5] text-slate-600 animate-pulse" />
                    <div>
                      <p className="font-medium text-sm text-slate-400">Chưa có liên hệ nào được gửi</p>
                      <p className="text-xs text-slate-500 mt-1">Đăng ký một form tư vấn ngoài trang chủ để xem lead đổ về đây lập tức!</p>
                    </div>
                  </div>
                ) : (
                  allSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-4 rounded-xl border transition-all ${
                        sub.status === "completed"
                          ? "bg-slate-950/40 border-emerald-500/10 opacity-75"
                          : "bg-slate-950 border-white/5 hover:border-brand-purple/20"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                              {sub.id}
                            </span>
                            <h4 className="text-sm font-bold text-white font-display">
                              {sub.fullName}
                            </h4>
                            <span className="text-[11px] text-slate-500">
                              {new Date(sub.createdAt).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit"
                              })} - {new Date(sub.createdAt).toLocaleDateString("vi-VN")}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 my-3 text-xs">
                            <p className="text-slate-300">
                              <span className="text-slate-500">SĐT:</span>{" "}
                              <a href={`tel:${sub.phone}`} className="hover:underline text-brand-cyan font-bold font-mono">
                                {sub.phone}
                              </a>
                            </p>
                            <p className="text-slate-300">
                              <span className="text-slate-500">Nhu cầu:</span>{" "}
                              <span className="text-white font-medium">{sub.needs}</span>
                            </p>
                          </div>

                          {sub.notes && (
                            <p className="text-[12px] text-slate-400 italic bg-white/5 p-2 rounded-lg border border-white/5 max-w-lg mt-2">
                              " {sub.notes} "
                            </p>
                          )}
                        </div>

                        {/* CRM Operations actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleToggleStatus(sub.id)}
                            className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                              sub.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`}
                            title={sub.status === "completed" ? "Đánh dấu Chưa xử lý" : "Đánh dấu Đã liên hệ"}
                          >
                            <CheckCircle2 size={13} />
                            <span>{sub.status === "completed" ? "Đã liên hệ" : "Xử lý"}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteLead(sub.id)}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Xóa Lead"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer instruction guidelines */}
              <div className="mt-6 pt-4 border-t border-white/10 text-slate-500 text-[10px] sm:text-xs flex items-center justify-between">
                <span>Dữ liệu lưu động trên bộ cài Sandbox LocalStorage</span>
                <span className="text-slate-400">* Đảm bảo bảo mật tài khoản cục bộ</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
