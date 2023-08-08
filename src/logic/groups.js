export const postGroup = group => {
  // Llamada a la BD
  return {
    status: 200,
    data: {
      message: 'Post Group',
      group
    }
  }
}
