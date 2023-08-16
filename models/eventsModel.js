import { Schema, model, models } from "mongoose";

const eventsSchema = new Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  image: String,
  isFeatured: Boolean,
});

const Event = models.Event || model("Event", eventsSchema);

export default Event;
