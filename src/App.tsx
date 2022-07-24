import { Header } from "./components/Header";
import styles from './App.module.css';
import Clipboard from './assets/Clipboard.svg'
import './global.css';

import { PlusCircle, Trash } from 'phosphor-react'
import { Task } from "./components/Task";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export function App() {

  const [tasks, setTasks] = useState<string[]>([]);
  const [taskList, setTaskList] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('')

  function handleNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, newTask])


  }
  //Método que monitora é "pega" o valor que é digitado no input
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function deleteTask(taskToDelete : string){
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task != taskToDelete
    }) 
    setTasks(tasksWithoutDeletedOne);
  }

  useEffect(() => {
    setTaskList(tasks)
  }, [tasks])

  return (
    <div>
      <Header />

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
          <p>Concluídas <span>0</span></p>
        </div>

        <div className={styles.taskList}>

          {taskList.length <= 0 &&
            <>
              <img src={Clipboard} alt="" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </>
          }

          {taskList.map(task => {
            return (
              <Task
                key={task}
                content={task}
                whenDeleteTask={deleteTask} />
            )
          })}
        </div>
      </main>
    </div>


  )
}

