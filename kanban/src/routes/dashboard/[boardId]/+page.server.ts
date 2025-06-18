import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import type { KanbanTask, Board, TaskType } from '$lib/types'

export const load: PageServerLoad = async ({ params, locals }) => {
	const { boardId } = params

	// First, load the board to get its name
	const { data: board, error: boardError } = await locals.supabase
		.from('boards')
		.select('*')
		.eq('id', boardId)
		.single()

	if (boardError || !board) {
		console.error('Error loading board:', JSON.stringify(boardError, null, 2))
		throw error(404, 'Board not found')
	}

	// Load all tasks for this board
	const { data: tasks, error: tasksError } = await locals.supabase
		.from('kanban')
		.select('*')
		.eq('board_id', boardId)
		.order('position', { ascending: true })
		.order('created_at', { ascending: true })

	if (tasksError) {
		console.error('Error loading tasks:', JSON.stringify(tasksError, null, 2))
		throw error(500, 'Failed to load tasks')
	}

	return {
		board: board as Board,
		tasks: (tasks as KanbanTask[]) || []
	}
}

export const actions: Actions = {
	createTask: async ({ request, params, locals }) => {
		const formData = await request.formData()
		const description = formData.get('description') as string
		const type = formData.get('type') as TaskType
		const { boardId } = params

		if (!description || !description.trim()) {
			return fail(400, { error: 'Task description is required' })
		}

		// Get the highest position in the column
		const { data: existingTasks } = await locals.supabase
			.from('kanban')
			.select('position')
			.eq('board_id', boardId)
			.eq('type', type)
			.order('position', { ascending: false })
			.limit(1)

		const position = existingTasks && existingTasks.length > 0 
			? existingTasks[0].position + 1 
			: 0

		const { error: insertError } = await locals.supabase
			.from('kanban')
			.insert({
				board_id: boardId,
				description: description.trim(),
				type,
				position
			})

		if (insertError) {
			console.error('Error creating task:', insertError)
			return fail(500, { error: 'Failed to create task' })
		}

		return { success: true }
	},

	updateTask: async ({ request, locals }) => {
		const formData = await request.formData()
		const taskId = formData.get('taskId') as string
		const description = formData.get('description') as string
		const type = formData.get('type') as TaskType

		if (!taskId) {
			return fail(400, { error: 'Task ID is required' })
		}

		const updates: any = {}
		if (description !== null) updates.description = description.trim()
		if (type !== null) updates.type = type

		const { error: updateError } = await locals.supabase
			.from('kanban')
			.update(updates)
			.eq('id', taskId)

		if (updateError) {
			console.error('Error updating task:', updateError)
			return fail(500, { error: 'Failed to update task' })
		}

		return { success: true }
	},

	deleteTask: async ({ request, locals }) => {
		const formData = await request.formData()
		const taskId = formData.get('taskId') as string

		if (!taskId) {
			return fail(400, { error: 'Task ID is required' })
		}

		const { error: deleteError } = await locals.supabase
			.from('kanban')
			.delete()
			.eq('id', taskId)

		if (deleteError) {
			console.error('Error deleting task:', deleteError)
			return fail(500, { error: 'Failed to delete task' })
		}

		return { success: true }
	}
}