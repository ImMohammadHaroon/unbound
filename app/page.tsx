import JoinNowProvider from "@/components/JoinNowProvider";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <JoinNowProvider>
      <Navbar />
      <main />
    </JoinNowProvider>
  );
}