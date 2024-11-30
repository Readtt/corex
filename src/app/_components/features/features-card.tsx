"use client"

import NextAuthJSIcon from "@/components/icons/NextAuthJSIcon";
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

export const features = [
  {
    title: "Next.js",
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

export default function FeaturesCard() {
  return (
    <div className="grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6">
      {features.map((feature, idx) => (
        <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
          <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
            {feature.icon}
          </span>
          <div>
            <h3 className="font-medium md:mb-2 md:text-xl">{feature.title}</h3>
            <p className="text-sm text-muted-foreground md:text-base">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
