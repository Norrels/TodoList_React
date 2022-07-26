import './global.css';
import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";

export function App() {

  return (
    <div>
      <Header />
      <TaskList />
    </div>
  )
}

