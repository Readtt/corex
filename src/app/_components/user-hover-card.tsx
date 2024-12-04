import { IdCardIcon, User } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { type Session } from "next-auth"
import { type ReactNode } from "react"

export function UserHoverCard({children, session}: {children: ReactNode, session: Session}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>
              <User className="h-4 w-4 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="text-sm font-semibold">{session.user.name}</h4>
            <p className="text-xs text-muted-foreground">
              {session.user.email}
            </p>
            <div className="flex items-center pt-2">
              <IdCardIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {session.user.id}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
