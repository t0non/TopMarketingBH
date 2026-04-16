'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const deliverables = [
  {
    title: 'Anunciamos você no Google:',
    description: 'Colocamos sua empresa para aparecer para quem busca pelo seu produto e serviço, exatamente na hora que ele está querendo comprar.',
  },
  {
    title: 'Landing Pages de Conversão:',
    description: 'Criamos o seu site focado em converter visitantes em clientes, garantindo que o seu investimento não seja jogado fora.',
  },
  {
    title: 'Relatório Semanal de Transparência:',
    description: 'Você terá clareza total. Toda semana enviamos um resumo dos resultados para você saber como o seu investimento está rendendo.',
  },
  {
    title: 'Reuniões de Estratégia:',
    description: 'Uma vez por mês, sentamos com você para analisar os números e planejar os próximos passos para o seu negócio crescer.',
  },
  {
    title: 'Inteligência de Dados:',
    description: 'Configuramos ferramentas para o Google aprender quem é o seu melhor cliente e focar em trazer mais pessoas com o mesmo perfil.',
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Lado Esquerdo - Título e Cards (Ocupa 6 colunas no Desktop) */}
          <div className="lg:col-span-6 flex flex-col space-y-4 relative z-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-[42px] font-extrabold text-[#555555] text-center mb-6 md:mb-8"
            >
              O que entregamos?
            </motion.h2>

            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 50 }}
                className="bg-[#f0f0f3]/75 backdrop-blur-md rounded-[14px] p-4 md:p-5 border-[0.25px] border-[#999999]/25 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative z-30"
              >
                <p className="text-[#666] leading-relaxed text-[17px] md:text-[19px]">
                  <strong className="font-extrabold text-[#555555]">{item.title}</strong>{' '}
                  <span className="font-medium">{item.description}</span>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Lado Direito - Laptop e Notificações (Ocupa 6 colunas no Desktop) */}
          <div className="lg:col-span-6 relative w-full min-h-[500px] md:min-h-[700px] flex items-center justify-center lg:justify-start">
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[1000px] aspect-[4/3] z-10"
            >
              <Image 
                src="/imagens/Laptop - grafico (1).webp"
                alt="Laptop com Dashboard de Resultados"
                fill
                className="object-contain object-center scale-[1.2] md:scale-125 lg:scale-[1.6] xl:scale-[1.9] lg:-translate-x-14 xl:-translate-x-24 lg:translate-y-16 xl:translate-y-24"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </motion.div>

            {/* Grupo de Notificações Top-Left Originais */}
            <motion.div 
              initial={{ opacity: 0, y: 30, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute top-[2%] xl:top-[-5%] left-[-5%] md:left-[10%] xl:left-[5%] flex flex-col gap-5 z-0"
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-[260px] md:w-[320px] transition-transform hover:-translate-y-1">
                  <Image src="/imagens/notificacaogoogleads.svg" alt="Notificação de venda" width={320} height={80} className="w-full h-auto drop-shadow-lg bg-white/65 backdrop-blur-md border-[0.5px] border-[#ffffff]/60 rounded-xl" />
                </div>
              ))}
            </motion.div>

            {/* Grupo de Notificações Bottom-Right Originais */}
            <motion.div 
              initial={{ opacity: 0, y: 30, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute bottom-[0%] xl:bottom-[-5%] right-[-5%] md:right-[0%] xl:right-[-10%] flex flex-col gap-5 z-0"
            >
               {[0, 1, 2].map((i) => (
                <div key={i} className="w-[260px] md:w-[320px] transition-transform hover:-translate-y-1">
                  <Image src="/imagens/notificacaogoogleads.svg" alt="Notificação de venda" width={320} height={80} className="w-full h-auto drop-shadow-lg bg-white/65 backdrop-blur-md border-[0.5px] border-[#ffffff]/60 rounded-xl" />
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* CTA Button placed below */}
        <div className="w-full flex justify-center mt-16 md:mt-24 lg:mt-32 relative z-40">
           <Link
              href="https://wa.me/553197922538?text=Olá! Gostaria de ter mais clientes."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#0eb1bf] hover:bg-[#0c9ca8] text-white font-bold text-[15px] md:text-[17px] py-7 px-10 rounded-full shadow-[0_10px_40px_rgba(14,177,191,0.5)] hover:shadow-[0_15px_50px_rgba(14,177,191,0.7)] transition-all duration-300 transform hover:scale-105 group border-0">
                QUERO MAIS CLIENTES
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
        </div>

      </div>
    </section>
  );
}
