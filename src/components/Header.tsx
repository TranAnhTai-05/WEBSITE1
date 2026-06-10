import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFreeConsultClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onFreeConsultClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Trang chủ" },
    { id: "services", label: "Dịch vụ" },
    { id: "benefits", label: "Lợi ích" },
    { id: "process", label: "Quy trình" },
    { id: "pricing", label: "Bảng giá" },
    { id: "templates", label: "Mẫu website" },
    { id: "contact", label: "Liên hệ" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setActiveTab(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo brand */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => handleNavClick("home")}
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-purple to-brand-accent p-0.5 shadow-md shadow-brand-cyan/20">
              <div className="h-full w-full bg-brand-dark rounded-[10px] flex items-center justify-center group-hover:bg-brand-dark/50 transition-colors">
                <Sparkles className="w-5 h-5 text-brand-cyan animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-cyan bg-clip-text text-transparent">
                WESIGN
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-brand-cyan font-semibold uppercase leading-none mt-0.5">
                CREATIVE STUDIO
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 relative ${
                  activeTab === item.id
                    ? "text-brand-cyan font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-purple"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA & Mobile nav button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onFreeConsultClick}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 glow-button transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
            >
              Tư vấn miễn phí
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 border border-white/5 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-brand-dark/95 border-b border-white/10 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-brand-cyan/10 text-brand-cyan border-l-2 border-brand-cyan"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 px-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onFreeConsultClick();
                  }}
                  className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 glow-button transition-all text-center"
                >
                  Tư vấn miễn phí
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
