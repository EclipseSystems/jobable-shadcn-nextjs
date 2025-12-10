export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='size-full'>
      {/* Heading */}
      <div className="border-border bg-background border-b">
        <div className="container mx-auto flex flex-col px-4 py-4 md:px-6 md:py-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main section */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row">
          <aside className="border-border hidden w-64 border-r py-6 pr-6 md:block">
            <ul className="-ml-3 space-y-1">
              <li className="bg-accent-foreground/5 text-accent-foreground hover:bg-accent-foreground/10 cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                <a>Profile</a>
              </li>
              <li className="text-muted-foreground hover:bg-accent-foreground/10 cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                <a>Account</a>
              </li>
              <li className="text-muted-foreground hover:bg-accent-foreground/10 cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                <a>Members</a>
              </li>
              <li className="text-muted-foreground hover:bg-accent-foreground/10 cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                <a>Billing</a>
              </li>
              <li className="text-muted-foreground hover:bg-accent-foreground/10 cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                <a>Invoices</a>
              </li>
              <li className="text-muted-foreground hover:bg-accent-foreground/10 cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                <a>API</a>
              </li>
            </ul>
          </aside>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}