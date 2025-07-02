"use client";

import { useRouter } from "next/navigation";

import { Button } from "@nxss/ui/button";

import { authClient } from "~/auth/client";

export default function Page() {
  const { signOut, useSession } = authClient;
  const { data } = useSession();
  const router = useRouter();

  return (
    <div>
      Welcome User {data?.user.name}{" "}
      <Button
        onClick={() =>
          signOut({
            fetchOptions: {
              onResponse(context) {
                if (context.response.status == 200) router.refresh();
              },
            },
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
}
