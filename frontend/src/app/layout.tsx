import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "Norvex Pay",
  description: "Norvex Pay merchant portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-norvex-50 text-norvex-900 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

