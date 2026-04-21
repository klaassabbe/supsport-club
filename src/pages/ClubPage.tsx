import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Users, Heart, ExternalLink, Award, Calendar,
  ChevronRight, Trophy, Target, CheckCircle, Star,
  TrendingUp, Gift, Zap, ShieldCheck, ArrowRight, ArrowDown,
  Menu, X
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoldSponsorBanner,
  type Sponsor,
} from "../components/SponsorBanner";
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

// ── Partners — descriptions exactes SupSport ───────────────────────
const PARTNERS = [
  {
    name: "Trakks",
    category: "Running & Outdoor",
    icon: "👟",
    shortDiscount: "-20%",
    fullDesc: "20% sur les vêtements et chaussures (hors accessoires, nutrition, librairie et électro, non cumulable avec d'autres promotions).",
    url: "https://www.trakks.be",
  },
  {
    name: "XRUN",
    category: "Running & Outdoor",
    icon: "🏃",
    shortDiscount: "-20%",
    fullDesc: "20% de réduction dans toutes les boutiques de Battice et Malmedy.",
    url: "https://www.xrun.be",
  },
  {
    name: "Nutri-bay",
    category: "Nutrition sportive",
    icon: "💊",
    shortDiscount: "-10%",
    fullDesc: "10% de réduction sur tout le site web Nutri-bay (running, trail, triathlon, cyclisme, natation).",
    url: "https://www.nutri-bay.com",
  },
  {
    name: "MJ Sport",
    category: "Équipement sportif",
    icon: "🏪",
    shortDiscount: "-15%",
    fullDesc: "15% sur les chaussures et 10% sur le textile dans les boutiques de Waremme et Rocourt (Nike, Adidas, running, tennis, padel, natation, fitness).",
    url: "https://www.mjsport.be",
  },
  {
    name: "Physiosport",
    category: "Santé & Performance",
    icon: "💆",
    shortDiscount: "-15%",
    fullDesc: "15% sur tous les services : récupération musculaire 90 min (50€ → 42,50€) et coaching sportif individuel 90 min (50€ → 42,50€).",
    url: "https://www.instagram.com/__physiosport__/",
  },
  {
    name: "Respire Sports",
    category: "Running & Cyclisme",
    icon: "🚴",
    shortDiscount: "-20%",
    fullDesc: "20% dans tout le magasin de Jalhay (sauf électronique) et 10% dans le magasin de vélo de Spa.",
    url: "https://www.respiresports.be",
  },
  {
    name: "Kineo Fitness",
    category: "Fitness & Wellness",
    icon: "🏋️",
    shortDiscount: "1 mois\noffert",
    fullDesc: "1 mois gratuit à l'achat d'un abonnement 12 mois. Valable dans les 7 centres en Wallonie (piscines 29°C, jacuzzis, saunas, hammams).",
    url: "https://www.kineo-fitness.com/",
  },
  {
    name: "Foodbag",
    category: "Nutrition & Bien-être",
    icon: "🥗",
    shortDiscount: "-€75",
    fullDesc: "75€ de réduction sur vos trois premières commandes (3 × 25€). Réservé aux nouveaux clients uniquement.",
    url: "https://www.foodbag.be",
  },
  {
    name: "IKIBA Sport",
    category: "Équipement sportif",
    icon: "🏑",
    shortDiscount: "jusqu'à\n-20%",
    fullDesc: "5% sur les sticks et chaussures, 10% sur le textile et accessoires, 20% sur les articles IKIBA (remises non cumulables).",
    url: "https://www.ikiba-sport.be/",
  },
  {
    name: "Altitude Training",
    category: "Équipement altitude",
    icon: "⛰️",
    shortDiscount: "-10%",
    fullDesc: "10% de réduction sur tout le matériel altitude (masques, tentes hypoxiques, générateurs altitude personnalisables).",
    url: "https://www.altitude-training.be",
  },
  {
    name: "Swiss Me Up",
    category: "Stages altitude",
    icon: "🇨🇭",
    shortDiscount: "Tarif\nspécial",
    fullDesc: "Tarif préférentiel sur les stages d'entraînement en altitude à Pontresina (Suisse). Note moyenne 9,2/10.",
    url: "https://www.swissmeup.ch",
  },
  {
    name: "Formyfit",
    category: "Coaching running",
    icon: "🏅",
    shortDiscount: "GRATUIT",
    fullDesc: "Coaching running 100% GRATUIT. Prix de base 120€, prix SupSport 50€, remboursement mutuelle 50€ = Gratuit !",
    url: "https://www.formyfit.com/fr/",
  },
  {
    name: "Spa Racing",
    category: "Équipement auto",
    icon: "🏎️",
    shortDiscount: "-12%",
    fullDesc: "12% de réduction à partir de 150€ d'achat en magasin (combinaisons, casques, gants pilote, pièces techniques, karting).",
    url: "https://sparacing.com/",
  },
];

// ── Sponsors publicitaires ────────────────────────────────────────
const SPONSORS: Sponsor[] = [
  {
    id: "xrun",
    name: "XRUN",
    tier: "gold",
    logo: "https://xrun.be/wp-content/uploads/2024/08/xrun-%C2%AElogo_whiteshadow.svg",
    tagline: "Un pas plus loin",
    description: "Spécialiste belge du running & outdoor — boutiques à Battice & Malmedy, staffées par des passionnés pour un conseil personnalisé.",
    discount: "-20% dans toutes les boutiques",
    url: "https://www.xrun.be",
    bgFrom: "#0d1b2a",
    bgTo: "#1b3a4b",
    accentColor: "#e85d04",
    textColor: "#ffffff",
    category: "Running & Outdoor",
    since: 2024,
  },
];

// ── Tiers ─────────────────────────────────────────────────────────
const TIERS = [
  { amount: 10, label: "Supporter", advantages: 1, icon: "❤️", popular: false },
  { amount: 15, label: "Fan", advantages: 2, icon: "⭐", popular: false },
  { amount: 20, label: "Ambassadeur", advantages: 3, icon: "📸", popular: false },
  { amount: 25, label: "Champion", advantages: 4, icon: "🏅", popular: true },
];


const BADGE_COLORS: Record<string, string> = {
  Elite: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Nationale: "bg-blue-100 text-blue-800 border-blue-200",
  National: "bg-blue-100 text-blue-800 border-blue-200",
  Espoir: "bg-green-100 text-green-800 border-green-200",
  Junior: "bg-pink-100 text-pink-800 border-pink-200",
  Aventure: "bg-orange-100 text-orange-800 border-orange-200",
};

// ── Helpers ────────────────────────────────────────────────────────
function FFCKLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-ffck.svg" alt="FFCK" className={className} />;
}

function SupSportLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-supsport.png" alt="SupSport" className={className} />;
}

function WaveBottom({ fill = "hsl(195,100%,99%)" }: { fill?: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 md:h-20" fill={fill}>
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}

function AnimBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  return (
    <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ background: "rgba(0,158,190,0.12)" }}>
      <motion.div className="h-2.5 rounded-full" style={{ background: "linear-gradient(90deg,#009EBE,#69C3D2)" }}
        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function ClubPage() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState(3);
  const [donationType, setDonationType] = useState<"monthly" | "once">("monthly");
  const [donationOption, setDonationOption] = useState<"athlete" | "club">("athlete");
  const [activePartners, setActivePartners] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const tier = TIERS[selectedTier];
  const clubPct = Math.round((CLUB.clubRaised / CLUB.clubGoal) * 100);

  const [oneTimeAmount, setOneTimeAmount] = useState(25);

  // Don unique : mêmes paliers qu'en mensuel
  const ONE_TIME_ADVANTAGES: Record<number, number> = { 10: 1, 15: 2, 20: 3, 25: 4 };
  const currentMaxAdvantages = donationType === "monthly" ? tier.advantages : (ONE_TIME_ADVANTAGES[oneTimeAmount] ?? 1);

  const clubSharePct = donationOption === "club" ? 0.05 : 0;
  function clubShare(amount: number) {
    return (amount * clubSharePct).toFixed(2).replace(".", ",");
  }

  function togglePartner(i: number) {
    const max = tier.advantages;
    setActivePartners(prev => {
      if (prev.includes(i)) return prev.filter(x => x !== i);
      if (prev.length >= max) return [...prev.slice(1), i];
      return [...prev, i];
    });
  }

  return (
    <div className="min-h-screen" style={{ background: "hsl(195,100%,99%)" }}>

      {/* ═══ NAV ════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#003d50]/95 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <FFCKLogo className="h-10 md:h-12 w-auto" />
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
              <a href="#avantages" className="hover:text-white transition-colors">Avantages</a>
              <a href="#athletes" className="hover:text-white transition-colors">Athlètes</a>
              <a href="#argent" className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold" style={{ color: "#69C3D2" }}>
                <ArrowDown className="w-3.5 h-3.5" />
                Où va votre don ?
              </a>
              <a href={CLUB.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                ffckayak.be <ExternalLink className="w-3 h-3" />
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <SupSportLogo className="hidden md:block h-5 w-auto" />
              <div className="hidden md:block w-px h-6 bg-white/20" />
              <a href="#soutenir" className="hidden md:block">
                <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-bold text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm" style={{ background: "#009EBE" }}>
                  <Heart className="w-4 h-4" /> Soutenir le club
                </button>
              </a>
              <button onClick={() => setMenuOpen(v => !v)} className="md:hidden text-white/70 hover:text-white transition-colors p-1" aria-label="Menu">
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden border-t border-white/10"
              style={{ background: "#002d3e" }}>
              <nav className="flex flex-col px-4 py-4 gap-1">
                {[
                  { href: "#avantages", label: "Avantages" },
                  { href: "#athletes", label: "Athlètes" },
                  { href: "#argent", label: "Votre argent", accent: true },
                ].map(link => (
                  <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
                    style={{ color: link.accent ? "#69C3D2" : "rgba(255,255,255,0.75)" }}>
                    {link.accent && <ArrowDown className="w-3.5 h-3.5" />}
                    {link.label}
                  </a>
                ))}
                <a href={CLUB.website} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-white/50 hover:bg-white/10 transition-colors">
                  ffckayak.be <ExternalLink className="w-3 h-3" />
                </a>
                <div className="pt-2">
                  <a href="#soutenir" onClick={() => setMenuOpen(false)}>
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white transition-all shadow-sm" style={{ background: "#009EBE" }}>
                      <Heart className="w-4 h-4" /> Soutenir le club
                    </button>
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-8 pb-24 md:pt-12 md:pb-32" style={{ background: "linear-gradient(135deg,#003d50 0%,#006880 50%,#009EBE 100%)" }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ background: "rgba(105,195,210,0.18)" }} />
        <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,56,0,0.07)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

            {/* Left */}
            <motion.div className="flex-1" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <FFCKLogo className="h-16 md:h-20 lg:h-24 w-auto mb-6 md:mb-8" />

              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/70 mb-5" style={{ background: "rgba(255,255,255,0.08)" }}>
                <Gift className="w-3.5 h-3.5" /> Avantages exclusifs pour les supporters
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Soutenez nos athlètes<br />
                <span style={{ color: "#69C3D2" }}>et gagnez des avantages</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-6 md:mb-8">
                En soutenant le FFCK, vous aidez {ATHLETES.length} athlètes belges à financer leurs compétitions
                — et vous accédez à des réductions exclusives chez {PARTNERS.length} partenaires sportifs.
              </p>

              {/* Proof example — caché sur mobile pour raccourcir le scroll avant la carte */}
              <div className="hidden md:block rounded-2xl p-4 md:p-5 mb-6 md:mb-8" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-3">Exemple — niveau Champion (€25/mois)</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-2 text-white/80"><span className="min-w-0 truncate">Chaussures trail chez Trakks</span><span className="line-through text-white/40 flex-shrink-0">€270</span></div>
                  <div className="flex justify-between gap-2 text-white/90 font-semibold"><span className="min-w-0">Prix avec remise -20%</span><span className="flex-shrink-0" style={{ color: "#69C3D2" }}>€216</span></div>
                  <div className="border-t border-white/10 my-2" />
                  <div className="flex justify-between gap-2 text-white/60"><span>Don mensuel</span><span className="flex-shrink-0">-€25</span></div>
                  <div className="flex justify-between gap-2 font-black text-lg" style={{ color: "#69C3D2" }}>
                    <span>Économie nette</span><span className="flex-shrink-0">+€29 🎉</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-white/50">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{CLUB.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Fondé en {CLUB.founded}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{CLUB.members} membres</span>
              </div>
            </motion.div>

            {/* Right: support card */}
            <motion.div id="soutenir" className="w-full lg:w-[410px] flex-shrink-0"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="rounded-[1.5rem] bg-white p-5 md:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.3)]">

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <span className="text-3xl font-black text-foreground">€{CLUB.clubRaised.toLocaleString("fr-BE")}</span>
                      <span className="text-muted-foreground text-sm ml-1.5">/ €{CLUB.clubGoal.toLocaleString("fr-BE")}</span>
                    </div>
                    <span className="font-bold text-sm" style={{ color: "#009EBE" }}>{clubPct}%</span>
                  </div>
                  <AnimBar pct={clubPct} delay={0.4} />
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />{ATHLETES.length} athlètes financés
                  </div>
                </div>

                {/* Don type toggle */}
                <div className="flex rounded-xl overflow-hidden border border-border mb-5">
                  {(["monthly", "once"] as const).map(type => (
                    <button key={type} onClick={() => setDonationType(type)}
                      className={`flex-1 py-2.5 text-sm font-semibold transition-all ${donationType === type ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
                      style={{ background: donationType === type ? "#009EBE" : "transparent" }}>
                      {type === "monthly" ? "🔄 Mensuel" : "💳 Don unique"}
                    </button>
                  ))}
                </div>

                {/* ── Répartition du don ── */}
                <div className="mb-5 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Répartition de votre don</p>
                  {[
                    { value: "athlete" as const, label: "Cagnotte des athlètes", sub: "100% versé dans la cagnotte collective, répartie entre tous nos athlètes" },
                    { value: "club" as const, label: "Athlètes + frais du club", sub: "95% cagnotte athlètes · 5% frais de fonctionnement du club" },
                  ].map(opt => (
                    <button key={opt.value} onClick={() => setDonationOption(opt.value)}
                      className="w-full flex items-start gap-3 rounded-xl p-3 text-left border transition-all"
                      style={{ background: donationOption === opt.value ? "rgba(0,158,190,0.06)" : "transparent", borderColor: donationOption === opt.value ? "#009EBE" : "#e5e7eb" }}>
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: donationOption === opt.value ? "#009EBE" : "#d1d5db" }}>
                        {donationOption === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "#009EBE" }} />}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {donationType === "monthly" ? (
                  <>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Choisir votre niveau</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {TIERS.map((t, i) => (
                        <button key={t.amount} onClick={() => setSelectedTier(i)}
                          className={`relative rounded-xl p-3 text-left border transition-all ${selectedTier === i ? "border-[#009EBE] bg-[#009EBE]/5" : "border-border hover:border-[#009EBE]/30"}`}>
                          {t.popular && <span className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "#009EBE" }}>Populaire</span>}
                          <div className="text-lg mb-1">{t.icon}</div>
                          <div className="font-bold text-foreground text-sm">{t.label}</div>
                          <div className="text-xs text-muted-foreground">€{t.amount}/mois</div>
                          <div className="text-xs font-semibold mt-1" style={{ color: "#009EBE" }}>
                            {t.advantages} avantage{t.advantages > 1 ? "s" : ""}
                          </div>
                          {donationOption === "club" && (
                            <div className="text-xs font-semibold mt-1" style={{ color: "#16a34a" }}>dont {clubShare(t.amount)}€/mois pour le club</div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-xl p-3 mb-5 text-xs text-muted-foreground leading-relaxed" style={{ background: "rgba(0,158,190,0.06)", border: "1px solid rgba(0,158,190,0.12)" }}>
                      <span className="font-semibold" style={{ color: "#009EBE" }}>✓ Avantages inclus : </span>
                      Choisissez {tier.advantages} remise{tier.advantages > 1 ? "s" : ""} partenaire{tier.advantages > 1 ? "s" : ""} parmi nos {PARTNERS.length} partenaires.
                    </div>
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm" style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}>
                      <Heart className="w-5 h-5" />
                      Devenir supporter — €{tier.amount}/mois
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-3">Annulable à tout moment · Paiement sécurisé</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Choisir votre niveau</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {TIERS.map((t, i) => (
                        <button key={t.amount} onClick={() => setOneTimeAmount(t.amount)}
                          className={`relative rounded-xl p-3 text-left border transition-all ${oneTimeAmount === t.amount ? "border-[#009EBE] bg-[#009EBE]/5" : "border-border hover:border-[#009EBE]/30"}`}>
                          {t.popular && <span className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "#009EBE" }}>Populaire</span>}
                          <div className="text-lg mb-1">{t.icon}</div>
                          <div className="font-bold text-foreground text-sm">{t.label}</div>
                          <div className="text-xs text-muted-foreground">€{t.amount} une fois</div>
                          <div className="text-xs font-semibold mt-1" style={{ color: "#009EBE" }}>
                            {t.advantages} avantage{t.advantages > 1 ? "s" : ""}
                          </div>
                          {donationOption === "club" && (
                            <div className="text-xs font-semibold mt-1" style={{ color: "#16a34a" }}>dont {clubShare(t.amount)}€ pour le club</div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-xl p-3 mb-5 text-xs text-muted-foreground leading-relaxed" style={{ background: "rgba(0,158,190,0.06)", border: "1px solid rgba(0,158,190,0.12)" }}>
                      <span className="font-semibold" style={{ color: "#009EBE" }}>✓ Avantages inclus : </span>
                      Choisissez {ONE_TIME_ADVANTAGES[oneTimeAmount] ?? 1} avantage{(ONE_TIME_ADVANTAGES[oneTimeAmount] ?? 1) > 1 ? "s" : ""} partenaire{(ONE_TIME_ADVANTAGES[oneTimeAmount] ?? 1) > 1 ? "s" : ""} parmi nos {PARTNERS.length} partenaires sportifs.
                    </div>
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm" style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}>
                      <Heart className="w-5 h-5" />
                      Faire un don de €{oneTimeAmount}
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-3">Paiement sécurisé · Reçu fiscal disponible</p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        <WaveBottom />
      </section>

      {/* ═══ STATS ══════════════════════════════════════════════════ */}
      <section className="border-b border-border/50 bg-white">
        <div className="container mx-auto px-4 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: ATHLETES.length, label: "athlètes financés", icon: <Trophy className="w-5 h-5" /> },
              { value: PARTNERS.length, label: "partenaires exclusifs", icon: <Gift className="w-5 h-5" /> },
              { value: `€${(CLUB.clubRaised / 1000).toFixed(1)}k`, label: "collectés", icon: <TrendingUp className="w-5 h-5" /> },
              { value: "jusqu'à €100", label: "d'économies/mois", icon: <Zap className="w-5 h-5" /> },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2 mx-auto" style={{ background: "rgba(0,158,190,0.1)", color: "#009EBE" }}>{s.icon}</div>
                <div className="text-2xl font-black text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPONSOR GOLD BANNER ════════════════════════════════════ */}
      {SPONSORS.filter(s => s.tier === "gold").length > 0 && (
        <section className="container mx-auto px-4 py-6 md:py-8">
          <div className="space-y-4">
            {SPONSORS.filter(s => s.tier === "gold").map(sponsor => (
              <GoldSponsorBanner key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </section>
      )}

      {/* ═══ WIN-WIN ════════════════════════════════════════════════ */}
      <section id="comment" className="container mx-auto px-4 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4" style={{ background: "rgba(0,158,190,0.08)", color: "#009EBE", borderColor: "rgba(0,158,190,0.2)" }}>
            <Zap className="w-3.5 h-3.5" /> Concept gagnant-gagnant
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Vous donnez. Vous gagnez aussi.</h2>
          <p className="text-muted-foreground text-base md:text-lg">En soutenant nos athlètes, vous accédez à des réductions exclusives chez nos partenaires sportifs. Votre don peut vous revenir dans la poche.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { step: "01", icon: <Heart className="w-6 h-6" style={{ color: "#009EBE" }} />, title: "Vous soutenez", desc: `Choisissez un don mensuel (€10–€25) ou un don unique. Votre argent est réparti entre nos ${ATHLETES.length} athlètes pour leurs compétitions, équipements et déplacements.` },
            { step: "02", icon: <Gift className="w-6 h-6" style={{ color: "#009EBE" }} />, title: "Vous choisissez vos avantages", desc: `Don mensuel ou unique, vous choisissez 1 à 4 avantages parmi nos ${PARTNERS.length} partenaires sportifs. Remises de 10% à 20%, fitness offert, coaching gratuit...` },
            { step: "03", icon: <Trophy className="w-6 h-6" style={{ color: "#009EBE" }} />, title: "Tout le monde gagne", desc: "Vous économisez sur vos achats sportifs. Nos athlètes performent au plus haut niveau. Nos partenaires accèdent à une communauté sportive engagée." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[1.5rem] border border-border/50 bg-card p-5 md:p-7 relative overflow-hidden">
              <span className="absolute top-5 right-5 text-6xl font-black opacity-5">{item.step}</span>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(0,158,190,0.1)" }}>{item.icon}</div>
              <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Concrete example */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-[2rem] overflow-hidden border border-border/50">
          <div className="px-5 py-4 md:px-8 md:py-6 border-b border-border/50" style={{ background: "linear-gradient(135deg,#003d50 0%,#009EBE 100%)" }}>
            <p className="text-white font-black text-base md:text-xl">Exemple concret — Niveau Champion (€25/mois)</p>
            <p className="text-white/60 text-sm mt-1">Vous choisissez 4 avantages partenaires</p>
          </div>
          <div className="bg-card p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div>
                <h4 className="font-bold text-foreground mb-5">Ce que vous économisez en 1 mois :</h4>
                <div className="space-y-3">
                  {[
                    { name: "Chaussures trail Trakks", original: 270, price: 216, saving: 54, pct: "20%" },
                    { name: "Séance Physiosport (récupération)", original: 50, price: 42.5, saving: 7.5, pct: "15%" },
                    { name: "Commande Nutri-bay", original: 80, price: 72, saving: 8, pct: "10%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(0,158,190,0.05)", border: "1px solid rgba(0,158,190,0.1)" }}>
                      <div><p className="font-semibold text-foreground text-sm">{item.name}</p><p className="text-muted-foreground text-xs">Prix original : €{item.original}</p></div>
                      <div className="text-right"><p className="font-black text-lg" style={{ color: "#009EBE" }}>€{item.price}</p><p className="text-xs text-green-600 font-semibold">-€{item.saving} (-{item.pct})</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg,rgba(0,158,190,0.08),rgba(0,158,190,0.03))", border: "1px solid rgba(0,158,190,0.15)" }}>
                  <h4 className="font-bold text-foreground mb-5">Le calcul final</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Économies sur vos achats</span><span className="font-bold text-green-600">+€69.50</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Votre don mensuel</span><span className="text-foreground/60">-€25</span></div>
                    <div className="border-t border-border/50 my-2" />
                    <div className="flex justify-between text-xl font-black" style={{ color: "#009EBE" }}>
                      <span>Économie nette</span><span>+€44.50 🎉</span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">Et vous aidez concrètement {ATHLETES.length} athlètes belges à performer au plus haut niveau.</p>
                  </div>
                </div>
                <a href="#soutenir">
                  <button className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 font-bold text-white hover:opacity-90 transition-all" style={{ background: "#009EBE" }}>
                    Devenir supporter maintenant <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ PARTNERS ═══════════════════════════════════════════════ */}
      <section id="avantages" style={{ background: "linear-gradient(180deg,#003d50 0%,#005a70 100%)" }} className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/70 mb-4" style={{ background: "rgba(255,255,255,0.08)" }}>
              <Gift className="w-3.5 h-3.5" /> {PARTNERS.length} partenaires exclusifs
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Vos avantages partenaires</h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">En tant que supporter FFCK, vous accédez à ces réductions chez nos partenaires sportifs.</p>
          </motion.div>

          {/* Tier selector — scroll horizontal sur mobile */}
          <div className="flex gap-3 overflow-x-auto pb-2 mb-8 md:flex-wrap md:justify-center md:overflow-visible md:pb-0 scrollbar-hide">
            {TIERS.map((t, i) => (
              <button key={t.amount} onClick={() => setSelectedTier(i)}
                className={`relative flex-shrink-0 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${selectedTier === i ? "text-white shadow-lg scale-105" : "text-white/60 hover:text-white/80"}`}
                style={{ background: selectedTier === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)", border: selectedTier === i ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.1)" }}>
                {t.popular && <span className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#69C3D2", color: "#003d50" }}>Populaire</span>}
                {t.icon} {t.label} · {t.advantages} avantage{t.advantages > 1 ? "s" : ""}
              </button>
            ))}
          </div>

          <p className="text-center text-white/50 text-sm mb-8">
            Niveau <strong className="text-white">{tier.label}</strong> : cliquez pour sélectionner vos {tier.advantages} avantage{tier.advantages > 1 ? "s" : ""}
            {activePartners.length > 0 && <span style={{ color: "#69C3D2" }}> · {activePartners.length}/{tier.advantages} sélectionné{activePartners.length > 1 ? "s" : ""}</span>}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PARTNERS.map((p, i) => {
              const selected = activePartners.includes(i);
              return (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  onClick={() => togglePartner(i)}
                  className={`rounded-[1.5rem] p-5 cursor-pointer transition-all duration-300 relative ${selected ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
                  style={{
                    background: selected ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
                    border: selected ? "1px solid rgba(105,195,210,0.6)" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: selected ? "0 8px 30px rgba(0,0,0,0.3)" : "none",
                  }}>
                  {selected && (
                    <span className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#69C3D2" }}>
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <p className="font-bold text-white text-sm">{p.name}</p>
                      <p className="text-white/40 text-xs">{p.category}</p>
                    </div>
                  </div>
                  <div className="rounded-lg px-3 py-2 mb-3 inline-block" style={{ background: "rgba(105,195,210,0.15)" }}>
                    <p className="font-black text-xs whitespace-pre-line" style={{ color: "#69C3D2" }}>{p.shortDiscount}</p>
                  </div>
                  {/* Exact description from SupSport */}
                  <p className="text-white/60 text-xs leading-relaxed">{p.fullDesc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 text-center">
            <a href="#soutenir">
              <button className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-base hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg" style={{ background: "#69C3D2", color: "#003d50" }}>
                <Heart className="w-5 h-5" />
                Accéder à ces avantages — dès €10/mois
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ ATHLETES ═══════════════════════════════════════════════ */}
      <section id="athletes" className="container mx-auto px-4 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">Nos athlètes</h2>
            <p className="text-muted-foreground text-base md:text-lg">Votre soutien finance directement leur passion</p>
          </div>
          <span className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500" />{ATHLETES.length} athlètes actifs cette saison
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ATHLETES.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }}>
              <div
                onClick={() => navigate(`/athlete/${a.id}`)}
                className="overflow-hidden rounded-[1.5rem] border border-border/50 bg-card hover:shadow-[0_20px_60px_rgba(0,158,190,0.18)] transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={a.photo} alt={a.name}
                    className={`w-full h-full object-cover ${a.pos} group-hover:scale-105 transition-transform duration-700`}
                    onError={e => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=500&fit=crop&q=80`;
                    }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">{a.sport}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${BADGE_COLORS[a.badge] ?? "bg-gray-100 text-gray-700"}`}>{a.badge}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg leading-tight">{a.name}</p>
                    <p className="text-white/65 text-sm flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{a.city}</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-foreground/75 text-sm leading-relaxed line-clamp-3">{a.desc}</p>
                  <div className="space-y-1.5">
                    {a.results.map((r, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Award className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />{r}
                      </div>
                    ))}
                  </div>
                  <div className="pt-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all" style={{ color: "#009EBE" }}>
                      Voir sa page <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ VOTRE ARGENT (anchor: #argent) ════════════════════════ */}
      <section id="argent" className="container mx-auto px-4 pb-12 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[2rem] overflow-hidden border border-border/50">
          <div className="px-5 py-4 md:px-8 md:py-6" style={{ background: "linear-gradient(135deg,#003d50 0%,#009EBE 100%)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-black text-xl md:text-2xl">Votre argent — où va-t-il ?</h2>
                <p className="text-white/60 text-sm mt-0.5">Transparence totale sur l'utilisation des fonds</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Répartition des fonds</h3>
                {[
                  { label: "Frais de compétition & inscriptions", pct: 40, detail: "Championnats de Belgique, Coupes du Monde ICF, Championnats d'Europe" },
                  { label: "Équipement (kayaks, pagaies, combinaisons)", pct: 30, detail: "Kayaks de compétition carbone, pagaies, équipement de sécurité" },
                  { label: "Déplacements & hébergements", pct: 20, detail: "Transports vers les compétitions européennes, hébergements" },
                  { label: "Entraînements & coaching", pct: 10, detail: "Stages de préparation, coaching technique et mental" },
                ].map((item, i) => (
                  <div key={i} className="mb-5">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="font-bold" style={{ color: "#009EBE" }}>{item.pct}%</span>
                    </div>
                    <AnimBar pct={item.pct} delay={0.3 + i * 0.1} />
                    <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-6">Nos engagements</h3>
                {[
                  { icon: "✅", text: "100% des fonds vont directement aux athlètes — zéro commission de gestion" },
                  { icon: "📊", text: "Rapport financier annuel disponible pour tous les supporters" },
                  { icon: "⚖️", text: "Budget réparti selon les besoins de chaque athlète et discipline" },
                  { icon: "🔍", text: "Suivi en temps réel de la collecte sur cette page" },
                  { icon: "🏆", text: "Priorité aux compétitions internationales (ChEuro, Coupes du Monde ICF)" },
                  { icon: "💬", text: "Newsletter mensuelle sur les résultats de vos athlètes" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(0,158,190,0.04)", border: "1px solid rgba(0,158,190,0.08)" }}>
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <p className="text-sm text-foreground/80 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════════ */}
      <footer style={{ background: "#003d50" }} className="text-white pt-12 pb-28 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <FFCKLogo className="h-10 w-auto mb-4" />
              <p className="text-white/40 text-sm leading-relaxed">{CLUB.fullName}<br />{CLUB.location} · Fondée en {CLUB.founded}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white/70">Navigation</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#avantages" className="hover:text-white transition-colors">Avantages partenaires</a></li>
                <li><a href="#athletes" className="hover:text-white transition-colors">Nos athlètes</a></li>
                <li><a href="#argent" className="hover:text-white transition-colors">Votre argent</a></li>
                <li><a href="#soutenir" className="hover:text-white transition-colors">Nous soutenir</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white/70">Contact</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="mailto:info@ffckayak.be" className="hover:text-white transition-colors">info@ffckayak.be</a></li>
                <li><a href={CLUB.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ffckayak.be</a></li>
              </ul>
              <div className="mt-5 flex items-center gap-2 text-white/25 text-xs">
                <ShieldCheck className="w-4 h-4" /> Paiements sécurisés via Stripe
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
            <p>© 2026 {CLUB.fullName}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/50 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white/50 transition-colors">Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ MOBILE STICKY ══════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-border md:hidden z-40">
        <a href="#soutenir">
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white transition-all shadow-lg" style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}>
            <Heart className="w-5 h-5" /> Soutenir le FFCK — dès €10 <ChevronRight className="w-4 h-4" />
          </button>
        </a>
      </div>
    </div>
  );
}
