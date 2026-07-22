// ─────────────────────────────────────────────────────────────────────────
// Order-a-service catalogue
// ─────────────────────────────────────────────────────────────────────────
// One service = one form = one fixed price. Each entry below becomes:
//   • a card on /order  (the catalogue index)
//   • a form page at /order/<slug>  (fields + PayFast "pay now")
//
// TO ADD A SERVICE: add an object to SERVICES. No new page needed — the
// dynamic route src/pages/order/[slug].astro renders it and the card shows up.
//
// ⚠️ PRICES BELOW ARE PLACEHOLDERS — replace `price` with the firm's real
//    once-off fee for each service before this goes live.
// ─────────────────────────────────────────────────────────────────────────

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'note' // informational callout text, not an input
  | 'repeater'; // "how many?" + N repeated sub-field blocks (directors, members…)

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // for select / radio
  help?: string;
  wide?: boolean; // span both columns on desktop
  default?: string; // pre-selected value for a select

  // Show this field only when another field's value matches. Use `equals` for a
  // single value, or `oneOf` for several (e.g. show on "No" or "Not sure").
  showWhen?: { field: string; equals?: string; oneOf?: string[] };

  // repeater-only ------------------------------------------------------------
  countLabel?: string; // label on the "how many?" dropdown
  itemLabel?: string; // heading per block, e.g. "Director"
  min?: number; // fewest blocks (default 1)
  max?: number; // most blocks (default 4)
  defaultCount?: number; // blocks shown initially (default = min)
  subFields?: Field[]; // fields repeated inside each block
}

export interface OrderService {
  slug: string;
  title: string;
  category: string;
  summary: string;
  price?: number; // ZAR, once-off. Omit when orderOnly (price on assessment).
  priceNote?: string; // small caveat shown next to the price (e.g. exclusions)
  turnaround?: string; // e.g. "3–5 business days"
  info?: string; // optional longer description, shown as a collapsible panel
  hidden?: boolean; // true = not shown on /order and no page generated (kept for later)
  orderOnly?: boolean; // true = no price / no PayFast; request-only (we assess & quote first)
  fields: Field[];
}

// Standard contact block prepended to EVERY service form (kept out of each
// service definition to stay DRY).
export const CONTACT_FIELDS: Field[] = [
  { name: 'name', label: 'Your name', type: 'text', required: true, placeholder: 'Jane Smith' },
  { name: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '082 000 0000' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const SERVICES: OrderService[] = [
  {
    slug: 'company-registration',
    title: 'Company registration (Pty) Ltd',
    category: 'CIPC / Company secretarial',
    summary: 'Register a new private company with CIPC — name reservation, MOI and registration certificate.',
    price: 990,
    turnaround: '3–5 business days',
    info: 'Your company registration is typically completed within 5 working days. As part of the service we also prepare and issue your share certificates and set up the securities register — documents CIPC does not provide on registration. You receive a complete, ready-to-use company pack, not just the bare registration certificate.',
    fields: [
      { name: 'proposed_name_1', label: 'Proposed name — first choice', type: 'text', required: true, wide: true, placeholder: 'Acme (Pty) Ltd' },
      { name: 'proposed_name_2', label: 'Proposed name — second choice', type: 'text', wide: true, placeholder: 'Alternative name' },
      { name: 'proposed_name_3', label: 'Proposed name — third choice', type: 'text', wide: true, placeholder: 'Alternative name' },
      { name: 'proposed_name_4', label: 'Proposed name — fourth choice', type: 'text', wide: true, placeholder: 'Alternative name' },
      { name: 'financial_year_end', label: 'Financial year-end', type: 'select', required: true, options: MONTHS, default: 'February' },
      { name: 'main_activity', label: 'Main business activity', type: 'text', wide: true, placeholder: 'e.g. IT consulting' },
      {
        name: 'director',
        label: 'Directors',
        type: 'repeater',
        countLabel: 'How many directors?',
        itemLabel: 'Director',
        min: 1,
        max: 5,
        defaultCount: 1,
        subFields: [
          { name: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Jane Smith' },
          { name: 'id_number', label: 'ID / passport number', type: 'text', required: true, placeholder: '8001015009087' },
          { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
        ],
      },
      { name: 'registered_address', label: 'Registered address', type: 'textarea', required: true, wide: true, placeholder: 'Street, suburb, city, postal code' },
    ],
  },
  {
    slug: 'company-deregistration',
    title: 'Company deregistration',
    category: 'CIPC / Company secretarial',
    summary: 'Fully deregister a company or close corporation with CIPC and SARS.',
    price: 3500,
    priceNote: 'Excludes bringing outstanding SARS/CIPC returns up to date and any filing fees — quoted separately on request.',
    turnaround: 'Typically 4–6 months (often longer)',
    info: 'Full deregistration is a lengthy, multi-step process — typically 4 to 6 months, and often longer. The company must first be fully up to date with SARS, then deregistered at CIPC (which in turn requires all outstanding CIPC returns to be filed), after which the case goes back to SARS to finalise. This R3 500 fee covers managing the deregistration process itself. It does NOT include bringing any outstanding SARS or CIPC returns up to date or any filing fees — we review your profile after you submit this form and quote separately for that work on request.',
    fields: [
      { name: 'entity_name', label: 'Entity name', type: 'text', required: true, placeholder: 'Acme (Pty) Ltd' },
      { name: 'entity_type', label: 'Entity type', type: 'select', required: true, options: ['Company (Pty) Ltd', 'Close corporation (CC)', 'Non-profit (NPC)', 'Other'] },
      { name: 'registration_number', label: 'Registration number', type: 'text', required: true, placeholder: 'CIPC registration number' },
      { name: 'income_tax_number', label: 'Income tax number', type: 'text' },
      { name: 'vat_number', label: 'VAT number (if registered)', type: 'text', placeholder: '4xxxxxxxxx' },
      { name: 'reason', label: 'Reason for deregistration', type: 'select', wide: true, options: ['No longer trading / dormant', 'Business ceased', 'Voluntary deregistration', 'Other'] },
      { name: 'deregistration_date', label: 'Requested date of deregistration', type: 'date' },
      { name: 'returns_up_to_date', label: 'Are all SARS & CIPC returns up to date?', type: 'radio', required: true, options: ['Yes', 'No', 'Not sure'] },
      {
        name: 'returns_quote_note',
        label: '',
        type: 'note',
        wide: true,
        help: 'No problem — we’ll review your profile and send a separate quote to bring your SARS and CIPC returns up to date before starting the deregistration.',
        showWhen: { field: 'returns_up_to_date', oneOf: ['No', 'Not sure'] },
      },
      { name: 'notes', label: 'Additional notes', type: 'textarea', wide: true, placeholder: 'Anything we should know about the company’s history or outstanding returns?' },
    ],
  },
  {
    slug: 'vat-registration',
    hidden: true,
    title: 'VAT registration',
    category: 'Tax & SARS',
    summary: 'Register your business for VAT with SARS, compulsory or voluntary.',
    price: 1500, // TODO confirm
    turnaround: '5–10 business days',
    fields: [
      { name: 'entity_name', label: 'Entity name', type: 'text', required: true, placeholder: 'Acme (Pty) Ltd' },
      { name: 'registration_number', label: 'Registration number', type: 'text', required: true, placeholder: 'CIPC / entity reg number' },
      { name: 'income_tax_number', label: 'Income tax number', type: 'text' },
      { name: 'vat_basis', label: 'Basis of registration', type: 'radio', required: true, options: ['Compulsory (turnover > R1m)', 'Voluntary'] },
      { name: 'estimated_turnover', label: 'Turnover (last 12 months / expected)', type: 'text', placeholder: 'e.g. R1.4 million' },
      { name: 'business_activity', label: 'Main business activity', type: 'text', wide: true },
    ],
  },
  {
    slug: 'vat-deregistration',
    title: 'VAT deregistration',
    category: 'Tax & SARS',
    summary: 'Cancel an existing VAT registration with SARS.',
    price: 2875,
    turnaround: 'Minimum 21 working days (often longer)',
    info: 'VAT deregistration is a document-heavy SARS process. SARS requires extensive supporting documentation and the case almost always needs repeated follow-up before it is finalised. The minimum turnaround is 21 working days, but in practice it frequently takes considerably longer. We handle the paperwork and keep following up with SARS on your behalf until the deregistration is confirmed.',
    fields: [
      { name: 'entity_name', label: 'Entity name', type: 'text', required: true, placeholder: 'Acme (Pty) Ltd' },
      { name: 'vat_number', label: 'VAT number', type: 'text', required: true, placeholder: '4xxxxxxxxx' },
      {
        name: 'reason',
        label: 'Reason for deregistration',
        type: 'select',
        wide: true,
        options: ['Turnover less than R2.3 million over a 12-month period', 'Business closure'],
      },
      { name: 'closure_date', label: 'Date of business closure', type: 'date', showWhen: { field: 'reason', equals: 'Business closure' } },
    ],
  },
  {
    slug: 'sars-rep-linking',
    title: 'Link Registered Representative with SARS',
    category: 'Tax & SARS',
    summary: 'Register or update the Registered Representative (public officer) on a taxpayer’s SARS profile.',
    price: 990,
    turnaround: 'Minimum 21 working days (often longer)',
    info: 'SARS requires the Registered Representative to be formally linked before we can act on your profile. This is done via the RAV01 on eFiling and SARS always requires supporting documents — a certified ID, proof of address, and proof of appointment (and a letter of authority for trusts) — plus their own verification, which takes time and repeated follow-up. The minimum turnaround is 21 working days, but in practice it frequently takes considerably longer. We manage the submission and follow up with SARS until the representative is successfully linked. We’ll request the supporting documents from you by email once you’ve submitted this form.',
    fields: [
      { name: 'entity_name', label: 'Taxpayer / entity name', type: 'text', required: true, placeholder: 'Acme (Pty) Ltd' },
      { name: 'entity_type', label: 'Entity type', type: 'select', required: true, options: ['Company (Pty) Ltd', 'Close corporation (CC)', 'Trust', 'Sole proprietor', 'Non-profit (NPC)', 'Partnership', 'Individual'] },
      { name: 'registration_number', label: 'Registration number', type: 'text', placeholder: 'CIPC / entity reg number' },
      { name: 'income_tax_number', label: 'Income tax number', type: 'text', required: true },
      { name: 'rep_name', label: 'Registered Representative — full name', type: 'text', required: true, wide: true, placeholder: 'Jane Smith' },
      { name: 'rep_id', label: 'Representative ID / passport number', type: 'text', required: true, placeholder: '8001015009087' },
      { name: 'rep_capacity', label: 'Capacity', type: 'select', required: true, options: ['Public Officer', 'Director', 'Member', 'Trustee', 'Partner', 'Accounting Officer', 'Individual (self)', 'Other'] },
      { name: 'rep_email', label: 'Representative email', type: 'email', required: true, placeholder: 'you@example.com' },
      { name: 'rep_cell', label: 'Representative cell number', type: 'tel', required: true, placeholder: '082 000 0000' },
    ],
  },
  {
    slug: 'coida-registration',
    title: 'COIDA registration',
    category: 'Payroll & Labour',
    summary: 'Register as an employer with the Compensation Fund (Workmen’s Compensation).',
    orderOnly: true,
    turnaround: 'Confirmed once we’ve assessed your request',
    info: 'COIDA (Workmen’s Compensation) registration is handled case by case. Before we take it on we first confirm whether we’re able to assist with your particular industry and circumstances — so this is a request, not an instant purchase, and no payment is taken now. Once we’ve reviewed your details we’ll confirm whether we can help and send you a quote.',
    fields: [
      { name: 'entity_name', label: 'Employer / entity name', type: 'text', required: true, placeholder: 'Acme (Pty) Ltd' },
      { name: 'entity_type', label: 'Entity type', type: 'select', required: true, options: ['Company (Pty) Ltd', 'Close corporation (CC)', 'Sole proprietor', 'Trust', 'Non-profit (NPC)', 'Partnership', 'Other'] },
      { name: 'registration_number', label: 'Registration number', type: 'text', placeholder: 'CIPC / entity reg number' },
      { name: 'income_tax_number', label: 'Income tax number', type: 'text', required: true },
      { name: 'nature_of_business', label: 'Nature of business', type: 'text', required: true, wide: true, placeholder: 'e.g. Building construction, retail, IT services', help: 'Please give as much detail as possible — the nature of your business determines the assessment class and tariff (rate) applied to your COIDA assessment.' },
      { name: 'number_of_employees', label: 'Number of employees', type: 'number', required: true, placeholder: 'e.g. 8' },
      { name: 'first_employee_date', label: 'Date first employee started working', type: 'date', required: true },
      { name: 'estimated_annual_earnings', label: 'Estimated total annual employee earnings', type: 'text', required: true, placeholder: 'e.g. R1.2 million' },
      {
        name: 'director',
        label: 'Directors',
        type: 'repeater',
        countLabel: 'How many directors?',
        itemLabel: 'Director',
        min: 1,
        max: 5,
        defaultCount: 1,
        subFields: [
          { name: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Jane Smith' },
          { name: 'id_number', label: 'ID number', type: 'text', required: true, placeholder: '8001015009087' },
        ],
      },
      { name: 'notes', label: 'Additional notes', type: 'textarea', wide: true, placeholder: 'Anything we should know?' },
    ],
  },
  {
    slug: 'bee-affidavit',
    hidden: true,
    title: 'B-BBEE affidavit (EME / QSE)',
    category: 'CIPC / Company secretarial',
    summary: 'Sworn B-BBEE affidavit for an Exempt Micro or Qualifying Small Enterprise.',
    price: 450, // TODO confirm
    turnaround: '1–2 business days',
    fields: [
      { name: 'entity_name', label: 'Entity name', type: 'text', required: true, placeholder: 'Acme (Pty) Ltd' },
      { name: 'registration_number', label: 'Registration number', type: 'text', required: true },
      { name: 'annual_turnover_band', label: 'Annual turnover', type: 'radio', required: true, options: ['R0 – R10m (EME)', 'R10m – R50m (QSE)'] },
      { name: 'black_ownership_pct', label: 'Black ownership %', type: 'number', required: true, placeholder: 'e.g. 100' },
      { name: 'black_woman_ownership_pct', label: 'Black woman ownership %', type: 'number', placeholder: 'e.g. 50' },
      { name: 'financial_year_end', label: 'Financial year-end', type: 'text', placeholder: 'e.g. February' },
    ],
  },
  {
    slug: 'share-certificate',
    hidden: true,
    title: 'Share certificate',
    category: 'CIPC / Company secretarial',
    summary: 'Issue a share certificate and update the securities register.',
    price: 350, // TODO confirm
    turnaround: '1–2 business days',
    fields: [
      { name: 'company_name', label: 'Company name', type: 'text', required: true },
      { name: 'registration_number', label: 'Registration number', type: 'text', required: true },
      { name: 'shareholder_name', label: 'Shareholder name', type: 'text', required: true },
      { name: 'number_of_shares', label: 'Number of shares', type: 'number', required: true },
      { name: 'share_class', label: 'Share class', type: 'text', placeholder: 'e.g. Ordinary' },
      { name: 'issue_date', label: 'Issue date', type: 'date' },
    ],
  },
  {
    slug: 'tax-clearance',
    hidden: true,
    title: 'Tax clearance / good standing',
    category: 'Tax & SARS',
    summary: 'Obtain a SARS Tax Compliance Status (TCS) PIN — good standing, tender or foreign investment.',
    price: 450, // TODO confirm
    turnaround: '2–4 business days',
    fields: [
      { name: 'entity_name', label: 'Entity / taxpayer name', type: 'text', required: true },
      { name: 'tax_number', label: 'Income tax number', type: 'text', required: true },
      { name: 'purpose', label: 'Purpose', type: 'select', required: true, options: ['Good standing', 'Tender', 'Foreign investment allowance', 'Emigration'] },
      { name: 'notes', label: 'Additional notes', type: 'textarea', wide: true, placeholder: 'Anything we should know?' },
    ],
  },
];

export function getService(slug: string): OrderService | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
