"use client";

import {
  Book,
  Box,
  CalendarCheck,
  ChevronRight,
  Circle,
  GraduationCap,
  Plus,
  Table2,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@nxss/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@nxss/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@nxss/ui/tooltip";

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

      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarGroupAction>
            <Plus />
          </SidebarGroupAction>
        </TooltipTrigger>
        <TooltipContent side="right">Create Branch</TooltipContent>
      </Tooltip>
      <SidebarMenu>
        {branches.map((b) => (
          <Collapsible key={b.id}>
            <SidebarMenuItem>
              <SidebarMenuButton className="font-medium">
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
                <SidebarMenu>
                  {items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton className="px-5" asChild>
                        <a href={subItem.href}>
                          <subItem.icon className="text-muted-foreground" />
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
