"use client";

import config from "@/config";
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Volleyball } from "lucide-react";
import { Button } from "../ui/button";

interface Section {
  title: string;
  links: SubSection[];
}

interface SubSection {
  name: string;
  href: string;
}

const sections: Section[] = [
  // {
  //   title: "Product",
  //   links: [
  //     { name: "Overview", href: "#" },
  //     { name: "Pricing", href: "#" },
  //     { name: "Marketplace", href: "#" },
  //     { name: "Features", href: "#" },
  //   ],
  // },
  // {
  //   title: "Company",
  //   links: [
  //     { name: "About", href: "#" },
  //     { name: "Team", href: "#" },
  //     { name: "Blog", href: "#" },
  //     { name: "Careers", href: "#" },
  //   ],
  // },
  // {
  //   title: "Resources",
  //   links: [
  //     { name: "Help", href: "#" },
  //     { name: "Sales", href: "#" },
  //     { name: "Advertise", href: "#" },
  //     { name: "Privacy", href: "#" },
  //   ],
  // },
];

const Footer = () => {
  return (
    <div className="flex w-full justify-center pb-6">
      <footer className="container">
        <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
          <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
            <div>
              <span className="flex items-center justify-center gap-4 lg:justify-start">
                <Volleyball className="h-11 w-11" />
                <p className="text-3xl font-semibold">{config.site.name}</p>
              </span>
              <p className="mt-6 text-sm text-muted-foreground">
                Scalable, fully customizable, and effortlessly deployable SaaS
                solution.
              </p>
            </div>
            <ul className="flex items-center space-x-2 text-muted-foreground">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(config.site.socialUrls.instagram, "_blank")
                }
              >
                <SiInstagram color="#E4405F" className="size-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(config.site.socialUrls.facebook, "_blank")
                }
              >
                <SiFacebook color="#0866FF" className="size-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(config.site.socialUrls.twitter, "_blank")
                }
              >
                <SiX className="size-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(config.site.socialUrls.github, "_blank")
                }
              >
                <SiGithub className="size-6" />
              </Button>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-6 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
          <p>© 2024 {config.site.name}. All rights reserved.</p>
          <ul className="flex justify-center gap-4 lg:justify-start">
            <li className="hover:text-primary">
              <a href="#"> Terms and Conditions</a>
            </li>
            <li className="hover:text-primary">
              <a href="#"> Privacy Policy</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
