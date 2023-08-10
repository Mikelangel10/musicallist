import {
  getGroups as getGroupsLogic,
  postGroup as postGroupLogic
} from '../logic/groups.js'

export const getGroups = async (req, res) => {
  const { group } = req.query
  const { status, data } = await getGroupsLogic(group)
  res.status(status).send(data)
}

export const postGroup = async (req, res) => {
  const { status, data } = await postGroupLogic(req.body.group)
  res.status(status).send(data)
}
