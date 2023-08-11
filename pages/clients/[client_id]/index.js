import { useRouter } from 'next/router'

const ClientProjectPage = () => {
  const router = useRouter()
  const loadProjectHandler = () => {
    router.push({
      pathname: '/clients/[client_id]/[client_project_id]',
      query: { client_id: 'max', client_project_id: 'projecta' },
    })
  }
  return (
    <div>
      <h1>The Projects of a given client</h1>
      <button onClick={loadProjectHandler}>Go To</button>
    </div>
  )
}

export default ClientProjectPage
