"use client";
import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";

const SignOutBtn = () => {
  return <Button onClick={async () => await logOut()}>Sign out</Button>;
};

export default SignOutBtn;
