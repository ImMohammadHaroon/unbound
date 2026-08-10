import JoinNowProvider from "@/components/JoinNowProvider";
import Navbar from "@/components/Navbar";
import StickyHeroSection from "@/components/StickyHeroSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <JoinNowProvider>
      <div className={styles.siteWrapper}>
        <Navbar homeIntro />
        <main>
          <StickyHeroSection />
        </main>
      </div>
    </JoinNowProvider>
  );
}
