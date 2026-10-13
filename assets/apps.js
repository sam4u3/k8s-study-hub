/* App catalog for the home page, plus the logos shared by app dashboards.
   To add an app: create <app>/index.html, <app>/registry.js and <app>/topics/, then add an entry here
   with status "ready". Entries with status "planned" show as roadmap cards on the home page. */
window.STUDY_LOGOS = {
  wheel: `<svg class="wheel" viewBox="0 0 100 100" aria-hidden="true">
    <polygon points="50,4 88,22 97,63 71,95 29,95 3,63 12,22" fill="#326ce5"/>
    <circle cx="50" cy="52" r="20" fill="none" stroke="#fff" stroke-width="5"/>
    <g stroke="#fff" stroke-width="5" stroke-linecap="round">
      <line x1="50" y1="52" x2="50" y2="20"/><line x1="50" y1="52" x2="75" y2="38"/>
      <line x1="50" y1="52" x2="80" y2="62"/><line x1="50" y1="52" x2="62" y2="82"/>
      <line x1="50" y1="52" x2="38" y2="82"/><line x1="50" y1="52" x2="20" y2="62"/>
      <line x1="50" y1="52" x2="25" y2="38"/>
    </g>
    <circle cx="50" cy="52" r="6" fill="#fff"/>
  </svg>`,
  helm: `<svg class="wheel" viewBox="0 0 100 100" aria-hidden="true">
    <g stroke="#7aa2ff" stroke-width="7" stroke-linecap="round">
      <line x1="50" y1="6" x2="50" y2="94"/><line x1="6" y1="50" x2="94" y2="50"/>
      <line x1="19" y1="19" x2="81" y2="81"/><line x1="81" y1="19" x2="19" y2="81"/>
    </g>
    <circle cx="50" cy="50" r="30" fill="none" stroke="#7aa2ff" stroke-width="8"/>
    <circle cx="50" cy="50" r="10" fill="#0f1689" stroke="#7aa2ff" stroke-width="5"/>
  </svg>`
};

window.STUDY_APP_CATALOG = [
  { id: "kubernetes", status: "ready", name: "Kubernetes", logo: "wheel", color: "#326ce5", path: "kubernetes/", registry: "kubernetes/registry.js",
    desc: "The container orchestrator itself: architecture, workloads, networking, storage, security, scheduling and operations, following the official docs." },
  { id: "helm", status: "ready", name: "Helm", logo: "helm", color: "#7aa2ff", path: "helm/", registry: "helm/registry.js",
    desc: "The package manager for Kubernetes: charts, releases, templates, hooks, OCI registries and Helm 4 plugins, following the Helm docs." },
  { id: "kustomize", status: "planned", name: "Kustomize", icon: "🧩", color: "#34d399",
    desc: "Template-free customization of Kubernetes YAML with bases, overlays and patches." },
  { id: "argocd", status: "planned", name: "Argo CD", icon: "🐙", color: "#f97316",
    desc: "GitOps continuous delivery: sync applications from Git into clusters." },
  { id: "prometheus", status: "planned", name: "Prometheus", icon: "🔥", color: "#ef4444",
    desc: "Metrics, PromQL, alerting and the kube-prometheus stack." },
  { id: "cert-manager", status: "planned", name: "cert-manager", icon: "🔐", color: "#a78bfa",
    desc: "Automated TLS certificates from ACME, Vault and private CAs." }
];
