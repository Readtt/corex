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
import { accountFormSchema } from "@/server/api/schemas";
import { api } from "@/trpc/react";
import { type Session } from "@auth/core/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm({ session }: { session: Session | null }) {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const { mutate: updateName, isPending } = api.user.updateName.useMutation({
    onSuccess: () => {
      toast.success("Success!", {
        description:
          "Your name has been changed successfully. Refresh the page for it to take effect.",
      });
    },
    onError: (error) => {
      toast.error("There was a problem", {
        description: error.message,
        action: {
          label: "Try again",
          onClick: () => updateName({ name: form.getValues().name }),
        },
      });
    },
  });

  function onSubmit(data: AccountFormValues) {
    updateName({ name: data.name });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={session?.user?.name ?? ""} {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          Update account{" "}
          {isPending && <Loader2 className="ml-0.5 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
