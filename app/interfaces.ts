export enum OrderStatus {
  PREPARING = 'PREPARING',
  SERVED = 'SERVED',
  CANCELLED = 'CANCELLED'
}

export interface IMenuItem {
  id: number;
  name: string;
  price: number;
  category: 'drinks' | 'food' | 'desserts';
}

export interface IOrderItem {
  menuItemId: number;
  quantity: number;
}

export interface IOrder {
  id: number;
  table: number;
  totalPrice: number;
  status: OrderStatus;
  items: IOrderItem[];
  createdAt: Date;
}