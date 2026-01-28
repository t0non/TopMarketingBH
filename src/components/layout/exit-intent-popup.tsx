'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport
      if (
        event.clientY <= 0 &&
        !sessionStorage.getItem('exitIntentShown')
      ) {
        setIsOpen(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    const handleVisibilityChange = () => {
        // Trigger on mobile when user switches tabs or apps
        if (document.visibilityState === 'hidden' && !sessionStorage.getItem('exitIntentShown')) {
          setIsOpen(true);
          sessionStorage.setItem('exitIntentShown', 'true');
        }
      }

    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('visibilitychange', handleVisibilityChange);


    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-lg text-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-foreground">
            Espere! Não vá embora sem saber o preço.
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-muted-foreground pt-4">
            Você sabia que anunciar no Google pode custar menos que um cafezinho por dia?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="pt-6">
            <Link 
                href="https://wa.me/553197922538?text=Olá!%20Gostaria%20de%20saber%20o%20valor%20sem%20compromisso." 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => setIsOpen(false)}
            >
                <Button size="lg" className="w-full font-bold">
                    Quero saber o valor sem compromisso
                </Button>
            </Link>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
