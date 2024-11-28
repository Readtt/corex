import { auth } from "@/server/auth";

import NavLayout from "@/app/_components/nav-layout";
import ProviderList from "@/components/auth/provider-list";
import NavbarLogo from "@/components/navbar/navbar-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session) redirect("/");

  return (
    <div className="container relative grid h-screen items-center justify-center sm:min-w-full md:grid md:min-w-full lg:max-w-none lg:grid-cols-2 lg:flex-col lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <NavbarLogo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;Design First.&rdquo;</p>
            <footer className="text-sm">CoreX</footer>
          </blockquote>
        </div>
      </div>
      <div className="rounded border p-8 py-16 shadow-sm lg:border-none">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-6 flex justify-center lg:hidden">
              <NavbarLogo />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Sign in and register with one-click.
            </p>
          </div>
          <ProviderList />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <NavLayout session={session}>
      <div className="flex items-center">
        <Card className="w-[350px] shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Sign in and register in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProviderList />
          </CardContent>
        </Card>
      </div>
    </NavLayout>
  );
}
