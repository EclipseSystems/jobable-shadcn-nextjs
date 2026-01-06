"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Key, Phone, QrCode } from "lucide-react";

import { AuthAppSetup } from "@/components/modals/auth-setup";
import { Heading, SubHeading } from "@/components/layout/formatting";
import { ResetPassword } from "@/components/modals/reset-password";
import { SmsSetup } from "@/components/modals/sms-setup";

export default function Page() {
  const [authOpen, setAuthOpen] = useState(false)
  const [smsOpen, setSmsOpen] = useState(false)

  return (
    <>
      <div className="flex-row w-full space-y-4">
        <Heading title="Security" />
        <SubHeading title="Password" />
        <ResetPassword />
        <p className="text-sm">Last reset date: 1 December 2025, 4:24PM</p>
        <SubHeading title="Authentication methods" />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <QrCode size={16} /> Authenticator app
                </div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                <Button onClick={() => setAuthOpen(true)} size="sm" variant={"default"}>
                  Activate
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone size={16} /> SMS (least secure)
                </div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                <Button onClick={() => setSmsOpen(true)} size="sm" variant={"default"}>
                  Activate
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Key size={16} /> Security key
                </div>
              </TableCell>
              <TableCell>mn.admin</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant={"destructive"}>
                  Disable
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <AuthAppSetup isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <SmsSetup isOpen={smsOpen} onClose={() => setSmsOpen(false)} />
    </>
  );
}
