<script>
  let username = '';
  let password = '';
  let errorMessage = '';

  async function handleRegister() {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        // Successful registration, redirect to login page
        window.location.href = '/login'; // Change to your login page URL
      } else {
        // Registration failed, display error message
        errorMessage = 'Failed to register. Please try again later.';
      }
    } catch (error) {
      console.error('Error registering:', error);
      errorMessage = 'Failed to register. Please try again later.';
    }
  }




  import Page from '../+Page.svelte';
</script>







<main class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
  <h1 class="text-3xl font-semibold mb-6">Register</h1>
  <form on:submit|preventDefault={handleRegister} class="space-y-4">
    <label class="block">
      <span class="text-gray-700">Username:</span>
      <input type="text" bind:value={username} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <label class="block">
      <span class="text-gray-700">Password:</span>
      <input type="password" bind:value={password} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </label>
    <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
  </form>
  <p class="mt-4 text-gray-600">Already have an account? <a href="/login" class="text-indigo-600">Login here</a>.</p>
</main>

