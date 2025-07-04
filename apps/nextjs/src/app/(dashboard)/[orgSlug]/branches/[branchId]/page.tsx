import React from "react";

import Container from "~/app/_components/container";
import { SemesterTabs } from "~/app/_components/semester-tabs";
import { SiteHeader } from "~/app/_components/site-header";

export default function Page() {
  return (
    <React.Fragment>
      <SiteHeader title="Computer Science" startElement={<SemesterTabs />} />
      <Container>
        <div className="px-4 md:px-6">
          <h1 className="text-2xl font-semibold">Branch Details</h1>
        </div>
      </Container>
    </React.Fragment>
  );
}
