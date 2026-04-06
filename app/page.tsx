'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HabitCard from '@/components/HabitCard';
import AddHabitModal from '@/components/AddHabitModal';
import WeeklyChart from '@/components/WeeklyChart';
import StatsBar from '@/components/StatsBar';
import type { Habit } from '@/types/habit';

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('habits');
    if (stored) {
      try {
        setHabits(JSON.parse(stored));
      } catch {
        setHabits([]);
      }
    } else {
      const demo: Habit[] = [
        {
          id: uuidv4(),
          name: 'Morning Run',
          emoji: '🏃',
          color: '#6366f1',
          completedDates: getDemoCompletions(6),
          createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        },
        {
          id: uuidv4(),
          name: 'Read 30 mins',
          emoji: '📚',
          color: '#10b981',
          completedDates: getDemoCompletions(4),
          createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        },
        {
          id: uuidv4(),
          name: 'Meditate',
          emoji: '🧘',
          color: '#f59e0b',
          completedDates: getDemoCompletions(3),
          createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        },
      ];
      setHabits(demo);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits, mounted]);

  function getDemoCompletions(daysBack: number): string[] {
    const dates: string[] = [];
    for (let i = 0; i < daysBack; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  }

  function handleAddHabit(name: string, emoji: string, color: string) {
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      emoji,
      color,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [newHabit, ...prev]);
    setShowModal(false);
  }

  function handleToggleToday(id: string) {
    const today = new Date().toISOString().split('T')[0];
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const has = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: has
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  }

  function handleDelete(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 60 }}>
      {/* Header */}
      <header style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>🔥</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>HabitFlow</span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Habit
          </button>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 32 }}>
        {/* Stats */}
        <StatsBar habits={habits} />

        {/* Weekly Chart */}
        <div style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>Weekly Progress</h2>
          <div className="card">
            <WeeklyChart habits={habits} />
          </div>
        </div>

        {/* Habits List */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>My Habits</h2>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{habits.length} habit{habits.length !== 1 ? 's' : ''}</span>
          </div>
          {habits.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>No habits yet. Add your first habit to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleToday={handleToggleToday}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <AddHabitModal
          onAdd={handleAddHabitModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );

  function handleAddHabitModal(name: string, emoji: string, color: string) {
    handleAddHabit(name, emoji, color);
  }
}
