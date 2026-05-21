"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  rememberMe: z.boolean(),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });


   async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res) {
        toast.error("No response from server");
        return;
      }

      if (res.error) {
        if (res.error === "ADMIN_ONLY") {
          toast.error("Only admin can access this admin dashboard");
          return;
        }

        if (
          res.error === "INVALID_CREDENTIALS" ||
          res.error === "CredentialsSignin"
        ) {
          toast.error("Email or Password wrong");
          return;
        }

        toast.error(res.error || "Login failed");
        return;
      }

      if (res.ok) {
        toast.success("Login successful!");

        // Full reload so middleware can detect fresh token properly
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="w-full max-w-[496px] px-4">
      <div className="absolute top-8 right-8 hidden md:block">
        <Link href="/" className="text-sm text-gray-500 font-medium transition-colors hover:text-primary hover:underline">
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-8">
        <h3 className="text-3xl md:text-[36px] font-bold text-primary mb-2">
          Welcome
        </h3>
        <p className="text-sm md:text-base text-gray-500">
          Access your account to manage tours, leads, and listings
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[48px] text-base font-medium leading-[120%] text-black rounded-[8px] outline-none p-4 border border-gray-300 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="hello@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="w-full h-[48px] text-base font-medium leading-[120%] text-black rounded-[8px] outline-none p-4 border border-gray-300 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-12"
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <Eye size={20} onClick={() => setShowPassword(!showPassword)} />
                      ) : (
                        <EyeOff
                          size={20}
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
            name="rememberMe"
            render={({ field }) => (
              <div className="w-full flex items-center justify-between pt-1">
                <FormItem className="flex items-center gap-[8px] space-y-0">
                  <FormControl>
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-white border-gray-300 rounded-[4px]"
                    />
                  </FormControl>
                  <Label
                    className="text-sm font-normal text-gray-600 cursor-pointer"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </Label>
                  <FormMessage className="text-red-500" />
                </FormItem>
                <Link
                  className="text-sm font-medium text-primary hover:underline"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            )}
          />
          <div className="pt-4">
            <Button
              disabled={isLoading}
              className={`text-base font-medium text-white cursor-pointer leading-[120%] rounded-[8px] py-4 w-full h-[51px] transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
                }`}
              type="submit"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
