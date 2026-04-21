import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Heart, Users, Share2, CheckCircle,
  Trophy, Target, Calendar,
  ShieldCheck, TrendingUp, MessageCircle,
} from "lucide-react";
import { ATHLETES } from "../data/athletes";

// Cagnotte globale du club (source unique de vérité)
const CLUB_RAISED = 11240;
const CLUB_GOAL = 18000;
const CLUB_SUPPORTERS = 143;

const TIERS = [
  { amount: 10, label: "Supporter", icon: "❤️", perks: "Accès 1 avantage partenaire" },
  { amount: 15, label: "Fan", icon: "⭐", perks: "Accès 2 avantages partenaires" },
  { amount: 20, label: "Ambassadeur", icon: "📸", perks: "Accès 3 avantages partenaires" },
  { amount: 25, label: "Champion", icon: "🏅", perks: "Accès 4 avantages partenaires", popular: true },
];

const BADGE_COLORS: Record<string, string> = {
  Elite: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Nationale: "bg-blue-100 text-blue-800 border-blue-200",
  National: "bg-blue-100 text-blue-800 border-blue-200",
  Espoir: "bg-green-100 text-green-800 border-green-200",
  Junior: "bg-pink-100 text-pink-800 border-pink-200",
  Aventure: "bg-orange-100 text-orange-800 border-orange-200",
};

function AnimBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  return (
    <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: "rgba(0,158,190,0.12)" }}>
      <motion.div
        className="h-3 rounded-full"
        style={{ background: "linear-gradient(90deg,#009EBE,#69C3D2)" }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(pct, 100)}%` }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}

function SupSportLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-supsport.png" alt="SupSport" className={className} />;
}

function FFCKLogo({ className = "" }: { className?: string }) {
  return <img src="/logo-ffck.svg" alt="FFCK" className={className} />;
}

export default function AthletePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const athlete = ATHLETES.find((a) => a.id === id);

  const [donationType, setDonationType] = useState<"monthly" | "once">("monthly");
  const [selectedTier, setSelectedTier] = useState(3);
  const [oneTimeAmount, setOneTimeAmount] = useState(25);
  const [donated, setDonated] = useState(false);
  const [shared, setShared] = useState(false);
  const donateRef = useRef<HTMLDivElement>(null);

  if (!athlete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-foreground">Athlète introuvable</p>
        <button onClick={() => navigate("/")} className="text-[#009EBE] underline">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const clubPct = Math.round((CLUB_RAISED / CLUB_GOAL) * 100);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  function scrollToDonate() {
    donateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: `Soutiens ${athlete.name} !`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }

  const currentAmount = donationType === "monthly" ? TIERS[selectedTier].amount : oneTimeAmount;

  return (
    <div className="min-h-screen" style={{ background: "hsl(195,100%,99%)" }}>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#003d50]/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="cursor-pointer">
              <FFCKLogo className="h-10 md:h-12 w-auto" />
            </button>
            <div className="w-px h-6 bg-white/20" />
            <SupSportLogo className="h-5 w-auto" />
          </div>
          <button
            onClick={scrollToDonate}
            className="inline-flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "#009EBE" }}
          >
            <Heart className="w-3.5 h-3.5" /> Soutenir
          </button>
        </div>
      </header>

      {/* ── HERO PHOTO ──────────────────────────────────────────────── */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src={athlete.photo}
          alt={athlete.name}
          className={`w-full h-full object-cover ${athlete.pos} scale-105`}
          style={{ filter: "brightness(0.75)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges sur la photo */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-black/40 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
            {athlete.sport}
          </span>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${BADGE_COLORS[athlete.badge] ?? "bg-gray-100 text-gray-700"}`}>
            {athlete.badge}
          </span>
        </div>

        {/* Nom + ville en bas de la photo */}
        <div className="absolute bottom-6 left-5 right-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{athlete.name}</h1>
            <div className="flex items-center gap-3 mt-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{athlete.city}</span>
              <span>·</span>
              <span>{athlete.age} ans</span>
              <span>·</span>
              <span>{athlete.sport}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ───────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">

          {/* ── COLONNE GAUCHE ── */}
          <div className="space-y-8">

            {/* Cagnotte globale mobile */}
            <div className="lg:hidden rounded-[1.5rem] border border-border/50 bg-white p-5 shadow-sm">
              <ClubFundCard
                pct={clubPct}
                onDonate={scrollToDonate}
                onShare={handleShare}
                shared={shared}
              />
            </div>

            {/* Story */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-black text-foreground mb-4">Mon histoire</h2>
              <div className="prose prose-sm max-w-none text-foreground/75 leading-relaxed space-y-4">
                {athlete.longDesc.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Objectifs financiers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-5">
                <Target className="w-5 h-5" style={{ color: "#009EBE" }} />
                <h2 className="text-2xl font-black text-foreground">À quoi servira votre don ?</h2>
              </div>
              <div className="space-y-3">
                {athlete.objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl p-4 border border-border/50"
                    style={{ background: "rgba(0,158,190,0.03)" }}
                  >
                    <span className="text-2xl flex-shrink-0">{obj.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{obj.label}</p>
                    </div>
                    <span className="font-black text-base flex-shrink-0" style={{ color: "#009EBE" }}>
                      €{obj.amount.toLocaleString("fr-BE")}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Palmarès */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h2 className="text-2xl font-black text-foreground">Palmarès</h2>
              </div>
              <div className="space-y-2">
                {athlete.results.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 border border-border/40 bg-white"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                    <span className="text-sm font-medium text-foreground">{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prochain événement */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: "linear-gradient(135deg,#003d50,#006880)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Calendar className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1">Prochain objectif</p>
                  <p className="text-white font-bold text-sm leading-relaxed">{athlete.nextEvent}</p>
                </div>
              </div>
            </motion.div>

            {/* Updates */}
            {athlete.updates.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
                <div className="flex items-center gap-2 mb-5">
                  <MessageCircle className="w-5 h-5" style={{ color: "#009EBE" }} />
                  <h2 className="text-2xl font-black text-foreground">Dernières nouvelles</h2>
                </div>
                <div className="space-y-4">
                  {athlete.updates.map((upd, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border/50 bg-white p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={athlete.photo}
                          alt={athlete.name}
                          className="w-8 h-8 rounded-full object-cover object-top flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-bold text-foreground">{athlete.name}</p>
                          <p className="text-xs text-muted-foreground">{upd.date}</p>
                        </div>
                      </div>
                      <p className="font-bold text-foreground mb-1">{upd.title}</p>
                      <p className="text-sm text-foreground/70 leading-relaxed">{upd.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── COLONNE DROITE (sticky) ── */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* Cagnotte globale desktop */}
              <div className="rounded-[1.5rem] border border-border/50 bg-white p-6 shadow-sm">
                <ClubFundCard
                  pct={clubPct}
                  onDonate={scrollToDonate}
                  onShare={handleShare}
                  shared={shared}
                />
              </div>

              {/* Garantie */}
              <div className="rounded-2xl border border-border/40 p-4 flex items-start gap-3" style={{ background: "rgba(0,158,190,0.04)" }}>
                <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#009EBE" }} />
                <div>
                  <p className="text-sm font-bold text-foreground">Don 100% sécurisé</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Paiement via Stripe · Annulable à tout moment · Reçu fiscal disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD DE DON (pleine largeur, en bas) ── */}
        <div ref={donateRef} className="mt-12 max-w-2xl mx-auto scroll-mt-28 md:scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.5rem] border border-border/50 bg-white shadow-[0_20px_60px_rgba(0,158,190,0.12)] p-6 md:p-8"
          >
            <h3 className="text-xl font-black text-foreground mb-5 flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: "#009EBE" }} />
              Soutenir {athlete.name}
            </h3>

            {/* Toggle mensuel / unique */}
            <div className="flex rounded-xl overflow-hidden border border-border mb-5">
              {(["monthly", "once"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setDonationType(type)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all ${donationType === type ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
                  style={{ background: donationType === type ? "#009EBE" : "transparent" }}
                >
                  {type === "monthly" ? "🔄 Mensuel" : "💳 Don unique"}
                </button>
              ))}
            </div>

            {/* Tiers */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Choisir votre niveau</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {TIERS.map((t, i) => {
                const selected = donationType === "monthly" ? selectedTier === i : oneTimeAmount === t.amount;
                return (
                  <button
                    key={t.amount}
                    onClick={() => {
                      if (donationType === "monthly") setSelectedTier(i);
                      else setOneTimeAmount(t.amount);
                    }}
                    className={`relative rounded-xl p-3 text-left border transition-all ${selected ? "border-[#009EBE] bg-[#009EBE]/5" : "border-border hover:border-[#009EBE]/30"}`}
                  >
                    {t.popular && (
                      <span className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "#009EBE" }}>
                        Populaire
                      </span>
                    )}
                    <div className="text-lg mb-1">{t.icon}</div>
                    <div className="font-bold text-foreground text-sm">{t.label}</div>
                    <div className="text-xs text-muted-foreground">
                      €{t.amount}{donationType === "monthly" ? "/mois" : " une fois"}
                    </div>
                    <div className="text-xs font-semibold mt-1" style={{ color: "#009EBE" }}>
                      {t.perks}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            {!donated ? (
              <button
                onClick={() => setDonated(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm"
                style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}
              >
                <Heart className="w-5 h-5" />
                {donationType === "monthly"
                  ? `Soutenir à €${currentAmount}/mois`
                  : `Faire un don de €${currentAmount}`}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full rounded-2xl py-4 text-center font-bold text-white"
                style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
              >
                ✓ Merci pour votre soutien ! 🎉
              </motion.div>
            )}

            <p className="text-center text-xs text-muted-foreground mt-3">
              {donationType === "monthly" ? "Annulable à tout moment · " : ""}Paiement sécurisé · Reçu fiscal disponible
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER MINIMAL ────────────────────────────────────────── */}
      <footer style={{ background: "#003d50" }} className="mt-16 pt-8 pb-28 md:pb-8 text-center">
        <SupSportLogo className="h-6 w-auto mx-auto mb-3 opacity-70" />
        <p className="text-white/30 text-xs">© 2026 SupSport · Paiements sécurisés via Stripe</p>
      </footer>

      {/* ── MOBILE STICKY CTA ─────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-border md:hidden z-40">
        <button
          onClick={scrollToDonate}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white transition-all shadow-lg"
          style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}
        >
          <Heart className="w-5 h-5" /> Soutenir {athlete.name.split(" ")[0]} — dès €10
        </button>
      </div>
    </div>
  );
}

// ── Cagnotte globale du club (même chiffres que la page d'accueil) ─
function ClubFundCard({
  pct,
  onDonate,
  onShare,
  shared,
}: {
  pct: number;
  onDonate: () => void;
  onShare: () => void;
  shared: boolean;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Cagnotte collective du club
        </p>
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-3xl font-black text-foreground">
              €{CLUB_RAISED.toLocaleString("fr-BE")}
            </span>
            <span className="text-muted-foreground text-sm ml-1.5">
              / €{CLUB_GOAL.toLocaleString("fr-BE")}
            </span>
          </div>
          <span className="font-bold text-sm" style={{ color: "#009EBE" }}>{pct}%</span>
        </div>
        <AnimBar pct={pct} delay={0.3} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl p-3" style={{ background: "rgba(0,158,190,0.06)" }}>
          <p className="text-xl font-black text-foreground">{CLUB_SUPPORTERS}</p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
            <Users className="w-3 h-3" /> supporters
          </p>
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(0,158,190,0.06)" }}>
          <p className="text-xl font-black text-foreground">
            €{(CLUB_GOAL - CLUB_RAISED).toLocaleString("fr-BE")}
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" /> encore nécessaires
          </p>
        </div>
      </div>

      <div className="rounded-xl p-3 text-xs text-muted-foreground leading-relaxed" style={{ background: "rgba(0,158,190,0.05)", border: "1px solid rgba(0,158,190,0.1)" }}>
        Votre don rejoint la cagnotte commune — répartie entre les {ATHLETES.length} athlètes selon leurs besoins.
      </div>

      <button
        onClick={onDonate}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 font-bold text-base text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm"
        style={{ background: "linear-gradient(135deg,#009EBE,#006880)" }}
      >
        <Heart className="w-5 h-5" /> Soutenir le club
      </button>

      <button
        onClick={onShare}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold text-sm border border-border hover:bg-muted/50 transition-all"
      >
        <Share2 className="w-4 h-4" />
        {shared ? "Lien copié !" : "Partager cette page"}
      </button>
    </div>
  );
}
