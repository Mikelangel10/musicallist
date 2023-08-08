import mongoose from 'mongoose'

const connect = async uri => {
  try {
    await mongoose.connect(uri)
    console.log('Database is connected')
  } catch (error) {
    console.log('Error Database:', error)
  }
}

export default connect
