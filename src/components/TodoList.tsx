import type { Todo } from "../types/Todo"
import TodoItem from "./TodoItem"

interface TodoListProps {
	todos: Todo[]
	onCompleteChange: (id: number, completed: boolean) => void
	onDelete: (id: number) => void
}

function TodoList({
	todos,
	onCompleteChange,
	onDelete
}: TodoListProps) {

	const todoSorted = todos.sort((a, b) => {
		if (a.completed === b.completed) {
			return b.id - a.id
		}
		return a.completed ? 1 : -1
	})

	return (
		<>
			<div className="space-y-2">
				{todoSorted.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onCompletedChange={onCompleteChange}
						onDelete={onDelete}
					/>
				))}
			</div>

			{todos.length === 0 && (
				<p className="text-center text-sm text-gray-500">
					No todos yet. Add a new one above.
				</p>
			)}
		</>
	)
}
export default TodoList