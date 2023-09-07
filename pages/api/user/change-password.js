import { getSession } from 'next-auth/client'
import User from '@models/usersModel'
import dbConnect from '@lib/mongo/dbConfig'
import { verifyPassword, hashPassword } from '@lib/auth'

const changePWhandler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getSession({ req: req })

  if (!session) {
    res.send(401).json({ message: 'Not Authenticated' })
    return
  }

  // console.log('req.body', req.body)
  // console.log('req.method', req.method)
  const userEmail = session.user.email // this is part of the token encoded in the authorize function in
  //[...nextauth].js
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  // try {
  await dbConnect()
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  const currentPassword = user.password
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid Password' })
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await User.updateOne(
    { email: userEmail },
    // { $set: { password: await hashPassword(newPassword) } }
    { $set: { password: hashedPassword } }
  )
  res.status(200).json({ message: 'Updated to New Password' })
  // } catch (error) {
  //   console.log(error)
  // }
}

export default changePWhandler
