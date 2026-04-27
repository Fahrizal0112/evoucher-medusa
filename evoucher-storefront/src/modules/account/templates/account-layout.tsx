import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <main
      className="relative flex-1 overflow-hidden bg-dark-bg text-slate-100"
      data-testid="account-page"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,243,255,0.08)_0%,transparent_34%,rgba(188,19,254,0.08)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="content-container relative flex min-h-[calc(100vh-80px)] max-w-6xl flex-col py-8 small:py-14">
        <div
          className={clx(
            "grid flex-1 grid-cols-1 overflow-hidden border border-cyan-100/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur",
            customer && "small:grid-cols-[240px_1fr]"
          )}
        >
          {customer && (
            <aside className="border-b border-white/10 bg-black/20 p-6 small:border-b-0 small:border-r">
              <AccountNav customer={customer} />
            </aside>
          )}
          <div className="flex min-h-[560px] flex-1">{children}</div>
        </div>

        <div className="mt-6 flex flex-col gap-5 border border-cyan-100/10 bg-white/[0.03] p-6 text-slate-300 small:flex-row small:items-center small:justify-between">
          <div>
            <h3 className="text-large-semi text-white">Butuh bantuan?</h3>
            <p className="mt-2 text-small-regular text-slate-400">
              Tim support UPOINT siap bantu urusan akun dan transaksi.
            </p>
          </div>
          <div className="text-cyan-100">
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AccountLayout
