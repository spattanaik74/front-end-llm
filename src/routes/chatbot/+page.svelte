<script>
  import { onMount } from 'svelte';
  import { getAuthToken } from '$lib/session'; 

  let userInput = '';
  let chatHistory = [];
  let error = '';
  let isLoading = false;

  const SERVER_URL = 'http://localhost:5000'; 

  async function chatWithBot() {
    try {
      isLoading = true;
      const token = getAuthToken(); 
      const response = await fetch(`${SERVER_URL}/chat-bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ input: userInput })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the chatbot');
      }

      const data = await response.json();
      chatHistory = [...chatHistory, { text: `User: ${userInput}`, sender: 'user' }];
      chatHistory = [...chatHistory, { text: `Bot: ${data.response}`, sender: 'bot' }];
      error = '';
    } catch (err) {
      console.error('Error chatting with bot:', err);
      error = 'Failed to get response from the chatbot. Please try again later.';
    } finally {
      isLoading = false;
      userInput = ''; 
    }
  }

  async function handleSubmit() {
    await chatWithBot();
  }
</script>

<main class="container mx-auto mt-8 px-4">
  <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Chat with Bot</h1>

  <div class="chat-box">
    <p class="bot-message">Hi, I'm a chatbot. How can I help you?</p>
    {#each chatHistory as message, index (message.text)}
      <div class="message">
        {#if message.sender === 'user'}
          <div class="user-message">{message.text}</div>
        {:else}
          <div class="bot-message">{message.text}</div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="input-container flex items-center">
    <input
      type="text"
      id="userInput"
      class="input-field"
      placeholder="Enter your message..."
      bind:value={userInput}
    />

    <button
      on:click={handleSubmit}
      class="send-button"
      disabled={isLoading || userInput.trim() === ''}
    >
      {isLoading ? 'Sending...' : 'Send'}
    </button>
  </div>

  {#if error}
    <p class="mt-4 text-red-700">{error}</p>
  {/if}
</main>

<style>
  .container {
    max-width: 600px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: auto;
    font-family: Arial, sans-serif;
  }

  .chat-box {
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
    border-radius: 8px;
    background-color: #f0f0f0;
    margin-bottom: 20px;
  }

  .message {
    margin-bottom: 10px;
  }

  .user-message {
    max-width: 70%;
    padding: 10px;
    border-radius: 8px;
    background-color: #007bff;
    color: #fff;
    text-align: right;
    margin-left: auto; 
    margin-right: 10px; 
  }

  .bot-message {
    max-width: 70%;
    padding: 10px;
    border-radius: 8px;
    background-color: #f0f0f0;
    color: #333;
    text-align: left;
    margin-right: auto; 
    margin-left: 10px; 
  }

  .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .input-field {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
  }

  .send-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .send-button:hover {
    background-color: #0056b3;
  }

  .error {
    color: #e53e3e;
    margin-top: 10px;
  }
</style>
