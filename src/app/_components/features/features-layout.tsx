"use client"

import FeaturesCard from "./features-card";

export default function FeaturesLayout() {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <p className="mb-4 text-xs text-muted-foreground md:pl-5">Features</p>
      <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
        Our Core Features
      </h2>
      <div className="mx-auto mt-14 lg:mt-20">
        <FeaturesCard />
      </div>
    </div>
  );
}
