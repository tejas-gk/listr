import { useState } from 'react'
import './App.css'
import Kanban from './Components/Kanban';
import Task from './Components/Task';

function App() {
  const [isKanbanView, setIsKanbanView] = useState(false);

  const toggleView = () => {
    setIsKanbanView(!isKanbanView);
  };
  return (
    <>
      <div>
        <button
          className='hidden'
          onClick={toggleView}>Switch to
          {isKanbanView ? ' Task View' : ' Kanban View'}
        </button>
      </div>
      {
        isKanbanView ? (
          <div>
            <Kanban/>
          </div>
        ) : (
          <Task/>
        )
      }
    </>
  )
}

export default App
