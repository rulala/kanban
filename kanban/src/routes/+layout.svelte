<script lang="ts">
	import '../app.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { supabase } from '$lib/supabase'

	onMount(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
				invalidate('supabase:auth')
			}
		})

		return () => authListener.subscription.unsubscribe()
	})
</script>

<slot />