'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <>
      <section id="contato" className="w-full py-20 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Pronto para aparecer no Google?
              </h2>
              <p className="mt-4 max-w-[600px] text-gray-200 md:text-xl">
                Me conta o que você faz e eu te digo como posso ajudar. Sem enrolação, sem apresentação longa. Uma conversa rápida no WhatsApp já resolve.
              </p>
            </div>
            <div className="flex justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-in-out">
              <Link href="https://wa.me/553197922538?text=Olá!%20Eduardo,%20gostaria%20de%20saber%20como%20aparecer%20no%20Google." target="_blank" rel="noopener noreferrer" className="w-full max-w-sm">
            <Button 
                variant="secondary" 
                className="w-full bg-white bg-none hover:bg-gray-100 text-blue-600 border-none shadow-md whitespace-normal py-6 h-auto" 
                size="lg"
            >
                FALAR COM O EDUARDO AGORA
            </Button>
          </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
