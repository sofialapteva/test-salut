import React from 'react'
import { NavLink } from 'react-router-dom'

export interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({children}: MainLayoutProps) {
  return (
    <div>
    <header className='h-12 bg-green-200 md:text-xl text-lg shadow-lg'>
      <nav>
      <nav className='flex justify-around leading-8'>
        <NavLink className='hover:bg-green-300 p-2 focus:bg-green-100' to='/'>Запись к врачу</NavLink>
        <NavLink className='hover:bg-green-300 focus:bg-green-100 p-2' to='/timetable'>Расписание врача</NavLink>
      </nav>
      </nav>
    </header>
      <main className='w-9/12 mx-auto py-10 px-2 shadow-lg my-10'>
      {children}
      </main>
    </div>
  )
}

