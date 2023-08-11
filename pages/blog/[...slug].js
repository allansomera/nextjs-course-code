import { useRouter } from 'next/router'

const BlogPostsPage = () => {
  let router = useRouter()
  console.log(router.query)
  return (
    <div>
      <h1>Blog Posts Page</h1>
    </div>
  )
}

export default BlogPostsPage
