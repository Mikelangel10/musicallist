import User from '../models/user.js'
import Genre from '../models/genre.js'
import Group from '../models/group.js'

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
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'User already exits'
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
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'User already exits'
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

export const getUsersByGenre = async genreName => {
  try {
    const users = await User.find({
      genre: { $elemMatch: { name: genreName } }
    })

    return {
      status: 200,
      data: {
        users
      }
    }
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

export const getUsersByGroup = async groupName => {
  try {
    const users = await User.find({
      group: { $elemMatch: { name: groupName } }
    })

    return {
      status: 200,
      data: {
        users
      }
    }
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

export const postUser = async user => {
  try {
    const newUser = new User({
      name: user.name,
      email: user.email
    })
    await newUser.save()

    const res = {
      status: 201,
      data: {
        newUser
      }
    }
    return res
  } catch (error) {
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'User already exits'
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

export const putUser = user => {
  // Llamada a la BD
  return {
    status: 200,
    data: {
      message: 'Put User',
      user
    }
  }
}

export const putUserGenre = async (userId, genreName) => {
  try {
    const genre = await Genre.findOne({ name: genreName })

    const genreToUser = await User.updateOne(
      { _id: userId },
      { $push: { genres: genre } },
      { new: true }
    )

    return {
      status: 200,
      data: {
        message: 'Genre added to user'
      }
    }
  } catch (error) {
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'User already exits'
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

export const putUserGroup = async (userId, groupName) => {
  try {
    const group = await Group.findOne({ name: groupName })

    const groupToUser = await User.updateOne(
      { _id: userId },
      { $push: { groups: group } },
      { new: true }
    )

    return {
      status: 200,
      data: {
        message: 'Group added to user'
      }
    }
  } catch (error) {
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'User already exits'
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

export const deleteUser = userId => {
  // Llamada a la BD
  return {
    status: 200,
    data: {
      message: 'Delete User',
      userId: +userId
    }
  }
}
