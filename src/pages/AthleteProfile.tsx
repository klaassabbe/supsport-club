import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Heart, Award, Share2, ExternalLink, Users, CheckCircle, Target, ChevronRight, Trophy, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const PHOTOS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Portret_Karel_Sabbe.jpg/330px-Portret_Karel_Sabbe.jpg",
  "https://karelsabbe.com/wp-content/uploads/2024/09/i-S5dPVVD-4K.jpg",
  "https://karelsabbe.com/wp-content/uploads/2024/09/karel-mountain-3-845x684-1.jpg",
  "https://karelsabbe.com/wp-content/uploads/2024/11/IMG-20250216-WA0037.jpg",
];

const ATHLETES: Record<string, {
  id: string; name: string; sport: string; city: string;
  subtitle: string; story: string; goal: number; raised: number;
  supporters: number; results: string[];
  objectives: string[]; expenses: { label: string; amount: number }[];
}> = {
  "1": {
    id: "1", name: "Klaas Sabbe", sport: "Descente K1 Hommes", city: "Namur",
    subtitle: "2x Champion d'Europe · Finaliste JO Paris 2024",
    story: `Je m'appelle Klaas Sabbe et depuis l'âge de 12 ans, je vis pour la descente en eaux vives. Le bruit des rapides, l'adrénaline des virages serrés, la précision technique qu'exige la K1 — tout cela définit qui je suis.

Ces dernières années, j'ai eu la chance de représenter la Belgique à travers toute l'Europe. Deux titres de champion d'Europe et une finale aux Jeux Olympiques de Paris 2024 sont des moments que je chéris profondément.

Mais la réalité d'un athlète de haut niveau, c'est que derrière les médailles se cachent des sacrifices immenses : des heures d'entraînement, des déplacements coûteux, du matériel de compétition haut de gamme. Votre soutien me permet de me concentrer sur l'essentiel : performer au plus haut niveau.

Ensemble, visons l'or aux prochains Championnats du Monde !`,
    goal: 4500, raised: 3240, supporters: 42,
    results: ["2x Champion d'Europe Descente K1", "Finaliste JO Paris 2024", "Champion de Belgique 2023", "Vainqueur Coupe du Monde Augsburg 2022", "Recordman national Descente K1"],
    objectives: [
      "Participer aux Championnats du Monde de Descente 2026",
      "Financer les stages d'entraînement en altitude (Autriche, Suisse)",
      "Renouveler mon équipement de compétition (kayak K1 carbone)",
      "Couvrir les déplacements sur les Coupes du Monde ICF",
    ],
    expenses: [
      { label: "Équipement (kayak K1 carbone)", amount: 1800 },
      { label: "Déplacements Coupes du Monde", amount: 1500 },
      { label: "Stages d'entraînement", amount: 800 },
      { label: "Frais de compétition & licences", amount: 400 },
    ],
  },
  "2": {
    id: "2", name: "Klaas Sabbe", sport: "Slalom C1 Hommes", city: "Liège",
    subtitle: "Champion de Belgique · Espoir national",
    story: `Le slalom, c'est un sport de précision et de lecture de l'eau. Chaque porte est un défi mental et physique.

Cette saison, je vise le top 10 mondial du circuit ICF. Pour y arriver, j'ai besoin de participer à toutes les Coupes du Monde, ce qui représente un budget conséquent.

Votre soutien me donne les ailes pour aller chercher ces places dans l'élite mondiale. Chaque euro compte et me rapproche de mon objectif !`,
    goal: 2800, raised: 1950, supporters: 28,
    results: ["Champion de Belgique Slalom C1 2024", "3e Coupe d'Europe 2023", "Meilleur espoir FFCK 2023", "Finaliste Coupe du Monde Tacen", "Recordman junior Belgique Slalom"],
    objectives: [
      "Intégrer le top 10 mondial du circuit ICF Slalom",
      "Participer à l'ensemble des Coupes du Monde 2026",
      "Stage de préparation mentale avec un coach spécialisé",
      "Renouveler le canoë C1 de compétition",
    ],
    expenses: [
      { label: "Canoë C1 de compétition", amount: 1200 },
      { label: "Coupes du Monde ICF (4 étapes)", amount: 900 },
      { label: "Coaching mental & tactique", amount: 400 },
      { label: "Frais divers (licences, équipement)", amount: 300 },
    ],
  },
  "3": {
    id: "3", name: "Klaas Sabbe", sport: "Sprint K4 Hommes", city: "Bruxelles",
    subtitle: "Équipe nationale · Médaille d'argent ChEuro K4",
    story: `Le sprint en kayak, c'est la quête de la milliseconde. En K4, on est quatre pagayeurs qui ne font plus qu'un.

Notre équipe s'est qualifiée pour les Championnats du Monde et vise une médaille. Mais les stages de préparation intensifs et les régates de qualification ont un coût élevé.

Votre soutien nous aide à nous préparer dans les meilleures conditions. Merci de croire en nous !`,
    goal: 3200, raised: 2800, supporters: 37,
    results: ["Médaille d'argent ChEuro K4 2024", "Champion de Belgique K4 2023-24", "Sélection JO 2024", "Finaliste Coupe du Monde Szeged", "4x Sélectionné équipe nationale"],
    objectives: [
      "Remporter une médaille aux Championnats du Monde K4",
      "Stage de préparation en Hongrie (centre olympique)",
      "Financer les régates de qualification internationales",
      "Acquisition d'un K4 de compétition neuf",
    ],
    expenses: [
      { label: "K4 de compétition (part individuelle)", amount: 1400 },
      { label: "Stage Hongrie (10 jours)", amount: 950 },
      { label: "Régates de qualification", amount: 600 },
      { label: "Équipement & licences", amount: 250 },
    ],
  },
};

const DEFAULT_ATHLETE = ATHLETES["1"];

const PERKS = [
  { amount: 10, label: "Supporter", desc: "Ton nom dans la liste officielle des supporters", icon: "❤️" },
  { amount: 25, label: "Fan", desc: "Message de remerciement personnalisé + liste supporters", icon: "⭐" },
  { amount: 50, label: "Ambassadeur", desc: "Story Instagram dédicacée + tous les avantages Fan", icon: "📸" },
  { amount: 100, label: "Champion", desc: "Appel vidéo 15 min + contenu exclusif + tous avantages", icon: "🏅" },
];

function ProgressBar({ raised, goal, delay = 0 }: { raised: number; goal: number; delay?: number }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
      <motion.div
        className="h-3 rounded-full bg-gradient-to-r from-primary to-primary/70"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </div>
  );
}

export default function AthleteProfile() {
  const { athleteId } = useParams<{ athleteId: string }>();
  const athlete = ATHLETES[athleteId ?? "1"] ?? DEFAULT_ATHLETE;
  const photoIndex = parseInt(athleteId ?? "1") - 1;
  const pct = Math.min(100, Math.round((athlete.raised / athlete.goal) * 100));

  return (
    <div className="min-h-screen" style={{ background: "hsl(160, 100%, 99%)" }}>
      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/40 backdrop-blur-2xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/club/ffck-kayak"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour au club FFCK</span>
            </Link>

            <Link to="/" className="flex items-center gap-2">
              <span className="text-primary font-black text-xl tracking-tight">SupSport</span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-lg">Club</span>
            </Link>

            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partager</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-8 pb-16" style={{ background: "linear-gradient(180deg, hsl(160, 100%, 99%) 0%, hsl(217, 90%, 97%) 100%)" }}>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(255,56,0,0.04)" }} />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Left: photo + info */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge className="bg-primary/10 text-primary border-primary/20 border">
                  {athlete.sport}
                </Badge>
                <Badge className="bg-muted text-muted-foreground border border-border">
                  FFCK Kayak Belgique
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  {athlete.city}
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-2 tracking-tight">
                {athlete.name}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">{athlete.subtitle}</p>

              {/* Large photo */}
              <div className="relative rounded-[2rem] overflow-hidden max-h-[480px]">
                <img
                  src={PHOTOS[photoIndex % PHOTOS.length]}
                  alt={athlete.name}
                  className="w-full h-[400px] md:h-[480px] object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Klaas+Sabbe&background=0252F1&color=fff&size=800`;
                  }}
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold text-sm">{athlete.results[0]}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: support sidebar — sticky */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:sticky lg:top-24 space-y-5"
            >
              {/* Progress card */}
              <div className="rounded-[1.5rem] border border-border/50 bg-card p-6 shadow-[0_8px_30px_-8px_rgba(2,82,241,0.06)]">
                <div className="mb-5">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <span className="text-4xl font-black text-foreground">
                        €{athlete.raised.toLocaleString("fr-BE")}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1.5">/ €{athlete.goal.toLocaleString("fr-BE")}</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{pct}%</span>
                  </div>
                  <ProgressBar raised={athlete.raised} goal={athlete.goal} delay={0.3} />
                  <div className="flex items-center gap-1.5 mt-2.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{athlete.supporters} supporters</span>
                  </div>
                </div>

                {/* Perks */}
                <div className="space-y-2 mb-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Choisir un montant
                  </p>
                  {PERKS.map((perk) => (
                    <button
                      key={perk.amount}
                      className="w-full text-left border border-border hover:border-primary hover:bg-primary/5 rounded-xl p-3 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">{perk.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground text-sm">{perk.label}</span>
                            <span className="font-black text-primary text-sm">€{perk.amount}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{perk.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent text-accent-foreground font-bold py-4 text-base hover:bg-accent/90 hover:scale-[1.01] shadow-sm transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  Soutenir {athlete.name.split(" ")[0]}
                </button>

                <p className="text-center text-xs text-muted-foreground mt-3">
                  Paiement sécurisé via Stripe · Annulable à tout moment
                </p>
              </div>

              {/* Advantages teaser */}
              <div className="rounded-[1.5rem] border border-primary/10 bg-primary/5 p-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
                  Avantages SupSport inclus
                </p>
                {["10-20% de réduction chez les partenaires sportifs", "Accès aux contenus exclusifs des athlètes", "Badge supporter officiel SupSport"].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 mb-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {a}
                  </div>
                ))}
                <a href="https://www.supsport.be/avantages" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 mt-3">
                  Voir tous les avantages <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BIO & GOALS ── */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-8">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-card)]"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Mon histoire</h2>
            <div className="space-y-4">
              {athlete.story.split("\n\n").map((para, i) => (
                <p key={i} className="text-foreground/80 text-base leading-relaxed">{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-[1.5rem] p-8"
            style={{ background: "linear-gradient(135deg, rgba(2,82,241,0.05) 0%, hsl(160,100%,99%) 100%)" }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Mes objectifs
            </h2>
            <div className="space-y-4 mb-8">
              {athlete.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed pt-1">{obj}</p>
                </div>
              ))}
            </div>

            {/* Expense breakdown */}
            <h3 className="text-base font-bold text-foreground mb-4">Utilisation des fonds</h3>
            <div className="space-y-3">
              {athlete.expenses.map((exp, i) => {
                const expPct = Math.round((exp.amount / athlete.goal) * 100);
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground/70">{exp.label}</span>
                      <span className="font-semibold text-foreground">€{exp.amount.toLocaleString("fr-BE")}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-1.5 rounded-full bg-primary/40"
                        initial={{ width: 0 }}
                        animate={{ width: `${expPct}%` }}
                        transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WIN-WIN BANNER ── */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-[2rem] p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(2,82,241,0.05) 0%, hsl(160,100%,99%) 50%, rgba(255,56,0,0.05) 100%)" }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 border">
              Modèle gagnant-gagnant
            </Badge>
            <h3 className="text-2xl font-black text-foreground mb-3">
              Vous soutenez Klaas, vous gagnez aussi
            </h3>
            <p className="text-muted-foreground mb-8">
              En tant que supporter SupSport, vous accédez à des avantages exclusifs chez nos partenaires sportifs partout en Belgique.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] border border-border/50 bg-card p-6 text-left shadow-[var(--shadow-card)]">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-bold text-foreground mb-2">Pour l'athlète</h4>
                <p className="text-sm text-muted-foreground">Financement pour se concentrer sur la performance, sans pression financière.</p>
              </div>
              <div className="rounded-[1.5rem] border border-border/50 bg-card p-6 text-left shadow-[var(--shadow-card)]">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">Pour vous</h4>
                <p className="text-sm text-muted-foreground">10-20% de réduction chez les partenaires sportifs + accès aux contenus exclusifs.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── PALMARES ── */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-[1.5rem] border border-border/50 bg-card p-8 shadow-[var(--shadow-card)]"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Palmarès
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {athlete.results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{r}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-border lg:hidden z-40">
        <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent text-accent-foreground font-bold py-4 text-base hover:bg-accent/90 transition-all shadow-lg">
          <Heart className="w-5 h-5" />
          Soutenir {athlete.name.split(" ")[0]} — dès €10
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl">SupSport</span>
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-lg">Club</span>
            <span className="text-white/40 text-sm">· Powered by supsport.be</span>
          </div>
          <Link
            to="/club/ffck-kayak"
            className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au club FFCK
          </Link>
        </div>
      </footer>
    </div>
  );
}
