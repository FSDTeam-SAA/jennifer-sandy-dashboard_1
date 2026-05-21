"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlayerReport } from "@/components/types/last-player-report-data-type";

type LastPlayerReportFormValues = {
  date: string;
  category: string;
  gameTitle: string;
  rating: number;
  position: string[];
  minutesPlayed: number;
  deFensiveSummary: string;
  strengths: string;
  offensiveSummary: string;
  weaknesses: string;
  distributionSummary: string;
  generalComments: string;
  numberOfGames: number;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultData?: PlayerReport | null;
  playerId?: string;
}

// ----------------------
// Zod Validation Schema
// ----------------------
export const lastPlayerReportSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required"),

  category: z
    .string()
    .min(1, "Category is required"),

  gameTitle: z
    .string()
    .min(1, "Game title is required"),

  rating: z
    .number({ message: "Rating must be a number" })
    .min(0, "Rating cannot be less than 0")
    .max(10, "Rating cannot be more than 10"),

  position: z.array(z.string()).min(1, "Select at least one position").max(2, "Maximum 2 positions"),

  minutesPlayed: z
    .number({ message: "Minutes played must be a number" })
    .min(0, "Minutes played cannot be negative"),

      numberOfGames: z
    .number({ message: "Number Of Game must be a number" })
    .min(0, "Number Of Game cannot be negative"),

  deFensiveSummary: z
    .string()
    .min(1, "Defensive summary is required"),

  strengths: z
    .string()
    .min(1, "Strengths is required"),

  offensiveSummary: z
    .string()
    .min(1, "Offensive summary is required"),

  weaknesses: z
    .string()
    .min(1, "Weaknesses is required"),

  distributionSummary: z
    .string()
    .min(1, "Distribution summary is required"),

  generalComments: z
    .string()
    .min(1, "General comments is required"),
});


const AddEditLastPlayerReportForm = ({
  open,
  onOpenChange,
  defaultData,
  playerId,
}: Props) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const isEdit = Boolean(defaultData?._id);

        const POSITIONS = [
        { label: "GK", value: "gk" },
        { label: "RB", value: "rb" },
        { label: "LB", value: "lb" },
        { label: "CBL", value: "cbl" },
        { label: "CBR", value: "cbr" },
        { label: "CM", value: "cm" },
        { label: "AML", value: "aml" },
        { label: "AMR", value: "amr" },
        { label: "RW", value: "rw" },
        { label: "LW", value: "lw" },
        { label: "10", value: "10" },
        { label: "Striker", value: "striker" },
    ]

  const form = useForm<LastPlayerReportFormValues>({
    resolver: zodResolver(lastPlayerReportSchema),
    defaultValues: {
      date: "",
      category: "",
      gameTitle: "",
      numberOfGames: undefined,
      rating: undefined,
      position: [],
      minutesPlayed: undefined,
      deFensiveSummary: "",
      strengths: "",
      offensiveSummary: "",
      weaknesses: "",
      distributionSummary: "",
      generalComments: "",
    },

  });

  // 🔁 Edit mode prefill
  useEffect(() => {
    if (defaultData) {
      form.reset({
        date: moment(defaultData.date).format("YYYY-MM-DD"),
        category: defaultData.category ?? "",
        gameTitle: defaultData.gameTitle ?? "",
        rating: defaultData.rating ?? 0,
        numberOfGames: defaultData?.numberOfGames ?? 0,
        position: defaultData.position ?? "",
        minutesPlayed: defaultData.minutesPlayed ?? 0,
        deFensiveSummary: defaultData.deFensiveSummary ?? "",
        strengths: defaultData.strengths ?? "",
        offensiveSummary: defaultData.offensiveSummary ?? "",
        weaknesses: defaultData.weaknesses ?? "",
        distributionSummary: defaultData.distributionSummary ?? "",
        generalComments: defaultData.generalComments ?? "",
      });

    }
  }, [defaultData, form]);

  // 🔥 Add / Update mutation (JSON version)
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LastPlayerReportFormValues) => {
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/player-rapot/${defaultData?._id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/player-rapot/${playerId}`;

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

      toast.success(isEdit ? "Player report updated" : "Player report added");
      queryClient.invalidateQueries({ queryKey: ["all-player-report"] });
      onOpenChange(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl !rounded-[12px] bg-white">
        <h3 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Last Player Report" : "Add Last Player Report"}
        </h3>

        <div className="max-h-[550px] overflow-y-auto pr-2">
      <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className=" space-y-4"
          >

            <div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Debut Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal leading-[150%] text-[#131313]">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#645949] text-base font-medium leading-[120%] text-[#131313]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="h-[200px] overflow-y-auto bg-white">
                          <SelectItem value="semi-professional">Semi Professional</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="adult">Adult</SelectItem>
                          <SelectItem value="U9">U9</SelectItem>
                          <SelectItem value="U10">U10</SelectItem>
                          <SelectItem value="U11">U11</SelectItem>
                          <SelectItem value="U12">U12</SelectItem>
                          <SelectItem value="U13">U13</SelectItem>
                          <SelectItem value="U14">U14</SelectItem>
                          <SelectItem value="U15">U15</SelectItem>
                          <SelectItem value="U16">U16</SelectItem>
                          <SelectItem value="U17">U17</SelectItem>
                          <SelectItem value="U18">U18</SelectItem>
                          <SelectItem value="U19">U19</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gameTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Game Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        {...field}
                        placeholder="Enter team name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Rating
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Rating"
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal leading-[150%] text-[#131313]">
                      Position (select up to 2)
                    </FormLabel>

                    <Popover >
                      <PopoverTrigger asChild>
                        <FormControl >
                          <Button
                            variant="outline"
                            className="w-full justify-between h-[48px] border border-[#645949]"
                          >
                            {field.value?.length
                              ? field.value
                                .map(
                                  (v) =>
                                    POSITIONS.find((p) => p.value === v)?.label
                                )
                                .join(", ")
                              : "Select position"}

                            <span className="ml-2">▾</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="max-w-[220px] p-3 bg-white">
                        <div className="space-y-2">
                          {POSITIONS.map((pos) => {
                            const checked = field.value?.includes(pos.value)
                            const disabled =
                              !checked && field.value?.length >= 2

                            return (
                              <label
                                key={pos.value}
                                className={`flex items-center gap-3 text-sm cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  disabled={disabled}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      field.onChange([...field.value, pos.value])
                                    } else {
                                      field.onChange(
                                        field.value.filter((v) => v !== pos.value)
                                      )
                                    }
                                  }}
                                  className="h-4 w-4 accent-black"
                                />
                                {pos.label}
                              </label>
                            )
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minutesPlayed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Minutes Played
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Minutes played"
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
                name="numberOfGames"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Number Of Games
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter Number Of games"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-[44px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
             

             <FormField
                control={form.control}
                name="deFensiveSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Defensive Summary
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[70px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        {...field}
                        placeholder="Enter team name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="strengths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Strengths
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[70px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        {...field}
                        placeholder="Enter team name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offensiveSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Offensive Summary
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[70px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        {...field}
                        placeholder="Enter team name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weaknesses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Weaknesses
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[70px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        {...field}
                        placeholder="Enter team name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="distributionSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      Distribution Summary
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[70px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        {...field}
                        placeholder="Enter team name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="generalComments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base leading-[120%] font-semibold text-[#131313]">
                      General Comments
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[70px] w-full rounded-[12px] text-base leading-[120%] text-[#131313] font-medium border border-[#645949]"
                        {...field}
                        placeholder="Enter team name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

        </div>

        
      </DialogContent>
    </Dialog>
  );
};

export default AddEditLastPlayerReportForm;

