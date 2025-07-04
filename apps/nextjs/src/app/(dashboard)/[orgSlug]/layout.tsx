import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@nxss/ui/sidebar";

import { AppSidebar } from "~/app/_components/app-sidebar";
import { SiteHeader } from "~/app/_components/site-header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}) {
  const cookieStore = await cookies();
  const { orgSlug } = await params;
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  /** Continue to dashboard content */
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="bg-sidebar">
      <AppSidebar orgSlug={orgSlug} variant="inset" />
      <SidebarInset className="border">
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
