export const serverError = () => {
  return { status: 500, data: { message: 'Internal server error' } }
}
