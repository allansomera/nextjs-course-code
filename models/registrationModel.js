import { Schema, model, models } from 'mongoose'

const registrationSchema = new Schema({
  email: String,
})

const Registration =
  models?.Registration || model('Registration', registrationSchema)

export default Registration
