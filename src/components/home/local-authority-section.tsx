'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Quote } from 'lucide-react';

export default function LocalAuthoritySection() {
  return (
    <section
      id="autoridade"
      className="w-full py-20 md:py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-3xl font-headline font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Quem está por trás disso
            </h2>
            <p className="mt-6 text-foreground font-medium md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sou o Eduardo, especialista em Google Ads e criador da Top Marketing BH. Sou de BH, atendo BH, e entendo como o empresário mineiro pensa — direto, sem rodeio, quer resultado.
              <br/><br/>
              Não trabalho com 50 clientes ao mesmo tempo. Prefiro poucos clientes e resultado de verdade do que uma carteira grande e entrega mediana. Já ajudei negócios locais a sair do zero no digital para agenda lotada. Meu trabalho é fazer o mesmo pelo seu.
            </p>
            
            <div className="mt-8 relative max-w-xl mx-auto lg:mx-0">
               <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-white bg-blue-500 rounded-full p-1 shadow-md" />
                  <blockquote className="text-lg italic text-slate-600 font-medium relative z-10">
                    "Nós não entregamos apenas um site profissional. Eu quero que você tenha que me pedir para pausar os anúncios porque não está dando conta de atender tanto telefone."
                  </blockquote>
               </div>
            </div>

            <div className="mt-10 mx-auto lg:mx-0 w-full sm:w-auto">
              <Link 
                href="https://wa.me/553197922538?text=Olá!%20Quero%20colocar%20minha%20empresa%20no%20topo%20do%20Google." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto inline-block"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-extrabold text-lg transform hover:scale-105 transition-all duration-300 py-6 px-10 h-auto whitespace-normal"
                >
                  FALAR COM O EDUARDO
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-900 opacity-20 blur-2xl"></div>
              <Image
                src="/imagens/Eduardo.webp"
                alt="Eduardo - Especialista em Google Ads"
                fill
                className="object-cover rounded-full border-8 border-white shadow-2xl relative z-10"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 450px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
