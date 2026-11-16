# Katyla Lorayne — Arquitetura & Interiores

Site da arquiteta Katyla Lorayne, desenvolvido em React 19 e Vite 7. Inclui TechText na hero, ScrollStack após a hero, AccordionGallery nos serviços, portfólio com antes/depois, contatos e layout responsivo.

## Por que aparecia uma tela branca na Hostinger?

A branch `main` não possuía o site, apenas arquivos de mídia. O projeto React/Vite estava somente na branch `feat/katyla-scroll-stack-tech-text-accordion`. Além disso, o HTML de desenvolvimento carrega `/src/main.jsx`, que um servidor HTML comum **não consegue executar diretamente**: os componentes JSX e dependências precisam ser compilados.

**Agora o site de produção fica na raiz da `main`**: `index.html`, `assets/` e `media/`. O fluxo `.github/workflows/build-static.yml` compila o projeto, valida a saída e publica esses arquivos na própria branch. Assim, a integração Git HTML da Hostinger pode servir o conteúdo sem Node.js.

## Desenvolvimento

Requer Node.js 20.19+ ou 22+:

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `index.dev.html`: HTML fonte para o Vite.
- `src/`: código React e componentes.
- `public/media/`: imagens e vídeos.
- `dist/`: saída de `npm run build`, pronta para publicação.
- `index.html`, `assets/`, `media/`: arquivos de produção gerados e versionados automaticamente para a Hostinger.

**Não edite `index.html` nem `assets/` manualmente**; serão recriados no próximo build. Edite `index.dev.html` e `src/`.

## Publicar na Hostinger

### Hospedagem HTML com integração Git

1. Em **Sites → Gerenciar → Avançado → Git**, conecte `RodNegocios/A.i-Katyla-Lorayne`.
2. Selecione **branch `main`** e diretório de destino **`public_html`**.
3. Ative o deploy automático ou faça **Redeploy** depois de concluído o workflow **Build and publish Hostinger-ready website** no GitHub.
4. Confira se a raiz `public_html` contém `index.html`, `assets/` e `media/`. Faça atualização forçada do navegador em caso de cache antigo.

A Hostinger deve publicar os **arquivos compilados da raiz**, não o HTML de desenvolvimento nem a pasta `src/` sozinha.

### Hospedagem de aplicações Node.js / Vite

Também é possível conectar a `main` como aplicação Vite, com build `npm run build` e diretório de saída `dist`. Nesse caso a Hostinger faz a compilação própria.

## Conteúdo e créditos

Dados e contatos baseados no arquivo `Informações` do repositório. A escolha de screenshots como imagens do site é provisória, especialmente o arquivo `public/media/portrait.png`: confira se é realmente a foto da arquiteta antes da publicação.

Os componentes React Bits em `src/components` foram mantidos do projeto anterior e estão sujeitos aos termos de licença de seu projeto de origem.



## Galeria e enquadramento (novembro de 2026)

- Na seção **Seu espaço, sua história**, o card **Design de interiores** agora mostra o projeto de cozinha que estava na seção da arquiteta (`public/media/portrait.png`).
- Na seção **Prazer, sou Katyla**, o retrato de blusa branca vem do acervo já existente (`public/media/ambiente-02.png`). Dessa forma, a imagem original de alta resolução é reutilizada, sem duplicar arquivos nem manter as setas da captura de tela enviada.
- Fotografias de pessoas na galeria usam `object-fit: contain`, com uma cópia desfocada atrás para preencher a moldura; imagens de projetos permanecem em `cover`. A foto da arquiteta também usa `contain`, evitando cortes de rosto.
- Verifique alterações com `npm run test:layout` e `npm run build`; o GitHub Actions deve executar ambos antes de publicar.


## Hero em alta definição (1881 × 836)

O arquivo original enviado da cozinha verde é convertido para AVIF na resolução de 1881 × 836 pixels, preservando o enquadramento e reduzindo o download. A hero usa `/media/hero-kitchen-hd.avif`, e não a miniatura anterior `hero-kitchen.webp` (240px).

Para manter o binário reproduzível no GitHub, o original otimizado fica codificado em 5 partes na pasta `.github/hero-image-parts`. O script `node scripts/restore-hero.mjs` monta o AVIF com validação SHA-256 **antes dos testes e do build no GitHub Actions**. A imagem final também é versionada em `public/media` e `media`; qualquer novo build poderá regenerá-la.

