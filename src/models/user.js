import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  genres: [{ ref: 'Genre', type: Schema.Types.ObjectId }],
  groups: [{ ref: 'Group', type: Schema.Types.ObjectId }]
})

export default model('User', userSchema)
