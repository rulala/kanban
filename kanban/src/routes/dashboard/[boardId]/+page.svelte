<script lang="ts">
	import type { PageData, ActionData } from './$types'
	import type { KanbanTask, TaskType } from '$lib/types'
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	export let data: PageData
	export let form: ActionData

	// Local state for optimistic updates
	let tasks = [...data.tasks]
	let notification: { type: 'error' | 'success'; message: string } | null = null

	// State for forms
	let showCreateForm: Record<TaskType, boolean> = {
		todo: false,
		doing: false,
		done: false
	}
	let editingTask: string | null = null
	let deletingTask: string | null = null

	// Update local tasks when data changes
	$: tasks = [...data.tasks]

	// Group tasks by type
	$: todoTasks = tasks.filter(task => task.type === 'todo')
	$: doingTasks = tasks.filter(task => task.type === 'doing')
	$: doneTasks = tasks.filter(task => task.type === 'done')

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

	function showNotification(type: 'error' | 'success', message: string) {
		notification = { type, message }
		setTimeout(() => {
			notification = null
		}, 5000)
	}

	function generateTempId() {
		return `temp-${Date.now()}-${Math.random()}`
	}

	async function handleCreateTask(event: Event, type: TaskType) {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		const formData = new FormData(form)
		const description = formData.get('description') as string

		// Optimistic update
		const tempTask: KanbanTask = {
			id: generateTempId(),
			description,
			type,
			board_id: data.board.id,
			user_id: '',
			position: 0,
			created_at: new Date().toISOString()
		}

		tasks = [...tasks, tempTask]
		showCreateForm[type] = false

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData
			})

			if (!response.ok) {
				throw new Error('Server error')
			}

			// Success - refresh data
			await invalidateAll()
			showNotification('success', 'Task created successfully')
			form.reset()
		} catch (error) {
			// Network or server error - rollback
			tasks = tasks.filter(t => t.id !== tempTask.id)
			showCreateForm[type] = true
			showNotification('error', 'Unable to connect to server. Please check your connection and try again.')
		}
	}

	async function handleUpdateTask(event: Event, taskId: string) {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		const formData = new FormData(form)
		const newDescription = formData.get('description') as string

		// Store original for rollback
		const originalTask = tasks.find(t => t.id === taskId)

		// Optimistic update
		tasks = tasks.map(t => 
			t.id === taskId 
				? { ...t, description: newDescription }
				: t
		)
		cancelEdit()

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData
			})

			if (!response.ok) {
				throw new Error('Server error')
			}

			// Success - refresh data
			await invalidateAll()
			showNotification('success', 'Task updated successfully')
		} catch (error) {
			// Network or server error - rollback
			if (originalTask) {
				tasks = tasks.map(t => 
					t.id === taskId ? originalTask : t
				)
			}
			showNotification('error', 'Unable to connect to server. Please check your connection and try again.')
		}
	}

	async function handleDeleteTask(event: Event, taskId: string) {
		event.preventDefault()
		const form = event.target as HTMLFormElement

		// Store task for rollback
		const deletedTask = tasks.find(t => t.id === taskId)
		const deletedIndex = tasks.findIndex(t => t.id === taskId)

		// Optimistic delete
		tasks = tasks.filter(t => t.id !== taskId)
		cancelDelete()

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})

			if (!response.ok) {
				throw new Error('Server error')
			}

			// Success - refresh data
			await invalidateAll()
			showNotification('success', 'Task deleted successfully')
		} catch (error) {
			// Network or server error - rollback
			if (deletedTask && deletedIndex !== -1) {
				tasks = [
					...tasks.slice(0, deletedIndex),
					deletedTask,
					...tasks.slice(deletedIndex)
				]
			}
			showNotification('error', 'Unable to connect to server. Please check your connection and try again.')
		}
	}
</script>

<div class="flex flex-col h-full">
	<!-- Notification Toast -->
	{#if notification}
		<div class="toast toast-top toast-end z-50">
			<div class="alert alert-{notification.type === 'error' ? 'error' : 'success'}">
				<span>{notification.message}</span>
			</div>
		</div>
	{/if}

	<!-- Board Header -->
	<div class="flex items-center justify-between mb-6">
		<div>
			<h1 class="text-3xl font-bold">{data.board.name}</h1>
			<p class="text-base-content/60">Created {new Date(data.board.created_at).toLocaleDateString()}</p>
		</div>
		<a href="/dashboard" class="btn btn-ghost">← Back to Boards</a>
	</div>

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
										<form 
											method="POST" 
											action="?/updateTask"
											on:submit|preventDefault={(e) => handleUpdateTask(e, task.id)}
											class="space-y-2"
										>
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
											<form 
												method="POST" 
												action="?/deleteTask"
												on:submit|preventDefault={(e) => handleDeleteTask(e, task.id)}
												class="flex gap-2"
											>
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
						<form 
							method="POST" 
							action="?/createTask"
							on:submit|preventDefault={(e) => handleCreateTask(e, column.type)}
							class="card bg-base-100 shadow-sm"
						>
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