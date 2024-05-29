<script>
  import { setAuthToken } from '$lib/session'; // Import the setAuthToken function

  let username = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        const token = data.token;


        console.log('Session token:', token);



        setAuthToken(token); // Store the token received from the backend

        localStorage.setItem('token', token);         // Store the token in browser's localStorage

        window.location.href = '/books'; // Redirect to the books page
      } else {
        errorMessage = 'Invalid username or password';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      errorMessage = 'Failed to login. Please try again later.';
    }
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f8ff;
    color: #333;
    font-family: Arial, sans-serif;
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  label {
    margin-bottom: 10px;
    color: #555;
  }

  input {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }

  button {
    padding: 10px;
    margin-top: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2980b9;
  }

  p {
    margin-top: 15px;
    color: red;
  }

  a {
    color: #3498db;
    text-decoration: none;
    margin-top: 15px;
  }

  a:hover {
    text-decoration: underline;
  }

  .links {
    margin-top: 20px;
  }

  .links a {
    margin-right: 10px;
  }
</style>

<main>
  <h1>Login</h1>
  <form on:submit|preventDefault={handleLogin}>
    <label>
      Username:
      <input type="text" bind:value={username} required />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>
    <button type="submit">Login</button>
    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
  </form>
  <div class="links">
    <a href="/register">Register here</a>
    <a href="/">Home</a>
  </div>
</main>
