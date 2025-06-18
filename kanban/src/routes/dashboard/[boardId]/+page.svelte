<script lang="ts">
	import type { PageData, ActionData } from './$types'
	import type { KanbanTask, TaskType } from '$lib/types'
	import { enhance } from '$app/forms'

	export let data: PageData
	export let form: ActionData

	// State for forms
	let showCreateForm: Record<TaskType, boolean> = {
		todo: false,
		doing: false,
		done: false
	}
	let editingTask: string | null = null
	let deletingTask: string | null = null

	// Group tasks by type
	$: todoTasks = data.tasks.filter(task => task.type === 'todo')
	$: doingTasks = data.tasks.filter(task => task.type === 'doing')
	$: doneTasks = data.tasks.filter(task => task.type === 'done')

	// Column configuration
	$: columns = [
		{ type: 'todo' as TaskType, title: 'To Do', tasks: todoTasks },
		{ type: 'doing' as TaskType, title: 'Doing', tasks: doingTasks },
		{ type: 'done' as TaskType, title: 'Done', tasks: doneTasks }
	]

	function toggleCreateForm(type: TaskType) {
		showCreateForm[type] = !showCreateForm[type]
	}

	function startEdit(taskId: string) {
		editingTask = taskId
		deletingTask = null
	}

	function cancelEdit() {
		editingTask = null
	}

	function confirmDelete(taskId: string) {
		deletingTask = taskId
		editingTask = null
	}

	function cancelDelete() {
		deletingTask = null
	}
</script>

<div class="flex flex-col h-full">
	<!-- Board Header -->
	<div class="flex items-center justify-between mb-6">
		<div>
			<h1 class="text-3xl font-bold">{data.board.name}</h1>
			<p class="text-base-content/60">Created {new Date(data.board.created_at).toLocaleDateString()}</p>
		</div>
		<a href="/dashboard" class="btn btn-ghost">← Back to Boards</a>
	</div>

	<!-- Error Display -->
	{#if form?.error}
		<div class="alert alert-error mb-4">
			<span>{form.error}</span>
		</div>
	{/if}

	<!-- Kanban Columns -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
		{#each columns as column}
			<div class="bg-base-200 rounded-lg p-4">
				<!-- Column Header -->
				<div class="flex items-center justify-between mb-4">
					<h2 class="font-semibold text-lg">{column.title}</h2>
					<span class="badge badge-neutral">{column.tasks.length}</span>
				</div>

				<!-- Column Content -->
				<div class="space-y-2">
					{#if column.tasks.length === 0}
						<div class="text-center py-8 text-base-content/50">
							<p>No tasks yet</p>
							<p class="text-sm mt-2">Drag tasks here or create a new one</p>
						</div>
					{:else}
						{#each column.tasks as task (task.id)}
							<div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
								<div class="card-body p-4">
									{#if editingTask === task.id}
										<!-- Edit Mode -->
										<form method="POST" action="?/updateTask" use:enhance class="space-y-2">
											<input type="hidden" name="taskId" value={task.id} />
											<textarea
												name="description"
												class="textarea textarea-bordered w-full"
												value={task.description}
												required
											></textarea>
											<div class="flex gap-2">
												<button type="submit" class="btn btn-sm btn-primary">Save</button>
												<button type="button" class="btn btn-sm btn-ghost" on:click={cancelEdit}>
													Cancel
												</button>
											</div>
										</form>
									{:else if deletingTask === task.id}
										<!-- Delete Confirmation -->
										<div class="space-y-2">
											<p class="text-sm font-semibold">Delete this task?</p>
											<p class="text-sm">{task.description}</p>
											<form method="POST" action="?/deleteTask" use:enhance class="flex gap-2">
												<input type="hidden" name="taskId" value={task.id} />
												<button type="submit" class="btn btn-sm btn-error">Delete</button>
												<button type="button" class="btn btn-sm btn-ghost" on:click={cancelDelete}>
													Cancel
												</button>
											</form>
										</div>
									{:else}
										<!-- Normal View -->
										<p class="text-sm">{task.description}</p>
										<div class="flex justify-between items-center mt-2">
											<span class="text-xs text-base-content/60">
												{new Date(task.created_at).toLocaleDateString()}
											</span>
											<div class="flex gap-1">
												<button
													class="btn btn-xs btn-ghost"
													on:click={() => startEdit(task.id)}
												>
													Edit
												</button>
												<button
													class="btn btn-xs btn-ghost text-error"
													on:click={() => confirmDelete(task.id)}
												>
													Delete
												</button>
											</div>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					{/if}

					<!-- Add Task Form/Button -->
					{#if showCreateForm[column.type]}
						<form method="POST" action="?/createTask" use:enhance class="card bg-base-100 shadow-sm">
							<div class="card-body p-4 space-y-2">
								<input type="hidden" name="type" value={column.type} />
								<textarea
									name="description"
									placeholder="Task description..."
									class="textarea textarea-bordered w-full"
									required
									autofocus
								></textarea>
								<div class="flex gap-2">
									<button type="submit" class="btn btn-sm btn-primary">Add</button>
									<button 
										type="button" 
										class="btn btn-sm btn-ghost" 
										on:click={() => toggleCreateForm(column.type)}
									>
										Cancel
									</button>
								</div>
							</div>
						</form>
					{:else}
						<button 
							class="btn btn-ghost btn-sm w-full border-2 border-dashed border-base-300 hover:border-base-content/20"
							on:click={() => toggleCreateForm(column.type)}
						>
							+ Add Task
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>