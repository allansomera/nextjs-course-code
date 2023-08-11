import Link from 'next/link'

const ClientsPage = () => {
  const clients = [
    { id: 'max', name: 'Maximillian' },
    { id: 'manu', name: 'Manuel' },
  ]
  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link
                href={{
                  pathname: '/clients/[client_id]',
                  query: { client_id: client.id },
                }}
              >
                {client.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ClientsPage
