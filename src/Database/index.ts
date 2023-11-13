import mongoose, { Connection } from 'mongoose'
import config from '@/config'

class Database {
  connection!: Connection

  constructor() {
    this.connect()
  }

  connect() {
    mongoose.connect(config.mongo.uri as string)
    this.connection = mongoose.connection

    this.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error)
    })

    this.connection.once('open', () => {
      console.log(
        `\x1b[32m[server] Connected to \x1b[33mMongoDB\x1b[32m!\x1b[0m`,
      )
    })
  }
}

export default new Database()
