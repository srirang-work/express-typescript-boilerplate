import Transaction, { TransactionType, SourceType } from '@/models/Transaction';
import Wallet from '@/models/Wallet';

import { Request, Response } from 'express'


export async function initiateWallet(req: Request, res: Response) {
    const { query } = req;
    const { userId } = query;

    try {
        const wallet = new Wallet({
            userId,
            amount: 0
        });
        await wallet.save();
        return res.status(200).json({ message: 'Wallet initiated', result: wallet });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    } 
}


export async function viewWallet(req: Request, res: Response) {
    const { query } = req;
    const { userId } = query;

    try {
        const wallet = await Wallet.findOne({ userId }).lean().exec();
        return res.status(200).json({ message: 'Wallet', result: wallet });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    } 
}

export async function addRemoveFunds(req: Request, res: Response) {
    const { body } = req;

    //TODO: JOI Validations

    try {
        const { transactionType, userId, amount } = body;

        const wallet = await Wallet.findOne({ userId }).lean().exec();
        const { amount: existingAmount } = wallet;
        const updatedAmount = (transactionType === TransactionType.CREDIT) ? existingAmount + amount : existingAmount - amount;

        if(updatedAmount < 0) {
            throw new Error('Funds insufficient')
        }

        await Wallet.updateOne({ userId }, {
            $set: {
                amount: updatedAmount
            }
        }).exec();

        const newTransaction = new Transaction({
            userId,
            amount,
            accountToId: userId,
            source: 'wallet',
            sourceType: SourceType.SELF,
            transactionType: transactionType
          })
          await newTransaction.save();
        return res.status(200).json({ message: 'Wallet operation done' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    } 
}