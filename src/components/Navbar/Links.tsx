"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Links = () => {
  const pathname = usePathname();
  const Links = [
    {
      name: "Tür",
      href: "/therapyType",
      active: pathname.includes("/therapyType"),
    },
    {
      name: "Yer",
      href: "/therapyPlace",
      active: pathname.includes("/therapyPlace"),
    },
    {
      name: "Unvan",
      href: "/therapyUnvan",
      active: pathname.includes("/therapyUnvan"),
    },
    {
      name: "ekib",
      href: "/ekib",
      active: pathname.includes("/ekib"),
    },
    {
      name: "Blog",
      href: "/blog",
      active: pathname.includes("/blog"),
    },
  ];

  return (
    <>
      <div className="sm:flex gap-3 hidden">
        {Links.map((link) => (
          <Link
            className={cn(
              "text-black/70 hover:text-black/90 transition-colors",
              link.active ? "text-black" : ""
            )}
            key={link.href}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="block sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={"w-52 flex flex-col items-center my-4 "}
          >
            <DropdownMenuLabel>Pages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Links.map((link) => (
              <DropdownMenuItem key={link.href}>
                <Link
                  className={cn(
                    "text-black/70 hover:text-black/90 transition-colors",
                    link.active ? "text-black" : ""
                  )}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Links;
