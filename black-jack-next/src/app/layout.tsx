import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/footer/footer";

export const metadata: Metadata = {
  title: "Blackjack jogo do 21",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="w-full h-full overflow-x-hidden">
      <body className={` w-full h-full min-h-screen flex flex-col`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
