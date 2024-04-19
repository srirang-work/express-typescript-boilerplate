import { connect } from 'mongoose'
// eslint-disable-next-line prefer-const
let monURI = 'mongodb://mongoadmin:mob123@localhost:27018/admin'


const connectDB = async () => {
  try {
    await connect(monURI)
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err)
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
