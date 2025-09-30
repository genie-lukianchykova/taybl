import { IOrder, OrderStatus } from './interfaces';

let orders: IOrder[] = [];

export const ordersStore = {
  getAllOrders: (): IOrder[] => {
    return [...orders];
  },

  addOrder: (order: IOrder): void => {
    orders.push(order);
  },

  updateOrder: (id: number, updates: Partial<IOrder>): void => {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates };
    }
  },

  removeOrder: (id: number): boolean => {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
      orders.splice(index, 1);
      return true;
    }
    return false;
  },

  getOrdersByStatus: (status: OrderStatus): IOrder[] => {
    return orders.filter(order => order.status === status);
  },

  getOrderById: (id: number): IOrder | undefined => {
    return orders.find(order => order.id === id);
  }
};