'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms: move at different speeds relative to scroll
  const y1 = useTransform(scrollY, [0, 500], [0, -100]); // Google icon moves up
  const y2 = useTransform(scrollY, [0, 500], [0, -150]); // Ads icon moves up faster

  return (
    <section id="inicio" ref={containerRef} className="w-full bg-white overflow-hidden py-12 md:py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:min-h-[70vh] md:gap-8 items-center">
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left order-2 md:order-1 z-10 self-center">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
                Especialista em Google Ads para negócios de BH
              </span>
              <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Seu concorrente já aparece no Google quando seu cliente busca. E você?
              </h1>
              <p className="mt-6 text-lg text-muted-foreground font-medium md:text-xl">
                A gente cria sua Landing Page e gerencia seus anúncios no Google para que o telefone toque — sem depender de indicação, sem queimar dinheiro à toa.
              </p>
               {/* CTA Button */}
              <div className="mt-10 w-full sm:w-auto">
                <Link
                  href="https://wa.me/553197922538?text=Olá!%20Gostaria%20de%20receber%20um%20orçamento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto font-bold text-lg transform transition-transform duration-300 hover:scale-105 whitespace-normal h-auto py-6 px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                  >
                    QUERO APARECER NO GOOGLE
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Feature Image: Composition */}
            <div className="w-full md:w-1/2 order-1 md:order-2 flex items-center justify-center self-center py-10 md:py-0 relative mb-12 md:mb-0">
               
               {/* Central Image: Office Professional (Free Style) */}
               <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] z-10">
                  <Image
                    src="/imagens/Imagem sessao 1.png?v=3"
                    alt="Especialista Top Marketing BH"
                    width={600}
                    height={800}
                    className="object-cover w-full h-auto"
                    priority
                  />
                  {/* Bottom Fade Gradient: slightly taller and softer for a 'misty' effect */}
                  <div className="absolute bottom-[-2px] left-0 right-0 h-16 sm:h-20 md:h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
               </div>
               
               {/* Floating Google Logo (Mid Left) - Parallax Scroll + Swaying Animation */}
               <motion.div 
                 style={{ y: y1 }}
                 className="absolute top-[15%] left-[15%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 z-0 blur-[1.5px]"
               >
                 <motion.div
                   animate={{ 
                     y: [0, -12, 0],
                     rotate: [-12, -8, -12] 
                   }}
                   transition={{ 
                     duration: 4, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                   className="w-full h-full"
                 >
                    <Image
                      src="/imagens/Logo Google.png"
                      alt="Google"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                 </motion.div>
               </motion.div>

               {/* Floating Google Ads Logo (Bottom Right) - Parallax Scroll + Swaying Animation */}
               <motion.div 
                 style={{ y: y2 }}
                 className="absolute bottom-[15%] right-[-18%] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 z-0 blur-[2px]"
               >
                 <motion.div
                   animate={{ 
                     y: [0, 15, 0],
                     rotate: [-15, -20, -15] 
                   }}
                   transition={{ 
                     duration: 5, 
                     repeat: Infinity, 
                     ease: "easeInOut",
                     delay: 0.5
                   }}
                   className="w-full h-full"
                 >
                    <Image
                      src="/imagens/3.png"
                      alt="Google Ads"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                 </motion.div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>
  );
}
