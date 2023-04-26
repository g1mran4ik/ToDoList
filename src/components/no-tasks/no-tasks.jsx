import './no-tasks.css';
import Notasksimg from '../../images/notasksimg.jpg';

export default function NoTasks() {
    return (
        <div className="no-tasks">
            <img src={Notasksimg}></img>
            <h1>Задачи отсутствуют</h1>
        </div>
    )
}