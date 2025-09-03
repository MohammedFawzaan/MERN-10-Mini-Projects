import React from 'react';

const Todo = () => {
  const [task, setTask] = React.useState('');
  const [todo, setTodo] = React.useState([]);

  React.useEffect(() => {
    // Retrieve from Storage on Page Load.
    const savedList = JSON.parse(localStorage.getItem('todo')) || [];
    setTodo(savedList);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#1e1e1e] shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-extrabold text-center text-white mb-6">✨ Todo List</h1>

      {/* Stats */}
      <div className="text-gray-300 grid grid-cols-3 gap-2 text-sm mb-6 text-center">
        <div className="bg-gray-800 py-2 rounded-lg shadow">Total: {todo.length}</div>
        <div className="bg-gray-800 py-2 rounded-lg shadow">✅ {todo.filter((item) => item.completed).length}</div>
        <div className="bg-gray-800 py-2 rounded-lg shadow">⏳ {todo.filter((item) => !item.completed).length}</div>
      </div>

      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
          onClick={() => {
            if (task.trim() !== '') {
              const newList = [
                ...todo,
                { task, completed: false, created: Date.now(), editTask: false },
              ];
              setTodo(newList);
              localStorage.setItem('todo', JSON.stringify(newList));
              setTask('');
            }
          }}
        >
          Add
        </button>
        <button
          className="px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
          onClick={() => {
            setTodo([]);
            localStorage.setItem('todo', JSON.stringify([]));
          }}
        >
          Clear All
        </button>
      </div>

      {/* Delete completed */}
      <button
        className="mb-4 w-full px-3 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition"
        onClick={() => {
          const filteredList = todo.filter((item) => !item.completed);
          setTodo(filteredList);
          localStorage.setItem('todo', JSON.stringify(filteredList));
        }}
      >
        Delete Completed Tasks
      </button>

      {/* Tasks List */}
      <div className="space-y-3">
        {todo.map((element, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm cursor-pointer hover:bg-gray-700 transition"
            onClick={() => {
              const updatedList = todo.map((item) =>
                item.task === element.task ? { ...item, editTask: true } : item
              );
              setTodo(updatedList);
              localStorage.setItem('todo', JSON.stringify(updatedList));
            }}
          >
            <div className="flex items-center justify-between">
              {/* Edit Mode */}
              {element.editTask && !element.completed ? (
                <div className="flex gap-2 w-full">
                  <input
                    className="flex-1 px-2 py-1 rounded-lg bg-gray-700 text-white focus:outline-none"
                    value={element.editValue ?? element.task}
                    onChange={(e) => {
                      const updatedList = todo.map((item) =>
                        item.task === element.task
                          ? { ...item, editValue: e.target.value }
                          : item
                      );
                      setTodo(updatedList);
                    }}
                  />
                  <button
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedList = todo.map((item) =>
                        item.task === element.task
                          ? {
                            ...item,
                            task: item.editValue || item.task,
                            editTask: false,
                            created: Date.now(),
                            editValue: undefined,
                          }
                          : item
                      );
                      setTodo(updatedList);
                      localStorage.setItem('todo', JSON.stringify(updatedList));
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <button
                    className="px-2 py-1 text-xs font-medium text-green-500 border border-green-400 rounded-lg hover:bg-green-500 hover:text-white transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedList = todo.map((item) =>
                        item.task === element.task
                          ? { ...item, completed: !item.completed }
                          : item
                      );
                      setTodo(updatedList);
                      localStorage.setItem('todo', JSON.stringify(updatedList));
                    }}
                  >
                    ✓
                  </button>
                  <div className="flex flex-col flex-1">
                    <p
                      className={`font-semibold ${element.completed ? 'line-through text-gray-400' : 'text-white'
                        }`}
                    >
                      {element.task}
                    </p>
                    <span className="text-xs text-gray-400">
                      Created: {new Date(element.created).toLocaleString()}
                    </span>
                  </div>
                  <button
                    className="px-2 py-1 text-xs font-medium text-red-500 border border-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      const filteredList = todo.filter(
                        (item) => item.task !== element.task
                      );
                      setTodo(filteredList);
                      localStorage.setItem('todo', JSON.stringify(filteredList));
                    }}
                  >
                    ✖
                  </button>
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