import express from "express";
import routes from "./routes/index";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
