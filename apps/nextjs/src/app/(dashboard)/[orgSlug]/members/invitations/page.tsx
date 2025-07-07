import React from "react";
import { headers } from "next/headers";

import Container from "~/app/_components/container";
import { DataTable } from "~/app/_components/data-table";
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

  return (
    <React.Fragment>
      <Container className="px-8 md:px-10">
        <h1 className="text-2xl font-medium">Invitations</h1>
      </Container>
      <DataTable columns={columns} data={organization.invitations} />
    </React.Fragment>
  );
}
