import User from '../models/user.js'

export const getUsers = () => {
  // Llamada a la BD
  return {
    status: 200,
    data: 'Get Users'
  }
}
export const getUser = userId => {
  // Llamada a la BD
  return {
    status: 200,
    data: {
      message: 'Get User',
      userId: +userId
    }
  }
}

export const getUsersByGenre = () => {
  // Llamada a la BD
  return {
    status: 200,
    data: 'Get Users by Genre'
  }
}

export const getUsersByGroup = () => {
  // Llamada a la BD
  return {
    status: 200,
    data: 'Get Users by Group'
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
