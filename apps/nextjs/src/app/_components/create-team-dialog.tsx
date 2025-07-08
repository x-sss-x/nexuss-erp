"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod/v4";

import { CreateTeamInfoSchema } from "@nxss/db/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { toast } from "@nxss/ui/toast";

import type { IconPickerIcon } from "./icon-picker";
import { useTRPC } from "~/trpc/react";
import IconPicker, { TablerReactIcon } from "./icon-picker";

const CreateTeamSchema = CreateTeamInfoSchema.and(
  z.object({ name: z.string().min(1, "Required") }),
);

export function CreateTeamDialog(
  props: React.ComponentProps<typeof DialogTrigger>,
) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    schema: CreateTeamSchema,
    defaultValues: {
      name: "",
      icon: "IconCircleFilled",
      currentSemesterType: "odd",
      numberOfsemesters: 6,
    },
  });
  const router = useRouter();
  const trpc = useTRPC();
  const { mutateAsync: createTeam } = useMutation(
    trpc.organization.createTeam.mutationOptions({
      onSuccess(data) {
        toast.success(`${data.name} branch created`);
        router.refresh();
        form.reset();
        setOpen(false);
      },
      onError(context) {
        toast.error(context.message);
      },
    }),
  );

  async function onSubmit(values: z.infer<typeof CreateTeamSchema>) {
    await createTeam(values);
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
            <DialogFooter className="flex justify-between">
              <div className="flex w-full gap-1">
                <FormField
                  control={form.control}
                  name="numberOfsemesters"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(v) => field.onChange(parseInt(v))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="h-8 min-w-24 bg-accent/60 text-xs">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="text-xs">
                          <SelectItem value="4">4 Semesters</SelectItem>
                          <SelectItem value="6">6 Semesters</SelectItem>
                          <SelectItem value="8">8 Semesters</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentSemesterType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(v) => field.onChange(parseInt(v))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="h-8 min-w-24 bg-accent/60 text-xs">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="odd">Start with odd</SelectItem>
                          <SelectItem value="even">Starts with even</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button loading={form.formState.isSubmitting}>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
