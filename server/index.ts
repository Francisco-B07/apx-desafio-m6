import * as express from "express";
const app = express();
const port = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

app.use(express.static("dist"));

app.get("/hola", (req, res) => {
  res.json({
    message: "Hola soy el servidor",
  });
});
app.get("/env", (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
  });
});

app.use(express.static("../dist"));
app.get("/env", (req, res) => {
  res.json({
    env: process.env.NODE_ENV,
  });
});
app.listen(port, () => {
  console.log("app corriendo en el puerto " + port);
});
