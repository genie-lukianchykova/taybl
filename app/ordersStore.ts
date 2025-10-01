import { IOrder, OrderStatus } from './interfaces';

// Load orders from localStorage on initialization
const loadOrders = (): IOrder[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('taybl-orders');
    if (stored) {
      try {
        return JSON.parse(stored).map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt)
        }));
      } catch (error) {
        console.error('Error parsing stored orders:', error);
      }
    }
  }
  return [];
};

let orders: IOrder[] = loadOrders();

// Save orders to localStorage
const saveOrders = (ordersToSave: IOrder[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('taybl-orders', JSON.stringify(ordersToSave));
  }
};

export const ordersStore = {
  getAllOrders: (): IOrder[] => {
    return [...orders];
  },

  addOrder: (order: IOrder): void => {
    orders.push(order);
    saveOrders(orders);
  },

  updateOrder: (id: number, updates: Partial<IOrder>): void => {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates };
      saveOrders(orders);
    }
  },

  removeOrder: (id: number): boolean => {
    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
      orders.splice(index, 1);
      saveOrders(orders);
      return true;
    }
    return false;
  },

  getOrdersByStatus: (status: OrderStatus): IOrder[] => {
    return orders.filter(order => order.status === status);
  },

  getOrderById: (id: number): IOrder | undefined => {
    return orders.find(order => order.id === id);
  },

  // Clear all orders (useful for testing)
  clearAllOrders: (): void => {
    orders = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('taybl-orders');
    }
  }
};