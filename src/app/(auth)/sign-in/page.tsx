"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller'
  const origin = searchParams.get('origin')


  const continueAsSeller = () => {
    router.push("?as=seller")
    // router.refresh()
  }

  const continueAsBuyer = () => {
    router.push('/sign-in', undefined)
    // router.refresh()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  console.log("input errors:" + errors);


  const { mutate: signIn, isLoading } = 
    trpc.auth.signIn.useMutation({
      onSuccess: () => {
        toast.success("Signed in successfully")


        // if coming from another router e.g. the cart and came to sign-in, send user back to origin route
        if(origin) {
          console.log('success')
          router.push(`/${origin}`)
          router.refresh()
          return
        }

        if(isSeller) {
          router.push('/sell')
          router.refresh()
          return
        }

        router.push('/')
        router.refresh()
      },
      onError: (err) => {
        if(err.data?.code === "UNAUTHORIZED") {
          toast.error("invalid email or password.")
        }
      }
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    // send data to the server
    signIn({ email, password });
    // console.log(errors);
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src="/web-icons/fox_head_01.png"
              alt="fox-icon"
              height={120}
              width={120}
            />
            {isSeller ? (
              <h1 className="text-2xl font-bold">Sign in as a merchant</h1>
            ) : (
              <h1 className="text-2xl font-bold">Sign in as a buyer</h1>
            )}

            <Link
              className={buttonVariants({
                variant: "link",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account? Sign-up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />

                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />

                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button>
                  Sign In
                  {isLoading && (
                    <Loader2 className="animate-spin text-muted-foreground" />
                  )}
                </Button>
              </div>
            </form>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sx uppercase">
                <span className="bg-background px-2 text-muted-foreround">
                  or
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as merchant
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
