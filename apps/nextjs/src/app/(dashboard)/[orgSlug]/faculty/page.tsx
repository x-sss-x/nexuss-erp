import React from "react";

import Container from "~/app/_components/container";
import { SiteHeader } from "~/app/_components/site-header";

export default function Page() {
  return (
    <React.Fragment>
      <SiteHeader title="Faculty" />
      <Container>
        <div className="px-4 md:px-6">
          <h1 className="text-2xl font-semibold">Faculty</h1>
        </div>
      </Container>
    </React.Fragment>
  );
}
