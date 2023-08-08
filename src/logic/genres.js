export const postGenres = genre => {
  // Llamada a la BD
  return {
    status: 200,
    data: {
      message: 'Post Genre',
      genre
    }
  }
}
