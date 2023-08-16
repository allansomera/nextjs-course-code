const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>
}
export default UserProfilePage

export const getServerSideProps = async (context) => {
  const { params } = context
  console.log('Server side code...')

  return {
    props: {
      username: `Max`,
    },
  }
}
