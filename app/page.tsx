"use client"

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Placeholder from "@/public/placeholder.svg"

const supabase = createClient('https://ssotyzpozkqtorkecznm.supabase.co', 'sb_publishable_lpD6iG5tC9Wi3v_VFfBVSg_tR2AFyjT')

interface LoginInputs {
  Email: string
  Password: string
}

export default function Home() {
  const { register, control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => async function signIn() {
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: data.Email,
      password: data.Password
    })
    console.log(errors);
  }

  // const onSubmit = (data: any) => async function signIn() {
  //   const { data: signInData, error } = await supabase.auth.signInWithPassword({
  //     email: data.Email,
  //     password: data.Password
  //   })
  //   console.log(errors);
  // }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                id="sign-in-form"
                className="p-6 md:p-8"
              >
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your Jobable account
                    </p>
                  </div>

                  {/* Fields */}
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("Email", { required: true })}
                    />
                  </Field>

                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...register("Password", { required: true })} />
                  </Field>

                  {/* Submit button */}
                  <Link href="/dashboard">
                    <Button className="w-full transition-none" asChild>
                      <motion.button whileTap={{ scale: 0.85 }}>Login</motion.button>
                    </Button>
                  </Link>

                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  <Field className="grid grid-cols-3 gap-4">

                    {/* Microsoft sign-in */}
                    <Button variant="outline" type="button" className="transition-none" asChild>
                      <motion.button whileTap={{ scale: 0.85 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                          <path d="M3 3H11V11H3V3Z" fill="#000000" />
                          <path d="M3 13H11V21H3V13Z" fill="#000000" />
                          <path d="M13 3H21V11H13V3Z" fill="#000000" />
                          <path d="M13 13H21V21H13V13Z" fill="#000000" />
                        </svg>
                        <span className="sr-only">Login with Microsoft</span>
                      </motion.button>
                    </Button>

                    {/* Google sign-in */}
                    <Button variant="outline" type="button" className="transition-none" asChild>
                      <motion.button whileTap={{ scale: 0.85 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="sr-only">Login with Google</span>
                      </motion.button>
                    </Button>

                    {/* Magic Link sign-in */}
                    <Button variant="outline" type="button" className="transition-none" asChild>
                      <motion.button whileTap={{ scale: 0.85 }}>
                        Magic Link
                      </motion.button>
                    </Button>

                  </Field>
                </FieldGroup>
              </form>
              <div className="bg-muted relative hidden md:block">
                <Image className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" src={Placeholder} alt={"Placeholder"} />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
