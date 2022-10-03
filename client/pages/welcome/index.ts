import { state } from "../../state";
import { Router } from "@vaadin/router";

class Welcome extends HTMLElement {
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
      // state.setNuevoRoom(true);
      Router.go("/empezar");
    });

    botonIngresarSalaEl?.addEventListener("click", () => {
      // state.setNuevoRoom(false);
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
    
            .container-boton-nuevoJuego{
              width: 400px;
              height: 87px;
              margin-top: -45px;
            }
            @media (max-width: 380px){
              .container-boton-nuevoJuego{
                width: 322px;
                margin-top: -40px;
    
              }
            }
            .container-boton-ingresarSala{
              width: 400px;
              height: 87px;
              margin-top: 20px;
    
            }
            @media (max-width: 380px){
              .container-boton-ingresarSala{
                width: 322px;
              }
            }
            .boton{
              width: 400px;
            }  
            @media (max-width: 380px){
              .boton{
                width: 322px;
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
                left: 38%;
                top: 80%;
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
            <div class="container-boton-nuevoJuego">
                <button-el class="boton">Nuevo Juego</button-el>
            </div>
            <div class="container-boton-ingresarSala">
                <button-el class="boton">Ingresar a una sala</button-el>
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
customElements.define("welcome-component", Welcome);
