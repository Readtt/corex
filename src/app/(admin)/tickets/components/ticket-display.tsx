import { UserHoverCard } from "@/app/_components/user-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskPanel, TaskPanelItem } from "@/components/ui/task-panel";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, timeElapsed } from "@/lib/utils";
import { api } from "@/trpc/react";
import { TicketStatus } from "@prisma/client";
import {
  Check,
  ChevronsUpDown,
  Loader2,
  Lock,
  Mail,
  MoreHorizontal,
  PanelRightCloseIcon,
  User,
} from "lucide-react";
import { type Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface TicketDisplayProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  ticketId?: string;
  session: Session;
}

function Loading() {
  return (
    <>
      <SheetHeader>
        <div className="flex flex-row border-b pb-4">
          <div className="flex flex-1 gap-2">
            <Skeleton className="h-6 w-32"></Skeleton>
          </div>
          <div className="flex">
            <SheetClose asChild>
              <Button variant={"ghost"} size={"icon"} className="h-6 text-xs">
                <PanelRightCloseIcon />{" "}
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose>
          </div>
        </div>
        <SheetTitle className="pt-2">
          <Skeleton className="h-6 w-7/12" />
        </SheetTitle>
        <SheetDescription>Make changes to this ticket here.</SheetDescription>
      </SheetHeader>
      <div>
        <div className="flex w-full flex-col items-center justify-center space-y-4 p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    </>
  );
}

export function TicketDisplay({
  open,
  ticketId,
  setIsOpen,
  session,
}: TicketDisplayProps) {
  const [ticketStatusValue, setTicketStatusValue] = useState<
    TicketStatus | undefined
  >();
  const [showTicketStatusPopover, setShowTicketStatusPopover] =
    useState<boolean>(false);

  const utils = api.useUtils();

  const { data: ticket, isLoading } = api.ticket.getTicketById.useQuery(
    {
      id: ticketId ?? "",
    },
    { enabled: ticketId != undefined },
  );

  useEffect(() => {
    setTicketStatusValue(ticket?.status);
  }, [ticket]);

  const { mutate: updateTicketById, isPending: isUpdatingTicket } =
    api.ticket.updateTicketById.useMutation({
      onSuccess: async () => {
        await utils.ticket.invalidate();

        toast.success("Success!", {
          description: "Your ticket has been updated successfully.",
        });
      },
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
        });
      },
    });

  const { mutate: deleteTicketById, isPending: isTicketDeleting } =
    api.ticket.deleteTicketById.useMutation({
      onSuccess: async () => {
        await utils.ticket.invalidate();
        await utils.ticket.getTicketById.invalidate();

        toast.success("Success!", {
          description: "This ticket has been deleted.",
        });
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
          action: {
            label: "Try again",
            onClick: () => deleteTicketById({ id: ticket?.id ?? "" }),
          },
        });
      },
    });

  if (!ticketId) return <></>;

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col p-0 sm:max-w-none [&>button]:hidden">
        <div className="overflow-auto p-6">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <SheetHeader>
                <div className="flex flex-row border-b pb-4">
                  <div className="flex flex-1 gap-2">
                    <Button
                      variant={
                        ticket?.status == TicketStatus.CLOSED
                          ? "secondary"
                          : "outline"
                      }
                      disabled={isUpdatingTicket}
                      size={"sm"}
                      className="h-6 text-xs"
                      onClick={() => {
                        if (ticket?.status == TicketStatus.CLOSED) {
                          updateTicketById({
                            id: ticket?.id ?? "",
                            status: TicketStatus.OPEN,
                          });
                        } else {
                          updateTicketById({
                            id: ticket?.id ?? "",
                            status: TicketStatus.CLOSED,
                          });
                        }
                      }}
                    >
                      {isUpdatingTicket ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="" />
                      )}
                      {ticket?.status == TicketStatus.CLOSED
                        ? "Closed"
                        : "Mark Closed"}
                    </Button>
                  </div>
                  <div className="flex">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex h-6">
                          <MoreHorizontal />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                          disabled={isTicketDeleting}
                          onClick={() => {
                            deleteTicketById({ id: ticket?.id ?? "" });
                          }}
                        >
                          {isTicketDeleting && (
                            <Loader2 className="mr-0.5 w-4 animate-spin" />
                          )}{" "}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <SheetClose asChild>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="h-6 text-xs"
                      >
                        <PanelRightCloseIcon />{" "}
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
                <SheetTitle className="flex flex-col items-center gap-2 pt-2 md:flex-row">
                  <div className="flex text-start">{ticket?.subject}</div>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center">
                      <Badge variant={"secondary"}>{ticket?.problem}</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      The general category of the ticket&apos;s context
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-xs text-muted-foreground">
                    {timeElapsed(ticket?.createdAt ?? new Date())}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <TaskPanel className="py-8">
                <TaskPanelItem
                  label="Initiator"
                  tooltip="The email to use when replying to this user's ticket"
                >
                  <UserHoverCard session={session}>
                    <Button variant={"ghost"}>
                      <div className="flex flex-row items-center gap-2">
                        <Avatar className="relative h-6 w-6">
                          <AvatarImage src={session.user.image ?? ""} />
                          <AvatarFallback>
                            <User className="h-4 w-4 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <span> {session.user.name}</span>
                      </div>
                    </Button>
                  </UserHoverCard>
                </TaskPanelItem>

                <TaskPanelItem
                  label="Severity"
                  tooltip="How severe this ticket should be taken"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Badge variant="secondary" className="w-fit">
                      <div
                        className={cn("mr-2 h-2 w-2 rounded-full", {
                          "bg-yellow-500": ticket?.severity == "Low",
                          "bg-muted-foreground": ticket?.severity == "Normal",
                          "bg-orange-500": ticket?.severity == "High",
                          "bg-red-500": ticket?.severity == "Urgent",
                        })}
                      />
                      {ticket?.severity}
                    </Badge>
                    <LockedByInitiator />
                  </div>
                </TaskPanelItem>

                <TaskPanelItem
                  label="Status"
                  tooltip="The status of the ticket"
                >
                  {!showTicketStatusPopover && (
                    <Badge
                      onClick={() => {
                        setShowTicketStatusPopover(!showTicketStatusPopover);
                      }}
                      className="cursor-pointer"
                      variant={"secondary"}
                    >
                      <div
                        className={cn("mr-2 h-2 w-2 rounded-full", {
                          "bg-green-500":
                            ticketStatusValue == TicketStatus.OPEN,
                          "bg-yellow-500":
                            ticketStatusValue == TicketStatus.PENDING,
                          "bg-orange-500":
                            ticketStatusValue == TicketStatus.IN_PROGRESS,
                          "bg-red-500":
                            ticketStatusValue == TicketStatus.CLOSED,
                        })}
                      />
                      {ticketStatusValue}
                    </Badge>
                  )}
                  <Popover
                    open={showTicketStatusPopover && !isUpdatingTicket}
                    onOpenChange={(o) => setShowTicketStatusPopover(o)}
                  >
                    <PopoverTrigger asChild>
                      {showTicketStatusPopover && (
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="justify-between"
                          disabled={isUpdatingTicket}
                        >
                          {ticketStatusValue ? (
                            <Badge variant={"secondary"}>
                              <div
                                className={cn("mr-2 h-2 w-2 rounded-full", {
                                  "bg-green-500":
                                    ticketStatusValue == TicketStatus.OPEN,
                                  "bg-yellow-500":
                                    ticketStatusValue == TicketStatus.PENDING,
                                  "bg-orange-500":
                                    ticketStatusValue ==
                                    TicketStatus.IN_PROGRESS,
                                  "bg-red-500":
                                    ticketStatusValue == TicketStatus.CLOSED,
                                })}
                              />
                              {ticketStatusValue}
                            </Badge>
                          ) : (
                            "Select status..."
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      )}
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search status..." />
                        <CommandList>
                          <CommandEmpty>No status found.</CommandEmpty>
                          <CommandGroup>
                            {Object.keys(TicketStatus).map((s) => (
                              <CommandItem
                                key={s}
                                value={s}
                                onSelect={(currentValue) => {
                                  if (
                                    (currentValue as TicketStatus) !=
                                    ticketStatusValue
                                  ) {
                                    setTicketStatusValue(
                                      currentValue as TicketStatus,
                                    );
                                    toast.success("Loading...", {
                                      description: "Your ticket is updating.",
                                    });
                                    updateTicketById({
                                      id: ticket?.id ?? "",
                                      status: currentValue as TicketStatus,
                                    });
                                  }
                                  setShowTicketStatusPopover(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    ticketStatusValue === s
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                <Badge variant={"secondary"}>
                                  <div
                                    className={cn("mr-2 h-2 w-2 rounded-full", {
                                      "bg-green-500": s == TicketStatus.OPEN,
                                      "bg-yellow-500":
                                        s == TicketStatus.PENDING,
                                      "bg-orange-500":
                                        s == TicketStatus.IN_PROGRESS,
                                      "bg-red-500": s == TicketStatus.CLOSED,
                                    })}
                                  />
                                  {s}
                                </Badge>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </TaskPanelItem>
              </TaskPanel>
              <div className="space-y-2 pb-6">
                <Textarea disabled value={ticket?.description ?? ""} />
                <LockedByInitiator />
              </div>
              <SheetFooter>
                <Link
                  className={buttonVariants({ variant: "default" })}
                  href={`mailto:${session.user.email}`}
                  target="_blank"
                >
                  <Mail /> Email {session.user.name}
                </Link>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function LockedByInitiator() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex flex-row items-center gap-2 text-muted-foreground">
          <Lock className="h-4 w-4" />
          <span className="text-xs">Locked by Initiator</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>This content is not editable</TooltipContent>
    </Tooltip>
  );
}
