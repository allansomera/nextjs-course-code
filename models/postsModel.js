import { Schema, model, models } from "mongoose";

const postsSchema = new Schema({
  title: String,
  content: String
})

const Post = models?.Post || model('Post', postsSchema)

export default Post 
