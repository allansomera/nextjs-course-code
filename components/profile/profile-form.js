import { useRef } from 'react'
import classes from './profile-form.module.css'
// import User from '@models/usersModel'
// import dbConnect from '@lib/mongo/dbConfig'

function ProfileForm(props) {
  const newPWref = useRef()
  const oldPWref = useRef()

  const submitHandler = (event) => {
    event.preventDefault()

    const enterednewPW = newPWref.current.value
    const enteredOldPW = oldPWref.current.value

    props.onChangePassword({
      newPassword: enterednewPW,
      oldPassword: enteredOldPW,
    })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPWref} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPWref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
