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
    score: 0,
    nombreRival: "",
    scoreRival: 0,
    playerId: "",
    roomId: "",
    rtdbRoomId: "",
    ocupada: false,
    players: 0,
    iniciar: false,
    currentGame: {
      rtdbRoomId: "",
      nombre: "",
      playerId: "",
      choice: "",
      online: false,
      start: false,
      score: 0,
    },
  },
  listeners: [],

  init() {
    const localData = localStorage.getItem("state");
    if (localData) {
      this.setState(JSON.parse(localData));
    }
  },

  getState() {
    return this.data;
  },

  setNombre(nombre: string) {
    const cs = this.getState();
    cs.currentGame.nombre = nombre;
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
  setCantPlayers(players: number) {
    const cs = this.getState();

    cs.players = players;
    this.setState(cs);
  },
  setSalaOcupada(ocupada: boolean) {
    const cs = this.getState();

    cs.ocupada = ocupada;
    this.setState(cs);
  },
  setNombreRival(nombreRival: number) {
    const cs = this.getState();

    cs.nombreRival = nombreRival;

    this.setState(cs);
  },

  setScore(score: number) {
    const cs = this.getState();

    cs.currentGame.score = score;

    this.setState(cs);
  },
  setScoreRival(scoreRival: number) {
    const cs = this.getState();

    cs.scoreRival = scoreRival;

    this.setState(cs);
  },
  setIniciar(iniciar: boolean) {
    const cs = this.getState();

    cs.iniciar = iniciar;

    this.setState(cs);
  },
  inicializarStateNewRoom() {
    this.setNombreRival("-");
    this.setSalaOcupada(false);
    this.setCantPlayers(0);
    this.setScore(0);
    this.setScoreRival(0);
  },
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
          cs.currentGame.playerId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("No hay un nombre en el state");
      callback(true);
    }
  },

  askNewRoom(callback?) {
    this.inicializarStateNewRoom();
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
        cs.currentGame.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        if (callback) {
          callback();
        }
      });
  },
  pushJugada() {
    console.log("inicia push");

    const cs = this.getState();

    if (cs.players < 2) {
      fetch(API_BASE_URL + "/jugada", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          currentGame: cs.currentGame,
        }),
      });
    }
    console.log("termina push");
  },
  listenRoom(callback?) {
    const cs = this.getState();
    const roomsRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);

    roomsRef.on("value", (snap) => {
      console.log("empiezo a escuchar");
      const cs = this.getState();

      const rtdbRoom = snap.val();
      const currentGame = map(rtdbRoom.currentGame);
      const score = map(rtdbRoom.score);
      console.log("list", currentGame);

      const players = currentGame.length;
      this.setCantPlayers(players);

      if (players < 2) {
        this.setSalaOcupada(false);
      } else {
        const jugadorUno = currentGame[0].nombre;
        const jugadorDos = currentGame[1].nombre;

        if (cs.nombre != jugadorUno && cs.nombre != jugadorDos) {
          this.setSalaOcupada(true);
        } else {
          this.setSalaOcupada(false);
        }
        if (cs.nombre == jugadorUno) {
          this.setNombreRival(jugadorDos);
        } else {
          this.setNombreRival(jugadorUno);
        }
        if (cs.nombre == score[0].nombre) {
          this.setScoreRival(score[1].score);
        } else {
          this.setScoreRival(score[0].score);
        }
      }
      if (callback) callback();
    });
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("state", JSON.stringify(newState));
    // console.log("soy el state, he cambiado", this.getState());
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
