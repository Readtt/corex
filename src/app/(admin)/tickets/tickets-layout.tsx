"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, timeElapsed } from "@/lib/utils";
import { api, type RouterOutputs } from "@/trpc/react";
import { TicketStatus } from "@prisma/client";
import {
  Activity,
  CalendarArrowUp,
  DoorClosed,
  ExternalLink,
  Loader2,
  Tickets,
} from "lucide-react";
import OverviewCard from "./components/overview-card";
import TicketsTableLayout from "./components/tickets-table-layout";
import { Session } from "next-auth";

// turn this into multiple components
export default function TicketsLayout({session}: {session: Session}) {
  const queries = api.useQueries((t) => [
    // enable on overview value
    t.ticket.getTicketCount({}),
    t.ticket.getTicketCount({ sinceInMinutes: 60 }),

    t.ticket.getTicketCount({
      statuses: [TicketStatus.IN_PROGRESS],
    }),
    t.ticket.getTicketCount({
      statuses: [TicketStatus.IN_PROGRESS],
      sinceInMinutes: 60,
    }),

    t.ticket.getTicketCount({ statuses: [TicketStatus.OPEN] }),
    t.ticket.getTicketCount({
      statuses: [TicketStatus.OPEN],
      sinceInMinutes: 60,
    }),

    t.ticket.getTicketCount({ statuses: [TicketStatus.PENDING] }),
    t.ticket.getTicketCount({
      statuses: [TicketStatus.PENDING],
      sinceInMinutes: 60,
    }),

    t.ticket.getTicketCountLastMonths({ monthsAgo: 3 }),
    t.ticket.getRecentTickets({ count: 5, statuses: [TicketStatus.OPEN] }),

    t.ticket.getTicketCount({ statuses: [TicketStatus.CLOSED] }),
    t.ticket.getTicketCount({
      statuses: [TicketStatus.CLOSED],
      sinceInMinutes: 60,
    }),
  ]);

  const [
    ticketCount,
    ticketCountSinceHour,

    activeTicketsCount,
    activeTicketsCountSinceHour,

    openTicketsCount,
    openTicketsCountSinceHour,

    pendingTicketsCount,
    pendingTicketsCountSinceHour,

    ticketsSinceMonthsCount,

    recentOpenTickets,

    closedTicketsCount,
    closedTicketsCountSinceHour,
  ] = queries;

  const isLoading = queries.some((query) => query.isLoading);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tickets <Badge className="m-1 ml-1 p-0 px-2">ALL</Badge>
                    </CardTitle>
                    <Tickets className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{ticketCount.data?.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{ticketCountSinceHour.data?.toLocaleString()} since last
                      hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Open Tickets{" "}
                      <Badge className="m-1 ml-1 p-0 px-2">
                        {TicketStatus.OPEN}
                      </Badge>
                    </CardTitle>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{openTicketsCount.data?.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{openTicketsCountSinceHour.data?.toLocaleString()} since
                      last hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Closed Tickets{" "}
                      <Badge className="m-1 ml-1 p-0 px-2">
                        {TicketStatus.CLOSED}
                      </Badge>
                    </CardTitle>
                    <DoorClosed className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{closedTicketsCount.data?.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{closedTicketsCountSinceHour.data?.toLocaleString()}{" "}
                      since last hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now{" "}
                      <Badge className="m-1 ml-1 p-0 px-2">
                        {TicketStatus.IN_PROGRESS}
                      </Badge>
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{activeTicketsCount.data?.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{activeTicketsCountSinceHour.data?.toLocaleString()}{" "}
                      since last hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Tickets{" "}
                      <Badge className="m-1 ml-1 p-0 px-2">
                        {TicketStatus.PENDING}
                      </Badge>
                    </CardTitle>
                    <CalendarArrowUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{pendingTicketsCount.data?.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{pendingTicketsCountSinceHour.data?.toLocaleString()}{" "}
                      since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <OverviewCard chartData={ticketsSinceMonthsCount.data ?? []} />
                <Card className="col-span-4 overflow-y-auto lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recently Opened Tickets</CardTitle>
                    <CardDescription>
                      +{openTicketsCount.data?.toLocaleString()} tickets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[200px]">
                    <div className="flex flex-col space-y-4 pb-4">
                      {recentOpenTickets.data?.map((ticket, index) => (
                        <div key={index} className="">
                          <TicketListItem {...ticket} />
                          {index < recentOpenTickets.data.length - 1 && (
                            <Separator className="my-2 mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="tickets" className="space-x-4">
          <TicketsTableLayout session={session} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TicketListItem(
  ticket: RouterOutputs["ticket"]["getRecentTickets"][0],
) {
  return (
    <div className="rounded pl-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-grow overflow-hidden">
          <div className="mb-2 flex flex-row items-center gap-2">
            <Badge variant="outline">{ticket.problem}</Badge>
            <Badge variant="secondary">
              <div
                className={cn("mr-2 h-2 w-2 rounded-full", {
                  "bg-yellow-500": ticket.severity == "Low",
                  "bg-muted-foreground": ticket.severity == "Normal",
                  "bg-orange-500": ticket.severity == "High",
                  "bg-red-500": ticket.severity == "Urgent",
                })}
              />
              {ticket.severity}
            </Badge>
            <div className="flex flex-1 justify-end">
              <span className="text-xs text-muted-foreground">
                {timeElapsed(ticket.createdAt)}
              </span>
            </div>
          </div>
          <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {ticket.subject}
          </div>
          <div className="text-xs text-muted-foreground">{ticket.email}</div>
        </div>
      </div>
    </div>
  );
}
