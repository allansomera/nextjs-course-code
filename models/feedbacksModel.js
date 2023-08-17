import { Schema, model, models } from 'mongoose'

const feedbackSchema = new Schema({
  email: String,
  feedback: String,
})

const Feedback = models?.Feedback || model('Feedback', feedbackSchema)

export default Feedback
