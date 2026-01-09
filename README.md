# Frontend SPA for Registration & Login API

## Overview

This project is a **React Single Page Application (SPA)** demonstrating:

- User registration and login
- JWT authentication with access and refresh tokens
- Automatic silent login with refresh token
- Role-based UI features (Admin panel)
- Integration with a backend ASP.NET Core API
- Clean state management using React Context and custom hooks

It is intended as a **CV-ready proof-of-concept**, showcasing fullstack React + ASP.NET Core authentication flows.

---

## Features

- **Authentication**
  - Register a new user
  - Login with credentials
  - Silent login via refresh token
  - Logout

- **JWT Handling**
  - Access token stored in memory
  - Refresh token persisted in `localStorage` for silent login
  - Decoding JWT on the frontend to display username, role, etc.
  - Automatic token refresh on 401 errors

- **Role-based Authorization**
  - Admin panel accessible only to users with the `Admin` role
  - Role information decoded from JWT claims

- **API Integration**
  - Centralized API service (`ApiService`) handles fetch requests
  - Type-safe requests using TypeScript DTOs
  - Error handling and loading state managed via `useAuth` hook

---

## Tech Stack

- React
- TypeScript
- Vite for development and bundling
- Custom React hooks and Context for auth state
- Fetch API for backend communication
