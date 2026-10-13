/* Kubernetes app: topic registry for its dashboard (kubernetes/index.html), the docs map and the
   previous/next links on topic pages. Groups and their order follow the Concepts section of the official
   Kubernetes documentation (https://kubernetes.io/docs/concepts/), with Getting Started first and Tutorials last.
   To add a topic: put the HTML file in kubernetes/topics/, then add an entry with status "ready" and its file path.
   Entries with status "planned" show as roadmap cards. */
window.K8S_APP = {
  id: "kubernetes",
  name: "Kubernetes",
  title: 'Kubernetes <span class="grad-text">Study Hub</span>',
  lead: "Interactive study pages organised like the official Kubernetes documentation: from getting started through workloads, networking, storage and security to cluster administration and extending Kubernetes.",
  logo: "wheel",
  docsBase: "https://kubernetes.io/docs/",
  links: [["📘 Kubernetes docs", "https://kubernetes.io/docs/concepts/"], ["📘 Docs coverage map", "docs-map.html"]],
  footer: 'Topics are grouped like the <a href="https://kubernetes.io/docs/concepts/" target="_blank" rel="noopener">official Kubernetes documentation</a> (CC BY 4.0), with extra material from project docs and release notes.'
};
window.K8S_GROUPS = [
  {
    "id": "setup",
    "title": "Getting Started & Setup",
    "icon": "🚀",
    "color": "#5b8cff",
    "desc": "Choose a cluster type and install one with kubeadm.",
    "docs": "setup/"
  },
  {
    "id": "overview",
    "title": "Overview",
    "icon": "🧭",
    "color": "#67e8f9",
    "desc": "What Kubernetes is, its API, and the objects you work with.",
    "docs": "concepts/overview/"
  },
  {
    "id": "architecture",
    "title": "Cluster Architecture",
    "icon": "🏛️",
    "color": "#8b5cf6",
    "desc": "Control plane, nodes, controllers, leases and self-healing.",
    "docs": "concepts/architecture/"
  },
  {
    "id": "containers",
    "title": "Containers",
    "icon": "📦",
    "color": "#22d3ee",
    "desc": "Images, runtimes, container environment and lifecycle hooks.",
    "docs": "concepts/containers/"
  },
  {
    "id": "workloads",
    "title": "Workloads",
    "icon": "🧩",
    "color": "#34d399",
    "desc": "Pods, workload controllers, Jobs and autoscaling.",
    "docs": "concepts/workloads/"
  },
  {
    "id": "networking",
    "title": "Services, Load Balancing & Networking",
    "icon": "🌐",
    "color": "#5eead4",
    "desc": "Pod networking, Services, DNS, Ingress, Gateway API and policies.",
    "docs": "concepts/services-networking/"
  },
  {
    "id": "storage",
    "title": "Storage",
    "icon": "💾",
    "color": "#fbbf24",
    "desc": "Volumes, PV/PVC, StorageClasses, CSI, snapshots.",
    "docs": "concepts/storage/"
  },
  {
    "id": "configuration",
    "title": "Configuration",
    "icon": "⚙️",
    "color": "#f59e0b",
    "desc": "ConfigMaps, Secrets and configuration practices.",
    "docs": "concepts/configuration/"
  },
  {
    "id": "security",
    "title": "Security",
    "icon": "🛡️",
    "color": "#f87171",
    "desc": "Pod security, RBAC, service accounts, authentication and hardening.",
    "docs": "concepts/security/"
  },
  {
    "id": "policies",
    "title": "Policies",
    "icon": "📏",
    "color": "#fb923c",
    "desc": "Resource quotas, limit ranges and PID limits.",
    "docs": "concepts/policy/"
  },
  {
    "id": "scheduling",
    "title": "Scheduling, Preemption & Eviction",
    "icon": "⚖️",
    "color": "#ec4899",
    "desc": "Scheduler, placement, disruptions, eviction and devices.",
    "docs": "concepts/scheduling-eviction/"
  },
  {
    "id": "admin",
    "title": "Cluster Administration",
    "icon": "🛠️",
    "color": "#a78bfa",
    "desc": "Upgrades, certificates, etcd, observability and troubleshooting.",
    "docs": "concepts/cluster-administration/"
  },
  {
    "id": "windows",
    "title": "Windows in Kubernetes",
    "icon": "🪟",
    "color": "#60a5fa",
    "desc": "Windows nodes and containers.",
    "docs": "concepts/windows/"
  },
  {
    "id": "extending",
    "title": "Extending Kubernetes",
    "icon": "🔌",
    "color": "#c084fc",
    "desc": "CRDs, operators, API aggregation and admission.",
    "docs": "concepts/extend-kubernetes/"
  },
  {
    "id": "tutorials",
    "title": "Tutorials",
    "icon": "🎓",
    "color": "#4ade80",
    "desc": "End-to-end walkthroughs with a sample microservices app.",
    "docs": "tutorials/"
  }
];

window.K8S_TOPICS = [
  {
    "id": "setup-options",
    "group": "setup",
    "status": "ready",
    "file": "topics/setup-cluster-options.html",
    "title": "Choosing a Cluster: Local, Self-Managed or Managed",
    "summary": "kubeadm on your own VMs vs managed control planes (SKS, EKS, GKE, AKS) vs local clusters.",
    "tags": [
      "kubeadm",
      "managed",
      "sks",
      "kind"
    ],
    "minutes": 20,
    "docs": [
      [
        "Getting started",
        "setup/"
      ],
      [
        "Production environment",
        "setup/production-environment/"
      ]
    ]
  },
  {
    "id": "setup-kubeadm",
    "group": "setup",
    "status": "ready",
    "file": "topics/setup-kubeadm.html",
    "title": "Install a Cluster with kubeadm",
    "summary": "Prepare nodes, install containerd and kube tools, run kubeadm init, add a CNI, join workers, and see every init phase.",
    "tags": [
      "kubeadm",
      "containerd",
      "install"
    ],
    "minutes": 30,
    "docs": [
      [
        "Installing kubeadm",
        "setup/production-environment/tools/kubeadm/install-kubeadm/"
      ],
      [
        "Creating a cluster with kubeadm",
        "setup/production-environment/tools/kubeadm/create-cluster-kubeadm/"
      ]
    ]
  },
  {
    "id": "overview-intro",
    "group": "overview",
    "status": "ready",
    "file": "topics/overview-what-is-kubernetes.html",
    "title": "Kubernetes Overview: Deployment Eras, Containers & History",
    "summary": "Traditional, virtualized and container deployment eras, what a container really is, and Kubernetes' history from Borg to today.",
    "tags": [
      "containers",
      "docker",
      "namespaces",
      "cgroups"
    ],
    "minutes": 25,
    "docs": [
      [
        "Overview",
        "concepts/overview/"
      ],
      [
        "Containers",
        "concepts/containers/"
      ]
    ]
  },
  {
    "id": "overview-api",
    "group": "overview",
    "status": "ready",
    "file": "topics/overview-kubernetes-api.html",
    "title": "The Kubernetes API: Groups, Versions & Discovery",
    "summary": "Core vs named groups, alpha/beta/stable, an explorer of built-in resources, a URL builder and removed APIs.",
    "tags": [
      "api",
      "api-groups",
      "deprecation"
    ],
    "minutes": 25,
    "docs": [
      [
        "The Kubernetes API",
        "concepts/overview/kubernetes-api/"
      ],
      [
        "API concepts",
        "reference/using-api/api-concepts/"
      ],
      [
        "Deprecated API migration guide",
        "reference/using-api/deprecation-guide/"
      ]
    ]
  },
  {
    "id": "overview-objects",
    "group": "overview",
    "status": "ready",
    "file": "topics/overview-objects-yaml-kubeconfig.html",
    "title": "Objects in YAML & kubeconfig",
    "summary": "YAML rules, manifest anatomy, generating YAML with dry-run, and how kubeconfig clusters/users/contexts work.",
    "tags": [
      "yaml",
      "kubeconfig",
      "context",
      "kubectl"
    ],
    "minutes": 25,
    "docs": [
      [
        "Objects",
        "concepts/overview/working-with-objects/"
      ],
      [
        "kubeconfig",
        "concepts/configuration/organize-cluster-access-kubeconfig/"
      ]
    ]
  },
  {
    "id": "overview-metadata",
    "group": "overview",
    "status": "ready",
    "file": "topics/overview-object-metadata.html",
    "title": "Labels, Annotations, Finalizers & Object Management",
    "summary": "Names and UIDs, labels vs annotations, field selectors, finalizers, owners, cascading deletion and server-side apply.",
    "tags": [
      "labels",
      "finalizers",
      "garbage-collection",
      "server-side-apply"
    ],
    "minutes": 25,
    "docs": [
      [
        "Objects",
        "concepts/overview/working-with-objects/"
      ],
      [
        "Finalizers",
        "concepts/overview/working-with-objects/finalizers/"
      ],
      [
        "Garbage collection",
        "concepts/architecture/garbage-collection/"
      ]
    ]
  },
  {
    "id": "arch-components",
    "group": "architecture",
    "status": "ready",
    "file": "topics/architecture-components.html",
    "title": "Cluster Architecture & Components",
    "summary": "Control plane and node components, and the full journey of kubectl create deployment.",
    "tags": [
      "apiserver",
      "etcd",
      "scheduler",
      "kubelet"
    ],
    "minutes": 30,
    "docs": [
      [
        "Components",
        "concepts/overview/components/"
      ],
      [
        "Cluster architecture",
        "concepts/architecture/"
      ]
    ]
  },
  {
    "id": "arch-internals",
    "group": "architecture",
    "status": "ready",
    "file": "topics/architecture-control-plane-internals.html",
    "title": "Control-Plane Internals: API Priority & Fairness, Leases, Scheduler Framework",
    "summary": "How the API server protects itself, leader election with Leases, watch caches, and how the scheduler is built from plugins.",
    "tags": [
      "apf",
      "leases",
      "scheduler-framework",
      "watch"
    ],
    "minutes": 25,
    "docs": [
      [
        "API Priority and Fairness",
        "concepts/cluster-administration/flow-control/"
      ],
      [
        "Leases",
        "concepts/architecture/leases/"
      ],
      [
        "Scheduling framework",
        "concepts/scheduling-eviction/scheduling-framework/"
      ]
    ]
  },
  {
    "id": "containers-cri",
    "group": "containers",
    "status": "ready",
    "file": "topics/containers-runtime-cri.html",
    "title": "Container Runtimes & CRI",
    "summary": "kubelet → CRI → containerd → runc, the pause container, dockershim history and crictl.",
    "tags": [
      "cri",
      "containerd",
      "runc",
      "crictl"
    ],
    "minutes": 20,
    "docs": [
      [
        "CRI",
        "concepts/containers/cri/"
      ],
      [
        "RuntimeClass",
        "concepts/containers/runtime-class/"
      ]
    ]
  },
  {
    "id": "containers-env",
    "group": "containers",
    "status": "ready",
    "file": "topics/containers-images-env-hooks.html",
    "title": "Images, Container Environment, Lifecycle Hooks & Downward API",
    "summary": "Image pull policies and digests, env and Downward API, postStart/preStop hooks, graceful termination and static Pods.",
    "tags": [
      "images",
      "lifecycle-hooks",
      "downward-api",
      "termination"
    ],
    "minutes": 25,
    "docs": [
      [
        "Images",
        "concepts/containers/images/"
      ],
      [
        "Lifecycle hooks",
        "concepts/containers/container-lifecycle-hooks/"
      ],
      [
        "Downward API",
        "concepts/workloads/pods/downward-api/"
      ]
    ]
  },
  {
    "id": "workloads-pods",
    "group": "workloads",
    "status": "ready",
    "file": "topics/workloads-pods.html",
    "title": "Pods: Lifecycle, Init & Sidecar Containers, Probes, QoS",
    "summary": "Lifecycle, command/args, multi-container, init and native sidecar containers, probes and QoS.",
    "tags": [
      "pod",
      "probes",
      "init",
      "sidecar"
    ],
    "minutes": 35,
    "docs": [
      [
        "Pods",
        "concepts/workloads/pods/"
      ],
      [
        "Pod lifecycle",
        "concepts/workloads/pods/pod-lifecycle/"
      ]
    ]
  },
  {
    "id": "workloads-deployments",
    "group": "workloads",
    "status": "ready",
    "file": "topics/workloads-deployments-replicasets.html",
    "title": "ReplicaSets & Deployments",
    "summary": "Ownership and deletion propagation, rolling updates, Recreate, rollback and a canary with labels.",
    "tags": [
      "deployment",
      "replicaset",
      "rollout",
      "canary"
    ],
    "minutes": 30,
    "docs": [
      [
        "Deployments",
        "concepts/workloads/controllers/deployment/"
      ],
      [
        "ReplicaSet",
        "concepts/workloads/controllers/replicaset/"
      ]
    ]
  },
  {
    "id": "workloads-ds-sts",
    "group": "workloads",
    "status": "ready",
    "file": "topics/workloads-daemonsets-statefulsets.html",
    "title": "DaemonSets & StatefulSets",
    "summary": "One Pod per node vs stable identity, ordered rollout and per-replica storage.",
    "tags": [
      "daemonset",
      "statefulset",
      "headless"
    ],
    "minutes": 20,
    "docs": [
      [
        "DaemonSet",
        "concepts/workloads/controllers/daemonset/"
      ],
      [
        "StatefulSets",
        "concepts/workloads/controllers/statefulset/"
      ]
    ]
  },
  {
    "id": "workloads-jobs",
    "group": "workloads",
    "status": "ready",
    "file": "topics/workloads-jobs-cronjobs.html",
    "title": "Jobs & CronJobs",
    "summary": "Run-to-completion work: parallelism, indexed Jobs, failure and success policies, TTL cleanup and cron schedules.",
    "tags": [
      "job",
      "cronjob",
      "batch"
    ],
    "minutes": 25,
    "docs": [
      [
        "Jobs",
        "concepts/workloads/controllers/job/"
      ],
      [
        "CronJob",
        "concepts/workloads/controllers/cron-jobs/"
      ],
      [
        "TTL after finished",
        "concepts/workloads/controllers/ttlafterfinished/"
      ]
    ]
  },
  {
    "id": "workloads-autoscaling",
    "group": "workloads",
    "status": "ready",
    "file": "topics/workloads-autoscaling.html",
    "title": "Autoscaling: HPA, VPA, In-Place Resize & Node Autoscaling",
    "summary": "Scale replicas on metrics, right-size requests, resize Pods without restarts, and add or remove nodes.",
    "tags": [
      "hpa",
      "vpa",
      "cluster-autoscaler",
      "karpenter"
    ],
    "minutes": 30,
    "docs": [
      [
        "Autoscaling workloads",
        "concepts/workloads/autoscaling/"
      ],
      [
        "HPA",
        "tasks/run-application/horizontal-pod-autoscale/"
      ],
      [
        "Node autoscaling",
        "concepts/cluster-administration/node-autoscaling/"
      ]
    ]
  },
  {
    "id": "net-cni",
    "group": "networking",
    "status": "ready",
    "file": "topics/networking-cluster-networking-cni.html",
    "title": "Cluster Networking & CNI",
    "summary": "Pod network model, veth pairs, network namespaces, shared localhost and cross-node routing.",
    "tags": [
      "cni",
      "veth",
      "netns",
      "flannel",
      "calico"
    ],
    "minutes": 25,
    "docs": [
      [
        "Cluster networking",
        "concepts/cluster-administration/networking/"
      ],
      [
        "Network plugins",
        "concepts/extend-kubernetes/compute-storage-net/network-plugins/"
      ]
    ]
  },
  {
    "id": "net-services",
    "group": "networking",
    "status": "ready",
    "file": "topics/networking-services-ingress.html",
    "title": "Services, Ingress & ExternalDNS",
    "summary": "ClusterIP, NodePort, LoadBalancer, ExternalName, headless, EndpointSlices and Ingress controllers.",
    "tags": [
      "service",
      "nodeport",
      "ingress",
      "externalname"
    ],
    "minutes": 35,
    "docs": [
      [
        "Service",
        "concepts/services-networking/service/"
      ],
      [
        "Ingress",
        "concepts/services-networking/ingress/"
      ]
    ]
  },
  {
    "id": "net-kube-proxy",
    "group": "networking",
    "status": "ready",
    "file": "topics/networking-kube-proxy-virtual-ips.html",
    "title": "Virtual IPs & kube-proxy",
    "summary": "How a Service IP becomes a Pod IP: iptables chains, probabilities, IPVS and nftables modes.",
    "tags": [
      "kube-proxy",
      "iptables",
      "ipvs",
      "nftables"
    ],
    "minutes": 20,
    "docs": [
      [
        "Virtual IPs & proxies",
        "reference/networking/virtual-ips/"
      ]
    ]
  },
  {
    "id": "net-dns",
    "group": "networking",
    "status": "ready",
    "file": "topics/networking-dns.html",
    "title": "DNS for Services and Pods (CoreDNS)",
    "summary": "Service DNS names, the Corefile, resolv.conf search paths, ndots and debugging DNS.",
    "tags": [
      "coredns",
      "dns",
      "discovery"
    ],
    "minutes": 15,
    "docs": [
      [
        "DNS for Services & Pods",
        "concepts/services-networking/dns-pod-service/"
      ]
    ]
  },
  {
    "id": "net-advanced",
    "group": "networking",
    "status": "ready",
    "file": "topics/networking-endpointslices-traffic.html",
    "title": "Advanced Service Networking: EndpointSlices, Traffic Policies, Dual-Stack",
    "summary": "EndpointSlices, internal/external traffic policy, trafficDistribution, topology-aware routing, ServiceCIDRs and IPv4/IPv6.",
    "tags": [
      "endpointslice",
      "traffic-distribution",
      "dual-stack",
      "servicecidr"
    ],
    "minutes": 25,
    "docs": [
      [
        "EndpointSlices",
        "concepts/services-networking/endpoint-slices/"
      ],
      [
        "Topology aware routing",
        "concepts/services-networking/topology-aware-routing/"
      ],
      [
        "Dual-stack",
        "concepts/services-networking/dual-stack/"
      ]
    ]
  },
  {
    "id": "net-gateway",
    "group": "networking",
    "status": "ready",
    "file": "topics/networking-gateway-api.html",
    "title": "Gateway API & TLS with cert-manager",
    "summary": "GatewayClass, Gateway, HTTPRoute, kgateway, Let's Encrypt certificates and HTTP→HTTPS redirect.",
    "tags": [
      "gateway-api",
      "cert-manager",
      "tls",
      "kgateway"
    ],
    "minutes": 25,
    "docs": [
      [
        "Gateway API",
        "concepts/services-networking/gateway/"
      ]
    ]
  },
  {
    "id": "net-policies",
    "group": "networking",
    "status": "ready",
    "file": "topics/networking-network-policies.html",
    "title": "Network Policies",
    "summary": "Default-deny, allow rules by Pod, namespace and IP block, egress to DNS, and securing GameHub's traffic.",
    "tags": [
      "networkpolicy",
      "zero-trust",
      "egress"
    ],
    "minutes": 25,
    "docs": [
      [
        "Network Policies",
        "concepts/services-networking/network-policies/"
      ],
      [
        "Declare policy",
        "tasks/administer-cluster/declare-network-policy/"
      ]
    ]
  },
  {
    "id": "storage-volumes",
    "group": "storage",
    "status": "ready",
    "file": "topics/storage-volumes-pv-pvc.html",
    "title": "Volumes, PV/PVC, StorageClasses & Running Databases",
    "summary": "emptyDir, hostPath, PV/PVC binding, StorageClasses, NFS and running PostgreSQL with an operator.",
    "tags": [
      "pvc",
      "storageclass",
      "cnpg",
      "postgres"
    ],
    "minutes": 30,
    "docs": [
      [
        "Persistent volumes",
        "concepts/storage/persistent-volumes/"
      ],
      [
        "Storage classes",
        "concepts/storage/storage-classes/"
      ]
    ]
  },
  {
    "id": "storage-csi",
    "group": "storage",
    "status": "ready",
    "file": "topics/storage-csi.html",
    "title": "CSI: Container Storage Interface",
    "summary": "Why storage moved out of tree, CSI controller/node plugins and the provision → attach → mount flow.",
    "tags": [
      "csi",
      "storage",
      "driver"
    ],
    "minutes": 15,
    "docs": [
      [
        "Volumes: CSI",
        "concepts/storage/volumes/#csi"
      ]
    ]
  },
  {
    "id": "storage-advanced",
    "group": "storage",
    "status": "ready",
    "file": "topics/storage-advanced.html",
    "title": "Advanced Storage: Projected & Ephemeral Volumes, Snapshots, Expansion",
    "summary": "Projected and ephemeral volumes, image volumes, snapshots and clones, volume expansion, VolumeAttributesClass and local ephemeral storage.",
    "tags": [
      "snapshot",
      "ephemeral",
      "projected",
      "expansion"
    ],
    "minutes": 30,
    "docs": [
      [
        "Projected volumes",
        "concepts/storage/projected-volumes/"
      ],
      [
        "Ephemeral volumes",
        "concepts/storage/ephemeral-volumes/"
      ],
      [
        "Volume snapshots",
        "concepts/storage/volume-snapshots/"
      ]
    ]
  },
  {
    "id": "config-cm-secrets",
    "group": "configuration",
    "status": "ready",
    "file": "topics/configuration-configmaps-secrets.html",
    "title": "ConfigMaps & Secrets",
    "summary": "Inject config as env or files, Secrets are base64 not encryption, encryption at rest and pull secrets.",
    "tags": [
      "configmap",
      "secret",
      "encryption"
    ],
    "minutes": 25,
    "docs": [
      [
        "ConfigMaps",
        "concepts/configuration/configmap/"
      ],
      [
        "Secrets",
        "concepts/configuration/secret/"
      ],
      [
        "Encrypt data at rest",
        "tasks/administer-cluster/encrypt-data/"
      ]
    ]
  },
  {
    "id": "security-pod-security",
    "group": "security",
    "status": "ready",
    "file": "topics/security-pod-security.html",
    "title": "Pod Security: Standards, Admission & securityContext",
    "summary": "privileged/baseline/restricted, namespace labels, runAsNonRoot, capabilities, seccomp, AppArmor, SELinux and user namespaces.",
    "tags": [
      "psa",
      "securitycontext",
      "seccomp",
      "user-namespaces"
    ],
    "minutes": 30,
    "docs": [
      [
        "Pod Security Standards",
        "concepts/security/pod-security-standards/"
      ],
      [
        "Pod Security Admission",
        "concepts/security/pod-security-admission/"
      ],
      [
        "Security context",
        "tasks/configure-pod-container/security-context/"
      ]
    ]
  },
  {
    "id": "security-rbac",
    "group": "security",
    "status": "ready",
    "file": "topics/security-rbac-serviceaccounts-admission.html",
    "title": "RBAC, ServiceAccounts & Admission Policies",
    "summary": "Roles vs ClusterRoles, ServiceAccount tokens, calling the API with curl, and CEL ValidatingAdmissionPolicy.",
    "tags": [
      "rbac",
      "serviceaccount",
      "admission",
      "cel"
    ],
    "minutes": 30,
    "docs": [
      [
        "RBAC",
        "reference/access-authn-authz/rbac/"
      ],
      [
        "Service accounts",
        "concepts/security/service-accounts/"
      ],
      [
        "ValidatingAdmissionPolicy",
        "reference/access-authn-authz/validating-admission-policy/"
      ]
    ]
  },
  {
    "id": "security-csr",
    "group": "security",
    "status": "ready",
    "file": "topics/security-users-csr.html",
    "title": "Users, Certificates & CSRs",
    "summary": "Create a user with a private key, a CertificateSigningRequest, RBAC and a kubeconfig; simulate the request pipeline.",
    "tags": [
      "csr",
      "x509",
      "kubeconfig",
      "rbac"
    ],
    "minutes": 25,
    "docs": [
      [
        "Certificates and CSRs",
        "reference/access-authn-authz/certificate-signing-requests/"
      ],
      [
        "X.509 client certificates",
        "reference/access-authn-authz/authentication/#x509-client-certificates"
      ]
    ]
  },
  {
    "id": "security-api-access",
    "group": "security",
    "status": "ready",
    "file": "topics/security-api-access-hardening.html",
    "title": "API Access Control, Secrets Practices & Cluster Hardening",
    "summary": "Authentication methods and OIDC, authorization modes, impersonation, secrets good practices, multi-tenancy and the security checklist.",
    "tags": [
      "authentication",
      "oidc",
      "multi-tenancy",
      "hardening"
    ],
    "minutes": 30,
    "docs": [
      [
        "Controlling access",
        "concepts/security/controlling-access/"
      ],
      [
        "Authentication",
        "reference/access-authn-authz/authentication/"
      ],
      [
        "Security checklist",
        "concepts/security/security-checklist/"
      ]
    ]
  },
  {
    "id": "policies-quotas",
    "group": "policies",
    "status": "ready",
    "file": "topics/policies-quotas-limits.html",
    "title": "Resource Quotas, Limit Ranges & PID Limits",
    "summary": "Namespace totals with ResourceQuota, per-object defaults with LimitRange, quota scopes and PID limits.",
    "tags": [
      "resourcequota",
      "limitrange",
      "pid"
    ],
    "minutes": 20,
    "docs": [
      [
        "Resource quotas",
        "concepts/policy/resource-quotas/"
      ],
      [
        "Limit ranges",
        "concepts/policy/limit-range/"
      ],
      [
        "PID limiting",
        "concepts/policy/pid-limiting/"
      ]
    ]
  },
  {
    "id": "sched-scheduler",
    "group": "scheduling",
    "status": "ready",
    "file": "topics/scheduling-scheduler-placement.html",
    "title": "Scheduler & Pod Placement",
    "summary": "Labels, nodeSelector, affinity, taints, topology spread, priority, scheduling gates, quotas and limits.",
    "tags": [
      "scheduler",
      "affinity",
      "taints",
      "quota"
    ],
    "minutes": 40,
    "docs": [
      [
        "Scheduling & eviction",
        "concepts/scheduling-eviction/"
      ],
      [
        "Resource quotas",
        "concepts/policy/resource-quotas/"
      ]
    ]
  },
  {
    "id": "sched-disruptions",
    "group": "scheduling",
    "status": "ready",
    "file": "topics/scheduling-disruptions-eviction.html",
    "title": "Disruptions, PodDisruptionBudgets & Eviction",
    "summary": "Voluntary vs involuntary disruptions, PDBs, drain, API-initiated and node-pressure eviction, node shutdown.",
    "tags": [
      "pdb",
      "eviction",
      "drain",
      "node-pressure"
    ],
    "minutes": 25,
    "docs": [
      [
        "Disruptions",
        "concepts/workloads/pods/disruptions/"
      ],
      [
        "Node-pressure eviction",
        "concepts/scheduling-eviction/node-pressure-eviction/"
      ],
      [
        "Node shutdowns",
        "concepts/cluster-administration/node-shutdown/"
      ]
    ]
  },
  {
    "id": "sched-dra",
    "group": "scheduling",
    "status": "ready",
    "file": "topics/scheduling-dra-devices.html",
    "title": "GPUs & Devices: Device Plugins and Dynamic Resource Allocation",
    "summary": "Extended resources, device plugins, and DRA's DeviceClass, ResourceSlice and ResourceClaim for sharing and selecting hardware.",
    "tags": [
      "gpu",
      "dra",
      "device-plugin"
    ],
    "minutes": 25,
    "docs": [
      [
        "Device plugins",
        "concepts/extend-kubernetes/compute-storage-net/device-plugins/"
      ],
      [
        "Dynamic Resource Allocation",
        "concepts/scheduling-eviction/dynamic-resource-allocation/"
      ]
    ]
  },
  {
    "id": "sched-gang",
    "group": "scheduling",
    "status": "ready",
    "file": "topics/scheduling-gang-workload-api.html",
    "title": "Gang Scheduling: Workload API & PodGroups",
    "summary": "All-or-nothing scheduling for AI and batch: Workload and PodGroup objects, the PodGroup scheduling cycle, workload-aware preemption, topology constraints and CompositePodGroups.",
    "tags": [
      "gang",
      "podgroup",
      "workload-api"
    ],
    "minutes": 25,
    "docs": [
      [
        "Gang scheduling",
        "concepts/scheduling-eviction/gang-scheduling/"
      ],
      [
        "Workload API",
        "concepts/workloads/workload-api/"
      ],
      [
        "PodGroup API",
        "concepts/workloads/podgroup-api/"
      ],
      [
        "Workload-aware preemption",
        "concepts/scheduling-eviction/workload-aware-preemption/"
      ]
    ]
  },
  {
    "id": "admin-lifecycle",
    "group": "admin",
    "status": "ready",
    "file": "topics/admin-cluster-lifecycle.html",
    "title": "Cluster Lifecycle: Upgrades, Version Skew, Certificates & etcd Backup",
    "summary": "kubeadm upgrades one minor at a time, skew rules, certificate renewal, etcd snapshot and restore, swap and node maintenance.",
    "tags": [
      "upgrade",
      "etcd",
      "certificates",
      "version-skew"
    ],
    "minutes": 35,
    "docs": [
      [
        "Upgrade kubeadm clusters",
        "tasks/administer-cluster/kubeadm/kubeadm-upgrade/"
      ],
      [
        "Version skew policy",
        "https://kubernetes.io/releases/version-skew-policy/"
      ],
      [
        "Operating etcd",
        "tasks/administer-cluster/configure-upgrade-etcd/"
      ]
    ]
  },
  {
    "id": "admin-monitoring",
    "group": "admin",
    "status": "ready",
    "file": "topics/admin-monitoring.html",
    "title": "Observability: Metrics with Prometheus & Grafana",
    "summary": "kube-prometheus-stack, ServiceMonitors, PromQL starters, alert rules and what to learn next.",
    "tags": [
      "prometheus",
      "grafana",
      "servicemonitor",
      "roadmap"
    ],
    "minutes": 20,
    "docs": [
      [
        "System metrics",
        "concepts/cluster-administration/system-metrics/"
      ],
      [
        "Object state metrics",
        "concepts/cluster-administration/kube-state-metrics/"
      ]
    ]
  },
  {
    "id": "admin-debugging",
    "group": "admin",
    "status": "ready",
    "file": "topics/admin-logging-troubleshooting.html",
    "title": "Logging, Events & Troubleshooting",
    "summary": "Logging architecture, events, kubectl debug, and a decision tree for Pods, Services, nodes and the control plane.",
    "tags": [
      "logging",
      "debug",
      "troubleshooting",
      "events"
    ],
    "minutes": 30,
    "docs": [
      [
        "Logging architecture",
        "concepts/cluster-administration/logging/"
      ],
      [
        "Debug Pods",
        "tasks/debug/debug-application/debug-pods/"
      ],
      [
        "Debug clusters",
        "tasks/debug/debug-cluster/"
      ]
    ]
  },
  {
    "id": "win-nodes",
    "group": "windows",
    "status": "ready",
    "file": "topics/windows-nodes-containers.html",
    "title": "Windows Nodes & Containers",
    "summary": "Hybrid Linux/Windows clusters: OS-aware placement with selectors, taints and RuntimeClass, API differences, HNS networking, storage limits, HostProcess and joining a Windows node.",
    "tags": [
      "windows",
      "hostprocess",
      "runtimeclass"
    ],
    "minutes": 25,
    "docs": [
      [
        "Windows containers in Kubernetes",
        "concepts/windows/intro/"
      ],
      [
        "Guide for running Windows containers",
        "concepts/windows/user-guide/"
      ],
      [
        "Networking on Windows",
        "concepts/services-networking/windows-networking/"
      ],
      [
        "Adding Windows worker nodes",
        "tasks/administer-cluster/kubeadm/adding-windows-nodes/"
      ]
    ]
  },
  {
    "id": "ext-extending",
    "group": "extending",
    "status": "ready",
    "file": "topics/extending-kubernetes.html",
    "title": "Extending Kubernetes: CRDs, Operators, Aggregation & Admission",
    "summary": "CustomResourceDefinitions with schemas and CEL, the operator pattern, API aggregation, admission webhooks and MutatingAdmissionPolicy.",
    "tags": [
      "crd",
      "operator",
      "webhook",
      "aggregation"
    ],
    "minutes": 35,
    "docs": [
      [
        "Custom resources",
        "concepts/extend-kubernetes/api-extension/custom-resources/"
      ],
      [
        "Operator pattern",
        "concepts/extend-kubernetes/operator/"
      ],
      [
        "Dynamic admission control",
        "reference/access-authn-authz/extensible-admission-controllers/"
      ]
    ]
  },
  {
    "id": "tut-sample-app",
    "group": "tutorials",
    "status": "ready",
    "file": "topics/tutorial-sample-app.html",
    "title": "Tutorial: A Sample Microservices App (GameHub)",
    "summary": "React frontend, two Python APIs and PostgreSQL: how the sample app works and how it maps to Kubernetes objects.",
    "tags": [
      "microservices",
      "docker-build",
      "app"
    ],
    "minutes": 20,
    "docs": [
      [
        "Learn Kubernetes basics",
        "tutorials/kubernetes-basics/"
      ]
    ]
  },
  {
    "id": "tut-end-to-end",
    "group": "tutorials",
    "status": "ready",
    "file": "topics/tutorial-deploy-end-to-end.html",
    "title": "Tutorial: Deploy GameHub End-to-End",
    "summary": "Deploy the sample app end-to-end: database operator, Services, Gateway and TLS, then trace one request and break things on purpose.",
    "tags": [
      "end-to-end",
      "deploy",
      "microservices"
    ],
    "minutes": 25,
    "docs": [
      [
        "Tutorials",
        "tutorials/"
      ],
      [
        "Stateless application tutorials",
        "tutorials/stateless-application/"
      ]
    ]
  }
];

/* Old topic ids, kept so completion progress saved in browsers survives the restructure. */
window.K8S_ID_MIGRATION = {
  "04-clusters": "setup-options",
  "02-evolution": "overview-intro",
  "05-yaml": "overview-objects",
  "23-objects": "overview-metadata",
  "06-architecture": "arch-components",
  "37-internals": "arch-internals",
  "07-cri": "containers-cri",
  "25-containers": "containers-env",
  "13-pods": "workloads-pods",
  "15-deployments": "workloads-deployments",
  "17-ds-sts": "workloads-ds-sts",
  "24-jobs": "workloads-jobs",
  "26-autoscaling": "workloads-autoscaling",
  "08-cni": "net-cni",
  "18-services": "net-services",
  "10-kube-proxy": "net-kube-proxy",
  "11-coredns": "net-dns",
  "29-svc-advanced": "net-advanced",
  "20-gateway": "net-gateway",
  "28-netpol": "net-policies",
  "19-volumes": "storage-volumes",
  "09-csi": "storage-csi",
  "30-storage-advanced": "storage-advanced",
  "16-config": "config-cm-secrets",
  "31-pod-security": "security-pod-security",
  "12-rbac": "security-rbac",
  "32-api-security": "security-api-access",
  "14-scheduler": "sched-scheduler",
  "27-disruptions": "sched-disruptions",
  "34-dra": "sched-dra",
  "35-lifecycle": "admin-lifecycle",
  "22-monitoring": "admin-monitoring",
  "36-debugging": "admin-debugging",
  "33-extending": "ext-extending",
  "03-app": "tut-sample-app",
  "21-final-demo": "tut-end-to-end",
  "01-bootstrap": "setup-kubeadm"
};

(window.STUDY_APPS = window.STUDY_APPS || {})[window.K8S_APP.id] = { app: window.K8S_APP, groups: window.K8S_GROUPS, topics: window.K8S_TOPICS };
