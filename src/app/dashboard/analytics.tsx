'use client';

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => { 
  const [activeTab, setActiveTab] = useState('Orders');
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);

  const orderData = [
    {
      orderNumber: "#1234",
      date: "10/12/2024",
      name: "Abraham Lincoln",
      status: "In-Progress",
    },
    {
      orderNumber: "#8765",
      date: "10/12/2024",
      name: "Emma Thompson",
      status: "In-Progress",
    },
    {
      orderNumber: "#9876",
      date: "10/12/2024",
      name: "Michael Chen",
      status: "Completed",
    },
    {
      orderNumber: "#2345",
      date: "10/12/2024",
      name: "Sophia Rodriguez",
      status: "In-Progress",
    },
    {
      orderNumber: "#3456",
      date: "10/12/2024",
      name: "William Patel",
      status: "Completed",
    },
    {
      orderNumber: "#4567",
      date: "10/12/2024",
      name: "Olivia Nguyen",
      status: "Completed",
    },
    {
      orderNumber: "#5678",
      date: "10/12/2024",
      name: "Ethan Kowalski",
      status: "In-Progress",
    },
    {
      orderNumber: "#6789",
      date: "10/12/2024",
      name: "Ava Tanaka",
      status: "In-Progress",
    },
    {
      orderNumber: "#7890",
      date: "10/12/2024",
      name: "Noah Garcia",
      status: "Completed",
    },
    {
      orderNumber: "#8901",
      date: "10/12/2024",
      name: "Isabella Kim",
      status: "In-Progress",
    },
    {
      orderNumber: "#9012",
      date: "10/12/2024",
      name: "Liam O'Connor",
      status: "In-Progress",
    },
    {
      orderNumber: "#0123",
      date: "11/12/2024",
      name: "Zoe Mbatha",
      status: "In-Progress",
    },
    {
      orderNumber: "#2345",
      date: "11/12/2024",
      name: "Yuki Tanaka",
      status: "Completed",
    },
    {
      orderNumber: "#3456",
      date: "11/12/2024",
      name: "Ava Tanaka",
      status: "Completed",
    },
    {
      orderNumber: "#4567",
      date: "11/12/2024",
      name: "Ethan Kowalski",
      status: "In-Progress",
    },
    {
      orderNumber: "#5678",
      date: "12/12/2024",
      name: "Olivia Nguyen",
      status: "Completed",
    },
    {
      orderNumber: "#6789",
      date: "12/12/2024",
      name: "William Patel",
      status: "In-Progress",
    },
    {
      orderNumber: "#7890",
      date: "12/12/2024",
      name: "Sophia Rodriguez",
      status: "Completed",
    },
    {
      orderNumber: "#8901",
      date: "12/12/2024",
      name: "Michael Chen",
      status: "Completed",
    },
    {
      orderNumber: "#9012",
      date: "12/12/2024",
      name: "Emma Thompson",
      status: "In-Progress",
    },
    {
      orderNumber: "#0123",
      date: "13/12/2024",
      name: "Abraham Lincoln",
      status: "Completed",
    },
    {
      orderNumber: "#2345",
      date: "13/12/2024",
      name: "Liam O'Connor",
      status: "Cancelled",
    },
    {
      orderNumber: "#3456",
      date: "13/12/2024",
      name: "Yuki Tanaka",
      status: "In-Progress",
    },
  ];
  
  useEffect(() => {
    if (activeTab === 'Completion') {
      const statusCounts = orderData.reduce<Record<string, number>>((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: ['#FBFF8E', '#94FF8E','#FF8E8E'],
            hoverBackgroundColor: ['#FBFF8E', '#94FF8E','#FF8E8E'],
          },
        ],
      });
    }
  }, [activeTab]);

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          color: 'white',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="container max-w-[750px] h-[500px] text-white border border-[#c4c4c4] rounded-2xl">
      <div className="flex justify-between items-center p-5 pb-12 text-[48px] font-semibold">
        <h2 className="text-[42px] font-semibold">Analytics</h2>
        
        <div className="flex space-x-8 text-[24px] font-medium">
          <button 
            className={`pr-7 cursor-pointer ${activeTab === 'Orders' ? 'text-[#e3e300] underline' : 'text-white hover:underline'}`} 
            onClick={() => setActiveTab('Orders')}
          >
            Orders
          </button>
          <button 
            className={`pr-7 cursor-pointer ${activeTab === 'Completion' ? 'text-[#e3e300] underline' : 'text-white hover:underline'}`} 
            onClick={() => setActiveTab('Completion')}
          >
            Completion
          </button>
        </div>
      </div>
      
      {activeTab === 'Orders' ? (

        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-1 bg-[#484848] rounded-lg p-4 hover:border-[#FFFFFF] hover:border">
            <div className="flex items-center mb-2 ">
              <span className="text-white text-2xl mr-2">$</span>
              <span className="text-[#e3e300] text-4xl font-bold">23822.19</span>
            </div>
            <div className="text-gray-400 text-xl">Total Revenue</div>
          </div>
          <div className="col-span-1 bg-[#484848] rounded-lg p-4 hover:border-[#FFFFFF] hover:border">
            <div className="flex items-center mb-2">
              <span className="text-white text-2xl mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <span className="text-[#e3e300] text-4xl font-bold">182</span>
            </div>
            <div className="text-gray-400 text-xl">Total Orders</div>
          </div>
          <div className="col-span-2 bg-[#484848] rounded-lg p-4 hover:border-[#FFFFFF] hover:border">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xl">Sales Growth:</span>
              <div>
                <span className="text-[#e3e300] text-4xl font-bold">+9.8%</span>
                <span className="text-green-500 ml-2">↗️</span>
                <span className="text-gray-400 text-xl ml-2">(Sep-Oct)</span>
              </div>
            </div>
          </div>
        </div>

      ) : (
        <div className="w-full h-[300px] flex justify-center items-center">
          {chartData ? (
            <Pie data={chartData} options={chartOptions} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Analytics;
