import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import type { Board } from '$lib/types'

export const load: PageServerLoad = async ({ locals }) => {
	// Get all boards for this user
	const { data: boards, error } = await locals.supabase
		.from('boards')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) {
		console.error('Error loading boards:', JSON.stringify(error, null, 2))
		return {
			boards: []
		}
	}

	return {
		boards: (boards as Board[]) || []
	}
}

export const actions: Actions = {
	createBoard: async ({ request, locals }) => {
		const formData = await request.formData()
		const name = formData.get('name') as string

		if (!name || !name.trim()) {
			return fail(400, { error: 'Board name is required' })
		}

		// Create the board
		const { data: board, error } = await locals.supabase
			.from('boards')
			.insert({ name: name.trim() })
			.select()
			.single()

		if (error) {
			console.error('Error creating board:', JSON.stringify(error, null, 2))
			
			if (error.code === '23505') {
				return fail(400, { error: 'A board with this name already exists' })
			}
			
			return fail(500, { 
				error: error.message || 'Failed to create board. Please try again.'
			})
		}

		// Redirect to the new board
		throw redirect(303, `/dashboard/${board.id}`)
	}
}