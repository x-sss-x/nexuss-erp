"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@nxss/ui";
import { Button } from "@nxss/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nxss/ui/form";
import { Input } from "@nxss/ui/input";
import { Separator } from "@nxss/ui/separator";
import { toast } from "@nxss/ui/toast";

import { authClient } from "~/auth/client";

const singUpSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 charactres"),
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = authClient;
  const form = useForm({
    resolver: zodResolver(singUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof singUpSchema>) {
    await signUp.email(values, {
      onSuccess: () => {
        router.refresh();
      },
      onError(context) {
        toast.error(context.error.message);
      },
    });
  }

  return (
    <Card className="min-w-[380px] max-w-sm border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-2xl">Create Account</CardTitle>
        <CardDescription className="text-xs md:text-base">
          Let's start automate with NexussERP
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div
          className={cn(
            "flex w-full items-center gap-2",
            "flex-col justify-between",
          )}
        >
          <Button
            type="button"
            className={cn("w-full gap-2")}
            loading={loading}
            onClick={async () => {
              await signIn.social(
                {
                  provider: "google",
                  callbackURL: "/",
                },
                {
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                },
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.98em"
              height="1em"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Continue with Google
          </Button>
        </div>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full items-center gap-2.5">
              <Separator className="flex-1 bg-foreground/40" />
              <p className="text-xs font-semibold text-muted-foreground">
                OR CONTINUE WITH YOUR EMAIL
              </p>
              <Separator className="flex-1 bg-foreground/40" />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="youremail@email.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter unique password"
                        type="password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              className="w-full"
              loading={form.formState.isSubmitting}
            >
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col">
        <p className="text-xs text-muted-foreground">
          By creating an account you agree to the Terms of Service and our
          Privacy Policy.
        </p>
        <div className="flex w-full gap-2 py-4">
          <p className="text-center text-sm">Already have an account?</p>
          <Link
            href={"/sign-in"}
            className="text-link text-sm font-medium hover:opacity-80"
          >
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
