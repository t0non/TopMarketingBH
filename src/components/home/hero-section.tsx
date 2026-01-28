'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="inicio" className="w-full bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-6">
        <div className="flex flex-col md:flex-row md:min-h-[80vh] md:gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 pt-12 md:py-0 text-center md:text-left order-1 md:order-1 z-10 md:-translate-y-8 self-center">
            <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Quer sua empresa{' '}
              <span className="relative inline-block">
                aparecendo para quem busca seu serviço no Google?
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Criamos seu Site Profissional e gerenciamos seus Anúncios. Esteja no{' '}
              <span className="font-bold">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>{' '}
              e venda mais.
            </p>
             {/* CTA Button */}
            <div className="mt-10 w-full sm:w-auto">
              <Link
                href="https://wa.me/553197922538?text=Olá!%20Gostaria%20de%20receber%20um%20orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                onClick={() => {}}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-bold text-lg transform transition-transform duration-300 hover:scale-105 whitespace-normal h-auto py-6 px-8"
              >
                  QUERO MAIS CLIENTES
                </Button>
              </Link>
            </div>
          </div>

          {/* Video Player */}
          <div className="w-full md:w-1/2 order-2 md:order-2 flex items-end justify-center self-end">
             <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="https://files.catbox.moe/zn63an.jpg"
                className="w-full h-auto max-h-[80vh] rounded-lg object-cover object-center hidden md:block"
                style={{ transform: `translateY(${offsetY * 0.2}px)` }}
                >
                <source
                    src="/videos/video.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

            {/* Mobile Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="https://files.catbox.moe/zn63an.jpg"
              className="w-full h-auto rounded-lg md:hidden order-2 mt-8"
            >
              <source
                src="/videos/video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
