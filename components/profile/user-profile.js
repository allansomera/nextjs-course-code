import ProfileForm from './profile-form'
import classes from './user-profile.module.css'
// import { getSession } from 'next-auth/client'
// import { useEffect, useState } from 'react'

function UserProfile() {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true)
  //the commented code is for client side route protection
  // const [loadedSession, setLoadedSession] = useState()

  // const [session, loading] = useSession()

  // useEffect(() => {
  //   getSession().then((session) => {
  //     // setLoadedSession(session)
  //     if (!session) {
  //       window.location.href = '/auth'
  //     } else {
  //       setIsLoading(false)
  //     }
  //   })
  // }, [])
  //
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>
  // }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  )
}

export default UserProfile
