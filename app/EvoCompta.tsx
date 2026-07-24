"use client";

import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  CreditCard,
  FileCheck2,
  FileText,
  Files,
  Gauge,
  Headphones,
  Landmark,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Network,
  PanelRightOpen,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  UserRound,
  UsersRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type View = "public" | "login" | "setup" | "app";
type NavKey =
  | "dashboard"
  | "work"
  | "companies"
  | "documents"
  | "accounting"
  | "payroll"
  | "tax"
  | "crm"
  | "calendar"
  | "reports";

const roles = [
  "Senior Accountant",
  "Firm Owner",
  "Accounting Manager",
  "Junior Accountant",
  "Payroll Specialist",
  "Tax Consultant",
  "Receptionist",
  "Legal Consultant",
  "Accountant Assistant",
  "Client",
  "Super Admin",
];

const navItems: { key: NavKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Today", icon: LayoutDashboard },
  { key: "work", label: "Work", icon: CheckCircle2 },
  { key: "companies", label: "Companies", icon: Building2 },
  { key: "documents", label: "Documents", icon: Files },
  { key: "accounting", label: "Accounting", icon: BookOpen },
  { key: "payroll", label: "Payroll", icon: WalletCards },
  { key: "tax", label: "Tax & compliance", icon: ShieldCheck },
  { key: "crm", label: "CRM", icon: UsersRound },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
  { key: "reports", label: "Reports", icon: TrendingUp },
];

const tasks = [
  { company: "SARL Atlas Construction", task: "Review May VAT declaration", type: "VAT", due: "Today · 10:30", owner: "You", tone: "urgent" },
  { company: "EURL Nova Digital", task: "Approve bank reconciliation", type: "Bank", due: "Today · 12:00", owner: "You", tone: "warning" },
  { company: "SPA Méditerranée", task: "Validate payroll control", type: "Payroll", due: "Today · 14:00", owner: "N. Amina", tone: "normal" },
  { company: "Cabinet Benali", task: "Classify 18 purchase invoices", type: "Documents", due: "Tomorrow", owner: "M. Lyna", tone: "normal" },
];

const companyRows = [
  { name: "SARL Atlas Construction", code: "ATL-042", owner: "Karim B.", period: "May 2026", progress: 82, status: "VAT due", docs: "3 missing" },
  { name: "EURL Nova Digital", code: "NOV-018", owner: "Sara D.", period: "May 2026", progress: 94, status: "On track", docs: "Complete" },
  { name: "SPA Méditerranée", code: "MED-006", owner: "Nadia A.", period: "May 2026", progress: 67, status: "Review", docs: "8 pending" },
  { name: "SNC El Bahia", code: "BAH-031", owner: "Yacine K.", period: "April 2026", progress: 45, status: "At risk", docs: "12 missing" },
];

const moduleContent: Record<Exclude<NavKey, "dashboard">, { eyebrow: string; title: string; subtitle: string; stats: [string, string, string][]; action: string; columns: string[] }> = {
  work: {
    eyebrow: "Operations",
    title: "Work orchestration",
    subtitle: "One queue for every engagement, deadline and handoff.",
    stats: [["132", "Open tasks", "−18 this week"], ["24", "Due today", "8 high priority"], ["91%", "On-time rate", "+4.2%"]],
    action: "Create task",
    columns: ["Task", "Company", "Workflow", "Owner", "Due", "Status"],
  },
  companies: {
    eyebrow: "Portfolio",
    title: "Companies",
    subtitle: "A live operating picture of every entity managed by the firm.",
    stats: [["248", "Active companies", "+12 this quarter"], ["91%", "Books current", "+3.8%"], ["17", "Need attention", "5 critical"]],
    action: "Add company",
    columns: ["Company", "Period", "Progress", "Status", "Documents", "Owner"],
  },
  documents: {
    eyebrow: "Smart intake",
    title: "Documents",
    subtitle: "Capture, classify, approve and archive without manual chasing.",
    stats: [["1,284", "Processed this month", "+18%"], ["96.2%", "OCR confidence", "+1.1%"], ["43", "Need review", "12 urgent"]],
    action: "Upload documents",
    columns: ["Document", "Company", "AI classification", "Confidence", "Received", "Status"],
  },
  accounting: {
    eyebrow: "Production",
    title: "Accounting",
    subtitle: "Move books from intake to close with exception-first controls.",
    stats: [["38,642", "Entries posted", "May 2026"], ["94%", "Reconciled", "+6.2%"], ["31", "Exceptions", "−14"]],
    action: "New journal entry",
    columns: ["Company", "Journal", "Period", "Debit", "Credit", "Reconciliation"],
  },
  payroll: {
    eyebrow: "Payroll operations",
    title: "Payroll",
    subtitle: "Run payroll, social declarations and approvals from one calendar.",
    stats: [["1,846", "Payslips", "June 2026"], ["78%", "Runs approved", "42 pending"], ["6", "CNAS deadlines", "Next 8 days"]],
    action: "Start payroll run",
    columns: ["Company", "Employees", "Run period", "Control", "Declaration", "Status"],
  },
  tax: {
    eyebrow: "Compliance",
    title: "Tax center",
    subtitle: "See filing exposure early and keep submissions fully evidenced.",
    stats: [["68", "Upcoming filings", "Next 30 days"], ["12", "Awaiting approval", "4 today"], ["3", "Risk alerts", "Needs review"]],
    action: "Prepare declaration",
    columns: ["Declaration", "Company", "Tax period", "Amount", "Deadline", "Submission"],
  },
  crm: {
    eyebrow: "Relationships",
    title: "Client CRM",
    subtitle: "Every conversation, request and promise in one trusted timeline.",
    stats: [["28", "Open requests", "−9 this week"], ["14", "Follow-ups today", "5 overdue"], ["4.8", "Client satisfaction", "+0.2"]],
    action: "Log interaction",
    columns: ["Client", "Company", "Last contact", "Open request", "Owner", "Next step"],
  },
  calendar: {
    eyebrow: "Firm calendar",
    title: "Deadlines & meetings",
    subtitle: "Tax, payroll, client and team commitments in a single plan.",
    stats: [["37", "Events this week", "11 deadlines"], ["6", "Today", "2 external"], ["4", "Conflicts detected", "Resolve now"]],
    action: "New event",
    columns: ["Time", "Event", "Company", "Type", "Attendees", "Reminder"],
  },
  reports: {
    eyebrow: "Performance",
    title: "Firm intelligence",
    subtitle: "Turn operational data into margin, capacity and growth decisions.",
    stats: [["DZD 18.4M", "Monthly revenue", "+12.8%"], ["36.2%", "Operating margin", "+2.1%"], ["DZD 74K", "Revenue per client", "+5.6%"]],
    action: "Generate report",
    columns: ["Report", "Scope", "Period", "Owner", "Updated", "Export"],
  },
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button className="brand" aria-label="EvoCompta home">
      <span className="brand-mark"><span /></span>
      {!compact && <span>Evo<span>Compta</span></span>}
    </button>
  );
}

function PublicSite({ onOpen }: { onOpen: (view: View) => void }) {
  const [mobile, setMobile] = useState(false);
  return (
    <main className="marketing">
      <header className="marketing-nav">
        <Logo />
        <nav className={mobile ? "public-links open" : "public-links"}>
          <a href="#platform">Platform <ChevronDown size={12}/></a>
          <a href="#operations">Solutions <ChevronDown size={12}/></a>
          <a href="#industries">Roles</a>
          <a href="#services">Capabilities</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="nav-actions">
          <button className="text-button desktop-only" onClick={() => onOpen("login")}>Sign in</button>
          <button className="button primary desktop-only" onClick={() => onOpen("login")}>Request a demo <ArrowRight size={15} /></button>
          <button className="icon-button mobile-only" onClick={() => setMobile(!mobile)} aria-label="Open menu"><Menu size={20} /></button>
        </div>
      </header>

      <section className="platform-hero" id="platform">
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        <div className="hero-grid">
          <div className="platform-copy">
            <div className="platform-badge"><span>NEW</span><Sparkles size={13}/> Evo Intelligence now monitors every engagement</div>
            <h1>Run the firm.<br/><em>Not the chaos.</em></h1>
            <p>The complete operating platform for accounting firms—connecting every company, obligation, document, workflow, specialist and client in one real-time system.</p>
            <div className="hero-actions">
              <button className="button primary large" onClick={() => onOpen("app")}>Explore the platform <ArrowRight size={17} /></button>
              <button className="button dark-secondary large" onClick={() => onOpen("login")}><CalendarDays size={16}/> Book a tailored demo</button>
            </div>
            <div className="platform-proof">
              <div><b>248</b><span>companies<br/>orchestrated</span></div>
              <div><b>98.7%</b><span>deadlines<br/>met on time</span></div>
              <div><b>31h</b><span>saved per<br/>accountant / month</span></div>
            </div>
          </div>

          <div className="platform-stage">
            <div className="stage-chrome">
              <span/><span/><span/><em>cabinet-aa.evocompta.com</em>
              <div><ShieldCheck size={11}/> Secure workspace</div>
            </div>
            <div className="stage-shell">
              <aside className="stage-sidebar">
                <Logo compact/>
                <div className="stage-firm">AA</div>
                {[LayoutDashboard, CheckCircle2, Building2, Files, BookOpen, WalletCards, ShieldCheck, UsersRound, CalendarDays, TrendingUp].map((Icon, index) => (
                  <span key={index} className={index === 0 ? "active" : ""}><Icon size={14}/>{index === 1 && <i>8</i>}</span>
                ))}
                <span className="stage-avatar">AB</span>
              </aside>
              <div className="stage-content">
                <div className="stage-top">
                  <div><small>FRIDAY, 24 JULY</small><b>Good morning, Amine.</b></div>
                  <div className="stage-search"><Search size={12}/> Search everything <kbd>⌘K</kbd></div>
                  <span><Bell size={14}/><i/></span>
                </div>
                <div className="stage-title"><div><b>Your firm at a glance</b><small>42 assigned companies · May 2026</small></div><button><Plus size={12}/> New task</button></div>
                <div className="stage-kpis">
                  <div><span><Clock3 size={13}/> DUE TODAY</span><b>24</b><em>8 high priority</em></div>
                  <div><span><Gauge size={13}/> PORTFOLIO HEALTH</span><b>91%</b><em className="good">↑ 4.2%</em></div>
                  <div><span><MessageSquareText size={13}/> CLIENT WAITING</span><b>17</b><em>3 overdue</em></div>
                  <div><span><Banknote size={13}/> VALUE PROCESSED</span><b>4.8M</b><em>DZD · this month</em></div>
                </div>
                <div className="stage-dashboard">
                  <div className="stage-card stage-queue">
                    <div className="stage-card-head"><div><b>Priority queue</b><small>Ordered by deadline & risk</small></div><button>View all <ArrowRight size={11}/></button></div>
                    {tasks.slice(0,4).map((task, i) => <div className="stage-task" key={task.task}><span className={`stage-check sc-${i}`}>{i === 3 && <Check size={9}/>}</span><div><b>{task.task}</b><small>{task.company}</small></div><em>{task.type}</em><i>{task.due.split(" · ")[0]}</i><span className="stage-owner">{i === 0 ? "AB" : ["NA","ML","YK"][i-1]}</span></div>)}
                  </div>
                  <div className="stage-card stage-risk">
                    <div className="stage-card-head"><div><b>Compliance radar</b><small>Next 7 days</small></div><ShieldCheck size={14}/></div>
                    <div className="radar-date"><span><b>26</b><small>JUL</small></span><div><b>G50 declarations</b><small>12 companies · 4 pending</small></div></div>
                    <div className="radar-progress"><span style={{width:"67%"}}/><i>67%</i></div>
                    <div className="radar-date"><span className="violet"><b>29</b><small>JUL</small></span><div><b>CNAS payroll filing</b><small>8 companies · 2 pending</small></div></div>
                    <div className="stage-ai"><Sparkles size={13}/><p><b>3 filings are at risk.</b><br/>Reassigning 6 tasks protects every deadline.</p><ArrowRight size={12}/></div>
                  </div>
                  <div className="stage-card stage-portfolio">
                    <div className="stage-card-head"><div><b>Company production</b><small>May accounting period</small></div><button>248 companies <ChevronDown size={11}/></button></div>
                    {companyRows.slice(0,3).map((company) => <div className="stage-company" key={company.code}><span>{company.name.split(" ")[1]?.slice(0,2)}</span><div><b>{company.name}</b><small>{company.code}</small></div><div className="stage-bar"><span style={{width:`${company.progress}%`}}/></div><em>{company.progress}%</em><i className={company.status.toLowerCase().replace(" ","-")}>{company.status}</i></div>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="stage-float float-approval"><span><FileCheck2 size={16}/></span><div><small>APPROVAL COMPLETE</small><b>VAT declaration · SARL Atlas</b></div><CheckCircle2 size={17}/></div>
            <div className="stage-float float-ai"><Sparkles size={15}/><div><small>EVO INTELLIGENCE</small><b>47 documents classified</b><em>96.2% confidence</em></div></div>
          </div>
        </div>
        <div className="platform-marquee">
          <span>ONE CONNECTED PLATFORM</span>
          {[["01","Work OS"],["02","Companies"],["03","Documents + OCR"],["04","Accounting"],["05","Payroll"],["06","Tax + Compliance"],["07","Client CRM"],["08","Firm Intelligence"]].map(([n,label]) => <div key={label}><small>{n}</small>{label}</div>)}
        </div>
      </section>

      <section className="enterprise-strip">
        <p>Built for firms managing complexity at scale</p>
        <div><span>MAZARS</span><span>EXPERTA</span><span>FIDUCIA</span><span>ACCOUNTA</span><span>NORTHSTAR</span></div>
        <em><ShieldCheck size={14}/> SOC-ready controls</em>
      </section>

      <section className="platform-story" id="operations">
        <div className="story-heading">
          <span className="section-label">Beyond practice management</span>
          <h2>One operating layer across the entire firm.</h2>
          <p>EvoCompta does more than store work. It understands the relationship between a company, its obligations, the evidence required, the people responsible and the client waiting on the outcome.</p>
        </div>
        <div className="operating-map">
          <div className="map-rail">
            <small>LIVE ENGAGEMENT</small>
            <b>SARL Atlas Construction</b>
            <span>May 2026 monthly close</span>
            <em><i/> On track · 82%</em>
          </div>
          {[
            [Upload, "01", "Collect", "49 documents", "Client portal + email + scan", "complete"],
            [Sparkles, "02", "Understand", "96.2% confidence", "OCR + AI classification", "complete"],
            [BookOpen, "03", "Produce", "1,248 entries", "Books + reconciliation", "active"],
            [FileCheck2, "04", "Review", "3 exceptions", "Controls + approval", "waiting"],
            [ShieldCheck, "05", "Comply", "G50 · 26 Jul", "Submit + evidence", "waiting"],
          ].map(([Icon, n, title, metric, desc, status], index) => (
            <article className={`map-step ${status}`} key={title as string}>
              <div className="map-step-top"><span>{n as string}</span><i>{status === "complete" ? <Check size={11}/> : index + 1}</i></div>
              <span className="map-icon"><Icon size={19}/></span>
              <h3>{title as string}</h3>
              <b>{metric as string}</b>
              <p>{desc as string}</p>
              {index < 4 && <ArrowRight className="map-arrow" size={15}/>}
            </article>
          ))}
        </div>
        <div className="platform-bento">
          <article className="bento-large">
            <div className="bento-copy"><span className="section-label">Firm command center</span><h3>See risk before it becomes urgency.</h3><p>Workload, deadlines, client dependencies and quality controls update in real time across every department.</p><button onClick={() => onOpen("app")}>Open operations dashboard <ArrowRight size={14}/></button></div>
            <div className="workload-visual">
              <div className="workload-top"><b>Team capacity</b><span>This week <ChevronDown size={11}/></span></div>
              {[["Nadia A.","Accounting manager",92,"12 due"],["Amine B.","Senior accountant",74,"8 due"],["Lyna M.","Junior accountant",58,"5 due"],["Yacine K.","Tax consultant",81,"9 due"]].map(([name,job,value,due],i) => <div className="workload-row" key={name as string}><span className={`work-person wp-${i}`}>{(name as string).split(" ").map(x=>x[0]).join("")}</span><div><b>{name as string}</b><small>{job as string}</small></div><div className="work-bar"><span style={{width:`${value}%`}}/></div><em>{value as number}%</em><i>{due as string}</i></div>)}
              <div className="capacity-note"><Sparkles size={14}/><span><b>Capacity available.</b> Lyna can absorb 4 of Nadia’s review tasks without moving an SLA.</span><button>Apply</button></div>
            </div>
          </article>
          <article className="bento-small intelligence-bento"><span><Sparkles size={19}/></span><small>EVO INTELLIGENCE</small><h3>A firm that learns how your best people work.</h3><p>Suggest entries, detect filing risk, summarize financials and surface the next best action—with human approval built in.</p><div className="intelligence-pulse"><i/><i/><i/><i/><i/><i/><i/></div></article>
          <article className="bento-small portal-bento"><span><MessageSquareText size={19}/></span><small>CLIENT PORTAL</small><h3>Your clients finally know what you need.</h3><p>Uploads, requests, approvals, signatures, reports and meetings in one beautifully simple portal.</p><div className="portal-request"><span><FileText size={15}/></span><div><b>May bank statement</b><small>Requested by Amine · Due today</small></div><button>Upload</button></div></article>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <div><span className="section-label">The complete platform</span><h2>Deep enough for specialists. Connected enough for everyone.</h2></div>
          <p>Every module is purpose-built for accounting-firm operations, while sharing one company record, one workflow engine and one audit trail.</p>
        </div>
        <div className="feature-grid">
          {[
            [Files, "Documents that organize themselves", "AI capture, OCR, classification, versioning and approvals—with a complete evidence trail.", "Smart intake"],
            [CalendarDays, "Deadlines that never surprise you", "A unified tax and payroll calendar that predicts risk before work becomes urgent.", "Compliance"],
            [Activity, "Production you can actually see", "Real-time workload, bottlenecks and engagement progress across every team and company.", "Operations"],
            [MessageSquareText, "Client collaboration without chaos", "Requests, approvals, e-signatures, meetings and files in a portal clients love.", "Client portal"],
            [WalletCards, "Payroll with controls built in", "Contracts, attendance, calculations, CNAS, CASNOS and payslips in one guided run.", "Payroll"],
            [TrendingUp, "A more profitable practice", "Know client margin, team capacity, service performance and revenue—in real time.", "Intelligence"],
          ].map(([Icon, title, desc, label]) => (
            <article className="feature-card" key={title as string}>
              <span className="feature-icon"><Icon size={21} /></span>
              <small>{label as string}</small>
              <h3>{title as string}</h3>
              <p>{desc as string}</p>
              <button>Explore capability <ArrowRight size={14} /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="section workflow-section" id="industries">
        <div className="workflow-copy">
          <span className="section-label">Built around the work</span>
          <h2>Every role sees exactly what needs attention.</h2>
          <p>From owner to assistant, EvoCompta shapes the day around responsibilities, permissions and next best actions.</p>
          {["Senior accountant — close the right books first", "Manager — rebalance workload before deadlines slip", "Payroll specialist — run every control in sequence", "Client — upload, approve and sign in minutes"].map((item, i) => (
            <div className="role-line" key={item}><span>{i + 1}</span>{item}</div>
          ))}
        </div>
        <div className="workflow-visual">
          <div className="timeline-card">
            <div className="panel-head"><div><small>ENGAGEMENT FLOW</small><b>May monthly close</b></div><span className="pill success">On track</span></div>
            {[
              ["Documents collected", "Automated", "Complete", true],
              ["OCR & classification", "AI workflow", "Complete", true],
              ["Bank reconciliation", "Amine B.", "In review", false],
              ["VAT declaration", "Due 26 Jul", "Queued", false],
            ].map(([title, who, status, done], i) => (
              <div className="timeline-row" key={title as string}>
                <span className={done ? "timeline-node done" : "timeline-node"}>{done ? <Check size={13}/> : i + 1}</span>
                <div><b>{title as string}</b><small>{who as string}</small></div>
                <em>{status as string}</em>
              </div>
            ))}
          </div>
          <div className="ai-card">
            <span><Sparkles size={16} /> Evo Intelligence</span>
            <p>“Three companies are likely to miss Sunday’s G50 deadline. Reassigning 6 tasks to Nadia protects all three filings.”</p>
            <button>Review recommendation <ArrowRight size={14}/></button>
          </div>
        </div>
      </section>

      <section className="testimonial section">
        <div className="quote-mark">“</div>
        <blockquote>We stopped asking where the work was. EvoCompta made every deadline, handoff and client request visible—and gave our managers time back to actually lead.</blockquote>
        <div className="quote-person"><div>KA</div><span><b>Kamel Aït Ahmed</b><small>Managing Partner, Fidia Conseil · Algiers</small></span></div>
      </section>

      <section className="cta-section" id="pricing">
        <span className="section-label">The calmest way to run a busy firm</span>
        <h2>Give your team one place to do their best work.</h2>
        <p>See EvoCompta on your own workflows, companies and compliance calendar.</p>
        <button className="button primary large" onClick={() => onOpen("login")}>Book your consultation <ArrowRight size={17}/></button>
      </section>
      <footer><Logo /><span>© 2026 EvoCompta. Built for serious accounting firms.</span><div><a>Privacy</a><a>Security</a><a>Contact</a></div></footer>
    </main>
  );
}

function Login({ onOpen }: { onOpen: (view: View) => void }) {
  const [twoFactor, setTwoFactor] = useState(false);
  return (
    <main className="auth-shell">
      <button className="auth-logo" onClick={() => onOpen("public")}><Logo /></button>
      <div className="auth-aside">
        <div>
          <span className="section-label">One intelligent workspace</span>
          <h2>Your firm’s day,<br/>perfectly orchestrated.</h2>
          <p>Deadlines, documents, production and client collaboration—clear from the moment you sign in.</p>
        </div>
        <div className="auth-proof">
          <div className="avatars"><span>AM</span><span>NK</span><span>LY</span><span>+12</span></div>
          <p><b>18 teammates</b> are working across 248 companies today.</p>
        </div>
      </div>
      <div className="auth-panel">
        <div className="login-card">
          <div className="login-icon"><ShieldCheck size={22}/></div>
          <h1>{twoFactor ? "Verify it’s you" : "Welcome back"}</h1>
          <p>{twoFactor ? "Enter the 6-digit code from your authenticator app." : "Sign in to continue to Cabinet Amine & Associés."}</p>
          {!twoFactor ? (
            <>
              <label>Work email<input type="email" defaultValue="amine@cabinet-aa.dz" /></label>
              <label><span>Password <button>Forgot password?</button></span><input type="password" defaultValue="EvoCompta2026!" /></label>
              <button className="button primary full" onClick={() => setTwoFactor(true)}>Continue <ArrowRight size={16}/></button>
              <div className="or"><span/>or<span/></div>
              <button className="button secondary full"><Landmark size={17}/> Continue with SSO</button>
            </>
          ) : (
            <>
              <div className="otp-row">{[8, 4, 1, 9, 2, 6].map((n, i) => <input key={i} defaultValue={n}/>)}</div>
              <button className="button primary full" onClick={() => onOpen("app")}>Open workspace <ArrowRight size={16}/></button>
              <button className="text-button full">Use a recovery code</button>
            </>
          )}
          <small className="secure-note"><ShieldCheck size={13}/> Protected by enterprise-grade encryption</small>
        </div>
      </div>
    </main>
  );
}

function SetupWizard({ onOpen }: { onOpen: (view: View) => void }) {
  const [step, setStep] = useState(0);
  const steps = ["Firm information", "Departments", "Employees", "Accounting plans", "Tax configuration", "Payroll rules", "Import companies", "Import clients", "Bank accounts", "Finish"];
  return (
    <main className="setup-shell">
      <aside className="setup-aside">
        <Logo />
        <div><span className="section-label">Firm setup</span><h2>Let’s shape EvoCompta around your practice.</h2><p>You can edit every setting later.</p></div>
        <div className="setup-progress"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }}/></div>
        <small>Step {step + 1} of {steps.length}</small>
      </aside>
      <section className="setup-main">
        <div className="step-list">{steps.map((name, i) => <button key={name} className={i === step ? "active" : i < step ? "done" : ""} onClick={() => setStep(i)}><span>{i < step ? <Check size={13}/> : i + 1}</span>{name}</button>)}</div>
        <div className="setup-card">
          <span className="step-kicker">STEP {step + 1}</span>
          <h1>{steps[step]}</h1>
          <p>{step === 9 ? "Your workspace is configured and ready for the team." : "We use this information to preconfigure workflows, permissions and compliance reminders."}</p>
          {step === 0 ? (
            <div className="form-grid"><label className="wide">Legal firm name<input defaultValue="Cabinet Amine & Associés"/></label><label>Registration number<input defaultValue="RC 16/00-048219B26"/></label><label>Tax ID (NIF)<input defaultValue="001626048219347"/></label><label>Primary language<select defaultValue="French"><option>French</option><option>Arabic</option><option>English</option></select></label><label>Timezone<select defaultValue="Africa/Algiers"><option>Africa/Algiers</option></select></label><label className="wide">Head office address<input defaultValue="12 Rue Didouche Mourad, Alger Centre"/></label></div>
          ) : step === 9 ? (
            <div className="finish-state"><span><Check size={28}/></span><h3>Everything is ready.</h3><p>248 companies imported · 18 employees invited · 6 workflows configured</p></div>
          ) : (
            <div className="import-zone"><span><Upload size={24}/></span><h3>Configure {steps[step].toLowerCase()}</h3><p>Import a template or add records manually. EvoCompta will validate data before anything is created.</p><div><button className="button secondary">Download template</button><button className="button primary"><Plus size={15}/> Add manually</button></div></div>
          )}
          <div className="setup-actions"><button className="button ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button className="button primary" onClick={() => step === 9 ? onOpen("app") : setStep(step + 1)}>{step === 9 ? "Open workspace" : "Save & continue"} <ArrowRight size={15}/></button></div>
        </div>
      </section>
    </main>
  );
}

function Sidebar({ active, setActive, role }: { active: NavKey; setActive: (key: NavKey) => void; role: string }) {
  return (
    <aside className="app-sidebar">
      <Logo />
      <button className="firm-switcher"><span>AA</span><div><b>Amine & Associés</b><small>{role}</small></div><ChevronDown size={14}/></button>
      <nav>
        {navItems.map(({ key, label, icon: Icon }) => <button key={key} className={active === key ? "active" : ""} onClick={() => setActive(key)}><Icon size={17}/><span>{label}</span>{key === "work" && <em>24</em>}</button>)}
      </nav>
      <div className="sidebar-bottom"><button><Headphones size={17}/><span>Help & support</span></button><button><Settings size={17}/><span>Settings</span></button><div className="profile"><span>AB</span><div><b>Amine Belkacem</b><small>amine@cabinet-aa.dz</small></div><MoreHorizontal size={16}/></div></div>
    </aside>
  );
}

function Dashboard({ onCompany }: { onCompany: () => void }) {
  const [completed, setCompleted] = useState<number[]>([]);
  const toggleTask = (index: number) => setCompleted((current) => current.includes(index) ? current.filter((n) => n !== index) : [...current, index]);
  return (
    <>
      <div className="welcome-row"><div><span>Friday, 24 July 2026</span><h1>Good morning, Amine.</h1><p>Here’s what needs your attention across 42 assigned companies.</p></div><div><button className="button secondary"><CalendarDays size={16}/> Plan my day</button><button className="button primary"><Plus size={16}/> New task</button></div></div>
      <section className="kpi-grid">
        {[
          ["24", "Due today", "8 high priority", Clock3, "urgent"],
          ["91%", "Portfolio health", "+4.2% this month", Gauge, "good"],
          ["17", "Waiting on clients", "3 overdue requests", MessageSquareText, ""],
          ["DZD 4.8M", "Value processed", "This month", Banknote, ""],
        ].map(([value, label, detail, Icon, tone]) => <article className="kpi-card" key={label as string}><div><small>{label as string}</small><b>{value as string}</b><span className={tone as string}>{detail as string}</span></div><span className="kpi-icon"><Icon size={18}/></span></article>)}
      </section>
      <section className="dashboard-grid">
        <article className="workspace-card priority-card">
          <div className="card-head"><div><h2>Priority queue</h2><p>Ordered by deadline and business risk</p></div><button>View all <ArrowRight size={14}/></button></div>
          <div className="task-table">
            {tasks.map((task, index) => <div className={`task-row ${completed.includes(index) ? "complete" : ""}`} key={task.task}><button className="task-check" onClick={() => toggleTask(index)}>{completed.includes(index) && <Check size={13}/>}</button><div className="task-company"><b>{task.task}</b><button onClick={onCompany}>{task.company}</button></div><span className="tag">{task.type}</span><div className={`task-due ${task.tone}`}><Clock3 size={13}/>{task.due}</div><span className="avatar tiny">{task.owner === "You" ? "AB" : task.owner.split(" ").map(x => x[0]).join("")}</span><button className="row-more"><MoreHorizontal size={17}/></button></div>)}
          </div>
          <button className="card-footer-button"><Plus size={15}/> Add task</button>
        </article>
        <article className="workspace-card deadlines-card">
          <div className="card-head"><div><h2>Upcoming deadlines</h2><p>Next 7 days</p></div><button><CalendarDays size={17}/></button></div>
          {[["26", "JUL", "G50 VAT declarations", "12 companies", "8 / 12 ready", 67], ["29", "JUL", "CNAS payroll filing", "8 companies", "6 / 8 ready", 75], ["31", "JUL", "IBS installments", "5 companies", "2 / 5 ready", 40]].map(([day, month, title, count, ready, progress], i) => <div className="deadline-row" key={title as string}><div className={`date-box date-${i}`}><b>{day as string}</b><small>{month as string}</small></div><div className="deadline-info"><b>{title as string}</b><small>{count as string}<span>·</span>{ready as string}</small><div className="progress"><span style={{ width: `${progress}%` }}/></div></div><ChevronRight size={15}/></div>)}
        </article>
        <article className="workspace-card portfolio-card">
          <div className="card-head"><div><h2>Portfolio progress</h2><p>May 2026 accounting period</p></div><button>All companies <ArrowRight size={14}/></button></div>
          <div className="portfolio-head"><span>Company</span><span>Progress</span><span>Status</span><span>Documents</span></div>
          {companyRows.map((company) => <button className="company-row" key={company.name} onClick={onCompany}><div className="company-name"><span>{company.name.split(" ")[1]?.slice(0, 2)}</span><div><b>{company.name}</b><small>{company.code} · {company.owner}</small></div></div><div className="company-progress"><div className="progress"><span style={{ width: `${company.progress}%` }}/></div><em>{company.progress}%</em></div><span className={`status ${company.status.toLowerCase().replace(" ", "-")}`}>{company.status}</span><span className={company.docs === "Complete" ? "docs good" : "docs"}>{company.docs}</span><ChevronRight size={15}/></button>)}
        </article>
        <article className="workspace-card ai-insight">
          <div className="ai-title"><span><Sparkles size={17}/></span><div><h2>Evo Intelligence</h2><p>Daily operational insight</p></div></div>
          <p><b>Three filings are at risk.</b> SARL El Bahia is missing 12 documents and has no client response in 6 days.</p>
          <button>Review risks <ArrowRight size={14}/></button>
          <small>Updated 8 minutes ago</small>
        </article>
      </section>
    </>
  );
}

function ModulePage({ page, onCompany }: { page: Exclude<NavKey, "dashboard">; onCompany: () => void }) {
  const content = moduleContent[page];
  return (
    <>
      <div className="module-heading"><div><span className="page-eyebrow">{content.eyebrow}</span><h1>{content.title}</h1><p>{content.subtitle}</p></div><button className="button primary"><Plus size={16}/>{content.action}</button></div>
      <section className="module-stats">{content.stats.map(([value, label, trend]) => <article key={label}><span>{label}</span><b>{value}</b><small>{trend}</small></article>)}</section>
      <section className="workspace-card data-card">
        <div className="data-toolbar"><div className="search-field"><Search size={15}/><input placeholder={`Search ${content.title.toLowerCase()}…`}/></div><div><button className="button secondary small">All statuses <ChevronDown size={14}/></button><button className="button secondary small">This month <ChevronDown size={14}/></button><button className="icon-button"><PanelRightOpen size={17}/></button></div></div>
        <div className="data-table">
          <div className="data-head">{content.columns.map((column) => <span key={column}>{column}</span>)}</div>
          {[...companyRows, ...companyRows.slice(0, 2)].map((company, index) => <button className="data-row" key={`${company.code}-${index}`} onClick={onCompany}>
            <span className="data-primary"><i>{company.name.split(" ")[1]?.slice(0, 2)}</i><span><b>{page === "documents" ? `INV-2026-${1840 + index}` : page === "work" ? tasks[index % tasks.length].task : company.name}</b><small>{company.code}</small></span></span>
            <span>{page === "calendar" ? `${9 + index}:30` : company.period}</span>
            <span><span className="table-progress"><i style={{width: `${company.progress}%`}}/></span>{company.progress}%</span>
            <span><em className={`status ${company.status.toLowerCase().replace(" ", "-")}`}>{company.status}</em></span>
            <span>{company.docs}</span>
            <span>{company.owner}<ChevronRight size={14}/></span>
          </button>)}
        </div>
        <div className="table-footer"><span>Showing 1–6 of 248</span><div><button disabled>Previous</button><button>Next</button></div></div>
      </section>
    </>
  );
}

function CompanyDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="company-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head"><div className="company-name large"><span>AT</span><div><b>SARL Atlas Construction</b><small>ATL-042 · Active client</small></div></div><button className="icon-button" onClick={onClose}><X size={18}/></button></div>
        <div className="drawer-alert"><ShieldCheck size={17}/><div><b>G50 due in 2 days</b><small>Declaration is 82% complete</small></div><ChevronRight size={15}/></div>
        <div className="drawer-tabs"><button className="active">Overview</button><button>Activity</button><button>Documents</button><button>More</button></div>
        <div className="drawer-body">
          <div className="company-health"><div><span>Engagement health</span><b>82%</b><small>On track</small></div><div className="health-ring"><span>82</span></div></div>
          <h3>Current period</h3>
          {[["Document collection", "46 of 49", 94], ["Bookkeeping", "May 2026", 86], ["Bank reconciliation", "2 accounts", 72], ["VAT declaration", "In review", 82]].map(([label, meta, value]) => <div className="drawer-progress" key={label as string}><div><b>{label as string}</b><span>{meta as string}</span></div><div className="progress"><span style={{width: `${value}%`}}/></div></div>)}
          <h3>Key contacts</h3>
          <div className="contact-card"><span className="avatar">KB</span><div><b>Karim Bensaïd</b><small>Managing Director · +213 555 12 34 56</small></div><button><MessageSquareText size={16}/></button></div>
          <h3>Recent activity</h3>
          {[["Bank statement uploaded", "Karim Bensaïd · 24 min ago"], ["18 invoices classified", "Evo AI · 1 hour ago"], ["VAT review assigned to you", "Nadia A. · Yesterday"]].map(([title, meta], i) => <div className="activity-row" key={title}><span className={`activity-icon ai-${i}`}>{i === 1 ? <Sparkles size={14}/> : <FileText size={14}/>}</span><div><b>{title}</b><small>{meta}</small></div></div>)}
        </div>
        <div className="drawer-footer"><button className="button secondary"><MessageSquareText size={15}/> Contact client</button><button className="button primary">Open company <ArrowRight size={15}/></button></div>
      </aside>
    </div>
  );
}

function CommandPalette({ onClose, setActive }: { onClose: () => void; setActive: (key: NavKey) => void }) {
  const actions: [string, string, NavKey, typeof Building2][] = [
    ["Open companies", "Navigate", "companies", Building2],
    ["Create a journal entry", "Quick action", "accounting", ReceiptText],
    ["Upload documents", "Quick action", "documents", Upload],
    ["Run payroll", "Workflow", "payroll", WalletCards],
    ["Review tax deadlines", "Navigate", "tax", ShieldCheck],
  ];
  return (
    <div className="command-backdrop" onClick={onClose}><div className="command-box" onClick={(e) => e.stopPropagation()}><div className="command-search"><Search size={19}/><input autoFocus placeholder="Search companies, tasks, documents, or actions…"/><kbd>ESC</kbd></div><div className="command-results"><small>QUICK ACTIONS</small>{actions.map(([label, meta, key, Icon]) => <button key={label} onClick={() => {setActive(key); onClose();}}><span><Icon size={17}/></span><div><b>{label}</b><small>{meta}</small></div><kbd>↵</kbd></button>)}</div><div className="command-help"><span><kbd>↑↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><span><kbd>⌘K</kbd> Toggle</span></div></div></div>
  );
}

function AppWorkspace({ onOpen }: { onOpen: (view: View) => void }) {
  const [active, setActive] = useState<NavKey>("dashboard");
  const [role, setRole] = useState("Senior Accountant");
  const [roleOpen, setRoleOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [command, setCommand] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommand((value) => !value); }
      if (event.key === "Escape") { setCommand(false); setDrawer(false); setNotifications(false); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  return (
    <main className="app-shell">
      <div className={mobileNav ? "mobile-sidebar open" : "mobile-sidebar"}><Sidebar active={active} setActive={(key) => {setActive(key); setMobileNav(false);}} role={role}/></div>
      <Sidebar active={active} setActive={setActive} role={role}/>
      <section className="app-area">
        <header className="app-topbar">
          <button className="icon-button mobile-only" onClick={() => setMobileNav(true)}><Menu size={19}/></button>
          <button className="global-search" onClick={() => setCommand(true)}><Search size={15}/><span>Search companies, tasks, documents…</span><kbd>⌘ K</kbd></button>
          <div className="top-actions">
            <div className="role-menu"><button onClick={() => setRoleOpen(!roleOpen)}><span className="role-dot"/>{role}<ChevronDown size={13}/></button>{roleOpen && <div className="role-popover">{roles.map((name) => <button key={name} className={name === role ? "active" : ""} onClick={() => {setRole(name); setRoleOpen(false);}}><span>{name}</span>{name === role && <Check size={14}/>}</button>)}</div>}</div>
            <button className="icon-button has-badge" onClick={() => setNotifications(!notifications)}><Bell size={18}/><span/></button>
            <button className="quick-add" onClick={() => setCommand(true)}><Plus size={17}/></button>
          </div>
          {notifications && <div className="notification-popover"><div><b>Notifications</b><button>Mark all read</button></div>{[["Client uploaded 6 documents", "SARL Atlas · 8 min"], ["Payroll run needs approval", "SPA Méditerranée · 24 min"], ["G50 deadline risk detected", "3 companies · 1 hr"]].map(([title, meta], i) => <button key={title}><span className={`notify-icon n${i}`}>{i === 2 ? <Sparkles size={14}/> : <Bell size={14}/>}</span><div><b>{title}</b><small>{meta}</small></div></button>)}</div>}
        </header>
        <div className="app-content">{active === "dashboard" ? <Dashboard onCompany={() => setDrawer(true)}/> : <ModulePage page={active} onCompany={() => setDrawer(true)}/>}</div>
        <nav className="mobile-dock">{navItems.slice(0, 4).map(({key, label, icon: Icon}) => <button key={key} className={active === key ? "active" : ""} onClick={() => setActive(key)}><Icon size={19}/><span>{label}</span></button>)}<button onClick={() => setMobileNav(true)}><Menu size={19}/><span>More</span></button></nav>
      </section>
      {drawer && <CompanyDrawer onClose={() => setDrawer(false)}/>}
      {command && <CommandPalette onClose={() => setCommand(false)} setActive={setActive}/>}
      <button className="prototype-exit" onClick={() => onOpen("public")} title="Return to website">↗</button>
    </main>
  );
}

export function EvoCompta() {
  const [view, setView] = useState<View>("public");
  const screen = useMemo(() => {
    if (view === "login") return <Login onOpen={setView}/>;
    if (view === "setup") return <SetupWizard onOpen={setView}/>;
    if (view === "app") return <AppWorkspace onOpen={setView}/>;
    return <PublicSite onOpen={setView}/>;
  }, [view]);
  return <>{screen}{view === "login" && <button className="setup-shortcut" onClick={() => setView("setup")}>New firm? Start setup</button>}</>;
}
