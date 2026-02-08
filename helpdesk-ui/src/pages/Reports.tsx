import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../components/Navbar";

export default function Reports() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reports`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p style={{ padding: 40 }}>Loading...</p>;

  const chartData = [
    { name: "Open", value: data.open },
    { name: "Closed", value: data.closed },
  ];

  return (
    <div className="dashboard">
      <div className="main" style={{ padding: "80px 36px 36px 36px" }}>
        {/* TOP NAVBAR */}
        <Navbar />

        {/* ================== STATS SECTION ================== */}
        <div className="stats" style={{ marginTop: 20, gap: 20 }}>
          <div
            className="card"
            style={{ background: "#2563eb", color: "#fff", flex: 1 }}
          >
            <h4>Total Tickets</h4>
            <p style={{ marginBottom: 10 ,  color: "#050000"}}>Total number of tickets in the system.</p>
            <h3 style={{ marginTop: 8 }}>{data.total}</h3>
          </div>
          <div
            className="card"
            style={{ background: "#22c55e", color: "#fff", flex: 1 }}
          >
            <h4>Open Tickets</h4>
            <p style={{ marginBottom: 10 ,  color: "#050000"}}>Tickets that are currently open and pending action.</p>
            <h3 style={{ marginTop: 8 }}>{data.open}</h3>
          </div>
          <div
            className="card"
            style={{ background: "#ef4444", color: "#fff", flex: 1 }}
          >
            <h4>Closed Tickets</h4>
            <p style={{ marginBottom: 10 ,  color: "#050000"}}>Tickets that have been resolved or closed.</p>
            <h3 style={{ marginTop: 8 }}>{data.closed}</h3>
          </div>
        </div>

        {/* ================== CHARTS SECTION ================== */}
        <div
          className="content"
          style={{
            marginTop: 40,
            gap: 24,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <div
            className="card"
            style={{
              flex: "1 1 400px",
              height: 380,
              minWidth: 300,
              padding: 20,
            }}
          >
            <h4>Status Distribution</h4>
            <p style={{ marginBottom: 10 ,  color: "#050000"}} >Visual representation of open vs closed tickets.</p>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            className="card"
            style={{
              flex: "1 1 400px",
              height: 380,
              minWidth: 300,
              padding: 20,
            }}
          >
            <h4>Tickets Count</h4>
            <p style={{ marginBottom: 10 ,  color: "#050000"}}>Bar chart showing the number of open and closed tickets.</p>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
