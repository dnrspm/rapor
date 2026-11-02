import { GoToTop } from "@/components/GoToTop";
import { Navigation } from "@/components/Navigation";
import { PageHeader } from "@/components/PageHeader";
import { Recommendations } from "@/components/Recommendations";
import { ReflectionHero } from "@/components/ReflectionHero";
import { RootCauseSection } from "@/components/RootCauseSection";
import { TabBar } from "@/components/TabBar";

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader />
        <TabBar />
        <RootCauseSection />
        <ReflectionHero />
        <Recommendations />
      </main>
      <GoToTop />
    </>
  );
}
