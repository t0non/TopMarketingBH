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
    answer: 'Absolutamente tudo. Sua única tarefa é atender o telefone e fechar a venda. A parte chata (criar site, configurar anúncios, palavras-chave) é 100% nossa responsabilidade. Nós entregamos o cliente pronto no seu WhatsApp.',
  },
  {
    id: 'speed',
    question: 'Meu negócio precisa de caixa rápido. Em quanto tempo o telefone toca?',
    answer: 'É imediato. Não vendemos promessas de longo prazo. Assim que ativamos sua campanha, sua empresa aparece no topo. A maioria dos nossos clientes fecha os primeiros negócios nas primeiras 24 a 48 horas.',
  },
  {
    id: 'risk',
    question: 'E se eu pagar e não tiver resultado? Tenho multa para cancelar?',
    answer: 'Risco Zero e Sem Multa. Nós confiamos tanto no nosso método que não fazemos contrato de fidelidade. Você renova mês a mês porque está lucrando, e não porque é obrigado. Se não estiver feliz, cancela na hora.',
  },
  {
    id: 'cost',
    question: 'Tenho pouco dinheiro para investir agora. Consigo começar?',
    answer: 'Sim, você controla o bolso. Não exigimos verbas milionárias. Traçamos uma estratégia que cabe no seu orçamento atual para que o próprio lucro das primeiras vendas pague o aumento dos anúncios.',
  },
  {
    id: 'site',
    question: 'Não tenho site (ou o meu é muito antigo). Isso atrapalha?',
    answer: 'Nós resolvemos isso. Não vamos usar seu site antigo. Dentro do nosso pacote, já criamos uma página nova, moderna e rápida, desenhada especificamente para converter visitantes em clientes no WhatsApp.',
  },
];


export default function FaqSection() {
  return (
    <section id="faq" className="w-full py-20 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
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
