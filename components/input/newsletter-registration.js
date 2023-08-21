import classes from './newsletter-registration.module.css'
import { useRef, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import NotificationContext from '../../store/notification-context'

function NewsletterRegistration() {
  let emailRef = useRef()
  let newsletterCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault()

    // axios.post('/api/newsletter/register', {
    //   email: emailRef.current.value,
    // })
    // notificationCtx.showNotification({
    //   title: 'signing up...',
    //   message: 'Registering for newsletter.',
    //   status: 'pending',
    // })

    toast.promise(
      axios.post('/api/newsletter/register', {
        email: emailRef.current.value,
      }),
      {
        pending: {
          render() {
            newsletterCtx.showNotification({
              title: 'signing up...',
              message: 'Registering for newsletter.',
              status: 'pending',
            })
            return 'Registering to newsletter...'
          },
          icon: false,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        },
        success: {
          render() {
            newsletterCtx.showNotification({
              title: 'Success!',
              message: 'Registered to newsletter.',
              status: 'success',
            })
            return 'Registered!'
          },
          // other options
          icon: false,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        },
      }
    )
    //toast here
    // toast
    // console.log(res)

    emailRef.current.value = ''
  }

  // fetch user input (state or refs)
  // optional: validate input
  // send valid data to API

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
