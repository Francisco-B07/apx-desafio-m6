import { Router } from "@vaadin/router";
import { state } from "../../state";

class Empezar extends HTMLElement {
  shadow: ShadowRoot;
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    this.render();

    const inputEl = this.shadow.querySelector(".ingresar-nombre");
    const input = inputEl as any;

    var botonEl = this.shadow.querySelector(".container-boton");
    botonEl?.addEventListener("click", () => {
      // Seteo el nombre
      state.setNombre(input.value);

      // Reviso el state
      const cs = state.getState();
      console.log(cs.currentGame.nombre);
      console.log("roomId", cs.roomId);

      state.signIn((err) => {
        // Si no tiene codigo de Room
        if (cs.roomId == "") {
          if (err) console.error("Hubo un error en el signIn");

          state.askNewRoom(() => {
            state.accessToRoom((err) => {
              if (err) console.error("Hubo un error en el accessToRoom");
              console.log("online", cs.currentGame.online);
              state.setIrAInstrucciones(true);

              state.setStart(false);
              if (input.value !== "") {
                state.pushJugada();
                Router.go("/compartiCodigo");
              } else {
                alert("Debe ingresar un nombre para continuar");
              }
            });
          });
          // Si tiene codigo de Room
        } else {
          if (input.value !== "") {
            state.accessToRoom((err) => {
              if (err) console.error("Hubo un error en el accessToRoom");
              console.log("desde empezar", cs.rtdbRoomId);
              state.setRtdbRoomId(cs.rtdbRoomId);

              state.checkRoomDisponible((err) => {
                if (err) console.error("Hubo un error en el listenRoom");
                const cs = state.getState();
                if (!cs.ocupada) {
                  console.log("online unirme", cs.currentGame.online);
                  state.setStart(false);
                  state.setChoice("div");
                  state.setIrAInstrucciones(true);
                  state.pushJugada();
                  console.log("currentGame desde unirme", cs.currentGame);

                  Router.go("/compartiCodigo");
                } else {
                  alert("La sala ya esta ocupada");
                }
              });
            });
          } else {
            alert("Debe ingresar un nombre para continuar");
          }
        }
      });
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
        .label-nombre{
          font-family: 'Odibee Sans';
          font-style: normal;
          font-weight: 400;
          font-size: 45px;
          line-height: 50px;
          text-align: center;
          letter-spacing: 0.05em;
          color: #000000;
          margin-top: -60px;
          margin-bottom: 2px;
        }
        .ingresar-nombre{
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
          margin-bottom: 4px;

        }
        

        @media (max-width: 380px){
          .ingresar-nombre{
            width: 322px;
          }
        }
        .container-boton{
          width: 400px;
          height: 87px;
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
      <div class="titulo">    
        <text-el tag="h1"> Piedra Papel </text-el>
        <span>ó</span> 
        <text-el tag="h1">Tijera</text-el>
      </div>
      <label for="nombre" class="label-nombre">Tu Nombre</label>
      <input class="ingresar-nombre" type="text" name="nombre">
      <div class="container-boton">
          <button-el class="boton">Empezar</button-el>
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
customElements.define("empezar-component", Empezar);
