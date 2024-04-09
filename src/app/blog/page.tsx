import Container from "@/components/Container"
import BlogClient from "./_components/BlogClient"
import prisma from "@/db/client"

const BlogsPage =async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return (
    <div>
    <Container>
      <div>
        
      </div>
      <div className="flex flex-col ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BlogClient data={blogs} />
        </div>
      </div>
    </Container>
  </div>
  )
}

export default BlogsPage