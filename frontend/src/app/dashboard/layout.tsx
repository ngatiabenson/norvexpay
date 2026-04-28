export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Dashboard has its own sidebar nav — no global Navbar/Footer
  return <>{children}</>;
}