import React from 'react';

const Todo = () => {
  const [task, setTask] = React.useState('');
  const [todo, setTodo] = React.useState([]);

  React.useEffect(() => {
    // Retrieve from Storage on Page Load.
    const savedList = JSON.parse(localStorage.getItem('todo')) || [];
    setTodo(savedList);
  }, []);

  const addTask = () => {
    if (task.trim() !== '') {
      const newList = [
        ...todo,
        { task, completed: false, time: Date.now(), editTask: false },
      ];
      setTodo(newList);
      localStorage.setItem('todo', JSON.stringify(newList));
      setTask('');
    }
  }

  const editable = (element) => {
    const updatedList = todo.map((item) =>
      item.task === element.task ? { ...item, editTask: true } : item
    );
    setTodo(updatedList);
    localStorage.setItem('todo', JSON.stringify(updatedList));
  }

  const editing = (e, element) => {
    const updatedList = todo.map((item) =>
      item.task === element.task
        ? { ...item, editValue: e.target.value }
        : item
    );
    setTodo(updatedList);
  }

  const saveEdit = (e, element) => {
    e.stopPropagation();
    const updatedList = todo.map((item) =>
      item.task === element.task
        ? {
          ...item,
          task: item.editValue || item.task,
          editTask: false,
          time: Date.now(),
          editValue: undefined,
        }
        : item
    );
    setTodo(updatedList);
    localStorage.setItem('todo', JSON.stringify(updatedList));
  }

  const taskCompleted = (e, element) => {
    e.stopPropagation();
    const updatedList = todo.map((item) =>
      item.task === element.task
        ? { ...item, completed: !item.completed, time: Date.now() }
        : item
    );
    setTodo(updatedList);
    localStorage.setItem('todo', JSON.stringify(updatedList));
  }

  const deleteTask = (e, element) => {
    e.stopPropagation();
    const filteredList = todo.filter(
      (item) => item.task !== element.task
    );
    setTodo(filteredList);
    localStorage.setItem('todo', JSON.stringify(filteredList));
  }

  const deleteAllTasks = () => {
    setTodo([]);
    localStorage.setItem('todo', JSON.stringify([]));
  }

  const deleteCompletedTasks = () => {
    const filteredList = todo.filter((item) => !item.completed);
    setTodo(filteredList);
    localStorage.setItem('todo', JSON.stringify(filteredList));
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl">
      <h1 className="text-3xl font-extrabold text-center text-white mb-6">✨ Todo List</h1>

      <div className="text-gray-300 grid grid-cols-3 gap-2 text-sm mb-6 text-center">
        <div className="bg-gray-800 py-2 rounded-lg shadow">📝 {todo.length}</div>
        <div className="bg-gray-800 py-2 rounded-lg shadow">✅ {todo.filter((item) => item.completed).length}</div>
        <div className="bg-gray-800 py-2 rounded-lg shadow">⏳ {todo.filter((item) => !item.completed).length}</div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a task..."
          className="flex-1 px-2 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
          onClick={() => addTask()}
        >Add</button>

        <button
          className="px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
          onClick={() => deleteAllTasks()}
        >Clear All</button>
      </div>

      <button
        className="mb-4 w-full px-3 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition"
        onClick={() => deleteCompletedTasks()}
      >Delete Completed Tasks</button>

      <div className="space-y-3">
        {todo.map((element, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm cursor-pointer hover:bg-gray-700 transition"
            onClick={() => editable(element)}>
            <div className="flex items-center justify-between">
              {element.editTask && !element.completed ? (
                <div className="flex gap-2 w-full">
                  <input
                    className="flex-1 px-2 py-1 rounded-lg bg-gray-700 text-white focus:outline-none"
                    value={element.editValue ?? element.task}
                    onChange={(e) => editing(e, element)}
                  />
                  <button
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    onClick={(e) => saveEdit(e, element)}
                  >Save</button>
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <button
                    className="px-2 py-1 text-xs font-medium text-green-500 border border-green-400 rounded-lg hover:bg-green-500 hover:text-white transition"
                    onClick={(e) => taskCompleted(e, element)}
                  >✓</button>
                  <div className="flex flex-col flex-1">
                    <p className={`font-semibold ${element.completed ? 'line-through text-gray-900 font-normal' : 'text-white'}`}>
                      {element.task}
                    </p>
                    <span className="text-xs text-gray-400">
                      Time: {new Date(element.time).toLocaleString()}
                    </span>
                  </div>
                  <button
                    className="px-2 py-1 text-xs font-medium text-red-500 border border-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
                    onClick={(e) => deleteTask(e, element)}
                  >✖</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;