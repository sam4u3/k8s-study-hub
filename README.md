# Cloud Native Study Hub

Interactive, glassy study pages for Kubernetes and the tools around it. The home page lists the
apps; each app has its own dashboard of topics, organised like that project's official documentation.

Live site: https://sam4u3.github.io/k8s-study-hub/

## Apps
- **Kubernetes** (`kubernetes/`): grouped like the Concepts section of the
  [official Kubernetes documentation](https://kubernetes.io/docs/concepts/) (CC BY 4.0).
  `kubernetes/docs-map.html` maps every Concepts page to the topic that teaches it.
  The tutorials use a sample microservices app (GameHub) adapted from
  [saiyam1814/Kubernetes-crash-course-2025](https://github.com/saiyam1814/Kubernetes-crash-course-2025) (MIT License).
- **Helm** (`helm/`): grouped like the [Helm 4 documentation](https://helm.sh/docs/).

Planned apps (shown on the home page as roadmap cards): Kustomize, Argo CD, Prometheus, cert-manager.

## Structure
- `index.html` – home page: app picker with per-app progress
- `assets/apps.js` – app catalog and logos
- `assets/dashboard.js` + `assets/dashboard.css` – shared app dashboard (groups, search, progress)
- `assets/topic.js` + `assets/topic.css` – data-driven renderer and widgets for topic pages
- `assets/glass.css` + `assets/glass.js` – shared theme, helpers and progress storage
- `<app>/index.html` – the app's dashboard (loads its registry and `dashboard.js`)
- `<app>/registry.js` – app metadata (`K8S_APP`), groups and topics
- `<app>/topics/<group>-<topic>.html` – one page per topic; each calls `K8S_RENDER({...})`
- `topics/*.html`, `docs-map.html` – redirects from the old Kubernetes-only URLs

## Add a topic
1. Copy an existing `<app>/topics/*.html` and change the data passed to `K8S_RENDER`.
2. Register it in `<app>/registry.js` with `status: "ready"` and its `file` path.
3. Commit and push to `main`; GitHub Pages redeploys automatically.

## Add an app
1. Create `<app>/registry.js` (copy `helm/registry.js`) with `K8S_APP`, `K8S_GROUPS` and `K8S_TOPICS`.
2. Copy `helm/index.html` to `<app>/index.html` and change its `<title>`.
3. Add the app to `assets/apps.js` with `status: "ready"`, and add its registry script to `index.html`.
4. Use topic ids prefixed with the app name so progress doesn't collide.
