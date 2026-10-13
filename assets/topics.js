/* Topic registry for the dashboard (index.html).
   To add a topic: drop the HTML file into topics/, then add or update one entry in TOPICS
   with status "ready" and the file path. Entries with status "planned" show as roadmap cards. */
window.K8S_GROUPS = [
  { id: "foundations", title: "Foundations & Setup", icon: "🚀", color: "#5b8cff",
    desc: "History, cluster bootstrap, API model and first user access." },
  { id: "architecture", title: "Architecture", icon: "🏛️", color: "#8b5cf6",
    desc: "Control plane, node internals, etcd and how requests flow." },
  { id: "components", title: "Core Components & Workloads", icon: "🧩", color: "#22d3ee",
    desc: "Pods, controllers and the objects you deploy every day." },
  { id: "networking", title: "Networking", icon: "🌐", color: "#34d399",
    desc: "Services, CNI, DNS, Ingress, Gateway API and policies." },
  { id: "storage", title: "Storage", icon: "💾", color: "#fbbf24",
    desc: "Volumes, PV/PVC, StorageClass and CSI drivers." },
  { id: "security", title: "Security", icon: "🛡️", color: "#f87171",
    desc: "AuthN, RBAC, ServiceAccounts, Pod Security and secrets." },
  { id: "scheduling", title: "Scheduling & Scaling", icon: "⚖️", color: "#ec4899",
    desc: "Scheduler, affinity, taints, autoscaling and resources." },
  { id: "advanced", title: "Advanced & Extensibility", icon: "🧠", color: "#a78bfa",
    desc: "CRDs, operators, admission control, aggregation, DRA." },
  { id: "operations", title: "Operations", icon: "🛠️", color: "#67e8f9",
    desc: "Upgrades, backup, observability and troubleshooting." }
];

window.K8S_TOPICS = [
  { id: "01-bootstrap", group: "foundations", status: "ready",
    file: "topics/01-history-kubeadm-api-access.html",
    title: "History, kubeadm Install, API Groups & User Access via CSR",
    summary: "From Borg to today, bootstrap a cluster with kubeadm, map every API group/version, then create a real user with a CSR and RBAC.",
    tags: ["history", "kubeadm", "api-groups", "csr", "rbac", "kubeconfig"], minutes: 45 },

  { id: "arch-control-plane", group: "architecture", status: "planned", title: "Control Plane Deep Dive", summary: "kube-apiserver, scheduler, controller-manager, cloud-controller-manager.", tags: ["apiserver", "scheduler"] },
  { id: "arch-node", group: "architecture", status: "planned", title: "Node Internals: kubelet, CRI, kube-proxy", summary: "How a Pod becomes running containers.", tags: ["kubelet", "cri"] },
  { id: "arch-etcd", group: "architecture", status: "planned", title: "etcd & Cluster State", summary: "Raft, watches, backup and restore.", tags: ["etcd"] },

  { id: "comp-pods", group: "components", status: "planned", title: "Pods, Init & Sidecar Containers", summary: "Lifecycle, probes, restart policy.", tags: ["pod"] },
  { id: "comp-controllers", group: "components", status: "planned", title: "Deployments, StatefulSets, DaemonSets, Jobs", summary: "Workload controllers and rollouts.", tags: ["deployment"] },
  { id: "comp-config", group: "components", status: "planned", title: "ConfigMaps & Secrets", summary: "Configuration injection patterns.", tags: ["configmap"] },

  { id: "net-services", group: "networking", status: "planned", title: "Services & kube-proxy", summary: "ClusterIP, NodePort, LoadBalancer, EndpointSlices.", tags: ["service"] },
  { id: "net-cni", group: "networking", status: "planned", title: "CNI & Pod Networking", summary: "Calico, Cilium, Flannel compared.", tags: ["cni"] },
  { id: "net-ingress", group: "networking", status: "planned", title: "Ingress & Gateway API", summary: "North-south traffic routing.", tags: ["ingress", "gateway"] },
  { id: "net-policy", group: "networking", status: "planned", title: "NetworkPolicy & CoreDNS", summary: "Isolation and service discovery.", tags: ["dns"] },

  { id: "sto-pv", group: "storage", status: "planned", title: "PV, PVC & StorageClass", summary: "Static vs dynamic provisioning.", tags: ["pvc"] },
  { id: "sto-csi", group: "storage", status: "planned", title: "CSI Drivers & Snapshots", summary: "Pluggable storage.", tags: ["csi"] },

  { id: "sec-rbac", group: "security", status: "planned", title: "RBAC Deep Dive", summary: "Roles, aggregation, least privilege.", tags: ["rbac"] },
  { id: "sec-sa", group: "security", status: "planned", title: "ServiceAccounts & Tokens", summary: "Bound tokens, projected volumes.", tags: ["serviceaccount"] },
  { id: "sec-psa", group: "security", status: "planned", title: "Pod Security Admission", summary: "privileged / baseline / restricted.", tags: ["psa"] },

  { id: "sch-scheduler", group: "scheduling", status: "planned", title: "Scheduler, Affinity, Taints", summary: "How placement decisions are made.", tags: ["scheduler"] },
  { id: "sch-autoscale", group: "scheduling", status: "planned", title: "HPA, VPA & Cluster Autoscaler", summary: "Scaling pods and nodes.", tags: ["hpa"] },

  { id: "adv-crd", group: "advanced", status: "planned", title: "CRDs & Operators", summary: "Extend the API with your own kinds.", tags: ["crd"] },
  { id: "adv-admission", group: "advanced", status: "planned", title: "Admission Webhooks & ValidatingAdmissionPolicy", summary: "Mutate and validate requests.", tags: ["admission", "cel"] },

  { id: "ops-upgrade", group: "operations", status: "planned", title: "Cluster Upgrades with kubeadm", summary: "Version skew and safe upgrades.", tags: ["upgrade"] },
  { id: "ops-troubleshoot", group: "operations", status: "planned", title: "Troubleshooting Playbook", summary: "Pods, nodes, networking, control plane.", tags: ["debug"] }
];
