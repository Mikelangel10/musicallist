import User from '../models/user.js'
import { generateJWT } from '../utils/jwt.js'
import { serverError } from '../utils/statusErrors.js'
import { validate } from '../utils/bcrypt.js'

export const getToken = async userId => {
  try {
    const token = await generateJWT(userId)

    return {
      status: 200,
      data: {
        token
      }
    }
  } catch (error) {
    console.log(error)
    return serverError()
  }
}

export const postLoginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).send({ message: 'User not found' })

    if (!user.password)
      return res.status(404).send({ message: 'Password not found in DB' })

    if (!(await validate(password, user.password)))
      return res.status(400).send({ message: 'Password not match' })

    const token = await generateJWT(user._id)
    if (token === 'Token not generated')
      return res.status(400).send({ message: 'Error generating token' })

    return {
      status: 200,
      data: {
        user,
        token
      }
    }
  } catch (error) {
    console.log(error)
    return serverError()
  }
}
