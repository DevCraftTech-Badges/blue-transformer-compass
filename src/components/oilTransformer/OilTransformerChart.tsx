
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
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          label={{ value: 'วันที่', position: 'insideBottomRight', offset: -5 }}
          tickFormatter={(value) => new Date(value).toLocaleDateString('th-TH')}
        />
        <YAxis 
          label={{ value: 'ปริมาณน้ำมัน [ถัง]', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        <ReferenceLine y={reorderLevel} stroke="var(--color-reorder)" strokeDasharray="3 3" label="Re-order Level" />
        <ReferenceLine y={safetyStockLevel} stroke="var(--color-safety)" strokeDasharray="3 3" label="Safety Stock" />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="var(--color-amount)" 
          activeDot={{ r: 8 }}
          name="ปริมาณน้ำมัน"
        />
      </LineChart>
    </ChartContainer>
  );
};

export default OilTransformerChart;
