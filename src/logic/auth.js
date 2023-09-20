import { generateJWT } from '../utils/jwt.js'
import { serverError } from '../utils/statusErrors.js'

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
