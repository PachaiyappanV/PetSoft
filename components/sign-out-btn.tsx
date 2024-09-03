"use client";
import { logOut } from "@/actions/actions";
import { useTransition } from "react";
import { Button } from "./ui/button";

const SignOutBtn = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}
      disabled={isPending}
    >
      Sign out
    </Button>
  );
};

export default SignOutBtn;
