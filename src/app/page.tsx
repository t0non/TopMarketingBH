import Header from '@/components/layout/header';
import AlertBanner from '@/components/layout/alert-banner';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import dynamic from 'next/dynamic';

const IdentificationSection = dynamic(() => import('@/components/home/identification-section'));
const LocalAuthoritySection = dynamic(() => import('@/components/home/local-authority-section'));
const MethodSection = dynamic(() => import('@/components/home/method-section'));
const TestimonialMarquee = dynamic(() => import('@/components/home/testimonial-marquee'));
const FaqSection = dynamic(() => import('@/components/home/faq-section'));
const TypeformSection = dynamic(() => import('@/components/home/typeform-section'));
const Footer = dynamic(() => import('@/components/layout/footer'));
const FloatingWhatsappButton = dynamic(() => import('@/components/layout/floating-whatsapp-button'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <AlertBanner />
      {/* 1. Hero */}
      <HeroSection />
      {/* 2. Para quem é */}
      <IdentificationSection />
      {/* 3. O que fazemos */}
      <ServicesSection />
      {/* 4. O Método */}
      <MethodSection />
      {/* 5. Sobre o Eduardo */}
      <LocalAuthoritySection />
      {/* 6. Depoimentos reais */}
      <TestimonialMarquee />
      {/* 7. FAQ */}
      <FaqSection />
      {/* 8. Formulário do Typeform */}
      <TypeformSection />
      
      {/* Footer e Globals */}
      <Footer />
      <FloatingWhatsappButton />
    </main>
  );
}
