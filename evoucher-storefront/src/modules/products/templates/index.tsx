import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="relative w-full">
      {/* Background Image Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center blur-[100px] scale-110"
          style={{
            backgroundImage: images?.[0]?.url
              ? `url(${images[0].url})`
              : "none",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ui-bg-base" />
      </div>

      <div className="relative z-10">
        <div
          className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
          data-testid="product-container"
        >
          <div className="block w-full small:w-1/2 relative">
            <ImageGallery images={images} />
          </div>
          <div className="flex flex-col small:w-1/2 w-full py-8 gap-y-8 small:pl-8">
            <div className="flex flex-col gap-y-4">
              <ProductInfo product={product} />
              <ProductOnboardingCta />
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
            <ProductTabs product={product} />
          </div>
        </div>
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
