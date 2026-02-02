import { useEffect, useState } from "react";
import TicketList from "../components/TicketList";
import TicketDetails from "../components/TicketDetails";
import StatCard from "../components/StatCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const fetchStats = () => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          open: data.open,
          closed: data.closed,
          capacity:
            data.total > 0
              ? Math.round((data.open / data.total) * 100) + "%"
              : "0%",
        });
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        {stats && (
          <div className="stats">
            <StatCard title="Open Tickets" value={stats.open} />
            <StatCard title="Closed Tickets" value={stats.closed} />
            <StatCard title="Capacity Used" value={stats.capacity} />
          </div>
        )}

        <div className="content">
          <TicketList
            onSelect={(ticket) => {
              setSelectedTicket(ticket);
              fetchStats();
            }}
          />

          <TicketDetails
            ticket={selectedTicket}
            onStatusChange={() => {
              setSelectedTicket(null);
              fetchStats();
            }}
          />
        </div>
      </div>
    </div>
  );
}
