import bcrypt from 'bcryptjs'

export const encrytp = async text => bcrypt.hash(text, await bcrypt.genSalt(12))

export const validate = async (text, dbText) =>
  await bcrypt.compare(text, dbText)
