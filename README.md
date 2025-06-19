# Code Challenge Front

Este projeto é uma implementação do desafio proposto pela [Iza Seguros](https://github.com/iza-seguros/code-challenge-front), recriado e aprimorado para fins de aprendizado e demonstração técnica.

## Sobre o Projeto

Trata-se de uma aplicação front-end desenvolvida com Next.js e uma stack moderna focada em produtividade, qualidade e escalabilidade. O objetivo principal é entregar uma interface responsiva, robusta e com boa experiência de usuário, respeitando as especificações do desafio original.

## Tecnologias e Ferramentas

- **Next.js 15.3.3** — Framework React para SSR e geração estática
- **React 19** — Biblioteca principal para construção da UI
- **TypeScript 5** — Tipagem estática para segurança e melhor manutenção
- **TailwindCSS 4** + **tw-animate-css** — Estilização utilitária e animações
- **ShadcnUI** — Componentes UI modernos e acessíveis, baseados em Radix UI
- **Zod** — Validação e schema de dados
- **React Hook Form** + **@hookform/resolvers** — Manipulação e validação de formulários
- **Radix UI** — Componentes acessíveis e headless (alert-dialog, avatar, checkbox, etc)
- **TanStack Query 5** — Gerenciamento de estado assíncrono e cache de dados
- **Axios** — Cliente HTTP para comunicação com APIs
- **Zustand** — Gerenciamento de estado global simples e eficiente
- **Vitest** — Testes unitários e integração
- **Commitizen + Husky + Commitlint** — Padronização de commits e automações git

---

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/srsouzaj/code-challenge-front.git

# 2. Acesse o diretório do projeto
cd alamo

# 3. Instale as dependências
npm install

# 4. Inicie o ambiente de desenvolvimento
npm run dev
```

## 🧪 Teste de Responsividade

Recomenda-se o uso da ferramenta [Responsively App](http://responsively.app/download) para verificar o comportamento do layout em múltiplas resoluções de tela. Essa etapa é fundamental para garantir uma experiência consistente em diferentes dispositivos.

## Considerações finais

Durante o desenvolvimento, identifiquei alguns pontos de atenção na API que podem impactar o uso, bloqueando requisições no ambiente local. Todavia, para contornar esta situação, esse desenvolvedor criou, do total zero e durante o prazo, uma api nos mesmos moldes da primeira, para continuação do desenvolvimento.

## Referências

Repositório original do desafio: iza-seguros/code-challenge-front

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](hhttps://github.com/srsouzaj/code-challenge-front/edit/main/LICENSE) para mais detalhes.

Feito por Jorge de Souza
