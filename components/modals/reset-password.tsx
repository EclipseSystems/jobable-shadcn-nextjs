"use client"

import { useEffect, useId, useState } from "react"

import { Badge } from "../ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Key, Phone, QrCode } from "lucide-react"

const pages = [
  { id: 0, name: 'Set MFA method' },
  { id: 1, name: 'Enter MFA code' },
  { id: 2, name: 'Set new password' }
]

export function ResetPassword() {
  const [step, setStep] = useState(0)
  const [method, setMethod] = useState('')

  const nextStep = () => (step == pages.length - 1 ? null : setStep((prevStep) => prevStep + 1))
  const prevStep = () => setStep((prevStep) => prevStep - 1)
  const handleMethodSet = (method: string) => {
    setMethod(method)
  }

  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {setTimeLeft(prev => prev - 1)}, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleResend = () => {setTimeLeft(60)}

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Reset password</Button>
        </DialogTrigger>
        <DialogContent className="min-w-200">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
          </DialogHeader>

          {/* Main content */}
          <div className="flex gap-2">
            {pages.map((page) => (
              <>
                <Badge className='h-5 min-w-5 px-1 tabular-nums'>{page.id + 1}</Badge>
                <p className={`text-sm ${step == page.id && 'font-bold'}`}>{page.name}</p>
              </>
            ))}
          </div>

          {step == 0 && (
            <>
              <Label>Authentication method</Label>
              <Select
                defaultValue={'auth'}
                value={method}
                onValueChange={handleMethodSet}
              >
                <SelectTrigger className="w-62.5">
                  <SelectValue placeholder="Select a method..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auth"><QrCode /> Authenticator app</SelectItem>
                  <SelectItem value="sms"><Phone /> SMS (least secure)</SelectItem>
                  <SelectItem value="key"><Key /> Security key</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          {(step === 1 && method === 'auth') && (
            <>
              <Label>Please enter the app code first visible:</Label>
              <InputOTP maxLength={6} inputMode="numeric" pattern="^\d+$">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Label>Then the one following the first:</Label>
              <InputOTP maxLength={6} inputMode="numeric" pattern="^\d+$">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </>
          )}
          {(step === 1 && method === 'sms') && (
            <>
              <p className="text-muted-foreground text-sm">Please enter the SMS code sent to your number ending in 69.</p>
              <InputOTP maxLength={6} inputMode="numeric" pattern="^\d+$">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className='text-muted-foreground text-xs'>
                Didn&apos;t get the code?{' '}
                {timeLeft > 0 ? (
                  `Resend available in ${formatTime(timeLeft)}`
                ) : (
                  <a href='#' className='hover:text-primary' onClick={e => {
                      e.preventDefault()
                      handleResend()
                    }}
                  >
                    Resend code
                  </a>
                )}
              </p>
            </>
          )}
          {step == 2 && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-2">
                <Label>Enter your current password</Label>
                <Input type="password" />
                <Label>Enter your new password</Label>
                <Input type="password" />
                <p className="-mt-1 text-xs text-destructive">Last two passwords do not match</p>
                <Label>Re-enter your new password</Label>
                <Input type="password" />
                <p className="-mt-1 text-xs text-destructive">Last two passwords do not match</p>
              </div>
              <div className="text-sm col-span-1">
                <p className="font-bold">Password requirements</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button hidden={step == 0} onClick={prevStep}>Prev</Button>
            <Button onClick={nextStep}>
              {step === pages.length - 1 ? 'Finish' : 'Next'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
