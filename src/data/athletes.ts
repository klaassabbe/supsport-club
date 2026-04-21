export interface AthleteUpdate {
  date: string;
  title: string;
  text: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  city: string;
  badge: string;
  desc: string;
  results: string[];
  photo: string;
  pos: string;
  age: number;
  longDesc: string;
  objectives: { icon: string; label: string; amount: number }[];
  updates: AthleteUpdate[];
  nextEvent: string;
  instagram?: string;
}

export const ATHLETES: Athlete[] = [
  {
    id: "1",
    name: "Thomas Debelle",
    sport: "Descente K1",
    city: "Namur",
    badge: "Elite",
    age: 24,
    desc: "Spécialiste de la descente en eaux vives, Thomas dévale les rapides à plus de 30 km/h. Double champion de Belgique K1, il se prépare pour les Championnats d'Europe 2026.",
    longDesc: `Thomas a commencé le kayak à l'âge de 8 ans sur la Lesse, poussé par son père lui-même ancien compétiteur. Aujourd'hui à 24 ans, il est l'un des meilleurs descendeurs belges en K1 et représente son pays sur le circuit international ICF.\n\nLa saison 2026 est cruciale : les Championnats d'Europe se tiennent en juillet à Augsbourg, le spot le plus technique du circuit. Thomas s'entraîne 6 jours sur 7, alterne travail physique en salle et sessions sur l'eau pour affiner sa lecture des rapides.\n\nChaque euro récolté ici lui permet de financer ses déplacements, son matériel de compétition (un kayak carbone de descente coûte entre 2 500 et 3 500 €) et ses stages de préparation en France et en Allemagne.`,
    objectives: [
      { icon: "✈️", label: "Déplacements ChEuro Augsbourg", amount: 1200 },
      { icon: "🚣", label: "Kayak carbone K1 descente", amount: 2800 },
      { icon: "🏋️", label: "Coaching physique & mental (6 mois)", amount: 900 },
      { icon: "🏕️", label: "Stage préparation France (La Bourboule)", amount: 650 },
    ],
    results: ["2× Champion de Belgique K1", "5e Coupe du Monde ICF"],
    photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=900&fit=crop&q=80",
    pos: "object-center",
    goal: 5550,
    raised: 3820,
    supporters: 47,
    nextEvent: "Coupe du Monde ICF — La Seu d'Urgell (ESP) · 14 juin 2026",
    instagram: "https://www.instagram.com/xrun_malmedy/",
    updates: [
      {
        date: "12 avril 2026",
        title: "Retour du stage en Ardèche",
        text: "Une semaine intense sur les gorges de l'Ardèche. Les sensations sont excellentes, je suis dans le bon rythme avant la Coupe du Monde. Merci à tous pour votre soutien !",
      },
      {
        date: "2 mars 2026",
        title: "Médaille d'argent aux sélections nationales",
        text: "Deuxième place aux sélections belges, à seulement 0,4 secondes du premier. Je suis sélectionné pour les Championnats d'Europe — objectif atteint !",
      },
      {
        date: "15 janvier 2026",
        title: "Début de la préparation hivernale",
        text: "La préparation physique hivernale est lancée. 4 séances de musculation par semaine + 2 sorties sur eau. L'objectif : être au pic de forme en juillet.",
      },
    ],
  },
  {
    id: "2",
    name: "Marie Fonteneau",
    sport: "Slalom C1",
    city: "Liège",
    badge: "Nationale",
    age: 22,
    desc: "Précision, lecture de l'eau et vitesse d'exécution : Marie est l'une des meilleures slalomeuses belges. Sélectionnée en équipe nationale, elle vise le top 15 mondial ICF.",
    longDesc: `Marie a découvert le slalom kayak à 12 ans lors d'une journée scolaire sur la Ourthe. Ce qui devait être une sortie d'école est devenu une passion dévorante qui la mène aujourd'hui jusqu'au niveau international.\n\nÀ 22 ans, Marie est la référence belge en slalom C1 féminin. Sa particularité : une lecture de l'eau exceptionnelle qui lui permet d'anticiper les lignes de courant et d'optimiser chaque passage de porte. Son entraîneur la compare aux meilleures slalomeuses du circuit mondial.\n\nLa saison 2026 représente son objectif le plus ambitieux : intégrer le top 15 mondial ICF et se qualifier pour le prochain cycle olympique. Pour y arriver, elle a besoin de votre soutien pour financer ses participations aux Coupes du Monde.`,
    objectives: [
      { icon: "🏅", label: "Circuit Coupe du Monde ICF (3 manches)", amount: 2400 },
      { icon: "🚣", label: "Canoë slalom C1 carbone", amount: 2200 },
      { icon: "🧠", label: "Préparation mentale (saison complète)", amount: 600 },
      { icon: "🏕️", label: "Stage technique Pau (France)", amount: 780 },
    ],
    results: ["Championne de Belgique Slalom", "Finaliste ChEuro C1"],
    photo: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=900&fit=crop&q=80",
    pos: "object-top",
    goal: 5980,
    raised: 2940,
    supporters: 38,
    nextEvent: "Coupe du Monde ICF Slalom — Cracovie (POL) · 21 mai 2026",
    updates: [
      {
        date: "8 avril 2026",
        title: "Sélectionnée pour 3 Coupes du Monde !",
        text: "La fédération vient de confirmer ma sélection pour les 3 manches de Coupe du Monde cette saison. C'est une étape énorme pour ma carrière. Votre soutien est essentiel pour couvrir les frais !",
      },
      {
        date: "20 février 2026",
        title: "Record personnel aux championnats de Belgique",
        text: "Nouveau record personnel de 1,8 secondes — et titre de championne de Belgique conservé ! La forme est là, cap sur le circuit international.",
      },
    ],
  },
  {
    id: "3",
    name: "Antoine Leclercq",
    sport: "Sprint K4",
    city: "Bruxelles",
    badge: "Elite",
    age: 26,
    desc: "La puissance et la synchronisation au service du sprint. Antoine fait partie du K4 national médaillé d'argent aux derniers Championnats d'Europe. Cap sur les Mondiaux.",
    longDesc: `Antoine est le moteur du K4 national belge. Dans cette discipline de sprint en ligne, la synchronisation entre les 4 pagayeurs est aussi importante que la puissance individuelle — et c'est là qu'Antoine excelle, en tant que meneur de cadence de l'embarcation.\n\nMédaillé d'argent aux derniers Championnats d'Europe avec son équipe, Antoine vise maintenant les Championnats du Monde 2026 à Duisbourg. L'équipe s'est renforcée cet hiver avec l'arrivée d'un nouveau pagayeur, et les chronos en entraînement sont prometteurs.\n\nFinancer un athlète de sprint kayak, c'est financer une discipline ultra-exigeante physiquement : Antoine cumule 14 séances d'entraînement par semaine en période de préparation.`,
    objectives: [
      { icon: "✈️", label: "Championnats du Monde Duisbourg", amount: 1500 },
      { icon: "🏋️", label: "Préparation physique intensive (8 mois)", amount: 1800 },
      { icon: "🚣", label: "Pagaie carbone de sprint K4", amount: 680 },
      { icon: "🍎", label: "Nutrition & suivi diététique (saison)", amount: 540 },
    ],
    results: ["Médaille d'argent ChEuro K4", "Champion Belgique Sprint"],
    photo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=900&fit=crop&q=80",
    pos: "object-center",
    goal: 4520,
    raised: 4100,
    supporters: 63,
    nextEvent: "Championnats du Monde ICF Sprint — Duisbourg (GER) · 24 août 2026",
    updates: [
      {
        date: "15 avril 2026",
        title: "PB en training sur 500m !",
        text: "Nouveau meilleur temps en entraînement sur 500m avec le K4. L'équipe est en feu. On vise le podium mondial à Duisbourg.",
      },
      {
        date: "1 mars 2026",
        title: "Camp d'entraînement à Séville",
        text: "10 jours de stage sous le soleil andalou. Les conditions parfaites pour travailler la technique et construire la base aérobie de la saison.",
      },
    ],
  },
  {
    id: "4",
    name: "Juliette Marin",
    sport: "Polo Kayak",
    city: "Namur",
    badge: "Espoir",
    age: 19,
    desc: "Le polo kayak, c'est du football sur l'eau en kayak. Juliette est l'une des meilleures joueuses U23 de Belgique, redoutable en attaque lors des tournois européens.",
    longDesc: `Imaginez du football aquatique joué depuis un kayak, avec des pagaies pour passer le ballon et marquer des buts. C'est le polo kayak — et Juliette en est la meilleure joueuse U23 de Belgique.\n\nÀ 19 ans seulement, elle combine agilité, sens tactique et une maîtrise technique bluffante de l'embarcation. Sa capacité à retourner son kayak en une fraction de seconde pour défendre puis contre-attaquer est redoutée sur tout le circuit européen.\n\nJuliette rêve de porter la Belgique vers son premier titre européen de polo kayak. Pour cela, l'équipe nationale doit participer aux tournois qualificatifs en Europe — ce qui implique des déplacements coûteux.`,
    objectives: [
      { icon: "🏆", label: "Tournois qualificatifs ECA (4 tournois)", amount: 1800 },
      { icon: "🚣", label: "Kayak polo + équipement complet", amount: 1100 },
      { icon: "📹", label: "Analyse vidéo & coaching tactique", amount: 450 },
      { icon: "🏋️", label: "Préparation physique spécifique", amount: 600 },
    ],
    results: ["Finaliste ChEuro Polo", "Meilleure joueuse U23"],
    photo: "https://images.unsplash.com/photo-1473854908-40b3f6765fab?w=800&h=900&fit=crop&q=80",
    pos: "object-top",
    goal: 3950,
    raised: 1870,
    supporters: 29,
    nextEvent: "ECA Kayak Polo U23 — Rotterdam (NED) · 3 juillet 2026",
    updates: [
      {
        date: "5 avril 2026",
        title: "Convoquée en équipe nationale senior !",
        text: "À 19 ans, je reçois ma première convocation en équipe nationale senior pour le tournoi de Rotterdam. Une surprise incroyable — et une énorme motivation pour la saison !",
      },
    ],
  },
  {
    id: "5",
    name: "Pierre Vandamme",
    sport: "Marathon K1",
    city: "Huy",
    badge: "National",
    age: 28,
    desc: "42 km de pagaie, une stratégie de course millimétrée et une endurance hors du commun. Pierre est le champion de Belgique marathon en titre et vise le top 10 européen.",
    longDesc: `Le marathon kayak, c'est 42 kilomètres de course sur l'eau, avec des portages (sorties de l'eau pour franchir des obstacles) qui exigent à la fois endurance, force explosive et stratégie de course.\n\nPierre Vandamme est l'archétype de l'athlète complet : une puissance motrice impressionnante, une technique de pagaie parfaite et un mental d'acier pour gérer les 3 à 4 heures de course. Champion de Belgique marathon en titre, il a terminé 8e aux derniers Championnats d'Europe.\n\nSon objectif pour 2026 : intégrer le top 5 européen et se qualifier pour les Championnats du Monde. Pierre s'entraîne en parallèle de son travail — votre soutien lui permet de dégager du temps et des ressources pour se consacrer à sa préparation.`,
    objectives: [
      { icon: "🗺️", label: "ChEuro Marathon + 2 Coupes du Monde", amount: 2100 },
      { icon: "🚣", label: "Kayak marathon carbone (K1)", amount: 2600 },
      { icon: "🧪", label: "Tests physiologiques & suivi médical", amount: 800 },
      { icon: "🏕️", label: "Stage Duisbourg (parcours mondial)", amount: 550 },
    ],
    results: ["Champion Belgique Marathon", "8e ChEuro Marathon"],
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=900&fit=crop&q=80",
    pos: "object-top",
    goal: 6050,
    raised: 2280,
    supporters: 34,
    nextEvent: "Championnat d'Europe Marathon — Auronzo (ITA) · 11 juillet 2026",
    updates: [
      {
        date: "10 avril 2026",
        title: "200km en training cette semaine",
        text: "Bloc de volume record cette semaine : 200km sur l'eau en 7 jours. La base endurance est là, maintenant on peaufine la vitesse spécifique.",
      },
    ],
  },
  {
    id: "6",
    name: "Sophie Lacombe",
    sport: "Kayak de mer",
    city: "Bruges",
    badge: "Aventure",
    age: 31,
    desc: "Sophie repousse les frontières du kayak de mer avec des traversées de plusieurs jours en mer du Nord et en Atlantique. Son prochain défi : traverser la Manche en solo.",
    longDesc: `Sophie n'est pas une athlète de compétition classique — elle est exploratrice. Ses terrains de jeu : la mer du Nord, la Manche, les côtes atlantiques. Ses compétitions : elle-même et les éléments.\n\nAprès avoir bouclé le tour de la Bretagne en kayak de mer et établi un record national sur le V1 200m en salle, Sophie prépare son projet le plus ambitieux : la traversée solo de la Manche, de Douvres à Calais (puis retour), une première pour une Belge.\n\nCette traversée nécessite une préparation médicale poussée, un équipement de sécurité de pointe, une autorisation des autorités maritimes et un bateau d'assistance. Votre soutien finance ce projet qui mettra la Belgique sur la carte du kayak d'aventure mondial.`,
    objectives: [
      { icon: "⛵", label: "Bateau d'assistance & logistique Manche", amount: 3200 },
      { icon: "🛡️", label: "Équipement sécurité (combinaison survie, balise)", amount: 1400 },
      { icon: "🏥", label: "Bilan médical & préparation physiologique", amount: 700 },
      { icon: "📋", label: "Autorisations maritimes & assurances", amount: 450 },
    ],
    results: ["Tour de Bretagne 2023", "Recordwoman nationale V1"],
    photo: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=900&fit=crop&q=80",
    pos: "object-center",
    goal: 5750,
    raised: 3100,
    supporters: 52,
    nextEvent: "Tentative traversée de la Manche en solo · Été 2026 (date selon météo)",
    updates: [
      {
        date: "14 avril 2026",
        title: "Autorisation maritime obtenue !",
        text: "Les autorités françaises et britanniques ont validé le dossier de traversée. La fenêtre météo sera choisie entre juin et août. L'aventure est en marche !",
      },
      {
        date: "5 mars 2026",
        title: "Test grandeur nature en mer du Nord",
        text: "72h en autonomie totale sur la mer du Nord pour simuler les conditions de la traversée. Résultat : techniquement prête, mentalement plus solide que jamais.",
      },
    ],
  },
  {
    id: "7",
    name: "Hugo Watteau",
    sport: "Freestyle",
    city: "Dinant",
    badge: "Junior",
    age: 17,
    desc: "Sur les vagues et dans les holes de la Lesse, Hugo enchaîne boucles et loopings millimétrés. Meilleur jeune belge du circuit ICF Freestyle, il ambitionne le podium mondial.",
    longDesc: `Hugo a grandi sur les bords de la Lesse, à Dinant. À 17 ans, il enchaîne déjà des figures techniques que peu d'adultes maîtrisent : boucles, loopings, flat spins et retournements sur les vagues de rivière.\n\nLe freestyle kayak, c'est une discipline de style jugée sur des critères techniques et artistiques, un peu comme le skateboard ou le snowboard freestyle. Hugo a été sélectionné pour représenter la Belgique aux Championnats du Monde Junior ICF — une première dans sa carrière et un moment historique pour le kayak belge.\n\nÀ 17 ans, concilier lycée et entraînements de haut niveau est un défi quotidien. Votre soutien lui permet de couvrir les frais d'un voyage au Championnat du Monde qui changerait sa vie.`,
    objectives: [
      { icon: "✈️", label: "Championnats du Monde Junior ICF", amount: 2200 },
      { icon: "🚣", label: "Kayak freestyle compétition", amount: 1800 },
      { icon: "🎥", label: "Coaching vidéo par expert international", amount: 600 },
      { icon: "🏕️", label: "Stage Nantua (France) — holes internationaux", amount: 480 },
    ],
    results: ["3e Championnat de Belgique", "Finaliste Playwave Cup"],
    photo: "https://images.unsplash.com/photo-1565043934134-fdbefc2b51ff?w=800&h=900&fit=crop&q=80",
    pos: "object-center",
    goal: 5080,
    raised: 1560,
    supporters: 24,
    nextEvent: "Championnats du Monde Junior ICF Freestyle — Plattling (GER) · 9 août 2026",
    updates: [
      {
        date: "18 avril 2026",
        title: "Sélectionné pour les Mondiaux Junior !",
        text: "J'ai pas les mots. Sélectionné pour représenter la Belgique aux Championnats du Monde Junior à Plattling. C'est mon rêve depuis que j'ai 10 ans. Merci à tous ceux qui m'ont soutenu jusqu'ici ❤️",
      },
    ],
  },
  {
    id: "8",
    name: "Clara Delattre",
    sport: "Va'a V1",
    city: "Charleroi",
    badge: "Espoir",
    age: 21,
    desc: "Le Va'a (pirogue hawaïenne) est la discipline olympique la plus récente. Clara est la pionnière belge de cette pratique, déjà sélectionnée en équipe nationale pour les premiers Euros.",
    longDesc: `Le Va'a est une discipline de pagaie sur pirogue hawaïenne, récemment inscrite au programme olympique. En Belgique, Clara Delattre en est la véritable pionnière : elle a découvert ce sport lors d'un séjour à Tahiti, est revenue en Belgique avec la conviction d'y développer la discipline, et est aujourd'hui la première Belge à concourir en compétition internationale.\n\nÀ 21 ans, Clara jongle entre ses études de kiné à Charleroi et un programme d'entraînement de haut niveau qu'elle construit en grande partie seule, faute d'encadrement spécialisé en Belgique. Elle s'appuie sur des coachs tahitiens qu'elle consulte en visioconférence.\n\nFinancer Clara, c'est financer une pionnière. Chaque euro l'aide à développer une discipline inexistante en Belgique il y a 3 ans — et à viser les Jeux Olympiques à horizon 2028.`,
    objectives: [
      { icon: "🌊", label: "1ers Championnats d'Europe Va'a", amount: 1900 },
      { icon: "🚣", label: "Va'a V1 carbone de compétition", amount: 3200 },
      { icon: "🎓", label: "Stage technique à Tahiti (10 jours)", amount: 2100 },
      { icon: "📡", label: "Coaching vidéo à distance (coachs FPF)", amount: 480 },
    ],
    results: ["Sélectionnée équipe nationale Va'a", "Recordwoman nationale V1 200m"],
    photo: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=900&fit=crop&q=80",
    pos: "object-top",
    goal: 7680,
    raised: 2890,
    supporters: 41,
    nextEvent: "1ers Championnats d'Europe Va'a — Aix-en-Provence (FRA) · 16 sept. 2026",
    updates: [
      {
        date: "11 avril 2026",
        title: "Record de Belgique V1 500m !",
        text: "Nouveau record de Belgique sur 500m en V1 solo. Un chrono que personne n'avait approché. La forme est au rendez-vous pour les Euros.",
      },
      {
        date: "28 février 2026",
        title: "Retour du stage à Tahiti",
        text: "10 jours incroyables à Fa'a'ā avec les meilleurs coachs du monde du Va'a. J'en reviens transformée techniquement. La Belgique va surprendre en septembre.",
      },
    ],
  },
];
