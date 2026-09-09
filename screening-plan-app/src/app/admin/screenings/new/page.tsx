import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { AdminShell } from "../../AdminShell";
import { createScreeningAction } from "../../actions";
import { ScreeningForm } from "@/components/ScreeningForm";
import { PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function NewScreeningPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <AdminShell breadcrumb="New screening">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-teal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All screenings
        </Link>

        <div className="mt-6">
          <PageHeader
            eyebrow="Schedule"
            title="New screening"
            description="Save it as a draft while you finalise the venue, then switch it to Published when you're ready to take registrations."
          />
        </div>

        <div className="card mt-8 px-6 py-7 sm:px-8">
          <ScreeningForm
            action={createScreeningAction}
            submitLabel="Create screening"
          />
        </div>
      </div>
    </AdminShell>
  );
}
