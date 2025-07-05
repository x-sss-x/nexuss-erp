"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRight, IconBuilding } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { Button } from "@nxss/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@nxss/ui/form";
import { Input } from "@nxss/ui/input";
import { toast } from "@nxss/ui/toast";

import { authClient } from "~/auth/client";

const organizationSchema = z.object({
  name: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
});

export function Organization() {
  const form = useForm({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { organization } = authClient;
  const router = useRouter();

  const slug = form.watch().slug;

  /** Check if slug is exists already or not --> with interval to avoid continous fetch calls */
  const checkSlug = useDebouncedCallback(async (slug: string) => {
    await organization.checkSlug(
      { slug },
      {
        onError(context) {
          form.setError("slug", {
            message: context.error.message,
          });
        },
        onSuccess() {
          form.setError("slug", { message: "" });
        },
      },
    );
    console.log("Organizaton slug reached");
  }, 1000);

  useEffect(() => {
    checkSlug(slug)?.catch((e) => {
      console.log("Error in checking slug", e);
    });
  }, [slug, checkSlug]);

  async function onSubmit(values: z.infer<typeof organizationSchema>) {
    await organization.create(values, {
      onError(context) {
        toast.error(context.error.message);
      },
      onSuccess() {
        router.refresh();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-8"
      >
        <div className="flex flex-col items-center space-y-1.5 text-center">
          <Image
            src={"/nexuss-logo.png"}
            height={52}
            width={52}
            alt="Nexuss Logo"
            className="mb-6 dark:invert"
          />
          <h1 className="scroll-m-20 text-balance text-center text-4xl font-extrabold tracking-tight">
            Welcome to Nexuss ERP
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's get your organization set up in just a few steps
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative inline-flex w-full items-center">
                  <IconBuilding className="absolute ml-2 text-muted-foreground" />
                  <Input
                    {...field}
                    required
                    placeholder="Organization name"
                    className="md:text-md h-12 px-8 ps-10"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative inline-flex w-full items-center">
                  <div className="absolute inline-flex h-full items-center rounded-s-lg border border-input bg-accent/80 px-1.5 font-mono text-sm text-muted-foreground">
                    http://nexusserp.com/
                  </div>
                  <Input
                    {...field}
                    required
                    placeholder="your-organization-slug"
                    className="h-12 px-8 pl-48 font-mono font-medium md:text-sm"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-sm capitalize" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size={"xl"}
          loading={form.formState.isSubmitting}
          className="group w-full"
        >
          Continue{" "}
          <IconArrowRight className="transition-all duration-200 group-hover:translate-x-1.5" />
        </Button>
      </form>
    </Form>
  );
}
