"use client";
import { logIn, signUp } from "@/actions/actions";
import { useFormState } from "react-dom";
import AuthFormBtn from "./auth-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  type: "login" | "signup";
};
const AuthForm = ({ type }: Props) => {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  return (
    <form action={type === "login" ? dispatchLogIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" required maxLength={100} />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          required
          maxLength={100}
        />
      </div>

      <AuthFormBtn type={type} />

      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
};

export default AuthForm;
