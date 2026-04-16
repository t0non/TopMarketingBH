import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center">
              <Image
                src="https://files.catbox.moe/1uvpw9.png"
                alt="Top Marketing BH Logo"
                width={240}
                height={240}
                className="h-auto w-48"
              />
            </Link>
            <p className="text-lg text-gray-600 text-center md:text-left font-medium">
              Aqui o Marketing é Top.
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold">Rua dos Tupis, 449 - Centro, Belo Horizonte - MG, 30190-061</p>
            <p className="text-sm text-gray-600">CNPJ: 64.510.611/0001-62</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
             © {new Date().getFullYear()} Top Marketing BH. Todos os direitos reservados.
             <br/>
             Este site não é afiliado ao Facebook, Google ou a qualquer uma de suas entidades.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/politica-de-privacidade" className="text-gray-600 hover:text-gray-900">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-gray-600 hover:text-gray-900">
              Termos de Uso
            </Link>
            <Link 
              href="https://instagram.com/topmarketingbh" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <Instagram className="h-4 w-4" />
              <span>@topmarketingbh</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
