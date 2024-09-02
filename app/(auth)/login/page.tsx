import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <H1 className="text-center mb-5">Log In</H1>
      <AuthForm type="login" />
      <p className=" mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
};

export default page;
