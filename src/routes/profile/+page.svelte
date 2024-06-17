<script>
  import { onMount } from 'svelte';
  import { getAuthToken } from '$lib/session'; // Function to retrieve and remove the session token


  import { removeAuthToken } from '$lib/session'; 


  let user = null;
  let errorMessage = '';

  let profilePicUrl = '';
  let fileInput;


  let editBook= null;

  const SERVER_URL = 'http://localhost:5000'; // Specify your server URL

  async function fetchProfile(serverUrl = SERVER_URL) {
    try {
      console.log('Fetching profile...');
      const token = getAuthToken(); // Get session token
      console.log('Token of profile page:', token);
      console.log('serverurl');
      const response = await fetch(`${serverUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      user = await response.json();

      profilePicUrl = user.pic || '';    // url for the profile pic


      console.log('User:', user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      errorMessage = 'Failed to load profile. Please try again later.';
    }
  }







  async function handleProfilePicUpload(event) {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/upload-profile-pic`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const result = await response.json();
      profilePicUrl = result.profilePicUrl;
      console.log(profilePicUrl)
      user.pic = result.profilePicUrl;
    } catch (error) {
      errorMessage = 'Failed to upload profile picture. Please try again later.';
    }
  }













  async function handleLogout() {
    try {
      console.log('Logging out...');

      const token = getAuthToken(); // Retrieve the stored token

      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Include the bearer token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      removeAuthToken(); // Remove the session token on the client side
      window.location.href = '/login'; // Redirect to the login page or home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      errorMessage = 'Failed to log out. Please try again later.';
    }
  }







  async function handleEditBook(bookId) {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      editBook = await response.json();
    } catch (error) {
      errorMessage = 'Failed to fetch book for editing. Please try again later.';
    }
  }

  async function handleUpdateBook() {
    try {
      const { id, ...updatedBookData } = editBook;
      await updateBook(id, updatedBookData);
    } catch (error) {
      errorMessage = 'Failed to update book. Please try again later.';
    }
  }

  async function updateBook(bookId, bookData) {
    try {
      const token = getAuthToken(); // Get session token
      const response = await fetch(`http://localhost:5000/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Include the token in the request headers
        },
        body: JSON.stringify(bookData)
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      const updatedBook = await response.json();
      user.books = user.books.map(book => (book.id === bookId ? { ...book, ...updatedBookData } : book));
      editBook = null;
    } catch (error) {
      errorMessage = 'Failed to update book. Please try again later.';
    }
  }


  

  async function handleDeleteBook(bookId) {
    try {
      console.log(`Deleting book with ID: ${bookId}`);
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      // Remove the book from the user.books array
      user.books = user.books.filter(book => book.id !== bookId);
    } catch (error) {
      errorMessage = 'Failed to delete book. Please try again later.';
    }
  }

  onMount(async () => {
    await fetchProfile();
  });







  import Page from '../+Page.svelte';
</script>



<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .left-panel {
    flex: 1;
    background-color: #87CEEB; /* Sky blue background */
    display: grid;
    place-content: center;
    text-align: center;
    padding: 120px;
  }

  .right-panel {
    flex: 1; /* Adjust width as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6; /* Fallback background color */
    padding: 20px;
  }

  main {
    max-width: 100%;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .left-panel, .right-panel {
      flex: 1;
      padding: 10px;
    }
  }
</style>

<div class="container">
  <div class="left-panel">
    <h1 class="text-xl font-bold text-whit">Welcome to User Profile........</h1>
    <p class="text-lg text-white"></p>
  </div>

  <div class="right-panel">
    <main class="max-w-4xl mx-auto bg-blue-100 rounded-lg shadow-lg">
      <div class="flex items-center justify-between mb-4">
        
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" on:click={handleLogout}>
          Logout
        </button>
      </div>

      {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
      {:else if user !== null}
        <p class="text-lg mb-4">Welcome, {user.username}!</p>

        <!-- Profile Picture Section -->
        <div class="flex items-center space-x-4 mb-4">
          {#if profilePicUrl}
            <img src={profilePicUrl} alt="Profile Picture" class="w-16 h-16 rounded-full shadow-lg">
          {:else}
            <div class="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full shadow-lg">
              <span class="text-gray-600 text-sm">No Photo</span>
            </div>
          {/if}

          <!-- Upload Profile Picture Form -->
          <form on:submit|preventDefault={handleProfilePicUpload} class="flex items-center space-x-2">
            <input type="file" bind:this={fileInput} class="py-1 px-2 border border-gray-300 rounded">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Upload
            </button>
          </form>
        </div>

        <!-- Your Books Section -->
        <h2 class="text-xl mt-4 mb-2">Your Books</h2>
        {#if user.books.length > 0}
          <ul class="space-y-2">
            {#each user.books as book}
              <li class="bg-white shadow-md rounded-lg p-2 flex items-center justify-between">
                <span>{book.title} by {book.author_name}</span>
                <div class="space-x-2">
                  <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" on:click={() => handleEditBook(book.id)}>Edit</button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" on:click={() => handleDeleteBook(book.id)}>Delete</button>
                </div>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="text-gray-600 mt-2">No books available.</p>
        {/if}

        <!-- Edit Book Form (if editBook is set) -->
        {#if editBook}
          <div class="mt-4">
            <h3 class="text-lg mb-2">Edit Book</h3>
            <form on:submit|preventDefault={handleUpdateBook} class="space-y-2">
              <label class="block">
                <span class="text-gray-700">Title:</span>
                <input type="text" bind:value={editBook.title} required class="form-input mt-1 block w-full">
              </label>
              <label class="block">
                <span class="text-gray-700">Author:</span>
                <input type="text" bind:value={editBook.author_name} required class="form-input mt-1 block w-full">
              </label>
              <label class="block">
                <span class="text-gray-700">Published Date:</span>
                <input type="date" bind:value={editBook.published_date} required class="form-input mt-1 block w-full">
              </label>
              <label class="block">
                <span class="text-gray-700">ISBN:</span>
                <input type="text" bind:value={editBook.isbn} required class="form-input mt-1 block w-full">
              </label>
              <div class="block">
                <label class="flex items-center">
                  <input type="checkbox" bind:checked={editBook.public} class="form-checkbox">
                  <span class="ml-2 text-gray-700">Public</span>
                </label>
              </div>
              <div class="space-x-2">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Update
                </button>
                <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" on:click={() => (editBook = null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        {/if}
      {/if}
    </main>
  </div>
</div>



