import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "Norvex Pay",
  description: "Secure payments for growing businesses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[#F9FAFB] text-[#1E293B] antialiased">
        {children}
      </body>
    </html>
  );
}