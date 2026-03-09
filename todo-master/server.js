const express = require('express');
const dotenv=require('dotenv');
const Dbconnection =require('./connectiondb');
const taskRoutes = require("./routes/taskRoutes")
const cors =require('cors');
const app = express();
dotenv.config();
Dbconnection();
app.use(cors({
  origin: "*",  
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use("/api/tasks", taskRoutes);
const PORT = process.env.PORT || 3000;
app.get("/test", (req, res) => {
  res.send("Server is updated");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});
