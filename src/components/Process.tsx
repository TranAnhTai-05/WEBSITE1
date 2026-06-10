import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { processSteps } from "../data";
import { ChevronRight, ArrowRight, Sparkle } from "lucide-react";

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStepData = processSteps.find((s) => s.step === activeStep) || processSteps[0];

  return (
    <section id="process" className="py-24 relative bg-brand-navy/30 border-y border-white/5">
      <div className="absolute top-[30%] left-[10%] w-[350px] h-[350px] bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3.5 py-1.5 rounded-full">
            Kế Hoạch Thi Công Tối Giản
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-4">
            Quy trình làm website đơn giản
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            6 bước thi công tinh gọn nhất giúp bạn tiết kiệm thời gian, tối ưu hóa công năng và nhận website đi vào vận hành trơn tru nhất.
          </p>
        </div>

        {/* Stepper Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Vertical stepper tracker buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3 relative">
            
            {/* Visual connector line in desk layout */}
            <div className="hidden lg:block absolute left-9 top-6 bottom-6 w-0.5 bg-slate-800 pointer-events-none z-0" />
            
            {processSteps.map((step) => {
              const isSelected = step.step === activeStep;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 relative z-10 ${
                    isSelected
                      ? "bg-slate-900 border border-amber-500/50 glow-button text-white shadow-lg"
                      : "glass-card text-gray-400 hover:text-white"
                  }`}
                >
                  {/* Step bubble marker */}
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0 transition-all duration-200 ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 scale-110 shadow-md shadow-amber-500/20"
                        : "bg-white/5 text-gray-500 border border-white/5"
                    }`}
                  >
                    0{step.step}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm sm:text-base font-display font-bold truncate ${isSelected ? "text-brand-cyan" : "text-gray-300"}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate mt-0.5 leading-none">
                      {step.description}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-brand-cyan translate-x-1" : "text-gray-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right panel: Active Step description details */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl glass-card p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-purple">
                        BƯỚC CHI TIẾT 0{currentStepData.step}
                      </span>
                      <h4 className="text-2xl font-display font-extrabold text-white mt-1">
                        {currentStepData.title}
                      </h4>
                    </div>
                    
                    <div className="h-10 w-10 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center">
                      <Sparkle className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  </div>

                  <p className="text-base text-slate-300 mb-8 leading-relaxed">
                    {currentStepData.description} Theo đó, các đề mục triển khai chi tiết bao gồm:
                  </p>

                  {/* Bullet checklist points */}
                  <ul className="space-y-4">
                    {currentStepData.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                        <span className="flex h-5 w-5 rounded-full bg-slate-800 text-brand-cyan font-mono text-xs font-semibold items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stepper bottom control guide */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                  <span className="text-slate-400 font-mono tracking-wide">
                    * Đảm bảo tính minh bạch, bám sát nhu cầu thực tế
                  </span>
                  
                  {activeStep < 6 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="inline-flex items-center gap-1.5 text-brand-cyan hover:underline font-semibold text-right"
                    >
                      Xem tiếp bước sau <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveStep(1)}
                      className="inline-flex items-center gap-1.5 text-brand-purple hover:underline font-semibold text-right"
                    >
                      Quay lại bước đầu tiên
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
