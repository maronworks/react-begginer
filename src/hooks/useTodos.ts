import { useEffect, useState } from "react"
import { dummyData } from "../data/todos"
import type { Todo } from "../types/Todo"

export default function useTodos() {
	const [todos, setTodos] = useState(() => {
		const savedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')
		return savedTodos.length > 0 ? savedTodos : dummyData
	})

	// NOTE: THIS WILL ONLY TRIGGER WHEN TODO STATE CHANGES
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

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
				id: Date.now(),
				title,
				completed: false
			},
			...prevTodos
		])
	}

	const deleteTodo = (id: number) => {
		setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
	}

	const deleteAllCompletedTodos = () => {
		setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
	}

	return {
		todos,
		setTodoCompleted,
		addTodo,
		deleteAllCompletedTodos,
		deleteTodo
	}
}