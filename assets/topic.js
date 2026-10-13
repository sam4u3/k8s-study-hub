/* Data-driven renderer for topic pages.
   A page calls K8S_RENDER({ id, group, title, lead, minutes, video, repo, parts, sections, summary }).
   Each section has { id, title, lead, blocks: [...] }; block types are documented in WIDGETS below. */
(function () {
  const VIDEO = "https://www.youtube.com/watch?v=_4uQI4ihGVU";
  const REPO = "https://github.com/saiyam1814/Kubernetes-crash-course-2025";
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Highlight shell and YAML: comments, keys, quoted strings. Input is raw text.
  function hl(code) {
    return code.split("\n").map(line => {
      let ci = -1, q = null;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (q) { if (ch === q) q = null; continue; }
        if (ch === "'" || ch === '"') { q = ch; continue; }
        if (ch === "#" && (i === 0 || /\s/.test(line[i - 1]))) { ci = i; break; }
      }
      const body = ci >= 0 ? line.slice(0, ci) : line;
      const com = ci >= 0 ? line.slice(ci) : "";
      let b = esc(body).replace(/"([^"]*)"/g, '<span class="tok-s">"$1"</span>');
      const km = b.match(/^(\s*(?:-\s+)?)([A-Za-z_][\w.\-\/]*)(:)(\s|$)/);
      if (km) b = km[1] + `<span class="tok-k">${km[2]}</span>` + km[3] + b.slice(km[0].length - km[4].length);
      return b + (com ? `<span class="tok-c">${esc(com)}</span>` : "");
    }).join("\n");
  }
  function codeBox(title, code) {
    return `<div class="code"><div class="code-head"><span><span class="dots"><i></i><i></i><i></i></span>${esc(title || "shell")}</span><button class="copy">Copy</button></div><pre>${hl(code)}</pre></div>`;
  }

  /* ---------- Widgets: each returns HTML and optionally registers an init fn ---------- */
  const inits = [];
  let uid = 0;
  const nid = p => `${p}-${++uid}`;

  const WIDGETS = {
    // { type:'p', html }
    p: b => `<div class="prose reveal"><p>${b.html}</p></div>`,
    // { type:'h3', text }
    h3: b => `<h3 class="sub reveal">${b.text}</h3>`,
    // { type:'cards', cols:3, items:[[icon,title,html]] }
    cards: b => `<div class="cards c${b.cols || 3}">${b.items.map(i => `<div class="card-i glass glass-hover reveal"><div class="ic">${i[0]}</div><h4>${i[1]}</h4><div class="t">${i[2]}</div></div>`).join("")}</div>`,
    // { type:'callout', kind:'info|warn|tip', html }
    callout: b => {
      const ic = { info: "ℹ️", warn: "⚠️", tip: "💡" }[b.kind || "info"];
      return `<div class="callout ${b.kind || "info"} reveal"><span class="ic">${ic}</span><div>${b.html}</div></div>`;
    },
    // { type:'code', title, code }
    code: b => `<div class="reveal">${codeBox(b.title, b.code)}</div>`,
    // { type:'term', title, lines:["$ cmd", "output", "✓ ok"] }
    term: b => {
      const lines = b.lines.map(l => {
        if (l.startsWith("$ ")) return `<span class="ln cmd">${esc(l.slice(2))}</span>`;
        if (l.startsWith("✓")) return `<span class="ln ok">${esc(l)}</span>`;
        return `<span class="ln out">${esc(l)}</span>`;
      }).join("\n");
      return `<div class="code reveal"><div class="code-head"><span><span class="dots"><i></i><i></i><i></i></span>${esc(b.title || "terminal")}</span><button class="copy">Copy</button></div><pre class="term">${lines}</pre></div>`;
    },
    // { type:'table', head:[], rows:[[html]] }
    table: b => `<div class="panel glass reveal tbl-wrap"><table class="tbl"><tr>${b.head.map(h => `<th>${h}</th>`).join("")}</tr>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`,
    // { type:'compare', cols:[{ title, chip, color, items:[] }] }
    compare: b => `<div class="compare" style="grid-template-columns:repeat(${b.cols.length},1fr)">${b.cols.map(c => `<div class="cmp glass reveal" style="--c:${c.color || "var(--k8s)"}">${c.chip ? `<span class="chip ${c.chipClass || "blue"}">${c.chip}</span>` : ""}<h4>${c.title}</h4><ul>${c.items.map(i => `<li>${i}</li>`).join("")}</ul></div>`).join("")}</div>`,
    // { type:'timeline', items:[[when,title,text]] }
    timeline: b => {
      const id = nid("tl");
      inits.push(() => {
        const tl = document.getElementById(id), fill = tl.querySelector(".fill");
        addEventListener("scroll", () => {
          const r = tl.getBoundingClientRect();
          fill.style.height = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height)) * 100 + "%";
        }, { passive: true });
      });
      return `<div class="timeline" id="${id}"><div class="fill"></div>${b.items.map((it, i) => `<div class="tl-item ${i % 2 ? "r" : "l"} reveal"><span class="dot"></span><div class="tl-card glass glass-hover"><div class="tl-year">${it[0]}</div><h4>${it[1]}</h4><p>${it[2]}</p></div></div>`).join("")}</div>`;
    },
    // { type:'layers', items:[[title, sub, color]] } — stack builds bottom-up when visible
    layers: b => {
      const id = nid("ly");
      inits.push(() => {
        const el = document.getElementById(id);
        const ls = [...el.querySelectorAll(".layer")];
        ls.reverse().forEach((l, i) => l.style.transitionDelay = (i * 0.15) + "s");
        new IntersectionObserver((en, io) => en.forEach(e => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }), { threshold: .3 }).observe(el);
      });
      return `<div class="layers glass" id="${id}">${b.items.map(i => `<div class="layer" style="--c:${i[2] || "#5b8cff"}"><b>${i[0]}</b><small>${i[1]}</small></div>`).join("")}</div>`;
    },
    // { type:'steps', steps:[{ title, where, whereClass, why, code, codeTitle }] }
    steps: b => {
      const id = nid("st");
      inits.push(() => stepper(document.getElementById(id), b.steps));
      return `<div class="glass stepper reveal" id="${id}"></div>`;
    },
    // { type:'flow', nodes:[[icon,label,title,html]], interval }
    flow: b => {
      const id = nid("fl");
      inits.push(() => flow(document.getElementById(id), b));
      return `<div class="flow glass reveal" id="${id}"></div>`;
    },
    // { type:'pipeline', stages:[[title,sub]], scenarios:[{ label, path:[i], fail:i, out }] }
    pipeline: b => {
      const id = nid("pp");
      inits.push(() => pipeline(document.getElementById(id), b));
      return `<div class="pipe glass reveal" id="${id}"></div>`;
    },
    // { type:'yaml', title, lines:[[text, note?]] } — click/hover a line to explain it
    yaml: b => {
      const id = nid("yx");
      inits.push(() => yamlX(document.getElementById(id), b));
      return `<div class="glass yaml-x reveal" id="${id}"></div>`;
    },
    // { type:'tabs', tabs:[{ label, blocks:[] }] }
    tabs: b => {
      const id = nid("tb");
      inits.push(() => {
        const el = document.getElementById(id);
        const btns = el.querySelectorAll(".tabs-h button"), body = el.querySelector(".tab-body");
        const show = i => {
          btns.forEach((x, j) => x.classList.toggle("on", i === j));
          body.innerHTML = `<div class="tab-p">${renderBlocks(b.tabs[i].blocks)}</div>`;
          body.querySelectorAll(".reveal").forEach(r => r.classList.add("in"));
          K8S.initCopy(body); K8S.initTerminals(body);
          runInits();
        };
        btns.forEach((x, i) => x.onclick = () => show(i));
        show(0);
      });
      return `<div class="reveal" id="${id}"><div class="tabs-h">${b.tabs.map(t => `<button>${t.label}</button>`).join("")}</div><div class="tab-body"></div></div>`;
    },
    // { type:'custom', html, init(el) }
    custom: b => {
      const id = nid("cu");
      if (b.init) inits.push(() => b.init(document.getElementById(id)));
      return `<div class="reveal" id="${id}">${b.html || ""}</div>`;
    }
  };

  function renderBlocks(blocks) {
    return blocks.map(b => {
      const w = WIDGETS[b.type];
      return w ? `<div class="block">${w(b)}</div>` : "";
    }).join("");
  }
  function runInits() { while (inits.length) inits.shift()(); }

  /* ---------- Interactive widget implementations ---------- */
  function stepper(host, steps) {
    let cur = 0;
    const seen = new Set([0]);
    host.innerHTML = `<div class="step-list"></div><div style="min-width:0"><div class="step-bar"><i></i></div><div class="step-pane"></div></div>`;
    const list = host.querySelector(".step-list"), pane = host.querySelector(".step-pane"), bar = host.querySelector(".step-bar i");
    list.innerHTML = steps.map((s, i) => `<button class="step-btn"><span class="n">${i + 1}</span><span class="t">${s.title}</span></button>`).join("");
    const btns = [...list.children];
    btns.forEach((b, i) => b.onclick = () => go(i));
    function go(i) {
      cur = i; seen.add(i);
      btns.forEach((b, j) => { b.classList.toggle("on", j === i); b.classList.toggle("seen", seen.has(j) && j !== i); });
      bar.style.width = ((i + 1) / steps.length * 100) + "%";
      const s = steps[i];
      pane.style.animation = "none"; void pane.offsetHeight; pane.style.animation = "";
      pane.innerHTML = `${s.where ? `<span class="chip ${s.whereClass || "blue"}">${s.where}</span>` : ""}<h4>${s.title}</h4><div class="why">${s.why || ""}</div>
        ${s.code ? codeBox(s.codeTitle || (s.where || "shell").toLowerCase(), s.code) : ""}${s.html || ""}
        <div class="step-nav"><button class="btn small" ${i === 0 ? "disabled" : ""} data-go="${i - 1}">◀ Previous</button>
        <span class="faint" style="font-size:13px;align-self:center">Step ${i + 1} of ${steps.length}</span>
        <button class="btn primary small" ${i === steps.length - 1 ? "disabled" : ""} data-go="${i + 1}">Next ▶</button></div>`;
      pane.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(+b.dataset.go));
      K8S.initCopy(pane);
      if (list.scrollWidth > list.clientWidth + 4 && getComputedStyle(list).display === "flex") list.scrollTo({ left: btns[i].offsetLeft - 20, behavior: "smooth" });
    }
    go(0);
  }

  function flow(host, b) {
    const N = b.nodes;
    host.innerHTML = `<div class="flow-track" style="grid-template-columns:repeat(${N.length},1fr)"><div class="beam"></div>${N.map(n => `<div class="fnode"><div class="ic">${n[0]}</div><span>${n[1]}</span></div>`).join("")}</div>
      <div class="flow-caption"></div><div class="ctrl"><button class="btn small" data-a="prev">◀ Prev</button><button class="btn primary small" data-a="play">▶ Play</button><button class="btn small" data-a="next">Next ▶</button></div>`;
    const nodes = [...host.querySelectorAll(".fnode")], cap = host.querySelector(".flow-caption"), beam = host.querySelector(".beam"), play = host.querySelector('[data-a="play"]');
    let i = 0, t = null;
    const go = k => {
      i = (k + N.length) % N.length;
      nodes.forEach((n, j) => { n.classList.toggle("on", j === i); n.classList.toggle("done", j < i); });
      beam.style.width = (N.length > 1 ? i / (N.length - 1) * 90 : 0) + "%";
      cap.style.opacity = 0;
      setTimeout(() => { cap.innerHTML = `<h4>${i + 1} · ${N[i][2]}</h4><p>${N[i][3]}</p>`; cap.style.opacity = 1; }, 150);
    };
    const stop = () => { clearInterval(t); t = null; play.textContent = "▶ Play"; };
    play.onclick = () => {
      if (t) return stop();
      play.textContent = "⏸ Pause";
      if (i === N.length - 1) go(0);
      t = setInterval(() => { if (i === N.length - 1) return stop(); go(i + 1); }, b.interval || 3200);
    };
    host.querySelector('[data-a="next"]').onclick = () => { stop(); go(i + 1); };
    host.querySelector('[data-a="prev"]').onclick = () => { stop(); go(i - 1); };
    nodes.forEach((n, j) => n.onclick = () => { stop(); go(j); });
    go(0);
  }

  function pipeline(host, b) {
    const S = b.stages;
    host.innerHTML = `${b.intro ? `<p class="muted" style="margin:0 0 12px;font-size:14px">${b.intro}</p>` : ""}
      <div class="ctrl" style="margin:0 0 14px">${b.scenarios.map((s, i) => `<button class="btn small ${i === 0 ? "primary" : ""}" data-s="${i}">${s.label}</button>`).join("")}</div>
      <div class="pipe-row" style="grid-template-columns:repeat(${S.length},1fr)">${S.map(s => `<div class="stage"><b>${s[0]}</b><small>${s[1] || ""}</small></div>`).join("")}</div>
      <div class="pipe-out"><span class="faint"># pick a scenario above</span></div>`;
    const st = [...host.querySelectorAll(".stage")], out = host.querySelector(".pipe-out");
    let busy = false;
    host.querySelectorAll("[data-s]").forEach(btn => btn.onclick = () => {
      if (busy) return; busy = true;
      host.querySelectorAll("[data-s]").forEach(x => x.classList.toggle("primary", x === btn));
      const sc = b.scenarios[+btn.dataset.s];
      const path = sc.path || S.map((_, i) => i);
      st.forEach((s, i) => s.className = "stage" + (path.includes(i) || sc.fail === i ? "" : " skip"));
      out.innerHTML = sc.start ? `<span class="faint">${sc.start}</span>` : "";
      let k = 0;
      const tick = () => {
        if (k > 0) st[path[k - 1]].classList.replace("hit", "pass");
        if (k === path.length) { out.innerHTML += (out.innerHTML ? "<br>" : "") + sc.out; busy = false; return; }
        const idx = path[k];
        if (sc.fail === idx) { st[idx].classList.add("deny"); out.innerHTML += (out.innerHTML ? "<br>" : "") + sc.out; busy = false; return; }
        st[idx].classList.add("hit");
        if (sc.notes && sc.notes[k]) out.innerHTML += (out.innerHTML ? "<br>" : "") + `<span class="muted">${sc.notes[k]}</span>`;
        k++; setTimeout(tick, b.speed || 650);
      };
      setTimeout(tick, 200);
    });
  }

  function yamlX(host, b) {
    host.innerHTML = `<pre>${b.lines.map((l, i) => `<span class="yl ${l[1] ? "has" : ""}" data-i="${i}">${hl(l[0]) || " "}</span>`).join("")}</pre>
      <div class="yaml-note"><h5>${esc(b.title || "manifest")}</h5><p>${b.intro || "Click or hover a highlighted line to see what it does."}</p><div class="hint">▶ Auto-tour runs until you interact.</div></div>`;
    const ls = [...host.querySelectorAll(".yl")], note = host.querySelector(".yaml-note p"), h5 = host.querySelector(".yaml-note h5");
    const annotated = ls.filter(l => l.classList.contains("has"));
    let tour = null, ti = 0;
    const show = el => {
      ls.forEach(x => x.classList.remove("on")); el.classList.add("on");
      const l = b.lines[+el.dataset.i];
      note.style.opacity = 0;
      setTimeout(() => { h5.textContent = l[0].trim().replace(/:$/, "") || b.title; note.innerHTML = l[1]; note.style.opacity = 1; }, 120);
    };
    const stopTour = () => { clearInterval(tour); tour = null; host.querySelector(".hint").style.display = "none"; };
    annotated.forEach(el => { el.onmouseenter = () => { stopTour(); show(el); }; el.onclick = () => { stopTour(); show(el); }; });
    new IntersectionObserver((en, io) => en.forEach(e => {
      if (e.isIntersecting && annotated.length) {
        io.disconnect();
        show(annotated[0]);
        tour = setInterval(() => { ti = (ti + 1) % annotated.length; show(annotated[ti]); }, 3400);
      }
    }), { threshold: .4 }).observe(host);
  }

  /* ---------- Summary ---------- */
  function summary(P) {
    const s = P.summary || {};
    let h = "";
    if (s.takeaways) h += `<div class="cards c3">${s.takeaways.map(t => `<div class="card-i glass glass-hover reveal"><div class="ic">${t[0]}</div><h4>${t[1]}</h4><div class="t">${t[2]}</div></div>`).join("")}</div>`;
    if (s.cheat) h += `<h3 class="sub reveal">Cheat sheet</h3><div class="reveal">${codeBox(s.cheatTitle || "cheat sheet", s.cheat)}</div>`;
    if (s.quiz) h += `<h3 class="sub reveal">Self-check quiz</h3><div class="score reveal" id="score"></div><div id="quiz">${s.quiz.map((q, i) => `<div class="quiz-q glass reveal" data-q="${i}"><h4>${i + 1}. ${q[0]}</h4><div class="opts">${q[1].map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join("")}</div><div class="explain">💡 ${q[3]}</div></div>`).join("")}</div>`;
    h += `<div class="complete glass reveal"><h3 style="margin:0 0 6px">Finished this topic?</h3>
      <p class="muted" style="margin:0 0 16px">Marking it complete updates your dashboard progress (saved in this browser).</p>
      <button class="btn primary" id="markDone">✓ Mark topic complete</button> <a class="btn" href="../index.html">Back to dashboard</a></div>`;
    h += `<div class="pager" id="pager"></div>`;
    return h;
  }

  function wireSummary(P) {
    const quiz = (P.summary || {}).quiz;
    if (quiz) {
      let correct = 0, answered = 0;
      const score = document.getElementById("score");
      const draw = () => score.innerHTML = `Score: <b>${correct}</b> / ${quiz.length}${answered === quiz.length ? (correct === quiz.length ? " · 🎉 Perfect" : " · Review the explanations") : ""}`;
      document.querySelectorAll(".quiz-q").forEach(box => {
        const q = quiz[+box.dataset.q];
        box.querySelectorAll(".opt").forEach(b => b.onclick = () => {
          if (box.classList.contains("answered")) return;
          box.classList.add("answered"); answered++;
          if (+b.dataset.j === q[2]) { b.classList.add("right"); correct++; }
          else { b.classList.add("wrong"); box.querySelectorAll(".opt")[q[2]].classList.add("right"); }
          draw();
        });
      });
      draw();
    }
    const btn = document.getElementById("markDone"), chip = document.getElementById("doneChip");
    const d = () => { const x = K8S.isDone(P.id); btn.textContent = x ? "↺ Mark as not complete" : "✓ Mark topic complete"; chip.style.display = x ? "" : "none"; };
    btn.onclick = () => { K8S.setDone(P.id, !K8S.isDone(P.id)); d(); };
    d();

    // Previous / next ready topic in registry order
    const ready = (window.K8S_TOPICS || []).filter(t => t.status === "ready");
    const i = ready.findIndex(t => t.id === P.id);
    const link = (t, cls, lbl) => t ? `<a class="glass glass-hover ${cls}" href="../${t.file}"><small>${lbl}</small>${t.title}</a>` : "<span></span>";
    document.getElementById("pager").innerHTML = i < 0 ? "" : link(ready[i - 1], "pv", "← Previous topic") + link(ready[i + 1], "nx", "Next topic →");
  }

  /* ---------- Page ---------- */
  window.K8S_RENDER = function (P) {
    const g = (window.K8S_GROUPS || []).find(x => x.id === P.group) || { title: P.group, icon: "📘" };
    document.title = document.title || P.title.replace(/<[^>]+>/g, "");
    const secs = P.sections.concat([{ id: "summary", title: "Summary", lead: P.summaryLead || "Key ideas, a cheat sheet and a quick self-check." }]);
    const toc = secs.map((s, i) => `<a data-spy href="#${s.id}"><span class="num">${i + 1}</span>${s.toc || s.title}</a>`).join("");
    const vid = P.video != null ? `<a class="btn small" target="_blank" rel="noopener" href="${VIDEO}&t=${P.video}s">▶ Course chapter${P.videoLabel ? " · " + P.videoLabel : ""}</a>` : "";
    const repo = P.repo ? `<a class="btn small" target="_blank" rel="noopener" href="${REPO}/tree/main/${P.repo}">📁 Course manifests: ${P.repo}</a>` : "";
    // Official docs links: page data wins, else the registry entry for this topic.
    const reg = (window.K8S_TOPICS || []).find(t => t.id === P.id) || {};
    const docs = (P.docs || reg.docs || []).map(([label, path]) => `<a class="btn small" target="_blank" rel="noopener" href="${path.startsWith("http") ? path : "https://kubernetes.io/docs/" + path}">📘 ${label}</a>`).join("");
    let body = "";
    secs.forEach((s, i) => {
      body += `<section class="topic" id="${s.id}"><div class="sec-head reveal"><div class="sec-num">${i + 1}</div><h2>${s.title}</h2></div>
        ${s.lead ? `<p class="sec-lead reveal">${s.lead}</p>` : ""}${s.id === "summary" ? summary(P) : renderBlocks(s.blocks || [])}</section>`;
    });
    document.getElementById("app").innerHTML = `
      <div class="progress-bar"></div><div class="blobs"><span></span><span></span><span></span></div>
      <div class="container layout">
        <aside class="toc glass"><a class="back" href="../index.html">← Dashboard</a><nav>${toc}</nav></aside>
        <main>
          <a class="back mback" href="../index.html">← Dashboard</a>
          <div class="hero glass reveal">
            <div class="chips"><span class="chip blue">${g.icon} ${g.title}</span>${P.minutes ? `<span class="chip">≈ ${P.minutes} min</span>` : ""}<span class="chip violet" id="doneChip" style="display:none">✓ Completed</span></div>
            <h1>${P.title}</h1><p>${P.lead}</p>
            ${P.parts ? `<div class="parts">${P.parts.map((p, i) => `<div class="part"><b>${i + 1} · ${p[0]}</b>${p[1]}</div>`).join("")}</div>` : ""}
            <div class="ref">${vid}${repo}${docs}</div>
          </div>
          ${body}
        </main>
      </div>`;
    runInits();
    wireSummary(P);
    K8S.initAll();
  };
  window.K8S_HL = hl;
  window.K8S_CODE = codeBox;
})();
