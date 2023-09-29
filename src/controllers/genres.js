import {
  getGenres as getGenresLogic,
  postGenres as postGenreLogic,
  deleteGenre as deleteGenreLogic,
  addGenreByIdToUserById as addGenreByIdToUserByIdLogic,
  deleteGenreByIdToUserById as deleteGenreByIdToUserByIdLogic
} from '../logic/genres.js'
import { validateGenre } from '../schemas/genre.js'

export const getGenres = async (req, res) => {
  const { status, data } = await getGenresLogic(req.query.genre)
  res.status(status).send(data)
}

export const postGenre = async (req, res) => {
  const { genre } = req.body
  const result = validateGenre(genre)
  if (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { status, data } = await postGenreLogic(genre)
  res.status(status).send(data)
}

export const deleteGenre = async (req, res) => {
  const { status, data } = await deleteGenreLogic(req.params.genreId)
  res.status(status).send(data)
}

export const addGenreByIdToUserById = async (req, res) => {
  const { status, data } = await addGenreByIdToUserByIdLogic(
    req.body.userId,
    req.params.genreId
  )
  res.status(status).send(data)
}

export const deleteGenreByIdToUserById = async (req, res) => {
  const { status, data } = await deleteGenreByIdToUserByIdLogic(
    req.body.userId,
    req.params.groupId
  )
  res.status(status).send(data)
}
