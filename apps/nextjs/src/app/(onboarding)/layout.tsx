import { redirect } from "next/navigation";

import { getSession } from "~/auth/server";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCtx = await getSession();

  /** No session redirect to sign in page*/
  if (!authCtx) return redirect("/sign-in");

  /** User's onboarding process completed, then make a redirect to dashboard */
  if (authCtx.user.onboardingComplete) redirect("/");

  return <section className="h-svh w-full">{children}</section>;
}
