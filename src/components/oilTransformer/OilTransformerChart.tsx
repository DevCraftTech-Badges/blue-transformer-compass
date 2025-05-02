
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const OilTransformerChart = () => {
  // Mock data for demonstration - just one data point as requested
  const data = [
    {
      date: '2025-05-01',
      amount: 44,
    },
  ];

  // Mock reference levels
  const reorderLevel = 30;
  const safetyStockLevel = 20;

  // Chart configuration
  const chartConfig = {
    amount: {
      label: "ปริมาณน้ำมัน [ถัง]",
      theme: {
        light: "#0284c7",
        dark: "#38bdf8",
      },
    },
    reorder: {
      label: "Re-order Level",
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24",
      },
    },
    safety: {
      label: "Safety Stock",
      theme: {
        light: "#dc2626",
        dark: "#ef4444",
      },
    },
  };

  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          label={{ value: 'วันที่', position: 'insideBottomRight', offset: -5 }}
          tickFormatter={(value) => new Date(value).toLocaleDateString('th-TH')}
          stroke="#888"
          tick={{ fill: '#666' }}
        />
        <YAxis 
          label={{ value: 'ปริมาณน้ำมัน [ถัง]', angle: -90, position: 'insideLeft', offset: -5 }}
          stroke="#888"
          tick={{ fill: '#666' }}
          domain={[0, 'dataMax + 20']}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend verticalAlign="top" height={36} />
        <ReferenceLine 
          y={reorderLevel} 
          stroke="var(--color-reorder)" 
          strokeDasharray="3 3" 
          label={{ 
            position: 'right',
            value: "Re-order Level",
            fill: "#f59e0b",
            fontSize: 12
          }} 
        />
        <ReferenceLine 
          y={safetyStockLevel} 
          stroke="var(--color-safety)" 
          strokeDasharray="3 3" 
          label={{ 
            position: 'right',
            value: "Safety Stock",
            fill: "#dc2626",
            fontSize: 12
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="var(--color-amount)" 
          strokeWidth={3}
          activeDot={{ r: 8, fill: "#0284c7", stroke: "#fff", strokeWidth: 2 }}
          dot={{ r: 6, fill: "#0284c7", stroke: "#fff", strokeWidth: 2 }}
          name="ปริมาณน้ำมัน"
        />
      </LineChart>
    </ChartContainer>
  );
};

export default OilTransformerChart;
