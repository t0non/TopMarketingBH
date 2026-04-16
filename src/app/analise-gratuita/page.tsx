import { Metadata } from 'next';
import DiagnosticQuiz from '@/components/home/diagnostic-quiz';

export const metadata: Metadata = {
  title: 'Diagnóstico Gratuito | Top Marketing BH',
  description: 'Descubra o plano ideal para destravar suas vendas. Responda 3 perguntas e receba uma estratégia personalizada.',
  openGraph: {
    title: 'Diagnóstico Gratuito | Top Marketing BH',
    description: 'Descubra o plano ideal para destravar suas vendas. Responda 3 perguntas e receba uma estratégia personalizada.',
    url: 'https://topmarketingbh.com.br/analise-gratuita',
    siteName: 'Top Marketing BH',
    images: [
      {
        url: '/imagens/meta.png',
        width: 1200,
        height: 630,
        alt: 'Diagnóstico Top Marketing BH',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function AnaliseGratuitaPage() {
  return (
    <main className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-slate-900 flex items-center justify-center">
      <DiagnosticQuiz />
    </main>
  );
}
