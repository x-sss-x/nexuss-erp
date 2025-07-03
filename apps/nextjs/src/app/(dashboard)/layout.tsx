import { redirect } from "next/navigation";

import { getSession } from "~/auth/server";
import HomePage from "../_components/home.page";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCtx = await getSession();

  /** No session show the home/landing page */
  if (!authCtx) return <HomePage />;

  /** User's onboarding process not complete, then make a redirect to onboarding process */
  if (!authCtx.user.onboardingComplete) redirect("/onboarding");

  return <>{children}</>;
}
