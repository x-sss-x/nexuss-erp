"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconBuilding } from "@tabler/icons-react";

import type { Auth, Session } from "@nxss/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";

import { authClient } from "~/auth/client";

interface InvitationCardProps {
  session: Session;
  invitation: Awaited<ReturnType<Auth["api"]["getInvitation"]>>;
}
export function InvitationCard({ session, invitation }: InvitationCardProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const organization = authClient.organization;
  const router = useRouter();

  return (
    <Card className="max-w-md">
      <CardHeader className="items-center text-center">
        <Image
          src={"/nexuss-logo.png"}
          alt="Nexuss logo"
          height={52}
          width={52}
          className="mb-8 dark:invert"
        />
        <div className="inline-flex -space-x-4">
          <Avatar className="size-16 border-4 border-background">
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <Avatar className="size-16 border-2 border-background">
            <AvatarFallback>
              <IconBuilding className="size-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>

        <CardTitle className="text-3xl font-bold">
          Invitation to join {invitation.organizationName}
        </CardTitle>
        <CardDescription>
          Accept the invitation and join <b>{invitation.organizationName}</b> to
          be a <b className="capitalize">{invitation.role}</b> and manage your
          assigned resources.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button
          size={"lg"}
          loading={isAccepting}
          onClick={async () => {
            await organization.acceptInvitation({
              invitationId: invitation.id,
              fetchOptions: {
                onRequest() {
                  setIsAccepting(true);
                },
                onError(ctx) {
                  setIsAccepting(false);
                  console.error(ctx.error);
                },
                async onSuccess() {
                  await organization.setActive({
                    organizationId: invitation.organizationId,
                  });
                  router.replace("/");
                  setIsAccepting(false);
                },
              },
            });
          }}
          className="w-full"
        >
          Accept Invitation
        </Button>
      </CardFooter>
    </Card>
  );
}
