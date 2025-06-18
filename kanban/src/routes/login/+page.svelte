<script lang="ts">
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6">
				Enter your email address and we'll send you a magic link to sign in.
				No password required!
			</p>
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form method="POST" action="?/signin" class="card-body">
				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="email@example.com"
						class="input input-bordered"
						required
					/>
				</div>
				{#if form?.error}
					<div class="alert alert-error">
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{form.error}</span>
					</div>
				{/if}
				{#if form?.success}
					<div class="alert alert-success">
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>Check your email for the magic link!</span>
					</div>
				{/if}
				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary">Send Magic Link</button>
				</div>
			</form>
		</div>
	</div>
</div>