// =====================================================
//  CONFIGURATION DU SITE
//  Tout le contenu se modifie maintenant depuis l'espace privé
//  (admin.html). Les valeurs ci-dessous ne servent que de secours
//  si le serveur n8n est momentanément injoignable.
// =====================================================
window.FHR_CONFIG = {
  // Adresse de l'API n8n (ne pas modifier sauf changement d'instance)
  apiBase: "https://margauxbouriez2.app.n8n.cloud/webhook",

  // Contenu de secours (même structure que dans l'espace privé)
  contenu: {
    reglages: {
      heroTitre: "Le rugby féminin d'HEC Paris",
      heroTexte: "Depuis 2004, les FHR portent les couleurs d'HEC sur les terrains universitaires de France et d'Europe. Championnes de France 2023, vice-championnes 2024.",
      heroImage: "images/hero.jpg",
      presentationTitre: "Une équipe, une école, un état d'esprit",
      presentation: "Les Filles HEC Rugby réunissent des étudiantes de tous les programmes d'HEC Paris, qu'elles aient découvert le rugby sur le campus ou qu'elles jouent depuis l'enfance.\n\nL'équipe s'entraîne trois fois par semaine à Jouy-en-Josas et dispute les compétitions universitaires en France et à l'international.",
      partenariatTitre: "Devenir partenaire des FHR",
      partenariatTexte: "Associez votre marque à une équipe exigeante et à la communauté HEC Paris : visibilité sur nos tenues, nos réseaux et nos tournois, rencontres avec les joueuses et événements sur le campus.",
      contactNom: "Le bureau des FHR",
      contactEmail: "",
      contactTel: "",
      instagram: "",
      linkedin: "",
      dossierUrl: ""
    },
    chiffre: [
      { valeur: "2004", libelle: "année de création de l'équipe" },
      { valeur: "2023", libelle: "championnes de France" },
      { valeur: "2024", libelle: "vice-championnes de France" },
      { valeur: "3", libelle: "entraînements par semaine" }
    ],
    palmares: [
      { annee: "2024", titre: "Vice-championnes de France" },
      { annee: "2023", titre: "Championnes de France" },
      { annee: "2004", titre: "Création des Filles HEC Rugby" }
    ],
    joueuse: [
      { nom: "Prénom Nom", poste: "Pilier", numero: "1", photo: "" },
      { nom: "Prénom Nom", poste: "Talonneuse", numero: "2", photo: "" },
      { nom: "Prénom Nom", poste: "Demi de mêlée", numero: "9", photo: "" },
      { nom: "Prénom Nom", poste: "Ouvreuse", numero: "10", photo: "" },
      { nom: "Prénom Nom", poste: "Centre", numero: "12", photo: "" },
      { nom: "Prénom Nom", poste: "Ailière", numero: "14", photo: "" }
    ],
    entrainement: [
      { jour: "Lundi", horaire: "19h00 – 21h00", lieu: "Terrain de rugby – Campus HEC, Jouy-en-Josas" },
      { jour: "Mercredi", horaire: "19h00 – 21h00", lieu: "Terrain de rugby – Campus HEC, Jouy-en-Josas" },
      { jour: "Samedi", horaire: "10h00 – 12h00", lieu: "Salle de musculation – Campus HEC" }
    ],
    competition: [
      { nom: "Coupe de l'X", date: "2026-10-08", dateFin: "", lieu: "", resultat: "" },
      { nom: "WIUC", date: "2026-11-04", dateFin: "2026-11-08", lieu: "Bratislava", resultat: "" },
      { nom: "Derby des Parisiennes", date: "2026-11-05", dateFin: "", lieu: "ESSEC", resultat: "" },
      { nom: "Tournoi WIUC Natixis", date: "2026-11-14", dateFin: "2026-11-15", lieu: "", resultat: "" },
      { nom: "1er tour des qualifications CDF", date: "2026-11-21", dateFin: "2026-11-22", lieu: "", resultat: "" }
    ],
    photo: [
      { src: "images/tournois/tournoi1.jpg", legende: "Tournoi 2026", tournoi: "" },
      { src: "images/tournois/tournoi2.jpg", legende: "Championnat de France", tournoi: "" },
      { src: "images/tournois/tournoi3.jpg", legende: "Tournoi à 7", tournoi: "" }
    ],
    partenaire: [
      { nom: "Advancy", logo: "images/partenaires/advancy.png", lien: "https://www.advancy.com", niveau: "officiel", description: "" },
      { nom: "Nouvelles Donnes", logo: "images/partenaires/nouvelles-donnes.png", lien: "", niveau: "officiel", description: "" }
    ],
    offre: [
      { nom: "Supporter", prix: "À partir de 500 €", avantages: "Logo sur le site et nos publications de saison\nMention lors de nos tournois\nInvitation à un match à domicile", miseEnAvant: false },
      { nom: "Partenaire officiel", prix: "À partir de 2 000 €", avantages: "Logo sur les tenues d'entraînement\nPublications dédiées sur nos réseaux\nPrésence de votre marque sur un tournoi\nRencontre avec l'équipe", miseEnAvant: true },
      { nom: "Partenaire principal", prix: "Sur devis", avantages: "Logo sur le maillot de match\nNaming d'un tournoi ou d'un événement\nAtelier ou intervention avec vos équipes\nBilan de visibilité en fin de saison", miseEnAvant: false }
    ]
  }
};
