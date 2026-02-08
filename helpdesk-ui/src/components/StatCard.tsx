interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
  return (
    <div
      className="card"
      style={{
        backgroundColor: color || "#fff",
        color: color ? "#000000" : "#ffffff",
      }}
    >
      <p style={{ fontSize: 30, color: color ? "#000000" : "#ffffff",}}>{title}</p>
      <h3 style={{ fontSize: 28,color: color ? "#000000" : "#ffffff", marginTop: 8 }}>{value}</h3>
    </div>
  );
}
