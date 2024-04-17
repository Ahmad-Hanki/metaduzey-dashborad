'use client'
import {
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Container from "../Container";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import Links from "./Links";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = async () => {

  const path = usePathname();
  const home = path =='/';
  return (
    <div className={cn("bg-slate-200 p-5", home? 'absolute w-full bg-transparent font-extrabold ':'')}>
      <Container>
        <div className="flex justify-between">
            <Link href={'/'}>
            
          <div className="relative overflow-hidden rounded-md aspect-[3.1/1] w-48">
            <Image
              alt="photo"
              fill
              className="object-cover object-center"
              src={logo}
            />
          </div>
          </Link>
          <div className="flex items-center gap-5">
            <Links />

            <LogoutLink
              className={cn("text-black/70 hover:text-black transition-colors")}
            >
              Logout
            </LogoutLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
