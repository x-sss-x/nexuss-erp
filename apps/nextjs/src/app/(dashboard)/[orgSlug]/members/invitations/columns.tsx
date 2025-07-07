"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Invitation } from "better-auth/plugins/organization";
import { IconDots, IconUser } from "@tabler/icons-react";
import { formatDistanceToNowStrict } from "date-fns";

import { Avatar, AvatarFallback } from "@nxss/ui/avatar";
import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";

export const columns: ColumnDef<Invitation>[] = [
  {
    id: "invitee",
    header: "Invitee",
    cell(props) {
      const original = props.row.original;
      return (
        <div className="inline-flex w-[800px] items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback>
              <IconUser className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <p>{original.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell(props) {
      return <Badge variant={"secondary"}>{props.getValue() as string}</Badge>;
    },
  },
  {
    accessorKey: "expiresAt",
    header: "Expires",
    cell(props) {
      return (
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNowStrict(props.getValue() as Date, {
            addSuffix: true,
          })}
        </p>
      );
    },
  },
  {
    id: "more-action",
    cell() {
      return (
        <div className="text-right">
          <Button
            variant={"ghost"}
            className="opacity-0 group-hover:opacity-100"
            size={"icon"}
          >
            <IconDots />
          </Button>
        </div>
      );
    },
  },
];
