import styles from './Task.module.css'
import { Trash } from "phosphor-react";
import Clipboard from '../assets/Clipboard.svg'
import { useState } from 'react';

interface TaskProps {
    content: string;
    whenDeleteTask: (task: string) => void
}

export function Task({ content, whenDeleteTask }: TaskProps) {
    

    const [isCompleted, setIsCompleted] = useState(false)

    function handleDeleteTask() {
        whenDeleteTask(content)
    }

    function handleCompleteTask() {
        isCompleted == true ? setIsCompleted(false) : setIsCompleted(true)
    }

    {
        if (content != null) {

            return (
                <div className={styles.task}>
                    <input
                        className={styles.gridItem}
                        type="checkbox"
                        defaultChecked={isCompleted}
                        onClick={handleCompleteTask} />
                    <p className={isCompleted ? styles.taskCompleted : ''}>{content}</p>
                    <button
                        onClick={handleDeleteTask}
                        className={styles.gridItem}>
                        <Trash />

                    </button>
                </div>

            )
        }
    }
    return (

        <div className={styles.taskList}>
            <img src={Clipboard} alt="" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div >
    )
}