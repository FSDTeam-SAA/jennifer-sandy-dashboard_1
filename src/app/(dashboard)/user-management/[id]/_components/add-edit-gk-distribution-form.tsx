"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GkDistributionStats } from "@/components/types/gk-distribution-stats-data-type";

type GkDistributionStatsFormValues = {
      keyPasses: number;
  mediumRangePasses: number;
  passes: number;
  shortPasses: number;
  passesInFinalThird: number;
  passesForward: number;
  passesInMiddleThird: number;
  passesSideways: number;
  passesInDefensiveThird: number;
  passesReceived: number;
  longPasses: number;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultData?: GkDistributionStats | null;
  playerId?: string;
}

// ----------------------
// Zod Validation Schema
// ----------------------


export const GkDistributionStatsSchema = z.object({
  keyPasses: z
    .number({ message: "Key passes must be a number" })
    .min(0, "Key passes cannot be negative"),

  mediumRangePasses: z
    .number({ message: "Medium range passes must be a number" })
    .min(0, "Medium range passes cannot be negative"),

  passes: z
    .number({ message: "Passes must be a number" })
    .min(0, "Passes cannot be negative"),

  shortPasses: z
    .number({ message: "Short passes must be a number" })
    .min(0, "Short passes cannot be negative"),

  passesInFinalThird: z
    .number({ message: "Passes in final third must be a number" })
    .min(0, "Passes in final third cannot be negative"),

  passesForward: z
    .number({ message: "Forward passes must be a number" })
    .min(0, "Forward passes cannot be negative"),

  passesInMiddleThird: z
    .number({ message: "Passes in middle third must be a number" })
    .min(0, "Passes in middle third cannot be negative"),

  passesSideways: z
    .number({ message: "Sideways passes must be a number" })
    .min(0, "Sideways passes cannot be negative"),

  passesInDefensiveThird: z
    .number({ message: "Passes in defensive third must be a number" })
    .min(0, "Passes in defensive third cannot be negative"),

  passesReceived: z
    .number({ message: "Passes received must be a number" })
    .min(0, "Passes received cannot be negative"),

  longPasses: z
    .number({ message: "Long passes must be a number" })
    .min(0, "Long passes cannot be negative"),
});

const AddEditGkDistributionForm = ({
  open,
  onOpenChange,
  defaultData,
  playerId,
}: Props) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const isEdit = Boolean(defaultData?._id);

  const form = useForm<GkDistributionStatsFormValues>({
    resolver: zodResolver(GkDistributionStatsSchema),
    defaultValues: {
  keyPasses: undefined,
  mediumRangePasses: undefined,
  passes: undefined,
  shortPasses: undefined,
  passesInFinalThird: undefined,
  passesForward: undefined,
  passesInMiddleThird: undefined,
  passesSideways: undefined,
  passesInDefensiveThird: undefined,
  passesReceived: undefined,
  longPasses: undefined,
}


  });

  // 🔁 Edit mode prefill
  useEffect(() => {
    if (defaultData) {
 form.reset({
  keyPasses: defaultData?.keyPasses ?? 0,
  mediumRangePasses: defaultData?.mediumRangePasses ?? 0,
  passes: defaultData?.passes ?? 0,
  shortPasses: defaultData?.shortPasses ?? 0,
  passesInFinalThird: defaultData?.passesInFinalThird ?? 0,
  passesForward: defaultData?.passesForward ?? 0,
  passesInMiddleThird: defaultData?.passesInMiddleThird ?? 0,
  passesSideways: defaultData?.passesSideways ?? 0,
  passesInDefensiveThird: defaultData?.passesInDefensiveThird ?? 0,
  passesReceived: defaultData?.passesReceived ?? 0,
  longPasses: defaultData?.longPasses ?? 0,
});




    }
  }, [defaultData, form]);

  // 🔥 Add / Update mutation (JSON version)
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: GkDistributionStatsFormValues) => {
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/gkdistributionstats/${defaultData?._id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/gkdistributionstats/${playerId}`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json", // 🔥 important
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values), // 🔥 send JSON
      });

      return res.json();
    },
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      toast.success(isEdit ? "Gk Distribution Stats updated" : "Gk Distribution Stats added");
      queryClient.invalidateQueries({ queryKey: ["all-gkdistributionstats"] });
      onOpenChange(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl !rounded-[12px] bg-white">
        <h3 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Gk Distribution Stats" : "Add Gk Distribution Stats"}
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className=" space-y-4"
          >


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="keyPasses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Key Passes
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Key passes"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mediumRangePasses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Medium Range Passes
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Medium range passes"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Passes
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter passes"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortPasses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                     Short Passes
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Short passes"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="passesInFinalThird"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Passes in Final Third
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter passes in final third"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passesForward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Passes Forward
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter passes forward"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


          
            <FormField
              control={form.control}
              name="passesInMiddleThird"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                    Passes in Middle Third
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Enter Passes in middle third"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="passesSideways"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Passes Sideways
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Passes sideways"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passesInDefensiveThird"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Passes in Defensive Third
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Passes in defensive third"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passesReceived"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Passes Received
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter passes received"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longPasses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Long Passes
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter long passes"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isEdit ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditGkDistributionForm;

