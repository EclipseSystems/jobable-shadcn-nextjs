import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

import { SMSOtp } from "../custom/sms-otp";

interface SmsSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmsSetup({ isOpen, onClose }: SmsSetupProps) {
  const [step, setStep] = useState(0);
  const [smsNumber, setSmsNumber] = useState('');

  const nextStep = () =>
    step == 1 ? null : setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set up SMS authentication</DialogTitle>
        </DialogHeader>

        {/* Main content */}
        {step == 0 && (
          <>
            <p className="text-sm">Please enter your mobile number:</p>
            <div className="flex items-center gap-3">
              <div className="text-sm">+61</div>
              <Input
                type="text"
                maxLength={9}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, "");
                  e.target.value = value;
                  setSmsNumber(value);
                }}
              />
            </div>
            <p className="text-muted-foreground text-xs">Maximum of 9 digits. Please enter numbers only.</p>
          </>
        )}
        {step == 1 && (
          <>
            <p className="text-sm">Now enter the 6-digit code sent to the number ending in 69:</p>
            <SMSOtp fieldId="smsOtp" />
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button hidden={step == 0} onClick={prevStep}>
            Prev
          </Button>
          <Button
            disabled={smsNumber.length !== 9}
            onClick={nextStep}
          >
            {step === 1 ? "Finish" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
