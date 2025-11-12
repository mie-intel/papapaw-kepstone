export const metadata = {
  title: "Dashboard",
  description: "Solanum Dashboard",
};

export default function DashboardLayout({ children }) {
  return <div className="flex h-screen w-full bg-[#2B2E4D] lg:pt-12 lg:pl-5">{children}</div>;
}
