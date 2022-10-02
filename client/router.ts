import { initWelcome } from "./pages/welcome";
import { initInstructions } from "./pages/instructions";
import { initPlay } from "./pages/play";
import { initResult } from "./pages/result";
import { initIngresarSala } from "./pages/ingresarSala";
import { initEmpezar } from "./pages/empezar";
import { initCompartiCodigo } from "./pages/compartiCodigo";
import { initSalaDeEspera } from "./pages/sala-de-espera";
const routes = [
  {
    path: /\/welcome/,
    component: initWelcome,
  },
  {
    path: /\/ingresarSala/,
    component: initIngresarSala,
  },
  {
    path: /\/empezar/,
    component: initEmpezar,
  },
  {
    path: /\/compartiCodigo/,
    component: initCompartiCodigo,
  },
  {
    path: /\/salaDeEspera/,
    component: initSalaDeEspera,
  },
  {
    path: /\/instructions/,
    component: initInstructions,
  },
  {
    path: /\/play/,
    component: initPlay,
  },
  {
    path: /\/result/,
    component: initResult,
  },
];

const BASE_PATH = "/juego-piedra-papel-o-tijera";

function isGithubPages() {
  return location.host.includes("github.io");
}

export function initRouter(container: Element) {
  function goTo(path) {
    const completePath = isGithubPages() ? BASE_PATH + path : path;

    history.pushState({}, "", completePath);
    handleRoute(completePath);
  }
  function handleRoute(route) {
    const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
    for (const r of routes) {
      if (r.path.test(newRoute)) {
        const el = r.component({ goTo: goTo });
        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }
  if (
    location.pathname == "/juego-piedra-papel-o-tijera/" ||
    location.pathname == "/"
  ) {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
