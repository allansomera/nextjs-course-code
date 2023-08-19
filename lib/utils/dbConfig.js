import mongoose from 'mongoose'

// const connectMongo = async () => {
//   if (mongoose.connection.readState >= 1) {
//     return
//   }
//
//   mongoose.connection.on('connected', () => {
//     console.log('connected to mongo db')
//   })
//
//   mongoose.connection.on('error', (err) => {
//     console.log(`db connection problem`, err.message)
//   })
//
//   return mongoose.connect(process.env.MONGODB_URI)
// }

// const connection = {}
// const dbConnect = async () => {
//   if (connection.isConnected) return
//
//   const db = mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//
//   connection.isConnected = (await db).connections[0].readyState
// }

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
  if (cached.conn) {
    console.log('Cached mongodb is called!')
    return cached.conn
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true)
    cached.promise = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('connected to mongoDB!')
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
