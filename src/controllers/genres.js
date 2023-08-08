import { postGenres as postGenreLogic } from '../logic/genres.js'

export const postGenres = (req, res) => {
  const { status, data } = postGenreLogic(req.body.genre)
  res.status(status).send(data)
}
