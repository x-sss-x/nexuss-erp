import { getSession } from "~/auth/server";
import HomePage from "../_components/home.page";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCtx = await getSession();

  if (!authCtx) return <HomePage />;

  return <section>{children}</section>;
}
