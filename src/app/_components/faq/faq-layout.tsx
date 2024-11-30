"use client"

import { Badge } from "@/components/ui/badge";
import FAQCard from "./faq-card";

export default function FAQLayout() {
  return (
    <div className="container">
      <div className="text-center">
        <Badge className="text-xs font-medium">FAQ</Badge>
        <h1 className="mt-4 text-4xl font-semibold">
          Common Questions & Answers
        </h1>
        <p className="mt-6 font-medium text-muted-foreground">
          Find out all the essential details about our platform and how it can
          serve your needs.
        </p>
      </div>
      <div className="mx-auto mt-14 max-w-screen-sm">
        <FAQCard />
      </div>
    </div>
  );
}
