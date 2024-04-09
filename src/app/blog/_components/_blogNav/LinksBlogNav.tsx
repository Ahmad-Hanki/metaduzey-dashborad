"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "@/components/Container";

const BlogsNav = () => {
  const pathname = usePathname();
  const Links = [
    {
      name: "Categories",
      href: "/blog/category",
      active: pathname.includes("/blog/category"),
    },
    {
      name: "Blog Posts",
      href: "/blog",
      active: pathname == "/blog",
    },
  ];

  return (
    <div className="bg-zinc-300">
      <Container>
        <div className="flex gap-3 justify-center">
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
      </Container>
    </div>
  );
};

export default BlogsNav;
