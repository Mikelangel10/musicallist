import {
  getGenres as getGenresLogic,
  postGenres as postGenreLogic,
  deleteGenre as deleteGenreLogic
} from '../logic/genres.js'
import { validateGenre } from '../schemas/genre.js'

export const getGenres = async (req, res) => {
  // Constante innecesaria porque sólo se usa una vez
  // const { genre } = req.query
  const { status, data } = await getGenresLogic(req.query.genre)
  res.status(status).send(data)
}

export const postGenre = async (req, res) => {
  // Constante necesaria porque se usa más de una vez
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
