import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  updateProductCategoriesWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function updateCategories({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const categorySeeds = [
    {
      legacyHandles: ["shirts"],
      legacyNames: ["Shirts"],
      name: "Mobile Legends",
      handle: "mobile-legends",
    },
    {
      legacyHandles: ["sweatshirts"],
      legacyNames: ["Sweatshirts"],
      name: "Free Fire",
      handle: "free-fire",
    },
    {
      legacyHandles: ["pants"],
      legacyNames: ["Pants"],
      name: "PUBG Mobile",
      handle: "pubg-mobile",
    },
    {
      legacyHandles: ["merch"],
      legacyNames: ["Merch"],
      name: "Valorant",
      handle: "valorant",
    },
  ]

  const findExistingCategory = async (categorySeed: (typeof categorySeeds)[number]) => {
    for (const handleOrName of [
      ...categorySeed.legacyHandles,
      ...categorySeed.legacyNames,
      categorySeed.handle,
      categorySeed.name,
    ]) {
      const { data: byHandle } = await query.graph({
        entity: "product_category",
        fields: ["id", "name", "handle"],
        filters: { handle: handleOrName },
      })

      if (byHandle?.[0]) {
        return byHandle[0]
      }

      const { data: byName } = await query.graph({
        entity: "product_category",
        fields: ["id", "name", "handle"],
        filters: { name: handleOrName },
      })

      if (byName?.[0]) {
        return byName[0]
      }
    }

    return null
  }

  for (const categorySeed of categorySeeds) {
    const existingCategory = await findExistingCategory(categorySeed)

    if (existingCategory) {
      await updateProductCategoriesWorkflow(container).run({
        input: {
          selector: { id: existingCategory.id },
          update: {
            name: categorySeed.name,
            handle: categorySeed.handle,
            is_active: true,
          },
        },
      })

      logger.info(`Updated category ${categorySeed.name}.`)
      continue
    }

    await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: [
          {
            name: categorySeed.name,
            handle: categorySeed.handle,
            is_active: true,
          },
        ],
      },
    })

    logger.info(`Created category ${categorySeed.name}.`)
  }

  logger.info("Finished updating product categories.")
}
