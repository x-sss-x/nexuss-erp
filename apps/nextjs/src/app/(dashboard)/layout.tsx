import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { auth, getSession } from "~/auth/server";
import HomePage from "../_components/home.page";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCtx = await getSession();
  const headers = await nextHeaders();
  const organizatoinList = await auth.api.listOrganizations({ headers });

  /** No session show the home/landing page */
  if (!authCtx) return <HomePage />;

  /** User's onboarding process not complete, then make a redirect to onboarding process */
  if (organizatoinList.length == 0) redirect("/onboarding");

  return <>{children}</>;
}
