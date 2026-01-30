import { useEffect, useState } from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const maxLength = 6;
function slotRows() {
  const rows = [];
  for (let i = 0; i < maxLength; i++) {
    rows.push(<InputOTPSlot key={i} index={i} />);
  }
  return rows;
}

export function SMSOtp({ fieldId }: { fieldId: string }) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    setTimeLeft(60);
  };
  return (
    <>
      <InputOTP
        id={fieldId}
        maxLength={maxLength}
        inputMode="numeric"
        pattern="^\d+$"
      >
        <InputOTPGroup>{slotRows()}</InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-xs">
        Didn&apos;t get the code?{" "}
        {timeLeft > 0 ? (
          `Resend available in ${formatTime(timeLeft)}`
        ) : (
          <a
            href="#"
            className="hover:text-primary"
            onClick={(e) => {
              e.preventDefault();
              handleResend();
            }}
          >
            Resend code
          </a>
        )}
      </p>
    </>
  );
}
