import Creators from "@/components/Creators";
import JoinNowProvider from "@/components/JoinNowProvider";
import Navbar from "@/components/Navbar";
import Quotes from "@/components/Quotes";
import SectionGradient from "@/components/SectionGradient";
import Security from "@/components/Security";
import StickyHeroSection from "@/components/StickyHeroSection";
import StickySectionsInit from "@/components/StickySectionsInit";
import TextBlocks from "@/components/TextBlocks";
import TextBoxes from "@/components/TextBoxes";
import Tools from "@/components/Tools";
import Users from "@/components/Users";
import styles from "./page.module.css";

export default function Home() {
  return (
    <JoinNowProvider>
      <div className={styles.siteWrapper}>
        <Navbar homeIntro />
        <main>
          <StickyHeroSection>
            <TextBlocks />
            <TextBoxes />
            <Tools />
            <Quotes />
          </StickyHeroSection>
          <Security />
          <SectionGradient>
            <Users />
            <Creators />
          </SectionGradient>
          <StickySectionsInit />
        </main>
      </div>
    </JoinNowProvider>
  );
}
