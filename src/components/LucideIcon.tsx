import { 
  Building2, 
  ShoppingBag, 
  Home, 
  Utensils, 
  Sparkles, 
  GraduationCap, 
  User, 
  Target, 
  CalendarRange, 
  Briefcase,
  Globe,
  ShieldCheck,
  LayoutGrid,
  Maximize2,
  Zap,
  Clock,
  Share2,
  Smartphone,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Menu,
  X,
  FileText,
  MousePointerClick,
  HelpCircle,
  Inbox,
  Sparkle
} from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "w-6 h-6", size }: LucideIconProps) {
  const icons: { [key: string]: any } = {
    Building2,
    ShoppingBag,
    Home,
    Utensils,
    Sparkles,
    GraduationCap,
    User,
    Target,
    CalendarRange,
    Briefcase,
    Globe,
    ShieldCheck,
    LayoutGrid,
    Maximize2,
    Zap,
    Clock,
    Share2,
    Smartphone,
    TrendingUp,
    CheckCircle2,
    ChevronRight,
    Phone,
    MessageCircle,
    MapPin,
    Mail,
    Menu,
    X,
    FileText,
    MousePointerClick,
    HelpCircle,
    Inbox,
    Sparkle
  };

  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
}
