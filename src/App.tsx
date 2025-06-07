import { useState } from "react"
import AddTodoForm from "./components/AddTodoForm"
import TodoItem from "./components/TodoItem"
import { dummyData } from "./data/todos"

function App() {
	const [todos, setTodos] = useState(dummyData)

	const setTodoCompleted = (id: number, completed: boolean) => {
		console.log(`Todo with id ${id} is now ${completed ? "completed" : "not completed"}`)
		setTodos((prevTodos) =>
			prevTodos.map(todo => (
				todo.id === id ? { ...todo, completed } : todo
			))
		)
	}

	const addTodo = (title: string) => {
		setTodos(prevTodos => [
			{
				id: prevTodos.length + 1,
				title,
				completed: false
			},
			...prevTodos
		])
	}

	return (
		<main className="py-10 h-screen">
			<h1 className="font-bold text-3xl text-center">Your Todos</h1>
			<div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
				<AddTodoForm
					onSubmit={addTodo}
				/>
				<div className="space-y-2">
					{todos.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onCompletedChange={setTodoCompleted}
						/>
					))}</div>
			</div>
		</main>
	)
}

export default App