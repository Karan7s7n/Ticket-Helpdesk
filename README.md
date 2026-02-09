Ticket Helpdesk

Live Demo: ticket-helpdesk-zeta.vercel.app

A full-featured Helpdesk Ticket Management System built with React, TypeScript, and Supabase. This project provides a modern, responsive interface for managing support tickets, tracking analytics, and monitoring agent performance in real-time.

Features

User Authentication

Sign up, login, and secure session management via Supabase Auth.

Ticket Management

Create, update, and delete tickets.

Mark tickets as Open or Closed.

Real-time updates for ticket changes.

Dashboard

Overview of ticket stats: Open, Closed, Total, and Capacity usage.

Pagination and search/filter for tickets.

Reports & Analytics

Ticket trends (daily, weekly, monthly) visualized with charts.

Agent performance tracking.

Real-time updates via Supabase Realtime channels.

User Profile

View and edit profile details including avatar, role, and company.

Responsive profile page with edit modal.

Modern UI

Clean design with dark/light contrast.

Responsive and mobile-friendly layout.

Tech Stack

Frontend: React, TypeScript, Vite

Backend & Database: Supabase (PostgreSQL)

Charts & UI: Recharts, CSS modules

Routing: React Router

Getting Started

Clone the repo:

git clone https://github.com/Karan7s7n/Ticket-Helpdesk.git
cd Ticket-Helpdesk


Install dependencies:

npm install


Set up environment variables (.env):

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key


Run the project:

npm run dev


Open http://localhost:5173
 in your browser.

Project Structure
/src
  /components   # Reusable UI components (Navbar, TicketCard, StatCard, etc.)
  /pages        # Dashboard, Reports, Profile, Auth pages
  /supabase.ts  # Supabase client setup
  /types.ts     # Shared TypeScript types

Contributing

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit (git commit -m "feat: description").

Push to your branch (git push origin feature-name).

Open a Pull Request.
