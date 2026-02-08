import { supabase } from "../supabase";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: "Open" | "Closed";
};

type Props = {
  ticket: Ticket | null;
  onStatusChange?: () => void;
  onClose?: () => void;
};

export default function TicketDetails({ ticket, onStatusChange, onClose }: Props) {
  if (!ticket) return null;

  const toggleStatus = async () => {
    const newStatus: Ticket["status"] = ticket.status === "Open" ? "Closed" : "Open";

    const { error } = await supabase
      .from("tickets")
      .update({ status: newStatus })
      .eq("id", ticket.id);

    if (error) console.error("Error updating ticket status:", error.message);

    onStatusChange?.();
    onClose?.();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          padding: 32,
          borderRadius: 18,
          background: "#111",
          color: "#fff",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 28,
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Ticket Header */}
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 6 }}>{ticket.title}</h2>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              background: ticket.status === "Open" ? "#00ff66" : "#444",
              color: ticket.status === "Open" ? "#000" : "#fff",
            }}
          >
            {ticket.status}
          </span>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ opacity: 0.7, marginBottom: 6 }}>Description</h4>
          <p style={{ lineHeight: 1.6 }}>{ticket.description}</p>
        </div>

        {/* Toggle Status Button */}
        <button
          onClick={toggleStatus}
          style={{
            padding: "10px 20px",
            borderRadius: 12,
            border: "none",
            background: ticket.status === "Open" ? "#00ff66" : "#f59e0b",
            color: "#000",
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.1s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {ticket.status === "Open" ? "Mark as Closed" : "Reopen Ticket"}
        </button>
      </div>
    </div>
  );
}
