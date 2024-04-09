import Container from "@/components/Container"
import BlogClient from "./_components/BlogClient"

const BlogsPage = () => {

  return (
    <div>
    <Container>
      <div className="flex flex-col ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BlogClient  />
        </div>
      </div>
    </Container>
  </div>
  )
}

export default BlogsPage