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
import AdminPanel from "./components/AdminPanel";
import { ContactSubmission, ServiceItem, PriceTier, TemplateItem, HomeContent, ContactSettings } from "./types";
import { 
  getStoredSubmissions, 
  getStoredServices, 
  getStoredPricing, 
  getStoredTemplates, 
  getStoredHomeContent, 
  getStoredContactSettings 
} from "./utils/localStorageState";
import { Inbox, Trash2, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [prefilledNeed, setPrefilledNeed] = useState<string>("");
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [allSubmissions, setAllSubmissions] = useState<ContactSubmission[]>([]);

  // Persistent States configured dynamically via /admin
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [pricing, setPricing] = useState<PriceTier[]>([]);
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);

  // Synchronize dynamic states from Local Storage
  const reloadData = () => {
    setServices(getStoredServices());
    setPricing(getStoredPricing());
    setTemplates(getStoredTemplates());
    setHomeContent(getStoredHomeContent());
    setContactSettings(getStoredContactSettings());
    fetchSubmissions();
  };

  // Sync back-button or URL pathname alterations
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // Fetch active admin submissions list for indicator metrics
  const fetchSubmissions = () => {
    try {
      setAllSubmissions(getStoredSubmissions());
    } catch (e) {
      console.error(e);
    }
  };

  // Listen to cross-tab storage changes & run on path switch
  useEffect(() => {
    reloadData();
    window.addEventListener("storage", reloadData);
    return () => window.removeEventListener("storage", reloadData);
  }, [currentPath]);

  // Handle direct navigation routing helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  // Route back directly to "/" landing on clicking back link
  const handleBackToLanding = () => {
    navigateTo("/");
  };

  // Function to switch tab to contact and prefill form
  const handleSelectNeed = (needTitle: string) => {
    setPrefilledNeed(needTitle);
    setActiveTab("contact");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleFreeConsultClick = () => {
    handleSelectNeed("Tư vấn tổng quan/Chưa chọn gói");
  };

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

  // RENDER MASTER ROUTING: Full administration page matching /admin URL exactly
  if (currentPath === "/admin") {
    return (
      <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-brand-cyan/20 selection:text-white">
        <AdminPanel onBackToLanding={handleBackToLanding} />
      </div>
    );
  }

  return (
    <div className="bg-brand-dark min-h-screen text-slate-100 font-sans selection:bg-brand-cyan/30 selection:text-white">
      
      {/* Sticky Header Nav */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onFreeConsultClick={handleFreeConsultClick} 
      />

      {/* Main Tab/Section Router Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full flex-1"
        >
          {activeTab === "home" && (
            <>
              {/* Hero Header Space */}
              <Hero 
                onQuoteClick={handleFreeConsultClick} 
                onExploreTemplatesClick={() => handleSelectNeed("Yêu cầu duyệt mẫu")} 
                homeContent={homeContent}
              />

              {/* Quick Tab Category Portal Hub - Sleek Design */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-10 relative z-10">
                <div className="glass-card rounded-3xl p-8 bg-slate-900/40 border border-white/5 shadow-2xl">
                  <h3 className="font-display font-medium text-center text-sm uppercase tracking-widest text-[#94a3b8] mb-8">
                    ⚡ KHÁM PHÁ THEO TỪNG CHUYÊN MỤC ⚡
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { id: "services", label: "Dịch Vụ Thiết Kế", desc: "WordPress, Shopify...", icon: "🎯" },
                      { id: "benefits", label: "Lợi Ích Độc Bản", desc: "Tốc độ, Chuẩn SEO", icon: "✨" },
                      { id: "process", label: "Quy Trình Thi Công", desc: "4 Bước Bàn Giao", icon: "⚡" },
                      { id: "pricing", label: "Bảng Giá Gói Cước", desc: "Chỉ từ 2.9 Triệu", icon: "💎" },
                      { id: "templates", label: "Kho Giao Diện", desc: "50+ Mẫu Đỉnh Cao", icon: "🖥️" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-5 rounded-2xl bg-white/3 border border-white/5 hover:border-amber-500/50 hover:bg-slate-950 hover:scale-103 transition-all duration-300 text-center flex flex-col items-center justify-center group cursor-pointer"
                      >
                        <span className="text-2xl mb-2.5 group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="block text-xs sm:text-sm font-bold text-white mb-1">{item.label}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths metrics tailored for non tech audience */}
              <Strengths />

              {/* FAQs collapse accordion list */}
              <FAQ />
            </>
          )}

          {activeTab === "services" && (
            <div className="pt-24">
              {/* Services catalog categories */}
              <Services onSelectService={handleSelectNeed} services={services} />

              {/* Platforms specifications tabs */}
              <Platforms />
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="pt-24">
              {/* Grid of benefits */}
              <Benefits />
            </div>
          )}

          {activeTab === "process" && (
            <div className="pt-24">
              {/* Stepper Process timeline */}
              <Process />
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="pt-24">
              {/* Price matrix blocks */}
              <Pricing onSelectPackage={handleSelectNeed} pricing={pricing} />
            </div>
          )}

          {activeTab === "templates" && (
            <div className="pt-24">
              {/* Portfolio Templates filters grid */}
              <Templates onSelectTemplate={handleSelectNeed} templates={templates} />
            </div>
          )}

          {activeTab === "contact" && (
            <div className="pt-24">
              {/* Dynamic Client Form */}
              <ContactForm 
                prefilledNeed={prefilledNeed} 
                onClearPrefill={() => setPrefilledNeed("")} 
                onSubmissionSuccess={reloadData}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Local Admin Database Access Button (For Demo & Verification) */}
      <div className="py-8 bg-brand-dark/95 text-center border-t border-white/5 relative z-20">
        <p className="text-xs text-slate-500 mb-3.5">
          (Khu vực thử nghiệm và truy cập nhanh hệ thống bán hàng &amp; tư vấn)
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              fetchSubmissions();
              setShowAdminPanel(true);
            }}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-brand-purple/40 text-xs font-mono font-medium text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
          >
            <Inbox size={14} className="text-brand-purple" />
            Hòm thư nhanh ({allSubmissions.length})
          </button>

          <button
            onClick={() => navigateTo("/admin")}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-[#8b5cf6] border border-white/10 text-slate-950 hover:text-white transition-all cursor-pointer shadow-md font-bold text-xs font-mono"
          >
            <Inbox size={14} />
            Đến Trang Admin Quản Trị (/admin)
          </button>
        </div>
      </div>

      {/* Footer credits and local coordinates */}
      <Footer 
        onFreeConsultScroll={handleFreeConsultClick} 
        contactSettings={contactSettings} 
        footerCtaTitle={homeContent?.footerCtaTitle}
      />

      {/* Ringing Hover Zalo / Phone floating icons */}
      <FloatingWidgets contactSettings={contactSettings} />

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
