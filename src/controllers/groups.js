import { postGroup as postGroupLogic } from '../logic/groups.js'

export const postGroup = async (req, res) => {
  const { status, data } = await postGroupLogic(req.body.group)
  res.status(status).send(data)
}
