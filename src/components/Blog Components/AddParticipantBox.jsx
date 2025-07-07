import React, { useState } from "react"
// import { useMediaQuery } from "@/hooks/use-media-query"
function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    React.useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query, matches]);

    return matches;
}

import axios from "axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import axiosInstance from "../utils/axiosInstance.utils";
export default function AddParticipantBox({blogId}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [error, setError] = useState(null);

  const addParticipantHandler = async () => {
    try {
        const emailInput = document.getElementById("email");
        const email = emailInput ? emailInput.value : "";
        const response = await axiosInstance.post('http://localhost:3000/api/v1/blog/addParticipant', { email, blogId });
        if(response.status==200){
          setOpen(false);
        }
        setError(null);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }

  const formContent = (
    <form
      onSubmit={e => {
        e.preventDefault();
        addParticipantHandler();
      }}
      className="grid gap-4 p-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter email" />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit">Add Participant</Button>
    </form>
  )

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Participant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Participant</DialogTitle>
          <DialogDescription>Enter email to add a participant.</DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Add Participant</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Participant</DrawerTitle>
          <DrawerDescription>Enter email to add a participant.</DrawerDescription>
        </DrawerHeader>
        {formContent}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
