'use client';

import React, { useState, useEffect } from 'react'
import { Flex, Card, Text, Box, Button } from '@radix-ui/themes';
import { ordersStore } from '../../../ordersStore';
import { IOrder, OrderStatus } from '../../../interfaces';
import { getMenuItemById } from '../../../menuData';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ViewPage = () => {
  const params = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');

  const loadOrder = () => {
    const orderId = parseInt(params.id as string);
    console.log('Looking for order ID:', orderId);
    console.log('All orders:', ordersStore.getAllOrders());
    
    const foundOrder = ordersStore.getOrderById(orderId);
    setOrder(foundOrder || null);
  };

  useEffect(() => {
    loadOrder();
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
        <h1>Order Details</h1>
        {message && <div style={{color: 'red', marginBottom: '10px'}}>{message}</div>}
        <Card>
            <Flex gap="5" direction="column">
                <Box>
                  <Text weight="bold" size="4">Table {order.table}</Text>
                </Box>
                <Box> 
                  <Flex gap="5">
                    <Text size="3">Status: {order.status}</Text>
                    <Text size="3">Created At: {order.createdAt.toLocaleTimeString()}</Text>
                  </Flex>
                </Box>
                <Box>
                  <Text weight="bold" size="4">Total Price: ${order.totalPrice.toFixed(2)}</Text>
                </Box>
                <Box>
                  <Flex gap="5">
                    <Text size="3">Items: {order.items.map(item => {
                      const menuItem = getMenuItemById(item.menuItemId);
                      return `${menuItem?.name || 'Unknown'} (${item.quantity})`;
                    }).join(', ')}</Text>
                  </Flex>
                </Box>
                 <Flex gap="5">
                   <Button color="green" variant="soft" onClick={() => {
                    if (order.status === OrderStatus.CANCELLED) {
                      setMessage('Order is already cancelled');
                      return;
                    }
                      ordersStore.updateOrder(order.id, { status: OrderStatus.SERVED });
                      loadOrder();
                   }}>Serve</Button>
                   <Button color="red" variant="soft" onClick={() => {
                      ordersStore.updateOrder(order.id, { status: OrderStatus.CANCELLED });
                      loadOrder();
                   }}>Cancel</Button>
                   <Button variant="soft" color="gray">
                      <Link href={`/orders`}>Go Back</Link>
                   </Button>
                 </Flex>
            </Flex>
        </Card>
    </div>
  )
}

export default ViewPage