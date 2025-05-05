# 🌟 Postify – React + TypeScript + Vite

[![Vite](https://img.shields.io/badge/Vite-%23646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-%2361DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)

> 🚀 A minimal yet powerful social-posting React app built on Vite + TypeScript, ready for rapid development.

---

## 📦 Project Overview

Postify is a simple React app scaffolded with **Vite** and **TypeScript**, designed to provide a blazing-fast development experience, modular architecture, and modern UI.

---

## ✨ Implemented Features

| Feature                             | Description                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| 🔄 **Post Feed**                    | Displays a list of user posts with titles, content, and metadata.     |
| ➕ **Create New Post**               | Form to add a new post .         |
| 🗑 **Delete Post**                  | Ability to remove a post from the feed.                               |
| ✏ **Edit Post**                     | Edit existing post content via a modal form.                |
| 🖼 **Image Upload**                 | Attach an image to a post (stored by imgbb API).           |
| 🚀 **Responsive Design**            | Fully responsive layout, works on desktop, tablet, and mobile.        |
---

## 📁 Folder Structure

```plaintext
src/
 ├── components/       # Reusable UI components (Posts components, forms, buttons, inputs etc.)
 ├── pages/            # Main app pages or views
 ├── hooks/            # custom hooks for fetching data,uploading images, save/update posts
 ├── App.tsx          # Main application component
 └── main.tsx         # Vite entry point
```


---

## 📂 Project Setup

1️⃣ **Clone the repository:**

```bash
git clone https://github.com/JohnRezaik14/Postify-React.git
cd Postify-React
```

2️⃣ **Install dependencies:**

```bash
npm install
```

3️⃣ **Prepare your `.env` file:**

Create a `.env` file at the root with the following:

```env
VITE_IMGBB_API_KEY=your_imgbb_api_key_here
VITE_SERVER_BASE_URL=your_backend_server_url_here
```

> 🔑 **VITE\_IMGBB\_API\_KEY:** Get your API key from [ImgBB](https://api.imgbb.com/) to enable image uploads.
> 🌐 **VITE\_SERVER\_BASE\_URL:** Provide the base URL of your backend API (e.g., `http://localhost:3000`).

4️⃣ **Run the app:**

```bash
npm run dev
```




