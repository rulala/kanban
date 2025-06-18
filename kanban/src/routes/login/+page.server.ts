import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent()
	
	if (session) {
		throw redirect(303, '/dashboard')
	}
	
	return {}
}

export const actions: Actions = {
	signin: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string

		if (!email) {
			return fail(400, { error: 'Email is required' })
		}

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
				shouldCreateUser: true

			}
		})

		if (error) {
			console.error('Error sending magic link:', error)
			return fail(500, { error: 'Failed to send magic link. Please try again.' })
		}

		return {
			success: true
		}
	}
}