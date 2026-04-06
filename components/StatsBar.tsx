'use client';

import type { Habit } from '@/types/habit';
import { getStreak } from '@/lib/habitUtils';

interface Props {
  habits: Habit[];
}

export default function StatsBar({ habits }: Props) {
  const today = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const bestStreak = habits.reduce((max, h) => Math.max(max, getStreak(h.completedDates)), 0);

  const stats = [
    {
      label: 'Today',
      value: `${completedToday}/${totalHabits}`,
      sub: 'completed',
      icon: '✅',
      color: '#10b981',
    },
    {
      label: 'Completion',
      value: `${completionRate}%`,
      sub: 'today',
      icon: '📊',
      color: '#6366f1',
    },
    {
      label: 'Best Streak',
      value: `${bestStreak}`,
      sub: 'days',
      icon: '🔥',
      color: '#f59e0b',
    },
    {
      label: 'Total Habits',
      value: `${totalHabits}`,
      sub: 'tracked',
      icon: '🎯',
      color: '#8b5cf6',
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 12,
    }}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="card"
          style={{ padding: '16px 18px', borderTop: `3px solid ${s.color}` }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{s.icon}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
