import { env } from "@/env";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (env.SITE_URL) return `https://${env.SITE_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function timeElapsed(date: Date | string): string {
  const now = new Date();
  const past = typeof date === "string" ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const count = Math.floor(diffInSeconds / unit.seconds);
    if (count > 0) {
      return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}