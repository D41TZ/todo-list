// O checkbox é exigido, mas hora nenhuma é descrito que ele deve ser um input, então, tomei liberdade pra fazer algo assim em prol da estética.

import { Check, Trash } from 'lucide-react';

interface TaskProps {
    id: number;
    title: string;
    completed: boolean;
    deleteTask: (id: number) => void;
    toggleTask: (id: number) => void;
}

export default function Task({ id, title, completed, deleteTask, toggleTask }: TaskProps) {
    return (
        <li className='flex gap-3 justify-between items-center'>
            <div className='flex items-center gap-3 flex-1 bg-gray-800 p-3 rounded'>
                <span onClick={() => toggleTask(id)} className={`flex items-center justify-center w-5 min-w-5 h-5 rounded bg-white text-black`}>
                    {completed && <Check />}
                </span>
                <span className={`${completed ? 'text-gray-400 line-through' : 'text-white'}`}>{title}</span>
            </div>
            <button onClick={() => deleteTask(id)} className='bg-red-600 p-3 rounded hover:bg-red-700 transition'><Trash /></button>
        </li>
    )
}