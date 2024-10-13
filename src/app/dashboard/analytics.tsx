'use client';

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { receipts } from '~/server/db/schema';
import { InferSelectModel } from 'drizzle-orm';

ChartJS.register(ArcElement, Tooltip, Legend);
type Receipt = InferSelectModel<typeof receipts>;

const Analytics = ({ receipts }: { receipts: Receipt[] }) => { 
  const [activeTab, setActiveTab] = useState('Orders');
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);

  useEffect(() => {
    if (activeTab === 'Completion') {
      const statusCounts = receipts.reduce<Record<string, number>>((acc, receipt) => {
        const status = receipt.status ?? 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
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
    <div className="container h-[100px] lg:h-[300px] text-white border-[#c4c4c4] rounded-2xl">
      <div className="flex justify-between items-center px-3 py-3 sm:px-3 sm:py-3 md:px-3 md:py-3 lg:px-5 lg:py-3 font-semibold">
        <h2 className="text-[1.2rem] font-semibold sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.8rem]">Analytics</h2>
        
        <div className="flex lg:space-x-4 text-[0.8rem] font-medium sm:text-[0.8rem] md:text-[1.0rem] lg:text-[1.3rem]">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 bg-[#484848] h-[100px] lg:h-[150px] rounded-lg p-4 hover:border-[#FFFFFF] hover:border text-center flex flex-col justify-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-white lg:text-2xl pr-2">$</span>
              <span className="text-[#e3e300] text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold">23822.19</span>
            </div>
            <div className="text-gray-400 text-lg sm:text-2xl md:text-2xl lg:text-3xl">Total Revenue</div>
          </div>
          <div className="col-span-1 bg-[#484848] rounded-lg p-4 hover:border-[#FFFFFF] hover:border flex flex-col justify-center h-[100px] lg:h-[150px]">
            <div className="flex items-center justify-center mb-2">
              <span className="text-white mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 lg:h-9 lg:w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <span className="text-[#e3e300] text-lg sm:text-2xl md:text-2xl lg:text-3xlfont-semibold">{receipts.length}</span>
            </div>
            <div className="text-gray-400 text-lg sm:text-2xl md:text-2xl lg:text-3xl text-center">Total Orders</div>
          </div>
          <div className="col-span-2 bg-[#484848] rounded-lg lg:p-5 hover:border-[#FFFFFF] hover:border">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 pl-2 text-lg sm:text-2xl md:text-2xl lg:text-3xl">Sales Growth:</span>
              <div className="md:p-4">
                <span className="text-[#e3e300] text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold">+9.8%</span>
                <span className="text-green-500 text-lg sm:text-2xl md:text-2xl lg:text-3xl pl-2">↗️</span>
                <span className="text-gray-400 text-lg sm:text-2xl md:text-2xl lg:text-3xl ml-2">(Sep-Oct)</span>
              </div>
            </div>
          </div>
        </div>

      ) : (
        <div className="w-full h-[250px] flex justify-center items-center">
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
