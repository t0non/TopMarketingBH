import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { Instrument_Sans, Montserrat } from 'next/font/google';

const instrumentSans = Instrument_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});
import './globals.css';

export const metadata: Metadata = {
  title: 'Top Marketing BH - Agência de Marketing Digital',
  description:
    'Especialistas em criação de sites e gestão de tráfego pago. Transformamos sua presença online.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
      </head>
      <body className={`${instrumentSans.variable} ${montserrat.variable} antialiased font-sans overflow-x-hidden`}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17892072580"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17892072580');
          `}
        </Script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
