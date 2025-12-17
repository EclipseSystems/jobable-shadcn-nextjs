export function PageTitle({ title }: { title: string }) {
  return <p className="text-2xl font-bold tracking-tight mr-4">
    {title}
  </p>
}

export function Heading({ title }: { title: string }) {
  return <p className="text-xl font-bold">
    {title}
  </p>
}

export function SubHeading({ title }: { title: string }) {
  return <p className="text-lg font-medium">
    {title}
  </p>
}