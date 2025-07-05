import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "@nxss/ui/button";

import { getSession } from "~/auth/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCtx = await getSession();
  if (authCtx) redirect("/");

  return (
    <div className="h-svh p-10">
      <div>
        <Link href={"/"}>
          <Button variant={"outline"}>
            <IconArrowLeft />
            Home
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
