import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BadgeCheck, Eye, MousePointer } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────
export type SponsorTier = "gold" | "silver" | "bronze";

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  logo: string;
  tagline: string;
  description: string;
  discount?: string;
  url: string;
  bgFrom: string;
  bgTo: string;
  accentColor: string;
  textColor: string;
  category: string;
  since?: number;
}

// ── Seed impression / click counts (realistic baseline) ───────────
const SEED: Record<string, { imp: number; clk: number }> = {
  xrun: { imp: 1247, clk: 89 },
};

// ── Tracking hook (localStorage + IntersectionObserver) ───────────
function useSponsorTracking(sponsorId: string) {
  const impKey = `sp_imp_${sponsorId}`;
  const clkKey = `sp_clk_${sponsorId}`;
  const seed = SEED[sponsorId] ?? { imp: 0, clk: 0 };

  const [impressions, setImpressions] = useState(() =>
    parseInt(localStorage.getItem(impKey) ?? String(seed.imp), 10)
  );
  const [clicks, setClicks] = useState(() =>
    parseInt(localStorage.getItem(clkKey) ?? String(seed.clk), 10)
  );

  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          setImpressions((c) => {
            const n = c + 1;
            localStorage.setItem(impKey, String(n));
            return n;
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [impKey]);

  function recordClick() {
    setClicks((c) => {
      const n = c + 1;
      localStorage.setItem(clkKey, String(n));
      return n;
    });
  }

  const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : "0.0";
  return { ref, impressions, clicks, ctr, recordClick };
}

// ── Gold Banner (full-width, prominent) ───────────────────────────
export function GoldSponsorBanner({ sponsor }: { sponsor: Sponsor }) {
  const { ref, impressions, clicks, ctr, recordClick } = useSponsorTracking(sponsor.id);
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[1.5rem] w-full"
      style={{
        background: `linear-gradient(135deg, ${sponsor.bgFrom} 0%, ${sponsor.bgTo} 100%)`,
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[80px] pointer-events-none opacity-30"
        style={{ background: sponsor.accentColor }}
      />

      {/* Sponsor label — always visible, never hidden */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-2.5 py-1">
        <BadgeCheck className="w-3 h-3 text-white/70" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
          Partenaire Officiel · Espace sponsorisé
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 px-6 pb-3 pt-12 md:px-8 md:pt-10 md:pb-3 relative z-10">
        {/* Logo */}
        <div className="flex-shrink-0">
          {!imgErr ? (
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-12 md:h-16 w-auto object-contain"
              onError={() => setImgErr(true)}
            />
          ) : (
            <span className="text-white font-black text-3xl tracking-tight">{sponsor.name}</span>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-14 bg-white/15 flex-shrink-0" />

        {/* Text block */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          <p className="text-white font-black text-lg md:text-2xl leading-tight">
            {sponsor.tagline}
          </p>
          <p className="text-white/55 text-sm mt-1 leading-relaxed">{sponsor.description}</p>
          {sponsor.discount && (
            <div
              className="inline-flex items-center gap-2 mt-2.5 rounded-full px-3 py-1"
              style={{
                background: sponsor.accentColor + "22",
                border: `1px solid ${sponsor.accentColor}55`,
              }}
            >
              <span className="text-sm font-bold" style={{ color: sponsor.accentColor }}>
                {sponsor.discount}
              </span>
              <span className="text-white/35 text-xs">· carte supporter SupSport</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={recordClick}
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-sm transition-all hover:scale-105 hover:opacity-90 shadow-lg"
          style={{ background: sponsor.accentColor, color: sponsor.textColor }}
        >
          Découvrir <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </motion.div>
  );
}

// ── Silver Banner (compact, sidebar-style) ────────────────────────
export function SilverSponsorBanner({ sponsor }: { sponsor: Sponsor }) {
  const { ref, impressions, clicks, recordClick } = useSponsorTracking(sponsor.id);
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl"
      style={{ background: `linear-gradient(135deg, ${sponsor.bgFrom}, ${sponsor.bgTo})` }}
    >
      <div className="absolute top-2 left-3 flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-0.5">
        <BadgeCheck className="w-2.5 h-2.5 text-white/50" />
        <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">Sponsorisé</span>
      </div>
      <div className="flex items-center gap-4 px-4 pt-8 pb-3">
        {!imgErr ? (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="h-8 w-auto object-contain flex-shrink-0"
            onError={() => setImgErr(true)}
          />
        ) : (
          <span className="text-white font-black text-lg">{sponsor.name}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{sponsor.tagline}</p>
          {sponsor.discount && (
            <p className="text-xs font-bold mt-0.5" style={{ color: sponsor.accentColor }}>
              {sponsor.discount}
            </p>
          )}
        </div>
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={recordClick}
          className="flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all hover:opacity-80"
          style={{ background: sponsor.accentColor, color: sponsor.textColor }}
        >
          Voir
        </a>
      </div>
      <div className="px-4 pb-2 flex items-center gap-3 text-[10px] text-white/20">
        <span className="flex items-center gap-1"><Eye className="w-2.5 h-2.5" />{impressions.toLocaleString("fr-BE")}</span>
        <span className="flex items-center gap-1"><MousePointer className="w-2.5 h-2.5" />{clicks}</span>
      </div>
    </motion.div>
  );
}

// ── Sponsor Tier Pricing (for "Devenez Sponsor" section) ──────────
const SPONSOR_TIERS = [
  {
    tier: "bronze" as SponsorTier,
    label: "Bronze",
    price: 500,
    color: "#cd7f32",
    bg: "rgba(205,127,50,0.08)",
    border: "rgba(205,127,50,0.25)",
    features: [
      "Logo dans la section sponsors",
      "Lien vers votre site",
      "50 000 impressions/an estimées",
      "Rapport mensuel (clics, impressions)",
    ],
    placement: "Mur des sponsors",
  },
  {
    tier: "silver" as SponsorTier,
    label: "Silver",
    price: 1000,
    color: "#9ca3af",
    bg: "rgba(156,163,175,0.08)",
    border: "rgba(156,163,175,0.25)",
    features: [
      "Bannière compacte entre sections",
      "Logo + tagline + CTA",
      "150 000 impressions/an estimées",
      "Dashboard analytics en temps réel",
      "Mention dans la newsletter mensuelle",
    ],
    placement: "Bannière intermédiaire",
    popular: false,
  },
  {
    tier: "gold" as SponsorTier,
    label: "Gold",
    price: 2000,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.3)",
    features: [
      "Grande bannière après le hero",
      "Logo HD + tagline + remise + CTA",
      "400 000+ impressions/an estimées",
      "Dashboard analytics complet",
      "Split revenus : 60% SupSport / 40% club",
      "Mention VIP dans newsletter + réseaux",
      "Badge «Partenaire Officiel» sur la page",
    ],
    placement: "Bannière premium (top de page)",
    popular: true,
  },
];

export function BecomeSponsorSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
          style={{
            background: "rgba(245,158,11,0.08)",
            color: "#f59e0b",
            borderColor: "rgba(245,158,11,0.25)",
          }}
        >
          <Euro className="w-3.5 h-3.5" /> Espaces publicitaires disponibles
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
          Devenez sponsor du FFCK
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Atteignez une communauté de {" "}
          <strong className="text-foreground">sportifs engagés</strong> en Belgique.
          Modèle d'abonnement annuel — pas d'enchères, tarif fixe et transparent.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {SPONSOR_TIERS.map((t, i) => (
          <motion.div
            key={t.tier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-[1.5rem] border p-6 flex flex-col"
            style={{ background: t.bg, borderColor: t.border }}
          >
            {t.popular && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold text-white"
                style={{ background: t.color }}
              >
                Recommandé
              </span>
            )}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black mb-4 self-start"
              style={{ background: t.color + "20", color: t.color }}
            >
              ● {t.label}
            </div>
            <div className="mb-1">
              <span className="text-3xl font-black text-foreground">€{t.price.toLocaleString("fr-BE")}</span>
              <span className="text-muted-foreground text-sm ml-1">/an</span>
            </div>
            <p className="text-xs text-muted-foreground mb-5">{t.placement}</p>
            <ul className="space-y-2 flex-1 mb-6">
              {t.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-0.5 flex-shrink-0 text-xs" style={{ color: t.color }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="mailto:sponsors@supsport.be">
              <button
                className="w-full rounded-2xl py-2.5 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: t.color, color: "#fff" }}
              >
                Contacter SupSport
              </button>
            </a>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6 max-w-lg mx-auto">
        Split de revenus : <strong>60% SupSport</strong> · <strong>40% versés au club</strong>.
        Tous les emplacements sont clairement identifiés comme «Partenaire Officiel» ou «Espace sponsorisé».
        Aucun contenu publicitaire ne sera déguisé en contenu éditorial.
      </p>
    </section>
  );
}
