import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Users, Heart, ExternalLink, Award, Calendar,
  ChevronRight, Trophy, Target, CheckCircle, Star,
  TrendingUp, Gift, Zap, ShieldCheck, ArrowRight,
  Menu, X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoldSponsorBanner, type Sponsor } from "../components/SponsorBanner";
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

// ── Partners ──────────────────────────────────────────────────────
const PARTNERS = [
  { name: "Trakks", category: "Running & Outdoor", icon: "👟", shortDiscount: "-20%", fullDesc: "20% sur les vêtements et chaussures (hors accessoires, nutrition, librairie et électro, non cumulable avec d'autres promotions).", url: "https://www.trakks.be" },
  { name: "XRUN", category: "Running & Outdoor", icon: "🏃", shortDiscount: "-20%", fullDesc: "20% de réduction dans toutes les boutiques de Battice et Malmedy.", url: "https://www.xrun.be" },
  { name: "Nutri-bay", category: "Nutrition sportive", icon: "💊", shortDiscount: "-10%", fullDesc: "10% de réduction sur tout le site web Nutri-bay (running, trail, triathlon, cyclisme, natation).", url: "https://www.nutri-bay.com" },
  { name: "MJ Sport", category: "Équipement sportif", icon: "🏪", shortDiscount: "-15%", fullDesc: "15% sur les chaussures et 10% sur le textile dans les boutiques de Waremme et Rocourt (Nike, Adidas, running, tennis, padel, natation, fitness).", url: "https://www.mjsport.be" },
  { name: "Physiosport", category: "Santé & Performance", icon: "💆", shortDiscount: "-15%", fullDesc: "15% sur tous les services : récupération musculaire 90 min (50€ → 42,50€) et coaching sportif individuel 90 min (50€ → 42,50€).", url: "https://www.instagram.com/__physiosport__/" },
  { name: "Respire Sports", category: "Running & Cyclisme", icon: "🚴", shortDiscount: "-20%", fullDesc: "20% dans tout le magasin de Jalhay (sauf électronique) et 10% dans le magasin de vélo de Spa.", url: "https://www.respiresports.be" },
  { name: "Kineo Fitness", category: "Fitness & Wellness", icon: "🏋️", shortDiscount: "1 mois\noffert", fullDesc: "1 mois gratuit à l'achat d'un abonnement 12 mois. Valable dans les 7 centres en Wallonie (piscines 29°C, jacuzzis, saunas, hammams).", url: "https://www.kineo-fitness.com/" },
  { name: "Foodbag", category: "Nutrition & Bien-être", icon: "🥗", shortDiscount: "-€75", fullDesc: "75€ de réduction sur vos trois premières commandes (3 × 25€). Réservé aux nouveaux clients uniquement.", url: "https://www.foodbag.be" },
  { name: "IKIBA Sport", category: "Équipement sportif", icon: "🏑", shortDiscount: "jusqu'à\n-20%", fullDesc: "5% sur les sticks et chaussures, 10% sur le textile et accessoires, 20% sur les articles IKIBA (remises non cumulables).", url: "https://www.ikiba-sport.be/" },
  { name: "Altitude Training", category: "Équipement altitude", icon: "⛰️", shortDiscount: "-10%", fullDesc: "10% de réduction sur tout le matériel altitude (masques, tentes hypoxiques, générateurs altitude personnalisables).", url: "https://www.altitude-training.be" },
  { name: "Swiss Me Up", category: "Stages altitude", icon: "🇨🇭", shortDiscount: "Tarif\nspécial", fullDesc: "Tarif préférentiel sur les stages d'entraînement en altitude à Pontresina (Suisse). Note moyenne 9,2/10.", url: "https://www.swissmeup.ch" },
  { name: "Formyfit", category: "Coaching running", icon: "🏅", shortDiscount: "GRATUIT", fullDesc: "Coaching running 100% GRATUIT. Prix de base 120€, prix SupSport 50€, remboursement mutuelle 50€ = Gratuit !", url: "https://www.formyfit.com/fr/" },
  { name: "Spa Racing", category: "Équipement auto", icon: "🏎️", shortDiscount: "-12%", fullDesc: "12% de réduction à partir de 150€ d'achat en magasin (combinaisons, casques, gants pilote, pièces techniques, karting).", url: "https://sparacing.com/" },
];

// ── Sponsors ───────────────────────────────────────────────────────
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

// ── Sections ───────────────────────────────────────────────────────
const SECTION_NAMES = ["Accueil", "Concept", "Avantages", "Athlètes", "Transparence", "Contact"];
const SECTION_H = "calc(100vh - 4rem)";

// ── Helpers ────────────────────────────────────────────────────────
function FFCKLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-ffck.svg" alt="FFCK" className={className} />;
}
function SupSportLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-supsport.png" alt="SupSport" className={className} />;
}
function AnimBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  return (
    <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: "rgba(0,158,190,0.12)" }}>
      <motion.div className="h-2 rounded-full" style={{ background: "linear-gradient(90deg,#009EBE,#69C3D2)" }}
        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function ClubPage() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  const [selectedTier, setSelectedTier] = useState(3);
  const [donationType, setDonationType] = useState<"monthly" | "once">("monthly");
  const [donationOption, setDonationOption] = useState<"athlete" | "club">("athlete");
  const [activePartners, setActivePartners] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [oneTimeAmount, setOneTimeAmount] = useState(25);

  const tier = TIERS[selectedTier];
  const clubPct = Math.round((CLUB.clubRaised / CLUB.clubGoal) * 100);
  const ONE_TIME_ADVANTAGES: Record<number, number> = { 10: 1, 15: 2, 20: 3, 25: 4 };
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
  function scrollToSection(index: number) {
    const section = sectionRefs.current[index];
    const container = scrollRef.current;
    if (section && container) {
      container.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  // Track active section via scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setActiveSection(Math.max(0, Math.min(idx, SECTION_NAMES.length - 1)));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* ══ HEADER ════════════════════════════════════════════════════ */}
      <header className="flex-shrink-0 relative z-50 border-b border-white/10 bg-[#003d50]/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollToSection(0)}>
            <FFCKLogo className="h-10 md:h-12 w-auto" />
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
            <button onClick={() => scrollToSection(0)}
              className="hidden md:inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-bold text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm"
              style={{ background: "#009EBE" }}>
              <Heart className="w-4 h-4" /> Soutenir le club
            </button>
            <button onClick={() => setMenuOpen(v => !v)} className="md:hidden text-white/70 hover:text-white p-1">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown — floats over scroll content */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 overflow-hidden md:hidden border-t border-white/10 shadow-xl z-50"
              style={{ background: "#002d3e" }}>
              <nav className="flex flex-col px-4 py-3 gap-1">
                {SECTION_NAMES.map((label, i) => (
                  <button key={label} onClick={() => scrollToSection(i)}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-left hover:bg-white/10 transition-colors ${activeSection === i ? "text-white bg-white/8" : "text-white/70"}`}>
                    {label}
                  </button>
                ))}
                <div className="pt-2">
                  <button onClick={() => scrollToSection(0)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white"
                    style={{ background: "#009EBE" }}>
                    <Heart className="w-4 h-4" /> Soutenir le club
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══ SCROLL CONTAINER ══════════════════════════════════════════ */}
      <div ref={scrollRef} className="flex-1 overflow-y-scroll" style={{ scrollSnapType: "y mandatory" }}>

        {/* ────────────────────────────────────────────────────────────
            SECTION 1 — HERO
        ──────────────────────────────────────────────────────────── */}
        <section
          ref={el => { sectionRefs.current[0] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H }}
          className="relative flex items-center overflow-y-auto md:overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,#003d50 0%,#006880 50%,#009EBE 100%)" }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(105,195,210,0.15)" }} />
          <div className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,56,0,0.06)" }} />

          <div className="relative z-10 container mx-auto px-4 w-full py-6 md:py-0">
            <div className="flex flex-col lg:flex-row items-start gap-7 lg:gap-10">

              {/* Left */}
              <motion.div className="flex-1" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <FFCKLogo className="h-12 md:h-14 w-auto mb-4" />

                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/70 mb-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <Gift className="w-3.5 h-3.5" /> Avantages exclusifs pour les supporters
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">
                  Soutenez nos athlètes<br />
                  <span style={{ color: "#69C3D2" }}>et gagnez des avantages</span>
                </h1>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg mb-5">
                  En soutenant le FFCK, vous aidez {ATHLETES.length} athlètes belges à financer leurs compétitions — et vous accédez à des réductions exclusives chez {PARTNERS.length} partenaires sportifs.
                </p>

                {/* Stats chips */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
                  {[
                    { val: String(ATHLETES.length), label: "athlètes", icon: <Trophy className="w-4 h-4" /> },
                    { val: String(PARTNERS.length), label: "partenaires", icon: <Gift className="w-4 h-4" /> },
                    { val: `€${(CLUB.clubRaised / 1000).toFixed(1)}k`, label: "collectés", icon: <TrendingUp className="w-4 h-4" /> },
                    { val: "jusqu'à €100", label: "d'économies", icon: <Zap className="w-4 h-4" /> },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <span style={{ color: "#69C3D2" }}>{s.icon}</span>
                      <div>
                        <div className="text-white font-bold text-sm leading-none">{s.val}</div>
                        <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden md:flex flex-wrap gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{CLUB.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />Fondé en {CLUB.founded}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3 h-3" />{CLUB.members} membres</span>
                </div>
              </motion.div>

              {/* Right — Donation card */}
              <motion.div className="w-full lg:w-[375px] flex-shrink-0"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
                <div className="rounded-[1.5rem] bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.3)]">

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-end mb-1.5">
                      <div>
                        <span className="text-2xl font-black text-foreground">€{CLUB.clubRaised.toLocaleString("fr-BE")}</span>
                        <span className="text-muted-foreground text-xs ml-1">/ €{CLUB.clubGoal.toLocaleString("fr-BE")}</span>
                      </div>
                      <span className="font-bold text-sm" style={{ color: "#009EBE" }}>{clubPct}%</span>
                    </div>
                    <AnimBar pct={clubPct} delay={0.4} />
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />{ATHLETES.length} athlètes financés
                    </div>
                  </div>

                  {/* Don type */}
                  <div className="flex rounded-xl overflow-hidden border border-border mb-3">
                    {(["monthly", "once"] as const).map(type => (
                      <button key={type} onClick={() => setDonationType(type)}
                        className={`flex-1 py-2 text-xs font-semibold transition-all ${donationType === type ? "text-white" : "text-muted-foreground"}`}
                        style={{ background: donationType === type ? "#009EBE" : "transparent" }}>
                        {type === "monthly" ? "🔄 Mensuel" : "💳 Don unique"}
                      </button>
                    ))}
                  </div>

                  {/* Répartition */}
                  <div className="mb-3 space-y-1.5">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Répartition</p>
                    {[
                      { value: "athlete" as const, label: "Cagnotte des athlètes", sub: "100% versé dans la cagnotte collective" },
                      { value: "club" as const, label: "Athlètes + frais du club", sub: "95% athlètes · 5% frais club" },
                    ].map(opt => (
                      <button key={opt.value} onClick={() => setDonationOption(opt.value)}
                        className="w-full flex items-start gap-2.5 rounded-xl p-2.5 text-left border transition-all"
                        style={{ background: donationOption === opt.value ? "rgba(0,158,190,0.06)" : "transparent", borderColor: donationOption === opt.value ? "#009EBE" : "#e5e7eb" }}>
                        <span className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: donationOption === opt.value ? "#009EBE" : "#d1d5db" }}>
                          {donationOption === opt.value && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#009EBE" }} />}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{opt.label}</p>
                          <p className="text-[10px] text-muted-foreground">{opt.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Tier grid */}
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Choisir votre niveau</p>
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {TIERS.map((t, i) => {
                      const isSelected = donationType === "monthly" ? selectedTier === i : oneTimeAmount === t.amount;
                      return (
                        <button key={t.amount}
                          onClick={() => donationType === "monthly" ? setSelectedTier(i) : setOneTimeAmount(t.amount)}
                          className={`relative rounded-xl p-2.5 text-left border transition-all ${isSelected ? "border-[#009EBE] bg-[#009EBE]/5" : "border-border hover:border-[#009EBE]/30"}`}>
                          {t.popular && <span className="absolute -top-1.5 -right-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: "#009EBE" }}>Populaire</span>}
                          <div className="text-base mb-0.5">{t.icon}</div>
                          <div className="font-bold text-foreground text-xs">{t.label}</div>
                          <div className="text-[10px] text-muted-foreground">€{t.amount}{donationType === "monthly" ? "/mois" : " une fois"}</div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: "#009EBE" }}>{t.advantages} avantage{t.advantages > 1 ? "s" : ""}</div>
                          {donationOption === "club" && <div className="text-[9px] font-semibold mt-0.5" style={{ color: "#16a34a" }}>dont {clubShare(t.amount)}€ club</div>}
                        </button>
                      );
                    })}
                  </div>

                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-sm text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm"
                    style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}>
                    <Heart className="w-4 h-4" />
                    {donationType === "monthly" ? `Devenir supporter — €${tier.amount}/mois` : `Faire un don de €${oneTimeAmount}`}
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground mt-2">
                    {donationType === "monthly" ? "Annulable à tout moment · " : ""}Paiement sécurisé
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            SECTION 2 — CONCEPT
        ──────────────────────────────────────────────────────────── */}
        <section
          ref={el => { sectionRefs.current[1] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "hsl(195,100%,99%)" }}
          className="flex flex-col items-center justify-center overflow-y-auto md:overflow-hidden px-4"
        >
          <div className="container mx-auto max-w-5xl py-6 md:py-0">
            <motion.div className="text-center mb-7 md:mb-9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
                style={{ color: "#009EBE", borderColor: "rgba(0,158,190,0.2)", background: "rgba(0,158,190,0.08)" }}>
                <Zap className="w-3.5 h-3.5" /> Concept gagnant-gagnant
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">Vous donnez. Vous gagnez aussi.</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">En soutenant nos athlètes, vous accédez à des réductions exclusives chez nos partenaires sportifs. Votre don peut vous revenir dans la poche.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
              {[
                { step: "01", icon: <Heart className="w-5 h-5" style={{ color: "#009EBE" }} />, title: "Vous soutenez", desc: `Choisissez un don mensuel (€10–€25) ou unique. Votre argent est réparti entre nos ${ATHLETES.length} athlètes pour leurs compétitions, équipements et déplacements.` },
                { step: "02", icon: <Gift className="w-5 h-5" style={{ color: "#009EBE" }} />, title: "Vous choisissez vos avantages", desc: `Sélectionnez 1 à 4 avantages parmi nos ${PARTNERS.length} partenaires sportifs — remises de 10% à 20%, fitness offert, coaching gratuit...` },
                { step: "03", icon: <Trophy className="w-5 h-5" style={{ color: "#009EBE" }} />, title: "Tout le monde gagne", desc: "Vous économisez sur vos achats sportifs. Nos athlètes performent au plus haut niveau. Nos partenaires accèdent à une communauté sportive engagée." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-border/50 bg-card p-5 relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-5xl font-black opacity-5">{item.step}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(0,158,190,0.1)" }}>{item.icon}</div>
                  <h3 className="font-bold text-foreground text-base mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* XRUN sponsor banner */}
            {SPONSORS.filter(s => s.tier === "gold").length > 0 && (
              <div className="max-w-3xl mx-auto">
                {SPONSORS.filter(s => s.tier === "gold").map(sponsor => (
                  <GoldSponsorBanner key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            SECTION 3 — AVANTAGES PARTENAIRES
        ──────────────────────────────────────────────────────────── */}
        <section
          ref={el => { sectionRefs.current[2] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "linear-gradient(180deg,#003d50 0%,#005a70 100%)" }}
          className="flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex-shrink-0 container mx-auto px-4 pt-6 md:pt-8 pb-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-3">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/70 mb-2" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <Gift className="w-3.5 h-3.5" /> {PARTNERS.length} partenaires exclusifs
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Vos avantages partenaires</h2>
                <p className="text-white/50 text-xs md:text-sm mt-0.5">En tant que supporter FFCK, accédez à ces réductions chez nos partenaires.</p>
              </div>
              {/* Tier selector */}
              <div className="flex gap-2 overflow-x-auto pb-1 md:flex-shrink-0" style={{ scrollbarWidth: "none" }}>
                {TIERS.map((t, i) => (
                  <button key={t.amount} onClick={() => setSelectedTier(i)}
                    className={`relative flex-shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${selectedTier === i ? "text-white scale-105" : "text-white/50 hover:text-white/75"}`}
                    style={{ background: selectedTier === i ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)", border: selectedTier === i ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.1)" }}>
                    {t.popular && <span className="absolute -top-1.5 -right-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "#69C3D2", color: "#003d50" }}>Top</span>}
                    {t.icon} {t.label} · {t.advantages}✓
                  </button>
                ))}
              </div>
            </div>
            <p className="text-white/40 text-xs">
              Niveau <strong className="text-white/65">{tier.label}</strong> — cliquez pour sélectionner vos {tier.advantages} avantage{tier.advantages > 1 ? "s" : ""}
              {activePartners.length > 0 && <span style={{ color: "#69C3D2" }}> · {activePartners.length}/{tier.advantages} sélectionné{activePartners.length > 1 ? "s" : ""}</span>}
            </p>
          </div>

          {/* Scrollable grid */}
          <div className="flex-1 overflow-y-auto container mx-auto px-4 pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
              {PARTNERS.map((p, i) => {
                const selected = activePartners.includes(i);
                return (
                  <motion.div key={p.name}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.025 }}
                    onClick={() => togglePartner(i)}
                    className={`rounded-2xl p-3.5 cursor-pointer transition-all duration-300 relative ${selected ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
                    style={{
                      background: selected ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
                      border: selected ? "1px solid rgba(105,195,210,0.6)" : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: selected ? "0 6px 24px rgba(0,0,0,0.25)" : "none",
                    }}>
                    {selected && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#69C3D2" }}>
                        <CheckCircle className="w-3 h-3 text-white" />
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl flex-shrink-0">{p.icon}</span>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-xs truncate">{p.name}</p>
                        <p className="text-white/40 text-[10px] truncate">{p.category}</p>
                      </div>
                    </div>
                    <div className="rounded-lg px-2 py-1 mb-2 inline-block" style={{ background: "rgba(105,195,210,0.15)" }}>
                      <p className="font-black text-[10px] whitespace-pre-line" style={{ color: "#69C3D2" }}>{p.shortDiscount}</p>
                    </div>
                    <p className="text-white/50 text-[10px] leading-relaxed line-clamp-2">{p.fullDesc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0 container mx-auto px-4 py-3 text-center">
            <button onClick={() => scrollToSection(0)}
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 font-bold text-sm hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg"
              style={{ background: "#69C3D2", color: "#003d50" }}>
              <Heart className="w-4 h-4" />
              Accéder à ces avantages — dès €10/mois
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            SECTION 4 — ATHLÈTES
        ──────────────────────────────────────────────────────────── */}
        <section
          ref={el => { sectionRefs.current[3] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "hsl(195,100%,99%)" }}
          className="flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex-shrink-0 container mx-auto px-4 pt-6 md:pt-8 pb-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1">Nos athlètes</h2>
                <p className="text-muted-foreground text-sm">Votre soutien finance directement leur passion</p>
              </div>
              <span className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                <Star className="w-3.5 h-3.5 text-yellow-500" />{ATHLETES.length} athlètes actifs cette saison
              </span>
            </div>
          </div>

          {/* Scrollable grid */}
          <div className="flex-1 overflow-y-auto container mx-auto px-4 pb-4" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {ATHLETES.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  onClick={() => navigate(`/athlete/${a.id}`)}
                  className="overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-[0_16px_48px_rgba(0,158,190,0.15)] transition-all duration-500 hover:-translate-y-1 cursor-pointer group">
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <img src={a.photo} alt={a.name}
                      className={`w-full h-full object-cover ${a.pos} group-hover:scale-105 transition-transform duration-700`}
                      onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=500&fit=crop&q=80"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold text-white">{a.sport}</span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold ${BADGE_COLORS[a.badge] ?? "bg-gray-100 text-gray-700"}`}>{a.badge}</span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <p className="text-white font-bold text-sm leading-tight">{a.name}</p>
                      <p className="text-white/60 text-xs flex items-center gap-0.5 mt-0.5"><MapPin className="w-2.5 h-2.5" />{a.city}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-foreground/70 text-xs leading-relaxed line-clamp-2 mb-2">{a.desc}</p>
                    <div className="space-y-0.5 mb-2">
                      {a.results.slice(0, 1).map((r, j) => (
                        <div key={j} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Award className="w-3 h-3 text-yellow-500 flex-shrink-0" />{r}
                        </div>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[10px] font-semibold group-hover:gap-1.5 transition-all" style={{ color: "#009EBE" }}>
                      Voir sa page <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            SECTION 5 — TRANSPARENCE
        ──────────────────────────────────────────────────────────── */}
        <section
          ref={el => { sectionRefs.current[4] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H }}
          className="flex flex-col items-center justify-center overflow-y-auto md:overflow-hidden px-4"
        >
          <div className="container mx-auto max-w-5xl py-6 md:py-0">
            <div className="rounded-[2rem] overflow-hidden border border-border/50">
              <div className="px-5 py-4 md:px-8 md:py-5" style={{ background: "linear-gradient(135deg,#003d50 0%,#009EBE 100%)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-xl md:text-2xl">Votre argent — où va-t-il ?</h2>
                    <p className="text-white/60 text-xs md:text-sm mt-0.5">Transparence totale sur l'utilisation des fonds</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-5 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Répartition des fonds</h3>
                    {[
                      { label: "Frais de compétition & inscriptions", pct: 40, detail: "Championnats de Belgique, Coupes du Monde ICF, Championnats d'Europe" },
                      { label: "Équipement (kayaks, pagaies, combinaisons)", pct: 30, detail: "Kayaks de compétition carbone, pagaies, équipement de sécurité" },
                      { label: "Déplacements & hébergements", pct: 20, detail: "Transports vers les compétitions européennes, hébergements" },
                      { label: "Entraînements & coaching", pct: 10, detail: "Stages de préparation, coaching technique et mental" },
                    ].map((item, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between text-xs md:text-sm mb-1">
                          <span className="font-medium text-foreground">{item.label}</span>
                          <span className="font-bold flex-shrink-0 ml-2" style={{ color: "#009EBE" }}>{item.pct}%</span>
                        </div>
                        <AnimBar pct={item.pct} delay={0.3 + i * 0.1} />
                        <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Nos engagements</h3>
                    <div className="space-y-2.5">
                      {[
                        { icon: "✅", text: "100% des fonds vont directement aux athlètes — zéro commission de gestion" },
                        { icon: "📊", text: "Rapport financier annuel disponible pour tous les supporters" },
                        { icon: "⚖️", text: "Budget réparti selon les besoins de chaque athlète et discipline" },
                        { icon: "🔍", text: "Suivi en temps réel de la collecte sur cette page" },
                        { icon: "🏆", text: "Priorité aux compétitions internationales (ChEuro, Coupes du Monde ICF)" },
                        { icon: "💬", text: "Newsletter mensuelle sur les résultats de vos athlètes" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: "rgba(0,158,190,0.04)", border: "1px solid rgba(0,158,190,0.08)" }}>
                          <span className="text-sm flex-shrink-0">{item.icon}</span>
                          <p className="text-xs text-foreground/80 leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            SECTION 6 — CONTACT / FOOTER
        ──────────────────────────────────────────────────────────── */}
        <section
          ref={el => { sectionRefs.current[5] = el; }}
          style={{ scrollSnapAlign: "start", height: SECTION_H, background: "#003d50" }}
          className="flex flex-col items-center justify-center text-white overflow-y-auto md:overflow-hidden px-4"
        >
          <div className="container mx-auto max-w-4xl py-6 md:py-0">
            {/* Logo */}
            <div className="text-center mb-8 md:mb-10">
              <FFCKLogo className="h-12 w-auto mx-auto mb-3" />
              <p className="text-white/35 text-sm">{CLUB.fullName}<br />{CLUB.location} · Fondée en {CLUB.founded}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4 text-white/60 text-xs uppercase tracking-wide">Navigation</h4>
                <ul className="space-y-2 text-sm text-white/40">
                  {SECTION_NAMES.slice(0, -1).map((label, i) => (
                    <li key={label}>
                      <button onClick={() => scrollToSection(i)} className="hover:text-white transition-colors text-left">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4 text-white/60 text-xs uppercase tracking-wide">Nos partenaires</h4>
                <ul className="space-y-2 text-sm text-white/40">
                  {PARTNERS.slice(0, 6).map(p => (
                    <li key={p.name}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{p.name}</a>
                    </li>
                  ))}
                  {PARTNERS.length > 6 && <li className="text-white/25 text-xs">+{PARTNERS.length - 6} autres partenaires...</li>}
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4 text-white/60 text-xs uppercase tracking-wide">Contact</h4>
                <ul className="space-y-2 text-sm text-white/40">
                  <li><a href="mailto:info@ffckayak.be" className="hover:text-white transition-colors">info@ffckayak.be</a></li>
                  <li>
                    <a href={CLUB.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                      ffckayak.be <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
                <div className="mt-5 flex items-center gap-2 text-white/25 text-xs justify-center md:justify-start">
                  <ShieldCheck className="w-4 h-4" /> Paiements sécurisés via Stripe
                </div>
                <div className="mt-3">
                  <button onClick={() => scrollToSection(0)}
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-all"
                    style={{ background: "#009EBE" }}>
                    <Heart className="w-4 h-4" /> Soutenir maintenant
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
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

      {/* ══ NAV DOTS (desktop) ════════════════════════════════════════ */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 p-2 rounded-full"
        style={{ background: "rgba(0,0,0,0.12)", backdropFilter: "blur(8px)" }}>
        {SECTION_NAMES.map((label, i) => (
          <button key={label} onClick={() => scrollToSection(i)} title={label}
            className="relative group flex items-center gap-2 justify-end">
            {/* Tooltip */}
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-medium px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none"
              style={{ background: "rgba(0,40,55,0.95)", color: "rgba(255,255,255,0.85)" }}>
              {label}
            </span>
            {/* Dot */}
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
