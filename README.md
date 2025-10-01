# Taybl - Restaurant Order Management System

A modern, responsive restaurant order management system built with Next.js, TypeScript, and Tailwind CSS. Taybl helps restaurant staff efficiently manage orders, track order status, and view analytics.

## 🚀 Features

### 📊 Dashboard
- Real-time order analytics and statistics
- Visual charts showing order status distribution
- Total orders, revenue, and items sold tracking
- Live updates every second

### 🍽️ Order Management
- **Create New Orders**: Add items from categorized menu
- **Table Management**: Assign orders to specific tables
- **Order Tracking**: View all orders and filter them
- **Order Status**: Track orders through PREPARING → SERVED → CANCELLED states
- **Order Details**: View detailed order information

### 🎨 UI
- Modern, responsive design with Radix UI components
- Dark/light theme support
- Intuitive navigation with clean layouts
- Mobile-friendly interface

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.1.13
- **UI Components**: Radix UI Themes 3.2.1
- **Charts**: Recharts 3.2.1
- **State Management**: Local Storage with custom store

## 📁 Project Structure

```
taybl/
├── app/
│   ├── orders/
│   │   ├── new/
│   │   │   └── page.tsx          # Create new order page
│   │   ├── view/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # View specific order details
│   │   └── page.tsx              # Orders list page
│   ├── interfaces.ts             # Order Interfaces
│   ├── menuData.ts              # Menu items and helper functions
│   ├── ordersStore.ts           # Order state management
│   ├── NavBar.tsx               # Navigation component
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Dashboard/Home page
│   └── globals.css              
├── public/                      
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Dashboard Analytics
- View real-time statistics on the home page
- Monitor order status distribution with interactive charts
- Track total revenue and items sold

## 🗄️ Data Storage

The application uses **localStorage** for data persistence:
- Orders are automatically saved when created
- Data persists between browser sessions
- No external database required for basic functionality
