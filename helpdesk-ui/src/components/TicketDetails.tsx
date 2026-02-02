type Props = {
  ticket: any;
  onStatusChange?: () => void;
};

export default function TicketDetails({ ticket, onStatusChange }: Props) {
  if (!ticket) {
    return (
      <div className="details empty">
        <h4>Select a ticket</h4>
        <p>Choose a ticket to view details.</p>
      </div>
    );
  }

  const toggleStatus = () => {
    const newStatus = ticket.status === "Open" ? "Closed" : "Open";

    fetch(`http://localhost:5000/tickets/${ticket.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => {
      onStatusChange?.();
    });
  };

  return (
    <div className="details">
      <div className="details-header">
        <h3>{ticket.title}</h3>
        <span className={`status ${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      </div>

      <div className="details-section">
        <h4>Description</h4>
        <p>{ticket.description}</p>
      </div>

      <button className="status-toggle" onClick={toggleStatus}>
        {ticket.status === "Open" ? "Mark as Closed" : "Reopen Ticket"}
      </button>
    </div>
  );
}
