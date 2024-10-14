import { GoBack } from '@/components';
import React from 'react';

const Ajuda = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="bg-gray-800 flex items-center space-x-2">
            <GoBack/>
        </header>
        <h1 className="text-3xl font-bold mb-6 text-center font-[Poppins]">Página de Ajuda</h1>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-cinza">
              <h2 className="text-lg font-semibold mb-2 font-[Poppins]">{item.question}</h2>
              <p className="text-gray-300 font-[Poppins]">{item.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            className="bg-light-blue text-white py-3 px-6 rounded-lg text-lg font-medium font-[Poppins]"
          >
            Ainda tem mais alguma dúvida? Contate nosso Suporte, clicando aqui!
          </a>
        </div>
      </main>
      <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-12 font-[Poppins]">
        <p>Política de privacidade | Termos de uso</p>
        <p>&copy; 2023 Bluq. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

const faqData = [
  {
    question: 'Sou obrigado a pagar/cobrar pelas minhas caronas?',
    answer: 'Não há obrigação de pagar ou cobrar pelas caronas no aplicativo...'
  },
  {
    question: 'Me tiraram de uma carona sem explicação, posso fazer algo?',
    answer: 'Embora ninguém seja obrigado a oferecer ou aceitar caronas...'
  },
  {
    question: 'O motorista foi grosseiro comigo, me tratou mal, ou dirigiu de maneira imprudente, o que posso fazer?',
    answer: 'Se você se sentiu maltratado(a) ou percebeu uma conduta imprudente...'
  },
  {
    question: 'O que devo fazer se o motorista ou passageiro não aparecer?',
    answer: 'Caso o motorista ou passageiro não compareça no horário...'
  },
  {
    question: 'O que faço se me atrasar ou precisar cancelar uma carona?',
    answer: 'Em caso de atraso ou necessidade de cancelamento...'
  },
  {
    question: 'Posso escolher com quem vou compartilhar a carona?',
    answer: 'Sim, o motorista tem total autonomia para escolher com quem...'
  },
  {
    question: 'Qual o procedimento se houver um acidente durante a carona?',
    answer: 'Em caso de acidente, os procedimentos são os mesmos...'
  },
  {
    question: 'Como a segurança dos usuários é garantida?',
    answer: 'Embora não possamos garantir completamente a segurança...'
  }
];

export default Ajuda;
