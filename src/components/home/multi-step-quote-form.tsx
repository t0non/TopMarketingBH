'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

// Types and Schemas
type Step = 'investment' | 'googlePresence' | 'goal' | 'final';

type LeadData = {
  investmentLevel?: string;
  googlePresence?: string;
  mainGoal?: string;
  name: string;
  companyName: string;
  whatsapp: string;
  email: string;
};

const finalFormSchema = z.object({
  name: z.string().min(2, { message: 'Seu nome é obrigatório.' }),
  companyName: z
    .string()
    .min(2, { message: 'O nome da empresa é obrigatório.' }),
  whatsapp: z
    .string()
    .min(10, { message: 'Por favor, insira um WhatsApp válido.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
});

// Component Props
interface MultiStepQuoteFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function MultiStepQuoteForm({
  isOpen,
  onOpenChange,
}: MultiStepQuoteFormProps) {
  const [step, setStep] = useState<Step>('investment');
  const [isLoading, setIsLoading] = useState(false);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});

  const form = useForm<z.infer<typeof finalFormSchema>>({
    resolver: zodResolver(finalFormSchema),
    defaultValues: {
      name: '',
      companyName: '',
      whatsapp: '',
      email: '',
    },
  });

  const handleReset = () => {
    setStep('investment');
    setLeadData({});
    form.reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Use a timeout to allow the exit animation to complete
      setTimeout(() => {
        handleReset();
      }, 300);
    }
    onOpenChange(open);
  };

  const handleNextStep = (
    nextStep: Step,
    data: Partial<LeadData>
  ) => {
    setLeadData(prev => ({ ...prev, ...data }));
    setStep(nextStep);
  };

  const generateWhatsappMessage = (data: LeadData) => {
    const { name, companyName, investmentLevel, googlePresence, mainGoal } = data;
    
    return `Olá! Me chamo *${name}*, da empresa *${companyName}*.
    
Gostaria de receber meu plano personalizado.
    
📝 *Respostas do Quiz:*
🔹 *Investimento:* ${investmentLevel}
🔹 *Presença no Google:* ${googlePresence}
🔹 *Meta:* ${mainGoal}`;
  };

  async function onSubmit(values: z.infer<typeof finalFormSchema>) {
    setIsLoading(true);
    const finalLeadData = { ...leadData, ...values } as LeadData;

    const message = generateWhatsappMessage(finalLeadData);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/553197922538?text=${encodedMessage}`;
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {'send_to': 'AW-17892072580/USPICMSVoe0bEIS5zdNC'});
    }

    // Using window.open for better compatibility
    window.open(whatsappUrl, '_blank');

    // Simulate a delay for user feedback before closing
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsLoading(false);
    handleOpenChange(false);
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); 
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
    value = value.replace(/(\d)(\d{4})$/, '$1-$2'); 
    form.setValue('whatsapp', value);
  };

  const StepWrapper = ({ children, stepKey }: { children: React.ReactNode, stepKey: Step }) => (
    <div
      className={`w-full ${step === stepKey ? 'block' : 'hidden'}`}
    >
      {children}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl p-8 sm:p-10">
        <div className="min-h-[300px] flex flex-col items-center justify-center transition-all duration-300">
           
           {/* STEP 1: INVESTMENT */}
           <StepWrapper stepKey="investment">
            <div className="flex flex-col items-center gap-6 text-center w-full">
              <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight">
                Pergunta 1/3: <br/>
                "Qual o seu nível atual de investimento em Marketing Digital?"
              </DialogTitle>
              <div className="flex flex-col gap-3 w-full">
                <Button
                  size="lg"
                  className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                  variant="outline"
                  onClick={() => handleNextStep('googlePresence', { investmentLevel: 'Nunca anunciei (Orgânico apenas)' })}
                >
                  🌱 Nunca anunciei (Orgânico apenas)
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                  variant="outline"
                  onClick={() => handleNextStep('googlePresence', { investmentLevel: 'Já impulsiono no Instagram (Botão azul)' })}
                >
                  📱 Já impulsiono no Instagram (Botão azul)
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                  variant="outline"
                  onClick={() => handleNextStep('googlePresence', { investmentLevel: 'Já invisto no Google/Face Ads, mas o resultado é ruim' })}
                >
                  ⚠️ Já invisto no Google/Face Ads, mas o resultado é ruim
                </Button>
                <Button
                  size="lg"
                  className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                  variant="outline"
                  onClick={() => handleNextStep('googlePresence', { investmentLevel: 'Invisto pesado e quero escalar' })}
                >
                  🚀 Invisto pesado e quero escalar
                </Button>
              </div>
            </div>
           </StepWrapper>
          
           {/* STEP 2: GOOGLE PRESENCE */}
           <StepWrapper stepKey="googlePresence">
            <div className="flex flex-col items-center gap-6 text-center w-full">
                <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight">
                Pergunta 2/3: <br/>
                "Seu cliente ideal procura pelo seu serviço no Google hoje. O que ele encontra?"
                </DialogTitle>
                <div className="flex flex-col gap-3 w-full">
                <Button
                    size="lg"
                    className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                    variant="outline"
                    onClick={() => handleNextStep('goal', { googlePresence: 'O site do meu concorrente' })}
                >
                    😟 O site do meu concorrente
                </Button>
                <Button
                    size="lg"
                    className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                    variant="outline"
                    onClick={() => handleNextStep('goal', { googlePresence: 'Meu Instagram, mas sem link direto de compra' })}
                >
                    📸 Meu Instagram, mas sem link direto de compra
                </Button>
                <Button
                    size="lg"
                    className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                    variant="outline"
                    onClick={() => handleNextStep('goal', { googlePresence: 'Nada (sou invisível)' })}
                >
                    👻 Nada (sou invisível)
                </Button>
                <Button
                    size="lg"
                    className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                    variant="outline"
                    onClick={() => handleNextStep('goal', { googlePresence: 'Meu site, mas ele não converte' })}
                >
                    📉 Meu site, mas ele não converte
                </Button>
                </div>
            </div>
           </StepWrapper>

           {/* STEP 3: GOAL */}
           <StepWrapper stepKey="goal">
            <div className="flex flex-col items-center gap-6 text-center w-full">
                <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight">
                Pergunta 3/3: <br/>
                "Qual a meta principal para os próximos 30 dias?"
                </DialogTitle>
                <div className="flex flex-col gap-3 w-full">
                <Button
                    size="lg"
                    className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                    variant="outline"
                    onClick={() => handleNextStep('final', { mainGoal: 'Receber mais chamadas no WhatsApp' })}
                >
                    💬 Receber mais chamadas no WhatsApp
                </Button>
                <Button
                    size="lg"
                    className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                    variant="outline"
                    onClick={() => handleNextStep('final', { mainGoal: 'Melhorar o posicionamento da minha marca' })}
                >
                    ⭐ Melhorar o posicionamento da minha marca
                </Button>
                <Button
                    size="lg"
                    className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal"
                    variant="outline"
                    onClick={() => handleNextStep('final', { mainGoal: 'Vender produtos direto pelo site' })}
                >
                    🛒 Vender produtos direto pelo site
                </Button>
                </div>
            </div>
           </StepWrapper>

           {/* FINAL STEP: LEAD FORM */}
           <StepWrapper stepKey="final">
             <div className="flex flex-col items-center gap-4 w-full">
                <DialogHeader className="text-center space-y-2">
                <DialogTitle className="text-2xl">
                    Perfeito! Estamos gerando seu plano.
                </DialogTitle>
                <DialogDescription>
                    Para onde enviamos o orçamento?
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Seu Nome</FormLabel>
                            <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nome da sua Empresa</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Top Marketing BH" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Seu WhatsApp com DDD</FormLabel>
                        <FormControl>
                            <Input
                            placeholder="(XX) XXXXX-XXXX"
                            {...field}
                            onChange={handleWhatsAppChange}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Seu E-mail</FormLabel>
                        <FormControl>
                            <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold"
                    disabled={isLoading}
                    >
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                        </>
                    ) : (
                        'RECEBER NO WHATSAPP AGORA 🟢'
                    )}
                    </Button>
                </form>
                </Form>
            </div>
           </StepWrapper>
        </div>
      </DialogContent>
    </Dialog>
  );
}
