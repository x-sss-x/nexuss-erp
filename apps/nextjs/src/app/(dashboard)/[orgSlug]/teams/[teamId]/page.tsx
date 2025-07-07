import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@nxss/ui/card";

import Container from "~/app/_components/container";
import { SemesterTabs } from "~/app/_components/semester-tabs";
import { SiteHeader } from "~/app/_components/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader title="Computer Science" endElement={<SemesterTabs />} />
      <Container>
        <div className="space-y-6 px-4 md:px-6">
          <h1 className="text-2xl font-semibold">Branch Dashboard</h1>

          {/* 3-column Empty State Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Stats</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No student data available for this semester.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Attendance insights will appear once data is recorded.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No subjects assigned for this semester yet.
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
