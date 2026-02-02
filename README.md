# Frontend Technical Challenge

This repository contains a simple frontend application built with Vite and Vue.js. The purpose of this project is to serve as a starting point for a frontend technical challenge.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend-technical-challenge
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173` to see the application.

## 📌 Overview

The goal of this challenge is to build a **frontend application** that consumes an external API to retrieve information about **U.S. ZIP Codes**, allows users to **store selected results**, and manage them through a dedicated interface.

You will work with:

- A public ZIP Code API (**Zippopotam.us**)
- A provided backend API for **user creation and ZIP code persistence**
- An **API access token** that will be provided to you

This challenge focuses on frontend architecture, API consumption, state management, and user experience.

---

## 🔐 Authentication

You will receive an **API token** to access the provided backend API.

- The token must be sent on every request to the backend API.
- Use the following HTTP header:

```
Authorization: Bearer <API_TOKEN>
```

The external ZIP Code API (Zippopotam.us) does **not** require authentication.

---

## 🔗 External ZIP Code API

Use the following API to retrieve ZIP Code data:

```
https://api.zippopotam.us/us/{zip}
```

Example:

```
https://api.zippopotam.us/us/90210
```

---

## 🧩 Functional Requirements

### 1️⃣ ZIP Code Search

- Provide an input field to enter a U.S. ZIP Code (5 digits).
- Fetch ZIP Code information from the external API.
- Display at least:
  - ZIP Code
  - City
  - State
  - Country
  - Latitude
  - Longitude
- Handle loading and statusCode states properly.

---

### 2️⃣ User Creation

- On first interaction, create a user by calling the provided endpoint:

```
POST https://glaziersonline.com:3210/api-dev/zip-codes/user
```

Response example:

```json
{
  "name": "your name"
}
```

- Store the returned `userId` in **localStorage**.
- This user identifier must be reused for all future requests.

---

### 3️⃣ Save ZIP Code Results

- Allow the user to **save** a ZIP Code result.
- When saving, call:

```
POST https://glaziersonline.com:3210/api-dev/zip-codes
```

Payload example:

```json
{
  "userId": "uuid-123",
  "zip": "90210",
  "city": "Beverly Hills",
  "state": "CA"
  "latitude": 34.0901,
  "longitude": -118.4065,
  "observations": "optional notes"
}
```

---

### 4️⃣ Saved ZIP Codes Screen

- Create a separate screen/page that displays the **saved ZIP Codes for the current user**.
- Retrieve them using:

```
GET https://glaziersonline.com:3210/api-dev/zip-codes/user/{userId}
```

---

### 5️⃣ ZIP Code Management

On the saved ZIP Codes screen, the user must be able to:

- ✏️ Edit a saved ZIP Code
- 🗑 Delete a ZIP Code
- 📋 View the list in a **table**
- 📄 Use **pagination** (page & per page or page-based)

Required endpoints:

```
PATCH https://glaziersonline.com:3210/api-dev/zip-codes/{id}
DELETE https://glaziersonline.com:3210/api-dev/zip-codes/{id}
```

---

## 🧠 Technical Expectations

- Clear separation between API logic and UI components
- Proper state management (loading, statusCode, success)
- Persistent user identification using localStorage
- Correct usage of the provided API token
- Clean, readable, and maintainable code

---

## ⭐ Bonus (Optional)

- Avoid duplicate ZIP Codes per user
- Optimistic UI updates
- Responsive layout

---

## 📦 Deliverables

- Source code repository (GitHub, GitLab, etc.)
- Clear instructions to run the project locally
- A short explanation of architectural decisions (optional)

---

To test the API endpoints, you can use tools like Postman or curl. Use this endpoint to check the API status:

```
GET https://glaziersonline.com:3210/api-dev/zip-codes/health
```

Don't forget to include the `Authorization` header with your API token.

Good luck, and happy coding!
