'use client';

import { Star, CheckCircle2, Quote } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    name: 'Fernanda Oliveira',
    icon: 'whatsapp',
    text: 'O tráfego pago mudou meu faturamento. Antes eu dependia de indicação, hoje o cliente chega pronto no WhatsApp.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    date: 'há 2 dias'
  },
  {
    name: 'Roberto Almeida',
    icon: 'google',
    text: 'Já tinha tentado outras agências, mas só a Top Marketing entendeu meu negócio. O site ficou profissional demais!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    date: 'há 1 semana'
  },
  {
    name: 'Juliana Costa',
    icon: 'google',
    text: 'Investimento que se paga no primeiro mês. A equipe do Dudu é super atenciosa e explica tudo certinho.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    date: 'há 3 dias'
  },
  {
    name: 'Marcelo Siqueira',
    icon: 'whatsapp',
    text: 'Parecia mágica. Ativamos a campanha na sexta, sábado minha agenda já estava lotada. Recomendo muito!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    date: 'ontem'
  },
  {
    name: 'Patrícia Lima',
    icon: 'google',
    text: 'Eu tinha vergonha do meu site antigo. Agora tenho orgulho de mandar o link pros clientes. Ficou lindo!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    date: 'há 5 dias'
  }
];

const GoogleIcon = () => (
  <div className="w-6 h-6 relative">
    <Image 
      src="/imagens/Logo Google.png" 
      alt="Google" 
      fill 
      className="object-contain brightness-0 invert"
    />
  </div>
);

const WhatsAppIcon = () => (
  <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center">
    <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </div>
);

export default function TestimonialMarquee() {
  return (
    <section className="w-full py-20 bg-slate-950 relative overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 z-0 opacity-[0.1]" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
       />

      <div className="container mx-auto px-4 mb-10 text-center relative z-10">
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-white mb-2">
          O que dizem nossos parceiros
        </h2>
        <p className="text-slate-400">
          Resultados reais de quem confia na Top Marketing.
        </p>
      </div>

      <div className="relative w-full z-10">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Container */}
        <div className="flex w-full overflow-hidden hover:[&_.animate-marquee]:paused">
          <div className="flex animate-marquee min-w-full shrink-0 gap-6 px-3">
            {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
              <Card 
                key={i} 
                className="w-[320px] md:w-[380px] shrink-0 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg shadow-black/20 border border-white/10 hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden relative"
              >
                {/* Large Watermark Quote */}
                <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12 z-0" />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/10 shadow-sm group-hover:scale-105 transition-transform duration-300">
                         <Image 
                           src={item.image} 
                           alt={item.name}
                           fill
                           sizes="48px"
                           className="object-cover"
                         />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-slate-100 text-sm">{item.name}</p>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-950/30" />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">{item.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Source Icon */}
                    <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.icon === 'google' ? <GoogleIcon /> : <WhatsAppIcon />}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="relative">
                    <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                      "{item.text}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
           <div className="flex animate-marquee min-w-full shrink-0 gap-6 px-3" aria-hidden="true">
            {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
              <Card 
                key={i} 
                className="w-[320px] md:w-[380px] shrink-0 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg shadow-black/20 border border-white/10 hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden relative"
              >
                {/* Large Watermark Quote */}
                <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12 z-0" />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/10 shadow-sm group-hover:scale-105 transition-transform duration-300">
                         <Image 
                           src={item.image} 
                           alt={item.name}
                           fill
                           sizes="48px"
                           className="object-cover"
                         />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-slate-100 text-sm">{item.name}</p>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-950/30" />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">{item.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Source Icon */}
                    <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.icon === 'google' ? <GoogleIcon /> : <WhatsAppIcon />}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="relative">
                    <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                      "{item.text}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
