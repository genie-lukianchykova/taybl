'use client';

import { Button, Flex, Select, Card, Text, Badge } from '@radix-ui/themes';
import React, { useState } from 'react';
import { MENU_ITEMS, getMenuByCategory } from '../../menuData';
import { IOrderItem, IOrder, OrderStatus } from '../../interfaces';
import { ordersStore } from '../../ordersStore';
import { useRouter } from 'next/navigation';

const NewOrderPage = () => {
  const [selectedItems, setSelectedItems] = useState<IOrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'drinks' | 'food' | 'desserts'>('drinks');
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const router = useRouter();

  const addItem = (menuItemId: number) => {
    const existingItem = selectedItems.find(item => item.menuItemId === menuItemId);
    if (existingItem) {
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

  const removeItem = (menuItemId: number) => {
    setSelectedItems(items => items.filter(item => item.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
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

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => {
      const menuItem = MENU_ITEMS.find(m => m.id === item.menuItemId);
      return total + (menuItem?.price || 0) * item.quantity;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder: IOrder = {
      id: Date.now(),
      table: selectedTable,
      totalPrice: getTotalPrice(),
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
    setSelectedTable(tableNumber);
  };

  const categories = ['drinks', 'food', 'desserts'] as const;
  const menuByCategory = getMenuByCategory(selectedCategory);

  return (
    <div className="max-w-4xl m-auto space-y-6">
      <h1 className="text-2xl font-bold">New Order</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tables */}
        <Card>
          <Flex gap="5">
            <Text weight="bold">Table Selection</Text>
            <Select.Root value={selectedTable.toString()} onValueChange={handleTableChange}>
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
                  variant={selectedCategory === category ? "solid" : "outline"}
                  onClick={() => setSelectedCategory(category)}
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
                  <Button type="button" onClick={() => addItem(item.id)}>
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </Flex>
        </Card>

        {/* Total Price */}
        {selectedItems.length > 0 && (
          <Card>
            <Flex direction="column" gap="3">
              <Text weight="bold">Order Summary</Text>
              {selectedItems.map(item => {
                const menuItem = MENU_ITEMS.find(m => m.id === item.menuItemId);
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
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Text>{item.quantity}</Text>
                      <Button 
                        type="button"
                        size="1" 
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button 
                        type="button"
                        size="1" 
                        variant="outline" 
                        color="red"
                        onClick={() => removeItem(item.menuItemId)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </div>
                );
              })}
              <div className="border-t pt-3">
                <Text size="4" weight="bold">
                  Total: ${getTotalPrice().toFixed(2)}
                </Text>
              </div>
            </Flex>
          </Card>
        )}

        {/* Submit Button */}
        <Button type="submit" size="3" disabled={selectedItems.length === 0}>
          Submit Order
        </Button>
      </form>
    </div>
  );
};

export default NewOrderPage;