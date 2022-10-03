import { state } from "../../state";
import { Router } from "@vaadin/router";

class SalaDeEspera extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    //   state.pushJugada();
    // state.listenRoom();

    // if (localData.oponente.start) {
    //   state.pushJugada();
    //   state.listenRoom();
    //   params.goTo("/play");
    // }

    // state.subscribe(() => {
    //   if (localData.oponente.start) params.goTo("/play");
    // });
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
            padding: 70px 27px 0px 27px;
            text-align: center;
          }
          
          @media (max-width: 370px){
            .instrucciones{
            padding: 70px 27px 0px 27px;
            }
          }
  
          .codigo{
            font-style: normal;
            font-weight: 700;
            font-size: 48px;
            line-height: 100%;
            text-align: center;
            color: #000000;
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
              <span class="">${localData.nombre}:</span>
            </div>
            <span class="score1">${localData.score}</span>
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
        <text-el tag="p"> Esperando a que <b>${localData.oponente.nombre}</b> presione ¡Jugar!...</text-el>
             
        
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

customElements.define("sala-de-espera-component", SalaDeEspera);
