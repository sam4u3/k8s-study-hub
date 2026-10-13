# Kubernetes Study Hub

Interactive, glassy study pages for Kubernetes, grouped on one dashboard.

Live site: https://sam4u3.github.io/k8s-study-hub/

Topics are grouped like the Concepts section of the
[official Kubernetes documentation](https://kubernetes.io/docs/concepts/) (CC BY 4.0): Getting started,
Overview, Cluster Architecture, Containers, Workloads, Networking, Storage, Configuration, Security,
Policies, Scheduling, Cluster Administration, Extending Kubernetes, plus Tutorials.
`docs-map.html` maps every Concepts page to the topic that teaches it.

The tutorials use a sample microservices app (GameHub) adapted from
[saiyam1814/Kubernetes-crash-course-2025](https://github.com/saiyam1814/Kubernetes-crash-course-2025) (MIT License).

## Structure
- `index.html` – dashboard (groups, search, progress)
- `docs-map.html` – coverage map of the official docs Concepts section
- `assets/topics.js` – topic registry, in learning order
- `assets/topic.js` + `assets/topic.css` – data-driven renderer and widgets for topic pages
- `assets/glass.css` + `assets/glass.js` – shared theme and helpers
- `topics/<group>-<topic>.html` – one page per topic; each calls `K8S_RENDER({...})`

## Add a topic
1. Copy an existing `topics/<group>-<topic>.html`, change the data passed to `K8S_RENDER`.
2. Register it in `assets/topics.js` with `status: "ready"` and its `file` path.
3. Commit and push to `main`; GitHub Pages redeploys automatically.
