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
    title: 'Passo 1: Sua Casa Digital (Site)',
    description:
      'Construímos um site rápido e seguro, que passa confiança para o seu cliente e funciona <strong>perfeitamente em qualquer celular</strong>.',
  },
  {
    icon: Target,
    title: 'Passo 2: Atração de Clientes (Google Ads)',
    description:
      'Configuramos o Google para mostrar sua empresa exatamente quando alguém pesquisar <strong>pelo que você vende em BH</strong>.',
  },
  {
    icon: MessageSquare,
    title: 'Passo 3: O WhatsApp Toca',
    description:
      'O cliente clica, gosta do que vê e <strong>chama você no WhatsApp</strong>. Simples assim.',
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
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            O Método{" "}
            <span className="bg-gradient-to-r from-primary to-blue-900 bg-clip-text text-transparent">
              "Máquina de Vendas"
            </span>
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
                <Card className="h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl text-center border-0 bg-transparent shadow-none">
                  <CardHeader className="items-center relative">
                    <div className={
                        `${isVisible && index === 1 ? 'step-2-pulse' : ''} ${isVisible && index === 2 ? 'step-3-pulse' : ''}`
                    }>
                      {index === 0 ? (
                        <div className="w-[72px] h-[72px] flex items-center justify-center rounded-full shadow-md border border-gray-100 bg-white overflow-hidden">
                          <div className="relative w-10 h-10">
                            <Image
                              src="/imagens/1.png"
                              alt="Google"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        </div>
                      ) : index === 1 ? (
                        <div className="w-[72px] h-[72px] flex items-center justify-center rounded-full shadow-md border border-gray-100 bg-white overflow-hidden">
                          <div className="relative w-10 h-10">
                            <Image
                              src="/imagens/3.png"
                              alt="Google Ads"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="w-[72px] h-[72px] flex items-center justify-center rounded-full shadow-md border border-gray-100 bg-white overflow-hidden">
                          <div className="relative w-10 h-10">
                            <Image
                              src="/imagens/2.png"
                              alt="WhatsApp"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardTitle className="mt-4 text-2xl font-semibold text-foreground">
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
