// index.js

import { getAuthToken } from '$lib/session'; // Import the getAuthToken function

export async function fetchBooks() {
  const authToken = getAuthToken(); // Get the authToken
  const response = await fetch('http://localhost:5000/books', {
    headers: {
      Authorization: `Bearer ${authToken}` // Include the authToken in the request headers
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return await response.json();
}

export async function addBook(bookData) {
  const authToken = getAuthToken(); // Get the authToken
  const response = await fetch('http://localhost:5000/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}` // Include the authToken in the request headers
    },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) {
    throw new Error('Failed to add book');
  }
  return await response.json();
}

export async function getBook(bookId) {
  const authToken = getAuthToken(); // Get the authToken
  const response = await fetch(`http://localhost:5000/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${authToken}` // Include the authToken in the request headers
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return await response.json();
}

export async function updateBook(bookId, bookData) {
  const authToken = getAuthToken(); // Get the authToken
  const response = await fetch(`http://localhost:5000/books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}` // Include the authToken in the request headers
    },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) {
    throw new Error('Failed to update book');
  }
  return await response.json();
}

export async function deleteBook(bookId) {
  const authToken = getAuthToken(); // Get the authToken
  const response = await fetch(`http://localhost:5000/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}` // Include the authToken in the request headers
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
}





