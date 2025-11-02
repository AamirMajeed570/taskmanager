import React, { useEffect, useState } from 'react'


const THEME_KEY = 'limetray_theme'


export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        try { return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') ?? 'light' } catch { return 'light' }
    })


    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        try { localStorage.setItem(THEME_KEY, theme) } catch { }
    }, [theme])


    return (
        <button className="btn theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
            {theme === 'light' ? '🌞' : '🌙'}
        </button>
    )
}