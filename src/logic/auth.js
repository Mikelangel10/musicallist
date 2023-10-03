import User from '../models/user.js'
import { generateJWT } from '../utils/jwt.js'
import { serverError } from '../utils/statusErrors.js'
import { validateBcrypt } from '../utils/bcrypt.js'

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
    if (!user) {
      return {
        status: 404,
        data: {
          message: 'User not found in DB'
        }
      }
    }

    if (!(await validateBcrypt(password, user.password))) {
      return {
        status: 400,
        data: {
          message: 'Incorrect password'
        }
      }
    }

    const token = await generateJWT(user._id)
    if (token === 'Token not generated') {
      return {
        status: 400,
        data: {
          message: 'Token not generated'
        }
      }
    }

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
