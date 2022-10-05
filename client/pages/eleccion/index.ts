import { state } from "../../state";
import { Router } from "@vaadin/router";
type Jugada = "piedra" | "papel" | "tijera" | "nada" | "";
class Eleccion extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    console.log("entre a eleccion");

    this.shadow = this.attachShadow({ mode: "open" });
    const cs = state.getState();
    this.render(cs.oponente.choice);

    // this.goResult();
    state.subscribe(() => {
      const cs = state.getState();
      console.log("entre al SUSCRIBE", cs.oponente.choice);
      this.render(cs.oponente.choice);

      // this.redirect();
    });
    state.setIrAResult(true);
    setTimeout(() => {
      this.goResult();
    }, 2000);

    // setTimeout(() => {

    // state.setIrAResult(true);
    // setTimeout(() => {
    //   Router.go("/result");
    //   // state.setChoice("");
    //   state.setIrAResult(false);
    // }, 3000);
    //   Router.go("/result");
    // }, 3000);
    // const cs = state.getState();
    // state

    // let counter = 3;
    //   let counter2 = 0;

    //   const intervalId2 = setInterval(() => {
    //     let contador = cs.irAResult;
    //     contador++;
    //     state.setIrAResult(contador);
    //     if (contador <= 2) {
    //       Router.go("/eleccion");
    //       clearInterval(intervalId2);
    //     }

    //     if (contador > 2) {
    //       Router.go("/result");
    //       clearInterval(intervalId2);
    //     }
    //   }, 1000);
  }
  goResult() {
    const cs = state.getState();
    if (cs.oponente.irAResult == true && cs.currentGame.irAResult == true) {
      state.pushJugada((err) => {
        Router.go("/result");
      });
    }
  }
  // goResult() {
  //   const cs = state.getState();
  //   state.setIrAResult(true);
  //   if (
  //     cs.oponente.choice != "" &&
  //     cs.currentGame.choice != "" &&
  //     cs.irAResult
  //   ) {
  //     setTimeout(() => {
  //       Router.go("/result");
  //       // state.setChoice("");
  //       state.setIrAResult(false);
  //     }, 3000);
  //   }
  // }
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
          <${jugada}-el class="computer-select"></${jugada}-el>
          <${cs.currentGame.choice}-el class="jugado"></${cs.currentGame.choice}-el>
      </div>
    </div>
    `;
    this.shadow.firstChild?.remove();

    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("eleccion-component", Eleccion);
