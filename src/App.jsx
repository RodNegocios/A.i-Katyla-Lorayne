import React, { useEffect, useRef, useState } from 'react';
import TechText from './components/TechText/TechText.jsx';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack/ScrollStack.jsx';
import AccordionGallery from './components/AccordionGallery/AccordionGallery.jsx';
import './styles.css';

const media = (name) => import.meta.env.BASE_URL + 'media/' + name;
const heroPhoto = media('hero-kitchen.webp');
const studioPhoto = media('portrait.png');
const whatsapp = 'https://wa.me/5565996922813?text=' + encodeURIComponent('Olá, Katyla! Gostaria de conversar sobre um projeto.');
const instagram = 'https://www.instagram.com/katylaarquiteta/';

const chapters = [
  {
    number: '01',
    title: 'Arquitetura que acolhe',
    subtitle: 'Espaços pensados para viver, sentir e pertencer.',
    video: media('film-01.mp4'),
    poster: media('ambiente-01.png')
  },
  {
    number: '02',
    title: 'Interiores com identidade',
    subtitle: 'Beleza, função e personalidade em cada escolha.',
    video: media('film-02.mp4'),
    poster: media('ambiente-02.png')
  },
  {
    number: '03',
    title: 'Cada detalhe importa',
    subtitle: 'Um projeto único começa pela sua história.',
    video: media('film-03.mp4'),
    poster: media('ambiente-03.png')
  }
];

const services = [
  { image: media('ambiente-01.png'), label: 'Projetos arquitetônicos', alt: 'Referência visual do acervo de arquitetura', position: 'center center' },
  { image: media('ambiente-02.png'), label: 'Design de interiores', alt: 'Referência visual do acervo de interiores', position: 'center center' },
  { image: media('ambiente-03.png'), label: 'Consultorias', alt: 'Referência visual do acervo de projetos', position: 'center center' }
];

function ArrowIcon({ diagonal = false }) {
  return diagonal
    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg>;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useNameSize() {
  const [size, setSize] = useState(120);
  useEffect(() => {
    const measure = () => setSize(Math.min(188, Math.max(42, window.innerWidth * (window.innerWidth < 600 ? 0.135 : 0.125))));
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);
  return size;
}

function AmbientVideo({ src, poster, enabled, reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (!enabled || reduced) {
      video.pause();
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries[0]?.intersectionRatio >= 0.27;
      if (visible) video.play().catch(() => {});
      else video.pause();
    }, { threshold: [0, 0.27, 0.6] });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [enabled, reduced]);
  return <video ref={ref} className="chapter-video" src={src} poster={poster} muted playsInline loop preload="none" aria-hidden="true" />;
}

function BeforeAfter() {
  const [value, setValue] = useState(54);
  return (
    <div className="comparison" style={{ '--split': value + '%' }}>
      <div className="comparison__media">
        <img src={media('before.png')} alt="Ambiente antes da transformação" loading="lazy" />
        <img className="comparison__after" src={media('after.png')} alt="Ambiente após a transformação" loading="lazy" />
        <span className="comparison__line" aria-hidden="true"><span className="comparison__handle"><svg viewBox="0 0 36 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m11 5-7 7 7 7m14-14 7 7-7 7"/></svg></span></span>
        <span className="comparison__tag comparison__tag--before">Antes</span>
        <span className="comparison__tag comparison__tag--after">Depois</span>
      </div>
      <label className="visually-hidden" htmlFor="before-after-range">Arraste para comparar o antes e depois</label>
      <input id="before-after-range" className="comparison__range" type="range" min="0" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} aria-valuetext={value + '% de imagem após a transformação'} />
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Katyla Lorayne, ir para o início">
        <span className="brand__mark">K<span className="brand__divider">/</span>L</span>
        <span className="brand__name">KATYLA LORAYNE<small>ARQUITETURA & INTERIORES</small></span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
      <nav id="site-menu" className={'site-nav' + (menuOpen ? ' site-nav--open' : '')} aria-label="Navegação principal">
        <a href="#essencia" onClick={() => setMenuOpen(false)}>Essência</a>
        <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
        <a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a>
        <a className="site-nav__contact" href="#contato" onClick={() => setMenuOpen(false)}>Vamos conversar <ArrowIcon diagonal /></a>
      </nav>
    </header>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const nameSize = useNameSize();
  const [motionEnabled, setMotionEnabled] = useState(true);

  return (
    <>
      <Header />
      <main>
        <section className="hero section" id="inicio" aria-labelledby="hero-title">
          <div className="hero__intro"><span className="eyebrow">ARQUITETURA & INTERIORES</span><span className="hero__index">PORTFÓLIO · 2026</span></div>
          <h1 id="hero-title" className="visually-hidden">Katyla Lorayne, arquiteta</h1>
          <div className="hero__stage">
            <div className="hero__halo" aria-hidden="true" />
            <div className="hero__name hero__name--back" aria-hidden="true">
              <TechText text="KATYLA" fontFamily="Georgia, serif" fontWeight={500} fontSize={nameSize} letterSpacing={-0.065} color="#fff9ed" accentColor="#e4d3b8" labels={false} draggable={false} guides={false} specks={5} sweep={!reduced} intro={reduced ? 'none' : 'fade'} introDuration={1.6} />
            </div>
            <div className="hero__portrait">
              <img src={heroPhoto} alt="Ambiente integrado com cozinha verde e mesa de madeira, projeto de interiores" fetchPriority="high" />
              <span className="hero__portrait-fade" aria-hidden="true" />
            </div>
            <div className="hero__name hero__name--front" aria-hidden="true">
              <TechText text="LORAYNE" fontFamily="Georgia, serif" fontWeight={500} fontSize={nameSize * 0.92} letterSpacing={-0.065} color="#fff7e9" accentColor="#e5c9a1" labels={false} draggable={false} guides={false} specks={5} sweep={!reduced} intro={reduced ? 'none' : 'fade'} introDuration={1.9} />
            </div>
          </div>
          <div className="hero__outro">
            <div><p className="hero__statement">Mais que arquitetura,<br/><em>sua essência e sentimento.</em></p><span className="hero__location">Pontes e Lacerda · Mato Grosso · Brasil</span></div>
            <a className="circle-link" href="#essencia" aria-label="Descubra mais sobre o trabalho de Katyla Lorayne"><ArrowIcon /></a>
          </div>
          <span className="hero__vertical" aria-hidden="true">DESLIZE PARA DESCOBRIR</span>
        </section>

        <section className="story section" id="essencia" aria-labelledby="story-title">
          <div className="section-heading">
            <span className="eyebrow">01 — NOSSA ESSÊNCIA</span>
            <h2 id="story-title">Projetar é dar forma<br/><em>ao que importa.</em></h2>
            <p>Uma arquitetura sensível, funcional e criada para refletir quem você é.</p>
          </div>
          <div className="story__stack">
            <ScrollStack useWindowScroll itemDistance={112} itemStackDistance={22} stackPosition="12%" itemScale={0.045} baseScale={0.85} dimAmount={0.12} holdDistance={180} smoothScroll={false} snap={false}>
              {chapters.map((chapter) => (
                <ScrollStackItem key={chapter.number} itemClassName="chapter-card">
                  <div className="chapter-card__media"><img className="chapter-card__backdrop" src={chapter.poster} alt="" loading="lazy" /><div className="chapter-card__gradient" /><div className="chapter-card__video-frame"><AmbientVideo src={chapter.video} poster={chapter.poster} enabled={motionEnabled} reduced={reduced} /></div></div>
                  <div className="chapter-card__top"><span>CAPÍTULO {chapter.number}</span><span>KATYLA LORAYNE</span></div>
                  <div className="chapter-card__content"><p>{chapter.subtitle}</p><h3>{chapter.title}</h3></div>
                  <span className="chapter-card__number" aria-hidden="true">{chapter.number}</span>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
          <button type="button" className="motion-toggle" onClick={() => setMotionEnabled(!motionEnabled)} aria-pressed={!motionEnabled}>{motionEnabled ? 'Pausar vídeos' : 'Reativar vídeos'}</button>
        </section>

        <section className="services section" id="servicos" aria-labelledby="services-title">
          <div className="section-heading section-heading--split"><div><span className="eyebrow">02 — O QUE FAZEMOS</span><h2 id="services-title">O seu espaço,<br/><em>a sua história.</em></h2></div><p>Da primeira ideia ao ambiente que acolhe, cada escolha tem intenção.</p></div>
          <div className="services__gallery"><AccordionGallery items={services} defaultIndex={1} height={510} gap={12} radius={22} expandRatio={0.54} grayscale={false} tilt={0} parallax={0.3} trigger="hover" accentColor="#e4d3bd" overlayColor="#181715" textColor="#ffffff" /></div>
          <div className="service-list"><div><span>01</span><h3>Arquitetura</h3><p>Projetos arquitetônicos personalizados.</p></div><div><span>02</span><h3>Interiores</h3><p>Ambientes com estética e funcionalidade.</p></div><div><span>03</span><h3>Consultoria</h3><p>Orientação para arquitetura e interiores.</p></div></div>
        </section>

        <section className="portfolio section" id="projetos" aria-labelledby="portfolio-title">
          <div className="section-heading section-heading--split"><div><span className="eyebrow">03 — TRANSFORMAÇÕES</span><h2 id="portfolio-title">Veja o espaço<br/><em>sob outra perspectiva.</em></h2></div><p>Explore um registro de antes e depois do nosso acervo. Deslize a linha para comparar.</p></div>
          <BeforeAfter />
          <div className="portfolio__foot"><span>ANTES / DEPOIS — ARRASTE PARA COMPARAR</span><a href={instagram} target="_blank" rel="noreferrer">Mais projetos no Instagram <ArrowIcon diagonal /></a></div>
          <div className="portfolio__strip"><img src={media('detail-01.png')} alt="Referência visual de projeto do acervo" loading="lazy" /><img src={media('detail-02.png')} alt="Outro registro visual do acervo" loading="lazy" /></div>
        </section>

        <section className="about section" aria-labelledby="about-title">
          <div className="about__quote"><span className="eyebrow">04 — CONHEÇA A ARQUITETA</span><h2 id="about-title">Prazer,<br/>sou <em>Katyla.</em></h2><p>Sou arquiteta formada pela Universidade do Estado de Mato Grosso (Unemat). Acredito em projetos que valorizam a essência, os sentimentos e as necessidades de cada pessoa.</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">Acompanhe meu dia a dia <ArrowIcon diagonal /></a></div>
          <div className="about__image"><img src={studioPhoto} alt="Imagem do acervo de projetos de Katyla Lorayne" loading="lazy" /><div className="about__stamp">ARQUITETURA<br/>COM ESSÊNCIA</div></div>
        </section>

        <section className="contact section" id="contato" aria-labelledby="contact-title">
          <span className="eyebrow">05 — VAMOS CONVERSAR?</span>
          <h2 id="contact-title">Seu próximo espaço<br/><em>começa aqui.</em></h2>
          <p>Projetos e consultorias para todo o Brasil.</p>
          <a className="contact__cta" href={whatsapp} target="_blank" rel="noreferrer">Solicitar orçamento <ArrowIcon diagonal /></a>
          <div className="contact__details"><div><span>WHATSAPP</span><a href={whatsapp} target="_blank" rel="noreferrer">(65) 99692-2813</a></div><div><span>INSTAGRAM</span><a href={instagram} target="_blank" rel="noreferrer">@katylaarquiteta</a></div><div><span>ENDEREÇO</span><address>Avenida Mun., nº 1369, Centro<br/>Pontes e Lacerda — MT</address></div></div>
        </section>
      </main>
      <footer className="footer"><span className="footer__brand">KATYLA LORAYNE <small>ARQUITETURA & INTERIORES</small></span><span>Mais que arquitetura, sua essência e sentimento.</span><a href="#inicio">Voltar ao início ↑</a></footer>
    </>
  );
}
