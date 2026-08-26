import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Sidebar } from "./sidebar";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-[#fdf8f5]">
      <Sidebar />
      {/* Desktop: offset for sidebar. Mobile: offset for top header */}
      <div className="pt-[108px] lg:pt-0 lg:pl-64">
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
