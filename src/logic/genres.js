import Genre from '../models/genre.js'
import Group from '../models/group.js'
import User from '../models/user.js'
import { duplicity } from '../utils/mongoErrors.js'
import { serverError } from '../utils/statusErrors.js'

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
    return serverError()
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
    if (error.code) return duplicity(error.code)

    return serverError()
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
    return serverError()
  }
}

export const addGenreByIdToUserById = async (userId, genreId) => {
  try {
    const genre = await Genre.findById(genreId)
    if (!genre)
      return {
        status: 404,
        data: {
          message: 'Genre not found'
        }
      }

    const user = await User.findByIdAndUpdate(
      { _id: userId, genres: { $ne: genreId } },
      { $addToSet: { genres: genre } }
    )
    if (user) {
      if (user.genres.includes(genreId)) {
        return {
          status: 400,
          data: {
            message: 'Genre alredy exists in user'
          }
        }
      } else {
        return {
          status: 200,
          data: {
            message: 'Genre added to user'
          }
        }
      }
    } else {
      return {
        status: 404,
        data: {
          message: 'User not found'
        }
      }
    }
  } catch (error) {
    console.log(error)

    return serverError()
  }
}
