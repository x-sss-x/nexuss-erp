import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@nxss/ui/sidebar";

import { getSession } from "~/auth/server";
import { AppSidebar } from "../_components/app-sidebar";
import HomePage from "../_components/home.page";
import { SiteHeader } from "../_components/site-header";

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
    <SidebarProvider defaultOpen={defaultOpen} className="bg-sidebar">
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
