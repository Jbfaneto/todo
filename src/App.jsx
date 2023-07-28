import { useState } from 'react'

import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'

import './App.css'



function App() { // function that set some examples of todos
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "criar funcionalidade x no sistema",
      category: "trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar react",
      category: "estudos",
      isCompleted: false,
    },

  ]);
// const to create some new todos and add them from the forms 
  const addTodo = (text, category) => {
    const newTodos = [...todos, 
      {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    },
    ];
    setTodos(newTodos);
  };
//function to remove todos from the lists 
  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null
      );
      setTodos(filteredTodos);
  };
 //funtion that completes the todos
  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => 
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };
 //search and filter funtions
  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")



  return (
    <div className= "app"> 
      <h1>To do List</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
          .filter((todo) => 
            todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a,b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
            .map((todo) => (
          <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />
        ))}
      </div>
          <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default App
