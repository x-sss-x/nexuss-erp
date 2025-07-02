import React from "react";
import { redirect } from "next/navigation";

import { getSession } from "~/auth/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCtx = await getSession();
  if (authCtx) redirect("/");

  return <React.Fragment>{children}</React.Fragment>;
}
