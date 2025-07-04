import React from "react";

import Container from "~/app/_components/container";
import { SiteHeader } from "~/app/_components/site-header";
import { getSession } from "~/auth/server";

export default async function Page() {
  const session = await getSession();

  return (
    <React.Fragment>
      <SiteHeader title="Home" />
      <Container>
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold">Welcome {session?.user.name} </h2>
          <p className="text-muted-foreground">
            Today is a big day in your institution.
          </p>
        </div>
      </Container>
    </React.Fragment>
  );
}
