const express = require("express");
const app = express();

const PORT = 5000;

// Basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
