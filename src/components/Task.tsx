import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PlusCircle, Trash } from "phosphor-react";
import Clipboard from '../assets/Clipboard.svg'
import styles from './Task.module.css'
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
    id: string,
    title: string;
    isCompleted: boolean
}

export function Task() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [newTask, setNewTask] = useState('')

    const task: TaskProps = {
        id: uuidv4(),
        title: newTask,
        isCompleted: false
    }

    function handleNewTask(event: FormEvent) {
        event.preventDefault();
        setTasks([...tasks, task])
    }

    //Método que monitora é "pega" o valor que é digitado no input
    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function handleDeleteTask(taskToDelete: string) {
        const tasksWithoutDeletedOne = tasks.filter(tarefa => {
            return tarefa.id != taskToDelete
        })
        setTasks(tasksWithoutDeletedOne);
    }



    function handleCompleteTask(completeTask: string) {
        const taskCompleted = tasks.map(tarefa => {
            if (tarefa.id == completeTask) {
                tarefa.isCompleted = !tarefa.isCompleted
            }
            return tarefa

        })
        console.log(taskCompleted);
        setTasks(taskCompleted)

    }

    const completedTotal = tasks.filter(tarefa => tarefa.isCompleted);
    console.log(completedTotal)


    return (
        <main>
            <form onSubmit={handleNewTask} className={styles.inputArea} >
                <input
                    type="text"
                    placeholder="Adicione uma nova tarefa"
                    onChange={handleNewTaskChange} />

                <button
                    type="submit">
                    Criar
                    <PlusCircle size={15.97} />
                </button>
            </form>

            <div className={styles.labels}>
                <p>Tarefas criadas <span>{tasks.length}</span></p>
                {tasks.length <= 0 ?
                    <p>Concluídas <span>0</span></p>
                    : <p>Concluídas <span>{completedTotal.length} de {tasks.length}</span></p>}

            </div>
            <div className={styles.taskList}>

                {tasks.length <= 0 &&
                    <>
                        <img src={Clipboard} alt="" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </>

                }

                {tasks.map(task => {

                    return (
                        <div className={styles.task} key={task.id}>
                            <input
                                type="checkbox"
                                defaultChecked={task.isCompleted}
                                onClick={() => handleCompleteTask(task.id)} />

                            <p className={task.isCompleted ? styles.taskCompleted : ''}>{task.title}</p>

                            <button
                                onClick={() => handleDeleteTask(task.id)}>
                                <Trash />

                            </button>
                        </div>
                    )
                })}
            </div>
        </main >
    )
}



