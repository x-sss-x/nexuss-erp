import React from "react";

import { SiteHeader } from "~/app/_components/site-header";
import { TabsClient } from "./tabs.client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <SiteHeader startElement={<TabsClient />} />

      {children}
    </React.Fragment>
  );
}
