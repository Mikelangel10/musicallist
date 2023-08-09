import { postGenres as postGenreLogic } from '../logic/genres.js'

export const postGenres = async (req, res) => {
  const { status, data } = await postGenreLogic(req.body.genre)
  res.status(status).send(data)
}
