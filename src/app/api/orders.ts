import { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '../types';

// Mock data
const orders: Order[] = [
  { id: 1, price: 100, quantity: 5, type: 'buy' },
  { id: 2, price: 105, quantity: 3, type: 'sell' },
  // ... add more mock orders
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(orders);
}
