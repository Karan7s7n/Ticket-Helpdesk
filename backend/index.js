const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

let tickets = [
  {
    id: 1,
    title: "Login issue",
    status: "Open",
    description: "User unable to login",
  },
  {
    id: 2,
    title: "Payment failed",
    status: "Closed",
    description: "Payment gateway timeout",
  },
   {
    id: 3,
    title: "Payment failed",
    status: "Closed",
    description: "Payment gateway timeout",
  },
   {
    id: 4,
    title: "Payment failed",
    status: "Closed",
    description: "Payment gateway timeout",
  },
   {
    id: 5,
    title: "Payment failed",
    status: "Closed",
    description: "Payment gateway timeout",
  },
];

let profile = {
  name: "Karan Singh Negi",
  email: "a@example.com",
  role: "Frontend Developer Intern",
  company: "me.core",
  avatar: "",
};

/* -------- Tickets -------- */
app.get("/tickets", (req, res) => res.json(tickets));

app.post("/tickets", (req, res) => {
  const { title, description } = req.body;
  tickets.push({
    id: Date.now(),
    title,
    description,
    status: "Open",
  });
  res.json({ success: true });
});

app.put("/tickets/:id/status", (req, res) => {
  const ticket = tickets.find(t => t.id == req.params.id);
  if (!ticket) return res.status(404).send("Not found");
  ticket.status = req.body.status;
  res.json(ticket);
});

/* -------- Reports -------- */
app.get("/reports", (req, res) => {
  const open = tickets.filter(t => t.status === "Open").length;
  const closed = tickets.filter(t => t.status === "Closed").length;
  res.json({ total: tickets.length, open, closed });
});

/* -------- Profile -------- */
app.get("/profile", (req, res) => res.json(profile));

app.put("/profile", (req, res) => {
  profile = { ...profile, ...req.body };
  res.json(profile);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});

