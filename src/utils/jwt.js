const generarJWT = userId => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid
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
          reject('Token not generated')
        } else {
          resolve(token)
        }
      }
    )
  })
}
