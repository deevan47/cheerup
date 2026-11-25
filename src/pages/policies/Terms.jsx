import PolicyLayout from './PolicyLayout';
import { SITE } from '../../data/site';

export default function Terms() {
  return (
    <PolicyLayout current="terms" title="Terms of service">
      {SITE.legalName
        ? <p>Cheer Up is run by {SITE.legalName}, a single founder in {SITE.city}. All orders are placed and confirmed over WhatsApp.</p>
        : <p>Cheer Up is run by a single founder in {SITE.city}. All orders are placed and confirmed over WhatsApp.</p>}
      <p>Production begins only after you approve a free design preview and pay 70% of the order value in advance. The remaining 30% is due on delivery.</p>
      <p>Payment is made over WhatsApp, and only after you approve your design. I will never ask for your card details, PIN or OTP.</p>
      <p>Prices and delivery times may change without notice.</p>
      <p>I reserve the right to decline an order I can’t fulfil to my quality standard.</p>
      {SITE.jurisdiction && <p>Any dispute is subject to the courts of {SITE.jurisdiction}.</p>}
      {/* OWNER TO SUPPLY: legalName and jurisdiction in src/data/site.js, then
          have a lawyer check the wording. Each line above appears once it is set.
          (This note used to be shown to customers on the page.) */}
    </PolicyLayout>
  );
}
