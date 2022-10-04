const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

import { rtdb } from "./rtdb";
import map from "lodash/map";

type Jugada = "piedra" | "papel" | "tijera" | "nada";
type Oponente = {
  nombre: string;
  choice: string;
  start: boolean;
  score: number;
  online: boolean;
  irAInstrucciones: boolean;
};

const state = {
  data: {
    playerId: "",
    roomId: "",
    rtdbRoomId: "",
    oponente: {
      nombre: "",
      online: false,
      start: false,
      choice: "",
      score: 0,
      irAInstrucciones: false,
    },
    currentGame: {
      nombre: "",
      online: false,
      start: false,
      choice: "nada",
      score: 0,
      irAInstrucciones: false,
    },
    ocupada: false,
    cantPlayers: 0,

    // iniciar: false,
    // roomNuevo: false,
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
    this.setState(cs);
  },
  setRoomId(roomId: string) {
    const cs = this.getState();
    cs.roomId = roomId;
    this.setState(cs);
  },
  setOnline(online: boolean) {
    const cs = this.getState();
    cs.currentGame.online = online;
    this.setState(cs);
  },
  setSalaOcupada(ocupada: boolean) {
    const cs = this.getState();
    cs.ocupada = ocupada;
    this.setState(cs);
  },
  setOponente(oponente: Oponente) {
    const cs = this.getState();
    cs.oponente = oponente;
    this.setState(cs);
    console.log(cs.oponente);
  },
  setScore(score: number) {
    const cs = this.getState();
    cs.currentGame.score = score;
    this.setState(cs);
  },
  setStart(start: boolean) {
    const cs = this.getState();
    cs.currentGame.start = start;
    this.setState(cs);
  },
  setChoice(choice: Jugada) {
    const cs = this.getState();
    cs.currentGame.choice = choice;
    this.setState(cs);
  },
  setCantPlayers(cantPlayers: number) {
    const cs = this.getState();
    cs.cantPlayers = cantPlayers;
    this.setState(cs);
  },
  setRtdbRoomId(rtdbRoomId: string) {
    const cs = this.getState();
    cs.rtdbRoomId = rtdbRoomId;
    this.setState(cs);
  },
  setIrAInstrucciones(irAInstrucciones: boolean) {
    const cs = this.getState();
    cs.currentGame.irAInstrucciones = irAInstrucciones;
    this.setState(cs);
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
    const cs = this.getState();
    if (cs.currentGame.nombre) {
      fetch(API_BASE_URL + "/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ nombre: cs.currentGame.nombre }),
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
    this.setScore(0);
    this.setCantPlayers(0);
    this.setOponente({});
    this.setIrAInstrucciones(false);

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
        if (callback) {
          callback();
        }
      });
  },

  pushJugada(callback?) {
    const cs = this.getState();

    fetch(API_BASE_URL + "/jugada", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currentGame: cs.currentGame,
        playerId: cs.playerId,
        rtdbRoomId: cs.rtdbRoomId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (callback) {
          callback();
        }
      });
  },

  checkRoomDisponible(callback?) {
    const cs = this.getState();
    const roomsRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);
    console.log("disponible", cs.rtdbRoomId);

    roomsRef.once("value", (snap) => {
      const rtdbRoom = snap.val();
      const currentGame = map(rtdbRoom.currentGame);

      const players = currentGame.length;

      if (players < 2) {
        this.setSalaOcupada(false);
      } else {
        const jugadorUno = currentGame[0].nombre;
        const jugadorDos = currentGame[1].nombre;

        if (
          cs.currentGame.nombre != jugadorUno &&
          cs.currentGame.nombre != jugadorDos
        ) {
          this.setSalaOcupada(true);
        } else {
          this.setSalaOcupada(false);
        }
      }
      if (callback) callback();
    });
  },

  checkCantPlayers(callback?) {
    const cs = this.getState();
    console.log("rtdb", cs.rtdbRoomId);

    const roomsRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);

    roomsRef.on("value", (snap) => {
      const cs = this.getState();

      const rtdbRoom = snap.val();
      const currentGame = map(rtdbRoom.currentGame);
      console.log("current game", currentGame);

      this.setCantPlayers(currentGame.length);
      if (cs.cantPlayers == 2) {
        const jugadorUno = currentGame[0].nombre;

        if (cs.currentGame.nombre == jugadorUno) {
          this.setOponente(currentGame[1]);
        } else {
          this.setOponente(currentGame[0]);
        }
      }
    });
  },

  // listenRoom(callback?) {
  //   const cs = this.getState();
  //   const roomsRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);

  //   roomsRef.on("value", (snap) => {
  //     console.log("empiezo a escuchar");
  //     const cs = this.getState();

  //     const rtdbRoom = snap.val();
  //     const currentGame = map(rtdbRoom.currentGame);

  //     const players = currentGame.length;
  //     this.setCantPlayers(players);

  //     if (callback) callback();
  //   });
  // },

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
