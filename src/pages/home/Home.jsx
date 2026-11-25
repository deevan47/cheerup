// HOME PAGE: sections stack top to bottom in this order.
//
// The request slip used to sit at position 2, before the visitor had seen a single
// gift, and the "not in our catalogue?" line appeared four times on the page. The
// offer now lives in one place, under the gift grid (see Categories.jsx), plus the
// strip above the header on tablet and desktop.
import './Home.css';
import Hero from './Hero';
import Showcase from './Showcase';
import LuckyOne from './LuckyOne';
import Promises from './Promises';
import Categories from './Categories';
import Process from './Process';
import FounderTeaser from './FounderTeaser';
import FinalCta from './FinalCta';

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <LuckyOne />
      <Promises />
      <Categories />
      <Process />
      <FounderTeaser />
      <FinalCta />
    </>
  );
}
