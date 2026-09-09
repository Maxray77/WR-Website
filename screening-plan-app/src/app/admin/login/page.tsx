import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { isAdmin, isAdminConfigured } from "@/lib/auth";
import { Alert } from "@/components/ui";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = isAdminConfigured();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12 sm:px-6">
      <div className="w-full">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-charcoal text-white">
            <Lock className="h-5 w-5" aria-hidden />
          </span>
          <h1 className="font-display text-2xl font-bold text-charcoal">
            Screening admin
          </h1>
          <p className="mt-1.5 text-sm text-slate">
            Manage screenings, attendees and the waiting list.
          </p>
        </div>

        <div className="card px-6 py-7 sm:px-8">
          {configured ? (
            <LoginForm />
          ) : (
            <Alert tone="warn" title="Admin access is not configured">
              Set <code className="font-mono">ADMIN_PASSWORD</code> and{" "}
              <code className="font-mono">AUTH_SECRET</code> in your environment, then
              reload this page.
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
