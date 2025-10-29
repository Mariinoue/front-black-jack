"use client"; 

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
    
    const resBaralho = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    const dadosBaralho = (await resBaralho.json()) as RespostaBaralho;
    const novoIdDoBaralho = dadosBaralho.deck_id;
    setIdDoBaralho(novoIdDoBaralho);

    const cartasIniciais = await puxarCartas(novoIdDoBaralho, 4);
    const novaMaoJogador = [cartasIniciais[0], cartasIniciais[2]];
    const novaMaoDealer = [cartasIniciais[1], cartasIniciais[3]];
    
    setMaoDoJogador(novaMaoJogador);
    setMaoDoDealer(novaMaoDealer);
    
    setPontosJogador(calcularPontos(novaMaoJogador));
    setPontosDealer(calcularPontos(novaMaoDealer));
    
    setStatusJogo('jogando');
    setMensagem('Sua vez. Peça uma carta ou pare.');
  };

  const pedirCarta = async () => {
    if (statusJogo !== 'jogando' || !idDoBaralho) return;

    const novasCartas = await puxarCartas(idDoBaralho, 1);
    const novaMao = [...maoDoJogador, novasCartas[0]];
    setMaoDoJogador(novaMao);

    const novosPontos = calcularPontos(novaMao);
    setPontosJogador(novosPontos);

    if (novosPontos > 21) {
      setStatusJogo('finalizado');
      setMensagem('Você estourou! O Dealer venceu.');
    }
  };

  const parar = async () => {
    if (statusJogo !== 'jogando' || !idDoBaralho) return;

    setStatusJogo('vezDoDealer');
    setMensagem('Dealer está jogando...');

    let maoDealerAtual = [...maoDoDealer];
    let pontosDealerAtual = calcularPontos(maoDealerAtual);

    while (pontosDealerAtual < 17) {
      await new Promise(res => setTimeout(res, 500)); 
      const novasCartas = await puxarCartas(idDoBaralho, 1);
      maoDealerAtual = [...maoDealerAtual, novasCartas[0]];
      pontosDealerAtual = calcularPontos(maoDealerAtual);
      setMaoDoDealer(maoDealerAtual);
      setPontosDealer(pontosDealerAtual);
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
    return <div className="loading-screen">Verificando autenticação...</div>;
  }

  return (
    <div className="jogo-box">
      <button onClick={handleLogout} className="btn-logout">
        Sair
      </button>

      <h2>Simulador de Blackjack</h2>
      <p>Rm 565834 Mariana Inoue</p>
      <hr />

      <div className="hand-container">
        <h3>Mão do Dealer (Pontos: {
          statusJogo === 'jogando' ? '?' : pontosDealer
        })</h3>
        <div className="hand">
          {maoDoDealer.map((carta, index) => (
            <div key={index} className="card">
              {statusJogo === 'jogando' && index === 0 ? 
                '(Carta Virada)' : 
                `${carta.value} DE ${carta.suit}`}
            </div>
          ))}
        </div>
      </div>

      <div className="hand-container">
        <h3>Sua Mão (Pontos: {pontosJogador})</h3>
        <div className="hand">
          {maoDoJogador.map((carta, index) => (
            <div key={index} className="card">
              {`${carta.value} de ${carta.suit}`}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="mensage">
        <h3>{mensagem}</h3>
        {statusJogo === 'jogando' ? (
          <>
            <button onClick={pedirCarta} className="btn btn-secondary">
              Pedir uma Carta
            </button>
            <button onClick={parar} className="btn btn-danger">
              Parar de Pedir Cartas
            </button>
          </>
        ) : (
          <button onClick={comecarJogo} className="btn btn-primary">
            Jogar Novamente
          </button>
        )}
      </div>
    </div>
  );
}