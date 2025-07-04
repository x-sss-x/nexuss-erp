"use client";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export function SemesterTabs() {
  return (
    <Tabs defaultValue="S1">
      <TabsList className="h-[90%]">
        {["S1", "S3", "S5"].map((s) => (
          <TabsTrigger className="text-xs" key={s} value={s}>
            {s}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
