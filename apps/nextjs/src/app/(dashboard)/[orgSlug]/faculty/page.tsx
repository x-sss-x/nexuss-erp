import React from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";

import Container from "~/app/_components/container";
import { SiteHeader } from "~/app/_components/site-header";

export default function Page() {
  return (
    <React.Fragment>
      <SiteHeader title="Faculty" />
      <Container className="px-8 md:px-10">
        <h1 className="text-2xl font-medium tracking-wide">Faculty Members</h1>

        <div className="inline-flex w-full justify-between">
          <div className="relative inline-flex w-fit items-center">
            <SearchIcon className="absolute left-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Search..." className="min-w-72 ps-8" />
          </div>

          <Button>Invite</Button>
        </div>
      </Container>
    </React.Fragment>
  );
}
