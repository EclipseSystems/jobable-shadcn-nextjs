import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const maxLength = 6;
function slotRows() {
  const rows = [];
  for (let i = 0; i < maxLength; i++) {
    rows.push(<InputOTPSlot key={i} index={i} />);
  }
  return rows;
}

export function SixInputOTP({ fieldId }: { fieldId: string }) {
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
    </>
  );
}
