import React, { useState, useEffect } from "react";
import { 
  getStoredSubmissions, 
  saveStoredSubmissions,
  getStoredServices,
  saveStoredServices,
  getStoredPricing,
  saveStoredPricing,
  getStoredTemplates,
  saveStoredTemplates,
  getStoredHomeContent,
  saveStoredHomeContent,
  getStoredContactSettings,
  saveStoredContactSettings
} from "../utils/localStorageState";
import { 
  ContactSubmission, 
  ServiceItem, 
  PriceTier, 
  TemplateItem, 
  HomeContent, 
  ContactSettings 
} from "../types";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  Monitor, 
  Edit3, 
  Sliders, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Filter, 
  Eye, 
  Phone, 
  MessageSquare, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Bell, 
  Calendar, 
  PhoneCall,
  Lock,
  Globe,
  Database,
  CheckCircle,
  FileText
} from "lucide-react";
import LucideIcon from "./LucideIcon";

interface AdminPanelProps {
  onBackToLanding: () => void;
}

export default function AdminPanel({ onBackToLanding }: AdminPanelProps) {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Store lists core states
  const [leads, setLeads] = useState<ContactSubmission[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [pricing, setPricing] = useState<PriceTier[]>([]);
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Toast Success notification helper
  const [toastMessage, setToastMessage] = useState<string>("");

  // Search & Filter state for Leads
  const [leadsSearch, setLeadsSearch] = useState<string>("");
  const [leadsFilterStatus, setLeadsFilterStatus] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<ContactSubmission | null>(null);
  const [editingLeadNotes, setEditingLeadNotes] = useState<string>("");
  const [editingLeadStatus, setEditingLeadStatus] = useState<string>("");

  // Crud Add/Edit modals indicators and values
  // Service Modal
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<Partial<ServiceItem> | null>(null);
  // Pricing Modal
  const [showPricingModal, setShowPricingModal] = useState<boolean>(false);
  const [currentPricing, setCurrentPricing] = useState<Partial<PriceTier> | null>(null);
  const [newFeatureText, setNewFeatureText] = useState<string>("");
  // Template Modal
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [currentTemplate, setCurrentTemplate] = useState<Partial<TemplateItem> | null>(null);
  const [newTmplFeatureText, setNewTmplFeatureText] = useState<string>("");

  // Hook to fetch initial values on load
  useEffect(() => {
    // Check local storage auth
    const authStatus = localStorage.getItem("wesign_admin_authenticated");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }

    setLeads(getStoredSubmissions());
    setServices(getStoredServices());
    setPricing(getStoredPricing());
    setTemplates(getStoredTemplates());
    setHomeContent(getStoredHomeContent());
    setContactSettings(getStoredContactSettings());
  }, []);

  // Trigger brief alert toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Auth Submit Action
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "123456") {
      localStorage.setItem("wesign_admin_authenticated", "true");
      setIsLoggedIn(true);
      setLoginError("");
      triggerToast("Đăng nhập thành công!");
    } else {
      setLoginError("Tài khoản hoặc mật khẩu demo không chính xác!");
    }
  };

  // Auth Logout Action
  const handleLogout = () => {
    localStorage.removeItem("wesign_admin_authenticated");
    setIsLoggedIn(false);
    triggerToast("Đã đăng xuất khỏi tài khoản quản trị.");
  };

  // Copy helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`Đã sao chép: ${text}`);
  };

  // Lead CRUD handlers
  const handleUpdateLead = () => {
    if (!selectedLead) return;
    const updatedLeads = leads.map(l => {
      if (l.id === selectedLead.id) {
        return {
          ...l,
          status: editingLeadStatus as any,
          adminNotes: editingLeadNotes
        };
      }
      return l;
    });
    setLeads(updatedLeads);
    saveStoredSubmissions(updatedLeads);
    setSelectedLead(null);
    triggerToast("Cập nhật thông tin khách hàng thành công!");
    // Dispatch reload event
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      saveStoredSubmissions(updated);
      triggerToast("Đã xóa thông tin khách hàng.");
      window.dispatchEvent(new Event("storage"));
    }
  };

  // Service CRUD handlers
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService || !currentService.title || !currentService.description) {
      alert("Vui lòng điền đầy đủ tiêu đề và mô tả dịch vụ!");
      return;
    }

    let updatedList: ServiceItem[] = [];
    if (currentService.id) {
      // Edit existing
      updatedList = services.map(s => s.id === currentService.id ? (currentService as ServiceItem) : s);
      triggerToast("Đã cập nhật dịch vụ!");
    } else {
      // Add new
      const nextId = "srv-" + Date.now();
      const newItem: ServiceItem = {
        id: nextId,
        title: currentService.title,
        description: currentService.description,
        iconName: currentService.iconName || "Sparkle",
        badge: currentService.badge || ""
      };
      updatedList = [...services, newItem];
      triggerToast("Đã thêm dịch vụ mới!");
    }

    setServices(updatedList);
    saveStoredServices(updatedList);
    setShowServiceModal(false);
    setCurrentService(null);
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Xóa dịch vụ này khỏi trang chủ?")) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveStoredServices(updated);
      triggerToast("Đã xóa dịch vụ thành công.");
      window.dispatchEvent(new Event("storage"));
    }
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    const updated = [...services];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;
    
    // Swap
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    
    setServices(updated);
    saveStoredServices(updated);
    triggerToast("Đã thay đổi vị trí ưu tiên.");
    window.dispatchEvent(new Event("storage"));
  };

  // Pricing CRUD handlers
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPricing || !currentPricing.name || !currentPricing.price) {
      alert("Vui lòng nhập tên gói và giá!");
      return;
    }

    let updatedList: PriceTier[] = [];
    if (currentPricing.id) {
      updatedList = pricing.map(p => p.id === currentPricing.id ? (currentPricing as PriceTier) : p);
      triggerToast("Đã cập nhật bảng giá!");
    } else {
      const newItem: PriceTier = {
        id: "price-" + Date.now(),
        name: currentPricing.name,
        price: currentPricing.price,
        description: currentPricing.description || "",
        deliveryTime: currentPricing.deliveryTime || "3 - 5 ngày",
        features: currentPricing.features || [],
        isPopular: !!currentPricing.isPopular
      };
      updatedList = [...pricing, newItem];
      triggerToast("Đã tạo gói bảng giá mới!");
    }

    setPricing(updatedList);
    saveStoredPricing(updatedList);
    setShowPricingModal(false);
    setCurrentPricing(null);
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeletePricing = (id: string) => {
    if (confirm("Bạn thực sự muốn xóa gói cước này?")) {
      const updated = pricing.filter(p => p.id !== id);
      setPricing(updated);
      saveStoredPricing(updated);
      triggerToast("Đã xóa gói cước.");
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleTogglePopular = (id: string) => {
    const updated = pricing.map(p => {
      if (p.id === id) {
        return { ...p, isPopular: !p.isPopular };
      }
      // Only one target is popular model
      return { ...p, isPopular: false };
    });
    setPricing(updated);
    saveStoredPricing(updated);
    triggerToast("Đã cập nhật trạng thái Gói Bán Chạy.");
    window.dispatchEvent(new Event("storage"));
  };

  // Template CRUD handlers
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTemplate || !currentTemplate.title || !currentTemplate.category) {
      alert("Vui lòng điền tên mẫu và cấu trúc phân loại!");
      return;
    }

    let updatedList: TemplateItem[] = [];
    const categoryLabels: Record<string, string> = {
      enterprise: "Doanh Nghiệp",
      ecommerce: "Bán Hàng Online",
      landing: "Landing Page",
      personal: "Thương Hiệu Cá Nhân",
      booking: "Spa / Đặt Lịch"
    };

    const updatedCategoryLabel = categoryLabels[currentTemplate.category || "enterprise"] || "Doanh Nghiệp";

    if (currentTemplate.id) {
      const edited = {
        ...currentTemplate,
        categoryLabel: updatedCategoryLabel
      } as TemplateItem;
      updatedList = templates.map(t => t.id === currentTemplate.id ? edited : t);
      triggerToast("Đã cập nhật mẫu giao diện!");
    } else {
      const newItem: TemplateItem = {
        id: "tmpl-" + Date.now(),
        title: currentTemplate.title,
        category: (currentTemplate.category as any) || "enterprise",
        categoryLabel: updatedCategoryLabel,
        platform: currentTemplate.platform || "WordPress",
        features: currentTemplate.features || [],
        imageUrl: currentTemplate.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
        liveUrl: currentTemplate.liveUrl || ""
      };
      updatedList = [...templates, newItem];
      triggerToast("Đã thêm mẫu giao diện mới!");
    }

    setTemplates(updatedList);
    saveStoredTemplates(updatedList);
    setShowTemplateModal(false);
    setCurrentTemplate(null);
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm("Xóa mẫu giao diện này khỏi kho lưu trữ?")) {
      const updated = templates.filter(t => t.id !== id);
      setTemplates(updated);
      saveStoredTemplates(updated);
      triggerToast("Đã gỡ bỏ mẫu giao diện thành công.");
      window.dispatchEvent(new Event("storage"));
    }
  };

  // Content Settings handlers
  const handleSaveHomeContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeContent) return;
    saveStoredHomeContent(homeContent);
    triggerToast("Đã lưu và đồng bộ toàn bộ nội dung trang chủ!");
    window.dispatchEvent(new Event("storage"));
  };

  // Contact settings handlers
  const handleSaveContactSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactSettings) return;
    saveStoredContactSettings(contactSettings);
    triggerToast("Đã đồng bộ thông tin liên hệ và footer!");
    window.dispatchEvent(new Event("storage"));
  };

  // Render Login Window if not validated
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Abstract futuristic visual lines background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.18),rgba(255,255,255,0))]" />
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-purple-500/5 rounded-full blur-[80px]" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center flex-col items-center">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 animate-pulse">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-center text-3xl font-display font-extrabold text-white tracking-tight">
              Website Service Admin
            </h2>
            <p className="mt-2 text-center text-xs sm:text-sm font-mono text-slate-400">
              CỔNG QUẢN TRỊ NỘI DUNG & KHÁCH HÀNG
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="glass-card bg-slate-900/80 border border-white/10 py-8 px-4 sm:px-10 rounded-3xl shadow-2xl backdrop-blur-md">
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Tài khoản chuyên dùng
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="block w-full pl-8 pr-3 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Mật khẩu bảo mật
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    ***
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full py-4 px-4 border border-transparent rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 glow-button transition-colors cursor-pointer"
                >
                  Xác thực Đăng nhập
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-white/5 text-center">
              <button
                onClick={onBackToLanding}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                ← Quay lại trang Landing Page chính
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculated Stats
  const totalLeads = leads.length;
  // Leads today
  const todayLeads = leads.filter(l => {
    try {
      const createdDate = new Date(l.createdAt);
      const today = new Date();
      return createdDate.toDateString() === today.toDateString();
    } catch {
      return false;
    }
  }).length;

  const totalServices = services.length;
  const totalPricing = pricing.length;
  const totalTemplates = templates.length;

  // Chart values
  // Submissions grouped by state
  const statusCounts = {
    pending: leads.filter(l => l.status === "pending").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    consulting: leads.filter(l => l.status === "consulting").length,
    completed: leads.filter(l => l.status === "completed").length,
    unsuitable: leads.filter(l => l.status === "unsuitable").length,
  };

  const statusLabelVietnamese = (s: string) => {
    switch(s) {
      case "pending": return "Mới";
      case "contacted": return "Đã liên hệ";
      case "consulting": return "Đang tư vấn";
      case "completed": return "Đã chốt";
      case "unsuitable": return "Không phù hợp";
      default: return s;
    }
  };

  const statusColorMap = (s: string) => {
    switch(s) {
      case "pending": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "contacted": return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
      case "consulting": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "completed": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "unsuitable": return "text-slate-400 bg-slate-400/10 border-slate-400/20";
      default: return "text-white bg-slate-500/10";
    }
  };

  // Filtered leads calculation
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.fullName.toLowerCase().includes(leadsSearch.toLowerCase()) || 
                          l.phone.includes(leadsSearch);
    const matchesStatus = leadsFilterStatus === "all" || l.status === leadsFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative z-50 font-sans selection:bg-amber-500/30">
      
      {/* Toast Alert Message Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-55 px-5 py-3.5 rounded-xl bg-slate-900 border border-amber-500 text-amber-300 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE HEADER BAR */}
      <div className="md:hidden w-full h-16 bg-slate-950 border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center font-display font-black text-slate-950 text-sm">
            W
          </div>
          <span className="font-display font-bold text-sm tracking-wide">STUDIO ADMIN</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 px-2.5 rounded bg-white/5 border border-white/10 text-white text-xs cursor-pointer"
        >
          MENU
        </button>
      </div>

      {/* LEFT SIDEBAR PANEL */}
      <div className={`w-64 bg-slate-900/60 border-r border-white/5 flex flex-col justify-between shrink-0 transition-transform duration-300 z-40
        ${mobileMenuOpen ? "translate-x-0 fixed inset-y-0 left-0 bg-slate-900" : "-translate-x-full md:translate-x-0 fixed md:relative md:flex h-screen"}
      `}>
        <div>
          {/* Header Identity bar */}
          <div className="h-20 border-b border-white/5 flex items-center justify-between px-5">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-display font-black text-slate-950 shadow-md shadow-amber-500/15">
                W
              </div>
              <div>
                <span className="block font-display font-extrabold text-sm text-white tracking-wide">
                  {contactSettings?.brandName || "Wesign Studio"}
                </span>
                <span className="block text-[10px] font-mono text-amber-500 tracking-wider">
                  QUẢN TRỊ VIÊN
                </span>
              </div>
            </div>
            {mobileMenuOpen && (
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Stats overview panel in sidebar */}
          <div className="p-4 border-b border-white/3">
            <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 font-mono text-[10px] font-extrabold shrink-0">
                DB
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-mono text-zinc-400 truncate uppercase">Trực tuyến (Local DB)</span>
                <span className="block text-xs font-bold text-slate-200">Kịch bản hoạt động</span>
              </div>
            </div>
          </div>

          {/* Navigation Links list */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(screen-280px)]">
            {[
              { id: "dashboard", label: "Dashboard", desc: "Tổng quan thống kê", icon: LayoutDashboard },
              { id: "leads", label: "Khách hàng liên hệ", desc: `${leads.length} lượt đăng ký`, icon: Users },
              { id: "services", label: "Quản lý dịch vụ", desc: `${services.length} phân mục`, icon: Briefcase },
              { id: "pricing", label: "Quản lý bảng giá", desc: `${pricing.length} gói cước`, icon: CreditCard },
              { id: "templates", label: "Mẫu giao diện", desc: `${templates.length} layout mẫu`, icon: Monitor },
              { id: "homeContent", label: "Cấu trúc trang khách", desc: "Sửa đầu mục text", icon: Edit3 },
              { id: "contactSettings", label: "Cài đặt liên hệ", desc: "Hotline, Zalo & Socials", icon: Sliders },
            ].map((navItem) => {
              const Icon = navItem.icon;
              return (
                <button
                  key={navItem.id}
                  onClick={() => {
                    setActiveTab(navItem.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all group relative cursor-pointer ${
                    activeTab === navItem.id
                      ? "bg-amber-500 text-slate-950 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 shrink-0 ${activeTab === navItem.id ? "text-slate-950" : "text-slate-400 group-hover:text-amber-500"}`} />
                  <div>
                    <span className="block text-xs font-medium">{navItem.label}</span>
                    <span className={`block text-[9px] font-mono ${activeTab === navItem.id ? "text-slate-800" : "text-slate-500"}`}>
                      {navItem.desc}
                    </span>
                  </div>
                  {activeTab === navItem.id && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-slate-950 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom utility: back to public page & Logout actions */}
        <div className="p-4 border-t border-white/5 space-y-2 md:block">
          <button
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>Xem trang Landing</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Đăng xuất Admin</span>
          </button>
        </div>
      </div>

      {/* OVERLAY BACKGROUND CLICK FOR DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-35" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* MAIN LAYOUT BAR */}
      <main className="flex-1 overflow-y-auto max-h-screen p-4 sm:p-6 lg:p-8 pt-6">
        
        {/* TOP STATUS ROW BAR */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/5 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white uppercase tracking-tight">
              {activeTab === "dashboard" && "Dashboard tổng quan đại sảnh"}
              {activeTab === "leads" && "Quản lý khách liên hệ"}
              {activeTab === "services" && "Danh sách dịch vụ cung cấp"}
              {activeTab === "pricing" && "Bảng phí & Các gói dịch vụ"}
              {activeTab === "templates" && "Danh mục giao diện mẫu"}
              {activeTab === "homeContent" && "Tùy biến văn bản landing page"}
              {activeTab === "contactSettings" && "Cấu hình liên lạc & footer"}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              BẢN CHỈ HUY QUẢN KHO DỮ LIỆU ĐẾN TỪ THIẾT BỊ LOCAL CỦA BẠN
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <span className="text-[10px] font-mono text-green-400 flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-500/10 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              CONNECTED
            </span>
            <div className="flex items-center gap-2.5 p-1 bg-white/3 border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-[10px] text-amber-500 font-mono font-bold flex items-center justify-center shrink-0">
                AD
              </div>
              <div className="hidden sm:block text-left pr-2 text-xs">
                <span className="block font-bold">Administrator</span>
                <span className="block text-[9px] text-slate-400 font-mono">tai277922@gmail.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTAINER CONTENT ROUTER */}
        <div className="py-8">

          {/* ==================== TAB 1: DASHBOARD OVERVIEW ==================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats bento rows */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-5 rounded-2xl glass-card bg-slate-900/40 relative overflow-hidden">
                  <div className="absolute right-3 top-3 text-amber-500 opacity-20"><Users className="w-10 h-10" /></div>
                  <span className="block text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">TỔNG KHÁCH</span>
                  <span className="block text-2xl sm:text-3xl font-display font-black text-white mt-2">{totalLeads}</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Ghi nhận từ trang chủ</span>
                </div>

                <div className="p-5 rounded-2xl glass-card bg-slate-900/40 border-amber-500/20 relative overflow-hidden">
                  <div className="absolute right-3 top-3 text-amber-500 opacity-20"><Calendar className="w-10 h-10" /></div>
                  <span className="block text-xs font-semibold text-amber-400 uppercase font-mono tracking-wider">MỚI HÔM NAY</span>
                  <span className="block text-2xl sm:text-3xl font-display font-black text-amber-400 mt-2">{todayLeads}</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Cần phản hồi kịp thời</span>
                </div>

                <div className="p-5 rounded-2xl glass-card bg-slate-900/40 relative overflow-hidden">
                  <div className="absolute right-3 top-3 text-cyan-500 opacity-20"><Briefcase className="w-10 h-10" /></div>
                  <span className="block text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">SỐ DỊCH VỤ</span>
                  <span className="block text-2xl sm:text-3xl font-display font-black text-white mt-2">{totalServices}</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Loại trang web cung cấp</span>
                </div>

                <div className="p-5 rounded-2xl glass-card bg-slate-900/40 relative overflow-hidden">
                  <div className="absolute right-3 top-3 text-blue-500 opacity-20"><Monitor className="w-10 h-10" /></div>
                  <span className="block text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">MẪU DEMO</span>
                  <span className="block text-2xl sm:text-3xl font-display font-black text-white mt-2">{totalTemplates}</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Đầy đủ visual sắc nét</span>
                </div>

                <div className="p-5 rounded-2xl glass-card bg-slate-900/40 relative overflow-hidden col-span-2 lg:col-span-1">
                  <div className="absolute right-3 top-3 text-green-500 opacity-20"><CreditCard className="w-10 h-10" /></div>
                  <span className="block text-xs text-slate-400 uppercase font-mono font-semibold tracking-wider">GÓI BẢNG GIÁ</span>
                  <span className="block text-2xl sm:text-3xl font-display font-black text-white mt-2">{totalPricing}</span>
                  <span className="block text-[10px] text-slate-500 mt-1">Thiết lập khung phí</span>
                </div>
              </div>

              {/* TWO ANALYTICS CHARTS COLUMN PANELS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Leads status breakdown */}
                <div className="p-6 rounded-2xl glass-card bg-slate-900/40 space-y-5">
                  <h3 className="text-sm font-display font-bold uppercase tracking-wider text-slate-300">
                    📊 Tình trạng xử lý khách hàng liên hệ
                  </h3>
                  
                  {/* High visual status rows block */}
                  <div className="space-y-3.5 pt-2">
                    {[
                      { key: "pending", label: "Chờ liên hệ", color: "bg-amber-400" },
                      { key: "contacted", label: "Đã liên hệ sơ bộ", color: "bg-cyan-400" },
                      { key: "consulting", label: "Đang tư vấn chuyên sâu", color: "bg-blue-400" },
                      { key: "completed", label: "Đã chốt thỏa thuận", color: "bg-green-400" },
                      { key: "unsuitable", label: "Không phù hợp / Huỷ", color: "bg-slate-500" },
                    ].map((statusRow) => {
                      const count = (statusCounts as any)[statusRow.key] || 0;
                      const percentage = totalLeads ? Math.round((count / totalLeads) * 100) : 0;
                      return (
                        <div key={statusRow.key} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-300">{statusRow.label}</span>
                            <span className="font-mono text-slate-400">{count} khách ({percentage}%)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${statusRow.color} rounded-full`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart 2: Client interest in fields */}
                <div className="p-6 rounded-2xl glass-card bg-slate-900/40 space-y-5">
                  <h3 className="text-sm font-display font-bold uppercase tracking-wider text-slate-300">
                    🎯 Phân tích nhu cầu đặt hàng của khách
                  </h3>

                  {/* Horizontal visual breakdown values representation */}
                  <div className="space-y-3.5 pt-2">
                    {[
                      { title: "Website bán hàng / Thương mại điện tử", color: "bg-gradient-to-r from-amber-500 to-amber-300", keyword: "bán hàng" },
                      { title: "Landing Page chạy Quảng Cáo", color: "bg-gradient-to-r from-cyan-500 to-blue-400", keyword: "landing" },
                      { title: "Website Bất động sản / Dự án", color: "bg-gradient-to-r from-blue-500 to-indigo-400", keyword: "bất động sản" },
                      { title: "Website Thiết kế Spa / Thẩm mỹ", color: "bg-gradient-to-r from-purple-500 to-pink-500", keyword: "spa" },
                      { title: "Website Giới thiệu Doanh nghiệp", color: "bg-gradient-to-r from-green-500 to-emerald-400", keyword: "doanh nghiệp" },
                    ].map((interestItem) => {
                      // Filter match leads notes or needs (basic keyword query mapping)
                      const count = leads.filter(l => 
                        l.needs.toLowerCase().includes(interestItem.keyword) || 
                        (l.notes && l.notes.toLowerCase().includes(interestItem.keyword))
                      ).length;
                      const percentage = totalLeads ? Math.round((count / totalLeads) * 100) : 0;

                      return (
                        <div key={interestItem.keyword} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-300 truncate max-w-[210px] sm:max-w-xs">{interestItem.title}</span>
                            <span className="font-mono text-zinc-400">{count} lượt ({percentage}%)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${interestItem.color} rounded-full`}
                              style={{ width: `${Math.max(percentage, count ? 10 : 0)}%` }} // Minimum styling indicator width
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* TABLE: LATEST SUBMISSIONS SUMMARY */}
              <div className="rounded-2xl glass-card bg-slate-900/40 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-sm font-display font-bold uppercase tracking-wider text-slate-200">
                      🔔 Khách hàng liên hệ mới nhận
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">Top 5 lượt gửi thông tin mới nhất trên website</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] border border-white/5 tracking-wider transition-all font-mono cursor-pointer"
                  >
                    XEM TẤT CẢ ({totalLeads})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-400 font-mono text-[10px] uppercase">
                        <th className="py-3 px-3">Khách hàng</th>
                        <th className="py-3 px-3">Liên hệ</th>
                        <th className="py-3 px-3">Yêu cầu lựa chọn</th>
                        <th className="py-3 px-3">Thời điểm gửi</th>
                        <th className="py-3 px-3">Trạng thái</th>
                        <th className="py-3 px-3 text-right">Lựa chọn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/3">
                      {leads.slice(0, 5).map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                          <td className="py-4.5 px-3">
                            <span className="block font-bold text-white text-xs sm:text-sm">{lead.fullName}</span>
                            <span className="block text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[150px]">{lead.email || "Không có email"}</span>
                          </td>
                          <td className="py-4.5 px-3">
                            <span className="block font-mono text-xs">{lead.phone}</span>
                            <span className="block text-[9px] text-slate-400 italic truncate max-w-[150px]">{lead.notes || "Không có ghi chú"}</span>
                          </td>
                          <td className="py-4.5 px-3">
                            <span className="inline-block px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                              {lead.needs}
                            </span>
                          </td>
                          <td className="py-4.5 px-3 text-slate-300">
                            {new Date(lead.createdAt).toLocaleDateString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit"
                            })}
                          </td>
                          <td className="py-4.5 px-3">
                            <span className={`inline-block px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border uppercase ${statusColorMap(lead.status)}`}>
                              {statusLabelVietnamese(lead.status)}
                            </span>
                          </td>
                          <td className="py-4.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button 
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setEditingLeadNotes(lead.adminNotes || "");
                                  setEditingLeadStatus(lead.status);
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                                title="Xem chi tiết & Cập nhật"
                              >
                                <Eye className="w-4.5 h-4.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500 hover:text-white text-red-400 transition-colors cursor-pointer"
                                title="Xóa"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-slate-400 italic">
                            Chưa nhận được yêu cầu đăng ký tư vấn nào ngoài trang chủ.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: QUẢN LÝ KHÁCH LIÊN HỆ ==================== */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              {/* FILTERS AND SEARCH PANEL BAR */}
              <div className="p-5 rounded-2xl glass-card bg-slate-900/40 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={leadsSearch}
                    onChange={(e) => setLeadsSearch(e.target.value)}
                    placeholder="Tìm theo tên hoặc số điện thoại..."
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto self-stretch md:self-auto">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5 shrink-0">
                    <Filter className="w-3.5 h-3.5" /> Lọc trạng thái:
                  </span>
                  <select
                    value={leadsFilterStatus}
                    onChange={(e) => setLeadsFilterStatus(e.target.value)}
                    className="block w-full md:w-44 px-3 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Mới (Chờ duyệt)</option>
                    <option value="contacted">Đã liên hệ</option>
                    <option value="consulting">Đang tư vấn</option>
                    <option value="completed">Đã chốt (Hoàn thành)</option>
                    <option value="unsuitable">Không phù hợp / Huỷ</option>
                  </select>
                </div>
              </div>

              {/* LIST DIRECT DATA GRID TABLE */}
              <div className="rounded-2xl glass-card bg-slate-900/40 p-6 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-400 font-mono text-[10px] uppercase">
                        <th className="py-3 px-3">STT</th>
                        <th className="py-3 px-3">Họ Tên</th>
                        <th className="py-3 px-3">Số Điện Thoại</th>
                        <th className="py-3 px-3">Nhu Cầu</th>
                        <th className="py-3 px-3">Ghi chú từ form</th>
                        <th className="py-3 px-3">Thời gian</th>
                        <th className="py-3 px-3">Trạng thái</th>
                        <th className="py-3 px-3 text-right">Lựa chọn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/3">
                      {filteredLeads.map((lead, idx) => (
                        <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                          <td className="py-4.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                          <td className="py-4.5 px-3">
                            <span className="block font-bold text-white text-xs sm:text-sm">{lead.fullName}</span>
                            <span className="block text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[140px]">{lead.email || "Không có email"}</span>
                          </td>
                          <td className="py-4.5 px-3 font-mono">
                            {lead.phone}
                          </td>
                          <td className="py-4.5 px-3">
                            <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-800 text-slate-300 font-semibold text-[11px]">
                              {lead.needs}
                            </span>
                          </td>
                          <td className="py-4.5 px-3 text-slate-400 truncate max-w-[160px]" title={lead.notes}>
                            {lead.notes || <span className="italic text-slate-600">Trống</span>}
                          </td>
                          <td className="py-4.5 px-3 text-slate-300 font-mono">
                            {new Date(lead.createdAt).toLocaleString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit"
                            })}
                          </td>
                          <td className="py-4.5 px-3">
                            <span className={`inline-block px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border uppercase ${statusColorMap(lead.status)}`}>
                              {statusLabelVietnamese(lead.status)}
                            </span>
                          </td>
                          <td className="py-4.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Fast Call Button */}
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-slate-950 transition-colors"
                                title="Gọi nhanh"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              {/* Fast Zalo Link Button */}
                              <a
                                href={`https://zalo.me/${lead.phone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-slate-950 transition-colors"
                                title="Mở Zalo chat"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                              {/* Copy clicker */}
                              <button
                                onClick={() => copyToClipboard(lead.phone)}
                                className="p-1.5 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
                                title="Sao chép SĐT"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setEditingLeadNotes(lead.adminNotes || "");
                                  setEditingLeadStatus(lead.status);
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                                title="Chi tiết"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500 hover:text-white text-red-400 transition-colors cursor-pointer"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center py-12 text-slate-400 italic">
                            Không tìm thấy dữ liệu khách hàng liên hệ phù hợp với truy vấn.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: QUẢN LÝ DỊCH VỤ ==================== */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center sm:gap-4 flex-wrap">
                <p className="text-xs text-slate-400 font-mono">
                  Quản lý danh sách các dịch vụ thiết kế website nổi bật, hiển thị trên trang chủ ngoài.
                </p>
                <button
                  onClick={() => {
                    setCurrentService({
                      title: "",
                      description: "",
                      iconName: "Sparkle",
                      badge: ""
                    });
                    setShowServiceModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg glow-button cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm dịch vụ mới</span>
                </button>
              </div>

              {/* LIST DIRECT TABLE */}
              <div className="rounded-2xl glass-card bg-slate-900/40 p-6 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-400 font-mono text-[10px] uppercase">
                        <th className="py-3 px-3">Biểu tượng</th>
                        <th className="py-3 px-3">Tên dịch vụ</th>
                        <th className="py-3 px-3">Mô tả ngắn</th>
                        <th className="py-3 px-3">Nhãn nổi bật</th>
                        <th className="py-3 px-3">Sắp xếp</th>
                        <th className="py-3 px-3 text-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/3">
                      {services.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-white/2 transition-colors">
                          <td className="py-4 px-3">
                            <div className="h-10 w-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center">
                              <LucideIcon name={item.iconName} className="w-5 h-5" />
                            </div>
                          </td>
                          <td className="py-4 px-3 font-semibold text-white sm:text-sm">
                            {item.title}
                          </td>
                          <td className="py-4 px-3 text-slate-300 max-w-sm truncate" title={item.description}>
                            {item.description}
                          </td>
                          <td className="py-4 px-3">
                            {item.badge ? (
                              <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-mono font-bold uppercase">
                                {item.badge}
                              </span>
                            ) : (
                              <span className="text-slate-600 italic">Trống</span>
                            )}
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex gap-1">
                              <button
                                disabled={idx === 0}
                                onClick={() => moveService(idx, 'up')}
                                className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                disabled={idx === services.length - 1}
                                onClick={() => moveService(idx, 'down')}
                                className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setCurrentService(item);
                                  setShowServiceModal(true);
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                                title="Sửa"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(item.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500 hover:text-white text-red-400 transition-colors cursor-pointer"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: QUẢN LÝ BẢNG GIÁ ==================== */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center sm:gap-4 flex-wrap">
                <p className="text-xs text-slate-400 font-mono">
                  Hiệu chỉnh các gói dịch vụ cơ bản cấu hình sẵn trên matrix để khách hàng ngoài dễ lựa chọn đăng ký.
                </p>
                <button
                  onClick={() => {
                    setCurrentPricing({
                      name: "",
                      price: "",
                      description: "",
                      deliveryTime: "3 - 5 ngày",
                      features: [],
                      isPopular: false
                    });
                    setShowPricingModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg glow-button cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>TẠO GÓI BẢNG GIÁ MỚI</span>
                </button>
              </div>

              {/* LIST DIRECT CARDS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricing.map((tier) => (
                  <div 
                    key={tier.id}
                    className={`rounded-2xl p-6 glass-card flex flex-col justify-between relative overflow-hidden backdrop-blur-md border ${
                      tier.isPopular ? "border-amber-500 shadow-xl shadow-amber-500/5 bg-slate-900/55" : "border-white/5"
                    }`}
                  >
                    {tier.isPopular && (
                      <span className="absolute top-2.5 right-2 text-[8px] font-mono font-bold tracking-widest bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                        BÁN CHẠY
                      </span>
                    )}

                    <div>
                      <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-4">
                        <div>
                          <span className="block text-sm font-bold text-white uppercase font-display">{tier.name}</span>
                          <span className="block text-2xl font-display font-extrabold text-amber-400 mt-1">{tier.price} <span className="text-[10px] font-normal text-slate-300">VNĐ</span></span>
                          <span className="block text-[10px] text-slate-400 mt-1 font-mono">⏱️ {tier.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleTogglePopular(tier.id)}
                            className={`p-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border shrink-0 ${
                              tier.isPopular 
                                ? "bg-amber-500/10 border-amber-500 text-amber-400" 
                                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                            }`}
                            title="Đánh dấu bán chạy"
                          >
                            Hot
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-4 italic">
                        {tier.description}
                      </p>

                      <div className="space-y-2">
                        <span className="block text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Quyền lợi ({tier.features.length}):</span>
                        <div className="space-y-1">
                          {tier.features.map((feat, i) => (
                            <div key={i} className="flex gap-1.5 items-start text-xs text-slate-300">
                              <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setCurrentPricing(tier);
                          setShowPricingModal(true);
                        }}
                        className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-center text-slate-200 transition-colors"
                      >
                        Sửa gói
                      </button>
                      <button
                        onClick={() => handleDeletePricing(tier.id)}
                        className="py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-xs text-red-400 font-semibold"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 5: QUẢN LÝ MẪU WEBSITE ==================== */}
          {activeTab === "templates" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center sm:gap-4 flex-wrap">
                <p className="text-xs text-slate-400 font-mono">
                  Hiệu chỉnh kho giao diện website mẫu lộng lẫy được chia thành nhiều chủ đề kinh doanh.
                </p>
                <button
                  onClick={() => {
                    setCurrentTemplate({
                      title: "",
                      category: "enterprise",
                      platform: "WordPress",
                      features: [],
                      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
                      liveUrl: ""
                    });
                    setShowTemplateModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg glow-button cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>XÂY DỰNG MẪU WEB MỚI</span>
                </button>
              </div>

              {/* LIST GRID FOR LAYOUTS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {templates.map((tmpl) => (
                  <div key={tmpl.id} className="group rounded-2xl glass-card bg-slate-900/40 overflow-hidden flex flex-col justify-between border border-white/5 relative">
                    <div>
                      {/* Image Preview with overlay header status */}
                      <div className="relative h-44 overflow-hidden bg-slate-950">
                        <img 
                          src={tmpl.imageUrl} 
                          alt={tmpl.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-slate-950/85 text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md text-amber-400 uppercase border border-white/10 z-10">
                          {tmpl.categoryLabel}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors" title={tmpl.title}>
                          {tmpl.title}
                        </h4>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          Nền tảng: <span className="font-semibold text-slate-200">{tmpl.platform}</span>
                        </p>
                        
                        <div className="space-y-1 pt-1 border-t border-white/3">
                          {tmpl.features.map((f, i) => (
                            <span key={i} className="inline-block text-[9px] bg-slate-950 border border-white/5 text-zinc-400 px-1.5 py-0.5 rounded mr-1 mb-1">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex gap-2">
                      <button
                        onClick={() => {
                          setCurrentTemplate(tmpl);
                          setShowTemplateModal(true);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold text-zinc-300 text-center"
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(tmpl.id)}
                        className="px-2 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 text-[10px]"
                        title="Xóa mẫu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 6: QUẢN LÝ NỘI DUNG TRANG CHỦ ==================== */}
          {activeTab === "homeContent" && homeContent && (
            <div className="glass-card bg-slate-900/40 rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSaveHomeContent} className="space-y-6">
                <div className="border-b border-white/5 pb-4 mb-3">
                  <h3 className="text-sm font-display font-bold uppercase tracking-wider text-slate-200">
                    Sửa đổi các tiêu đề & cấu trúc nội dung hiển thị cho khách
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Mọi chỉnh sửa lưu lại sẽ cập nhật ngay lập tức giao diện landing page chính bên ngoài.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hero Title */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tiêu đề thu hút Hero chính (H1)
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.heroTitle}
                      onChange={(e) => setHomeContent({ ...homeContent, heroTitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Hero Subtitle */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Mô tả ngắn trang chủ bên dưới Hero
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={homeContent.heroSubtitle}
                      onChange={(e) => setHomeContent({ ...homeContent, heroSubtitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  {/* Hero Primary Cta Text */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Chữ hiển thị Nút CTA chính (Ví dụ: Đăng ký tư vấn)
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.heroPrimaryCta}
                      onChange={(e) => setHomeContent({ ...homeContent, heroPrimaryCta: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Hero Secondary Cta Text */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Chữ hiển thị Nút CTA phụ (Ví dụ: Xem mẫu giao diện)
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.heroSecondaryCta}
                      onChange={(e) => setHomeContent({ ...homeContent, heroSecondaryCta: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Services Header */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tiêu đề phần Dịch Vụ
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.servicesTitle}
                      onChange={(e) => setHomeContent({ ...homeContent, servicesTitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Benefits Header */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tiêu đề phần Lợi Ích
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.benefitsTitle}
                      onChange={(e) => setHomeContent({ ...homeContent, benefitsTitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Process Header */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tiêu đề phần Quy Trình
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.processTitle}
                      onChange={(e) => setHomeContent({ ...homeContent, processTitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Pricing Header */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tiêu đề phần Bảng Giá
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.pricingTitle}
                      onChange={(e) => setHomeContent({ ...homeContent, pricingTitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* FAQ Header */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tiêu đề phần Hỏi Đáp (FAQ)
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.faqTitle}
                      onChange={(e) => setHomeContent({ ...homeContent, faqTitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Footer CTA Title */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Lời mời gọi CTA ở khối sảnh phụ dưới chân trang
                    </label>
                    <input
                      type="text"
                      required
                      value={homeContent.footerCtaTitle}
                      onChange={(e) => setHomeContent({ ...homeContent, footerCtaTitle: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 hover:shadow-lg glow-button text-slate-950 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer flex-1 sm:flex-initial"
                  >
                    LƯU THAY ĐỔI NGAY
                  </button>
                  <button
                    type="button"
                    onClick={onBackToLanding}
                    className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-center cursor-pointer"
                  >
                    XEM TRƯỚC NGOÀI HOME
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== TAB 7: CÀI ĐẶT LIÊN HỆ ==================== */}
          {activeTab === "contactSettings" && contactSettings && (
            <div className="glass-card bg-slate-900/40 rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSaveContactSettings} className="space-y-6">
                <div className="border-b border-white/5 pb-4 mb-3">
                  <h3 className="text-sm font-display font-bold uppercase tracking-wider text-slate-100">
                    Cấu hình cổng Hotline, Số Zalo, các mạng xã hội & footer
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Xác lập các thông tin liên lạc để kéo khách chat đổ trực tiếp về máy điện thoại của bạn.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brand name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tên thương hiệu chính
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.brandName}
                      onChange={(e) => setContactSettings({ ...contactSettings, brandName: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Hotline */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Số Hotline gọi điện thoại tư vấn
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.hotline}
                      onChange={(e) => setContactSettings({ ...contactSettings, hotline: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Zalo ID */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Số hoặc liên kết chat Zalo trực diện (zalo.me/sđt)
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.zalo}
                      onChange={(e) => setContactSettings({ ...contactSettings, zalo: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Business Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Hòm thư hỗ trợ chính thức Email
                    </label>
                    <input
                      type="email"
                      required
                      value={contactSettings.email}
                      onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Business Address */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Địa chỉ văn phòng / Nhà riêng hoạt động
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.address}
                      onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Social Profile links */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Đường dẫn liên kết chi tiết Facebook Cá Nhân
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.facebook}
                      onChange={(e) => setContactSettings({ ...contactSettings, facebook: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Đường dẫn trang Fanpage thương hiệu tổng
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.fanpage}
                      onChange={(e) => setContactSettings({ ...contactSettings, fanpage: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Tài khoản liên kết Tiktok / ID cá nhân
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.tiktok}
                      onChange={(e) => setContactSettings({ ...contactSettings, tiktok: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Đường dẫn nhúng định vị bản đồ Google Maps
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSettings.googleMaps}
                      onChange={(e) => setContactSettings({ ...contactSettings, googleMaps: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  {/* Footer Info Text */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300">
                      Giới thiệu ngắn dưới chân trang Footer
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={contactSettings.footerText}
                      onChange={(e) => setContactSettings({ ...contactSettings, footerText: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 hover:shadow-lg glow-button text-slate-950 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer"
                  >
                    LƯU ĐỒNG BỘ THÔNG TIN LIÊN HỆ
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* ==================== popup MODAL 1: VIEW/UPDATE LEAD DETAILS ==================== */}
      {selectedLead && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs font-sans">
          <div className="relative w-full max-w-lg glass-card bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl">
            <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="block text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                CHI TIẾT KHÁCH HÀNG LIÊN HỆ
              </span>
              <h3 className="text-lg sm:text-xl font-display font-black text-white mt-1 border-b border-white/5 pb-3">
                {selectedLead.fullName}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="block text-zinc-500 font-mono">SỐ ĐIỆN THOẠI:</span>
                <span className="block text-slate-200 font-medium text-sm">{selectedLead.phone}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-zinc-500 font-mono">ĐỊA CHỈ EMAIL:</span>
                <span className="block text-slate-200 font-medium truncate">{selectedLead.email || "Chưa cung cấp"}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-zinc-500 font-mono">NHU CẦU LƯA CHỌN:</span>
                <span className="block text-amber-400 font-semibold">{selectedLead.needs}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-zinc-500 font-mono">THỜI ĐIỂM ĐĂNG KÝ:</span>
                <span className="block text-slate-300 font-mono">
                  {new Date(selectedLead.createdAt).toLocaleString("vi-VN")}
                </span>
              </div>
              <div className="col-span-2 p-3.5 rounded-xl bg-slate-950 border border-white/5 text-slate-300 italic">
                <span className="block text-[10px] font-mono text-slate-400 font-bold not-italic mb-1 uppercase">Lời nhắn của khách hàng:</span>
                "{selectedLead.notes || "Khách không điền nội dung lời nhắn đặc thù."}"
              </div>
            </div>

            {/* Admin Notes Edit Zone */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  ⚠️ Trạng thái chăm sóc:
                </label>
                <select
                  value={editingLeadStatus}
                  onChange={(e) => setEditingLeadStatus(e.target.value)}
                  className="block w-full px-3 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:outline-none"
                >
                  <option value="pending">Mới (Chờ liên hệ)</option>
                  <option value="contacted">Đã liên hệ sơ bộ</option>
                  <option value="consulting">Đang tư vấn chuyên sâu</option>
                  <option value="completed">Đã chốt thỏa thuận</option>
                  <option value="unsuitable">Không phù hợp / Huỷ bỏ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  📝 Ghi chú nội bộ của Admin:
                </label>
                <textarea
                  value={editingLeadNotes}
                  onChange={(e) => setEditingLeadNotes(e.target.value)}
                  placeholder="Ghi chú lại thời gian gọi tư vấn, ý kiến phản hồi của KH..."
                  rows={3}
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={handleUpdateLead}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider glow-button cursor-pointer"
                >
                  Cập nhật trạng thái
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
                >
                  Đóng lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== popup MODAL 2: ADD/EDIT SERVICE ==================== */}
      {showServiceModal && currentService && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs font-sans">
          <div className="relative w-full max-w-md glass-card bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl">
            <button 
              onClick={() => {
                setShowServiceModal(false);
                setCurrentService(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="block text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                {currentService.id ? "CẬP NHẬT PHÂN MỤC DỊCH VỤ" : "THÊM PHÂN MỤC DỊCH VỤ MỚI"}
              </span>
              <h3 className="text-base sm:text-lg font-display font-black text-white mt-1 border-b border-white/5 pb-2">
                {currentService.id ? currentService.title : "Tạo mẫu dịch vụ hiển thị"}
              </h3>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 uppercase">Tên dịch vụ</label>
                <input
                  type="text"
                  required
                  value={currentService.title || ""}
                  onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                  placeholder="Website Spa & Viện Thẩm Mỹ"
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 uppercase">Mô tả chi tiết</label>
                <textarea
                  rows={3}
                  required
                  value={currentService.description || ""}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                  placeholder="Mô tả bố cục và chức năng chính của dịch vụ..."
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-300 uppercase">Icon hiển thị</label>
                  <select
                    value={currentService.iconName || "Sparkles"}
                    onChange={(e) => setCurrentService({ ...currentService, iconName: e.target.value })}
                    className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs focus:ring-0"
                  >
                    <option value="Building2">Building2 (Công ty)</option>
                    <option value="ShoppingBag">ShoppingBag (Bán hàng)</option>
                    <option value="Home">Home (BĐS / Nhà cửa)</option>
                    <option value="Utensils">Utensils (Món ăn / Cafe)</option>
                    <option value="Sparkles">Sparkles (Spa / Làm đẹp)</option>
                    <option value="GraduationCap">Graduation (Trường học)</option>
                    <option value="User">User (Cá nhân)</option>
                    <option value="Target">Target (Landing page)</option>
                    <option value="CalendarRange">Calendar (Lịch biểu)</option>
                    <option value="Briefcase">Briefcase (Công việc)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-300 uppercase">Nhãn nổi bật (Badge)</label>
                  <input
                    type="text"
                    value={currentService.badge || ""}
                    onChange={(e) => setCurrentService({ ...currentService, badge: e.target.value })}
                    placeholder="Hot / New"
                    className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase cursor-pointer glow-button"
                >
                  Xác nhận lưu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowServiceModal(false);
                    setCurrentService(null);
                  }}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
                >
                  Bỏ qua
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== popup MODAL 3: ADD/EDIT PRICING TIER ==================== */}
      {showPricingModal && currentPricing && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs font-sans">
          <div className="relative w-full max-w-md glass-card bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl">
            <button 
              onClick={() => {
                setShowPricingModal(false);
                setCurrentPricing(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="block text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                {currentPricing.id ? "CHỈNH SỬA GÓI BẢNG GIÁ" : "THIẾT LẬP GÓI CƯỚC MỚI CHI TIẾT"}
              </span>
              <h3 className="text-base sm:text-lg font-display font-black text-white mt-1 border-b border-white/5 pb-2">
                {currentPricing.id ? currentPricing.name : "Tạo gói báo giá"}
              </h3>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 uppercase">Tên gói cước</label>
                <input
                  type="text"
                  required
                  value={currentPricing.name || ""}
                  onChange={(e) => setCurrentPricing({ ...currentPricing, name: e.target.value })}
                  placeholder="Website Chuyên Nghiệp"
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-300 uppercase">Giá dịch vụ (VNĐ)</label>
                  <input
                    type="text"
                    required
                    value={currentPricing.price || ""}
                    onChange={(e) => setCurrentPricing({ ...currentPricing, price: e.target.value })}
                    placeholder="4.490.000"
                    className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-300 uppercase">Thời gian thi công</label>
                  <input
                    type="text"
                    required
                    value={currentPricing.deliveryTime || ""}
                    onChange={(e) => setCurrentPricing({ ...currentPricing, deliveryTime: e.target.value })}
                    placeholder="7 - 10 ngày"
                    className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 uppercase">Mô tả tóm tắt gói</label>
                <input
                  type="text"
                  value={currentPricing.description || ""}
                  onChange={(e) => setCurrentPricing({ ...currentPricing, description: e.target.value })}
                  placeholder="Dành cho doanh nghiệp vừa và nhỏ giới thiệu công ty..."
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                />
              </div>

              {/* pricing features crud inline */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 uppercase">Danh sách quyền lợi ({currentPricing.features?.length || 0})</label>
                <div className="max-h-24 overflow-y-auto space-y-1.5 border border-white/5 p-2 rounded-xl bg-slate-950/40">
                  {currentPricing.features?.map((feat, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-1.5 rounded bg-white/5 text-[11px]">
                      <span className="truncate">{feat}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedFeat = currentPricing.features?.filter((_, i) => i !== index) || [];
                          setCurrentPricing({ ...currentPricing, features: updatedFeat });
                        }}
                        className="text-red-400 hover:text-red-500 font-bold"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                  {(!currentPricing.features || currentPricing.features.length === 0) && (
                    <span className="block text-center text-slate-500 italic text-[11px] py-2">Chưa thiết lập quyền lợi nào</span>
                  )}
                </div>

                {/* Add dynamic inline feature */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    placeholder="Thêm một gạch đầu dòng quyền lợi mới..."
                    className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-white text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newFeatureText.trim()) return;
                      const updatedFeat = [...(currentPricing.features || []), newFeatureText.trim()];
                      setCurrentPricing({ ...currentPricing, features: updatedFeat });
                      setNewFeatureText("");
                    }}
                    className="px-2.5 bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-[11px] font-bold rounded-lg cursor-pointer"
                  >
                    Thêm
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase cursor-pointer glow-button"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPricingModal(false);
                    setCurrentPricing(null);
                  }}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
                >
                  Quay lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== popup MODAL 4: ADD/EDIT TEMPLATE ==================== */}
      {showTemplateModal && currentTemplate && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs font-sans">
          <div className="relative w-full max-w-md glass-card bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl">
            <button 
              onClick={() => {
                setShowTemplateModal(false);
                setCurrentTemplate(null);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="block text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                {currentTemplate.id ? "CHỈNH SỬA THÔNG TIN BẢN MẪU" : "TÙY BIẾN GIAO DIỆN DEMO MỚI"}
              </span>
              <h3 className="text-base sm:text-lg font-display font-black text-white mt-1 border-b border-white/5 pb-2">
                {currentTemplate.id ? currentTemplate.title : "Tạo mẫu trưng bày"}
              </h3>
            </div>

            <form onSubmit={handleSaveTemplate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 uppercase">Tên mẫu giao diện</label>
                <input
                  type="text"
                  required
                  value={currentTemplate.title || ""}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, title: e.target.value })}
                  placeholder="Helix Corp - Website Doanh Nghiệp Công Nghệ"
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-300 uppercase">Nền tảng sử dụng</label>
                  <input
                    type="text"
                    required
                    value={currentTemplate.platform || ""}
                    onChange={(e) => setCurrentTemplate({ ...currentTemplate, platform: e.target.value })}
                    placeholder="WordPress / Shopify"
                    className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-300 uppercase">Phân mục chủ đề lặp</label>
                  <select
                    value={currentTemplate.category || "enterprise"}
                    onChange={(e) => setCurrentTemplate({ ...currentTemplate, category: e.target.value as any })}
                    className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs"
                  >
                    <option value="enterprise">Doanh Nghiệp</option>
                    <option value="ecommerce">Bán Hàng Online</option>
                    <option value="landing">Landing Page</option>
                    <option value="booking">Spa / BĐS / Đặt lịch</option>
                    <option value="personal">Thương Hiệu Cá Nhân</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 uppercase">Ảnh liên kết xem thử (URL)</label>
                <input
                  type="text"
                  value={currentTemplate.imageUrl || ""}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 uppercase">Link Demo thực tế (nếu có)</label>
                <input
                  type="text"
                  value={currentTemplate.liveUrl || ""}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, liveUrl: e.target.value })}
                  placeholder="https://demo.wesign.vn/company"
                  className="block w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-mono"
                />
              </div>

              {/* templates tags inline */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300 uppercase">Tính năng nổi trội ({currentTemplate.features?.length || 0})</label>
                <div className="max-h-20 overflow-y-auto space-y-1 rounded-xl border border-white/5 bg-slate-950 p-2 text-xs text-white">
                  {currentTemplate.features?.map((f, index) => (
                    <div key={index} className="flex items-center justify-between p-1 rounded-lg bg-white/5 text-[11px] mb-1">
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = currentTemplate.features?.filter((_, i) => i !== index) || [];
                          setCurrentTemplate({ ...currentTemplate, features: updated });
                        }}
                        className="text-red-400 font-bold"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newTmplFeatureText}
                    onChange={(e) => setNewTmplFeatureText(e.target.value)}
                    placeholder="Sản phẩm mượt, Dark mode..."
                    className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-lg text-white text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newTmplFeatureText.trim()) return;
                      const updated = [...(currentTemplate.features || []), newTmplFeatureText.trim()];
                      setCurrentTemplate({ ...currentTemplate, features: updated });
                      setNewTmplFeatureText("");
                    }}
                    className="px-2.5 bg-white/10 text-slate-200 text-[11px] font-bold rounded-lg cursor-pointer"
                  >
                    Thêm tag
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase cursor-pointer glow-button"
                >
                  Bản lưu nháp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTemplateModal(false);
                    setCurrentTemplate(null);
                  }}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
                >
                  Quay lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
