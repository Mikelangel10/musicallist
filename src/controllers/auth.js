import { getToken as getToKenLogic } from '../logic/auth.js'

export const getToken = async (req, res) => {
  const { status, data } = await getToKenLogic(req.body.userId)
  res.status(status).send(data)
}
