import React from 'react'
import ThemeToggle from './ThemeToggle'


export default function Header() {
    return (
        <header className="header">
            <h1 className="title">LimeTray — Task Manager</h1>
            <ThemeToggle />
        </header>
    )
}