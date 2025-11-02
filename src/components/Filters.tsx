import React from 'react'
import { useTasks } from '../context/Tasksprovider'


export default function Filters() {
    const { filter, setFilter, tasks, clearCompleted } = useTasks()
    const completedCount = tasks.filter(t => t.completed).length
    const total = tasks.length


    return (
        <section className="filters">
            <div className="tabs">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
                <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
                <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
            </div>
            <div className="meta">
                <span>{total} tasks</span>
                <span>{completedCount} completed</span>
                <button className="btn small" onClick={clearCompleted} disabled={completedCount === 0}>Clear completed</button>
            </div>
        </section>
    )
}