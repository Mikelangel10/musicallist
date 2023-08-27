import {
  getUsers as getUsersLogic,
  getUser as getUserByLogic,
  getUsersByGenre as getUsersByGenreLogic,
  getUsersByGroup as getUserByGroupLogic,
  postUser as postUserLogic,
  putUser as putUserLogic,
  putUserGenre as putUserGenreLogic,
  putUserGroup as putUserGroupLogic,
  deleteUser as deleteUserLogic
} from '../logic/index.js'
// Importación en desuso
// import Genre from '../models/genre.js'
import { validatePartialUser, validateUser } from '../schemas/user.js'

export const getUsers = async (req, res) => {
  const { status, data } = await getUsersLogic()
  res.status(status).send(data)
}

export const getUser = async (req, res) => {
  const { status, data } = await getUserByLogic(req.params.userId)
  res.status(status).send(data)
}

export const getUsersByGenre = async (req, res) => {
  const { status, data } = await getUsersByGenreLogic(req.params.genreName)
  res.status(status).send(data)
}

export const getUsersByGroup = async (req, res) => {
  const { status, data } = await getUserByGroupLogic(req.params.groupName)
  res.status(status).send(data)
}

export const postUser = async (req, res) => {
  const result = validateUser(req.body.user)
  if (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { status, data } = await postUserLogic(req.body.user)
  res.status(status).send(data)
}

export const putUser = async (req, res) => {
  const result = validatePartialUser(req.body.payload)
  if (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { status, data } = await putUserLogic(
    req.params.userId,
    req.body.payload
  )
  res.status(status).send(data)
}

export const putUserGenre = async (req, res) => {
  const { userId, genreName } = req.params

  const { status, data } = await putUserGenreLogic(userId, genreName)
  res.status(status).send(data)
}

export const putUserGroup = async (req, res) => {
  const { userId, groupName } = req.params

  const { status, data } = await putUserGroupLogic(userId, groupName)
  res.status(status).send(data)
}

export const deleteUser = async (req, res) => {
  const { status, data } = await deleteUserLogic(req.params.userId)
  res.status(status).send(data)
}
