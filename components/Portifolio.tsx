'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
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
    accent: 'from-emerald-300 via-red-500 to-emerald-400',
    featured: {
      title: 'Juliana & Rafael',
      subtitle:
        'Um casamento cinematográfico, elegante e cheio de emoção — pensado para eternizar cada detalhe com sofisticação.',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80',
      tag: 'Casamento destaque'
    },
    items: [
      {
        title: 'Juliana & Rafael',
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
    accent: 'from-red-500 via-emerald-300 to-red-400',
    featured: {
      title: 'Ana & Diego',
      subtitle:
        'Ensaios com direção leve, estética sofisticada e conexão real para contar a história do casal com personalidade.',
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
    accent: 'from-emerald-300 via-red-500 to-red-400',
    featured: {
      title: '15 Anos da Raica',
      subtitle:
        'Cobertura vibrante e moderna, feita para emocionar, valorizar a festa e gerar lembranças inesquecíveis.',
      image:
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1800&q=80',
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
    accent: 'from-red-500 via-red-400 to-emerald-300',
    featured: {
      title: 'Campanhas Comerciais',
      subtitle:
        'Conteúdo que valoriza marca, produto e posicionamento, com estética forte e acabamento profissional.',
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
    accent: 'from-emerald-300 via-emerald-500 to-red-500',
    featured: {
      title: 'Projetos Institucionais',
      subtitle:
        'Narrativas visuais que transmitem credibilidade, impacto e propósito para órgãos, empresas e marcas.',
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80',
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
    accent: 'from-red-400 via-emerald-300 to-emerald-400',
    featured: {
      title: 'Reels que prendem',
      subtitle:
        'Cortes rápidos, estética premium e construção pensada para alcance, retenção e conversão.',
      image:
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80',
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

function NeonOrb({ className }: { className: string }) {
  return <div className={`absolute rounded-full blur-3xl ${className}`} />;
}

function GallerySection({
  categoryKey,
  section
}: {
  categoryKey: CategoryKey;
  section: PortfolioSection;
}) {
  const [index, setIndex] = useState<number>(0);
  const Icon = section.icon;

  const next = () => setIndex((prev) => (prev + 1) % section.items.length);
  const prev = () =>
    setIndex(
      (prev) => (prev - 1 + section.items.length) % section.items.length
    );

  return (
    <section id={categoryKey} className="scroll-mt-28 py-12 md:py-20">
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300 backdrop-blur">
            <Icon className="h-4 w-4" />
            {section.label}
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Galeria de{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-white to-red-400 bg-clip-text text-transparent">
              {section.label}
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
            Capa de destaque e slider com os demais trabalhos para apresentar
            seus projetos com impacto visual, fluidez e clareza.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={prev}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-zinc-200 transition hover:border-emerald-400/40 hover:text-emerald-300"
            aria-label="Anterior"
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-zinc-200 transition hover:border-red-400/40 hover:text-red-300"
            aria-label="Próximo"
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_80px_rgba(16,185,129,0.08)]">
        <div className="relative h-[420px] md:h-[560px]">
          <Image
            src={section.featured.image}
            alt={section.featured.title}
            fill
            className="object-cover opacity-75"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.20),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.18),transparent_25%),linear-gradient(to_top,rgba(0,0,0,0.94),rgba(0,0,0,0.35),rgba(0,0,0,0.1))]" />
          <div className="absolute inset-0 flex items-end p-6 md:p-10">
            <div className="max-w-3xl">
              <span
                className={`inline-flex rounded-full bg-gradient-to-r ${section.accent} px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-black`}
              >
                {section.featured.tag}
              </span>
              <h3 className="mt-4 text-3xl font-black text-white md:text-6xl">
                {section.featured.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-lg">
                {section.featured.subtitle}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white backdrop-blur">
                <Play className="h-4 w-4 text-emerald-300" />
                Projeto em destaque
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80">
          <AnimatePresence mode="wait">
            <motion.div
              key={section.items[index].title}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.35 }}
              className="relative h-[360px] md:h-[470px]"
            >
              <Image
                src={section.items[index].image}
                alt={section.items[index].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.94),rgba(0,0,0,0.28),rgba(0,0,0,0.1))]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-3 inline-flex items-center rounded-full border border-emerald-400/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-300">
                  Slide {String(index + 1).padStart(2, '0')}
                </div>
                <h4 className="text-2xl font-bold text-white md:text-4xl">
                  {section.items[index].title}
                </h4>
                <p className="mt-2 max-w-2xl text-sm text-zinc-300 md:text-base">
                  {section.items[index].text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid gap-4">
          {section.items.map((item, itemIndex) => (
            <button
              key={item.title}
              onClick={() => setIndex(itemIndex)}
              type="button"
              className={`group flex items-center gap-4 rounded-[1.4rem] border p-3 text-left transition ${
                itemIndex === index
                  ? 'border-emerald-400/35 bg-white/[0.08] shadow-[0_0_30px_rgba(16,185,129,0.08)]'
                  : 'border-white/10 bg-white/[0.03] hover:border-red-400/30 hover:bg-white/[0.05]'
              }`}
            >
              <div className="relative h-20 w-24 overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div>
                <h5 className="font-semibold text-white">{item.title}</h5>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                  {item.text}
                </p>
              </div>
            </button>
          ))}

          <div className="mt-1 flex gap-2 md:hidden">
            <button
              onClick={prev}
              type="button"
              className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
            >
              Anterior
            </button>
            <button
              onClick={next}
              type="button"
              className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white"
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
        if (topVisible) {
          setActiveSection(topVisible);
        }
      },
      { threshold: [0.25, 0.45, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-emerald-300 selection:text-black">
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(to_bottom,#020202,#040404,#070707)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-[0.08]" />
      <NeonOrb className="left-[-4rem] top-12 h-52 w-52 bg-emerald-500/20" />
      <NeonOrb className="right-[-5rem] top-40 h-72 w-72 bg-red-500/15" />
      <NeonOrb className="bottom-24 left-1/3 h-80 w-80 bg-emerald-400/10" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <a href="#topo" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-white/5 shadow-[0_0_30px_rgba(16,185,129,0.18)]">
              <Film className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.18em] text-white">
                GABRI REC
              </div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                Foto & Vídeo Portfolio
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeSection === item.key
                    ? 'bg-white text-black'
                    : 'border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-emerald-400/30 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-white lg:hidden"
            aria-label="Abrir menu"
            type="button"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t border-white/10 bg-black/95 px-4 py-4 lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={`#${item.key}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-200"
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
        <section className="relative overflow-hidden">
          <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-300"
              >
                <Sparkles className="h-4 w-4" />
                Experiência visual premium
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-tight md:text-7xl xl:text-8xl"
              >
                Portfólio futurista para mostrar trabalhos que{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-white to-red-500 bg-clip-text text-transparent">
                  emocionam e vendem.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg"
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
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#casamento"
                  className="rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-300 px-6 py-3 font-semibold text-black shadow-[0_0_35px_rgba(16,185,129,0.25)] transition hover:scale-[1.02]"
                >
                  Explorar portfólio
                </a>
                <a
                  href="#contato"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-white transition hover:border-red-400/35 hover:bg-white/[0.07]"
                >
                  Solicitar orçamento
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-10 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4"
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
                  <div
                    key={tag}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-200 backdrop-blur"
                  >
                    {tag}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 blur-xl" />
              <div className="absolute -bottom-8 right-0 h-24 w-24 rounded-3xl border border-red-400/20 bg-red-400/10 blur-xl" />

              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-zinc-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_90px_rgba(16,185,129,0.08)]">
                <div className="relative h-[560px] md:h-[700px]">
                  <Image
                    src={portfolioData.casamento.featured.image}
                    alt="Casamento destaque"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.18),transparent_25%),linear-gradient(to_top,rgba(0,0,0,0.92),rgba(0,0,0,0.28),rgba(0,0,0,0.08))]" />

                  <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur">
                    <div className="text-xs uppercase tracking-[0.22em] text-emerald-300">
                      Wedding highlight
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Slide principal em destaque
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="mb-3 inline-flex rounded-full bg-gradient-to-r from-emerald-300 via-white to-red-400 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black">
                      Gabri Rec Signature
                    </div>
                    <h2 className="max-w-2xl text-3xl font-black text-white md:text-5xl">
                      Casamentos com beleza, emoção e acabamento
                      cinematográfico.
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
                      Estrutura de apresentação pensada para impressionar
                      clientes logo na primeira dobra da página.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-2 md:px-6">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className="group rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-white/[0.05]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-emerald-300 transition group-hover:border-emerald-400/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Galeria com capa principal e slider para apresentação dos
                    trabalhos.
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          {categoryOrder.map((key) => (
            <GallerySection
              key={key}
              categoryKey={key}
              section={portfolioData[key]}
            />
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-14">
          <div className="grid gap-6 lg:grid-cols-3">
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
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
              >
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contato"
          className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-20"
        >
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-zinc-950/80 p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.14),transparent_25%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-300">
                  <Sparkles className="h-4 w-4" />
                  Vamos criar algo memorável
                </div>
                <h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
                  Transforme seus trabalhos em uma vitrine que impressiona logo
                  no primeiro clique.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                  Esta landing page já está pronta como base visual. O próximo
                  passo é substituir as imagens de exemplo pelos seus materiais
                  reais e personalizar textos, contatos e links oficiais da
                  Gabri Rec.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: Instagram, label: 'Instagram', value: '@gabrirec' },
                  { icon: Phone, label: 'WhatsApp', value: '(00) 00000-0000' },
                  {
                    icon: Mail,
                    label: 'E-mail',
                    value: 'contato@gabrirec.com'
                  },
                  {
                    icon: MapPin,
                    label: 'Atendimento',
                    value: 'Palma - MG e região'
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                          {item.label}
                        </div>
                        <div className="mt-1 text-base font-semibold text-white">
                          {item.value}
                        </div>
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
