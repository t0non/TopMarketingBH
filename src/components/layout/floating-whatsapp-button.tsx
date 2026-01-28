'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Send, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Configuração do Widget
const WIDGET_CONFIG = {
  // Avatar do botão flutuante (Eduardo)
  buttonAvatar: '/imagens/Eduardo.webp',
  // Avatar do agente/especialista (Eduardo)
  agentAvatar: '/imagens/Eduardo.webp',
  agentName: 'Eduardo',
  // Configuração da Notificação de Topo
  notificationAvatar: '/imagens/Eduardo.webp',
  notificationName: 'Eduardo',
  whatsappNumber: '553197922538',
  initialMessage: 'Olá! Gostaria de receber um orçamento para minha empresa.',
  messages: [
    { text: 'Olá! Tudo bem?', delay: 1500 },
    { text: 'Gostaria de colocar sua empresa no topo do Google?', delay: 4000 }
  ]
};

const IPHONE_SOUND_URL = '/imagens/notificação iphone.mp3';

export default function FloatingWhatsappButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isTopTyping, setIsTopTyping] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isOpenRef = useRef(isOpen);

  // Manter o ref do isOpen atualizado para usar dentro dos timeouts sem reiniciar o efeito
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const notificationRef = useRef<HTMLDivElement>(null);
  const isDragDismissing = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    // Apenas um toque
    if (e.targetTouches.length !== 1) return;

    setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
    });
    setIsDragging(true);
    isDragDismissing.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    
    const diffX = currentX - touchStart.x;
    const diffY = currentY - touchStart.y;

    // Permitir Esquerda/Direita e Cima (diffY < 0)
    // Bloquear movimento para baixo (apenas leve resistência ou 0)
    const effectiveY = Math.min(0, diffY);
    
    setDragPosition({ x: diffX, y: effectiveY });
    
    // Calcular opacidade baseada na distância (feedback visual)
    const elementWidth = notificationRef.current?.offsetWidth || 340;
    const elementHeight = notificationRef.current?.offsetHeight || 100;
    
    const percentX = Math.abs(diffX) / elementWidth;
    const percentY = Math.abs(effectiveY) / elementHeight;
    const maxPercent = Math.max(percentX, percentY);
    
    // Reduzir opacidade até 0.5 conforme arrasta
    setOpacity(Math.max(0.5, 1 - maxPercent));
  };

  const onTouchEnd = () => {
    if (!touchStart) return;
    
    setIsDragging(false);
    
    const elementWidth = notificationRef.current?.offsetWidth || 340;
    const elementHeight = notificationRef.current?.offsetHeight || 100;
    
    const percentX = Math.abs(dragPosition.x) / elementWidth;
    const percentY = Math.abs(dragPosition.y) / elementHeight;
    
    const threshold = 0.4; // 40%
    
    // Se arrastou mais que 40% -> Dispensar
    if (percentX > threshold || percentY > threshold) {
        isDragDismissing.current = true;
        
        // Continuar o movimento na direção do arrasto
        let endX = dragPosition.x;
        let endY = dragPosition.y;
        
        if (percentX > percentY) {
            // Saída Horizontal
            endX = Math.sign(dragPosition.x) * (window.innerWidth + 100);
        } else {
            // Saída Vertical (Cima)
            endY = -200; 
        }
        
        setDragPosition({ x: endX, y: endY });
        setOpacity(0);
        
        // Remover do DOM após animação
        setTimeout(() => {
            setNotificationVisible(false);
            setDragPosition({ x: 0, y: 0 });
            setOpacity(1);
            if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
        }, 300);
        
    } else {
        // Efeito Elástico (Snap-back)
        setDragPosition({ x: 0, y: 0 });
        setOpacity(1);
    }
    
    setTouchStart(null);
  };

  const handleNotificationClick = () => {
    // Se estiver dispensando, não abre o link
    if (isDragDismissing.current) return;
    // Se houve um arrasto pequeno (mas não dismiss), evitar clique acidental
    if (Math.abs(dragPosition.x) > 5 || Math.abs(dragPosition.y) > 5) return;
    
    window.open(whatsappUrl, '_blank');
  };

  // Som de notificação
  useEffect(() => {
    audioRef.current = new Audio(IPHONE_SOUND_URL);
    audioRef.current.volume = 0.6;
    
    // Tentar desbloquear o áudio na primeira interação do usuário
    const unlockAudio = () => {
      if (audioRef.current && !audioUnlocked) {
        audioRef.current.play().then(() => {
          audioRef.current?.pause();
          audioRef.current!.currentTime = 0;
          setAudioUnlocked(true);
        }).catch(() => {});
      }
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [audioUnlocked]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.log('Autoplay blocked or error:', e);
        });
      }
    }
  };

  const [hasNotificationTriggered, setHasNotificationTriggered] = useState(false);
  const hasNotificationTriggeredRef = useRef(hasNotificationTriggered);

  useEffect(() => {
    hasNotificationTriggeredRef.current = hasNotificationTriggered;
  }, [hasNotificationTriggered]);

  const triggerNotification = () => {
    if (!isOpenRef.current && !hasNotificationTriggeredRef.current) {
      setHasNotificationTriggered(true);
      
      // Iniciar animação de "digitando..." no topo antes de mostrar a notificação
      setIsTopTyping(true);

      setTimeout(() => {
        setIsTopTyping(false);
        setNotificationVisible(true);
        playSound();
        // Auto-hide após 6 segundos
        notificationTimeoutRef.current = setTimeout(() => {
          setNotificationVisible(false);
        }, 6000);
      }, 2500); // 2.5 segundos digitando
    }
  };

  // Timer para notificação de topo (25 segundos) ou Scroll Trigger
  useEffect(() => {
    // Timer
    const timer = setTimeout(() => {
      triggerNotification();
    }, 25000);

    // Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerNotification();
          }
        });
      },
      { threshold: 0.3 }
    );

    const target = document.getElementById('compromisso');
    if (target) {
      observer.observe(target);
    }

    return () => {
      clearTimeout(timer);
      if (target) observer.unobserve(target);
    };
  }, []);

  // Lógica de sequência de mensagens
  useEffect(() => {
    // Se todas as mensagens já foram mostradas, não faz nada
    if (visibleMessages >= WIDGET_CONFIG.messages.length) return;

    let timeouts: NodeJS.Timeout[] = [];

    // Se já interagiu (clicou para abrir), a sequência continua mas sem notificação popup
    // Se não interagiu, mostra notificação popup

    // Sequência para 1ª mensagem
    if (visibleMessages === 0) {
        timeouts.push(setTimeout(() => setIsTyping(true), 1000));
        timeouts.push(setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(1);
          playSound();
        }, 1000 + WIDGET_CONFIG.messages[0].delay));
    }
    // Sequência para 2ª mensagem
    else if (visibleMessages === 1) {
        const secondMessageDelay = 1500; // Tempo entre msg 1 e começo da digitação da msg 2
        timeouts.push(setTimeout(() => setIsTyping(true), secondMessageDelay));
        timeouts.push(setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(2);
          playSound();
        }, secondMessageDelay + 2500)); // Tempo digitando
    }

    return () => {
      timeouts.forEach(clearTimeout);
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    };
  }, [visibleMessages]); // Depende apenas de visibleMessages (isOpen via ref)

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
    setNotificationVisible(false); // Esconder notificação ao abrir
    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    // NÃO forçar todas as mensagens. Deixar a animação continuar se não acabou.
    // setVisibleMessages(WIDGET_CONFIG.messages.length); 
    // Se estiver digitando, manter digitando
  };

  const whatsappUrl = `https://wa.me/${WIDGET_CONFIG.whatsappNumber}?text=${encodeURIComponent(WIDGET_CONFIG.initialMessage)}`;

  return (
    <>
      {/* Área de Notificações (Topo Central) */}
      {!isOpen && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 w-full max-w-sm px-4 pointer-events-none">
          
          {/* Indicador de Digitando (Pill) */}
          {isTopTyping && (
             <div className="pointer-events-auto bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="relative w-4 h-4 rounded-full overflow-hidden">
                   <Image 
                     src={WIDGET_CONFIG.notificationAvatar} 
                     alt="Avatar" 
                     fill 
                     quality={100}
                     className="object-cover"
                   />
                </div>
                <span className="text-xs text-gray-500 font-medium">digitando...</span>
             </div>
          )}

          {/* Card de Notificação Push */}
          {notificationVisible && (
            <div 
              ref={notificationRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={handleNotificationClick}
              style={{ 
                transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                opacity: opacity,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s'
              }}
              className="pointer-events-auto cursor-pointer w-full max-w-[340px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 overflow-hidden animate-in slide-in-from-top-10 fade-in duration-500 hover:scale-[1.02] relative"
            >
              {/* Botão de Fechar Notificação */}
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setNotificationVisible(false);
                    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
                }}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 z-10"
              >
                <X size={14} />
              </button>

              {/* Header da Notificação */}
              <div className="px-3 py-2 flex items-center justify-between bg-gray-50/50 border-b border-gray-100/50 pr-8">
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 rounded-[5px] overflow-hidden shadow-sm">
                    <Image 
                      src="/imagens/2.png"
                      alt="WhatsApp"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">WHATSAPP</span>
                </div>
                <span className="text-[10px] text-gray-400">agora</span>
              </div>
              
              {/* Conteúdo */}
              <div className="px-4 py-3 bg-white/50 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                   <div className="relative min-w-[36px] h-9 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                      <Image 
                        src={WIDGET_CONFIG.notificationAvatar} 
                        alt="Avatar" 
                        fill 
                        quality={100}
                        className="object-cover"
                      />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-0.5">{WIDGET_CONFIG.notificationName}</h4>
                      <p className="text-[13px] text-gray-600 leading-snug line-clamp-3 mb-2">
                        {WIDGET_CONFIG.messages[1].text}
                      </p>
                      
                      {/* Botão de Ação CTA */}
                      <Link 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                         <div className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-1.5 px-3 rounded-lg text-xs shadow-sm transition-colors text-center flex items-center justify-center gap-1.5">
                            Quero mais clientes <Send size={12} />
                         </div>
                      </Link>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 font-sans transition-all duration-500 ease-in-out ${
        (isTopTyping || notificationVisible) 
          ? 'opacity-0 translate-y-4 pointer-events-none' 
          : 'opacity-100 translate-y-0 pointer-events-auto'
      }`}>
        
        {/* Preview das Mensagens (Bolhas ao lado do botão) */}
        {!isOpen && (
            <div className="absolute bottom-0 right-[80px] flex flex-col items-end gap-3 pb-2 w-[300px] pointer-events-none">
                
                {/* Mensagem 1 */}
                {visibleMessages >= 1 && (
                   <div 
                        onClick={toggleChat}
                        className="pointer-events-auto bg-white p-3 rounded-2xl rounded-br-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 max-w-[220px] text-[13px] text-gray-800 animate-in fade-in slide-in-from-right-8 duration-500 cursor-pointer hover:scale-[1.02] transition-transform origin-bottom-right flex flex-col gap-0.5"
                   >
                        <span className="font-semibold text-xs text-gray-900 leading-none mb-1 block">{WIDGET_CONFIG.agentName}</span>
                        {WIDGET_CONFIG.messages[0].text}
                   </div>
                )}

                {/* Mensagem 2 */}
                {visibleMessages >= 2 && (
                   <div 
                        onClick={toggleChat}
                        className="pointer-events-auto bg-white p-2.5 rounded-2xl rounded-br-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 max-w-[200px] text-xs text-gray-800 animate-in fade-in slide-in-from-right-8 duration-500 cursor-pointer hover:scale-[1.02] transition-transform origin-bottom-right flex flex-col gap-0.5"
                   >
                        <span className="font-semibold text-[11px] text-gray-900 leading-none mb-1 block">{WIDGET_CONFIG.agentName}</span>
                        {WIDGET_CONFIG.messages[1].text}
                   </div>
                )}

                {/* Digitador */}
                {isTyping && (
                   <div className="bg-white px-3 py-2.5 rounded-2xl rounded-br-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300 origin-bottom-right">
                      <div className="flex gap-1.5 h-2 items-center">
                         <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                         <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                         <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      </div>
                   </div>
                )}
            </div>
        )}

        {/* Janela do Chat */}
        {isOpen && (
          <div className="w-[350px] bg-[#E5DDD5] rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-right border border-gray-200">
            {/* Cabeçalho */}
            <div className="bg-[#0f172a] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image
                    src={WIDGET_CONFIG.agentAvatar}
                    alt={WIDGET_CONFIG.agentName}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={100}
                    priority
                    className="rounded-full object-cover border-2 border-white/20"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full z-10"></span>
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">{WIDGET_CONFIG.agentName}</h3>
                  <p className="text-xs text-green-400 font-medium">Online agora</p>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Corpo do Chat */}
          <div 
            className="p-4 h-[300px] overflow-y-auto flex flex-col gap-4 relative"
            style={{ 
              backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
              backgroundBlendMode: 'soft-light'
            }}
          >
            {WIDGET_CONFIG.messages.slice(0, visibleMessages).map((msg, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start text-gray-800 text-sm relative animate-in fade-in slide-in-from-left-2 duration-300">
                {msg.text}
                <span className="text-[10px] text-gray-400 absolute bottom-1 right-2 block leading-none mt-1">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            ))}

            {/* Indicador de Digitando no Chat */}
            {isTyping && (
               <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start text-gray-800 text-sm animate-pulse">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
               </div>
            )}
            
            {visibleMessages >= WIDGET_CONFIG.messages.length && !isTyping && (
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start text-gray-800 text-sm animate-in fade-in slide-in-from-left-2 duration-300">
                Vi que você está procurando melhorar os resultados da sua empresa. Vamos conversar?
              </div>
            )}
          </div>

            {/* Rodapé / Botão de Ação */}
            <div className="p-4 bg-white border-t border-gray-100">
              <Link 
                href={whatsappUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'conversion', {'send_to': 'AW-17892072580/USPICMSVoe0bEIS5zdNC'});
                  }
                }}
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-12 text-lg shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                  Quero vender mais <Send size={18} />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Botão Flutuante Principal */}
        <button
          onClick={toggleChat}
          className={`relative flex items-center justify-center rounded-full bg-gradient-to-b from-[#4ade80] to-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 hover:from-[#25D366] hover:to-[#128C7E] ${
            isOpen ? 'h-12 w-12 rotate-90' : 'h-16 w-16'
          }`}
          aria-label={isOpen ? 'Fechar chat' : 'Abrir chat no WhatsApp'}
        >
          <div className={`relative w-16 h-16 rounded-full shadow-xl overflow-hidden flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#0f172a]' : 'bg-white'}`}>
              {isOpen ? (
                   <X size={32} className="text-white" />
              ) : (
                  <div className="relative w-full h-full">
                     <Image 
                       src={WIDGET_CONFIG.buttonAvatar} 
                       alt="WhatsApp" 
                       fill 
                       quality={100}
                       className="object-cover"
                     />
                  </div>
              )}
          </div>
          
          {/* Indicador Online Pulsante (Fora do overflow-hidden) */}
          {!isOpen && (
             <div className="absolute bottom-0 right-0 z-10 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]"></span>
             </div>
          )}
        </button>
      </div>
    </>
  );
}
