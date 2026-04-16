import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    id: 'tech',
    question: 'Não entendo nada de internet e não tenho tempo. Vocês fazem tudo?',
    answer: 'Exatamente por isso a gente existe. Você foca no seu negócio, a gente cuida de tudo no digital. A única coisa que preciso de você é uma conversa inicial de 30 minutos para entender o que você faz.',
  },
  {
    id: 'speed',
    question: 'Meu negócio precisa de caixa rápido. Em quanto tempo o telefone toca?',
    answer: 'Para serviços locais como o seu, a resposta costuma ser rápida. Assim que a campanha do Google entra no ar, quem está procurando pelo seu serviço já te encontra. Muitas vezes os primeiros contatos chegam no mesmo dia.',
  },
  {
    id: 'risk',
    question: 'E se eu pagar e não tiver resultado? Tenho multa para cancelar?',
    answer: 'Trabalhamos sem contrato de fidelidade e sem multas absurdas. A gente precisa estar gerando resultado pra você continuar com a gente. Se você achar que não faz sentido, é só cancelar a qualquer momento.',
  },
  {
    id: 'cost',
    question: 'Tenho pouco dinheiro para investir agora. Consigo começar?',
    answer: 'Sim! Entendemos que nem todo mundo começa investindo fortunas. Vamos definir um orçamento que caiba no seu bolso para que os primeiros resultados ajudem a financiar os próximos meses.',
  },
  {
    id: 'site',
    question: 'Não tenho site (ou o meu é muito antigo). Isso atrapalha?',
    answer: 'De forma alguma. Nós não reaproveitamos sites antigos que não convertem. O pacote já inclui uma Landing Page profissional criada do zero, com o único objetivo de vender seu serviço.',
  },
];


export default function FaqSection() {
  return (
    <section id="faq" className="w-full py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Ainda tem Dúvidas? Nós respondemos.
          </h2>
           <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Respondemos as principais objeções de quem está pensando em contratar nosso serviço.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
               <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
