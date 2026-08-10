import JoinNowProvider from "@/components/JoinNowProvider";
import Navbar from "@/components/Navbar";
import StickyHeroSection from "@/components/StickyHeroSection";
import TextBlocks from "@/components/TextBlocks";
import TextBoxes from "@/components/TextBoxes";
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
          </StickyHeroSection>
        </main>
      </div>
    </JoinNowProvider>
  );
}
