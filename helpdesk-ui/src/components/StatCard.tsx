interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
  const isLight = Boolean(color);

  return (
    <div
      className="card"
      style={{
        background: color || "#121212",
        color: isLight ? "#000" : "#fff",
        padding: "20px",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        transition: "transform 0.2s ease",
      }}
    >
      <p
        style={{
          fontSize: 14,
          opacity: 0.8,
          marginBottom: 6,
          letterSpacing: 0.5,
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
