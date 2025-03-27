const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // CORS enable karna
app.use(express.json()); // JSON data handle karne ke liye

// Home route
app.get("/", (req, res) => {
    res.send("Server is running successfully! 🚀");
});

// ✅ API Route (Frontend ke fetch ke liye)
app.get("/api/data", (req, res) => {
    res.json({ message: "This is data from the backend!" });
});

// ✅ Server ko start karna
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
