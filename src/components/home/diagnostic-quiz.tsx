'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Layout, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  ShoppingBag, 
  Users, 
  User,
  MessageCircle, 
  Target,
  BarChart3,
  Loader2,
  Check,
  Trash2,
  Instagram,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// --- CUSTOM BRAND ICONS ---

const GoogleText = () => (
  <span className="font-bold">
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
  </span>
);

const RedGradientXIcon = () => (
    <X className="w-8 h-8" />
);

const TrashIcon = () => (
    <Trash2 className="w-7 h-7" />
);

const InstagramBrandIcon = () => (
    <Instagram className="w-7 h-7" />
);

const GoogleImgIcon = () => (
  <div className="relative w-7 h-7">
    <Image 
      src="/imagens/Logo Google.png" 
      alt="Google" 
      fill
      className="object-contain"
    />
  </div>
);

const GoogleAdsImgIcon = () => (
  <div className="relative w-7 h-7">
    <Image 
      src="/imagens/3.png" 
      alt="Google Ads" 
      fill
      className="object-contain"
    />
  </div>
);

type Flow = 'A' | 'B' | null;

interface QuizData {
  urgency: string;
  // Flow A
  siteState?: string;
  siteGoal?: string;
  // Flow B
  trafficOrigin?: string;
  salesCapacity?: string;
  // Lead
  companyName: string;
  whatsapp: string;
}

export default function DiagnosticQuiz() {
  const [step, setStep] = useState<number>(1);
  const [flow, setFlow] = useState<Flow>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState<Partial<QuizData>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Progress calculation
  const totalSteps = 3; 
  const progress = Math.min(((step - 1) / totalSteps) * 100, 100);

  const processingTexts = [
    "Entendendo seu negócio...",
    "Checando oportunidades...",
    "Pronto!"
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingStage(prev => {
          if (prev < processingTexts.length - 1) return prev + 1;
          return prev;
        });
      }, 1000);

      const timer = setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#60a5fa', '#93c5fd', '#ffffff']
        });
        
        // Play success audio
        const audio = new Audio('/imagens/audio1.wav');
        audio.play().catch(err => console.error("Error playing audio:", err));
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isProcessing]);

  const handleBack = () => {
    if (step > 1 && !isProcessing && !showSuccess) {
      setStep(prev => prev - 1);
    }
  };

  const handleOptionClick = (id: string, callback: () => void) => {
    setSelectedOption(id);
    setTimeout(() => {
      callback();
      setSelectedOption(null);
    }, 400);
  };

  const handleUrgency = (urgency: string, selectedFlow: Flow) => {
    setData({ ...data, urgency });
    setFlow(selectedFlow);
    setStep(2);
  };

  const handleAnswer = (key: keyof QuizData, value: string) => {
    setData({ ...data, [key]: value });
    if (step === 3) {
      // Last step answered, start processing
      setStep(4); // Move to a "holding" step
      setIsProcessing(true);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { urgency, siteState, siteGoal, trafficOrigin, salesCapacity, companyName, whatsapp } = data;
    
    let message = `🚀 *NOVO DIAGNÓSTICO SAAS B2B*\n\n`;
    message += `🏢 *Empresa:* ${companyName}\n`;
    message += `📱 *WhatsApp:* ${whatsapp}\n\n`;
    message += `🚨 *Urgência:* ${urgency}\n\n`;
    
    if (flow === 'A') {
      message += `💻 *Fluxo SITE:*\n`;
      message += `• Estado Atual: ${siteState}\n`;
      message += `• Objetivo: ${siteGoal}\n`;
    } else {
      message += `📈 *Fluxo TRÁFEGO:*\n`;
      message += `• Origem Vendas: ${trafficOrigin}\n`;
      message += `• Capacidade Atendimento: ${salesCapacity}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5531997922538?text=${encodedMessage}`;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {'send_to': 'AW-17892072580/USPICMSVoe0bEIS5zdNC'});
    }

    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formattedValue = value;
    if (value.length > 2) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 7) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    
    setData({ ...data, whatsapp: formattedValue });
  };

  const variants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Background Effects (Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 - Top Left */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 blur-[100px] opacity-50 will-change-transform"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 30% 70% / 50% 30% 70% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blob 2 - Bottom Right */}
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/20 blur-[120px] opacity-50 will-change-transform"
          animate={{ 
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            borderRadius: ["50% 50% 30% 70% / 50% 30% 70% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 30% 70% / 50% 30% 70% 50%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blob 3 - Floating Center */}
         <motion.div 
          className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[400px] h-[400px] bg-purple-500/20 blur-[100px] opacity-40 will-change-transform"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            borderRadius: ["40% 60% 60% 40% / 40% 40% 60% 60%", "60% 40% 40% 60% / 60% 60% 40% 40%", "40% 60% 60% 40% / 40% 40% 60% 60%"]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* --- SAAS CARD CONTAINER --- */}
      <div className="w-full h-full md:h-auto max-w-2xl md:mx-4 mx-0 relative z-10">
        <div className="
          bg-white/95 backdrop-blur-2xl md:bg-white
          md:shadow-2xl
          rounded-none md:rounded-2xl
          overflow-hidden 
          flex flex-col 
          h-full md:h-auto
          md:min-h-[650px]
          relative
          transition-all duration-300
        ">
          
          {/* Header - Only show if not processing/success */}
          {!isProcessing && !showSuccess && (
            <div className="px-6 pt-12 pb-4 md:px-10 md:pt-10 md:pb-6 flex flex-col items-center border-b border-gray-100/50">
              
              {/* Progress Bar */}
              {step <= 3 && (
                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6 md:mb-8">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                     transition={{ duration: 0.5, ease: "easeOut" }}
                   />
                 </div>
              )}
              
              {/* Back Button */}
              {step > 1 && step <= 3 && (
                <div className="w-full flex justify-start -mt-2 mb-2 md:-mt-4 md:mb-4">
                   <button 
                     onClick={handleBack}
                     className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium group px-3 py-2 rounded-lg hover:bg-blue-50/80 active:scale-95 transform duration-200"
                   >
                     <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                     Voltar
                   </button>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 flex flex-col px-6 pb-8 md:px-10 md:pb-10 overflow-y-auto justify-center scrollbar-none">
            <AnimatePresence mode="wait" initial={false}>
              
              {/* STEP 1: URGENCY */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col h-full pt-2 md:pt-6"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500">
                      Vamos destravar suas vendas?
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8 text-center font-medium leading-relaxed max-w-lg mx-auto">
                    Responda 3 perguntas rápidas pra gente entender o que sua empresa precisa agora.
                  </p>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-slate-400 font-bold mb-4 md:mb-6 text-center">
                    Pra começar: Qual é a sua maior urgência hoje?
                  </p>

                  <div className="flex flex-col gap-4 md:gap-6 flex-1 justify-center">
                    <PremiumOption 
                      selected={selectedOption === 'Arrumar a Casa'}
                      onClick={() => handleOptionClick('Arrumar a Casa', () => handleUrgency('Preciso de um Site Profissional', 'A'))}
                      title="Arrumar a Casa"
                      subtitle="Preciso de um Site melhor/novo"
                      icon={GoogleImgIcon}
                    />
                    <PremiumOption 
                      selected={selectedOption === 'Encher a Casa'}
                      onClick={() => handleOptionClick('Encher a Casa', () => handleUrgency('Quero Anúncios para vender mais', 'B'))}
                      title="Encher a Casa"
                      subtitle="Quero Anúncios pra vender mais"
                      icon={GoogleAdsImgIcon}
                    />
                  </div>
                </motion.div>
              )}

              {/* FLOW A: SITE */}
              {step === 2 && flow === 'A' && (
                <motion.div
                  key="step2A"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col h-full pt-2 md:pt-6"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8 text-center">
                    Se um cliente procurar sua empresa no <GoogleText /> agora, o que ele acha?
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-3 md:gap-4 flex-1 content-center">
                    <PremiumOption 
                      selected={selectedOption === 'Fantasma Digital'} 
                      onClick={() => handleOptionClick('Fantasma Digital', () => handleAnswer('siteState', 'Fantasma Digital'))} 
                      title="Não acha nada" 
                      subtitle="Sou um fantasma" 
                      icon={RedGradientXIcon}
                      variant="red"
                    />
                    <PremiumOption 
                      selected={selectedOption === 'Site Antigo'} 
                      onClick={() => handleOptionClick('Site Antigo', () => handleAnswer('siteState', 'Site Antigo'))} 
                      title="Acha um site antigo" 
                      subtitle="Tenho vergonha de mandar" 
                      icon={TrashIcon} 
                      variant="gray"
                    />
                    <PremiumOption 
                      selected={selectedOption === 'Apenas Instagram'} 
                      onClick={() => handleOptionClick('Apenas Instagram', () => handleAnswer('siteState', 'Apenas Instagram'))} 
                      title="Só acha meu Instagram" 
                      subtitle="" 
                      icon={InstagramBrandIcon} 
                      variant="instagram"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && flow === 'A' && (
                <motion.div
                  key="step3A"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col h-full pt-2 md:pt-6"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8 text-center">
                    O que você quer que esse novo site faça por você?
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-3 md:gap-4 flex-1 content-center">
                    <PremiumOption selected={selectedOption === 'Autoridade'} onClick={() => handleOptionClick('Autoridade', () => handleAnswer('siteGoal', 'Autoridade'))} title="Passe confiança pro cliente" subtitle="Institucional" icon={CheckCircle2} />
                    <PremiumOption selected={selectedOption === 'Leads WhatsApp'} onClick={() => handleOptionClick('Leads WhatsApp', () => handleAnswer('siteGoal', 'Leads WhatsApp'))} title="Faça o cliente me chamar no Zap" subtitle="Foco em Vendas" icon={MessageCircle} />
                    <PremiumOption selected={selectedOption === 'E-commerce'} onClick={() => handleOptionClick('E-commerce', () => handleAnswer('siteGoal', 'E-commerce'))} title="Venda meus produtos online" subtitle="Loja Virtual" icon={ShoppingBag} />
                  </div>
                </motion.div>
              )}

              {/* FLOW B: TRAFFIC */}
              {step === 2 && flow === 'B' && (
                <motion.div
                  key="step2B"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col h-full pt-2 md:pt-6"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8 text-center">
                    Hoje, como a maioria dos clientes chega até você?
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-3 md:gap-4 flex-1 content-center">
                    <PremiumOption selected={selectedOption === 'Indicação'} onClick={() => handleOptionClick('Indicação', () => handleAnswer('trafficOrigin', 'Indicação'))} title="Dependo de Indicação" subtitle="Boca a boca" icon={Users} />
                    <PremiumOption selected={selectedOption === 'Instagram Orgânico'} onClick={() => handleOptionClick('Instagram Orgânico', () => handleAnswer('trafficOrigin', 'Instagram Orgânico'))} title="Posto todo dia no Instagram" subtitle="Cansativo" icon={InstagramBrandIcon} variant="instagram" />
                    <PremiumOption selected={selectedOption === 'Já Anuncio'} onClick={() => handleOptionClick('Já Anuncio', () => handleAnswer('trafficOrigin', 'Já Anuncio'))} title="Já faço anúncios" subtitle="Mas quero melhorar" icon={GoogleAdsImgIcon} />
                  </div>
                </motion.div>
              )}

              {step === 3 && flow === 'B' && (
                <motion.div
                  key="step3B"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col h-full pt-2 md:pt-6"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8 text-center">
                    Se chegarem 30 clientes novos amanhã no seu WhatsApp, quem atende?
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-3 md:gap-4 flex-1 content-center">
                    <PremiumOption selected={selectedOption === 'Eu mesmo'} onClick={() => handleOptionClick('Eu mesmo', () => handleAnswer('salesCapacity', 'Eu mesmo'))} title="Eu mesmo" subtitle="Tô no sufoco" icon={User} />
                    <PremiumOption selected={selectedOption === 'Tenho ajuda'} onClick={() => handleOptionClick('Tenho ajuda', () => handleAnswer('salesCapacity', 'Tenho ajuda'))} title="Tenho ajuda" subtitle="Sócio ou Secretária" icon={Users} />
                    <PremiumOption selected={selectedOption === 'Equipe de Vendas'} onClick={() => handleOptionClick('Equipe de Vendas', () => handleAnswer('salesCapacity', 'Equipe de Vendas'))} title="Tenho uma equipe de vendas pronta" subtitle="" icon={CheckCircle2} />
                  </div>
                </motion.div>
              )}

              {/* PROCESSING SCREEN */}
              {isProcessing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center text-center py-12 h-full"
                >
                  <div className="relative w-20 h-20 mb-8">
                    <motion.div
                      className="absolute inset-0 border-4 border-gray-100 rounded-full"
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.h3 
                      key={processingStage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xl font-bold text-gray-900"
                    >
                      {processingTexts[processingStage]}
                    </motion.h3>
                  </AnimatePresence>
                </motion.div>
              )}

              {/* SUCCESS SCREEN */}
              {showSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center pt-8 w-full h-full"
                >
                  {/* Victory Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/30"
                  >
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-6 md:mb-10 max-w-md px-4"
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                      Show! Já temos um <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">plano</span> pra você.
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 font-medium">
                      Nossa análise encontrou o caminho ideal pro seu momento. Pra onde a gente manda esse plano?
                    </p>
                  </motion.div>
                  
                  {/* Form Capture */}
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="w-full max-w-sm flex flex-col gap-4 md:gap-5 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                        Nome da Empresa
                      </label>
                      <Input 
                        required
                        placeholder="Ex: Top Marketing BH" 
                        className="bg-gray-50 border-gray-200 h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                        value={data.companyName || ''}
                        onChange={(e) => setData({ ...data, companyName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                        Seu WhatsApp
                      </label>
                      <Input 
                        required
                        placeholder="(31) 99999-9999" 
                        className="bg-gray-50 border-gray-200 h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
                        value={data.whatsapp || ''}
                        onChange={handlePhoneChange}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
                    >
                      RECEBER PLANO AGORA
                    </Button>
                  </motion.form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function PremiumOption({ 
  title, 
  subtitle, 
  icon: Icon, 
  onClick, 
  selected,
  variant = 'blue'
}: { 
  title: string, 
  subtitle?: string, 
  icon?: any, 
  onClick: () => void, 
  selected?: boolean,
  variant?: 'blue' | 'red' | 'gray' | 'instagram'
}) {
  
  const getIconContainerStyles = () => {
    switch(variant) {
      case 'red':
        return selected
          ? 'bg-gradient-to-br from-red-600 to-red-500 text-white shadow-red-500/30'
          : 'bg-red-50 text-red-500 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-500 group-hover:text-white';
      case 'gray':
        return selected
          ? 'bg-gradient-to-br from-slate-700 to-slate-500 text-white shadow-slate-500/30'
          : 'bg-slate-100 text-slate-500 group-hover:bg-gradient-to-br group-hover:from-slate-700 group-hover:to-slate-500 group-hover:text-white';
      case 'instagram':
        return selected
          ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white shadow-pink-500/30'
          : 'bg-pink-50 text-[#E1306C] group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-500 group-hover:text-white';
      default: // blue
        return selected
          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-blue-500/30'
          : 'bg-blue-50 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white';
    }
  };

  return (
    <motion.button
      whileHover={!selected ? { y: -2, scale: 1.01 } : {}}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full text-left p-4 md:p-6 rounded-2xl 
        transition-all duration-300 
        flex items-center group
        relative overflow-hidden
        ${selected 
          ? 'bg-blue-50/90 border-2 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/50' 
          : 'bg-slate-50/80 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md hover:bg-white'
        }
      `}
    >
      {Icon && (
        <div className={`
          w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mr-4 md:mr-6 transition-all duration-300 shrink-0 shadow-lg
          ${getIconContainerStyles()}
        `}>
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      )}
      <div className="relative z-10 flex-1">
        <h3 className={`font-bold text-base md:text-lg transition-colors mb-0.5 md:mb-1 ${selected ? 'text-blue-900' : 'text-slate-800 group-hover:text-blue-900'}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`text-xs md:text-sm font-medium transition-colors ${selected ? 'text-blue-700' : 'text-slate-500 group-hover:text-blue-700/80'}`}>
            {subtitle}
          </p>
        )}
      </div>
      <div className={`ml-2 md:ml-4 transition-all duration-300 relative z-10 ${selected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0'}`}>
        <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 ${selected ? 'text-blue-600' : 'text-blue-500'}`} />
      </div>
    </motion.button>
  );
}
