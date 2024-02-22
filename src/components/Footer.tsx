import { usePathname } from "next/navigation"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {

  const pathname = usePathname()
  const pathsToMinimize = ["/verify-email", "/sign-up", "/sign-in"]

  return <footer className = "bg-white flex-grow-0">
    <MaxWidthWrapper>
      <div className = 'border-t border-gray-200'>
        {pathsToMinimize.includes(pathname) ? null : (
          <div>
            
          </div>

        )}
      </div>
    </MaxWidthWrapper>
  </footer>
}

export default Footer