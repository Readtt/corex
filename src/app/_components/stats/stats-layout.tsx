"use client"

import config from "@/config";

export default function StatsLayout() {
  return (
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
          <p className="text-2xl font-semibold text-muted-foreground">months</p>
        </div>
      </div>
    </div>
  );
}
