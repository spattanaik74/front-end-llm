<script>
  import { onMount } from 'svelte';
  import { getAuthToken } from '$lib/session'; // Function to retrieve the session token

  let ram = '';
  let storage = '';
  let backCamera = '';
  let frontCamera = '';
  let battery = '';
  let processor = '';

  let prediction = '';
  let error = '';
  let isLoading = false;

  const SERVER_URL = 'http://localhost:5000'; // Specify your server URL

  const encodedData = {
      "RAM": ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "256GB"],
      "ROM/Storage": ["32GB", "64GB", "128GB", "256GB"],
      "Back/Rare Camera": ["8MP Dual Camera", "50MP+2MP", "8MP Dual Rear Camera", "50MP Dual Rear Camera", "48MP + 2MP + 2MP + AI Lens Camera", "48MP + 8MP + 2MP + AI Lens Camera", "16MP + 5MP + 2MP + Low Light Sensor", "50MP + 2MP Depth Sensor + 2MP Macro Sensor", "64MP + 8MP + 2MP", "48MP + 8MP + 2MP", "50MP + 8MP", "64MP + 8MP + 2MP", "108MP + 8MP + 2MP", "64MP (OIS) + 8MP + 2MP", "13MP + 2MP + 2MP"],
      "Front Camera": ["5MP", "8MP", "16MP", "16MP+8MP", "32MP", "13MP Front Camera", "16MP Front Camera", "8MP Front Camera"],
      "Battery": ["5000 mAh", "4500mAh", "4000mAh"],
      "Processor": ["Mediatek Helio A22", "Mediatek Dimensity 700", "Helio G36", "Mediatek Helio G85 Processor", "MediaTek Helio G70", "MediaTek Helio G90T", "Helio P22 (MTK6762)", "Mediatek Helio G99", "Mediatek Helio G96", "Qualcomm Snapdragon 695 Processor", "Mediatek Dimensity 810 Processor", "Qualcomm Snapdragon 778G Processor", "Qualcomm Snapdragon 695 Processor", "Qualcomm Snapdragon 695 Processor", "MediaTek Dimensity 700 Processor", "Qualcomm Snapdragon 695 5G Processor", "Qualcomm Snapdragon 7+ Gen 2 (4nm) Processor", "Qualcomm Snapdragon 695 Processor", "MediaTek Helio G35 Processor"]
  };

  async function predictPrice(serverUrl = SERVER_URL) {
    try {
      isLoading = true;
      const token = getAuthToken(); // Get session token
      const response = await fetch(`${serverUrl}/predict-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Include the token in the request headers
        },
        body: JSON.stringify({ 
          "RAM": ram,
          "ROM/Storage": storage,
          "Back/Rare Camera": backCamera,
          "Front Camera": frontCamera,
          "Battery": battery,
          "Processor": processor
        })
      });

      if (!response.ok) {
        throw new Error('Failed to predict price');
      }

      const data = await response.json();
      prediction = `Predicted Price: ${data.predicted_value}`;
      error = '';
    } catch (err) {
      console.error('Error predicting price:', err);
      prediction = '';
      error = 'Failed to predict price. Please try again later.';
    } finally {
      isLoading = false;
    }
  }

  async function handleSubmit() {
    await predictPrice();
  }

  onMount(async () => {
    // Fetch initial data or perform any necessary setup
  });







  import Page from '../+Page.svelte';
</script>



<main class="container mx-auto mt-8 px-4">
  <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Mobile Price Prediction</h1>

  <div class="flex flex-col items-center">
    <div class="w-full max-w-md">
      <label for="ram" class="block text-lg font-semibold text-gray-700 mb-2">Select RAM:</label>
      <select id="ram" class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" bind:value={ram}>
        <option value="" disabled selected>Select RAM</option>
        {#each encodedData["RAM"] as option}
          <option value={option}>{option}</option>
        {/each}
      </select>

      <label for="storage" class="block text-lg font-semibold text-gray-700 mt-4 mb-2">Select ROM/Storage:</label>
      <select id="storage" class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" bind:value={storage}>
        <option value="" disabled selected>Select Storage</option>
        {#each encodedData["ROM/Storage"] as option}
          <option value={option}>{option}</option>
        {/each}
      </select>

      <label for="backCamera" class="block text-lg font-semibold text-gray-700 mt-4 mb-2">Select Back/Rare Camera:</label>
      <select id="backCamera" class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" bind:value={backCamera}>
        <option value="" disabled selected>Select Back Camera</option>
        {#each encodedData["Back/Rare Camera"] as option}
          <option value={option}>{option}</option>
        {/each}
      </select>

      <label for="frontCamera" class="block text-lg font-semibold text-gray-700 mt-4 mb-2">Select Front Camera:</label>
      <select id="frontCamera" class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" bind:value={frontCamera}>
        <option value="" disabled selected>Select Front Camera</option>
        {#each encodedData["Front Camera"] as option}
          <option value={option}>{option}</option>
        {/each}
      </select>

      <label for="battery" class="block text-lg font-semibold text-gray-700 mt-4 mb-2">Select Battery:</label>
      <select id="battery" class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" bind:value={battery}>
        <option value="" disabled selected>Select Battery</option>
        {#each encodedData["Battery"] as option}
          <option value={option}>{option}</option>
        {/each}
      </select>

      <label for="processor" class="block text-lg font-semibold text-gray-700 mt-4 mb-2">Select Processor:</label>
      <select id="processor" class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" bind:value={processor}>
        <option value="" disabled selected>Select Processor</option>
        {#each encodedData["Processor"] as option}
          <option value={option}>{option}</option>
        {/each}
      </select>

      <button on:click={handleSubmit} class="mt-6 py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md focus:outline-none focus:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed w-full">
        {isLoading ? 'Predicting...' : 'Predict Price'}
      </button>
    </div>
  </div>

  {#if prediction}
    <p class="mt-4 text-green-700">{prediction}</p>
  {/if}

  {#if error}
    <p class="mt-4 text-red-700">{error}</p>
  {/if}
</main>

