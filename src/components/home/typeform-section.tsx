'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TypeformSection() {
  return (
    <section id="formulario" className="w-full py-20 md:py-24 bg-gradient-to-r from-blue-600 to-blue-500">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-headline font-extrabold tracking-tighter md:text-5xl text-white mb-6">
          Pronto para dar o próximo passo?
        </h2>
        <p className="mt-4 text-lg text-gray-100 font-medium max-w-2xl mx-auto mb-10">
          Preencha rapidamente nosso formulário para avaliarmos se o seu negócio tem o perfil de clientes que buscamos escalar.
        </p>
        <Link href="https://form.typeform.com/to/thf68zAW" target="_blank" rel="noopener noreferrer">
          <Button 
            size="lg" 
            variant="secondary"
            className="w-full sm:w-auto font-extrabold text-lg text-blue-600 bg-white hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105 py-6 px-10 h-auto whitespace-normal shadow-xl"
          >
            PREENCHER FORMULÁRIO DE AVALIAÇÃO
          </Button>
        </Link>
      </div>
    </section>
  );
}
