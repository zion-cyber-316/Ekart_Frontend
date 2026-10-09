import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

import React, { useEffect, useState } from 'react'
// import { Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: []
});


const salesData = [
  { date: "Aug 1", amount: 1200 },
  { date: "Aug 2", amount: 1800 },
  { date: "Aug 3", amount: 1500 },
  { date: "Aug 4", amount: 2400 },
  { date: "Aug 5", amount: 2100 },
  { date: "Aug 6", amount: 3000 },
  { date: "Aug 7", amount: 2800 },
  { date: "Aug 8", amount: 3500 },
  { date: "Aug 9", amount: 3200 },
  { date: "Aug 10", amount: 4000 },
];


const fetchStats = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await axios.get(
            `${import.meta.env.VITE_URL}/api/order/sales`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
console.log(res.data)
        if (res.data.success) {
            setStats(res.data);
        }
    } catch (error) {
        console.log(error);
    }
};

useEffect(()=>{
  fetchStats()
},[])

  return (
 <div className='pl-[350px] bg-gray-100 py-20 pr-20 mx-auto px-4'>
    <div className='p-6 grid grid-cols-4 gap-4'>
        {/* stats card */}
        <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
                <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className= 'text-2xl font-bold'>{stats.totalUsers}</CardContent>
        </Card>

         <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
                <CardTitle>Total Products</CardTitle>
            </CardHeader>
            <CardContent className= 'text-2xl font-bold'>{stats.totalProducts}</CardContent>
        </Card>

         <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
                <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent className= 'text-2xl font-bold'>{stats.totalOrders}</CardContent>
        </Card>

         <Card className="bg-pink-500 text-white shadow">
            <CardHeader>
                <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent className= 'text-2xl font-bold'>{stats.totalSales}</CardContent>
        </Card>

        {/* sales chart */}
<Card className="lg:col-span-4">
  <CardHeader>
    <CardTitle>Sales (Last 30 Days)</CardTitle>
  </CardHeader>

  <CardContent>
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={stats.sales}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#F472B6"
            fill="#F472B6"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>



    </div>
</div>
  )
}

export default AdminSales
