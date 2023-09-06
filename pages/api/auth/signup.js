import { hashPassword } from '@lib/auth'
import dbConnect from '@lib/mongo/dbConfig'
import Signup from '@models/signupModel'
import User from '@models/usersModel'

const signupHandler = async (req, res) => {
  try {
    console.log('CONNECTING TO MONGO')
    await dbConnect()
    console.log('CONNECTED TO MONGO')
    console.log('CREATING DOCUMENT')
    if (req.method === 'POST') {
      console.log('req.body: ', req.body)
      let { email, password } = req.body
      console.log('password: ', password)
      console.log('email: ', email)

      if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
      ) {
        res.status(422).json({
          message:
            'Invalid input - password should also be at least 7 characters long.',
        })
        return
      }
      const existingUser = await User.findOne({ email: `${email}` })
      if (existingUser) {
        console.log('existingUser exist: ', existingUser)
        res.status(422).json({
          message: `User ${email} already exists!`,
        })
        return
      }

      const hashedPassword = await hashPassword(password)
      const signup = await User.create({
        // ...req.body.data,
        email: email,
        password: hashedPassword,
      })
      console.log('CREATED DOCUMENT')

      res.status(201).json({ message: 'Created user', user: signup })
    }

    // if (req.method === 'GET') {
    //   let comments = await getCommentsById(req.query.event_id)
    //   console.log(comments)
    //   res.status(200).json(comments)
    // }
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}
export default signupHandler
