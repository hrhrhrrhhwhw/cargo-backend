import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  console.log("FORM DATA:", req.body);
  res.status(200).json({ success: true });
});

export default app;
