import Image from "next/image";
import Spline from "@splinetool/react-spline/next";

import { Button } from "@nxss/ui/button";

import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export default function HomePage() {
  prefetch(trpc.post.all.queryOptions());

  return (
    <HydrateClient>
      <main className="container flex h-screen items-center justify-between py-16">
        <div className="space-y-4">
          <div className="mb-14 flex items-center gap-3">
            <Image
              src={"/nexuss-logo.png"}
              height={64}
              width={64}
              alt="Nexuss Logo"
              className="dark:invert"
            />
            <h3 className="font-mono text-4xl font-bold">NexussERP</h3>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            Everything Your Institution Needs. Nothing It Doesn't.
          </h1>
          <p className="text-xl text-muted-foreground">
            Nexus ERP trims the clutter and delivers only what
            matters—beautifully and intuitively.
          </p>
          <div className="space-x-2.5">
            <Button size={"lg"}>Get Started</Button>
            <Button variant={"secondary"} size={"lg"}>
              Sign in
            </Button>
          </div>
        </div>
        <Spline scene="https://prod.spline.design/EvWngk-QnczF24xr/scene.splinecode" />
      </main>
    </HydrateClient>
  );
}
