import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { auth, getSession } from "~/auth/server";
import { InvitationCard } from "./invitation-card";

export default async function Page({
  params,
}: {
  params: Promise<{ inviteId: string }>;
}) {
  const { inviteId } = await params;
  const headers = await nextHeaders();
  const session = await getSession();

  if (!session) redirect("/sign-in");

  const invitation = await auth.api.getInvitation({
    headers,
    query: { id: inviteId },
  });

  return (
    <div className="flex h-svh items-center justify-center">
      <InvitationCard session={session} invitation={invitation} />
    </div>
  );
}
