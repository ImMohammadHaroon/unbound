import JoinNowProvider from "@/components/JoinNowProvider";
import Navbar from "@/components/Navbar";
import Quotes from "@/components/Quotes";
import SectionGradient from "@/components/SectionGradient";
import StickyHeroSection from "@/components/StickyHeroSection";
import StickySectionsInit from "@/components/StickySectionsInit";
import TextBlocks from "@/components/TextBlocks";
import TextBoxes from "@/components/TextBoxes";
import Tools from "@/components/Tools";
import About from "@/components/About";
import Careers from "@/components/Careers";
import ContactCta from "@/components/ContactCta";
import ContactUs from "@/components/ContactUs";
import Creators from "@/components/Creators";
import Footer from "@/components/Footer";
import Security from "@/components/Security";
import Team from "@/components/Team";
import UBverse from "@/components/UBverse";
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
          <UBverse />
          <div className="section-after-sticky">
            <About />
            <Team />
            <ContactCta />
            <ContactUs />
            <Careers />
          </div>
          <StickySectionsInit />
        </main>
        <Footer />
      </div>
    </JoinNowProvider>
  );
}
