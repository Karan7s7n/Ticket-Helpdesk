type Props = {
  title: string;
  value: string;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div className="card">
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}
