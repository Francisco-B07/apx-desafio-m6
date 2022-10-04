// import { router } from "./router";
// import { Router } from "@vaadin/router";
// IMPORT DE COMPONENTES
import { initText } from "./components/text";
import { initButton } from "./components/button";
import { initTijera } from "./components/tijera";
import { initPiedra } from "./components/piedra";
import { initPapel } from "./components/papel";
import { initPiedraPapelTijera } from "./components/piedra-papel-tijera";
import { initEstrella } from "./components/estrella";
import { initNada } from "./components/nada";

// IMPORT DE PAGES
import "./pages/welcome/index";
import "./pages/empezar/index";
import "./pages/ingresar-sala/index";
import "./pages/comparti-codigo/index";
import "./pages/instructions/index";
import "./pages/sala-de-espera/index";
import "./pages/play/index";
import "./pages/eleccion/index";
import "./pages/result/index";

// OTROS IMPORTS
import "./router";
import { state } from "./state";
import { Router } from "express";

(function () {
  initEstrella();
  initText();
  initButton();
  initTijera();
  initPiedra();
  initPapel();
  initNada();
  initPiedraPapelTijera();
  const root = document.querySelector(".root")!;
  // initRouter(root);
  state.init();

  // ---------------------------------------------------
  // // al comenzar
  // state.init()
  // // recupera el state del localStorage
  // const cs = state.getState()
  // if(cs.rtdbRoomId && cs.playerId){
  //   // Router.push()
  // }
})();
