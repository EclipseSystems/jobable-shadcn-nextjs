import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreditCard, Landmark } from "lucide-react"

const monthItems = () => {
  const items = []
  for (let i = 0; i < 13; i++) {items.push(i < 10 ? `0${i}` : String(i))}
  return items;
}
const months = monthItems()

const yearItems = () => {
  const items = []
  for (let i = 2026; i < 2042; i++) {items.push(String(i))}
  return items;
}
const years = yearItems()

const options = [
  { name: 'Card', value: 'card', icon: CreditCard },
  { name: 'Bank transfer', value: 'bank', icon: Landmark },
]

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void
}

export function ChangePayment({ isOpen, onClose }: PaymentProps) {
  const [payMethod, setPayMethod] = useState('card')
  const handlePayMethod = (event: any) => {
    setPayMethod(event)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change payment method</DialogTitle>
          </DialogHeader>
          <RadioGroup
            defaultValue={options[0].value}
            value={payMethod}
            onValueChange={handlePayMethod}
            className={'grid grid-cols-2 gap-4'}
          >
            {options.map((option) => (
              <div>
                <RadioGroupItem value={option.value} id={option.value} className={'peer sr-only'} />
                <Label htmlFor={option.value}
                  className="border-muted hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border bg-transparent p-4"
                >
                  <option.icon /> {option.name}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {payMethod === 'bank' ?
            <div className={'space-y-3'}>
              <FieldSet>
                <FieldGroup>
                  <Field><FieldLabel>BSB</FieldLabel>
                    <Input maxLength={7} type={'text'} placeholder={'123-456'} />
                  </Field>
                  <Field><FieldLabel>Account number</FieldLabel>
                    <Input maxLength={9} type={'text'} placeholder={'1234 5678'} />
                  </Field>
                  <Field><FieldLabel>Account name</FieldLabel>
                    <Input type={'text'} placeholder={'John Smith'} />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
            : 
              <div className={'space-y-3'}>
                <FieldSet>
                  <FieldGroup>
                    <Field><FieldLabel>Cardholder name</FieldLabel>
                      <Input type={'text'} placeholder={'John Smith'} />
                    </Field>
                    <Field><FieldLabel>Credit card number</FieldLabel>
                      <Input
                        type={'text'}
                        placeholder={'1234 5678 9012 3456'}
                        maxLength={19}
                      />
                    </Field>
                    <div className={'grid grid-cols-3 gap-2'}>
                      <div className={'col-span-1 space-y-2'}>
                        <Field><FieldLabel>Month</FieldLabel>
                          <Select>
                            <SelectTrigger className={'w-full'}>
                              <SelectValue placeholder={'MM'} />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem value={month}>{month}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <div className={'col-span-1 space-y-2'}>
                        <Field><FieldLabel>Year</FieldLabel>
                          <Select>
                            <SelectTrigger className={'w-full'}>
                              <SelectValue placeholder={'YY'} />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem value={year}>{year}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <div className={'col-span-1 space-y-2'}>
                        <Field><FieldLabel>CVC</FieldLabel><Input maxLength={3} placeholder={'123'} /></Field>
                      </div>
                    </div>
                  </FieldGroup>
                </FieldSet>
              </div>
          }

          <DialogFooter>
            <DialogClose>
              <Button onClick={onClose} variant={'outline'}>Cancel</Button>
            </DialogClose>
            <Button type={'submit'}>Confirm</Button>
          </DialogFooter>
        </DialogContent >
      </Dialog >
    </>
  )
}