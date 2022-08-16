type Jugada = "piedra" | "papel" | "tijera";
type Game = {
  computerPlay: Jugada;
  myPlay: Jugada;
};

const state = {
  data: {
    currentGame: {
      computerPlay: "",
      myPlay: "",
      resultado: "",
      vos: 0,
      computer: 0,
    },
  },
  listeners: [],

  getState() {
    return this.data;
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

  setState(newState) {
    this.data.currentGame = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  init() {
    const localData = localStorage.getItem("saved-state");
    if (localData) {
      this.setState(JSON.parse(localData));
    }
  },
};

export { state };
