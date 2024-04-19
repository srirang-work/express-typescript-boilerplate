import {
    Document, model, Schema,
  } from 'mongoose'
  

  export interface IWallet extends Document {
    userId: string;
    amount: number;
  }
  
  const walletSchema: Schema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })

  walletSchema.index({ userId: 1 }, { unique: true })
  
  const Wallet = model<IWallet>('Wallet', walletSchema)
  
  export default Wallet
  