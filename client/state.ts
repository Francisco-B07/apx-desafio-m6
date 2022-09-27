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
    nombre: "",
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
    const roomsRef = rtdb.ref("/rooms/general");
    const cs = this.getState();
    roomsRef.on("value", (snap) => {
      const messagesFromServer = snap.val();
      const messagesList = map(messagesFromServer.messages);
      cs.messages = messagesList;
      this.setState(cs);
    });
    const localData = localStorage.getItem("saved-state");
    if (localData) {
      this.setState(JSON.parse(localData));
    }
  },

  getState() {
    return this.data;
  },

  setNombre(nombre: string) {
    const cs = this.getState();

    cs.nombre = nombre;
    this.setState(cs);
  },

  pushMessage(message: string) {
    const cs = this.getState();
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      body: JSON.stringify({
        nombre: cs.nombre,
        headers: {
          "content-type": "application/json",
        },
        message: message,
      }),
    });
  },

  // whoWins(myPlay: Jugada, computerPlay: Jugada) {
  //   const currentState = this.getState();

  //   const ganeConTijera: boolean =
  //     myPlay == "tijera" && computerPlay == "papel";
  //   const ganeConPiedra: boolean =
  //     myPlay == "piedra" && computerPlay == "tijera";
  //   const ganeConPapel: boolean = myPlay == "papel" && computerPlay == "piedra";
  //   const perdiConTijera: boolean =
  //     myPlay == "tijera" && computerPlay == "piedra";
  //   const perdiConPiedra: boolean =
  //     myPlay == "piedra" && computerPlay == "papel";
  //   const perdiConPapel: boolean =
  //     myPlay == "papel" && computerPlay == "tijera";

  //   const gane = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(true);
  //   const perdi = [perdiConPapel, perdiConPiedra, perdiConTijera].includes(
  //     true
  //   );

  //   if (gane) {
  //     currentState.currentGame.resultado = "Ganaste";
  //     currentState.currentGame.vos++;
  //   } else if (perdi) {
  //     currentState.currentGame.resultado = "Perdiste";
  //     currentState.currentGame.computer++;
  //   } else {
  //     currentState.currentGame.resultado = "Empate";
  //   }

  //   const newState = {
  //     ...this.getState().currentGame,
  //     myPlay: myPlay,
  //     computerPlay: computerPlay,
  //   };
  //   this.setState(newState);
  // },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("soy el state, he cambiado", this.getState());
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
