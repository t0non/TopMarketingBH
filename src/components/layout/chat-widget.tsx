'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const whatsappLink =
  'https://wa.me/5531999999999?text=Ol%C3%A1!%20Gostaria%20de%20receber%20um%20or%C3%A7amento.';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSequenceRun, setHasSequenceRun] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showCtaCard, setShowCtaCard] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [calloutTypingFirst, setCalloutTypingFirst] = useState(true);
  const [calloutFirstMessage, setCalloutFirstMessage] = useState(false);
  const [calloutTypingSecond, setCalloutTypingSecond] = useState(false);
  const [calloutSecondMessage, setCalloutSecondMessage] = useState(false);

  useEffect(() => {
    let firstTimeout: number | undefined;
    let secondTimeout: number | undefined;
    let thirdTimeout: number | undefined;

    firstTimeout = window.setTimeout(() => {
      setCalloutTypingFirst(false);
      setCalloutFirstMessage(true);

      secondTimeout = window.setTimeout(() => {
        setCalloutTypingSecond(true);

        thirdTimeout = window.setTimeout(() => {
          setCalloutTypingSecond(false);
          setCalloutSecondMessage(true);
        }, 1800);
      }, 800);
    }, 1800);

    return () => {
      if (firstTimeout !== undefined) {
        window.clearTimeout(firstTimeout);
      }
      if (secondTimeout !== undefined) {
        window.clearTimeout(secondTimeout);
      }
      if (thirdTimeout !== undefined) {
        window.clearTimeout(thirdTimeout);
      }
    };
  }, []);

  useEffect(() => {
    let startTypingTimeout: number | undefined;
    let typingDurationTimeout: number | undefined;
    let ctaTimeout: number | undefined;

    if (!isOpen) {
      setShowTyping(false);
      return;
    }

    if (hasSequenceRun) {
      setShowTyping(false);
      setShowFirstMessage(true);
      setShowCtaCard(true);
      return;
    }

    setShowTyping(false);
    setShowFirstMessage(false);
    setShowCtaCard(false);

    startTypingTimeout = window.setTimeout(() => {
      setShowTyping(true);

      typingDurationTimeout = window.setTimeout(() => {
        setShowTyping(false);
        setShowFirstMessage(true);

        ctaTimeout = window.setTimeout(() => {
          setShowCtaCard(true);
          setHasSequenceRun(true);
        }, 500);
      }, 1800);
    }, 500);

    return () => {
      if (startTypingTimeout !== undefined) {
        window.clearTimeout(startTypingTimeout);
      }
      if (typingDurationTimeout !== undefined) {
        window.clearTimeout(typingDurationTimeout);
      }
      if (ctaTimeout !== undefined) {
        window.clearTimeout(ctaTimeout);
      }
    };
  }, [isOpen, hasSequenceRun]);

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end space-y-3 space-y-reverse md:space-y-3">
      {!isOpen && !isDismissed && (
        <div
          className="flex items-center gap-3 cursor-pointer max-w-xs w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative text-sm text-slate-900 space-y-2">
            {calloutTypingFirst && !calloutFirstMessage && (
              <div className="inline-flex flex-col items-center gap-1 rounded-full bg-slate-100 px-3 py-2">
                <span className="tm-chat-typing-dot-blue" />
                <span className="tm-chat-typing-dot-blue" />
                <span className="tm-chat-typing-dot-blue" />
              </div>
            )}
            {!calloutTypingFirst && calloutFirstMessage && (
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-900">
                  Oi, tudo bem?
                </div>
                {calloutTypingSecond && !calloutSecondMessage && (
                  <div className="inline-flex flex-col items-center gap-1 rounded-full bg-slate-100 px-3 py-2">
                    <span className="tm-chat-typing-dot-blue" />
                    <span className="tm-chat-typing-dot-blue" />
                    <span className="tm-chat-typing-dot-blue" />
                  </div>
                )}
                {calloutSecondMessage && (
                  <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-900">
                    Que tal receber um{' '}
                    <span className="font-semibold">orçamento rápido?</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="relative flex-shrink-0">
            <Image
              src="/imagens/Eduardo.webp"
              alt="Eduardo - Top Marketing"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 online-dot" />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="w-[320px] max-w-[90vw] rounded-2xl bg-slate-100 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between bg-blue-500 px-3 py-2 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="/imagens/Eduardo.webp"
                alt="Eduardo - Top Marketing"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  Eduardo - Top Marketing
                </span>
                <span className="text-xs text-blue-100">Online agora</span>
              </div>
            </div>
            <button
              type="button"
              className="text-xl leading-none text-blue-100 hover:text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col gap-3 px-3 py-3 bg-slate-50">
            {showTyping && (
              <div className="flex">
                <div className="rounded-2xl rounded-bl-sm bg-slate-200 px-3 py-2 max-w-[90%]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="tm-chat-typing-dot" />
                    <span className="tm-chat-typing-dot" />
                    <span className="tm-chat-typing-dot" />
                  </div>
                </div>
              </div>
            )}

            {showFirstMessage && (
              <div className="flex">
                <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 max-w-[90%] text-sm text-slate-900 shadow-sm animate-in fade-in slide-in-from-bottom-1">
                  Oi, tudo bem?
                </div>
              </div>
            )}

            {showCtaCard && (
              <div className="mt-1 rounded-2xl bg-slate-100 px-4 py-4 shadow-inner animate-in fade-in slide-in-from-bottom-1">
                <div className="mb-3 text-sm text-slate-900">
                  Quer receber um <span className="font-semibold">orçamento rápido?</span>
                </div>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                  onClick={() => {}}
                >
                  Sim, eu quero ➔
                </Link>
                <p className="text-[11px] leading-snug text-slate-500">
                  Clicando acima você aceita nossas{' '}
                  <Link
                    href="/politica-de-privacidade"
                    className="underline hover:text-blue-600"
                  >
                    Políticas de privacidade
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
