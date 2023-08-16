import {
  getGenres as getGenresLogic,
  postGenres as postGenreLogic,
  deleteGenre as deleteGenreLogic
} from '../logic/genres.js'

export const getGenres = async (req, res) => {
  const { genre } = req.query
  const { status, data } = await getGenresLogic(genre)
  res.status(status).send(data)
}

export const postGenres = async (req, res) => {
  const { status, data } = await postGenreLogic(req.body.genre)
  res.status(status).send(data)
}

export const deleteGenre = async (req, res) => {
  const { status, data } = await deleteGenreLogic(req.params.genreId)
  res.status(status).send(data)
}
