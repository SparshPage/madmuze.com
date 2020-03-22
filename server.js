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

app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/products", require("./routes/api/products"));

var port = process.env.port || 1000;
app.listen(port, () => {
  console.log("Server running on port" + port);
});
