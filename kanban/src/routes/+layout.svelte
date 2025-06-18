<script lang="ts">
	import '../app.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { supabase } from '$lib/supabase'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	onMount(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => authListener.subscription.unsubscribe()
	})
</script>

<slot />