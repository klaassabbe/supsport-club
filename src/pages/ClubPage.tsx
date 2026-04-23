import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Users, Heart, ExternalLink, Award,
  ChevronRight, ChevronDown, CheckCircle, Star,
  Gift, Zap, ShieldCheck, ArrowRight,
  Menu, X, AlertTriangle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ATHLETES } from "../data/athletes";

// ── Club ───────────────────────────────────────────────────────────
const CLUB = {
  name: "FFCK Kayak Belgique",
  fullName: "Fédération Francophone de Canoë-Kayak",
  location: "Namur, Belgique",
  founded: 1958,
  website: "https://www.ffckayak.be",
  members: 312,
  clubGoal: 18000,
  clubRaised: 11240,
  clubSupporters: 143,
};

// ── Coûts réels d'un athlète (section Pourquoi) ───────────────────
const ATHLETE_COSTS = [
  {
    emoji: "🏆",
    label: "Championnats d'Europe",
    detail: "Inscription + vol + hébergement sur place",
    amount: "~€1 200",
    amountRaw: 1200,
    highlight: false,
  },
  {
    emoji: "🌍",
    label: "Championnats du Monde",
    detail: "Inscription + vols internationaux + hébergement 7-10 jours",
    amount: "~€2 800",
    amountRaw: 2800,
    highlight: true,
  },
  {
    emoji: "🛶",
    label: "Kayak de compétition",
    detail: "Coque carbone homologuée compétition (renouvelé tous les 3-5 ans)",
    amount: "€3 000 – €7 000",
    amountRaw: 5000,
    highlight: false,
  },
  {
    emoji: "🪶",
    label: "Pagaie carbone",
    detail: "Pagaie technique carbone, personnalisée selon la discipline",
    amount: "€400 – €800",
    amountRaw: 600,
    highlight: false,
  },
  {
    emoji: "⛰️",
    label: "Stages de préparation",
    detail: "Stage altitude, stages techniques, camps d'entraînement",
    amount: "~€900/an",
    amountRaw: 900,
    highlight: false,
  },
  {
    emoji: "💆",
    label: "Kiné & récupération",
    detail: "Suivi médical, ostéo, récupération musculaire régulière",
    amount: "~€120/mois",
    amountRaw: 1440,
    highlight: false,
  },
];

// ── Partners ──────────────────────────────────────────────────────
const PARTNERS = [
  { name: "Trakks", category: "Running & Outdoor", icon: "👟", shortDiscount: "-20%", fullDesc: "20% sur les vêtements et chaussures (hors accessoires, nutrition, librairie et électro, non cumulable avec d'autres promotions).", url: "https://www.trakks.be" },
  { name: "XRUN", category: "Running & Outdoor", icon: "🏃", shortDiscount: "-20%", fullDesc: "20% de réduction dans toutes les boutiques de Battice et Malmedy.", url: "https://www.xrun.be" },
  { name: "Nutri-bay", category: "Nutrition sportive", icon: "💊", shortDiscount: "-10%", fullDesc: "10% de réduction sur tout le site web Nutri-bay.", url: "https://www.nutri-bay.com" },
  { name: "MJ Sport", category: "Équipement sportif", icon: "🏪", shortDiscount: "-15%", fullDesc: "15% sur les chaussures et 10% sur le textile dans les boutiques de Waremme et Rocourt.", url: "https://www.mjsport.be" },
  { name: "Physiosport", category: "Santé & Performance", icon: "💆", shortDiscount: "-15%", fullDesc: "15% sur tous les services : récupération musculaire et coaching sportif individuel.", url: "https://www.instagram.com/__physiosport__/" },
  { name: "Respire Sports", category: "Running & Cyclisme", icon: "🚴", shortDiscount: "-20%", fullDesc: "20% dans tout le magasin de Jalhay (sauf électronique).", url: "https://www.respiresports.be" },
  { name: "Kineo Fitness", category: "Fitness & Wellness", icon: "🏋️", shortDiscount: "1 mois\noffert", fullDesc: "1 mois gratuit à l'achat d'un abonnement 12 mois. Valable dans les 7 centres en Wallonie.", url: "https://www.kineo-fitness.com/" },
  { name: "Foodbag", category: "Nutrition & Bien-être", icon: "🥗", shortDiscount: "-€75", fullDesc: "75€ de réduction sur vos trois premières commandes (3 × 25€). Réservé aux nouveaux clients.", url: "https://www.foodbag.be" },
  { name: "IKIBA Sport", category: "Équipement sportif", icon: "🏑", shortDiscount: "jusqu'à\n-20%", fullDesc: "5% sticks/chaussures, 10% textile, 20% articles IKIBA.", url: "https://www.ikiba-sport.be/" },
  { name: "Altitude Training", category: "Équipement altitude", icon: "⛰️", shortDiscount: "-10%", fullDesc: "10% de réduction sur tout le matériel altitude.", url: "https://www.altitude-training.be" },
  { name: "Swiss Me Up", category: "Stages altitude", icon: "🇨🇭", shortDiscount: "Tarif\nspécial", fullDesc: "Tarif préférentiel sur les stages à Pontresina (Suisse). Note moyenne 9,2/10.", url: "https://www.swissmeup.ch" },
  { name: "Formyfit", category: "Coaching running", icon: "🏅", shortDiscount: "GRATUIT", fullDesc: "Coaching running 100% GRATUIT avec remboursement mutuelle.", url: "https://www.formyfit.com/fr/" },
  { name: "Spa Racing", category: "Équipement auto", icon: "🏎️", shortDiscount: "-12%", fullDesc: "12% à partir de 150€ d'achat en magasin.", url: "https://sparacing.com/" },
];

// ── Tiers (section Avantages) ─────────────────────────────────────
const TIERS = [
  { amount: 10, label: "Supporter",   advantages: 1, icon: "❤️", popular: false },
  { amount: 15, label: "Fan",         advantages: 2, icon: "⭐", popular: false },
  { amount: 20, label: "Ambassadeur", advantages: 3, icon: "📸", popular: false },
  { amount: 25, label: "Champion",    advantages: 4, icon: "🏅", popular: true },
];

// ── Paliers de soutien (Section Soutenir) ─────────────────────────
const SUPPORT_TIERS = [
  {
    amount: 10, label: "Supporter", icon: "❤️",
    impactLine: "= 2h d'entraînement financées / mois",
    remises: 1, popular: false,
    features: [
      "1 remise partenaire au choix",
      "Accès au suivi des athlètes",
      "Newsletter mensuelle",
    ],
    accentFrom: "#009EBE", accentTo: "#006880",
  },
  {
    amount: 25, label: "Champion", icon: "🏅",
    impactLine: "= 1 séance de kiné couverte / mois",
    remises: 4, popular: true,
    features: [
      "4 remises partenaires au choix",
      "Économies jusqu'à +€45 / mois",
      "Invitation aux événements du club",
      "Rapport mensuel personnalisé",
    ],
    accentFrom: "#009EBE", accentTo: "#003d50",
  },
  {
    amount: 50, label: "Elite", icon: "🏆",
    impactLine: "= 1 déplacement en compétition financé",
    remises: 13, popular: false,
    features: [
      "Toutes les remises partenaires",
      "Badge Elite visible sur le site",
      "Meet & greet athlètes",
      "Rapport analytics complet",
    ],
    accentFrom: "#e85d04", accentTo: "#c04a00",
  },
];

const BADGE_COLORS: Record<string, string> = {
  Elite:     "bg-yellow-100 text-yellow-800 border-yellow-200",
  Nationale: "bg-blue-100 text-blue-800 border-blue-200",
  National:  "bg-blue-100 text-blue-800 border-blue-200",
  Espoir:    "bg-green-100 text-green-800 border-green-200",
  Junior:    "bg-pink-100 text-pink-800 border-pink-200",
  Aventure:  "bg-orange-100 text-orange-800 border-orange-200",
};

// Section index map:
// 0 Accueil | 1 Comment | 2 Pourquoi | 3 Avantages | 4 Athlètes | 5 Soutenir | 6 Contact
const SECTION_NAMES = ["Accueil", "Comment", "Pourquoi", "Avantages", "Athlètes", "Soutenir", "Contact"];
const SECTION_H = "calc(100dvh - 4rem)";

// ── Helpers ────────────────────────────────────────────────────────
function FFCKLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-ffck.svg" alt="FFCK" className={className} />;
}
function SupSportLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-supsport.png" alt="SupSport" className={className} />;
}
function AnimBar({ pct, delay = 0, height = "h-2.5" }: { pct: number; delay?: number; height?: string }) {
  return (
    <div className={`w-full rounded-full ${height} overflow-hidden`} style={{ background: "rgba(0,158,190,0.15)" }}>
      <motion.div className={`${height} rounded-full`} style={{ background: "linear-gradient(90deg,#009EBE,#69C3D2)" }}
        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function ClubPage() {
  const navigate = useNavigate();
  const scrollRef    = useRef<HTMLDivElement>(null);
  const sectionRefs  = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection]     = useState(0);
  const [selectedTier, setSelectedTier]       = useState(3);
  const [donationType, setDonationType]       = useState<"monthly" | "once">("monthly");
  const [activePartners, setActivePartners]   = useState<number[]>([]);
  const [menuOpen, setMenuOpen]               = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(1);

  const tier      = TIERS[selectedTier];
  const clubPct   = Math.round((CLUB.clubRaised / CLUB.clubGoal) * 100);
  const clubMissing = CLUB.clubGoal - CLUB.clubRaised;

  function togglePartner(i: number) {
    const max = tier.advantages;
    setActivePartners(prev => {
      if (prev.includes(i)) return prev.filter(x => x !== i);
      if (prev.length >= max) return [...prev.slice(1), i];
      return [...prev, i];
    });
  }
  function scrollToSection(index: number) {
    const section   = sectionRefs.current[index];
    const container = scrollRef.current;
    if (section && container) {
      container.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setActiveSection(Math.max(0, Math.min(idx, SECTION_NAMES.length - 1)));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════════════ */}
      <header className="flex-shrink-0 relative z-50 border-b border-white/10 bg-[#003d50]/95 backdrop-blur-xl"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollToSection(0)}>
            <FFCKLogo className="h-9 md:h-12 w-auto" />
          </button>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            {SECTION_NAMES.slice(0, -1).map((label, i) => (
              <button key={label} onClick={() => scrollToSection(i)}
                className={`transition-colors ${activeSection === i ? "text-white font-semibold" : "text-white/55 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SupSportLogo className="hidden md:block h-5 w-auto" />
            <div className="hidden md:block w-px h-6 bg-white/20" />
            <button onClick={() => scrollToSection(5)}
              className="hidden md:inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-bold text-white hover:opacity-90 transition-all shadow-sm"
              style={{ background: "#009EBE" }}>
              <Heart className="w-4 h-4" /> Soutenir le club
            </button>
            <button onClick={() => setMenuOpen(v => !v)}
              className="md:hidden text-white/70 hover:text-white p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 overflow-hidden md:hidden border-t border-white/10 shadow-2xl z-50"
              style={{ background: "#002d3e" }}>
              <nav className="flex flex-col px-4 py-3 gap-1">
                {SECTION_NAMES.map((label, i) => (
                  <button key={label} onClick={() => scrollToSection(i)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium text-left min-h-[44px] transition-colors ${activeSection === i ? "text-white bg-white/10" : "text-white/70 hover:bg-white/5"}`}>
                    {label}
                  </button>
                ))}
                <div className="pt-2 pb-1">
                  <button onClick={() => scrollToSection(5)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold text-white min-h-[48px]"
                    style={{ background: "#009EBE" }}>
                    <Heart className="w-4 h-4" /> Soutenir le club
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          SCROLL CONTAINER
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-scroll"
        style={{
          scrollSnapType: "y mandatory",
          overscrollBehaviorY: "contain",
          WebkitOverflowScrolling: "touch" as never,
        }}
      >

        {/* ══════════════════════════════════════════════════════════
            S0 — ACCUEIL
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={el => { sectionRefs.current[0] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "linear-gradient(135deg,#003d50 0%,#006880 60%,#009EBE 100%)" }}
          className="relative flex flex-col items-center justify-center text-center overflow-hidden px-5"
        >
          <div className="absolute top-0 right-0 w-72 md:w-[500px] h-72 md:h-[500px] rounded-full blur-[100px] md:blur-[130px] pointer-events-none opacity-20" style={{ background: "#69C3D2" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-10" style={{ background: "#e85d04" }} />

          <motion.div className="relative z-10 flex flex-col items-center w-full max-w-2xl"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            <div className="flex items-center gap-3 mb-5">
              <FFCKLogo className="h-8 md:h-11 w-auto" />
              <div className="w-px h-6 bg-white/20" />
              <SupSportLogo className="h-4 md:h-5 w-auto opacity-80" />
            </div>

            <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2">
              Financez la performance.<br />
              <span style={{ color: "#69C3D2" }}>Recevez des avantages.</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-md mb-5 leading-relaxed">
              {ATHLETES.length} athlètes belges de kayak financent leur saison <strong className="text-white">de leur propre poche.</strong>{" "}
              Championnats d'Europe, du Monde, matériel, kiné… Aidez-les à y aller.
            </p>

            {/* Cagnotte */}
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-5 border border-white/15">
              <div className="flex items-end justify-between mb-1.5">
                <div>
                  <span className="text-2xl font-black text-white">€{CLUB.clubRaised.toLocaleString("fr-BE")}</span>
                  <span className="text-white/45 text-xs ml-1.5">collectés</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold" style={{ color: "#69C3D2" }}>{clubPct}%</span>
                  <p className="text-white/30 text-[10px]">/ €{CLUB.clubGoal.toLocaleString("fr-BE")}</p>
                </div>
              </div>
              <AnimBar pct={clubPct} delay={0.5} height="h-2" />
              <div className="flex items-center justify-between mt-2 text-[11px]">
                <span className="flex items-center gap-1 text-white/45">
                  <Users className="w-3 h-3" /> {CLUB.clubSupporters} supporters
                </span>
                <span className="font-semibold" style={{ color: "#e85d04" }}>
                  Il manque €{clubMissing.toLocaleString("fr-BE")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              <button onClick={() => scrollToSection(5)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold text-base text-white min-h-[52px] hover:opacity-90 transition-all shadow-xl"
                style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}>
                <Heart className="w-5 h-5" />
                Je finance un athlète
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollToSection(2)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold text-sm text-white/75 min-h-[44px] border border-white/20 hover:bg-white/10 transition-all">
                Pourquoi ils ont besoin de vous
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-4 text-white/35 text-xs">
              Et économisez jusqu'à <span className="text-green-400 font-semibold">+€45/mois</span> chez nos {PARTNERS.length} partenaires
            </p>
          </motion.div>

          <button onClick={() => scrollToSection(1)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/25 hover:text-white/60 transition-colors"
            style={{ animation: "bounce 2s infinite" }}>
            <ChevronDown className="w-6 h-6" />
          </button>
        </section>

        {/* ══════════════════════════════════════════════════════════
            S1 — COMMENT ÇA MARCHE
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={el => { sectionRefs.current[1] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "hsl(195,100%,99%)" }}
          className="flex flex-col overflow-y-auto"
        >
          <div className="container mx-auto max-w-4xl px-5 py-7 flex flex-col min-h-full">
            <div className="text-center mb-6 flex-shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-3"
                style={{ color: "#009EBE", borderColor: "rgba(0,158,190,0.2)", background: "rgba(0,158,190,0.08)" }}>
                <Zap className="w-3.5 h-3.5" /> Simple comme bonjour
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-foreground">Comment ça marche ?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6">
              {[
                {
                  n: "1", emoji: "💰",
                  title: "Vous choisissez votre don",
                  body: "€10, €25 ou €50 par mois — ou un don unique. Annulable à tout moment.",
                  color: "#009EBE",
                },
                {
                  n: "2", emoji: "🎁",
                  title: "Vous choisissez vos remises",
                  body: `1 à ${PARTNERS.length} remises parmi nos ${PARTNERS.length} partenaires sportifs belges, selon votre niveau.`,
                  color: "#009EBE",
                },
                {
                  n: "3", emoji: "🎉",
                  title: "Vous économisez plus que votre don",
                  body: "Exemple : chaussures Trakks à €270 → €216 avec la remise. Don €25. Économie nette : +€29.",
                  color: "#009EBE",
                  highlight: true,
                },
              ].map((step, i) => (
                <div key={i}
                  className={`relative rounded-2xl border p-4 md:p-6 ${step.highlight ? "ring-2 ring-[#009EBE]" : ""}`}
                  style={{
                    background: step.highlight ? "rgba(0,158,190,0.04)" : "white",
                    borderColor: step.highlight ? "#009EBE" : "hsl(193,30%,88%)",
                  }}>
                  <div className="flex md:block items-start gap-3">
                    <div className="flex items-center gap-2 flex-shrink-0 md:mb-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ background: step.color }}>
                        {step.n}
                      </div>
                      <span className="text-xl">{step.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-foreground text-base md:text-lg mb-1 leading-snug">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                      {step.highlight && (
                        <div className="mt-3 rounded-xl p-2.5 text-sm font-bold text-center" style={{ background: "rgba(0,158,190,0.1)", color: "#009EBE" }}>
                          +€29 dans la poche 🎉
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center flex-shrink-0 pb-2">
              <button onClick={() => scrollToSection(5)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-bold text-base text-white min-h-[52px] hover:opacity-90 transition-all shadow-lg"
                style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}>
                <Heart className="w-5 h-5" />
                Devenir supporter
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-muted-foreground text-xs mt-2">Dès €10/mois · annulable à tout moment</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            S2 — POURQUOI ILS ONT BESOIN DE VOUS
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={el => { sectionRefs.current[2] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H }}
          className="relative flex flex-col overflow-hidden"
        >
          {/* Fond sombre dramatique */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(160deg,#0a0a0a 0%,#1a1a2e 50%,#16213e 100%)" }} />
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: "#e85d04" }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-15 pointer-events-none" style={{ background: "#009EBE" }} />

          <div className="relative z-10 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex-shrink-0 px-5 pt-6 pb-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-3"
                style={{ color: "#e85d04", borderColor: "rgba(232,93,4,0.3)", background: "rgba(232,93,4,0.1)" }}>
                <AlertTriangle className="w-3.5 h-3.5" /> La réalité du sport amateur belge
              </span>
              <h2 className="text-xl md:text-3xl font-black text-white mb-2">
                Ils compétissent pour la Belgique.<br />
                <span style={{ color: "#e85d04" }}>L'État ne paie pas.</span>
              </h2>
              <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
                Nos athlètes ne sont pas professionnels. Ils étudient ou travaillent à plein temps,
                et financent eux-mêmes chaque compétition, chaque stage, chaque kayak.
              </p>
            </div>

            {/* Grille de coûts */}
            <div className="flex-1 overflow-y-auto px-5 pb-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 max-w-3xl mx-auto">
                {ATHLETE_COSTS.map((cost, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-2xl p-3.5 md:p-4 relative overflow-hidden"
                    style={{
                      background: cost.highlight ? "rgba(232,93,4,0.12)" : "rgba(255,255,255,0.05)",
                      border: cost.highlight ? "1px solid rgba(232,93,4,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    }}>
                    {cost.highlight && (
                      <div className="absolute top-0 right-0 rounded-bl-xl px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
                        style={{ background: "#e85d04", color: "#fff" }}>
                        Le plus cher
                      </div>
                    )}
                    <div className="text-2xl mb-2">{cost.emoji}</div>
                    <p className="text-white font-bold text-xs md:text-sm mb-1 leading-snug">{cost.label}</p>
                    <p className="text-white/40 text-[10px] leading-relaxed mb-2 hidden md:block">{cost.detail}</p>
                    <p className="font-black text-base md:text-lg" style={{ color: cost.highlight ? "#e85d04" : "#69C3D2" }}>
                      {cost.amount}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Total + CTA */}
            <div className="flex-shrink-0 px-5 py-4">
              {/* Bloc total */}
              <div className="max-w-3xl mx-auto rounded-2xl p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-3"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide font-semibold mb-0.5">Coût total estimé par athlète et par saison</p>
                  <p className="text-white font-black text-2xl md:text-3xl">€5 000 – €12 000
                    <span className="text-white/30 text-sm font-normal ml-2">payés de leur poche</span>
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white/40 text-xs mb-1">Subvention publique reçue</p>
                  <p className="font-black text-2xl" style={{ color: "#e85d04" }}>€0</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <button onClick={() => scrollToSection(5)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 font-bold text-base text-white min-h-[52px] hover:opacity-90 transition-all shadow-xl"
                  style={{ background: "linear-gradient(135deg,#e85d04,#c04a00)" }}>
                  <Heart className="w-5 h-5" />
                  Aider nos athlètes à y aller
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            S3 — AVANTAGES PARTENAIRES
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={el => { sectionRefs.current[3] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "linear-gradient(180deg,#003d50 0%,#005a70 100%)" }}
          className="flex flex-col overflow-hidden"
        >
          <div className="flex-shrink-0 container mx-auto px-4 pt-5 md:pt-8 pb-3">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/70 mb-1.5"
                  style={{ background: "rgba(255,255,255,0.08)" }}>
                  <Gift className="w-3 h-3" /> {PARTNERS.length} partenaires exclusifs
                </span>
                <h2 className="text-xl md:text-3xl font-black text-white">Vos remises partenaires</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {TIERS.map((t, i) => (
                  <button key={t.amount} onClick={() => setSelectedTier(i)}
                    className={`relative flex-shrink-0 rounded-xl px-3 py-2 text-xs font-semibold min-h-[44px] transition-all ${selectedTier === i ? "text-white scale-105" : "text-white/50 hover:text-white/75"}`}
                    style={{ background: selectedTier === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)", border: selectedTier === i ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.1)" }}>
                    {t.popular && <span className="absolute -top-1.5 -right-1.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: "#69C3D2", color: "#003d50" }}>Top</span>}
                    {t.icon} {t.label} · {t.advantages} remise{t.advantages > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-white/40 text-xs">
              <strong className="text-white/60">{tier.label}</strong> — cliquez pour sélectionner vos remises
              {activePartners.length > 0 && <span style={{ color: "#69C3D2" }}> · {activePartners.length}/{tier.advantages} choisie{activePartners.length > 1 ? "s" : ""}</span>}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto container mx-auto px-4 pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.12) transparent" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {PARTNERS.map((p, i) => {
                const selected = activePartners.includes(i);
                return (
                  <button key={p.name}
                    onClick={() => togglePartner(i)}
                    className={`rounded-2xl p-3 text-left transition-all duration-300 relative min-h-[100px] ${selected ? "scale-[1.02]" : "active:scale-[0.98]"}`}
                    style={{
                      background: selected ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
                      border: selected ? "1px solid rgba(105,195,210,0.6)" : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: selected ? "0 6px 20px rgba(0,0,0,0.25)" : "none",
                    }}>
                    {selected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#69C3D2" }}>
                        <CheckCircle className="w-3 h-3 text-white" />
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg flex-shrink-0">{p.icon}</span>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-xs truncate">{p.name}</p>
                        <p className="text-white/40 text-[10px] truncate">{p.category}</p>
                      </div>
                    </div>
                    <div className="rounded-md px-2 py-0.5 mb-1.5 inline-block" style={{ background: "rgba(105,195,210,0.15)" }}>
                      <p className="font-black text-[10px] whitespace-pre-line" style={{ color: "#69C3D2" }}>{p.shortDiscount}</p>
                    </div>
                    <p className="text-white/45 text-[10px] leading-relaxed line-clamp-2">{p.fullDesc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-shrink-0 container mx-auto px-4 py-2.5 text-center">
            <button onClick={() => scrollToSection(5)}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-bold text-sm min-h-[48px] hover:opacity-90 transition-all shadow-lg"
              style={{ background: "#69C3D2", color: "#003d50" }}>
              <Heart className="w-4 h-4" />
              Accéder à ces remises — dès €10/mois
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            S4 — ATHLÈTES
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={el => { sectionRefs.current[4] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "hsl(195,100%,99%)" }}
          className="flex flex-col overflow-hidden"
        >
          <div className="flex-shrink-0 container mx-auto px-4 pt-5 md:pt-8 pb-3">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl md:text-3xl font-black text-foreground mb-0.5">Nos athlètes</h2>
                <p className="text-muted-foreground text-sm">Chaque profil, une vraie histoire de sacrifice et de passion</p>
              </div>
              <span className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                <Star className="w-3.5 h-3.5 text-yellow-500" />{ATHLETES.length} athlètes actifs
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto container mx-auto px-4 pb-4" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {ATHLETES.map((a, i) => (
                <button key={a.id}
                  onClick={() => navigate(`/athlete/${a.id}`)}
                  className="overflow-hidden rounded-2xl border border-border/50 bg-card text-left hover:shadow-[0_16px_48px_rgba(0,158,190,0.15)] active:scale-[0.98] transition-all duration-300 group">
                  <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                    <img src={a.photo} alt={a.name}
                      className={`w-full h-full object-cover ${a.pos} group-hover:scale-105 transition-transform duration-700`}
                      onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=500&fit=crop&q=80"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold text-white">{a.sport}</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold ${BADGE_COLORS[a.badge] ?? "bg-gray-100 text-gray-700"}`}>{a.badge}</span>
                    </div>
                    <div className="absolute bottom-2 left-2.5 right-2.5">
                      <p className="text-white font-bold text-sm leading-tight">{a.name}</p>
                      <p className="text-white/60 text-xs flex items-center gap-0.5 mt-0.5"><MapPin className="w-2.5 h-2.5" />{a.city}</p>
                    </div>
                  </div>
                  <div className="p-2.5 md:p-3">
                    <p className="text-foreground/70 text-xs leading-relaxed line-clamp-2 mb-1.5">{a.desc}</p>
                    {a.results[0] && (
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <Award className="w-3 h-3 text-yellow-500 flex-shrink-0" />{a.results[0]}
                      </div>
                    )}
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold" style={{ color: "#009EBE" }}>
                      Voir sa page <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            S5 — SOUTENIR
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={el => { sectionRefs.current[5] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H }}
          className="relative flex flex-col overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,#003d50 0%,#006880 100%)" }} />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[120px] pointer-events-none opacity-15" style={{ background: "#69C3D2" }} />

          <div className="relative z-10 flex flex-col h-full overflow-y-auto">
            <div className="flex-shrink-0 px-5 pt-6 pb-4 text-center">
              <h2 className="text-xl md:text-3xl font-black text-white mb-1">Choisissez votre engagement</h2>
              <p className="text-white/50 text-xs md:text-sm">100% reversé aux athlètes · Annulable à tout moment</p>

              <div className="max-w-xs mx-auto mt-4 mb-4">
                <div className="flex justify-between text-[11px] text-white/40 mb-1">
                  <span>€{CLUB.clubRaised.toLocaleString("fr-BE")} collectés</span>
                  <span className="font-semibold" style={{ color: "#e85d04" }}>−€{clubMissing.toLocaleString("fr-BE")}</span>
                </div>
                <AnimBar pct={clubPct} delay={0.2} height="h-1.5" />
                <p className="text-white/25 text-[10px] mt-1">{clubPct}% atteint · {CLUB.clubSupporters} supporters</p>
              </div>

              <div className="inline-flex rounded-2xl overflow-hidden border border-white/15 bg-white/5 mb-1">
                {(["monthly", "once"] as const).map(type => (
                  <button key={type} onClick={() => setDonationType(type)}
                    className={`px-5 py-2.5 text-sm font-semibold min-h-[44px] min-w-[120px] transition-all ${donationType === type ? "text-white" : "text-white/45"}`}
                    style={{ background: donationType === type ? "#009EBE" : "transparent" }}>
                    {type === "monthly" ? "🔄 Mensuel" : "💳 Unique"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards — carousel mobile / grille desktop */}
            <div
              className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible px-5 pb-4 flex-shrink-0"
              style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" as never }}
            >
              {SUPPORT_TIERS.map((t, i) => {
                const isSelected = selectedSupport === i;
                return (
                  <button
                    key={t.amount}
                    onClick={() => setSelectedSupport(i)}
                    className={`flex-shrink-0 w-[75vw] sm:w-[320px] md:w-auto rounded-[1.25rem] text-left transition-all duration-300 overflow-hidden ${isSelected ? "md:scale-[1.03] shadow-2xl" : "opacity-80 active:opacity-100"}`}
                    style={{
                      scrollSnapAlign: "center",
                      background: isSelected
                        ? `linear-gradient(135deg, ${t.accentFrom}, ${t.accentTo})`
                        : "rgba(255,255,255,0.07)",
                      border: isSelected ? "2px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.12)",
                    }}>
                    {t.popular && (
                      <div className="py-1.5 text-center text-[10px] font-black uppercase tracking-wider text-white"
                        style={{ background: "rgba(255,255,255,0.15)" }}>
                        ⭐ Le plus populaire
                      </div>
                    )}
                    <div className={`p-4 ${t.popular ? "pt-3" : ""}`}>
                      <div className="flex items-end gap-2 mb-1.5">
                        <span className="text-3xl font-black text-white">€{t.amount}</span>
                        <span className="text-white/50 text-xs mb-1">{donationType === "monthly" ? "/mois" : " (unique)"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="text-base">{t.icon}</span>
                        <span className="font-bold text-white text-sm">{t.label}</span>
                      </div>
                      <div className="rounded-xl px-3 py-2.5 mb-3"
                        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <p className="text-[10px] text-white/50 uppercase tracking-wide font-semibold mb-0.5">Impact direct</p>
                        <p className="text-sm font-bold text-white leading-snug">{t.impactLine}</p>
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        {t.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-white/70">
                            <span style={{ color: "#69C3D2" }} className="font-black flex-shrink-0">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div
                        className="w-full rounded-xl py-3 text-sm font-bold text-center text-white"
                        style={{
                          background: isSelected ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.10)",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}>
                        {donationType === "monthly"
                          ? `Soutenir à €${t.amount}/mois`
                          : `Faire un don de €${t.amount}`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dots carousel mobile */}
            <div className="flex md:hidden justify-center gap-2 mb-4 flex-shrink-0">
              {SUPPORT_TIERS.map((_, i) => (
                <button key={i} onClick={() => setSelectedSupport(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: selectedSupport === i ? "20px" : "6px",
                    height: "6px",
                    background: selectedSupport === i ? "#009EBE" : "rgba(255,255,255,0.25)",
                  }} />
              ))}
            </div>

            <p className="text-center text-white/25 text-xs px-5 pb-5 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
              Paiement sécurisé · Sans engagement · Annulable en un clic
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            S6 — CONTACT / FOOTER
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={el => { sectionRefs.current[6] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "#003d50" }}
          className="flex flex-col items-center justify-center text-white overflow-y-auto px-5"
        >
          <div className="container mx-auto max-w-4xl py-8">
            <div className="text-center mb-7">
              <FFCKLogo className="h-10 w-auto mx-auto mb-2.5" />
              <p className="text-white/35 text-sm">{CLUB.fullName}<br />{CLUB.location} · Fondée en {CLUB.founded}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h4 className="font-semibold mb-3 text-white/60 text-xs uppercase tracking-wide">Navigation</h4>
                <ul className="space-y-2 text-sm text-white/40">
                  {SECTION_NAMES.slice(0, -1).map((label, i) => (
                    <li key={label}>
                      <button onClick={() => scrollToSection(i)} className="hover:text-white transition-colors text-left min-h-[36px] flex items-center">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white/60 text-xs uppercase tracking-wide">Partenaires</h4>
                <ul className="space-y-2 text-sm text-white/40">
                  {PARTNERS.slice(0, 5).map(p => (
                    <li key={p.name}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors min-h-[36px] flex items-center">{p.name}</a>
                    </li>
                  ))}
                  {PARTNERS.length > 5 && <li className="text-white/25 text-xs">+{PARTNERS.length - 5} autres...</li>}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-semibold mb-3 text-white/60 text-xs uppercase tracking-wide">Contact</h4>
                <ul className="space-y-2 text-sm text-white/40">
                  <li><a href="mailto:info@ffckayak.be" className="hover:text-white transition-colors">info@ffckayak.be</a></li>
                  <li>
                    <a href={CLUB.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                      ffckayak.be <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
                <div className="mt-4 flex items-center gap-2 text-white/25 text-xs">
                  <ShieldCheck className="w-4 h-4" /> Paiements sécurisés via Stripe
                </div>
                <div className="mt-4">
                  <button onClick={() => scrollToSection(5)}
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white min-h-[48px] hover:opacity-90 transition-all"
                    style={{ background: "#009EBE" }}>
                    <Heart className="w-4 h-4" /> Soutenir maintenant
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/25">
              <p>© 2026 {CLUB.fullName}</p>
              <div className="flex items-center gap-4">
                <SupSportLogo className="h-4 w-auto opacity-30" />
                <a href="#" className="hover:text-white/50 transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-white/50 transition-colors">Conditions</a>
              </div>
            </div>
          </div>
        </section>

      </div>{/* end scroll container */}

      {/* ══════════════════════════════════════════════════════════════
          BOUTON FLOTTANT MOBILE — masqué sur la section Soutenir (S5)
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeSection !== 5 && (
          <motion.div
            key="floating-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 md:hidden z-50 px-4"
            style={{
              paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 40%, transparent 100%)",
            }}
          >
            <button
              onClick={() => scrollToSection(5)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white min-h-[54px] shadow-2xl active:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}
            >
              <Heart className="w-5 h-5" />
              Je finance un athlète — dès €10/mois
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          NAV DOTS (desktop uniquement)
      ══════════════════════════════════════════════════════════════ */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 p-2 rounded-full"
        style={{ background: "rgba(0,0,0,0.12)", backdropFilter: "blur(8px)" }}>
        {SECTION_NAMES.map((label, i) => (
          <button key={label} onClick={() => scrollToSection(i)} title={label}
            className="relative group flex items-center gap-2 justify-end">
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-medium px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none"
              style={{ background: "rgba(0,40,55,0.95)", color: "rgba(255,255,255,0.85)" }}>
              {label}
            </span>
            <span className={`block rounded-full transition-all duration-300 flex-shrink-0 ${activeSection === i ? "w-3 h-3" : "w-2 h-2"}`}
              style={{
                background: activeSection === i ? "#009EBE" : "rgba(255,255,255,0.35)",
                boxShadow: activeSection === i ? "0 0 8px rgba(0,158,190,0.7)" : "none",
              }} />
          </button>
        ))}
      </div>

    </div>
  );
}
