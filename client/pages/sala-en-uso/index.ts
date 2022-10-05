import { state } from "../../state";
import { Router } from "@vaadin/router";

class SalaEnUso extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    state.setRoomId("");
    state.setOnline(true);

    var botonNuevoJuegoEl = this.shadow.querySelector(
      ".container-boton-nuevoJuego"
    );
    var botonIngresarSalaEl = this.shadow.querySelector(
      ".container-boton-ingresarSala"
    );

    botonNuevoJuegoEl?.addEventListener("click", () => {
      Router.go("/empezar");
    });

    botonIngresarSalaEl?.addEventListener("click", () => {
      Router.go("/ingresarSala");
    });
  }
  render() {
    const div = document.createElement("div");
    const imageURL = require("url:../../img/fondo.svg");

    var style = document.createElement("style");
    style.textContent = `
            span{
              color: #91CCAF;
              font-size: 80px;
              font-weight: bold;
              display: inline;
            }
            @media (max-width: 370px){
              span{
                font-size: 60px;
              }
            }
    
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
    
            .titulo{
              padding: 35px 34px 74px 34px;          
            }
            @media (max-width: 370px){
              .titulo{
                padding: 20px 25px 74px 25px;          
              }
    
            }
    
            .instrucciones{
              margin-top:-105px;
              padding: 0px 27px 0px 27px;
              text-align: center;
            }
    
            @media (max-width: 370px){
              .instrucciones{
              padding: 0px 27px 0px 27px;
            }
            }
            .container-figuras{
              position: absolute;
              left: 15%;
              top: 85%;
            }
            @media (max-width: 370px){
              .container-figuras{
                left: 7%;
              }
            }
    
            @media (min-width: 600px){
              .container-figuras{
                left: 38%;
                top: 85%;
              }
            }              
        `;
    div.innerHTML = `
        <div class="container">
          <div class="container-page">
            <div class="titulo">    
              <text-el tag="h1"> Piedra Papel </text-el>
              <span>ó</span> 
              <text-el tag="h1">Tijera</text-el>
            </div>
            <div class="instrucciones">    
            <text-el tag="p">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</text-el>
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
customElements.define("sala-en-uso-component", SalaEnUso);
