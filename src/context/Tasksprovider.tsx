import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react'
import { Task } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { reorder as reorderUtil } from '../utils/reorder'


type Filter = 'all' | 'completed' | 'pending'

type TasksContextValue = {
    tasks: Task[]
    filteredTasks: Task[]
    addTask: (title: string, description?: string) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
    clearCompleted: () => void
    onDragEndReorder: (sourceIndex: number, destinationIndex: number) => void
    filter: Filter
    setFilter: (f: Filter) => void
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined)


const STORAGE_KEY = 'limetray_tasks_v1'

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [])
    const [filter, setFilter] = useState<Filter>('all')


    // derived
    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'completed':
                return tasks.filter(t => t.completed).sort((a, b) => a.order - b.order)
            case 'pending':
                return tasks.filter(t => !t.completed).sort((a, b) => a.order - b.order)
            default:
                return [...tasks].sort((a, b) => a.order - b.order)
        }
    }, [tasks, filter])


    const addTask = useCallback((title: string, description?: string) => {
        const trimmed = title.trim()
        if (!trimmed) return
        const newTask: Task = {
            id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
            title: trimmed,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
            order: tasks.length
        }
        setTasks(prev => [...prev, newTask])
    }, [setTasks, tasks.length])

    const toggleTask = useCallback((id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }, [setTasks])


    const deleteTask = useCallback((id: string) => {
        setTasks(prev => {
            const filtered = prev.filter(t => t.id !== id)
            // normalize orders
            return filtered.map((t, idx) => ({ ...t, order: idx }))
        })
    }, [setTasks])

    const clearCompleted = useCallback(() => {
        setTasks(prev => prev.filter(t => !t.completed).map((t, idx) => ({ ...t, order: idx })))
    }, [setTasks])


    const onDragEndReorder = useCallback((sourceIndex: number, destinationIndex: number) => {
        setTasks(prev => reorderUtil(prev, sourceIndex, destinationIndex))
    }, [setTasks])


    const value = useMemo(() => ({ tasks, filteredTasks, addTask, toggleTask, deleteTask, clearCompleted, onDragEndReorder, filter, setFilter }), [tasks, filteredTasks, addTask, toggleTask, deleteTask, clearCompleted, onDragEndReorder, filter])

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}


export const useTasks = () => {
    const ctx = useContext(TasksContext)
    if (!ctx) throw new Error('useTasks must be used within TasksProvider')
    return ctx
}