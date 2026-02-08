Ticket‑Helpdesk is a modern web application designed to let users create, track, and manage support tickets with ease. It provides an intuitive user interface for submitting issues, viewing ticket lists, updating statuses, and generating simple reports. The platform includes authentication, role‑based access, statistics, and responsive layouts to support seamless customer support workflows.

This system is ideal for internal teams, small businesses, or projects that need an easy way to track issues and service requests. It features:

✔ Create and delete support tickets
✔ Open and close ticket statuses
✔ Dashboard status metrics & charts
✔ Profile management
✔ Clean UI with React and modern layout

🧩 Tech Stack
Layer	Technology
Frontend	React + TypeScript
Charts	Recharts
Router	React Router
Backend	Node/Express 
API	REST ✔
Deployment	Vercel 
🚀 Features
✅ Ticket Management

Create new tickets with title & description

View and filter existing tickets

Change ticket status (Open/Closed)

Simple pagination controls

📊 Dashboard & Reporting

Interactive charts for ticket distribution

Summarized ticket stats

Easy visual feedback on ticket counts

👤 User Profile

View user details

Edit profile via popup modal

Upload avatar picture

📂 Repository Structure

(Example — update once your real tree is visible)

Ticket‑Helpdesk/
├── backend/           # API server
├── helpdesk‑ui/       # React frontend
├── .gitignore
├── package.json
└── README.md

🧠 Getting Started
🔧 Clone Repo
git clone https://github.com/Karan7s7n/Ticket‑Helpdesk.git
cd Ticket‑Helpdesk

📦 Start Backend
cd backend
npm install
npm run dev

🚀 Start Frontend
cd helpdesk‑ui
npm install
npm start


The app should be running at http://localhost:3000.

📄 Usage Overview
Dashboard

The Dashboard shows:

Total, Open, Closed tickets

Charts visualizing ticket data

Ticket List

Users can:

Add tickets

Search & filter by status

Paginate through results

Ticket Details

Clicking a ticket opens a popup with:

Title, description, status

Toggle status button

Profile

Shows user info with avatar.
Edit button opens a modal to update:

Name

Email

Role

Company

Avatar

📝 Notes

✔ The project includes both UI and backend components.
✔ A modern responsive layout enhances the helpdesk experience.
✔ You can customize and extend features like email notifications or analytics.
✔ This repo can be used as a base for enterprise ticketing systems.

📌 Future Enhancements (Ideas)

💡 Add real‑time ticket updates (WebSockets)
💡 Auto assign tickets
💡 Notification support
💡 Export reports as CSV/PDF
💡 Role‑based dashboards

⭐ License

This project is open source — use, modify, and extend it freely!
