<script lang="ts">
	import type { PageData, ActionData } from './$types'
	import { enhance } from '$app/forms'

	export let data: PageData
	export let form: ActionData

	let showCreateForm = false
</script>

{#if data.boards.length === 0}
	<!-- First-time user experience -->
	<div class="hero min-h-[60vh]">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Welcome! 👋</h1>
				<p class="py-6">
					Let's create your first kanban board to start organizing your tasks.
				</p>
				
				{#if !showCreateForm}
					<button 
						class="btn btn-primary btn-lg"
						on:click={() => showCreateForm = true}
					>
						Create Your First Board
					</button>
				{:else}
					<form method="POST" action="?/createBoard" use:enhance class="card bg-base-100 shadow-xl">
						<div class="card-body">
							<h2 class="card-title">Name your board</h2>
							<div class="form-control">
								<input
									type="text"
									name="name"
									placeholder="e.g., Personal Tasks, Work Projects"
									class="input input-bordered"
									required
									autofocus
								/>
							</div>
							{#if form?.error}
								<div class="alert alert-error">
									<span>{form.error}</span>
								</div>
							{/if}
							<div class="card-actions justify-end gap-2 mt-4">
								<button 
									type="button" 
									class="btn btn-ghost"
									on:click={() => showCreateForm = false}
								>
									Cancel
								</button>
								<button type="submit" class="btn btn-primary">
									Create Board
								</button>
							</div>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<!-- Existing user with boards -->
	<div class="max-w-6xl mx-auto">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-3xl font-bold">Your Boards</h1>
			<button 
				class="btn btn-primary"
				on:click={() => showCreateForm = !showCreateForm}
			>
				Create New Board
			</button>
		</div>

		{#if showCreateForm}
			<form method="POST" action="?/createBoard" use:enhance class="card bg-base-100 shadow-lg mb-6">
				<div class="card-body">
					<h3 class="card-title">Create a new board</h3>
					<div class="flex gap-2">
						<input
							type="text"
							name="name"
							placeholder="Board name"
							class="input input-bordered flex-1"
							required
							autofocus
						/>
						<button type="submit" class="btn btn-primary">Create</button>
						<button 
							type="button" 
							class="btn btn-ghost"
							on:click={() => showCreateForm = false}
						>
							Cancel
						</button>
					</div>
					{#if form?.error}
						<div class="alert alert-error mt-2">
							<span>{form.error}</span>
						</div>
					{/if}
				</div>
			</form>
		{/if}

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.boards as board}
				<a 
					href="/dashboard/{board.id}" 
					class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
				>
					<div class="card-body">
						<h2 class="card-title">{board.name}</h2>
						<p class="text-sm text-base-content/60">
							Created {new Date(board.created_at).toLocaleDateString()}
						</p>
						<div class="card-actions justify-end mt-4">
							<span class="btn btn-sm btn-ghost">Open Board →</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
{/if}