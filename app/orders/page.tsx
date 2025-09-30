'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table} from '@radix-ui/themes';
import Link from 'next/link';
import { ordersStore } from '../ordersStore';
import { IOrder } from '../interfaces';

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    // Load orders on component mount
    setOrders(ordersStore.getAllOrders());
    
    // Set up polling to check for updates (simple approach)
    const interval = setInterval(() => {
      setOrders(ordersStore.getAllOrders());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Button><Link href='/orders/new'>New Order</Link></Button>
      <Table.Root className='mt-10'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Table</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map(order => (
            <Table.Row key={order.id}>
              <Table.Cell>{order.table}</Table.Cell>
              <Table.Cell>${order.totalPrice.toFixed(2)}</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>{order.createdAt.toLocaleString()}</Table.Cell>
              <Table.Cell>{order.updatedAt.toLocaleString()}</Table.Cell>
              <Table.Cell>
                <Button><Link href={`/orders/${order.id}`}>View</Link></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table.Root>
    </div>
  )
}

export default OrdersPage