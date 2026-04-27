import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="relative w-full overflow-hidden border-t border-cyan-200/15 bg-[linear-gradient(135deg,#071316_0%,#111820_48%,#1b1420_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/70 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="content-container relative flex w-full flex-col">
        <div className="flex flex-col gap-y-10 py-16 small:py-24 xsmall:flex-row xsmall:items-start xsmall:justify-between">
          <div className="max-w-sm">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus inline-flex rounded-full border border-cyan-200/20 bg-white/5 px-4 py-2 text-white shadow-[0_0_28px_rgba(0,243,255,0.12)] transition-colors hover:border-cyan-200/40 hover:bg-white/10"
            >
              UPOINT
            </LocalizedClientLink>
            <p className="mt-5 text-small-regular leading-6 text-slate-300">
              Voucher digital, top up game, dan kebutuhan entertainment dalam
              satu tempat.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-8 text-small-regular sm:grid-cols-3 md:gap-x-14 xsmall:w-auto">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3 border-l border-white/10 pl-4">
                <span className="txt-small-plus text-cyan-100">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="txt-small flex flex-col gap-2 text-slate-300"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "transition-colors hover:text-white",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2 border-l border-white/10 pl-3">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="transition-colors hover:text-white"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3 border-l border-white/10 pl-4">
                <span className="txt-small-plus text-cyan-100">
                  Collections
                </span>
                <ul
                  className={clx(
                    "txt-small grid grid-cols-1 gap-2 text-slate-300",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="transition-colors hover:text-white"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-3 border-l border-white/10 pl-4">
              <span className="txt-small-plus text-cyan-100">UPOINT</span>
              <ul className="txt-small grid grid-cols-1 gap-y-2 text-slate-300">
                <li>
                  <a
                    href="https://github.com/medusajs"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/medusajs/nextjs-starter-medusa"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Source code
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 flex w-full flex-col gap-4 border-t border-white/10 pt-6 text-slate-400 xsmall:flex-row xsmall:items-center xsmall:justify-between">
          <Text className="txt-compact-small text-slate-400">
            &copy; {new Date().getFullYear()} UPOINT. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
