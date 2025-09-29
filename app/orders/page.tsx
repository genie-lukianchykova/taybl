import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const OrdersPage = () => {
  return (
    <div><Button><Link href='/orders/new'>New Order</Link></Button></div>
  )
}

export default OrdersPage