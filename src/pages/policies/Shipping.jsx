import PolicyLayout from './PolicyLayout';
import { SITE } from '../../data/site';

export default function Shipping() {
  return (
    <PolicyLayout current="shipping" title="Delivery">
      {/* One line about Pune. It used to say "I currently deliver only within Pune"
          in paragraph 1 and "I don't offer shipping outside Pune yet" in paragraph 4. */}
      <p>I deliver only within {SITE.city} for now.</p>
      <p>Once your design is approved and the advance is paid, your gift is printed, personally quality-checked and hand-delivered, usually within 24 hours.</p>
      <p>I’ll keep you posted on WhatsApp at every step.</p>
      {SITE.deliveryCharge === 'free' && <p>Delivery within {SITE.city} is free.</p>}
      {SITE.deliveryCharge && SITE.deliveryCharge !== 'free' && <p>Delivery within {SITE.city} costs {SITE.deliveryCharge}.</p>}
      {/* OWNER TO SUPPLY: deliveryCharge in src/data/site.js (a figure, or 'free').
          Until then the page says it is agreed in the chat, which is how it works. */}
      {!SITE.deliveryCharge && <p>Any delivery charge depends on where in {SITE.city} it’s going. You’ll know the exact total in our chat before you pay anything.</p>}
    </PolicyLayout>
  );
}
