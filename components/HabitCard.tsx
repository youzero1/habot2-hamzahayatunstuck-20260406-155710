'use client';

import { useState } from 'react';
import type { Habit } from '@/types/habit';
import { getStreak, getLongestStreak, getWeekCompletions } from '@/lib/habitUtils';

interface Props {
  habit: Habit;
  onToggleToday: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitCard({ habit, onToggleToday, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const completedToday = habit.completedDates.includes(today);
  const streak = getStreak(habit.completedDates);
  const longest = getLongestStreak(habit.completedDates);
  const weekDays = getWeekCompletions(habit.completedDates);

  return (
    <div
      className="card"
      style={{
        borderLeft: `4px solid ${habit.color}`,
        transition: 'transform 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {/* Emoji */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${habit.color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          flexShrink: 0,
        }}>
          {habit.emoji}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{habit.name}</h3>
            {streak > 0 && (
              <span className="badge badge-orange">🔥 {streak} day streak</span>
            )}
            {completedToday && (
              <span className="badge badge-green">✓ Done today</span>
            )}
          </div>

          {/* Week mini-calendar */}
          <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
            {weekDays.map((day) => (
              <div key={day.date} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>{day.label}</div>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: day.completed ? habit.color : 'var(--bg-card2)',
                  border: day.isToday ? `2px solid ${habit.color}` : '2px solid transparent',
                  opacity: day.completed ? 1 : 0.5,
                }} />
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{streak}</span> current streak
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{longest}</span> best streak
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{habit.completedDates.length}</span> total days
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <button
            className="btn btn-primary"
            style={{
              background: completedToday ? 'var(--secondary)' : habit.color,
              padding: '8px 14px',
              fontSize: 13,
            }}
            onClick={() => onToggleToday(habit.id)}
          >
            {completedToday ? '✓ Done' : 'Mark Done'}
          </button>
          {confirmDelete ? (
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                className="btn btn-danger"
                style={{ padding: '6px 10px', fontSize: 12 }}
                onClick={() => onDelete(habit.id)}
              >
                Yes
              </button>
              <button
                className="btn btn-ghost"
                style={{ padding: '6px 10px', fontSize: 12 }}
                onClick={() => setConfirmDelete(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn btn-ghost"
              style={{ padding: '6px 10px', fontSize: 12 }}
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
