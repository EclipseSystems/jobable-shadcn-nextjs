"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Label } from "../ui/label";
import { Shield } from "lucide-react";

import { QRCode, QRCodeCanvas } from "../ui/qr-code";

interface AuthAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthAppSetup({ isOpen, onClose }: AuthAppProps) {
  const [step, setStep] = useState(0);

  const nextStep = () =>
    step == 1 ? null : setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set up two-factor authentication (2FA)</DialogTitle>
          <DialogDescription>
            {step == 0 && (
              <>
                Scan the QR code below with your authenticator app (e.g., Google
                Authenticator, Authy, or 1Password) to set up two-factor
                authentication.
              </>
            )}
            {step === 1 && (
              <>
                Enter the 6-digit code from your authenticator app in the field below.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {step == 0 && (
            <>
              <div className="p-4 border rounded">
                {/* Placeholder for QR Code */}
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <QRCode value={"https://www.epicassist.org"}>
                    <QRCodeCanvas />
                  </QRCode>
                </div>
              </div>
              <p className="text-sm text-center">
                If you cannot scan the QR code, you can manually enter the key
                below into your authenticator app:
              </p>
              <div className="p-2 bg-accent rounded">
                <code>ABCD-EFGH-IJKL-MNOP</code>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <Label>Authentication code</Label>
              <InputOTP maxLength={6}>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button hidden={step == 0} onClick={prevStep}>
            Prev
          </Button>
          <Button onClick={nextStep}>{step === 1 ? <><Shield/> Enable 2FA</> : "Next"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
