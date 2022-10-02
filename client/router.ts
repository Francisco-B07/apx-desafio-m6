import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-component" },
  { path: "/welcome", component: "welcome-component" },
  { path: "/empezar", component: "empezar-component" },
  { path: "/ingresarSala", component: "ingresar-sala-component" },
  { path: "/compartiCodigo", component: "comparti-codigo-component" },
  { path: "/instructions", component: "instructions-component" },
  { path: "/salaDeEspera", component: "sala-de-espera-component" },
  { path: "/play", component: "play-component" },
  { path: "/result", component: "result-component" },
]);
