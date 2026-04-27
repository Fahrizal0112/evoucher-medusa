import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <main className="relative overflow-hidden bg-dark-bg py-8 text-slate-100 small:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,243,255,0.08)_0%,transparent_35%,rgba(188,19,254,0.08)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="content-container relative" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 gap-6 small:grid-cols-[minmax(0,1fr)_420px]">
            <div className="flex flex-col gap-y-6 border border-cyan-100/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur small:p-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="relative">
              <div className="sticky top-24 flex flex-col gap-y-8">
                {cart && cart.region && (
                  <>
                    <div className="border border-cyan-100/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur small:p-6">
                      <Summary cart={cart as any} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </main>
  )
}

export default CartTemplate
