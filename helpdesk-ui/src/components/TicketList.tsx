import { useEffect, useState } from "react";

type Props = {
  onSelect: (ticket: any) => void;
};

export default function TicketList({ onSelect }: Props) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 2;

  const fetchTickets = () => {
    fetch("http://localhost:5000/tickets")
      .then((res) => res.json())
      .then(setTickets);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const addTicket = () => {
    if (!title || !description) return;

    fetch("http://localhost:5000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    }).then(() => {
      setTitle("");
      setDescription("");
      fetchTickets();
    });
  };

  const deleteTicket = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    fetch(`http://localhost:5000/tickets/${id}`, {
      method: "DELETE",
    }).then(fetchTickets);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchSearch = t.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTickets.length / ticketsPerPage)
  );

  const start = (currentPage - 1) * ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    start,
    start + ticketsPerPage
  );

  return (
    <div className="ticket-list">
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

      <button onClick={addTicket}>Add Ticket</button>

      <h4>Search & Filter</h4>

      <input
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
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

      <h4>Tickets</h4>

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
  );
}
