'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '#sobre', label: 'É pra mim?' },
  { href: '#metodo', label: 'O Método' },
  { href: '/analise-gratuita', label: 'Análise Gratuita' },
];

const whatsappLink =
  'https://wa.me/553197922538?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços.';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex max-w-screen-2xl items-center py-2 sm:py-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center">
            <Image
              src="https://files.catbox.moe/1uvpw9.png"
              alt="Top Marketing BH Logo"
              width={240}
              height={240}
              className="h-auto w-36 sm:w-48"
              priority
              sizes="(max-width: 768px) 144px, 192px"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="hidden sm:flex bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all">
              <MessageCircle className="mr-2 h-4 w-4" />
              Falar no WhatsApp
            </Button>
          </Link>
          <div className="md:hidden">
            {isClient && (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/"
                      className="flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Image
                        src="https://files.catbox.moe/1uvpw9.png"
                        alt="Top Marketing BH Logo"
                        width={240}
                        height={240}
                        className="h-auto w-48"
                      />
                    </Link>
                    <nav className="flex flex-col space-y-2">
                      {navLinks.map(({ href, label }) => (
                        <Link
                          key={label}
                          href={href}
                          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      ))}
                      <Link
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-3 py-2 text-sm font-medium text-green-600 hover:bg-muted"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (typeof window !== 'undefined' && (window as any).gtag) {
                            (window as any).gtag('event', 'conversion', {'send_to': 'AW-17892072580/USPICMSVoe0bEIS5zdNC'});
                          }
                        }}
                      >
                        Falar no WhatsApp
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
