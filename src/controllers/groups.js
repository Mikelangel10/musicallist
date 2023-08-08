import { postGroup as postGroupLogic } from '../logic/groups.js'

export const postGroup = (req, res) => {
  const { status, data } = postGroupLogic(req.body.group)
  res.status(status).send(data)
}
