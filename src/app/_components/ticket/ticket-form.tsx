"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ticketFormSchema, ticketProblems, ticketSeverity } from "@/server/api/schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type Session } from "next-auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

export default function TicketForm({ session }: { session: Session }) {
  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      email: session.user.email ?? "",
      problem: ticketProblems[0],
      severity: ticketSeverity[0],
      subject: "",
      description: "",
    },
  });

  const { mutate: createTicket, isPending } =
    api.ticket.createTicket.useMutation({
      onSuccess: () => {
        toast.success("Success!", {
          description:
            "Your ticket has been created. You will receive a reply in your inbox.",
        });
      },
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
          action: {
            label: "Try again",
            onClick: () => createTicket({ ...form.getValues() }),
          },
        });
      },
    });

  function onSubmit(values: z.infer<typeof ticketFormSchema>) {
    createTicket({ ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Problem</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a problem" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketProblems.map((problem) => (
                        <SelectItem key={problem} value={problem}>
                          {problem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Severity</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketSeverity.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Please include all information relevant to your issue."
                />
              </FormControl>
              <FormDescription>
                Please add a description before submitting your request.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isPending} type="submit">
            Submit Ticket
            {isPending && <Loader2 className="ml-0.5 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
