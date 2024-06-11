import Link from 'next/link'
import React from 'react'
import prisma from '../db'
import { redirect } from 'next/navigation'

async function createTodo(data: FormData){
    "use server"
    const title = data.get('title')?.valueOf()
    if(typeof title !== 'string' || title.length === 0){
        throw new Error("Invalid Title")
    }

    await prisma.todo.create({data: {title, complete: false}})
    redirect('/')
}

const Page = () => {
  return (
    <div>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">Todos</h1>
        </header>
        <form action={createTodo} className='flex gap-2 flex-col'>
            <label htmlFor="new-todo">What needs to be done?</label>
            <input 
                autoFocus
                type="text" 
                name="title" 
                id="new-todo"
                className='border border-slate-300 bg-transparent rounded px-2 py-1 mr-2 focus-within:border-slate-100 focus-within:ring-1 outline-none'
            />
            <div className='flex gap-1 justify-end'>
                <Link href={'..'} className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Cancel</Link>
                <button type="submit" className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Create</button>
            </div>
        </form>
    </div>
  )
}

export default Page