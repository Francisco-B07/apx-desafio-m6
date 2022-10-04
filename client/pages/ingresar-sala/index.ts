import { state } from "../../state";
import { Router } from "@vaadin/router";

class IngresarSala extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
    const inputEl = this.shadow.querySelector(".ingresar-codigo");
    const input = inputEl as any;

    var botonEl = this.shadow.querySelector(".container-boton");

    botonEl?.addEventListener("click", () => {
      if (input.value !== "") {
        state.setOnline(true);
        state.setRoomId(input.value);
        Router.go("/empezar");
      } else {
        alert("Debe ingresar un codigo para continuar");
      }
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
              padding: 25px 34px 74px 34px;          
            }
            @media (max-width: 370px){
              .titulo{
                padding: 10px 25px 74px 25px;          
              }
    
            }
            .ingresar-codigo{
              font-family: 'Odibee Sans';
              font-style: normal;
              font-weight: 400;
              font-size: 45px;
              line-height: 50px;
              text-align: center;
              color: black;   
              background: #FFFFFF;
              border: 10px solid #182460;
              border-radius: 10px;    
              width: 400px;
              height: 74px;
              margin-top: -45px;
              margin-bottom: 18px;
    
            }
            .ingresar-codigo::placeholder{
              color: #D9D9D9;
            }
    
            @media (max-width: 380px){
              .ingresar-codigo{
                width: 322px;
                margin-top: -40px;
              }
            }
            .container-boton{
              width: 400px;
              margin-top: 20px;
    
            }
            @media (max-width: 380px){
              .container-boton{
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
              top: 87%;
            }
            @media (max-width: 370px){
              .container-figuras{
                left: 7%;
              }
            }
    
            @media (min-width: 600px){
              .container-figuras{
                left: 40%;
                top: 87%;
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
          <input class="ingresar-codigo" type="text" placeholder="codigo">
          <div class="container-boton">
              <button-el class="boton">Ingresar a la sala</button-el>
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
customElements.define("ingresar-sala-component", IngresarSala);
