import Hero from "../components/home/Hero";
import CollectionsShowcase from "../components/home/CollectionsShowcase";
import CategoryGrid from "../components/home/CategoryGrid";
import CraftStatement from "../components/home/CraftStatement";
import FeaturedProducts from "../components/home/FeaturedProducts";
import GiftingBand from "../components/home/GiftingBand";
import JournalSection from "../components/home/JournalSection";
import PageTransition from "../components/layout/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <CollectionsShowcase />
      <FeaturedProducts />
      <CategoryGrid />
      <CraftStatement />
      <GiftingBand />
      <JournalSection />
    </PageTransition>
  );
}
