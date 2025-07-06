import React from "react";
import { headers } from "next/headers";
import { IconSearch } from "@tabler/icons-react";
import { formatDistanceToNowStrict } from "date-fns";

import { Input } from "@nxss/ui/input";

import type { Staff } from "./columns";
import Container from "~/app/_components/container";
import { DataTable } from "~/app/_components/data-table";
import { InviteFacultyButton } from "~/app/_components/invite-faculty-button";
import { SiteHeader } from "~/app/_components/site-header";
import { auth } from "~/auth/server";
import { columns } from "./columns";

export default async function Page({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const nextHeaders = await headers();
  const { orgSlug } = await params;
  const organization = await auth.api.getFullOrganization({
    headers: nextHeaders,
    query: { organizationSlug: orgSlug },
  });

  if (!organization) throw new Error("No organization selected");

  const faculty: Staff[] = organization.members.map((m) => ({
    email: m.user.email,
    id: m.userId,
    image: m.user.image,
    role: m.role,
    joinedAt: formatDistanceToNowStrict(m.createdAt, { addSuffix: true }),
    name: m.user.name,
  }));

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
      <DataTable columns={columns} data={faculty} />
    </React.Fragment>
  );
}
