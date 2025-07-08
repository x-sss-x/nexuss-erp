import { getActiveSemester } from "~/context/team";
import { TeamContextProvider } from "~/context/team/client";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const activeSemester = (await getActiveSemester({ teamId }))?.value;

  return (
    <TeamContextProvider
      teamId={teamId}
      currentSemesterType="odd"
      defaultActiveSemester={activeSemester}
    >
      {children}
    </TeamContextProvider>
  );
}
