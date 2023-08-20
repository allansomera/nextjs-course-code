import dbConnect from '@lib/utils/dbConfig'
import Registration from '../../../models/registrationModel'

const registerHandler = async (req, res) => {
  // if (req.method === 'POST') {
  //   res.status(201).json({ message: 'Signed up!', email: req.body.email })
  // }
  try {
    console.log('CONNECTING TO MONGO')
    await dbConnect()
    console.log('CONNECTED TO MONGO')
    console.log('CREATING DOCUMENT')
    if (req.method === 'POST') {
      console.log('newsletter:', req.body)
      const register = await Registration.create({
        ...req.body,
      })
      console.log('CREATED DOCUMENT')
      res.status(201).json({ register })
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

export default registerHandler
