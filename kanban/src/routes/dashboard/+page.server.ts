import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import type { Board } from '$lib/types'

export const load: PageServerLoad = async ({ locals }) => {
	// Get current user to ensure they're authenticated
	const { data: { user } } = await locals.supabase.auth.getUser()
	
	if (!user) {
		return { boards: [] }
	}

	// Get all boards (we'll need to filter by user later when user_id column is added)
	// For now, this will show all boards - SECURITY ISSUE
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

	// TODO: Filter boards by user when user_id column is added to boards table
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

		// Get current user
		const { data: { user } } = await locals.supabase.auth.getUser()
		
		if (!user) {
			return fail(401, { error: 'You must be logged in to create boards' })
		}

		// Create the board (without user_id since the table doesn't have this column)
		const { data: board, error } = await locals.supabase
			.from('boards')
			.insert({ 
				name: name.trim()
			})
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