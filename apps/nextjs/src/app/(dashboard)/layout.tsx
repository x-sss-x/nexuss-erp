import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@nxss/ui/sidebar";

import { getSession } from "~/auth/server";
import { AppSidebar } from "../_components/app-sidebar";
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

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  /** Continue to dashboard content */
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main className="w-full px-8 pb-8 pt-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
