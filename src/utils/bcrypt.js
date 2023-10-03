import bcrypt from 'bcryptjs'

export const encrytpBcrypt = async text =>
  bcrypt.hash(text, await bcrypt.genSalt(12))

export const validateBcrypt = async (text, dbText) =>
  await bcrypt.compare(text, dbText)
