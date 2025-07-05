"use client";

import type { z } from "zod/v4";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateBranchSchema } from "@nxss/db/schema";
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

import type { IconPickerIcon } from "./icon-picker";
import { useTRPC } from "~/trpc/react";
import IconPicker, { TablerReactIcon } from "./icon-picker";

export function CreateBranchDialog(
  props: React.ComponentProps<typeof DialogTrigger>,
) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    schema: CreateBranchSchema,
    defaultValues: {
      name: "",
      icon: "IconCircleFilled" as IconPickerIcon,
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { mutateAsync: createBranch } = useMutation(
    trpc.branch.create.mutationOptions({
      async onSuccess(_, variables) {
        toast.success(`${variables.name} branch created`);
        await queryClient.invalidateQueries(trpc.branch.getAll.queryFilter());
        form.reset();
        setOpen(false);
      },
      onError() {
        toast.error("Something went wrong");
      },
    }),
  );

  async function onSubmit(values: z.infer<typeof CreateBranchSchema>) {
    await createBranch(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger {...props} asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New branch</DialogTitle>
          <DialogDescription>
            An workspace for students who choosed particular course to be study.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            <DialogBody>
              <div className="grid grid-cols-8">
                <FormField
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
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-7">
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
