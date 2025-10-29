//api
// retorno API 
export type Carta = {
  code: string;
  image: string;
  value: string; // "KING" - > Rei, "QUEEN" -> dama, "ACE" -> As, "10"
  suit: string;  // "HEARTS" coracao , "SPADES" espada, copa.
};

// api
export type RespostaBaralho = {
  success: boolean;
  deck_id: string; //do baralho
};

export type RespostaPuxar = {
  success: boolean;
  cards: Carta[];
};

export type StatusJogo = 'carregando' | 'jogando' | 'vezDoDealer' | 'finalizado';