"use client";

import {
  Book,
  Box,
  CalendarCheck,
  ChevronRight,
  Circle,
  GraduationCap,
  Table2,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@nxss/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@nxss/ui/sidebar";

const items = [
  {
    title: "Students",
    icon: GraduationCap,
    href: "#",
  },
  {
    title: "Subjects",
    icon: Book,
    href: "#",
  },
  {
    title: "Timetable",
    icon: Table2,
    href: "#",
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    href: "#",
  },
];

export function NavBranches({
  branches,
}: {
  branches: { id: string; name: string }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Branches</SidebarGroupLabel>
      <SidebarMenu>
        {branches.map((b) => (
          <Collapsible key={b.id}>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Circle className="text-muted-foreground" />
                {b.name}
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.href}>
                          <subItem.icon className="text-muted-foreground" />
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
