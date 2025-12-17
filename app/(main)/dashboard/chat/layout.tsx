import { PageTitle } from "@/components/layout/formatting"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { faker } from "@faker-js/faker"
import { Search } from "lucide-react"

function generateHistory() {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    const fullName = [faker.person.firstName(),faker.person.lastName()]
    rows.push(
      <li className="w-full flex items-center gap-3">
        <Avatar>
          <AvatarFallback>
            {fullName[0][0]}
            {fullName[1][0]}
          </AvatarFallback>
        </Avatar>
        <div className="h-content w-full grid grid-cols-3 gap-x-4">
          <div className="col-span-2 grid">
            <span className="text-sm font-semibold truncate">{fullName[0].concat(' ',fullName[1])}</span>
            <span className="text-xs truncate">{faker.lorem.sentence(4)}</span>
          </div>
          <div className="col-span-1">
            <p className="text-muted-foreground text-xs">
              {faker.number.int({min:1,max:7})} day ago
            </p>
          </div>
        </div>
      </li>
    )
  }
  return rows;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title={"Chat"} />
          </div>

          {/* Message history */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 space-y-4">

              {/* Input */}
              <div className="relative mb-4">
                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                  <Search className="size-4" />
                </div>
                <Input type="text" placeholder="Search" className="peer pl-9" />
              </div>

              {/* History nav */}
              <ul className="space-y-4">
                {generateHistory()}
              </ul>

            </div>
            <div className="col-span-3 space-y-4">
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}