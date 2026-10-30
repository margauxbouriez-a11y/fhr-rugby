(function () {
  const C = window.FHR_CONFIG;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const imgFallback = "this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22><rect width=%2210%22 height=%2210%22 fill=%22%23ffe0f0%22/><text x=%225%22 y=%226.5%22 font-size=%224%22 text-anchor=%22middle%22>🏉</text></svg>'";

  // Joueuses
  $("liste-joueuses").innerHTML = C.joueuses.map((j) => `
    <div class="carte">
      <img src="${esc(j.photo)}" alt="${esc(j.nom)}" onerror="${imgFallback}" />
      <div class="contenu"><h3><span class="numero">${esc(j.numero)}</span>${esc(j.nom)}</h3><div>${esc(j.poste)}</div></div>
    </div>`).join("");

  // Entraînements
  $("liste-entrainements").innerHTML = C.entrainements.map((e) => `
    <div class="entrainement"><div class="jour">${esc(e.jour)}</div><div><b>${esc(e.horaire)}</b><br>📍 ${esc(e.lieu)}</div></div>`).join("");

  // Calendrier des compétitions
  const jourMois = (d) => new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  const aujourdhui = new Date().toISOString().slice(0, 10);
  $("liste-competitions").innerHTML = (C.competitions || []).slice().sort((x, y) => x.date.localeCompare(y.date)).map((c) => {
    const d1 = new Date(c.date + "T12:00:00"), d2 = c.dateFin ? new Date(c.dateFin + "T12:00:00") : null;
    const mois = d1.toLocaleDateString("fr-FR", { month: "long" });
    const jours = d2 ? (d1.getMonth() === d2.getMonth() ? d1.getDate() + "–" + d2.getDate() : jourMois(c.date) + " – " + jourMois(c.dateFin)) : d1.getDate();
    const passee = (c.dateFin || c.date) < aujourdhui;
    return `<div class="competition${passee ? " passee" : ""}">
      <div class="comp-date"><b>${esc(jours)}</b><span>${esc(mois)}</span></div>
      <div class="comp-info"><h3>${esc(c.nom)}</h3>${c.lieu ? `<div>📍 ${esc(c.lieu)}</div>` : ""}${passee ? '<div class="tag">Terminé</div>' : ""}</div>
    </div>`;
  }).join("");

  // Galerie
  $("galerie").innerHTML = C.photosTournois.map((p) => `
    <figure><img src="${esc(p.src)}" alt="${esc(p.legende)}" onerror="${imgFallback}" /><figcaption>${esc(p.legende)}</figcaption></figure>`).join("");

  // Partenaires
  $("liste-partenaires").innerHTML = C.partenaires.map((p) => `
    <a class="partenaire" href="${esc(p.lien)}" target="_blank" rel="noopener">
      <img src="${esc(p.logo)}" alt="${esc(p.nom)}" onerror="this.replaceWith(document.createTextNode('${esc(p.nom)}'))" />
    </a>`).join("");

  // Événements (depuis n8n)
  let evenementChoisi = null;
  const formatDate = (d) => { const x = new Date(d); return isNaN(x) ? d : x.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); };

  fetch(C.apiBase + "/rugby-events")
    .then((r) => r.json())
    .then((data) => {
      const liste = (Array.isArray(data) ? data : [data]).filter((e) => e && e.id);
      if (!liste.length) { $("liste-evenements").innerHTML = '<p class="vide">Aucun événement prévu pour le moment.</p>'; return; }
      $("liste-evenements").innerHTML = liste.map((e) => `
        <div class="evenement">
          <h3>${esc(e.title)}</h3>
          <div class="meta">📅 ${esc(formatDate(e.event_date))} ${e.event_time ? "· 🕒 " + esc(e.event_time) : ""}</div>
          <div>📍 ${esc(e.location)}</div>
          <p>${esc(e.description)}</p>
          <button data-id="${esc(e.id)}" data-titre="${esc(e.title)}">S'inscrire</button>
        </div>`).join("");
      $("liste-evenements").querySelectorAll("button").forEach((b) =>
        b.addEventListener("click", () => {
          evenementChoisi = { id: b.dataset.id, title: b.dataset.titre };
          $("modal-titre").textContent = "Inscription – " + evenementChoisi.title;
          $("msg-inscription").className = "message";
          $("form-inscription").reset();
          $("modal-inscription").classList.add("ouvert");
        }));
    })
    .catch(() => { $("liste-evenements").innerHTML = '<p class="vide">Impossible de charger les événements.</p>'; });

  $("fermer-modal").onclick = () => $("modal-inscription").classList.remove("ouvert");

  $("form-inscription").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const f = Object.fromEntries(new FormData(ev.target));
    fetch(C.apiBase + "/rugby-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, event_id: evenementChoisi.id, event_title: evenementChoisi.title })
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(() => {
        $("msg-inscription").className = "message ok";
        $("msg-inscription").textContent = "Inscription confirmée, à bientôt !";
        setTimeout(() => $("modal-inscription").classList.remove("ouvert"), 1800);
      })
      .catch(() => { $("msg-inscription").className = "message erreur"; $("msg-inscription").textContent = "Erreur, réessaie plus tard."; });
  });
})();
