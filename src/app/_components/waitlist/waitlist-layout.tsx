"use client"

import WaitlistCard from "./waitlist-card";

export default function WaitlistLayout() {
  return (
    <div className="container">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
        <div className="mx-auto flex max-w-sm flex-col justify-center gap-10">
          <div className="text-center lg:text-left">
            <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
              Waitlist
            </h1>
            <p className="text-muted-foreground">
              When this product is available, you will be the first to know!
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-screen-md gap-6 p-10">
          <WaitlistCard />
        </div>
      </div>
    </div>
  );
}
