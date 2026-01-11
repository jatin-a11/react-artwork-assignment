# React + TypeScript Artwork Explorer

This project is a technical assignment for a **ReactJS Development Internship**.  
It showcases a data table built with **PrimeReact** that fetches artwork data from the **Art Institute of Chicago API**, implementing server-side pagination and controlled row selection.

---

##  Features

- **Server-Side Pagination**  
  Data is fetched page-by-page from the public API to ensure efficient memory usage.

- **Persistent Row Selection**  
  Selected rows remain highlighted while navigating between pages using PrimeReact’s `dataKey` mechanism.

- **Custom Selection Overlay**  
  A chevron-triggered overlay panel allows users to select a specific number of rows from the *current page only*, without pre-fetching additional pages.

- **Selection Counter**  
  Displays the total number of selected rows in real time above the table.

- **TypeScript Integration**  
  The project is written in **TypeScript** with practical workarounds for third-party library typing limitations.

---

##  Tech Stack

- **React** (Vite)
- **TypeScript**
- **PrimeReact** (DataTable, Column, OverlayPanel)
- **PrimeIcons**

---

##  API Used

Art Institute of Chicago Public API  
https://api.artic.edu/api/v1/artworks?page={page}

yaml
Copy code

---

##  Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd <your-repo-name>
Install dependencies

bash
Copy code
npm install
Run the development server

bash
Copy code
npm run dev