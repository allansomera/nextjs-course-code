import dbConnect from '@lib/utils/dbConfig'
import Feedback from '../../../models/feedbacksModel'

export const getAllFeedbacks = async () => {
  return await Feedback.find({})
}

const feedbackHandler = async (req, res) => {
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
    // const fb = await Feedback.find({})
    const fb = await getAllFeedbacks()
    console.log(fb)
    res.status(200).json({
      feedbacks: fb,
    })
  }
}

export default feedbackHandler
