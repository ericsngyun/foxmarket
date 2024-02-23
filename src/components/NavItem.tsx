// Import necessary dependencies and types
import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Define the type for the category
type Category = typeof PRODUCT_CATEGORIES[number];

// Define the props for the NavItem component
interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

// Define the NavItem component
const NavItem = ({isAnyOpen, category, handleOpen, isOpen}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        {/* Button to toggle the dropdown */}
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          {/* Chevron icon to indicate the dropdown state */}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {/* Dropdown content */}
      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-50 slide-in-from-top-5": !isOpen,
            }
          )}
        >
          {/* Background overlay */}
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          <div className="relative bg-background dark:border-slate-500 light:border-slate-300">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-10">
                {/* Render the featured items */}
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      {/* Display the item image */}
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          src={item.imageSrc}
                          alt="product category image"
                          fill
                          className="object-cover object-center hover:cursor-pointer"
                        />
                      </div>

                      {/* Link to the item */}
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium light:text-gray-900 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p 
                        className="mt-1" 
                        aria-hidden="true">
                          Shop Now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NavItem;