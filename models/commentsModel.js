import { Schema, model, models } from 'mongoose'

const commentsSchema = new Schema({
  text: String,
  email: String,
  name: String,
  event_id: String,
})

const Comment = models?.Comment || model('Comment', commentsSchema)

export default Comment
