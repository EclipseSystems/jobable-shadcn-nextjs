"use client";

// Import Supabase
import { createClient } from "@supabase/supabase-js";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { PageTitle, SubHeading } from "@/components/layout/formatting";
import { genders, states } from "@/lib/options";
import { toast, Toaster } from "sonner";

const supabase = createClient("https://ssotyzpozkqtorkecznm.supabase.co", "sb_publishable_lpD6iG5tC9Wi3v_VFfBVSg_tR2AFyjT");

const formSchema = z.object({
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  gender: z.string(),
  birth_date: z.iso.date(),
  email_address: z.email(),
  mobile_number: z.string(),
  home_phone: z.string(),
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  postcode: z.string()
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data)
    // toast.success('Action completed successfully!', {
    //   style: {
    //     '--normal-bg':
    //       'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
    //     '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
    //     '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
    //   } as React.CSSProperties
    // })

    console.log(data);
    const dateValue = new Date().toISOString;
    const { error } = await supabase.from("clients").insert({
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      gender: data.gender,
      birth_date: data.birth_date,
      email_address: data.email_address,
      mobile_number: data.mobile_number,
      home_phone: data.home_phone,
      street_address: data.street_address,
      city: data.city,
      state: data.state,
      postcode: data.postcode,
      created_at: dateValue,
      modified_at: dateValue,
    });

    if (error) {
      toast.error("Submission error - please try again later.");
      console.log(error);
    } else {
      toast.success("Client created successfully!");
      router.push("/dashboard");
    }
  };

  // const onSubmit: SubmitHandler<ClientFields> = async (data) => {
  //   const dateValue = Date.now();
  //   const { error } = await supabase.from("clients").insert({
  //     first_name: data.first_name,
  //     middle_name: data.middle_name,
  //     last_name: data.last_name,
  //     gender: data.gender,
  //     birth_date: data.birth_date,
  //     email_address: data.email_address,
  //     mobile_number: data.mobile_number,
  //     home_phone: data.home_phone,
  //     created_at: dateValue,
  //     modified_at: dateValue,
  //   });

  //   if (error) {
  //     toast.error("Submission error - please try again later.");
  //   } else {
  //     toast.success("Client created successfully!");
  //     router.push("/dashboard");
  //   }
  // };

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <PageTitle title="Create new client" />

          {/* Main form */}
          <form id="client-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <SubHeading title="Personal details" />
              <FieldGroup>
                <div className="grid grid-cols-4 grid-rows-3 gap-4">
                  <div className="col-span-1 row-span-1 col-start-1 row-start-1">
                    <Controller
                      name="first_name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>First name<span className="text-destructive"> *</span></FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} required type="text" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-2 row-start-1">
                    <Controller
                      name="middle_name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Middle name</FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="text" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-3 row-start-1">
                    <Controller
                      name="last_name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Last name<span className="text-destructive"> *</span></FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} required type="text" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-1 row-start-2">
                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="client-gender">Gender<span className="text-destructive"> *</span></FieldLabel>
                          <Select name={field.name} value={field.value} onValueChange={field.onChange} required>
                            <SelectTrigger id="client-gender" aria-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Select a gender..." />
                            </SelectTrigger>
                            <SelectContent>
                              {genders.map(gender => <SelectItem value={gender.value}>{gender.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-2 row-start-2">
                    <Controller
                      name="birth_date"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="date" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-1 row-start-3">
                    <Controller
                      name="email_address"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Email adddress<span className="text-destructive"> *</span></FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} required type="email" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-2 row-start-3">
                    <Controller
                      name="mobile_number"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Mobile number</FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="tel" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-3 row-start-3">
                    <Controller
                      name="home_phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Home phone</FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="tel" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>
                </div>
              </FieldGroup>

              {/* Contact details */}
              <SubHeading title="Contact details" />
              <FieldGroup>
                <div className="grid grid-cols-4 grid-rows-1 gap-4">
                  <div className="col-span-1 row-span-1 col-start-1 row-start-1">
                    <Controller
                      name="street_address"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Street address</FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="text" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-2 row-start-1">
                    <Controller
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>City</FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="text" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-3 row-start-1">
                    <Controller
                      name="state"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="client-state">State</FieldLabel>
                          <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger id="client-state" aria-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Select a state..." />
                            </SelectTrigger>
                            <SelectContent>
                              {states.map(state => <SelectItem value={state.value}>{state.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="col-span-1 row-span-1 col-start-4 row-start-1">
                    <Controller
                      name="postcode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Postcode</FieldLabel>
                          <Input {...field} id={field.name} aria-invalid={fieldState.invalid} maxLength={4} type="text" />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>
                </div>
                <Field orientation={"horizontal"}>
                  <Button variant="outline" type="reset" className="cursor-pointer" onClick={() => router.push("/dashboard")}>Cancel</Button>
                  <Button type="submit" className="cursor-pointer" form="client-form">Submit</Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
