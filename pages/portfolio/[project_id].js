import { useRouter } from 'next/router'
const PortfolioProjectPage = () => {
  const router = useRouter()
  console.log('router.pathname', router.pathname)
  console.log('router.query', router.query)

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.project_id

  return (
    <div>
      <h1>the portfolo project page</h1>
    </div>
  )
}
export default PortfolioProjectPage
