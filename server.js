// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/color", (req, res) => {
  const { id, color } = req.body || {};
  // Log exactly what arrived
  console.log(`[COLOR] Button ${id} -> ${color}`);
  // You could forward to hardware here, write to a DB, etc.
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
