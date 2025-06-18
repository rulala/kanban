import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent()
	
	if (session) {
		throw redirect(303, '/dashboard')
	}
	
	return {}
}

export const actions: Actions = {
	logout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut()
		throw redirect(303, '/login')
	}
}