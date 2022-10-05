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
import "./pages/sala-en-uso/index";

// OTROS IMPORTS
import "./router";
import { state } from "./state";

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
  state.init();
})();
