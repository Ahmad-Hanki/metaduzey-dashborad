import {
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Container from "../Container";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import Links from "./Links";
import Link from "next/link";

const Navbar = async () => {


  return (
    <div className="bg-slate-200 p-5">
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
