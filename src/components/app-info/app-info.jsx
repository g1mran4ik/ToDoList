import { useContext } from 'react';
import './app-info.css';
import Tasks from '../../contexts/tasks';

export default function AppInfo() {
    const {tasks} = useContext(Tasks);

    const tasksLength = tasks.length;

    const completedTasksLength = tasks.filter((task) => task.completed).length

    return (
        <div className="app-info">
            <h1 className='main-text'>Задачи для выполнения</h1>
            <h2>Общее количество задач: {tasksLength}</h2>
            <h2>Выполнены: {completedTasksLength}</h2>
        </div>
    )
}