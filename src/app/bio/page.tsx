'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function BioPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Máscara de telefone: (DD) 9XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

    if (value.length > 11) value = value.slice(0, 11);

    // Aplica a máscara
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 7) { // (DD) 9XXXX
      value = `${value.slice(0, 9)}-${value.slice(9)}`; // (DD) 9XXXX-XXXX
    } // Nota: ajustei para o hífen ficar no lugar certo para 11 dígitos (celular)
      // Se tiver 11 dígitos: (11) 91234-5678 -> índices: 0-2 (2 chars), 2-7 (5 chars), 7-11 (4 chars)
      // O código acima:
      // value (raw): 11912345678
      // slice(0,2) -> 11. Result: (11) 912345678
      // slice(0,9) (do formatado?) Não, é melhor trabalhar com o raw e reconstruir.

    // Re-implementation of mask for clarity and correctness
    let rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length > 11) rawValue = rawValue.slice(0, 11);
    
    let formattedValue = rawValue;
    if (rawValue.length > 0) {
        formattedValue = `(${rawValue.slice(0, 2)}`;
    }
    if (rawValue.length > 2) {
        formattedValue += `) ${rawValue.slice(2, 7)}`;
    }
    if (rawValue.length > 7) {
        formattedValue = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7)}`;
    }
    
    setPhone(formattedValue);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Por favor, digite seu nome.');
      return;
    }

    const rawPhone = phone.replace(/\D/g, '');
    if (rawPhone.length < 10) {
      setError('Por favor, digite um número de WhatsApp válido.');
      return;
    }

    // Simulação de envio de dados
    console.log('Dados capturados:', { name, phone: rawPhone, date: new Date().toISOString() });

    // Montar mensagem e redirecionar
    // Número do especialista (pode ser configurado via env ou constante)
    const targetNumber = '553197922538'; // Usando o número do projeto
    const message = `Olá, me chamo ${name} e vim pelo Instagram, gostaria de uma análise gratuita do meu negócio.`;
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      
      {/* Container Principal (Max 450px) */}
      <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Cabeçalho */}
        <div className="bg-white pt-8 pb-6 px-6 text-center border-b border-gray-100">
          <div className="mb-6 relative w-48 h-16 mx-auto">
             {/* Logo Placeholder - Usando a do projeto */}
             <Image 
               src="https://files.catbox.moe/1uvpw9.png" 
               alt="Logo Top Marketing BH" 
               fill
               className="object-contain"
               priority
             />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
            Receba uma Análise Gratuita do seu Negócio
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Preencha abaixo para ser atendido agora por um especialista no WhatsApp.
          </p>
        </div>

        {/* Formulário */}
        <div className="p-6 md:p-8 bg-gray-50/50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Campo Nome */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700 ml-1">
                Seu Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como você gostaria de ser chamado?"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {/* Campo WhatsApp */}
            <div className="flex flex-col gap-2">
              <label htmlFor="whatsapp" className="text-sm font-semibold text-gray-700 ml-1">
                Seu WhatsApp
              </label>
              <input
                id="whatsapp"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(DDD) 9XXXX-XXXX"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                maxLength={15}
              />
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                {error}
              </p>
            )}

            {/* Botão CTA */}
            <button
              type="submit"
              className="mt-2 w-full bg-[#25D366] hover:bg-[#128C7E] active:scale-[0.98] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
            >
              {/* Ícone WhatsApp SVG */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              FALAR COM ESPECIALISTA AGORA
            </button>
            
            <p className="text-xs text-center text-gray-500 mt-2 flex items-center justify-center gap-1">
              <Lock size={12} /> Seus dados estão 100% seguros
            </p>

          </form>
        </div>

        {/* Rodapé */}
        <div className="bg-gray-100 py-4 text-center border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            © {new Date().getFullYear()} Top Marketing BH. Todos os direitos reservados.
          </p>
          <Link href="/politica-de-privacidade" className="text-xs text-gray-400 hover:text-gray-600 underline decoration-gray-300 underline-offset-2">
            Política de Privacidade
          </Link>
        </div>

      </div>
    </div>
  );
}
