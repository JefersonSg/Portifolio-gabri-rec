'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import styles from './Portifolio.module.css';
import {
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Film,
  Gift,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Sparkles,
  Store,
  X
} from 'lucide-react';
import PlayerVideo from './PlayerVideo';

type PortfolioItem = {
  title: string;
  image: string;
  text: string;
};

type FeaturedItem = {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  video: string;
  description: string;
};

type PortfolioSection = {
  label: string;
  icon: LucideIcon;
  accent: string;
  featured: FeaturedItem;
  items: PortfolioItem[];
};

type CategoryKey =
  | 'casamento'
  | 'preWedding'
  | 'aniversario'
  | 'comercial'
  | 'institucional'
  | 'reels';

const portfolioData: Record<CategoryKey, PortfolioSection> = {
  casamento: {
    label: 'Casamentos',
    icon: Heart,
    accent: 'emeraldRedEmerald',
    featured: {
      title: 'Bia Alvim & Danilo',
      subtitle:
        'Um casamento cinematográfico, elegante e cheio de emoção — pensado para eternizar cada detalhe com sofisticação.',
      image: '/fotos/Bia Alvim & Danilo/Capa.jpg',
      video: '/videos/video.mp4',
      description: 'Cobertura completa do casamento, desde os preparativos até a festa, com uma narrativa visual envolvente e estética premium.',
      tag: 'Casamento destaque'
    },
    items: [
      {
        title: 'Juliana & Carlos Victor',
        image:
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80',
        text: 'Cerimônia ao pôr do sol com cobertura completa de foto e vídeo.'
      },
      {
        title: 'Camila & Pedro',
        image:
          'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80',
        text: 'Making of, votos e festa com uma linguagem moderna, elegante e sensível.'
      },
      {
        title: 'Fernanda & Lucas',
        image:
          'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1400&q=80',
        text: 'Cobertura intimista com edição premium e estética cinematográfica.'
      }
    ]
  },
  preWedding: {
    label: 'Pré Wedding',
    icon: Camera,
    accent: 'redEmeraldRed',
    featured: {
      title: 'Ana & Diego',
      subtitle:
        'Ensaios com direção leve, estética sofisticada e conexão real para contar a história do casal com personalidade.',
        description: 'Ensaio em campo aberto com direção natural e clima romântico, valorizando a conexão do casal e a beleza do cenário.',
        video: '/videos/video.mp4',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80',
      tag: 'Ensaio destaque'
    },
    items: [
      {
        title: 'Ana & Diego',
        image:
          'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80',
        text: 'Ensaio em campo aberto com direção natural e clima romântico.'
      },
      {
        title: 'Bia & Matheus',
        image:
          'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80',
        text: 'Luz dourada, enquadramentos criativos e narrativa visual envolvente.'
      },
      {
        title: 'Lívia & Breno',
        image:
          'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80',
        text: 'Minimalista, elegante e emocional do início ao fim.'
      }
    ]
  },
  aniversario: {
    label: 'Aniversários',
    icon: Gift,
    accent: 'emeraldRedRed',
    featured: {
      title: '15 Anos da Raica',
      subtitle:
        'Cobertura vibrante e moderna, feita para emocionar, valorizar a festa e gerar lembranças inesquecíveis.',
      image:
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1800&q=80',
                description: 'Ensaio em campo aberto com direção natural e clima romântico, valorizando a conexão do casal e a beleza do cenário.',
        video: '/videos/video.mp4',
      tag: 'Evento destaque'
    },
    items: [
      {
        title: '15 Anos da Raica',
        image:
          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=80',
        text: 'Entrada, pista, família e os momentos mais marcantes em alto impacto.'
      },
      {
        title: 'Aniversário Infantil',
        image:
          'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=80',
        text: 'Cobertura leve, colorida e cheia de espontaneidade.'
      },
      {
        title: 'Festa Premium',
        image:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
        text: 'Vídeo dinâmico com cortes modernos e estética de impacto.'
      }
    ]
  },
  comercial: {
    label: 'Lojas & Comércios',
    icon: Store,
    accent: 'redRedEmerald',
    featured: {
      title: 'Campanhas Comerciais',
      subtitle:
        'Conteúdo que valoriza marca, produto e posicionamento, com estética forte e acabamento profissional.',
                description: 'Ensaio em campo aberto com direção natural e clima romântico, valorizando a conexão do casal e a beleza do cenário.',
        video: '/videos/video.mp4',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80',
      tag: 'Campanha destaque'
    },
    items: [
      {
        title: 'Moda & Lifestyle',
        image:
          'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80',
        text: 'Reels, vitrines e campanhas com cara de marca grande.'
      },
      {
        title: 'Loja de Acessórios',
        image:
          'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80',
        text: 'Fotos de produto e vídeos que elevam a percepção de valor.'
      },
      {
        title: 'Negócios Locais',
        image:
          'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
        text: 'Conteúdo estratégico para atrair clientes e gerar autoridade.'
      }
    ]
  },
  institucional: {
    label: 'Institucionais',
    icon: Building2,
    accent: 'emeraldEmeraldRed',
    featured: {
      title: 'Projetos Institucionais',
      subtitle:
        'Narrativas visuais que transmitem credibilidade, impacto e propósito para órgãos, empresas e marcas.',
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80',
                description: 'Ensaio em campo aberto com direção natural e clima romântico, valorizando a conexão do casal e a beleza do cenário.',
        video: '/videos/video.mp4',
      tag: 'Produção destaque'
    },
    items: [
      {
        title: 'Prefeituras & Órgãos',
        image:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
        text: 'Cobertura oficial, campanhas e vídeos institucionais de alto nível.'
      },
      {
        title: 'Hospital & Saúde',
        image:
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
        text: 'Linguagem humana, profissional e informativa para projetos públicos e privados.'
      },
      {
        title: 'Eventos Oficiais',
        image:
          'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
        text: 'Registros impactantes para fortalecer a imagem institucional.'
      }
    ]
  },
  reels: {
    label: 'Reels de Instagram',
    icon: Clapperboard,
    accent: 'redEmeraldEmerald',
    featured: {
      title: 'Reels que prendem',
      subtitle:
        'Cortes rápidos, estética premium e construção pensada para alcance, retenção e conversão.',
      image:
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80',
                description: 'Ensaio em campo aberto com direção natural e clima romântico, valorizando a conexão do casal e a beleza do cenário.',
        video: '/videos/video.mp4',
      tag: 'Conteúdo destaque'
    },
    items: [
      {
        title: 'Reels Comerciais',
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
        text: 'Conteúdo para vender, conectar e destacar a marca no feed.'
      },
      {
        title: 'Reels Institucionais',
        image:
          'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80',
        text: 'Vídeos curtos com narrativa clara, dinâmica e memorável.'
      },
      {
        title: 'Reels Autorais',
        image:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
        text: 'Uma linguagem visual atual, pensada para performance e estética.'
      }
    ]
  }
};

const categoryOrder: CategoryKey[] = [
  'casamento',
  'preWedding',
  'aniversario',
  'comercial',
  'institucional',
  'reels'
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function NeonOrb({ className }: { className: string }) {
  return <div className={cx(styles.neonOrb, className)} />;
}

function GallerySection({
  categoryKey,
  section
}: {
  categoryKey: CategoryKey;
  section: PortfolioSection;
}) {
  const [index, setIndex] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);

  const Icon = section.icon;

  const next = () => setIndex((prev) => (prev + 1) % section.items.length);
  const prev = () =>
    setIndex(
      (prev) => (prev - 1 + section.items.length) % section.items.length
    );

  return (
    <section id={categoryKey} className={styles.gallerySection}>
      <div className={styles.galleryHeader}>
        <div>
          <div className={styles.sectionBadge}>
            <Icon className={styles.badgeIcon} />
            {section.label}
          </div>
          <h2 className={styles.galleryTitle}>
            Galeria de{' '}
            <span className={styles.gradientText}>{section.label}</span>
          </h2>
          <p className={styles.galleryDescription}>
            Capa de destaque e slider com os demais trabalhos para apresentar
            seus projetos com impacto visual, fluidez e clareza.
          </p>
        </div>

        <div className={styles.desktopControls}>
          <button
            onClick={prev}
            className={styles.arrowButton}
            aria-label="Anterior"
            type="button"
          >
            <ChevronLeft className={styles.arrowIcon} />
          </button>
          <button
            onClick={next}
            className={cx(styles.arrowButton, styles.arrowButtonRed)}
            aria-label="Próximo"
            type="button"
          >
            <ChevronRight className={styles.arrowIcon} />
          </button>
        </div>
      </div>

      <div className={styles.featuredCard}>
        <div className={styles.featuredMedia}>
          <Image
            src={section.featured.image}
            alt={section.featured.title}
            fill
            className={styles.featuredImage}
            sizes="100vw"
          />
          <div className={styles.featuredOverlay} />
          <div className={styles.featuredContent}>
            <div className={styles.featuredContentInner}>
              <span className={cx(styles.featuredTag, styles[section.accent])}>
                {section.featured.tag}
              </span>
              <h3 className={styles.featuredTitle}>{section.featured.title}</h3>
              <p className={styles.featuredSubtitle}>
                {section.featured.subtitle}
              </p>
              <div className={styles.featuredMeta}>
                <Play
                  className={styles.playIcon}
                  onClick={() => {
                    setPlay(true);
                  }}
                />
                Projeto em destaque
              </div>
            </div>
          </div>
        </div>
      </div>
      {play && (
        <div className={styles.PlayVideo}>
          <PlayerVideo
            setPlay={setPlay}
            videoSrc={section.featured.video}
            videoTitle={section.featured.title}
            videoDescription={section.featured.description}
          />
        </div>
      )}
      <div className={styles.galleryGrid}>
        <div className={styles.sliderCard}>
          <AnimatePresence mode="wait">
            <motion.div
              key={section.items[index].title}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.35 }}
              className={styles.sliderMedia}
            >
              <Image
                src={`/fotos/${section.items[index].title}/Capa.jpg`}
                alt={section.items[index].title}
                fill
                className={styles.sliderImage}
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
              <div className={styles.sliderOverlay} />
              <div className={styles.sliderContent}>
                <div className={styles.slidePill}>
                  Slide {String(index + 1).padStart(2, '0')}
                </div>
                <h4 className={styles.slideTitle}>
                  {section.items[index].title}
                </h4>
                <p className={styles.slideText}>{section.items[index].text}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.thumbGrid}>
          {section.items.map((item, itemIndex) => (
            <button
              key={item.title}
              onClick={() => setIndex(itemIndex)}
              type="button"
              className={cx(
                styles.thumbButton,
                itemIndex === index && styles.thumbButtonActive
              )}
            >
              <div className={styles.thumbImageWrap}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.thumbImage}
                  sizes="96px"
                />
              </div>
              <div>
                <h5 className={styles.thumbTitle}>{item.title}</h5>
                <p className={styles.thumbText}>{item.text}</p>
              </div>
            </button>
          ))}

          <div className={styles.mobileControls}>
            <button
              onClick={prev}
              type="button"
              className={styles.mobileButton}
            >
              Anterior
            </button>
            <button
              onClick={next}
              type="button"
              className={styles.mobileButton}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const GabriRecPortfolioSite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<CategoryKey>('casamento');

  const navItems = useMemo(
    () => categoryOrder.map((key) => ({ key, ...portfolioData[key] })),
    []
  );

  useEffect(() => {
    const sections = categoryOrder
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topVisible = visible[0]?.target?.id as CategoryKey | undefined;
        if (topVisible) setActiveSection(topVisible);
      },
      { threshold: [0.25, 0.45, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.bgGradient} />
      <div className={styles.bgGrid} />

      <NeonOrb className={cx(styles.orbLeft)} />
      <NeonOrb className={cx(styles.orbRight)} />
      <NeonOrb className={cx(styles.orbBottom)} />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#topo" className={styles.brand}>
            <div className={styles.brandIconWrap}>
              <Film className={styles.brandIcon} />
            </div>
            <div>
              <div className={styles.brandTitle}>GABRI REC</div>
              <div className={styles.brandSubtitle}>Foto & Vídeo Portfolio</div>
            </div>
          </a>

          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={cx(
                  styles.navLink,
                  activeSection === item.key && styles.navLinkActive
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={styles.menuButton}
            aria-label="Abrir menu"
            type="button"
          >
            {mobileMenuOpen ? (
              <X className={styles.menuIcon} />
            ) : (
              <Menu className={styles.menuIcon} />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.mobileNav}
            >
              <div className={styles.mobileNavInner}>
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={`#${item.key}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.mobileNavLink}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="topo">
        <section className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={cx(styles.heroBadge, styles.tituloDiv)}
              >
                <Sparkles className={styles.sparklesIcon} />
                Imagem premium de Memórias reais!
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className={styles.heroTitle}
              >
                Portfólio de trabalhos que{' '}
                <span className={styles.gradientText}>emocionam e vendem.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className={styles.heroText}
              >
                Um site para a Gabri Rec apresentar casamentos, pré wedding,
                aniversários, campanhas comerciais, trabalhos institucionais e
                reels de Instagram com visual forte, elegante e navegação
                fluida.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className={styles.heroButtons}
              >
                <a href="#casamento" className={styles.primaryButton}>
                  Explorar portfólio
                </a>
                <a href="#contato" className={styles.secondaryButton}>
                  Solicitar orçamento
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className={styles.tagsGrid}
              >
                {[
                  'Casamentos',
                  'Pré Wedding',
                  'Aniversários',
                  'Comercial',
                  'Institucional',
                  'Reels',
                  'Foto',
                  'Vídeo'
                ].map((tag) => (
                  <div key={tag} className={styles.tagCard}>
                    {tag}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={styles.heroVisualWrap}
            >
              <div className={styles.heroGlowLeft} />
              <div className={styles.heroGlowRight} />

              <div className={styles.heroCard}>
                <div className={styles.heroMedia}>
                  <Image
                    src={portfolioData.casamento.featured.image}
                    alt="Casamento destaque"
                    fill
                    className={styles.heroImage}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className={styles.heroOverlay} />

                  <div className={styles.heroMiniCard}>
                    <div className={styles.heroMiniCardLabel}>
                      Wedding highlight
                    </div>
                    <div className={styles.heroMiniCardText}>
                      Slide principal em destaque
                    </div>
                  </div>

                  <div className={styles.heroCardContent}>
                    <div className={styles.heroSignature}>
                      Gabri Rec Signature
                    </div>
                    <h2 className={styles.heroCardTitle}>
                      Casamentos com beleza, emoção e acabamento
                      cinematográfico.
                    </h2>
                    <p className={styles.heroCardText}>
                      Estrutura de apresentação pensada para impressionar
                      clientes logo na primeira dobra da página.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={styles.categoriesSection}>
          <div className={styles.categoriesGrid}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className={styles.categoryCard}
                >
                  <div className={styles.categoryIconWrap}>
                    <Icon className={styles.categoryIcon} />
                  </div>
                  <h3 className={styles.categoryTitle}>{item.label}</h3>
                  <p className={styles.categoryText}>
                    Galeria com capa principal e slider para apresentação dos
                    trabalhos.
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section className={styles.portfolioSection}>
          {categoryOrder.map((key) => (
            <GallerySection
              key={key}
              categoryKey={key}
              section={portfolioData[key]}
            />
          ))}
        </section>

        <section className={styles.benefitsSection}>
          <div className={styles.benefitsGrid}>
            {[
              {
                title: 'UX pensada para conversão',
                text: 'Cabeçalho fixo, navegação por categorias e leitura visual organizada para o visitante encontrar rápido o tipo de trabalho que deseja ver.'
              },
              {
                title: 'Visual premium e atual',
                text: 'Base escura com neon verde e vermelho, brilhos sutis, cards translúcidos e composição com estética futurista.'
              },
              {
                title: 'Estrutura pronta para evoluir',
                text: 'Você pode trocar facilmente as imagens de exemplo pelos trabalhos reais da Gabri Rec e depois conectar WhatsApp, Instagram e formulário.'
              }
            ].map((item) => (
              <div key={item.title} className={styles.benefitCard}>
                <h3 className={styles.benefitTitle}>{item.title}</h3>
                <p className={styles.benefitText}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contato" className={styles.contactSection}>
          <div className={styles.contactCard}>
            <div className={styles.contactOverlay} />
            <div className={styles.contactInner}>
              <div>
                <div className={styles.contactBadge}>
                  <Sparkles className={styles.sparklesIcon} />
                  Vamos criar algo memorável
                </div>
                <h2 className={styles.contactTitle}>
                  Transforme seus trabalhos em uma vitrine que impressiona logo
                  no primeiro clique.
                </h2>
                <p className={styles.contactText}>
                  Esta landing page já está pronta como base visual. O próximo
                  passo é substituir as imagens de exemplo pelos seus materiais
                  reais e personalizar textos, contatos e links oficiais da
                  Gabri Rec.
                </p>
              </div>

              <div className={styles.contactList}>
                {[
                  { icon: Instagram, label: 'Instagram', value: '@gabrirec' },
                  { icon: Phone, label: 'WhatsApp', value: '(22) 98119-3154' },
                  {
                    icon: Mail,
                    label: 'E-mail',
                    value: 'gabrireoficial@gmail.com'
                  },
                  {
                    icon: MapPin,
                    label: 'Atendimento',
                    value: 'Palma - MG e região'
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={styles.contactItem}>
                      <div className={styles.contactIconWrap}>
                        <Icon className={styles.contactIcon} />
                      </div>
                      <div>
                        <div className={styles.contactLabel}>{item.label}</div>
                        <div className={styles.contactValue}>{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
