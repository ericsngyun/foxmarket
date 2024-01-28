import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null
  return { ...data, user: user?.id };
};

const yourOwnAndPurchased: Access = async ({req}) => {
  // Retrieve the user object from the request
  const user = req.user as User

  // Check if the user is an admin, if so, grant access
  if(user?.role === "admin") return true

  // If there is no user, deny access
  if(!user) return false

  // Retrieve products owned by the user
  const {docs: products} = await req.payload.find({
    collection: "products",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      }
    }
  })

  // Extract the IDs of the product files owned by the user
  const ownProductFileIds = products.map((prod) => prod.product_files).flat()

  // Retrieve orders made by the user
  const {docs: orders} = await req.payload.find({
    collection: "orders",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      }
    }
  })

  // Extract the IDs of the purchased product files
  const purchaseProductFields = orders.map((order) => {
    return order.products.map((product) => {
      // If the product is a string, it means the search depth is not sufficient to find the purchased file IDs
      if(typeof product === 'string') return req.payload.logger.error(
        'Search depth not sufficient to find purchased file IDs'
      )

      // Extract the ID of the product file
      return typeof product.product_files === "string"
        ? product.product_files
        : product.product_files.id
    })
  })
  .filter(Boolean)
  .flat()

  // Return the IDs of the product files owned by the user and the purchased product files
  return {
    id: {
      in: [
        ...ownProductFileIds,
        ...purchaseProductFields,
      ],
    }
  }
}

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnAndPurchased,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
    },
  ],
};