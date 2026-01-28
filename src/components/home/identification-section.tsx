'use client';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  <>
    Têm um excelente serviço, mas{' '}
    <b className="font-bold text-white">poucos clientes novos</b>.
  </>,
  <>
    Dependem <b className="font-bold text-white">apenas de indicações</b>{' '}
    boca-a-boca.
  </>,
  <>
    Têm um <b className="font-bold text-white">site antigo</b> que não serve pra nada.
  </>,
  <>
    Já tentou impulsionar publicações sozinho e só{' '}
    <b className="font-bold text-white">queimou dinheiro sem ter retorno</b>.
  </>,
];

export default function IdentificationSection() {
  return (
    <section
      id="sobre"
      className="relative w-full pt-12 md:pt-24 lg:pt-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://files.catbox.moe/srfdre.webp')" }}
      />
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="relative container mx-auto px-4 md:px-6 z-10 pb-[18rem] sm:pb-[22rem] md:pb-[25rem]">
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-white">
            Sua empresa está passando por isso hoje?
          </h2>
          <p className="mt-4 max-w-[600px] text-gray-200 md:text-xl/relaxed mx-auto">
            Somos especialistas em ajudar negócios locais de Belo Horizonte
            que:
          </p>
          <ul className="mt-6 space-y-4 max-w-[600px] mx-auto text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 w-full sm:w-auto inline-block">
            <Link 
                href="https://wa.me/553197922538?text=Olá!%20Quero%20mudar%20a%20situação%20da%20minha%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-normal h-auto py-6 px-8"
              >
                QUERO MUDAR ESSA SITUAÇÃO
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative text-center mt-12 md:mt-16">
          <h3 className="text-2xl sm:text-3xl font-headline font-bold text-white animate-in fade-in slide-in-from-bottom-10 duration-700 [animation-delay:200ms]">
            Todos podem ter um marketing top!
          </h3>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[18rem] sm:h-[22rem] md:h-[25rem] pointer-events-none">
        <Image
            src="/imagens/profissionais.png"
            alt="Especialista em marketing apontando para o texto sobre para quem é a Top Marketing"
            fill
            className="object-contain object-bottom"
            sizes="100vw"
        />
      </div>
    </section>
  );
}
