# Site FHR – Filles HEC Rugby

Site de l'équipe (rose et bleu) :
- **Site public** (`index.html`) : joueuses, entraînements de la semaine, calendrier des compétitions, photos des tournois, partenaires, événements avec inscription en ligne.
- **Espace privé** (`admin.html`, protégé par mot de passe) : création d'événements, budget (recettes, dépenses, solde), tableaux des inscrits par événement (export CSV/Excel), to-do sponsors à cocher.

Les données dynamiques (événements, inscriptions, budget, to-do) sont stockées dans n8n.

## Mise en ligne sur GitHub Pages
1. Va dans **Settings → Pages**, choisis **Deploy from a branch**, **Branch : main** et le dossier **/ (root)**, puis **Save**.
2. Le site est en ligne après 1–2 minutes sur `https://margauxbouriez-a11y.github.io/fhr-rugby/`.

## Personnaliser
- **Logo** : dépose le logo FHR sous `images/logo.png` (Add file → Upload files, nom `images/logo.png`).
- **Joueuses, entraînements, calendrier, photos, partenaires** : modifie `config.js` et dépose les images dans `images/joueuses/`, `images/tournois/`, `images/partenaires/`.
- **Couleurs** : en haut de `styles.css` (`--rose` et `--bleu`).

## Important
Le workflow n8n **« FHR Rugby – API du site »** doit être **publié (actif)** pour que les événements, inscriptions et l'espace privé fonctionnent.

## Design
Couleurs, typographie et photos inspirées de la vidéo du partenariat FHR × Nouvelles Donnes et du logo : bleu marine, rose vif, titres en capitales grasses. Le logo (`images/logo.png`), le bandeau d'accueil (`images/hero.jpg`) et les photos des tournois (`images/tournois/`) sont tirés de cette vidéo : remplace-les par des photos en meilleure qualité quand tu en as.
