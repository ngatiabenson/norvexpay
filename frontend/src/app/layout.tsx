import "./globals.css";

export const metadata = {
  title: "Norvex Pay — Secure Payments for Growing Businesses",
  description: "Accept local and global payments with bank-grade security. From M-Pesa to international cards—one integration, complete control.",
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