import Link from 'next/link'
import classes from './main-navigation.module.css'
import { useSession, signOut } from 'next-auth/client'

function MainNavigation() {
  const [session, loading] = useSession()
  console.log(loading)
  console.log(session)

  const logoutHandler = () => {
    signOut()
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
