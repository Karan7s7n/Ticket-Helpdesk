import { useEffect, useState } from "react";
import TicketList from "../components/TicketList";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import TicketDetails from "../components/TicketDetails";

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const fetchStats = () => {
    fetch(`${import.meta.env.VITE_API_URL}/reports`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          open: data.open,
          closed: data.closed,
          capacity:
            data.total > 0
              ? Math.round((data.open / data.total) * 100) + "%"
              : "0%",
          all: data.total,
        });
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="main">
        {stats && (
          <div className="stats">
            <StatCard title="Open Tickets" value={stats.open} color="#3b82f6" />
            <StatCard title="Closed Tickets" value={stats.closed} color="#16a34a" />
            <StatCard title="Capacity Used" value={stats.capacity} color="#f59e0b" />
            <StatCard title="All Tickets" value={stats.all} color="#8b5cf6" />
          </div>
        )}

        <div className="content">
          <TicketList onSelect={setSelectedTicket} />
        </div>

        {/* Ticket popup */}
        {selectedTicket && (
          <TicketDetails
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            onStatusChange={() => {
              setSelectedTicket(null);
              fetchStats();
            }}
          />
        )}
      </div>
    </div>
  );
}
