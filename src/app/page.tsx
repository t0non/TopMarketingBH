import Header from '@/components/layout/header';
import AlertBanner from '@/components/layout/alert-banner';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import dynamic from 'next/dynamic';

const IdentificationSection = dynamic(() => import('@/components/home/identification-section'));
const LocalAuthoritySection = dynamic(() => import('@/components/home/local-authority-section'));
const MethodSection = dynamic(() => import('@/components/home/method-section'));
const TestimonialMarquee = dynamic(() => import('@/components/home/testimonial-marquee'));
const TestimonialSection = dynamic(() => import('@/components/home/testimonial-section'));
const VideoShowcaseSection = dynamic(() => import('@/components/home/video-showcase-section'));
const ContactSection = dynamic(() => import('@/components/home/contact-section'));
const FaqSection = dynamic(() => import('@/components/home/faq-section'));
const Footer = dynamic(() => import('@/components/layout/footer'));
const FloatingWhatsappButton = dynamic(() => import('@/components/layout/floating-whatsapp-button'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <AlertBanner />
      <HeroSection />
      <ServicesSection />
      <IdentificationSection />
      <LocalAuthoritySection />
      <MethodSection />
      <TestimonialMarquee />
      <TestimonialSection />
      <VideoShowcaseSection />
      <ContactSection />
      <FaqSection />
      <Footer />
      <FloatingWhatsappButton />
    </main>
  );
}
