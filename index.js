const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
