export type TaskType = 'todo' | 'doing' | 'done'

export interface KanbanTask {
	id: string
	user_id: string
	description: string
	type: TaskType
	board_id: string // Foreign key to boards.id
	position: number // Default 0 (top of column)
	created_at: string
}

export interface Board {
	id: string
	name: string
	created_at: string
	user_id?: string // Optional until column is added to database
}

export interface BoardWithTasks extends Board {
	tasks: KanbanTask[]
}