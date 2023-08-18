import Feedback from '../../../models/feedbacksModel'
// import { getAllFeedbacks } from '../feedback'

const feedback_id_handler = async (req, res) => {
  const feedbackId = req.query.feedbackid

  // console.log('feedbackId: ', feedbackId)
  // const feedbackData = await getAllFeedbacks()
  const feedback_id_data = await Feedback.findById(feedbackId)
  // const { data } = feedbackData
  console.log(feedback_id_data)
  res.status(200).json({ feedbackIdData: feedback_id_data })
}

export default feedback_id_handler
