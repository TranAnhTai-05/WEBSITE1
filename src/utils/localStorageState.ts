import { 
  ContactSubmission, 
  ServiceItem, 
  PriceTier, 
  TemplateItem, 
  HomeContent, 
  ContactSettings 
} from "../types";

// Fallbacks for initial load if localStorage is empty
const defaultSubmissions: ContactSubmission[] = [
  {
    id: "lead-1",
    fullName: "Nguyễn Văn Hải",
    phone: "0912345678",
    email: "hai.nguyen@gmail.com",
    needs: "Website bán hàng online",
    notes: "Cần tích hợp giỏ hàng thanh toán và kéo về Zalo tư vấn thêm.",
    createdAt: "2026-06-09T14:30:00Z",
    status: "pending",
    adminNotes: "Khách gọi giờ hành chính. Cần chuẩn bị trước demo mẫu bán hàng thời trang."
  },
  {
    id: "lead-2",
    fullName: "Trần Thị Minh",
    phone: "0987654321",
    email: "minh_tran92@hotmail.com",
    needs: "Landing page chạy quảng cáo",
    notes: "Chạy ads dịch vụ Spa Đông Y, cần tối ưu chuyển đổi click nút Zalo.",
    createdAt: "2026-06-08T09:12:00Z",
    status: "contacted",
    adminNotes: "Đã gọi trao đổi sơ qua, khách muốn xem thêm các mẫu Landing Page Spa."
  },
  {
    id: "lead-3",
    fullName: "Lê Hoàng Nam",
    phone: "0905112233",
    email: "namle_realest@gmail.com",
    needs: "Website bất động sản",
    notes: "Dựng web giới thiệu dự án chung cư cao cấp. Có bảng đăng ký nhận báo giá.",
    createdAt: "2026-06-07T16:45:00Z",
    status: "consulting",
    adminNotes: "Đang lên outline sơ đồ layout các block tiện ích căn hộ."
  },
  {
    id: "lead-4",
    fullName: "Phạm Thanh Hương",
    phone: "0933998877",
    email: "huong.spa@spa-aura.vn",
    needs: "Website spa/thẩm mỹ",
    notes: "Làm trang web đặt lịch chăm sóc sắc đẹp, giới thiệu spa cao cấp.",
    createdAt: "2026-06-05T11:20:00Z",
    status: "completed",
    adminNotes: "Đã chốt hợp đồng gói chuyên nghiệp. Đang thiết kế sitemap."
  },
  {
    id: "lead-5",
    fullName: "Vũ Đức Anh",
    phone: "0977889900",
    email: "ducanh.vu@corp-helix.vn",
    needs: "Website giới thiệu doanh nghiệp",
    notes: "Giao diện hiện đại sáng tạo cho công ty Logistic quốc tế.",
    createdAt: "2026-06-04T08:15:00Z",
    status: "unsuitable",
    adminNotes: "Ngân sách khách quá thấp so với các yêu cầu đặc thù về tra cứu thông tin vận đơn."
  }
];

const defaultServices: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Website giới thiệu doanh nghiệp",
    description: "Giới thiệu thương hiệu, năng lực công ty và gia tăng độ tin cậy vượt trội trong mắt đối tác.",
    iconName: "Building2",
    badge: "UY TÍN"
  },
  {
    id: "srv-2",
    title: "Website bán hàng online",
    description: "Tích hợp giỏ hàng, thanh toán trực tuyến, quản lý sản phẩm chuyên nghiệp như sàn TMĐT.",
    iconName: "ShoppingBag",
    badge: "BÁN CHẠY"
  },
  {
    id: "srv-3",
    title: "Website bất động sản",
    description: "Trình diễn dự án lộng lẫy, đầy đủ thông tin căn hộ, bảng giá và mẫu đăng ký nhận tài liệu.",
    iconName: "Home"
  },
  {
    id: "srv-4",
    title: "Website spa/thẩm mỹ",
    description: "Giao diện thanh lịch, tối giản sang trọng đi kèm hệ thống đặt lịch hẹn dịch vụ tiện lợi.",
    iconName: "Sparkles"
  },
  {
    id: "srv-5",
    title: "Website nhà hàng/quán cà phê",
    description: "Hiển thị menu bắt mắt, hỗ trợ đặt bàn trực tuyến và tích hợp bản đồ chỉ đường thông minh.",
    iconName: "Utensils"
  },
  {
    id: "srv-6",
    title: "Website trung tâm đào tạo",
    description: "Giới thiệu lịch khai giảng, giảng viên, khóa đào tạo và form đăng ký học viên tối ưu.",
    iconName: "GraduationCap"
  },
  {
    id: "srv-7",
    title: "Landing page chạy quảng cáo",
    description: "Thiết kế tập trung hành động chuyển đổi (CTA), tối ưu tỷ lệ mua hàng khi chạy Facebook/Google Ads.",
    iconName: "Target",
    badge: "TỐI ƯU ADS"
  },
  {
    id: "srv-8",
    title: "Website thương hiệu cá nhân",
    description: "Khẳng định chuyên môn, xây dựng uy tín cá nhân cho huấn luyện viên, giáo viên, chuyên gia.",
    iconName: "User"
  }
];

const defaultPricing: PriceTier[] = [
  {
    id: "price-1",
    name: "Website Cơ Bản",
    price: "1.990.000",
    description: "Giải pháp hoàn hảo cho cá nhân, giáo viên, dịch vụ tự do hoặc cửa hàng nhỏ cần hiện diện nhanh trên Internet.",
    deliveryTime: "3 - 5 ngày",
    features: [
      "Thiết kế 1 - 3 trang nội dung chính",
      "Giao diện hiện đại, sạch sẽ, chuẩn smartphone",
      "Trang chủ nổi bật thông tin dịch vụ, giới thiệu",
      "Tích hợp nút gọi nhanh và nút Zalo rung lắc",
      "Form đăng ký tư vấn cơ bản (Chuyển tiếp Email)",
      "Bàn giao 100% tài khoản admin chính chủ",
      "Tặng video hướng dẫn tự cập nhật văn bản & hình ảnh"
    ],
    isPopular: false
  },
  {
    id: "price-2",
    name: "Website Chuyên Nghiệp",
    price: "4.490.000",
    badge: "Khuyên Dùng / Bán Chạy",
    description: "Phù hợp cho doanh nghiệp nhỏ, trung tâm đào tạo, Spa, nhà hàng hay các môi trường cần nhận diện thương hiệu cao cấp.",
    deliveryTime: "7 - 10 ngày",
    features: [
      "Thiết kế 4 - 7 trang chuẩn SEO",
      "Đầy đủ: Giới thiệu, Dịch vụ/Sản phẩm, Tin tức, Liên hệ",
      "Giao diện chuẩn hóa cao, thiết kế độc quyền hiện đại",
      "Tải trang siêu tốc, tối ưu hóa kích thước hình ảnh",
      "Tích hợp biểu mẫu nhận tư vấn đa dạng tự động",
      "Tích hợp Zalo Chatbot, Messenger, Bản đồ Google Maps",
      "Cài đặt mã pixel tracking Google Analytics / Facebook",
      "Hỗ trợ tối ưu hóa bài viết sản phẩm mẫu (up hộ 5-10 bài)",
      "Bảo hành hiển thị, kèm tài liệu hướng dẫn chuyên sâu"
    ],
    isPopular: true
  },
  {
    id: "price-3",
    name: "Bán Hàng / Landing Page Cao Cấp",
    price: "2.990.000",
    description: "Tối ưu hóa tuyệt đối cho lưu lượng truy cập từ quảng cáo Facebook Ads, Google Ads hoặc Tiktok Ads.",
    deliveryTime: "4 - 6 ngày",
    features: [
      "Thiết kế Landing Page siêu dài kích thích mua sắm",
      "Bố cục nghiên cứu chuẩn tâm lý khách hàng bán lẻ",
      "Form đặt hàng nhanh, tích hợp popup vòng quay may mắn",
      "Đếm ngược khuyến mãi tạo sự khan hiếm (Countdown Timer)",
      "Đồng bộ hóa đơn hàng tự động về Google Sheets lập tức",
      "Gắn mã theo dõi chuyển đổi Facebook/Tiktok Pixel chính xác",
      "Tốc độ phản hồi cực nhanh giúp tối thiểu hóa tỷ lệ thoát trang",
      "Hỗ trợ chỉnh sửa và thay nội dung 2 lần miễn phí"
    ],
    isPopular: false
  }
];

const defaultTemplates: TemplateItem[] = [
  {
    id: "tmpl-1",
    title: "Helix Corp - Doanh nghiệp công nghệ hiện đại",
    category: "enterprise",
    categoryLabel: "Doanh Nghiệp",
    platform: "Webflow / Code",
    features: ["Hiệu ứng 3D nổi bật", "Dark mode huyền ảo", "Cấu trúc dịch vụ dạng Grid"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/helix-corp"
  },
  {
    id: "tmpl-2",
    title: "Vogue Store - Thời trang bán hàng tối giản",
    category: "ecommerce",
    categoryLabel: "Bán Hàng Online",
    platform: "Shopify / Haravan",
    features: ["Bộ lọc bộ sưu tập thông minh", "Trải nghiệm thanh toán 1 bước", "Tương thích cao di động"],
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/vogue-store"
  },
  {
    id: "tmpl-3",
    title: "Urban Nest - Dự án Bất Động Sản lộng lẫy",
    category: "enterprise",
    categoryLabel: "Dự Án / BĐS",
    platform: "WordPress",
    features: ["Bản đồ liên kết dự án", "Bộ sưu tập 3D Panorama", "Form tải tài liệu tự động"],
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/urban-nest"
  },
  {
    id: "tmpl-4",
    title: "Savory Plate - Nhà hàng ẩm thực & Coffee",
    category: "booking",
    categoryLabel: "Nhà Hàng & Coffee",
    platform: "Wix / WordPress",
    features: ["Menu điện tử trực quan", "Đặt bàn chọn khung giờ", "Tìm kiếm và dẫn đường Maps"],
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/savory-plate"
  },
  {
    id: "tmpl-5",
    title: "Aura Clinic - Viện spa thẩm mỹ cao cấp",
    category: "booking",
    categoryLabel: "Spa & Thẩm Mỹ",
    platform: "WordPress / Wix",
    features: ["Giao diện phấn hồng dịu mắt", "Hệ thống đặt dịch vụ bác sĩ", "Feedback khách hàng thực tế"],
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/aura-clinic"
  },
  {
    id: "tmpl-6",
    title: "EduCore - Trung tâm khóa học trực tuyến",
    category: "personal",
    categoryLabel: "Đào Tạo / Khóa Học",
    platform: "WordPress / Code",
    features: ["Hiển thị bài giảng theo chương", "Thanh toán sở hữu khóa học", "Hồ sơ cá nhân giảng viên"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/educore"
  },
  {
    id: "tmpl-7",
    title: "Zenith - Personal Portfolio cá nhân",
    category: "personal",
    categoryLabel: "Thương Hiệu Cá Nhân",
    platform: "Google Sites / Wix",
    features: ["Bố cục vạt nghiêng hiện đại", "Tích hợp trang viết cảm nhận", "Liên kết các mạng xã hội chính"],
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/zenith-portfolio"
  },
  {
    id: "tmpl-8",
    title: "Impact Page - Landing Page bán thực phẩm sạch",
    category: "landing",
    categoryLabel: "Landing Page",
    platform: "Ladipage",
    features: ["Timer đếm ngược khan hiếm", "Mua ngay tặng kèm Voucher", "Feedback ảnh chụp Zalo chân thực"],
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=85",
    liveUrl: "https://demo.wesign.vn/impact-landing"
  }
];

const defaultHomeContent: HomeContent = {
  heroTitle: "Thiết kế website Xịn xò & Cao cấp cho doanh nghiệp",
  heroSubtitle: "Bạn cần website? Tôi giúp bạn sở hữu trang web đẹp, nhanh, chuẩn SEO và dễ quản lý trên đa nền tảng: WordPress, Shopify, LadiPage, Webflow, Google Sites...",
  heroPrimaryCta: "Tư vấn miễn phí",
  heroSecondaryCta: "Khám phá mẫu web",
  servicesTitle: "Tôi có thể giúp bạn làm website gì?",
  benefitsTitle: "Lợi ích tuyệt đối khi sở hữu website chuyên nghiệp",
  processTitle: "Quy trình thiết kế & bàn giao tinh gọn",
  pricingTitle: "Bảng giá thi công website trọn gói",
  faqTitle: "Giải đáp mọi thắc mắc của bạn",
  footerCtaTitle: "Sẵn Sàng Kiến Tạo Ngôi Nhà Online Cho Bạn?"
};

const defaultContactSettings: ContactSettings = {
  brandName: "Wesign Studio",
  hotline: "0982555312",
  zalo: "0982555312",
  email: "contact@wesign.vn",
  address: "Phân khu Origami, Vinhomes Grand Park, Thủ Đức, Thành phố Hồ Chí Minh",
  facebook: "https://facebook.com/wesign.studio",
  fanpage: "https://facebook.com/wesign.page",
  tiktok: "https://tiktok.com/@wesign.studio",
  googleMaps: "https://maps.google.com/?q=Vinhomes+Grand+Park+Thu+Duc",
  footerText: "Chuyên thiết kế website cho cá nhân, cửa hàng, trung tâm đào tạo, spa, nhà hàng và doanh nghiệp nhỏ. Đảm bảo các tiêu chí thẩm mỹ tối tân, tốc độ vượt trội và làm chủ hoàn toàn."
};

// Pure utility functions to fetch/persist state with easy names
export const getStoredSubmissions = (): ContactSubmission[] => {
  const data = localStorage.getItem("wesign_contact_submissions");
  if (!data) {
    localStorage.setItem("wesign_contact_submissions", JSON.stringify(defaultSubmissions));
    return defaultSubmissions;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultSubmissions;
  }
};

export const saveStoredSubmissions = (subs: ContactSubmission[]) => {
  localStorage.setItem("wesign_contact_submissions", JSON.stringify(subs));
};

export const getStoredServices = (): ServiceItem[] => {
  const data = localStorage.getItem("wesign_services");
  if (!data) {
    localStorage.setItem("wesign_services", JSON.stringify(defaultServices));
    return defaultServices;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultServices;
  }
};

export const saveStoredServices = (services: ServiceItem[]) => {
  localStorage.setItem("wesign_services", JSON.stringify(services));
};

export const getStoredPricing = (): PriceTier[] => {
  const data = localStorage.getItem("wesign_pricing");
  if (!data) {
    localStorage.setItem("wesign_pricing", JSON.stringify(defaultPricing));
    return defaultPricing;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultPricing;
  }
};

export const saveStoredPricing = (pricing: PriceTier[]) => {
  localStorage.setItem("wesign_pricing", JSON.stringify(pricing));
};

export const getStoredTemplates = (): TemplateItem[] => {
  const data = localStorage.getItem("wesign_templates");
  if (!data) {
    localStorage.setItem("wesign_templates", JSON.stringify(defaultTemplates));
    return defaultTemplates;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultTemplates;
  }
};

export const saveStoredTemplates = (templates: TemplateItem[]) => {
  localStorage.setItem("wesign_templates", JSON.stringify(templates));
};

export const getStoredHomeContent = (): HomeContent => {
  const data = localStorage.getItem("wesign_home_content");
  if (!data) {
    localStorage.setItem("wesign_home_content", JSON.stringify(defaultHomeContent));
    return defaultHomeContent;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultHomeContent;
  }
};

export const saveStoredHomeContent = (content: HomeContent) => {
  localStorage.setItem("wesign_home_content", JSON.stringify(content));
};

export const getStoredContactSettings = (): ContactSettings => {
  const data = localStorage.getItem("wesign_contact_settings");
  if (!data) {
    localStorage.setItem("wesign_contact_settings", JSON.stringify(defaultContactSettings));
    return defaultContactSettings;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultContactSettings;
  }
};

export const saveStoredContactSettings = (settings: ContactSettings) => {
  localStorage.setItem("wesign_contact_settings", JSON.stringify(settings));
};
