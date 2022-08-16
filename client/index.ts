import { initRouter } from "./router";
import { initText } from "./components/text";
import { initButton } from "./components/button";
import { initTijera } from "./components/tijera";
import { initPiedra } from "./components/piedra";
import { initPapel } from "./components/papel";
import { initPiedraPapelTijera } from "./components/piedra-papel-tijera";
import { state } from "./state";
import { initEstrella } from "./components/estrella";

(function () {
  initEstrella();
  initText();
  initButton();
  initTijera();
  initPiedra();
  initPapel();
  initPiedraPapelTijera();
  const root = document.querySelector(".root");
  initRouter(root);
  state.init();
})();
