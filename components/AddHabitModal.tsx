'use client';

import { useState } from 'react';

interface Props {
  onAdd: (name: string, emoji: string, color: string) => void;
  onClose: () => void;
}

const EMOJIS = ['🏃','📚','🧘','💪','🥗','💧','😴','✍️','🎯','🎸','🌿','🧹','🚴','🏊','🧠','❤️'];
const COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899','#14b8a6'];

export default function AddHabitModal({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🏃');
  const [color, setColor] = useState('#6366f1');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a habit name');
      return;
    }
    onAdd(name.trim(), emoji, color);
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 16,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="card"
        style={{ width: '100%', maxWidth: 440, padding: 28 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>New Habit</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', fontSize: 22, color: 'var(--text-muted)', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="e.g. Morning Run"
              maxLength={40}
              style={{
                width: '100%',
                background: 'var(--bg)',
                border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
                borderRadius: 8,
                padding: '10px 14px',
                color: 'var(--text)',
                fontSize: 15,
              }}
            />
            {error && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 4 }}>{error}</p>}
          </div>

          {/* Emoji */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
              Pick an Emoji
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    fontSize: 20,
                    background: emoji === e ? 'var(--primary)' : 'var(--bg)',
                    border: `1px solid ${emoji === e ? 'var(--primary)' : 'var(--border)'}`,
                    transition: 'all 0.15s',
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
              Pick a Color
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: c,
                    border: color === c ? '3px solid #fff' : '3px solid transparent',
                    boxShadow: color === c ? `0 0 0 2px ${c}` : 'none',
                    transition: 'all 0.15s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div style={{
            background: 'var(--bg)',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
            borderLeft: `4px solid ${color}`,
          }}>
            <span style={{ fontSize: 24 }}>{emoji}</span>
            <span style={{ fontWeight: 600, color: name ? 'var(--text)' : 'var(--text-muted)' }}>
              {name || 'Your habit name'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2, background: color, justifyContent: 'center' }}>
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
