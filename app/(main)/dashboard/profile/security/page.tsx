import { Heading, SubHeading } from "@/components/layout/formatting"
import { ResetPassword } from "@/components/modals/reset-password"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Key, Phone, QrCode } from "lucide-react"

const auth = [
  { icon: QrCode, name: 'Authenticator app', value: 'Proton Pass', button: 'Disable' },
  { icon: Phone, name: 'SMS (least secure)', value: '', button: 'Activate' },
  { icon: Key, name: 'Security key', value: 'mn.admin', button: 'Disable' }
]

export default function Page() {
  return (
    <>
      <div className="flex-row w-full space-y-4">
        <Heading title="Security" />
        <SubHeading title="Password" />
        <ResetPassword/>
        <p className="text-sm">Last reset date: 1 December 2025, 4:24PM</p>
        <SubHeading title="Authentication methods" />
        <Table>
          <TableBody>
            {auth.map((item) => (
              <TableRow>
                <TableCell><div className="flex items-center gap-2"><item.icon size={16} /> {item.name}</div></TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={item.button === 'Activate' ? 'default' : 'destructive'}>
                    {item.button}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}