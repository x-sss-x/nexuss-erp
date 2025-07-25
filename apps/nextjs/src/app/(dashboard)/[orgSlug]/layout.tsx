import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@nxss/ui/sidebar";

import { AppSidebar } from "~/app/_components/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  /** Continue to dashboard content */
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="bg-sidebar">
      <AppSidebar variant="inset" />
      <SidebarInset className="border">{children}</SidebarInset>
    </SidebarProvider>
  );
}
