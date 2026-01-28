'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LocalAuthoritySection() {
  return (
    <section
      id="autoridade"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-blue-900 bg-clip-text text-transparent">
              Quer ser o maior do seu ramo em BH?
            </h2>
            <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
              Sabe aquela loja que todo mundo conhece, respeita e gasta
              dinheiro? Vai ser a sua. Não importa se você vende peça, pão ou
              serviço: nós vamos fazer você aparecer tanto no celular das
              pessoas que sua marca vai ficar famosa (e seu bolso cheio).
            </p>
            <div className="mt-8 md:mt-10 mx-auto lg:mx-0 w-full sm:w-auto">
              <Link 
                href="https://wa.me/553197922538?text=Olá!%20Quero%20colocar%20minha%20empresa%20no%20topo%20do%20Google." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-normal h-auto py-6 px-8"
                >
                  QUERO MINHA EMPRESA NO TOPO
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative flex h-[350px] w-full items-center justify-center sm:h-[450px] lg:h-[550px]">
              <Image
                src="https://files.catbox.moe/zn63an.jpg"
                alt="Imagem 1"
                width={500}
                height={375}
                className="absolute z-10 w-2/3 sm:w-3/4 max-w-[350px] rounded-lg border-4 border-white shadow-2xl transition-transform duration-300 ease-in-out lg:w-2/3 lg:max-w-[450px] rotate-[-8deg] hover:rotate-0 hover:scale-105 -translate-x-14 sm:-translate-x-40 lg:-translate-x-52 translate-y-12"
                sizes="(max-width: 768px) 66vw, 33vw"
              />
              <Image
                src="https://files.catbox.moe/fpgo38.jpg"
                alt="Imagem 2"
                width={500}
                height={375}
                className="absolute z-20 w-2/3 sm:w-3/4 max-w-[350px] rounded-lg border-4 border-white shadow-2xl transition-transform duration-300 ease-in-out lg:w-2/3 lg:max-w-[450px] hover:scale-105"
                sizes="(max-width: 768px) 66vw, 33vw"
              />
              <Image
                src="https://files.catbox.moe/oqxfdx.jpg"
                alt="Imagem 3"
                width={500}
                height={375}
                className="absolute z-10 w-2/3 sm:w-3/4 max-w-[350px] rounded-lg border-4 border-white shadow-2xl transition-transform duration-300 ease-in-out lg:w-2/3 lg:max-w-[450px] rotate-[8deg] hover:rotate-0 hover:scale-105 translate-x-14 sm:translate-x-40 lg:translate-x-52 translate-y-12"
                sizes="(max-width: 768px) 66vw, 33vw"
              />
            </div>
             <p className="mt-8 text-center text-muted-foreground italic">
              + 2,3 milhões de habitantes moram em BH e pesquisam no Google todos os dias. Seja visto!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
