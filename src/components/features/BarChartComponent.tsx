'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { JamaahData } from '@/data/statisticsData';

interface BarChartComponentProps {
  data: JamaahData[];
}

export default function BarChartComponent({ data }: BarChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        {/* Grid dengan warna yang sesuai theme */}
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke="#E5C8B5"
          opacity={1}
        />
        
        {/* X Axis */}
        <XAxis 
          dataKey="date" 
          stroke="#000000"
          fontSize={11} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
          tick={{ fontFamily: 'var(--font-montserrat)', fontWeight: '500' }}
        />
        
        {/* Y Axis */}
        <YAxis 
          stroke="#000000"
          fontSize={11} 
          tickLine={false} 
          axisLine={false} 
          allowDecimals={false}
          tick={{ fontFamily: 'var(--font-montserrat)', fontWeight: '500' }}
        />
        
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '12px', 
            border: '1.5px solid #000000',
            boxShadow: '0 4px 12px rgba(32, 14, 9, 0.15)',
            fontFamily: 'var(--font-montserrat)',
          }}
          labelClassName="font-montserrat text-xs font-bold text-foreground"
          labelStyle={{ color: '#BA3E1A' }} 
          itemStyle={{ 
            color: '#BA3E1A',
            fontSize: '12px', 
            fontWeight: '600',
            fontFamily: 'var(--font-montserrat)',
          }}
          cursor={{ fill: '#FFFBE0', opacity: 0.3 }}
        />
        
        <Bar 
          dataKey="total_jamaah" 
          fill="#BA3E1A"
          radius={[8, 8, 0, 0]} 
          maxBarSize={50}
          name="Total Jama'ah"
          animationDuration={600}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}