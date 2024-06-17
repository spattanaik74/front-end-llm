// session.js

let authToken = ''; // Initialize authToken to store session information

export function setAuthToken(token) {
  authToken = token;
  localStorage.setItem('authToken', token); // Store the token in localStorage
}

export function getAuthToken() {
  return authToken || localStorage.getItem('authToken'); // Retrieve the token from localStorage
}

export function clearAuthToken() {
  authToken = '';
  localStorage.removeItem('authToken'); // Clear the token from localStorage
}

export function removeAuthToken() {
  authToken = ''; // Set authToken to an empty string
}
