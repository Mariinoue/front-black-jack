This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Exercício Black Jack - Entrega 29/10 até as 19h
Objetivo Geral
 
Desenvolver uma aplicação web funcional de um simulador de Blackjack (21) utilizando Next.js e TypeScript. O projeto deve cobrir a integração de rotas de API, manipulação de estado complexo, tipagem estrita e consumo de uma API externa (Deck of Cards API).
 
Pré-requisitos
 
Conhecimento básico de JavaScript (ES6+), React e TypeScript.
Familiaridade com o ecossistema Next.js.
Conhecimento básico sobre APIs REST e localStorage.
 
Estrutura de Requisitos Técnicos e Módulos
 
O projeto será dividido em módulos funcionais que correspondem diretamente aos requisitos técnicos obrigatórios.
 
Módulo 1: Configuração Inicial e Autenticação (Next Handlers, TypeScript, Sessão, API_SECRET)
 
Foco: Estrutura do projeto, rotas de API com Next.js e segurança básica.
Requisitos e Tarefas:
Estrutura do Projeto: Inicializar um projeto Next.js com TypeScript habilitado.
Autenticação Simulada: Implementar uma rota de login usando app/api/login/route.ts (Next Handlers).
API_SECRET: Definir uma variável de ambiente (ex: API_SECRET) no arquivo .env para simular a validação da senha.
Validação da Sessão: A rota de login deve simular a validação (ex: se a senha enviada for igual ao API_SECRET). Em caso de sucesso, deve retornar um token simulado (ex: access_token).
Tipagem (TypeScript): Criar interfaces ou types para o corpo da requisição de login e para a resposta da API de login.
Gerenciamento de Sessão: Ao receber o token simulado, armazená-lo no localStorage do navegador.
Tela de Login: Criar o componente de tela de login (página /login) com formulário (usuário/senha) que interage com a rota de API criada.
 
Módulo 2: Roteamento e Proteção de Rota (Router, Props)
 
Foco: Navegação entre páginas e controle de acesso.
Requisitos e Tarefas:
Roteamento: Implementar rotas: /login (página inicial se deslogado) e /blackjack (página principal do jogo).
Proteção de Rota: Criar uma lógica (ex: em um Provider ou no Layout principal) que redireciona automaticamente o usuário da rota /blackjack para /login se o token não estiver presente ou for inválido no localStorage.
Componentes Tipados: Criar um componente de Layout ou Header que recebe, via props tipadas, o nome do usuário logado (se aplicável) ou um indicador de status de login.
 
Módulo 3: Integração com API Externa e Lógica do Jogo (API, useState)
 
Foco: Consumo de API externa e gestão do estado do jogo.
Requisitos e Tarefas:
Tipagem de API: Criar types específicos para as respostas da Deck of Cards API (estrutura do baralho, estrutura da carta).
Criação do Baralho: Implementar uma função ou handler que consome a rota: GET https://deckofcardsapi.com/api/deck/new/shuffle para criar e obter um novo deck_id.
Fluxo de Jogo (useState): Utilizar o hook useState para gerenciar: o deck_id, as cartas do jogador, as cartas do dealer, e o status atual do jogo (ex: "Jogando", "Blackjack", "Perdeu", "Esperando Nova Rodada").
Puxar Cartas: Implementar a lógica para puxar cartas do baralho usando: GET https://deckofcardsapi.com/api/deck/{deck_id}/draw/?count={count}.
Lógica do Blackjack: Implementar as regras básicas do jogo (dar a primeira mão, "Hit" (pedir carta), "Stand" (parar), calcular pontuações, implementar a lógica do Ás como 1 ou 11).
 
Entrega Esperada
 
Um repositório Git contendo:
Uma aplicação Next.js totalmente funcional que atende a todos os requisitos.
Aplicações estritas de TypeScript em todas as interações de dados (API, props, estado).
Um fluxo de usuário completo: Acesso ao /login $\rightarrow$ Login com sucesso $\rightarrow$ Redirecionamento para /blackjack $\rightarrow$ Jogo funcional com consumo da API externa.

 