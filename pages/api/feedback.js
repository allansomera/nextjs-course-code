import dbConnect from '@lib/utils/dbConfig'
import Feedback from '../../models/feedbacksModel'

const messageHandler = async (req, res) => {
  await dbConnect()
  if (req.method === 'POST') {
    await Feedback.create({
      email: req.body.email,
      feedback: req.body.feedback,
    })
    res.status(200).json({
      message: 'it works',
      email: req.body.email,
      feedback: req.body.message,
    })
  } else {
    const fb = await Feedback.find({})
    console.log(fb)
    res.status(200).json({
      feedbacks: fb,
    })
  }
}

export default messageHandler
