'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: 'Tráfego Pago de Alta Precisão',
    description: 'Chega de depender da sorte ou do orgânico. Nós criamos campanhas no Google e Instagram que colocam sua oferta na frente de quem já está com o cartão na mão para comprar. Você aparece na hora certa, para a pessoa certa.',
    badge: 'Google Ads & Meta Ads',
    badgeImages: ['/imagens/3.png', '/imagens/meta.png'],
    hoverColor: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/50',
    iconColor: 'text-purple-600',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre Tráfego Pago.',
    buttonText: 'QUERO VENDER MAIS',
  },
  {
    title: 'Sites & Landing Pages que Vendem',
    description: 'Seu site é o seu melhor vendedor 24h. Criamos páginas ultra-rápidas, com design de cinema e psicologia de vendas aplicada. Transforme cliques curiosos em pedidos no WhatsApp com uma estrutura que passa autoridade imediata.',
    badge: 'Otimizado para Google',
    badgeImages: ['/imagens/Logo Google.png'],
    hoverColor: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-blue-500/50',
    iconColor: 'text-blue-600',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre Criação de Sites.',
    buttonText: 'QUERO PARAR DE PERDER CLIENTE',
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-white">
      {/* Aurora Background Effect - Rotating */}
      <div className="absolute inset-[-50%] w-[200%] h-[200%] z-0 pointer-events-none animate-spin-fast origin-center opacity-70">
        <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full blur-[100px] animate-blob animate-color-shift" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full blur-[100px] animate-blob animation-delay-2000 animate-color-shift" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-headline font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500"
          >
            Não basta aparecer. <br/>
            <span>
              Você precisa convencer.
            </span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg md:text-xl text-slate-600"
          >
            A estratégia de dois passos que transformou nossos clientes em líderes de mercado.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
              className="h-full"
            >
              <Card className={`h-full min-h-[350px] md:min-h-[400px] bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-blue-900/5 transition-all duration-500 group relative overflow-hidden ${service.hoverColor}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-6 md:p-10 flex flex-col h-full relative z-10">
                  <div className="flex justify-center items-center mb-8 gap-4">
                    {service.badgeImages.map((img, i) => (
                      <div key={i} className="relative h-12 w-28 transition-transform duration-300 hover:scale-105">
                        <Image 
                          src={img} 
                          alt={`${service.title} logo ${i+1}`}
                          fill
                          className="object-contain"
                          sizes="112px"
                        />
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-6">
                     <Link
                        href={`https://wa.me/553197922538?text=${encodeURIComponent(service.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                      <Button className="w-full h-auto py-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors duration-300 whitespace-normal border-0 shadow-md">
                        {service.buttonText}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
