# EvoCompta Product Blueprint

## Product definition

EvoCompta is an operating system for accounting firms. Its atomic unit is the **engagement for a managed company**, not a transaction. Accounting, payroll and tax capabilities exist to orchestrate the firm’s work, control risk, collect evidence, collaborate with clients and measure profitability.

North-star metric: **percentage of recurring obligations completed on time without manager intervention**.

Product principles:

1. Exception first: show people what needs judgment, not everything the system already knows.
2. Company context everywhere: no task, document, declaration or conversation is orphaned.
3. One-click continuation: every status card opens the next useful action.
4. Evidence by default: approvals, submissions, changes and client interactions leave an audit trail.
5. Progressive disclosure: portfolio first, engagement second, transaction detail third.
6. Automate the predictable; make the exceptional unmistakable.

## Information architecture

```text
EvoCompta
├── Public experience
│   ├── Services, industries, proof, pricing and consultation
│   ├── Client portal entry
│   └── Resources: blog, FAQ and contact
├── Identity and firm setup
│   ├── Authentication and security
│   ├── Firm creation and invitations
│   └── Ten-step configuration/import wizard
├── Firm workspace
│   ├── Today / role dashboard
│   ├── Work orchestration
│   ├── Companies and engagements
│   ├── Document operations
│   ├── Accounting production
│   ├── Payroll operations
│   ├── Tax and compliance
│   ├── CRM and client requests
│   ├── Calendar and deadlines
│   ├── Reports and firm intelligence
│   └── Settings, automations, integrations and audit
└── Client workspace
    ├── Home and requests
    ├── Uploads and approvals
    ├── Reports and declarations
    ├── Payroll documents
    ├── Meetings, chat and signatures
    └── Billing and profile
```

Global objects are Company, Contact, Engagement, Obligation, Workflow, Work Item, Document, Accounting Period, Payroll Run, Declaration, Interaction, Approval and Audit Event. Global search and the command palette resolve all objects.

## Complete sitemap

### Public

- Home
- Services
  - Accounting services
  - Payroll
  - Tax services
  - Business consulting
  - Company creation
- Industries
  - Construction
  - Professional services
  - Retail and distribution
  - Technology
  - Healthcare
  - Manufacturing
- Pricing
- About
- Case studies
- Blog / article
- FAQ
- Contact
- Book consultation
- Client portal

### Authentication and onboarding

- Login
- Forgot password
- Reset password
- Two-factor verification
- Recovery code
- SSO handoff
- Create firm
- Join invited firm
- Invite employees
- Setup: firm information
- Setup: departments
- Setup: employees
- Setup: accounting plans
- Setup: tax configuration
- Setup: payroll rules
- Setup: import companies
- Setup: import clients
- Setup: bank accounts
- Setup: validation and finish

### Firm workspace

- Today
- Inbox
- Work
  - My work
  - Team work
  - Recurring workflows
  - Kanban
  - Workload
  - Templates
- Companies
  - Portfolio
  - Company overview
  - Owners and contacts
  - Employees
  - Engagements and contracts
  - Accounting profile
  - Tax profile
  - Payroll profile
  - Bank accounts
  - Deadlines
  - Timeline, notes and custom fields
- Documents
  - Intake
  - Classification queue
  - Review queue
  - Approvals
  - Archive
  - Document viewer / OCR comparison
  - Version history
- Accounting
  - Production cockpit
  - General ledger
  - Journals and entries
  - Chart of accounts
  - Trial balance
  - Bank reconciliation
  - Recurring entries
  - Closing / opening
  - Fiscal years
  - Balance sheet
  - Income statement
  - Cash flow
- Payroll
  - Payroll cockpit
  - Employees
  - Contracts
  - Attendance, leaves and absences
  - Variables, bonuses and deductions
  - Payroll runs
  - Control and approval
  - Payslips
  - Salary history
  - CNAS
  - CASNOS
  - Government declarations
- Tax
  - Compliance cockpit
  - VAT / G50
  - Corporate tax / IBS
  - Income tax / IRG
  - Tax calendar
  - Declaration workspace
  - Submission register
  - Risk and penalty alerts
- CRM
  - Clients and contacts
  - Client requests
  - Meetings, calls and notes
  - Email and WhatsApp
  - Follow-ups
  - Activity timeline
- Calendar
  - Day, week, month and timeline
  - Appointments
  - Tax and payroll deadlines
  - Audits and internal meetings
  - Google Calendar / Outlook sync
- Reports
  - Firm revenue, costs, profit and cash flow
  - Client profitability
  - Employee utilization and productivity
  - Accounting cycle performance
  - Payroll and tax performance
  - Deadline compliance
  - Report builder and scheduled distribution
- Intelligence
  - Risk center
  - AI assistant
  - Automation suggestions
  - Generated reports
- Administration
  - Firm, departments and locations
  - People, roles and permissions
  - Services, pricing and contracts
  - Workflow templates and SLAs
  - Accounting, tax and payroll configuration
  - Notification rules
  - Integrations, API and webhooks
  - Security and audit log
  - Subscription and billing

### Super-admin console

- Platform overview and health
- Firms and tenant support access
- Plans, subscriptions, invoices and revenue
- Usage and AI consumption
- Feature flags
- Support queue and incidents
- Global audit logs
- API clients and integrations
- Trust, security and compliance

## Role journeys

| Role | Starts with | Core journey | Success signal |
|---|---|---|---|
| Super Admin | Platform health | Detect incident → identify tenant impact → communicate → resolve → audit | Stable service and traceable intervention |
| Firm Owner | Revenue and risk | Inspect KPI change → drill into client/team driver → assign action → monitor margin | Growth without service degradation |
| Accounting Manager | Workload and deadlines | Review exceptions → rebalance work → approve high-risk output → unblock client issue | No preventable missed deadlines |
| Senior Accountant | Priority queue | Continue next task → open company context → review evidence → approve/post → advance workflow | Quality work completed with minimal navigation |
| Junior Accountant | Guided task queue | Open assigned step → follow checklist → classify/post → request review → learn from correction | High first-pass acceptance |
| Payroll Specialist | Payroll calendar | Start run → validate variables → calculate → resolve exceptions → approve → file → publish | Accurate payroll completed on schedule |
| Tax Consultant | Compliance cockpit | Review exposure → prepare declaration → validate source → approve → submit → archive receipt | Complete, evidenced filings with no penalties |
| Receptionist | Front-desk agenda | Identify caller/visitor → log interaction → collect/deliver document → create follow-up | Every contact routed and visible |
| Legal Consultant | Legal matters | Open formation/compliance case → request evidence → prepare/sign documents → submit → update register | Matters completed with valid documentation |
| Accountant Assistant | Intake queue | Scan/upload → verify OCR → classify → link company/period → quality check → hand off | Clean, complete inputs ready for production |
| Client | Request inbox | See required action → upload/approve/sign/pay/book/chat → receive confirmation | Required action completed in minutes |

## Dashboard specifications

Every dashboard shares global search, company switcher, command palette, notifications, quick-create, help and profile. Cards support loading skeleton, error retry, permission-aware empty states and drill-down drawers.

| Dashboard | Primary widgets | Default quick actions |
|---|---|---|
| Super Admin | ARR/MRR, active firms, churn risk, platform health, incidents, support SLA, usage | Add firm, feature flag, incident update |
| Firm Owner | Revenue, margin, client profitability, pipeline, cash collection, capacity, deadline score | New client, review forecast, open profitability |
| Accounting Manager | Team workload, at-risk deadlines, review queue, blocked work, payroll/tax readiness | Reassign, bulk remind, approve |
| Senior Accountant | Today queue, assigned companies, filings, reconciliation, approvals, client requests | Task, journal entry, upload, client request |
| Junior Accountant | Guided tasks, documents to classify, missing inputs, corrections, learning notes | Scan, classify, ask reviewer |
| Payroll Specialist | Active runs, controls, employee changes, CNAS/CASNOS deadlines, approvals | Start run, import variables, issue payslips |
| Tax Consultant | Filing calendar, draft declarations, risk alerts, submissions, penalties | Prepare filing, validate, submit |
| Receptionist | Today agenda, calls, visitors, deliveries, new requests, unassigned contacts | Log call, visitor, meeting, document |
| Legal Consultant | Open matters, formation stages, expiring licenses, signatures, filings | New matter, generate document, send for signature |
| Assistant | Intake volume, OCR confidence, exception queue, SLA, quality score | Scan, upload batch, classify |
| Client | Required actions, recent reports, uploads, approvals, meetings, accountant chat | Upload, approve, book, message |

## Screen contract

Every operational list/detail screen implements this contract:

- Purpose and primary role appear in the page title, scope and saved view.
- Summary cards answer volume, value, quality and risk.
- The main table supports search, sortable columns, multi-filter, saved views, column configuration and bulk actions.
- Row click opens a right drawer; explicit primary action opens the full workspace.
- Context actions include assign, request, approve, comment, export, automate and view audit history.
- Empty states explain value and offer one primary creation/import action.
- Loading states preserve page geometry; long processes show background progress and remain navigable.
- Errors keep entered data, identify the failing step and offer retry.
- Responsive behavior changes tables into priority summaries; it never compresses essential actions below touch size.
- Keyboard: `⌘/Ctrl+K` search, `C` create, `G then …` navigate, `/` focus list search, `E` edit, `A` assign, `R` review, `⌘/Ctrl+Enter` confirm, `Esc` close.

### Key screen composition

| Screen | Cards / charts | Table / workspace | Right drawer |
|---|---|---|---|
| Work | open, due, blocked, on-time; workload heatmap | task, company, workflow, owner, due, SLA, status | checklist, dependencies, time, comments, audit |
| Companies | active, current books, risk, missing input; portfolio trend | identity, period, progress, status, documents, owner | health, period stages, contacts, activity |
| Documents | received, processed, confidence, exceptions; intake trend | preview, type, company, period, AI confidence, state | viewer, OCR text, extracted fields, versions, approval |
| Accounting cockpit | entries, reconciliation, exceptions, close readiness | company/period production stages | balances, exceptions, reviewer and activity |
| General ledger | debit, credit, net movement; account trend | account/date/reference/description/debit/credit/balance | source document, journal metadata, audit |
| Bank reconciliation | book/bank balance, difference, match rate | bank line ↔ candidate entries split view | matching rationale, document and actions |
| Payroll cockpit | employees, run completion, net payroll, declarations | company/run/control/approval/filing | run checklist, variances, approvals |
| Employee | gross/net, leave balance, tenure | contract, attendance, variables, payslips | contact, bank, social IDs, history |
| Tax cockpit | upcoming, awaiting approval, risk, submitted; filing curve | declaration/company/period/value/deadline/status | source values, validation, sign-off, receipt |
| CRM | open requests, follow-ups, response time, CSAT | contact/company/last touch/request/owner/next step | unified communication timeline |
| Calendar | today, deadlines, conflicts, unscheduled work | day/week/month/timeline | event, company, reminders, attendees |
| Reports | revenue, margin, utilization, compliance | report catalog / builder | filters, recipients, schedule, export history |

## Modals and drawers

Modal inventory: create task; recurring workflow; add/import company; create engagement; upload/batch upload; OCR low-confidence resolution; journal entry; recurring entry; fiscal close; create payroll run; payroll variance approval; create declaration; submission confirmation; add contact; log call/email/WhatsApp; meeting booking; client request; approval/rejection with reason; e-signature request; invite employee; role assignment; bulk assign; bulk reminder; report scheduling; export; automation rule; integration connection; destructive confirmation; session timeout; support access consent.

Modal rules:

- Use a modal for a bounded decision; a drawer for contextual inspection; a full page for multi-step production.
- Destructive actions state object, impact, reversibility and required authorization.
- Approvals display evidence, validation checks, variance from prior period and signature identity.
- Long imports use a staged wizard: map → validate → preview errors → commit → result.

## Component library

- Buttons: primary orange, secondary white, ghost, danger, icon, split and command.
- Financial card: label, value, comparison, scope, confidence and drill-down.
- Company card: legal identity, engagement health, period, owner, next deadline and input completeness.
- Client/contact card: identity, channels, response SLA, open requests and consent.
- Accounting timeline: stages, owner, evidence count, status, SLA and blocking dependency.
- Document viewer: original, OCR overlay, extracted values, linked entry, versions and approval.
- OCR preview: field confidence, keyboard corrections, model/source and learn-from-correction consent.
- Charts: restrained orange highlight, neutral comparison, semantic red/amber/green only for state.
- Kanban: WIP limits, SLA age, dependency and bulk move.
- Calendar: deadline type, company, owner, readiness and conflict indicators.
- Notification: reason, object, urgency, next action and mute/rule controls.
- Command palette: global object search, navigation, creation and recent commands.
- Approval drawer: evidence, checks, diff, discussion, approve/reject/escalate.
- Data table: saved views, filters, bulk action, column manager, sticky first column and density modes.
- Activity timeline: immutable system event, human interaction, client action and automation.

## Design tokens

| Token | Value | Use |
|---|---|---|
| `color.accent` | `#FF6B00` | Primary actions and selected state |
| `color.accentSoft` | `#FFF2E9` | Accent surfaces |
| `color.ink` | `#17191C` | Primary text |
| `color.canvas` | `#F4F3F0` | Matte workspace |
| `color.card` | `#FFFFFF` | Panels |
| `color.line` | `#E9E8E5` | Dividers |
| `color.muted` | `#6D727B` | Secondary text |
| `color.success` | `#23865C` | Complete / compliant |
| `color.warning` | `#C7780B` | Attention |
| `color.danger` | `#D84C3D` | Risk / overdue |
| `radius.control` | `8–10px` | Inputs and buttons |
| `radius.card` | `12–16px` | Panels |
| `shadow.card` | two-layer 1px/20px | Floating white panels |
| `space.unit` | `4px` | All spacing |
| `type.display` | Geist/Arial 700 | Marketing and page titles |
| `type.body` | Geist/Arial 400–650 | Product text |
| `motion.fast` | `160–200ms` | Hover and disclosure |
| `motion.panel` | `240–280ms` | Drawers and command palette |

Density: marketing uses 8px multiples and generous rhythm; the workspace uses 4px multiples with comfortable default and compact table modes. WCAG AA contrast, visible focus rings and reduced-motion support are mandatory.

## Database entities

### Tenancy and identity

`Firm`, `FirmLocation`, `Department`, `User`, `FirmMembership`, `Role`, `Permission`, `RolePermission`, `Team`, `TeamMember`, `Invitation`, `Session`, `MfaMethod`, `ApiClient`, `FeatureFlag`, `Subscription`, `Plan`, `FirmInvoice`.

### CRM and company

`ClientAccount`, `Contact`, `ContactChannel`, `Company`, `CompanyOwner`, `CompanyContact`, `CompanyEmployee`, `CompanyBankAccount`, `CompanyTaxProfile`, `CompanyAccountingProfile`, `CompanyPayrollProfile`, `FiscalYear`, `Engagement`, `Contract`, `ServiceCatalogItem`, `EngagementService`, `CustomFieldDefinition`, `CustomFieldValue`, `Note`, `Tag`.

### Work and compliance

`WorkflowTemplate`, `WorkflowStageTemplate`, `WorkflowInstance`, `WorkItem`, `TaskChecklistItem`, `TaskDependency`, `Assignment`, `TimeEntry`, `SlaPolicy`, `Obligation`, `Deadline`, `ReminderRule`, `ApprovalRequest`, `ApprovalDecision`, `ElectronicSignature`, `Submission`, `SubmissionReceipt`.

### Documents

`Document`, `DocumentVersion`, `DocumentPage`, `DocumentClassification`, `OcrRun`, `ExtractedField`, `DocumentLink`, `DocumentRequest`, `UploadBatch`, `ArchiveRetentionPolicy`.

### Accounting

`ChartOfAccounts`, `Account`, `Journal`, `JournalEntry`, `JournalLine`, `RecurringEntry`, `AccountingPeriod`, `TrialBalanceSnapshot`, `BankStatement`, `BankTransaction`, `Reconciliation`, `ReconciliationMatch`, `ClosingRun`, `FinancialStatement`, `FinancialStatementLine`.

### Payroll and tax

`EmploymentContract`, `AttendanceRecord`, `LeaveRequest`, `PayrollVariable`, `PayrollRun`, `PayrollRunEmployee`, `PayrollLine`, `Payslip`, `SocialDeclaration`, `TaxType`, `TaxRegistration`, `TaxDeclaration`, `TaxDeclarationLine`, `TaxRisk`, `Penalty`.

### Collaboration, reporting and platform

`Interaction`, `Conversation`, `Message`, `Meeting`, `CalendarEvent`, `Notification`, `NotificationPreference`, `ReportDefinition`, `ReportRun`, `DashboardView`, `SavedFilter`, `AutomationRule`, `AutomationRun`, `IntegrationConnection`, `Webhook`, `AiSuggestion`, `AiFeedback`, `AuditEvent`, `SupportTicket`, `Incident`.

Entity rules: all business rows carry `firm_id`; company-scoped rows carry `company_id`; mutable financial/compliance records use versioning; audit events are append-only; money stores integer minor units plus currency; date-sensitive rules store jurisdiction and effective range; soft deletion is policy-bound and not permitted for posted financial or submitted compliance records.

## Permissions matrix

Legend: **M** manage/configure, **A** approve/submit, **E** create/edit, **V** view, **O** own/assigned only, **P** portal-limited, `—` none.

| Capability | SA | Owner | Manager | Senior | Junior | Payroll | Tax | Reception | Legal | Assistant | Client |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Platform firms/subscriptions | M | — | — | — | — | — | — | — | — | — | — |
| Firm settings/billing | — | M | V | — | — | — | — | — | — | — | — |
| Users/roles/teams | — | M | M | V | — | — | — | — | — | — | — |
| Portfolio and company profile | Support | M | M | E | O | V | V | E | E | O | P |
| Engagements/contracts/pricing | — | M | E | V | — | — | — | V | E | — | P |
| Work templates/automation | — | M | M | E | O | E | E | O | E | O | — |
| Tasks and workload | Support | M | M | E | O | O | O | O | O | O | P |
| Document intake/classification | Support | M | M | A | E | E | E | E | E | E | P |
| Document approval/archive | Support | M | A | A | O | O | O | — | O | O | P |
| Journals and entries | Support | V | A | E | O | — | V | — | — | O | P |
| Reconciliation/closing | Support | V | A | A | O | — | V | — | — | O | P |
| Financial statements | Support | V | A | E | V | — | V | — | — | — | P |
| Payroll employees/contracts | Support | V | A | V | — | M | V | — | V | O | P |
| Payroll run/payslips | Support | V | A | V | — | A | V | — | — | O | P |
| CNAS/CASNOS submission | Support | V | A | — | — | A | V | — | — | — | P |
| Tax declarations | Support | V | A | E | O | V | A | — | — | O | P |
| Tax submission/risk | Support | V | A | V | — | V | A | — | — | — | P |
| CRM interactions | Support | M | M | E | O | O | O | E | E | O | P |
| Calendar/meetings | Support | M | M | E | O | O | O | E | E | O | P |
| Reports/profitability | Support | M | M | V | — | O | O | — | — | — | P |
| Audit logs | V | M | V | O | — | O | O | — | O | — | — |
| API/integrations | M | M | V | — | — | — | — | — | — | — | — |

Permission enforcement is server-side, object-scoped and additive only through explicit role grants. Support access requires firm-owner consent, has a time limit and is fully audited. Submit, close, publish payslips, change bank data, export PII and destructive actions require step-up authentication or maker-checker separation based on firm policy.

## Responsive experience

### Mobile

Mobile is an action companion, not a compressed desktop. A five-item bottom dock provides Today, Work, Companies, Documents and More. Optimized flows: capture/scan; task completion; client communication; approval/rejection; deadline view; time entry; meeting booking; push notifications. Financial production remains review-oriented, with explicit “continue on desktop” for high-density work. Tables become summary cards with a stable primary action. Drawers become full-screen sheets.

### Tablet

Tablet supports field/client meetings and review work. It uses collapsible navigation, two-column dashboards, master-detail lists, split document/OCR review in landscape, Apple Pencil-friendly annotation targets, keyboard shortcuts with connected keyboards and responsive 44px controls.

## AI and automation guardrails

- AI suggests; authorized humans approve posted entries, payroll publication and government filings.
- Every suggestion shows source evidence, confidence, model time and material changes.
- Low-confidence classification routes to review; correction feedback is tenant-isolated.
- Tax-risk explanations cite the rule, period, input and estimated impact.
- Sensitive data is purpose-limited, encrypted and never reused across firms.
- Automation has simulation, scope, trigger, conditions, actions, rate limits, failure handling and an immutable run log.

## Roadmap

### Phase 1 — Operational spine

Firm setup, identity/RBAC, companies, engagements, work, deadlines, document intake/OCR, CRM timeline, notifications, core dashboards, portal upload/request and audit.

### Phase 2 — Production depth

Accounting journals/ledger/reconciliation/close, payroll run/control/payslips/CNAS, VAT and core tax declarations, approvals, signatures, report catalog and calendar integrations.

### Phase 3 — Intelligence

Document classification, entry suggestions, deadline prediction, client-risk and profitability insights, natural-language search, generated management reports and automation recommendations.

### Phase 4 — Ecosystem

Bank feeds, government submission connectors, Outlook/Google, WhatsApp Business, partner marketplace, public API/webhooks, regional tax packs, white-label client portal and multi-country/multi-currency.

### Phase 5 — Global platform

Cross-office resource planning, benchmark intelligence, acquisition/migration tooling, enterprise data warehouse, advanced governance, partner billing, localized compliance engines and embedded advisor workflows.

## Product success measures

- On-time obligation rate
- Average manual touches per document
- Work item cycle time and blocked time
- First-pass review acceptance
- Client request response/completion time
- Payroll/tax exceptions found before submission
- Companies current by period
- Revenue and contribution margin per engagement
- Employee utilization and sustainable capacity
- Weekly active staff and portal clients
- Automation hours saved with override/error rate

