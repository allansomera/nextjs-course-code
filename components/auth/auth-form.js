import { useState, useRef } from 'react'
import classes from './auth-form.module.css'
import axios from 'axios'
// import { signIn } from 'next-auth/client'

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const emailRef = useRef()
  const passwordRef = useRef()

  const createUser = async () => {
    const response = await axios.post(
      '/api/auth/signup',
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('response: ', response)
    if (response.status === 201) {
      console.log('Created user data: ', response.data)
    } else {
      console.log('Something went wrong')
      // return data
    }
  }
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  const submithandler = async (event) => {
    event.preventDefault()

    if (isLogin) {
      // log user in
    } else {
      try {
        await createUser()
        // console.log('result: ', result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
