# Code Challenge Front

Este projeto é uma implementação do desafio proposto pela [Iza Seguros](https://github.com/iza-seguros/code-challenge-front), recriado e aprimorado para fins de aprendizado e demonstração técnica.

---

## Sobre o Projeto

Trata-se de uma aplicação front-end desenvolvida com Next.js e uma stack moderna focada em produtividade, qualidade e escalabilidade. O objetivo principal é entregar uma interface responsiva, robusta e com boa experiência de usuário, respeitando as especificações do desafio original.

---

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
- **Zustand** — Gerenciamento de estado simples e eficiente
- **Vitest** — Testes unitários e integração
- **Commitizen + Husky + Commitlint** — Padronização de commits e automações git

---

## Scripts disponíveis

No terminal, execute os comandos abaixo para trabalhar com o projeto:

- `npm run dev` — Inicia o servidor de desenvolvimento Next.js
- `npm run build` — Compila a aplicação para produção
- `npm run start` — Executa a aplicação compilada em modo produção
- `npm run lint` — Executa o ESLint para verificar problemas no código
- `npm run test` — Roda os testes com Vitest
- `npm run commitlint` — Valida mensagens de commit seguindo o padrão convencional
- `npm run commit` — Gatilho para preparar commit com Commitizen (interface amigável)

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

## Estrutura do projeto

/components — Componentes React reutilizáveis

/pages — Páginas da aplicação (Next.js routing)

/styles — Arquivos CSS e configurações Tailwind

/tests — Testes unitários e de integração

/utils — Funções utilitárias, validações e constantes

## Considerações finais

Este projeto serve como um exemplo prático de como entregar soluções front-end modernas, testáveis e escaláveis em desafios técnicos reais. O uso de ferramentas como Vitest, Zod, ShadcnUI e Radix UI demonstra atenção a qualidade, experiência do usuário e boas práticas.

## Referências

Repositório original do desafio: iza-seguros/code-challenge-front

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](hhttps://github.com/srsouzaj/code-challenge-front/edit/main/LICENSE) para mais detalhes.

Feito por Jorge de Souza

---
