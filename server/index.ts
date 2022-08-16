import * as express from "express";
const app = express();
const port = process.env.PORT || 3000;

import * as path from "path";
const ruta = path.resolve(__dirname, "../dist/index.html");

console.log(process.env.NODE_ENV);

app.get("/hola", (req, res) => {
  console.log(ruta);
  res.json({
    message: ruta,
  });
});
app.get("/env", (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
  });
});

app.get("/env", (req, res) => {
  console.log(ruta);
  res.json({
    env: process.env.NODE_ENV,
  });
});

app.use(express.static("dist"));
app.get("*", (req, res) => {
  // MODIFICAR RUTA PARA TOMAR EL DIST FUERA DE LA CARPETA SERVER
  res.sendFile(ruta);
});

app.listen(port, () => {
  console.log("app corriendo en el puerto " + port);
});
