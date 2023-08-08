import { Schema, model } from 'mongoose'

const genreSchema = new Schema({
  name: { type: String, require: true, unique: true }
})

export default model('Genre', genreSchema)
