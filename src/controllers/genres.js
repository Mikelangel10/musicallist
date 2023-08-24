import {
  getGenres as getGenresLogic,
  postGenres as postGenreLogic,
  deleteGenre as deleteGenreLogic
} from '../logic/genres.js'
import { validateGenre } from '../schemas/genres.js'

export const getGenres = async (req, res) => {
  const { genre } = req.query
  const { status, data } = await getGenresLogic(genre)
  res.status(status).send(data)
}

export const postGenre = async (req, res) => {
  const result = validateGenre(req.body.genre)
  if (!result.success)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { status, data } = await postGenreLogic(req.body.genre)
  res.status(status).send(data)
}

export const deleteGenre = async (req, res) => {
  const { status, data } = await deleteGenreLogic(req.params.genreId)
  res.status(status).send(data)
}
