"use client";

import type { z } from "zod/v4";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import z4 from "zod/v4";

import { Button } from "@nxss/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@nxss/ui/form";
import { Input } from "@nxss/ui/input";
import { toast } from "@nxss/ui/toast";

import { authClient } from "~/auth/client";

const CreateTeamSchema = z4.object({
  name: z4.string().min(1, "Required"),
});

export function CreateTeamDialog(
  props: React.ComponentProps<typeof DialogTrigger>,
) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    schema: CreateTeamSchema,
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const organization = authClient.organization;

  async function onSubmit(values: z.infer<typeof CreateTeamSchema>) {
    await organization.createTeam(values, {
      onSuccess() {
        toast.success(`${values.name} branch created`);
        router.refresh();
        form.reset();
        setOpen(false);
      },
      onError(context) {
        toast.error(context.error.message);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger {...props} asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Team</DialogTitle>
          <DialogDescription>
            An team for managing the department or branch resources.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            <DialogBody>
              <div className="grid grid-cols-8">
                {/* <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <IconPicker value={field.value} onChange={field.onChange}>
                        <TablerReactIcon
                          className="size-11 [&_svg]:size-6"
                          isActive
                          name={field.value as IconPickerIcon}
                        />
                      </IconPicker>
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-8">
                      <FormControl>
                        <Input
                          placeholder="Computer Science"
                          className="h-11 text-sm md:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button loading={form.formState.isSubmitting}>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
