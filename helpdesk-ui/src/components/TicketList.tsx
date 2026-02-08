import { useEffect, useState } from "react";
import { supabase } from "../supabase";

type Ticket = {
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
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const fetchTickets = async () => {
    const { data } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    setTickets(data || []);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const addTicket = async () => {
    if (!title || !description) return;

    await supabase.from("tickets").insert([
      { title, description, status: "Open" },
    ]);

    setTitle("");
    setDescription("");
    fetchTickets();
  };

  const deleteTicket = async (id: number) => {
    if (!window.confirm("Delete this ticket?")) return;

    await supabase.from("tickets").delete().eq("id", id);

    fetchTickets();
  };

  const filteredTickets = tickets.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / ticketsPerPage));
  const start = (currentPage - 1) * ticketsPerPage;
  const currentTickets = filteredTickets.slice(start, start + ticketsPerPage);

  return (
    <div className="ticket-list">
      {/* Add Ticket */}
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

      {/* Search & Filter */}
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
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Tickets */}
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
          >
            <div
              className="ticket-main"
              onClick={() => {
                setActiveId(t.id);
                onSelect(t);
              }}
            >
              <span className="ticket-title">{t.title}</span>
              <span className={`status ${t.status.toLowerCase()}`}>
                {t.status}
              </span>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteTicket(t.id)}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <div className="page-info">
            Page {currentPage} of {totalPages}
          </div>

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
