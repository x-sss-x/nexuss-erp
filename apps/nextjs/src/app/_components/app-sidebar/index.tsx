import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@nxss/ui/sidebar";

import { getSession, listOrganizationsTeams } from "~/auth/server";
import { HydrateClient } from "~/trpc/server";
import { NavMain } from "./nav-main";
import { NavTeams } from "./nav-teams";
import { NavUser } from "./nav-user";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await getSession();

  if (!session) return null;

  const teams = await listOrganizationsTeams();

  return (
    <HydrateClient>
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
                    Organization Name
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          <NavTeams teams={teams} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={session.user} />
        </SidebarFooter>
      </Sidebar>
    </HydrateClient>
  );
}
