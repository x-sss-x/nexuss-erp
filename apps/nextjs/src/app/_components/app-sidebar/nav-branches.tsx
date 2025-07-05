"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
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
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@nxss/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@nxss/ui/tooltip";

import { CreateBranchDialog } from "../create-branch-dialog";

const items = [
  {
    title: "Students",
    icon: GraduationCap,
    url: "/students",
  },
  {
    title: "Subjects",
    icon: Book,
    url: "/subjects",
  },
  {
    title: "Timetable",
    icon: Table2,
    url: "/timetable",
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    url: "/attendance",
  },
];

export function NavBranches({
  branches,
}: {
  branches: { id: string; name: string }[];
}) {
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Branches</SidebarGroupLabel>

      <Tooltip>
        <TooltipTrigger asChild>
          <CreateBranchDialog>
            <SidebarGroupAction>
              <Plus />
            </SidebarGroupAction>
          </CreateBranchDialog>
        </TooltipTrigger>

        <TooltipContent side="right">Create Branch</TooltipContent>
      </Tooltip>
      <SidebarMenu>
        {branches.map((b) => {
          const branchUrl = `/${orgSlug}/branches/${b.id}`;
          const isActive = pathname == branchUrl;

          return (
            <Collapsible key={b.id}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="font-medium"
                >
                  <Link href={branchUrl}>
                    <Circle className="text-muted-foreground" />
                    {b.name}
                  </Link>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu>
                    {items.map((subItem) => {
                      const subItemUrl = `${branchUrl}${subItem.url}`;
                      const isActive = pathname.startsWith(subItemUrl);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={isActive}
                            className="px-5"
                            asChild
                          >
                            <Link href={subItemUrl}>
                              <subItem.icon className="text-muted-foreground" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
