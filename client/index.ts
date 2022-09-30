import { initRouter } from "./router";
import { initText } from "./components/text";
import { initButton } from "./components/button";
import { initTijera } from "./components/tijera";
import { initPiedra } from "./components/piedra";
import { initPapel } from "./components/papel";
import { initPiedraPapelTijera } from "./components/piedra-papel-tijera";
import { state } from "./state";
import { initEstrella } from "./components/estrella";
import { Router } from "express";

(function () {
  initEstrella();
  initText();
  initButton();
  initTijera();
  initPiedra();
  initPapel();
  initPiedraPapelTijera();
  const root = document.querySelector(".root")!;
  initRouter(root);
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
