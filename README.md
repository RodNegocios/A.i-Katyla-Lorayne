# Katyla Lorayne — Arquitetura & Interiores

Site em React + Vite, com três componentes oficiais do [React Bits](https://reactbits.dev/): **TechText**, **ScrollStack** e **AccordionGallery**.

## Começar

```bash
npm install
npm run dev
npm run build
```

## Estrutura

- Hero central com tipografia Tech Text em duas camadas e foto do acervo
- Scroll Stack no fluxo da página, com três cards narrativos e vídeos que pausam fora da área visível
- Accordion Gallery para arquitetura, interiores e consultoria, com navegação por foco, clique e hover
- Comparação de antes/depois com controle deslizante
- Apresentação da arquiteta, WhatsApp, Instagram e endereço
- Responsividade, navegação móvel e suporte a movimento reduzido

### Atenção aos ativos

Os arquivos originais de imagens vieram como screenshots sem descrição do seu conteúdo. A composição de fotos usa uma **seleção provisória** desses arquivos, preservados sem edição, e deve ser conferida visualmente antes de publicar — principalmente `public/media/portrait.png` (foto da arquiteta). Troque o arquivo pelo retrato correto, se necessário. O site nunca presume depoimentos ou métricas não verificadas.

Os vídeos estão em `public/media/film-0*.mp4`, com reprodução sem som e somente quando visíveis. Eles usam posters do acervo e podem ser pausados manualmente.

### Publicação

Para publicar no GitHub Pages, configure `VITE_BASE_PATH=/A.i-Katyla-Lorayne/` na etapa de build. Em hospedagem de domínio na raiz, deixe como `/`. O deploy não está configurado automaticamente.

### Créditos

Os componentes React Bits em `src/components` mantêm a implementação original do projeto [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits), sujeito à licença do projeto. Confira os termos vigentes antes da distribuição.
