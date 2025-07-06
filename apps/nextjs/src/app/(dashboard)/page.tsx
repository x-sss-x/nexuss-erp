import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth, getSession } from "~/auth/server";
import { Organization } from "../_components/organization";

export default async function Page() {
  const session = await getSession();
  const nextHeaders = await headers();

  if (!session) redirect("/sign-in");

  const organizations = await auth.api.listOrganizations({
    headers: nextHeaders,
  });

  const firstOrganization = organizations.at(0);

  // No organization created redirect to crate organizatoin
  if (firstOrganization) {
    // Set an active organization
    await auth.api.setActiveOrganization({
      headers: nextHeaders,
      body: { organizationId: firstOrganization.id },
    });
    redirect(`/${firstOrganization.slug}`);
  }

  return (
    <div className="flex h-svh items-center justify-center">
      <Organization />
    </div>
  );
}
