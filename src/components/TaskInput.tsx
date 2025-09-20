import { Check, Filter, PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface AddTaskInputProps {
    addTask: (task: string) => void;
    filterTasks: (completed?: boolean) => void;
}

interface FilterOptionsProps {
    onClick: () => void;
    text: string;
    selected?: boolean;
}

function FilterOptions({ onClick, text, selected }: FilterOptionsProps) {
    return (
        <li className={`flex items-center justify-between px-4 py-2 hover:bg-gray-800 cursor-pointer duration-150`} onClick={onClick}>
            <span>{text}</span>
            {selected && <Check />}
        </li>
    )
}

export default function TaskInput({ addTask, filterTasks }: AddTaskInputProps) {

    const [currentFilter, setCurrentFilter] = useState<boolean | undefined>(undefined);
    const [selectionOpened, setSelectionOpened] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    function handleAddTask() {
        if (value.trim() === '') return;
        addTask(value);
        setValue('');
    }

    function handleFilterTasks(completed?: boolean) {
        setCurrentFilter(completed);
        filterTasks(completed);
        setSelectionOpened(false);
        (document.activeElement as HTMLButtonElement)?.blur();
    }

    return (
        <div className='flex gap-2'>
            <input type='text' value={value} onChange={e => setValue(e.target.value)} className='flex-1 p-2 border border-gray-300 rounded' onKeyDown={e => e.key === 'Enter' && handleAddTask()} placeholder='Digite o nome/descrição da tarefa...' />
            <button onClick={handleAddTask} className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white px-4 py-2 rounded'>
                <PlusCircle />
                Add Task
            </button>
            <button onFocus={() => setSelectionOpened(true)} onBlur={() => setSelectionOpened(false)} className='relative flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white px-4 py-2 rounded'>
                <Filter />
                Filter Task
                <ul className={`absolute w-40 right-0 top-10 bg-gray-700 mt-2 rounded shadow-lg overflow-hidden ${selectionOpened ? 'max-h-30' : 'max-h-0'} transition-all duration-300`}>
                    <FilterOptions onClick={() => handleFilterTasks(true)} text='Concluídas' selected={currentFilter === true} />
                    <FilterOptions onClick={() => handleFilterTasks(false)} text='Pendentes' selected={currentFilter === false} />
                    <FilterOptions onClick={() => handleFilterTasks(undefined)} text='Todas' selected={currentFilter === undefined} />
                </ul>
            </button>
        </div>
    );
}