import { supabase } from "../supabase";

type Ticket = {
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

export default function TicketDetails({
  ticket,
  onStatusChange,
  onClose,
}: Props) {
  if (!ticket) return null;

  const toggleStatus = async () => {
    const newStatus = ticket.status === "Open" ? "Closed" : "Open";

    await supabase
      .from("tickets")
      .update({ status: newStatus })
      .eq("id", ticket.id);

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
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "95%",
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
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 26,
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <div style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 6 }}>{ticket.title}</h2>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 12,
              background:
                ticket.status === "Open" ? "#00ff66" : "#444",
              color: "#000",
              fontWeight: 600,
            }}
          >
            {ticket.status}
          </span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h4 style={{ opacity: 0.7 }}>Description</h4>
          <p style={{ lineHeight: 1.6 }}>{ticket.description}</p>
        </div>

        <button
          onClick={toggleStatus}
          style={{
            padding: "10px 18px",
            borderRadius: 10,
            border: "none",
            background: "#00ff66",
            color: "#000",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {ticket.status === "Open" ? "Mark as Closed" : "Reopen Ticket"}
        </button>
      </div>
    </div>
  );
}
