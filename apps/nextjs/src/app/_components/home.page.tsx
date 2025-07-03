import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline/next";

import { Button } from "@nxss/ui/button";

export default function HomePage() {
  return (
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
          Nexus ERP trims the clutter and delivers only what matters—beautifully
          and intuitively.
        </p>
        <div className="space-x-2.5">
          <Button size={"xl"} className="rounded-full">
            Sign Up
          </Button>

          <Link href={"/sign-in"}>
            <Button variant={"outline"} className="rounded-full" size={"xl"}>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      <Spline scene="https://prod.spline.design/EvWngk-QnczF24xr/scene.splinecode" />
    </main>
  );
}
