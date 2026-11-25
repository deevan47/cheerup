import PolicyLayout from './PolicyLayout';

// Three paragraphs, in the order things happen. The old version said "no
// cancellation once printing has started" twice, in paragraphs 1 and 3.
export default function Refund() {
  return (
    <PolicyLayout current="refund" title="Cancellation and refunds">
      <p>If you cancel before the design is approved and printing begins, your advance payment is refunded in full.</p>
      <p>Once printing has started, the order can’t be cancelled or refunded, because it’s made for one person and nobody else can use it.</p>
      <p>If your order arrives damaged or different from the approved design, tell me within 24 hours with a photo. I’ll reprint or refund it, because it should arrive perfect.</p>
    </PolicyLayout>
  );
}
