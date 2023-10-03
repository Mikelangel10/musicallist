import jwt from 'jsonwebtoken'

export const generateJWT = userId => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      },
      (err, token) => {
        if (err) {
          console.log(err)
          Promise.reject(new Error('Token not generated'))
        } else {
          resolve(token)
        }
      }
    )
  })
}
