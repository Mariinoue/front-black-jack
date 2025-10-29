'use client'; 

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Carta, RespostaBaralho, RespostaPuxar, StatusJogo} from '@/src/interfaces';

export default function PaginaBlackjack() {
  const router = useRouter();

  const [idDoBaralho, setIdDoBaralho] = useState<string | null>(null);
  const [maoDoJogador, setMaoDoJogador] = useState<Carta[]>([]);
  const [maoDoDealer, setMaoDoDealer] = useState<Carta[]>([]);
  const [pontosJogador, setPontosJogador] = useState(0);
  const [pontosDealer, setPontosDealer] = useState(0);
  const [statusJogo, setStatusJogo] = useState<StatusJogo>('carregando');
  const [mensagem, setMensagem] = useState('Carregando o jogo...');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('blackjack-token'); 
    
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
      comecarJogo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]); 

  const calcularPontos = useCallback((mao: Carta[]): number => {
    let pontuacao = 0;
    let totalDeAs = 0; 
    for (const carta of mao) {
      if (['KING', 'QUEEN', 'JACK'].includes(carta.value)) {
        pontuacao += 10;
      } else if (carta.value === 'ACE') {
        totalDeAs += 1;
        pontuacao += 11;
      } else {
        pontuacao += parseInt(carta.value, 10);
      }
    }
    while (pontuacao > 21 && totalDeAs > 0) {
      pontuacao -= 10;
      totalDeAs -= 1;
    }
    return pontuacao;
  }, []);

  const puxarCartas = async (deckId: string, count: number): Promise<Carta[]> => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
    const data = (await response.json()) as RespostaPuxar;
    return data.cards;
  };

  const comecarJogo = async () => {
    setStatusJogo('carregando');
    setMensagem('Embaralhando...');
    
    try {
      const resBaralho = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
      const dadosBaralho = (await resBaralho.json()) as RespostaBaralho;
      
      if (!dadosBaralho.success) {
        throw new Error('Falha ao criar baralho');
      }
      
      const novoIdDoBaralho = dadosBaralho.deck_id;
      setIdDoBaralho(novoIdDoBaralho);

      const cartasIniciais = await puxarCartas(novoIdDoBaralho, 4);
      if (cartasIniciais.length < 4) {
        throw new Error('Falha ao puxar cartas iniciais');
      }

      const novaMaoJogador = [cartasIniciais[0], cartasIniciais[2]];
      const novaMaoDealer = [cartasIniciais[1], cartasIniciais[3]];
      
      setMaoDoJogador(novaMaoJogador);
      setMaoDoDealer(novaMaoDealer);
      
      setPontosJogador(calcularPontos(novaMaoJogador));
      setPontosDealer(calcularPontos(novaMaoDealer)); 
      
      setStatusJogo('jogando');
      setMensagem('Sua vez. Peça uma carta ou pare.');

    } catch (error) {
      setMensagem('Erro ao iniciar o jogo. Tente novamente.');
      setStatusJogo('finalizado');
    }
  };

  const pedirCarta = async () => {
    if (statusJogo !== 'jogando' || !idDoBaralho) return;

    try {
      const novasCartas = await puxarCartas(idDoBaralho, 1);
      if (novasCartas.length === 0) throw new Error('Acabaram as cartas');

      const novaMao = [...maoDoJogador, novasCartas[0]];
      setMaoDoJogador(novaMao);

      const novosPontos = calcularPontos(novaMao);
      setPontosJogador(novosPontos);

      if (novosPontos > 21) {
        setStatusJogo('finalizado');
        setMensagem('Você estourou! O Dealer venceu.');
      }
    } catch (error) {
      setMensagem('Erro ao pedir carta.');
    }
  };

  const parar = async () => {
    if (statusJogo !== 'jogando' || !idDoBaralho) return;

    setStatusJogo('vezDoDealer');
    setMensagem('Dealer está jogando...');

    let maoDealerAtual = [...maoDoDealer];
    let pontosDealerAtual = calcularPontos(maoDealerAtual);

    while (pontosDealerAtual < 17) {
      await new Promise(res => setTimeout(res, 600));
      
      try {
        const novasCartas = await puxarCartas(idDoBaralho, 1);
        if (novasCartas.length === 0) break;

        maoDealerAtual = [...maoDealerAtual, novasCartas[0]];
        pontosDealerAtual = calcularPontos(maoDealerAtual);
        setMaoDoDealer(maoDealerAtual);
        setPontosDealer(pontosDealerAtual);
      } catch (error) {
        setMensagem('Erro na vez do Dealer.');
        break;
      }
    }

    setStatusJogo('finalizado');
    const pontosFinaisJogador = calcularPontos(maoDoJogador);
    
    if (pontosDealerAtual > 21) {
      setMensagem('Dealer estourou! Você venceu!');
    } else if (pontosFinaisJogador > pontosDealerAtual) {
      setMensagem('Você venceu!');
    } else if (pontosDealerAtual > pontosFinaisJogador) {
      setMensagem('Dealer venceu!');
    } else {
      setMensagem('Empate!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('blackjack-token');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-1 items-center justify-center text-white text-xl">
        Verificando autenticação...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-slate-900 rounded-lg p-6 sm:p-8 w-full max-w-3xl text-white">

      <div className="text-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Simulador de Blackjack
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Tente chegar o mais próximo de 21 sem ultrapassar!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full my-6">
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-center">Mão do Jogador</h3>
          <div className="border border-gray-500 rounded-lg p-4 min-h-[220px] w-full bg-slate-800 flex flex-col justify-between">
            <div className="flex flex-wrap gap-2 justify-center min-h-[128px]">
              {maoDoJogador.map((carta) => (
                <img 
                  key={carta.code} 
                  src={carta.image} 
                  alt={`${carta.value} de ${carta.suit}`} 
                  className="w-24"
                />
              ))}
            </div>
            <p className="text-center text-lg font-bold mt-2">
              Pontuação: {pontosJogador}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-center">Mão do Dealer</h3>
          <div className="border border-gray-500 rounded-lg p-4 min-h-[220px] w-full bg-slate-800 flex flex-col justify-between">
            <div className="flex flex-wrap gap-2 justify-center min-h-[128px]">
              {maoDoDealer.map((carta, index) => (
                (statusJogo === 'jogando' && index === 1) ? 
                  <div key={index} className="w-24 h-[139px] bg-blue-900 border-2 border-white rounded-md flex items-center justify-center text-center text-sm p-2">
                    (Carta Virada)
                  </div>
                :
                  <img 
                    key={carta.code} 
                    src={carta.image} 
                    alt="carta do dealer" 
                    className="w-24" 
                  />
              ))}
            </div>
            <p className="text-center text-lg font-bold mt-2">
              Pontuação: {
                statusJogo === 'jogando' ? '?' : pontosDealer
              }
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <h3 className="text-lg font-medium mb-4 min-h-[28px]">
          {mensagem}
        </h3>
        
        <div className="flex justify-center gap-4 flex-wrap">
          {statusJogo === 'jogando' ? (
            <>
              <button 
                onClick={pedirCarta} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Pedir uma Carta
              </button>
              <button 
                onClick={parar} 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
              >
                Parar de Pedir Carta
              </button>
            </>
          ) : (
            <button 
              onClick={comecarJogo} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              Jogar Novamente
            </button>
          )}
        </div>

        <button 
          onClick={handleLogout} 
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded w-full max-w-xs mx-auto mt-4"
        >
          Sair
        </button>
      </div>
    </div>
    </div>
  );
}