import User from '../models/user.js'
import Genre from '../models/genre.js'
import Group from '../models/group.js'
import { duplicity } from '../utils/mongoErrors.js'
import { serverError } from '../utils/statusErrors.js'
import { encrytp } from '../utils/bcrypt.js'

export const getUsers = async () => {
  try {
    const users = await User.find()

    return {
      status: 200,
      data: {
        users
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

export const getUser = async userId => {
  try {
    const user = await User.findById(userId)

    return {
      status: 200,
      data: {
        user
      }
    }
  } catch (error) {
    return serverError()
  }
}

export const getUsersByGenre = async genreName => {
  try {
    const genre = await Genre.findOne({ name: genreName })

    const usersWithCommonGenre = await User.find({
      genres: genre._id
    })
      .populate('genres')
      .populate('groups')

    return {
      status: 200,
      data: {
        usersWithCommonGenre
      }
    }
  } catch (error) {
    return serverError()
  }
}

export const getUsersByGroup = async groupName => {
  try {
    const group = await Group.findOne({ name: groupName })

    const usersWithCommonGroup = await User.find({
      groups: group._id
    })
      .populate('genres')
      .populate('groups')

    return {
      status: 200,
      data: {
        usersWithCommonGroup
      }
    }
  } catch (error) {
    return serverError()
  }
}

export const postUser = async user => {
  try {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password
    })

    newUser.password = await encrytp(user.password)

    await newUser.save()

    const res = {
      status: 201,
      data: {
        newUser
      }
    }
    return res
  } catch (error) {
    if (error.code) return duplicity(error.code)
    return serverError()
  }
}

export const putUser = async (userId, payload) => {
  try {
    await User.findByIdAndUpdate(userId, payload)

    return {
      status: 200,
      data: {
        message: 'User updated correct'
      }
    }
  } catch (error) {
    if (error.code) return duplicity(error.code)

    return serverError()
  }
}

export const putUserGenre = async (userId, genreName) => {
  try {
    const genre = await Genre.findOne({ name: genreName })
    if (!genre)
      return {
        status: 404,
        data: {
          message: 'Genre not found'
        }
      }

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { genres: genre } },
      { new: true }
    )

    if (!user)
      return {
        status: 404,
        data: {
          message: 'User not found'
        }
      }

    return {
      status: 200,
      data: {
        message: 'Genre added to user'
      }
    }
  } catch (error) {
    if (error.code) return duplicity(error.code)

    return serverError()
  }
}

export const putUserGroup = async (userId, groupName) => {
  try {
    const group = await Group.findOne({ name: groupName })
    if (!group)
      return {
        status: 404,
        data: {
          message: 'Group not found'
        }
      }

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { groups: group } },
      { new: true }
    )
    if (!user)
      return {
        status: 404,
        data: {
          message: 'User not found'
        }
      }

    return {
      status: 200,
      data: {
        message: 'Group added to user'
      }
    }
  } catch (error) {
    if (error.code) return duplicity(error.code)

    return serverError()
  }
}

export const deleteUser = async userId => {
  try {
    console.log(userId)
    await User.findByIdAndDelete(userId)

    return {
      status: 200,
      data: {
        message: 'User deleted successfully'
      }
    }
  } catch (error) {
    return serverError()
  }
}
