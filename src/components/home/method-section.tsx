'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Target, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const steps = [
  {
    icon: Smartphone,
    title: 'Entendemos seu negócio',
    description:
      'Uma conversa rápida para entender o que você vende, quem é seu cliente e onde você quer chegar.',
  },
  {
    icon: Target,
    title: 'Construímos sua máquina',
    description:
      'Criamos a Landing Page e configuramos o Google Ads com foco total em gerar contato — não em parecer bonito.',
  },
  {
    icon: MessageSquare,
    title: 'O WhatsApp começa a tocar',
    description:
      'Você recebe os contatos, a gente acompanha os resultados e ajusta o que for preciso.',
  },
];

export default function MethodSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Start animation when 20% of the section is visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="metodo" className="w-full py-12 md:py-24 lg:py-32 bg-background" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Como funciona na prática
          </h2>
        </div>
        
        <div className={`mx-auto mt-12 md:mt-16 flex max-w-5xl flex-col items-stretch gap-y-8 md:flex-row md:items-center md:justify-center md:gap-x-8`}>
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              {/* Step Card */}
              <div
                className={`flex-1 transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <Card className="h-full transform text-center border-0 bg-transparent shadow-none">
                  <CardHeader className="items-center relative">
                      {index === 0 ? (
                        <div className="flex items-center justify-center">
                          <div className="relative w-14 h-14">
                            <Image
                              src="/imagens/1.png"
                              alt="Google"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      ) : index === 1 ? (
                        <div className="flex items-center justify-center">
                          <div className="relative w-14 h-14">
                            <Image
                              src="/imagens/3.png"
                              alt="Google Ads"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className="relative w-14 h-14">
                            <Image
                              src="/imagens/2.png"
                              alt="WhatsApp"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )}
                    <CardTitle className="mt-4 text-2xl font-bold text-foreground">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Connectors */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Arrow */}
                  <div className="hidden md:flex items-center justify-center">
                    <svg
                      width="100"
                      height="20"
                      className="w-24 h-5"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id={`gradient-desktop-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" style={{ stopColor: 'hsl(var(--destructive))' }} />
                          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))' }} />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="10" x2="100" y2="10" stroke="hsl(var(--muted))" strokeWidth="2" />
                      <line
                        className={isVisible ? `line-draw line-${index + 1}` : ''}
                        x1="0" y1="10" x2="100" y2="10"
                        stroke={`url(#gradient-desktop-${index})`}
                        strokeWidth="4"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                      />
                    </svg>
                  </div>
                  {/* Mobile Vertical Line */}
                  <div className="flex h-12 w-full items-center justify-center md:hidden">
                    <svg width="4" height="48" preserveAspectRatio="none">
                       <defs>
                        <linearGradient
                          id={`gradient-mobile-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" style={{ stopColor: 'hsl(var(--destructive))' }} />
                          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))' }} />
                        </linearGradient>
                      </defs>
                      <line x1="2" y1="0" x2="2" y2="48" stroke="hsl(var(--muted))" strokeWidth="2" />
                      <line
                        className={isVisible ? `line-draw line-${index + 1}` : ''}
                        x1="2" y1="0" x2="2" y2="48"
                        stroke={`url(#gradient-mobile-${index})`}
                        strokeWidth="4"
                        strokeDasharray="48"
                        strokeDashoffset="48"
                      />
                    </svg>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center w-full sm:w-auto">
          <Link 
            href="https://wa.me/553197922538?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Método%20Máquina%20de%20Vendas." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto inline-block"
          >
            <Button 
              size="lg" 
              className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} w-full sm:w-auto font-bold text-lg transform hover:scale-105 whitespace-normal h-auto py-6 px-8`} 
              style={{transitionDelay: '1000ms'}}
            >
              QUERO LIGAR ESSA MÁQUINA NO MEU NEGÓCIO
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
