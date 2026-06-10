import {
  ServiceItem,
  PlatformItem,
  BenefitItem,
  StrengthItem,
  ProcessStep,
  PriceTier,
  TemplateItem,
  FAQItem
} from "./types";

export const servicesData: ServiceItem[] = [
  {
    id: "corp",
    title: "Website Doanh nghiệp",
    description: "Giới thiệu thương hiệu, năng lực công ty và gia tăng độ tin cậy vượt trội trong mắt đối tác.",
    iconName: "Building2",
    badge: "Phổ biến"
  },
  {
    id: "shop",
    title: "Cửa hàng & Bán hàng Online",
    description: "Tích hợp giỏ hàng, thanh toán trực tuyến, quản lý sản phẩm chuyên nghiệp như sàn TMĐT.",
    iconName: "ShoppingBag"
  },
  {
    id: "realestate",
    title: "Bất động sản / Dự án",
    description: "Trình diễn dự án lộng lẫy, đầy đủ thông tin căn hộ, bảng giá và mẫu đăng ký nhận tài liệu.",
    iconName: "Home"
  },
  {
    id: "restaurant",
    title: "Nhà hàng & Quán Cà phê",
    description: "Hiển thị menu bắt mắt, hỗ trợ đặt bàn trực tuyến và tích hợp bản đồ chỉ đường thông minh.",
    iconName: "Utensils"
  },
  {
    id: "spa",
    title: "Spa & Viện Thẩm Mỹ",
    description: "Giao diện thanh lịch, tối giản sang trọng đi kèm hệ thống đặt lịch hẹn dịch vụ tiện lợi.",
    iconName: "Sparkles"
  },
  {
    id: "education",
    title: "Trung tâm Đào tạo & Khóa học",
    description: "Giới thiệu lịch khai giảng, giảng viên, khóa đào tạo và form đăng ký học viên tối ưu.",
    iconName: "GraduationCap"
  },
  {
    id: "personal",
    title: "Thương hiệu Cá nhân",
    description: "Khẳng định chuyên môn, xây dựng uy tín cá nhân cho huấn luyện viên, giáo viên, chuyên gia.",
    iconName: "User"
  },
  {
    id: "landing",
    title: "Landing Page Quảng cáo",
    description: "Thiết kế tập trung hành động chuyển đổi (CTA), tối ưu tỷ lệ mua hàng khi chạy Facebook/Google Ads.",
    iconName: "Target",
    badge: "Chuyển Đổi Cao"
  },
  {
    id: "booking",
    title: "Đặt lịch & Thu thập Lead",
    description: "Thu giữ thông tin khách hàng tiềm năng, đặt lịch tư vấn tự động hóa chuyển về email/Zalo.",
    iconName: "CalendarRange"
  },
  {
    id: "portfolio",
    title: "Portfolio / Trưng bày sản phẩm",
    description: "Nơi lý tưởng trưng bày các dự án, ảnh chụp hay tác phẩm thiết kế của studio hoặc cá nhân nghệ sĩ.",
    iconName: "Briefcase"
  }
];

export const platformsData: PlatformItem[] = [
  {
    id: "wp",
    name: "WordPress",
    description: "Hệ quản trị nội dung tốt nhất thế giới, cực mạnh về chuẩn SEO, kho giao diện khổng lồ và dễ mở rộng tính năng vô hạn.",
    logoType: "wordpress",
    bestFor: "Doanh nghiệp, Blog, eCommerce vừa và lớn",
    popularity: 5
  },
  {
    id: "gs",
    name: "Google Sites",
    description: "Nền tảng miễn phí từ Google, tối giản hết mức, siêu tốc và tiết kiệm 100% chi phí duy trì hàng tháng.",
    logoType: "google",
    bestFor: "Dự án nhỏ, giáo viên, giới thiệu tối giản",
    popularity: 3
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Tiêu chuẩn vàng cho thương mại điện tử toàn cầu, bảo mật tối đa, hạ tầng tải nhanh tuyệt đối và báo cáo bán hàng chi tiết.",
    logoType: "shopify",
    bestFor: "Bán hàng chuyên nghiệp, xuất khẩu",
    popularity: 5
  },
  {
    id: "wix",
    name: "Wix",
    description: "Kéo thả trực quan hoàn hảo, xây dựng giao diện tùy biến tự do theo ý muốn mà không lo giới hạn bố cục.",
    logoType: "wix",
    bestFor: "Showcase, Portfolio, triển khai cực nhanh",
    popularity: 4
  },
  {
    id: "harasapo",
    name: "Haravan / Sapo",
    description: "Nền tảng Việt Nam tối ưu hoàn hảo cho kinh doanh đa kênh, kết nối trực tiếp kho vận GHTK, GHN, Shopee, Lazada.",
    logoType: "local",
    bestFor: "Cửa hàng bán lẻ tại thị trường Việt Nam",
    popularity: 4
  },
  {
    id: "ldp",
    name: "Ladipage",
    description: "Nền tảng số 1 Việt Nam về landing page. Tốc độ tải trang < 1s, kết nối mượt mà API của Google Sheets, CRM, Haravan.",
    logoType: "ladipage",
    bestFor: "Chạy Ads bán hàng trực tiếp, tối ưu chuyển đổi",
    popularity: 5
  },
  {
    id: "webflow",
    name: "Webflow",
    description: "Công cụ cho các agency thiết kế hàng đầu. Hiệu ứng visual đỉnh cao, code sạch hoàn hảo, tốc độ vượt trội.",
    logoType: "webflow",
    bestFor: "Website phân khúc cao cấp, animation đẹp",
    popularity: 4
  },
  {
    id: "custom",
    name: "Website Code Riêng (React/NextJS)",
    description: "Thiết kế riêng biệt theo nghiệp vụ đặc thù của doanh nghiệp. Hiệu năng đỉnh cao, bảo mật tối đa, không giới hạn.",
    logoType: "code",
    bestFor: "Nhu cầu đặc thù, khởi nghiệp công nghệ, Startup",
    popularity: 4
  }
];

export const benefitsData: BenefitItem[] = [
  {
    id: "b1",
    title: "Ngôi Nhà Online Độc Quyền",
    description: "Sở hữu địa chỉ định danh riêng cho doanh nghiệp giúp định vị chỗ đứng vững chắc trên Internet.",
    iconName: "Globe"
  },
  {
    id: "b2",
    title: "Đột Phá Sự Uy Tín",
    description: "Khách hàng tin tưởng hơn 85% khi thấy một doanh nghiệp có website đại diện chính thức với tên miền riêng.",
    iconName: "ShieldCheck"
  },
  {
    id: "b3",
    title: "Trưng Bày Chuyên Nghiệp",
    description: "Giới thiệu sản phẩm đầy đủ, sắc nét, đẹp mắt hơn nhiều so với việc chỉ đăng bài rời rạc trên mạng xã hội.",
    iconName: "LayoutGrid"
  },
  {
    id: "b4",
    title: "Săn Tìm Khách Hàng Tự Động",
    description: "Tích hợp biểu mẫu thông minh, tự động lưu trữ thông tin số điện thoại của người cần tư vấn.",
    iconName: "Maximize2"
  },
  {
    id: "b5",
    title: "Kết Nối Đa Kênh Tức Thì",
    description: "Gắn kết Zalo chat, Hotline, Facebook Messenger và Bản đồ dẫn đường chỉ bằng 1 nút chạm duy nhất.",
    iconName: "Zap"
  },
  {
    id: "b6",
    title: "Bán Hàng Không Ngừng Nghỉ",
    description: "Cửa hàng mở cửa 24/7/365, nhận đơn hàng và thu hút khách hàng tiềm năng ngay cả khi bạn đang ngủ.",
    iconName: "Clock"
  },
  {
    id: "b7",
    title: "Lan Tỏa Mạng Xã Hội",
    description: "Chia sẻ liên kết website chuyên nghiệp, gửi trực tiếp báo giá bóng bẩy cho khách qua tin nhắn chat dễ dàng.",
    iconName: "Share2"
  },
  {
    id: "b8",
    title: "Chuẩn Thiết Bị Di Động",
    description: "Tự động co giãn màn hình mượt mà, mang lại trải nghiệm click mượt và tải nhanh trên mọi loại smartphone.",
    iconName: "Smartphone"
  },
  {
    id: "b9",
    title: "Mở Rộng Không Giới Hạn",
    description: "Bắt đầu từ trang giới thiệu cơ bản, có thể nâng cấp thêm chức năng thanh toán, giỏ hàng bất cứ lúc nào.",
    iconName: "TrendingUp"
  }
];

export const strengthsData: StrengthItem[] = [
  { id: "s1", title: "Tư vấn nền tảng hợp lý", description: "Không đề xuất gói đắt tiền nhất, chỉ chọn nền tảng tối ưu nhất cho túi tiền và khả năng quản lý của bạn." },
  { id: "s2", title: "Giao diện hiện đại & thanh lịch", description: "Sử dụng lối thiết kế trẻ trung, sạch thoáng, tập trung vào trải nghiệm đọc của khách hàng." },
  { id: "s3", title: "Tương thích 100% Smartphone", description: "Bố cục hiển thị thông minh trên điện thoại giúp giữ chân khách hàng lâu hơn." },
  { id: "s4", title: "Nút gọi & Zalo đổ về trực tiếp", description: "Bố trí nút liên hệ rung nhẹ, hấp dẫn người xem bấm chat trực tiếp với bạn ngay lập tức." },
  { id: "s5", title: "Hệ thống Form tự động hóa", description: "Sử dụng các form thông minh thu thập thông tin và gửi thông báo trực tiếp qua email." },
  { id: "s6", title: "Định vị Google Maps", description: "Hỗ trợ nhúng bản đồ công ty, giúp khách hàng tìm địa điểm văn phòng/cửa hàng dễ dàng." },
  { id: "s7", title: "Chỉnh sửa sau bàn giao", description: "Đồng hành hỗ trợ căn chỉnh những lỗi nhỏ lẻ hoàn toàn miễn phí trong tháng đầu tiên sử dụng." },
  { id: "s8", title: "Hướng dẫn tự cập nhật", description: "Cung cấp sơ đồ hướng dẫn hoặc video ngắn giúp bạn tự thay bài viết, đổi ảnh, đăng sản phẩm dễ dàng." }
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Tư vấn nhu cầu",
    description: "Tìm hiểu mục tiêu kinh doanh và đối tượng khách hàng của bạn.",
    details: [
      "Khảo sát mục tiêu chính của website (Bán hàng, giới thiệu hay chạy quảng cáo)",
      "Định hình phong cách màu sắc, gu thẩm mỹ mong muốn",
      "Xác định các tích hợp cần thiết (Zalo, Maps, Form đăng ký)"
    ]
  },
  {
    step: 2,
    title: "Đề xuất cấu trúc & nền tảng",
    description: "Lựa chọn nền tảng tối ưu giúp bạn tiết kiệm chi phí vận hành.",
    details: [
      "So sánh ưu nhược điểm của các nền tảng (Wordpress, Ladipage, Webflow...)",
      "Ước tính chi phí duy trì hàng tháng để bạn chuẩn bị lộ trình",
      "Thống nhất danh sách các trang chính cần thiết"
    ]
  },
  {
    step: 3,
    title: "Lên bố cục & nội dung",
    description: "Sắp xếp thông tin một cách khoa học để dẫn dắt người đọc.",
    details: [
      "Xác định sitemap (sơ đồ trang) chi tiết",
      "Phác thảo các vị trí của banner, nút bấm kêu gọi hành động",
      "Hỗ trợ tinh chỉnh văn bản, thông điệp bán hàng (copywriting) cơ bản"
    ]
  },
  {
    step: 4,
    title: "Thiết kế & Hoàn thiện",
    description: "Khoác lên website một giao diện hiện đại, tinh tế và mượt mà.",
    details: [
      "Xây dựng giao diện thực tế trực tiếp trên nền tảng đã thống nhất",
      "Tối ưu hóa hình ảnh, tạo các hiệu ứng chuyển động mượt mà",
      "Gắn mã đo lường, cấu hình các nút liên hệ khẩn cấp"
    ]
  },
  {
    step: 5,
    title: "Kiểm định & Bàn giao",
    description: "Rà soát kỹ lưỡng trên mọi thiết bị và trao quyền làm chủ cho bạn.",
    details: [
      "Kiểm tra chất lượng hiển thị trên máy tính, iPad và các điện thoại iOS/Android",
      "Bàn giao toàn bộ tài khoản quản trị Admin cao nhất",
      "Hướng dẫn các thao tác quản trị cơ bản qua hướng dẫn trực quan"
    ]
  },
  {
    step: 6,
    title: "Kèm cặp sau bàn giao",
    description: "Yên tâm vận hành với sự hỗ trợ chỉnh sửa và đồng hành chu đáo.",
    details: [
      "Hỗ trợ khắc phục lỗi hiển thị phát sinh trong quá trình vận hành ban đầu",
      "Tư vấn cách tối ưu SEO bổ sung, lên kế hoạch viết bài",
      "Hỗ trợ chỉnh sửa văn bản hoặc thay ảnh đơn giản hoàn toàn miễn phí"
    ]
  }
];

export const pricingTiers: PriceTier[] = [
  {
    id: "basic",
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
    id: "agency",
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
    id: "adv_landing",
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

export const templatesData: TemplateItem[] = [
  {
    id: "t1",
    title: "Helix Corp - Giao diện doanh nghiệp công nghệ",
    category: "enterprise",
    categoryLabel: "Doanh Nghiệp",
    platform: "Webflow / Code",
    features: ["Hiệu ứng 3D nổi bật", "Dark mode huyền ảo", "Cấu trúc dịch vụ dạng Grid"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "t2",
    title: "Vogue Store - Thời trang cao cấp tối giản",
    category: "ecommerce",
    categoryLabel: "Bán Hàng Online",
    platform: "Shopify / Haravan",
    features: ["Bộ lọc bộ sưu tập thông minh", "Trải nghiệm thanh toán 1 bước", "Tương thích cao di động"],
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "t3",
    title: "Urban Nest - Dự án Căn hộ & Bất Động Sản",
    category: "enterprise",
    categoryLabel: "Dự Án / BĐS",
    platform: "WordPress",
    features: ["Bản đồ liên kết dự án", "Bộ sưu tập 3D Panorama", "Form tải tài liệu tự động"],
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "t4",
    title: "Savory Plate - Nhà hàng & Đặt bàn",
    category: "booking",
    categoryLabel: "Nhà Hàng & Coffee",
    platform: "Wix / WordPress",
    features: ["Menu điện tử trực quan", "Đặt bàn chọn khung giờ", "Tìm kiếm và dẫn đường Maps"],
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "t5",
    title: "Aura Clinic - Viện thẩm mỹ & Chăm sóc da",
    category: "booking",
    categoryLabel: "Spa & Thẩm Mỹ",
    platform: "WordPress / Wix",
    features: ["Giao diện phấn hồng dịu mắt", "Hệ thống đặt dịch vụ bác sĩ", "Feedback khách hàng thực tế"],
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "t6",
    title: "EduCore - Khóa học trực tuyến",
    category: "personal",
    categoryLabel: "Đào Tạo / Khóa Học",
    platform: "WordPress / Code",
    features: ["Hiển thị bài giảng theo chương", "Thanh toán sở hữu khóa học", "Hồ sơ cá nhân giảng viên"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "t7",
    title: "Zenith - Personal Portfolio & Blog",
    category: "personal",
    categoryLabel: "Thương Hiệu Cá Nhân",
    platform: "Google Sites / Wix",
    features: ["Bố cục vạt nghiêng hiện đại", "Tích hợp trang viết cảm nhận", "Liên kết các mạng xã hội chính"],
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "t8",
    title: "Impact Page - Landing Page bán thực phẩm sạch",
    category: "landing",
    categoryLabel: "Landing Page",
    platform: "Ladipage",
    features: ["Timer đếm ngược khan hiếm", "Mua ngay tặng kèm Voucher", "Feedback ảnh chụp Zalo chân thực"],
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=85",
  }
];

export const fagsData: FAQItem[] = [
  {
    id: "faq1",
    question: "Tôi hoàn toàn không biết gì về lập trình hay công nghệ, liệu có sở hữu được website không?",
    answer: "Chắc chắn ĐƯỢC! Dự án của tôi sinh ra cốt lõi để phục vụ những người không rành công nghệ. Tôi đảm nhận trọn gói tất cả từ tư vấn tên miền, thiết kế giao diện, viết chữ, đăng ảnh mẫu, đấu nối các nút liên hệ. Bạn chỉ cần xem bản duyệt trên điện thoại và sau đó tôi hướng dẫn kéo thả cực kỳ đơn giản để quản lý."
  },
  {
    id: "faq2",
    question: "Mất bao lâu thời gian thì website của tôi có thể hoạt động?",
    answer: "Tùy thuộc vào quy mô và mức độ yêu cầu. Với các gói Website Cơ Bản hoặc Landing page, chỉ sau 3 - 5 ngày là bạn có thể tiếp cận khách hàng. Với Website Chuyên Nghiệp doanh nghiệp, thời gian hoàn thiện rơi vào khoảng 7 - 10 ngày để đảm bảo các yếu tố tối ưu SEO, hiệu ứng mượt mà nhất."
  },
  {
    id: "faq3",
    question: "Tôi có thể tự thay đổi nội dung, thêm bài viết hay sản phẩm sau này không?",
    answer: "Hoàn toàn CÓ. Tôi luôn ưu tiên sử dụng các nền tảng có trình chỉnh sửa trực quan dạng kéo thả (như Ladipage, Elementor của WordPress, Google Sites, Webflow). Sau khi bàn giao, tôi sẽ gửi kèm tài liệu dạng video quay màn hình cực kỳ dễ hiểu. Bạn có thể tự mình đổi chữ, thay ảnh hoặc đăng sản phẩm mới bất kì lúc nào."
  },
  {
    id: "faq4",
    question: "Giao diện website hiển thị trên điện thoại di động trông như thế nào?",
    answer: "Tất cả website do tôi thiết kế đều được áp dụng phương pháp Responsive thông minh. Giao diện tự động co giãn tuyệt đẹp trên mọi kích thước màn hình: iPhone, Samsung, máy tính bảng iPad cho đến màn hình tivi lớn, đảm bảo không bị vỡ chữ hay lệch nút."
  },
  {
    id: "faq5",
    question: "Website có được tích hợp trực tiếp bản đồ Google Maps và Zalo chat không?",
    answer: "Hoàn toàn CÓ và hoàn toàn MIỄN PHÍ. Tôi sẽ cài đặt biểu tượng liên hệ nhanh Zalo, hotline gọi điện ngay ở góc màn hình có hiệu ứng rung nhẹ thu hút. Ngoài ra còn nhúng bản đồ chỉ đường chuyên nghiệp giúp khách tìm nhanh tới cửa hàng của bạn."
  }
];
