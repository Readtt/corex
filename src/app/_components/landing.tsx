"use client";

import NextAuthJSIcon from "@/components/icons/NextAuthJSIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  SiGmail,
  SiNextdotjs,
  SiPrisma,
  SiSst,
  SiStripe,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { ChevronRight, Volleyball, ExternalLink } from "lucide-react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import config from "@/config";

const features = [
  {
    title: "Next.JS",
    description:
      "A powerful React framework for building server-rendered or statically generated web applications. It offers features like API routes, image optimization, and routing out of the box.",
    icon: <SiNextdotjs className="size-4 md:size-6" />,
  },
  {
    title: "TypeScript",
    description:
      "A strongly typed programming language that builds on JavaScript, providing static typing and modern tools to improve developer productivity and code safety.",
    icon: <SiTypescript color="#3178C6" className="size-4 md:size-6" />,
  },
  {
    title: "tRPC",
    description:
      "A lightweight, typesafe, and efficient library for creating type-safe APIs in TypeScript applications. It eliminates boilerplate by generating types directly from server-side logic.",
    icon: <SiTrpc color="#2596BE" className="size-4 md:size-6" />,
  },
  {
    title: "Prisma",
    description:
      "A next-generation ORM for TypeScript and JavaScript that simplifies database management. It provides a type-safe query builder and integrates seamlessly with various databases.",
    icon: <SiPrisma className="size-4 md:size-6" />,
  },
  {
    title: "Tailwind CSS",
    description:
      "A utility-first CSS framework that allows developers to build custom designs rapidly without leaving their HTML. It provides predefined classes for responsiveness, layout, and theming.",
    icon: <SiTailwindcss color="#06B6D4" className="size-4 md:size-6" />,
  },
  {
    title: "NextAuth.js",
    description:
      "A flexible and secure authentication library for Next.js applications. It supports multiple authentication methods, including OAuth providers, email, and custom credentials.",
    icon: <NextAuthJSIcon className="size-4 md:size-6" />,
  },
  {
    title: "Stripe",
    description:
      "A robust payment processing platform that simplifies accepting and managing online transactions. It supports subscription models, one-time payments, and integration with various currencies.",
    icon: <SiStripe color="#008CDD" className="size-4 md:size-6" />,
  },
  {
    title: "React Email",
    description:
      "A robust solution for sending and managing emails within your application. It supports features such as transactional emails, notifications, and seamless integration with popular email services, including Gmail.",
    icon: <SiGmail color="#EA4335" className="size-4 md:size-6" />,
  },
  {
    title: "SST",
    description:
      "SST is a framework that makes it easy to build modern full-stack applications on your own infrastructure for a fraction of the cost of Vercel deployments.",
    icon: <SiSst color="#E27152" className="size-4 md:size-6" />,
  },
];

export default function Landing({ session }: { session: Session | null }) {
  const router = useRouter();

  return (
    <div className="container mx-4 w-full">
      <section className="relative overflow-hidden py-64">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 flex flex-col items-center gap-6 text-center">
              <Volleyball className="h-16 w-16" />
              <Badge variant="outline">{config.site.name}</Badge>
              <div>
                <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">
                  Build your next project with {config.site.name}
                </h1>
                <p className="text-muted-foreground lg:text-xl">
                  Scalable, fully customizable, and effortlessly deployable SaaS
                  solution.
                </p>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {session ? (
                  <Button size={"lg"} className="text-lg">
                    Explore <ChevronRight />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      router.push("/auth/signin");
                    }}
                    size={"lg"}
                    className="text-lg"
                  >
                    Get Started <ChevronRight />
                  </Button>
                )}
                <Button
                  size={"lg"}
                  className="text-lg"
                  variant="outline"
                  onClick={() => {
                    window.open(config.site.socialUrls.github, "_blank");
                  }}
                >
                  Github <ExternalLink className="ml-2 h-4" />
                </Button>
              </div>
              <div className="mt-20 flex flex-col items-center gap-4">
                <p className="text-center: text-muted-foreground lg:text-left">
                  Built with open-source technologies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {features
                    .filter((f) => f.title != "React Email")
                    .map((f) => (
                      <div key={f.title}>{f.icon}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32">
        <div className="container">
          <h1 className="text-center text-4xl font-semibold lg:text-6xl">
            The simplest SaaS starter that suits all your needs.
          </h1>
          <div className="grid gap-10 pt-9 md:grid-cols-3 lg:gap-0 lg:pt-20">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Reduce your time to develop
              </p>
              <p className="pt-4 text-7xl font-semibold lg:pt-10">4x</p>
              <p className="text-2xl font-semibold text-muted-foreground">
                quicker
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Developers have seen a decrease in
              </p>
              <p className="pt-4 text-7xl font-semibold lg:pt-10">50%</p>
              <p className="text-2xl font-semibold text-muted-foreground">
                in UI and bug fixes
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                The time it takes to build and deploy a SaaS with {config.site.name}
              </p>
              <p className="pt-4 text-7xl font-semibold lg:pt-10">3</p>
              <p className="text-2xl font-semibold text-muted-foreground">
                months
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32">
        <div className="container mx-auto max-w-screen-xl">
          <p className="mb-4 text-xs text-muted-foreground md:pl-5">Features</p>
          <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
            Our Core Features
          </h2>
          <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
            {features.map((feature, idx) => (
              <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
                <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="font-medium md:mb-2 md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
