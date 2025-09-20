// Tem um pouco de prop drilling, mas como é um projeto pequeno, tudo bem.
// Também não usaria Redux ou Context API, mas sim algo mais leve como Zustand.
// Redux é extremamente complexo, Zustand se encaixa muito melhor e cumpre a mesma função em questão.
// Já Context API é meio pesado e complexo também, e não é tão performático. Tem vários problemas de performance por conta de re-renderizações desnecessárias.
// Não criei com Zustand porque as especificações do projeto exigiam useState ou useReducer com useContext.
// Caso seja (useState ou useReducer) com useContext, o enúnciado não deixa claro.
// Com o Zustand eu faria até persistencia automática no localStorage, mas como fiquei receoso de não ser permitido, não implementei.

import { type Task as TaskType } from '../App';
import Task from './Task';

interface TasksListProps {
    tasks: TaskType[];
    deleteTask: (id: number) => void;
    toggleTask: (id: number) => void;
}

export default function TasksList({ tasks, deleteTask, toggleTask }: TasksListProps) {
    return (
        <ul className='flex flex-col gap-3 px-20'>
            {tasks.map(task => <Task key={task.id} {...task} deleteTask={deleteTask} toggleTask={toggleTask} />)}
        </ul>
    )
}