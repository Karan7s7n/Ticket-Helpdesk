import { useEffect, useState } from "react";
import TicketList from "../components/TicketList";
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
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {
    const { data } = await supabase.from("tickets").select("status");

    if (!data) return;

    const total = data.length;
    const open = data.filter(t => t.status === "Open").length;
    const closed = data.filter(t => t.status === "Closed").length;

    setStats({
      open,
      closed,
      all: total,
      capacity: total
        ? Math.round((open / total) * 100) + "%"
        : "0%",
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard" style={{ color: "#000" }}>
      <Navbar />

      {/* Added top padding to clear fixed navbar */}
      <div
        className="main"
        style={{
          color: "#000",
          paddingTop: 90, // 60px navbar + spacing
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Added page heading */}
        <h1 style={{ marginBottom: 24 }}>Dashboard</h1>

        {stats && (
          <div className="stats" style={{ color: "#000" }}>
            <StatCard title="Open Tickets" value={stats.open} color="#3b82f6" />
            <StatCard title="Closed Tickets" value={stats.closed} color="#16a34a" />
            <StatCard title="Capacity Used" value={stats.capacity} color="#f59e0b" />
            <StatCard title="All Tickets" value={stats.all} color="#8b5cf6" />
          </div>
        )}

        <div className="content" style={{ color: "#000" }}>
          <TicketList onSelect={setSelectedTicket} />
        </div>

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
