import React from "react";
import { headers } from "next/headers";
import { formatDistanceToNowStrict } from "date-fns";

import type { Staff } from "./columns";
import Container from "~/app/_components/container";
import { DataTable } from "~/app/_components/data-table";
import { InviteFacultyButton } from "~/app/_components/invite-faculty-button";
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
      <Container className="px-8 md:px-10">
        <div className="inline-flex w-full items-center justify-between">
          <h1 className="text-2xl font-medium">Members</h1>

          <InviteFacultyButton />
        </div>
      </Container>
      <DataTable columns={columns} data={faculty} />
    </React.Fragment>
  );
}
