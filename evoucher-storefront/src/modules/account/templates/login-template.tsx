"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="grid w-full grid-cols-1 small:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
      <section className="relative hidden overflow-hidden border-r border-white/10 bg-[linear-gradient(160deg,rgba(0,243,255,0.12)_0%,rgba(255,255,255,0.04)_45%,rgba(188,19,254,0.12)_100%)] p-10 small:flex small:flex-col small:justify-between">
        <div>
          <p className="txt-compact-small-plus text-cyan-100">UPOINT MEMBER</p>
          <h1 className="mt-4 max-w-sm text-3xl-semi leading-tight text-white">
            Akun voucher game yang rapi, cepat, dan aman.
          </h1>
          <p className="mt-5 max-w-md text-base-regular text-slate-300">
            Masuk untuk lanjut checkout, pantau pesanan, dan kelola profil
            belanja digital kamu.
          </p>
        </div>

        <div className="grid gap-3 text-small-regular text-slate-200">
          {["Fast checkout", "Order tracking", "Secure profile"].map((item) => (
            <div
              key={item}
              className="border border-cyan-100/15 bg-black/20 px-4 py-3"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-[560px] w-full items-center justify-center px-5 py-10 small:px-10">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </section>
    </div>
  )
}

export default LoginTemplate
