import { useRouter } from 'next/router'

const SelectClientProjectPage = () => {
  let router = useRouter()
  // console.log(router.pathname)
  console.log(router.query)
  return (
    <div>
      <h1>THe Project Page for a Specific project for a selected client</h1>
    </div>
  )
}
export default SelectClientProjectPage
