/* Shared behaviour for the Kubernetes study pages: reveal-on-scroll, copy buttons,
   animated terminals, reading progress, scrollspy and per-topic completion state. */
(function () {
  const KEY = "k8s-study-progress";

  function readProgress() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
  }
  function writeProgress(p) {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* storage blocked */ }
  }

  const K8S = {
    isDone(id) { return !!readProgress()[id]; },
    setDone(id, done) {
      const p = readProgress();
      if (done) p[id] = new Date().toISOString(); else delete p[id];
      writeProgress(p);
    },
    progress: readProgress,

    // Reveal elements with .reveal when they scroll into view.
    initReveal(root = document) {
      const els = root.querySelectorAll(".reveal:not(.in)");
      if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      els.forEach(e => io.observe(e));
    },

    // Add copy buttons to every .code block. Lines in .term blocks are copied without prompts/output.
    initCopy(root = document) {
      root.querySelectorAll(".code").forEach(block => {
        const btn = block.querySelector(".copy");
        if (!btn || btn.dataset.bound) return;
        btn.dataset.bound = "1";
        btn.addEventListener("click", () => {
          const pre = block.querySelector("pre");
          let text;
          if (pre.classList.contains("term")) {
            text = [...pre.querySelectorAll(".ln.cmd")].map(l => l.textContent).join("\n");
          } else {
            text = pre.innerText;
          }
          const done = () => { btn.textContent = "Copied"; btn.classList.add("ok");
            setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("ok"); }, 1400); };
          if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
          else done();
        });
      });
    },

    // Play .term blocks line by line when visible.
    initTerminals(root = document) {
      const terms = root.querySelectorAll("pre.term");
      const play = pre => {
        if (pre.dataset.played) return;
        pre.dataset.played = "1";
        const lines = [...pre.querySelectorAll(".ln")];
        lines.forEach((ln, i) => setTimeout(() => ln.classList.add("show"), 160 + i * (ln.classList.contains("cmd") ? 260 : 110)));
      };
      if (!("IntersectionObserver" in window)) { terms.forEach(play); return; }
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { play(en.target); io.unobserve(en.target); } });
      }, { threshold: 0.3 });
      terms.forEach(t => io.observe(t));
    },

    replayTerminal(pre) {
      delete pre.dataset.played;
      pre.querySelectorAll(".ln").forEach(l => l.classList.remove("show"));
      const lines = [...pre.querySelectorAll(".ln")];
      pre.dataset.played = "1";
      lines.forEach((ln, i) => setTimeout(() => ln.classList.add("show"), 120 + i * 140));
    },

    initProgressBar() {
      const bar = document.querySelector(".progress-bar");
      if (!bar) return;
      const upd = () => {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
      };
      addEventListener("scroll", upd, { passive: true }); upd();
    },

    // Highlight nav links whose href matches the section in view.
    initScrollSpy(selector = "[data-spy]") {
      const links = [...document.querySelectorAll(selector)];
      const map = new Map();
      links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) map.set(s, a); });
      if (!map.size || !("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            links.forEach(l => l.classList.remove("active"));
            map.get(en.target).classList.add("active");
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      map.forEach((_, s) => io.observe(s));
    },

    // Wrap a code string into a styled block (used by pages that render code from JS).
    codeBlock(title, code) {
      const esc = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<div class="code"><div class="code-head"><span><span class="dots"><i></i><i></i><i></i></span>${title}</span><button class="copy">Copy</button></div><pre>${esc}</pre></div>`;
    },

    initAll() {
      this.initReveal(); this.initCopy(); this.initTerminals();
      this.initProgressBar(); this.initScrollSpy();
    }
  };

  window.K8S = K8S;
})();
