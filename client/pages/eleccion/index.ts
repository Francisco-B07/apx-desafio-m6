import { state } from "../../state";
import { Router } from "@vaadin/router";
type Jugada = "piedra" | "papel" | "tijera" | "nada" | "";
class Eleccion extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    const cs = state.getState();
    this.render(cs.oponente.choice);

    state.setIrAResult(true);
    this.goResult();
  }
  goResult() {
    const cs = state.getState();
    if (cs.oponente.irAResult == true && cs.currentGame.irAResult == true) {
      state.whoWins(cs.currentGame.choice, cs.oponente.choice, (err) => {
        if (err) console.error("Hubo un error en pushJugada de result");
        state.pushJugada((err) => {
          if (err) console.error("Hubo un error en pushJugada de elección");
          setTimeout(() => {
            Router.go("/result");
          }, 3000);
        });
      });
    }
  }

  render(jugada?: Jugada) {
    const cs = state.getState();

    const div = document.createElement("div");
    const imageURL = require("url:../../img/fondo.svg");
    var style = document.createElement("style");
    style.textContent = `
          .container{
            background-image: url(${imageURL});
            width:100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .container-page{
            max-width: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }
  
          .jugado{
            Width: 158px;
            Height: 375px;
          }
  
          .computer-select{
            Width: 158px;
            Height: 375px;
            transform: rotate(180deg);
          }
          @media (min-width: 600px){
            .computer-select{
            }
          }       
      `;

    div.innerHTML = `
    <div class="container">
      <div class="container-page">
          <${jugada}-el class="computer-select"></${jugada}-el>
          <${cs.currentGame.choice}-el class="jugado"></${cs.currentGame.choice}-el>
      </div>
    </div>
    `;
    this.firstChild?.remove();

    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("eleccion-component", Eleccion);
