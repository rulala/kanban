<div class="min-h-screen bg-base-200 p-8">
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <div class="hero bg-base-100 rounded-box mb-8">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Kanban Board</h1>
          <p class="py-6">Environment setup complete! Ready to build your task management app.</p>
          <button class="btn btn-primary">Get Started</button>
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
        <div class="stat-title">Tailwind CSS</div>
        <div class="stat-value text-secondary">✓ Ready</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="stat-title">DaisyUI</div>
        <div class="stat-value text-accent">✓ Ready</div>
      </div>
    </div>

    <!-- Sample Card -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Next Steps</h2>
        <p>Your development environment is configured with:</p>
        <ul class="list-disc list-inside space-y-2 my-4">
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for utility styling</li>
          <li>DaisyUI for beautiful components</li>
          <li>Supabase for backend (pending setup)</li>
        </ul>
        <div class="card-actions justify-end">
          <button class="btn btn-ghost">View Docs</button>
          <button class="btn btn-primary">Start Building</button>
        </div>
      </div>
    </div>

    <!-- Theme Toggle Demo -->
    <div class="mt-8 text-center">
      <div class="badge badge-outline">Light Theme</div>
      <div class="badge badge-primary mx-2">Primary</div>
      <div class="badge badge-secondary">Secondary</div>
      <div class="badge badge-accent">Accent</div>
    </div>
  </div>

  <!-- DaisyUI test -->
  <!-- Open the modal using ID.showModal() method -->
  <button class="btn" onclick={(): void => document.getElementById('my_modal_1').showModal()}> open modal</button>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</div>