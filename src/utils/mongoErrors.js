export const duplicity = code => {
  if (code === 11000)
    return {
      status: 400,
      data: {
        message: 'Genre already exits'
      }
    }
}
