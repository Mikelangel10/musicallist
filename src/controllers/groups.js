import {
  getGroups as getGroupsLogic,
  postGroup as postGroupLogic,
  deleteGroup as deleteGroupLogic
} from '../logic/groups.js'

export const getGroups = async (req, res) => {
  // Constante innecesaria porque sólo se usa una vez
  // const { group } = req.query
  const { status, data } = await getGroupsLogic(req.query.group)
  res.status(status).send(data)
}

export const postGroup = async (req, res) => {
  // Constante necesaria porque se usa más de una vez
  const { group } = req.body
  // const result = validateGroup(req.boy.group) <- Línea anterior a la corrección: "req.boy.group" tiene un error. Hay que fijarse en esas cosas. Debes configurar correctamente el linter para que te avise de estos errores.
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
