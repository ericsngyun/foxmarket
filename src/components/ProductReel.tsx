'use client'

import { Product } from "../payload-types"
import { TQueryValidator } from "../lib/validators/query-validator"
import { trpc } from "../trpc/client"
import Link from "next/link"
import ProductListing from "./ProductListing"

interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
  query: TQueryValidator
}

const FALLBACK_LIMIT = 4

const ProductReel = (props: ProductReelProps) => {

  const {title, subtitle, href, query} = props

  const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )
  
  const products = queryResults?.pages.flatMap(
    (page) => page.items
  )

  console.log(products)

  let prodMap: (Product | null)[] = []
  if(products && products.length) {
    prodMap = products
  } else if(isLoading) {
    prodMap = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null)
  }

  
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-2-4xl lg:px-0">
          {title ? (
            <h1 className="text=2xl font-bold sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <h1 className="mt-2 text-sm light:text-muted-foreground">{subtitle}</h1>
          ) : null}
        </div>

        {href ? (
          <Link href={href} className = 'hidden text-sm font-medium text-orange-600 hover:text-orange-500 md:block'>
            Shop the collection {' '} <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className = 'relative'>
        <div className = 'mt-6 flex items-center w-full'>
          <div className = 'w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 mg:gap-x-8'>
            {prodMap.map((product, i) => (
              <ProductListing key = {i} product = {product} index = {i}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

 export default ProductReel