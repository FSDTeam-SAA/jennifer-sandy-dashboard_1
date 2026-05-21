"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from 'next/image'
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import logo from "../../../../../../../public/assets/images/logo.jpg"

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long.",
    }),
    rememberMe: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });


const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = decodeURIComponent(email || "")
  const router = useRouter();
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });


  const {mutate, isPending} = useMutation({
    mutationKey: ["reset-password"],
    mutationFn : async (values: {email:string, newPassword:string})=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(values)
      })
      return res.json();
    },
    onSuccess: (data)=>{
      if(!data?.success){
        toast.error(data?.message || "Something went wrong");
        return
      }else{
        toast.success(data?.message || "Password reset successfully");
        router.push("/login")
      }
    }
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload ={
      email: decodedEmail,
      newPassword: values?.password
    }
    mutate(payload)
  }
  return (
    <div className="w-full md:w-[570px] bg-white rounded-[16px] border-[2px] border-[#E7E7E7] shadow-[0px_0px_32px_0px_#0000001F] p-8">
      <div className="w-full flex items-center justify-center pb-4">
        <Link href="/">
          <Image src={logo} alt="auth logo" width={500} height={500} className="w-[290px] h-[110px] object-cover"  />
        </Link>
      </div>

      <h3 className="text-2xl md:text-[32px] lg:text-[40px] font-normal text-[#131313] text-center leading-[120%] ">
        New Password
      </h3>
      <p className="text-base font-normal text-[#616161] leading-[150%] text-center pt-2">
        Please create your new password
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 pt-5 md:pt- lg:pt-8"
        >


          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium leading-[150%] text-[#424242]">
                  Password <sup className="text-[#8C311E]">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="w-full h-[48px] text-base font-medium leading-[120%] text-black rounded-[8px] outline-none p-4 border border-[#6C6C6C] placeholder:text-[#929292]"
                      placeholder="Enter password..."
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute top-3.5 right-4"
                    >
                      {showPassword ? (
                        <Eye onClick={() => setShowPassword(!showPassword)} />
                      ) : (
                        <EyeOff
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium leading-[150%] text-[#424242]">
                  Confirm Password <sup className="text-[#8C311E]">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={confirmShowPassword ? "text" : "password"}
                      className="w-full h-[48px] text-base font-medium leading-[120%] text-black rounded-[8px] outline-none p-4 border border-[#6C6C6C] placeholder:text-[#929292]"
                      placeholder="Enter password..."
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute top-3.5 right-4"
                    >
                      {confirmShowPassword ? (
                        <Eye onClick={() => setConfirmShowPassword(!confirmShowPassword)} />
                      ) : (
                        <EyeOff
                          onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                        />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <div className="w-full flex items-center justify-between">
                <FormItem className="flex items-center gap-[10px]">
                  <FormControl className="mt-1">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-white border-primary"
                    />
                  </FormControl>
                  <Label
                    className="text-sm font-medium text-[#2A2A2A] leading-[120%]"
                    htmlFor="rememberMe"
                  >
                    Remember Me
                  </Label>
                  <FormMessage className="text-red-500" />
                </FormItem>
              </div>
            )}
          />
          <div className="pt-2">
            <Button
              disabled={isPending}
              className={`text-base font-medium text-white cursor-pointer leading-[120%] rounded-[8px] py-4 w-full h-[51px] ${isPending ? "opacity-50 cursor-not-allowed" : "bg-primary"
                }`}
              type="submit"
            >
              {isPending ? "Loading..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>

  );
};

export default ResetPasswordForm;
