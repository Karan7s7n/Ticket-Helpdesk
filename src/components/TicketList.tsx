import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: "Open" | "Closed";
  created_at: string;
};

type Props = {
  onSelect: (ticket: Ticket) => void;
};

export default function TicketList({ onSelect }: Props) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Open" | "Closed">("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  // Fetch all tickets from Supabase
  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching tickets:", error.message);

    setTickets(data as Ticket[] || []);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Add a new ticket
  const addTicket = async () => {
    if (!title.trim() || !description.trim()) return;

    const { error } = await supabase.from("tickets").insert([
      { title: title.trim(), description: description.trim(), status: "Open" },
    ]);

    if (error) {
      console.error("Error adding ticket:", error.message);
      return;
    }

    setTitle("");
    setDescription("");
    fetchTickets();
  };

  // Delete a ticket
  const deleteTicket = async (id: number) => {
    if (!window.confirm("Delete this ticket?")) return;

    const { error } = await supabase.from("tickets").delete().eq("id", id);

    if (error) console.error("Error deleting ticket:", error.message);

    fetchTickets();
  };

  // Filtered & paginated tickets
  const filteredTickets = tickets.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / ticketsPerPage));
  const start = (currentPage - 1) * ticketsPerPage;
  const currentTickets = filteredTickets.slice(start, start + ticketsPerPage);

  return (
    <div className="ticket-list" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Add Ticket Section */}
      <div className="ticket-section">
        <h4>Add New Ticket</h4>
        <input
          placeholder="Ticket title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTicket} className="add-btn">
          + Add Ticket
        </button>
      </div>

      {/* Search & Filter Section */}
      <div className="ticket-section">
        <h4>Search & Filter</h4>
        <input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as "All" | "Open" | "Closed");
            setCurrentPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Tickets List */}
      <div className="ticket-section">
        <h4>Tickets</h4>

        {currentTickets.length === 0 && (
          <p style={{ color: "#64748b", textAlign: "center" }}>
            No tickets found.
          </p>
        )}

        {currentTickets.map((t) => (
          <div
            key={t.id}
            className={`ticket ${activeId === t.id ? "active-ticket" : ""}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderRadius: 12,
              background: activeId === t.id ? "#ecf0f5" : "#e4dfdf",
              cursor: "pointer",
              alignItems: "center",
              transition: "background 0.2s ease",
              marginBottom: 8,
            }}
          >
            <div
              className="ticket-main"
              onClick={() => {
                setActiveId(t.id);
                onSelect(t);
              }}
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <span className="ticket-title">{t.title}</span>
              <span
                className={`status ${t.status.toLowerCase()}`}
                style={{
                  padding: "2px 10px",
                  borderRadius: 16,
                  fontSize: 12,
                  fontWeight: 600,
                  background: t.status === "Open" ? "#00ff66" : "#444",
                  color: t.status === "Open" ? "#000" : "#fff",
                }}
              >
                {t.status}
              </span>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteTicket(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ef4444",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Pagination */}
        <div
          className="pagination"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
