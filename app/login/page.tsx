import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export default async function LoginPage() {
  const cookieStore = await cookies();

  if (cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "authenticated") {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,114,255,0.18),transparent_40%),radial-gradient(circle_at_bottom,rgba(255,135,199,0.15),transparent_35%)]" />
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
