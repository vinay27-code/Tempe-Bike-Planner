# 🚴 Tempe Bike Friendly Route Planner

A full-stack React + TypeScript app that helps users find safe, bike-friendly routes in and around Tempe, Arizona — using Google Maps with biking mode, distance/ETA estimates, and route bookmarking.

> Built with: React · TypeScript · TailwindCSS · Google Maps API

---

## 🌟 Features

- 🗺️ Search and display **bike-friendly routes** via Google Maps
- 🧭 Real-time distance & ETA estimation
- 📍 Autocomplete origin & destination with Places API
- 💾 Save favorite routes in `localStorage`
- 🗑️ Delete individual saved routes
- 💻 Responsive layout with TailwindCSS

---

## 🚀 Live Demo

🌐 [https://your-netlify-site.netlify.app](https://your-netlify-site.netlify.app)  
*(Replace with your real Netlify link after deployment)*

---

## 📸 Preview

<img width="2304" height="1536" alt="Screenshot 2025-07-13 232914" src="https://github.com/user-attachments/assets/4d2a064a-7413-49b6-8f81-efb948d0c2da" />
<img width="2304" height="1536" alt="Screenshot 2025-07-13 232928" src="https://github.com/user-attachments/assets/3e4b455a-135d-4d11-8101-68a57dd9a605" />




---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **Maps:** Google Maps JavaScript API, Directions API, Places API
- **State:** React Hooks (`useState`, `useEffect`, `useRef`)
- **Storage:** Browser `localStorage`

---

## 🔧 Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/TempeBikePlanner.git
cd TempeBikePlanner

# Install dependencies
npm install

# Create .env file and add your API key
echo "REACT_APP_GOOGLE_MAPS_API_KEY=your-key-here" > .env

# Start the app
npm start
