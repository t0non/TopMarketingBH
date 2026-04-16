'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function VideoShowcaseSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 11) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Domine a Primeira Página do <span className="font-bold"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></span>
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Seu cliente já está buscando pelo que você vende. A única dúvida é: ele vai encontrar você ou seu concorrente? Veja como colocamos sua marca em destaque.
            </p>
          </div>
          
          <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 relative">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-xl"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/videos/video-2.mp4" type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>

          <div className="mt-6 md:mt-8 w-full sm:w-auto">
            <Link 
                href="https://wa.me/553197922538?text=Olá!%20Quero%20aparecer%20no%20Google." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto inline-block"
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto font-bold text-lg transform transition-transform duration-300 hover:scale-105 whitespace-normal h-auto py-6 px-8"
              >
                QUERO APARECER NO GOOGLE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
