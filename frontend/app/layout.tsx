import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TruthChain — AI + Web3 Fake News Defense Network",
  description:
    "Fight AI-generated misinformation, deepfakes, and fake news with TruthChain. Powered by Sarvam AI and Base Blockchain.",
  keywords: ["deepfake detection", "fake news", "AI verification", "blockchain", "truth", "misinformation"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="bg-grid" />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
