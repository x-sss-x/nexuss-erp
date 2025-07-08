import { cookies } from "next/headers";

export async function getActiveSemester(params: { teamId: string }) {
  const ck = await cookies();
  return ck.get(`branch_${params.teamId}`);
}
