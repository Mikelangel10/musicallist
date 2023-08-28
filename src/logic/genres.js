import Genre from '../models/genre.js'
import Group from '../models/group.js'
import User from '../models/user.js'

export const getGenres = async genre => {
  try {
    let genres

    if (!genre) {
      genres = []

      const res = await Genre.find()

      res.map(genre => {
        genres.push(genre.name)
      })
    }

    if (genre) genres = await Genre.findOne({ name: genre }, '_id name')

    return {
      status: 200,
      data: {
        genres
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: {
        message: 'Internal server error'
      }
    }
  }
}

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

export const deleteGenre = async genreId => {
  try {
    await Genre.findByIdAndRemove(genreId)

    await User.updateMany({ genres: genreId }, { $pull: { genres: genreId } })
    await Group.updateMany({ genres: genreId }, { $pull: { genres: genreId } })
    return {
      status: 200,
      data: {
        message: 'Genre deleted successfully'
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: {
        message: 'Internal server error'
      }
    }
  }
}
