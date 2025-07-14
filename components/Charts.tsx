
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { reportData, typeData, SECTOR_COLORS, FINANCE_COLORS } from '../constants.ts';
import { CityData, CityType } from '../types.ts';

const sortedEmissionsData = Object.keys(reportData)
  .map((name) => ({ name, emissions: reportData[name].emissions, type: reportData[name].type }))
  .sort((a, b) => a.emissions - b.emissions);

export const EmissionsChart: React.FC = () => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={sortedEmissionsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" scale="log" domain={[100, 100000]} ticks={[100, 1000, 10000, 100000]} tickFormatter={(tick) => tick.toLocaleString()} />
      <YAxis type="category" dataKey="name" width={80} />
      <Tooltip formatter={(value: number) => `${value.toLocaleString()} 천톤CO₂eq`} />
      <Legend />
      <Bar dataKey="emissions" name="2018년 온실가스 배출량" >
        {sortedEmissionsData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.type === '산업도시형' ? '#ff6b6b' : '#4ecdc4'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const financeData = [{
  name: '재원',
  '시·군비': 45505,
  '국비': 84320,
  '도비': 16540,
  '민자 등': 91000,
}];

export const FinanceChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={150}>
    <BarChart data={financeData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" tickFormatter={(tick) => `${(tick / 10000).toFixed(0)}조`} />
      <YAxis type="category" dataKey="name" hide />
      <Tooltip formatter={(value: number) => `${value.toLocaleString()} 억원`} />
      <Legend />
      <Bar dataKey="시·군비" stackId="a" fill={FINANCE_COLORS['시·군비']} />
      <Bar dataKey="국비" stackId="a" fill={FINANCE_COLORS['국비']} />
      <Bar dataKey="도비" stackId="a" fill={FINANCE_COLORS['도비']} />
      <Bar dataKey="민자 등" stackId="a" fill={FINANCE_COLORS['민자 등']} />
    </BarChart>
  </ResponsiveContainer>
);

interface TypeDistributionChartProps {
  cityType: CityType;
}

export const TypeDistributionChart: React.FC<TypeDistributionChartProps> = ({ cityType }) => {
  const data = typeData[cityType].sectors;
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

interface CitySectorsChartProps {
  cityData: CityData;
}
export const CitySectorsChart: React.FC<CitySectorsChartProps> = ({ cityData }) => {
    const data = cityData.sectors;
    const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`}/>
            </PieChart>
        </ResponsiveContainer>
    );
};
