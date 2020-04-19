var express = require("express");
var app = express();
var cors = require("cors");
var connectDB = require("./config/db");

connectDB();

app.get("/", (req, res) => {
  console.log("API running");
});

app.use(express.json({ extended: false }));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/Admin", require("./routes/api/AdminRoutes/admin"));
app.use("/api/adminAuth", require("./routes/api/AdminRoutes/adminAuth"));
app.use(
  "/api/AdminRegister",
  require("./routes/api/AdminRoutes/adminRegister")
);
var port = process.env.port || 1000;
app.listen(port, () => {
  console.log("Server running on port" + port);
});
