"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export function TabsClient() {
  const pathname = usePathname();
  const params = useParams<{ orgSlug: string }>();
  const baseUrl = `/${params.orgSlug}/members`;

  return (
    <Tabs value={pathname == baseUrl ? "members" : "invitations"}>
      <TabsList className="h-[90%]">
        <TabsTrigger asChild value="members">
          <Link href={`${baseUrl}`}>Members</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="invitations">
          <Link href={`${baseUrl}/invitations`}>Invitations</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
