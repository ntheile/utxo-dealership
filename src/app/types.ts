export type OrderType = 'buy' | 'sell';

export interface Order {
  id: number;
  price: number;
  quantity: number;
  type: OrderType;
}
