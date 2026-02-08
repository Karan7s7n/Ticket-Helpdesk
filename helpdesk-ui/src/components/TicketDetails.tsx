type Props = {
  ticket: any;
  onStatusChange?: () => void;
  onClose?: () => void; // new prop to close the modal
};

export default function TicketDetails({ ticket, onStatusChange, onClose }: Props) {
  if (!ticket) return null; // modal won't show if no ticket

  const toggleStatus = () => {
    const newStatus = ticket.status === "Open" ? "Closed" : "Open";

    fetch(`http://localhost:5000/tickets/${ticket.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => {
      onStatusChange?.();
      onClose?.(); // close modal after status change
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
      onClick={onClose} // click outside closes modal
    >
      <div
        className="details"
        style={{
          width: "95%",
          maxWidth: 1000,
          padding: 32,
          borderRadius: 16,
          background: "#fff",
          boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            border: "none",
            background: "transparent",
            fontSize: 30,
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <div className="details-header" style={{ marginBottom: 16 }}>
          <h3>{ticket.title}</h3>
          <span className={`status ${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
        </div>

        <div className="details-section" style={{ marginBottom: 16 }}>
          <h4>Description</h4>
          <p>{ticket.description}</p>
        </div>

        <button className="status-toggle" onClick={toggleStatus}>
          {ticket.status === "Open" ? "Mark as Closed" : "Reopen Ticket"}
        </button>
      </div>
    </div>
  );
}
