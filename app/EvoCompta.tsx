"use client";

import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  Bell,
  BookOpenCheck,
  Bot,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CloudUpload,
  Command,
  FileCheck2,
  FileScan,
  Fingerprint,
  Gauge,
  Globe2,
  Headphones,
  Landmark,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquareText,
  Network,
  Play,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  UsersRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CSSProperties,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const ease = [0.22, 1, 0.36, 1] as const;

function Logo() {
  return (
    <a className="evo-logo" href="#top" aria-label="EVOCOMPTA home">
      <span className="logo-mark"><i/><i/><i/></span>
      <b>EVO<span>COMPTA</span></b>
    </a>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);
  return <span ref={ref}>{display.toFixed(decimals)}{suffix}</span>;
}

function MiniChart({ bars = false, tone = "green" }: { bars?: boolean; tone?: "green" | "white" }) {
  if (bars) {
    return (
      <div className={`mini-bars ${tone}`}>
        {[32, 48, 40, 68, 55, 77, 64, 89, 76, 96].map((height, index) => (
          <i key={index} style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }}/>
        ))}
      </div>
    );
  }
  return (
    <div className={`mini-line ${tone}`}>
      <span className="line-fill"/><i className="chart-point p1"/><i className="chart-point p2"/><i className="chart-point p3"/>
    </div>
  );
}

function DemoButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.a
      href="#demo"
      className={`demo-button ${className}`}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setSolid(latest > 36));
  return (
    <motion.header className={`landing-nav ${solid ? "solid" : ""}`}>
      <div className="nav-inner">
        <Logo/>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {["Solutions", "Products", "Industries", "Pricing", "Resources", "About"].map((item, index) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
              {item}{index < 2 || item === "Resources" ? <ChevronDown size={12}/> : null}
            </a>
          ))}
          <a className="mobile-login" href="#demo">Login</a>
        </nav>
        <div className="nav-actions">
          <a className="login-link" href="#demo">Login</a>
          <DemoButton className="nav-demo">Request demo <ArrowRight size={14}/></DemoButton>
          <button className="nav-menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sceneX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const sceneY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const sceneRotateX = useTransform(sceneY, [-24, 24], [1.7, -1.7]);
  const sceneRotateY = useTransform(sceneX, [-24, 24], [-2.2, 2.2]);
  const backgroundX = useTransform(sceneX, [-24, 24], [-8, 8]);
  const backgroundY = useTransform(sceneY, [-24, 24], [-6, 6]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 88]);
  const portraitY = useSpring(heroY, { stiffness: 80, damping: 20 });

  const moveScene = (event: React.PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 48);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 48);
  };

  const resetScene = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section
      className="immersive-hero"
      id="top"
      ref={heroRef}
      onPointerMove={moveScene}
      onPointerLeave={resetScene}
    >
      <motion.div className="hero-grid-lines" style={{ x: backgroundX, y: backgroundY }}/>
      <div className="hero-noise"/>
      <div className="hero-glow glow-a"/><div className="hero-glow glow-b"/><div className="hero-glow glow-c"/>
      <div className="hero-beams"><i/><i/><i/></div>
      <motion.div className="world-dots" style={{ x: backgroundX, y: backgroundY }}>
        <i className="land l1"/><i className="land l2"/><i className="land l3"/><i className="land l4"/>
      </motion.div>
      <div className="hero-particles">
        {Array.from({ length: 26 }).map((_, index) => (
          <i key={index} style={{ "--i": index } as CSSProperties}/>
        ))}
      </div>

      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
        >
          <motion.div className="hero-eyebrow" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease } } }}>
            <span><Sparkles size={12}/> EVO INTELLIGENCE 2.0</span><i/>Financial operations, orchestrated
          </motion.div>
          <h1>
            <motion.span className="headline-solid" variants={{ hidden: { opacity: 0, y: 54 }, visible: { opacity: 1, y: 0, transition: { duration: .9, ease } } }}>ACCOUNTING.</motion.span>
            <motion.span className="headline-outline" variants={{ hidden: { opacity: 0, y: 54 }, visible: { opacity: 1, y: 0, transition: { duration: .9, ease } } }}>Reimagined.</motion.span>
            <motion.em variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease } } }}>for ambitious firms.</motion.em>
          </h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease } } }}>
            The intelligent financial operating system that turns documents, deadlines, and decisions into one precise, automated flow.
          </motion.p>
          <motion.form
            className={`hero-form ${sent ? "success" : ""}`}
            onSubmit={submit}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease } } }}
          >
            {sent ? (
              <span><CheckCircle2 size={18}/> Thank you. We’ll be in touch within one business day.</span>
            ) : (
              <>
                <span className="email-prefix"><Building2 size={16}/></span>
                <input aria-label="Work email" type="email" required placeholder="Work email address" value={email} onChange={(event) => setEmail(event.target.value)}/>
                <motion.button whileHover={{ scale: 1.025, x: 2 }} whileTap={{ scale: .98 }} type="submit">
                  Request a private demo <ArrowRight size={15}/>
                </motion.button>
              </>
            )}
          </motion.form>
          <motion.div className="hero-trust" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .7 } } }}>
            <span><Check size={13}/> No credit card</span>
            <span><CalendarClock size={13}/> 14-day guided trial</span>
            <span><ShieldCheck size={13}/> ISO-ready security</span>
          </motion.div>
          <motion.div className="hero-client-proof" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .8 } } }}>
            <small>TRUSTED IN PRODUCTION BY</small>
            <div><b>ATRIUM</b><b>NEXORA</b><b>ORBITAL</b><b>WAVEFORM</b></div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          style={{ y: portraitY, x: sceneX, rotateX: sceneRotateX, rotateY: sceneRotateY }}
          initial={{ opacity: 0, scale: .96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: .18, ease }}
        >
          <div className="ecosystem-disc">
            <div className="portrait-orbit orbit-1"><i/><i/><i/></div>
            <div className="portrait-orbit orbit-2"><i/><i/><i/></div>
            <div className="portrait-orbit orbit-3"/>
            <div className="portrait-halo"/>
            <div className="portrait-floor"/>
          </div>

          <div className="financial-paths" aria-hidden="true">
            <i className="path path-a"><span/></i>
            <i className="path path-b"><span/></i>
            <i className="path path-c"><span/></i>
            <i className="path path-d"><span/></i>
            <i className="path path-e"><span/></i>
          </div>

          <motion.img
            src="/accountant-portrait.png"
            alt="Modern financial leader inside the EVOCOMPTA intelligence network"
            className="accountant-portrait"
            initial={{ opacity: 0, scale: .94, y: 34 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.35, delay: .28, ease }}
          />

          <div className="ceo-status">
            <i/><span><small>EVOCOMPTA LIVE</small><b>247 companies monitored</b></span>
          </div>

          <motion.div className="float-card revenue-widget" animate={{ y: [0, -9, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}>
            <div className="widget-head"><span><CircleDollarSign size={13}/> Revenue analytics</span><em>LIVE</em></div>
            <strong>DZD <Counter value={18.4} decimals={1}/>M</strong>
            <div className="revenue-delta"><small><TrendingUp size={11}/> +12.8%</small><span>Forecast accuracy 96%</span></div>
            <MiniChart/>
          </motion.div>

          <motion.div className="float-card intake-widget" animate={{ x: [0, 6, 0], y: [0, -4, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}>
            <div className="scan-line"/>
            <span className="document-sheet"><ReceiptText size={16}/><i/><i/><i/></span>
            <div><small>DOCUMENT INTAKE</small><b>INV-20341.pdf</b><em><Upload size={10}/> Upload complete</em></div>
            <CheckCircle2 size={15}/>
          </motion.div>

          <motion.div className="float-card ai-widget" animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: .4 }}>
            <div className="ai-orb"><Sparkles size={15}/></div>
            <div><small>EVO AI PROCESSING</small><b>Journal entry ready</b><p>3 accounts matched · 98.7%</p></div>
            <span className="ai-pulse"><i/><i/><i/></span>
          </motion.div>

          <motion.div className="float-card vat-widget" animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: .8 }}>
            <span className="widget-icon"><Landmark size={16}/></span>
            <div><small>TAX COMPLIANCE</small><b>VAT declaration</b><em>12 companies ready</em></div>
            <i className="vat-ring"><span>82%</span></i>
          </motion.div>

          <motion.div className="float-card insight-widget" animate={{ x: [0, -5, 0], y: [0, -6, 0] }} transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}>
            <div className="insight-top"><span><Bot size={14}/> AI insight</span><small>NOW</small></div>
            <p>Cash reserve will exceed the target by <b>DZD 2.1M</b> this quarter.</p>
            <div><span>Confidence</span><i><em/></i><b>94%</b></div>
          </motion.div>

          <motion.div className="reconciliation-pill" animate={{ y: [0, 6, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
            <span><Landmark size={14}/></span>
            <div><small>BANK RECONCILIATION</small><b>384 transactions matched</b></div>
            <em><Check size={11}/> 100%</em>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-process" aria-label="EVOCOMPTA automated financial workflow">
        {[
          [Upload, "Capture"],
          [FileScan, "Understand"],
          [BookOpenCheck, "Account"],
          [Landmark, "Comply"],
          [BarChart3, "Report"],
          [TrendingUp, "Grow"],
        ].map(([Icon, label], index) => {
          const FlowIcon = Icon as typeof Upload;
          return (
            <div className="process-step" key={label as string}>
              <span><FlowIcon size={15}/><i>{index + 1}</i></span>
              <b>{label as string}</b>
              {index < 5 && <em><i/></em>}
            </div>
          );
        })}
      </div>

      <div className="hero-bottom">
        <span><i className="live-dot"/> System operational</span>
        <i/>
        <div><LockKeyhole size={13}/> AES-256 encrypted</div>
        <div><Globe2 size={13}/> Multi-entity ready</div>
        <div><Activity size={13}/> Real-time intelligence</div>
      </div>
    </section>
  );
}

const features = [
  { icon: Zap, title: "Workflow automation", text: "Turn recurring work into controlled, self-moving workflows.", className: "feature-automation" },
  { icon: FileScan, title: "Document OCR", text: "Extract, classify, and route financial documents in seconds.", className: "feature-ocr" },
  { icon: Sparkles, title: "Evo Intelligence", text: "Surface risks, recommendations, and the next best action.", className: "feature-ai" },
  { icon: BookOpenCheck, title: "Accounting", text: "From journals to closing, every company stays current.", className: "feature-accounting" },
  { icon: WalletCards, title: "Payroll", text: "Controlled payroll runs, payslips, CNAS, and approvals.", className: "feature-payroll" },
  { icon: Landmark, title: "Tax & compliance", text: "Plan, prepare, submit, and evidence every obligation.", className: "feature-tax" },
  { icon: BarChart3, title: "Firm analytics", text: "See margin, capacity, quality, and growth in real time.", className: "feature-analytics" },
  { icon: UsersRound, title: "Client CRM", text: "Every request, meeting, message, and promise in context.", className: "feature-crm" },
];

function TrustStrip() {
  return (
    <section className="trust-section">
      <Reveal className="logo-cloud">
        <span>Trusted by teams at</span>
        <div className="logo-marquee"><div>{["NORTHSTAR", "FIDUCIA", "EXPERTA", "MAZARS", "ACCOUNTA", "ARCEN", "NORTHSTAR", "FIDUCIA", "EXPERTA"].map((logo, index) => <b key={`${logo}-${index}`}>{logo}</b>)}</div></div>
      </Reveal>
      <div className="stat-grid">
        {[
          [250, "+", "Accounting firms"],
          [10000, "+", "Businesses managed"],
          [99.9, "%", "Platform availability"],
          [4.9, "/5", "Customer rating"],
        ].map(([value, suffix, label], index) => (
          <Reveal className="stat-item" delay={index * .08} key={label as string}>
            <b><Counter value={value as number} suffix={suffix as string} decimals={value === 99.9 || value === 4.9 ? 1 : 0}/></b>
            <span>{label as string}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeatureIllustration({ type }: { type: string }) {
  if (type.includes("automation")) return <div className="flow-mini"><i/><span>Intake</span><i/><span>Review</span><i/><span>Done</span></div>;
  if (type.includes("ocr")) return <div className="ocr-mini"><span>INV-2048</span><i/><b>98.7%</b><em>DZD 284,000</em></div>;
  if (type.includes("ai")) return <div className="ai-mini"><Sparkles size={14}/><p>3 deadlines need attention.</p><span>Resolve with AI <ArrowRight size={10}/></span></div>;
  if (type.includes("accounting")) return <div className="ledger-mini">{[72, 88, 54, 94].map((n, i) => <span key={i}><i style={{ width: `${n}%` }}/><em>{["512", "401", "445", "627"][i]}</em></span>)}</div>;
  if (type.includes("payroll")) return <div className="people-mini">{["NA","KB","LY","YM"].map((n, i) => <span key={n} style={{ "--p": `${[91,76,84,63][i]}%` } as CSSProperties}>{n}</span>)}</div>;
  if (type.includes("tax")) return <div className="tax-mini"><div><b>26</b><small>JUL</small></div><span>G50 filing<em>12 companies</em></span><CheckCircle2 size={15}/></div>;
  if (type.includes("analytics")) return <div className="analytics-mini"><MiniChart bars/><span>+18.6%</span></div>;
  return <div className="crm-mini"><span>KB</span><div><b>Karim B.</b><small>Uploaded 8 documents</small></div><i/></div>;
}

function Features() {
  return (
    <section className="features-section" id="solutions">
      <Reveal className="section-heading">
        <span className="section-kicker"><i/> One system. Every operation.</span>
        <h2>Powerful alone.<br/><em>Transformative together.</em></h2>
        <p>Purpose-built capabilities for every role in a modern accounting firm, connected by one intelligent operating layer.</p>
      </Reveal>
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, text, className }, index) => (
          <motion.article
            className={`feature-card ${className}`}
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: .65, delay: (index % 4) * .08, ease }}
            whileHover={{ y: -8, borderColor: "rgba(0,210,106,.35)" }}
          >
            <div className="feature-top"><span><Icon size={18}/></span><small>0{index + 1}</small></div>
            <h3>{title}</h3><p>{text}</p>
            <FeatureIllustration type={className}/>
            <a href="#demo">Explore <ArrowRight size={12}/></a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function DashboardShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const frameY = useTransform(scrollYProgress, [0, .4, 1], [90, 0, -45]);
  const frameScale = useTransform(scrollYProgress, [0, .35], [.94, 1]);
  return (
    <section className="showcase-section" id="products" ref={ref}>
      <div className="showcase-copy">
        <Reveal>
          <span className="section-kicker"><i/> Live operational intelligence</span>
          <h2>Your entire firm.<br/><em>One clear view.</em></h2>
          <p>Know what is moving, what is blocked, and what needs human judgment—before anyone has to ask.</p>
        </Reveal>
        {[
          ["01", "See the day", "Priority work, deadlines, client dependencies, and risk—ordered for action."],
          ["02", "Control production", "Follow every company from document intake through close and submission."],
          ["03", "Improve the firm", "Turn operational data into stronger margins, capacity, and client service."],
        ].map(([number, title, text], index) => (
          <motion.div className="showcase-step" key={number} initial={{ opacity: .35 }} whileInView={{ opacity: 1 }} viewport={{ margin: "-45% 0px -45% 0px" }}>
            <span>{number}</span><div><b>{title}</b><p>{text}</p></div>{index === 0 && <i>LIVE</i>}
          </motion.div>
        ))}
      </div>
      <motion.div className="dashboard-shell" style={{ y: frameY, scale: frameScale }}>
        <div className="dash-browser"><i/><i/><i/><span>app.evocompta.com/firm-overview</span><ShieldCheck size={11}/></div>
        <div className="dash-app">
          <aside className="dash-rail">
            <Logo/>
            {[Gauge, Activity, Building2, FileCheck2, BookOpenCheck, WalletCards, Landmark, UsersRound].map((Icon, index) => <span key={index} className={index === 0 ? "active" : ""}><Icon size={15}/>{index === 1 && <i>8</i>}</span>)}
            <em>AB</em>
          </aside>
          <div className="dash-main">
            <div className="dash-header">
              <div><small>FRIDAY, 25 JULY</small><b>Good morning, Amine.</b></div>
              <button><Search size={13}/> Search everything <kbd>⌘K</kbd></button>
              <span><Bell size={14}/><i/></span>
            </div>
            <div className="dash-content">
              <div className="dash-title"><div><h3>Your firm at a glance</h3><p>42 assigned companies · July 2026</p></div><button><Plus size={13}/> New task</button></div>
              <div className="dash-kpis">
                {[
                  [Clock3, "Due today", "24", "8 high priority"],
                  [Gauge, "Portfolio health", "91%", "↑ 4.2% this month"],
                  [MessageSquareText, "Waiting on clients", "17", "3 overdue"],
                  [Banknote, "Value processed", "DZD 4.8M", "This month"],
                ].map(([Icon, label, value, detail], index) => <div key={label as string}><span><Icon size={12}/>{label as string}</span><b>{value as string}</b><em className={index === 1 ? "positive" : ""}>{detail as string}</em>{index === 1 && <MiniChart/>}</div>)}
              </div>
              <div className="dash-layout">
                <div className="dash-panel priority-panel">
                  <div className="panel-title"><div><b>Priority queue</b><small>Ordered by deadline and risk</small></div><button>View all <ArrowRight size={10}/></button></div>
                  {[
                    ["Review May VAT declaration","SARL Atlas Construction","VAT","Today","AB"],
                    ["Approve bank reconciliation","EURL Nova Digital","BANK","Today","NA"],
                    ["Validate payroll control","SPA Méditerranée","PAYROLL","14:00","LM"],
                    ["Classify purchase invoices","Cabinet Benali","DOCS","Tomorrow","YK"],
                  ].map(([task, company, tag, due, owner], index) => <div className="dash-task" key={task}><span className={index === 0 ? "urgent" : ""}/><div><b>{task}</b><small>{company}</small></div><em>{tag}</em><i>{due}</i><strong>{owner}</strong></div>)}
                </div>
                <div className="dash-panel deadline-panel">
                  <div className="panel-title"><div><b>Compliance radar</b><small>Next 7 days</small></div><ShieldCheck size={13}/></div>
                  <div className="deadline-main"><span><b>26</b><small>JUL</small></span><div><b>G50 declarations</b><small>12 companies · 4 pending</small><i><em style={{width:"67%"}}/></i></div></div>
                  <div className="risk-callout"><Sparkles size={13}/><p><b>3 filings at risk.</b><br/>Reassign 6 tasks to protect every deadline.</p><ArrowRight size={11}/></div>
                </div>
                <div className="dash-panel production-panel">
                  <div className="panel-title"><div><b>Company production</b><small>July accounting period</small></div><button>248 companies <ChevronDown size={10}/></button></div>
                  {[
                    ["AT","SARL Atlas Construction","82%","VAT due"],
                    ["ND","EURL Nova Digital","94%","On track"],
                    ["ME","SPA Méditerranée","67%","Review"],
                  ].map(([initials, company, progress, status]) => <div className="company-line" key={company}><span>{initials}</span><div><b>{company}</b><small>July 2026</small></div><i><em style={{width:progress}}/></i><strong>{progress}</strong><small className={status === "On track" ? "good" : ""}>{status}</small></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div className="dash-floating insight-float" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><Sparkles size={15}/><div><small>EVO INTELLIGENCE</small><b>Capacity risk resolved</b><span>6 tasks reassigned automatically</span></div><CheckCircle2 size={15}/></motion.div>
      </motion.div>
    </section>
  );
}

function Workflow() {
  const steps = [
    { icon: Upload, title: "Upload documents", meta: "Portal · Email · Scan", metric: "49 received" },
    { icon: FileScan, title: "AI OCR", meta: "Extract · Classify · Verify", metric: "98.7% confidence" },
    { icon: BookOpenCheck, title: "Accounting entries", meta: "Suggest · Review · Post", metric: "1,248 entries" },
    { icon: Landmark, title: "Tax processing", meta: "Validate · Approve · Submit", metric: "G50 ready" },
    { icon: BarChart3, title: "Reports", meta: "Analyze · Generate · Share", metric: "Live insights" },
    { icon: UsersRound, title: "Client portal", meta: "Approve · Sign · Collaborate", metric: "Delivered" },
  ];
  return (
    <section className="workflow-section" id="industries">
      <Reveal className="workflow-heading">
        <span className="section-kicker"><i/> From inbox to insight</span>
        <h2>One continuous flow.<br/><em>Zero operational gaps.</em></h2>
        <p>EVOCOMPTA connects every handoff, automates every predictable step, and keeps judgment exactly where it belongs.</p>
      </Reveal>
      <div className="workflow-track">
        <motion.div className="workflow-progress" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 1.8, ease }}/>
        {steps.map(({ icon: Icon, title, meta, metric }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .12, duration: .6, ease }}>
            <div className="workflow-node"><span>0{index + 1}</span><i><Icon size={19}/></i>{index < steps.length - 1 && <ArrowRight size={13}/>}</div>
            <h3>{title}</h3><p>{meta}</p><b>{metric}</b>
          </motion.article>
        ))}
      </div>
      <Reveal className="workflow-proof">
        <div><Zap size={16}/><span><b>68%</b> less manual routing</span></div><i/>
        <div><Clock3 size={16}/><span><b>31 hours</b> saved per accountant / month</span></div><i/>
        <div><CheckCircle2 size={16}/><span><b>94%</b> first-pass acceptance</span></div>
      </Reveal>
    </section>
  );
}

function AISection() {
  return (
    <section className="ai-section">
      <div className="ai-section-glow"/><div className="ai-grid-bg"/>
      <div className="ai-inner">
        <Reveal className="ai-copy">
          <span className="ai-badge"><Sparkles size={13}/> EVO INTELLIGENCE</span>
          <h2>AI that understands<br/><em>accounting context.</em></h2>
          <p>Not a generic chatbot. Evo Intelligence reads the documents, deadlines, transactions, and history behind every recommendation.</p>
          <ul>
            <li><CheckCircle2 size={15}/><span><b>Evidence-linked suggestions</b><small>Every answer shows its source and confidence.</small></span></li>
            <li><CheckCircle2 size={15}/><span><b>Human approval by design</b><small>AI accelerates judgment. It never replaces accountability.</small></span></li>
            <li><CheckCircle2 size={15}/><span><b>Firm-isolated intelligence</b><small>Your data never trains another firm’s experience.</small></span></li>
          </ul>
          <DemoButton>See Evo Intelligence <ArrowRight size={14}/></DemoButton>
        </Reveal>
        <Reveal className="ai-console" delay={.15}>
          <div className="ai-console-top"><div><span><Sparkles size={14}/></span><b>Evo Intelligence</b><i>ONLINE</i></div><button><Plus size={14}/></button></div>
          <div className="ai-chat">
            <div className="chat-question"><span>AB</span><p>Which client deadlines are most at risk this week?</p></div>
            <div className="chat-answer"><span><Sparkles size={14}/></span><div><p>I found <b>3 obligations at risk</b> based on missing documents, current workload, and filing history.</p><div className="risk-table">
              <div><span className="risk high">HIGH</span><b>SARL Atlas · G50</b><small>12 documents missing</small><em>26 Jul</em></div>
              <div><span className="risk med">MED</span><b>SPA Mériem · CNAS</b><small>Payroll review blocked</small><em>29 Jul</em></div>
              <div><span className="risk med">MED</span><b>EURL Nova · IBS</b><small>Awaiting client approval</small><em>31 Jul</em></div>
            </div><div className="ai-recommend"><Zap size={13}/><span><b>Recommended action</b><br/>Reassign 6 review tasks to Nadia. All three filings return to on-track status.</span><button>Apply plan</button></div></div></div>
          </div>
          <div className="ai-input"><button><Plus size={14}/></button><span>Ask about a client, deadline, or financial result…</span><kbd>⌘ ↵</kbd></div>
          <motion.div className="ocr-float" animate={{ y: [0, -7, 0], rotate: [-1, -.4, -1] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
            <div className="ocr-page"><span/><span/><span/><i/></div><div><small>INVOICE OCR</small><b>DZD 284,000</b><span><Check size={10}/> 98.7% verified</span></div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { quote: "EVOCOMPTA gave us a live operating picture of the firm. We stopped managing by status meeting and started managing by exception.", name: "Nadia Amrane", role: "CEO, Fiducia Partners", position: "left", logo: "FIDUCIA" },
    { quote: "The combination of workflow control and accounting intelligence changed our close process. We gained speed without giving up review quality.", name: "Karim Bensaïd", role: "Managing Partner, Northstar", position: "center", logo: "NORTHSTAR" },
    { quote: "Clients respond faster because every request is clear. Our team saves hours each week, and our service feels meaningfully more premium.", name: "Lina Rahmani", role: "Founder, Experta Conseil", position: "right", logo: "EXPERTA" },
  ];
  return (
    <section className="testimonials-section" id="resources">
      <Reveal className="section-heading testimonial-heading">
        <span className="section-kicker"><i/> Trusted in the real world</span>
        <h2>Built with firms.<br/><em>Proven by outcomes.</em></h2>
      </Reveal>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <motion.article key={item.name} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
            <div className="testimonial-top"><b>{item.logo}</b><span>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="currentColor"/>)}</span></div>
            <blockquote>“{item.quote}”</blockquote>
            <div className="testimonial-person"><span className={`leader-photo ${item.position}`}/><div><b>{item.name}</b><small>{item.role}</small></div><BadgeCheck size={16}/></div>
            <i>0{index + 1}</i>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Essentials", price: "Tailored", text: "For growing practices replacing fragmented tools.", features: ["Firm workspace", "Companies & workflows", "Document management", "Client portal", "Core reporting"], cta: "Talk to sales" },
    { name: "Professional", price: "Tailored", text: "For established firms automating production end to end.", features: ["Everything in Essentials", "Accounting production", "Payroll & tax operations", "Evo Intelligence", "Advanced analytics"], cta: "Request demo" },
    { name: "Enterprise", price: "Custom", text: "For multi-office firms requiring control at scale.", features: ["Everything in Professional", "Custom roles & controls", "API & integrations", "Dedicated environment", "Priority implementation"], cta: "Contact enterprise", featured: true },
  ];
  return (
    <section className="pricing-section" id="pricing">
      <Reveal className="pricing-heading">
        <span className="section-kicker"><i/> Built around your firm</span>
        <h2>One platform.<br/><em>Configured to fit.</em></h2>
        <p>Pricing reflects your firm size, services, and implementation needs. No seat-count surprises.</p>
      </Reveal>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <motion.article className={plan.featured ? "featured" : ""} key={plan.name} whileHover={{ y: -7 }} transition={{ type: "spring", stiffness: 250, damping: 24 }}>
            {plan.featured && <span className="popular"><Sparkles size={11}/> MOST POPULAR</span>}
            <div className="plan-head"><span>{plan.name}</span>{plan.name === "Enterprise" ? <Network size={18}/> : plan.name === "Professional" ? <Layers3 size={18}/> : <Building2 size={18}/>}</div>
            <b className="plan-price">{plan.price}</b><p>{plan.text}</p>
            <div className="plan-line"/>
            <small>INCLUDES</small>
            <ul>{plan.features.map((feature) => <li key={feature}><Check size={12}/>{feature}</li>)}</ul>
            <DemoButton className={plan.featured ? "plan-cta active" : "plan-cta"}>{plan.cta}<ArrowRight size={13}/></DemoButton>
          </motion.article>
        ))}
      </div>
      <p className="pricing-note"><ShieldCheck size={13}/> Every plan includes encrypted hosting, continuous backups, and guided onboarding.</p>
    </section>
  );
}

function FinalCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="final-cta" id="demo">
      <div className="cta-rings"/><div className="cta-grid"/>
      <Reveal>
        <span><Sparkles size={13}/> YOUR NEXT OPERATING ADVANTAGE</span>
        <h2>See what a truly<br/>intelligent firm feels like.</h2>
        <p>Bring your workflows, deadlines, and growth goals. We’ll show you EVOCOMPTA around the way your firm actually works.</p>
        <form onSubmit={(event) => { event.preventDefault(); if (email) setDone(true); }}>
          {done ? <div className="cta-success"><CheckCircle2 size={18}/> Demo request received. We’ll contact you shortly.</div> : <><input type="email" required placeholder="Work email address" value={email} onChange={(event) => setEmail(event.target.value)}/><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }}>Request your demo <ArrowRight size={15}/></motion.button></>}
        </form>
        <small>No credit card · Tailored 30-minute walkthrough · Response within one business day</small>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer" id="about">
      <div className="footer-main">
        <div className="footer-brand"><Logo/><p>The intelligent operating system for modern accounting firms.</p><span><span className="status-dot"/> Systems operational</span></div>
        <div><b>Platform</b><a href="#solutions">Solutions</a><a href="#products">Products</a><a href="#industries">Industries</a><a href="#pricing">Pricing</a></div>
        <div><b>Company</b><a href="#about">About</a><a href="#resources">Customers</a><a href="#resources">Resources</a><a href="#demo">Contact</a></div>
        <div><b>Trust</b><a href="#about">Security</a><a href="#about">Privacy</a><a href="#about">Compliance</a><a href="#about">Status</a></div>
        <div><b>Connect</b><a href="#demo">LinkedIn</a><a href="#demo">X / Twitter</a><a href="#demo">support@evocompta.com</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 EVOCOMPTA. All rights reserved.</span><div><a>Privacy policy</a><a>Terms of service</a><a>Cookies</a></div><span>Made for firms that move forward.</span></div>
    </footer>
  );
}

export function EvoCompta() {
  return (
    <main className="evocompta-landing">
      <Navigation/>
      <Hero/>
      <TrustStrip/>
      <Features/>
      <DashboardShowcase/>
      <Workflow/>
      <AISection/>
      <Testimonials/>
      <Pricing/>
      <FinalCTA/>
      <Footer/>
    </main>
  );
}
