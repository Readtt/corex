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
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

export default function WaitlistForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: addEmail, isPending } = api.waitlist.addEmail.useMutation({
    onSuccess: () => {
      toast.success("Success!", {
        description:
          "You have been added to the waitlist. You will be notified when your spot is ready.",
      });
    },
    onError: (error) => {
      toast.error("There was a problem", {
        description: error.message,
        action: {
          label: "Try again",
          onClick: () => addEmail({ email: form.getValues().email }),
        },
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addEmail({ email: values.email });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the email you want to be notified with
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          Join the waitlist
          {isPending && <Loader2 className="ml-0.5 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
