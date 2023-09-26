import { getToken as getToKenLogic } from '../logic/auth.js'
import { postLoginUser as postLoginUserLogic } from '../logic/auth.js'
import { validatePartialUser } from '../schemas/user.js'

export const getToken = async (req, res) => {
  const { status, data } = await getToKenLogic(req.body.userId)
  res.status(status).send(data)
}

export const postLoginUser = async (req, res) => {
  const { email, password } = req.body.user
  const result = validatePartialUser({ email, password })
  if (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { status, data } = await postLoginUserLogic(email, password)
  res.status(status).send(data)
}
