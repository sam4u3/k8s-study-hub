# Kubernetes Study Hub

Interactive, glassy study pages for Kubernetes, grouped on one dashboard.

Live site: https://sam4u3.github.io/k8s-study-hub/

Topics follow the chapters of the free course
[Learn Kubernetes in 6 Hours](https://www.youtube.com/watch?v=_4uQI4ihGVU) (kubesimplify × freeCodeCamp)
and reuse manifests from its MIT-licensed repo
[saiyam1814/Kubernetes-crash-course-2025](https://github.com/saiyam1814/Kubernetes-crash-course-2025).
Topics 23–37 cover the remaining concepts from the official
[Kubernetes documentation](https://kubernetes.io/docs/concepts/); `docs-map.html` maps every
Concepts page to the topic that teaches it.

## Structure
- `index.html` – dashboard (groups, search, progress)
- `docs-map.html` – coverage map of the official docs Concepts section
- `assets/topics.js` – topic registry, in learning order
- `assets/topic.js` + `assets/topic.css` – data-driven renderer and widgets for topic pages
- `assets/glass.css` + `assets/glass.js` – shared theme and helpers
- `topics/NN-*.html` – one page per topic; each calls `K8S_RENDER({...})`

## Add a topic
1. Copy an existing `topics/NN-*.html`, change the data passed to `K8S_RENDER`.
2. Register it in `assets/topics.js` with `status: "ready"` and its `file` path.
3. Commit and push to `main`; GitHub Pages redeploys automatically.
