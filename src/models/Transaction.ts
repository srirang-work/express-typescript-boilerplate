import {
    Document, model, Schema,
  } from 'mongoose'
  

  export enum TransactionType {
    CREDIT = 'credit',
    DEBIT = 'debit'
  }
  export enum SourceType {
    SELF = 'self',
    EXTERNAL = 'external'
  }

  export interface ITransaction extends Document {
    sourceId: string;
    amount: number;
    walletId: string;
    timestamp: Date;
    source: string;
    sourceType: SourceType;
    transactionType: TransactionType
  }
  
  const TransactionSchema: Schema = new Schema({
    sourceId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true
    },
    walletId: {
        type: String
      },
    timestamp: {
        type: Date,
        default: Date.now
      },
    source: {
        type: String,
        required: true
      },
    sourceType: {
        type: String,
        required: true
      },
      transactionType: {
        type: String,
        required: true
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
  
  //TODO: schmea level validation on accountId or merchantId based on sourceType?

  const Transaction = model<ITransaction>('Transaction', TransactionSchema)
  
  export default Transaction
  