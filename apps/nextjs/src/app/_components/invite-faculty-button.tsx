"use client";

import { useState } from "react";
import { z } from "zod/v4";

import { Button } from "@nxss/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
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
import { Textarea } from "@nxss/ui/textarea";
import { toast } from "@nxss/ui/toast";

import { authClient } from "~/auth/client";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const InviteFacultySchema = z.object({
  emails: z
    .string()
    .min(1, "Required")
    .check((ctx) => {
      const invalidEmails: string[] = [];

      ctx.value.split(",").forEach((email) => {
        if (!emailRegex.test(email.trim())) invalidEmails.push(email.trim());
      });

      if (invalidEmails.length > 0)
        ctx.issues.push({
          code: "invalid_value",
          input: ctx.value,
          values: [],
          message: `${invalidEmails.join(", ")} invalid`,
        });
    }),
});

export function InviteFacultyButton() {
  const organization = authClient.organization;
  const [open, setOpen] = useState(false);
  const form = useForm({
    schema: InviteFacultySchema,
    defaultValues: {
      emails: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof InviteFacultySchema>) {
    await Promise.all(
      values.emails
        .split(",")
        .map((e) => e.trim())
        .map(async (email) => {
          await organization.inviteMember({
            email,
            role: "staff",
            resend: true,
            fetchOptions: {
              onError(context) {
                toast.error(context.error.message);
              },
              onSuccess() {
                toast.success(`${email} invited`);
              },
            },
          });
        }),
    );

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Invite</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to your institution</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogBody>
              <div className="grid">
                <FormField
                  control={form.control}
                  name="emails"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={3}
                          className="resize-none"
                          placeholder="email@example.com, email2@example.com..."
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
              <Button loading={form.formState.isSubmitting}>
                Send invites
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
