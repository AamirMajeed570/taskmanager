import { TasksProvider } from './context/Tasksprovider';
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import Filters from './components/Filters'
import TaskList from './components/TaskList'
import './styles/global.css'


export default function App() {
  return (
    <TasksProvider>
      <div className="app-root">
        <Header />
        <main className="container">
          <TaskInput />
          <Filters />
          <TaskList />
        </main>
      </div>
    </TasksProvider>
  )
}