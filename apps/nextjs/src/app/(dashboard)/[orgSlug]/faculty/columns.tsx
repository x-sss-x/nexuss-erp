"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { IconDots } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Staff {
  id: string;
  email: string;
  image: string;
  name: string;
  joinedAt: string;
}

export const columns: ColumnDef<Staff>[] = [
  {
    id: "member",
    header: "Member",
    cell(props) {
      const original = props.row.original;
      return (
        <div className="inline-flex w-[800px] items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarImage src={original.image} />
            <AvatarFallback>{original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p>{original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell(props) {
      return (
        <p className="max-w-lg text-muted-foreground">
          {props.getValue() as string}
        </p>
      );
    },
  },
  {
    accessorKey: "joinedAt",
    header: "Joined",
    cell(props) {
      return (
        <p className="text-xs text-muted-foreground">
          {props.getValue() as string}
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
