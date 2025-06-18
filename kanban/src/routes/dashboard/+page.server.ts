import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import type { Board } from '$lib/types'

export const load: PageServerLoad = async ({ locals }) => {
	// Get current user to ensure they're authenticated
	const { data: { user } } = await locals.supabase.auth.getUser()
	
	if (!user) {
		return { boards: [] }
	}

	// Get only boards that belong to the current user
	const { data: boards, error } = await locals.supabase
		.from('boards')
		.select('*')
		.eq('user_id', user.id)
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

		// Get current user to ensure they're authenticated
		const { data: { user } } = await locals.supabase.auth.getUser()
		
		if (!user) {
			return fail(401, { error: 'You must be logged in to create boards' })
		}

		// Create the board (user_id is automatically set to auth.uid() by database)
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