import {
  getGroups as getGroupsLogic,
  postGroup as postGroupLogic,
  deleteGroup as deleteGroupLogic,
  addGroupByIdToUserById as addGroupByIdToUserByIdLogic,
  deleteGroupByIdToUserById as deleteGroupByIdToUserByIdLogic
} from '../logic/groups.js'

export const getGroups = async (req, res) => {
  const { status, data } = await getGroupsLogic(req.query.group)
  res.status(status).send(data)
}

export const postGroup = async (req, res) => {
  const { group } = req.body
  const result = validateGroup(group)
  if (!result.sucess)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { status, data } = await postGroupLogic(group)
  res.status(status).send(data)
}

export const deleteGroup = async (req, res) => {
  const { status, data } = await deleteGroupLogic(req.params.groupId)
  res.status(status).send(data)
}

export const addGroupByIdToUserById = async (req, res) => {
  const { status, data } = await addGroupByIdToUserByIdLogic(
    req.body.userId,
    req.params.groupId
  )
  res.status(status).send(data)
}

export const deleteGroupByIdToUserById = async (req, res) => {
  const { status, data } = await deleteGroupByIdToUserByIdLogic(
    req.body.userId,
    req.params.groupId
  )
  res.status(status).send(data)
}
