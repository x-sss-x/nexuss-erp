"use client";

import React from "react";

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
import { Input } from "@nxss/ui/input";

export function CreateBranchDialog(
  props: React.ComponentProps<typeof DialogTrigger>,
) {
  return (
    <Dialog>
      <DialogTrigger {...props} asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New branch</DialogTitle>
          <DialogDescription>
            An workspace for students who choosed particular course to be study.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="grid">
            <Input placeholder="Your branch name" />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
