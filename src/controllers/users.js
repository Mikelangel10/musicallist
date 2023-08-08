import {
  getUsers as getUsersLogic,
  getUser as getUserByLogic,
  getUsersByGenre as getUsersByGenreLogic,
  getUsersByGroup as getUserByGroupLogic,
  postUser as postUserLogic,
  putUser as putUserLogic,
  deleteUser as deleteUserLogic
} from '../logic/index.js'

export const getUsers = (req, res) => {
  const { status, data } = getUsersLogic()
  res.status(status).send(data)
}

export const getUser = (req, res) => {
  const { status, data } = getUserByLogic(req.params.userId)
  res.status(status).send(data)
}

export const getUsersByGenre = (req, res) => {
  const { status, data } = getUsersByGenreLogic()
  res.status(status).send(data)
}

export const getUsersByGroup = (req, res) => {
  const { status, data } = getUserByGroupLogic()
  res.status(status).send(data)
}

export const postUser = (req, res) => {
  const { status, data } = postUserLogic(req.body.user)
  res.status(status).send(data)
}

export const putUser = (req, res) => {
  const { status, data } = putUserLogic(req.body.user)
  res.status(status).send(data)
}

export const deleteUser = (req, res) => {
  const { status, data } = deleteUserLogic(req.params.userId)
  res.status(status).send(data)
}
