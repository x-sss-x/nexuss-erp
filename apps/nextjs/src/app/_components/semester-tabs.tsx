"use client";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

import { useTeam } from "~/context/team/client";

export function SemesterTabs() {
  const { activeSemester, setActiveSemester } = useTeam();
  return (
    <Tabs
      value={activeSemester}
      onValueChange={(v) => {
        setActiveSemester(v);
      }}
    >
      <TabsList className="h-[90%]">
        {["1", "3", "5"].map((s) => (
          <TabsTrigger className="text-xs" key={s} value={s}>
            S{s}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
