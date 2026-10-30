(function () {
  const API = window.FHR_CONFIG.apiBase + "/rugby-admin";
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const euros = (n) => Number(n || 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
  const clean = (d) => (Array.isArray(d) ? d : [d]).filter((x) => x && x.id);

  let mdp = sessionStorage.getItem("fhr_mdp") || "";

  async function api(action, data = {}) {
    const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: mdp, action, ...data }) });
    if (r.status === 401) throw new Error("unauthorized");
    if (!r.ok) throw new Error("erreur");
    const t = await r.text();
    return t ? JSON.parse(t) : [];
  }

  function csv(nom, lignes, colonnes) {
    const entete = colonnes.map((c) => c.label).join(";");
    const corps = lignes.map((l) => colonnes.map((c) => '"' + String(l[c.key] ?? "").replace(/"/g, '""') + '"').join(";")).join("\n");
    const blob = new Blob(["\ufeff" + entete + "\n" + corps], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nom; a.click();
  }

  // ---------- Connexion ----------
  async function connexion() {
    try {
      await api("list_events");
      sessionStorage.setItem("fhr_mdp", mdp);
      $("ecran-connexion").style.display = "none";
      $("espace").style.display = "block";
      chargerTout();
    } catch (e) {
      sessionStorage.removeItem("fhr_mdp");
      $("msg-connexion").className = "message erreur";
      $("msg-connexion").textContent = e.message === "unauthorized" ? "Mot de passe incorrect." : "Serveur injoignable.";
    }
  }
  $("form-connexion").addEventListener("submit", (e) => { e.preventDefault(); mdp = $("mdp").value; connexion(); });
  $("deconnexion").onclick = (e) => { e.preventDefault(); sessionStorage.removeItem("fhr_mdp"); location.reload(); };
  if (mdp) connexion();

  // ---------- Onglets ----------
  document.querySelectorAll(".onglets button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll(".onglets button").forEach((x) => x.classList.remove("actif"));
    document.querySelectorAll(".panneau").forEach((x) => x.classList.remove("actif"));
    b.classList.add("actif"); $(b.dataset.p).classList.add("actif");
  }));

  function chargerTout() { chargerEvenements(); chargerInscrits(); chargerBudget(); chargerTodos(); }

  // ---------- Événements ----------
  let evenements = [];
  async function chargerEvenements() {
    evenements = clean(await api("list_events"));
    $("t-evenements").innerHTML = evenements.length ? evenements.map((e) => `
      <tr><td>${esc(e.event_date)}</td><td>${esc(e.event_time)}</td><td>${esc(e.title)}</td><td>${esc(e.location)}</td>
      <td><button class="danger" data-id="${e.id}">Supprimer</button></td></tr>`).join("")
      : '<tr><td colspan="5" class="vide">Aucun événement.</td></tr>';
    $("t-evenements").querySelectorAll("button").forEach((b) => b.onclick = async () => {
      if (!confirm("Supprimer cet événement ?")) return;
      await api("delete_event", { id: b.dataset.id }); chargerEvenements();
    });
  }
  $("form-evenement").addEventListener("submit", async (e) => {
    e.preventDefault();
    await api("add_event", Object.fromEntries(new FormData(e.target)));
    e.target.reset(); chargerEvenements();
  });

  // ---------- Inscrits ----------
  let inscrits = [];
  const colsInscrits = [
    { key: "event_title", label: "Événement" }, { key: "first_name", label: "Prénom" }, { key: "last_name", label: "Nom" },
    { key: "email", label: "Email" }, { key: "phone", label: "Téléphone" }, { key: "createdAt", label: "Inscrit le" }
  ];
  async function chargerInscrits() {
    inscrits = clean(await api("list_registrations"));
    if (!inscrits.length) { $("tableaux-inscrits").innerHTML = '<p class="vide">Aucune inscription pour le moment.</p>'; return; }
    const groupes = {};
    inscrits.forEach((i) => { (groupes[i.event_title || "Sans titre"] ||= []).push(i); });
    $("tableaux-inscrits").innerHTML = Object.entries(groupes).map(([titre, liste]) => `
      <h3 style="color:var(--bleu)">${esc(titre)} <span class="numero">${liste.length}</span></h3>
      <table style="margin-bottom:24px"><thead><tr><th>Prénom</th><th>Nom</th><th>Email</th><th>Téléphone</th><th>Inscrit le</th></tr></thead>
      <tbody>${liste.map((i) => `<tr><td>${esc(i.first_name)}</td><td>${esc(i.last_name)}</td><td>${esc(i.email)}</td><td>${esc(i.phone)}</td><td>${esc(new Date(i.createdAt).toLocaleString("fr-FR"))}</td></tr>`).join("")}</tbody></table>`).join("");
  }
  $("export-inscrits").onclick = () => csv("inscrits-fhr.csv", inscrits, colsInscrits);

  // ---------- Budget ----------
  let budget = [];
  async function chargerBudget() {
    budget = clean(await api("list_budget"));
    let rec = 0, dep = 0;
    budget.forEach((b) => { if (b.entry_type === "recette") rec += Number(b.amount); else dep += Number(b.amount); });
    $("tot-recettes").textContent = euros(rec);
    $("tot-depenses").textContent = euros(dep);
    $("tot-solde").textContent = euros(rec - dep);
    $("tot-solde").style.color = rec - dep < 0 ? "#c0392b" : "var(--bleu)";
    $("t-budget").innerHTML = budget.length ? budget.map((b) => `
      <tr><td>${esc(b.entry_date)}</td><td>${esc(b.label)}</td><td>${esc(b.category)}</td>
      <td>${b.entry_type === "recette" ? "Recette" : "Dépense"}</td>
      <td style="color:${b.entry_type === "recette" ? "#1e7b34" : "#c0392b"};font-weight:700">${b.entry_type === "recette" ? "+" : "−"} ${euros(b.amount)}</td></tr>`).join("")
      : '<tr><td colspan="5" class="vide">Aucune ligne de budget.</td></tr>';
  }
  $("form-budget").addEventListener("submit", async (e) => {
    e.preventDefault();
    await api("add_budget", Object.fromEntries(new FormData(e.target)));
    e.target.reset(); chargerBudget();
  });
  $("export-budget").onclick = () => csv("budget-fhr.csv", budget, [
    { key: "entry_date", label: "Date" }, { key: "label", label: "Libellé" }, { key: "category", label: "Catégorie" },
    { key: "entry_type", label: "Type" }, { key: "amount", label: "Montant" }
  ]);

  // ---------- To-do sponsors ----------
  async function chargerTodos() {
    const todos = clean(await api("list_todos"));
    todos.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
    $("liste-todos").innerHTML = todos.length ? todos.map((t) => `
      <label class="todo ${t.done ? "fait" : ""}"><input type="checkbox" data-id="${t.id}" ${t.done ? "checked" : ""} />
      <span><b>${esc(t.sponsor)}</b> – ${esc(t.task)}</span></label>`).join("")
      : '<p class="vide">Aucune tâche.</p>';
    $("liste-todos").querySelectorAll("input").forEach((c) => c.onchange = async () => {
      await api("toggle_todo", { id: c.dataset.id, done: c.checked }); chargerTodos();
    });
  }
  $("form-todo").addEventListener("submit", async (e) => {
    e.preventDefault();
    await api("add_todo", Object.fromEntries(new FormData(e.target)));
    e.target.reset(); chargerTodos();
  });
})();
