"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Home, Users } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@nxss/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "",
    icon: Home,
    exact: true,
  },
  {
    title: "Faculty",
    url: "/faculty",
    icon: Users,
  },
];

export function NavMain() {
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const url = `/${orgSlug}${item.url}`;
            const isActive = item.exact
              ? pathname == url
              : pathname.startsWith(url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActive} asChild>
                  <Link href={url}>
                    <item.icon className="text-muted-foreground" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
