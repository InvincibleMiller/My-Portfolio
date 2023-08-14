import "./globals.css";
import LenisRoot from "@/components/lenis";

import Header from "@/components/Header";

export const metadata = {
  title: "Isaac Miller",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="content-overlay"></div>
        <Header />
        {children}
        {/* <LenisRoot /> */}
      </body>
    </html>
  );
}