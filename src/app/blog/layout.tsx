import { Children, ReactNode } from "react";
import BlogsNav from "./_components/_blogNav/LinksBlogNav";

interface BlogsLayoutProps {
  children: ReactNode;
}
const BlogsLayout = ({ children }: BlogsLayoutProps) => {
  return (
    <div>
      <BlogsNav />
      <main>{children}</main>
    </div>
  );
};

export default BlogsLayout;
