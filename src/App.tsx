// FEITO PARA TRABALHO DE FACULDADE!
// Tempo gasto: 2 horas e meia.
// Existem observações em forma de comentários em outros componentes, explicando a razão de alguma decisões que faria diferente em um projeto real.
// A "confusão" de divs na renderização é para manter o layout centralizado e com scroll quando necessário, sem mover o background.

import TaskInput from './components/TaskInput';
import TasksList from './components/TasksList';
import { useEffect, useRef, useState } from 'react';
import './App.css';

export type Task = {
    id: number;
    title: string;
    completed: boolean;
}

function App() {

    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const lastFilter = useRef<boolean | undefined>(undefined);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setFilteredTasks(tasks.filter(task => lastFilter.current === undefined ? true : task.completed === lastFilter.current));
    }, [tasks]);

    function addTask(title: string) {
        const newTask: Task = {
            id: Date.now(),
            title,
            completed: false
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
    }
    
    function deleteTask(id: number) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    function toggleTask(id: number) {
        setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    }

    function filterTasks(completed?: boolean) {
        lastFilter.current = completed;
        if (completed === undefined) return setFilteredTasks(tasks);
        setFilteredTasks(tasks.filter(task => task.completed === completed));
    }

    return (
        <main id='screen' className='bg-gray-900 text-white flex items-center justify-center relative'>
            <div className='h-full py-40 absolute top-0 left-0 right-0 bottom-0 overflow-auto'>
                <div className='flex flex-col gap-5 w-[1000px] mx-auto'>
                    <div className='text-3xl font-bold'>Minhas Tarefas</div>
                    <TaskInput addTask={addTask} filterTasks={filterTasks} />
                    <TasksList tasks={filteredTasks} deleteTask={deleteTask} toggleTask={toggleTask} />
                </div>
            </div>
        </main>
    )
}

export default App
