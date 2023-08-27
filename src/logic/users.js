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
    // El error code 11000 es el que se lanza cuando se intenta crear un documento con un valor que ya existe en la base de datos por lo que no es necesario comprobarlo en peticiones de lectura
    // if (error.code === 11000)
    //   return {
    //     status: 400,
    //     data: {
    //       message: 'User already exits'
    //     }
    //   }

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
    // El error code 11000 es el que se lanza cuando se intenta crear un documento con un valor que ya existe en la base de datos por lo que no es necesario comprobarlo en peticiones de lectura
    // if (error.code === 11000)
    //   return {
    //     status: 400,
    //     data: {
    //       message: 'User already exits'
    //     }
    //   }

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
    // El error code 11000 es el que se lanza cuando se intenta crear un documento con un valor que ya existe en la base de datos por lo que no es necesario comprobarlo en peticiones de lectura
    // if (error.code === 11000)
    //   return {
    //     status: 400,
    //     data: {
    //       message: 'Genre already exits'
    //     }
    //   }

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
    // El error code 11000 es el que se lanza cuando se intenta crear un documento con un valor que ya existe en la base de datos por lo que no es necesario comprobarlo en peticiones de lectura
    // if (error.code === 11000)
    //   return {
    //     status: 400,
    //     data: {
    //       message: 'Group already exits'
    //     }
    //   }

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
    if (error.code === 11000)
      return {
        status: 400,
        data: {
          message: 'User information already exits'
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
    return {
      status: 500,
      data: {
        message: 'Internal server error'
      }
    }
  }
}
