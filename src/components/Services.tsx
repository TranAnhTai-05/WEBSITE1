import { motion } from "motion/react";
import { servicesData } from "../data";
import LucideIcon from "./LucideIcon";
import { ChevronRight } from "lucide-react";

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="services" className="py-24 relative bg-brand-navy/30 border-y border-white/5">
      {/* Background decoration lines */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-dark to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full">
            DANH MỤC DỊCH VỤ CHUYÊN SÂU
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Tôi có thể giúp bạn làm website gì?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Dù mục đích sử dụng là giới thiệu, bán lẻ trực tiếp hay xây dựng landing page thu phễu khách hàng tiềm năng, tôi đều có phương án thiết kế chuẩn chỉ cho bạn.
          </p>
        </div>

        {/* Catalog grid of 10 items */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => onSelectService(service.title)}
              className="group relative rounded-2xl glass-card hover:bg-slate-900/40 hover:border-cyan-500/50 p-6 shadow-md hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle background glow on card hover */}
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-brand-cyan/5 rounded-full group-hover:bg-brand-cyan/10 blur-xl transition-all duration-300 pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between pointer-events-none">
                  {/* Icon wrap with color gradient background on hover */}
                  <div className="h-12 w-12 rounded-xl bg-slate-800 text-brand-cyan group-hover:bg-gradient-to-tr group-hover:from-brand-cyan group-hover:to-brand-purple group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-inner">
                    <LucideIcon name={service.iconName} className="w-5.5 h-5.5" />
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan uppercase animate-pulse">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-lg font-display font-bold text-white group-hover:text-brand-cyan transition-colors duration-200">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-medium text-brand-cyan/80 group-hover:text-brand-cyan transition-all">
                <span>Chọn làm thể loại này</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
