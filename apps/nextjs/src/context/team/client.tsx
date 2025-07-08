"use client";

import React from "react";
import { useParams } from "next/navigation";

const TeamContext = React.createContext<{
  activeSemester: string;
  setActiveSemester: (value: string) => void;
} | null>(null);

/** All config in current selected team */
export const useTeam = () => {
  const team = React.useContext(TeamContext);
  const { teamId } = useParams<{ teamId: string }>();

  if (!team) throw new Error("useTeam must be used under TeamContextProvider");
  if (!teamId)
    throw new Error(
      "usseTeam must be used under the teams/[teamId] route segment",
    );

  return team;
};

const TEAM_COOKIE_NAME = "branch_";
const TEAM_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function TeamContextProvider({
  children,
  teamId,
  defaultActiveSemester,
  currentSemesterType,
}: {
  children: React.ReactNode;
  teamId: string;
  // Pass it from the server
  defaultActiveSemester?: string;
  currentSemesterType?: "odd" | "even";
}) {
  const [_activeSemester, _setActiveSemester] = React.useState(
    defaultActiveSemester,
  );

  const activeSemester =
    _activeSemester ?? (currentSemesterType === "odd" ? "1" : "2");

  const setActiveSemester = React.useCallback((value: string) => {
    _setActiveSemester(value);
  }, []);

  React.useEffect(() => {
    // Store each branches state of active semester value in cookie
    document.cookie = `${TEAM_COOKIE_NAME + teamId}=${activeSemester}; path=/; max-age=${TEAM_COOKIE_MAX_AGE}`;
  }, [activeSemester, teamId]);

  return (
    <TeamContext.Provider value={{ activeSemester, setActiveSemester }}>
      {children}
    </TeamContext.Provider>
  );
}
