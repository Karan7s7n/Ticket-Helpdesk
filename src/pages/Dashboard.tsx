import { useEffect, useState } from "react";
import TicketList, { Ticket } from "../components/TicketList";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import TicketDetails from "../components/TicketDetails";
import { supabase } from "../supabase";

type Stats = {
  open: number;
  closed: number;
  all: number;
  capacity: string;
};

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  // Fetch ticket stats
  const fetchStats = async () => {
    const { data, error } = await supabase.from("tickets").select("status");

    if (error) {
      console.error("Error fetching stats:", error.message);
      return;
    }
    if (!data) return;

    const total = data.length;
    const open = data.filter((t) => t.status === "Open").length;
    const closed = data.filter((t) => t.status === "Closed").length;

    setStats({
      open,
      closed,
      all: total,
      capacity: total ? Math.round((open / total) * 100) + "%" : "0%",
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard" style={{ color: "#000" }}>
      <Navbar />

      {/* Top padding to clear fixed navbar */}
      <div
        className="main"
        style={{
          paddingTop: 90, // 60px navbar + spacing
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Page heading */}
        <h1 style={{ marginBottom: 24 }}>Dashboard</h1>

        {/* Stats Cards */}
        {stats && (
          <div
            className="stats"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <StatCard title="Open Tickets" value={stats.open} color="#3b82f6" />
            <StatCard title="Closed Tickets" value={stats.closed} color="#16a34a" />
            <StatCard title="Capacity Used" value={stats.capacity} color="#f59e0b" />
            <StatCard title="All Tickets" value={stats.all} color="#8b5cf6" />
          </div>
        )}

        {/* Ticket List */}
        <div className="content">
          <TicketList onSelect={setSelectedTicket} />
        </div>

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <TicketDetails
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            onStatusChange={fetchStats}
          />
        )}
      </div>
    </div>
  );
}
