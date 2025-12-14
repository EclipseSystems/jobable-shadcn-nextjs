import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { faker } from "@faker-js/faker"

function generateChat() {
  const messages = [];
  for (let i = 0; i < 20; i++) {
    messages.push(
      <div className={"flex items-center gap-2"}>
        <Avatar className={faker.number.int({ min: 0, max: 1 }) == 0 ? "ml-auto" : "mr-auto"}>
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <p className="text-sm">{faker.lorem.sentence(5)}</p>
      </div>
    );
  }
  return messages;
}

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 w-full">
        <div className="col-span-1 w-full space-y-4">
          {generateChat()}
        </div>
      </div>
    </>
  )
}