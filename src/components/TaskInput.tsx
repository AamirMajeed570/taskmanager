import React, { useState } from 'react'
import { useTasks } from '../context/Tasksprovider'


export default function TaskInput() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [error, setError] = useState('')
    const { addTask } = useTasks()


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = title.trim()
        if (!trimmed) { setError('Task cannot be empty'); return }
        addTask(trimmed, desc.trim() || undefined)
        setTitle('')
        setDesc('')
        setError('')
    }


    return (
        <form className="task-input" onSubmit={onSubmit}>
            <div className="row">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add task..." aria-label="Task title" />
                <button className="btn" type="submit">Add</button>
            </div>
            <div className="row small">
                <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" aria-label="Task description" />
            </div>
            {error && <div role="alert" className="error">{error}</div>}
        </form>
    )
}