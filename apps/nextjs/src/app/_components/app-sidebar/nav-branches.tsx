"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  IconBook2,
  IconCalendarCheck,
  IconCircle,
  IconPlus,
  IconTable,
  IconTriangleFilled,
  IconUsers,
} from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";

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

import type { IconPickerIcon } from "../icon-picker";
import { useTRPC } from "~/trpc/react";
import { CreateBranchDialog } from "../create-branch-dialog";
import { TablerReactIcon } from "../icon-picker";

const items = [
  {
    title: "Students",
    icon: IconUsers,
    url: "/students",
  },
  {
    title: "Subjects",
    icon: IconBook2,
    url: "/subjects",
  },
  {
    title: "Timetable",
    icon: IconTable,
    url: "/timetable",
  },
  {
    title: "Attendance",
    icon: IconCalendarCheck,
    url: "/attendance",
  },
];

function NavBranchList() {
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const pathname = usePathname();
  const trpc = useTRPC();
  const branches = useSuspenseQuery(trpc.branch.getAll.queryOptions());

  return (
    <>
      {branches.data.map((b) => {
        const branchUrl = `/${orgSlug}/branches/${b.id}`;
        const isActive = pathname == branchUrl;

        return (
          <Collapsible key={b.id}>
            <SidebarMenuItem className="items-center">
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className="font-medium"
              >
                <Link href={branchUrl}>
                  <TablerReactIcon
                    name={b.icon as IconPickerIcon}
                    isActive
                    className="size-5 [&_svg]:size-3.5"
                  />
                  <span className="max-w-full truncate pr-2">{b.name}</span>
                </Link>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90 [&_svg]:size-1.5">
                  <IconTriangleFilled className="rotate-90 text-muted-foreground" />
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
                          className="px-5 text-xs"
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
    </>
  );
}

export function NavBranches() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Branches</SidebarGroupLabel>

      <Tooltip>
        <TooltipTrigger asChild>
          <CreateBranchDialog>
            <SidebarGroupAction>
              <IconPlus />
            </SidebarGroupAction>
          </CreateBranchDialog>
        </TooltipTrigger>

        <TooltipContent side="right">Create Branch</TooltipContent>
      </Tooltip>
      <SidebarMenu>
        <NavBranchList />
      </SidebarMenu>
    </SidebarGroup>
  );
}
