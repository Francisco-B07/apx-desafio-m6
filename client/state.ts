const API_BASE_URL = "http://localhost:3000";

import { rtdb } from "./rtdb";

// Esta función de Lodash, cuando le pasas un objeto de objetos lo trata como si fuese un array
import map from "lodash/map";

type Jugada = "piedra" | "papel" | "tijera";
type Game = {
  computerPlay: Jugada;
  myPlay: Jugada;
};

// type Message = {
//   from: string;
//   message: string;
// };

const state = {
  data: {
    roomNuevo: false,
    nombre: "",
    playerId: "",
    roomId: "",
    rtdbRoomId: "",
    currentGame: {
      computerPlay: "",
      myPlay: "",
      resultado: "",
      vos: 0,
      computer: 0,
    },
  },
  listeners: [],

  init() {
    const localData = localStorage.getItem("state");
    if (localData) {
      this.setState(JSON.parse(localData));
    }
  },

  listenRoom() {
    const cs = this.getState();
    const roomsRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);

    roomsRef.on("value", (snap) => {
      const cs = this.getState();
      const messagesFromServer = snap.val();
      const messagesList = map(messagesFromServer.messages);
      cs.messages = messagesList;
      this.setState(cs);
    });
  },

  getState() {
    return this.data;
  },

  setNombre(nombre: string) {
    console.log("entreeeee");

    const cs = this.getState();

    cs.nombre = nombre;
    this.setState(cs);
  },
  setRoomId(roomId: string) {
    const cs = this.getState();

    cs.roomId = roomId;
    this.setState(cs);
  },
  setNuevoRoom(roomNuevo: boolean) {
    const cs = this.getState();

    cs.roomNuevo = roomNuevo;
    this.setState(cs);
  },

  // pushMessage(message: string) {
  //   const cs = this.getState();
  //   fetch(API_BASE_URL + "/messages", {
  //     method: "post",
  //     body: JSON.stringify({
  //       nombre: cs.nombre,
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       message: message,
  //     }),
  //   });
  // },

  whoWins(myPlay: Jugada, computerPlay: Jugada) {
    const currentState = this.getState();

    const ganeConTijera: boolean =
      myPlay == "tijera" && computerPlay == "papel";
    const ganeConPiedra: boolean =
      myPlay == "piedra" && computerPlay == "tijera";
    const ganeConPapel: boolean = myPlay == "papel" && computerPlay == "piedra";
    const perdiConTijera: boolean =
      myPlay == "tijera" && computerPlay == "piedra";
    const perdiConPiedra: boolean =
      myPlay == "piedra" && computerPlay == "papel";
    const perdiConPapel: boolean =
      myPlay == "papel" && computerPlay == "tijera";

    const gane = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(true);
    const perdi = [perdiConPapel, perdiConPiedra, perdiConTijera].includes(
      true
    );

    if (gane) {
      currentState.currentGame.resultado = "Ganaste";
      currentState.currentGame.vos++;
    } else if (perdi) {
      currentState.currentGame.resultado = "Perdiste";
      currentState.currentGame.computer++;
    } else {
      currentState.currentGame.resultado = "Empate";
    }

    const newState = {
      ...this.getState().currentGame,
      myPlay: myPlay,
      computerPlay: computerPlay,
    };
    this.setState(newState);
  },

  signIn(callback) {
    console.log("entreeee");

    const cs = this.getState();
    if (cs.nombre) {
      fetch(API_BASE_URL + "/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre: cs.nombre }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.playerId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("No hay un nombre en el state");
      callback(true);
    }
  },

  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.playerId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ playerId: cs.playerId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("No hay player id");
    }
  },

  accessToRoom(callback?) {
    const cs = this.getState();
    const roomId = cs.roomId;
    fetch(API_BASE_URL + "/rooms/" + roomId + "?playerId=" + cs.playerId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        this.listenRoom();
        if (callback) {
          callback();
        }
      });
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("soy el state, he cambiado", this.getState());
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
