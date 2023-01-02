import mongoose from 'mongoose'
 
 // OUR TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  })

  // OUR TODO MODEL
export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema)