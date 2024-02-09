'use client'

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { CartItem, useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
  

  const { addItem, items } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
    >
      { items.includes(product as unknown as CartItem) }
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton