<script>
  import { onMount } from 'svelte';
  import { getAuthToken } from '$lib/session'; // Function to retrieve the session token

  let date = '';
  let prediction = '';
  let error = '';
  let isLoading = false;

  const SERVER_URL = 'http://localhost:5000'; // Specify your server URL

  async function predictWeather(serverUrl = SERVER_URL) {
    try {
      isLoading = true;
      const token = getAuthToken(); // Get session token
      const response = await fetch(`${serverUrl}/predict-weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Include the token in the request headers
        },
        body: JSON.stringify({ date })
      });

      if (!response.ok) {
        throw new Error('Failed to predict weather');
      }

      const data = await response.json();
      prediction = `Predicted Weather: ${data.prediction}`;
      error = '';
    } catch (error) {
      console.error('Error predicting weather:', error);
      prediction = '';
      error = 'Failed to predict weather. Please try again later.';
    } finally {
      isLoading = false;
    }
  }

  async function handleSubmit() {
    await predictWeather();
  }

  onMount(async () => {
    // Fetch initial data or perform any necessary setup
  });








  import Page from '../+Page.svelte';
</script>

<main class="container mx-auto mt-8 px-4">
  <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Weather Prediction</h1>

  <div class="flex flex-col items-center">
    <label for="date" class="block text-lg font-semibold text-gray-700 mb-2">Select a Date:</label>
    <input type="date" id="date" class="block w-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" bind:value={date} />

    <button on:click={handleSubmit} class="mt-4 py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md focus:outline-none focus:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed">
      {isLoading ? 'Predicting...' : 'Predict Weather'}
    </button>
  </div>

  {#if prediction}
    <p class="mt-4 text-green-700">{prediction}</p>
  {/if}

  {#if error}
    <p class="mt-4 text-red-700">{error}</p>
  {/if}
</main>



