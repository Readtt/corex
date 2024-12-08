import { CreditCard, User } from "lucide-react";

export const settingsNavItems = [
  {
    title: (
      <div className="flex flex-row">
        <User className="mr-2 h-4 w-4" />
        Account
      </div>
    ),
    href: "/settings",
  },
  {
    title: (
      <div className="flex flex-row">
        <CreditCard className="mr-2 h-4 w-4" />
        Billing
      </div>
    ),
    href: "/settings/billing",
  },
];
