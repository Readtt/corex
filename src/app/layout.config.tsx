import config from "@/config";
import { type BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Volleyball } from "lucide-react";

export const baseOptions: BaseLayoutProps = {
  githubUrl: config.site.socialUrls.github,
  nav: {
    title: (
      <div className="flex flex-row items-center gap-2">
        <Volleyball className="h-6 w-6" />{" "}
        <span className="text-lg font-bold">{config.site.name}</span>
      </div>
    ),
  },
};
