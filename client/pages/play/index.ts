import { state } from "../../state";
import { Router } from "@vaadin/router";

class Play extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.firstChild?.remove();
    console.log("entre a play");

    this.render();
    const cs = state.getState();

    let counter = 3;

    const intervalId = setInterval(() => {
      const contador = this.shadow.querySelector(".contador");
      if (contador) {
        contador.textContent = counter.toString();
        counter--;
      }

      // const elegido = this.shadow.querySelector(".seleccionado");
      if (counter == -1) {
        if (cs.currentGame.choice == "") {
          state.setChoice("nada");
        } else {
          state.setChoice(cs.currentGame.choice);
        }

        state.setStart(false);
        state.setIrAResult(true);

        state.pushJugada((err) => {
          if (err) console.error("Hubo un error en pushJugada de play");
          setTimeout(() => {
            Router.go("/eleccion");
          }, 500);

          // Router.go("/instructions");
        });
        clearInterval(intervalId);
        //   elegido.classList.add("jugado");
        //   this.shadow.querySelector(".no-seleccionado")?.remove();
        //   this.shadow.querySelector(".no-seleccionado")?.remove();
        //   this.shadow.querySelector(".container-contador")?.remove();
        //   const contenedorPage = this.shadow.querySelector(".container");
        //   const oponenteSelect = document.createElement("div");
        //   oponenteSelect.innerHTML = `
        //   <div class= "computer-select">
        //   <${cs.oponente.choice}-el></${cs.oponente.choice}-el>
        //   </div>
        //   `;
        //   contenedorPage?.appendChild(oponenteSelect);
        //   // state.whoWins(cs.currentGame.choice, cs.oponente.choice);
      }
      // if (counter < -1) {
      //   const cs = state.getState();
      //   // state.setChoice("nada");
      //   state.setStart(false);
      //   state.pushJugada((err) => {
      //     if (err) console.error("Hubo un error en el listenRoom");
      //     Router.go("/eleccion");
      //   });
      //   clearInterval(intervalId);
      // }
    }, 1000);

    var piedra = this.shadow.querySelector(".piedra");
    var papel = this.shadow.querySelector(".papel");
    var tijera = this.shadow.querySelector(".tijera");

    piedra?.addEventListener("click", () => {
      state.setChoice("piedra");
      console.log("piedra");

      piedra?.classList.remove("no-seleccionado");
      papel?.classList.remove("seleccionado");
      tijera?.classList.remove("seleccionado");

      piedra?.classList.add("seleccionado");
      papel?.classList.add("no-seleccionado");
      tijera?.classList.add("no-seleccionado");
    });

    papel?.addEventListener("click", () => {
      console.log("papel");

      state.setChoice("papel");
      piedra?.classList.remove("seleccionado");
      papel?.classList.remove("no-seleccionado");
      tijera?.classList.remove("seleccionado");

      piedra?.classList.add("no-seleccionado");
      papel?.classList.add("seleccionado");
      tijera?.classList.add("no-seleccionado");
    });

    tijera?.addEventListener("click", () => {
      console.log("tijera");

      state.setChoice("tijera");
      piedra?.classList.remove("seleccionado");
      papel?.classList.remove("seleccionado");
      tijera?.classList.remove("no-seleccionado");

      piedra?.classList.add("no-seleccionado");
      papel?.classList.add("no-seleccionado");
      tijera?.classList.add("seleccionado");
    });
  }

  render() {
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
          }
  
          .tijera{
            position: absolute;
            left: 10%;
            top: 80%; 
            Width: 104px;
            Height: 233px;         
          }
          @media (max-width: 370px){
            .tijera{
              Width: 84px;
              Height: 203px;         
            }
          }
          @media (min-width: 600px){
            .tijera{
              left: 32%;
            }
          }
  
          .piedra{
            position: absolute;
            left: 40%;
            top: 80%;
            Width: 104px;
            Height: 233px;
          }  
          @media (max-width: 370px){
            .piedra{
              Width: 84px;
              Height: 203px;         
            }
          }
          @media (min-width: 600px){
            .piedra{
              left:47%;
            }
          }   
  
          .papel{
            position: absolute;
            left: 70%;
            top: 80%;
            Width: 104px;
            Height: 233px;
          }
          @media (max-width: 370px){
            .papel{
              Width: 84px;
              Height: 203px;         
            }
          }
          @media (min-width: 600px){
            .papel{
              left: 63%;
            }
          }
  
          .seleccionado{          
            top: 75%;
            Width: 104px;
            Height: 263px;
          }  
          @media (max-width: 370px){
            .seleccionado{
              Width: 84px;
              Height: 233px;         
            }
          }      
          .no-seleccionado{          
            top: 85%;
          }
          
          .container-contador{
            margin-top: 170px;
            width: 250px;
            height: 250px;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.767);
            color: white;
            display:flex;
            align-items: center ;
            justify-content: center;
            font-size: 65px;   
          }
  
          @media (max-width: 370px){
            .container-contador{
              margin-top: 130px;         
            }
          }
          @media (min-width: 600px){
            .container-contador{
              margin-top: 130px;
              width: 300px;
              height: 300px;
              font-size: 85px;
            }
          }
  
          .computer-select{
            position: absolute;
            bottom: 62%;
            Width: 158px;
            Height: 375px;
            transform: rotate(180deg);
            left: 30%;          
          }
          @media (min-width: 600px){
            .computer-select{
              left: 45%;          
            }
          }       
      `;

    div.innerHTML = `
    <div class="container">
      <div class="container-page">
        <div class="container-contador">
            <h1 class="contador"><h1>
        </div>
        <div class="tijera">
          <tijera-el></tijera-el>
        </div>
        <div class="piedra">
          <piedra-el></piedra-el>
        </div>
        <div class="papel">
          <papel-el></papel-el>
        </div>
      </div>
    </div>
    `;
    this.shadow.firstChild?.remove();
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("play-component", Play);
