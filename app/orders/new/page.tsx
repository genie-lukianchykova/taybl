'use client';

import React, { useState } from 'react';
import { Button, Flex, Select, Card, Text, Badge } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { getMenuByCategory, getMenuItemById } from '../../menuData';
import { IOrderItem, IOrder, OrderStatus } from '../../interfaces';
import { ordersStore } from '../../ordersStore';

const NewOrderPage = () => {
  const [selectedItems, setSelectedItems] = useState<IOrderItem[]>([]);
  const [category, setCategory] = useState<'drinks' | 'food' | 'desserts'>('drinks');
  const [table, setTable] = useState<number>(1);
  const router = useRouter();

  const add = (menuItemId: number) => {
    const exist = selectedItems.find(item => item.menuItemId === menuItemId);
    if (exist) {
      setSelectedItems(items => 
        items.map(item => 
          item.menuItemId === menuItemId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems(items => [...items, { menuItemId, quantity: 1 }]);
    }
  };

  const remove = (menuItemId: number) => {
    setSelectedItems(items => items.filter(item => item.menuItemId !== menuItemId));
  };

  const changeNumber = (menuItemId: number, quantity: number) => {
    if (quantity <= 0) {
      remove(menuItemId);
      return;
    }
    setSelectedItems(items => 
      items.map(item => 
        item.menuItemId === menuItemId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const totalPrice = () => {
    return selectedItems.reduce((total, item) => {
      const menuItem = getMenuItemById(item.menuItemId);
      return total + (menuItem?.price || 0) * item.quantity;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder: IOrder = {
      id: Date.now(),
      table: table,
      totalPrice: totalPrice(),
      status: OrderStatus.PREPARING,
      items: selectedItems,
      createdAt: new Date(),
    };
    
    ordersStore.addOrder(newOrder);
    console.log('Order submitted:', newOrder);
    router.push('/orders');
  };

  const handleTableChange = (value: string) => {
    const tableNumber = parseInt(value);
    setTable(tableNumber);
  };

  const categories = ['drinks', 'food', 'desserts'] as const;
  const menuByCategory = getMenuByCategory(category);

  return (
    <div className="max-w-4xl m-auto space-y-6">
      <h1 className="text-2xl font-bold">New Order</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tables */}
        <Card>
          <Flex gap="5">
            <Text weight="bold">Table Selection</Text>
            <Select.Root value={table.toString()} onValueChange={handleTableChange}>
              <Select.Trigger placeholder="Pick a table" />
              <Select.Content>
                <Select.Group>
                  {[1, 2, 3, 4, 5, 6].map(table => (
                    <Select.Item key={table} value={table.toString()}>
                      Table {table}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>
        </Card>

        {/* Menu */}
        <Card>
          <Flex direction="column" gap="4">
            <Text weight="bold">Select Items</Text>
            
            {/* Categories*/}
            <Flex gap="2">
              {categories.map(category => (
                <Button
                  key={category}
                  type="button"
                  variant={category === category ? "solid" : "outline"}
                  onClick={() => setCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </Flex>

            {/* Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-3">
              {menuByCategory.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 border border-zinc-300 rounded">
                  <div>
                    <Text weight="bold">{item.name}</Text>
                    <Text color="gray" className="p-3">${item.price.toFixed(2)}</Text>
                  </div>
                  <Button type="button" onClick={() => add(item.id)}>
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </Flex>
        </Card>

        {/* Total Price */}
          <Card>
            <Flex direction="column" gap="3">
              <Text weight="bold">Order Summary</Text>
              {selectedItems.map(item => {
                const menuItem = getMenuItemById(item.menuItemId);
                if (!menuItem) return null;
                
                return (
                  <div key={item.menuItemId} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Text>{menuItem.name}</Text>
                      <Badge>${menuItem.price.toFixed(2)}</Badge>
                    </div>
                    <Flex align="center" gap="2">
                      <Button 
                        type="button"
                        size="1" 
                        onClick={() => changeNumber(item.menuItemId, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Text>{item.quantity}</Text>
                      <Button 
                        type="button"
                        size="1" 
                        onClick={() => changeNumber(item.menuItemId, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button 
                        type="button"
                        size="1" 
                        variant="outline" 
                        color="red"
                        onClick={() => remove(item.menuItemId)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </div>
                );
              })}
              <div className="border-t pt-3">
                <Text size="4" weight="bold">
                  Total: ${totalPrice().toFixed(2)}
                </Text>
              </div>
            </Flex>
          </Card>

        {/* Submit Button */}
        <Button type="submit" size="3" disabled={selectedItems.length === 0}>
          Submit Order
        </Button>
      </form>
    </div>
  );
};

export default NewOrderPage;