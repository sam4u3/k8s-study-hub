/* App dashboard: renders the hero, stats, filters and grouped topic cards for one app.
   The page loads glass.js, apps.js and the app's registry.js (which sets K8S_APP, K8S_GROUPS, K8S_TOPICS). */
(function () {
  const app = window.K8S_APP, groups = window.K8S_GROUPS, topics = window.K8S_TOPICS;
  const state = { q: "", group: "all", planned: true };
  const $ = s => document.querySelector(s);
  const docsUrl = p => p.startsWith("http") ? p : app.docsBase + p;
  const ext = h => /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : "";

  document.title = app.name + " Study Hub";
  $("#dash").innerHTML = `
    <header class="hero reveal">
      <a class="crumb" href="../index.html">← All apps</a>
      <div class="brand">${(window.STUDY_LOGOS || {})[app.logo] || ""}<span class="chip blue">${app.name} app</span></div>
      <h1>${app.title}</h1>
      <p class="lead">${app.lead}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">
        <a class="btn primary" id="start" href="#">▶ Start learning</a>
        <a class="btn" id="resume" href="#" style="display:none">↻ Continue where you left off</a>
        ${(app.links || []).map(([l, h]) => `<a class="btn" href="${h}"${ext(h)}>${l}</a>`).join("")}
      </div>
    </header>
    <div class="stats">
      <div class="stat glass reveal"><div class="n" id="s-ready">0</div><div class="l">Topics ready</div></div>
      <div class="stat glass reveal"><div class="n" id="s-planned">0</div><div class="l">On roadmap</div></div>
      <div class="stat glass reveal"><div class="n" id="s-done">0</div><div class="l">Completed by you</div></div>
      <div class="stat glass reveal"><div class="n" id="s-pct">0%</div><div class="l">Progress (ready topics)</div><div class="ring"><i id="s-bar"></i></div></div>
    </div>
    <div class="toolbar glass">
      <input id="q" class="input" type="search" placeholder="Search topics, tags…  ( / )" aria-label="Search topics">
      <div class="filters" id="filters"></div>
      <label class="toggle"><input type="checkbox" id="showPlanned" checked> Show roadmap</label>
    </div>
    <main id="groups"></main>
    <footer>${app.footer || ""}</footer>`;

  function start() {
    const first = topics.find(t => t.status === "ready");
    if (first) $("#start").href = first.file;
  }
  function resume() {
    const next = topics.find(t => t.status === "ready" && !K8S.isDone(t.id));
    const r = $("#resume");
    if (next && topics.some(t => K8S.isDone(t.id))) { r.href = next.file; r.textContent = "↻ Continue: " + next.title.split(":")[0]; r.style.display = ""; }
    else r.style.display = "none";
  }
  function stats() {
    start(); resume();
    const ready = topics.filter(t => t.status === "ready");
    const done = ready.filter(t => K8S.isDone(t.id)).length;
    const pct = ready.length ? Math.round(done / ready.length * 100) : 0;
    countUp($("#s-ready"), ready.length);
    countUp($("#s-planned"), topics.length - ready.length);
    countUp($("#s-done"), done);
    countUp($("#s-pct"), pct, "%");
    setTimeout(() => $("#s-bar").style.width = pct + "%", 200);
  }
  function countUp(el, to, suffix = "") {
    let n = 0; const step = Math.max(1, Math.ceil(to / 25));
    const t = setInterval(() => { n = Math.min(to, n + step); el.textContent = n + suffix; if (n >= to) clearInterval(t); }, 35);
    if (to === 0) el.textContent = "0" + suffix;
  }

  function filters() {
    const f = $("#filters");
    const all = [{ id: "all", title: "All" }, ...groups];
    f.innerHTML = all.map(g => `<span class="chip ${g.id === state.group ? "on" : ""}" data-g="${g.id}">${g.icon ? g.icon + " " : ""}${g.title}</span>`).join("");
    f.querySelectorAll(".chip").forEach(c => c.onclick = () => { state.group = c.dataset.g; filters(); render(); });
  }

  function matches(t) {
    if (!state.planned && t.status !== "ready") return false;
    if (state.group !== "all" && t.group !== state.group) return false;
    if (!state.q) return true;
    const hay = (t.title + " " + t.summary + " " + (t.tags || []).join(" ")).toLowerCase();
    return state.q.split(/\s+/).every(w => hay.includes(w));
  }

  function card(t, g) {
    const done = K8S.isDone(t.id);
    const tags = (t.tags || []).slice(0, 4).map(x => `<span class="chip">#${x}</span>`).join("");
    const status = t.status === "ready"
      ? `<span class="chip green">Ready</span>${t.minutes ? `<span class="chip">${t.minutes} min</span>` : ""}`
      : `<span class="chip amber">Planned</span>`;
    const inner = `<span class="shine"></span>
      ${done ? `<span class="chip green done-badge">✓ Done</span>` : ""}
      <div class="row">${status}</div>
      <h3>${t.title}</h3><p>${t.summary}</p><div class="row">${tags}</div>`;
    return t.status === "ready"
      ? `<a class="card glass glass-hover reveal" style="--accent:${g.color}" href="${t.file}">${inner}</a>`
      : `<div class="card glass planned reveal" style="--accent:${g.color}">${inner}</div>`;
  }

  function render() {
    const host = $("#groups");
    let html = "";
    groups.forEach(g => {
      const list = topics.filter(t => t.group === g.id && matches(t));
      if (!list.length) return;
      const all = topics.filter(t => t.group === g.id);
      const ready = all.filter(t => t.status === "ready").length;
      const done = all.filter(t => t.status === "ready" && K8S.isDone(t.id)).length;
      list.sort((a, b) => (a.status === "ready" ? 0 : 1) - (b.status === "ready" ? 0 : 1));
      html += `<section class="group">
        <div class="group-head reveal">
          <div class="group-icon" style="background:${g.color}22">${g.icon}</div>
          <div><h2>${g.title}</h2><p>${g.desc}</p></div>
          <div class="group-meta">${ready} ready · ${done} done · ${all.length - ready} planned${g.docs ? ` · <a href="${docsUrl(g.docs)}" target="_blank" rel="noopener">📘 docs</a>` : ""}</div>
        </div>
        <div class="grid">${list.map(t => card(t, g)).join("")}</div></section>`;
    });
    host.innerHTML = html || `<div class="empty glass">No topics match. Clear the search or pick another group.</div>`;
    K8S.initReveal(host);
  }

  $("#q").addEventListener("input", e => { state.q = e.target.value.trim().toLowerCase(); render(); });
  $("#showPlanned").addEventListener("change", e => { state.planned = e.target.checked; render(); });
  addEventListener("keydown", e => { if (e.key === "/" && document.activeElement !== $("#q")) { e.preventDefault(); $("#q").focus(); } });
  // pageshow also fires on back-navigation from a topic, so completion badges stay current.
  addEventListener("pageshow", () => { stats(); render(); });

  filters(); K8S.initReveal();
})();
