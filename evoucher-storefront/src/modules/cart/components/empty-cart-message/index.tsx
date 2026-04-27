import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center border border-cyan-100/10 bg-white/[0.03] px-6 py-28 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row items-baseline gap-x-2 text-3xl-regular text-white"
      >
        Cart
      </Heading>
      <Text className="mb-6 mt-4 max-w-[32rem] text-base-regular text-slate-400">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </Text>
      <div>
        <InteractiveLink href="/store">Explore products</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
