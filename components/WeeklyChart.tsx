'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { Habit } from '@/types/habit';

interface Props {
  habits: Habit[];
}

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { weekday: 'short' });
    days.push({ date: dateStr, label });
  }
  return days;
}

export default function WeeklyChart({ habits }: Props) {
  const days = getLast7Days();

  const data = days.map((day) => {
    const count = habits.filter((h) => h.completedDates.includes(day.date)).length;
    return {
      day: day.label,
      completed: count,
      total: habits.length,
      date: day.date,
    };
  });

  const todayStr = new Date().toISOString().split('T')[0];

  if (habits.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
        Add habits to see your weekly progress chart
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            domain={[0, Math.max(habits.length, 1)]}
          />
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 8,
              color: '#f1f5f9',
            }}
            cursor={{ fill: 'rgba(99,102,241,0.08)' }}
            formatter={(value: number) => [`${value} / ${habits.length}`, 'Completed']}
          />
          <Bar dataKey="completed" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry) => (
              <Cell
                key={entry.date}
                fill={entry.date === todayStr ? '#6366f1' : entry.completed === habits.length && habits.length > 0 ? '#10b981' : '#4f46e5'}
                opacity={entry.completed === 0 ? 0.3 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
