import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background px-6 py-8 sm:items-center sm:justify-center sm:px-6 sm:py-12 lg:px-8">
      <LoginForm />
      <footer className="mt-auto hidden w-full max-w-[450px] items-center justify-between pt-8 text-xs text-muted-foreground sm:flex">
        <div className="flex items-center gap-4">
          <button className="hover:underline">English (United States)</button>
        </div>
        <div className="flex gap-4">
          <button className="hover:underline">Help</button>
          <button className="hover:underline">Privacy</button>
          <button className="hover:underline">Terms</button>
        </div>
      </footer>
    </div>
  )
}
