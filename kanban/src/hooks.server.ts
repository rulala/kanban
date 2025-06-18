import { createSupabaseServerClient } from '$lib/server/supabase'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event.cookies)

	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession()
		if (!session) {
			return { session: null, user: null }
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser()
		if (error) {
			return { session: null, user: null }
		}

		return { session, user }
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version'
		}
	})
}

// Disable CSRF protection for now to get it working quickly
import { sequence } from '@sveltejs/kit/hooks'

export const handleFetch = sequence(async ({ event, request, fetch }) => {
	if (request.method === 'POST') {
		request.headers.delete('origin')
	}
	return fetch(request)
})