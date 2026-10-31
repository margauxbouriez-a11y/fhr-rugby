# Site FHR – Filles HEC Rugby

Site de l'équipe, pensé pour présenter le club aux sponsors :

- **Site public** (`index.html`) : accueil, chiffres clés, présentation et palmarès, joueuses, calendrier de la saison et entraînements, photos des tournois, sponsors par niveau, offres de partenariat avec contact et dossier PDF, événements avec inscription en ligne.
- **Espace privé** (`admin.html`, protégé par le mot de passe de l'équipe) : tout le contenu du site se modifie ici, sans toucher au code.
  - *Contenu du site* : textes et contact, chiffres clés, palmarès, joueuses (avec photo), entraînements, calendrier (avec résultats), photos des tournois (import de plusieurs photos d'un coup), sponsors (logo, niveau, lien), offres de partenariat.
  - *Gestion de l'équipe* : événements, inscrits (export CSV/Excel), budget, suivi des contreparties sponsors.

Les photos envoyées depuis l'espace privé sont redimensionnées automatiquement puis stockées dans n8n : pas besoin de les déposer sur GitHub.

## Données (n8n)
Deux workflows doivent être **publiés (actifs)** :
- **« FHR Rugby – API du site »** : événements, inscriptions, budget, suivi sponsors, et vérification du mot de passe.
- **« FHR Rugby – Contenu du site »** : contenu éditable et photos (tables `rugby_contenu` et `rugby_medias`). Il réutilise le mot de passe de l'espace privé : il n'y a qu'un seul mot de passe à retenir.

Si n8n est injoignable, le site public affiche le contenu de secours de `config.js`.

## Mise en ligne sur GitHub Pages
1. **Settings → Pages**, choisis **Deploy from a branch**, **Branch : main**, dossier **/ (root)**, puis **Save**.
2. Le site est en ligne après 1–2 minutes sur `https://margauxbouriez-a11y.github.io/fhr-rugby/`.

## Fichiers
- `index.html`, `app.js` : site public
- `admin.html`, `admin.js`, `admin.css` : espace privé
- `contenu.js` : chargement du contenu (partagé)
- `styles.css` : design (couleurs en haut du fichier : `--marine`, `--rose`)
- `config.js` : adresse de l'API n8n et contenu de secours
