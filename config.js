// =====================================================
//  CONFIGURATION DU SITE – modifiez ce fichier librement
// =====================================================
window.FHR_CONFIG = {
  // Adresse de l'API n8n (ne pas modifier sauf changement d'instance)
  apiBase: "https://margauxbouriez2.app.n8n.cloud/webhook",

  // ---------- Les joueuses ----------
  // Ajoutez une photo dans images/joueuses/ et indiquez son nom de fichier
  joueuses: [
    { nom: "Prénom Nom", poste: "Pilier", numero: 1, photo: "images/joueuses/joueuse1.jpg" },
    { nom: "Prénom Nom", poste: "Talonneuse", numero: 2, photo: "images/joueuses/joueuse2.jpg" },
    { nom: "Prénom Nom", poste: "Demi de mêlée", numero: 9, photo: "images/joueuses/joueuse3.jpg" },
    { nom: "Prénom Nom", poste: "Ouvreuse", numero: 10, photo: "images/joueuses/joueuse4.jpg" },
    { nom: "Prénom Nom", poste: "Centre", numero: 12, photo: "images/joueuses/joueuse5.jpg" },
    { nom: "Prénom Nom", poste: "Ailière", numero: 14, photo: "images/joueuses/joueuse6.jpg" }
  ],

  // ---------- Entraînements de la semaine ----------
  entrainements: [
    { jour: "Lundi", horaire: "19h00 – 21h00", lieu: "Terrain de rugby – Campus HEC, Jouy-en-Josas" },
    { jour: "Mercredi", horaire: "19h00 – 21h00", lieu: "Terrain de rugby – Campus HEC, Jouy-en-Josas" },
    { jour: "Samedi", horaire: "10h00 – 12h00", lieu: "Salle de musculation – Campus HEC" }
  ],

  // ---------- Photos des derniers tournois ----------
  // Déposez vos photos dans images/tournois/
  photosTournois: [
    { src: "images/tournois/tournoi1.jpg", legende: "Tournoi de ... – 2026" },
    { src: "images/tournois/tournoi2.jpg", legende: "Championnat de France" },
    { src: "images/tournois/tournoi3.jpg", legende: "Tournoi à 7" }
  ],

  // ---------- Calendrier des compétitions – Saison 2026-2027 ----------
  // Dates au format AAAA-MM-JJ (dateFin facultative)
  competitions: [
    { nom: "Coupe de l'X", date: "2026-10-08", lieu: "" },
    { nom: "WIUC", date: "2026-11-04", dateFin: "2026-11-08", lieu: "Bratislava" },
    { nom: "Derby des Parisiennes", date: "2026-11-05", lieu: "ESSEC" },
    { nom: "Tournoi WIUC Natixis", date: "2026-11-14", dateFin: "2026-11-15", lieu: "" },
    { nom: "1er tour des qualifications CDF", date: "2026-11-21", dateFin: "2026-11-22", lieu: "" }
  ],

  // ---------- Partenaires ----------
  partenaires: [
    { nom: "Advancy", logo: "images/partenaires/advancy.png", lien: "https://www.advancy.com" },
    { nom: "Nouvelles Donnes", logo: "images/partenaires/nouvelles-donnes.png", lien: "#" },
    { nom: "Partenaire 3", logo: "images/partenaires/partenaire3.png", lien: "#" }
  ]
};
