import { Quote } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';

export default function TestimonialSection() {
  return (
    <section
      id="compromisso"
      className="relative w-full py-12 md:py-24 lg:py-32 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('https://files.catbox.moe/lcbtpw.png')" }}
    >
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-blue-900 bg-clip-text text-transparent mb-8">
            Aqui o marketing é top.
          </h2>
          <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl">
            <CardContent className="p-6 md:p-12 flex flex-col items-center">
              <div className="mb-8 rounded-full bg-gradient-to-br from-primary to-blue-900 p-1">
                <Image
                  src="/imagens/Eduardo.webp"
                  alt="Eduardo, Especialista em Vendas"
                  width={800}
                  height={800}
                  className="rounded-full w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover"
                  sizes="(max-width: 768px) 256px, 384px"
                />
              </div>
              <blockquote className="mt-6 text-xl md:text-2xl font-medium text-white">
                "Nós não entregamos apenas um site profissional. Eu quero que você tenha que me pedir para pausar os anúncios porque não está dando conta de atender tanto telefone."
              </blockquote>
              <p className="mt-6 font-semibold text-white">
                – Eduardo, Especialista em Vendas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
