'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, Select } from '@radix-ui/themes';
import Link from 'next/link';
import { ordersStore } from '../ordersStore';
import { IOrder, OrderStatus } from '../interfaces';


const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tableFilter, setTableFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (tableFilter !== 'all' && order.table !== parseInt(tableFilter)) return false;
    return true;
  });

  useEffect(() => {
    setOrders(ordersStore.getAllOrders());
    
    const interval = setInterval(() => {
      setOrders(ordersStore.getAllOrders());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
       <div className='flex justify-between items-center mt-10 mb-5'>
         <div className='flex gap-4'>
           <Select.Root value={statusFilter} onValueChange={setStatusFilter}>
             <Select.Trigger placeholder="Filter by status" />
             <Select.Content>
               <Select.Item value="all">All</Select.Item>
               <Select.Item value={OrderStatus.SERVED}>Served</Select.Item>
               <Select.Item value={OrderStatus.PREPARING}>Preparing</Select.Item>
               <Select.Item value={OrderStatus.CANCELLED}>Cancelled</Select.Item>
             </Select.Content>
           </Select.Root>
           <Select.Root value={tableFilter} onValueChange={(value) => setTableFilter(value as string)}>
             <Select.Trigger placeholder="Filter by table" />
             <Select.Content>
               <Select.Item value="all">All</Select.Item>
               <Select.Item value="1">Table 1</Select.Item>
               <Select.Item value="2">Table 2</Select.Item>
               <Select.Item value="3">Table 3</Select.Item>
               <Select.Item value="4">Table 4</Select.Item>
               <Select.Item value="5">Table 5</Select.Item>
               <Select.Item value="6">Table 6</Select.Item>
             </Select.Content>
           </Select.Root>
         </div>
         <Button><Link href='/orders/new'>New Order</Link></Button>
       </div>

      <Table.Root className='mt-5' variant="surface">
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
          {filteredOrders.map(order => (
            <Table.Row key={order.id}>
              <Table.Cell>{order.table}</Table.Cell>
              <Table.Cell>${order.totalPrice.toFixed(2)}</Table.Cell>
              <Table.Cell>
                <Badge 
                  color={order.status === OrderStatus.SERVED 
                    ? 'green' 
                    : order.status === OrderStatus.CANCELLED 
                    ? 'red' : 'yellow'}
                  variant="soft"
                  size="3">{order.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{order.createdAt.toLocaleTimeString()}</Table.Cell>
              <Table.Cell>
                <Button><Link href={`/orders/view/${order.id}`}>View</Link></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table.Root>
    </div>
  )
}

export default OrdersPage