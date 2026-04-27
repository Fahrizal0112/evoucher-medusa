"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const inputClassName =
    "pt-4 pb-1 block w-full h-12 px-4 mt-0 appearance-none rounded-md border border-cyan-100/15 bg-white/[0.06] text-white outline-none transition-colors placeholder:text-transparent hover:bg-white/[0.09] focus:border-cyan-200/60 focus:bg-white/[0.09] focus:ring-0"

  return (
    <div
      className="w-full max-w-md border border-cyan-100/15 bg-black/25 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] small:p-8"
      data-testid="register-page"
    >
      <p className="txt-compact-small-plus text-cyan-100">NEW MEMBER</p>
      <h1 className="mt-3 text-2xl-semi text-white">Become a UPOINT Member</h1>
      <p className="mt-3 text-base-regular text-slate-300">
        Buat akun untuk checkout lebih cepat dan kelola pesanan digital kamu.
      </p>
      <form className="mt-8 flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-3">
          <Input
            label="First name"
            name="first_name"
            className={inputClassName}
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            className={inputClassName}
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            className={inputClassName}
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            className={inputClassName}
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            className={inputClassName}
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="mt-6 text-center text-small-regular text-slate-400">
          By creating an account, you agree to UPOINT&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-cyan-100 underline underline-offset-4 transition-colors hover:text-white"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-cyan-100 underline underline-offset-4 transition-colors hover:text-white"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton
          className="mt-6 h-12 w-full border-0 bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(0,243,255,0.22)] transition-colors hover:bg-white"
          data-testid="register-button"
        >
          Join
        </SubmitButton>
      </form>
      <span className="mt-6 text-center text-small-regular text-slate-300">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-cyan-100 underline underline-offset-4 transition-colors hover:text-white"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
