import { Request, Response } from 'express';
import * as db from '../db';
import { validate } from './validator';

export const createCustomer = async (req: Request, res: Response) => {
    const { name, shippingAddress } = req.body;
    if(validate(name) == false||validate(shippingAddress))
    {
        res.status(422).json({ 'status': 'failed: contains forbidden characters.'})
    }
    else
    {
        await db.createCustomer(name, shippingAddress);
        res.status(201).json({ 'status': 'success' });
    }
}

export const updateCustomerAddress = async (req: Request, res: Response) => {
    const { cid, address } = req.body;
    await db.updateCustomerAddress(cid, address);
    res.status(200).json({ 'status': 'success' });
}

export const getCustomerBalance = async (req: Request, res: Response) => {
    const { cid } = req.body;
    const balance = await db.customerBalance(cid);
    res.status(200).json({ balance });
}