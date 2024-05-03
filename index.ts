import express from "express";
import routes from "./routes/index";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
