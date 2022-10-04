import { state } from "../../state";
import { Router } from "@vaadin/router";
type Jugada = "piedra" | "papel" | "tijera";

class Eleccion extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
    state.subscribe(() => {
      const cs = state.getState();
      console.log("cambieeeee", cs);

      this.render();
    });
    const cs = state.getState();
    // state

    // let counter = 3;
    let counter2 = 0;

    const intervalId2 = setInterval(() => {
      counter2++;
      if (counter2 > 3) {
        clearInterval(intervalId2);
        Router.go("/result");
      }
    }, 1000);
  }

  render() {
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

            height: 100vh;
          }
  
          
          
          .jugado{
           
            Width: 158px;
            Height: 375px;
            
          }
          @media (min-width: 600px){
            .jugado{
            }
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
          <${cs.oponente.choice}-el class="computer-select"></${cs.oponente.choice}-el>
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
