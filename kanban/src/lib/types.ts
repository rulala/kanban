export type TaskType = 'todo' | 'doing' | 'done'

export interface KanbanTask {
	id: string
	user_id: string
	description: string
	type: TaskType
	board_id: string
	position: number // Default 0 (top of column)
	created_at: string
}

export interface Board {
	id: string
	name: string
	user_id: string
	created_at: string
}

export interface BoardWithTasks extends Board {
	tasks: KanbanTask[]
}