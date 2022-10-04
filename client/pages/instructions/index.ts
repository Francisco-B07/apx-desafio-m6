import { state } from "../../state";
import { Router } from "@vaadin/router";

class Instructions extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    state.setIrAInstrucciones(false);

    var botonEl = this.shadow.querySelector(".container-boton");
    botonEl?.addEventListener("click", () => {
      state.setStart(true);
      state.pushJugada((err) => {
        if (err) console.error("Hubo un error en pushJugada de instructions");
        Router.go("/salaDeEspera");
      });
    });
  }
  render() {
    const div = document.createElement("div");
    const imageURL = require("url:../../img/fondo.svg");

    const currentState = localStorage.getItem("state");
    const localData = currentState ? JSON.parse(currentState) : "";

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
          
          .header {
            padding:24px 20px 0px 20px;
            display: flex;
            justify-content: space-between;
            width:100%;
          }
          .player{
            display: flex;
          }
          .nombre1,
          .score1 {
            font-family: "American Typewriter";
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 100%;
            color: #000000;
          }
          .nombre1{
            min-width:130px;
            text-align: center;
  
          }
          .nombre2,
          .score2 {
            font-family: "American Typewriter";
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 100%;
            color: #ff6442;
          }
          .nombre2{
            min-width:130px;
            text-align: center;
  
          }
          .sala {
            margin: 0px;
            font-family: "American Typewriter";
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 108.5%;
            text-align: right;
            color: #000000;
          }
          .numero-sala {
            margin: 0px;
            font-family: "American Typewriter";
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 108.5%;
            text-align: right;
            color: #000000;
          }
  
          .instrucciones{
            padding: 0px 27px 0px 27px;
            text-align: center;
          }
  
          @media (max-width: 370px){
            .instrucciones{
            padding: 0px 27px 0px 27px;
          }
          }
  
          .container-boton{
            width: 322px;
          }
          @media (max-width: 370px){
            .container-boton{
              width: 290px;
            }
          }
  
          .container-figuras{
            position: absolute;
            left: 15%;
            top: 80%;
          }
          @media (max-width: 370px){
            .container-figuras{
              left: 7%;
            }
          }
          
          @media (min-width: 600px){
            .container-figuras{
              left: 40%;
              top: 80%;
            }
          }
  
      `;

    div.innerHTML = `
    <div class="container">
      <div class="container-page">
      <div class="header">
          <div class="score">
            <div class="player">
              <div class="nombre1">
                <span class="">${localData.currentGame.nombre}:</span>
              </div>
              <span class="score1">${localData.currentGame.score}</span>
            </div>
            <div class="player">
              <div class="nombre2">
                <span class="">${localData.oponente.nombre}:</span>
              </div>
              <span class="score2">${localData.oponente.score}</span>
            </div>
          </div>
          <div class="sala">
            <p class="sala">Sala</p>
            <p class="numero-sala">${localData.roomId}</p>
          </div>
        </div>
        <div class="instrucciones">    
          <text-el tag="p"> Presioná jugar
          y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-el>
          </div>
          <div class="container-boton">
            <button-el >¡Jugar!</button-el>
          </div>
          <div class="container-figuras">      
          <piedra-papel-tijera></piedra-papel-tijera>
          </div>
      </div>
    </div>
    `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("instructions-component", Instructions);
