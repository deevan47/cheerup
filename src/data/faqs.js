// FAQ page. `link` + `linkLabel` are optional (a link shown under the answer).
// `open: true` renders that answer already expanded.
//
// Payment is first and open on purpose: it is the thing people most want to know
// and the one answer that used to need a click to find.
export const FAQS = [
  { q: 'How does payment work?', a: '70% after you approve the design, 30% when it’s delivered. No online checkout, just a simple chat on WhatsApp.', open: true },
  { q: 'Can I send my own photo or idea?', a: 'Yes. That’s how most gifts begin. Send it on WhatsApp and I’ll turn it into a free preview.' },
  { q: 'How fast will it reach them?', a: 'Within 24 hours of you approving the design. Pune only, for now.', link: '/delivery', linkLabel: 'Delivery' },
  { q: 'What if I don’t know what to gift?', a: 'Perfect. Tell me who it’s for, the occasion, and three things they love. I’ll find the gift that says it for you.' },
  { q: 'What happens to my photos?', a: 'They’re used for your gift and nothing else. Once it’s delivered, they’re deleted from my phone, my files and our chat.', link: '/privacy', linkLabel: 'Privacy' },
  { q: 'Can I cancel?', a: 'Yes, until printing starts, with a full refund. After that, no, because it’s made just for them.', link: '/refunds', linkLabel: 'Cancellation & refunds' },
];
