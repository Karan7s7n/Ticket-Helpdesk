interface StatCardProps {
  title: string;
  value: string | number;
  color?: string; // optional background color
}

export default function StatCard({ title, value, color }: StatCardProps) {
  const isLight = Boolean(color); // if color is provided, text will be dark

  return (
    <div
      className="card"
      style={{
        background: color || "#121212",
        color: isLight ? "#000" : "#fff",
        padding: "20px",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      // Add hover effect
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = "translateY(-4px)";
        target.style.boxShadow = "0 12px 28px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = "translateY(0)";
        target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
      }}
    >
      <p
        style={{
          fontSize: 14,
          opacity: 0.8,
          marginBottom: 6,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>

      <h3
        style={{
          fontSize: 32,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </h3>
    </div>
  );
}
