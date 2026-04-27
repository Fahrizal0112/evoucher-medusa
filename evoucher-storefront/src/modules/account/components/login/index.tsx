import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)
  const inputClassName =
    "pt-4 pb-1 block w-full h-12 px-4 mt-0 appearance-none rounded-md border border-cyan-100/15 bg-white/[0.06] text-white outline-none transition-colors placeholder:text-transparent hover:bg-white/[0.09] focus:border-cyan-200/60 focus:bg-white/[0.09] focus:ring-0"

  return (
    <div
      className="w-full max-w-md border border-cyan-100/15 bg-black/25 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] small:p-8"
      data-testid="login-page"
    >
      <p className="txt-compact-small-plus text-cyan-100">ACCOUNT ACCESS</p>
      <h1 className="mt-3 text-2xl-semi text-white">Welcome back</h1>
      <p className="mt-3 text-base-regular text-slate-300">
        Sign in untuk lanjut belanja voucher dan cek riwayat transaksi.
      </p>
      <form className="mt-8 w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            className={inputClassName}
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            className={inputClassName}
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="mt-6 h-12 w-full border-0 bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(0,243,255,0.22)] transition-colors hover:bg-white"
        >
          Sign in
        </SubmitButton>
      </form>
      <span className="mt-6 text-center text-small-regular text-slate-300">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-cyan-100 underline underline-offset-4 transition-colors hover:text-white"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
