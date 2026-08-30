import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "./login-form";

export const metadata = {
  title: "Login | Ayesha Gul Admin",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/super-admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5ede6] px-4">
      {/* Background pattern */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#2c1a0e]/5" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#5c3317]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#a0522d]/5" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl bg-white border border-[#e8d5c4] shadow-2xl shadow-[#2c1a0e]/10 overflow-hidden">
          {/* Top bar */}
          <div className="bg-[#2c1a0e] px-8 py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
              <span className="text-3xl font-bold text-white">A</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Ayesha Gul</h1>
            <p className="mt-1 text-sm text-white/60">Super Admin Panel</p>
          </div>

          {/* Form area */}
          <div className="px-8 py-8">
            <p className="text-sm text-gray-600 mb-6 text-center">
              Sign in to manage your store
            </p>
            <LoginForm />
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[#a0522d]/60">
          &copy; 2025 Ayesha Gul. All rights reserved.
        </p>
      </div>
    </main>
  );
}
