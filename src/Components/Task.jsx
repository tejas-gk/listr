import React, { useState } from 'react';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [label, setLabel] = useState('Not Done');

  const filteredTasks = tasks.filter((item) => {
    if (activeTab === 'completed') {
      return item.completed;
    } else if (activeTab === 'pending') {
      return !item.completed;
    } else if (activeTab === 'today') {
      const today = new Date().toISOString().substr(0, 10);
      return item.reminder && item.reminder.substr(0, 10) === today;
    } else {
      return true;
    }
  });

  const addTask = () => {
    if (task && description && reminder) {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { task, description, reminder, completed: false,label };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { task, description, reminder, completed: false,label }]);
      }
      setTask('');
      setDescription('');
      setReminder('');
      setLabel('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.task);
    setDescription(taskToEdit.description);
    setReminder(taskToEdit.reminder);
    setEditIndex(index);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleClick = (index) => {
    setSelectedTask(tasks[index]);
  };

  return (
    <div className='
      flex justify-start items-center pl-10 mt-10
    '>
      <div>
        <h1 className='
          text-3xl font-bold text-[#645fc6] mb-5
        '>Todo List</h1>
        <div>
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className='
              border border-[#645fc6] rounded-md p-2 mr-2
            '
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='
              border border-[#645fc6] rounded-md p-2 mr-2
            '
          />
          <input
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className='
              border border-[#645fc6] rounded-md p-2 mr-2
            '
          />
          <input 
            type="text"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className='
              border border-[#645fc6] rounded-md p-2 mr-2
            '
          />
          <button
            className='
              bg-[#645fc6] text-white rounded-md p-2  mr-2
            '
            onClick={addTask}>{editIndex !== null ? 'Save' : 'Add Task'}</button>
        </div>
        <div className='
          flex justify-start items-center mt-5 mb-5 space-x-5
        '>
          <button
            className={activeTab === 'all' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('all')}>All</button>
          <button
            className={activeTab === 'completed' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('completed')}>Completed</button>
          <button
            className={activeTab === 'pending' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('pending')}>Pending</button>
          <button
            className={activeTab === 'today' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('today')}>Today Tasks</button>
        </div>
        <ul className='
          space-y-5 list-none
        '>
          {filteredTasks.map((item, index) => (
            <li key={index}
              className={item.completed? 'line-through' : ''}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(index)}
                className={`form-checkbox h-5 w-5 text-${item.completed ? '#645fc6' : 'gray'}-600`}
              />
              <div>
                <strong onClick={() => handleClick(index)}
                  className='
                    cursor-pointer text-[#645fc6] text-xl
                  '
                >{item.task}</strong>
                <p
                  className='
                    text-gray-500 text-sm
                  ' 
                >{item.description}</p>
              </div>
              <p
                className='
                  text-gray-500 text-sm
                '
              >Reminder: {
                new Date(item.reminder).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }</p>
              <p
                className='
                  text-gray-500 text-sm bg-yellow-400 rounded-md p-1 w-fit
                '
              >{item.label}</p>
              <div className='
                flex justify-start items-center space-x-2 mt-5
              '>
              <button
                className='
                  bg-[#645fc6] text-white rounded-md p-2 mr-2
                '
                onClick={() => editTask(index)}>Edit</button>
              <button
                className='
                  bg-red-500 text-white rounded-md p-2 mr-2
                '
                  onClick={() => removeTask(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Task;
