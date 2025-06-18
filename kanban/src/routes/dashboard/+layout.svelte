<script lang="ts">
	import type { LayoutData } from './$types'

	export let data: LayoutData
</script>

<div class="min-h-screen bg-base-200">
	<!-- Navigation Bar -->
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/dashboard" class="btn btn-ghost text-xl">Kanban Board</a>
		</div>
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost">
					{data.user?.email}
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
					<li>
						<form method="POST" action="/auth/logout">
							<button type="submit" class="w-full text-left">Logout</button>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Page Content -->
	<div class="container mx-auto p-4">
		<slot />
	</div>
</div>