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

export const postUser = user => {
  // Llamada a la BD
  return {
    status: 200,
    data: {
      message: 'Post User',
      user
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
