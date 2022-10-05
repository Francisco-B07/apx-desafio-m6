import * as express from "express";
import { firestore, rtdb } from "./db";
import * as path from "path";
import * as cors from "cors";
import { v4 as uuidv4 } from "uuid";

const port = process.env.PORT || 3000;
const ruta = path.resolve(__dirname, "../dist/index.html");

const app = express();

app.use(express.json());
app.use(cors());

const playersCollection = firestore.collection("players");
const roomsCollection = firestore.collection("rooms");

// SIGNUP AND SIGNIN OR SIGNIN
app.post("/signin", function (req, res) {
  const nombre = req.body.nombre;
  playersCollection
    .where("nombre", "==", nombre)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        playersCollection
          .add({
            nombre,
          })
          .then((newPlayerRef) => {
            res.json({
              id: newPlayerRef.id,
              new: true,
            });
          });
      } else {
        playersCollection
          .where("nombre", "==", nombre)
          .get()
          .then((searchResponse) => {
            if (searchResponse.empty) {
              res.status(404).json({
                message: "not found",
              });
            } else {
              res.json({
                id: searchResponse.docs[0].id,
              });
            }
          });
      }
    });
});

// CREAR ROOM
app.post("/rooms", (req, res) => {
  const { playerId } = req.body;

  playersCollection
    .doc(playerId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + uuidv4());

        roomRef
          .set({
            owner: playerId,
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999) + "FB";
            roomsCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});

// CARGAR JUGADA EN RTDB
app.post("/jugada", (req, res) => {
  const rtdbRoomId = req.body.rtdbRoomId;
  const playerId = req.body.playerId;
  const roomRef = rtdb.ref("rooms/" + rtdbRoomId + "/currentGame/" + playerId);

  roomRef
    .set({
      choice: req.body.currentGame.choice,
      nombre: req.body.currentGame.nombre,
      start: req.body.currentGame.start,
      score: req.body.currentGame.score,
      online: req.body.currentGame.online,
      irAInstrucciones: req.body.currentGame.irAInstrucciones,
      irAResult: req.body.currentGame.irAResult,
    })
    .then((data) => {
      res.json({
        message: "ok",
      });
    });
});

// OBTENER ROOM EXISTENTE
app.get("/rooms/:roomId", (req, res) => {
  const { playerId } = req.query;
  const { roomId } = req.params;

  playersCollection
    .doc(playerId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
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
