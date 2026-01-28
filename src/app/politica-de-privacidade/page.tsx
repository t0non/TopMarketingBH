import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="prose max-w-3xl mx-auto">
            <h1>Política de Privacidade</h1>
            <p>
              A sua privacidade é importante para nós. É política da Top
              Marketing BH respeitar a sua privacidade em relação a qualquer
              informação sua que possamos coletar no site Top Marketing BH, e
              outros sites que possuímos e operamos.
            </p>
            <p>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios
              justos e legais, com o seu conhecimento e consentimento. Também
              informamos por que estamos coletando e como será usado.
            </p>
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis ​​para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </p>
            <p>
              Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
            <p>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas políticas de privacidade.
            </p>
            <p>
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </p>
            <p>
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contato conosco.
            </p>
            <h2>Coleta de Dados pelo Formulário</h2>
            <p>
              Ao preencher o formulário de contato em nosso site, coletamos as
              seguintes informações: nome, e-mail, telefone e a mensagem que você
              nos envia. Estes dados são utilizados exclusivamente para que nossa
              equipe comercial possa entrar em contato com você para fornecer as
              informações solicitadas e oferecer nossos serviços.
            </p>
            <h2>Compromisso do Usuário</h2>
            <p>
              O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação que a Top Marketing BH oferece no site e com caráter
              enunciativo, mas não limitativo:
            </p>
            <ul>
              <li>
                A) Não se envolver em atividades que sejam ilegais ou contrárias
                à boa fé e à ordem pública;
              </li>
              <li>
                B) Não difundir propaganda ou conteúdo de natureza racista,
                xenofóbica, ou sobre azar, qualquer tipo de pornografia ilegal,
                de apologia ao terrorismo ou contra os direitos humanos;
              </li>
              <li>
                C) Não causar danos aos sistemas físicos (hardwares) e lógicos
                (softwares) da Top Marketing BH, de seus fornecedores ou
                terceiros, para introduzir ou disseminar vírus informáticos ou
                quaisquer outros sistemas de hardware ou software que sejam
                capazes de causar os danos anteriormente mencionados.
              </li>
            </ul>
            <p>Esta política é efetiva a partir de Julho/2024.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
