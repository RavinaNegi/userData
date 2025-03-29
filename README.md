# User Management 

A React-based user management system that integrates with the [Reqres API](https://reqres.in/) for authentication, user listing, pagination, and CRUD operations.

## 🚀 Features

- **User Authentication** (Login with API token storage)
- **Persistent Login** (Token stored in localStorage)
- **User Listing** (Fetched from Reqres API with pagination)
- **Lazy Loading / Infinite Scroll** for seamless user loading
- **Edit & Delete Users**
- **Logout Functionality** (Clears token and redirects to login page)
- **Modern UI with Tailwind CSS**

## 🛠️ Tech Stack

- **React** (Frontend framework)
- **Redux Toolkit** (State management)
- **React Router** (Navigation)
- **Tailwind CSS** (Styling)
- **Reqres API** (Mock API for user management)

## 📂 Folder Structure

```
📦 project-root
├── 📂 src
│   ├── 📂 components        # Reusable components
│   ├── 📂 pages             # Login, Users, Edit User pages
│   ├── 📂 redux             # Redux store & slices
│   ├── 📂 styles            # Tailwind CSS styles (if any)
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point
│   ├── routes.js           # App routes
│   ├── store.js            # Redux store configuration
├── 📜 README.md            # Documentation
├── 📜 package.json         # Dependencies & scripts
```

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/RavinaNegi/userData.git
cd userData
```

### 2️⃣ Install Dependencies

```sh
yarn install  # or npm install
```

### 3️⃣ Start the Development Server

```sh
yarn start  # or npm start
```

The app will be available at `http://localhost:3000/`.

## 🔐 Authentication Workflow

1. User logs in with email & password (handled via Reqres API).
2. If successful, the API returns a token which is stored in Redux & localStorage.
3. On refresh, the app checks for a stored token and keeps the user logged in.
4. Logout clears the token and redirects to the login page.

## 📌 API Endpoints Used

- **Login:** `POST https://reqres.in/api/login`
- **Get Users:** `GET https://reqres.in/api/users?page=1`
- **Delete User:** `DELETE https://reqres.in/api/users/{id}`

##

##
