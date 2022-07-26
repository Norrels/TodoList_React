import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle, Trash } from "phosphor-react";
import Clipboard from '../assets/Clipboard.svg'
import styles from './TaskList.module.css'
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
    id: string,
    title: string;
    isCompleted: boolean
}

export function TaskList() {

    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [newTask, setNewTask] = useState('')

    function handleNewTask(event: FormEvent) {
        event.preventDefault();

        //Variavel criada para retornar um alert caso uma tarefa com o mesmo nome ja
        //tiver sido criada
        let error = false;

        //O método trim remove os espaços da variavel e verifica se ela é vazia
        if (newTask.trim() == '') {
            alert("Digite um valor válido");
            return;
        }

        tasks.map(tarefa => {
            if (tarefa.title == newTask) {
                alert("Tarefa já criada...")
                error = true;
                setNewTask('')
            }
        })

        if (error) {
            return
        }

        const task: TaskProps = {
            id: uuidv4(),
            title: newTask,
            isCompleted: false
        }

        setTasks([...tasks, task])
        setNewTask('')
    }

    //Método que monitora é "pega" o valor que é digitado no input
    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function handleDeleteTask(taskToDelete: string) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id != taskToDelete
        })

        setTasks(tasksWithoutDeletedOne);
    }

    function handleCompleteTask(completeTask: string) {
        //O método mais dificil :D 
        //Eu percorri todas as tarefas que estavam salvas na Array
        //em seguida eu verifiquei se a tarefa era igual a tarefa que o usuario tinha clicado
        //depois eu mudava o valor dela para true em setava o valor da variavel de novo
        const taskCompleted = tasks.map(task => {
            if (task.id == completeTask) {
                task.isCompleted = !task.isCompleted
            }
            return task;
        })

        setTasks(taskCompleted)
    }

    //Essa variável eu criei para contar contas tarefas tinha sido completas
    //eu poderia utilizar o reduce eu acho, mas eu ainda não sei :P
    const completedTotal = tasks.filter(task => task.isCompleted);

    return (
        <main>
            <form onSubmit={handleNewTask} className={styles.inputArea} >
                <input
                    type="text"
                    value={newTask}
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

            <section className={styles.taskList}>

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
            </section>
        </main >
    )
}



