"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import config from "@/config";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ChevronRight, ExternalLink, Volleyball } from "lucide-react";
import { features } from "../features/features-card";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function HeroLayout({ session }: { session: Session | null }) {
  const router = useRouter();

  return (
    <div className="container">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <div className="z-10 flex flex-col items-center gap-6 text-center">
          <Volleyball className="h-16 w-16" />
          <Badge variant="outline">{config.site.name}</Badge>
          <div>
            <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">
              Build your next project with{" "}
              <span className="bg-yellow-400 dark:text-primary-foreground">
                {config.site.name}
              </span>
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
              <SiGithub /> Github <ExternalLink className="ml-2 h-4" />
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
  );
}
