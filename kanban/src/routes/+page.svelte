<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="min-h-screen bg-base-200 p-8">
	<div class="max-w-4xl mx-auto">
		<!-- Navigation Bar -->
		<div class="navbar bg-base-100 rounded-box mb-8">
			<div class="flex-1">
				<a href="/" class="btn btn-ghost text-xl">Kanban Board</a>
			</div>
			<div class="flex-none">
				{#if data.user}
					<div class="dropdown dropdown-end">
						<div tabindex="0" role="button" class="btn btn-ghost">
							{data.user.email}
						</div>
						<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<form method="POST" action="?/logout">
									<button type="submit" class="w-full text-left">Logout</button>
								</form>
							</li>
						</ul>
					</div>
				{:else}
					<a href="/login" class="btn btn-primary">Login</a>
				{/if}
			</div>
		</div>

		<!-- Hero Section -->
		<div class="hero bg-base-100 rounded-box mb-8">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">Welcome to Kanban Board</h1>
					{#if data.user}
						<p class="py-6">Hello {data.user.email}! Ready to manage your tasks?</p>
						<button class="btn btn-primary">Go to Board</button>
					{:else}
						<p class="py-6">Please login to start managing your tasks.</p>
						<a href="/login" class="btn btn-primary">Get Started</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Stats to show everything works -->
		<div class="stats shadow w-full mb-8">
			<div class="stat">
				<div class="stat-figure text-primary">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
					</svg>
				</div>
				<div class="stat-title">SvelteKit</div>
				<div class="stat-value text-primary">✓ Ready</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-secondary">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
					</svg>
				</div>
				<div class="stat-title">Supabase Auth</div>
				<div class="stat-value text-secondary">✓ Ready</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-accent">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
				</div>
				<div class="stat-title">Authentication</div>
				<div class="stat-value text-accent">{data.user ? 'Logged In' : 'Guest'}</div>
			</div>
		</div>

		<!-- Sample Card -->
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Authentication Status</h2>
				{#if data.user}
					<p>You are logged in as: <strong>{data.user.email}</strong></p>
					<p>Session expires: {new Date(data.session?.expires_at || '').toLocaleString()}</p>
				{:else}
					<p>You are not logged in. Please login to access the kanban board.</p>
				{/if}
				<div class="card-actions justify-end">
					{#if data.user}
						<form method="POST" action="?/logout">
							<button type="submit" class="btn btn-ghost">Logout</button>
						</form>
						<button class="btn btn-primary">Go to Board</button>
					{:else}
						<a href="/login" class="btn btn-primary">Login</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>