import React from 'react'
import { Task } from '../types'
import { useTasks } from '../context/Tasksprovider'


const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    const { toggleTask, deleteTask } = useTasks()
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`} role="listitem">
            <label className="task-main">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} aria-label={`Mark ${task.title} completed`} />
                <div className="task-body">
                    <div className="task-title">{task.title}</div>
                    {task.description && <div className="task-desc">{task.description}</div>}
                </div>
            </label>
            <div className="task-actions">
                <button className="btn danger small" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`}>Delete</button>
            </div>
        </div>
    )
}
export default React.memo(TaskItem)