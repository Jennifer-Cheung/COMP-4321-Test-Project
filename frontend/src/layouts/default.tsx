export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-screen dark text-foreground bg-background">
      <main className="container mx-auto max-w-7xl px-10 flex-grow pt-16 dark text-foreground bg-background">
        {children}
      </main>
    </div>
  )
}
