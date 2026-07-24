"use client";

import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Factory,
  FileCheck2,
  HeartPulse,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ReceiptText,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    icon: BookOpenCheck,
    title: "Accounting & reporting",
    text: "Reliable monthly accounts, financial statements and management reporting that turn numbers into clear decisions.",
    items: ["Monthly bookkeeping", "Financial statements", "Management dashboards"],
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Tax & compliance",
    text: "Proactive tax planning and fully evidenced declarations, with every deadline monitored by our specialists.",
    items: ["VAT and G50", "Corporate tax", "Tax reviews and filings"],
  },
  {
    number: "03",
    icon: UsersRound,
    title: "Payroll & social",
    text: "Secure payroll operations from employee onboarding to payslips, CNAS, CASNOS and statutory declarations.",
    items: ["Payroll processing", "CNAS and CASNOS", "Contracts and employee matters"],
  },
  {
    number: "04",
    icon: BriefcaseBusiness,
    title: "Business advisory",
    text: "Practical support for founders and leaders navigating growth, financing, restructuring and succession.",
    items: ["Business plans", "Cash-flow advisory", "Performance improvement"],
  },
];

const industries = [
  { icon: Building2, name: "Construction & property", text: "Project accounting, contract margins and cash-flow control." },
  { icon: Factory, name: "Industry & distribution", text: "Inventory, cost accounting and operational performance." },
  { icon: HeartPulse, name: "Healthcare", text: "Compliant structures and clear financial oversight for practices." },
  { icon: Landmark, name: "Professional services", text: "Profitability, payroll and tax planning for growing firms." },
];

const insights = [
  { category: "Tax guide", date: "18 July 2026", title: "What growing companies should prepare before the next G50 deadline", read: "6 min read" },
  { category: "Business", date: "04 July 2026", title: "Seven cash-flow signals every managing director should watch monthly", read: "8 min read" },
  { category: "Payroll", date: "21 June 2026", title: "CNAS and payroll controls: a practical checklist for employers", read: "5 min read" },
];

function Brand() {
  return (
    <a className="site-brand" href="#top" aria-label="Evo Conseil home">
      <span className="brand-monogram">E</span>
      <span><b>EVO</b><small>CONSEIL</small></span>
    </a>
  );
}

export function EvoCompta() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="firm-site" id="top">
      <div className="utility-bar">
        <span><MapPin size={12}/> Algiers, Algeria</span>
        <span>Independent accounting, tax and advisory firm</span>
        <div><a href="tel:+213555123456"><Phone size={12}/> +213 (0) 555 12 34 56</a><a href="mailto:contact@evoconseil.dz"><Mail size={12}/> contact@evoconseil.dz</a></div>
      </div>

      <header className="site-header">
        <Brand/>
        <nav className={menuOpen ? "site-nav open" : "site-nav"}>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise <ChevronDown size={12}/></a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
          <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
          <a href="#insights" onClick={() => setMenuOpen(false)}>Insights</a>
          <a href="#firm" onClick={() => setMenuOpen(false)}>The firm</a>
          <a className="mobile-consult" href="#contact" onClick={() => setMenuOpen(false)}>Book a consultation</a>
        </nav>
        <a className="consult-button" href="#contact">Book a consultation <ArrowRight size={14}/></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </header>

      <section className="public-hero">
        <div className="hero-grain"/>
        <div className="hero-content">
          <div className="hero-intro">
            <span className="hero-kicker"><i/> Chartered expertise. Practical counsel.</span>
            <h1>Numbers tell the story.<br/><em>We help you shape it.</em></h1>
            <p>Accounting, tax, payroll and strategic advice for ambitious businesses that want more than year-end compliance.</p>
            <div className="public-actions">
              <a className="public-button orange" href="#contact">Speak with an advisor <ArrowRight size={16}/></a>
              <a className="public-button outline" href="#expertise">Discover our expertise</a>
            </div>
            <div className="hero-assurance">
              <span><BadgeCheck size={16}/> 14 years of expertise</span>
              <span><ShieldCheck size={16}/> Confidential by design</span>
              <span><Clock3 size={16}/> Responsive local team</span>
            </div>
          </div>

          <div className="hero-ledger">
            <div className="ledger-head">
              <span>CLIENT PERSPECTIVE</span>
              <em>2026 / 07</em>
            </div>
            <div className="ledger-title"><small>THE QUESTION WE ANSWER</small><h2>“What should we do next?”</h2></div>
            <div className="ledger-rule"/>
            <div className="ledger-grid">
              <div><span>01</span><b>See clearly</b><p>Reliable financial information, delivered when it matters.</p></div>
              <div><span>02</span><b>Plan early</b><p>Tax, payroll and cash-flow issues anticipated—not discovered late.</p></div>
              <div><span>03</span><b>Act confidently</b><p>Direct access to advisors who understand your business.</p></div>
            </div>
            <div className="ledger-signoff"><span><CheckCircle2 size={15}/> Advice grounded in your numbers</span><b>EVO CONSEIL</b></div>
          </div>
        </div>
        <div className="hero-fact fact-one"><small>CLIENT RETENTION</small><b>96%</b><span>Built on trust and responsiveness</span></div>
        <div className="hero-fact fact-two"><small>COMPANIES ADVISED</small><b>420+</b><span>Across the Algerian economy</span></div>
      </section>

      <section className="credibility-band">
        <span>Trusted financial counsel for</span>
        <div><b>FOUNDERS</b><i/> <b>FAMILY BUSINESSES</b><i/> <b>SMEs</b><i/> <b>INTERNATIONAL GROUPS</b><i/> <b>PROFESSIONALS</b></div>
      </section>

      <section className="expertise-section" id="expertise">
        <div className="section-intro">
          <div><span className="section-tag">OUR EXPERTISE</span><h2>Serious expertise.<br/>Clear, human advice.</h2></div>
          <p>We combine technical precision with commercial understanding. Every engagement is led by a senior advisor and shaped around the decisions your business actually faces.</p>
        </div>
        <div className="service-list">
          {services.map(({ number, icon: Icon, title, text, items }) => (
            <article className="service-row" key={title}>
              <span className="service-number">{number}</span>
              <span className="service-icon"><Icon size={22}/></span>
              <div className="service-copy"><h3>{title}</h3><p>{text}</p></div>
              <ul>{items.map((item) => <li key={item}><Check size={12}/>{item}</li>)}</ul>
              <button aria-label={`Learn about ${title}`}><ArrowRight size={18}/></button>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-section" id="approach">
        <div className="statement-number">14</div>
        <div className="statement-copy">
          <span className="section-tag light">OUR APPROACH</span>
          <blockquote>Good accounting records the past.<br/><em>Great advice improves the future.</em></blockquote>
          <p>We work close to your business throughout the year—not only when a filing is due. That means fewer surprises, faster answers and financial information you can actually use.</p>
          <a href="#contact">How we work with clients <ArrowRight size={14}/></a>
        </div>
        <div className="statement-points">
          {[
            ["01", "A senior advisor stays accountable"],
            ["02", "Monthly clarity, not annual surprises"],
            ["03", "Advice in plain, direct language"],
            ["04", "Technology supports—not replaces—judgment"],
          ].map(([number, text]) => <div key={number}><span>{number}</span><p>{text}</p></div>)}
        </div>
      </section>

      <section className="results-section">
        <div className="results-heading"><span className="section-tag">MEASURABLE VALUE</span><h2>We judge our work by what improves.</h2></div>
        <div className="results-grid">
          <article className="result-feature">
            <span>CLIENT STORY · DISTRIBUTION</span>
            <h3>From uncertain cash flow to a controlled 18-month growth plan.</h3>
            <p>We rebuilt monthly reporting, clarified product margins and introduced a rolling cash forecast for a growing family-owned distributor.</p>
            <div><b>23%</b><span>improvement in working capital</span><b>11 days</b><span>faster monthly close</span></div>
            <a href="#contact">Discuss a similar challenge <ArrowRight size={14}/></a>
          </article>
          <div className="result-metrics">
            <div><b>420+</b><span>companies supported</span><small>From formation to regional scale</small></div>
            <div><b>98.7%</b><span>filings delivered on time</span><small>Across tax and social obligations</small></div>
            <div><b>4.9/5</b><span>average client rating</span><small>For clarity and responsiveness</small></div>
            <div><b>72h</b><span>typical onboarding</span><small>With a structured handover plan</small></div>
          </div>
        </div>
      </section>

      <section className="industries-section" id="industries">
        <div className="industries-head">
          <div><span className="section-tag light">SECTOR KNOWLEDGE</span><h2>We understand the numbers behind your industry.</h2></div>
          <p>Technical accounting is only useful when it reflects how your company earns, invests and grows.</p>
        </div>
        <div className="industries-grid">
          {industries.map(({ icon: Icon, name, text }, index) => (
            <article key={name}><span>0{index + 1}</span><Icon size={25}/><h3>{name}</h3><p>{text}</p><a href="#contact">View expertise <ArrowRight size={13}/></a></article>
          ))}
        </div>
      </section>

      <section className="firm-section" id="firm">
        <div className="firm-portrait">
          <div className="portrait-architecture"><span/><span/><span/><span/></div>
          <div className="portrait-caption"><small>ALGIERS · SINCE 2012</small><b>Independent by choice.<br/>Invested in your success.</b></div>
        </div>
        <div className="firm-story">
          <span className="section-tag">THE FIRM</span>
          <h2>Close enough to know your business. Experienced enough to challenge it.</h2>
          <p>Evo Conseil is an independent accounting and advisory firm serving businesses across Algeria. Our multidisciplinary team brings together accountants, tax advisors, payroll specialists and business consultants around one goal: helping clients make better decisions.</p>
          <div className="firm-values">
            <div><span>01</span><b>Clarity</b><p>No jargon. No vague answers.</p></div>
            <div><span>02</span><b>Ownership</b><p>We stay accountable from question to outcome.</p></div>
            <div><span>03</span><b>Foresight</b><p>We raise issues before they become problems.</p></div>
          </div>
          <a href="#contact">Meet our advisors <ArrowRight size={14}/></a>
        </div>
      </section>

      <section className="insights-section" id="insights">
        <div className="insights-head"><div><span className="section-tag">PERSPECTIVES</span><h2>Useful thinking for business leaders.</h2></div><a href="#insights">View all insights <ArrowRight size={14}/></a></div>
        <div className="insight-grid">
          {insights.map((insight, index) => (
            <article key={insight.title}>
              <div className={`insight-art art-${index}`}><span>{insight.category}</span>{index === 0 ? <ReceiptText size={41}/> : index === 1 ? <TrendingUp size={41}/> : <UsersRound size={41}/>}</div>
              <div className="insight-meta"><span>{insight.category}</span><i/>{insight.date}</div>
              <h3>{insight.title}</h3>
              <div className="insight-foot"><span>{insight.read}</span><button><ArrowRight size={15}/></button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <span className="section-tag light">START A CONVERSATION</span>
          <h2>What would greater financial clarity change for your business?</h2>
          <p>Tell us what you are working through. A senior advisor will respond within one business day.</p>
          <div className="contact-details">
            <a href="tel:+213555123456"><span><Phone size={17}/></span><div><small>CALL THE OFFICE</small><b>+213 (0) 555 12 34 56</b></div></a>
            <a href="mailto:contact@evoconseil.dz"><span><Mail size={17}/></span><div><small>EMAIL US</small><b>contact@evoconseil.dz</b></div></a>
            <div><span><MapPin size={17}/></span><div><small>VISIT US</small><b>12 Rue Didouche Mourad, Alger Centre</b></div></div>
          </div>
        </div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          {submitted ? (
            <div className="form-success"><span><CheckCircle2 size={29}/></span><h3>Thank you.</h3><p>Your message has been received. A senior advisor will contact you within one business day.</p><button type="button" onClick={() => setSubmitted(false)}>Send another message</button></div>
          ) : (
            <>
              <div className="form-title"><span>PRIVATE & CONFIDENTIAL</span><b>Book an initial consultation</b></div>
              <div className="form-row"><label>First name<input required placeholder="Your first name"/></label><label>Last name<input required placeholder="Your last name"/></label></div>
              <label>Work email<input required type="email" placeholder="name@company.com"/></label>
              <label>Company<input required placeholder="Company name"/></label>
              <label>How can we help?<select defaultValue=""><option value="" disabled>Select an area</option><option>Accounting & reporting</option><option>Tax & compliance</option><option>Payroll & social</option><option>Business advisory</option><option>Company creation</option></select></label>
              <label>Tell us a little more<textarea rows={4} placeholder="What would you like to discuss?"/></label>
              <button className="submit-button" type="submit">Request consultation <ArrowRight size={15}/></button>
              <small><ShieldCheck size={12}/> Your information is handled in strict confidence.</small>
            </>
          )}
        </form>
      </section>

      <section className="faq-section">
        <div><span className="section-tag">COMMON QUESTIONS</span><h2>A clear start.</h2><p>Still have a question? <a href="#contact">Speak with our team.</a></p></div>
        <div className="faq-list">
          {[
            ["Who do you typically work with?", "We advise founders, family businesses, SMEs, international subsidiaries and independent professionals across Algeria."],
            ["Can you take over from another accounting firm?", "Yes. We manage the full handover, review opening balances and provide a clear transition schedule."],
            ["Do you offer ongoing advisory or only compliance?", "Both. Most clients combine accounting and compliance with monthly management reporting and direct advisory support."],
            ["How quickly can we begin?", "A standard engagement can usually begin within 72 hours once scope, access and the handover plan are agreed."],
          ].map(([question, answer]) => <details key={question}><summary><span>{question}</span><CircleHelp size={17}/></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><Brand/><p>Accounting, tax, payroll and business advice for companies building with confidence.</p><span><BadgeCheck size={14}/> Independent accounting and advisory firm</span></div>
          <div><b>Expertise</b><a href="#expertise">Accounting & reporting</a><a href="#expertise">Tax & compliance</a><a href="#expertise">Payroll & social</a><a href="#expertise">Business advisory</a></div>
          <div><b>Firm</b><a href="#firm">About us</a><a href="#industries">Industries</a><a href="#insights">Insights</a><a href="#contact">Careers</a></div>
          <div><b>Contact</b><a href="tel:+213555123456">+213 (0) 555 12 34 56</a><a href="mailto:contact@evoconseil.dz">contact@evoconseil.dz</a><p>12 Rue Didouche Mourad<br/>Alger Centre, Algeria</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Evo Conseil. All rights reserved.</span><div><a>Privacy</a><a>Terms</a><a>Professional standards</a></div><span>FR <i/> EN</span></div>
      </footer>
    </main>
  );
}
