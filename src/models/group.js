import { Schema, model } from 'mongoose'

const groupSchema = new Schema({
  name: { type: String, require: true, unique: true },
  fundationDate: { type: Number },
  genres: [{ ref: 'Genre', type: Schema.Types.ObjectId }],
  artists: [{ type: String, require: true }]
})

export default model('Group', groupSchema)
