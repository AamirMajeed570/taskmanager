import React from 'react'
import { useTasks } from '../context/Tasksprovider'

export default function Filters() {
  const { filter, setFilter, tasks, clearCompleted } = useTasks()
  const completedCount = tasks.filter(t => t.completed).length
  const pendingCount = tasks.filter(t => !t.completed).length
  const total = tasks.length

  return (
    <section className="filters">
      <div className="tabs">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            className={`tab-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f as any)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="meta">
        <div className="stats">
          <span className="stat total">{total} Total</span>
          <span className="stat pending">{pendingCount} Pending</span>
          <span className="stat completed">{completedCount} Completed</span>
        </div>
        <button
          className="btn clear-btn"
          onClick={clearCompleted}
          disabled={completedCount === 0}
        >
          Clear Completed
        </button>
      </div>
    </section>
  )
}
