import { headers } from "next/headers";
import Image from "next/image";
import { Home, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@nxss/ui/sidebar";

import { auth, getSession } from "~/auth/server";
import { NavBranches } from "./nav-branches";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export async function AppSidebar({
  orgSlug,
  ...props
}: React.ComponentProps<typeof Sidebar> & { orgSlug: string }) {
  const session = await getSession();
  const nextHeaders = await headers();

  if (!session) return null;

  const organization = await auth.api.getFullOrganization({
    headers: nextHeaders,
    query: { organizationSlug: orgSlug },
  });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image
                  width={20}
                  height={20}
                  src={"/nexuss-logo.png"}
                  alt="Nexuss Logo"
                  className="dark:invert"
                />
                <span className="text-base font-semibold">
                  {organization?.name}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />

        <NavBranches
          branches={[
            { id: "1", name: "Automobile" },
            { id: "2", name: "Computer Science" },
            { id: "3", name: "Electrical & Electronics" },
            { id: "4", name: "Mechanical" },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
