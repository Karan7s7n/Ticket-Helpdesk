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
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase";

/* ===== COLOR SYSTEM ===== */
const COLORS = {
  primary: "#2563EB",
  success: "#22C55E",
  danger: "#EF4444",
  accent: "#8B5CF6",
  grid: "#E5E7EB",

  statBg: {
    blue: "#5b8df8",
    green: "#59ec8a",
    red: "#f14a4a",
    purple: "#977dd3",
  },
};

/* ===== TYPES ===== */
type Ticket = {
  id: number;
  title: string;
  status: "Open" | "Closed" | string;
  agent?: string;
  created_at: string;
  closed_at?: string;
  [key: string]: any;
};

type Stats = {
  total: number;
  open: number;
  closed: number;
  avgResolution: string;
};

type Trend = { label: string; count: number };
type AgentStat = { agent: string; closed: number };

type KPIProps = { title: string; value: string | number; bg: string };
type SectionProps = { title: string; children: React.ReactNode };
type LineBlockProps = { data: Trend[] };

export default function Reports() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [daily, setDaily] = useState<Trend[]>([]);
  const [weekly, setWeekly] = useState<Trend[]>([]);
  const [monthly, setMonthly] = useState<Trend[]>([]);
  const [agents, setAgents] = useState<AgentStat[]>([]);

  useEffect(() => {
    loadAnalytics();
    subscribeRealtime();
  }, []);

  /* ===== REALTIME SUBSCRIBE ===== */
  const subscribeRealtime = () => {
    supabase
      .channel("tickets-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tickets" },
        () => loadAnalytics()
      )
      .subscribe();
  };

  /* ===== LOAD ANALYTICS ===== */
  const loadAnalytics = async () => {
    const { data } = await supabase.from("tickets").select("*") as any;
    if (!data) return;

    const total = data.length;
    const open = data.filter((t: { status: string; }) => t.status === "Open").length;
    const closed = data.filter((t: { status: string; }) => t.status === "Closed").length;

    const resolved = data.filter((t: { closed_at: any; }) => t.closed_at);
    const avgMs =
      resolved.reduce(
        (sum: number, t: { closed_at: string | number | Date; created_at: string | number | Date; }) =>
          sum + (new Date(t.closed_at!).getTime() - new Date(t.created_at).getTime()),
        0
      ) / (resolved.length || 1);

    const avgHours = Math.round(avgMs / 1000 / 60 / 60);

    setStats({
      total,
      open,
      closed,
      avgResolution: avgHours + " hrs",
    });

    setDaily(groupBy(data, "day"));
    setWeekly(groupBy(data, "week"));
    setMonthly(groupBy(data, "month"));

    const agentMap: Record<string, number> = {};
    data
      .filter((t: { status: string; }) => t.status === "Closed")
      .forEach((t: { agent: string; }) => {
        const name = t.agent || "Unassigned";
        agentMap[name] = (agentMap[name] || 0) + 1;
      });

    setAgents(
      Object.entries(agentMap).map(([agent, closed]) => ({ agent, closed }))
    );
  };

  /* ===== GROUP BY HELPER ===== */
  const groupBy = (tickets: Ticket[], type: "day" | "week" | "month"): Trend[] => {
    const map: Record<string, number> = {};

    tickets.forEach((t) => {
      const d = new Date(t.created_at);
      let key = "";

      if (type === "day") key = d.toLocaleDateString();
      else if (type === "week") {
        const weekNum = Math.ceil(d.getDate() / 7);
        key = `${d.getFullYear()}-W${weekNum}`;
      } else if (type === "month") {
        key = d.toLocaleString("default", { month: "short", year: "numeric" });
      }

      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => new Date(a.label).getTime() - new Date(b.label).getTime());
  };

  if (!stats) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="dashboard">
      <Navbar />

      <div className="main" style={{ padding: "100px 36px" }}>
        {/* ===== HEADER ===== */}
        <div style={{ marginBottom: 30 }}>
          <h1 style={{ color: "#000" }}>Analytics Dashboard</h1>
          <p style={{ color: "#000" }}>
            Real-time insights into ticket volume, performance, and resolution trends.
          </p>
        </div>

        {/* ===== STATS ===== */}
        <div className="stats" style={{ gap: 20, display: "flex", flexWrap: "wrap" }}>
          <KPI title="Total Tickets" value={stats.total} bg={COLORS.statBg.blue} />
          <KPI title="Open Tickets" value={stats.open} bg={COLORS.statBg.purple} />
          <KPI title="Closed Tickets" value={stats.closed} bg={COLORS.statBg.green} />
          <KPI title="Avg Resolution Time" value={stats.avgResolution} bg={COLORS.statBg.red} />
        </div>

        {/* ===== TREND CHARTS ===== */}
        <Section title="Tickets Trend (Daily)">
          <LineBlock data={daily} />
        </Section>

        <Section title="Tickets Trend (Weekly)">
          <LineBlock data={weekly} />
        </Section>

        <Section title="Tickets Trend (Monthly)">
          <LineBlock data={monthly} />
        </Section>

        {/* ===== AGENT PERFORMANCE ===== */}
        <Section title="Agent Performance">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={agents}>
              <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
              <XAxis dataKey="agent" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip />
              <Bar dataKey="closed" fill={COLORS.success} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */
function KPI({ title, value, bg }: KPIProps) {
  return (
    <div
      className="card"
      style={{
        flex: 1,
        minWidth: 160,
        background: bg,
        borderRadius: 12,
        padding: 16,
        color: "#000",
      }}
    >
      <p style={{ fontSize: 14, opacity: 0.8 }}>{title}</p>
      <h2 style={{ fontSize: 28, marginTop: 4 }}>{value}</h2>
    </div>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="card" style={{ marginTop: 30, padding: 22, borderRadius: 12 }}>
      <h3 style={{ marginBottom: 14 }}>{title}</h3>
      {children}
    </div>
  );
}

function LineBlock({ data }: LineBlockProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#000" />
        <YAxis stroke="#000" />
        <Tooltip />
        <Line dataKey="count" stroke={COLORS.primary} strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
