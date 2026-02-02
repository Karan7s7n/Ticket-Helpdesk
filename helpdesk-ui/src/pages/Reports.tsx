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
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Reports() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const chartData = [
    { name: "Open", value: data.open },
    { name: "Closed", value: data.closed },
  ];

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        {/* TOP NAVBAR (PROFILE + LOGOUT) */}
        <Navbar />

        {/* SUMMARY CARDS */}
        <div className="stats">
          <div className="card">
            <p>Total Tickets</p>
            <h3>{data.total}</h3>
          </div>
          <div className="card">
            <p>Open Tickets</p>
            <h3>{data.open}</h3>
          </div>
          <div className="card">
            <p>Closed Tickets</p>
            <h3>{data.closed}</h3>
          </div>
        </div>

        {/* CHARTS */}
        <div className="content">
          <div className="card" style={{ flex: 1, height: 300 }}>
            <h4>Status Distribution</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ flex: 1, height: 300 }}>
            <h4>Tickets Count</h4>
            <ResponsiveContainer width="100%" height="100%">
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
