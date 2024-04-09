import { Blog } from "@prisma/client"

interface BlogsProps {
    blogs : Blog[]
}
const Blogs = ({blogs}:BlogsProps) => {

  return (
    <div className="border border-black/50 p-5">
        <div className="grid grid-col-1 md:grid-clos-2 xl:grid-cols-3">
            {blogs.map(blog => (
                <div key={blog.id}></div>
            ))}
        </div>
    </div>
  )
}

export default Blogs