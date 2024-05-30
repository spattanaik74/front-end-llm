<script>
  import { onMount } from 'svelte';
  import { getAuthToken } from '$lib/session'; // Function to retrieve the session token

  let books = [];
  let errorMessage = '';
  let newBook = { title: '', author: '', published_date: '', isbn: '' };
  let editBook = null; // For storing the book being edited

  const SERVER_URL = 'http://localhost:5000'; // Specify your server URL

  async function fetchBooks(serverUrl = SERVER_URL) {
    try {
      console.log('Fetching books...');
      const token = getAuthToken(); // Get session token
      console.log('Token:', token);
      const response = await fetch(`${serverUrl}/books`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });

      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      books = await response.json();
      console.log('Books:', books);
    } catch (error) {
      console.error('Error fetching books:', error);
      errorMessage = 'Failed to load books. Please try again later.';
    }
  }

  async function addBook(bookData, serverUrl = SERVER_URL) {
    try {
      console.log('Adding book...');
      const token = getAuthToken(); // Get session token
      console.log('Token:', token);
      const response = await fetch(`${serverUrl}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Include the token in the request headers
        },
        body: JSON.stringify(bookData)
      });

      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const addedBook = await response.json();
      console.log('Added Book:', addedBook);

      books = [...books, addedBook];
      console.log('Updated Books:', books);

      newBook = { title: '', author: '', published_date: '', isbn: '' };
      console.log('New Book:', newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      errorMessage = 'Failed to add book. Please try again later.';
    }
  }

  async function getBook(bookId, serverUrl = SERVER_URL) {
    try {
      const token = getAuthToken(); // Get session token
      const response = await fetch(`${serverUrl}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      editBook = await response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      errorMessage = 'Failed to fetch book for editing. Please try again later.';
    }
  }

  async function updateBook(bookId, bookData, serverUrl = SERVER_URL) {
    try {
      const token = getAuthToken(); // Get session token
      const response = await fetch(`${serverUrl}/books/${bookId}`, {
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
      books = books.map(book => (book.id === updatedBook.id ? updatedBook : book));
      editBook = null;
    } catch (error) {
      console.error('Error updating book:', error);
      errorMessage = 'Failed to update book. Please try again later.';
    }
  }

  async function deleteBook(bookId, serverUrl = SERVER_URL) {
    try {
      const token = getAuthToken(); // Get session token
      const response = await fetch(`${serverUrl}/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      books = books.filter(book => book.id !== bookId);
    } catch (error) {
      console.error('Error deleting book:', error);
      errorMessage = 'Failed to delete book. Please try again later.';
    }
  }

  async function handleAddBook() {
    try {
      await addBook(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      errorMessage = 'Failed to add book. Please try again later.';
    }
  }

  async function handleUpdateBook() {
    try {
      const { id, ...updatedBookData } = editBook;
      await updateBook(id, updatedBookData);
    } catch (error) {
      console.error('Error updating book:', error);
      errorMessage = 'Failed to update book. Please try again later.';
    }
  }

  async function handleEditBook(bookId) {
    try {
      await getBook(bookId);
    } catch (error) {
      console.error('Error fetching book:', error);
      errorMessage = 'Failed to fetch book for editing. Please try again later.';
    }
  }

  async function handleDeleteBook(bookId) {
    try {
      await deleteBook(bookId);
    } catch (error) {
      console.error('Error deleting book:', error);
      errorMessage = 'Failed to delete book. Please try again later.';
    }
  }

  onMount(async () => {
    await fetchBooks();
  });
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
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
    margin-bottom: 20px;
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
    margin-top: 10px;
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

  .cancel-button {
    background-color: #e74c3c;
  }

  .cancel-button:hover {
    background-color: #c0392b;
  }

  p {
    margin-top: 15px;
    color: red;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background: #fff;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li button {
    margin-left: 10px;
  }

  .links {
    margin-top: 20px;
  }

  .links a {
    color: #3498db;
    text-decoration: none;
    margin-right: 10px;
  }

  .links a:hover {
    text-decoration: underline;
  }
</style>

<main>
  <h1>Book Management API</h1>

  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}

  <h2>Add a New Book</h2>
  <form on:submit|preventDefault={handleAddBook}>
    <label>
      Title:
      <input type="text" bind:value={newBook.title} required />
    </label>
    <label>
      Author:
      <input type="text" bind:value={newBook.author} required />
    </label>
    <label>
      Published Date:
      <input type="date" bind:value={newBook.published_date} required />
    </label>
    <label>
      ISBN:
      <input type="text" bind:value={newBook.isbn} required />
    </label>
    <button type="submit">Add Book</button>
  </form>

  {#if editBook}
    <h2>Edit Book</h2>
    <form on:submit|preventDefault={handleUpdateBook}>
      <label>
        Title:
        <input type="text" bind:value={editBook.title} required />
      </label>
      <label>
        Author:
        <input type="text" bind:value={editBook.author} required />
      </label>
      <label>
        Published Date:
        <input type="date" bind:value={editBook.published_date} required />
      </label>
      <label>
        ISBN:
        <input type="text" bind:value={editBook.isbn} required />
      </label>
      <button type="submit">Update Book</button>
      <button type="button" class="cancel-button" on:click={() => (editBook = null)}>Cancel</button>
    </form>
  {/if}

  <h2>Books List</h2>
  {#if books.length > 0}
    <ul>
      {#each books as book}
        <li>
          {book.title} by {book.author}
          <div>
            <button on:click={() => handleEditBook(book.id)}>Edit</button>
            <button class="cancel-button" on:click={() => handleDeleteBook(book.id)}>Delete</button>
          </div>
        </li>
      {/each}
    </ul>
  {:else if !errorMessage}
    <p>No books available.</p>
  {/if}

  <div class="links">
    <a href="/">Home</a>
  </div>
</main>
