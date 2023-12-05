import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
// import { Icons } from "./Icons";

import Image from "next/image";
import NavItems from "./NavItems";

const NavBar = () => {
  return (
    <div className = 'bg-white sticky z-50 top-0 inset-x-0 h-16'> 
      <header className = 'relative bg-white'>
        <MaxWidthWrapper>
          <div className = 'border-b border-gray-200'>
            <div className = 'flex hj-16 items-center'>
              {/* TODO: MOBILE NAV */}

              <div className = 'ml-4 flex lg:ml-0 '>
                <Link href = '/'>
                  {/* <Icons.logo className = 'h-10 w-10' /> */}
                  <Image src = '/fox_head_01.png' alt = 'FoxMarket Logo' height = {100} width = {100}/>
                </Link>
              </div>

              <div className = 'hidden z-50 lg:ml-8 lg:block lg:self-stretch '>
                <NavItems />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default NavBar;