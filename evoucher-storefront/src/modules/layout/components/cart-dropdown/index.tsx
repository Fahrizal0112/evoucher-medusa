"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="transition-colors hover:text-cyan-100"
            href="/cart"
            data-testid="nav-cart-link"
          >{`Cart (${totalItems})`}</LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="absolute right-0 top-[calc(100%+1px)] hidden w-[440px] overflow-hidden border border-cyan-100/15 bg-[#090d12]/95 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur small:block"
            data-testid="nav-cart-dropdown"
          >
            <div className="border-b border-white/10 px-5 py-4">
              <h3 className="text-large-semi text-white">Cart</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="grid max-h-[402px] grid-cols-1 gap-y-4 overflow-y-scroll px-5 py-5 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-4 border border-white/10 bg-white/[0.04] p-3"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="group w-[88px]"
                        >
                          <Thumbnail
                            thumbnail={
                              item.thumbnail || item.product?.thumbnail
                            }
                            images={
                              item.product?.images ||
                              item.variant?.product?.images
                            }
                            size="square"
                            className="rounded-md border border-cyan-100/10 bg-black/25 p-0 shadow-none"
                          />
                        </LocalizedClientLink>
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-3">
                              <div className="flex min-w-0 flex-col">
                                <h3 className="overflow-hidden text-ellipsis text-base-semi text-white">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    className="transition-colors hover:text-cyan-100"
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  className="text-small-regular text-slate-400"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                              <div className="max-w-[108px] shrink-0 text-right text-small-regular text-cyan-100">
                                {convertToLocale({
                                  amount: item.total ?? 0,
                                  currency_code: cartState.currency_code,
                                })}
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-2 text-slate-400 [&_button]:text-slate-400 [&_button:hover]:text-cyan-100"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-4 border-t border-white/10 bg-black/20 p-5 text-small-regular text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">
                      Subtotal{" "}
                      <span className="font-normal text-slate-400">
                        (excl. taxes)
                      </span>
                    </span>
                    <span
                      className="text-large-semi text-cyan-100"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="h-12 w-full border-0 bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(0,243,255,0.22)] transition-colors hover:bg-white"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Go to cart
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center gap-y-4 px-5 py-16 text-center text-slate-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100/20 bg-white/[0.06] text-small-regular text-cyan-100">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <Button
                          className="border border-cyan-100/20 bg-white/[0.08] text-white transition-colors hover:bg-white/15"
                          onClick={close}
                        >
                          Explore products
                        </Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
