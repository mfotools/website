// ─────────────────────────────────────────────────────────────────────────
// Payment + form-handler configuration for the "Order a service" flow.
// ─────────────────────────────────────────────────────────────────────────

// PayFast merchant account (live). Flip SANDBOX to true to test against the
// PayFast sandbox without taking real money.
export const PAYFAST = {
  merchantId: '10647868',
  merchantKey: 'oei6j6zf8u96l',
  // ⚠️ No backend on this static site, so there is no notify_url (ITN) handler
  //    and no server-side signature. A passphrase/signature would have to be
  //    embedded in the page to sign client-side, which defeats its purpose, so
  //    it is intentionally omitted. Amounts are fixed per service; verify every
  //    payment in the PayFast dashboard before acting on it.
};

export const SANDBOX = false;

export const PAYFAST_PROCESS_URL = SANDBOX
  ? 'https://sandbox.payfast.co.za/eng/process'
  : 'https://www.payfast.co.za/eng/process';

// Web3Forms — same access key as the contact page. Submissions are emailed to
// the firm; the "subject" field labels which service was ordered.
export const WEB3FORMS_ACCESS_KEY = '366c88fc-4624-4828-a250-0c32cc32fb90';
export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// Where PayFast returns the customer after a successful / cancelled payment.
export const SITE = 'https://www.myfinance-online.co.za';
export const RETURN_URL = `${SITE}/thank-you`;
export const CANCEL_URL = `${SITE}/order`;
