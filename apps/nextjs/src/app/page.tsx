import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export default function HomePage() {
  prefetch(trpc.post.all.queryOptions());

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Nexuss ERP
        </h1>
      </main>
    </HydrateClient>
  );
}
