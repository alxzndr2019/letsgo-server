import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

//For env File
dotenv.config();
connectDB();
const app: Application = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // Fix: Provide a number value for maxAge
  res.status(200).json({ message: "Logged out successfully" });
});
app.listen(port, () => {
  console.log(`Lets go Server is up at http://localhost:${port}`);
});

app.use("/auth", require("./routes/UserRouter"));

module.exports = app;
