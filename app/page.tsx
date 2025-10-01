'use client';

import React, { useState, useEffect } from 'react';
import { ordersStore } from './ordersStore';
import { IOrder, OrderStatus } from './interfaces';
import { Text, Card, Flex } from '@radix-ui/themes';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

export default function Home() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    setOrders(ordersStore.getAllOrders());
    
    const interval = setInterval(() => {
      setOrders(ordersStore.getAllOrders());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate order status distribution
  const statusData = [
    { name: 'Preparing', value: orders.filter(order => order.status === OrderStatus.PREPARING).length, color: '#f59e0b' },
    { name: 'Served', value: orders.filter(order => order.status === OrderStatus.SERVED).length, color: '#10b981' },
    { name: 'Cancelled', value: orders.filter(order => order.status === OrderStatus.CANCELLED).length, color: '#ef4444' }
  ];

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((total, order) => total + order.totalPrice, 0);
  const totalItemsSold = orders.reduce((total, order) => 
    total + order.items.reduce((total, item) => total + item.quantity, 0), 0
  );

  return (
    <div className="space-y-6">
      <Flex gap="4" wrap="wrap">
        <Flex gap="4" wrap="wrap" direction="column" width="20%">
           <Card className="p-4 flex-1" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             <Text size="2" color="gray">Total Orders</Text>
             <Text size="5" className="pt-3">{totalOrders}</Text>
           </Card>
           <Card className="p-4 flex-1" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             <Text size="2" color="gray">Total Revenue</Text>
             <Text size="5" className="pt-3">${totalRevenue.toFixed(2)}</Text>
           </Card>
           <Card className="p-4 flex-1" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             <Text size="2" color="gray">Total Items Sold</Text>
             <Text size="5" className="pt-3">{totalItemsSold}</Text>
           </Card>
        </Flex>
        <Card className="p-6 flex-1">
          <Text size="3" className="p-5">Order Status Chart</Text>
          <div className="h-85">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Flex>
    </div>
  );
}
