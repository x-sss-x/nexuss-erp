import React from "react";
import { IconSearch } from "@tabler/icons-react";

import { Input } from "@nxss/ui/input";

import type { Staff } from "./columns";
import Container from "~/app/_components/container";
import { DataTable } from "~/app/_components/data-table";
import { InviteFacultyButton } from "~/app/_components/invite-faculty-button";
import { SiteHeader } from "~/app/_components/site-header";
import { columns } from "./columns";

export const staffList: Staff[] = [
  {
    id: "1",
    name: "Dan Abramov",
    email: "gaearon@ks.edu.in",
    image: "https://github.com/gaearon.png",
    joinedAt: "2022-06-10",
  },
  {
    id: "2",
    name: "Jake Archibald",
    email: "jakearchibald@ks.edu.in",
    image: "https://github.com/jakearchibald.png",
    joinedAt: "2021-08-22",
  },
  {
    id: "3",
    name: "Evan You",
    email: "yyx990803@ks.edu.in",
    image: "https://github.com/yyx990803.png",
    joinedAt: "2023-01-15",
  },
  {
    id: "4",
    name: "Sindre Sorhus",
    email: "sindresorhus@ks.edu.in",
    image: "https://github.com/sindresorhus.png",
    joinedAt: "2020-11-30",
  },
  {
    id: "5",
    name: "Lee Robinson",
    email: "leerob@ks.edu.in",
    image: "https://github.com/leerob.png",
    joinedAt: "2022-04-12",
  },
  {
    id: "6",
    name: "Kent C. Dodds",
    email: "kentcdodds@ks.edu.in",
    image: "https://github.com/kentcdodds.png",
    joinedAt: "2023-07-09",
  },
  {
    id: "7",
    name: "Maggie Appleton",
    email: "maggieappleton@ks.edu.in",
    image: "https://github.com/maggieappleton.png",
    joinedAt: "2021-01-20",
  },
  {
    id: "8",
    name: "Thor Webdev",
    email: "thorwebdev@ks.edu.in",
    image: "https://github.com/thorwebdev.png",
    joinedAt: "2022-09-01",
  },
  {
    id: "9",
    name: "Shad CN",
    email: "shadcn@ks.edu.in",
    image: "https://github.com/shadcn.png",
    joinedAt: "2020-02-17",
  },
  {
    id: "10",
    name: "Theo Browne",
    email: "t3dotgg@ks.edu.in",
    image: "https://github.com/t3dotgg.png",
    joinedAt: "2023-03-05",
  },
];

export default function Page() {
  return (
    <React.Fragment>
      <SiteHeader title="Faculty" />
      <Container className="px-8 md:px-10">
        <h1 className="text-2xl font-medium">Faculty Members</h1>

        <div className="inline-flex w-full justify-between">
          <div className="relative inline-flex w-fit items-center">
            <IconSearch className="absolute left-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Search..." className="min-w-72 ps-8" />
          </div>

          <InviteFacultyButton />
        </div>
      </Container>
      <DataTable columns={columns} data={staffList} />
    </React.Fragment>
  );
}
