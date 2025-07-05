"use client";

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
import { Textarea } from "@nxss/ui/textarea";

export function InviteFacultyButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to your institution</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="grid">
            <Textarea
              rows={3}
              className="resize-none"
              placeholder="email@example.com, email2@example.com..."
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Send invites</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
