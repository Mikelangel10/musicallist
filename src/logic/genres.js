import Genre from '../models/genre.js'

export const postGenres = async genre => {
  try {
    const newGenre = new Genre({ name: genre.name })
    await newGenre.save()

    const res = {
      status: 201,
      data: {
        newGenre
      }
    }

    return res
  } catch (error) {
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'Genre already exits'
        }
      }

    return {
      status: 500,
      data: {
        message: 'Internal server error'
      }
    }
  }
}
